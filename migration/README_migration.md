# TeAoMarama — Migration README (quick start)

This README explains how to run a safe migration batch from legacy TeKeteAko export into TeAoMarama Firestore + Weaviate.

## Preparation (one time)

1. Create a Firebase staging project and a service account key with Firestore write permission.
2. Create a Weaviate Cloud instance and API key (or use self-hosted). Ensure you can call the REST API.
3. Save secrets as environment variables or GitHub Actions secrets:
   - FIREBASE_SERVICE_ACCOUNT_JSON_PATH (path to local file for CLI)
   - FIREBASE_PROJECT_ID
   - WEAVIATE_INSTANCE_URL
   - WEAVIATE_API_KEY
   - OPENAI_API_KEY (if using OpenAI embeddings)
   - MIGRATION_ENV=staging

4. Place sample data file at `migration/sample_raw_exports.jsonl` (one JSON resource per line). Example element keys: `sourceUrl`, `canonicalUrl`, `title`, `summary`, `textBody`, `assets`, `curriculumCandidates`.

## Dry run (recommended)

1. Ensure env variables set locally.
2. Run:

```bash
node dist/weaviate_loader_example.js --sample migration/sample_raw_exports.jsonl
```

Watch Firestore `imports/` and `resources/` for created documents. Inspect Weaviate class objects.

## Full-run

1. Prepare a batch file (JSONL), validate sample outputs via the admin review UI.
2. Launch the loader on the batch.
3. Monitor logs and `imports/` collection for failures.
4. If > 10% of items flagged `skipped:true`, pause and review `migration/audit_report.json`.

## Backout plan

If something goes wrong, delete the `imports/*` documents for that batch and delete corresponding Firestore `resources/*` docs and Weaviate objects by id (use Weaviate delete endpoint).

Do not operate against production until staging batch(s) are validated.

## Manual review

Use `admin/ImportReviewPage.tsx` (skeleton provided separately) to accept/reject mappings. Approved items get `status: approved` in `imports/{id}`.

## Monitoring & KPIs

Track: % of resources with title, % with canonicalUrl, average chunks per resource, failed imports per batch.

Keep batch sizes small during early runs (50–200).

## pgvector setup (Supabase/Neon)

1. Create a Postgres instance (Supabase or Neon). Get the connection URL.
2. Set env vars (backend only):

```bash
PG_URL=postgres://USER:PASSWORD@HOST:PORT/DB
PGVECTOR_DIM=1536
PGVECTOR_TABLE_RESOURCE_CHUNKS=resource_chunks
```

3. Initialize schema (the loader runs this automatically, but you can run manually):

```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE IF NOT EXISTS resource_chunks (
  resource_id TEXT NOT NULL,
  chunk_index INT NOT NULL,
  text TEXT,
  source_url TEXT,
  embedding VECTOR(1536),
  PRIMARY KEY (resource_id, chunk_index)
);
-- Create IVFFLAT index (requires ANALYZE after initial load for best recall)
CREATE INDEX IF NOT EXISTS resource_chunks_embedding_idx
  ON resource_chunks USING ivfflat (embedding vector_cosine_ops);
```

4. Run loader:

```bash
npx ts-node migration/pgvector_loader_example.ts --sample migration/sample_raw_exports.jsonl
```

5. Query similar chunks (example):

```sql
SELECT resource_id, chunk_index, text
FROM resource_chunks
ORDER BY embedding <-> '[0.1, 0.2, ...]'::vector
LIMIT 10;
```
