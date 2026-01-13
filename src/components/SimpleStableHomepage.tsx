import React from 'react';

const SimpleStableHomepage: React.FC = () => {
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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              Resources
            </button>
            <button
              style={{
                background: '#4ade80',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 'bold',
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px' }}>
          <h1
            style={{
              fontSize: '3.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
            }}
          >
            🌿 Te Ao Mārama
          </h1>
          <h2
            style={{
              fontSize: '1.5rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
              fontWeight: 'normal',
            }}
          >
            The Future of Education in Aotearoa New Zealand
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '3rem',
              lineHeight: '1.6',
            }}
          >
            AI-powered educational platform with 5,439+ curriculum resources, cultural integration, 
            and advanced learning analytics for teachers and students.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)',
                transition: 'transform 0.2s ease',
              }}
            >
              👨‍🏫 Start Teaching
            </button>
            <button
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              👨‍🎓 Student Portal
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section
        style={{
          padding: '4rem 2rem',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2
            style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '3rem',
            }}
          >
            Why Choose Te Ao Mārama?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                5,439+ Curriculum Resources
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                Comprehensive educational content aligned with New Zealand curriculum standards, 
                including Te Reo Māori integration and cultural safety protocols.
              </p>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                AI-Powered Learning
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                Advanced AI systems including GLM-4.5, Chain-of-Agents, and Supreme Overseer 
                technology for personalized educational experiences.
              </p>
            </div>
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
                Cultural Integration
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                Built-in tikanga Māori protocols and Te Reo Māori language support, 
                ensuring culturally safe and appropriate educational content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: 'rgba(0, 0, 0, 0.2)',
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
            🌿 Te Ao Mārama
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem' }}>
            Empowering education in Aotearoa New Zealand with AI technology and cultural integration.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <button
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              For Teachers
            </button>
            <button
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              For Students
            </button>
            <button
              style={{
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Pricing
            </button>
          </div>
          <div style={{ marginTop: '2rem', color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.9rem' }}>
            © 2024 Te Ao Mārama. All rights reserved. Built with cultural respect and AI innovation.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SimpleStableHomepage;
