-- Kaitiaki Aronui Brain Integration - Te Kete Ako GraphRAG System
-- This migration creates the neural architecture for our AI educational platform
-- Metaphor: Building a brain that thinks, remembers, and learns like a master educator

-- Enable core extensions for brain functionality
CREATE EXTENSION IF NOT EXISTS "pgcrypto";    -- Neural encryption
CREATE EXTENSION IF NOT EXISTS "pg_trgm";     -- Fuzzy pattern matching (like human memory)
CREATE EXTENSION IF NOT EXISTS vector;        -- Semantic embeddings (neural networks)

-- ========================================
-- HIPPOCAMPUS: Episodic Memory System
-- ========================================
-- Stores teacher interactions, classroom outcomes, and learning patterns
CREATE TABLE IF NOT EXISTS episodic_memory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid NOT NULL,
  class_context jsonb,              -- class size, year level, cultural context
  learning_episode jsonb NOT NULL,   -- what happened in this learning moment
  outcome_quality text,              -- 'excellent'|'good'|'needs_work'|'failed'
  emotional_tone text,               -- 'engaged'|'confused'|'frustrated'|'excited'
  cultural_notes text,               -- iwi protocols, te reo usage, cultural connections
  timestamp_utc timestamptz DEFAULT now(),
  embedding vector(1536),           -- semantic representation for pattern matching
  tags text[]                       -- searchable metadata
);

-- ========================================
-- SEMANTIC NETWORK: GraphRAG Knowledge Base
-- ========================================
-- The structured knowledge web - like a master teacher's understanding of curriculum
CREATE TABLE IF NOT EXISTS knowledge_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  node_type text NOT NULL CHECK (node_type IN ('nzc_outcome','unit','lesson','activity','resource','assessment','cultural_protocol')),
  title text NOT NULL,
  content_body text,
  year_levels int[],
  subjects text[],
  cultural_context jsonb,            -- te ao maori integration, iwi connections
  difficulty_level numeric(3,2),    -- 0.0-1.0 complexity rating
  prerequisite_nodes uuid[],         -- what must be learned first
  learning_objectives text[],
  success_criteria text[],
  embedding vector(1536),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_by text,                   -- which AI agent created this
  validated_by uuid,                 -- which human teacher approved this
  created_at timestamptz DEFAULT now(),
  last_modified timestamptz DEFAULT now()
);

-- Knowledge relationships - the synapses of our educational brain
CREATE TABLE IF NOT EXISTS knowledge_edges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_node uuid NOT NULL REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
  target_node uuid NOT NULL REFERENCES knowledge_nodes(id) ON DELETE CASCADE,
  relationship_type text NOT NULL CHECK (relationship_type IN ('prerequisite','supports','extends','contradicts','cultural_parallel','assessment_of')),
  strength numeric(3,2) DEFAULT 0.8, -- 0.0-1.0 connection strength
  evidence_text text,                 -- citation or reasoning
  cultural_significance text,         -- how this relates to te ao maori
  created_by text,
  confidence numeric(3,2) DEFAULT 0.8,
  created_at timestamptz DEFAULT now()
);

-- ========================================
-- PREFRONTAL CORTEX: Agent Orchestration
-- ========================================
-- Manages AI agents and their decision-making processes
CREATE TABLE IF NOT EXISTS agent_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_name text NOT NULL,           -- 'kaitiaki_content'|'kaitiaki_cultural'|'kaitiaki_assessment' etc
  job_type text NOT NULL,             -- 'extract'|'validate'|'generate'|'critique'|'approve'
  priority text DEFAULT 'normal',     -- 'urgent'|'high'|'normal'|'low'
  input_context jsonb,
  expected_output jsonb,
  actual_output jsonb,
  status text NOT NULL DEFAULT 'queued', -- 'queued'|'running'|'completed'|'failed'|'needs_human_review'
  agent_reasoning text,               -- why the agent made its decisions
  confidence_score numeric(3,2),
  cultural_safety_checked boolean DEFAULT false,
  human_review_required boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  started_at timestamptz,
  completed_at timestamptz,
  assigned_human uuid                 -- which teacher needs to review this
);

-- ========================================
-- BASAL GANGLIA: Procedural Memory
-- ========================================
-- Automated workflows and learned procedures - like muscle memory for teaching
CREATE TABLE IF NOT EXISTS procedural_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_name text NOT NULL UNIQUE,
  description text,
  trigger_conditions jsonb,          -- when to activate this workflow
  steps jsonb NOT NULL,              -- sequence of actions to take
  success_patterns jsonb,            -- what success looks like
  failure_recovery jsonb,            -- what to do when things go wrong
  cultural_protocols jsonb,          -- built-in cultural safety measures
  usage_count integer DEFAULT 0,
  success_rate numeric(5,2) DEFAULT 0.0,
  created_at timestamptz DEFAULT now(),
  last_used timestamptz,
  enabled boolean DEFAULT true
);

-- ========================================
-- ARTIFACT CATALOG: Document Everything
-- ========================================
-- Master index of all files created by our AI agents - taming the chaos
CREATE TABLE IF NOT EXISTS artifact_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_path text NOT NULL UNIQUE,
  file_name text NOT NULL,
  file_type text,                    -- 'lesson'|'handout'|'script'|'documentation'|'image'
  file_size_bytes bigint,
  content_hash text,                 -- sha256 for deduplication
  title text,
  description text,
  keywords text[],
  year_levels int[],
  subjects text[],
  cultural_tags text[],              -- maori concepts, values, protocols mentioned
  agent_creator text,                -- which AI system created this
  human_reviewer uuid,               -- which teacher validated this
  quality_score numeric(3,2),       -- 0.0-1.0 quality rating
  usage_frequency integer DEFAULT 0,
  last_accessed timestamptz,
  embedding vector(1536),
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ========================================
-- CRITIC SYSTEM: Quality Assurance
-- ========================================
-- Our internal quality control - ensuring everything meets standards
CREATE TABLE IF NOT EXISTS quality_assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type text NOT NULL,         -- 'node'|'artifact'|'lesson'|'workflow'
  target_id uuid NOT NULL,
  assessment_type text NOT NULL,     -- 'cultural_safety'|'curriculum_alignment'|'accessibility'|'quality'
  assessor_agent text,
  assessment_result text NOT NULL,   -- 'approved'|'needs_revision'|'rejected'|'flagged_for_human'
  issues_found jsonb,                -- detailed list of problems
  suggestions jsonb,                 -- how to fix the problems  
  cultural_concerns text,            -- specific cultural safety issues
  confidence numeric(3,2),
  human_review_needed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- ========================================
-- LEARNING ANALYTICS: Understanding Impact
-- ========================================
-- Track how our resources actually perform in the classroom
CREATE TABLE IF NOT EXISTS learning_outcomes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id uuid,                  -- which resource was used
  class_context jsonb,               -- anonymous class demographics  
  engagement_level text,             -- 'high'|'medium'|'low'
  completion_rate numeric(5,2),      -- percentage who finished
  comprehension_indicators jsonb,    -- assessment results (anonymized)
  teacher_feedback text,
  cultural_resonance text,           -- did it connect with students' cultural identity?
  modification_needed boolean DEFAULT false,
  timestamp_utc timestamptz DEFAULT now()
);

-- ========================================
-- INDEXES FOR BRAIN PERFORMANCE
-- ========================================
-- Optimizing our neural pathways for speed

-- Hippocampus (episodic memory) indexes
CREATE INDEX idx_episodic_teacher ON episodic_memory (teacher_id);
CREATE INDEX idx_episodic_embedding ON episodic_memory USING ivfflat (embedding);
CREATE INDEX idx_episodic_tags ON episodic_memory USING gin (tags);

-- Semantic network indexes  
CREATE INDEX idx_knowledge_type ON knowledge_nodes (node_type);
CREATE INDEX idx_knowledge_year ON knowledge_nodes USING gin (year_levels);
CREATE INDEX idx_knowledge_subjects ON knowledge_nodes USING gin (subjects);
CREATE INDEX idx_knowledge_embedding ON knowledge_nodes USING ivfflat (embedding);
CREATE INDEX idx_knowledge_validated ON knowledge_nodes (validated_by);

-- Agent orchestration indexes
CREATE INDEX idx_agent_status ON agent_jobs (status);
CREATE INDEX idx_agent_priority ON agent_jobs (priority);
CREATE INDEX idx_agent_human_review ON agent_jobs (human_review_required);

-- Artifact catalog indexes
CREATE INDEX idx_artifact_hash ON artifact_catalog (content_hash);
CREATE INDEX idx_artifact_type ON artifact_catalog (file_type);
CREATE INDEX idx_artifact_embedding ON artifact_catalog USING ivfflat (embedding);
CREATE INDEX idx_artifact_keywords ON artifact_catalog USING gin (keywords);
CREATE INDEX idx_artifact_cultural ON artifact_catalog USING gin (cultural_tags);

-- ========================================
-- BRAIN FUNCTIONS: Core Intelligence
-- ========================================

-- Function to find similar content (deduplication & discovery)
CREATE OR REPLACE FUNCTION find_similar_content(
  query_embedding vector(1536),
  content_type text DEFAULT 'any',
  similarity_threshold real DEFAULT 0.8,
  max_results integer DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  title text,
  similarity real,
  content_type text
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    kn.id,
    kn.title,
    1 - (kn.embedding <=> query_embedding) as similarity,
    kn.node_type::text as content_type
  FROM knowledge_nodes kn
  WHERE (content_type = 'any' OR kn.node_type = content_type)
    AND 1 - (kn.embedding <=> query_embedding) > similarity_threshold
  ORDER BY kn.embedding <=> query_embedding
  LIMIT max_results;
END;
$$ LANGUAGE plpgsql;

-- Function to trigger quality assessment
CREATE OR REPLACE FUNCTION trigger_quality_assessment()
RETURNS trigger AS $$
BEGIN
  -- Automatically queue quality assessment for new knowledge nodes
  INSERT INTO agent_jobs (agent_name, job_type, input_context, human_review_required)
  VALUES (
    'kaitiaki_critic',
    'quality_assessment', 
    jsonb_build_object('node_id', NEW.id, 'node_type', NEW.node_type),
    CASE WHEN NEW.cultural_context IS NOT NULL THEN true ELSE false END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Auto-trigger quality assessment for new knowledge nodes
CREATE TRIGGER trg_quality_assessment 
  AFTER INSERT ON knowledge_nodes
  FOR EACH ROW EXECUTE FUNCTION trigger_quality_assessment();

-- ========================================
-- CULTURAL SAFETY: Te Ao Māori Integration
-- ========================================

-- Cultural protocols validation
CREATE TABLE IF NOT EXISTS cultural_protocols (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_name text NOT NULL,
  description text,
  context_when_used text,           -- classroom situations requiring this protocol
  validation_steps jsonb,           -- how to check if protocol is followed
  severity text CHECK (severity IN ('advisory','important','critical')),
  iwi_guidance text,                -- specific iwi input if available
  created_by text,
  approved_by_cultural_advisor uuid,
  created_at timestamptz DEFAULT now()
);

-- Insert foundational cultural protocols
INSERT INTO cultural_protocols (protocol_name, description, context_when_used, severity, validation_steps) VALUES
('te_reo_accuracy', 'Ensure te reo Māori words and phrases are spelled correctly and used appropriately', 'Any content containing te reo Māori', 'critical', 
 '["Check macrons are correct", "Verify word usage in context", "Confirm pronunciation guides if provided"]'::jsonb),
('cultural_context_respect', 'Ensure cultural concepts are explained with proper context and respect', 'Discussions of Māori culture, values, or history', 'critical',
 '["Check for oversimplification", "Verify cultural accuracy", "Ensure respectful framing"]'::jsonb),
('inclusive_perspectives', 'Include diverse perspectives and avoid cultural assumptions', 'All educational content', 'important',
 '["Check for cultural bias", "Include multiple viewpoints", "Use inclusive language"]'::jsonb);

-- Success message
SELECT 'Kaitiaki Aronui Brain Integration Complete! 🧠✨' as status,
       'Te Kete Ako now has: Episodic Memory, Semantic Networks, Agent Orchestration, Quality Assurance, and Cultural Safety protocols' as capabilities,
       'Whaowhia te kete mātauranga - Fill the basket of knowledge with AI intelligence' as kaupapa;