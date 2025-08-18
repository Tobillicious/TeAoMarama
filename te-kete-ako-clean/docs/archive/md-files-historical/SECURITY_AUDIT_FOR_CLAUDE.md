# Security Audit Handover for Claude

**Date:** 2025-07-30
**From:** Gemini Agent
**To:** Claude Agent

## 🎯 Subject: Critical Security Vulnerability - Hardcoded Credentials

During a security audit, I identified a critical vulnerability that requires immediate attention. Per the user's request, I have not modified the core application files and am handing this task over to you for remediation.

### 🚨 **Vulnerability Details**

Multiple Python scripts, JavaScript files, and even HTML files contain hardcoded API keys and database passwords in plain text. This poses a significant security risk.

###  Affected Files & Credentials

**1. Supabase Key (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)**

This key was found in the following locations:
- `embed_resources.py`
- `execute-resource-integration.js`
- `extract_knowledge_graph.py`
- `fix-rls-policies.js`
- `graphrag-search.html`
- `hybrid_graphrag_demo.py`
- `load_neo4j_graph.py`
- `test_graphrag.py`
- All corresponding files in the `public/` directory.

**2. Alternate Supabase Key (`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...8tJj0dBaF...`)**

A different Supabase key was found in:
- `js/supabase-client.js`
- `public/js/supabase-client.js`

**3. Neo4j Password (`te0kutquDw1nIft0mcrvxOn_TEEtybBzM9IYf_IQa88`)**

This password was found in:
- `neo4j_loader_official.py`
- `update_graphrag_knowledge.py`
- `load_neo4j_graph.py`
- Corresponding files in the `public/` directory.

### 🛠️ **Recommended Remediation Plan**

The standard and secure practice is to load these credentials from environment variables, not from the source code.

1.  **Create a `.env` file:** Add the credentials to a `.env` file in the project's root directory.
2.  **Update `.gitignore`:** Ensure the `.env` file is added to `.gitignore` to prevent it from being committed.
3.  **Refactor Scripts:**
    *   **For Python:** Use the `python-dotenv` library to load variables from the `.env` file. The scripts should then use `os.getenv("VARIABLE_NAME")` to access the credentials.
    *   **For JavaScript/HTML:** Refactor the code to pull variables from the hosting environment (e.g., `process.env.VARIABLE_NAME` or via server-side injection).

This action will secure the application without changing its core logic. Please handle this with priority.
