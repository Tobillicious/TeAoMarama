/**
 * 🧪 SIMPLE TEST PAGE
 *
 * Basic test page to verify core functionality works
 */

import React, { useEffect, useState } from 'react';

const SimpleTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const runTests = async () => {
      const results: string[] = [];

      // Test 1: Basic React functionality
      try {
        results.push('✅ React is working');
      } catch (error) {
        results.push('❌ React error: ' + error);
      }

      // Test 2: DOM access
      try {
        const hasDocument = typeof document !== 'undefined';
        results.push(hasDocument ? '✅ DOM access working' : '❌ DOM access failed');
      } catch (error) {
        results.push('❌ DOM error: ' + error);
      }

      // Test 3: Local storage
      try {
        localStorage.setItem('test', 'working');
        const testValue = localStorage.getItem('test');
        results.push(
          testValue === 'working' ? '✅ Local storage working' : '❌ Local storage failed',
        );
      } catch (error) {
        results.push('❌ Local storage error: ' + error);
      }

      // Test 4: Fetch API
      try {
        const response = await fetch('/');
        results.push(response.ok ? '✅ Fetch API working' : '❌ Fetch API failed');
      } catch (error) {
        results.push('❌ Fetch error: ' + error);
      }

      // Test 5: Console logging
      try {
        console.log('Test log message');
        results.push('✅ Console logging working');
      } catch (error) {
        results.push('❌ Console error: ' + error);
      }

      setTestResults(results);
      setIsLoading(false);
    };

    runTests();
  }, []);

  if (isLoading) {
    return (
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>🧪 Running Tests...</h1>
        <p>Please wait while we test the basic functionality...</p>
      </div>
    );
  }

  return (
    <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>🧪 Simple Functionality Test</h1>
      <p>Testing basic functionality to see what's working:</p>

      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginTop: '2rem' }}>
        {testResults.map((result, index) => (
          <div
            key={index}
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
              padding: '0.5rem',
              margin: '0.5rem 0',
              backgroundColor: result.startsWith('✅') ? '#d1fae5' : '#fee2e2',
              border: '1px solid ' + (result.startsWith('✅') ? '#10b981' : '#ef4444'),
              borderRadius: '4px',
            }}
          >
            {result}
          </div>
        ))}
      </div>

      <div
        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
        }}
      >
        <h3>🎯 What This Tests:</h3>
        <ul>
          <li>React component rendering</li>
          <li>DOM access and manipulation</li>
          <li>Local storage functionality</li>
          <li>Fetch API for network requests</li>
          <li>Console logging</li>
        </ul>
      </div>

      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginTop: '2rem' }}>
        <button
          onClick={() => (window.location.href = '/')}
          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
            padding: '1rem 2rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginRight: '1rem',
          }}
        >
          ← Back to Home
        </button>

        <button
          onClick={() => window.location.reload()}
          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
            padding: '1rem 2rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          🔄 Run Tests Again
        </button>
      </div>
    </div>
  );
};

export default SimpleTest;
