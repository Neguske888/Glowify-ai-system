import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    const shopifyUrl = `https://${store.shopify_domain}/admin/api/${store.shopify_api_version}/orders.json?status=any&limit=250`
    const shopifyResponse = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': store.shopify_access_token,
        'Content-Type': 'application/json',
      },
    })

    if (!shopifyResponse.ok) throw new Error(`Shopify API error: ${shopifyResponse.status}`)

    const { orders } = await shopifyResponse.json()

    const ordersToUpsert = orders.map((order: any) => ({
      user_id: userId,
      shopify_order_id: String(order.id),
      order_number: String(order.order_number),
      customer_email: order.email || null,
      customer_name: order.billing_address
        ? `${order.billing_address.first_name} ${order.billing_address.last_name}`.trim()
        : null,
      total_price: parseFloat(order.total_price) || 0,
      currency: order.currency || 'USD',
      financial_status: order.financial_status || null,
      fulfillment_status: order.fulfillment_status || null,
      line_items: order.line_items || [],
      shipping_address: order.shipping_address || null,
      source_name: order.source_name || null,
      processed_at: order.processed_at || null,
      tags: order.tags ? order.tags.split(', ').filter(Boolean) : [],
    }))

    const { error: upsertError } = await supabaseAdmin
      .from('orders')
      .upsert(ordersToUpsert, { onConflict: 'user_id,shopify_order_id' })

    if (upsertError) throw upsertError

    await supabaseAdmin
      .from('stores')
      .update({ last_synced_at: new Date().toISOString() })
      .eq('user_id', userId)

    return new Response(
      JSON.stringify({ success: true, synced: ordersToUpsert.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
