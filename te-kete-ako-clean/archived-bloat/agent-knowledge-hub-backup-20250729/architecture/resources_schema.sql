-- Te Kete Ako - Resources Table Schema
-- This schema is for cataloging and managing the static educational resources.

CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('handout', 'game', 'activity', 'unit_plan', 'lesson_plan', 'video', 'other')),
    path TEXT NOT NULL UNIQUE, -- The relative path to the HTML file
    subject TEXT, -- e.g., 'English', 'Maths', 'Science', 'Te Ao Māori'
    year_levels INT[], -- e.g., ARRAY[8, 9, 10]
    tags TEXT[], -- For search and filtering
    nz_curriculum_links JSONB, -- To store links to NZC achievement objectives
    te_mataiaho_links JSONB, -- To store links to Te Mataiaho
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_resources_type ON resources(type);
CREATE INDEX idx_resources_subject ON resources(subject);
CREATE INDEX idx_resources_year_levels ON resources USING GIN(year_levels);
CREATE INDEX idx_resources_tags ON resources USING GIN(tags);

-- Enable RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- Policies: All users can read resources
CREATE POLICY "Public resources are viewable by everyone" ON resources FOR SELECT USING (true);

-- Function and Trigger for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE "resources" IS 'A catalog of all static educational resources (handouts, games, etc.) available on the site.';
COMMENT ON COLUMN "resources"."type" IS 'The general category of the resource.';
COMMENT ON COLUMN "resources"."path" IS 'The unique, relative URL path to the resource file.';
COMMENT ON COLUMN "resources"."year_levels" IS 'An array of applicable year levels, e.g., {8, 9, 10}.';
COMMENT ON COLUMN "resources"."tags" IS 'An array of keywords for search and filtering.';
COMMENT ON COLUMN "resources"."nz_curriculum_links" IS 'JSON object linking to specific NZ Curriculum achievement objectives.';
COMMENT ON COLUMN "resources"."te_mataiaho_links" IS 'JSON object linking to specific Te Mataiaho learning areas.';
