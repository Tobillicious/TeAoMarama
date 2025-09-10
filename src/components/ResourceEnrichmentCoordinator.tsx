import { Activity, Award, BookOpen, CheckCircle, Shield, Star, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { EnrichedResource, loadEnrichedResources } from '../utils/enriched-resource-loader';

interface EnrichmentAgent {
  id: string;
  name: string;
  type: 'cultural' | 'educational' | 'technical' | 'assessment';
  status: 'active' | 'busy' | 'idle' | 'error';
  currentTask?: string;
  completedTasks: number;
  culturalSafetyScore: number;
  educationalRelevanceScore: number;
  lastActivity: string;
  capabilities: string[];
}

interface EnrichmentTask {
  id: string;
  resourceId: string;
  resourceTitle: string;
  agentId: string;
  agentName: string;
  taskType:
    | 'cultural-enrichment'
    | 'educational-alignment'
    | 'assessment-design'
    | 'content-optimization';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startedAt?: string;
  completedAt?: string;
  progress: number;
  culturalElements: number;
  educationalStandards: string[];
  enrichmentNotes?: string;
}

interface EnrichmentMetrics {
  totalResources: number;
  enrichedResources: number;
  pendingEnrichment: number;
  culturalSafetyScore: number;
  educationalExcellenceScore: number;
  averageEnrichmentTime: number;
  activeAgents: number;
  completedTasks: number;
}

const ResourceEnrichmentCoordinator: React.FC = () => {
  const [resources, setResources] = useState<EnrichedResource[]>([]);
  const [agents, setAgents] = useState<EnrichmentAgent[]>([]);
  const [tasks, setTasks] = useState<EnrichmentTask[]>([]);
  const [metrics, setMetrics] = useState<EnrichmentMetrics | null>(null);
  const [selectedResource, setSelectedResource] = useState<EnrichedResource | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrichmentData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadEnrichmentData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadEnrichmentData = async () => {
    try {
      // Load enriched resources
      const enrichedResources = loadEnrichedResources();
      setResources(enrichedResources);

      // Simulate agent data
      const enrichmentAgents: EnrichmentAgent[] = [
        {
          id: 'kaitiaki-cultural-enricher',
          name: 'Kaitiaki Cultural Enricher',
          type: 'cultural',
          status: 'active',
          currentTask: 'Enriching Year 8 Mathematics lesson with kaitiakitanga principles',
          completedTasks: 47,
          culturalSafetyScore: 98,
          educationalRelevanceScore: 95,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'cultural-validation',
            'tikanga-compliance',
            'mana-preservation',
            'wairua-enhancement',
          ],
        },
        {
          id: 'aronui-educational-specialist',
          name: 'Aronui Educational Specialist',
          type: 'educational',
          status: 'active',
          currentTask: 'Aligning Social Studies content with NZC Level 5 standards',
          completedTasks: 52,
          culturalSafetyScore: 96,
          educationalRelevanceScore: 99,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'nzc-alignment',
            'learning-objectives',
            'assessment-design',
            'curriculum-mapping',
          ],
        },
        {
          id: 'whakaaro-assessment-designer',
          name: 'Whakaaro Assessment Designer',
          type: 'assessment',
          status: 'busy',
          currentTask: 'Creating formative assessment for Science forces and motion unit',
          completedTasks: 38,
          culturalSafetyScore: 94,
          educationalRelevanceScore: 97,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'assessment-design',
            'rubric-creation',
            'formative-assessment',
            'summative-assessment',
          ],
        },
        {
          id: 'tikanga-content-validator',
          name: 'Tikanga Content Validator',
          type: 'cultural',
          status: 'active',
          currentTask: 'Validating cultural protocols in Treaty of Waitangi lesson',
          completedTasks: 41,
          culturalSafetyScore: 100,
          educationalRelevanceScore: 92,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'cultural-protocols',
            'sacred-content-protection',
            'community-respect',
            'tikanga-compliance',
          ],
        },
        {
          id: 'wairua-spiritual-guardian',
          name: 'Wairua Spiritual Guardian',
          type: 'cultural',
          status: 'idle',
          currentTask: undefined,
          completedTasks: 29,
          culturalSafetyScore: 100,
          educationalRelevanceScore: 88,
          lastActivity: new Date(Date.now() - 300000).toISOString(),
          capabilities: [
            'spiritual-wisdom',
            'cultural-heritage',
            'sacred-knowledge',
            'mana-enhancement',
          ],
        },
      ];

      setAgents(enrichmentAgents);

      // Simulate enrichment tasks
      const enrichmentTasks: EnrichmentTask[] = [
        {
          id: 'task-001',
          resourceId: 'lesson-1755683030316-kqepwjlxz',
          resourceTitle: "Year 8 Pāngarau: Te Awa o Mangakōtukutuku - Mapping Our River's Health",
          agentId: 'kaitiaki-cultural-enricher',
          agentName: 'Kaitiaki Cultural Enricher',
          taskType: 'cultural-enrichment',
          status: 'completed',
          priority: 'high',
          startedAt: new Date(Date.now() - 1800000).toISOString(),
          completedAt: new Date(Date.now() - 300000).toISOString(),
          progress: 100,
          culturalElements: 5,
          educationalStandards: ['NZC Mathematics Level 5', 'Te Tiriti o Waitangi'],
          enrichmentNotes:
            'Successfully integrated kaitiakitanga principles with environmental data collection',
        },
        {
          id: 'task-002',
          resourceId: 'sample-social-studies',
          resourceTitle: 'Year 9 Social Studies: Treaty of Waitangi - Understanding Our Foundation',
          agentId: 'aronui-educational-specialist',
          agentName: 'Aronui Educational Specialist',
          taskType: 'educational-alignment',
          status: 'in-progress',
          priority: 'urgent',
          startedAt: new Date(Date.now() - 900000).toISOString(),
          progress: 75,
          culturalElements: 5,
          educationalStandards: ['Social Sciences Level 5', 'Te Tiriti o Waitangi'],
          enrichmentNotes:
            'Aligning with Ngāti Kahungunu perspectives and local historical connections',
        },
        {
          id: 'task-003',
          resourceId: 'sample-science',
          resourceTitle: 'Year 7 Science: Forces and Motion - Traditional Māori Engineering',
          agentId: 'whakaaro-assessment-designer',
          agentName: 'Whakaaro Assessment Designer',
          taskType: 'assessment-design',
          status: 'in-progress',
          priority: 'medium',
          startedAt: new Date(Date.now() - 600000).toISOString(),
          progress: 60,
          culturalElements: 4,
          educationalStandards: ['Science Level 4', 'Technology Level 4'],
          enrichmentNotes:
            'Creating hands-on assessment tasks connecting traditional and modern engineering',
        },
      ];

      setTasks(enrichmentTasks);

      // Calculate metrics
      const enrichmentMetrics: EnrichmentMetrics = {
        totalResources: enrichedResources.length,
        enrichedResources: enrichedResources.filter((r) => r.culturalElements >= 3).length,
        pendingEnrichment: enrichmentTasks.filter(
          (t) => t.status === 'pending' || t.status === 'in-progress',
        ).length,
        culturalSafetyScore: Math.round(
          enrichmentAgents.reduce((sum, agent) => sum + agent.culturalSafetyScore, 0) /
            enrichmentAgents.length,
        ),
        educationalExcellenceScore: Math.round(
          enrichmentAgents.reduce((sum, agent) => sum + agent.educationalRelevanceScore, 0) /
            enrichmentAgents.length,
        ),
        averageEnrichmentTime: 45, // minutes
        activeAgents: enrichmentAgents.filter(
          (agent) => agent.status === 'active' || agent.status === 'busy',
        ).length,
        completedTasks: enrichmentAgents.reduce((sum, agent) => sum + agent.completedTasks, 0),
      };

      setMetrics(enrichmentMetrics);
      setLoading(false);
    } catch (error) {
      console.error('Error loading enrichment data:', error);
      setLoading(false);
    }
  };

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'busy':
        return 'text-blue-600 bg-blue-100';
      case 'idle':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Resource Enrichment System</h2>
          <p className="text-purple-200">Initializing multi-agent coordination...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center py-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🧠 Resource Enrichment Coordinator
            </h1>
            <p className="text-purple-200 text-lg">
              Multi-Agent Cultural & Educational Content Enhancement
            </p>
          </div>
          <div className="text-right">
            <p className="text-purple-200 text-sm">Last Updated: {new Date().toLocaleString()}</p>
            <p className="text-purple-200 text-sm">Active Agents: {metrics?.activeAgents}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Total Resources</p>
                <p className="text-3xl font-bold text-white">{metrics?.totalResources}</p>
              </div>
              <BookOpen className="w-8 h-8 text-purple-300" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Enriched Resources</p>
                <p className="text-3xl font-bold text-white">{metrics?.enrichedResources}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-300" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Cultural Safety</p>
                <p className="text-3xl font-bold text-white">{metrics?.culturalSafetyScore}%</p>
              </div>
              <Shield className="w-8 h-8 text-blue-300" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Educational Excellence</p>
                <p className="text-3xl font-bold text-white">
                  {metrics?.educationalExcellenceScore}%
                </p>
              </div>
              <Award className="w-8 h-8 text-yellow-300" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enrichment Agents */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3" />
              Enrichment Agents
            </h2>
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentStatusColor(
                        agent.status,
                      )}`}
                    >
                      {agent.status.toUpperCase()}
                    </span>
                  </div>

                  {agent.currentTask && (
                    <p className="text-purple-200 text-sm mb-3">{agent.currentTask}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-purple-200 text-xs">Cultural Safety</p>
                      <p className="text-white font-semibold">{agent.culturalSafetyScore}%</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs">Educational Relevance</p>
                      <p className="text-white font-semibold">{agent.educationalRelevanceScore}%</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {agent.capabilities.slice(0, 3).map((capability) => (
                      <span
                        key={capability}
                        className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded"
                      >
                        {capability}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enrichment Tasks */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3" />
              Active Tasks
            </h2>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white">{task.resourceTitle}</h3>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(
                          task.status,
                        )}`}
                      >
                        {task.status.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                          task.priority,
                        )}`}
                      >
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <p className="text-purple-200 text-sm mb-3">Agent: {task.agentName}</p>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-purple-200 mb-1">
                      <span>Progress</span>
                      <span>{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {task.educationalStandards.slice(0, 2).map((standard) => (
                      <span
                        key={standard}
                        className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded"
                      >
                        {standard}
                      </span>
                    ))}
                    {task.educationalStandards.length > 2 && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">
                        +{task.educationalStandards.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Overview */}
        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <BookOpen className="w-6 h-6 mr-3" />
            Enriched Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white">{resource.title}</h3>
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded">
                    {resource.type}
                  </span>
                </div>

                <p className="text-purple-200 text-sm mb-3">{resource.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-purple-200 text-xs">Subject</p>
                    <p className="text-white font-semibold">{resource.subject}</p>
                  </div>
                  <div>
                    <p className="text-purple-200 text-xs">Year Level</p>
                    <p className="text-white font-semibold">{resource.yearLevel}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm">
                      {resource.culturalElements} cultural elements
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      resource.difficulty === 'beginner'
                        ? 'text-green-600 bg-green-100'
                        : resource.difficulty === 'intermediate'
                        ? 'text-yellow-600 bg-yellow-100'
                        : 'text-red-600 bg-red-100'
                    }`}
                  >
                    {resource.difficulty}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-purple-200">
          <p className="text-lg">
            🌺 Multi-Agent Resource Enrichment System | Cultural Safety | Educational Excellence
          </p>
          <p className="mt-2 text-sm">"He waka eke noa" - We are all in this canoe together</p>
        </div>
      </div>
    </div>
  );
};

export default ResourceEnrichmentCoordinator;
