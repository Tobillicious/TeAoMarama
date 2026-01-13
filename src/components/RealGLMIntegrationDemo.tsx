import React, { useEffect, useState } from 'react';
import { apiConfigManager } from '../utils/api-config-manager';
import { realGLMIntegration } from '../utils/real-glm-integration';

const RealGLMIntegrationDemo: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Form states
  const [subject, setSubject] = useState('Mathematics');
  const [yearLevel, setYearLevel] = useState('Year 10');
  const [topic, setTopic] = useState('Statistics and Probability');
  const [content, setContent] = useState('');

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = () => {
    const config = apiConfigManager.getConfig();
    const glmStatus = realGLMIntegration.getStatus();

    setStatus(glmStatus);
    setIsReady(glmStatus.isReady);
    setApiKey(config.glm.apiKey || '');
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      // Store API key in localStorage for demo
      localStorage.setItem('VITE_GLM_API_KEY', apiKey);
      // Reload the page to reinitialize
      window.location.reload();
    }
  };

  const handleGenerateContent = async () => {
    if (!isReady) {
      setError('GLM integration not ready. Please configure API key first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const generatedContent = await realGLMIntegration.generateEducationalContent(
        subject,
        yearLevel,
        topic,
        true, // Include cultural context
      );

      if (generatedContent) {
        setResult(generatedContent);
      } else {
        setError('Failed to generate content. Please check your API key and try again.');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceContent = async () => {
    if (!isReady || !content.trim()) {
      setError('GLM integration not ready or no content provided.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const enhancedContent = await realGLMIntegration.enhanceExistingContent(content, 'cultural');

      if (enhancedContent) {
        setResult(enhancedContent);
      } else {
        setError('Failed to enhance content. Please check your API key and try again.');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleValidateContent = async () => {
    if (!isReady || !content.trim()) {
      setError('GLM integration not ready or no content provided.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const validation = await realGLMIntegration.validateCulturalSafety(content);

      if (validation) {
        setResult(`Cultural Safety Validation:
        
Score: ${validation.score}/100
Is Safe: ${validation.isSafe ? 'Yes' : 'No'}

Suggestions:
${validation.suggestions.map((s) => `• ${s}`).join('\n')}`);
      } else {
        setError('Failed to validate content. Please check your API key and try again.');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuestions = async () => {
    if (!isReady) {
      setError('GLM integration not ready. Please configure API key first.');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const questions = await realGLMIntegration.generateAssessmentQuestions(
        subject,
        yearLevel,
        topic,
        'multiple-choice',
        3,
      );

      if (questions && questions.length > 0) {
        setResult(`Assessment Questions for ${subject} - ${topic}:

${questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n')}`);
      } else {
        setError('Failed to generate questions. Please check your API key and try again.');
      }
    } catch (err) {
      setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            🤖 Real GLM Integration Demo
          </h1>
          <p className="text-xl text-gray-300">Actual working integration with GLM-4.5 API</p>
        </div>

        {/* Status Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-green-400">🔧 Integration Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400">API Key Configured</div>
              <div
                className={`text-lg font-bold ${
                  status?.apiKeyConfigured ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {status?.apiKeyConfigured ? '✅ Yes' : '❌ No'}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400">Integration Ready</div>
              <div className={`text-lg font-bold ${isReady ? 'text-green-400' : 'text-red-400'}`}>
                {isReady ? '✅ Ready' : '❌ Not Ready'}
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="text-sm text-gray-400">Model</div>
              <div className="text-lg font-bold text-blue-400">{status?.model || 'glm-4.5'}</div>
            </div>
          </div>
        </div>

        {/* API Key Configuration */}
        {!isReady && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">🔑 Configure GLM API Key</h2>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
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
                type="submit"
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
              >
                Configure API Key
              </button>
            </form>
          </div>
        )}

        {/* Content Generation */}
        {isReady && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">
                  📝 Generate Educational Content
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="Mathematics">Mathematics</option>
                      <option value="English">English</option>
                      <option value="Science">Science</option>
                      <option value="Social Studies">Social Studies</option>
                      <option value="Te Reo Māori">Te Reo Māori</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Year Level
                    </label>
                    <select
                      value={yearLevel}
                      onChange={(e) => setYearLevel(e.target.value)}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400"
                    >
                      <option value="Year 7">Year 7</option>
                      <option value="Year 8">Year 8</option>
                      <option value="Year 9">Year 9</option>
                      <option value="Year 10">Year 10</option>
                      <option value="Year 11">Year 11</option>
                      <option value="Year 12">Year 12</option>
                      <option value="Year 13">Year 13</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Topic</label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="Enter the topic to cover"
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                    />
                  </div>
                  <button
                    onClick={handleGenerateContent}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? 'Generating...' : 'Generate Lesson Plan'}
                  </button>
                  <button
                    onClick={handleGenerateQuestions}
                    disabled={loading}
                    className="w-full px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? 'Generating...' : 'Generate Assessment Questions'}
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-4 text-green-400">
                  🌿 Enhance Existing Content
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Content to Enhance
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Paste your educational content here..."
                      rows={6}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    />
                  </div>
                  <button
                    onClick={handleEnhanceContent}
                    disabled={loading || !content.trim()}
                    className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? 'Enhancing...' : 'Enhance with Cultural Context'}
                  </button>
                  <button
                    onClick={handleValidateContent}
                    disabled={loading || !content.trim()}
                    className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-500 rounded-lg font-semibold transition-colors"
                  >
                    {loading ? 'Validating...' : 'Validate Cultural Safety'}
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-4 text-purple-400">📋 Results</h2>
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-4">
                  <div className="text-red-400 font-semibold">Error:</div>
                  <div className="text-red-300">{error}</div>
                </div>
              )}
              {result && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                  <div className="text-green-400 font-semibold mb-2">Generated Content:</div>
                  <div className="text-gray-200 whitespace-pre-wrap text-sm max-h-96 overflow-y-auto">
                    {result}
                  </div>
                </div>
              )}
              {!result && !error && (
                <div className="text-gray-400 text-center py-8">
                  Generate content or enhance existing content to see results here.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">🤖 Real GLM Integration - Actual API calls to GLM-4.5</p>
          <p className="text-sm">
            This is a working integration, not a mockup. Configure your API key to test real
            functionality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RealGLMIntegrationDemo;
