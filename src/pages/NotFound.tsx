import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div /* TODO: Move to external CSS */ style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div /* TODO: Move to external CSS */ style={{
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        border: '1px solid #d1d5db',
        borderRadius: '1rem',
        padding: '3rem',
        maxWidth: '600px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div /* TODO: Move to external CSS */ style={{ fontSize: '4rem', marginBottom: '1rem' }}>🗺️</div>
        
        <h1 /* TODO: Move to external CSS */ style={{ 
          color: '#1f2937', 
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>
          Page Not Found
        </h1>
        
        <h2 /* TODO: Move to external CSS */ style={{ 
          color: '#059669', 
          fontSize: '1.5rem',
          marginBottom: '1.5rem',
          fontWeight: '600'
        }}>
          Kāore i kitea - The page you're looking for doesn't exist
        </h2>
        
        <p /* TODO: Move to external CSS */ style={{ 
          color: '#4b5563', 
          fontSize: '1.1rem',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          The educational resource or page you were trying to access may have been moved, 
          renamed, or is temporarily unavailable. Let's get you back on track!
        </p>

        <div /* TODO: Move to external CSS */ style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/"
            /* TODO: Move to external CSS */ style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#059669',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'background-color 0.2s'
            }}
          >
            <Home size={20} />
            Go Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            /* TODO: Move to external CSS */ style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#6b7280',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'background-color 0.2s'
            }}
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
          
          <Link
            to="/resources"
            /* TODO: Move to external CSS */ style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#1e40af',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              fontSize: '1rem',
              transition: 'background-color 0.2s'
            }}
          >
            <Search size={20} />
            Browse Resources
          </Link>
        </div>

        <div /* TODO: Move to external CSS */ style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem'
        }}>
          <h3 /* TODO: Move to external CSS */ style={{
            color: '#059669',
            fontSize: '1.1rem',
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            🌿 Popular Resources
          </h3>
          <div /* TODO: Move to external CSS */ style={{ color: '#16a34a', fontSize: '0.9rem', lineHeight: '1.4' }}>
            • <Link to="/working-resources" /* TODO: Move to external CSS */ style={{ color: '#059669' }}>Educational Resources Library</Link><br/>
            • <Link to="/cultural-learning-modules" /* TODO: Move to external CSS */ style={{ color: '#059669' }}>Cultural Learning Modules</Link><br/>
            • <Link to="/teacher" /* TODO: Move to external CSS */ style={{ color: '#059669' }}>Teacher Dashboard</Link><br/>
            • <Link to="/student" /* TODO: Move to external CSS */ style={{ color: '#059669' }}>Student Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;