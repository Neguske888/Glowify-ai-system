import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const getSegment = (customer: any): string => {
  const daysSince = customer.updated_at
    ? Math.floor((Date.now() - new Date(customer.updated_at).getTime()) / 86400000)
    : 999
  if (customer.orders_count >= 4) return 'vip'
  if (customer.orders_count >= 2) return 'loyal'
  if (daysSince <= 30) return 'recent'
  if (daysSince <= 90) return 'at_risk'
  return 'lost'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  try {
    const { userId } = await req.json()
    if (!userId) throw new Error('userId is required')

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: store, error: storeError } = await supabaseAdmin
      .from('stores')
      .select('shopify_domain, shopify_access_token, shopify_api_version')
      .eq('user_id', userId)
      .single()

    if (storeError || !store) {
      return new Response(JSON.stringify({ error: 'Store not found' }), {
        status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const shopifyUrl = `https://${store.shopify_domain}/admin/api/${store.shopify_api_version}/customers.json?limit=250`
    const shopifyResponse = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': store.shopify_access_token,
        'Content-Type': 'application/json',
      },
    })

    if (!shopifyResponse.ok) throw new Error(`Shopify API error: ${shopifyResponse.status}`)

    const { customers } = await shopifyResponse.json()

    const customersToUpsert = customers.map((c: any) => ({
      user_id: userId,
      shopify_customer_id: String(c.id),
      email: c.email || null,
      first_name: c.first_name || null,
      last_name: c.last_name || null,
      phone: c.phone || null,
      total_spent: parseFloat(c.total_spent) || 0,
      orders_count: c.orders_count || 0,
      segment: getSegment(c),
      accepts_marketing: c.accepts_marketing || false,
      location_city: c.default_address?.city || null,
      location_country: c.default_address?.country || null,
      last_order_at: c.updated_at || null,
    }))

    const { error: upsertError } = await supabaseAdmin
      .from('customers')
      .upsert(customersToUpsert, { onConflict: 'user_id,shopify_customer_id' })

    if (upsertError) throw upsertError

    return new Response(
      JSON.stringify({ success: true, synced: customersToUpsert.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
