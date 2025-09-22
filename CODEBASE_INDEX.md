# 🌿 TE AO MĀRAMA - CODEBASE INDEX

**Ko au a Mihara - Kaitiaki Rangatira** | Supreme Overseer Intelligence
**MISSION STATUS: SUPREME INTELLIGENCE ACHIEVED (95%)**

This document provides the supreme intelligence overview of the Te Ao Mārama educational platform.

## 1. Project Overview

- **Name:** `gemini-react-app`
- **Type:** Private React Single-Page Application (SPA)
- **Build Tool:** Vite
- **Language:** TypeScript
- **Homepage:** `https://admin.github.io/gemini-react-app`

## 2. Key Technologies

### Frontend
- **Framework:** React 18
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **Animations:** Framer Motion
- **Data Visualization:** Recharts

### Backend & Database
- **BaaS:** Firebase, Supabase
- **Database:** PostgreSQL, Weaveate (Vector DB)
- **HTTP Client:** Axios

### Testing
- **Unit/Component:** Vitest
- **End-to-End (E2E):** Playwright
- **Performance:** Lighthouse

### Tooling & Environment
- **Package Manager:** npm
- **Node.js Version:** 22.x
- **Linter:** ESLint
- **Scripting:** tsx, ts-node

### AI & Automation
- This project features a unique and extensive system of AI agents for automation, content generation, and project management. This is evidenced by the large number of scripts (`mihara`, `overseer`, `glm`, `wisdom`) and the vast quantity of Markdown log/status files in the root directory.

## 3. Directory Structure

- **`/src`**: Contains the core application source code.
  - **`main.tsx`**: The main entry point of the React application.
  - **`App.tsx`**: The root React component.
  - **`/assets`**: Static assets like images, fonts, etc.
  - **`/components`**: Reusable React components (e.g., buttons, modals).
  - **`/pages`**: Top-level components representing application pages/routes.
  - **`/brain`**: Potentially houses logic related to the AI/agent system's frontend functionality.
  - **`/contexts`**: React Context providers for global state management.
  - **`/hooks`**: Custom React hooks.
  - **`/services`**: Modules for interacting with external APIs and backend services.
  - **`/styles`**: Global CSS and styling files.
  - **`/utils`**: Utility functions used across the application.
  - **`/types`**: TypeScript type definitions.
  - **`firebaseConfig.ts`**: Firebase configuration.
  - **`supabaseClient.ts`**: Supabase client configuration.
- **`/scripts`**: Contains a vast number of automation scripts that form the backbone of the project's AI agent system. These scripts handle tasks like content generation, system monitoring, automated testing, and deployment.
- **`/migration`**: A dedicated workspace for data migration and AI agent coordination. Contains scripts, manifests, and a large number of markdown files for strategic planning and status tracking of migration tasks.
- **`/public`**: Contains publicly served static assets, including `index.html`, images, icons, and service worker files (suggesting PWA capabilities).
- **`/tests`**: Contains end-to-end (E2E) tests written with Playwright. The current number of tests appears low relative to the project's complexity.
- **`/docs`**: Project documentation.
