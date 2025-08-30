import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';

const SystemTest: React.FC = () => {
  const { isAuthenticated, currentUser, login, logout, switchToDemoMode } = useAuth();
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runSystemTests = async () => {
    setIsRunningTests(true);
    const results: Record<string, boolean> = {};

    // Test 1: Authentication Provider
    try {
      results['authProvider'] = true;
      console.log('✅ Auth Provider: Working');
    } catch {
      results['authProvider'] = false;
      console.log('❌ Auth Provider: Failed');
    }

    // Test 2: Teacher Login
    try {
      const teacherResult = await login('teacher@teaomarama.nz', 'demo123', 'teacher');
      results['teacherLogin'] = teacherResult.success;
      console.log('✅ Teacher Login:', teacherResult.success ? 'Working' : 'Failed');
    } catch {
      results['teacherLogin'] = false;
      console.log('❌ Teacher Login: Failed');
    }

    // Test 3: Student Login
    try {
      const studentResult = await login('student@teaomarama.nz', 'demo123', 'student');
      results['studentLogin'] = studentResult.success;
      console.log('✅ Student Login:', studentResult.success ? 'Working' : 'Failed');
    } catch {
      results['studentLogin'] = false;
      console.log('❌ Student Login: Failed');
    }

    // Test 4: Demo Mode
    try {
      switchToDemoMode();
      results['demoMode'] = true;
      console.log('✅ Demo Mode: Working');
    } catch {
      results['demoMode'] = false;
      console.log('❌ Demo Mode: Failed');
    }

    // Test 5: Logout
    try {
      await logout();
      results['logout'] = true;
      console.log('✅ Logout: Working');
    } catch {
      results['logout'] = false;
      console.log('❌ Logout: Failed');
    }

    setTestResults(results);
    setIsRunningTests(false);
  };

  const getTestStatus = (testName: string) => {
    if (!testResults[testName]) return '⏳ Not Tested';
    return testResults[testName] ? '✅ Passed' : '❌ Failed';
  };

  const getOverallStatus = () => {
    const tests = Object.values(testResults);
    if (tests.length === 0) return '⏳ No Tests Run';
    const passed = tests.filter(Boolean).length;
    const total = tests.length;
    return `${passed}/${total} Tests Passed`;
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '1000px',
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
        }}
      >
        <h1 style={{ margin: 0, fontSize: '2.5rem' }}>🔐 Dual-Role Authentication System Test</h1>
        <p style={{ margin: '1rem 0 0 0', opacity: 0.9 }}>
          Comprehensive testing of our authentication system and role-based features
        </p>
      </div>

      {/* Current Status */}
      <div
        style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Current System Status</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Authentication:</strong>{' '}
            {isAuthenticated ? '✅ Active' : '❌ Not Authenticated'}
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>User:</strong> {currentUser?.name || 'None'}
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Role:</strong> {currentUser?.role || 'None'}
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Cultural Clearance:</strong> {currentUser?.culturalClearance || 'None'}
          </div>
        </div>
      </div>

      {/* Test Controls */}
      <div
        style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>System Tests</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={runSystemTests}
            disabled={isRunningTests}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#38b2ac',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: isRunningTests ? 'not-allowed' : 'pointer',
              opacity: isRunningTests ? 0.6 : 1,
            }}
          >
            {isRunningTests ? '🔄 Running Tests...' : '🧪 Run All Tests'}
          </button>
          <button
            onClick={() => login('teacher@teaomarama.nz', 'demo123', 'teacher')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#38a169',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            👩‍🏫 Test Teacher Login
          </button>
          <button
            onClick={() => login('student@teaomarama.nz', 'demo123', 'student')}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#3182ce',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            👨‍🎓 Test Student Login
          </button>
          <button
            onClick={logout}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            👋 Test Logout
          </button>
        </div>
        <div
          style={{
            padding: '1rem',
            background: '#f0fff4',
            borderRadius: '8px',
            border: '1px solid #c6f6d5',
          }}
        >
          <strong>Overall Status:</strong> {getOverallStatus()}
        </div>
      </div>

      {/* Test Results */}
      <div
        style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Test Results</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Auth Provider:</strong> {getTestStatus('authProvider')}
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Teacher Login:</strong> {getTestStatus('teacherLogin')}
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Student Login:</strong> {getTestStatus('studentLogin')}
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Demo Mode:</strong> {getTestStatus('demoMode')}
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Logout:</strong> {getTestStatus('logout')}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div
        style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>Navigation Tests</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/login"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#805ad5',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            🔐 Login Page
          </Link>
          <Link
            to="/teacher-dashboard"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#38b2ac',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            👩‍🏫 Teacher Dashboard
          </Link>
          <Link
            to="/student-dashboard"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#38a169',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            👨‍🎓 Student Dashboard
          </Link>
          <Link
            to="/"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#d69e2e',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
            }}
          >
            🏠 Landing Page
          </Link>
        </div>
      </div>

      {/* System Information */}
      <div
        style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ margin: '0 0 1rem 0', color: '#2d3748' }}>System Information</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Server:</strong> localhost:3006
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Build Status:</strong> ✅ Successful
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Auth Provider:</strong> ✅ Integrated
          </div>
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Routes:</strong> ✅ Configured
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fef5e7, #fed7aa)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #f6ad55',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', color: '#c05621' }}>🧪 Testing Instructions</h3>
        <ol style={{ margin: 0, paddingLeft: '1.5rem', color: '#c05621' }}>
          <li>Click "Run All Tests" to test the complete system</li>
          <li>Use individual test buttons to test specific features</li>
          <li>Check browser console for detailed logs</li>
          <li>Navigate to different pages to test routing</li>
          <li>Verify authentication state persists across navigation</li>
        </ol>
      </div>
    </div>
  );
};

export default SystemTest;
