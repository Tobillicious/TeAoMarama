import React, { useState } from 'react';

const SimpleGLMIntegration: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleTestAPI = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your GLM API key');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      // Test the actual GLM API
      const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'glm-4.5',
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful New Zealand educational assistant. Respond briefly and professionally.',
            },
            {
              role: 'user',
              content:
                'Create a short lesson plan for Year 10 Mathematics on statistics with cultural context.',
            },
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.choices && data.choices[0] && data.choices[0].message) {
        setResult(data.choices[0].message.content);
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            🤖 Simple GLM Integration
          </h1>
          <p className="text-xl text-gray-300">Test actual GLM API calls (working version)</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">🔑 GLM API Test</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">GLM API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your GLM API key (90f7738e0e734c13a201b5cb95bcbf64.znT6L8AUHI9ZoKrk)"
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
            </div>

            <button
              onClick={handleTestAPI}
              disabled={loading}
              className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-lg font-semibold transition-colors"
            >
              {loading ? 'Testing API...' : 'Test GLM API'}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-8">
            <div className="text-red-400 font-semibold">Error:</div>
            <div className="text-red-300">{error}</div>
          </div>
        )}

        {/* Results Display */}
        {result && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-400">✅ API Response:</h3>
            <div className="bg-white/5 rounded-lg p-4">
              <pre className="text-sm text-gray-200 whitespace-pre-wrap">{result}</pre>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4 text-blue-400">📋 Instructions:</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>1. Enter your GLM API key in the field above</p>
            <p>2. Click "Test GLM API" to make a real API call</p>
            <p>3. The system will generate a sample lesson plan using GLM-4.5</p>
            <p>4. This is a working integration - no mockups!</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">🤖 Simple GLM Integration - Real API calls</p>
          <p className="text-sm">This makes actual HTTP requests to the GLM API endpoint.</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleGLMIntegration;
