import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSimple: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div /* TODO: Move to external CSS */ style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto',
      backgroundColor: 'white',
      minHeight: '100vh'
    }}>
      <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 /* TODO: Move to external CSS */ style={{ fontSize: '3rem', marginBottom: '1rem', color: '#059669' }}>
          🌿 Te Ao Mārama
        </h1>
        <p /* TODO: Move to external CSS */ style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
          Educational Resources Platform for Aotearoa New Zealand
        </p>
        <p /* TODO: Move to external CSS */ style={{ fontSize: '1rem', color: '#059669', fontWeight: 'bold' }}>
          ✅ WORKING - React Router functional
        </p>
      </div>

      <div /* TODO: Move to external CSS */ style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        <div /* TODO: Move to external CSS */ style={{ 
          padding: '2rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 /* TODO: Move to external CSS */ style={{ color: '#059669', marginBottom: '1rem' }}>📚 Resources</h3>
          <p /* TODO: Move to external CSS */ style={{ marginBottom: '1rem' }}>Access educational content</p>
          <button 
            onClick={() => navigate('/resources')}
            /* TODO: Move to external CSS */ style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#059669', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Browse Resources
          </button>
        </div>

        <div /* TODO: Move to external CSS */ style={{ 
          padding: '2rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 /* TODO: Move to external CSS */ style={{ color: '#0891b2', marginBottom: '1rem' }}>🤖 GLM Models</h3>
          <p /* TODO: Move to external CSS */ style={{ marginBottom: '1rem' }}>GLM-4.5 and Z1 model dashboard</p>
          <button 
            onClick={() => navigate('/glm-models')}
            /* TODO: Move to external CSS */ style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#0891b2', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            GLM Dashboard
          </button>
        </div>

        <div /* TODO: Move to external CSS */ style={{ 
          padding: '2rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 /* TODO: Move to external CSS */ style={{ color: '#7c3aed', marginBottom: '1rem' }}>👨‍🏫 Teacher Tools</h3>
          <p /* TODO: Move to external CSS */ style={{ marginBottom: '1rem' }}>Professional dashboard</p>
          <button 
            onClick={() => navigate('/teacher')}
            /* TODO: Move to external CSS */ style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#7c3aed', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Teacher Dashboard
          </button>
        </div>

        <div /* TODO: Move to external CSS */ style={{ 
          padding: '2rem', 
          backgroundColor: '#f9fafb', 
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          <h3 /* TODO: Move to external CSS */ style={{ color: '#dc2626', marginBottom: '1rem' }}>🎯 Year 8 Content</h3>
          <p /* TODO: Move to external CSS */ style={{ marginBottom: '1rem' }}>Social Studies curriculum</p>
          <button 
            onClick={() => navigate('/year8-social-studies')}
            /* TODO: Move to external CSS */ style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#dc2626', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Year 8 Content
          </button>
        </div>
      </div>

      <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#f3f4f6', borderRadius: '12px' }}>
        <h2 /* TODO: Move to external CSS */ style={{ marginBottom: '1rem', color: '#374151' }}>System Status</h2>
        <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <span /* TODO: Move to external CSS */ style={{ color: '#16a34a' }}>✅ React Working</span>
          <span /* TODO: Move to external CSS */ style={{ color: '#16a34a' }}>✅ Router Working</span>
          <span /* TODO: Move to external CSS */ style={{ color: '#16a34a' }}>✅ Build Success</span>
          <span /* TODO: Move to external CSS */ style={{ color: '#16a34a' }}>✅ Components Loading</span>
        </div>
      </div>
    </div>
  );
};

export default HomeSimple;