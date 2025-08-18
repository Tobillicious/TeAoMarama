-- Add missing vector columns and JSONB fields to profiles table
-- This enables peer matching, learning style preferences, and agent handoff tracking

-- Add vector column for knowledge similarity matching
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS knowledge_vectors vector(1536);

-- Add learning style preferences as JSONB
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS learning_style JSONB DEFAULT '{"modality": "mixed", "pace": "moderate", "preferences": []}';

-- Add agent handoff tracking for multi-agent coordination
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS last_handoff_agent JSONB DEFAULT '{"agent": null, "timestamp": null, "context": null}';

-- Create vector similarity index for efficient peer matching
CREATE INDEX IF NOT EXISTS idx_knowledge_vectors 
ON profiles USING ivfflat (knowledge_vectors vector_cosine_ops) 
WITH (lists = 100);

-- Create index on learning_style for filtering
CREATE INDEX IF NOT EXISTS idx_learning_style 
ON profiles USING gin (learning_style);

-- Update existing profiles to have default learning styles if null
UPDATE profiles 
SET learning_style = '{"modality": "mixed", "pace": "moderate", "preferences": []}'
WHERE learning_style IS NULL;

-- Update existing profiles to have default handoff agent if null  
UPDATE profiles 
SET last_handoff_agent = '{"agent": null, "timestamp": null, "context": null}'
WHERE last_handoff_agent IS NULL;