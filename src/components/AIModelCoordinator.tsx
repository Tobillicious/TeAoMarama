import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  RefreshCw,
  Activity,
  Cpu,
  Database,
  Globe,
  Users,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'claude' | 'gpt' | 'glm' | 'gemini' | 'custom';
  status: 'active' | 'inactive' | 'error' | 'syncing';
  capabilities: string[];
  lastSync: string;
  performance: {
    responseTime: number;
    accuracy: number;
    culturalCompliance: number;
  };
  glmIntegration: boolean;
}

const AIModelCoordinator: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [isCoordinating, setIsCoordinating] = useState(false);
  const [coordinationStatus, setCoordinationStatus] = useState<string>('');

  useEffect(() => {
    // Initialize with 10 AI models as mentioned
    const initialModels: AIModel[] = [
      {
        id: 'claude-dev',
        name: 'Claude Dev',
        type: 'claude',
        status: 'active',
        capabilities: ['Code Generation', 'Bug Fixing', 'Architecture Design'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 1200, accuracy: 94, culturalCompliance: 98 },
        glmIntegration: true
      },
      {
        id: 'ds-codegpt',
        name: 'DS CodeGPT',
        type: 'gpt',
        status: 'active',
        capabilities: ['Code Analysis', 'Documentation', 'Testing'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 800, accuracy: 92, culturalCompliance: 96 },
        glmIntegration: true
      },
      {
        id: 'texra-ai',
        name: 'Texra AI',
        type: 'custom',
        status: 'active',
        capabilities: ['Content Creation', 'Text Analysis', 'Translation'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 1500, accuracy: 89, culturalCompliance: 97 },
        glmIntegration: true
      },
      {
        id: 'glm-45',
        name: 'GLM-4.5',
        type: 'glm',
        status: 'active',
        capabilities: ['Advanced Reasoning', 'Cultural Context', 'Educational Enhancement'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 900, accuracy: 96, culturalCompliance: 100 },
        glmIntegration: true
      },
      {
        id: 'glm-z1',
        name: 'GLM-Z1',
        type: 'glm',
        status: 'active',
        capabilities: ['Multimodal Processing', 'Cultural Safety', 'Content Validation'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 1100, accuracy: 95, culturalCompliance: 100 },
        glmIntegration: true
      },
      {
        id: 'gemini-pro',
        name: 'Gemini Pro',
        type: 'gemini',
        status: 'active',
        capabilities: ['Multimodal AI', 'Code Generation', 'Analysis'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 1300, accuracy: 91, culturalCompliance: 93 },
        glmIntegration: true
      },
      {
        id: 'cultural-ai-1',
        name: 'Māori Cultural AI',
        type: 'custom',
        status: 'active',
        capabilities: ['Te Reo Māori', 'Cultural Protocols', 'Community Integration'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 1000, accuracy: 98, culturalCompliance: 100 },
        glmIntegration: true
      },
      {
        id: 'cultural-ai-2',
        name: 'Pacific Cultural AI',
        type: 'custom',
        status: 'active',
        capabilities: ['Pacific Languages', 'Cultural Values', 'Community Connections'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 1200, accuracy: 97, culturalCompliance: 99 },
        glmIntegration: true
      },
      {
        id: 'educational-ai',
        name: 'Educational Specialist',
        type: 'custom',
        status: 'active',
        capabilities: ['Curriculum Alignment', 'Assessment Design', 'Pedagogical Support'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 1400, accuracy: 93, culturalCompliance: 95 },
        glmIntegration: true
      },
      {
        id: 'performance-ai',
        name: 'Performance Optimizer',
        type: 'custom',
        status: 'active',
        capabilities: ['System Optimization', 'Performance Monitoring', 'Efficiency Analysis'],
        lastSync: new Date().toISOString(),
        performance: { responseTime: 700, accuracy: 90, culturalCompliance: 94 },
        glmIntegration: true
      }
    ];

    setModels(initialModels);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'error': return 'text-red-600 bg-red-50 border-red-200';
      case 'syncing': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive': return <AlertTriangle className="w-4 h-4 text-gray-600" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'syncing': return <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'claude': return <Brain className="w-4 h-4 text-purple-600" />;
      case 'gpt': return <Cpu className="w-4 h-4 text-green-600" />;
      case 'glm': return <Globe className="w-4 h-4 text-blue-600" />;
      case 'gemini': return <Sparkles className="w-4 h-4 text-yellow-600" />;
      case 'custom': return <Users className="w-4 h-4 text-indigo-600" />;
      default: return <Database className="w-4 h-4 text-gray-600" />;
    }
  };

  const coordinateAllModels = async () => {
    setIsCoordinating(true);
    setCoordinationStatus('Initializing GLM integration across all models...');

    // Simulate coordination process
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      
      // Update model status to syncing
      setModels(prev => prev.map(m => 
        m.id === model.id ? { ...m, status: 'syncing' } : m
      ));

      setCoordinationStatus(`Integrating GLM with ${model.name}...`);

      // Simulate integration time
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1500));

      // Update model with enhanced capabilities
      setModels(prev => prev.map(m => 
        m.id === model.id ? { 
          ...m, 
          status: 'active',
          performance: {
            ...m.performance,
            responseTime: Math.max(500, m.performance.responseTime - 200),
            accuracy: Math.min(100, m.performance.accuracy + 2),
            culturalCompliance: Math.min(100, m.performance.culturalCompliance + 1)
          },
          lastSync: new Date().toISOString()
        } : m
      ));
    }

    setCoordinationStatus('GLM integration complete! All models are now enhanced with advanced reasoning capabilities.');
    setIsCoordinating(false);

    // Clear status after 3 seconds
    setTimeout(() => setCoordinationStatus(''), 3000);
  };

  const activeModels = models.filter(m => m.status === 'active').length;
  const avgResponseTime = models.reduce((sum, m) => sum + m.performance.responseTime, 0) / models.length;
  const avgAccuracy = models.reduce((sum, m) => sum + m.performance.accuracy, 0) / models.length;
  const avgCulturalCompliance = models.reduce((sum, m) => sum + m.performance.culturalCompliance, 0) / models.length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-neutral-900 flex items-center space-x-2">
            <Brain className="w-6 h-6 text-pounamu" />
            <span>AI Model Coordinator</span>
          </h3>
          <p className="text-neutral-600 mt-1">
            Managing 10 AI models with GLM integration
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activeModels}</div>
            <div className="text-sm text-neutral-500">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{Math.round(avgResponseTime)}ms</div>
            <div className="text-sm text-neutral-500">Avg Response</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(avgAccuracy)}%</div>
            <div className="text-sm text-neutral-500">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Coordination Status */}
      {coordinationStatus && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
            <span className="text-blue-800 font-medium">{coordinationStatus}</span>
          </div>
        </div>
      )}

      {/* Coordination Button */}
      <div className="mb-6">
        <button
          onClick={coordinateAllModels}
          disabled={isCoordinating}
          className="bg-gradient-to-r from-pounamu to-pounamu-light text-white px-6 py-3 rounded-lg font-medium hover:from-pounamu-light hover:to-pounamu transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isCoordinating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Coordinating Models...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Deploy GLM Integration</span>
            </>
          )}
        </button>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {models.map((model) => (
          <div
            key={model.id}
            className={`border rounded-lg p-4 transition-all duration-200 ${
              model.status === 'active' 
                ? 'bg-green-50 border-green-200' 
                : model.status === 'syncing'
                ? 'bg-blue-50 border-blue-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(model.type)}
                <span className="font-medium text-neutral-900">{model.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                {getStatusIcon(model.status)}
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(model.status)}`}>
                  {model.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Response Time:</span>
                <span className="font-medium">{model.performance.responseTime}ms</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Accuracy:</span>
                <span className="font-medium">{model.performance.accuracy}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Cultural Compliance:</span>
                <span className="font-medium">{model.performance.culturalCompliance}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {model.glmIntegration ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                )}
                <span className="text-xs text-neutral-600">
                  {model.glmIntegration ? 'GLM Integrated' : 'GLM Pending'}
                </span>
              </div>
              <span className="text-xs text-neutral-400">
                {new Date(model.lastSync).toLocaleTimeString()}
              </span>
            </div>

            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {model.capabilities.slice(0, 2).map((capability, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded"
                  >
                    {capability}
                  </span>
                ))}
                {model.capabilities.length > 2 && (
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                    +{model.capabilities.length - 2} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-pounamu-50 to-blue-50 border border-pounamu-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Activity className="w-5 h-5 text-pounamu" />
          <span className="font-medium text-pounamu-800">System Performance Summary</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-pounamu-600">{Math.round(avgResponseTime)}ms</div>
            <div className="text-pounamu-700">Average Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{Math.round(avgAccuracy)}%</div>
            <div className="text-blue-700">Overall Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(avgCulturalCompliance)}%</div>
            <div className="text-green-700">Cultural Compliance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelCoordinator;
