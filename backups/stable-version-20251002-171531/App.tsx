import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Minimal Working Homepage
const HomePage = () => {
  return (
    <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '600px',
      }}>
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          🌿 Te Ao Mārama
        </h1>
        <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '30px' }}>
          New Zealand's Educational Platform
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
          <Link
            to="/join"
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
          </Link>
          <Link
            to="/resources"
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
          </Link>
        </div>
      </div>
    </div>
  );
};

// Minimal Working Join Page
const JoinPage = () => {
  return (
    <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
            👥 Join Te Ao Mārama
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem' }}>
            Start your educational journey with us
          </p>
        </div>

        <form>
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
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Role
            </label>
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
            type="submit"
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
        </form>
      </div>
    </div>
  );
};

// Minimal Working Resources Page
const ResourcesPage = () => {
  const resources = [
    {
      title: "Te Ao Māori Resources",
      description: "Culturally safe resources integrating Māori perspectives",
      icon: "🌿"
    },
    {
      title: "Curriculum Lessons",
      description: "Ready-to-use lessons aligned with NZ Curriculum",
      icon: "📖"
    },
    {
      title: "Assessment Tools",
      description: "Interactive assessments with cultural integration",
      icon: "📊"
    }
  ];

  return (
    <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
    }}>
      <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          maxWidth: '1200px',
          margin: '0 auto',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
            📚 Educational Resources
          </h1>
          <p style={{ color: '#374151', fontSize: '1.2rem' }}>
            Curriculum-aligned resources for New Zealand educators
          </p>
        </div>

        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
        }}>
          {resources.map((resource, index) => (
          <div
              key={index}
            style={{
              background: '#f8fafc',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #e2e8f0',
              textAlign: 'center',
            }}
          >
              <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>
                {resource.icon} {resource.title}
              </h3>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                {resource.description}
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
                Explore {resource.title}
            </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Minimal Working Navigation
const Navigation = () => {
  return (
    <nav style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        padding: '15px 40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    }}>
      <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
      }}>
        <Link
          to="/"
          style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
          }}
        >
          🌿 Te Ao Mārama
        </Link>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link
            to="/resources"
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background 0.3s',
            }}
          >
            Resources
          </Link>
          <Link
            to="/join"
            style={{
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              transition: 'background 0.3s',
            }}
          >
            Join Now
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;