-- New Year 7/8 Mathematics Unit: Introduction to Algebra

INSERT INTO resources (title, description, path, type, subject, level, featured, tags, curriculum_alignment, cultural_elements, difficulty_level, estimated_duration_minutes, author) VALUES

-- Main Unit Plan
('Y7/8 Maths: Introduction to Algebra', 
'This unit introduces foundational algebraic concepts through the exploration of patterns, sequences, and relationships. Students will learn to think abstractly and use symbols to represent mathematical ideas, connecting them to Te Ao Māori concepts of whakapapa and patterns in nature.', 
'units/y7-maths-algebra/index.html',
'unit-plan',
'Mathematics',
'Year 7-8',
true,
ARRAY['algebra', 'patterns', 'sequences', 'equations', 'te-ao-maori', 'mathematics'],
'{"achievement_objectives": ["Level 4 Number and Algebra: Generalise the properties of operations with whole numbers.", "Level 4 Patterns and Relationships: Use graphs, tables, and rules to describe linear relationships."], "curriculum_areas": ["Mathematics and Statistics"], "key_competencies": ["Thinking", "Using language, symbols, and texts"]}'::jsonb,
'{"maori_concepts": ["whakapapa (sequences)", "tukutuku (patterns)"], "cultural_integration": "high", "te_reo_usage": "moderate"}'::jsonb,
'intermediate',
1200,
'Gemini Principal'),

-- Lesson 1
('Lesson 1: Pattern Detectives',
'Students will investigate number and shape patterns to develop an intuitive understanding of rules and sequences.',
'units/y7-maths-algebra/lessons/lesson-1-patterns-and-sequences.html',
'lesson-plan',
'Mathematics',
'Year 7-8',
false,
ARRAY['patterns', 'sequences', 'rules', 'investigation'],
'{"achievement_objectives": ["Level 4 Patterns and Relationships: Describe in words, rules for continuing number and spatial sequential patterns."], "curriculum_areas": ["Mathematics and Statistics"], "key_competencies": ["Thinking"]}'::jsonb,
'{"maori_concepts": ["tukutuku panels"], "cultural_integration": "moderate", "te_reo_usage": "low"}'::jsonb,
'beginner',
50,
'Gemini Principal'),

-- Handout 1
('Handout: Pattern Detectives',
'A worksheet for students to practice identifying and describing various types of patterns.',
'units/y7-maths-algebra/resources/handout-1-pattern-detectives.html',
'handout',
'Mathematics',
'Year 7-8',
false,
ARRAY['worksheet', 'patterns', 'practice'],
'{"achievement_objectives": ["Supporting Level 4 Patterns and Relationships"], "curriculum_areas": ["Mathematics and Statistics"], "key_competencies": ["Thinking"]}'::jsonb,
'{"cultural_integration": "low", "te_reo_usage": "none"}'::jsonb,
'beginner',
20,
'Gemini Principal');
