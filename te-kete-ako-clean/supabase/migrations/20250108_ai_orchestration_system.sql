-- ================================================================
-- AI ORCHESTRATION SYSTEM - ADVANCED INTELLIGENCE DATABASE
-- ================================================================
-- 
-- Comprehensive database schema for the revolutionary AI learning orchestrator
-- Tracks multi-AI coordination, learning pathways, cultural integration, and real-time intelligence
-- 
-- ================================================================

-- Create AI orchestration log table
CREATE TABLE IF NOT EXISTS ai_orchestration_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Request metadata
    action TEXT NOT NULL,
    student_profile_hash TEXT,
    learning_objective TEXT,
    cultural_preferences JSONB DEFAULT '{}',
    
    -- AI agent coordination
    agents_coordinated TEXT[] NOT NULL DEFAULT '{}',
    coordination_sequence INTEGER DEFAULT 1,
    primary_agent TEXT,
    
    -- Intelligence metrics
    personalization_score DECIMAL(3,2),
    cultural_integration INTEGER DEFAULT 0,
    engagement_optimization_level TEXT,
    content_enhancements_applied INTEGER DEFAULT 0,
    
    -- Performance tracking
    orchestration_success BOOLEAN DEFAULT true,
    processing_time_ms INTEGER,
    graphrag_resources_accessed INTEGER DEFAULT 0,
    deepseek_tokens_used INTEGER DEFAULT 0,
    
    -- Learning pathway data
    learning_path_generated JSONB,
    pathway_complexity_score DECIMAL(3,2),
    estimated_completion_time INTEGER, -- in minutes
    cultural_elements_integrated TEXT[],
    
    -- Real-time intelligence
    real_time_recommendations JSONB DEFAULT '[]',
    engagement_predictions JSONB DEFAULT '{}',
    adaptive_adjustments_made JSONB DEFAULT '{}',
    
    -- Cultural safety and authenticity
    cultural_safety_score DECIMAL(3,2),
    tikanga_protocols_observed TEXT[],
    matauranga_elements_used TEXT[],
    te_reo_integration_level TEXT,
    
    -- Error handling and debugging
    error_details JSONB,
    coordination_warnings TEXT[],
    fallback_strategies_used TEXT[],
    
    -- Temporal tracking
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create learning pathway analytics table
CREATE TABLE IF NOT EXISTS learning_pathway_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Pathway identification
    orchestration_id UUID REFERENCES ai_orchestration_log(id),
    pathway_name TEXT,
    pathway_type TEXT, -- 'cultural_integration', 'systems_thinking', 'traditional_knowledge', etc.
    
    -- Student context
    student_profile_hash TEXT,
    current_level TEXT,
    learning_style TEXT,
    cultural_background TEXT,
    
    -- Pathway structure
    total_steps INTEGER,
    completed_steps INTEGER DEFAULT 0,
    current_step INTEGER DEFAULT 1,
    difficulty_progression JSONB, -- array of difficulty levels per step
    
    -- AI agent contributions
    pathfinder_contributions JSONB DEFAULT '{}',
    cultural_guardian_insights JSONB DEFAULT '{}',
    content_curator_enhancements JSONB DEFAULT '{}',
    engagement_optimizer_strategies JSONB DEFAULT '{}',
    assessment_intelligence_metrics JSONB DEFAULT '{}',
    
    -- Resource utilization
    graphrag_resources_used JSONB DEFAULT '[]',
    cultural_resources_accessed INTEGER DEFAULT 0,
    traditional_knowledge_integrated INTEGER DEFAULT 0,
    
    -- Performance metrics
    engagement_score DECIMAL(3,2),
    completion_rate DECIMAL(3,2),
    cultural_authenticity_score DECIMAL(3,2),
    learning_effectiveness DECIMAL(3,2),
    
    -- Adaptive tracking
    adaptations_made INTEGER DEFAULT 0,
    difficulty_adjustments JSONB DEFAULT '[]',
    cultural_moments_identified INTEGER DEFAULT 0,
    
    -- Temporal tracking
    started_at TIMESTAMPTZ DEFAULT NOW(),
    last_activity TIMESTAMPTZ DEFAULT NOW(),
    estimated_completion TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cultural integration tracking table
CREATE TABLE IF NOT EXISTS cultural_integration_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Integration context
    orchestration_id UUID REFERENCES ai_orchestration_log(id),
    integration_type TEXT, -- 'whakapapa', 'tikanga', 'matauranga', 'te_reo', 'whakataki'
    cultural_element TEXT,
    
    -- Cultural safety validation
    cultural_guardian_approved BOOLEAN DEFAULT false,
    authenticity_score DECIMAL(3,2),
    cultural_safety_checks JSONB DEFAULT '{}',
    community_validation_required BOOLEAN DEFAULT false,
    
    -- Integration details
    learning_context TEXT,
    integration_method TEXT, -- 'story', 'activity', 'protocol', 'knowledge_sharing'
    cultural_protocols_observed TEXT[],
    
    -- Educational alignment
    curriculum_connections TEXT[],
    learning_objectives_supported TEXT[],
    pedagogical_approach TEXT,
    
    -- Impact metrics
    student_engagement_impact DECIMAL(3,2),
    cultural_understanding_gain DECIMAL(3,2),
    authenticity_feedback_score DECIMAL(3,2),
    
    -- Metadata
    created_by TEXT DEFAULT 'ai_cultural_guardian',
    validated_by TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create real-time intelligence tracking table
CREATE TABLE IF NOT EXISTS real_time_intelligence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Session context
    session_id TEXT,
    student_profile_hash TEXT,
    current_activity TEXT,
    
    -- Real-time metrics
    engagement_level DECIMAL(3,2),
    attention_span_seconds INTEGER,
    interaction_frequency DECIMAL(3,2),
    comprehension_indicators JSONB DEFAULT '{}',
    
    -- AI agent real-time responses
    engagement_optimizer_actions JSONB DEFAULT '[]',
    content_curator_suggestions JSONB DEFAULT '[]',
    cultural_guardian_alerts JSONB DEFAULT '[]',
    assessment_intelligence_insights JSONB DEFAULT '{}',
    
    -- Adaptive recommendations
    immediate_actions JSONB DEFAULT '[]',
    content_adjustments JSONB DEFAULT '{}',
    difficulty_recommendations TEXT,
    engagement_strategies JSONB DEFAULT '[]',
    
    -- Cultural moment detection
    cultural_opportunities JSONB DEFAULT '[]',
    whakapapa_connections_available INTEGER DEFAULT 0,
    traditional_knowledge_moments INTEGER DEFAULT 0,
    
    -- Prediction algorithms
    predicted_engagement_trend TEXT, -- 'increasing', 'decreasing', 'stable'
    recommended_intervention_time INTEGER, -- seconds until intervention
    success_probability DECIMAL(3,2),
    
    -- Temporal tracking
    measurement_timestamp TIMESTAMPTZ DEFAULT NOW(),
    session_duration_seconds INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create AI agent performance analytics table
CREATE TABLE IF NOT EXISTS ai_agent_performance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Agent identification
    agent_name TEXT NOT NULL,
    agent_version TEXT DEFAULT '1.0',
    coordination_session_id UUID,
    
    -- Performance metrics
    response_time_ms INTEGER,
    processing_complexity_score DECIMAL(3,2),
    accuracy_score DECIMAL(3,2),
    cultural_sensitivity_score DECIMAL(3,2),
    
    -- Task-specific metrics
    task_type TEXT,
    task_complexity TEXT,
    resources_utilized INTEGER,
    coordination_efficiency DECIMAL(3,2),
    
    -- Success metrics
    coordination_success BOOLEAN DEFAULT true,
    quality_score DECIMAL(3,2),
    student_impact_score DECIMAL(3,2),
    cultural_authenticity_maintained BOOLEAN DEFAULT true,
    
    -- Learning and adaptation
    improvement_suggestions JSONB DEFAULT '[]',
    error_patterns JSONB DEFAULT '{}',
    adaptation_triggers JSONB DEFAULT '{}',
    
    -- Collaboration metrics
    inter_agent_coordination_score DECIMAL(3,2),
    knowledge_sharing_efficiency DECIMAL(3,2),
    conflict_resolution_success BOOLEAN DEFAULT true,
    
    -- Temporal tracking
    performance_timestamp TIMESTAMPTZ DEFAULT NOW(),
    measurement_period_start TIMESTAMPTZ,
    measurement_period_end TIMESTAMPTZ
);

-- Add indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_ai_orchestration_student ON ai_orchestration_log(student_profile_hash);
CREATE INDEX IF NOT EXISTS idx_ai_orchestration_timestamp ON ai_orchestration_log(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ai_orchestration_action ON ai_orchestration_log(action);
CREATE INDEX IF NOT EXISTS idx_ai_orchestration_success ON ai_orchestration_log(orchestration_success);
CREATE INDEX IF NOT EXISTS idx_ai_orchestration_cultural ON ai_orchestration_log(cultural_integration) WHERE cultural_integration > 0;

CREATE INDEX IF NOT EXISTS idx_learning_pathway_student ON learning_pathway_analytics(student_profile_hash);
CREATE INDEX IF NOT EXISTS idx_learning_pathway_type ON learning_pathway_analytics(pathway_type);
CREATE INDEX IF NOT EXISTS idx_learning_pathway_progress ON learning_pathway_analytics(completion_rate);
CREATE INDEX IF NOT EXISTS idx_learning_pathway_engagement ON learning_pathway_analytics(engagement_score);

CREATE INDEX IF NOT EXISTS idx_cultural_integration_type ON cultural_integration_log(integration_type);
CREATE INDEX IF NOT EXISTS idx_cultural_integration_safety ON cultural_integration_log(authenticity_score);
CREATE INDEX IF NOT EXISTS idx_cultural_integration_approval ON cultural_integration_log(cultural_guardian_approved);

CREATE INDEX IF NOT EXISTS idx_real_time_session ON real_time_intelligence(session_id);
CREATE INDEX IF NOT EXISTS idx_real_time_engagement ON real_time_intelligence(engagement_level);
CREATE INDEX IF NOT EXISTS idx_real_time_timestamp ON real_time_intelligence(measurement_timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_ai_agent_performance_name ON ai_agent_performance(agent_name);
CREATE INDEX IF NOT EXISTS idx_ai_agent_performance_score ON ai_agent_performance(quality_score);
CREATE INDEX IF NOT EXISTS idx_ai_agent_performance_timestamp ON ai_agent_performance(performance_timestamp DESC);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ai_orchestration_updated_at
    BEFORE UPDATE ON ai_orchestration_log
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE ai_orchestration_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_pathway_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cultural_integration_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_time_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_agent_performance ENABLE ROW LEVEL SECURITY;

-- Policies for AI orchestration
CREATE POLICY "Service role full access orchestration" ON ai_orchestration_log
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Teachers can view orchestration data" ON ai_orchestration_log
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for learning pathways
CREATE POLICY "Service role full access pathways" ON learning_pathway_analytics
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Teachers can view pathway analytics" ON learning_pathway_analytics
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for cultural integration
CREATE POLICY "Service role full access cultural" ON cultural_integration_log
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Cultural guardians can validate" ON cultural_integration_log
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Policies for real-time intelligence
CREATE POLICY "Service role full access real-time" ON real_time_intelligence
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Teachers can view real-time data" ON real_time_intelligence
    FOR SELECT USING (auth.role() = 'authenticated');

-- Policies for AI agent performance
CREATE POLICY "Service role full access ai performance" ON ai_agent_performance
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated can view ai performance" ON ai_agent_performance
    FOR SELECT USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT SELECT, INSERT, UPDATE ON ai_orchestration_log TO authenticated;
GRANT ALL ON ai_orchestration_log TO service_role;

GRANT SELECT, INSERT, UPDATE ON learning_pathway_analytics TO authenticated;
GRANT ALL ON learning_pathway_analytics TO service_role;

GRANT SELECT, INSERT, UPDATE ON cultural_integration_log TO authenticated;
GRANT ALL ON cultural_integration_log TO service_role;

GRANT SELECT, INSERT ON real_time_intelligence TO authenticated;
GRANT ALL ON real_time_intelligence TO service_role;

GRANT SELECT ON ai_agent_performance TO authenticated;
GRANT ALL ON ai_agent_performance TO service_role;

-- Create analytics views for teachers and administrators
CREATE OR REPLACE VIEW ai_orchestration_analytics AS
SELECT 
    DATE_TRUNC('day', timestamp) as date,
    action,
    COUNT(*) as total_orchestrations,
    AVG(personalization_score) as avg_personalization,
    AVG(cultural_integration) as avg_cultural_integration,
    AVG(processing_time_ms) as avg_processing_time,
    COUNT(*) FILTER (WHERE orchestration_success = true) as successful_orchestrations,
    COUNT(DISTINCT student_profile_hash) as unique_students,
    ARRAY_AGG(DISTINCT unnest(agents_coordinated)) as all_agents_used
FROM ai_orchestration_log
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', timestamp), action
ORDER BY date DESC, action;

CREATE OR REPLACE VIEW cultural_integration_analytics AS
SELECT 
    integration_type,
    COUNT(*) as total_integrations,
    AVG(authenticity_score) as avg_authenticity,
    COUNT(*) FILTER (WHERE cultural_guardian_approved = true) as approved_integrations,
    AVG(student_engagement_impact) as avg_engagement_impact,
    AVG(cultural_understanding_gain) as avg_understanding_gain
FROM cultural_integration_log
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY integration_type
ORDER BY total_integrations DESC;

CREATE OR REPLACE VIEW learning_pathway_performance AS
SELECT 
    pathway_type,
    COUNT(*) as total_pathways,
    AVG(completion_rate) as avg_completion_rate,
    AVG(engagement_score) as avg_engagement,
    AVG(cultural_authenticity_score) as avg_cultural_authenticity,
    AVG(learning_effectiveness) as avg_effectiveness,
    SUM(cultural_resources_accessed) as total_cultural_resources
FROM learning_pathway_analytics
WHERE started_at >= NOW() - INTERVAL '30 days'
GROUP BY pathway_type
ORDER BY avg_effectiveness DESC;

-- Create functions for advanced analytics
CREATE OR REPLACE FUNCTION get_orchestration_insights(days_back INTEGER DEFAULT 7)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'summary', json_build_object(
            'total_orchestrations', COUNT(*),
            'unique_students', COUNT(DISTINCT student_profile_hash),
            'avg_personalization_score', ROUND(AVG(personalization_score)::numeric, 2),
            'cultural_integrations', SUM(cultural_integration),
            'success_rate', ROUND((COUNT(*) FILTER (WHERE orchestration_success = true) * 100.0 / NULLIF(COUNT(*), 0))::numeric, 2)
        ),
        'agents', json_build_object(
            'most_used_agents', (
                SELECT json_agg(json_build_object('agent', agent, 'usage_count', usage_count))
                FROM (
                    SELECT unnest(agents_coordinated) as agent, COUNT(*) as usage_count
                    FROM ai_orchestration_log
                    WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
                    GROUP BY unnest(agents_coordinated)
                    ORDER BY usage_count DESC
                    LIMIT 5
                ) agent_usage
            ),
            'coordination_patterns', (
                SELECT json_agg(json_build_object('pattern', agents_coordinated, 'frequency', frequency))
                FROM (
                    SELECT agents_coordinated, COUNT(*) as frequency
                    FROM ai_orchestration_log
                    WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
                    GROUP BY agents_coordinated
                    ORDER BY frequency DESC
                    LIMIT 3
                ) patterns
            )
        ),
        'cultural_intelligence', json_build_object(
            'total_cultural_integrations', (
                SELECT COUNT(*) FROM cultural_integration_log
                WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
            ),
            'avg_authenticity_score', (
                SELECT ROUND(AVG(authenticity_score)::numeric, 2)
                FROM cultural_integration_log
                WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
            ),
            'cultural_safety_score', (
                SELECT ROUND(AVG(cultural_safety_score)::numeric, 2)
                FROM ai_orchestration_log
                WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL
                AND cultural_safety_score IS NOT NULL
            )
        ),
        'performance', json_build_object(
            'avg_processing_time', ROUND(AVG(processing_time_ms)::numeric, 0),
            'graphrag_utilization', SUM(graphrag_resources_accessed),
            'real_time_adaptations', (
                SELECT COUNT(*) FROM real_time_intelligence
                WHERE measurement_timestamp >= NOW() - (days_back || ' days')::INTERVAL
            )
        )
    ) INTO result
    FROM ai_orchestration_log
    WHERE timestamp >= NOW() - (days_back || ' days')::INTERVAL;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on analytics function
GRANT EXECUTE ON FUNCTION get_orchestration_insights(INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_orchestration_insights(INTEGER) TO service_role;

-- Insert sample data for demonstration
INSERT INTO ai_orchestration_log (
    action,
    student_profile_hash,
    learning_objective,
    agents_coordinated,
    personalization_score,
    cultural_integration,
    orchestration_success,
    processing_time_ms,
    cultural_safety_score
) VALUES 
    ('generate_learning_path', 'abc123def456', 'Te Ao Māori mathematics integration', 
     ARRAY['learning_pathfinder', 'cultural_guardian', 'content_curator'], 
     0.89, 5, true, 2340, 0.97),
    ('enhance_content', 'def456ghi789', 'Systems thinking with whakapapa connections', 
     ARRAY['content_curator', 'cultural_guardian', 'engagement_optimizer'], 
     0.92, 3, true, 1890, 0.95),
    ('real_time_coordination', 'ghi789jkl012', 'Digital pūrākau storytelling', 
     ARRAY['engagement_optimizer', 'cultural_guardian'], 
     0.85, 4, true, 1560, 0.98);

-- Add comments for documentation
COMMENT ON TABLE ai_orchestration_log IS 'Comprehensive logging of AI orchestration activities for educational intelligence';
COMMENT ON TABLE learning_pathway_analytics IS 'Detailed analytics for AI-generated personalized learning pathways';
COMMENT ON TABLE cultural_integration_log IS 'Tracking and validation of cultural knowledge integration';
COMMENT ON TABLE real_time_intelligence IS 'Real-time intelligence and adaptive recommendations during learning sessions';
COMMENT ON TABLE ai_agent_performance IS 'Performance metrics and analytics for individual AI agents';

COMMENT ON FUNCTION get_orchestration_insights IS 'Returns comprehensive insights about AI orchestration performance and cultural integration';

-- Enable real-time subscriptions for live dashboards
ALTER PUBLICATION supabase_realtime ADD TABLE ai_orchestration_log;
ALTER PUBLICATION supabase_realtime ADD TABLE real_time_intelligence;
ALTER PUBLICATION supabase_realtime ADD TABLE cultural_integration_log;