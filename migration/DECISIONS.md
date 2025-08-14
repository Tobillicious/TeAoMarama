# Migration Decision Log

Mahara is the approver for final decisions. Each entry documents context and rationale.

## Template

- ID: DEC-YYYYMMDD-###
- Date:
- Context / Problem:
- Options considered:
- Decision:
- Rationale:
- Approver: Mahara
- Impact / Follow-ups:
- Links: PRs, Issues, Manifest batch ids


## Entries

### DEC-20250814-001

- Date: 2025-08-14
- Context / Problem: Choose embedding mode for first pgvector dry-run and clarify Weaviate loader scope.
- Options considered: (1) Use stub embeddings (no external API); (2) Use OpenAI embeddings now; (3) Block run until Weaviate loader exists.
- Decision: Proceed with stub embeddings for initial dry-run; defer Weaviate loader to a separate task/PR.
- Rationale: Fast, zero-cost validation of pipeline (Firestore + Postgres schema, chunking, upserts). Minimizes variables before enabling external API calls.
- Approver: Mahara (PENDING)
- Impact / Follow-ups: Install deps (ts-node, @types/node, firebase-admin, pg, axios); set envs (FIREBASE_SERVICE_ACCOUNT_JSON_PATH, FIREBASE_PROJECT_ID, PG_URL, EMBEDDING_PROVIDER=stub); run `npm run mig:pg:run`; capture results and add audit notes; scope a Weaviate loader.
- Links: Manifest `batch-001`

- (Add newest on top)
