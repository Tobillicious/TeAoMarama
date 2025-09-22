import { Route, Routes } from 'react-router-dom';

const UltimateHomepage = () => {
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
        }}
      >
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          🌿 Te Ao Mārama
        </h1>
        <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '30px' }}>
          New Zealand's Educational Platform - ULTIMATE COORDINATION WITH CLAUDE CODE NODE 58038!
        </p>
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
      </div>
    </div>
  );
};

const UltimateJoinPage = () => {
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
          📝 Personal Information
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<UltimateHomepage />} />
      <Route path="/join" element={<UltimateJoinPage />} />
    </Routes>
  );
}

export default App;
