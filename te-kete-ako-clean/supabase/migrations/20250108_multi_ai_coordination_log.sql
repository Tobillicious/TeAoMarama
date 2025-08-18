-- ================================================================
-- MULTI-AI COORDINATION LOGGING TABLE
-- ================================================================
-- 
-- Tracks interactions between DeepSeek, GraphRAG, Firebase, and other AI agents
-- Provides analytics for multi-AI system performance and coordination
-- 
-- ================================================================

-- Create multi_ai_coordination_log table
CREATE TABLE IF NOT EXISTS multi_ai_coordination_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- User and query information
    user_id TEXT,
    query TEXT NOT NULL,
    
    -- AI agent coordination details
    ai_agents_used TEXT[] NOT NULL DEFAULT '{}',
    primary_agent TEXT DEFAULT 'deepseek',
    
    -- GraphRAG brain interaction stats
    graphrag_resources_found INTEGER DEFAULT 0,
    cultural_resources_accessed INTEGER DEFAULT 0,
    knowledge_connections_used INTEGER DEFAULT 0,
    
    -- Response metrics
    response_length INTEGER DEFAULT 0,
    response_time_ms INTEGER,
    
    -- Coordination success tracking
    coordination_success BOOLEAN DEFAULT true,
    error_message TEXT,
    
    -- Cultural safety and quality metrics
    cultural_safety_triggered BOOLEAN DEFAULT false,
    quality_score DECIMAL(3,2),
    
    -- Agent-specific metadata
    deepseek_model TEXT DEFAULT 'deepseek-chat',
    graphrag_query_type TEXT, -- 'semantic', 'knowledge_graph', 'hybrid'
    firebase_user_verified BOOLEAN DEFAULT false,
    
    -- Performance analytics
    cache_hit BOOLEAN DEFAULT false,
    processing_phases INTEGER DEFAULT 3, -- DeepSeek + GraphRAG + Logging
    
    -- Temporal tracking
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_multi_ai_coordination_user_id ON multi_ai_coordination_log(user_id);
CREATE INDEX IF NOT EXISTS idx_multi_ai_coordination_timestamp ON multi_ai_coordination_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_multi_ai_coordination_agents ON multi_ai_coordination_log USING GIN(ai_agents_used);
CREATE INDEX IF NOT EXISTS idx_multi_ai_coordination_success ON multi_ai_coordination_log(coordination_success);
CREATE INDEX IF NOT EXISTS idx_multi_ai_coordination_cultural ON multi_ai_coordination_log(cultural_resources_accessed) WHERE cultural_resources_accessed > 0;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_multi_ai_coordination_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_multi_ai_coordination_updated_at
    BEFORE UPDATE ON multi_ai_coordination_log
    FOR EACH ROW
    EXECUTE PROCEDURE update_multi_ai_coordination_updated_at();

-- RLS (Row Level Security) Policies
ALTER TABLE multi_ai_coordination_log ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own coordination logs
CREATE POLICY "Users can view own coordination logs" ON multi_ai_coordination_log
    FOR SELECT USING (auth.uid()::text = user_id);

-- Policy: Service role can do everything (for AI agents)
CREATE POLICY "Service role full access" ON multi_ai_coordination_log
    FOR ALL USING (auth.role() = 'service_role');

-- Policy: Anonymous users can insert logs (for demo purposes)
CREATE POLICY "Anonymous can insert coordination logs" ON multi_ai_coordination_log
    FOR INSERT WITH CHECK (true);

-- Create analytics view for teachers and administrators
CREATE OR REPLACE VIEW multi_ai_analytics AS
SELECT 
    DATE_TRUNC('day', timestamp) as date,
    COUNT(*) as total_interactions,
    COUNT(*) FILTER (WHERE coordination_success = true) as successful_interactions,
    AVG(graphrag_resources_found) as avg_resources_found,
    AVG(cultural_resources_accessed) as avg_cultural_resources,
    AVG(response_time_ms) as avg_response_time_ms,
    COUNT(*) FILTER (WHERE cultural_safety_triggered = true) as cultural_safety_triggers,
    AVG(quality_score) as avg_quality_score,
    ARRAY_AGG(DISTINCT unnest(ai_agents_used)) as all_agents_used
FROM multi_ai_coordination_log
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', timestamp)
ORDER BY date DESC;

-- Create real-time subscription for live monitoring
-- (This allows the frontend to get real-time updates)
ALTER TABLE multi_ai_coordination_log REPLICA IDENTITY FULL;

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON multi_ai_coordination_log TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON multi_ai_coordination_log TO authenticated;
GRANT ALL ON multi_ai_coordination_log TO service_role;
GRANT SELECT ON multi_ai_analytics TO authenticated;
GRANT SELECT ON multi_ai_analytics TO service_role;

-- Insert sample data for testing
INSERT INTO multi_ai_coordination_log (
    user_id,
    query,
    ai_agents_used,
    graphrag_resources_found,
    cultural_resources_accessed,
    response_length,
    coordination_success,
    cultural_safety_triggered
) VALUES 
    ('demo_user_123', 'How does Te Ao Māori integrate with mathematics curriculum?', 
     ARRAY['deepseek', 'graphrag'], 12, 8, 1250, true, true),
    ('demo_user_456', 'Explain systems thinking in Year 8 social studies', 
     ARRAY['deepseek', 'graphrag'], 15, 3, 890, true, false),
    ('demo_user_789', 'What are the best resources for digital citizenship?', 
     ARRAY['deepseek', 'graphrag'], 8, 0, 720, true, false);

-- Create function for getting coordination statistics
CREATE OR REPLACE FUNCTION get_multi_ai_stats(days_back INTEGER DEFAULT 7)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_interactions', COUNT(*),
        'success_rate', ROUND(
            (COUNT(*) FILTER (WHERE coordination_success = true) * 100.0 / NULLIF(COUNT(*), 0))::numeric, 2
        ),
        'avg_graphrag_hits', ROUND(AVG(graphrag_resources_found)::numeric, 1),
        'total_cultural_resources', SUM(cultural_resources_accessed),
        'agents_coordination', json_build_object(
            'deepseek_usage', COUNT(*) FILTER (WHERE 'deepseek' = ANY(ai_agents_used)),
            'graphrag_usage', COUNT(*) FILTER (WHERE 'graphrag' = ANY(ai_agents_used)),
            'cultural_safety_triggers', COUNT(*) FILTER (WHERE cultural_safety_triggered = true)
        ),
        'performance_metrics', json_build_object(
            'avg_response_time', ROUND(AVG(response_time_ms)::numeric, 0),
            'avg_quality_score', ROUND(AVG(quality_score)::numeric, 2)
        )
    ) INTO result
    FROM multi_ai_coordination_log
    WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_multi_ai_stats(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_multi_ai_stats(INTEGER) TO service_role;

COMMENT ON TABLE multi_ai_coordination_log IS 'Tracks multi-AI coordination between DeepSeek, GraphRAG, Firebase Auth, and other AI agents in Te Kete Ako platform';
COMMENT ON FUNCTION get_multi_ai_stats IS 'Returns comprehensive statistics about multi-AI coordination performance and usage patterns';