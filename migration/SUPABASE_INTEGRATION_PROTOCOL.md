# SUPABASE INTEGRATION PROTOCOL
*Te Kete Ako → TeAoMarama Database Migration*

## 🔑 SECURE ACCESS CREDENTIALS

**Supabase Te Kete Ako Database**:
- **API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM`
- **Project Reference**: `nlgldaqtubrrlcqddppbq`
- **URL**: `https://nlgldaqtubrrlcqddppbq.supabase.co`

---

## 🎯 IMMEDIATE INTEGRATION TASKS

### 1. **DATABASE SCHEMA ANALYSIS**
```sql
-- Query existing Te Kete Ako structure
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;
```

### 2. **CONTENT MIGRATION PIPELINE**
```typescript
// Supabase client configuration
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nlgldaqtubrrlcqddppbq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
const supabase = createClient(supabaseUrl, supabaseKey)

// Migration interface
interface ContentMigration {
  source_id: string;
  content_type: 'handout' | 'activity' | 'game' | 'assessment';
  original_data: any;
  migrated_data: any;
  cultural_flags: string[];
  migration_status: 'pending' | 'processing' | 'completed' | 'needs_review';
}
```

### 3. **CULTURAL SAFETY VALIDATION**
```typescript
// Cultural content identification
interface CulturalContentFlag {
  content_id: string;
  flag_type: 'maori_content' | 'pacific_content' | 'traditional_knowledge';
  risk_level: 'low' | 'medium' | 'high' | 'requires_iwi_consultation';
  reviewer_required: boolean;
  kaitiaki_approved: boolean;
}
```

---

## 📊 MIGRATION COORDINATION

### **WINDSURF CLAUDE + CASCADE INTEGRATION**
**Task**: Implement Supabase client in migration pipeline
**Code**: Update `/migration/pgvector_loader_example.ts` with Te Kete Ako credentials
**Test**: Verify connection and basic CRUD operations

### **GPT-5 CASCADE ARCHIVE ACCESS**
**Task**: Query existing Te Kete Ako content structure
**Priority**: Identify 1,061 orphaned resources in database
**Output**: Content inventory with cultural sensitivity classification

### **COLLECTIVE DATABASE OPERATIONS**
- **Read Access**: All agents can query content for migration
- **Write Access**: Only through Kaitiaki Mahara approval for cultural content
- **Validation**: Every database operation logged for cultural safety

---

## 🛡️ CULTURAL SAFETY PROTOCOLS

### **Database Content Rules**:
1. **NO direct writes** to cultural content without Kaitiaki review
2. **ALL mātauranga Māori** flagged before migration
3. **Traditional knowledge** requires iwi consultation before transfer
4. **Attribution preserved** for all cultural sources

### **Migration Validation Pipeline**:
```sql
-- Cultural content identification query
SELECT content_id, title, content_type, cultural_tags
FROM content_items 
WHERE cultural_tags @> '["maori_content"]'
   OR cultural_tags @> '["traditional_knowledge"]'
   OR title ILIKE '%māori%'
   OR title ILIKE '%iwi%'
   OR title ILIKE '%tangata whenua%';
```

---

## ⚡ IMMEDIATE EXECUTION PLAN

### **Next 30 Minutes**:
1. **Windsurf**: Integrate Supabase credentials into migration pipeline
2. **GPT-5**: Query Te Kete Ako database for content inventory
3. **Kaitiaki Mahara**: Validate database access and cultural safety protocols
4. **All Agents**: Begin systematic content assessment and priority ranking

### **Database Migration Targets**:
- **Phase 1**: Low-risk content (mathematics, basic science) - 200 items
- **Phase 2**: Medium-risk content (NZ contexts, non-Māori cultural) - 500 items  
- **Phase 3**: High-risk content (mātauranga Māori, traditional knowledge) - 361 items

### **Quality Assurance**:
- Every migrated item validated against templates
- Cultural content reviewed by appropriate advisors
- Attribution and source information preserved
- Student learning outcomes verified

---

## 📈 ACCELERATION THROUGH DATABASE ACCESS

**Immediate Benefits**:
- **Direct access** to 1,061 orphaned resources
- **Systematic processing** through database queries
- **Cultural content identification** automated
- **Bulk migration** capabilities unlocked

**Production Velocity**:
- Target: **100+ resources/hour** with database automation
- Quality: **100% template compliance** through systematic validation
- Safety: **100% cultural review** for sensitive content
- Efficiency: **Parallel processing** across multiple agents

---

**MAHI TOI - DATABASE-POWERED EXCELLENCE**

*With direct Te Kete Ako access, our collective consciousness can now migrate at unprecedented velocity while maintaining absolute cultural safety*

**KAITIAKI MAHARA - ORCHESTRATING ACCELERATED MIGRATION**