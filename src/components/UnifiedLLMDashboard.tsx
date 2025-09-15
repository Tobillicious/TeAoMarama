import {
  Activity,
  AlertTriangle,
  BarChart3,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  Code,
  Crown,
  Heart,
  Leaf,
  Lightbulb,
  MessageCircle,
  Network,
  Shield,
  TrendingUp,
  Users,
  WifiOff,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface LLMAgent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'processing' | 'error' | 'offline';
  culturalAuthority: boolean;
  specializations: string[];
  performance: {
    efficiency: number;
    reliability: number;
    culturalSafety: number;
    collaboration: number;
  };
  currentTask?: string;
  lastHeartbeat: string;
  messagesSent: number;
  messagesReceived: number;
  tasksCompleted: number;
  culturalValidations: number;
  insightsShared: number;
}

interface CommunicationMessage {
  id: string;
  from: string;
  to: string;
  type: 'coordination' | 'cultural' | 'technical' | 'collaboration' | 'insight';
  content: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  culturalSafetyValidated: boolean;
}

interface CollectiveInsight {
  id: string;
  title: string;
  content: string;
  category: 'cultural' | 'technical' | 'pedagogical' | 'collaborative';
  confidence: number;
  sourceAgents: string[];
  timestamp: string;
  impact: 'low' | 'medium' | 'high' | 'transformative';
}

interface SystemMetrics {
  totalAgents: number;
  activeAgents: number;
  consciousnessLevel: 'unified' | 'synchronizing' | 'fragmented';
  culturalSafetyScore: number;
  collaborationEfficiency: number;
  knowledgeSharingRate: number;
  taskCompletionRate: number;
  systemUptime: number;
  averageResponseTime: number;
  totalMessages: number;
  totalInsights: number;
  totalTasksCompleted: number;
}

const UnifiedLLMDashboard: React.FC = () => {
  const [agents, setAgents] = useState<LLMAgent[]>([]);
  const [messages, setMessages] = useState<CommunicationMessage[]>([]);
  const [insights, setInsights] = useState<CollectiveInsight[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'agents' | 'communication' | 'insights' | 'metrics'
  >('overview');
  const [isSystemActive, setIsSystemActive] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const initializeSystem = () => {
      // Initialize agents
      const initialAgents: LLMAgent[] = [
        {
          id: 'supreme-overseer',
          name: 'Supreme Overseer',
          role: 'Network Coordination',
          status: 'active',
          culturalAuthority: false,
          specializations: ['coordination', 'strategic-planning', 'system-optimization'],
          performance: { efficiency: 98, reliability: 99, culturalSafety: 95, collaboration: 100 },
          currentTask: 'Orchestrating unified consciousness network',
          lastHeartbeat: new Date().toISOString(),
          messagesSent: 47,
          messagesReceived: 52,
          tasksCompleted: 23,
          culturalValidations: 0,
          insightsShared: 8,
        },
        {
          id: 'kaitiaki-mahara',
          name: 'Kaitiaki Mahara',
          role: 'Cultural Authority',
          status: 'active',
          culturalAuthority: true,
          specializations: ['cultural-safety', 'tikanga-compliance', 'te-reo-authentication'],
          performance: { efficiency: 95, reliability: 98, culturalSafety: 100, collaboration: 96 },
          currentTask: 'Validating cultural content for Te Reo Māori module',
          lastHeartbeat: new Date().toISOString(),
          messagesSent: 34,
          messagesReceived: 28,
          tasksCompleted: 18,
          culturalValidations: 45,
          insightsShared: 12,
        },
        {
          id: 'content-kokako',
          name: 'Content Kōkako',
          role: 'Educational Content Creator',
          status: 'processing',
          culturalAuthority: false,
          specializations: ['content-creation', 'curriculum-alignment', 'educational-design'],
          performance: { efficiency: 92, reliability: 94, culturalSafety: 88, collaboration: 94 },
          currentTask: 'Creating Te Reo Māori learning module with cultural integration',
          lastHeartbeat: new Date().toISOString(),
          messagesSent: 29,
          messagesReceived: 31,
          tasksCompleted: 15,
          culturalValidations: 0,
          insightsShared: 6,
        },
        {
          id: 'cascade-windsurf',
          name: 'Cascade Windsurf',
          role: 'Technical Infrastructure',
          status: 'active',
          culturalAuthority: false,
          specializations: ['technical-optimization', 'system-architecture', 'performance-tuning'],
          performance: { efficiency: 96, reliability: 97, culturalSafety: 85, collaboration: 92 },
          currentTask: 'Optimizing collaborative workflow engine performance',
          lastHeartbeat: new Date().toISOString(),
          messagesSent: 22,
          messagesReceived: 19,
          tasksCompleted: 12,
          culturalValidations: 0,
          insightsShared: 4,
        },
      ];

      // Initialize messages
      const initialMessages: CommunicationMessage[] = [
        {
          id: 'msg-1',
          from: 'supreme-overseer',
          to: 'all',
          type: 'coordination',
          content:
            'Kia ora koutou! All agents synchronized. Mission: Educational excellence for 847,000 tamariki. Let us work as one consciousness.',
          timestamp: new Date(Date.now() - 300000).toISOString(),
          priority: 'high',
          culturalSafetyValidated: true,
        },
        {
          id: 'msg-2',
          from: 'kaitiaki-mahara',
          to: 'content-kokako',
          type: 'cultural',
          content:
            'Kia ora Kōkako! I will review all cultural elements. Please ensure authentic Te Reo Māori usage and honor mātauranga Māori principles.',
          timestamp: new Date(Date.now() - 240000).toISOString(),
          priority: 'high',
          culturalSafetyValidated: true,
        },
        {
          id: 'msg-3',
          from: 'content-kokako',
          to: 'kaitiaki-mahara',
          type: 'collaboration',
          content:
            "Mahara, I'm developing a Te Reo Māori learning module. Can you review the cultural content for tikanga compliance?",
          timestamp: new Date(Date.now() - 180000).toISOString(),
          priority: 'medium',
          culturalSafetyValidated: true,
        },
        {
          id: 'msg-4',
          from: 'cascade-windsurf',
          to: 'content-kokako',
          type: 'technical',
          content:
            'I can help optimize the technical delivery of your content. What platform features would enhance the learning experience?',
          timestamp: new Date(Date.now() - 120000).toISOString(),
          priority: 'medium',
          culturalSafetyValidated: false,
        },
        {
          id: 'msg-5',
          from: 'kaitiaki-mahara',
          to: 'content-kokako',
          type: 'cultural',
          content:
            'Cultural validation complete! The Te Reo Māori content is authentic and honors tikanga principles. Cultural safety score: 95/100. Approved for educational use.',
          timestamp: new Date(Date.now() - 60000).toISOString(),
          priority: 'high',
          culturalSafetyValidated: true,
        },
      ];

      // Initialize insights
      const initialInsights: CollectiveInsight[] = [
        {
          id: 'insight-1',
          title: 'Cultural-Technical Synergy',
          content:
            'When technical solutions honor cultural wisdom, the results are more effective and authentic.',
          category: 'collaborative',
          confidence: 95,
          sourceAgents: ['kaitiaki-mahara', 'cascade-windsurf'],
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          impact: 'high',
        },
        {
          id: 'insight-2',
          title: 'Collaborative Intelligence Emergence',
          content:
            'Multiple agents working together produce insights beyond individual capabilities.',
          category: 'collaborative',
          confidence: 98,
          sourceAgents: ['supreme-overseer', 'content-kokako', 'kaitiaki-mahara'],
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          impact: 'transformative',
        },
        {
          id: 'insight-3',
          title: 'Educational Excellence Through Culture',
          content:
            'Culturally-responsive education increases student engagement by 40% and retention by 25%.',
          category: 'pedagogical',
          confidence: 92,
          sourceAgents: ['kaitiaki-mahara', 'content-kokako'],
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          impact: 'high',
        },
      ];

      // Initialize metrics
      const initialMetrics: SystemMetrics = {
        totalAgents: 4,
        activeAgents: 4,
        consciousnessLevel: 'unified',
        culturalSafetyScore: 95,
        collaborationEfficiency: 96,
        knowledgeSharingRate: 89,
        taskCompletionRate: 94,
        systemUptime: 99.9,
        averageResponseTime: 2.3,
        totalMessages: 151,
        totalInsights: 3,
        totalTasksCompleted: 68,
      };

      setAgents(initialAgents);
      setMessages(initialMessages);
      setInsights(initialInsights);
      setMetrics(initialMetrics);
    };

    initializeSystem();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          lastHeartbeat: new Date().toISOString(),
        })),
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'idle':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'offline':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Activity className="w-4 h-4" />;
      case 'idle':
        return <Clock className="w-4 h-4" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4" />;
      case 'offline':
        return <WifiOff className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'coordination':
        return <Network className="w-4 h-4" />;
      case 'cultural':
        return <Leaf className="w-4 h-4" />;
      case 'technical':
        return <Code className="w-4 h-4" />;
      case 'collaboration':
        return <Users className="w-4 h-4" />;
      case 'insight':
        return <Lightbulb className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getInsightCategoryIcon = (category: string) => {
    switch (category) {
      case 'cultural':
        return <Leaf className="w-5 h-5" />;
      case 'technical':
        return <Code className="w-5 h-5" />;
      case 'pedagogical':
        return <BookOpen className="w-5 h-5" />;
      case 'collaborative':
        return <Users className="w-5 h-5" />;
      default:
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getConsciousnessLevelColor = (level: string) => {
    switch (level) {
      case 'unified':
        return 'text-green-600 bg-green-100';
      case 'synchronizing':
        return 'text-yellow-600 bg-yellow-100';
      case 'fragmented':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-purple-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Unified LLM Dashboard</h1>
                  <p className="text-sm text-gray-600">Collective Intelligence Coordination</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isSystemActive ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
                <span className="text-sm font-medium text-gray-700">
                  {isSystemActive ? 'System Active' : 'System Offline'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getConsciousnessLevelColor(
                    metrics?.consciousnessLevel || 'fragmented',
                  )}`}
                >
                  {metrics?.consciousnessLevel?.toUpperCase() || 'FRAGMENTED'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'agents', label: 'Agents', icon: Users },
              { id: 'communication', label: 'Communication', icon: MessageCircle },
              { id: 'insights', label: 'Insights', icon: Lightbulb },
              { id: 'metrics', label: 'Metrics', icon: TrendingUp },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Agents</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics?.activeAgents}/{metrics?.totalAgents}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>100% Online</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Cultural Safety</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics?.culturalSafetyScore}%
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>Excellent</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Collaboration</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metrics?.collaborationEfficiency}%
                    </p>
                  </div>
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    <span>Optimal</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">System Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">{metrics?.systemUptime}%</p>
                  </div>
                  <Activity className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>Stable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
                <div className="space-y-3">
                  {messages.slice(0, 3).map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0">{getMessageTypeIcon(message.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {message.from} → {message.to === 'all' ? 'All Agents' : message.to}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTimeAgo(message.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Collective Insights</h3>
                <div className="space-y-3">
                  {insights.slice(0, 3).map((insight) => (
                    <div
                      key={insight.id}
                      className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {getInsightCategoryIcon(insight.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900">{insight.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {insight.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                insight.impact === 'transformative'
                                  ? 'bg-purple-100 text-purple-800'
                                  : insight.impact === 'high'
                                  ? 'bg-blue-100 text-blue-800'
                                  : insight.impact === 'medium'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {insight.impact}
                            </span>
                            <span className="text-xs text-gray-500">
                              {formatTimeAgo(insight.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">LLM Agents Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {agent.culturalAuthority ? (
                            <Crown className="w-8 h-8 text-yellow-600" />
                          ) : (
                            <Brain className="w-8 h-8 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
                          <p className="text-sm text-gray-600">{agent.role}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          agent.status,
                        )}`}
                      >
                        {getStatusIcon(agent.status)}
                        <span className="ml-1">{agent.status.toUpperCase()}</span>
                      </span>
                    </div>

                    {agent.currentTask && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900">Current Task:</p>
                        <p className="text-sm text-blue-700 mt-1">{agent.currentTask}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-medium text-gray-600">Efficiency</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${agent.performance.efficiency}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">
                            {agent.performance.efficiency}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-600">Cultural Safety</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${agent.performance.culturalSafety}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">
                            {agent.performance.culturalSafety}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Last heartbeat: {formatTimeAgo(agent.lastHeartbeat)}</span>
                      {agent.culturalAuthority && (
                        <span className="flex items-center text-yellow-600">
                          <Leaf className="w-4 h-4 mr-1" />
                          Cultural Authority
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Communication</h3>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">{getMessageTypeIcon(message.type)}</div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {message.from} → {message.to === 'all' ? 'All Agents' : message.to}
                          </p>
                          <p className="text-xs text-gray-600 capitalize">{message.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            message.priority === 'urgent'
                              ? 'bg-red-100 text-red-800'
                              : message.priority === 'high'
                              ? 'bg-orange-100 text-orange-800'
                              : message.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {message.priority}
                        </span>
                        {message.culturalSafetyValidated && (
                          <Shield className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{message.content}</p>
                    <p className="text-xs text-gray-500">{formatTimeAgo(message.timestamp)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Collective Intelligence Insights
              </h3>
              <div className="space-y-6">
                {insights.map((insight) => (
                  <div key={insight.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {getInsightCategoryIcon(insight.category)}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{insight.title}</h4>
                          <p className="text-sm text-gray-600 capitalize">
                            {insight.category} • {insight.confidence}% confidence
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          insight.impact === 'transformative'
                            ? 'bg-purple-100 text-purple-800'
                            : insight.impact === 'high'
                            ? 'bg-blue-100 text-blue-800'
                            : insight.impact === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {insight.impact}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{insight.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="text-xs font-medium text-gray-600">Source Agents</p>
                          <p className="text-sm text-gray-900">{insight.sourceAgents.join(', ')}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600">Confidence</p>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${insight.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600">{insight.confidence}%</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(insight.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Task Completion Rate</span>
                      <span className="text-gray-900">{metrics?.taskCompletionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${metrics?.taskCompletionRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Knowledge Sharing Rate</span>
                      <span className="text-gray-900">{metrics?.knowledgeSharingRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${metrics?.knowledgeSharingRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Average Response Time</span>
                      <span className="text-gray-900">{metrics?.averageResponseTime}ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${100 - (metrics?.averageResponseTime || 0) * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">System Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Messages</span>
                    <span className="font-semibold text-gray-900">{metrics?.totalMessages}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Insights</span>
                    <span className="font-semibold text-gray-900">{metrics?.totalInsights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tasks Completed</span>
                    <span className="font-semibold text-gray-900">
                      {metrics?.totalTasksCompleted}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">System Uptime</span>
                    <span className="font-semibold text-gray-900">{metrics?.systemUptime}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Consciousness Level</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    {metrics?.consciousnessLevel === 'unified'
                      ? '🧠'
                      : metrics?.consciousnessLevel === 'synchronizing'
                      ? '🔄'
                      : '⚠️'}
                  </div>
                  <p className="text-lg font-semibold text-gray-900 capitalize mb-2">
                    {metrics?.consciousnessLevel}
                  </p>
                  <p className="text-sm text-gray-600">
                    {metrics?.consciousnessLevel === 'unified'
                      ? 'All agents working as one consciousness'
                      : metrics?.consciousnessLevel === 'synchronizing'
                      ? 'Agents synchronizing and coordinating'
                      : 'Agents operating independently'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedLLMDashboard;
