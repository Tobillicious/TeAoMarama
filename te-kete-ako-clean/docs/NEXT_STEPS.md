# NEXT STEPS - Te Kete Ako Development Roadmap
## Strategic Development Plan Post-Authentication Hotfix

### 🎯 Development Context
Following the successful authentication hotfix that standardized Supabase UMD loading, implemented singleton guards, resolved MIME type errors, and established consistent auth flow across all pages, Te Kete Ako is now positioned for advanced feature development.

---

## 🔐 Priority 1: Supabase TOTP Step-Up Authentication

### Implementation Overview
Add Time-based One-Time Password (TOTP) authentication as a second factor for enhanced security, particularly for teacher and admin accounts.

### Technical Requirements

#### Database Schema Extensions
```sql
-- Add TOTP support to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS totp_enabled BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS totp_secret TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS totp_backup_codes TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS totp_enrolled_at TIMESTAMP;

-- Create TOTP verification log table
CREATE TABLE IF NOT EXISTS public.totp_verifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    verification_method TEXT NOT NULL, -- 'totp', 'backup_code'
    success BOOLEAN NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.totp_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_totp_verifications" ON public.totp_verifications
    FOR ALL USING (auth.uid() = user_id);
```

#### Authentication Flow Enhancement
```javascript
// Extend TeKeteAuthSystem class (auth-enhanced.js)
class TeKeteAuthSystem {
    // ... existing methods ...
    
    async enableTOTP() {
        if (!this.isSignedIn()) throw new Error('User must be authenticated');
        
        // Generate TOTP secret
        const secret = this.generateTOTPSecret();
        
        // Update user profile
        const { error } = await this.supabase
            .from('profiles')
            .update({ 
                totp_secret: secret,
                totp_enabled: false // Enabled after verification
            })
            .eq('id', this.currentUser.id);
            
        if (error) throw error;
        
        return {
            secret,
            qrCodeUrl: this.generateQRCode(secret, this.currentUser.email)
        };
    }
    
    async verifyTOTPSetup(token) {
        const isValid = this.verifyTOTPToken(token);
        if (!isValid) throw new Error('Invalid TOTP code');
        
        // Generate backup codes
        const backupCodes = this.generateBackupCodes(10);
        
        // Enable TOTP
        const { error } = await this.supabase
            .from('profiles')
            .update({
                totp_enabled: true,
                totp_backup_codes: backupCodes,
                totp_enrolled_at: new Date().toISOString()
            })
            .eq('id', this.currentUser.id);
            
        if (error) throw error;
        
        return { backupCodes };
    }
    
    async signInWithTOTP(email, password, totpCode) {
        // Step 1: Standard authentication
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        // Step 2: Check if TOTP is required
        const { data: profile } = await this.supabase
            .from('profiles')
            .select('totp_enabled, totp_secret')
            .eq('id', data.user.id)
            .single();
            
        if (profile.totp_enabled) {
            // Step 3: Verify TOTP
            const isValidTOTP = this.verifyTOTPToken(totpCode, profile.totp_secret);
            
            if (!isValidTOTP) {
                await this.supabase.auth.signOut();
                throw new Error('Invalid TOTP code');
            }
            
            // Log verification
            await this.logTOTPVerification(data.user.id, 'totp', true);
        }
        
        return data;
    }
}
```

#### UI Implementation
```html
<!-- totp-setup.html -->
<div class="totp-setup-container">
    <h2>Enable Two-Factor Authentication</h2>
    <div id="qr-code-section">
        <p>Scan this QR code with your authenticator app:</p>
        <div id="qr-code-display"></div>
        <p>Or enter this secret manually: <code id="totp-secret"></code></p>
    </div>
    
    <form id="totp-verify-form">
        <label for="totp-code">Enter 6-digit code from your app:</label>
        <input type="text" id="totp-code" maxlength="6" pattern="[0-9]{6}" required>
        <button type="submit">Verify & Enable</button>
    </form>
    
    <div id="backup-codes" style="display: none;">
        <h3>Backup Recovery Codes</h3>
        <p>Save these codes in a secure location. Each can only be used once:</p>
        <ul id="backup-codes-list"></ul>
    </div>
</div>
```

#### Implementation Timeline
- **Week 1**: Database schema and backend functions
- **Week 2**: Frontend TOTP setup and verification UI
- **Week 3**: Integration with existing auth flow
- **Week 4**: Testing and security audit

---

## 📊 Priority 2: Student Dashboard MVP Development

### Dashboard Feature Overview
Create a comprehensive student learning dashboard that integrates with existing authentication and provides personalized learning analytics.

### Core Features

#### 1. Learning Progress Visualization
```javascript
// js/student-dashboard-enhanced.js
class StudentDashboardSystem {
    constructor() {
        this.progressData = null;
        this.learningGoals = [];
        this.completedActivities = [];
    }
    
    async loadDashboardData() {
        const userId = window.teKeteAuth.getCurrentUser().id;
        
        // Load progress data
        const { data: progress } = await this.supabase
            .from('student_progress')
            .select(`
                *,
                subject_progress(*),
                activity_completions(*),
                learning_goals(*)
            `)
            .eq('user_id', userId);
            
        this.progressData = progress;
        this.renderDashboard();
    }
    
    renderProgressChart() {
        // Integration with Chart.js or similar library
        const ctx = document.getElementById('progress-chart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'In Progress', 'Not Started'],
                datasets: [{
                    data: this.calculateProgressPercentages(),
                    backgroundColor: ['#4CAF50', '#FF9800', '#E0E0E0']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}
```

#### 2. Personalized Learning Paths
```sql
-- Database schema for learning paths
CREATE TABLE IF NOT EXISTS public.learning_paths (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    estimated_hours INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.learning_path_steps (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    learning_path_id UUID REFERENCES public.learning_paths(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    resource_type TEXT NOT NULL, -- 'lesson', 'handout', 'game', 'assessment'
    resource_id TEXT NOT NULL,
    is_required BOOLEAN DEFAULT true,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3. Achievement System
```html
<!-- Dashboard achievement section -->
<div class="achievements-section">
    <h3>🏆 Your Achievements</h3>
    <div class="achievement-grid">
        <div class="achievement-card earned">
            <span class="achievement-icon">📚</span>
            <h4>First Steps</h4>
            <p>Completed your first lesson</p>
            <small>Earned 3 days ago</small>
        </div>
        <div class="achievement-card progress">
            <span class="achievement-icon">🔥</span>
            <h4>Learning Streak</h4>
            <p>Learn for 7 days in a row</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 57%"></div>
            </div>
            <small>4/7 days complete</small>
        </div>
    </div>
</div>
```

### Implementation Phases

#### Phase 1: Core Dashboard (Weeks 1-2)
- User authentication integration
- Basic progress visualization
- Resource bookmark display
- Activity history timeline

#### Phase 2: Advanced Analytics (Weeks 3-4)
- Learning velocity tracking
- Subject-specific progress charts
- Time spent analytics
- Performance trend analysis

#### Phase 3: Personalization (Weeks 5-6)
- Adaptive learning path suggestions
- AI-powered content recommendations
- Difficulty adjustment based on performance
- Cultural preference integration

---

## 🧠 Priority 3: GraphRAG Refresh Plan

### Current GraphRAG Integration Status
Te Kete Ako has established GraphRAG foundations with DeepSeek integration and knowledge graph capabilities. The refresh plan focuses on expanding ingestion sources and improving semantic tagging.

### Ingestion Roots Expansion

#### 1. Multi-Source Content Ingestion
```python
# scripts/enhanced_graphrag_ingestion.py
class EnhancedGraphRAGIngestion:
    def __init__(self):
        self.ingestion_sources = {
            'nzc_curriculum': '/data/nzc.json',
            'te_marautanga': '/data/temataiaho.json',
            'digital_purakau': '/data/digital-purakau.json',
            'youtube_library': self.get_youtube_metadata(),
            'lesson_plans': self.scan_lesson_directory(),
            'handouts': self.scan_handout_directory(),
            'external_resources': self.load_external_apis()
        }
    
    async def ingest_curriculum_standards(self):
        """Ingest NZ Curriculum and Te Marautanga standards"""
        nzc_data = self.load_json_source('nzc_curriculum')
        
        for subject in nzc_data['learning_areas']:
            for level in subject['curriculum_levels']:
                node_data = {
                    'type': 'curriculum_standard',
                    'subject': subject['name'],
                    'level': level['number'],
                    'learning_objectives': level['objectives'],
                    'achievement_objectives': level['achievements'],
                    'cultural_context': level.get('te_ao_maori_context', [])
                }
                await self.create_knowledge_node(node_data)
    
    async def ingest_educational_resources(self):
        """Process all educational content for semantic relationships"""
        for lesson_file in self.get_lesson_files():
            lesson_content = await self.extract_lesson_content(lesson_file)
            
            # Extract semantic relationships
            relationships = await self.identify_relationships(lesson_content)
            
            # Create knowledge graph connections
            for rel in relationships:
                await self.create_semantic_relationship(
                    source=rel['source'],
                    target=rel['target'], 
                    relationship_type=rel['type'],
                    strength=rel['confidence']
                )
```

#### 2. Enhanced Tagging System
```python
class SemanticTaggingSystem:
    def __init__(self):
        self.cultural_taxonomy = {
            'te_ao_maori': {
                'whakapapa': ['genealogy', 'relationships', 'connections'],
                'kaitiakitanga': ['guardianship', 'environmental_care', 'sustainability'],
                'whakatohea': ['unity', 'collective_responsibility', 'community'],
                'manaakitanga': ['hospitality', 'care', 'support'],
                'whanaungatanga': ['kinship', 'family_connections', 'belonging']
            },
            'curriculum_areas': {
                'mathematics': ['numeracy', 'problem_solving', 'mathematical_thinking'],
                'science': ['inquiry', 'investigation', 'scientific_method'],
                'english': ['literacy', 'communication', 'language'],
                'social_sciences': ['society', 'culture', 'identity', 'place']
            },
            'cognitive_levels': {
                'remembering': ['recall', 'recognition', 'listing'],
                'understanding': ['explanation', 'interpretation', 'summarising'],
                'applying': ['implementation', 'demonstration', 'problem_solving'],
                'analysing': ['differentiation', 'organisation', 'attribution'],
                'evaluating': ['checking', 'assessment', 'critique'],
                'creating': ['design', 'construction', 'innovation']
            }
        }
    
    async def generate_semantic_tags(self, content):
        """Generate contextual tags using cultural and pedagogical frameworks"""
        tags = {
            'cultural_concepts': await self.identify_cultural_concepts(content),
            'curriculum_alignment': await self.map_to_curriculum(content),
            'cognitive_level': await self.assess_cognitive_complexity(content),
            'learning_objectives': await self.extract_learning_goals(content),
            'prerequisite_knowledge': await self.identify_prerequisites(content),
            'extension_opportunities': await self.suggest_extensions(content)
        }
        
        return tags
```

### Implementation Timeline
- **Week 1-2**: Enhanced ingestion pipeline development
- **Week 3-4**: Semantic tagging system implementation
- **Week 5-6**: Knowledge graph relationship mapping
- **Week 7-8**: Integration testing and optimization

---

## 🎯 Priority 4: Development Target Prioritization

### Immediate Development Targets (Next 4 Weeks)

#### High Impact, Low Effort
1. **Enhanced Error Messages** (2 days)
   - Culturally appropriate error messaging
   - Multi-language support (English/Te Reo Māori)
   - Context-sensitive help text

2. **Mobile Responsiveness Audit** (3 days)
   - Complete mobile authentication flow testing
   - Touch-friendly interface improvements
   - Progressive Web App enhancements

3. **Performance Monitoring** (2 days)
   - Real User Monitoring (RUM) implementation
   - Page load time tracking
   - Authentication performance metrics

#### Medium Impact, Medium Effort
4. **Advanced Search Integration** (1 week)
   - GraphRAG-powered semantic search
   - Cross-resource discovery
   - Personalized search results

5. **Collaborative Features** (1.5 weeks)
   - Student-teacher resource sharing
   - Collaborative learning spaces
   - Peer review capabilities

6. **Assessment Integration** (2 weeks)
   - Formative assessment tools
   - Progress tracking refinements
   - Learning analytics dashboard

### Medium-Term Targets (Weeks 5-12)

#### Educational Innovation
7. **AI Teaching Assistant** (3 weeks)
   - ChatGPT/DeepSeek integration for personalized help
   - Cultural context awareness
   - Adaptive questioning system

8. **Virtual Marae Experience** (4 weeks)
   - 3D cultural learning environment
   - Protocol learning modules
   - Interactive cultural scenarios

9. **Gamification System** (3 weeks)
   - Point-based progress system  
   - Cultural achievement badges
   - Leaderboards with cultural sensitivity

#### Technical Infrastructure  
10. **API Gateway Implementation** (2 weeks)
    - Rate limiting and security
    - API versioning strategy
    - Developer documentation

11. **Data Export/Import** (2 weeks)
    - Student portfolio export
    - Resource sharing between schools
    - GDPR compliance tools

12. **Advanced Analytics** (3 weeks)
    - Learning outcome prediction
    - Resource effectiveness analysis
    - Cultural engagement metrics

### Long-Term Vision (3-6 Months)

#### Scalability & Growth
- Multi-school deployment architecture
- Cloud infrastructure optimization
- International expansion preparation

#### Advanced AI Integration
- Custom LLM fine-tuning for Māori education
- Automated content generation
- Intelligent curriculum mapping

#### Community Features
- Parent/whānau engagement portals
- Community knowledge sharing
- Elder wisdom integration platform

---

## 🔄 Development Methodology

### Agile Sprints Structure
- **Sprint Duration**: 2 weeks
- **Sprint Planning**: Feature prioritization based on cultural impact and technical feasibility
- **Daily Standups**: Progress tracking with cultural sensitivity check-ins
- **Sprint Reviews**: Community stakeholder feedback integration
- **Retrospectives**: Continuous improvement with mātauranga Māori principles

### Quality Assurance Framework
- **Cultural Review**: All features reviewed by Māori education specialists
- **User Testing**: Regular testing with actual students and teachers
- **Security Audits**: Monthly security assessments
- **Performance Testing**: Continuous monitoring of system performance
- **Accessibility Testing**: WCAG 2.1 AA compliance verification

### Risk Management
- **Technical Risks**: Dependency management, API changes, scalability challenges
- **Cultural Risks**: Misrepresentation of Māori knowledge, inappropriate content
- **Educational Risks**: Pedagogical effectiveness, curriculum alignment
- **Operational Risks**: User adoption, teacher training, system reliability

---

This development roadmap positions Te Kete Ako for continued growth as New Zealand's premier culturally responsive educational platform, building on the solid authentication foundation to deliver transformative learning experiences that honor both innovation and cultural heritage.