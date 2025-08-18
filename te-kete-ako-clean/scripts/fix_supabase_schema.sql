-- Te Kete Ako Schema Completion - Final Evolution
-- Adds missing columns for full AI-powered adaptive learning

-- Enable vector extension (required for knowledge_vectors)
CREATE EXTENSION IF NOT EXISTS vector;

-- Add missing columns to profiles table for full AI functionality
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS knowledge_vectors vector(1536),
ADD COLUMN IF NOT EXISTS learning_style JSONB DEFAULT '{"modality": "mixed", "pace": "moderate", "preferences": []}',
ADD COLUMN IF NOT EXISTS last_handoff_agent JSONB DEFAULT '{"agent": null, "timestamp": null, "context": null}';

-- Create indexes for optimal AI performance
CREATE INDEX IF NOT EXISTS idx_knowledge_vectors 
ON profiles USING ivfflat (knowledge_vectors vector_cosine_ops) 
WITH (lists = 100);

CREATE INDEX IF NOT EXISTS idx_learning_style 
ON profiles USING gin (learning_style);

-- Update existing profiles with default values
UPDATE profiles 
SET learning_style = '{"modality": "mixed", "pace": "moderate", "preferences": []}'
WHERE learning_style IS NULL;

UPDATE profiles 
SET last_handoff_agent = '{"agent": "claude", "timestamp": "' || NOW() || '", "context": "schema_completion"}'
WHERE last_handoff_agent IS NULL;

-- Verify schema completion
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;