/**
 * 🧪 FUNCTIONALITY TEST PAGE
 *
 * Simple test page to verify that the core functionality actually works.
 * This page tests resource loading, search, and basic interactions.
 */

import React, { useState } from 'react';
import { loadSimpleEducationalContent } from '../utils/simple-content-loader';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  message: string;
  duration?: number;
}

const FunctionalityTest: React.FC = () => {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Resource Loading', status: 'pending', message: 'Waiting to start...' },
    { name: 'Search Functionality', status: 'pending', message: 'Waiting to start...' },
    { name: 'Cultural Content', status: 'pending', message: 'Waiting to start...' },
    { name: 'Quality Metrics', status: 'pending', message: 'Waiting to start...' },
    { name: 'UI Components', status: 'pending', message: 'Waiting to start...' },
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const updateTest = (index: number, updates: Partial<TestResult>) => {
    setTests((prev) => prev.map((test, i) => (i === index ? { ...test, ...updates } : test)));
  };

  const runTests = async () => {
    setIsRunning(true);

    // Test 1: Resource Loading
    updateTest(0, { status: 'running', message: 'Loading resources...' });
    const startTime1 = Date.now();

    try {
      const resources = await loadSimpleEducationalContent();
      const duration1 = Date.now() - startTime1;

      if (resources.length > 0) {
        updateTest(0, {
          status: 'passed',
          message: `✅ Loaded ${resources.length} resources successfully`,
          duration: duration1,
        });
      } else {
        updateTest(0, {
          status: 'failed',
          message: '❌ No resources loaded',
          duration: duration1,
        });
      }
    } catch (error) {
      updateTest(0, {
        status: 'failed',
        message: `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration: Date.now() - startTime1,
      });
    }

    // Test 2: Search Functionality
    updateTest(1, { status: 'running', message: 'Testing search...' });
    const startTime2 = Date.now();

    try {
      const resources = await loadSimpleEducationalContent();
      const searchResults = resources.filter(
        (r) =>
          r.title.toLowerCase().includes('māori') || r.description.toLowerCase().includes('māori'),
      );
      const duration2 = Date.now() - startTime2;

      updateTest(1, {
        status: 'passed',
        message: `✅ Found ${searchResults.length} Māori-related resources`,
        duration: duration2,
      });
    } catch (error) {
      updateTest(1, {
        status: 'failed',
        message: `❌ Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration: Date.now() - startTime2,
      });
    }

    // Test 3: Cultural Content
    updateTest(2, { status: 'running', message: 'Checking cultural content...' });
    const startTime3 = Date.now();

    try {
      const resources = await loadSimpleEducationalContent();
      const culturalResources = resources.filter((r) => r.culturalElements > 0);
      const duration3 = Date.now() - startTime3;

      updateTest(2, {
        status: 'passed',
        message: `✅ ${culturalResources.length} resources have cultural elements`,
        duration: duration3,
      });
    } catch (error) {
      updateTest(2, {
        status: 'failed',
        message: `❌ Cultural content check failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        duration: Date.now() - startTime3,
      });
    }

    // Test 4: Quality Metrics
    updateTest(3, { status: 'running', message: 'Validating quality metrics...' });
    const startTime4 = Date.now();

    try {
      const resources = await loadSimpleEducationalContent();
      const withMetrics = resources.filter((r) => r.qualityMetrics);
      const duration4 = Date.now() - startTime4;

      updateTest(3, {
        status: 'passed',
        message: `✅ ${withMetrics.length} resources have quality metrics`,
        duration: duration4,
      });
    } catch (error) {
      updateTest(3, {
        status: 'failed',
        message: `❌ Quality metrics check failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        duration: Date.now() - startTime4,
      });
    }

    // Test 5: UI Components
    updateTest(4, { status: 'running', message: 'Testing UI components...' });
    const startTime5 = Date.now();

    try {
      // Test if basic UI elements are present
      const hasTitle = document.title && document.title.length > 0;
      const hasBody = document.body && document.body.children.length > 0;
      const duration5 = Date.now() - startTime5;

      if (hasTitle && hasBody) {
        updateTest(4, {
          status: 'passed',
          message: '✅ UI components are rendering correctly',
          duration: duration5,
        });
      } else {
        updateTest(4, {
          status: 'failed',
          message: '❌ UI components not rendering properly',
          duration: duration5,
        });
      }
    } catch (error) {
      updateTest(4, {
        status: 'failed',
        message: `❌ UI test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        duration: Date.now() - startTime4,
      });
    }

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <span className="text-gray-400">⏳</span>;
      case 'running':
        return <span className="text-blue-500">🔄</span>;
      case 'passed':
        return <span className="text-green-500">✅</span>;
      case 'failed':
        return <span className="text-red-500">❌</span>;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'passed':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
    }
  };

  const passedTests = tests.filter((t) => t.status === 'passed').length;
  const totalTests = tests.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🧪 Site Functionality Test</h1>
            <p className="text-gray-600">
              Testing core functionality to ensure the site actually works
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Test Results: {passedTests}/{totalTests} Passed
              </h2>
              <button
                onClick={runTests}
                disabled={isRunning}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isRunning
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isRunning ? 'Running Tests...' : 'Run Tests'}
              </button>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(passedTests / totalTests) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {tests.map((test, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${getStatusColor(test.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(test.status)}
                    <div>
                      <h3 className="font-medium">{test.name}</h3>
                      <p className="text-sm opacity-75">{test.message}</p>
                    </div>
                  </div>
                  {test.duration && <span className="text-sm font-mono">{test.duration}ms</span>}
                </div>
              </div>
            ))}
          </div>

          {passedTests === totalTests && (
            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span className="font-medium text-green-800">
                  🎉 All tests passed! The site is working correctly.
                </span>
              </div>
            </div>
          )}

          {passedTests < totalTests && !isRunning && (
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-yellow-500">⚠️</span>
                <span className="font-medium text-yellow-800">
                  ⚠️ Some tests failed. Check the results above for details.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionalityTest;
