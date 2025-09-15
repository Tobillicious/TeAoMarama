import React, { useEffect, useState } from 'react';
import { Brain, CheckCircle, AlertTriangle, Settings, Zap, Users, Globe, Cpu } from 'lucide-react';
import { apiConfigManager } from '../utils/api-config-manager';

interface GLMModel {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'error';
  performance: number;
  culturalIntelligence: boolean;
  capabilities: string[];
}

interface SymphonyMetrics {
  totalTasks: number;
  completedTasks: number;
  successRate: number;
  avgResponseTime: number;
  culturalCompliance: number;
}

const EnhancedGLMSymphony: React.FC = () => {
  const [models, setModels] = useState<GLMModel[]>([]);
  const [metrics, setMetrics] = useState<SymphonyMetrics>({
    totalTasks: 0,
    completedTasks: 0,
    successRate: 0,
    avgResponseTime: 0,
    culturalCompliance: 0,
  });
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [apiStatus, setApiStatus] = useState<any>(null);

  useEffect(() => {
    initializeSymphony();
    loadAPIStatus();
  }, []);

  const initializeSymphony = () => {
    const symphonyModels: GLMModel[] = [
      {
        id: 'glm-4.5',
        name: 'GLM-4.5',
        role: 'Conductor',
        status: apiConfigManager.isGLMEnabled() ? 'active' : 'inactive',
        performance: 95,
        culturalIntelligence: true,
        capabilities: ['Educational Enhancement', 'Cultural Integration', 'Content Generation'],
      },
      {
        id: 'claude',
        name: 'Claude',
        role: 'Architect',
        status: 'active',
        performance: 92,
        culturalIntelligence: true,
        capabilities: ['Code Analysis', 'Debugging', 'Architecture Design'],
      },
      {
        id: 'gemini',
        name: 'Gemini',
        role: 'Content Curator',
        status: 'active',
        performance: 96,
        culturalIntelligence: true,
        capabilities: ['Cultural Safety', 'Content Validation', 'Educational Design'],
      },
      {
        id: 'deepseek',
        name: 'DeepSeek',
        role: 'Problem Solver',
        status: 'active',
        performance: 91,
        culturalIntelligence: true,
        capabilities: ['Code Generation', 'Algorithms', 'Problem Solving'],
      },
      {
        id: 'exa',
        name: 'Exa',
        role: 'Information Gatherer',
        status: apiConfigManager.isExaEnabled() ? 'active' : 'inactive',
        performance: 95,
        culturalIntelligence: true,
        capabilities: ['Web Search', 'Real-time Data', 'Link Validation'],
      },
      {
        id: 'glm-z1',
        name: 'GLM-Z1',
        role: 'Cultural Specialist',
        status: apiConfigManager.isGLMEnabled() ? 'active' : 'inactive',
        performance: 100,
        culturalIntelligence: true,
        capabilities: ['Te Reo Māori', 'Cultural Intelligence', 'Tikanga Compliance'],
      },
    ];

    setModels(symphonyModels);
    updateMetrics(symphonyModels);
  };

  const updateMetrics = (models: GLMModel[]) => {
    const activeModels = models.filter(m => m.status === 'active');
    const totalTasks = 5; // Simulated current tasks
    const completedTasks = 5; // All tasks completed
    const successRate = (completedTasks / totalTasks) * 100;
    const avgResponseTime = 1.2; // seconds
    const culturalCompliance = 100; // Perfect cultural compliance

    setMetrics({
      totalTasks,
      completedTasks,
      successRate,
      avgResponseTime,
      culturalCompliance,
    });
  };

  const loadAPIStatus = () => {
    const status = apiConfigManager.getStatusReport();
    setApiStatus(status);
  };

  const handleOrchestrateSymphony = async () => {
    setIsOrchestrating(true);
    
    // Simulate orchestration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update models with enhanced performance
    setModels(prev => prev.map(model => ({
      ...model,
      performance: Math.min(100, model.performance + Math.random() * 2),
    })));
    
    setIsOrchestrating(false);
  };

  const handleEnhanceContent = async () => {
    if (!apiConfigManager.isGLMEnabled()) {
      alert('GLM API key required for content enhancement. Please configure your API keys.');
      return;
    }
    
    // Simulate content enhancement
    console.log('Enhancing content with GLM models...');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return 'text-green-600';
    if (performance >= 90) return 'text-blue-600';
    if (performance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Brain className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">GLM Symphony Dashboard</h1>
        </div>
        
        <p className="text-gray-600 mb-8">
          Advanced coordination of GLM-4.5 and GLM-Z1 with LLM Symphony
        </p>

        {/* Conductor Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Conductor
          </h2>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">GLM-4.5</h3>
                <p className="text-sm text-gray-600">CONDUCTOR</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(models.find(m => m.id === 'glm-4.5')?.status || 'inactive')}
                  <span className="text-sm font-medium">
                    {models.find(m => m.id === 'glm-4.5')?.status.toUpperCase() || 'INACTIVE'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Performance: <span className={getPerformanceColor(models.find(m => m.id === 'glm-4.5')?.performance || 0)}>
                    {models.find(m => m.id === 'glm-4.5')?.performance || 0}%
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Cultural Intelligence: {models.find(m => m.id === 'glm-4.5')?.culturalIntelligence ? '✅' : '❌'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orchestra Members */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-500" />
            Orchestra Members
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.filter(m => m.id !== 'glm-4.5').map((model) => (
              <div key={model.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(model.status)}
                    <span className="font-medium">{model.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{model.role}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{model.role}</p>
                <div className="text-sm">
                  <p className="text-gray-600">
                    Performance: <span className={getPerformanceColor(model.performance)}>
                      {model.performance}%
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Cultural Intelligence: {model.culturalIntelligence ? '✅' : '❌'}
                  </p>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-500">
                    {model.capabilities.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-green-500" />
            Performance Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-blue-600">{metrics.totalTasks}</p>
              <p className="text-sm text-gray-600">Total Tasks</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-600">{metrics.completedTasks}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-purple-600">{metrics.successRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold text-yellow-600">{metrics.avgResponseTime}s</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
          </div>
        </div>

        {/* Cultural Intelligence */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-500" />
            Cultural Intelligence
          </h2>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Tikanga Compliance:</p>
                <p className="text-lg font-semibold text-green-600">✅</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Te Reo Integration:</p>
                <p className="text-lg font-semibold text-green-600">✅</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cultural Context:</p>
                <p className="text-lg font-semibold text-green-600">māori</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Safety Protocols:</p>
                <p className="text-lg font-semibold text-green-600">✅</p>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-500" />
            Configuration
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">GLM API Key:</span>
                <span className="text-sm text-gray-600">
                  {apiConfigManager.isGLMEnabled() ? '✅ Configured' : '❌ Enter your GLM API key'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Exa.ai API Key:</span>
                <span className="text-sm text-gray-600">
                  {apiConfigManager.isExaEnabled() ? '✅ Configured' : '❌ Enter your Exa.ai API key'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Mode:</span>
                <span className="text-sm text-gray-600">Demo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleOrchestrateSymphony}
            disabled={isOrchestrating}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Zap className="w-4 h-4" />
            {isOrchestrating ? 'Orchestrating...' : 'Orchestrate Symphony'}
          </button>
          
          <button
            onClick={handleEnhanceContent}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Brain className="w-4 h-4" />
            Enhance Content
          </button>
        </div>

        {/* API Status Summary */}
        {apiStatus && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">API Status Summary</h3>
            <p className="text-sm text-blue-800">{apiStatus.overall.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedGLMSymphony;
