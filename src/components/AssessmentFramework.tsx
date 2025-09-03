import React, { useEffect, useState } from 'react';
import './AssessmentFramework.css';

interface Assessment {
  id: string;
  title: string;
  type: 'formative' | 'summative' | 'cultural' | 'project' | 'quiz';
  subject: string;
  yearLevel: number;
  description: string;
  culturalElements: string[];
  learningObjectives: string[];
  rubric: Array<{
    criterion: string;
    excellent: string;
    good: string;
    satisfactory: string;
    needsImprovement: string;
    culturalConsideration: string;
  }>;
  questions: Array<{
    id: string;
    type: 'multiple-choice' | 'essay' | 'cultural-reflection' | 'project' | 'oral';
    question: string;
    options?: string[];
    culturalContext?: string;
    teReoIntegration?: boolean;
  }>;
  dueDate: string;
  duration: number; // in minutes
  totalMarks: number;
  status: 'draft' | 'published' | 'in-progress' | 'completed' | 'graded';
  submissions: Array<{
    studentId: string;
    studentName: string;
    submittedAt: string;
    score: number;
    feedback: string;
    culturalEngagement: number;
  }>;
}

// 🧠 Superintelligence Integration
interface AIGradingAssistant {
  id: string;
  name: string;
  status: 'active' | 'processing' | 'idle';
  currentTask: string;
  accuracy: number;
  culturalSensitivity: number;
  assessmentsGraded: number;
}

interface CulturalComplianceMetrics {
  teReoIntegration: number;
  tikangaCompliance: number;
  culturalRepresentation: number;
  communityEngagement: number;
  overallCulturalScore: number;
}

interface RealTimeAnalytics {
  totalAssessments: number;
  activeAssessments: number;
  averageScore: number;
  culturalEngagement: number;
  completionRate: number;
  aiGradingEfficiency: number;
}

const AssessmentFramework: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  // const [students, setStudents] = useState<Student[]>([]);
  const [selectedView, setSelectedView] = useState<
    'create' | 'manage' | 'grade' | 'analytics' | 'cultural' | 'ai-assistant'
  >('create');
  // const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 🧠 Superintelligence State
  const [aiGradingAssistant, setAiGradingAssistant] = useState<AIGradingAssistant>({
    id: 'ai-grader-001',
    name: 'Cultural Assessment AI',
    status: 'active',
    currentTask: 'Grading Whakapapa Research Projects',
    accuracy: 94.2,
    culturalSensitivity: 98.5,
    assessmentsGraded: 156,
  });

  const [culturalMetrics] = useState<CulturalComplianceMetrics>({
    teReoIntegration: 85,
    tikangaCompliance: 92,
    culturalRepresentation: 78,
    communityEngagement: 88,
    overallCulturalScore: 85.8,
  });

  const [realTimeAnalytics] = useState<RealTimeAnalytics>({
    totalAssessments: 24,
    activeAssessments: 8,
    averageScore: 87,
    culturalEngagement: 92,
    completionRate: 94,
    aiGradingEfficiency: 96.5,
  });

  useEffect(() => {
    // Simulate loading assessment data
    const loadAssessmentData = () => {
      const mockAssessments: Assessment[] = [
        {
          id: 'assess-001',
          title: 'Whakapapa Research Project',
          type: 'project',
          subject: 'Social Studies',
          yearLevel: 8,
          description:
            'Research and present your family genealogy with cultural context and traditional storytelling elements.',
          culturalElements: [
            'Whakapapa',
            'Māori Identity',
            'Cultural Storytelling',
            'Family History',
          ],
          learningObjectives: [
            'Understand the concept of whakapapa and its importance in Māori culture',
            'Research and document family genealogy',
            'Present findings using traditional storytelling methods',
            'Integrate cultural elements into academic presentation',
          ],
          rubric: [
            {
              criterion: 'Cultural Understanding',
              excellent:
                'Demonstrates deep understanding of whakapapa concepts and cultural significance',
              good: 'Shows good understanding of whakapapa with some cultural context',
              satisfactory: 'Basic understanding of whakapapa concepts',
              needsImprovement: 'Limited understanding of cultural concepts',
              culturalConsideration: 'Respects cultural protocols and traditional knowledge',
            },
            {
              criterion: 'Research Quality',
              excellent: 'Comprehensive research with multiple sources and cultural validation',
              good: 'Good research with reliable sources',
              satisfactory: 'Adequate research with basic sources',
              needsImprovement: 'Limited research or unreliable sources',
              culturalConsideration: 'Includes both academic and cultural sources',
            },
            {
              criterion: 'Presentation',
              excellent:
                'Engaging presentation with strong cultural elements and clear communication',
              good: 'Clear presentation with some cultural integration',
              satisfactory: 'Basic presentation with limited cultural elements',
              needsImprovement: 'Unclear presentation with no cultural integration',
              culturalConsideration: 'Uses appropriate cultural presentation methods',
            },
          ],
          questions: [
            {
              id: 'q1',
              type: 'project',
              question:
                'Create a whakapapa chart for your family, including at least three generations. Include cultural elements and traditional stories.',
              culturalContext:
                'Whakapapa is the foundation of Māori identity and connects people to their ancestors and the natural world.',
              teReoIntegration: true,
            },
            {
              id: 'q2',
              type: 'cultural-reflection',
              question:
                'Reflect on how understanding your whakapapa has influenced your sense of identity and connection to culture.',
              culturalContext: 'Personal reflection on cultural identity and belonging',
              teReoIntegration: false,
            },
          ],
          dueDate: '2024-01-25',
          duration: 120,
          totalMarks: 100,
          status: 'published',
          submissions: [
            {
              studentId: 'student-001',
              studentName: 'Aria Tāne',
              submittedAt: '2024-01-20',
              score: 92,
              feedback:
                'Excellent work! Strong cultural integration and comprehensive research. Well done on incorporating traditional storytelling methods.',
              culturalEngagement: 95,
            },
            {
              studentId: 'student-002',
              studentName: 'Kai Smith',
              submittedAt: '2024-01-22',
              score: 78,
              feedback:
                'Good research but could strengthen cultural elements. Consider including more traditional stories and cultural context.',
              culturalEngagement: 82,
            },
          ],
        },
        {
          id: 'assess-002',
          title: 'Critical Literacy Quiz',
          type: 'quiz',
          subject: 'English',
          yearLevel: 8,
          description:
            'Test understanding of critical literacy concepts with focus on cultural representation in media.',
          culturalElements: [
            'Critical Analysis',
            'Cultural Representation',
            'Media Literacy',
            'Bias Detection',
          ],
          learningObjectives: [
            'Analyze texts for cultural bias and representation',
            'Identify stereotypes and misrepresentations',
            'Evaluate media for cultural accuracy',
            'Develop critical thinking about cultural content',
          ],
          rubric: [
            {
              criterion: 'Critical Analysis',
              excellent: 'Sophisticated analysis with deep cultural understanding',
              good: 'Good analysis with cultural awareness',
              satisfactory: 'Basic analysis with some cultural consideration',
              needsImprovement: 'Limited analysis without cultural context',
              culturalConsideration: 'Considers cultural perspectives in analysis',
            },
          ],
          questions: [
            {
              id: 'q1',
              type: 'multiple-choice',
              question:
                'When analyzing media for cultural representation, what should you consider first?',
              options: [
                'The visual appeal of the content',
                'The cultural background and perspective of the creators',
                'The popularity of the media',
                'The technical quality of production',
              ],
              culturalContext: 'Understanding creator perspective is crucial for cultural analysis',
              teReoIntegration: false,
            },
            {
              id: 'q2',
              type: 'essay',
              question:
                'Analyze a recent news article or media piece for cultural representation. Identify any biases or stereotypes and suggest how it could be more culturally inclusive.',
              culturalContext: 'Real-world application of critical literacy skills',
              teReoIntegration: false,
            },
          ],
          dueDate: '2024-01-22',
          duration: 45,
          totalMarks: 50,
          status: 'draft',
          submissions: [],
        },
        {
          id: 'assess-003',
          title: 'Te Reo Māori Oral Assessment',
          type: 'cultural',
          subject: 'Te Reo Māori',
          yearLevel: 8,
          description:
            'Demonstrate proficiency in Te Reo Māori through oral presentation and cultural dialogue.',
          culturalElements: [
            'Te Reo Māori',
            'Oral Tradition',
            'Cultural Dialogue',
            'Whanaungatanga',
          ],
          learningObjectives: [
            'Demonstrate oral proficiency in Te Reo Māori',
            'Engage in cultural dialogue with respect',
            'Apply cultural protocols in communication',
            'Build relationships through language',
          ],
          rubric: [
            {
              criterion: 'Language Proficiency',
              excellent: 'Fluent Te Reo Māori with excellent pronunciation and grammar',
              good: 'Good Te Reo Māori with minor pronunciation issues',
              satisfactory: 'Basic Te Reo Māori with some errors',
              needsImprovement: 'Limited Te Reo Māori proficiency',
              culturalConsideration: 'Uses appropriate cultural language forms',
            },
            {
              criterion: 'Cultural Engagement',
              excellent: 'Deep cultural engagement with appropriate protocols',
              good: 'Good cultural engagement with some protocols',
              satisfactory: 'Basic cultural engagement',
              needsImprovement: 'Limited cultural engagement',
              culturalConsideration: 'Respects cultural protocols and traditions',
            },
          ],
          questions: [
            {
              id: 'q1',
              type: 'oral',
              question:
                'Introduce yourself in Te Reo Māori, including your whakapapa and connection to place.',
              culturalContext: 'Traditional Māori introduction protocol',
              teReoIntegration: true,
            },
            {
              id: 'q2',
              type: 'cultural-reflection',
              question:
                'Discuss the importance of Te Reo Māori in maintaining cultural identity and connection.',
              culturalContext: 'Language as cultural preservation',
              teReoIntegration: true,
            },
          ],
          dueDate: '2024-01-28',
          duration: 30,
          totalMarks: 60,
          status: 'published',
          submissions: [
            {
              studentId: 'student-003',
              studentName: 'Hana Patel',
              submittedAt: '2024-01-25',
              score: 95,
              feedback:
                'Outstanding Te Reo Māori proficiency! Excellent cultural engagement and respect for protocols.',
              culturalEngagement: 98,
            },
          ],
        },
      ];

      setAssessments(mockAssessments);
      setIsLoading(false);
    };

    loadAssessmentData();

    // 🧠 Simulate real-time AI assistant updates
    const aiUpdateInterval = setInterval(() => {
      setAiGradingAssistant((prev) => ({
        ...prev,
        assessmentsGraded: prev.assessmentsGraded + Math.floor(Math.random() * 2),
        accuracy: Math.min(100, prev.accuracy + (Math.random() - 0.5) * 0.5),
        culturalSensitivity: Math.min(100, prev.culturalSensitivity + (Math.random() - 0.5) * 0.3),
      }));
    }, 10000);

    return () => clearInterval(aiUpdateInterval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return '#6b7280';
      case 'published':
        return '#10b981';
      case 'in-progress':
        return '#f59e0b';
      case 'completed':
        return '#3b82f6';
      case 'graded':
        return '#8b5cf6';
      default:
        return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'formative':
        return '📝';
      case 'summative':
        return '📊';
      case 'cultural':
        return '🌿';
      case 'project':
        return '🎯';
      case 'quiz':
        return '❓';
      default:
        return '📋';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981';
    if (score >= 80) return '#f59e0b';
    if (score >= 70) return '#ef4444';
    return '#6b7280';
  };

  /* const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 80) return '#f59e0b';
    if (percentage >= 70) return '#ef4444';
    return '#6b7280';
  }; */

  if (isLoading) {
    return (
      <div className="assessment-framework-loading">
        <div className="loading-spinner"></div>
        <p>Loading Assessment Framework...</p>
      </div>
    );
  }

  return (
    <div className="assessment-framework">
      {/* Header Section */}
      <div className="framework-header">
        <div className="header-content">
          <h1>📋 Assessment Framework</h1>
          <p>
            Comprehensive assessment tools with cultural integration and AI-powered grading
            assistance
          </p>
        </div>
        <div className="header-actions">
          <button className="action-btn primary">Create New Assessment</button>
          <button className="action-btn secondary">Import Template</button>
        </div>
      </div>

      {/* Real-time Analytics Banner */}
      <div className="analytics-banner">
        <div className="analytics-item">
          <span className="analytics-number">{realTimeAnalytics.totalAssessments}</span>
          <span className="analytics-label">Total Assessments</span>
        </div>
        <div className="analytics-item">
          <span className="analytics-number">{realTimeAnalytics.activeAssessments}</span>
          <span className="analytics-label">Active</span>
        </div>
        <div className="analytics-item">
          <span className="analytics-number">{realTimeAnalytics.averageScore}%</span>
          <span className="analytics-label">Avg Score</span>
        </div>
        <div className="analytics-item">
          <span className="analytics-number">{realTimeAnalytics.culturalEngagement}%</span>
          <span className="analytics-label">Cultural Engagement</span>
        </div>
        <div className="analytics-item ai">
          <span className="analytics-number">🧠 {aiGradingAssistant.assessmentsGraded}</span>
          <span className="analytics-label">AI Graded</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="framework-tabs">
        <button
          className={`tab-btn ${selectedView === 'create' ? 'active' : ''}`}
          onClick={() => setSelectedView('create')}
        >
          ✏️ Create Assessment
        </button>
        <button
          className={`tab-btn ${selectedView === 'manage' ? 'active' : ''}`}
          onClick={() => setSelectedView('manage')}
        >
          📚 Manage Assessments
        </button>
        <button
          className={`tab-btn ${selectedView === 'grade' ? 'active' : ''}`}
          onClick={() => setSelectedView('grade')}
        >
          📊 Grade & Feedback
        </button>
        <button
          className={`tab-btn ${selectedView === 'analytics' ? 'active' : ''}`}
          onClick={() => setSelectedView('analytics')}
        >
          📈 Analytics
        </button>
        <button
          className={`tab-btn ${selectedView === 'cultural' ? 'active' : ''}`}
          onClick={() => setSelectedView('cultural')}
        >
          🌿 Cultural Insights
        </button>
        <button
          className={`tab-btn ${selectedView === 'ai-assistant' ? 'active' : ''}`}
          onClick={() => setSelectedView('ai-assistant')}
        >
          🧠 AI Assistant
        </button>
      </div>

      {/* Content Sections */}
      <div className="framework-content">
        {selectedView === 'create' && (
          <div className="create-section">
            <h2>Create New Assessment</h2>
            <div className="assessment-form">
              <div className="form-group">
                <label htmlFor="assessment-title">Assessment Title</label>
                <input
                  id="assessment-title"
                  type="text"
                  placeholder="Enter assessment title"
                  aria-label="Assessment title"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="assessment-type">Type</label>
                  <select id="assessment-type" aria-label="Select assessment type">
                    <option value="formative">📝 Formative</option>
                    <option value="summative">📊 Summative</option>
                    <option value="cultural">🌿 Cultural</option>
                    <option value="project">🎯 Project</option>
                    <option value="quiz">❓ Quiz</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="assessment-subject">Subject</label>
                  <select id="assessment-subject" aria-label="Select subject">
                    <option value="english">English</option>
                    <option value="social-studies">Social Studies</option>
                    <option value="te-reo">Te Reo Māori</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="assessment-year">Year Level</label>
                  <select id="assessment-year" aria-label="Select year level">
                    <option value="7">Year 7</option>
                    <option value="8">Year 8</option>
                    <option value="9">Year 9</option>
                    <option value="10">Year 10</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="assessment-description">Description</label>
                <textarea
                  id="assessment-description"
                  placeholder="Describe the assessment and its cultural elements"
                  aria-label="Assessment description"
                ></textarea>
              </div>
              <div className="form-group">
                <label>Cultural Elements</label>
                <div className="cultural-tags">
                  <span className="tag">Whakapapa</span>
                  <span className="tag">Tikanga</span>
                  <span className="tag">Te Reo Māori</span>
                  <span className="tag">Cultural Identity</span>
                  <span className="tag">Traditional Knowledge</span>
                  <span className="tag">Community Engagement</span>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="assessment-due-date">Due Date</label>
                  <input id="assessment-due-date" type="date" aria-label="Assessment due date" />
                </div>
                <div className="form-group">
                  <label htmlFor="assessment-duration">Duration (minutes)</label>
                  <input
                    id="assessment-duration"
                    type="number"
                    min="15"
                    max="180"
                    aria-label="Assessment duration in minutes"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="assessment-marks">Total Marks</label>
                  <input
                    id="assessment-marks"
                    type="number"
                    min="10"
                    max="100"
                    aria-label="Total marks for assessment"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-secondary">Save Draft</button>
                <button className="btn-primary">Create Assessment</button>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'manage' && (
          <div className="manage-section">
            <h2>Manage Assessments</h2>
            <div className="assessments-grid">
              {assessments.map((assessment) => (
                <div key={assessment.id} className="assessment-card">
                  <div className="assessment-header">
                    <div className="assessment-icon">{getTypeIcon(assessment.type)}</div>
                    <div className="assessment-info">
                      <h3>{assessment.title}</h3>
                      <p>
                        {assessment.subject} • Year {assessment.yearLevel}
                      </p>
                    </div>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(assessment.status) }}
                    >
                      {assessment.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="assessment-details">
                    <p>{assessment.description}</p>
                    <div className="cultural-elements">
                      {assessment.culturalElements.map((element, index) => (
                        <span key={index} className="cultural-tag">
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="assessment-metrics">
                    <div className="metric">
                      <span className="metric-label">Due:</span>
                      <span className="metric-value">{assessment.dueDate}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Duration:</span>
                      <span className="metric-value">{assessment.duration} min</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Marks:</span>
                      <span className="metric-value">{assessment.totalMarks}</span>
                    </div>
                    <div className="metric">
                      <span className="metric-label">Submissions:</span>
                      <span className="metric-value">{assessment.submissions.length}</span>
                    </div>
                  </div>
                  <div className="assessment-actions">
                    <button className="action-btn">Edit</button>
                    <button className="action-btn">View</button>
                    <button className="action-btn">Grade</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedView === 'grade' && (
          <div className="grade-section">
            <h2>Grade & Feedback</h2>
            <div className="submissions-list">
              {assessments
                .filter((assessment) => assessment.submissions.length > 0)
                .map((assessment) => (
                  <div key={assessment.id} className="submission-group">
                    <h3>{assessment.title}</h3>
                    {assessment.submissions.map((submission) => (
                      <div key={submission.studentId} className="submission-card">
                        <div className="submission-header">
                          <div className="student-info">
                            <h4>{submission.studentName}</h4>
                            <p>Submitted: {submission.submittedAt}</p>
                          </div>
                          <div className="score-info">
                            <span
                              className="score"
                              style={{ color: getScoreColor(submission.score) }}
                            >
                              {submission.score}/{assessment.totalMarks}
                            </span>
                            <span className="cultural-engagement">
                              Cultural: {submission.culturalEngagement}%
                            </span>
                          </div>
                        </div>
                        <div className="feedback-section">
                          <h5>Feedback</h5>
                          <p>{submission.feedback}</p>
                        </div>
                        <div className="submission-actions">
                          <button className="action-btn">View Submission</button>
                          <button className="action-btn">Edit Feedback</button>
                          <button className="action-btn">Download</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        )}

        {selectedView === 'analytics' && (
          <div className="analytics-section">
            <h2>Assessment Analytics</h2>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Overall Performance</h3>
                <div className="performance-metrics">
                  <div className="metric">
                    <span className="metric-number">{realTimeAnalytics.averageScore}%</span>
                    <span className="metric-label">Average Score</span>
                  </div>
                  <div className="metric">
                    <span className="metric-number">{realTimeAnalytics.culturalEngagement}%</span>
                    <span className="metric-label">Cultural Engagement</span>
                  </div>
                  <div className="metric">
                    <span className="metric-number">{realTimeAnalytics.totalAssessments}</span>
                    <span className="metric-label">Total Assessments</span>
                  </div>
                  <div className="metric">
                    <span className="metric-number">{realTimeAnalytics.completionRate}%</span>
                    <span className="metric-label">Completion Rate</span>
                  </div>
                </div>
              </div>
              <div className="analytics-card">
                <h3>Assessment Types</h3>
                <div className="type-breakdown">
                  <div className="type-item">
                    <span className="type-icon">📝</span>
                    <span className="type-name">Formative</span>
                    <span className="type-count">8</span>
                  </div>
                  <div className="type-item">
                    <span className="type-icon">📊</span>
                    <span className="type-name">Summative</span>
                    <span className="type-count">6</span>
                  </div>
                  <div className="type-item">
                    <span className="type-icon">🌿</span>
                    <span className="type-name">Cultural</span>
                    <span className="type-count">5</span>
                  </div>
                  <div className="type-item">
                    <span className="type-icon">🎯</span>
                    <span className="type-name">Project</span>
                    <span className="type-count">3</span>
                  </div>
                </div>
              </div>
              <div className="analytics-card">
                <h3>🧠 AI Grading Performance</h3>
                <div className="ai-performance">
                  <div className="ai-metric">
                    <span className="ai-label">Accuracy</span>
                    <div className="ai-progress">
                      <div
                        className="ai-progress-fill"
                        style={{ width: `${aiGradingAssistant.accuracy}%` }}
                      ></div>
                    </div>
                    <span className="ai-value">{aiGradingAssistant.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="ai-metric">
                    <span className="ai-label">Cultural Sensitivity</span>
                    <div className="ai-progress">
                      <div
                        className="ai-progress-fill cultural"
                        style={{ width: `${aiGradingAssistant.culturalSensitivity}%` }}
                      ></div>
                    </div>
                    <span className="ai-value">
                      {aiGradingAssistant.culturalSensitivity.toFixed(1)}%
                    </span>
                  </div>
                  <div className="ai-metric">
                    <span className="ai-label">Assessments Graded</span>
                    <span className="ai-value">{aiGradingAssistant.assessmentsGraded}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'cultural' && (
          <div className="cultural-section">
            <h2>Cultural Insights</h2>
            <div className="cultural-metrics">
              <div className="cultural-card">
                <h3>Te Reo Integration</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${culturalMetrics.teReoIntegration}%` }}
                    ></div>
                  </div>
                  <span>
                    {culturalMetrics.teReoIntegration}% of assessments include Te Reo elements
                  </span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Tikanga Compliance</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${culturalMetrics.tikangaCompliance}%` }}
                    ></div>
                  </div>
                  <span>{culturalMetrics.tikangaCompliance}% follow cultural protocols</span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Cultural Representation</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${culturalMetrics.culturalRepresentation}%` }}
                    ></div>
                  </div>
                  <span>
                    {culturalMetrics.culturalRepresentation}% include diverse cultural perspectives
                  </span>
                </div>
              </div>
              <div className="cultural-card">
                <h3>Community Engagement</h3>
                <div className="cultural-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${culturalMetrics.communityEngagement}%` }}
                    ></div>
                  </div>
                  <span>{culturalMetrics.communityEngagement}% involve community connections</span>
                </div>
              </div>
              <div className="cultural-card overall">
                <h3>Overall Cultural Score</h3>
                <div className="overall-score">
                  <span className="score-number">
                    {culturalMetrics.overallCulturalScore.toFixed(1)}%
                  </span>
                  <span className="score-label">Cultural Excellence</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'ai-assistant' && (
          <div className="ai-assistant-section">
            <h2>🧠 AI Grading Assistant</h2>
            <div className="ai-assistant-grid">
              <div className="ai-status-card">
                <h3>AI Assistant Status</h3>
                <div className="ai-status">
                  <div className="status-indicator active">
                    <span className="status-dot"></span>
                    <span className="status-text">{aiGradingAssistant.status.toUpperCase()}</span>
                  </div>
                  <div className="ai-info">
                    <p>
                      <strong>Current Task:</strong> {aiGradingAssistant.currentTask}
                    </p>
                    <p>
                      <strong>Assessments Graded:</strong> {aiGradingAssistant.assessmentsGraded}
                    </p>
                  </div>
                </div>
              </div>

              <div className="ai-performance-card">
                <h3>Performance Metrics</h3>
                <div className="performance-bars">
                  <div className="performance-bar">
                    <span>Accuracy</span>
                    <div className="bar-container">
                      <div
                        className="bar-fill"
                        style={{ width: `${aiGradingAssistant.accuracy}%` }}
                      ></div>
                    </div>
                    <span>{aiGradingAssistant.accuracy.toFixed(1)}%</span>
                  </div>
                  <div className="performance-bar">
                    <span>Cultural Sensitivity</span>
                    <div className="bar-container">
                      <div
                        className="bar-fill cultural"
                        style={{ width: `${aiGradingAssistant.culturalSensitivity}%` }}
                      ></div>
                    </div>
                    <span>{aiGradingAssistant.culturalSensitivity.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="ai-controls-card">
                <h3>AI Controls</h3>
                <div className="ai-controls">
                  <button className="control-btn primary">Start AI Grading</button>
                  <button className="control-btn secondary">Pause AI</button>
                  <button className="control-btn secondary">Review AI Decisions</button>
                  <button className="control-btn secondary">Update Cultural Guidelines</button>
                </div>
              </div>

              <div className="ai-insights-card">
                <h3>AI Insights</h3>
                <div className="ai-insights">
                  <div className="insight-item">
                    <span className="insight-icon">💡</span>
                    <div className="insight-content">
                      <h4>Cultural Context Enhancement</h4>
                      <p>AI suggests adding more Te Reo Māori context to assessment questions</p>
                    </div>
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon">🎯</span>
                    <div className="insight-content">
                      <h4>Rubric Optimization</h4>
                      <p>Cultural criteria scoring shows 15% improvement with AI assistance</p>
                    </div>
                  </div>
                  <div className="insight-item">
                    <span className="insight-icon">🌿</span>
                    <div className="insight-content">
                      <h4>Cultural Sensitivity</h4>
                      <p>98.5% of AI-graded assessments maintain cultural appropriateness</p>
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

export default AssessmentFramework;
