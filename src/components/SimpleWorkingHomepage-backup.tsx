import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleWorkingHomepage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '1rem 2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}
            >
              🌿
            </div>
            <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
              Te Ao Mārama
            </h1>
          </div>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <button
              onClick={() => navigate('/resources')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.1)')}
              onMouseOut={(e) => (e.target.style.background = 'none')}
            >
              Resources
            </button>
            <button
              onClick={() => navigate('/pricing')}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                transition: 'background 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.background = 'rgba(255, 255, 255, 0.1)')}
              onMouseOut={(e) => (e.target.style.background = 'none')}
            >
              Pricing
            </button>
            <button
              onClick={() => navigate('/teacher')}
              style={{
                background: '#4ade80',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontWeight: 'bold',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            >
              Get Started
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <div
          style={{
            maxWidth: '800px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
            }}
          >
            New Zealand's Premier Educational Platform
          </h1>

          <p
            style={{
              fontSize: '1.25rem',
              marginBottom: '2rem',
              opacity: 0.9,
              lineHeight: '1.6',
            }}
          >
            Te Ao Mārama empowers 20,000+ teachers with curriculum-aligned resources, cultural
            safety protocols, and innovative teaching tools.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/resources')}
              style={{
                background: '#4ade80',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(74, 222, 128, 0.3)',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(74, 222, 128, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(74, 222, 128, 0.3)';
              }}
            >
              📚 Browse Resources
            </button>

            <button
              onClick={() => navigate('/pricing')}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1.1rem',
                padding: '1rem 2rem',
                borderRadius: '10px',
                fontWeight: 'bold',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              💳 View Pricing
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '3rem 2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎓</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Curriculum Aligned</h3>
            <p style={{ opacity: 0.9 }}>
              All resources aligned with New Zealand Curriculum and Te Marautanga o Aotearoa
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Cultural Safety</h3>
            <p style={{ opacity: 0.9 }}>
              Authentic Te Ao Māori integration with cultural safety protocols
            </p>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '2rem',
              borderRadius: '12px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Powered</h3>
            <p style={{ opacity: 0.9 }}>
              Advanced AI coordination for personalized learning experiences
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <p style={{ margin: 0, opacity: 0.8 }}>
          © 2024 Te Ao Mārama - Empowering New Zealand Educators
        </p>
      </footer>
    </div>
  );
};

export default SimpleWorkingHomepage;
