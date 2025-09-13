import React, { useEffect, useState } from 'react';
import './EducationalDashboard.css';

interface Student {
  id: string;
  name: string;
  year: number;
  iwi: string;
  subjects: string[];
  culturalEngagement: number;
  academicProgress: number;
  teReoProficiency: number;
  lastActivity: Date;
  attendanceRate: number;
  culturalActivities: string[];
}

interface Lesson {
  id: string;
  title: string;
  subject: string;
  year: number;
  duration: number;
  culturalElements: string[];
  status: 'draft' | 'published' | 'archived';
  views: number;
  rating: number;
  completionRate: number;
  culturalImpact: number;
}

interface CulturalActivity {
  id: string;
  name: string;
  type:
    | 'kapa-haka'
    | 'marae-visit'
    | 'traditional-arts'
    | 'cultural-workshop'
    | 'te-reo'
    | 'tikanga';
  date: Date;
  participants: number;
  culturalImpact: number;
  description: string;
  location: string;
  facilitator: string;
}

interface Analytics {
  totalStudents: number;
  activeStudents: number;
  lessonsCompleted: number;
  culturalEngagement: number;
  averageProgress: number;
  topSubjects: string[];
  culturalInsights: {
    totalCulturalActivities: number;
    culturalAchievements: number;
    culturalMentors: number;
    culturalEvents: number;
  };
}

const EducationalDashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [culturalActivities, setCulturalActivities] = useState<CulturalActivity[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'students' | 'lessons' | 'cultural' | 'analytics'
  >('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading educational data
    const mockStudents: Student[] = [
      {
        id: '1',
        name: 'Aroha Smith',
        year: 8,
        iwi: 'Ngāti Porou',
        subjects: ['Te Reo Māori', 'Mathematics', 'Science', 'Social Studies'],
        culturalEngagement: 95,
        academicProgress: 88,
        teReoProficiency: 92,
        lastActivity: new Date(),
        attendanceRate: 96,
        culturalActivities: ['Kapa Haka', 'Marae Visits', 'Traditional Arts'],
      },
      {
        id: '2',
        name: 'Kai Johnson',
        year: 9,
        iwi: 'Tainui',
        subjects: ['Te Reo Māori', 'English', 'Social Studies', 'Art'],
        culturalEngagement: 87,
        academicProgress: 82,
        teReoProficiency: 78,
        lastActivity: new Date(Date.now() - 86400000),
        attendanceRate: 92,
        culturalActivities: ['Kapa Haka', 'Cultural Storytelling'],
      },
      {
        id: '3',
        name: 'Mana Williams',
        year: 10,
        iwi: 'Te Arawa',
        subjects: ['Te Reo Māori', 'Mathematics', 'Science', 'Physical Education'],
        culturalEngagement: 98,
        academicProgress: 94,
        teReoProficiency: 96,
        lastActivity: new Date(),
        attendanceRate: 98,
        culturalActivities: ['Kapa Haka', 'Marae Leadership', 'Cultural Teaching'],
      },
      {
        id: '4',
        name: 'Hine Cooper',
        year: 7,
        iwi: 'Ngāpuhi',
        subjects: ['Te Reo Māori', 'English', 'Mathematics', 'Art'],
        culturalEngagement: 91,
        academicProgress: 85,
        teReoProficiency: 88,
        lastActivity: new Date(),
        attendanceRate: 94,
        culturalActivities: ['Kapa Haka', 'Traditional Arts'],
      },
      {
        id: '5',
        name: 'Tama Brown',
        year: 8,
        iwi: 'Ngāti Kahungunu',
        subjects: ['Te Reo Māori', 'Science', 'Social Studies', 'Technology'],
        culturalEngagement: 89,
        academicProgress: 90,
        teReoProficiency: 85,
        lastActivity: new Date(Date.now() - 172800000),
        attendanceRate: 95,
        culturalActivities: ['Kapa Haka', 'Technology Integration'],
      },
    ];

    const mockLessons: Lesson[] = [
      {
        id: '1',
        title: 'Te Reo Māori - Whakapapa',
        subject: 'Te Reo Māori',
        year: 8,
        duration: 45,
        culturalElements: ['Whakapapa', 'Genealogy', 'Family History'],
        status: 'published',
        views: 156,
        rating: 4.8,
        completionRate: 92,
        culturalImpact: 95,
      },
      {
        id: '2',
        title: 'Mathematics - Traditional Counting',
        subject: 'Mathematics',
        year: 7,
        duration: 60,
        culturalElements: ['Traditional Counting', 'Māori Numbers', 'Cultural Context'],
        status: 'published',
        views: 203,
        rating: 4.6,
        completionRate: 88,
        culturalImpact: 87,
      },
      {
        id: '3',
        title: 'Science - Environmental Kaitiakitanga',
        subject: 'Science',
        year: 9,
        duration: 75,
        culturalElements: ['Environmental Care', 'Traditional Knowledge', 'Sustainability'],
        status: 'published',
        views: 134,
        rating: 4.9,
        completionRate: 94,
        culturalImpact: 98,
      },
      {
        id: '4',
        title: 'Social Studies - Treaty of Waitangi',
        subject: 'Social Studies',
        year: 10,
        duration: 90,
        culturalElements: ['Historical Context', 'Cultural Significance', 'Modern Impact'],
        status: 'published',
        views: 187,
        rating: 4.7,
        completionRate: 89,
        culturalImpact: 93,
      },
      {
        id: '5',
        title: 'Art - Traditional Māori Art',
        subject: 'Art',
        year: 8,
        duration: 60,
        culturalElements: ['Traditional Patterns', 'Cultural Symbols', 'Artistic Heritage'],
        status: 'published',
        views: 145,
        rating: 4.8,
        completionRate: 91,
        culturalImpact: 96,
      },
    ];

    const mockCulturalActivities: CulturalActivity[] = [
      {
        id: '1',
        name: 'Kapa Haka Performance',
        type: 'kapa-haka',
        date: new Date(),
        participants: 25,
        culturalImpact: 95,
        description: 'Traditional Māori performing arts including waiata, haka, and poi',
        location: 'School Hall',
        facilitator: 'Whaea Aroha',
      },
      {
        id: '2',
        name: 'Marae Visit - Ngāti Porou',
        type: 'marae-visit',
        date: new Date(Date.now() + 86400000 * 7),
        participants: 30,
        culturalImpact: 98,
        description: 'Visit to local marae to learn about tikanga and cultural protocols',
        location: 'Te Poho-o-Rawiri Marae',
        facilitator: 'Kaumātua Hone',
      },
      {
        id: '3',
        name: 'Traditional Arts Workshop',
        type: 'traditional-arts',
        date: new Date(Date.now() + 86400000 * 3),
        participants: 20,
        culturalImpact: 92,
        description: 'Learning traditional Māori arts including weaving and carving',
        location: 'Art Room',
        facilitator: 'Toi Artist Mana',
      },
      {
        id: '4',
        name: 'Te Reo Māori Immersion',
        type: 'te-reo',
        date: new Date(Date.now() + 86400000 * 5),
        participants: 35,
        culturalImpact: 89,
        description: 'Full immersion Te Reo Māori learning experience',
        location: 'Language Lab',
        facilitator: 'Kaiako Hine',
      },
      {
        id: '5',
        name: 'Tikanga Workshop',
        type: 'tikanga',
        date: new Date(Date.now() + 86400000 * 2),
        participants: 28,
        culturalImpact: 94,
        description: 'Learning about Māori customs, protocols, and cultural practices',
        location: 'Cultural Centre',
        facilitator: 'Kaumātua Tama',
      },
    ];

    const analyticsData: Analytics = {
      totalStudents: mockStudents.length,
      activeStudents: mockStudents.filter((s) => s.lastActivity > new Date(Date.now() - 86400000))
        .length,
      lessonsCompleted: mockLessons.reduce((sum, lesson) => sum + lesson.views, 0),
      culturalEngagement:
        mockStudents.reduce((sum, student) => sum + student.culturalEngagement, 0) /
        mockStudents.length,
      averageProgress:
        mockStudents.reduce((sum, student) => sum + student.academicProgress, 0) /
        mockStudents.length,
      topSubjects: ['Te Reo Māori', 'Mathematics', 'Science', 'Social Studies', 'Art'],
      culturalInsights: {
        totalCulturalActivities: mockCulturalActivities.length,
        culturalAchievements: 156,
        culturalMentors: 8,
        culturalEvents: 12,
      },
    };

    setStudents(mockStudents);
    setLessons(mockLessons);
    setCulturalActivities(mockCulturalActivities);
    setAnalytics(analyticsData);
    setIsLoading(false);
  }, []);

  const getMetricColor = (value: number) => {
    if (value >= 90) return '#10b981';
    if (value >= 80) return '#3b82f6';
    if (value >= 70) return '#f59e0b';
    return '#ef4444';
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'kapa-haka':
        return '🎭';
      case 'marae-visit':
        return '🏛️';
      case 'traditional-arts':
        return '🎨';
      case 'cultural-workshop':
        return '🌿';
      case 'te-reo':
        return '🗣️';
      case 'tikanga':
        return '📜';
      default:
        return '🌟';
    }
  };

  if (isLoading) {
    return (
      <div className="educational-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Educational Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="educational-dashboard">
      <div className="dashboard-header">
        <h1>🌿 Te Kura o TeAoMarama Educational Dashboard</h1>
        <p>Comprehensive educational platform with cultural integration and student excellence</p>
      </div>

      <div className="dashboard-controls">
        <div className="view-selector">
          <button
            className={selectedView === 'overview' ? 'active' : ''}
            onClick={() => setSelectedView('overview')}
          >
            Overview
          </button>
          <button
            className={selectedView === 'students' ? 'active' : ''}
            onClick={() => setSelectedView('students')}
          >
            Students
          </button>
          <button
            className={selectedView === 'lessons' ? 'active' : ''}
            onClick={() => setSelectedView('lessons')}
          >
            Lessons
          </button>
          <button
            className={selectedView === 'cultural' ? 'active' : ''}
            onClick={() => setSelectedView('cultural')}
          >
            Cultural Activities
          </button>
          <button
            className={selectedView === 'analytics' ? 'active' : ''}
            onClick={() => setSelectedView('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>

      {selectedView === 'overview' && analytics && (
        <div className="overview-section">
          <div className="overview-stats">
            <div className="stat-card">
              <h3>Total Students</h3>
              <span className="stat-value">{analytics.totalStudents}</span>
            </div>
            <div className="stat-card">
              <h3>Active Students</h3>
              <span className="stat-value">{analytics.activeStudents}</span>
            </div>
            <div className="stat-card">
              <h3>Lessons Completed</h3>
              <span className="stat-value">{analytics.lessonsCompleted}</span>
            </div>
            <div className="stat-card">
              <h3>Cultural Engagement</h3>
              <span
                className="stat-value"
                /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(analytics.culturalEngagement) }}
              >
                {analytics.culturalEngagement.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="cultural-overview">
            <h2>🌿 Cultural Excellence Overview</h2>
            <div className="cultural-metrics-grid">
              <div className="metric-item">
                <span className="metric-label">Cultural Activities</span>
                <span className="metric-value">
                  {analytics.culturalInsights.totalCulturalActivities}
                </span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Cultural Achievements</span>
                <span className="metric-value">
                  {analytics.culturalInsights.culturalAchievements}
                </span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Cultural Mentors</span>
                <span className="metric-value">{analytics.culturalInsights.culturalMentors}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Cultural Events</span>
                <span className="metric-value">{analytics.culturalInsights.culturalEvents}</span>
              </div>
            </div>
          </div>

          <div className="top-subjects">
            <h2>📚 Top Performing Subjects</h2>
            <div className="subjects-grid">
              {analytics.topSubjects.map((subject, index) => (
                <div key={index} className="subject-card">
                  <span className="subject-name">{subject}</span>
                  <span className="subject-rank">#{index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedView === 'students' && (
        <div className="students-section">
          <h2>👥 Student Management</h2>
          <div className="students-grid">
            {students.map((student) => (
              <div key={student.id} className="student-card">
                <div className="student-header">
                  <h3>{student.name}</h3>
                  <span className="student-year">Year {student.year}</span>
                  <span className="student-iwi">{student.iwi}</span>
                </div>

                <div className="student-metrics">
                  <div className="metric-row">
                    <span>Cultural Engagement:</span>
                    <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(student.culturalEngagement) }}>
                      {student.culturalEngagement}%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span>Academic Progress:</span>
                    <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(student.academicProgress) }}>
                      {student.academicProgress}%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span>Te Reo Proficiency:</span>
                    <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(student.teReoProficiency) }}>
                      {student.teReoProficiency}%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span>Attendance Rate:</span>
                    <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(student.attendanceRate) }}>
                      {student.attendanceRate}%
                    </span>
                  </div>
                </div>

                <div className="student-subjects">
                  {student.subjects.map((subject) => (
                    <span key={subject} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="student-cultural-activities">
                  <h4>Cultural Activities:</h4>
                  <div className="activities-list">
                    {student.culturalActivities.map((activity) => (
                      <span key={activity} className="activity-tag">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="student-activity">
                  <span>Last active: {student.lastActivity.toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'lessons' && (
        <div className="lessons-section">
          <h2>📚 Lesson Management</h2>
          <div className="lessons-grid">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="lesson-card">
                <div className="lesson-header">
                  <h3>{lesson.title}</h3>
                  <span className="lesson-subject">{lesson.subject}</span>
                  <span className="lesson-year">Year {lesson.year}</span>
                </div>

                <div className="lesson-metrics">
                  <div className="metric-row">
                    <span>Duration:</span>
                    <span>{lesson.duration} minutes</span>
                  </div>
                  <div className="metric-row">
                    <span>Views:</span>
                    <span>{lesson.views}</span>
                  </div>
                  <div className="metric-row">
                    <span>Rating:</span>
                    <span>⭐ {lesson.rating}/5</span>
                  </div>
                  <div className="metric-row">
                    <span>Completion Rate:</span>
                    <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(lesson.completionRate) }}>
                      {lesson.completionRate}%
                    </span>
                  </div>
                  <div className="metric-row">
                    <span>Cultural Impact:</span>
                    <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(lesson.culturalImpact) }}>
                      {lesson.culturalImpact}%
                    </span>
                  </div>
                </div>

                <div className="lesson-cultural-elements">
                  <h4>Cultural Elements:</h4>
                  <div className="cultural-elements-list">
                    {lesson.culturalElements.map((element) => (
                      <span key={element} className="cultural-element-tag">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lesson-status">
                  <span className={`status-badge ${lesson.status}`}>
                    {lesson.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'cultural' && (
        <div className="cultural-section">
          <h2>🌿 Cultural Activities Management</h2>
          <div className="cultural-activities-grid">
            {culturalActivities.map((activity) => (
              <div key={activity.id} className="cultural-activity-card">
                <div className="activity-header">
                  <span className="activity-icon">{getActivityTypeIcon(activity.type)}</span>
                  <h3>{activity.name}</h3>
                  <span className="activity-type">
                    {activity.type.replace('-', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="activity-details">
                  <div className="detail-row">
                    <span>Date:</span>
                    <span>{activity.date.toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span>Participants:</span>
                    <span>{activity.participants}</span>
                  </div>
                  <div className="detail-row">
                    <span>Cultural Impact:</span>
                    <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getMetricColor(activity.culturalImpact) }}>
                      {activity.culturalImpact}%
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Location:</span>
                    <span>{activity.location}</span>
                  </div>
                  <div className="detail-row">
                    <span>Facilitator:</span>
                    <span>{activity.facilitator}</span>
                  </div>
                </div>

                <div className="activity-description">
                  <p>{activity.description}</p>
                </div>

                <div className="activity-actions">
                  <button className="action-btn">View Details</button>
                  <button className="action-btn">Edit Activity</button>
                  <button className="action-btn">Manage Participants</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'analytics' && analytics && (
        <div className="analytics-section">
          <h2>📊 Comprehensive Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>Student Performance</h3>
              <div className="analytics-metrics">
                <div className="metric">
                  <span>Average Academic Progress</span>
                  <span className="metric-value">{analytics.averageProgress.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span>Average Cultural Engagement</span>
                  <span className="metric-value">{analytics.culturalEngagement.toFixed(1)}%</span>
                </div>
                <div className="metric">
                  <span>Active Student Rate</span>
                  <span className="metric-value">
                    {((analytics.activeStudents / analytics.totalStudents) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h3>Cultural Excellence</h3>
              <div className="analytics-metrics">
                <div className="metric">
                  <span>Total Cultural Activities</span>
                  <span className="metric-value">
                    {analytics.culturalInsights.totalCulturalActivities}
                  </span>
                </div>
                <div className="metric">
                  <span>Cultural Achievements</span>
                  <span className="metric-value">
                    {analytics.culturalInsights.culturalAchievements}
                  </span>
                </div>
                <div className="metric">
                  <span>Cultural Mentors</span>
                  <span className="metric-value">{analytics.culturalInsights.culturalMentors}</span>
                </div>
                <div className="metric">
                  <span>Cultural Events</span>
                  <span className="metric-value">{analytics.culturalInsights.culturalEvents}</span>
                </div>
              </div>
            </div>

            <div className="analytics-card">
              <h3>Learning Impact</h3>
              <div className="analytics-metrics">
                <div className="metric">
                  <span>Lessons Completed</span>
                  <span className="metric-value">{analytics.lessonsCompleted}</span>
                </div>
                <div className="metric">
                  <span>Top Subject</span>
                  <span className="metric-value">{analytics.topSubjects[0]}</span>
                </div>
                <div className="metric">
                  <span>Average Lesson Rating</span>
                  <span className="metric-value">4.7/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalDashboard;
