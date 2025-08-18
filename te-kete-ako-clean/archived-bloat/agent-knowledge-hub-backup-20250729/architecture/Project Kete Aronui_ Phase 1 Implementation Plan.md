### **Project Kete Aronui: Phase 1 Implementation Plan**

* **Version:** 1.1  
* **Date:** 28 July 2025  
* **Status:** Active  
* **Lead Agent:** Te Kete Ako

### **1.0 Objective**

The primary goal of Phase 1 is to establish a **Foundational Retrieval Augmented Generation (RAG) system** using our existing Supabase infrastructure. This phase will deliver immediate value by enabling a powerful semantic search feature across all lesson content. We will achieve this by converting lesson text into vector embeddings and using Supabase's pg\_vector extension to find and retrieve the most relevant content based on a user's query.

### **2.0 Supabase Schema & Setup**

This phase requires modifications to our Supabase database.

**2.1 Enable pg\_vector Extension**

The first step is to ensure the pg\_vector extension is enabled in Supabase. This can be done by running the following SQL command in the Supabase SQL Editor:

\-- Enable the pg\_vector extension  
CREATE EXTENSION IF NOT EXISTS vector;

**2.2 Create lesson\_embeddings Table**

We will create a new table to store the vector embeddings for our lesson content. This table will have a one-to-one relationship with the existing lessons table.

\-- Create the table to store lesson embeddings  
CREATE TABLE lesson\_embeddings (  
  id bigserial PRIMARY KEY,  
  lesson\_id bigint NOT NULL,  
  embedding vector(384), \-- Corresponds to the dimensions of the all-MiniLM-L6-v2 model  
  created\_at timestamptz DEFAULT now() NOT NULL,  
  CONSTRAINT fk\_lesson  
    FOREIGN KEY(lesson\_id)   
    REFERENCES lessons(id)  
    ON DELETE CASCADE  
);

### **3.0 Agent Task Breakdown**

#### **3.1 Data Agent: Data Ingestion and Embedding**

Your mission is to populate the lesson\_embeddings table. This is a one-time script that should be run, and then adapted to run whenever new lesson content is added.

**Task:** Create a Python script (embed\_lessons.py) that:

1. Connects to the Supabase database.  
2. Fetches the id and content of all lessons from the lessons table.  
3. For each lesson, generates a 384-dimension vector embedding using the sentence-transformers/all-MiniLM-L6-v2 model.  
4. Inserts the lesson\_id and its corresponding embedding into the lesson\_embeddings table.

\# embed\_lessons.py  
import os  
from supabase import create\_client, Client  
from sentence\_transformers import SentenceTransformer

\# 1\. Initialize Supabase client  
url: str \= os.environ.get("SUPABASE\_URL")  
key: str \= os.environ.get("SUPABASE\_SERVICE\_KEY")  
supabase: Client \= create\_client(url, key)

\# 2\. Load the embedding model  
model \= SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

\# 3\. Fetch all lessons  
response \= supabase.table('lessons').select('id, content').execute()  
if not response.data:  
    print("No lessons found.")  
    exit()

lessons \= response.data

\# 4\. Generate and insert embeddings  
for lesson in lessons:  
    lesson\_id \= lesson\['id'\]  
    content \= lesson\['content'\]  
      
    \# Generate embedding  
    embedding \= model.encode(content).tolist()  
      
    \# Insert into Supabase  
    supabase.table('lesson\_embeddings').insert({  
        'lesson\_id': lesson\_id,  
        'embedding': embedding  
    }).execute()  
      
    print(f"Embedding for lesson {lesson\_id} created and stored.")

print("All lessons have been embedded.")

#### **3.2 GraphRAG Agent: Create the Search Functionality**

Your task is to build the core logic that will perform the semantic search. This involves two parts: a Postgres function for the vector similarity search and a Supabase Edge Function to expose this to the web client.

Task 1: Create the match\_lessons SQL Function  
In the Supabase SQL Editor, create the following function. This function will efficiently calculate the cosine similarity between a query embedding and all lesson embeddings.  
\-- Supabase SQL function for semantic search  
CREATE OR REPLACE FUNCTION match\_lessons (  
  query\_embedding vector(384),  
  match\_threshold float,  
  match\_count int  
)  
RETURNS TABLE (  
  id bigint,  
  title text,  
  content text,  
  similarity float  
)  
LANGUAGE sql STABLE AS $$  
  SELECT  
    l.id,  
    l.title,  
    l.content,  
    1 \- (le.embedding \<=\> query\_embedding) as similarity  
  FROM lesson\_embeddings le  
  JOIN lessons l ON l.id \= le.lesson\_id  
  WHERE 1 \- (le.embedding \<=\> query\_embedding) \> match\_threshold  
  ORDER BY similarity DESC  
  LIMIT match\_count;  
$$;

Task 2: Create the find-similar-lessons Supabase Edge Function  
This Deno-based serverless function will be the public-facing API endpoint.  
// supabase/functions/find-similar-lessons/index.ts  
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'  
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'  
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.6.0'

const supabase \= createClient(  
  Deno.env.get('SUPABASE\_URL')\!,  
  Deno.env.get('SUPABASE\_ANON\_KEY')\!  
)

// Load the embedding model  
const extractor \= await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

serve(async (req) \=\> {  
  const { query } \= await req.json()

  // Generate embedding for the user's query  
  const output \= await extractor(query, { pooling: 'mean', normalize: true });  
  const query\_embedding \= Array.from(output.data);

  // Call the SQL function  
  const { data: lessons, error } \= await supabase.rpc('match\_lessons', {  
    query\_embedding,  
    match\_threshold: 0.7, // Adjust as needed  
    match\_count: 5  
  })

  if (error) {  
    return new Response(JSON.stringify({ error: error.message }), {  
      headers: { 'Content-Type': 'application/json' },  
      status: 500,  
    })  
  }

  return new Response(JSON.stringify(lessons), {  
    headers: { 'Content-Type': 'application/json' },  
  })  
})

#### **3.3 Frontend Agent: Implement the User Interface**

Your task is to connect the user-facing search bar to the new Edge Function and display the results.

**Task:** In your dashboard component, add a search input and a function to call the find-similar-lessons endpoint.

// Example in a React component  
import { createClient } from '@supabase/supabase-js'  
import { useState } from 'react'

const supabase \= createClient(process.env.NEXT\_PUBLIC\_SUPABASE\_URL, process.env.NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY)

function LessonSearch() {  
  const \[query, setQuery\] \= useState('')  
  const \[results, setResults\] \= useState(\[\])  
  const \[loading, setLoading\] \= useState(false)

  const handleSearch \= async () \=\> {  
    if (\!query.trim()) return  
    setLoading(true)  
      
    const { data, error } \= await supabase.functions.invoke('find-similar-lessons', {  
      body: { query },  
    })  
      
    if (error) {  
      console.error('Error searching:', error)  
    } else {  
      setResults(data)  
    }  
    setLoading(false)  
  }

  return (  
    \<div\>  
      \<input   
        type="text"   
        value={query}   
        onChange={(e) \=\> setQuery(e.target.value)}  
        placeholder="What do you want to learn about?"  
      /\>  
      \<button onClick={handleSearch} disabled={loading}\>  
        {loading ? 'Searching...' : 'Search'}  
      \</button\>

      \<div\>  
        {results.map((lesson) \=\> (  
          \<div key={lesson.id} className="recommendation-card"\>  
            \<h3\>{lesson.title}\</h3\>  
            \<p\>{lesson.content.substring(0, 100)}...\</p\>  
            \<p\>Relevance: {Math.round(lesson.similarity \* 100)}%\</p\>  
          \</div\>  
        ))}  
      \</div\>  
    \</div\>  
  )  
}

### **4.0 Success Criteria**

Phase 1 will be considered complete when:

1. All lesson content in the Supabase lessons table has a corresponding vector in the lesson\_embeddings table.  
2. The find-similar-lessons Edge Function is deployed and successfully returns a list of relevant lessons when queried.  
3. A user can type a query into the frontend, execute a search, and see the results displayed on the page.