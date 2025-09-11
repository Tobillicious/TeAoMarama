import React from 'react';
import { useNavigate } from 'react-router-dom';

const DirectTeacherAccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
        🌟 Te Kura o TeAoMarama
      </h1>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '40px', opacity: 0.9 }}>
        Professional Educational Platform - Alpha Testing
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1000px',
          width: '100%',
          marginBottom: '40px',
        }}
      >
        {/* Teacher Dashboard Access */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid #fbbf24',
            borderRadius: '16px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>
            👨‍🏫 Professional Teacher Dashboard
          </h3>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            Comprehensive teacher interface with student progress tracking, lesson planning, and
            analytics
          </p>
          <button
            onClick={() => navigate('/teacher-dashboard')}
            style={{
              background: '#dc2626',
              border: '2px solid #fbbf24',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 38, 38, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
            }}
          >
            ACCESS TEACHER DASHBOARD
          </button>
        </div>

        {/* Student Dashboard */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>👨‍🎓 Student Dashboard</h3>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            Interactive learning interface with 3,063+ culturally-responsive resources
          </p>
          <button
            onClick={() => navigate('/student-dashboard')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            VIEW STUDENT DASHBOARD
          </button>
        </div>

        {/* Working Resources - NEW PRIORITY */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid #10b981',
            borderRadius: '16px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>📚 Enhanced Resource Library</h3>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            6,055+ professionally enhanced lesson plans ready for your classroom
          </p>
          <button
            onClick={() => navigate('/enhanced-resources')}
            style={{
              background: '#10b981',
              border: '2px solid #059669',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
            }}
          >
            ACCESS ENHANCED RESOURCES
          </button>
        </div>

        {/* Cultural Learning */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '16px',
            padding: '30px',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>🌿 Cultural Learning Modules</h3>
          <p style={{ marginBottom: '20px', opacity: 0.9 }}>
            Te Reo Māori integration and culturally-responsive learning pathways
          </p>
          <button
            onClick={() => navigate('/cultural-learning-modules')}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            EXPLORE CULTURAL LEARNING
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '800px', marginTop: '40px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '15px' }}>🎯 Alpha Testing Features</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            fontSize: '0.9rem',
          }}
        >
          <div>✅ Real student progress tracking</div>
          <div>✅ Professional lesson planning</div>
          <div>✅ Cultural safety monitoring</div>
          <div>✅ 3,063+ educational resources</div>
          <div>✅ Te Reo Māori integration</div>
          <div>✅ Analytics & insights</div>
          <div>✅ Parent communications</div>
          <div>✅ Assessment tools</div>
        </div>
      </div>
    </div>
  );
};

export default DirectTeacherAccess;
