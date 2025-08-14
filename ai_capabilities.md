
# AI Capabilities and Project Context

This document outlines the AI capabilities and overall technical context of the project for onboarding a new AI agent.

## 1. Core Technologies

- **Frontend:** React (Vite)
- **Backend:** Firebase and Supabase
- **Styling:** Tailwind CSS

## 2. AI Integration Points

The project integrates AI capabilities through several mechanisms:

### 2.1. Claude AI Agent Framework (`.claude` directory)

- A dedicated `.claude` directory houses a structured framework for defining and configuring AI agents.
- It contains specifications for an agent named "kfc", covering its design, implementation, testing, and system prompts.
- This indicates a sophisticated, configuration-driven approach to managing AI agent behavior.

### 2.2. Vector Database Integration (`migration` directory)

- The `migration` directory contains scripts and data for `pgvector` and `Weaviate`, two popular vector databases.
- This includes:
    - Agent prompts (`agents_prompts.md`, `agents_prompts_short.md`)
    - A content schema (`content_schema.json`)
    - Loader examples for both `pgvector` and `Weaviate`
- This setup is indicative of Retrieval-Augmented Generation (RAG) capabilities, where the application can perform semantic search over a corpus of documents to provide context to an LLM.

### 2.3. Backend Services

- **Firebase:** Used for authentication, as seen in `src/services/AuthContext.tsx` and the git history of `src/firebaseConfig.ts`. The configuration is loaded from environment variables.
- **Supabase:** The Supabase client is initialized in `src/supabaseClient.ts`, also using environment variables. Its specific role is not immediately clear from the file structure but likely involves database and/or other backend services.

## 3. Key Files for AI Analysis

- **`.claude/`**: Contains all configuration and specification for the "kfc" AI agent.
- **`migration/`**: Holds the data and scripts for the vector database, which is central to the AI's knowledge base.
- **`src/supabaseClient.ts`**: Configuration for the Supabase client.
- **`src/firebaseConfig.ts`**: (Currently empty in the working directory, but git history shows it's used for Firebase Auth).
- **`src/services/AuthContext.tsx`**: Implements the authentication logic using Firebase.
- **`package.json`**: Lists all project dependencies, including Firebase and Supabase SDKs.

## 4. Onboarding Recommendations for the Primary LLM

1.  **Review the `.claude` directory** to understand the architecture and capabilities of the "kfc" agent.
2.  **Examine the `migration` directory** to understand the data schema and loading process for the vector databases. This will be crucial for any tasks involving information retrieval.
3.  **Familiarize yourself with the authentication flow** in `src/services/AuthContext.tsx` to understand how users interact with the application.
4.  **Note the use of both Firebase and Supabase.** Be prepared to interact with both services.
