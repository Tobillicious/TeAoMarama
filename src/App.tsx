import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load new components
const WorkingSubscriptionSystem = lazy(() => import('./components/WorkingSubscriptionSystem'));
const ProfessionalTeacherOnboarding = lazy(
  () => import('./components/ProfessionalTeacherOnboarding'),
);
const WorkingTeacherDashboard = lazy(() => import('./components/WorkingTeacherDashboard'));

const WorkingHomepage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '600px',
        }}
      >
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          🌿 Te Ao Mārama
        </h1>
        <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '30px' }}>
          New Zealand's Educational Platform - WORKING WITH CLAUDE CODE PID 19318
        </p>
        <div style={{ marginBottom: '30px' }}>
          <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '15px' }}>
            Professional educational resources for New Zealand teachers
          </p>
          <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '15px' }}>
            Curriculum-aligned lessons and teaching tools
          </p>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Cultural safety and Te Ao Māori integration
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={() => (window.location.href = '/join')}
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >
            Join Now
          </button>
          <button
            onClick={() => (window.location.href = '/resources')}
            style={{
              background: '#059669',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >
            Browse Resources
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkingJoinPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '500px',
        }}
      >
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          📝 Join Te Ao Mārama
        </h1>
        <p style={{ color: '#374151', fontSize: '1.1rem', marginBottom: '30px' }}>
          Create your account to access New Zealand's premier educational platform
        </p>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Full Name"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
          <input
            type="email"
            placeholder="Email Address"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
          <input
            type="text"
            placeholder="School/Institution"
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '1rem',
            }}
          />
        </div>
        <button
          onClick={() => (window.location.href = '/resources')}
          style={{
            background: '#059669',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '1.1rem',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

const WorkingResourcesPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            color: '#1e40af',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          📚 Educational Resources
        </h1>
        <p
          style={{
            color: '#374151',
            fontSize: '1.2rem',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Curriculum-aligned resources for New Zealand teachers
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '15px' }}>
              🌿 Te Ao Māori Resources
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              Cultural safety and tikanga-aligned teaching materials
            </p>
            <button
              style={{
                background: '#059669',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Explore
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '15px' }}>
              📖 Curriculum Lessons
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              NZ Curriculum Framework aligned lesson plans
            </p>
            <button
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Explore
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '15px' }}>
              🎯 Assessment Tools
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              NCEA-aligned assessment rubrics and tools
            </p>
            <button
              style={{
                background: '#7c3aed',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Explore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkingPricingPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            color: '#1e40af',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          💳 Choose Your Plan
        </h1>
        <p
          style={{
            color: '#374151',
            fontSize: '1.2rem',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Professional educational resources for New Zealand teachers
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '12px',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              Teacher Pro
            </h3>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '20px',
              }}
            >
              $25/month
            </div>
            <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>✓ Unlimited lesson plans</li>
              <li style={{ marginBottom: '10px' }}>✓ NZ Curriculum alignment</li>
              <li style={{ marginBottom: '10px' }}>✓ Cultural safety resources</li>
              <li style={{ marginBottom: '10px' }}>✓ Assessment tools</li>
            </ul>
            <button
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Start Free Trial
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '12px',
              border: '2px solid #059669',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#059669',
                color: 'white',
                padding: '5px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
              }}
            >
              Most Popular
            </div>
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              School License
            </h3>
            <div
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '20px',
              }}
            >
              $149/month
            </div>
            <ul style={{ textAlign: 'left', marginBottom: '20px' }}>
              <li style={{ marginBottom: '10px' }}>✓ Everything in Teacher Pro</li>
              <li style={{ marginBottom: '10px' }}>✓ Up to 50 teachers</li>
              <li style={{ marginBottom: '10px' }}>✓ School-wide analytics</li>
              <li style={{ marginBottom: '10px' }}>✓ Priority support</li>
            </ul>
            <button
              style={{
                background: '#059669',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1.1rem',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkingTeacherDashboard = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            color: '#1e40af',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          👨‍🏫 Teacher Dashboard
        </h1>
        <p
          style={{
            color: '#374151',
            fontSize: '1.2rem',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Manage your classes and create amazing lessons
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              📚 My Classes
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              Manage your classes and student progress
            </p>
            <button
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Classes
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              📝 Lesson Plans
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              Create and manage your lesson plans
            </p>
            <button
              style={{
                background: '#059669',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Create Lesson
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              📊 Analytics
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              Track student progress and performance
            </p>
            <button
              style={{
                background: '#7c3aed',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkingStudentDashboard = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            color: '#1e40af',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          👨‍🎓 Student Dashboard
        </h1>
        <p
          style={{
            color: '#374151',
            fontSize: '1.2rem',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Track your progress and complete assignments
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              📚 My Assignments
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              View and complete your assignments
            </p>
            <div style={{ marginBottom: '15px' }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
              >
                <span style={{ fontSize: '0.9rem' }}>Math - Algebra</span>
                <span style={{ fontSize: '0.9rem', color: '#059669' }}>Due: Tomorrow</span>
              </div>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
              >
                <span style={{ fontSize: '0.9rem' }}>Science - Ecosystems</span>
                <span style={{ fontSize: '0.9rem', color: '#f59e0b' }}>Due: Friday</span>
              </div>
            </div>
            <button
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View All
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              🏆 Achievements
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>
              Your learning achievements and badges
            </p>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>🌟</span>
                <span style={{ fontSize: '0.9rem' }}>Perfect Attendance - Week 3</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '1.2rem', marginRight: '10px' }}>🎯</span>
                <span style={{ fontSize: '0.9rem' }}>Math Master - Algebra Unit</span>
              </div>
            </div>
            <button
              style={{
                background: '#059669',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View All
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                color: '#1e40af',
                fontSize: '1.5rem',
                marginBottom: '15px',
              }}
            >
              📊 Progress
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '15px' }}>Track your learning progress</p>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ marginBottom: '10px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
                >
                  <span style={{ fontSize: '0.9rem' }}>Mathematics</span>
                  <span style={{ fontSize: '0.9rem' }}>85%</span>
                </div>
                <div style={{ background: '#e5e7eb', borderRadius: '10px', height: '8px' }}>
                  <div
                    style={{
                      background: '#3b82f6',
                      borderRadius: '10px',
                      height: '8px',
                      width: '85%',
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}
                >
                  <span style={{ fontSize: '0.9rem' }}>Science</span>
                  <span style={{ fontSize: '0.9rem' }}>72%</span>
                </div>
                <div style={{ background: '#e5e7eb', borderRadius: '10px', height: '8px' }}>
                  <div
                    style={{
                      background: '#059669',
                      borderRadius: '10px',
                      height: '8px',
                      width: '72%',
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <button
              style={{
                background: '#7c3aed',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkingNavigation = () => {
  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        padding: '15px 40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          onClick={() => (window.location.href = '/')}
        >
          🌿 Te Ao Mārama
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a
            href="/resources"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)')
            }
            onMouseOut={(e) => ((e.target as HTMLElement).style.background = 'transparent')}
          >
            Resources
          </a>
          <a
            href="/pricing"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)')
            }
            onMouseOut={(e) => ((e.target as HTMLElement).style.background = 'transparent')}
          >
            Pricing
          </a>
          <a
            href="/teacher"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)')
            }
            onMouseOut={(e) => ((e.target as HTMLElement).style.background = 'transparent')}
          >
            Teacher
          </a>
          <a
            href="/student"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLElement).style.background = 'rgba(255,255,255,0.1)')
            }
            onMouseOut={(e) => ((e.target as HTMLElement).style.background = 'transparent')}
          >
            Student
          </a>
          <a
            href="/join"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) => (e.target.style.background = 'rgba(255,255,255,0.3)')}
            onMouseOut={(e) => (e.target.style.background = 'rgba(255,255,255,0.2)')}
          >
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
};

const WorkingLessonCreator = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            color: '#1e40af',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          📝 Create Lesson Plan
        </h1>
        <p
          style={{
            color: '#374151',
            fontSize: '1.2rem',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          Design curriculum-aligned lessons for New Zealand students
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '20px' }}>
              Lesson Details
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Lesson Title
              </label>
              <input
                type="text"
                placeholder="Enter lesson title..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Subject
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                }}
              >
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>Social Studies</option>
                <option>Te Reo Māori</option>
                <option>Arts</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Year Level
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                }}
              >
                <option>Year 1</option>
                <option>Year 2</option>
                <option>Year 3</option>
                <option>Year 4</option>
                <option>Year 5</option>
                <option>Year 6</option>
                <option>Year 7</option>
                <option>Year 8</option>
                <option>Year 9</option>
                <option>Year 10</option>
                <option>Year 11</option>
                <option>Year 12</option>
                <option>Year 13</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Duration (minutes)
              </label>
              <input
                type="number"
                placeholder="45"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                }}
              />
            </div>
          </div>

          <div>
            <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '20px' }}>
              Curriculum Alignment
            </h3>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Learning Objectives
              </label>
              <textarea
                placeholder="Students will be able to..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  minHeight: '100px',
                  resize: 'vertical',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Cultural Connections
              </label>
              <textarea
                placeholder="How does this lesson connect to Te Ao Māori or Pacific cultures?"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  minHeight: '80px',
                  resize: 'vertical',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Assessment Method
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                }}
              >
                <option>Formative Assessment</option>
                <option>Summative Assessment</option>
                <option>Peer Assessment</option>
                <option>Self Assessment</option>
                <option>Portfolio</option>
                <option>Project-based</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.3rem', marginBottom: '20px' }}>
            Lesson Structure
          </h3>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Introduction (Hook)
            </label>
            <textarea
              placeholder="How will you capture students' attention and introduce the topic?"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                minHeight: '80px',
                resize: 'vertical',
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Main Activities
            </label>
            <textarea
              placeholder="Describe the main learning activities and teaching strategies..."
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                minHeight: '120px',
                resize: 'vertical',
              }}
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Conclusion & Reflection
            </label>
            <textarea
              placeholder="How will you wrap up the lesson and assess understanding?"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '1rem',
                minHeight: '80px',
                resize: 'vertical',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            style={{
              background: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >
            Save Draft
          </button>
          <button
            style={{
              background: '#059669',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >
            Publish Lesson
          </button>
          <button
            style={{
              background: '#7c3aed',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.1rem',
              cursor: 'pointer',
            }}
          >
            Preview
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkingAboutPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <h1
          style={{
            color: '#1e40af',
            fontSize: '2.5rem',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          🌿 About Te Ao Mārama
        </h1>
        <p
          style={{
            color: '#374151',
            fontSize: '1.2rem',
            marginBottom: '30px',
            textAlign: 'center',
          }}
        >
          The School of the World of Light - Empowering New Zealand Education
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🎯</div>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '15px' }}>
              Our Mission
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              To provide New Zealand teachers with culturally responsive, curriculum-aligned
              educational resources that honor Te Ao Māori and support all learners to achieve their
              potential.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌿</div>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '15px' }}>
              Cultural Safety
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              All our resources are developed with cultural safety at the forefront, ensuring
              authentic representation of Te Ao Māori and Pacific perspectives in education.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📚</div>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '15px' }}>
              Curriculum Aligned
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Every resource is carefully aligned with the New Zealand Curriculum Framework,
              ensuring relevance and effectiveness in the classroom.
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>👥</div>
            <h3 style={{ color: '#1e40af', fontSize: '1.5rem', marginBottom: '15px' }}>
              Community Driven
            </h3>
            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
              Built by teachers, for teachers. Our platform is shaped by the real needs and
              experiences of educators across Aotearoa New Zealand.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <h3 style={{ color: '#1e40af', fontSize: '1.8rem', marginBottom: '20px' }}>
            Join Our Community
          </h3>
          <p
            style={{
              color: '#6b7280',
              fontSize: '1.1rem',
              marginBottom: '30px',
              maxWidth: '600px',
              margin: '0 auto 30px',
            }}
          >
            Be part of a growing community of educators committed to excellence, cultural
            responsiveness, and student success across New Zealand.
          </p>
          <button
            onClick={() => (window.location.href = '/join')}
            style={{
              background: '#059669',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '1.2rem',
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            }}
          >
            Join Te Ao Mārama Today
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <WorkingNavigation />
      <Routes>
        <Route path="/" element={<WorkingHomepage />} />
        <Route path="/join" element={<WorkingJoinPage />} />
        <Route path="/resources" element={<WorkingResourcesPage />} />
        <Route path="/pricing" element={<WorkingSubscriptionSystem />} />
        <Route path="/onboarding" element={<ProfessionalTeacherOnboarding />} />
        <Route path="/teacher-dashboard" element={<WorkingTeacherDashboard />} />
        <Route path="/pricing" element={<WorkingPricingPage />} />
        <Route path="/teacher" element={<WorkingTeacherDashboard />} />
        <Route path="/student" element={<WorkingStudentDashboard />} />
        <Route path="/create-lesson" element={<WorkingLessonCreator />} />
        <Route path="/about" element={<WorkingAboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
