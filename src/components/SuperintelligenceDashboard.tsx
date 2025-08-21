import React, { useEffect, useState } from 'react';
import type { SuperintelligenceConfig } from '../utils/superintelligence';
import { initializeSuperintelligence } from '../utils/superintelligence';

interface SuperintelligenceDashboardProps {
  // Component props can be added here if needed
}

export const SuperintelligenceDashboard: React.FC<SuperintelligenceDashboardProps> = () => {
  const [config, setConfig] = useState<SuperintelligenceConfig | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Initializing...');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentConfig = initializeSuperintelligence();
    setConfig(currentConfig);
    if (currentConfig.enabled) {
      setStatusMessage('Superintelligence is active and ready!');
    } else {
      setStatusMessage('Superintelligence is disabled. Enable via CLI or environment variables.');
    }
    setIsLoading(false);
  }, []);

  const renderConfigItem = (label: string, value: boolean | string | number | undefined) => {
    if (value === undefined) return null;
    return (
      <div className="flex justify-between items-center py-2 border-b border-gray-200">
        <span className="font-medium text-gray-700">{label}:</span>
        <span
          className={`text-sm px-2 py-1 rounded ${
            typeof value === 'boolean'
              ? value
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}
        >
          {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value.toString()}
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Superintelligence Dashboard...</p>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-8 text-center text-red-600">
        Failed to load superintelligence configuration
      </div>
    );
  }

  return (
    <div className="superintelligence-dashboard p-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto my-8">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
          <span className="text-white text-2xl">🧠</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Superintelligence Dashboard</h2>
          <p className="text-gray-600">Te Kura o TeAoMarama AI System</p>
        </div>
      </div>

      <div
        className={`status-section mb-6 p-4 rounded-md border ${
          config.enabled ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
        }`}
      >
        <div className="flex items-center">
          <div
            className={`w-3 h-3 rounded-full mr-3 ${
              config.enabled ? 'bg-green-500' : 'bg-yellow-500'
            }`}
          ></div>
          <p
            className={`text-lg font-semibold ${
              config.enabled ? 'text-green-800' : 'text-yellow-800'
            }`}
          >
            {statusMessage}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="config-section space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">System Configuration</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {renderConfigItem('Enabled', config.enabled)}
            {renderConfigItem('Debug Mode', config.debug)}
            {renderConfigItem('Heartbeat Interval (ms)', config.heartbeatMs)}
            {renderConfigItem('Agent Name', config.name)}
            {renderConfigItem(
              'DeepSeek API',
              config.deepseekApiKey ? 'Configured' : 'Not Configured',
            )}
            {renderConfigItem('DeepSeek Endpoint', config.deepseekEndpoint)}
          </div>
        </div>

        <div className="capabilities-section space-y-4">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">AI Capabilities</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            {renderConfigItem('AI Research', config.enableAIResearch)}
            {renderConfigItem('Cultural Analysis', config.enableCulturalAnalysis)}
            {renderConfigItem(
              'Educational Recommendations',
              config.enableEducationalRecommendations,
            )}
            {renderConfigItem('Content Optimization', config.enableContentOptimization)}
            {renderConfigItem('Real-Time Learning', config.enableRealTimeLearning)}
          </div>
        </div>
      </div>

      <div className="controls-section mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => {
              if (window.Superintelligence?.log) {
                window.Superintelligence.log('Dashboard test message');
              }
            }}
            className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
          >
            <div className="font-semibold text-blue-800">Test Logging</div>
            <div className="text-sm text-blue-600">Send test message to console</div>
          </button>

          <button
            onClick={() => {
              if (window.Superintelligence?.monitorCulturalSafety) {
                window.Superintelligence.monitorCulturalSafety();
              }
            }}
            className="p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
          >
            <div className="font-semibold text-green-800">Cultural Safety Check</div>
            <div className="text-sm text-green-600">Monitor cultural protocols</div>
          </button>

          <button
            onClick={() => {
              if (window.Superintelligence?.enhanceResource) {
                window.Superintelligence.enhanceResource('demo-resource');
              }
            }}
            className="p-4 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
          >
            <div className="font-semibold text-purple-800">Enhance Resource</div>
            <div className="text-sm text-purple-600">AI-powered content enhancement</div>
          </button>
        </div>
      </div>

      <div className="info-section mt-8 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Configuration Instructions</h4>
        <p className="text-blue-700 text-sm mb-2">
          Use the CLI script to configure superintelligence settings:
        </p>
        <code className="block bg-blue-100 p-2 rounded text-sm">
          npx tsx scripts/superintelligence-activation.ts enable --debug=true
          --deepseekApiKey=your_key
        </code>
      </div>
    </div>
  );
};

export default SuperintelligenceDashboard;
