import { Route, Routes } from 'react-router-dom';

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<WorkingHomepage />} />
      <Route path="/join" element={<WorkingJoinPage />} />
      <Route path="/resources" element={<WorkingResourcesPage />} />
    </Routes>
  );
}

export default App;
