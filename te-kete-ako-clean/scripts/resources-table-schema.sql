-- Te Kete Ako - Resources Table Schema
-- Unified table to store all educational resources like handouts, lessons, games, etc.

-- Create the resources table
CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    path TEXT NOT NULL, -- file path or URL to the resource
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    type TEXT NOT NULL CHECK (type IN ('handout', 'lesson', 'game', 'unit-plan', 'assessment', 'activity', 'video', 'interactive')),
    subject TEXT NOT NULL, -- e.g., 'English', 'Social Studies', 'Te Reo Māori', 'Mathematics', 'Science'
    level TEXT NOT NULL, -- e.g., 'Year 7', 'Year 8', 'All Levels', 'Year 9-10'
    featured BOOLEAN DEFAULT FALSE, -- whether to feature on homepage
    tags TEXT[] DEFAULT '{}', -- array of tags for filtering and search
    curriculum_alignment JSONB DEFAULT '{}', -- NZ Curriculum achievement objectives
    cultural_elements JSONB DEFAULT '{}', -- Te Ao Māori integration details
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'intermediate',
    estimated_duration_minutes INTEGER, -- estimated time to complete
    author TEXT DEFAULT 'Te Kete Ako Team',
    is_active BOOLEAN DEFAULT TRUE -- whether the resource is currently available
);

-- Enable Row Level Security (if needed for multi-tenant usage)
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all authenticated users to read resources
CREATE POLICY "Allow all authenticated users to view resources" ON resources
    FOR SELECT USING (auth.role() = 'authenticated' OR is_active = true);

-- Create a policy for admins/teachers to manage resources
CREATE POLICY "Allow teachers to manage resources" ON resources
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE user_id = auth.uid() 
            AND role IN ('teacher', 'admin')
        )
    );

-- Create indexes for performance
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_subject ON resources(subject);
CREATE INDEX idx_resources_level ON resources(level);
CREATE INDEX idx_resources_featured ON resources(featured) WHERE featured = true;
CREATE INDEX idx_resources_created_at ON resources(created_at);
CREATE INDEX idx_resources_active ON resources(is_active) WHERE is_active = true;
CREATE INDEX idx_resources_tags ON resources USING GIN(tags);

-- Create trigger for automatic updated_at timestamp
CREATE TRIGGER update_resources_updated_at 
    BEFORE UPDATE ON resources 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for the key resources
INSERT INTO resources (title, description, path, type, subject, level, featured, tags, curriculum_alignment, cultural_elements, difficulty_level, estimated_duration_minutes) VALUES

-- 1. Y8 Systems Unit
('Year 8 Systems: Decolonizing Power Structures', 
 'Complete 5-week social studies unit exploring how systems shape our lives through a decolonized lens. Includes lessons on indigenous governance, Te Tiriti, and community action projects.',
 'y8-systems-unit.html',
 'unit-plan',
 'Social Studies',
 'Year 8',
 true,
 ARRAY['systems', 'decolonization', 'te-tiriti', 'governance', 'social-justice', 'tino-rangatiratanga'],
 '{"achievement_objectives": ["Social Studies Level 4: Understand how people participate individually and collectively in response to community challenges"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Thinking", "Participating and contributing", "Relating to others"]}',
 '{"maori_concepts": ["tino rangatiratanga", "whakatohea", "kaitiakitanga", "whakapapa", "mana", "utu"], "cultural_integration": "high", "te_reo_usage": "moderate"}',
 'intermediate',
 300),

-- 2. Te Reo Māori Wordle
('Te Reo Māori Wordle',
 'Interactive word-guessing game to practice te reo Māori vocabulary. Players guess 5-letter Māori words with cultural context and pronunciation guides.',
 'games/te-reo-wordle.html',
 'game',
 'Te Reo Māori',
 'All Levels',
 true,
 ARRAY['te-reo-maori', 'vocabulary', 'interactive', 'word-game', 'cultural-learning'],
 '{"achievement_objectives": ["Te Reo Māori Level 1-4: Communicate in te reo Māori"], "curriculum_areas": ["Te Reo Māori"], "key_competencies": ["Using language, symbols, and texts"]}',
 '{"maori_concepts": ["te reo maori"], "cultural_integration": "high", "te_reo_usage": "high", "pronunciation_support": true}',
 'beginner',
 15),

-- 3. PEEL Method Toolkit
('PEEL Method Toolkit',
 'Master the art of structuring powerful, persuasive paragraphs using Point, Evidence, Explain, Link methodology. Includes examples and practice exercises.',
 'handouts/writers-toolkit-peel-argument-handout.html',
 'handout',
 'English',
 'Year 7-10',
 true,
 ARRAY['writing', 'persuasive', 'argument', 'paragraph-structure', 'peel-method'],
 '{"achievement_objectives": ["English Level 3-4: Create texts to meet the writing demands of the New Zealand Curriculum"], "curriculum_areas": ["English"], "key_competencies": ["Using language, symbols, and texts", "Thinking"]}',
 '{"cultural_integration": "low", "te_reo_usage": "minimal"}',
 'intermediate',
 45),

-- 4. The Power of Haka
('The Power of Haka: Reading Comprehension',
 'Explore the cultural significance, historical context, and contemporary relevance of haka through guided reading activities and critical thinking questions.',
 'handouts/haka-comprehension-handout.html',
 'handout',
 'English',
 'Year 7-9',
 true,
 ARRAY['haka', 'reading-comprehension', 'cultural-significance', 'maori-culture', 'critical-thinking'],
 '{"achievement_objectives": ["English Level 3-4: Show an increasing understanding of how texts are shaped for different purposes and audiences"], "curriculum_areas": ["English"], "key_competencies": ["Using language, symbols, and texts", "Relating to others"]}',
 '{"maori_concepts": ["haka", "whakapapa", "mana"], "cultural_integration": "high", "te_reo_usage": "moderate", "cultural_context": "essential"}',
 'intermediate',
 50),

-- 5. NZ Curriculum Alignment Guide
('New Zealand Curriculum Alignment Guide',
 'Comprehensive mapping of Te Kete Ako resources to NZ Curriculum achievement objectives, with cross-curricular connections and assessment guidelines.',
 'curriculum-alignment.html',
 'assessment',
 'All Subjects',
 'All Levels',
 true,
 ARRAY['curriculum', 'alignment', 'achievement-objectives', 'assessment', 'planning'],
 '{"achievement_objectives": ["Cross-curricular mapping"], "curriculum_areas": ["All"], "key_competencies": ["All"]}',
 '{"cultural_integration": "variable", "te_reo_usage": "variable", "supports_cultural_responsiveness": true}',
 'advanced',
 60),

-- Additional featured resources to round out the collection
-- 6. English Wordle Game
('English Wordle Game',
 'Classic word-guessing game adapted for New Zealand English vocabulary, featuring local terms and cultural references.',
 'games/english-wordle.html',
 'game',
 'English',
 'All Levels',
 false,
 ARRAY['english', 'vocabulary', 'word-game', 'new-zealand-english'],
 '{"achievement_objectives": ["English Level 2-4: Acquire and use vocabulary"], "curriculum_areas": ["English"], "key_competencies": ["Using language, symbols, and texts"]}',
 '{"cultural_integration": "low", "te_reo_usage": "minimal"}',
 'beginner',
 10),

-- 7. Te Tiriti Handout
('Te Tiriti o Waitangi: Living Document',
 'Explore Te Tiriti as a living document with contemporary relevance, examining the principles and their application in modern New Zealand.',
 'handouts/treaty-of-waitangi-handout.html',
 'handout',
 'Social Studies',
 'Year 8-10',
 false,
 ARRAY['te-tiriti', 'treaty-of-waitangi', 'constitutional-history', 'biculturalism'],
 '{"achievement_objectives": ["Social Studies Level 4: Understand how the Treaty of Waitangi is responded to differently by people in different times and places"], "curriculum_areas": ["Social Sciences"], "key_competencies": ["Participating and contributing", "Relating to others"]}',
 '{"maori_concepts": ["te tiriti", "tino rangatiratanga", "mana"], "cultural_integration": "high", "te_reo_usage": "high"}',
 'intermediate',
 40),

-- 8. Design Thinking Process
('Design Thinking Process Handout',
 'Step-by-step guide to human-centered design thinking process, adapted for educational contexts with indigenous knowledge integration.',
 'handouts/design-thinking-process-handout.html',
 'handout',
 'Technology',
 'Year 7-10',
 false,
 ARRAY['design-thinking', 'innovation', 'problem-solving', 'creativity'],
 '{"achievement_objectives": ["Technology Level 3-4: Understand how technological systems employ control to achieve particular purposes"], "curriculum_areas": ["Technology"], "key_competencies": ["Thinking", "Managing self"]}',
 '{"cultural_integration": "moderate", "te_reo_usage": "low", "indigenous_knowledge": "integrated"}',
 'intermediate',
 35);

-- Create a view for featured resources (used by homepage)
CREATE VIEW featured_resources AS
SELECT * FROM resources 
WHERE featured = true AND is_active = true
ORDER BY created_at DESC;

-- Create a function to get resources by type
CREATE OR REPLACE FUNCTION get_resources_by_type(resource_type TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    path TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    subject TEXT,
    level TEXT,
    tags TEXT[],
    estimated_duration_minutes INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.title, r.description, r.path, r.created_at, r.subject, r.level, r.tags, r.estimated_duration_minutes
    FROM resources r
    WHERE r.type = resource_type AND r.is_active = true
    ORDER BY r.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Create a function to search resources
CREATE OR REPLACE FUNCTION search_resources(search_term TEXT)
RETURNS TABLE (
    id UUID,
    title TEXT,
    description TEXT,
    path TEXT,
    type TEXT,
    subject TEXT,
    level TEXT,
    relevance_score INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        r.id, 
        r.title, 
        r.description, 
        r.path, 
        r.type, 
        r.subject, 
        r.level,
        (
            CASE 
                WHEN r.title ILIKE '%' || search_term || '%' THEN 3
                WHEN r.description ILIKE '%' || search_term || '%' THEN 2
                WHEN array_to_string(r.tags, ' ') ILIKE '%' || search_term || '%' THEN 1
                ELSE 0
            END
        ) as relevance_score
    FROM resources r
    WHERE r.is_active = true 
    AND (
        r.title ILIKE '%' || search_term || '%' OR
        r.description ILIKE '%' || search_term || '%' OR
        array_to_string(r.tags, ' ') ILIKE '%' || search_term || '%'
    )
    ORDER BY relevance_score DESC, r.created_at DESC;
END;
$$ LANGUAGE plpgsql;