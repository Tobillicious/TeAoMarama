import React, { useEffect, useState } from 'react';
import { enhancedNZCurriculum } from '../content/enhanced-nz-curriculum';

interface TeacherStats {
  totalLessons: number;
  completedLessons: number;
  studentsActive: number;
  culturalSafetyScore: number;
  communityConnections: number;
  culturalAdvisors: number;
}

interface CulturalConnection {
  type: 'iwi' | 'cultural-advisor' | 'community-elder' | 'cultural-center';
  name: string;
  status: 'active' | 'pending' | 'inactive';
  lastContact: string;
  culturalArea: string;
}

const EnhancedTeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [teacherStats, setTeacherStats] = useState<TeacherStats>({
    totalLessons: 9,
    completedLessons: 3,
    studentsActive: 28,
    culturalSafetyScore: 9.2,
    communityConnections: 4,
    culturalAdvisors: 2,
  });

  const [culturalConnections, setCulturalConnections] = useState<CulturalConnection[]>([
    {
      type: 'iwi',
      name: 'Ngāti Whātua Ōrākei',
      status: 'active',
      lastContact: '2025-01-15',
      culturalArea: 'Traditional stories and cultural protocols',
    },
    {
      type: 'cultural-advisor',
      name: 'Aroha Te Kanawa',
      status: 'active',
      lastContact: '2025-01-10',
      culturalArea: 'Māori language and cultural practices',
    },
    {
      type: 'community-elder',
      name: 'Rangi Thompson',
      status: 'pending',
      lastContact: '2024-12-20',
      culturalArea: 'Traditional knowledge and community history',
    },
    {
      type: 'cultural-center',
      name: 'Te Papa Tongarewa',
      status: 'active',
      lastContact: '2025-01-12',
      culturalArea: 'Educational resources and cultural exhibitions',
    },
  ]);

  const [lessons, setLessons] = useState(enhancedNZCurriculum);
  const [selectedLesson, setSelectedLesson] = useState<(typeof enhancedNZCurriculum)[0] | null>(
    null,
  );

  useEffect(() => {
    // Simulate loading teacher data
    const timer = setTimeout(() => {
      setTeacherStats((prev) => ({
        ...prev,
        culturalSafetyScore: 9.4,
        communityConnections: 5,
      }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderOverview = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
        Kia ora! Welcome to Te Ao Mārama 🌿
      </h2>

      {/* Cultural Welcome */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h3 style={{ color: '#10B981', fontSize: '1.5rem', marginBottom: '1rem' }}>
          🌿 Cultural Mission Status
        </h3>
        <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.6' }}>
          You are actively contributing to authentic Māori cultural integration in education. Your
          cultural safety score of <strong>{teacherStats.culturalSafetyScore}/10</strong>{' '}
          demonstrates your commitment to culturally responsive teaching practices.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#3B82F6', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
            {teacherStats.totalLessons}
          </h3>
          <p style={{ color: 'white', margin: 0 }}>Enhanced Lessons</p>
          <p style={{ color: '#10B981', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
            Deep cultural integration
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#8B5CF6', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
            {teacherStats.studentsActive}
          </h3>
          <p style={{ color: 'white', margin: 0 }}>Active Students</p>
          <p style={{ color: '#10B981', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
            Engaged learners
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#F59E0B', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
            {teacherStats.culturalSafetyScore}
          </h3>
          <p style={{ color: 'white', margin: 0 }}>Cultural Safety</p>
          <p style={{ color: '#10B981', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
            Excellence achieved
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: '#EF4444', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
            {teacherStats.communityConnections}
          </h3>
          <p style={{ color: 'white', margin: 0 }}>Community Partners</p>
          <p style={{ color: '#10B981', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
            Active relationships
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h3 style={{ color: '#10B981', fontSize: '1.5rem', marginBottom: '1rem' }}>
          🌿 Recent Cultural Activity
        </h3>
        <div style={{ color: 'white' }}>
          <p>✅ Completed: Te Ao Māori Reading lesson with community elder consultation</p>
          <p>✅ Connected: New partnership with local cultural center</p>
          <p>🔄 In Progress: Whakapapa Writing project with family interviews</p>
          <p>📅 Upcoming: Cultural advisor visit for Treaty studies unit</p>
        </div>
      </div>
    </div>
  );

  const renderCulturalConnections = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
        🌿 Cultural Connections
      </h2>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h3 style={{ color: '#10B981', fontSize: '1.5rem', marginBottom: '1rem' }}>
          Community Partnership Status
        </h3>
        <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Your active community connections demonstrate your commitment to authentic cultural
          integration. These partnerships ensure culturally appropriate and community-validated
          educational content.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {culturalConnections.map((connection, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor:
                    connection.status === 'active'
                      ? '#10B981'
                      : connection.status === 'pending'
                      ? '#F59E0B'
                      : '#EF4444',
                  marginRight: '0.5rem',
                }}
              />
              <h4 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>{connection.name}</h4>
            </div>
            <p style={{ color: '#10B981', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
              {connection.type.replace('-', ' ').toUpperCase()}
            </p>
            <p style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{connection.culturalArea}</p>
            <p style={{ color: '#6B7280', margin: 0, fontSize: '0.9rem' }}>
              Last contact: {connection.lastContact}
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button
                style={{
                  background: connection.status === 'active' ? '#10B981' : '#6B7280',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                }}
              >
                {connection.status === 'active' ? 'Contact' : 'Reconnect'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: 'rgba(16, 185, 129, 0.1)',
          padding: '1.5rem',
          borderRadius: '15px',
          marginTop: '2rem',
          border: '2px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        <h4 style={{ color: '#10B981', margin: '0 0 1rem 0' }}>
          🌿 Cultural Partnership Guidelines
        </h4>
        <ul style={{ color: 'white', margin: 0, paddingLeft: '1.5rem' }}>
          <li>Always seek cultural approval before using traditional knowledge</li>
          <li>Maintain ongoing relationships with cultural advisors</li>
          <li>Respect cultural protocols and community values</li>
          <li>Share learning outcomes with community partners</li>
          <li>Ensure students understand cultural significance</li>
        </ul>
      </div>
    </div>
  );

  const renderLessons = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
        📚 Enhanced Curriculum Lessons
      </h2>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h3 style={{ color: '#10B981', fontSize: '1.5rem', marginBottom: '1rem' }}>
          🌿 Deep Cultural Integration
        </h3>
        <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Each lesson includes authentic Māori cultural integration, community partnerships, and
          culturally responsive assessment. Lessons are designed with cultural advisors and
          community validation.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedLesson(lesson)}
          >
            <h4 style={{ color: '#3B82F6', margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
              {lesson.title}
            </h4>
            <p style={{ color: 'white', margin: '0 0 1rem 0' }}>
              {lesson.subject} • {lesson.level}
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <h5 style={{ color: '#10B981', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
                🌿 Cultural Principles
              </h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {lesson.culturalConnections.maoriPrinciples.map((principle, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'rgba(16, 185, 129, 0.2)',
                      color: '#10B981',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                    }}
                  >
                    {principle}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <p style={{ color: '#6B7280', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                Duration: {lesson.duration} • Difficulty: {lesson.difficulty}
              </p>
              <p style={{ color: 'white', margin: 0, fontSize: '0.9rem' }}>
                {lesson.activities.length} activities • {lesson.resources.length} resources
              </p>
            </div>

            <button
              style={{
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              View Lesson Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLessonDetail = () => {
    if (!selectedLesson) return null;

    return (
      <div style={{ padding: '2rem' }}>
        <button
          onClick={() => setSelectedLesson(null)}
          style={{
            background: '#6B7280',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            cursor: 'pointer',
          }}
        >
          ← Back to Lessons
        </button>

        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'white' }}>
          {selectedLesson.title}
        </h2>
        <p style={{ color: '#10B981', fontSize: '1.2rem', marginBottom: '2rem' }}>
          {selectedLesson.subject} • {selectedLesson.level}
        </p>

        {/* Cultural Context */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '2rem',
            borderRadius: '15px',
            marginBottom: '2rem',
            border: '2px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <h3 style={{ color: '#10B981', fontSize: '1.5rem', marginBottom: '1rem' }}>
            🌿 Cultural Integration
          </h3>
          <div style={{ color: 'white' }}>
            <p>
              <strong>Māori Perspective:</strong> {selectedLesson.maoriPerspective}
            </p>
            <p>
              <strong>Pacific Perspective:</strong> {selectedLesson.pacificPerspective}
            </p>
          </div>
        </div>

        {/* Learning Objectives */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '15px',
            marginBottom: '2rem',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h3 style={{ color: '#3B82F6', fontSize: '1.5rem', marginBottom: '1rem' }}>
            📚 Learning Objectives
          </h3>
          <ul style={{ color: 'white', margin: 0, paddingLeft: '1.5rem' }}>
            {selectedLesson.learningObjectives.map((objective, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>
                {objective}
              </li>
            ))}
          </ul>
        </div>

        {/* Activities */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '2rem',
            borderRadius: '15px',
            marginBottom: '2rem',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h3 style={{ color: '#8B5CF6', fontSize: '1.5rem', marginBottom: '1rem' }}>
            🎯 Activities
          </h3>
          {selectedLesson.activities.map((activity, index) => (
            <div
              key={index}
              style={{
                marginBottom: '1.5rem',
                paddingBottom: '1.5rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <h4 style={{ color: '#8B5CF6', margin: '0 0 0.5rem 0' }}>{activity.title}</h4>
              <p style={{ color: 'white', margin: '0 0 0.5rem 0' }}>{activity.description}</p>
              <p style={{ color: '#10B981', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                Duration: {activity.duration}
              </p>
              <p style={{ color: '#F59E0B', margin: 0, fontSize: '0.9rem' }}>
                Cultural Integration: {activity.culturalIntegration}
              </p>
            </div>
          ))}
        </div>

        {/* Teacher Notes */}
        <div
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: '2rem',
            borderRadius: '15px',
            border: '2px solid rgba(245, 158, 11, 0.3)',
          }}
        >
          <h3 style={{ color: '#F59E0B', fontSize: '1.5rem', marginBottom: '1rem' }}>
            👨‍🏫 Teacher Notes
          </h3>
          <div style={{ color: 'white' }}>
            <p>
              <strong>Cultural Considerations:</strong>{' '}
              {selectedLesson.teacherNotes.culturalConsiderations}
            </p>
            <p>
              <strong>Differentiation Strategies:</strong>{' '}
              {selectedLesson.teacherNotes.differentiationStrategies}
            </p>
            <p>
              <strong>Assessment Guidance:</strong> {selectedLesson.teacherNotes.assessmentGuidance}
            </p>
            <p>
              <strong>Community Connections:</strong>{' '}
              {selectedLesson.teacherNotes.communityConnections}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const renderAssessment = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
        📊 Cultural Assessment Tools
      </h2>

      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h3 style={{ color: '#10B981', fontSize: '1.5rem', marginBottom: '1rem' }}>
          🌿 Cultural Safety Assessment
        </h3>
        <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Your current cultural safety score of{' '}
          <strong>{teacherStats.culturalSafetyScore}/10</strong>
          reflects your commitment to culturally responsive teaching. Continue engaging with
          community partners and cultural advisors to maintain excellence.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h4 style={{ color: '#3B82F6', margin: '0 0 1rem 0' }}>Cultural Competency</h4>
          <div style={{ color: 'white' }}>
            <p>✅ Community partnerships active</p>
            <p>✅ Cultural protocols followed</p>
            <p>✅ Student cultural awareness high</p>
            <p>🔄 Ongoing cultural advisor consultation</p>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h4 style={{ color: '#8B5CF6', margin: '0 0 1rem 0' }}>Student Engagement</h4>
          <div style={{ color: 'white' }}>
            <p>✅ High participation in cultural activities</p>
            <p>✅ Respectful cultural discussions</p>
            <p>✅ Authentic cultural connections made</p>
            <p>🔄 Family cultural story sharing</p>
          </div>
        </div>

        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
            borderRadius: '15px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <h4 style={{ color: '#F59E0B', margin: '0 0 1rem 0' }}>Community Impact</h4>
          <div style={{ color: 'white' }}>
            <p>✅ Positive community feedback</p>
            <p>✅ Cultural knowledge preserved</p>
            <p>✅ Intergenerational learning achieved</p>
            <p>🔄 Community story collection ongoing</p>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'cultural-connections', label: 'Cultural Connections', icon: '🌿' },
    { id: 'lessons', label: 'Enhanced Lessons', icon: '📚' },
    { id: 'assessment', label: 'Assessment', icon: '📊' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #1d4ed8 100%)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '1rem 2rem',
          borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>
          🌿 Te Ao Mārama - Enhanced Teacher Dashboard
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#10B981', fontSize: '1rem' }}>
          Authentic Cultural Integration • Community Partnerships • Educational Excellence
        </p>
      </div>

      {/* Navigation Tabs */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '1rem 2rem',
          borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#3B82F6' : 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {selectedLesson ? (
        renderLessonDetail()
      ) : (
        <>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'cultural-connections' && renderCulturalConnections()}
          {activeTab === 'lessons' && renderLessons()}
          {activeTab === 'assessment' && renderAssessment()}
        </>
      )}
    </div>
  );
};

export default EnhancedTeacherDashboard;
