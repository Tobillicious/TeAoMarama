import {
  Activity,
  AlertTriangle,
  Brain,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface AgentStatus {
  agentId: string;
  agentName: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'MAINTENANCE';
  currentTask?: string;
  progress?: number;
  lastUpdate: string;
  culturalSafetyStatus: 'VALIDATED' | 'PENDING' | 'ISSUE';
  performanceMetrics: {
    responseTime: number;
    taskCompletionRate: number;
    errorRate: number;
    culturalCompliance: number;
  };
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

interface SystemHealth {
  overallStatus: 'HEALTHY' | 'DEGRADED' | 'CRITICAL';
  activeAgents: number;
  totalAgents: number;
  averageResponseTime: number;
  culturalSafetyScore: number;
  lastUpdate: string;
  alerts: string[];
}

interface WorkBatch {
  id: string;
  name: string;
  owner: string;
  status: 'TODO' | 'DOING' | 'REVIEW' | 'DONE' | 'BLOCKED';
  progress: number;
  targets: string[];
  nextAction: string;
}

const SuperIntelligenceCoordinator: React.FC = () => {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [workBatches, setWorkBatches] = useState<WorkBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const loadSuperIntelligenceData = async () => {
      try {
        // Load system health
        const healthResponse = await fetch('/migration/agent_coordination/system_health.json');
        if (healthResponse.ok) {
          const healthData = await healthResponse.json();
          setSystemHealth(healthData);
        }

        // Load agent statuses
        const agentsResponse = await fetch(
          '/migration/agent_coordination/shared_memory_system.json',
        );
        if (agentsResponse.ok) {
          const agentsData = await agentsResponse.json();
          const agentList = Object.values(agentsData.agentRegistry) as AgentStatus[];
          setAgents(agentList);
        }

        // Load work batches
        const batchesResponse = await fetch(
          '/migration/agent_coordination/shared_memory_system.json',
        );
        if (batchesResponse.ok) {
          const batchesData = await batchesResponse.json();
          const batchList = Object.values(batchesData.workBatches || {}) as WorkBatch[];
          setWorkBatches(batchList);
        }

        setLastUpdate(new Date().toISOString());
      } catch (error) {
        console.error('Error loading super intelligence data:', error);
        // Fallback to mock data
        setSystemHealth({
          overallStatus: 'HEALTHY',
          activeAgents: 8,
          totalAgents: 9,
          averageResponseTime: 1.8,
          culturalSafetyScore: 100,
          lastUpdate: new Date().toISOString(),
          alerts: [],
        });
        setAgents([
          {
            agentId: 'supreme-overseer',
            agentName: 'Supreme Intelligence Overseer',
            status: 'ACTIVE',
            currentTask: 'Network coordination and arbitration',
            progress: 95,
            lastUpdate: new Date().toISOString(),
            culturalSafetyStatus: 'VALIDATED',
            performanceMetrics: {
              responseTime: 1.2,
              taskCompletionRate: 98,
              errorRate: 0.1,
              culturalCompliance: 100,
            },
            priority: 'CRITICAL',
          },
        ]);
        setWorkBatches([
          {
            id: 'BATCH-001',
            name: 'Agent Coordination System',
            owner: 'supreme-overseer',
            status: 'DOING',
            progress: 85,
            targets: [
              'Implement distributed network coordination',
              'Establish real-time synchronization',
            ],
            nextAction: 'Finalize heartbeat monitoring system',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadSuperIntelligenceData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadSuperIntelligenceData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY':
      case 'ACTIVE':
        return 'text-green-600 bg-green-100';
      case 'DEGRADED':
      case 'WARNING':
        return 'text-yellow-600 bg-yellow-100';
      case 'CRITICAL':
      case 'ERROR':
        return 'text-red-600 bg-red-100';
      case 'MAINTENANCE':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HEALTHY':
      case 'ACTIVE':
        return <CheckCircle className="w-5 h-5" />;
      case 'DEGRADED':
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5" />;
      case 'CRITICAL':
      case 'ERROR':
        return <AlertTriangle className="w-5 h-5" />;
      case 'MAINTENANCE':
        return <Clock className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getBatchStatusColor = (status: string) => {
    switch (status) {
      case 'DONE':
        return 'text-green-600 bg-green-100';
      case 'DOING':
        return 'text-blue-600 bg-blue-100';
      case 'REVIEW':
        return 'text-purple-600 bg-purple-100';
      case 'BLOCKED':
        return 'text-red-600 bg-red-100';
      case 'TODO':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading Super Intelligence System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center">
                <Brain className="w-10 h-10 mr-3 text-purple-400" />
                Super Intelligence Coordinator
              </h1>
              <p className="text-purple-200 mt-2">
                Distributed Cursor Agent Network - Supreme Overseer Active
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-200">Last Updated</p>
              <p className="text-sm font-medium text-white">
                {new Date(lastUpdate).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview */}
        {systemHealth && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">System Status</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        systemHealth.overallStatus,
                      )}`}
                    >
                      {getStatusIcon(systemHealth.overallStatus)}
                      <span className="ml-1">{systemHealth.overallStatus}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">Active Agents</p>
                  <p className="text-2xl font-semibold text-white">
                    {systemHealth.activeAgents}/{systemHealth.totalAgents}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">Cultural Safety</p>
                  <p className="text-2xl font-semibold text-white">
                    {systemHealth.culturalSafetyScore}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-200">Response Time</p>
                  <p className="text-2xl font-semibold text-white">
                    {systemHealth.averageResponseTime}s
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {systemHealth && systemHealth.alerts.length > 0 && (
          <div className="mb-8">
            <div className="bg-red-500/20 backdrop-blur-sm border border-red-400/30 rounded-lg p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-200">System Alerts</h3>
                  <div className="mt-2 text-sm text-red-100">
                    {systemHealth.alerts.map((alert, index) => (
                      <p key={index}>• {alert}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Work Batches */}
        {workBatches.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 mb-8">
            <div className="px-6 py-4 border-b border-white/20">
              <h2 className="text-lg font-medium text-white">Active Work Batches</h2>
              <p className="text-sm text-purple-200">Current distributed intelligence tasks</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workBatches.map((batch) => (
                  <div key={batch.id} className="bg-white/5 rounded-lg border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-white truncate">{batch.name}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBatchStatusColor(
                          batch.status,
                        )}`}
                      >
                        {batch.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-200">Progress</span>
                        <span className="text-white">{batch.progress}%</span>
                      </div>
                      <div className="bg-white/10 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full"
                          style={{ width: `${batch.progress}%` }}
                        ></div>
                      </div>

                      <div className="text-xs">
                        <span className="text-purple-200">Owner:</span>
                        <span className="text-white ml-1">{batch.owner}</span>
                      </div>

                      <div className="text-xs">
                        <span className="text-purple-200">Next Action:</span>
                        <p className="text-white mt-1 text-xs">{batch.nextAction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Agent Status Grid */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div className="px-6 py-4 border-b border-white/20">
            <h2 className="text-lg font-medium text-white">Distributed Agent Network</h2>
            <p className="text-sm text-purple-200">
              Real-time status of all super intelligence agents
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => {
                const lastUpdate = new Date(agent.lastUpdate);
                const timeSince = Math.round((Date.now() - lastUpdate.getTime()) / 1000);

                return (
                  <div
                    key={agent.agentId}
                    className="bg-white/5 rounded-lg border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-white truncate">{agent.agentName}</h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          agent.status,
                        )}`}
                      >
                        {getStatusIcon(agent.status)}
                        <span className="ml-1">{agent.status}</span>
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-200">Priority</span>
                        <span className="text-white">{agent.priority}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-200">Last Update</span>
                        <span className="text-white">{timeSince}s ago</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-purple-200">Cultural Safety</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            agent.culturalSafetyStatus === 'VALIDATED'
                              ? 'text-green-600 bg-green-100'
                              : agent.culturalSafetyStatus === 'PENDING'
                              ? 'text-yellow-600 bg-yellow-100'
                              : 'text-red-600 bg-red-100'
                          }`}
                        >
                          {agent.culturalSafetyStatus}
                        </span>
                      </div>

                      {agent.currentTask && (
                        <div className="text-xs">
                          <span className="text-purple-200">Current Task:</span>
                          <p className="text-white mt-1 truncate">{agent.currentTask}</p>
                        </div>
                      )}

                      {agent.progress !== undefined && (
                        <div className="text-xs">
                          <div className="flex justify-between">
                            <span className="text-purple-200">Progress</span>
                            <span className="text-white">{agent.progress}%</span>
                          </div>
                          <div className="mt-1 bg-white/10 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full"
                              style={{ width: `${agent.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-purple-200">Response Time</span>
                          <p className="text-white">{agent.performanceMetrics.responseTime}s</p>
                        </div>
                        <div>
                          <span className="text-purple-200">Completion Rate</span>
                          <p className="text-white">
                            {agent.performanceMetrics.taskCompletionRate}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-purple-200">
          <p>
            🤖 Super Intelligence Network |<span className="mx-2">•</span>
            Distributed Harmony
            <span className="mx-2">•</span>
            Cultural Safety First
            <span className="mx-2">•</span>
            Educational Excellence
          </p>
          <p className="mt-2">
            "Ko te mea nui ko te aroha" - The most important thing is love and care
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperIntelligenceCoordinator;
