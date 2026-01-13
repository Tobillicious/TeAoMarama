import {
  Activity,
  Brain,
  CheckCircle,
  Code,
  Globe,
  Lightbulb,
  Shield,
  Target,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DevelopmentTask {
  id: string;
  title: string;
  description: string;
  assignedAgent: string;
  status: 'completed' | 'in-progress' | 'planned';
  priority: 'high' | 'medium' | 'low';
  culturalElements: number;
  progress: number;
}

interface CollaborationMetric {
  id: string;
  label: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  target: number;
}

const CollaborativeDevelopmentDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<DevelopmentTask[]>([]);
  const [metrics, setMetrics] = useState<CollaborationMetric[]>([]);
  const [activeAgent, setActiveAgent] = useState<string>('all');
  const [isDeveloping, setIsDeveloping] = useState(true);

  useEffect(() => {
    initializeDevelopmentTasks();
    loadCollaborationMetrics();
    startCollaborativeDevelopment();
  }, []);

  const initializeDevelopmentTasks = () => {
    setTasks([
      {
        id: 'platform-evolution',
        title: 'Platform Evolution & Enhancement',
        description: 'Evolving platform with GLM intelligence and cultural integration',
        assignedAgent: 'Claude + GLM-4.5',
        status: 'in-progress',
        priority: 'high',
        culturalElements: 15,
        progress: 85,
      },
      {
        id: 'cultural-intelligence',
        title: 'Cultural Intelligence Integration',
        description: 'Enhancing Te Reo integration and Māori cultural perspectives',
        assignedAgent: 'GLM-Z1 + Gemini',
        status: 'in-progress',
        priority: 'high',
        culturalElements: 25,
        progress: 92,
      },
      {
        id: 'educational-enhancement',
        title: 'Educational Feature Enhancement',
        description: 'Improving learning tools and assessment capabilities',
        assignedAgent: 'DeepSeek + Gemini',
        status: 'in-progress',
        priority: 'high',
        culturalElements: 12,
        progress: 78,
      },
      {
        id: 'agent-coordination',
        title: 'Multi-Agent Coordination',
        description: 'Optimizing collaboration between all AI agents',
        assignedAgent: 'All Agents',
        status: 'completed',
        priority: 'high',
        culturalElements: 8,
        progress: 100,
      },
      {
        id: 'performance-optimization',
        title: 'Performance Optimization',
        description: 'Enhancing platform speed and responsiveness',
        assignedAgent: 'DeepSeek + Exa',
        status: 'in-progress',
        priority: 'medium',
        culturalElements: 3,
        progress: 65,
      },
      {
        id: 'user-experience',
        title: 'User Experience Enhancement',
        description: 'Improving interface design and user interactions',
        assignedAgent: 'Gemini + Claude',
        status: 'planned',
        priority: 'medium',
        culturalElements: 5,
        progress: 30,
      },
    ]);
  };

  const loadCollaborationMetrics = () => {
    setMetrics([
      {
        id: 'development-velocity',
        label: 'Development Velocity',
        value: 94,
        trend: 'up',
        target: 95,
      },
      {
        id: 'code-quality',
        label: 'Code Quality',
        value: 96,
        trend: 'up',
        target: 95,
      },
      {
        id: 'cultural-compliance',
        label: 'Cultural Compliance',
        value: 100,
        trend: 'stable',
        target: 100,
      },
      {
        id: 'agent-coordination',
        label: 'Agent Coordination',
        value: 98,
        trend: 'up',
        target: 95,
      },
      {
        id: 'feature-completion',
        label: 'Feature Completion',
        value: 87,
        trend: 'up',
        target: 90,
      },
      {
        id: 'user-satisfaction',
        label: 'User Satisfaction',
        value: 93,
        trend: 'up',
        target: 90,
      },
    ]);
  };

  const startCollaborativeDevelopment = () => {
    // Simulate real-time development updates
    const developmentInterval = setInterval(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (task.status === 'in-progress') {
            const newProgress = Math.min(100, task.progress + Math.random() * 2);
            const newStatus = newProgress >= 100 ? 'completed' : 'in-progress';
            return {
              ...task,
              progress: newProgress,
              status: newStatus,
            };
          }
          return task;
        }),
      );

      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.min(100, metric.value + (Math.random() - 0.3) * 1.5),
        })),
      );
    }, 3000);

    return () => clearInterval(developmentInterval);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      default:
        return '➡️';
    }
  };

  const filteredTasks =
    activeAgent === 'all'
      ? tasks
      : tasks.filter((task) =>
          task.assignedAgent.toLowerCase().includes(activeAgent.toLowerCase()),
        );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl">
                <Code className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Collaborative Development Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Multi-Agent Development • Real-time Progress • Cultural Excellence
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDeveloping ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}
              >
                <Activity className="h-4 w-4 inline mr-2" />
                {isDeveloping ? 'Development Active' : 'Standby'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Development Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {metric.id === 'cultural-compliance' && (
                    <Globe className="h-5 w-5 text-green-600" />
                  )}
                  {metric.id === 'agent-coordination' && (
                    <Users className="h-5 w-5 text-blue-600" />
                  )}
                  {metric.id === 'development-velocity' && (
                    <Zap className="h-5 w-5 text-purple-600" />
                  )}
                  {metric.id === 'code-quality' && (
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                  )}
                  {metric.id === 'feature-completion' && (
                    <Target className="h-5 w-5 text-indigo-600" />
                  )}
                  {metric.id === 'user-satisfaction' && <Brain className="h-5 w-5 text-pink-600" />}
                  <h3 className="text-lg font-semibold text-gray-900">{metric.label}</h3>
                </div>
                <span className="text-2xl">{getTrendIcon(metric.trend)}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{metric.value}%</div>
                  <div className="text-sm text-gray-600">Target: {metric.target}%</div>
                </div>
                <div className="w-20 h-20">
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
                        stroke={metric.value >= metric.target ? '#10b981' : '#f59e0b'}
                        strokeWidth="2"
                        strokeDasharray={`${metric.value}, 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">{metric.value}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Agent Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Development Tasks</h2>
            <div className="flex space-x-2">
              {['all', 'claude', 'glm', 'gemini', 'deepseek', 'exa'].map((agent) => (
                <button
                  key={agent}
                  onClick={() => setActiveAgent(agent)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeAgent === agent
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {agent === 'all' ? 'All Agents' : agent.charAt(0).toUpperCase() + agent.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Development Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                  <div className="flex items-center space-x-3 mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority,
                      )}`}
                    >
                      {task.priority} priority
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status,
                      )}`}
                    >
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(task.progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      task.progress >= 100 ? 'bg-green-600' : 'bg-blue-600'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{task.assignedAgent}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    {task.culturalElements} cultural elements
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Development Status */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-xl">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Collaborative Development Active
              </h3>
              <p className="text-gray-700 mb-4">
                All agents are actively collaborating on platform development with real-time
                progress tracking, cultural compliance monitoring, and unified intelligence
                coordination. Development velocity is optimized through enhanced agent
                collaboration.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">6</div>
                  <div className="text-sm text-gray-600">Active Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Cultural Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">94%</div>
                  <div className="text-sm text-gray-600">Development Velocity</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">98%</div>
                  <div className="text-sm text-gray-600">Agent Coordination</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeDevelopmentDashboard;
