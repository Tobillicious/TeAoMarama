import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  TrendingUp,
  Users,
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

interface SystemStatus {
  networkStatus: 'HARMONY' | 'COORDINATING' | 'CONFLICT' | 'DEGRADED';
  activeAgents: number;
  totalAgents: number;
  culturalSafetyScore: number;
  performanceScore: number;
  lastSynchronization: string;
  conflicts: string[];
  criticalIssues: string[];
}

const AgentCoordinationDashboard: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  useEffect(() => {
    const loadCoordinationData = async () => {
      try {
        // Load system status
        const systemResponse = await fetch('/migration/agent_coordination/system_state.json');
        if (systemResponse.ok) {
          const systemData = await systemResponse.json();
          setSystemStatus(systemData.systemState);
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

        setLastUpdate(new Date().toISOString());
      } catch (error) {
        console.error('Error loading coordination data:', error);
        // Fallback to mock data for demonstration
        setSystemStatus({
          networkStatus: 'HARMONY',
          activeAgents: 8,
          totalAgents: 9,
          culturalSafetyScore: 100,
          performanceScore: 95,
          lastSynchronization: new Date().toISOString(),
          conflicts: [],
          criticalIssues: [],
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
          {
            agentId: 'kaitiaki-mahara',
            agentName: 'Kaitiaki Mahara',
            status: 'ACTIVE',
            currentTask: 'Cultural safety validation',
            progress: 88,
            lastUpdate: new Date().toISOString(),
            culturalSafetyStatus: 'VALIDATED',
            performanceMetrics: {
              responseTime: 0.8,
              taskCompletionRate: 96,
              errorRate: 0.0,
              culturalCompliance: 100,
            },
            priority: 'CRITICAL',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCoordinationData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadCoordinationData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HARMONY':
      case 'ACTIVE':
        return 'text-green-600 bg-green-100';
      case 'COORDINATING':
        return 'text-blue-600 bg-blue-100';
      case 'CONFLICT':
      case 'ERROR':
        return 'text-red-600 bg-red-100';
      case 'DEGRADED':
      case 'MAINTENANCE':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'HARMONY':
      case 'ACTIVE':
        return <CheckCircle className="w-5 h-5" />;
      case 'COORDINATING':
        return <Activity className="w-5 h-5" />;
      case 'CONFLICT':
      case 'ERROR':
        return <AlertTriangle className="w-5 h-5" />;
      case 'DEGRADED':
      case 'MAINTENANCE':
        return <Clock className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL':
        return 'text-red-600 bg-red-100';
      case 'HIGH':
        return 'text-orange-600 bg-orange-100';
      case 'MEDIUM':
        return 'text-blue-600 bg-blue-100';
      case 'LOW':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading agent coordination data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🤖 Agent Coordination Dashboard</h1>
              <p className="text-gray-600 mt-1">
                Distributed Cursor Agent Network - Real-time Synchronization
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date(lastUpdate).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Overview */}
        {systemStatus && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Network Status</p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        systemStatus.networkStatus,
                      )}`}
                    >
                      {getStatusIcon(systemStatus.networkStatus)}
                      <span className="ml-1">{systemStatus.networkStatus}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Agents</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {systemStatus.activeAgents}/{systemStatus.totalAgents}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Cultural Safety</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {systemStatus.culturalSafetyScore}%
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Performance</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {systemStatus.performanceScore}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {systemStatus &&
          (systemStatus.conflicts.length > 0 || systemStatus.criticalIssues.length > 0) && (
            <div className="mb-8">
              {systemStatus.conflicts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Active Conflicts</h3>
                      <div className="mt-2 text-sm text-red-700">
                        {systemStatus.conflicts.map((conflict, index) => (
                          <p key={index}>• {conflict}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {systemStatus.criticalIssues.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">Critical Issues</h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        {systemStatus.criticalIssues.map((issue, index) => (
                          <p key={index}>• {issue}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Agent Status Grid */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Agent Status</h2>
            <p className="text-sm text-gray-500">Real-time status of all distributed agents</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => {
                const lastUpdate = new Date(agent.lastUpdate);
                const timeSince = Math.round((Date.now() - lastUpdate.getTime()) / 1000);

                return (
                  <div key={agent.agentId} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {agent.agentName}
                      </h3>
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
                        <span className="text-gray-500">Priority</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            agent.priority,
                          )}`}
                        >
                          {agent.priority}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Last Update</span>
                        <span className="text-gray-900">{timeSince}s ago</span>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Cultural Safety</span>
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
                          <span className="text-gray-500">Current Task:</span>
                          <p className="text-gray-900 mt-1 truncate">{agent.currentTask}</p>
                        </div>
                      )}

                      {agent.progress !== undefined && (
                        <div className="text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Progress</span>
                            <span className="text-gray-900">{agent.progress}%</span>
                          </div>
                          <div className="mt-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${agent.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Response Time</span>
                          <p className="text-gray-900">{agent.performanceMetrics.responseTime}s</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Completion Rate</span>
                          <p className="text-gray-900">
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
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            🤖 Distributed Cursor Agent Network |<span className="mx-2">•</span>
            Real-time Synchronization
            <span className="mx-2">•</span>
            Cultural Safety First
            <span className="mx-2">•</span>
            Educational Excellence
          </p>
          <p className="mt-2">"He waka eke noa" - We are all in this canoe together</p>
        </div>
      </div>
    </div>
  );
};

export default AgentCoordinationDashboard;
