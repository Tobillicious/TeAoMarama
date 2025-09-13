import React from 'react';

const BasicTest: React.FC = () => {
  return (
    <div
      /* TODO: Move to external CSS */ style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        /* TODO: Move to external CSS */ style={{
          background: 'linear-gradient(135deg, #1a365d, #2d3748)',
          color: 'white',
          padding: '2rem',
          borderRadius: '16px',
          marginBottom: '2rem',
        }}
      >
        <h1 /* TODO: Move to external CSS */ style={{ margin: 0, fontSize: '2.5rem' }}>🎯 Basic System Test</h1>
        <p /* TODO: Move to external CSS */ style={{ margin: '1rem 0 0 0', opacity: 0.9 }}>
          Testing basic React functionality without authentication
        </p>
      </div>

      <div
        /* TODO: Move to external CSS */ style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>✅ Basic Functionality</h2>
        <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', lineHeight: '1.6' }}>
          If you can see this page, React is working properly. The issue might be with the
          authentication system.
        </p>
      </div>

      <div
        /* TODO: Move to external CSS */ style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>🔗 Test Links</h2>
        <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a
            href="/login"
            /* TODO: Move to external CSS */ style={{
              padding: '0.75rem 1.5rem',
              background: '#805ad5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            🔐 Test Login Page
          </a>
          <a
            href="/"
            /* TODO: Move to external CSS */ style={{
              padding: '0.75rem 1.5rem',
              background: '#d69e2e',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            🏠 Test Landing Page
          </a>
        </div>
      </div>

      <div
        /* TODO: Move to external CSS */ style={{
          background: 'linear-gradient(135deg, #fef5e7, #fed7aa)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f6ad55',
        }}
      >
        <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#c05621' }}>🔍 Debugging Steps</h3>
        <ol /* TODO: Move to external CSS */ style={{ margin: 0, paddingLeft: '1.5rem', color: '#c05621' }}>
          <li>If you can see this page, React is working</li>
          <li>Try clicking the login link to see if it loads</li>
          <li>Check browser console for any JavaScript errors</li>
          <li>If login page doesn't work, the issue is with authentication</li>
          <li>If login page works, the issue is with the dashboard components</li>
        </ol>
      </div>
    </div>
  );
};

export default BasicTest;
