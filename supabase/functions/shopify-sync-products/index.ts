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

    const shopifyUrl = `https://${store.shopify_domain}/admin/api/${store.shopify_api_version}/products.json?limit=250`
    const shopifyResponse = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': store.shopify_access_token,
        'Content-Type': 'application/json',
      },
    })

    if (!shopifyResponse.ok) throw new Error(`Shopify API error: ${shopifyResponse.status}`)

    const { products } = await shopifyResponse.json()

    const productsToUpsert = products.map((product: any) => ({
      user_id: userId,
      shopify_product_id: String(product.id),
      title: product.title,
      handle: product.handle,
      product_type: product.product_type || null,
      vendor: product.vendor || null,
      status: product.status || 'active',
      tags: product.tags ? product.tags.split(', ').filter(Boolean) : [],
      variants: product.variants || [],
      images: product.images || [],
      total_inventory: (product.variants || []).reduce((sum: number, v: any) => sum + (v.inventory_quantity || 0), 0),
      last_synced_at: new Date().toISOString(),
    }))

    const { error: upsertError } = await supabaseAdmin
      .from('products')
      .upsert(productsToUpsert, { onConflict: 'user_id,shopify_product_id' })

    if (upsertError) throw upsertError

    return new Response(
      JSON.stringify({ success: true, synced: productsToUpsert.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
