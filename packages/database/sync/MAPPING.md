| Firestore Collection | Prisma Table | Sync Direction | Conflict Strategy |
|---------------------|--------------|----------------|-------------------|
| users/{uid}         | Tenant       | Firebase→Prisma| Firebase is source|
| users/{uid}/revenue_snapshots | RevenueSnapshot | Firebase→Prisma | Firebase is source |
| users/{uid}/ai_actions | ExecutionTrace | Prisma→Firebase | Prisma is source |
| users/{uid}/automations | AutomationLog | Firebase→Prisma | Firebase is source |
| users/{uid}/activity_feed | EventLog | Firebase→Prisma | Firebase is source |
| users/{uid}/products | Product | Firebase→Prisma | Firebase is source |
| users/{uid}/campaigns | Campaign | Firebase→Prisma | Firebase is source |
| users/{uid}/ai_insights | AIInsight | Prisma→Firebase | Prisma is source |
