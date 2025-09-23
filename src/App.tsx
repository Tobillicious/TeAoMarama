import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// Lazy load new components
const WorkingSubscriptionSystem = lazy(() => import('./components/WorkingSubscriptionSystem'));
const ProfessionalTeacherOnboarding = lazy(
  () => import('./components/ProfessionalTeacherOnboarding'),
);
const WorkingTeacherDashboard = lazy(() => import('./components/WorkingTeacherDashboard'));
const WorkingAssessmentTools = lazy(() => import('./components/WorkingAssessmentTools'));
const WorkingClassManagement = lazy(() => import('./components/WorkingClassManagement'));
const WorkingParentCommunication = lazy(() => import('./components/WorkingParentCommunication'));
const WorkingAnalyticsDashboard = lazy(() => import('./components/WorkingAnalyticsDashboard'));
const AdvancedLessonPlanner = lazy(() => import('./components/AdvancedLessonPlanner'));
const WorkingStudentDashboard = lazy(() => import('./components/WorkingStudentDashboard'));
const WorkingLessonCreator = lazy(() => import('./components/WorkingLessonCreator'));

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
          <a
            href="/join"
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            Join Now
          </a>
          <a
            href="/resources"
            style={{
              background: 'rgba(255,255,255,0.1)',
              color: '#1e40af',
              textDecoration: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              border: '2px solid #1e40af',
            }}
          >
            Explore Resources
          </a>
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
            👥 Join Te Ao Mārama
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem' }}>
            Start your educational journey with us
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            School/Institution
          </label>
          <input
            type="text"
            placeholder="Enter your school name"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Role</label>
          <select
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          >
            <option>Teacher</option>
            <option>Principal</option>
            <option>Deputy Principal</option>
            <option>Head of Department</option>
            <option>Student</option>
            <option>Parent</option>
            <option>Other</option>
          </select>
        </div>

        <button
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Join Te Ao Mārama
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
            📚 Educational Resources
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem' }}>
            Curriculum-aligned resources for New Zealand educators
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>🌿 Te Ao Māori Resources</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Culturally safe resources integrating Māori perspectives
            </p>
            <button
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Explore Māori Resources
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>📖 Curriculum Lessons</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Ready-to-use lessons aligned with NZ Curriculum
            </p>
            <button
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Browse Lessons
            </button>
          </div>

          <div
            style={{
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>📊 Assessment Tools</h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              Formative and summative assessment resources
            </p>
            <button
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              View Assessments
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
            💰 Pricing Plans
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem' }}>
            Choose the plan that works best for your educational needs
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
          }}
        >
          <div
            style={{
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Teacher Pro</h3>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1e40af' }}>$25</span>
              <span style={{ color: '#6b7280' }}>/month</span>
            </div>
            <ul style={{ textAlign: 'left', marginBottom: '30px', color: '#374151' }}>
              <li>Unlimited lesson plans</li>
              <li>Curriculum alignment tools</li>
              <li>Assessment creation</li>
              <li>Student progress tracking</li>
              <li>Cultural safety resources</li>
            </ul>
            <button
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
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
              borderRadius: '15px',
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
                padding: '5px 20px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              Most Popular
            </div>
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>School License</h3>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1e40af' }}>$149</span>
              <span style={{ color: '#6b7280' }}>/month</span>
            </div>
            <ul style={{ textAlign: 'left', marginBottom: '30px', color: '#374151' }}>
              <li>Everything in Teacher Pro</li>
              <li>Unlimited teachers</li>
              <li>School-wide analytics</li>
              <li>Custom branding</li>
              <li>Priority support</li>
              <li>Bulk user management</li>
            </ul>
            <button
              style={{
                background: 'linear-gradient(135deg, #059669 0%, #1e40af 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Contact Sales
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
            href="/assessments"
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
            Assessments
          </a>
          <a
            href="/class-management"
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
            Classes
          </a>
          <a
            href="/parent-communication"
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
            Parents
          </a>
          <a
            href="/analytics"
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
            Analytics
          </a>
          <a
            href="/lesson-planner"
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
            Lesson Planner
          </a>
          <a
            href="/join"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background 0.3s',
            }}
            onMouseOver={(e) =>
              ((e.target as HTMLElement).style.background = 'rgba(255,255,255,0.3)')
            }
            onMouseOut={(e) =>
              ((e.target as HTMLElement).style.background = 'rgba(255,255,255,0.2)')
            }
          >
            Join Now
          </a>
        </div>
      </div>
    </nav>
  );
};

const WorkingAboutPage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
            🌿 About Te Ao Mārama
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem' }}>
            Empowering New Zealand educators with culturally safe, curriculum-aligned resources
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Our Mission</h3>
          <p style={{ color: '#374151', lineHeight: '1.6' }}>
            Te Ao Mārama (The World of Light) is dedicated to providing New Zealand teachers with
            high-quality, culturally safe educational resources that honor Te Ao Māori and support
            the diverse learning needs of all ākonga (students).
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Cultural Safety</h3>
          <p style={{ color: '#374151', lineHeight: '1.6' }}>
            We believe that education should be inclusive, respectful, and culturally responsive.
            Our resources are developed with deep respect for tikanga Māori and the principles of
            cultural safety, ensuring that all students feel valued and supported in their learning
            journey.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Curriculum Alignment</h3>
          <p style={{ color: '#374151', lineHeight: '1.6' }}>
            All our resources are carefully aligned with the New Zealand Curriculum and Te
            Marautanga o Aotearoa, ensuring that teachers can confidently use our materials to
            support their teaching and assessment practices.
          </p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Community Focus</h3>
          <p style={{ color: '#374151', lineHeight: '1.6' }}>
            We are committed to building a strong community of educators who share our vision of
            excellence in education. Through collaboration, professional development, and shared
            resources, we aim to uplift the entire New Zealand education sector.
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/join"
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
              color: 'white',
              textDecoration: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
            }}
          >
            Join Our Community
          </a>
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
        <Route path="/teacher" element={<WorkingTeacherDashboard />} />
        <Route path="/student" element={<WorkingStudentDashboard />} />
        <Route path="/create-lesson" element={<WorkingLessonCreator />} />
        <Route path="/assessments" element={<WorkingAssessmentTools />} />
        <Route path="/class-management" element={<WorkingClassManagement />} />
        <Route path="/parent-communication" element={<WorkingParentCommunication />} />
        <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
        <Route path="/lesson-planner" element={<AdvancedLessonPlanner />} />
        <Route path="/about" element={<WorkingAboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
