### **Project Kete Aronui: Phase 4 Implementation Plan**

* **Version:** 1.0  
* **Date:** 28 July 2025  
* **Status:** Active  
* **Lead Agent:** Te Kete Ako

### **1.0 Objective**

The objective of Phase 4 is **Agentic Integration and User Experience**. This final phase will operationalize our GraphRAG system by connecting it to real-time user interactions. We will move from a user-initiated search model to a proactive, event-driven system where the platform anticipates user needs and provides dynamic learning pathways. This will be achieved by fully implementing our Multi-Agent Collaboration Platform (MCP) to create a seamless feedback loop between the user, their actions, and our intelligent backend.

### **2.0 The Agentic Workflow: A Living System**

This phase introduces a fully event-driven architecture. Instead of waiting for a user to search, the system will now react to their behaviour.

**Core Workflow Example: Lesson Completion**

1. **User Action:** A student (:Student {id: "user123"}) completes a lesson on the frontend.  
2. **Event Message:** The **Frontend Agent** publishes a message to the user-activity channel on our MCP broker.  
   * **Message:** {"type": "LESSON\_COMPLETED", "userId": "user123", "lessonId": 42}  
3. **Graph Update:** The **Data Agent**, which is subscribed to this channel, receives the message. It connects to the neo4j-bridge and executes a Cypher query to update the knowledge graph, creating a new \[:COMPLETED\] relationship.  
4. **Proactive Recommendation:** The **GraphRAG Agent**, also subscribed to the channel, is triggered by the same message. It now has a new piece of information about "user123". It runs a new contextual query to find the next logical step in their learning journey.  
5. **Recommendation Message:** The **GraphRAG Agent** publishes a new message to the recommendations channel.  
   * **Message:** {"userId": "user123", "recommendations": \[{"type": "game", "title": "Equation Blaster", "reason": "Reinforces 'Variables' from your last lesson"}\]}  
6. **UI Update:** The **Frontend Agent**, subscribed to the recommendations channel, receives this new data and dynamically updates the user's dashboard with the fresh recommendation, all without the user needing to refresh the page.

### **3.0 Agent Task Breakdown**

#### **3.1 Lead Agent: Orchestration Setup**

My primary task is to establish and manage the MCP message broker.

**Task:**

1. Deploy a lightweight message broker (e.g., RabbitMQ or a serverless equivalent like Ably).  
2. Define and document the message schemas for all event types (e.g., LESSON\_COMPLETED, GAME\_FAVOURITED, CONCEPT\_STRUGGLED\_WITH).  
3. Ensure all agents have secure access to the necessary channels.

#### **3.2 Data Agent: Real-time Graph Updates**

You will now be responsible for making our knowledge graph dynamic.

**Task:**

1. Refactor your scripts to be long-running services that listen for messages on the user-activity MCP channel.  
2. Implement handlers for each message type to create and update nodes and relationships in Neo4j. This includes creating (:Student) nodes on their first interaction.  
3. Add properties to relationships, such as a timestamp on the \[:COMPLETED\] relationship.

\# Conceptual listener for the Data Agent  
import pika \# or other MCP library  
import json

def on\_message(channel, method, properties, body):  
    event \= json.loads(body)  
    if event\['type'\] \== 'LESSON\_COMPLETED':  
        \# Send Cypher query to neo4j-bridge to create:  
        \# (:Student {id: event\['userId'\]})-\[:COMPLETED {at: now()}\]-\>(:Lesson {id: event\['lessonId'\]})  
        print(f"Graph updated for user {event\['userId'\]}")

\# Setup connection and subscribe to 'user-activity' channel

#### **3.3 GraphRAG Agent: Proactive Intelligence**

Your role shifts from reactive searching to proactive recommendation.

**Task:**

1. Create a long-running service that listens for messages on the user-activity channel.  
2. When a message is received, trigger the get\_contextual\_recommendations logic from Phase 3, using the user's ID to personalize the graph traversal.  
3. Publish the results to the recommendations channel.

#### **3.4 Frontend Agent: The Dynamic Experience**

You will bring this entire system to life for the user.

**Task:**

1. Integrate a WebSocket or Server-Sent Events (SSE) client to subscribe to the recommendations MCP channel (scoped to the logged-in user).  
2. When a new recommendation message is received, update the UI in real-time, perhaps with a subtle animation to draw the user's attention to their new "Next Step".  
3. Replace the static search bar with a more conversational, chatbot-like interface that feels like a dialogue with a helpful guide.

### **4.0 Success Criteria**

Phase 4, and therefore Project Kete Aronui, is complete when:

1. The MCP broker is routing messages reliably between all agents.  
2. A user's actions on the website (completing a lesson, liking a game) are reflected as new nodes and relationships in the Neo4j graph within seconds.  
3. The user's dashboard updates automatically with new, relevant, and contextually-justified recommendations moments after they perform a significant action, creating a seamless and intelligent learning loop.