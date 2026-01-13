import {
  AlertTriangle,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  Download,
  Globe,
  RefreshCw,
  Shield,
  TestTube,
  XCircle,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { PageTestResult } from '../utils/glm-page-tester';
import { GLMPageTester } from '../utils/glm-page-tester';
import { glmTestingCoordinator } from '../utils/glm-testing-coordinator';
import { unifiedAgentCoordination } from '../utils/unified-agent-coordination';

const GLMPageTesterDashboard: React.FC = () => {
  const [glmApiKey, setGlmApiKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<PageTestResult[]>([]);
  const [report, setReport] = useState('');
  const [tester] = useState(new GLMPageTester());
  const [isUnifiedTesting, setIsUnifiedTesting] = useState(false);
  const [coordinationStatus, setCoordinationStatus] = useState<any>(null);

  useEffect(() => {
    // Initialize unified coordination monitoring
    const interval = setInterval(() => {
      const status = unifiedAgentCoordination.getCoordinationStatus();
      setCoordinationStatus(status);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleApiKeyChange = (key: string) => {
    setGlmApiKey(key);
    // Update tester with new API key
    (tester as GLMPageTester & { glmApiKey: string }).glmApiKey = key;
  };

  const runComprehensiveTest = async () => {
    setIsTesting(true);
    setTestResults([]);
    setReport('');

    try {
      console.log('🧪 Starting comprehensive GLM-powered page testing...');
      const results = await tester.testAllPages();
      setTestResults(results);

      const testReport = tester.generateReport(results);
      setReport(testReport);

      console.log('✅ GLM testing completed:', results);
    } catch (error) {
      console.error('❌ GLM testing failed:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const runUnifiedCoordinatedTest = async () => {
    setIsUnifiedTesting(true);
    setTestResults([]);
    setReport('');

    try {
      console.log('👑 Starting unified coordinated GLM testing...');

      // Start unified GLM testing coordination
      glmTestingCoordinator.startUnifiedGLMTesting();

      // Execute comprehensive testing through coordination framework
      const results = await glmTestingCoordinator.executeComprehensiveTesting(
        'comprehensive-test-001',
      );
      setTestResults(results);

      const testReport = tester.generateReport(results);
      setReport(testReport);

      console.log('✅ Unified coordinated GLM testing completed:', results);
    } catch (error) {
      console.error('❌ Unified coordinated GLM testing failed:', error);
    } finally {
      setIsUnifiedTesting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getCulturalSafetyColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'needs_improvement':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getEducationalValueColor = (level: string) => {
    switch (level) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-blue-600';
      case 'needs_improvement':
        return 'text-yellow-600';
      case 'poor':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const downloadReport = () => {
    if (!report) return;

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `glm-page-test-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const summary =
    testResults.length > 0
      ? {
          total: testResults.length,
          successful: testResults.filter((r) => r.status === 'success').length,
          warnings: testResults.filter((r) => r.status === 'warning').length,
          errors: testResults.filter((r) => r.status === 'error').length,
          avgLoadTime: Math.round(
            testResults.reduce((sum, r) => sum + r.loadTime, 0) / testResults.length,
          ),
          culturalSafety: testResults.filter(
            (r) =>
              r.glmAIAnalysis.culturalSafety === 'excellent' ||
              r.glmAIAnalysis.culturalSafety === 'good',
          ).length,
          educationalValue: testResults.filter(
            (r) =>
              r.glmAIAnalysis.educationalValue === 'excellent' ||
              r.glmAIAnalysis.educationalValue === 'good',
          ).length,
        }
      : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <TestTube className="w-12 h-12 text-blue-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">GLM-Powered Page Tester</h1>
              <p className="text-xl text-gray-600">
                Systematic AI Analysis of Every Te Ao Mārama Page
              </p>
            </div>
          </div>
        </div>

        {/* GLM API Key Input */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Brain className="w-6 h-6 text-purple-600 mr-2" />
            GLM Configuration
          </h2>
          <div className="flex items-center space-x-4">
            <input
              type="password"
              placeholder="Enter GLM API Key for enhanced analysis"
              value={glmApiKey}
              onChange={(e) => handleApiKeyChange(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex space-x-2">
              <button
                onClick={runComprehensiveTest}
                disabled={isTesting || isUnifiedTesting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <TestTube className="w-4 h-4 mr-2" />
                    Run GLM Tests
                  </>
                )}
              </button>
              <button
                onClick={runUnifiedCoordinatedTest}
                disabled={isTesting || isUnifiedTesting}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isUnifiedTesting ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Coordinating...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Unified Testing
                  </>
                )}
              </button>
            </div>
          </div>
          {!glmApiKey && (
            <p className="text-sm text-gray-500 mt-2">
              💡 GLM API key enables advanced AI analysis. Without it, basic fallback analysis will
              be used.
            </p>
          )}
        </div>

        {/* Unified Agent Coordination Status */}
        {coordinationStatus && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Brain className="w-6 h-6 text-purple-600 mr-2" />
              👑 Unified Agent Coordination Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Agents</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {coordinationStatus.progress.activeAgents}
                    </p>
                  </div>
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Coordination Efficiency</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {coordinationStatus.progress.coordinationEfficiency.toFixed(1)}%
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Acceleration Factor</p>
                    <p className="text-2xl font-bold text-green-600">
                      {coordinationStatus.progress.accelerationFactor.toFixed(1)}x
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cultural Excellence</p>
                    <p className="text-2xl font-bold text-pink-600">
                      {coordinationStatus.progress.culturalExcellence.toFixed(1)}%
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-pink-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Pages</p>
                  <p className="text-3xl font-bold text-gray-900">{summary.total}</p>
                </div>
                <Globe className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-3xl font-bold text-green-600">
                    {((summary.successful / summary.total) * 100).toFixed(1)}%
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Load Time</p>
                  <p className="text-3xl font-bold text-blue-600">{summary.avgLoadTime}ms</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Cultural Safety</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {((summary.culturalSafety / summary.total) * 100).toFixed(1)}%
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        )}

        {/* Test Results */}
        {testResults.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <TestTube className="w-6 h-6 text-blue-600 mr-2" />
                GLM Test Results
              </h2>
              {report && (
                <button
                  onClick={downloadReport}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
              )}
            </div>

            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`border rounded-lg p-4 ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(result.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{result.url}</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {result.glmAIAnalysis.pageType}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>HTTP {result.httpStatus}</span>
                      <span>{result.loadTime}ms</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Functionality</p>
                      <p className="text-sm text-gray-900">{result.glmAIAnalysis.functionality}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Cultural Safety</p>
                      <p
                        className={`text-sm font-medium ${getCulturalSafetyColor(
                          result.glmAIAnalysis.culturalSafety,
                        )}`}
                      >
                        {result.glmAIAnalysis.culturalSafety}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Educational Value</p>
                      <p
                        className={`text-sm font-medium ${getEducationalValueColor(
                          result.glmAIAnalysis.educationalValue,
                        )}`}
                      >
                        {result.glmAIAnalysis.educationalValue}
                      </p>
                    </div>
                  </div>

                  {result.errors.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-red-600 mb-1">Errors:</p>
                      <ul className="text-sm text-red-600 list-disc list-inside">
                        {result.errors.map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.warnings.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-yellow-600 mb-1">Warnings:</p>
                      <ul className="text-sm text-yellow-600 list-disc list-inside">
                        {result.warnings.map((warning, i) => (
                          <li key={i}>{warning}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.glmAIAnalysis.issues.length > 0 && (
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-600 mb-1">GLM Issues:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {result.glmAIAnalysis.issues.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {result.glmAIAnalysis.recommendations.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">GLM Recommendations:</p>
                      <ul className="text-sm text-gray-600 list-disc list-inside">
                        {result.glmAIAnalysis.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Report Preview */}
        {report && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="w-6 h-6 text-green-600 mr-2" />
              GLM Analysis Report
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap">{report}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GLMPageTesterDashboard;
