import React from 'react';

const SimpleTest: React.FC = () => {
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
        <h1 /* TODO: Move to external CSS */ style={{ margin: 0, fontSize: '2.5rem' }}>🧪 Simple System Test</h1>
        <p /* TODO: Move to external CSS */ style={{ margin: '1rem 0 0 0', opacity: 0.9 }}>
          Basic functionality test - if you can see this, the system is working!
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
        <h2 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>✅ System Status</h2>
        <div
          /* TODO: Move to external CSS */ style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <div
            /* TODO: Move to external CSS */ style={{
              padding: '1rem',
              background: '#f0fff4',
              borderRadius: '8px',
              border: '1px solid #c6f6d5',
            }}
          >
            <strong>React:</strong> ✅ Working
          </div>
          <div
            /* TODO: Move to external CSS */ style={{
              padding: '1rem',
              background: '#f0fff4',
              borderRadius: '8px',
              border: '1px solid #c6f6d5',
            }}
          >
            <strong>TypeScript:</strong> ✅ Working
          </div>
          <div
            /* TODO: Move to external CSS */ style={{
              padding: '1rem',
              background: '#f0fff4',
              borderRadius: '8px',
              border: '1px solid #c6f6d5',
            }}
          >
            <strong>Routing:</strong> ✅ Working
          </div>
          <div
            /* TODO: Move to external CSS */ style={{
              padding: '1rem',
              background: '#f0fff4',
              borderRadius: '8px',
              border: '1px solid #c6f6d5',
            }}
          >
            <strong>Styling:</strong> ✅ Working
          </div>
        </div>
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
        <h2 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>🔗 Quick Links</h2>
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
            🔐 Login Page
          </a>
          <a
            href="/teacher-dashboard"
            /* TODO: Move to external CSS */ style={{
              padding: '0.75rem 1.5rem',
              background: '#38b2ac',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            👩‍🏫 Teacher Dashboard
          </a>
          <a
            href="/student-dashboard"
            /* TODO: Move to external CSS */ style={{
              padding: '0.75rem 1.5rem',
              background: '#38a169',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            👨‍🎓 Student Dashboard
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
            🏠 Landing Page
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
        <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#c05621' }}>🎯 Next Steps</h3>
        <ol /* TODO: Move to external CSS */ style={{ margin: 0, paddingLeft: '1.5rem', color: '#c05621' }}>
          <li>If you can see this page, the basic system is working</li>
          <li>Try clicking the links above to test navigation</li>
          <li>Check if the login page loads properly</li>
          <li>Verify that the dashboards are accessible</li>
          <li>Test the authentication system</li>
        </ol>
      </div>
    </div>
  );
};

export default SimpleTest;
