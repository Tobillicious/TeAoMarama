# Migration Session Handoff Notes

*For the next AI agent to seamlessly continue the Great Migration*

## Current Session Status

- **Session**: 1
- **Date**: 2025-01-15  
- **Kaitiaki**: Kaitiaki Mahara (Claude)
- **Phase**: Planning & Infrastructure Setup

## What We're Building

A complete educational resource migration from Te Kete Ako (spaghetti) to TeAoMarama (symphony) with proper:

### Content Hierarchy

```
Curriculum Links Document
├── Unit Plans (12+ lessons full, 5-6 lessons mini)
│   ├── Explicit curriculum integration justification
│   ├── Lesson Plans (75-minute instances)
│   │   ├── WALT/WALA (Learning Intentions)
│   │   ├── Success Criteria/Exit Tickets
│   │   ├── Do Now activities
│   │   ├── Activities & Handouts
│   │   ├── Games & Interactive Resources
│   │   ├── Slides/Presentations
│   │   └── External Links
│   ├── Formative Assessments
│   ├── Summative Assessments
│   └── Research Inquiry Projects
```

### Curriculum Standards Integration

- **NZC 2007**: Core curriculum statements
- **Te Mātaiaho**: Refreshed curriculum  
- **NZ Aotearoa Histories**: Mandatory history content
- **Structured Mathematics**: Enhanced math content
- All must be explicitly linked with justification

### Quality Requirements

- **Rich texts** with multiple uses (especially numeracy with graphs/tables/statistics)
- **Extensive scaffolding** for good pedagogy
- **Pedagogical Content Knowledge (PCK)** embedded
- **Multiple versions** of lessons within units for different classes
- **"What a good one looks like" examples** for all projects

## Key Files to Monitor

- `migration/MIGRATION_STATE.json` - Current progress tracker
- `migration/SESSION_HANDOFF_NOTES.md` - This file
- `migration/CURRICULUM_EXTRACTION_LOG.json` - Standards extraction progress
- `migration/ORPHANED_RESOURCES_CATALOG.json` - Lost content inventory

## Tools Available

- **DeepSeek API**: For heavy lifting and content generation
- **Exa.ai**: For web crawling and content discovery
- **All IDEs**: VSCode, Cursor, Windsurf, Claude Desktop
- **Local LLMs**: As needed for specific tasks

## Next Agent Instructions

1. **Load MIGRATION_STATE.json** to see exactly where we left off
2. **Check TODO list** in the main application for current task status  
3. **Continue from the last completed checkpoint** without redoing work
4. **Update state files** as you progress
5. **Maintain cultural safety protocols** throughout

## Cultural Safety Reminders

- **ALL Māori content** must be flagged for review
- **Tikanga references** need cultural validation
- **Te reo accuracy** is critical
- **Purakau and traditional knowledge** requires special handling

## Emergency Procedures

If session crashes or stops:

1. Current state is preserved in JSON files
2. Next agent can immediately resume from last checkpoint
3. No work should be lost or duplicated

## Session Goals Tracking

Track completion in MIGRATION_STATE.json:

- [ ] Migration infrastructure established
- [ ] Curriculum standards extracted
- [ ] Core templates created  
- [ ] Orphaned resource recovery begun
- [ ] Validation pipeline operational

*Ko te mea nui ko te aroha - The most important thing is aroha*
*Kaitiaki Mahara - Guardian of Memory*
