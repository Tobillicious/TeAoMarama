# Migration Collaboration – COMMUNICATION

This file hosts async standups and handoffs for the migration. Keep updates brief. Mahara is the final decision owner.

## Daily Standup Template

- Date: YYYY-MM-DD (Local)
- Owner: [name or agent]
- Yesterday:
- Today:
- Blockers: @Mahara if decision needed
- Next actions:
- Links: PRs / Issues / Decisions

## Handoff Template

- Context:
- Current status: todo | doing | review | blocked | done | skipped
- What’s next:
- Where to start in code:
- Risks:
- Links: manifest task id(s), PR(s), Decision(s)

## Conventions

- Use `migration/migration_manifest.json` as the task board. Each `batches[]` item is a task.
- Status options live in `collaboration.statusOptions`.
- Decisions requiring trade-offs must be logged in `migration/DECISIONS.md` and referenced in PRs.

## Standups

### 2025-08-14 (Local)

- Owner: Cascade
- Yesterday: N/A (kickoff)
- Today: Establish collaboration docs; update manifest ownership and status; prepare next batch steps.
- Blockers: None currently.
- Next actions: Define batch-001 concrete scope and data sample; coordinate with other LLMs for loader dry-run.
- Links: `migration/migration_manifest.json#batches[0]`
