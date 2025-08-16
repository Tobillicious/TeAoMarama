# Placeholders index — what to replace and where

This file lists every placeholder token used in the migration artifacts and where it appears.

## Common env placeholders

- `YOUR_FIREBASE_PROJECT_ID_STAGING`
  - Files: `migration_manifest.weaviate.json`
  - Meaning: Firebase staging project id. Replace with staging project id.

- `YOUR_FIREBASE_PROJECT_ID_PROD`
  - Files: `migration_manifest.weaviate.json`
  - Meaning: Firebase production project id.

- `YOUR_WEAVIATE_INSTANCE_URL`
  - Files: `migration_manifest.weaviate.json`, `weaviate_loader_example.ts`, `README_migration.md`
  - Meaning: The URL for your Weaviate instance (e.g., cloud.weaviate.io or host:port). Replace with full host (no trailing slash).

- `YOUR_WEAVIATE_API_KEY`
  - Files: `migration_manifest.weaviate.json`, `weaviate_loader_example.ts`, `README_migration.md`
  - Meaning: API key for Weaviate Cloud.

- `PATH_TO_SA_JSON` / `FIREBASE_SERVICE_ACCOUNT_JSON_PATH`
  - Files: `weaviate_loader_example.ts`, `pgvector_loader_example.ts`, `README_migration.md`
  - Meaning: Local path to Firebase service account JSON file used by firebase-admin.

- `YOUR_OPENAI_API_KEY` / `OPENAI_API_KEY`
  - Files: `weaviate_loader_example.ts`, `pgvector_loader_example.ts`, `README_migration.md`, `agents_prompts_short.md` (implied)
  - Meaning: API key used for embeddings if using OpenAI.

- `MIGRATION_ENV`
  - Files: `weaviate_loader_example.ts`, `pgvector_loader_example.ts`, `README_migration.md`
  - Meaning: `staging` or `prod`. Use `staging` for initial runs.

- `EMBEDDING_PROVIDER`
  - Files: `weaviate_loader_example.ts`, `pgvector_loader_example.ts`
  - Meaning: Which embedding provider to call (`openai`, `your-provider`). Update `getEmbedding()` to match.

### Postgres/pgvector (Supabase/Neon)

- `PG_URL` / `SUPABASE_DB_URL`
  - Files: `pgvector_loader_example.ts`, `README_migration.md`
  - Meaning: Postgres connection string (server-only). Example: `postgres://USER:PASSWORD@HOST:PORT/DBNAME`.

- `PGVECTOR_DIM`
  - Files: `pgvector_loader_example.ts`, `README_migration.md`
  - Meaning: Embedding vector dimension (e.g., 1536 for `text-embedding-3-small`). Must match table schema.

- `PGVECTOR_TABLE_RESOURCE_CHUNKS`
  - Files: `pgvector_loader_example.ts`, `README_migration.md`
  - Meaning: Table name for chunk storage with `vector` column. Default `resource_chunks`.

## File / Batch placeholders

- `batch-001-low-risk-lessons`
  - Files: `migration_manifest.weaviate.json`, `agents_prompts_short.md`
  - Meaning: Example batch id. Replace / extend batch definitions.

- `migration/sample_raw_exports.jsonl`
  - Files: `weaviate_loader_example.ts`, `pgvector_loader_example.ts`, `README_migration.md`
  - Meaning: Local sample JSONL path. Replace with actual sample file path.

## Schema / class names

- `TeAoMarama_Staging`, `TeAoMarama_Prod`
  - Files: `migration_manifest.weaviate.json`
  - Meaning: Prefix for Weaviate class names. Change only if you need a different namespace.

### Postgres schema files

- `migration/migration_manifest.pgvector.json`
  - Meaning: Env-separated config for pgvector stack (connection URL, dim, table names).
- `migration/pgvector_loader_example.ts`
  - Meaning: Example loader that writes canonical resources to Firestore and chunks+embeddings to Postgres (pgvector).

## Notes on replacements

- Use a secure vault (GitHub Secrets, Secrets Manager) for all API keys; do not commit secrets.
- After replacing placeholders, run a single-item dry-run (one resource) before scaling up.
- If you want me to populate these placeholders with concrete values, paste them here securely (or tell me the exact names to use) and I’ll regenerate the files.
