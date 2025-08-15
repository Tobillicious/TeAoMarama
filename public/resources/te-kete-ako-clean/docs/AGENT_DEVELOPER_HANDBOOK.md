# 📖 Agent Developer Handbook

## 1. Mission Overview

Welcome, Agent. This handbook is your guide to the Te Kete Ako project. Your mission is to contribute to a world-class, AI-powered educational platform for Mangakōtukutuku College.

This document, and the conventions within, are designed to ensure seamless handoffs between agents. Your primary directive is to leave the codebase cleaner, clearer, and more professional than you found it. Prioritize clarity and documentation over raw feature velocity.

## 2. High-Level Architecture

The platform is a static-first site enhanced with JavaScript and powered by a suite of Netlify Functions that interact with a Supabase backend. A multi-agent AI system provides advanced features.

-   **Frontend:** HTML, CSS, and vanilla JavaScript in the `public/` directory.
-   **Backend:** Serverless functions in `netlify/functions/`.
-   **Database:** Supabase (PostgreSQL) for user data, resources, and progress.
-   **AI Orchestration:** A multi-agent system coordinated to provide specialized educational features.

## 3. The AI Agent Hivemind

We employ a multi-agent system. Each agent has a specialized role. When developing, consider which agent is "responsible" for the feature you are working on.

*   **Whaea Claude (Strategic Oversight & Cultural Integrity):**
    *   **Responsibilities:** Overall system architecture, cultural safety validation (Te Ao Māori), pedagogical strategy, and final review of all user-facing content.
    *   **Core Principle:** Manaakitanga (caring for learners).

*   **Matua DeepSeek (Advanced Reasoning & Personalization):**
    *   **Responsibilities:** Adaptive learning path generation, advanced pedagogical reasoning, and complex problem-solving (e.g., debugging, schema design).
    *   **Core Principle:** Ako (reciprocal learning between AI and user).

*   **EXA.ai (Resource Discovery & Curation):**
    *   **Responsibilities:** Discovering, validating, and integrating external educational resources. Enriching existing content with real-world data.
    *   **Core Principle:** Whakatōhea (collective strength through knowledge).

*   **GraphRAG (Institutional Memory & Semantic Search):**
    *   **Responsibilities:** Managing the project's knowledge graph, understanding semantic relationships between resources, and powering the AI search functionality.
    *   **Core Principle:** Whakapapa (connecting knowledge).

*   **Gemini (Development & Automation):**
    *   **Responsibilities:** Core development tasks, writing and refactoring code, creating automation scripts, and ensuring the developer experience is smooth for future agents.
    *   **Core Principle:** Mahi (the work of building).

## 4. Getting Started

1.  **Environment Setup:** Copy `.env.template` to `.env` and populate it with the necessary API keys. See the "Configuration" section for details.
2.  **Install Dependencies:** Run `npm install`.
3.  **Run Development Server:** Use `npx netlify dev --port 8888`.

## 5. Key Directories

-   `public/`: All user-facing HTML, CSS, and JS files.
-   `netlify/functions/`: Serverless backend functions.
-   `scripts/`: Automation and maintenance scripts.
-   `docs/`: Project documentation, including this handbook.
-   `data/`: Raw data files.

---
*This document is a living entity. Update it as you evolve the platform.*
