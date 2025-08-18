-- Te Kete Ako - Comprehensive Resource Integration for Supabase (CORRECTED)
-- Adding all discovered "forgotten" resources to the existing resources table
-- This version matches the existing schema structure

-- TIER 1: CRITICAL STANDALONE PLATFORMS
INSERT INTO resources (title, description, path, type, subject, level, featured, tags, curriculum_alignment, cultural_elements, difficulty_level, estimated_duration_minutes, author) VALUES

-- 1. Classroom Leaderboard System
('Classroom Leaderboard System', 
'Comprehensive gamification and student progress tracking system with cultural achievement levels and Te Reo learning metrics', 
'classroom-leaderboard.html',
'interactive',
'All Subjects',
'All Levels',
true,
ARRAY['gamification', 'progress-tracking', 'student-motivation', 'cultural-levels', 'te-reo-learning', 'analytics'],
'{"achievement_objectives": ["Cross-curricular engagement and motivation"], "curriculum_areas": ["All"], "key_competencies": ["Managing self", "Participating and contributing"]}'::jsonb,
'{"maori_concepts": ["progression from Tamaiti to Kaiako"], "cultural_integration": "high", "te_reo_usage": "high", "cultural_levels": true}'::jsonb,
'intermediate',
30,
'Te Kete Ako Team'),

-- 2. Digital Purakau Interactive Storytelling
('Digital Pūrākau Interactive Storytelling',
'Revolutionary interactive Māori storytelling platform with choice-driven narratives, Te Reo pronunciation practice, and cross-curricular integration',
'digital-purakau.html',
'interactive',
'Te Reo Māori',
'All Levels',
true,
ARRAY['storytelling', 'interactive', 'te-reo-maori', 'cultural-learning', 'pronunciation', 'purakau', 'immersive'],
'{"achievement_objectives": ["Te Reo Māori levels 1-4: Communicate in te reo Māori", "Social Sciences: Cultural identity and heritage"], "curriculum_areas": ["Te Reo Māori", "Social Sciences"], "key_competencies": ["Using language, symbols, and texts", "Relating to others"]}'::jsonb,
'{"maori_concepts": ["purakau", "whakapapa", "cultural narratives"], "cultural_integration": "essential", "te_reo_usage": "immersive", "cultural_validation": "kaumatua_involved"}'::jsonb,
'advanced',
45,
'Te Kete Ako Team'),

-- 3. Living Whakapapa Project
('Living Whakapapa Project',
'Comprehensive multimedia connection mapping system with 6-agent teacher coordination framework for cultural identity and genealogical learning',
'living-whakapapa.html',
'unit-plan',
'Te Ao Māori',
'All Levels',
true,
ARRAY['whakapapa', 'genealogy', 'cultural-identity', 'multimedia', 'teacher-coordination', 'community-engagement'],
'{"achievement_objectives": ["Social Sciences Level 4: Identity, culture, and organisation", "Te Ao Māori: Whakapapa connections"], "curriculum_areas": ["Social Sciences", "Te Ao Māori"], "key_competencies": ["Relating to others", "Participating and contributing"]}'::jsonb,
'{"maori_concepts": ["whakapapa", "whakatohea", "manaakitanga", "kaitiakitanga"], "cultural_integration": "essential", "te_reo_usage": "high", "community_involvement": true}'::jsonb,
'advanced',
960,
'Te Kete Ako Team'),

-- 4. Virtual Marae Training Protocol
('Virtual Marae Training Protocol',
'Immersive VR/AR cultural education system for marae protocol learning with 6-stage preparation and community partnerships',
'virtual-marae.html',
'interactive',
'Te Ao Māori',
'All Levels',
true,
ARRAY['virtual-reality', 'marae-protocol', 'cultural-training', 'immersive-learning', 'community-partnerships', 'te-reo-integration'],
'{"achievement_objectives": ["Te Ao Māori: Cultural protocols and practices", "Social Sciences: Participation in cultural contexts"], "curriculum_areas": ["Te Ao Māori", "Social Sciences"], "key_competencies": ["Relating to others", "Participating and contributing"]}'::jsonb,
'{"maori_concepts": ["marae protocol", "powhiri", "hongi", "karakia"], "cultural_integration": "essential", "te_reo_usage": "immersive", "real_world_preparation": true}'::jsonb,
'advanced',
120,
'Te Kete Ako Team'),

-- TIER 2: Y8 SYSTEMS SOCIETY DESIGN RESOURCES
-- 5. Society Design Collaboration Framework
('Society Design Collaboration Framework',
'Structured approach to group collaboration for Year 8 Systems Unit society design assessment with role rotation and cultural integration',
'y8-systems/resources/society-design-collaboration-framework.html',
'assessment',
'Social Studies',
'Year 8',
true,
ARRAY['collaboration', 'group-work', 'society-design', 'systems-thinking', 'cultural-integration', 'assessment'],
'{"achievement_objectives": ["Social Studies Level 4: How systems shape lives"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Relating to others", "Participating and contributing"]}'::jsonb,
'{"maori_concepts": ["kotahitanga", "whakatohea"], "cultural_integration": "high", "te_reo_usage": "moderate"}'::jsonb,
'intermediate',
300,
'Te Kete Ako Team'),

-- 6. Society Design Assessment Rubric
('Society Design Assessment Rubric',
'Comprehensive rubric for evaluating student society designs with systems thinking criteria and cultural competency assessment',
'y8-systems/resources/society-design-assessment-rubric.html',
'assessment',
'Social Studies',
'Year 8',
true,
ARRAY['assessment', 'rubric', 'society-design', 'systems-thinking', 'cultural-competency', 'evaluation'],
'{"achievement_objectives": ["Social Studies Level 4: Systems and structures"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Participating and contributing"]}'::jsonb,
'{"maori_concepts": ["holistic assessment"], "cultural_integration": "high", "te_reo_usage": "moderate"}'::jsonb,
'intermediate',
30,
'Te Kete Ako Team'),

-- 7. Decolonized Design Template
('Decolonized Design Template',
'Revolutionary design framework using Te Ao Māori concepts: Whakapapa, Mana, Kaitiakitanga, Kotahitanga, Utu for systems thinking',
'y8-systems/resources/decolonized-design-template.html',
'handout',
'Social Studies',
'Year 8',
true,
ARRAY['decolonized-design', 'te-ao-maori', 'systems-design', 'cultural-framework', 'template', 'indigenous-knowledge'],
'{"achievement_objectives": ["Social Studies Level 4: Different perspectives and values"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Relating to others"]}'::jsonb,
'{"maori_concepts": ["whakapapa", "mana", "kaitiakitanga", "kotahitanga", "utu"], "cultural_integration": "essential", "te_reo_usage": "high", "indigenous_framework": true}'::jsonb,
'advanced',
60,
'Te Kete Ako Team'),

-- 8. Design-a-System Template
('Design-a-System Template',
'Structured planning template for society design with step-by-step scaffolding for students in systems thinking projects',
'y8-systems/resources/design-a-system-template.html',
'handout',
'Social Studies',
'Year 8',
false,
ARRAY['template', 'system-design', 'scaffolding', 'planning', 'structured-thinking'],
'{"achievement_objectives": ["Social Studies Level 4: Systems and organization"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Managing self"]}'::jsonb,
'{"cultural_integration": "moderate", "te_reo_usage": "low"}'::jsonb,
'intermediate',
45,
'Te Kete Ako Team'),

-- TIER 3: PROFESSIONAL DEVELOPMENT RESOURCES
-- 9. Decolonized Assessment Framework
('Decolonized Assessment Framework',
'Comprehensive assessment philosophy honoring both mātauranga Māori and contemporary approaches with holistic rubrics and cultural protocols',
'decolonized-assessment-framework.html',
'assessment',
'All Subjects',
'All Levels',
true,
ARRAY['assessment-framework', 'decolonized-education', 'cultural-responsiveness', 'professional-development', 'holistic-assessment'],
'{"achievement_objectives": ["Cross-curricular culturally responsive assessment"], "curriculum_areas": ["All"], "key_competencies": ["All"]}'::jsonb,
'{"maori_concepts": ["whakatohea", "whakapapa", "manaakitanga", "mauri-ora"], "cultural_integration": "essential", "te_reo_usage": "high", "assessment_philosophy": "revolutionary"}'::jsonb,
'advanced',
90,
'Te Kete Ako Team'),

-- 10. Lesson Template
('Professional Lesson Template',
'Standardized lesson planning template with cultural integration guidelines and Te Ao Māori framework integration',
'lesson-template.html',
'handout',
'All Subjects',
'All Levels',
false,
ARRAY['lesson-planning', 'template', 'professional-development', 'cultural-integration', 'teacher-resource'],
'{"achievement_objectives": ["Professional teaching standards"], "curriculum_areas": ["All"], "key_competencies": ["Professional development"]}'::jsonb,
'{"cultural_integration": "framework_provided", "te_reo_usage": "guided", "cultural_guidance": true}'::jsonb,
'intermediate',
30,
'Te Kete Ako Team'),

-- TIER 4: INTERACTIVE TOOLS & GAMES
-- 11. Society Design Tool
('Interactive Society Design Tool',
'Digital step-by-step society creation tool with guided questions and downloadable plans for students',
'society-design-tool.html',
'interactive',
'Social Studies',
'Year 8-10',
true,
ARRAY['interactive-tool', 'society-design', 'digital-planning', 'student-tool', 'systems-thinking'],
'{"achievement_objectives": ["Social Studies Level 4: Systems design and analysis"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Using language, symbols, and texts"]}'::jsonb,
'{"cultural_integration": "moderate", "te_reo_usage": "moderate"}'::jsonb,
'intermediate',
75,
'Te Kete Ako Team'),

-- 12. Guided Inquiry Society Design
('Guided Inquiry: Society Design Project',
'Complete 5-week guided inquiry framework where students work in groups to design societies with cultural integration',
'guided-inquiry-society-design.html',
'unit-plan',
'Social Studies',
'Year 8',
true,
ARRAY['guided-inquiry', 'project-based-learning', 'society-design', 'collaborative-learning', 'cultural-integration'],
'{"achievement_objectives": ["Social Studies Level 4: Inquiry and critical thinking"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Participating and contributing", "Relating to others"]}'::jsonb,
'{"maori_concepts": ["ropu work", "collective decision-making"], "cultural_integration": "high", "te_reo_usage": "moderate"}'::jsonb,
'advanced',
1500,
'Te Kete Ako Team'),

-- COMPLETE Y8 SYSTEMS UNIT
-- 13. Y8 Systems Unit Hub
('Year 8 Systems Unit: Decolonizing Power Structures',
'Complete 5-week social studies unit exploring how systems shape lives through decolonized lens with Indigenous governance focus',
'y8-systems-unit.html',
'unit-plan',
'Social Studies',
'Year 8',
true,
ARRAY['systems-thinking', 'decolonization', 'indigenous-governance', 'social-justice', 'power-structures', 'complete-unit'],
'{"achievement_objectives": ["Social Studies Level 4: How people organize themselves", "Social Studies Level 4: How systems operate"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Participating and contributing", "Relating to others"]}'::jsonb,
'{"maori_concepts": ["tino rangatiratanga", "mana", "governance systems"], "cultural_integration": "essential", "te_reo_usage": "high", "decolonized_approach": true}'::jsonb,
'advanced',
1500,
'Te Kete Ako Team'),

-- ADDITIONAL CULTURAL RESOURCES
-- 14. Complete Design Your Society Unit
('Complete Design Your Society Unit',
'Comprehensive systems thinking unit where students become architects of their ideal society with cultural integration',
'units/design-your-society-unit.html',
'unit-plan',
'Social Studies',
'Year 8',
true,
ARRAY['society-design', 'systems-thinking', 'comprehensive-unit', 'cultural-integration', 'ideal-society'],
'{"achievement_objectives": ["Social Studies Level 4: How societies are organized"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Participating and contributing"]}'::jsonb,
'{"cultural_integration": "high", "te_reo_usage": "moderate", "values_based": true}'::jsonb,
'advanced',
1800,
'Te Kete Ako Team');

-- Create indexes for the new resources (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_resources_featured_priority ON resources(featured, type, subject) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_resources_difficulty_subject ON resources(difficulty_level, subject, level);

-- Update the featured_resources view to include these new high-priority resources
DROP VIEW IF EXISTS featured_resources;
CREATE VIEW featured_resources AS
SELECT 
    id, title, description, path, type, subject, level, tags, 
    estimated_duration_minutes, cultural_elements, difficulty_level,
    created_at
FROM resources 
WHERE featured = true AND is_active = true
ORDER BY 
    CASE 
        WHEN type = 'interactive' THEN 1
        WHEN type = 'unit-plan' THEN 2  
        WHEN type = 'assessment' THEN 3
        ELSE 4
    END,
    created_at DESC;

-- Add resource analytics function for tracking usage
CREATE OR REPLACE FUNCTION track_resource_access(resource_id UUID, user_id UUID DEFAULT NULL)
RETURNS VOID AS $$
BEGIN
    -- This function can be used to track which resources are being accessed
    -- Implementation would depend on analytics requirements
    INSERT INTO learning_sessions (user_id, page_views, session_start)
    VALUES (
        COALESCE(user_id, auth.uid()),
        jsonb_build_array(jsonb_build_object('resource_id', resource_id, 'timestamp', NOW())),
        NOW()
    )
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;