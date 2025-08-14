# Communication Templates

Use these snippets in `migration/COMMUNICATION.md` under Live Coordination.

## Template: Netlify Deploy Log

```
### Netlify Deploy — YYYY-MM-DDTHH:mm:ssZ
- URL: https://<your-site>.netlify.app
- Build ID: <build-id>
- Commit SHA: <sha>
- Result: ✅/❌
- Notes: <brief>
```

## Template: Weaviate Loader Report

```
### Weaviate Loader — YYYY-MM-DDTHH:mm:ssZ
Env:
- WEAVIATE_HOST: <redacted-host>
- WEAVIATE_CLASS: ResourceChunk
- Vectorizer: none
- EMBEDDING_PROVIDER: stub/openai
- DRY_RUN_NO_WEAVIATE: true/false

Command:
- DRY_RUN: `DRY_RUN_NO_WEAVIATE=true EMBEDDING_PROVIDER=stub npm run mig:weaviate:run`
- LIVE: `WEAVIATE_SCHEME=https WEAVIATE_HOST=*** WEAVIATE_API_KEY=*** WEAVIATE_CLASS=ResourceChunk EMBEDDING_PROVIDER=stub DRY_RUN_NO_WEAVIATE=false npm run mig:weaviate:run`

Results:
- Processed lines: <N>
- Inserted objects: <N> (LIVE) | 0 (DRY-RUN)
- Warnings: <any>
```

## Template: Pgvector Verification

```
### Pgvector Verify — YYYY-MM-DDTHH:mm:ssZ
- Query: SELECT COUNT(*) FROM resource_chunks;  -> <N>
- Notes: 18949 rows (last E2E baseline)
```
