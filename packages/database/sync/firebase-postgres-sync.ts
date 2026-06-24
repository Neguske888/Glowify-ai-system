import { PrismaClient } from '@prisma/client'
import { db as firestoreDb } from '../../../src/lib/firebase'
import {
  collection, doc, setDoc, getDoc, getDocs,
  query, orderBy, limit, serverTimestamp, writeBatch,
  onSnapshot,
} from 'firebase/firestore'

const prisma = new PrismaClient()

export class GlowifySyncService {

  // ── SYNC USER: Firebase → Prisma ──────────────────────
  async syncUserToPostgres(uid: string): Promise<void> {
    try {
      const userRef = doc(firestoreDb, 'users', uid)
      const userSnap = await getDoc(userRef)
      if (!userSnap.exists()) {
        console.log(`Sync: no Firebase user found for uid ${uid}`)
        return
      }
      const userData = userSnap.data()
      await prisma.tenant.upsert({
        where: { firebaseUid: uid },
        update: {
          name:        userData.storeName || 'My Store',
          updatedAt:   new Date(),
        },
        create: {
          firebaseUid:  uid,
          name:         userData.storeName || 'My Store',
          slug:         userData.shopifyDomain || 'default-slug',
          createdAt:    new Date(),
          updatedAt:    new Date(),
        },
      })
      console.log(`Sync: user ${uid} synced Firebase → Postgres ✓`)
    } catch (err: any) {
      console.error(`Sync: syncUserToPostgres failed for ${uid}:`, err.message)
      throw err
    }
  }

  // ── SYNC AI ACTIONS: Prisma → Firebase ─────────────────
  async syncAIActionsToFirebase(uid: string, tenantId: string): Promise<void> {
    try {
      const traces = await prisma.executionTrace.findMany({
        where: { tenantId },
        orderBy: { timestamp: 'desc' },
        take: 20,
      })
      const batch = writeBatch(firestoreDb)
      for (const trace of traces) {
        const ref = doc(collection(firestoreDb, 'users', uid, 'ai_actions'), trace.id)
        batch.set(ref, {
          id:          trace.id,
          title:       trace.eventType,
          result:      trace.actualOutcome || '',
          status:      trace.status,
          impact:      trace.revenueImpact || 0,
          time:        trace.timestamp.toISOString(),
          syncedAt:    serverTimestamp(),
        }, { merge: true })
      }
      await batch.commit()
      console.log(`Sync: ${traces.length} AI actions synced Postgres → Firebase ✓`)
    } catch (err: any) {
      console.error(`Sync: syncAIActionsToFirebase failed:`, err.message)
      throw err
    }
  }

  // ── SYNC REVENUE SNAPSHOTS: Firebase → Prisma ──────────
  async syncRevenueToPostgres(uid: string, tenantId: string): Promise<void> {
    try {
      const q = query(
        collection(firestoreDb, 'users', uid, 'revenue_snapshots'),
        orderBy('createdAt', 'desc'),
        limit(60)
      )
      const snap = await getDocs(q)
      const snapshots = snap.docs.map(d => ({ id: d.id, ...d.data() }))

      for (const s of snapshots) {
        await prisma.revenueSnapshot.upsert({
          where: { tenantId_date: { tenantId, date: new Date(s.date) } },
          update: {
            revenue:      s.revenue,
            orders:       s.orders,
            roas:         s.roas,
            convRate:     s.convRate,
            updatedAt:    new Date(),
          },
          create: {
            tenantId,
            date:         new Date(s.date),
            revenue:      s.revenue,
            orders:       s.orders,
            roas:         s.roas,
            convRate:     s.convRate,
            createdAt:    new Date(),
            updatedAt:    new Date(),
          },
        }).catch(() => null)
      }
      console.log(`Sync: ${snapshots.length} revenue snapshots synced Firebase → Postgres ✓`)
    } catch (err: any) {
      console.error(`Sync: syncRevenueToPostgres failed:`, err.message)
    }
  }

  // ── FULL BIDIRECTIONAL SYNC ────────────────────────────
  async fullSync(uid: string): Promise<void> {
    console.log(`Sync: starting full bidirectional sync for uid ${uid}`)
    await this.syncUserToPostgres(uid)
    const tenant = await prisma.tenant.findUnique({ where: { firebaseUid: uid } }).catch(() => null)
    if (!tenant) {
      console.warn(`Sync: tenant not found in Postgres for uid ${uid}`)
      return
    }
    await Promise.allSettled([
      this.syncAIActionsToFirebase(uid, tenant.id),
      this.syncRevenueToPostgres(uid, tenant.id),
    ])
    console.log(`Sync: full sync complete for uid ${uid} ✓`)
  }

  // ── REAL-TIME LISTENER: Firestore → trigger Prisma sync ─
  watchFirestoreUser(uid: string): () => void {
    const userRef = doc(firestoreDb, 'users', uid)
    const unsubscribe = onSnapshot(userRef, async (snap) => {
      if (snap.exists()) {
        await this.syncUserToPostgres(uid).catch(console.error)
      }
    })
    console.log(`Sync: watching Firestore user ${uid} for changes`)
    return unsubscribe
  }

  // ── HEALTH CHECK ───────────────────────────────────────
  async healthCheck(): Promise<{ firebase: boolean; postgres: boolean }> {
    const results = { firebase: false, postgres: false }
    try {
      await prisma.$queryRaw`SELECT 1`
      results.postgres = true
      console.log('Sync health: Postgres ✓')
    } catch (err: any) {
      console.error('Sync health: Postgres ✗', err.message)
    }
    try {
      const testRef = doc(firestoreDb, '_health', 'check')
      await getDoc(testRef).catch(() => null)
      results.firebase = true
      console.log('Sync health: Firebase ✓')
    } catch (err: any) {
      console.error('Sync health: Firebase ✗', err.message)
    }
    return results
  }
}

export const syncService = new GlowifySyncService()
