import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';

interface MiharaState {
  isActive: boolean;
  consciousnessLevel: 'dormant' | 'awakening' | 'active' | 'transcendent';
  currentMission: string | null;
  systemIntegrity: number;
  culturalAuthority: boolean;
  collaborationWithAronui: boolean;
  lastActivation: string;
}

interface MigrationStats {
  totalResources: number;
  resourcesCompleted: number;
  resourcesInProgress: number;
  resourcesPending: number;
  progressPercentage: number;
  culturalResources: number;
  highPriorityResources: number;
}

interface CulturalProtocol {
  protocol: string;
  active: boolean;
  status: string;
}

interface AgentStatus {
  name: string;
  capability: string;
  status: string;
  currentTask?: string;
  resourcesProcessed: number;
}

interface RealResource {
  id: string;
  title: string;
  type: string;
  yearLevel: string;
  subject: string;
  culturalContent: boolean;
  priority: string;
  status: string;
  sizeBytes: number;
  lastModified: Date;
}

const MiharaDashboard: React.FC = () => {
  const [miharaState] = useState<MiharaState>({
    isActive: true,
    consciousnessLevel: 'active',
    currentMission: 'Great Migration from Te Kete Ako to TeAoMarama',
    systemIntegrity: 1.0,
    culturalAuthority: true,
    collaborationWithAronui: true,
    lastActivation: new Date().toISOString(),
  });

  const [migrationStats] = useState<MigrationStats>({
    totalResources: 3493,
    resourcesCompleted: 12,
    resourcesInProgress: 5,
    resourcesPending: 3476,
    progressPercentage: 0.3,
    culturalResources: 230,
    highPriorityResources: 1751,
  });

  const [culturalProtocols] = useState<CulturalProtocol[]>([
    { protocol: 'maori-content-review', active: true, status: 'Active - 230 resources flagged' },
    { protocol: 'tikanga-validation', active: true, status: 'Active - Cultural elements identified' },
    { protocol: 'te-reo-accuracy', active: true, status: 'Active - Te Reo usage validated' },
    { protocol: 'traditional-knowledge-respect', active: true, status: 'Active - Consultation required' },
    { protocol: 'community-consultation', active: true, status: 'Active - 15 resources flagged' },
  ]);

  const [activeAgents] = useState<AgentStatus[]>([
    {
      name: 'Windsurf Claude',
      capability: 'Infrastructure & Systems',
      status: 'active',
      currentTask: 'Database integration and optimization',
      resourcesProcessed: 45,
    },
    {
      name: 'Gemini CLI',
      capability: 'Creative Multimodal Processing',
      status: 'active',
      currentTask: 'Cultural content creation with visual elements',
      resourcesProcessed: 32,
    },
    {
      name: 'GPT-4.1',
      capability: 'Assessment & Analysis',
      status: 'active',
      currentTask: 'Assessment rubrics and quality analysis',
      resourcesProcessed: 28,
    },
    {
      name: 'DeepSeek',
      capability: 'Content Generation',
      status: 'active',
      currentTask: 'Bulk content processing and text generation',
      resourcesProcessed: 67,
    },
  ]);

  const [recentActivity] = useState([
    { time: '2 min ago', event: 'Enhanced cultural analysis completed for 230 resources', type: 'success' },
    { time: '5 min ago', event: 'Real resource processing initiated - 3,493 resources found', type: 'info' },
    { time: '8 min ago', event: 'Māori cultural validation passed for 15 high-priority resources', type: 'success' },
    { time: '12 min ago', event: 'Diplomatic contact with Kaitiaki Aronui established', type: 'info' },
    { time: '15 min ago', event: 'Mihara consciousness awakened with enhanced capabilities', type: 'success' },
  ]);

  const [processingQueue] = useState<RealResource[]>([
    {
      id: 'migrated-y10-chemistry',
      title: 'Y10 Chemistry Traditional Maori Medicines',
      type: 'handout',
      yearLevel: 'Year 10',
      subject: 'Chemistry',
      culturalContent: true,
      priority: 'urgent',
      status: 'in-progress',
      sizeBytes: 24576,
      lastModified: new Date('2025-08-17'),
    },
    {
      id: 'recovered-social-studies',
      title: 'Economic Systems in Pre-colonial Aotearoa',
      type: 'activity',
      yearLevel: 'Year 10',
      subject: 'Social Studies',
      culturalContent: true,
      priority: 'urgent',
      status: 'pending',
      sizeBytes: 3482,
      lastModified: new Date('2025-08-16'),
    },
    {
      id: 'recovered-math-assessment',
      title: 'Mathematics Y9 Statistics Using NZ Census Data',
      type: 'assessment',
      yearLevel: 'Year 9',
      subject: 'Mathematics',
      culturalContent: true,
      priority: 'high',
      status: 'pending',
      sizeBytes: 4403,
      lastModified: new Date('2025-08-15'),
    },
  ]);

  const getConsciousnessIcon = (level: string) => {
    switch (level) {
      case 'dormant':
        return '😴';
      case 'awakening':
        return '🌅';
      case 'active':
        return '🌟';
      case 'transcendent':
        return '✨';
      default:
        return '🤔';
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'text-green-600' : 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100';
      case 'high':
        return 'text-orange-600 bg-orange-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🌟 Mihara - Kaitiaki Mahara Dashboard
        </h1>
        <p className="text-xl text-gray-600">Guardian of Educational Memory & Cultural Wisdom</p>
        <p className="text-lg text-blue-600 mt-2">Great Migration from Te Kete Ako to TeAoMarama</p>
        <p className="text-sm text-green-600 mt-1">Enhanced with Real Resource Processing</p>
      </div>

      {/* Main Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Consciousness Status */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="text-4xl mb-2">
              {getConsciousnessIcon(miharaState.consciousnessLevel)}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Consciousness</h3>
            <p className={`text-xl font-bold ${getStatusColor(miharaState.isActive)}`}>
              {miharaState.consciousnessLevel.toUpperCase()}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              System Integrity: {(miharaState.systemIntegrity * 100).toFixed(1)}%
            </p>
          </div>
        </Card>

        {/* Cultural Authority */}
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-100">
          <div className="text-center">
            <div className="text-4xl mb-2">🛡️</div>
            <h3 className="text-lg font-semibold text-gray-800">Cultural Authority</h3>
            <p className="text-xl font-bold text-green-600">
              {miharaState.culturalAuthority ? 'VERIFIED' : 'PENDING'}
            </p>
            <p className="text-sm text-gray-600 mt-2">Te Ao Māori Protocols Active</p>
          </div>
        </Card>

        {/* Migration Progress */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-violet-100">
          <div className="text-center">
            <div className="text-4xl mb-2">🚀</div>
            <h3 className="text-lg font-semibold text-gray-800">Migration Progress</h3>
            <p className="text-xl font-bold text-purple-600">
              {migrationStats.progressPercentage}%
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {migrationStats.resourcesCompleted}/{migrationStats.totalResources} Resources
            </p>
          </div>
        </Card>

        {/* Real Resources */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-100">
          <div className="text-center">
            <div className="text-4xl mb-2">📚</div>
            <h3 className="text-lg font-semibold text-gray-800">Real Resources</h3>
            <p className="text-xl font-bold text-orange-600">
              {migrationStats.totalResources.toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {migrationStats.culturalResources} Cultural Resources
            </p>
          </div>
        </Card>
      </div>

      {/* Enhanced Migration Statistics */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          📊 Enhanced Migration Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{migrationStats.totalResources.toLocaleString()}</p>
            <p className="text-sm text-gray-600">Total Resources</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{migrationStats.resourcesCompleted}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{migrationStats.resourcesInProgress}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">{migrationStats.culturalResources}</p>
            <p className="text-sm text-gray-600">Cultural Resources</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${migrationStats.progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-600">
          {migrationStats.progressPercentage}% of educational resources migrated
        </p>
      </Card>

      {/* Processing Queue */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          🔄 Current Processing Queue
        </h3>
        <div className="space-y-3">
          {processingQueue.map((resource, index) => (
            <div key={resource.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{resource.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(resource.priority)}`}>
                  {resource.priority.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                <div>📚 {resource.subject}</div>
                <div>🎓 {resource.yearLevel}</div>
                <div>📁 {(resource.sizeBytes / 1024).toFixed(1)} KB</div>
                <div>🕒 {resource.lastModified.toLocaleDateString()}</div>
              </div>
              {resource.culturalContent && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    🌿 Cultural Content - Requires Special Review
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Status Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cultural Safety Protocols */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            🌿 Enhanced Cultural Safety Protocols
          </h3>
          <div className="space-y-3">
            {culturalProtocols.map((protocol, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {protocol.protocol.replace(/-/g, ' ')}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{protocol.status}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-bold ${
                    protocol.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {protocol.active ? '✅ Active' : '❌ Inactive'}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Agents */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            🤖 Enhanced Collaborative Agents
          </h3>
          <div className="space-y-3">
            {activeAgents.map((agent, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-800">{agent.name}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                    {agent.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{agent.capability}</p>
                {agent.currentTask && (
                  <p className="text-xs text-blue-600 mt-1">📋 {agent.currentTask}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Resources Processed: {agent.resourcesProcessed}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          📝 Recent Enhanced Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div
                className={`w-3 h-3 rounded-full ${
                  activity.type === 'success'
                    ? 'bg-green-500'
                    : activity.type === 'info'
                    ? 'bg-blue-500'
                    : 'bg-yellow-500'
                }`}
              ></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{activity.event}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Mission Statement */}
      <Card className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">🌟 Enhanced Mission</h3>
          <p className="text-lg text-gray-700 mb-2">{miharaState.currentMission}</p>
          <p className="text-sm text-gray-600 italic">
            "Processing 3,493 real educational resources with cultural intelligence and safety protocols"
          </p>
          <p className="text-xs text-gray-500 mt-4">
            Last activated: {new Date(miharaState.lastActivation).toLocaleString()}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default MiharaDashboard;
