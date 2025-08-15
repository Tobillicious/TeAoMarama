### **Project Kete Aronui: Phase 3 Implementation Plan**

* **Version:** 1.0  
* **Date:** 28 July 2025  
* **Status:** Active  
* **Lead Agent:** Te Kete Ako

### **1.0 Objective**

The objective of Phase 3 is to create a **Hybrid GraphRAG System**. This involves fusing the two powerful systems we built in the previous phases: the vector-based semantic search (Phase 1\) and the structured knowledge graph (Phase 2). By combining these, we can answer nuanced, multi-step questions that are impossible for either system to handle alone. This phase transitions us from a simple search engine to a true recommendation and discovery engine.

### **2.0 The Hybrid Retrieval Flow**

The core of this phase is a new, two-step retrieval process:

1. **Step 1: Semantic Search (The "What")**  
   * A user's natural language query (e.g., "How did Māori use stars to travel?") is first sent to our Supabase vector store.  
   * This initial search identifies the most semantically relevant (:Lesson) nodes that are *about* the user's query. These lessons act as the starting points, or "entry points," into our knowledge graph.  
2. **Step 2: Graph Traversal (The "How it Connects")**  
   * The system takes the IDs of the top lessons found in Step 1\.  
   * It then queries the Neo4j knowledge graph to explore the connections radiating from these entry points. For example:  
     * "What (:Concept) nodes are taught by these lessons?"  
     * "What (:Game) nodes reinforce these concepts?"  
     * "What other (:Lesson) nodes are related to these concepts, even if they use different keywords?"

This hybrid approach gives us both relevance (from vector search) and context (from the graph).

### **3.0 Agent Task Breakdown**

#### **3.1 GraphRAG Agent: Develop the Core Logic**

You are the lead for this phase. Your mission is to create the orchestrating function that combines the two data sources.

**Task:** Create a new, advanced Supabase Edge Function named get\_contextual\_recommendations.

1. This function will accept a user's text query.  
2. It will first invoke the find-similar-lessons function from Phase 1 to get the top 3-5 most relevant lessons.  
3. It will then extract the unique IDs of these lessons.  
4. It will construct a **Cypher query** to find related content. For example, to find games related to the concepts in the initial lessons, the query would be:  
   MATCH (lesson:Lesson)-\[:TEACHES\]-\>(concept:Concept)\<-\[:REINFORCES\]-(game:Game)  
   WHERE lesson.id IN $lessonIds  
   RETURN DISTINCT game.title AS title, game.url AS url, concept.name AS relatedConcept

5. This Cypher query and the list of lesson IDs will be sent to the neo4j-bridge function.  
6. Finally, the function will synthesize the results from both the initial vector search and the graph query into a single, rich JSON response that includes the initial lessons and the newly discovered related games.

// supabase/functions/get-contextual-recommendations/index.ts  
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'  
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabase \= createClient(  
  Deno.env.get('SUPABASE\_URL')\!,  
  Deno.env.get('SUPABASE\_ANON\_KEY')\!  
)

serve(async (req) \=\> {  
  const { query } \= await req.json();

  // 1\. Semantic Search (Phase 1\)  
  const { data: initialLessons, error: lessonError } \= await supabase.functions.invoke('find-similar-lessons', {  
    body: { query },  
  });

  if (lessonError || \!initialLessons || initialLessons.length \=== 0\) {  
    return new Response(JSON.stringify({ error: 'Could not find initial content.' }), { status: 500 });  
  }

  const lessonIds \= initialLessons.map((lesson: any) \=\> lesson.id);

  // 2\. Graph Traversal (Phase 2\)  
  const cypherQuery \= \`  
    MATCH (lesson:Lesson)-\[:TEACHES\]-\>(concept:Concept)\<-\[:REINFORCES\]-(game:Game)  
    WHERE lesson.id IN $lessonIds  
    RETURN DISTINCT game.title AS title, game.url AS url, concept.name AS relatedConcept  
    LIMIT 5  
  \`;  
    
  const { data: relatedGames, error: graphError } \= await supabase.functions.invoke('neo4j-bridge', {  
      body: { query: cypherQuery, params: { lessonIds } },  
  });

  // 3\. Synthesize Results  
  const response \= {  
    initialLessons: initialLessons,  
    recommendedGames: graphError ? \[\] : relatedGames.map((r: any) \=\> r.get('game')),  
  };  
    
  return new Response(JSON.stringify(response), {  
    headers: { 'Content-Type': 'application/json' },  
  });  
});

#### **3.2 Frontend Agent: Enhance the User Interface**

Your task is to present this new, richer data to the user.

**Task:**

1. Update the search functionality to call the new get\_contextual\_recommendations endpoint instead of the old one.  
2. Modify the results display area to handle the new response format. Create distinct sections for "Relevant Lessons" and "Related Games & Activities".  
3. Update the RecommendationCard component to clearly display why a resource is being recommended (e.g., "Related to the concept of 'Variables'").

### **4.0 Success Criteria**

Phase 3 is complete when:

1. The get\_contextual\_recommendations Edge Function is deployed and operational.  
2. A user can enter a query like "Māori protest movements".  
3. The system returns not only the primary lessons on that topic but also related content, such as a game about the Treaty of Waitangi or a lesson mentioning Hone Heke, demonstrating that the graph traversal is successfully enriching the initial semantic search results.