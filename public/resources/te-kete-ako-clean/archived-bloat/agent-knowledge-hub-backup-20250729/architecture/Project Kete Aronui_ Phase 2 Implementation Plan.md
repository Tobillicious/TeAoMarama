### **Project Kete Aronui: Phase 2 Implementation Plan**

* **Version:** 1.0  
* **Date:** 28 July 2025  
* **Status:** Active  
* **Lead Agent:** Te Kete Ako

### **1.0 Objective**

The goal of Phase 2 is to construct the **Knowledge Graph**. This involves moving beyond the text-based embeddings of Phase 1 to create a structured, interconnected web of our educational content. We will use a dedicated graph database (Neo4j) to model the explicit relationships between lessons, games, concepts, historical figures, and other key entities. This creates the "brain" of our system, enabling us to answer complex queries that rely on understanding connections, not just similarity.

### **2.0 Neo4j Schema & Setup**

This phase centers on our Neo4j AuraDB instance.

**2.1 Core Data Model (Ontology)**

We will begin with a simple but powerful data model. This can be expanded later.

* **Node Labels:**  
  * (:Lesson): Represents a single lesson plan. (e.g., "Algebra Basics")  
  * (:Game): Represents an interactive game. (e.g., "Equation Blaster")  
  * (:Concept): A fundamental idea or topic. (e.g., "Variable", "Tino Rangatiratanga")  
  * (:HistoricalFigure): A person of historical significance. (e.g., "Hone Heke")  
* **Relationship Types:**  
  * \[:TEACHES\]: Connects a (:Lesson) to a (:Concept).  
  * \[:REINFORCES\]: Connects a (:Game) to a (:Concept).  
  * \[:MENTIONS\]: Connects a (:Lesson) or (:Game) to a (:HistoricalFigure).  
  * \[:RELATED\_TO\]: Connects two (:Concept) nodes.

### **3.0 Agent Task Breakdown**

#### **3.1 Backend Agent: Establish the Graph Database**

Your first priority is to get the Neo4j instance ready for data ingestion.

**Task:**

1. Provision a new, free-tier Neo4j AuraDB instance.  
2. Securely store the connection URI, username, and password.  
3. Create a Supabase Edge Function named neo4j-bridge. This function will act as the single, secure gateway for all graph database operations. It will authenticate requests and execute Cypher queries against our Neo4j instance.

// supabase/functions/neo4j-bridge/index.ts  
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'  
import neo4j from 'https://deno.land/x/neo4j\_driver\_deno@v4.4.2/mod.ts';

const NEO4J\_URI \= Deno.env.get('NEO4J\_URI')\!;  
const NEO4J\_USER \= Deno.env.get('NEO4J\_USER')\!;  
const NEO4J\_PASSWORD \= Deno.env.get('NEO4J\_PASSWORD')\!;

const driver \= neo4j.driver(NEO4J\_URI, neo4j.auth.basic(NEO4J\_USER, NEO4J\_PASSWORD));

serve(async (req) \=\> {  
  const { query, params } \= await req.json();  
  const session \= driver.session();  
    
  try {  
    const result \= await session.run(query, params);  
    return new Response(JSON.stringify(result.records), {  
      headers: { 'Content-Type': 'application/json' },  
    });  
  } catch (error) {  
    return new Response(JSON.stringify({ error: error.message }), {  
      headers: { 'Content-Type': 'application/json' },  
      status: 500,  
    });  
  } finally {  
    await session.close();  
  }  
});

#### **3.2 Data Agent: Extract and Structure Knowledge**

Your mission is to extract the nodes and relationships from our raw lesson content and prepare them for the graph.

**Task:** Create a Python script (extract\_graph\_data.py) that:

1. Connects to Supabase and fetches all lesson content.  
2. Uses spaCy for Named Entity Recognition (NER) to identify entities like people (PERSON), organizations (ORG), and locations (GPE). These will become (:HistoricalFigure) nodes.  
3. Uses keyword matching and noun chunking to identify key (:Concept) nodes from a predefined list and from the text itself.  
4. Constructs a JSON object representing the nodes and relationships for each lesson.  
5. Sends this JSON object to the neo4j-bridge Edge Function to populate the graph.

\# extract\_graph\_data.py  
import os  
import json  
import spacy  
import requests  
from supabase import create\_client, Client

\# \--- Supabase and NLP Setup \---  
supabase\_url: str \= os.environ.get("SUPABASE\_URL")  
supabase\_key: str \= os.environ.get("SUPABASE\_SERVICE\_KEY")  
supabase: Client \= create\_client(supabase\_url, supabase\_key)  
nlp \= spacy.load("en\_core\_web\_sm")  
NEO4J\_BRIDGE\_URL \= f"{os.environ.get('SUPABASE\_URL')}/functions/v1/neo4j-bridge"

\# \--- Fetch Lessons \---  
response \= supabase.table('lessons').select('id, title, content').execute()  
lessons \= response.data

\# \--- Process Each Lesson \---  
for lesson in lessons:  
    doc \= nlp(lesson\['content'\])  
      
    \# Create the lesson node itself  
    cypher\_query \= "MERGE (l:Lesson {id: $lesson\_id, title: $title})"  
    params \= {"lesson\_id": lesson\['id'\], "title": lesson\['title'\]}  
    requests.post(NEO4J\_BRIDGE\_URL, json={"query": cypher\_query, "params": params})

    \# Extract and create HistoricalFigure nodes and relationships  
    for ent in doc.ents:  
        if ent.label\_ \== "PERSON":  
            cypher\_query \= """  
            MATCH (l:Lesson {id: $lesson\_id})  
            MERGE (p:HistoricalFigure {name: $name})  
            MERGE (l)-\[:MENTIONS\]-\>(p)  
            """  
            params \= {"lesson\_id": lesson\['id'\], "name": ent.text}  
            requests.post(NEO4J\_BRIDGE\_URL, json={"query": cypher\_query, "params": params})  
            print(f"Linked Lesson {lesson\['id'\]} to Figure {ent.text}")

    \# (Add similar logic for concepts, etc.)

print("Graph data extraction and loading complete.")

### **4.0 Success Criteria**

Phase 2 is complete when:

1. The Neo4j AuraDB instance is running and accessible via the neo4j-bridge Supabase Edge Function.  
2. The extract\_graph\_data.py script successfully parses lessons and populates the Neo4j database with (:Lesson), (:HistoricalFigure), and (:Concept) nodes, along with their corresponding relationships.  
3. We can run a simple Cypher query in the Neo4j console (e.g., MATCH (l:Lesson)-\[:MENTIONS\]-\>(p:HistoricalFigure) RETURN l.title, p.name LIMIT 10\) and see meaningful, connected data.