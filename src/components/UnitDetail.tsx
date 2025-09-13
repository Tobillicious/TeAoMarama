import React, { useEffect, useState } from 'react';
import type { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';
import Navigation from './Navigation';
import './UnitDetail.css';

interface Unit {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  activities: number;
  culturalElements: string[];
  nceaAlignment: string[];
  multimedia: string[];
  lessons: Lesson[];
  assessments: Assessment[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  content: string;
  objectives: string[];
}

interface Assessment {
  id: string;
  title: string;
  type: 'quiz' | 'assignment' | 'project';
  questions: number;
  duration: string;
  maxScore: number;
}

const UnitDetail: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const { isAuthenticated, currentUser } = useAuth();
  const [unit, setUnit] = useState<Unit | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [progress, setProgress] = useState(0);

  // Enhanced Year 8 Social Studies Units with detailed content
  const units: Unit[] = [
    {
      id: 'unit-1',
      title: 'Te Ao Māori: Māori Worldview and Society',
      subtitle: 'Understanding Māori perspectives and cultural values',
      description: 'Explore the fundamental concepts of Te Ao Māori, including whakapapa, mana, tapu, and the interconnectedness of all things. Students will develop cultural competency and understanding of Māori worldviews.',
      difficulty: 'intermediate',
      duration: '6 weeks',
      activities: 12,
      culturalElements: ['Whakapapa', 'Mana', 'Tapu', 'Kaitiakitanga', 'Whanaungatanga'],
      nceaAlignment: ['Level 1 Social Studies 1.1', 'Level 1 Social Studies 1.2'],
      multimedia: ['Interactive Timeline', 'Virtual Marae Visit', 'Cultural Stories'],
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Te Ao Māori',
          description: 'Understanding the Māori worldview and its foundational concepts',
          duration: '50 minutes',
          content: 'Te Ao Māori represents the Māori worldview - a holistic understanding of life that encompasses spiritual, physical, and social dimensions...',
          objectives: [
            'Define Te Ao Māori and its significance',
            'Identify key concepts within the Māori worldview',
            'Understand the interconnectedness of all elements in Te Ao Māori'
          ]
        },
        {
          id: 'lesson-2',
          title: 'Whakapapa and Genealogy',
          description: 'Exploring the importance of genealogical connections in Māori culture',
          duration: '50 minutes',
          content: 'Whakapapa is more than genealogy - it connects all living things and establishes relationships between people, nature, and the spiritual world...',
          objectives: [
            'Explain the concept of whakapapa',
            'Understand how genealogical connections shape Māori identity',
            'Recognize the role of whakapapa in contemporary Māori society'
          ]
        }
      ],
      assessments: [
        {
          id: 'assessment-1',
          title: 'Te Ao Māori Concepts Quiz',
          type: 'quiz',
          questions: 15,
          duration: '30 minutes',
          maxScore: 100
        },
        {
          id: 'assessment-2',
          title: 'Cultural Values Research Project',
          type: 'project',
          questions: 1,
          duration: '2 weeks',
          maxScore: 100
        }
      ]
    },
    {
      id: 'unit-2',
      title: 'Colonisation and Its Impact on Aotearoa',
      subtitle: 'Historical analysis of colonial processes and consequences',
      description: 'Investigate the processes of colonisation in Aotearoa New Zealand, examining the Treaty of Waitangi, land confiscations, and ongoing impacts on Māori communities and society.',
      difficulty: 'advanced',
      duration: '8 weeks',
      activities: 15,
      culturalElements: ['Treaty of Waitangi', 'Land Confiscations', 'Cultural Resistance', 'Tino Rangatiratanga'],
      nceaAlignment: ['Level 1 Social Studies 1.3', 'Level 1 Social Studies 1.4'],
      multimedia: ['Documentary Analysis', 'Primary Source Database', 'Interactive Maps'],
      lessons: [
        {
          id: 'lesson-1',
          title: 'Pre-Colonial Aotearoa',
          description: 'Understanding Māori society before European contact',
          duration: '50 minutes',
          content: 'Before European contact, Māori had developed sophisticated social, economic, and political systems across Aotearoa...',
          objectives: [
            'Describe Māori society before European contact',
            'Understand traditional governance and social structures',
            'Recognize the sustainability of traditional practices'
          ]
        }
      ],
      assessments: [
        {
          id: 'assessment-1',
          title: 'Treaty of Waitangi Analysis',
          type: 'assignment',
          questions: 5,
          duration: '1 week',
          maxScore: 100
        }
      ]
    }
  ];

  useEffect(() => {
    const foundUnit = units.find(u => u.id === unitId);
    if (foundUnit) {
      setUnit(foundUnit);
      // Load user progress if authenticated
      if (isAuthenticated) {
        setProgress(Math.floor(Math.random() * 100)); // Mock progress
      }
    }
  }, [unitId, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="unit-detail-container">
        <Navigation />
        <div className="auth-required">
          <div className="auth-message">
            <h2>🔐 Authentication Required</h2>
            <p>Please sign in to access unit content and track your progress.</p>
            <Link to="/login" className="auth-button">
              Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!unit) {
    return (
      <div className="unit-detail-container">
        <Navigation />
        <div className="unit-not-found">
          <h2>Unit Not Found</h2>
          <p>The requested unit could not be found.</p>
          <Link to="/year8-social-studies">← Back to Social Studies</Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'var(--color-kowhai)';
      case 'intermediate': return 'var(--color-pounamu)';
      case 'advanced': return 'var(--color-primary)';
      default: return 'var(--color-pounamu)';
    }
  };

  return (
    <div className="unit-detail-container">
      <Navigation />
      
      {/* Unit Header */}
      <section className="unit-header-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/year8-social-studies">Year 8 Social Studies</Link>
            <span> › </span>
            <span>{unit.title}</span>
          </div>
          
          <div className="unit-header-content">
            <div className="unit-meta">
              <span className="unit-badge">Unit {unit.id.split('-')[1]}</span>
              <span 
                className="unit-difficulty"
                /* TODO: Move to external CSS */ style={{ backgroundColor: getDifficultyColor(unit.difficulty) }}
              >
                {unit.difficulty}
              </span>
            </div>
            
            <h1 className="unit-title">{unit.title}</h1>
            <p className="unit-subtitle">{unit.subtitle}</p>
            
            {isAuthenticated && (
              <div className="progress-section">
                <div className="progress-header">
                  <span>Your Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="unit-nav-section">
        <div className="container">
          <div className="unit-tabs">
            <button 
              className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              📋 Overview
            </button>
            <button 
              className={`tab-button ${activeTab === 'lessons' ? 'active' : ''}`}
              onClick={() => setActiveTab('lessons')}
            >
              📚 Lessons
            </button>
            <button 
              className={`tab-button ${activeTab === 'assessments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assessments')}
            >
              📝 Assessments
            </button>
            <button 
              className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
              onClick={() => setActiveTab('resources')}
            >
              🎬 Resources
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="unit-content-section">
        <div className="container">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="overview-grid">
                <div className="overview-main">
                  <h3>Unit Description</h3>
                  <p>{unit.description}</p>
                  
                  <h3>Learning Objectives</h3>
                  <ul className="objectives-list">
                    <li>Develop cultural competency and understanding</li>
                    <li>Analyze historical and contemporary perspectives</li>
                    <li>Practice critical thinking skills</li>
                    <li>Engage with primary and secondary sources</li>
                  </ul>
                </div>
                
                <div className="overview-sidebar">
                  <div className="unit-info-card">
                    <h4>Unit Information</h4>
                    <div className="info-item">
                      <span className="info-label">Duration:</span>
                      <span className="info-value">{unit.duration}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Activities:</span>
                      <span className="info-value">{unit.activities}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Difficulty:</span>
                      <span className="info-value">{unit.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="cultural-elements-card">
                    <h4>Cultural Elements</h4>
                    <div className="elements-list">
                      {unit.culturalElements.map((element, index) => (
                        <span key={index} className="element-tag">{element}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lessons' && (
            <div className="lessons-content">
              <div className="lessons-grid">
                {unit.lessons.map((lesson, index) => (
                  <div key={lesson.id} className="lesson-card">
                    <div className="lesson-header">
                      <h4>{lesson.title}</h4>
                      <span className="lesson-duration">{lesson.duration}</span>
                    </div>
                    <p className="lesson-description">{lesson.description}</p>
                    <div className="lesson-objectives">
                      <h5>Learning Objectives:</h5>
                      <ul>
                        {lesson.objectives.map((objective, idx) => (
                          <li key={idx}>{objective}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="start-lesson-btn">
                      ▶️ Start Lesson {index + 1}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'assessments' && (
            <div className="assessments-content">
              <div className="assessments-grid">
                {unit.assessments.map((assessment) => (
                  <div key={assessment.id} className="assessment-card">
                    <div className="assessment-header">
                      <h4>{assessment.title}</h4>
                      <span className="assessment-type">{assessment.type}</span>
                    </div>
                    <div className="assessment-details">
                      <div className="detail-item">
                        <span>Questions: {assessment.questions}</span>
                      </div>
                      <div className="detail-item">
                        <span>Duration: {assessment.duration}</span>
                      </div>
                      <div className="detail-item">
                        <span>Max Score: {assessment.maxScore}</span>
                      </div>
                    </div>
                    <button className="start-assessment-btn">
                      📝 Start Assessment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-content">
              <div className="resources-grid">
                {unit.multimedia.map((resource, index) => (
                  <div key={index} className="resource-card">
                    <div className="resource-icon">🎬</div>
                    <h4>{resource}</h4>
                    <p>Interactive multimedia content to enhance your learning experience.</p>
                    <button className="access-resource-btn">
                      🔗 Access Resource
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default UnitDetail;