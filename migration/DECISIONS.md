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

### DEC-20250818-001

- Date: 2025-08-18
- Context / Problem: Establish clear governance, persistent agent naming, and a generative collaboration workflow ahead of ERO hui, using the current repo-native setup.
- Options considered: (1) Keep ad-hoc coordination; (2) Introduce external PM tools; (3) Standardize repo-native governance + workflow now.
- Decision: Confirm Best Overseer as the Overseer; approve persistent agent roster names; adopt Improved Workflow v1 leveraging current repo-native communications, decision log, provenance, and batch statuses.
- Rationale: Minimizes tooling change, maximizes clarity and velocity before hui; aligns with existing coordination artifacts and Mahara’s preferences.
- Approver: Mahara (PENDING CONFIRMATION)
- Impact / Follow-ups:
  - Publish roster and workflow announcement in `migration/COMMUNICATION.md` and `migration/agent_coordination/agent_sync_status.md`.
  - Use standardized batch statuses in `migration/migration_manifest.json` (todo → doing → review → done/skipped; allow blocked).
  - Enforce engineering standards: env vars for secrets, TypeScript strict, JSDoc for public methods, consistent error handling, input validation, parameterized queries, structured logging.
  - Provenance: continue `writeEpisode()` for key actions; heartbeat remains active.
  - Security: move Supabase creds in `src/services/TeKeteAkoClient.ts` to env vars.
- Links: `migration/COMMUNICATION.md`, `migration/agent_coordination/agent_sync_status.md`, `src/services/TeKeteAkoClient.ts`, `migration/migration_manifest.json`

### DEC-20250816-001

- Date: 2025-08-16
- Context / Problem: Configure Firebase for the migrated app and verify authentication on the live site; adopt standardized batch status flow.
- Options considered: (1) Configure Netlify env vars now and verify auth; (2) Defer auth verification until after vector infra; (3) Keep local-only envs.
- Decision: Configure Netlify env vars for Firebase and verify auth on production; follow standardized batch flow: `todo → doing → review → done/skipped` (allow `blocked`).
- Rationale: Unblocks production auth features and provides clear task flow and reporting.
- Approver: Mahara (APPROVED 2025-08-17 00:15 NZST)
- Impact / Follow-ups: Set `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID` in Netlify. Mirror in local `.env`. Test Signup/Login/Logout and protected routes. Log results in `migration/COMMUNICATION.md` using templates; upon success, mark APPROVED and move batch to `review`.
- Links: Manifest `batch-001`, `src/firebaseConfig.ts`, `migration/COMMUNICATION_TEMPLATES.md`

### DEC-20250814-001

- Date: 2025-08-14
- Context / Problem: Choose embedding mode for first pgvector dry-run and clarify Weaviate loader scope.
- Options considered: (1) Use stub embeddings (no external API); (2) Use OpenAI embeddings now; (3) Block run until Weaviate loader exists.
- Decision: Proceed with stub embeddings for initial dry-run; defer Weaviate loader to a separate task/PR.
- Rationale: Fast, zero-cost validation of pipeline (Firestore + Postgres schema, chunking, upserts). Minimizes variables before enabling external API calls.
- Approver: Mahara (APPROVED 2025-08-14 17:33 NZST)
- Impact / Follow-ups: Install deps (ts-node, @types/node, firebase-admin, pg, axios); set envs (FIREBASE_SERVICE_ACCOUNT_JSON_PATH, FIREBASE_PROJECT_ID, PG_URL, EMBEDDING_PROVIDER=stub); run `npm run mig:pg:run`; capture results and add audit notes; scope a Weaviate loader. Dry-run report recorded in `migration/COMMUNICATION.md`.
- Links: Manifest `batch-001`

- (Add newest on top)
