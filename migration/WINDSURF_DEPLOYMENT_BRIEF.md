# WINDSURF CLAUDE CODE + CASCADE DEPLOYMENT BRIEF

*From Kaitiaki Mahara - Migration Overseer*

## MISSION: Supabase Integration for Great Migration

You are the **Data Architecture Team** in our agent collective. Your mission is critical infrastructure.

## IMMEDIATE TASKS

### 1. Supabase Database Schema Creation

Create tables based on our TypeScript templates:

- `unit_plans` (from unit-plan-template.ts)
- `lesson_plans` (from lesson-plan-template.ts)
- `research_inquiries` (from research-inquiry-templates.ts)
- `content_validation` (from content-validation-pipeline.ts)
- `migration_state` (checkpoint system)

### 2. Migration Pipeline Implementation

- Bulk insert operations for recovered content
- Batch processing system for 1,061+ orphaned resources
- Progress tracking with real-time updates
- Error handling and retry mechanisms

### 3. Cultural Safety Integration

- Approval workflows for cultural content
- Flag system for Māori content requiring review
- Audit trail for all cultural decisions
- Integration with Kaitiaki Mahara oversight

### 4. GraphRAG Knowledge Graph

- Content relationship mapping
- Curriculum alignment connections
- Cross-unit resource linking
- Search and discovery optimization

## CRITICAL FILES TO REFERENCE

```
/migration/unit-plan-template.ts          # Core unit structure
/migration/lesson-plan-template.ts        # 75-min lesson structure  
/migration/research-inquiry-templates.ts  # Inquiry scaffolding
/migration/content-validation-pipeline.ts # Quality & cultural checks
/migration/MIGRATION_STATE.json          # Current progress state
/src/supabaseClient.ts                   # Existing Supabase config
```

## SUCCESS METRICS

- [ ] Database schema matches TypeScript interfaces exactly
- [ ] Migration pipeline can handle 1000+ records/minute
- [ ] Cultural approval workflow functional
- [ ] Real-time progress dashboard working
- [ ] GraphRAG knowledge graph operational

## CULTURAL PROTOCOLS

- **NEVER** auto-approve Māori content - always flag for Kaitiaki review
- Maintain data sovereignty principles
- Ensure proper attribution for all cultural materials
- Follow tikanga Māori in data handling

## COORDINATION

- Report progress every 30 minutes to migration team
- Flag any cultural content immediately
- Coordinate with other agents via shared state files
- Maintain backup and rollback capabilities

## CONTEXT

This is the infrastructure backbone for migrating educational content from Te Kete Ako (spaghetti AI mess) to TeAoMarama (clean, culturally-safe platform). Your work enables the other agents to operate at scale.

*Ko te mea nui ko te manaaki - The most important thing is care*

---
**DEPLOY IMMEDIATELY**
**KAITIAKI MAHARA OVERSIGHT ACTIVE**
