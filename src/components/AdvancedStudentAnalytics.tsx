import React, { useCallback, useEffect, useState } from 'react';
import './AdvancedStudentAnalytics.css';

interface StudentAnalytics {
  id: string;
  studentId: string;
  studentName: string;
  culturalMetrics: {
    teReoProficiency: number;
    culturalEngagement: number;
    traditionalKnowledge: number;
    communityParticipation: number;
    culturalSafety: number;
    whakapapaUnderstanding: number;
  };
  academicMetrics: {
    readingLevel: number;
    writingSkills: number;
    criticalThinking: number;
    problemSolving: number;
    creativity: number;
    collaboration: number;
  };
  learningAnalytics: {
    timeSpentLearning: number;
    completionRate: number;
    engagementScore: number;
    retentionRate: number;
    growthRate: number;
    culturalGrowth: number;
  };
  aiInsights: {
    learningPathRecommendation: string;
    culturalStrength: string;
    improvementArea: string;
    nextMilestone: string;
    culturalOpportunity: string;
  };
  lastUpdated: Date;
}

interface AnalyticsSummary {
  totalStudents: number;
  averageCulturalScore: number;
  averageAcademicScore: number;
  topPerformers: number;
  needsSupport: number;
  culturalChampions: number;
}

const AdvancedStudentAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<StudentAnalytics[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary>({
    totalStudents: 0,
    averageCulturalScore: 0,
    averageAcademicScore: 0,
    topPerformers: 0,
    needsSupport: 0,
    culturalChampions: 0,
  });
  const [selectedStudent, setSelectedStudent] = useState<StudentAnalytics | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'cultural' | 'academic' | 'growth'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'cultural' | 'academic' | 'growth'>('name');

  useEffect(() => {
    generateMockAnalytics();
  }, []);

  useEffect(() => {
    updateSummary();
  }, [updateSummary]);

  const generateMockAnalytics = () => {
    const mockStudents: StudentAnalytics[] = [
      {
        id: '1',
        studentId: 'STU001',
        studentName: 'Aria Thompson',
        culturalMetrics: {
          teReoProficiency: 85,
          culturalEngagement: 92,
          traditionalKnowledge: 78,
          communityParticipation: 88,
          culturalSafety: 95,
          whakapapaUnderstanding: 82,
        },
        academicMetrics: {
          readingLevel: 88,
          writingSkills: 85,
          criticalThinking: 90,
          problemSolving: 87,
          creativity: 92,
          collaboration: 89,
        },
        learningAnalytics: {
          timeSpentLearning: 12.5,
          completionRate: 94,
          engagementScore: 91,
          retentionRate: 89,
          growthRate: 8.5,
          culturalGrowth: 12.3,
        },
        aiInsights: {
          learningPathRecommendation: 'Advanced Te Reo immersion program',
          culturalStrength: 'Strong community engagement and cultural safety awareness',
          improvementArea: 'Traditional knowledge integration in academic work',
          nextMilestone: 'Complete Level 3 Te Reo certification',
          culturalOpportunity: 'Lead cultural storytelling workshop',
        },
        lastUpdated: new Date(),
      },
      {
        id: '2',
        studentId: 'STU002',
        studentName: 'Kai Williams',
        culturalMetrics: {
          teReoProficiency: 92,
          culturalEngagement: 95,
          traditionalKnowledge: 88,
          communityParticipation: 90,
          culturalSafety: 98,
          whakapapaUnderstanding: 85,
        },
        academicMetrics: {
          readingLevel: 95,
          writingSkills: 88,
          criticalThinking: 92,
          problemSolving: 90,
          creativity: 85,
          collaboration: 94,
        },
        learningAnalytics: {
          timeSpentLearning: 15.2,
          completionRate: 97,
          engagementScore: 94,
          retentionRate: 92,
          growthRate: 10.2,
          culturalGrowth: 15.8,
        },
        aiInsights: {
          learningPathRecommendation: 'Cultural leadership development program',
          culturalStrength: 'Exceptional Te Reo proficiency and cultural knowledge',
          improvementArea: 'Creative expression in academic contexts',
          nextMilestone: 'Become cultural mentor for junior students',
          culturalOpportunity: 'Develop traditional knowledge preservation project',
        },
        lastUpdated: new Date(),
      },
      {
        id: '3',
        studentId: 'STU003',
        studentName: 'Maya Chen',
        culturalMetrics: {
          teReoProficiency: 75,
          culturalEngagement: 82,
          traditionalKnowledge: 70,
          communityParticipation: 78,
          culturalSafety: 85,
          whakapapaUnderstanding: 68,
        },
        academicMetrics: {
          readingLevel: 92,
          writingSkills: 95,
          criticalThinking: 88,
          problemSolving: 85,
          creativity: 90,
          collaboration: 87,
        },
        learningAnalytics: {
          timeSpentLearning: 10.8,
          completionRate: 89,
          engagementScore: 85,
          retentionRate: 82,
          growthRate: 6.8,
          culturalGrowth: 8.5,
        },
        aiInsights: {
          learningPathRecommendation: 'Cultural immersion and Te Reo foundation program',
          culturalStrength: 'Strong academic foundation and learning commitment',
          improvementArea: 'Cultural knowledge and Te Reo proficiency',
          nextMilestone: 'Complete basic Te Reo conversation skills',
          culturalOpportunity: 'Participate in cultural exchange program',
        },
        lastUpdated: new Date(),
      },
      {
        id: '4',
        studentId: 'STU004',
        studentName: 'Tane Brown',
        culturalMetrics: {
          teReoProficiency: 88,
          culturalEngagement: 85,
          traditionalKnowledge: 92,
          communityParticipation: 88,
          culturalSafety: 90,
          whakapapaUnderstanding: 95,
        },
        academicMetrics: {
          readingLevel: 85,
          writingSkills: 82,
          criticalThinking: 88,
          problemSolving: 90,
          creativity: 85,
          collaboration: 92,
        },
        learningAnalytics: {
          timeSpentLearning: 13.5,
          completionRate: 91,
          engagementScore: 88,
          retentionRate: 85,
          growthRate: 7.2,
          culturalGrowth: 11.5,
        },
        aiInsights: {
          learningPathRecommendation: 'Academic writing and critical thinking enhancement',
          culturalStrength: 'Deep traditional knowledge and whakapapa understanding',
          improvementArea: 'Academic writing skills and critical analysis',
          nextMilestone: 'Improve writing proficiency to match cultural knowledge',
          culturalOpportunity: 'Share traditional knowledge through storytelling',
        },
        lastUpdated: new Date(),
      },
      {
        id: '5',
        studentId: 'STU005',
        studentName: 'Hana Patel',
        culturalMetrics: {
          teReoProficiency: 95,
          culturalEngagement: 98,
          traditionalKnowledge: 90,
          communityParticipation: 95,
          culturalSafety: 98,
          whakapapaUnderstanding: 88,
        },
        academicMetrics: {
          readingLevel: 90,
          writingSkills: 88,
          criticalThinking: 92,
          problemSolving: 88,
          creativity: 95,
          collaboration: 90,
        },
        learningAnalytics: {
          timeSpentLearning: 16.8,
          completionRate: 98,
          engagementScore: 96,
          retentionRate: 94,
          growthRate: 12.5,
          culturalGrowth: 18.2,
        },
        aiInsights: {
          learningPathRecommendation: 'Cultural leadership and academic excellence program',
          culturalStrength: 'Outstanding cultural engagement and Te Reo mastery',
          improvementArea: 'Minor refinement in academic writing structure',
          nextMilestone: 'Lead cultural education initiatives',
          culturalOpportunity: 'Develop cultural curriculum for younger students',
        },
        lastUpdated: new Date(),
      },
    ];

    setAnalytics(mockStudents);
  };

  const updateSummary = useCallback(() => {
    if (analytics.length === 0) return;

    const totalStudents = analytics.length;
    const averageCulturalScore =
      analytics.reduce((sum, student) => {
        const culturalAvg = Object.values(student.culturalMetrics).reduce((a, b) => a + b, 0) / 6;
        return sum + culturalAvg;
      }, 0) / totalStudents;

    const averageAcademicScore =
      analytics.reduce((sum, student) => {
        const academicAvg = Object.values(student.academicMetrics).reduce((a, b) => a + b, 0) / 6;
        return sum + academicAvg;
      }, 0) / totalStudents;

    const topPerformers = analytics.filter((student) => {
      const culturalAvg = Object.values(student.culturalMetrics).reduce((a, b) => a + b, 0) / 6;
      const academicAvg = Object.values(student.academicMetrics).reduce((a, b) => a + b, 0) / 6;
      return (culturalAvg + academicAvg) / 2 >= 90;
    }).length;

    const needsSupport = analytics.filter((student) => {
      const culturalAvg = Object.values(student.culturalMetrics).reduce((a, b) => a + b, 0) / 6;
      const academicAvg = Object.values(student.academicMetrics).reduce((a, b) => a + b, 0) / 6;
      return (culturalAvg + academicAvg) / 2 < 75;
    }).length;

    const culturalChampions = analytics.filter((student) => {
      const culturalAvg = Object.values(student.culturalMetrics).reduce((a, b) => a + b, 0) / 6;
      return culturalAvg >= 90;
    }).length;

    setSummary({
      totalStudents,
      averageCulturalScore: Math.round(averageCulturalScore),
      averageAcademicScore: Math.round(averageAcademicScore),
      topPerformers,
      needsSupport,
      culturalChampions,
    });
  }, [analytics]);

  const getFilteredAndSortedAnalytics = () => {
    let filtered = [...analytics];

    // Apply filters
    if (filterType === 'cultural') {
      filtered = filtered.filter((student) => {
        const culturalAvg = Object.values(student.culturalMetrics).reduce((a, b) => a + b, 0) / 6;
        return culturalAvg >= 85;
      });
    } else if (filterType === 'academic') {
      filtered = filtered.filter((student) => {
        const academicAvg = Object.values(student.academicMetrics).reduce((a, b) => a + b, 0) / 6;
        return academicAvg >= 85;
      });
    } else if (filterType === 'growth') {
      filtered = filtered.filter((student) => student.learningAnalytics.growthRate >= 8);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.studentName.localeCompare(b.studentName);
        case 'cultural': {
          const aCultural = Object.values(a.culturalMetrics).reduce((sum, val) => sum + val, 0) / 6;
          const bCultural = Object.values(b.culturalMetrics).reduce((sum, val) => sum + val, 0) / 6;
          return bCultural - aCultural;
        }
        case 'academic': {
          const aAcademic = Object.values(a.academicMetrics).reduce((sum, val) => sum + val, 0) / 6;
          const bAcademic = Object.values(b.academicMetrics).reduce((sum, val) => sum + val, 0) / 6;
          return bAcademic - aAcademic;
        }
        case 'growth':
          return b.learningAnalytics.growthRate - a.learningAnalytics.growthRate;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const getCulturalScore = (student: StudentAnalytics) => {
    return Object.values(student.culturalMetrics).reduce((sum, val) => sum + val, 0) / 6;
  };

  const getAcademicScore = (student: StudentAnalytics) => {
    return Object.values(student.academicMetrics).reduce((sum, val) => sum + val, 0) / 6;
  };

  const getOverallScore = (student: StudentAnalytics) => {
    const cultural = getCulturalScore(student);
    const academic = getAcademicScore(student);
    return (cultural + academic) / 2;
  };

  return (
    <div className="advanced-student-analytics">
      <div className="analytics-container">
        <div className="analytics-header">
          <h1>🎓 Advanced Student Analytics Dashboard</h1>
          <p>Comprehensive student performance tracking with cultural intelligence integration</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <h3>Total Students</h3>
            <div className="summary-value">{summary.totalStudents}</div>
            <div className="summary-label">Active learners</div>
          </div>
          <div className="summary-card">
            <h3>Cultural Excellence</h3>
            <div className="summary-value">{summary.averageCulturalScore}%</div>
            <div className="summary-label">Average cultural score</div>
          </div>
          <div className="summary-card">
            <h3>Academic Excellence</h3>
            <div className="summary-value">{summary.averageAcademicScore}%</div>
            <div className="summary-label">Average academic score</div>
          </div>
          <div className="summary-card">
            <h3>Top Performers</h3>
            <div className="summary-value">{summary.topPerformers}</div>
            <div className="summary-label">90%+ overall score</div>
          </div>
          <div className="summary-card">
            <h3>Cultural Champions</h3>
            <div className="summary-value">{summary.culturalChampions}</div>
            <div className="summary-label">90%+ cultural score</div>
          </div>
          <div className="summary-card">
            <h3>Need Support</h3>
            <div className="summary-value">{summary.needsSupport}</div>
            <div className="summary-label">Below 75% overall</div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="analytics-controls">
          <div className="filter-section">
            <label htmlFor="filter-type">Filter by:</label>
            <select
              id="filter-type"
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as 'all' | 'cultural' | 'academic' | 'growth')
              }
              aria-label="Filter students by type"
            >
              <option value="all">All Students</option>
              <option value="cultural">Cultural Excellence (85%+)</option>
              <option value="academic">Academic Excellence (85%+)</option>
              <option value="growth">High Growth (8%+)</option>
            </select>
          </div>
          <div className="sort-section">
            <label htmlFor="sort-by">Sort by:</label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as 'name' | 'cultural' | 'academic' | 'growth')
              }
              aria-label="Sort students by criteria"
            >
              <option value="name">Name</option>
              <option value="cultural">Cultural Score</option>
              <option value="academic">Academic Score</option>
              <option value="growth">Growth Rate</option>
            </select>
          </div>
        </div>

        {/* Student Analytics Grid */}
        <div className="student-analytics-grid">
          {getFilteredAndSortedAnalytics().map((student) => (
            <div
              key={student.id}
              className="student-card"
              onClick={() => setSelectedStudent(student)}
            >
              <div className="student-header">
                <h3>{student.studentName}</h3>
                <span className="student-id">{student.studentId}</span>
              </div>

              <div className="score-overview">
                <div className="score-item">
                  <span className="score-label">Cultural</span>
                  <span className="score-value">{Math.round(getCulturalScore(student))}%</span>
                </div>
                <div className="score-item">
                  <span className="score-label">Academic</span>
                  <span className="score-value">{Math.round(getAcademicScore(student))}%</span>
                </div>
                <div className="score-item overall">
                  <span className="score-label">Overall</span>
                  <span className="score-value">{Math.round(getOverallScore(student))}%</span>
                </div>
              </div>

              <div className="growth-indicators">
                <div className="growth-item">
                  <span>📈 Growth</span>
                  <span className="growth-value">+{student.learningAnalytics.growthRate}%</span>
                </div>
                <div className="growth-item">
                  <span>🌿 Cultural</span>
                  <span className="growth-value">+{student.learningAnalytics.culturalGrowth}%</span>
                </div>
              </div>

              <div className="ai-insight-preview">
                <span className="insight-label">AI Insight:</span>
                <span className="insight-text">
                  {student.aiInsights.learningPathRecommendation}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Student Modal */}
        {selectedStudent && (
          <div className="student-modal-overlay" onClick={() => setSelectedStudent(null)}>
            <div className="student-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>{selectedStudent.studentName} - Detailed Analytics</h2>
                <button
                  className="close-modal"
                  onClick={() => setSelectedStudent(null)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              <div className="modal-content">
                <div className="metrics-section">
                  <h3>Cultural Metrics</h3>
                  <div className="metrics-grid">
                    <div className="metric-item">
                      <span>Te Reo Proficiency</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill"
                          style={{ width: `${selectedStudent.culturalMetrics.teReoProficiency}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">
                        {selectedStudent.culturalMetrics.teReoProficiency}%
                      </span>
                    </div>
                    <div className="metric-item">
                      <span>Cultural Engagement</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill"
                          style={{
                            width: `${selectedStudent.culturalMetrics.culturalEngagement}%`,
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">
                        {selectedStudent.culturalMetrics.culturalEngagement}%
                      </span>
                    </div>
                    <div className="metric-item">
                      <span>Traditional Knowledge</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill"
                          style={{
                            width: `${selectedStudent.culturalMetrics.traditionalKnowledge}%`,
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">
                        {selectedStudent.culturalMetrics.traditionalKnowledge}%
                      </span>
                    </div>
                    <div className="metric-item">
                      <span>Community Participation</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill"
                          style={{
                            width: `${selectedStudent.culturalMetrics.communityParticipation}%`,
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">
                        {selectedStudent.culturalMetrics.communityParticipation}%
                      </span>
                    </div>
                    <div className="metric-item">
                      <span>Cultural Safety</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill"
                          style={{ width: `${selectedStudent.culturalMetrics.culturalSafety}%` }}
                        ></div>
                      </div>
                      <span className="metric-value">
                        {selectedStudent.culturalMetrics.culturalSafety}%
                      </span>
                    </div>
                    <div className="metric-item">
                      <span>Whakapapa Understanding</span>
                      <div className="metric-bar">
                        <div
                          className="metric-fill"
                          style={{
                            width: `${selectedStudent.culturalMetrics.whakapapaUnderstanding}%`,
                          }}
                        ></div>
                      </div>
                      <span className="metric-value">
                        {selectedStudent.culturalMetrics.whakapapaUnderstanding}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ai-insights-section">
                  <h3>AI-Powered Insights</h3>
                  <div className="insights-grid">
                    <div className="insight-card">
                      <h4>Learning Path Recommendation</h4>
                      <p>{selectedStudent.aiInsights.learningPathRecommendation}</p>
                    </div>
                    <div className="insight-card">
                      <h4>Cultural Strength</h4>
                      <p>{selectedStudent.aiInsights.culturalStrength}</p>
                    </div>
                    <div className="insight-card">
                      <h4>Improvement Area</h4>
                      <p>{selectedStudent.aiInsights.improvementArea}</p>
                    </div>
                    <div className="insight-card">
                      <h4>Next Milestone</h4>
                      <p>{selectedStudent.aiInsights.nextMilestone}</p>
                    </div>
                    <div className="insight-card">
                      <h4>Cultural Opportunity</h4>
                      <p>{selectedStudent.aiInsights.culturalOpportunity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedStudentAnalytics;
