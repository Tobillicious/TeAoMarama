import React from 'react';
import { useAuth } from '../services/DualRoleAuthProvider';
import { Link } from 'react-router-dom';

const AuthTest: React.FC = () => {
  const { isAuthenticated, currentUser, login, logout, switchToDemoMode } = useAuth();

  const handleTeacherDemo = async () => {
    const result = await login('teacher@teaomarama.nz', 'demo123', 'teacher');
    console.log('Teacher login result:', result);
  };

  const handleStudentDemo = async () => {
    const result = await login('student@teaomarama.nz', 'demo123', 'student');
    console.log('Student login result:', result);
  };

  return (
    <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🔐 Authentication System Test</h1>
      
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Current State:</h2>
        <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
        {currentUser && (
          <div>
            <p><strong>User:</strong> {currentUser.name}</p>
            <p><strong>Role:</strong> {currentUser.role}</p>
            <p><strong>Cultural Clearance:</strong> {currentUser.culturalClearance}</p>
          </div>
        )}
      </div>

      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '2rem' }}>
        <h2>Test Actions:</h2>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={handleTeacherDemo}
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.75rem 1.5rem', background: '#38b2ac', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            👩‍🏫 Login as Teacher
          </button>
          <button 
            onClick={handleStudentDemo}
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.75rem 1.5rem', background: '#38a169', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            👨‍🎓 Login as Student
          </button>
          <button 
            onClick={switchToDemoMode}
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.75rem 1.5rem', background: '#805ad5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            🎭 Switch to Demo Mode
          </button>
          <button 
            onClick={logout}
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.75rem 1.5rem', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            👋 Logout
          </button>
        </div>
      </div>

      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '2rem' }}>
        <h2>Navigation:</h2>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link 
            to="/login"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.75rem 1.5rem', background: '#3182ce', color: 'white', textDecoration: 'none', borderRadius: '8px' }}
          >
            🔐 Go to Login Page
          </Link>
          <Link 
            to="/teacher-dashboard"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.75rem 1.5rem', background: '#38b2ac', color: 'white', textDecoration: 'none', borderRadius: '8px' }}
          >
            👩‍🏫 Teacher Dashboard
          </Link>
          <Link 
            to="/student-dashboard"
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.75rem 1.5rem', background: '#38a169', color: 'white', textDecoration: 'none', borderRadius: '8px' }}
          >
            👨‍🎓 Student Dashboard
          </Link>
        </div>
      </div>

      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '1rem', background: '#fff3cd', border: '1px solid #ffeaa7', borderRadius: '8px' }}>
        <h3>🔍 Debug Info:</h3>
        <p>Check the browser console for detailed authentication logs.</p>
        <p>If you see any errors, they will appear there.</p>
      </div>
    </div>
  );
};

export default AuthTest;
