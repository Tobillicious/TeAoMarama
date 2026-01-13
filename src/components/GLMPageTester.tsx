import React, { useEffect, useState } from 'react';
import { GLMPageTester } from '../utils/glm-page-tester';

const GLMPageTesterComponent: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [tester, setTester] = useState<GLMPageTester | null>(null);

  useEffect(() => {
    if (apiKey) {
      setTester(new GLMPageTester(apiKey));
    }
  }, [apiKey]);

  const handleTestAllPages = async () => {
    if (!tester) {
      alert('Please enter your GLM API key first');
      return;
    }

    setIsTesting(true);
    setResults([]);

    try {
      const testResults = await tester.testAllPages();
      setResults(testResults);
    } catch (error) {
      console.error('Testing failed:', error);
      alert('Testing failed. Check console for details.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleTestSpecificPage = async (url: string) => {
    if (!tester) {
      alert('Please enter your GLM API key first');
      return;
    }

    try {
      const result = await tester.testPage(url);
      setResults((prev) => [result, ...prev]);
    } catch (error) {
      console.error('Page test failed:', error);
      alert('Page test failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            🧪 GLM Page Tester
          </h1>
          <p className="text-xl text-gray-300 mb-6">AI-powered page testing with GLM models</p>
        </div>

        {/* API Key Input */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">🔑 GLM API Configuration</h2>
          <div className="flex gap-4">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your GLM API key"
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={() => setTester(apiKey ? new GLMPageTester(apiKey) : null)}
              className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors"
            >
              Set API Key
            </button>
          </div>
        </div>

        {/* Test Controls */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">🚀 Test Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleTestAllPages}
              disabled={isTesting || !tester}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTesting ? '🧪 Testing All Pages...' : '🧪 Test All Pages'}
            </button>

            <button
              onClick={() => handleTestSpecificPage('/glm-symphony')}
              disabled={isTesting || !tester}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎼 Test GLM Symphony
            </button>

            <button
              onClick={() => handleTestSpecificPage('/supreme-overseer')}
              disabled={isTesting || !tester}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              👑 Test Supreme Overseer
            </button>
          </div>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">📊 Test Results</h2>
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-blue-400">{result.url}</h3>
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        result.status === 'success'
                          ? 'bg-green-500/20 text-green-300'
                          : result.status === 'warning'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {result.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">HTTP Status:</span>
                      <div className="font-semibold">{result.httpStatus}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Load Time:</span>
                      <div className="font-semibold">{result.loadTime}ms</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Cultural Safety:</span>
                      <div className="font-semibold text-green-400">
                        {result.glmAIAnalysis?.culturalSafety || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Educational Value:</span>
                      <div className="font-semibold text-blue-400">
                        {result.glmAIAnalysis?.educationalValue || 'N/A'}
                      </div>
                    </div>
                  </div>

                  {result.glmAIAnalysis?.recommendations?.length > 0 && (
                    <div className="mt-3">
                      <span className="text-gray-400">Recommendations:</span>
                      <ul className="list-disc list-inside text-sm text-gray-300 mt-1">
                        {result.glmAIAnalysis.recommendations.map((rec: string, i: number) => (
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
      </div>
    </div>
  );
};

export default GLMPageTesterComponent;
