-- =================================================================
-- YOUTUBE EDUCATIONAL LIBRARY - SUPABASE DATABASE SCHEMA
-- =================================================================
-- 
-- PURPOSE: Database schema for YouTube educational video library
-- including video metadata, user interactions, and content management
-- 
-- FEATURES:
-- - Comprehensive video metadata storage
-- - User bookmark and rating system
-- - Content moderation and approval workflow
-- - Analytics and usage tracking
-- - Cultural content classification
-- - Curriculum alignment tracking
-- 
-- =================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search optimization

-- =================================================================
-- YOUTUBE VIDEOS TABLE
-- =================================================================

CREATE TABLE IF NOT EXISTS youtube_videos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    video_id VARCHAR(255) UNIQUE NOT NULL, -- YouTube video ID
    title TEXT NOT NULL,
    description TEXT,
    duration VARCHAR(50), -- Format: "15:23"
    duration_seconds INTEGER, -- Duration in seconds for filtering
    thumbnail_url TEXT,
    youtube_url TEXT NOT NULL,
    channel_name VARCHAR(255),
    channel_id VARCHAR(255),
    view_count BIGINT DEFAULT 0,
    published_date DATE,
    
    -- Educational metadata
    subjects TEXT[] DEFAULT '{}', -- Array of subject areas
    year_levels INTEGER[] DEFAULT '{}', -- Array of year levels (7-13)
    content_type VARCHAR(100), -- educational, cultural, documentary, etc.
    tags TEXT[] DEFAULT '{}', -- Searchable tags
    
    -- Curriculum alignment
    nz_curriculum_links TEXT[] DEFAULT '{}', -- NZ Curriculum codes
    te_mataiaho_links JSONB DEFAULT '{}', -- Te Mataiaho connections
    curriculum_aligned BOOLEAN DEFAULT false,
    assessment_ready BOOLEAN DEFAULT false,
    
    -- Cultural content classification
    culturally_authentic BOOLEAN DEFAULT false,
    cultural_rating INTEGER CHECK (cultural_rating >= 1 AND cultural_rating <= 5),
    cultural_validator VARCHAR(255), -- Who validated the cultural content
    cultural_notes TEXT,
    
    -- Quality and educational value
    educational_value INTEGER CHECK (educational_value >= 1 AND educational_value <= 5),
    content_quality INTEGER CHECK (content_quality >= 1 AND content_quality <= 5),
    age_appropriate BOOLEAN DEFAULT true,
    
    -- Content management
    status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected, archived
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id),
    moderation_notes TEXT,
    
    -- Linked resources
    handout_links TEXT[] DEFAULT '{}', -- Links to related handouts
    lesson_plan_links TEXT[] DEFAULT '{}', -- Links to related lesson plans
    
    -- Analytics
    total_views INTEGER DEFAULT 0,
    total_bookmarks INTEGER DEFAULT 0,
    average_rating DECIMAL(3,2) DEFAULT 0.00,
    last_viewed_at TIMESTAMP WITH TIME ZONE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_youtube_videos_video_id ON youtube_videos(video_id);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_subjects ON youtube_videos USING GIN(subjects);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_year_levels ON youtube_videos USING GIN(year_levels);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_content_type ON youtube_videos(content_type);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_tags ON youtube_videos USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_status ON youtube_videos(status);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_cultural ON youtube_videos(culturally_authentic);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_curriculum ON youtube_videos(curriculum_aligned);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_assessment ON youtube_videos(assessment_ready);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_duration ON youtube_videos(duration_seconds);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_created_at ON youtube_videos(created_at);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_youtube_videos_search ON youtube_videos USING GIN(
    (title || ' ' || description || ' ' || array_to_string(tags, ' '))
);

-- =================================================================
-- USER VIDEO INTERACTIONS TABLE
-- =================================================================

CREATE TABLE IF NOT EXISTS user_video_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    video_id UUID REFERENCES youtube_videos(id) ON DELETE CASCADE,
    
    -- Interaction types
    bookmarked BOOLEAN DEFAULT false,
    bookmarked_at TIMESTAMP WITH TIME ZONE,
    
    watched BOOLEAN DEFAULT false,
    watched_at TIMESTAMP WITH TIME ZONE,
    watch_duration_seconds INTEGER DEFAULT 0,
    
    rated BOOLEAN DEFAULT false,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    rated_at TIMESTAMP WITH TIME ZONE,
    
    -- Usage context
    used_in_lesson BOOLEAN DEFAULT false,
    lesson_context TEXT,
    shared BOOLEAN DEFAULT false,
    shared_at TIMESTAMP WITH TIME ZONE,
    
    -- Feedback
    feedback TEXT,
    reported BOOLEAN DEFAULT false,
    report_reason TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, video_id)
);

-- Indexes for user interactions
CREATE INDEX IF NOT EXISTS idx_user_interactions_user_id ON user_video_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_video_id ON user_video_interactions(video_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_bookmarked ON user_video_interactions(bookmarked);
CREATE INDEX IF NOT EXISTS idx_user_interactions_watched ON user_video_interactions(watched);
CREATE INDEX IF NOT EXISTS idx_user_interactions_rated ON user_video_interactions(rated);

-- =================================================================
-- VIDEO COLLECTIONS TABLE
-- =================================================================

CREATE TABLE IF NOT EXISTS video_collections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    collection_type VARCHAR(100), -- curated, user-created, auto-generated
    
    -- Collection metadata
    subject_focus TEXT[],
    year_level_focus INTEGER[],
    cultural_theme VARCHAR(255),
    
    -- Ownership and permissions
    created_by UUID REFERENCES auth.users(id),
    is_public BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    
    -- Collection stats
    video_count INTEGER DEFAULT 0,
    total_duration_seconds INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================================================
-- VIDEO COLLECTION ITEMS TABLE
-- =================================================================

CREATE TABLE IF NOT EXISTS video_collection_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    collection_id UUID REFERENCES video_collections(id) ON DELETE CASCADE,
    video_id UUID REFERENCES youtube_videos(id) ON DELETE CASCADE,
    
    -- Item metadata
    sort_order INTEGER DEFAULT 0,
    added_by UUID REFERENCES auth.users(id),
    notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(collection_id, video_id)
);

-- =================================================================
-- VIDEO ANALYTICS TABLE
-- =================================================================

CREATE TABLE IF NOT EXISTS video_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    video_id UUID REFERENCES youtube_videos(id) ON DELETE CASCADE,
    
    -- Date-based analytics
    analytics_date DATE NOT NULL,
    
    -- View metrics
    daily_views INTEGER DEFAULT 0,
    unique_viewers INTEGER DEFAULT 0,
    total_watch_time_seconds INTEGER DEFAULT 0,
    average_watch_duration DECIMAL(10,2) DEFAULT 0.00,
    completion_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Engagement metrics
    daily_bookmarks INTEGER DEFAULT 0,
    daily_shares INTEGER DEFAULT 0,
    daily_ratings INTEGER DEFAULT 0,
    average_daily_rating DECIMAL(3,2) DEFAULT 0.00,
    
    -- Usage context
    classroom_usage INTEGER DEFAULT 0,
    individual_study INTEGER DEFAULT 0,
    teacher_preview INTEGER DEFAULT 0,
    
    -- Device/platform analytics
    mobile_views INTEGER DEFAULT 0,
    desktop_views INTEGER DEFAULT 0,
    tablet_views INTEGER DEFAULT 0,
    
    -- Geographic data (privacy-compliant)
    region_views JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(video_id, analytics_date)
);

-- Index for analytics queries
CREATE INDEX IF NOT EXISTS idx_video_analytics_video_date ON video_analytics(video_id, analytics_date);
CREATE INDEX IF NOT EXISTS idx_video_analytics_date ON video_analytics(analytics_date);

-- =================================================================
-- CONTENT MODERATION LOG TABLE
-- =================================================================

CREATE TABLE IF NOT EXISTS content_moderation_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    video_id UUID REFERENCES youtube_videos(id) ON DELETE CASCADE,
    moderator_id UUID REFERENCES auth.users(id),
    
    -- Moderation details
    action VARCHAR(100) NOT NULL, -- approved, rejected, flagged, archived
    reason TEXT,
    previous_status VARCHAR(50),
    new_status VARCHAR(50),
    
    -- Cultural validation
    cultural_review BOOLEAN DEFAULT false,
    cultural_reviewer UUID REFERENCES auth.users(id),
    cultural_approval BOOLEAN DEFAULT false,
    cultural_feedback TEXT,
    
    -- Educational review
    educational_review BOOLEAN DEFAULT false,
    educational_reviewer UUID REFERENCES auth.users(id),
    curriculum_validation BOOLEAN DEFAULT false,
    educational_feedback TEXT,
    
    -- Automated checks
    automated_checks JSONB DEFAULT '{}',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =================================================================
-- FUNCTIONS AND TRIGGERS
-- =================================================================

-- Function to update video statistics
CREATE OR REPLACE FUNCTION update_video_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Update video bookmark count
    IF TG_OP = 'INSERT' AND NEW.bookmarked = true THEN
        UPDATE youtube_videos 
        SET total_bookmarks = total_bookmarks + 1 
        WHERE id = NEW.video_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.bookmarked = false AND NEW.bookmarked = true THEN
        UPDATE youtube_videos 
        SET total_bookmarks = total_bookmarks + 1 
        WHERE id = NEW.video_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.bookmarked = true AND NEW.bookmarked = false THEN
        UPDATE youtube_videos 
        SET total_bookmarks = total_bookmarks - 1 
        WHERE id = NEW.video_id;
    ELSIF TG_OP = 'DELETE' AND OLD.bookmarked = true THEN
        UPDATE youtube_videos 
        SET total_bookmarks = total_bookmarks - 1 
        WHERE id = OLD.video_id;
    END IF;
    
    -- Update view count
    IF TG_OP = 'INSERT' AND NEW.watched = true THEN
        UPDATE youtube_videos 
        SET total_views = total_views + 1,
            last_viewed_at = NOW()
        WHERE id = NEW.video_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.watched = false AND NEW.watched = true THEN
        UPDATE youtube_videos 
        SET total_views = total_views + 1,
            last_viewed_at = NOW()
        WHERE id = NEW.video_id;
    END IF;
    
    -- Update average rating
    IF TG_OP IN ('INSERT', 'UPDATE') AND NEW.rated = true THEN
        UPDATE youtube_videos 
        SET average_rating = (
            SELECT AVG(rating::DECIMAL) 
            FROM user_video_interactions 
            WHERE video_id = NEW.video_id AND rated = true
        )
        WHERE id = NEW.video_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating video statistics
DROP TRIGGER IF EXISTS trigger_update_video_stats ON user_video_interactions;
CREATE TRIGGER trigger_update_video_stats
    AFTER INSERT OR UPDATE OR DELETE ON user_video_interactions
    FOR EACH ROW EXECUTE FUNCTION update_video_stats();

-- Function to update collection statistics
CREATE OR REPLACE FUNCTION update_collection_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE video_collections 
        SET video_count = video_count + 1,
            total_duration_seconds = total_duration_seconds + COALESCE(
                (SELECT duration_seconds FROM youtube_videos WHERE id = NEW.video_id), 0
            )
        WHERE id = NEW.collection_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE video_collections 
        SET video_count = video_count - 1,
            total_duration_seconds = total_duration_seconds - COALESCE(
                (SELECT duration_seconds FROM youtube_videos WHERE id = OLD.video_id), 0
            )
        WHERE id = OLD.collection_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating collection statistics
DROP TRIGGER IF EXISTS trigger_update_collection_stats ON video_collection_items;
CREATE TRIGGER trigger_update_collection_stats
    AFTER INSERT OR DELETE ON video_collection_items
    FOR EACH ROW EXECUTE FUNCTION update_collection_stats();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at timestamps
DROP TRIGGER IF EXISTS trigger_youtube_videos_updated_at ON youtube_videos;
CREATE TRIGGER trigger_youtube_videos_updated_at
    BEFORE UPDATE ON youtube_videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_user_interactions_updated_at ON user_video_interactions;
CREATE TRIGGER trigger_user_interactions_updated_at
    BEFORE UPDATE ON user_video_interactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trigger_collections_updated_at ON video_collections;
CREATE TRIGGER trigger_collections_updated_at
    BEFORE UPDATE ON video_collections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =================================================================

-- Enable RLS on all tables
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_video_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_moderation_log ENABLE ROW LEVEL SECURITY;

-- YouTube Videos Policies
CREATE POLICY "YouTube videos are viewable by everyone" ON youtube_videos
    FOR SELECT USING (status = 'approved');

CREATE POLICY "Admins can manage all videos" ON youtube_videos
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "Teachers can submit videos for review" ON youtube_videos
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND
        (status = 'pending' OR status IS NULL)
    );

-- User Interactions Policies
CREATE POLICY "Users can manage their own interactions" ON user_video_interactions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all interactions for analytics" ON user_video_interactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Collections Policies
CREATE POLICY "Public collections are viewable by everyone" ON video_collections
    FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own collections" ON video_collections
    FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can manage their own collections" ON video_collections
    FOR ALL USING (auth.uid() = created_by);

-- Collection Items Policies
CREATE POLICY "Collection items follow collection visibility" ON video_collection_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM video_collections 
            WHERE video_collections.id = collection_id 
            AND (video_collections.is_public = true OR video_collections.created_by = auth.uid())
        )
    );

CREATE POLICY "Users can manage items in their own collections" ON video_collection_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM video_collections 
            WHERE video_collections.id = collection_id 
            AND video_collections.created_by = auth.uid()
        )
    );

-- Analytics Policies (Admin only)
CREATE POLICY "Only admins can access analytics" ON video_analytics
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Moderation Log Policies (Admin and Moderators)
CREATE POLICY "Admins and moderators can access moderation log" ON content_moderation_log
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' IN ('admin', 'moderator')
        )
    );

-- =================================================================
-- INITIAL DATA SEEDING
-- =================================================================

-- Create featured collections
INSERT INTO video_collections (name, description, collection_type, is_public, is_featured) VALUES
('Te Ao Māori Essential Collection', 'Curated selection of culturally authentic Māori educational content', 'curated', true, true),
('Assessment-Ready Resources', 'Videos with comprehensive assessment materials and curriculum alignment', 'curated', true, true),
('Quick Learning Breaks', 'Short 5-10 minute videos perfect for lesson starters or brain breaks', 'curated', true, true),
('Current Events & Social Issues', 'Contemporary issues and current events relevant to New Zealand students', 'curated', true, true),
('STEM Excellence Collection', 'Outstanding science, technology, engineering and mathematics content', 'curated', true, true)
ON CONFLICT DO NOTHING;

-- Grant permissions for service operations
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON youtube_videos TO anon, authenticated;
GRANT ALL ON user_video_interactions TO authenticated;
GRANT SELECT ON video_collections TO anon, authenticated;
GRANT SELECT ON video_collection_items TO anon, authenticated;

-- =================================================================
-- VIEWS FOR COMMON QUERIES
-- =================================================================

-- View for popular videos
CREATE OR REPLACE VIEW popular_videos AS
SELECT 
    v.*,
    COALESCE(v.total_views, 0) + COALESCE(v.total_bookmarks, 0) * 2 as popularity_score
FROM youtube_videos v
WHERE v.status = 'approved'
ORDER BY popularity_score DESC;

-- View for recently added videos
CREATE OR REPLACE VIEW recent_videos AS
SELECT v.*
FROM youtube_videos v
WHERE v.status = 'approved'
ORDER BY v.created_at DESC;

-- View for culturally authentic content
CREATE OR REPLACE VIEW cultural_videos AS
SELECT v.*
FROM youtube_videos v
WHERE v.status = 'approved' 
AND v.culturally_authentic = true
ORDER BY v.cultural_rating DESC, v.created_at DESC;

-- View for curriculum-aligned content
CREATE OR REPLACE VIEW curriculum_videos AS
SELECT v.*
FROM youtube_videos v
WHERE v.status = 'approved' 
AND v.curriculum_aligned = true
ORDER BY v.educational_value DESC, v.created_at DESC;

-- Comprehensive video search function
CREATE OR REPLACE FUNCTION search_videos(
    search_query TEXT DEFAULT '',
    subject_filter TEXT[] DEFAULT '{}',
    year_level_filter INTEGER[] DEFAULT '{}',
    content_type_filter TEXT DEFAULT '',
    duration_min INTEGER DEFAULT 0,
    duration_max INTEGER DEFAULT 999999,
    cultural_only BOOLEAN DEFAULT false,
    curriculum_only BOOLEAN DEFAULT false,
    assessment_only BOOLEAN DEFAULT false,
    limit_results INTEGER DEFAULT 20,
    offset_results INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    video_id VARCHAR,
    title TEXT,
    description TEXT,
    duration VARCHAR,
    subjects TEXT[],
    year_levels INTEGER[],
    content_type VARCHAR,
    culturally_authentic BOOLEAN,
    curriculum_aligned BOOLEAN,
    assessment_ready BOOLEAN,
    thumbnail_url TEXT,
    youtube_url TEXT,
    popularity_score BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        v.id,
        v.video_id,
        v.title,
        v.description,
        v.duration,
        v.subjects,
        v.year_levels,
        v.content_type,
        v.culturally_authentic,
        v.curriculum_aligned,
        v.assessment_ready,
        v.thumbnail_url,
        v.youtube_url,
        (COALESCE(v.total_views, 0) + COALESCE(v.total_bookmarks, 0) * 2) as popularity_score
    FROM youtube_videos v
    WHERE v.status = 'approved'
    AND (search_query = '' OR (
        v.title ILIKE '%' || search_query || '%' OR
        v.description ILIKE '%' || search_query || '%' OR
        EXISTS (SELECT 1 FROM unnest(v.tags) tag WHERE tag ILIKE '%' || search_query || '%')
    ))
    AND (array_length(subject_filter, 1) IS NULL OR v.subjects && subject_filter)
    AND (array_length(year_level_filter, 1) IS NULL OR v.year_levels && year_level_filter)
    AND (content_type_filter = '' OR v.content_type = content_type_filter)
    AND (v.duration_seconds >= duration_min AND v.duration_seconds <= duration_max)
    AND (NOT cultural_only OR v.culturally_authentic = true)
    AND (NOT curriculum_only OR v.curriculum_aligned = true)
    AND (NOT assessment_only OR v.assessment_ready = true)
    ORDER BY popularity_score DESC, v.created_at DESC
    LIMIT limit_results
    OFFSET offset_results;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on search function
GRANT EXECUTE ON FUNCTION search_videos TO anon, authenticated;

COMMIT;