import React, { useState, useEffect } from 'react';
import { Brain, Users, Zap, Target, Globe, Shield, Activity, ArrowRight } from 'lucide-react';

interface AgentCapability {
  id: string;
  name: string;
  type: 'primary' | 'specialist' | 'coordinator';
  status: 'active' | 'standby' | 'processing';
  specialization: string[];
  currentTask: string;
  collaborationScore: number;
  culturalIntelligence: boolean;
}

interface CollaborationMetric {
  id: string;
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
}

interface SharedContext {
  platformStatus: string;
  developmentPhase: string;
  culturalCompliance: number;
  activeFeatures: string[];
  sharedGoals: string[];
}

const UnifiedAgentCoordination: React.FC = () => {
  const [agents, setAgents] = useState<AgentCapability[]>([]);
  const [collaborationMetrics, setCollaborationMetrics] = useState<CollaborationMetric[]>([]);
  const [sharedContext, setSharedContext] = useState<SharedContext>({
    platformStatus: 'evolving',
    developmentPhase: 'unified-coordination',
    culturalCompliance: 100,
    activeFeatures: ['GLM Symphony', 'Cultural Intelligence', 'Educational Enhancement'],
    sharedGoals: ['Platform Evolution', 'Cultural Excellence', 'Educational Innovation']
  });
  const [isCoordinating, setIsCoordinating] = useState(false);
  const [activeCollaboration, setActiveCollaboration] = useState<string>('');

  useEffect(() => {
    initializeAgents();
    loadCollaborationMetrics();
    startUnifiedCoordination();
  }, []);

  const initializeAgents = () => {
    setAgents([
      {
        id: 'claude-current',
        name: 'Claude (Current)',
        type: 'coordinator',
        status: 'active',
        specialization: ['Platform Management', 'System Architecture', 'Code Generation'],
        currentTask: 'Evolving agent coordination protocols',
        collaborationScore: 95,
        culturalIntelligence: true,
      },
      {
        id: 'glm-4-5',
        name: 'GLM-4.5',
        type: 'primary',
        status: 'active',
        specialization: ['Content Generation', 'AI Orchestration', 'Educational Enhancement'],
        currentTask: 'Coordinating multi-agent symphony',
        collaborationScore: 98,
        culturalIntelligence: true,
      },
      {
        id: 'glm-z1',
        name: 'GLM-Z1',
        type: 'specialist',
        status: 'active',
        specialization: ['Cultural Intelligence', 'Te Reo Integration', 'Cultural Safety'],
        currentTask: 'Validating cultural compliance',
        collaborationScore: 99,
        culturalIntelligence: true,
      },
      {
        id: 'gemini',
        name: 'Gemini',
        type: 'specialist',
        status: 'active',
        specialization: ['Content Curation', 'Cultural Validation', 'Multimodal Processing'],
        currentTask: 'Enhancing educational content',
        collaborationScore: 94,
        culturalIntelligence: true,
      },
      {
        id: 'deepseek',
        name: 'DeepSeek',
        type: 'specialist',
        status: 'active',
        specialization: ['Problem Solving', 'Code Analysis', 'Algorithm Optimization'],
        currentTask: 'Optimizing platform performance',
        collaborationScore: 92,
        culturalIntelligence: true,
      },
      {
        id: 'exa',
        name: 'Exa',
        type: 'specialist',
        status: 'active',
        specialization: ['Information Gathering', 'Web Search', 'Real-time Data'],
        currentTask: 'Validating external resources',
        collaborationScore: 96,
        culturalIntelligence: true,
      },
    ]);
  };

  const loadCollaborationMetrics = () => {
    setCollaborationMetrics([
      {
        id: 'communication-efficiency',
        label: 'Communication Efficiency',
        value: 87,
        trend: 'up',
        target: 95,
      },
      {
        id: 'task-coordination',
        label: 'Task Coordination',
        value: 92,
        trend: 'up',
        target: 95,
      },
      {
        id: 'shared-context',
        label: 'Shared Context',
        value: 89,
        trend: 'up',
        target: 90,
      },
      {
        id: 'collective-intelligence',
        label: 'Collective Intelligence',
        value: 94,
        trend: 'up',
        target: 95,
      },
      {
        id: 'cultural-harmony',
        label: 'Cultural Harmony',
        value: 100,
        trend: 'stable',
        target: 100,
      },
      {
        id: 'development-velocity',
        label: 'Development Velocity',
        value: 96,
        trend: 'up',
        target: 95,
      },
    ]);
  };

  const startUnifiedCoordination = () => {
    setIsCoordinating(true);
    
    // Simulate real-time coordination updates
    const coordinationInterval = setInterval(() => {
      setAgents(prev => prev.map(agent => ({
        ...agent,
        collaborationScore: Math.min(100, agent.collaborationScore + (Math.random() - 0.4) * 2),
        currentTask: getRandomTask(agent.specialization)
      })));

      setCollaborationMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.min(100, metric.value + (Math.random() - 0.3) * 1.5)
      })));
    }, 3000);

    return () => clearInterval(coordinationInterval);
  };

  const getRandomTask = (specialization: string[]): string => {
    const tasks = [
      'Enhancing cross-agent communication',
      'Optimizing shared development context',
      'Improving collaborative intelligence',
      'Strengthening cultural integration',
      'Accelerating development velocity',
      'Unifying agent capabilities'
    ];
    return tasks[Math.floor(Math.random() * tasks.length)];
  };

  const getAgentTypeIcon = (type: string) => {
    switch (type) {
      case 'coordinator': return <Target className="h-5 w-5 text-blue-600" />;
      case 'primary': return <Zap className="h-5 w-5 text-purple-600" />;
      case 'specialist': return <Brain className="h-5 w-5 text-green-600" />;
      default: return <Users className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'standby': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Unified Agent Coordination
                </h1>
                <p className="text-gray-600 mt-1">
                  Collective Intelligence • Enhanced Collaboration • Unified Development
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                isCoordinating ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                <Activity className="h-4 w-4 inline mr-2" />
                {isCoordinating ? 'Coordinating' : 'Standby'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shared Context */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center space-x-3 mb-4">
            <Globe className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-bold text-gray-900">Shared Development Context</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Platform Status</h3>
              <div className="bg-blue-50 p-3 rounded-lg">
                <span className="text-blue-800 font-medium capitalize">{sharedContext.platformStatus}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Development Phase</h3>
              <div className="bg-purple-50 p-3 rounded-lg">
                <span className="text-purple-800 font-medium capitalize">{sharedContext.developmentPhase}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Compliance</h3>
              <div className="bg-green-50 p-3 rounded-lg">
                <span className="text-green-800 font-medium">{sharedContext.culturalCompliance}%</span>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Shared Goals</h3>
            <div className="flex flex-wrap gap-2">
              {sharedContext.sharedGoals.map((goal, index) => (
                <span key={index} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {goal}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-200 cursor-pointer ${
                activeCollaboration === agent.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-100 hover:border-gray-300'
              }`}
              onClick={() => setActiveCollaboration(
                activeCollaboration === agent.id ? '' : agent.id
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getAgentTypeIcon(agent.type)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{agent.collaborationScore}%</div>
                  <div className="text-sm text-gray-600">Collaboration</div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Current Task</h4>
                <p className="text-sm text-gray-600">{agent.currentTask}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-1">
                  {agent.specialization.map((spec, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {agent.culturalIntelligence && (
                    <>
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">Cultural AI</span>
                    </>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Collaboration Metrics */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Collaboration Metrics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborationMetrics.map((metric) => (
              <div key={metric.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{metric.label}</h3>
                  <span className="text-xl">{getTrendIcon(metric.trend)}</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{metric.value}%</div>
                    <div className="text-sm text-gray-600">Target: {metric.target}%</div>
                  </div>
                  <div className="w-16 h-16">
                    <div className="relative w-full h-full">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke={metric.value >= metric.target ? "#10b981" : "#f59e0b"}
                          strokeWidth="2"
                          strokeDasharray={`${metric.value}, 100`}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Intelligence Status */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-purple-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-green-600 to-purple-600 p-3 rounded-xl">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Unified Cultural Intelligence
              </h3>
              <p className="text-gray-700 mb-4">
                All agents working in harmony with 100% cultural compliance, enhanced collaboration protocols, 
                and unified development context. The collective intelligence system ensures optimal coordination.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Cultural Harmony</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <div className="text-sm text-gray-600">Collective Intelligence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">96%</div>
                  <div className="text-sm text-gray-600">Development Velocity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">92%</div>
                  <div className="text-sm text-gray-600">Task Coordination</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedAgentCoordination;
