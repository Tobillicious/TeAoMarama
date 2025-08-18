-- Te Kete Ako - Supabase Database Schema
-- This schema supports the dynamic features for student/teacher collaboration

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;

-- User Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    email TEXT NOT NULL,
    role TEXT CHECK (role IN ('teacher', 'student', 'admin')) NOT NULL,
    display_name TEXT,
    school_name TEXT DEFAULT 'Mangakōtukutuku College',
    year_level INTEGER CHECK (year_level BETWEEN 7 AND 13),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_login TIMESTAMP WITH TIME ZONE
);

-- Learning Sessions Table (Analytics)
CREATE TABLE learning_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_end TIMESTAMP WITH TIME ZONE,
    page_views JSONB DEFAULT '[]',
    interactions JSONB DEFAULT '[]',
    cultural_engagement_score INTEGER DEFAULT 0,
    total_time_minutes INTEGER DEFAULT 0,
    device_type TEXT,
    ip_address INET
);

-- Student Projects Table (Society Design & Other Submissions)
CREATE TABLE student_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES auth.users(id),
    project_type TEXT NOT NULL, -- 'society-design', 'do-now-response', 'collaborative-project'
    title TEXT NOT NULL,
    description TEXT,
    content JSONB NOT NULL, -- Flexible structure for different project types
    group_members JSONB DEFAULT '[]', -- Array of student IDs for group projects
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    due_date TIMESTAMP WITH TIME ZONE,
    status TEXT CHECK (status IN ('draft', 'submitted', 'under_review', 'reviewed', 'approved', 'needs_revision')) DEFAULT 'draft',
    teacher_feedback TEXT,
    grade TEXT,
    cultural_elements JSONB DEFAULT '[]', -- Track Te Ao Māori integration
    file_attachments JSONB DEFAULT '[]', -- URLs to uploaded files
    peer_reviews JSONB DEFAULT '[]' -- Peer feedback data
);

-- Assessment Results Table (Quiz Scores, Activity Completion)
CREATE TABLE assessment_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    assessment_type TEXT NOT NULL, -- 'quiz', 'activity', 'do-now', 'self-reflection'
    content_id TEXT NOT NULL, -- Reference to specific quiz/activity
    unit_id TEXT, -- Which unit this relates to
    score INTEGER,
    max_score INTEGER,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    time_spent_minutes INTEGER,
    answer_data JSONB, -- Detailed answer information
    cultural_engagement_score INTEGER DEFAULT 0
);

-- Collaboration Records Table (Group Work Tracking)
CREATE TABLE collaboration_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES student_projects(id) ON DELETE CASCADE,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL, -- 'design-leader', 'research-coordinator', 'cultural-consultant', etc.
    contribution_log JSONB DEFAULT '[]', -- Track individual contributions
    peer_evaluations JSONB DEFAULT '[]', -- Feedback from group members
    weekly_reflections JSONB DEFAULT '[]', -- Weekly self-assessment
    collaboration_score INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teacher Analytics Table (Dashboard Data)
CREATE TABLE teacher_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    date DATE DEFAULT CURRENT_DATE,
    active_students INTEGER DEFAULT 0,
    submissions_pending INTEGER DEFAULT 0,
    submissions_reviewed INTEGER DEFAULT 0,
    engagement_metrics JSONB DEFAULT '{}',
    cultural_integration_score DECIMAL(3,2), -- Average cultural engagement
    top_performing_students JSONB DEFAULT '[]',
    areas_needing_support JSONB DEFAULT '[]'
);

-- Announcements/Messages Table
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    target_audience TEXT CHECK (target_audience IN ('all', 'teachers', 'students', 'year_7', 'year_8', 'year_9', 'year_10', 'year_11', 'year_12', 'year_13')),
    priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Row Level Security Policies

-- Profiles: Users can only see their own profile, teachers can see their students
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view student profiles" ON profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles teacher_profile 
        WHERE teacher_profile.user_id = auth.uid() 
        AND teacher_profile.role = 'teacher'
    )
    AND role = 'student'
);

-- Student Projects: Students see their own, teachers see assigned projects
CREATE POLICY "Students can view own projects" ON student_projects FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Students can create projects" ON student_projects FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update own drafts" ON student_projects FOR UPDATE USING (
    auth.uid() = student_id AND status = 'draft'
);
CREATE POLICY "Teachers can view assigned projects" ON student_projects FOR SELECT USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can update project feedback" ON student_projects FOR UPDATE USING (
    auth.uid() = teacher_id AND 
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    )
);

-- Assessment Results: Users see their own results, teachers see their students' results
CREATE POLICY "Users can view own assessments" ON assessment_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own assessment results" ON assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Teachers can view student assessments" ON assessment_results FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    )
);

-- Learning Sessions: Users see their own, teachers can see aggregated data
CREATE POLICY "Users can view own sessions" ON learning_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own sessions" ON learning_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Teachers can view student sessions" ON learning_sessions FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE user_id = auth.uid() 
        AND role = 'teacher'
    )
);

-- Collaboration Records: Group members can see project collaboration data
CREATE POLICY "Students can view project collaboration" ON collaboration_records FOR SELECT USING (
    auth.uid() = student_id OR 
    EXISTS (
        SELECT 1 FROM student_projects 
        WHERE id = project_id 
        AND (student_id = auth.uid() OR auth.uid() = ANY(SELECT jsonb_array_elements_text(group_members)::uuid))
    )
);

-- Teacher Analytics: Only the teacher can see their own analytics
CREATE POLICY "Teachers can view own analytics" ON teacher_analytics FOR SELECT USING (auth.uid() = teacher_id);

-- Announcements: Users see announcements targeted to them
CREATE POLICY "Users can view relevant announcements" ON announcements FOR SELECT USING (
    target_audience = 'all' OR
    (target_audience = 'teachers' AND EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'teacher')) OR
    (target_audience = 'students' AND EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'student')) OR
    (target_audience = CONCAT('year_', (SELECT year_level FROM profiles WHERE user_id = auth.uid())))
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_student_projects_student_id ON student_projects(student_id);
CREATE INDEX idx_student_projects_teacher_id ON student_projects(teacher_id);
CREATE INDEX idx_student_projects_status ON student_projects(status);
CREATE INDEX idx_assessment_results_user_id ON assessment_results(user_id);
CREATE INDEX idx_learning_sessions_user_id ON learning_sessions(user_id);
CREATE INDEX idx_collaboration_records_project_id ON collaboration_records(project_id);
CREATE INDEX idx_announcements_target_audience ON announcements(target_audience);
CREATE INDEX idx_announcements_active ON announcements(is_active) WHERE is_active = true;

-- Functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_collaboration_records_updated_at BEFORE UPDATE ON collaboration_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Initial data for development
INSERT INTO profiles (user_id, email, role, display_name, school_name) VALUES
-- This would be populated by the registration system
-- Example: ('uuid-here', 'teacher@mangakotukutuku.nz', 'teacher', 'Ms. Smith', 'Mangakōtukutuku College');

-- Sample announcement
INSERT INTO announcements (author_id, title, content, target_audience, priority) VALUES
-- This would be created by teachers/admins
-- Example: ('teacher-uuid', 'Welcome to Te Kete Ako', 'Welcome message here', 'all', 'medium');

-- Comments for future development
/*
Additional features to consider:
1. Notification system for real-time updates
2. File upload handling (Supabase Storage integration)
3. Automated backup and data retention policies
4. Advanced analytics and reporting views
5. Integration with external school management systems
6. API rate limiting and security monitoring
*/