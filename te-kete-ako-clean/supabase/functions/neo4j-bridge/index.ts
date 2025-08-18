// Te Kete Ako - GraphRAG Phase 2: Neo4j Knowledge Graph Bridge
// Secure gateway for all graph database operations

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log("🧠 Te Kete Ako - Neo4j Knowledge Graph Bridge Starting...")

// For Phase 2 implementation, we'll use the free Neo4j AuraDB
// These would be set as environment variables in production
const NEO4J_URI = Deno.env.get('NEO4J_URI') || 'neo4j+s://your-instance.databases.neo4j.io'
const NEO4J_USER = Deno.env.get('NEO4J_USER') || 'neo4j'
const NEO4J_PASSWORD = Deno.env.get('NEO4J_PASSWORD') || 'your-password'

// Simple Neo4j HTTP API client (since Deno doesn't have the full driver)
async function executeNeo4jQuery(query: string, parameters: any = {}) {
  const auth = btoa(`${NEO4J_USER}:${NEO4J_PASSWORD}`)
  
  const response = await fetch(`${NEO4J_URI.replace('neo4j+s://', 'https://')}/db/data/transaction/commit`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      statements: [{
        statement: query,
        parameters: parameters
      }]
    })
  })
  
  if (!response.ok) {
    throw new Error(`Neo4j query failed: ${response.statusText}`)
  }
  
  return await response.json()
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("🔗 Processing Neo4j bridge request...")
    
    const { query, params = {} } = await req.json()
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Cypher query is required' }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    console.log(`📝 Cypher Query: ${query.substring(0, 100)}...`)
    console.log(`📊 Parameters:`, Object.keys(params))

    // Execute the Cypher query
    const result = await executeNeo4jQuery(query, params)
    
    if (result.errors && result.errors.length > 0) {
      console.error("❌ Neo4j errors:", result.errors)
      return new Response(JSON.stringify({ error: result.errors[0].message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    // Extract and format results
    const records = result.results[0]?.data || []
    console.log(`✅ Query executed successfully, ${records.length} records returned`)

    return new Response(JSON.stringify({
      success: true,
      records: records,
      metadata: {
        query_time: new Date().toISOString(),
        record_count: records.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('💥 Neo4j bridge error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Graph database query failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

console.log("🚀 Neo4j Knowledge Graph Bridge Ready!")