import React from 'react';

const SimpleLogin: React.FC = () => {
  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '500px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1a365d, #2d3748)',
          color: 'white',
          padding: '2rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2rem' }}>🌿 Te Kura o TeAoMarama</h1>
        <p style={{ margin: '1rem 0 0 0', opacity: 0.9 }}>Simple Login Test - No Authentication</p>
      </div>

      <div
        style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 1.5rem 0', color: '#2d3748', textAlign: 'center' }}>
          Simple Login Form
        </h2>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#4a5568',
                fontWeight: '600',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#4a5568',
                fontWeight: '600',
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '1rem',
              background: '#38b2ac',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Sign In
          </button>
        </form>

        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f0fff4',
            borderRadius: '8px',
            border: '1px solid #c6f6d5',
          }}
        >
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#22543d' }}>✅ Test Status</h3>
          <p style={{ margin: 0, color: '#22543d' }}>
            If you can see this form, React is working properly. The issue is with the
            authentication system.
          </p>
        </div>

        <div
          style={{
            marginTop: '1rem',
            textAlign: 'center',
          }}
        >
          <a
            href="/basic-test"
            style={{
              color: '#38b2ac',
              textDecoration: 'none',
              fontWeight: '600',
            }}
          >
            ← Back to Basic Test
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;
