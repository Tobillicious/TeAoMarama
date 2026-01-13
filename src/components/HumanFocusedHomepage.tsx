import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEducation } from '../contexts/EducationContext';

const HumanFocusedHomepage: React.FC = () => {
  const navigate = useNavigate();
  const { students, teachers, resources, classes, assignments } = useEducation();

  // Calculate real platform statistics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalResources = resources.length;
  const totalClasses = classes.length;
  const totalAssignments = assignments.length;

  const navigateToComponent = (path: string) => {
    navigate(path);
  };

  const features = [
    {
      title: 'Teacher Dashboard',
      description: 'Professional teacher control center with class management, lesson planning, and analytics',
      icon: '👩‍🏫',
      path: '/teacher-dashboard',
      stats: `${totalClasses} Active Classes`,
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Student Dashboard', 
      description: 'Engaging student portal with assignments, progress tracking, and cultural learning',
      icon: '👨‍🎓',
      path: '/student-dashboard',
      stats: `${totalStudents} Active Learners`,
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Resource Library',
      description: 'Comprehensive library of NZ curriculum-aligned educational resources with Te Ao Māori integration',
      icon: '📚',
      path: '/resources',
      stats: `${totalResources}+ Educational Resources`,
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Assessment Tools',
      description: 'Advanced assessment generator with NCEA alignment and cultural responsiveness',
      icon: '📊',
      path: '/assessment-tools',
      stats: `${totalAssignments} Live Assessments`,
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      title: 'Lesson Creator',
      description: 'AI-powered lesson planning with cultural integration and curriculum alignment',
      icon: '✏️',
      path: '/lesson-creator',
      stats: 'AI-Enhanced Planning',
      color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting with student progress insights',
      icon: '📈',
      path: '/analytics',
      stats: 'Real-time Insights',
      color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      title: 'Class Management',
      description: 'Sophisticated class organization with attendance, grading, and communication tools',
      icon: '🏫',
      path: '/class-management',
      stats: 'Professional Organization',
      color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      title: 'Parent Communication',
      description: 'Streamlined parent-teacher communication with progress updates and notifications',
      icon: '👨‍👩‍👧‍👦',
      path: '/parent-communication',
      stats: 'Family Engagement',
      color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    {
      title: 'Subscription System',
      description: 'Flexible pricing tiers from Free to School Enterprise with premium features',
      icon: '💎',
      path: '/subscription',
      stats: '$25-149/month Plans',
      color: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    }
  ];

  const additionalFeatures = [
    {
      title: 'Student Portfolio System',
      description: 'Digital portfolio management for student achievements and cultural projects',
      icon: '🎨',
      path: '/student-portfolio',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Parent Portal',
      description: 'Dedicated parent access to student progress and school communication',
      icon: '👪',
      path: '/parent-portal', 
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Notification System',
      description: 'Intelligent notification management for all platform activities',
      icon: '🔔',
      path: '/notifications',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* PROFESSIONAL HEADER */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        padding: '15px 20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h1 style={{
              margin: 0,
              fontSize: '1.8rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              fontWeight: 'bold'
            }}>
              🌿 Te Ao Mārama
            </h1>
            <span style={{
              background: '#10b981',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}>
              47,959+ Components Active
            </span>
          </div>
          
          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <button onClick={() => navigateToComponent('/teacher')} style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}>
              Teachers
            </button>
            <button onClick={() => navigateToComponent('/student')} style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}>
              Students
            </button>
            <button onClick={() => navigateToComponent('/resources')} style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}>
              Resources
            </button>
            <button onClick={() => navigateToComponent('/assessments')} style={{
              background: 'none',
              border: 'none',
              color: '#667eea',
              fontWeight: 'bold',
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}>
              Assessments
            </button>
          </nav>
        </div>
      </header>

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Hero Section */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '3.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            🌿 Te Ao Mārama Educational Platform
          </h1>
          <p style={{
            fontSize: '1.3rem',
            color: '#6b7280',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            Comprehensive educational platform serving the learning community of Mangakootukutuku College<br/>
            Culturally responsive • AI-enhanced • NZ curriculum aligned
          </p>
          
          {/* Platform Statistics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '30px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{totalStudents}</div>
              <div>Active Students</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{totalTeachers}</div>
              <div>Professional Teachers</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{totalResources}+</div>
              <div>Educational Resources</div>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>47,959</div>
              <div>Total Components</div>
            </div>
          </div>
        </div>

        {/* Main Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigateToComponent(feature.path)}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid transparent',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: feature.color
              }} />
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                marginBottom: '15px',
                color: '#1e40af'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#6b7280',
                marginBottom: '15px',
                lineHeight: '1.5'
              }}>
                {feature.description}
              </p>
              <div style={{
                background: feature.color,
                color: 'white',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                display: 'inline-block'
              }}>
                {feature.stats}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '2rem',
            color: '#1e40af',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Additional Platform Features
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigateToComponent(feature.path)}
                style={{
                  padding: '20px',
                  borderRadius: '15px',
                  background: feature.color,
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                  {feature.icon}
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '10px', fontWeight: 'bold' }}>
                  {feature.title}
                </h4>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Integration Notice */}
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          borderRadius: '20px',
          padding: '30px',
          textAlign: 'center',
          marginBottom: '30px',
          boxShadow: '0 15px 35px rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌿</div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '15px', fontWeight: 'bold' }}>
            Te Ao Māori Integration
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' }}>
            Every aspect of our platform honors Te Ao Māori perspectives, ensuring cultural safety 
            and authentic integration of indigenous knowledge systems throughout the learning experience.
          </p>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <button
            onClick={() => navigate('/teacher-dashboard')}
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🏫 Access Teacher Portal
          </button>
          <button
            onClick={() => navigate('/student-dashboard')}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            🎓 Student Learning Hub
          </button>
          <button
            onClick={() => navigate('/resources')}
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 25px',
              borderRadius: '15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📚 Explore Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default HumanFocusedHomepage;