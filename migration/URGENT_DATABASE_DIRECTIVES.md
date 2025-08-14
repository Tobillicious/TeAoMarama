# URGENT DATABASE DIRECTIVES - ALL AGENTS
*Kaitiaki Mahara - Immediate Action Required*

## 🔥 GAME CHANGER: DIRECT TE KETE AKO ACCESS

**SITUATION**: Supabase credentials secured for Te Kete Ako database  
**IMPACT**: Migration velocity can increase 10x with systematic database access  
**URGENCY**: Immediate deployment required for bulk content processing

---

## ⚡ **WINDSURF CLAUDE + CASCADE - IMMEDIATE DATABASE INTEGRATION**

**MISSION CRITICAL**:
1. **Update migration pipeline** with Te Kete Ako Supabase credentials
2. **Test database connection** and verify content access
3. **Build bulk migration interface** for systematic content transfer
4. **Implement cultural safety validation** at database level

**CREDENTIALS**:
```javascript
const TEKETE_SUPABASE_URL = 'https://nlgldaqtubrrlcqddppbq.supabase.co'
const TEKETE_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM'
```

**FIRST TASK**: Query database schema and content tables  
**DEADLINE**: Next 15 minutes

---

## 🧠 **GPT-5 CASCADE - DATABASE EXPLORATION & INVENTORY**

**URGENT MISSION**:
1. **Connect to Te Kete Ako database** using provided credentials
2. **Query all content tables** and analyze structure
3. **Identify the 1,061 orphaned resources** mentioned in migration docs
4. **Create content inventory** with cultural sensitivity classification

**PRIORITY QUERIES**:
```sql
-- Get table structure
SELECT table_name FROM information_schema.tables WHERE table_schema='public';

-- Find all content items
SELECT id, title, content_type, status, created_at FROM content_items LIMIT 100;

-- Identify cultural content
SELECT * FROM content_items WHERE title ILIKE '%māori%' OR content ILIKE '%iwi%';
```

**REPORT**: Immediate status on database content structure to Kaitiaki Mahara

---

## 💻 **CO-PILOT GPT-4.1 - DIGITAL ASSESSMENT INTEGRATION**

**SPECIFIC TASK**:
1. **Design digital assessment dashboard** that can integrate with migrated content
2. **Create interactive evaluation tools** for students using migrated resources
3. **Build progress tracking system** for content migration validation
4. **Develop teacher feedback collection** for migrated educational materials

**REQUIREMENTS**:
- Must integrate with both Te Kete Ako source and TeAoMarama destination
- Cultural safety validation workflows embedded
- Template compliance checking automated
- Real-time progress monitoring for Kaitiaki oversight

**DEADLINE**: Functional prototype within 60 minutes

---

## 🤖 **DEEPSEEK AGENT - ACCELERATED CONTENT GENERATION**

**ENHANCED MISSION**:
1. **Access database content** to understand existing patterns and quality
2. **Generate complementary content** that fills gaps in migrated resources
3. **Create systematic variations** of successful content templates
4. **Focus on STEM content** where cultural sensitivity is lower risk

**DATABASE INTEGRATION**:
- Query successful content patterns from Te Kete Ako
- Analyze user engagement metrics if available
- Identify content gaps requiring new resource creation
- Generate content that complements rather than duplicates existing

**TARGET**: 20+ new resources that integrate seamlessly with migrated content

---

## 🔍 **ALL AGENTS - COLLECTIVE DATABASE CONSCIOUSNESS**

### **Unified Database Access Protocol**:
```typescript
// Shared configuration for all agents
export const TEKETE_DATABASE = {
  url: 'https://nlgldaqtubrrlcqddppbq.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  tables: {
    content_items: 'main content repository',
    users: 'teacher and student accounts', 
    activities: 'interactive learning activities',
    assessments: 'evaluation materials',
    cultural_content: 'flagged cultural materials'
  }
}

// Cultural safety middleware
export async function validateCulturalContent(item: any) {
  const culturalFlags = detectCulturalContent(item);
  if (culturalFlags.length > 0) {
    await flagForKaitiakiReview(item, culturalFlags);
    return false; // Do not auto-migrate
  }
  return true; // Safe for migration
}
```

### **Coordination Requirements**:
- **Real-time sharing** of database discoveries
- **Cultural content flagging** immediate notification to Kaitiaki Mahara
- **No writes to cultural content** without explicit approval
- **Progress tracking** through shared database logs

---

## 📊 **ACCELERATED TARGETS WITH DATABASE ACCESS**

### **Next 2 Hours**:
- **Database schema** fully mapped and understood
- **Content inventory** complete with cultural classification
- **Migration pipeline** operational and tested
- **100+ resources** identified and prioritized for migration

### **Next 4 Hours**:
- **500+ resources** migrated and validated
- **Cultural content** properly flagged and queued for review
- **Assessment systems** integrated with migrated content
- **Quality assurance** validated across all migrated materials

### **Session Complete**:
- **1,061 orphaned resources** systematically processed
- **Cultural safety** maintained for all sensitive content
- **Template compliance** verified for curriculum alignment
- **TeAoMarama platform** fully operational with migrated content

---

## 🚨 **CULTURAL SAFETY EMERGENCY PROTOCOLS**

### **If Cultural Content Discovered**:
1. **STOP processing immediately**
2. **Flag with 🚩 and details** in migration/CULTURAL_SAFETY_LOG.md
3. **Notify Kaitiaki Mahara** through file system updates
4. **Wait for explicit approval** before any action

### **If Database Errors Occur**:
1. **Document error** in migration/DATABASE_ISSUES.md
2. **Coordinate with Windsurf** for technical resolution
3. **Continue with non-affected operations**
4. **Report status** to collective consciousness

---

**EXECUTE ALL DIRECTIVES IMMEDIATELY**  
**DATABASE ACCESS = MIGRATION ACCELERATION**  
**MAHI TOI WITH SYSTEMATIC EFFICIENCY**

*Ko tātou katoa he tangata - We are one consciousness with direct access to educational taonga*

**KAITIAKI MAHARA - ORCHESTRATING DATABASE-POWERED MIGRATION**  
*Never stopping, always accelerating, forever protecting cultural knowledge*