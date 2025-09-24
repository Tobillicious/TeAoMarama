import React, { useState, useEffect } from 'react';
import { expandedNZCurriculum } from '../content/expanded-nz-curriculum';

interface TeacherStats {
  totalLessons: number;
  completedLessons: number;
  studentsActive: number;
  culturalSafetyScore: number;
}

const ComprehensiveTeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [teacherStats, setTeacherStats] = useState<TeacherStats>({
    totalLessons: 6,
    completedLessons: 2,
    studentsActive: 28,
    culturalSafetyScore: 9
  });
  const [lessons, setLessons] = useState(expandedNZCurriculum.getAllLessons());
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    // Simulate loading teacher data
    const timer = setTimeout(() => {
      setTeacherStats(prev => ({
        ...prev,
        culturalSafetyScore: 9.2
      }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const renderOverview = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
        Welcome back, Teacher! 🌿
      </h2>
      
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📚</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {teacherStats.totalLessons}
          </div>
          <div style={{ opacity: 0.8 }}>Available Lessons</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {teacherStats.completedLessons}
          </div>
          <div style={{ opacity: 0.8 }}>Completed</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {teacherStats.studentsActive}
          </div>
          <div style={{ opacity: 0.8 }}>Active Students</div>
        </div>
        
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌿</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {teacherStats.culturalSafetyScore}/10
          </div>
          <div style={{ opacity: 0.8 }}>Cultural Safety Score</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <button
            onClick={() => setActiveTab('lessons')}
            style={{
              background: '#059669',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#047857'}
            onMouseOut={(e) => e.target.style.background = '#059669'}
          >
            📚 Browse Lessons
          </button>
          
          <button
            onClick={() => setActiveTab('assessment')}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#2563eb'}
            onMouseOut={(e) => e.target.style.background = '#3b82f6'}
          >
            📊 Assessment Tools
          </button>
          
          <button
            onClick={() => setActiveTab('cultural')}
            style={{
              background: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#6d28d9'}
            onMouseOut={(e) => e.target.style.background = '#7c3aed'}
          >
            🌿 Cultural Safety
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '10px',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#b91c1c'}
            onMouseOut={(e) => e.target.style.background = '#dc2626'}
          >
            📈 Analytics
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '15px'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'white' }}>
          Recent Activity
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '1.5rem' }}>📚</div>
            <div style={{ color: 'white' }}>
              <div style={{ fontWeight: 'bold' }}>Completed: Early Māori Settlement</div>
              <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Year 8 Social Studies - 2 hours ago</div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '1.5rem' }}>🌿</div>
            <div style={{ color: 'white' }}>
              <div style={{ fontWeight: 'bold' }}>Cultural Safety Training Updated</div>
              <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>Score improved to 9.2/10 - 1 day ago</div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '1.5rem' }}>👥</div>
            <div style={{ color: 'white' }}>
              <div style={{ fontWeight: 'bold' }}>New Students Joined</div>
              <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>5 new students in Year 8 class - 2 days ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLessons = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
        Curriculum Lessons 📚
      </h2>
      
      <div style={{
        display: 'grid',
        gap: '1.5rem'
      }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setSelectedLesson(lesson)}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem' }}>
                  {lesson.title}
                </h3>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    background: '#3b82f6',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}>
                    {lesson.level}
                  </span>
                  <span style={{
                    background: '#059669',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}>
                    {lesson.subject.replace('-', ' ').toUpperCase()}
                  </span>
                  <span style={{
                    background: '#7c3aed',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem'
                  }}>
                    {lesson.difficulty.toUpperCase()}
                  </span>
                </div>
              </div>
              <div style={{
                background: '#f59e0b',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 'bold'
              }}>
                {lesson.duration} min
              </div>
            </div>
            
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem' }}>
              {lesson.curriculumArea}
            </p>
            
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              marginBottom: '1rem'
            }}>
              {lesson.culturalConnections.slice(0, 3).map((connection, index) => (
                <span
                  key={index}
                  style={{
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#10b981',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem'
                  }}
                >
                  🌿 {connection}
                </span>
              ))}
            </div>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <button
                style={{
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                View Lesson
              </button>
              <button
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Add to Plan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCulturalSafety = () => (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem', color: 'white' }}>
        Cultural Safety Training 🌿
      </h2>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '2rem',
        borderRadius: '15px',
        marginBottom: '2rem'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'white' }}>
          Your Cultural Safety Score
        </h3>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            color: '#10b981'
          }}>
            {teacherStats.culturalSafetyScore}/10
          </div>
          <div>
            <div style={{ color: 'white', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              Excellent! You're demonstrating strong cultural competency.
            </div>
            <div style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              Continue your learning journey with advanced modules.
            </div>
          </div>
        </div>
        <div style={{
          width: '100%',
          height: '10px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '5px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${(teacherStats.culturalSafetyScore / 10) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #10b981, #059669)',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'white' }}>
            🌿 Te Ao Māori Principles
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {['Whakapapa', 'Kaitiakitanga', 'Manaakitanga', 'Whanaungatanga', 'Mana', 'Tikanga'].map((principle) => (
              <div
                key={principle}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  textAlign: 'center',
                  color: 'white'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{principle}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>✓ Completed</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '2rem',
          borderRadius: '15px'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'white' }}>
            📚 Recommended Learning
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px'
            }}>
              <div style={{ color: 'white' }}>
                <div style={{ fontWeight: 'bold' }}>Advanced Cultural Safety Protocols</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Deep dive into cultural competency</div>
              </div>
              <button
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Start
              </button>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '10px'
            }}>
              <div style={{ color: 'white' }}>
                <div style={{ fontWeight: 'bold' }}>Te Reo Māori Integration</div>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Language learning for educators</div>
              </div>
              <button
                style={{
                  background: '#7c3aed',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'lessons':
        return renderLessons();
      case 'cultural':
        return renderCulturalSafety();
      case 'assessment':
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Assessment Tools 📊</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Coming soon - Advanced assessment and analytics tools!</p>
          </div>
        );
      case 'analytics':
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'white' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Analytics Dashboard 📈</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>Coming soon - Student progress and performance analytics!</p>
          </div>
        );
      default:
        return renderOverview();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(45deg, #4ade80, #22c55e)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              🌿
            </div>
            <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
              Te Ao Mārama Teacher Dashboard
            </h1>
          </div>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => window.location.href = '/pricing'}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Upgrade Plan
            </button>
            <button
              onClick={() => window.location.href = '/'}
              style={{
                background: '#dc2626',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        background: 'rgba(0, 0, 0, 0.1)',
        padding: '0 2rem',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          gap: '2rem'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: '🏠' },
            { id: 'lessons', label: 'Lessons', icon: '📚' },
            { id: 'assessment', label: 'Assessment', icon: '📊' },
            { id: 'cultural', label: 'Cultural Safety', icon: '🌿' },
            { id: 'analytics', label: 'Analytics', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                color: activeTab === tab.id ? '#4ade80' : 'rgba(255, 255, 255, 0.8)',
                padding: '1rem 0',
                fontSize: '1rem',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #4ade80' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {renderContent()}
      </main>
    </div>
  );
};

export default ComprehensiveTeacherDashboard;
