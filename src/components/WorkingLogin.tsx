import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkingLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'teacher' | 'student'>('teacher');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password, role });

    // Simulate successful login
    if (email.includes('demo') || email.includes('teaomarama')) {
      alert('Login successful! Redirecting to dashboard...');
      navigate(role === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
    } else {
      alert('Demo credentials: teacher@teaomarama.nz / demo123 or student@teaomarama.nz / demo123');
    }
  };

  const handleDemoLogin = (demoRole: 'teacher' | 'student') => {
    setRole(demoRole);
    setEmail(demoRole === 'teacher' ? 'teacher@teaomarama.nz' : 'student@teaomarama.nz');
    setPassword('demo123');

    setTimeout(() => {
      alert('Demo login successful! Redirecting...');
      navigate(demoRole === 'teacher' ? '/teacher-dashboard' : '/student-dashboard');
    }, 1000);
  };

  return (
    <div
      /* TODO: Move to external CSS */ style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a365d 0%, #2d3748 50%, #4a5568 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        /* TODO: Move to external CSS */ style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          maxWidth: '500px',
          width: '90%',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div /* TODO: Move to external CSS */ style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
          <h1
            /* TODO: Move to external CSS */ style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1a365d',
              margin: '0 0 0.5rem 0',
            }}
          >
            Te Kura o TeAoMarama
          </h1>
          <p /* TODO: Move to external CSS */ style={{ color: '#718096', margin: 0 }}>The School of Enlightenment</p>
        </div>

        <div
          /* TODO: Move to external CSS */ style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <button
            onClick={() => setRole('teacher')}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: `2px solid ${role === 'teacher' ? '#38b2ac' : '#e2e8f0'}`,
              borderRadius: '12px',
              background: role === 'teacher' ? '#38b2ac' : 'white',
              color: role === 'teacher' ? 'white' : '#4a5568',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            👩‍🏫 Kaiako (Teacher)
          </button>
          <button
            onClick={() => setRole('student')}
            style={{
              flex: 1,
              padding: '0.75rem 1rem',
              border: `2px solid ${role === 'student' ? '#38b2ac' : '#e2e8f0'}`,
              borderRadius: '12px',
              background: role === 'student' ? '#38b2ac' : 'white',
              color: role === 'student' ? 'white' : '#4a5568',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            👨‍🎓 Ākonga (Student)
          </button>
        </div>

        <form onSubmit={handleSubmit} /* TODO: Move to external CSS */ style={{ marginBottom: '2rem' }}>
          <div /* TODO: Move to external CSS */ style={{ marginBottom: '1.5rem' }}>
            <label
              /* TODO: Move to external CSS */ style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              /* TODO: Move to external CSS */ style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div /* TODO: Move to external CSS */ style={{ marginBottom: '1.5rem' }}>
            <label
              /* TODO: Move to external CSS */ style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2d3748',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              /* TODO: Move to external CSS */ style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            /* TODO: Move to external CSS */ style={{
              width: '100%',
              padding: '1rem',
              background: 'linear-gradient(135deg, #38b2ac, #319795)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </form>

        <div
          /* TODO: Move to external CSS */ style={{
            textAlign: 'center',
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #fef5e7, #fed7aa)',
            borderRadius: '16px',
            border: '1px solid #f6ad55',
          }}
        >
          <h4 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#c05621', fontSize: '1rem' }}>
            🎭 Try Demo Mode
          </h4>
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => handleDemoLogin('teacher')}
              /* TODO: Move to external CSS */ style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '2px solid #f6ad55',
                borderRadius: '12px',
                background: 'white',
                color: '#c05621',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              👩‍🏫 Teacher Demo
            </button>
            <button
              onClick={() => handleDemoLogin('student')}
              /* TODO: Move to external CSS */ style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '2px solid #f6ad55',
                borderRadius: '12px',
                background: 'white',
                color: '#c05621',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
            >
              👨‍🎓 Student Demo
            </button>
          </div>
        </div>

        <div /* TODO: Move to external CSS */ style={{ textAlign: 'center' }}>
          <a
            href="/basic-test"
            /* TODO: Move to external CSS */ style={{
              color: '#38b2ac',
              fontWeight: '600',
              textDecoration: 'none',
            }}
          >
            ← Back to Basic Test
          </a>
        </div>
      </div>
    </div>
  );
};

export default WorkingLogin;
