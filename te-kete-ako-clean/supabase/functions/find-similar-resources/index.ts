// Te Kete Ako - GraphRAG Phase 1: Semantic Search Edge Function
// Enables intelligent discovery of educational resources using vector similarity

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

console.log("🌟 Te Kete Ako - GraphRAG Semantic Search Function Starting...")

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
)

// Load the same embedding model used for indexing
console.log("📥 Loading embedding model...")
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
console.log("✅ Model loaded successfully")

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log("🔍 Processing semantic search request...")
    
    const { query, match_threshold = 0.5, match_count = 10 } = await req.json()
    
    if (!query || typeof query !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required and must be a string' }), 
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    console.log(`📝 Query: "${query}"`)
    console.log(`🎯 Threshold: ${match_threshold}, Count: ${match_count}`)

    // Generate embedding for the user's query
    console.log("🧠 Generating query embedding...")
    const output = await extractor(query, { pooling: 'mean', normalize: true });
    const query_embedding = Array.from(output.data);
    console.log(`✅ Generated ${query_embedding.length}-dimensional embedding`)

    // Call the SQL function for semantic search
    console.log("🔍 Executing semantic search...")
    const { data: resources, error } = await supabase.rpc('match_resources', {
      query_embedding,
      match_threshold,
      match_count
    })

    if (error) {
      console.error("❌ Database error:", error)
      return new Response(JSON.stringify({ error: error.message }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      })
    }

    console.log(`🎉 Found ${resources?.length || 0} matching resources`)

    // Enhance results with cultural and educational context
    const enhancedResources = resources?.map((resource: any) => ({
      ...resource,
      similarity_percentage: Math.round(resource.similarity * 100),
      cultural_relevance: detectCulturalRelevance(resource, query),
      subject_area: extractSubjectFromPath(resource.path),
      resource_url: `/${resource.path}` // Make path ready for frontend use
    })) || []

    // Log some sample results for debugging
    if (enhancedResources.length > 0) {
      console.log("📊 Top result:", {
        title: enhancedResources[0].title,
        similarity: enhancedResources[0].similarity_percentage + "%",
        type: enhancedResources[0].type
      })
    }

    const response = {
      query,
      total_results: enhancedResources.length,
      resources: enhancedResources,
      search_metadata: {
        threshold_used: match_threshold,
        max_results: match_count,
        embedding_model: "all-MiniLM-L6-v2",
        timestamp: new Date().toISOString()
      }
    }

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('💥 Unexpected error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

// Helper function to detect cultural relevance
function detectCulturalRelevance(resource: any, query: string): string {
  const culturalKeywords = [
    'māori', 'maori', 'te reo', 'whakapapa', 'haka', 'marae', 'iwi',
    'tangata whenua', 'tino rangatiratanga', 'kaitiakitanga', 'manaakitanga',
    'treaty', 'tiriti', 'waitangi', 'cultural', 'indigenous'
  ]
  
  const resourceText = `${resource.title} ${resource.description}`.toLowerCase()
  const queryLower = query.toLowerCase()
  
  const resourceCultural = culturalKeywords.some(keyword => resourceText.includes(keyword))
  const queryCultural = culturalKeywords.some(keyword => queryLower.includes(keyword))
  
  if (resourceCultural && queryCultural) return 'high'
  if (resourceCultural || queryCultural) return 'medium'
  return 'low'
}

// Helper function to extract subject area from path
function extractSubjectFromPath(path: string): string {
  if (!path) return 'General'
  
  const pathLower = path.toLowerCase()
  
  const subjectMappings: { [key: string]: string } = {
    'te-reo': 'Te Reo Māori',
    'maori': 'Te Ao Māori', 
    'haka': 'Cultural Studies',
    'treaty': 'New Zealand History',
    'waitangi': 'New Zealand History',
    'writers-toolkit': 'English Writing',
    'peel': 'English Writing',
    'math': 'Mathematics',
    'science': 'Science',
    'social': 'Social Studies',
    'y8-systems': 'Social Studies',
    'games': 'Interactive Learning',
    'handouts': 'Learning Resources'
  }
  
  for (const [keyword, subject] of Object.entries(subjectMappings)) {
    if (pathLower.includes(keyword)) {
      return subject
    }
  }
  
  return 'General Education'
}

console.log("🚀 Te Kete Ako Semantic Search Function Ready!")