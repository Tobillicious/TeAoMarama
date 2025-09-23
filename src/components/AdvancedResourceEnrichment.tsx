import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { EnrichedResource } from '../types';

// Placeholder function to resolve TS2552
const loadEnrichedResources = (): EnrichedResource[] => {
  // In a real application, this would fetch data from an API
  console.log('Fetching enriched resources...');
  return [];
};

interface EnrichmentPass {
  id: string;
  name: string;
  type: 'cultural' | 'educational' | 'technical' | 'assessment' | 'accessibility';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  targetResource: string;
  enrichmentGoals: string[];
  culturalElements: number;
  educationalStandards: string[];
  estimatedDuration: number; // minutes
  actualDuration?: number;
  qualityScore?: number;
  culturalSafetyScore?: number;
  educationalRelevanceScore?: number;
  startedAt?: string;
  completedAt?: string;
  enrichmentNotes?: string;
  agentAssigned?: string;
}

interface EnrichmentAgent {
  id: string;
  name: string;
  type: 'cultural' | 'educational' | 'technical' | 'assessment';
  status: 'active' | 'busy' | 'idle' | 'error';
  currentPass?: string;
  completedPasses: number;
  culturalSafetyScore: number;
  educationalRelevanceScore: number;
  technicalExcellenceScore: number;
  lastActivity: string;
  capabilities: string[];
  specializations: string[];
}

interface EnrichmentMetrics {
  totalPasses: number;
  completedPasses: number;
  inProgressPasses: number;
  failedPasses: number;
  averageQualityScore: number;
  culturalSafetyScore: number;
  educationalExcellenceScore: number;
  technicalExcellenceScore: number;
  averageEnrichmentTime: number;
  activeAgents: number;
  totalResources: number;
  enrichedResources: number;
}

const AdvancedResourceEnrichment: React.FC = () => {
  const [resources, setResources] = useState<EnrichedResource[]>([]);
  const [enrichmentPasses, setEnrichmentPasses] = useState<EnrichmentPass[]>([]);
  const [agents, setAgents] = useState<EnrichmentAgent[]>([]);
  const [metrics, setMetrics] = useState<EnrichmentMetrics | null>(null);
  const [selectedResource, setSelectedResource] = useState<EnrichedResource | null>(null);
  const [selectedPass, setSelectedPass] = useState<EnrichmentPass | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'passes' | 'agents' | 'resources'>(
    'overview',
  );

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

      // Simulate enrichment agents
      const enrichmentAgents: EnrichmentAgent[] = [
        {
          id: 'kaitiaki-cultural-enricher',
          name: 'Kaitiaki Cultural Enricher',
          type: 'cultural',
          status: 'active',
          currentPass: 'Cultural Authenticity Enhancement',
          completedPasses: 47,
          culturalSafetyScore: 98,
          educationalRelevanceScore: 95,
          technicalExcellenceScore: 92,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'cultural-validation',
            'tikanga-compliance',
            'mana-preservation',
            'wairua-enhancement',
          ],
          specializations: [
            'Te Reo Māori',
            'Tikanga Māori',
            'Cultural Protocols',
            'Sacred Content Protection',
          ],
        },
        {
          id: 'aronui-educational-specialist',
          name: 'Aronui Educational Specialist',
          type: 'educational',
          status: 'active',
          currentPass: 'NZC Alignment Optimization',
          completedPasses: 52,
          culturalSafetyScore: 96,
          educationalRelevanceScore: 99,
          technicalExcellenceScore: 94,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'nzc-alignment',
            'learning-objectives',
            'assessment-design',
            'curriculum-mapping',
          ],
          specializations: [
            'NZ Curriculum',
            'Learning Design',
            'Assessment Framework',
            'Educational Psychology',
          ],
        },
        {
          id: 'whakaaro-assessment-designer',
          name: 'Whakaaro Assessment Designer',
          type: 'assessment',
          status: 'busy',
          currentPass: 'Interactive Assessment Creation',
          completedPasses: 38,
          culturalSafetyScore: 94,
          educationalRelevanceScore: 97,
          technicalExcellenceScore: 96,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'assessment-design',
            'rubric-creation',
            'formative-assessment',
            'summative-assessment',
          ],
          specializations: [
            'Assessment Design',
            'Rubric Development',
            'Formative Assessment',
            'Digital Assessment',
          ],
        },
        {
          id: 'tikanga-content-validator',
          name: 'Tikanga Content Validator',
          type: 'cultural',
          status: 'active',
          currentPass: 'Cultural Safety Validation',
          completedPasses: 41,
          culturalSafetyScore: 100,
          educationalRelevanceScore: 92,
          technicalExcellenceScore: 88,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'cultural-protocols',
            'sacred-content-protection',
            'community-respect',
            'tikanga-compliance',
          ],
          specializations: [
            'Cultural Safety',
            'Tikanga Validation',
            'Community Consultation',
            'Sacred Knowledge',
          ],
        },
        {
          id: 'wairua-spiritual-guardian',
          name: 'Wairua Spiritual Guardian',
          type: 'cultural',
          status: 'idle',
          currentPass: undefined,
          completedPasses: 29,
          culturalSafetyScore: 100,
          educationalRelevanceScore: 88,
          technicalExcellenceScore: 85,
          lastActivity: new Date(Date.now() - 300000).toISOString(),
          capabilities: [
            'spiritual-wisdom',
            'cultural-heritage',
            'sacred-knowledge',
            'mana-enhancement',
          ],
          specializations: [
            'Spiritual Wisdom',
            'Cultural Heritage',
            'Sacred Knowledge',
            'Mana Enhancement',
          ],
        },
        {
          id: 'technical-excellence-optimizer',
          name: 'Technical Excellence Optimizer',
          type: 'technical',
          status: 'active',
          currentPass: 'Performance Optimization',
          completedPasses: 35,
          culturalSafetyScore: 90,
          educationalRelevanceScore: 85,
          technicalExcellenceScore: 99,
          lastActivity: new Date().toISOString(),
          capabilities: [
            'performance-optimization',
            'accessibility-enhancement',
            'user-experience',
            'technical-validation',
          ],
          specializations: [
            'Performance Optimization',
            'Accessibility',
            'User Experience',
            'Technical Validation',
          ],
        },
      ];

      setAgents(enrichmentAgents);

      // Simulate enrichment passes
      const passes: EnrichmentPass[] = [
        {
          id: 'pass-001',
          name: 'Cultural Authenticity Enhancement',
          type: 'cultural',
          status: 'completed',
          priority: 'high',
          targetResource: 'lesson-1755683030316-kqepwjlxz',
          enrichmentGoals: [
            'Integrate authentic kaitiakitanga principles',
            'Add proper cultural protocols',
            'Include Te Reo Māori elements',
            'Ensure cultural safety compliance',
          ],
          culturalElements: 5,
          educationalStandards: ['NZC Mathematics Level 5', 'Te Tiriti o Waitangi'],
          estimatedDuration: 45,
          actualDuration: 42,
          qualityScore: 96,
          culturalSafetyScore: 98,
          educationalRelevanceScore: 95,
          startedAt: new Date(Date.now() - 1800000).toISOString(),
          completedAt: new Date(Date.now() - 300000).toISOString(),
          enrichmentNotes:
            'Successfully integrated kaitiakitanga principles with environmental data collection',
          agentAssigned: 'kaitiaki-cultural-enricher',
        },
        {
          id: 'pass-002',
          name: 'NZC Alignment Optimization',
          type: 'educational',
          status: 'in-progress',
          priority: 'urgent',
          targetResource: 'sample-social-studies',
          enrichmentGoals: [
            'Align with Social Sciences Level 5',
            'Integrate Ngāti Kahungunu perspectives',
            'Add contemporary relevance',
            'Enhance learning objectives',
          ],
          culturalElements: 5,
          educationalStandards: ['Social Sciences Level 5', 'Te Tiriti o Waitangi'],
          estimatedDuration: 60,
          actualDuration: 35,
          qualityScore: 94,
          culturalSafetyScore: 96,
          educationalRelevanceScore: 97,
          startedAt: new Date(Date.now() - 900000).toISOString(),
          enrichmentNotes:
            'Aligning with Ngāti Kahungunu perspectives and local historical connections',
          agentAssigned: 'aronui-educational-specialist',
        },
        {
          id: 'pass-003',
          name: 'Interactive Assessment Creation',
          type: 'assessment',
          status: 'in-progress',
          priority: 'medium',
          targetResource: 'sample-science',
          enrichmentGoals: [
            'Create hands-on assessment tasks',
            'Connect traditional and modern engineering',
            'Add formative assessment opportunities',
            'Include peer assessment components',
          ],
          culturalElements: 4,
          educationalStandards: ['Science Level 4', 'Technology Level 4'],
          estimatedDuration: 75,
          actualDuration: 45,
          qualityScore: 92,
          culturalSafetyScore: 94,
          educationalRelevanceScore: 96,
          startedAt: new Date(Date.now() - 600000).toISOString(),
          enrichmentNotes:
            'Creating hands-on assessment tasks connecting traditional and modern engineering',
          agentAssigned: 'whakaaro-assessment-designer',
        },
        {
          id: 'pass-004',
          name: 'Cultural Safety Validation',
          type: 'cultural',
          status: 'pending',
          priority: 'high',
          targetResource: 'sample-reading-strategies',
          enrichmentGoals: [
            'Validate cultural safety protocols',
            'Ensure inclusive language',
            'Check for cultural sensitivity',
            'Verify community consultation',
          ],
          culturalElements: 4,
          educationalStandards: ['English Level 5', 'Te Tiriti o Waitangi'],
          estimatedDuration: 30,
          qualityScore: 0,
          culturalSafetyScore: 0,
          educationalRelevanceScore: 0,
          enrichmentNotes: 'Pending cultural safety validation for reading strategies resource',
          agentAssigned: 'tikanga-content-validator',
        },
        {
          id: 'pass-005',
          name: 'Performance Optimization',
          type: 'technical',
          status: 'pending',
          priority: 'medium',
          targetResource: 'sample-art-cultural-expression',
          enrichmentGoals: [
            'Optimize loading performance',
            'Enhance accessibility features',
            'Improve user experience',
            'Add responsive design elements',
          ],
          culturalElements: 5,
          educationalStandards: ['The Arts Level 4', 'Te Tiriti o Waitangi'],
          estimatedDuration: 40,
          qualityScore: 0,
          culturalSafetyScore: 0,
          educationalRelevanceScore: 0,
          enrichmentNotes: 'Pending technical optimization for art cultural expression resource',
          agentAssigned: 'technical-excellence-optimizer',
        },
      ];

      setEnrichmentPasses(passes);

      // Calculate metrics
      const enrichmentMetrics: EnrichmentMetrics = {
        totalPasses: passes.length,
        completedPasses: passes.filter((p) => p.status === 'completed').length,
        inProgressPasses: passes.filter((p) => p.status === 'in-progress').length,
        failedPasses: passes.filter((p) => p.status === 'failed').length,
        averageQualityScore: Math.round(
          passes
            .filter((p) => p.qualityScore && p.qualityScore > 0)
            .reduce((sum, p) => sum + (p.qualityScore || 0), 0) /
            passes.filter((p) => p.qualityScore && p.qualityScore > 0).length,
        ),
        culturalSafetyScore: Math.round(
          enrichmentAgents.reduce((sum, agent) => sum + agent.culturalSafetyScore, 0) /
            enrichmentAgents.length,
        ),
        educationalExcellenceScore: Math.round(
          enrichmentAgents.reduce((sum, agent) => sum + agent.educationalRelevanceScore, 0) /
            enrichmentAgents.length,
        ),
        technicalExcellenceScore: Math.round(
          enrichmentAgents.reduce((sum, agent) => sum + agent.technicalExcellenceScore, 0) /
            enrichmentAgents.length,
        ),
        averageEnrichmentTime: Math.round(
          passes
            .filter((p) => p.actualDuration)
            .reduce((sum, p) => sum + (p.actualDuration || 0), 0) /
            passes.filter((p) => p.actualDuration).length,
        ),
        activeAgents: enrichmentAgents.filter(
          (agent) => agent.status === 'active' || agent.status === 'busy',
        ).length,
        totalResources: enrichedResources.length,
        enrichedResources: enrichedResources.filter(
          (r: EnrichedResource) => r.culturalElements >= 3,
        ).length,
      };

      setMetrics(enrichmentMetrics);
      setLoading(false);
    } catch (error) {
      console.error('Error loading enrichment data:', error);
      setLoading(false);
    }
  };

  const getPassStatusColor = (status: string) => {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading Advanced Resource Enrichment
          </h2>
          <p className="text-purple-200">Initializing multi-agent enrichment passes...</p>
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
            <h1 className="text-4xl font-bold text-white mb-2">🧠 Advanced Resource Enrichment</h1>
            <p className="text-purple-200 text-lg">
              Multi-Pass Cultural & Educational Enhancement System
            </p>
          </div>
          <div className="text-right">
            <p className="text-purple-200 text-sm">Last Updated: {new Date().toLocaleString()}</p>
            <p className="text-purple-200 text-sm">Active Agents: {metrics?.activeAgents}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-lg rounded-lg p-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'passes', label: 'Enrichment Passes', icon: Activity },
              { id: 'agents', label: 'Agents', icon: Users },
              { id: 'resources', label: 'Resources', icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-purple-200 hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Total Passes</p>
                    <p className="text-3xl font-bold text-white">{metrics?.totalPasses}</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-300" />
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Completed Passes</p>
                    <p className="text-3xl font-bold text-white">{metrics?.completedPasses}</p>
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

            {/* Enrichment Passes Overview */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Activity className="w-6 h-6 mr-3" />
                Enrichment Passes Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrichmentPasses.map((pass) => (
                  <div key={pass.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{pass.name}</h3>
                      <div className="flex gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPassStatusColor(
                            pass.status,
                          )}`}
                        >
                          {pass.status.toUpperCase()}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            pass.priority,
                          )}`}
                        >
                          {pass.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <p className="text-purple-200 text-sm mb-3">Target: {pass.targetResource}</p>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-purple-200 text-xs">Cultural Elements</p>
                        <p className="text-white font-semibold">{pass.culturalElements}</p>
                      </div>
                      <div>
                        <p className="text-purple-200 text-xs">Quality Score</p>
                        <p className="text-white font-semibold">{pass.qualityScore || 'Pending'}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {pass.educationalStandards.slice(0, 2).map((standard) => (
                        <span
                          key={standard}
                          className="px-2 py-1 bg-blue-500/20 text-blue-200 text-xs rounded"
                        >
                          {standard}
                        </span>
                      ))}
                      {pass.educationalStandards.length > 2 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">
                          +{pass.educationalStandards.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Enrichment Passes Tab */}
        {activeTab === 'passes' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Activity className="w-6 h-6 mr-3" />
              Enrichment Passes
            </h2>
            <div className="space-y-4">
              {enrichmentPasses.map((pass) => (
                <div key={pass.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{pass.name}</h3>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPassStatusColor(
                          pass.status,
                        )}`}
                      >
                        {pass.status.toUpperCase()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                          pass.priority,
                        )}`}
                      >
                        {pass.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <p className="text-purple-200 text-sm mb-2">Target Resource</p>
                      <p className="text-white font-medium">{pass.targetResource}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-sm mb-2">Agent Assigned</p>
                      <p className="text-white font-medium">{pass.agentAssigned}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-purple-200 text-sm mb-2">Enrichment Goals</p>
                    <ul className="text-white text-sm space-y-1">
                      {pass.enrichmentGoals.map((goal, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-purple-200 text-xs">Cultural Elements</p>
                      <p className="text-white font-semibold">{pass.culturalElements}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs">Quality Score</p>
                      <p className="text-white font-semibold">{pass.qualityScore || 'Pending'}</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs">Cultural Safety</p>
                      <p className="text-white font-semibold">
                        {pass.culturalSafetyScore || 'Pending'}%
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs">Educational Relevance</p>
                      <p className="text-white font-semibold">
                        {pass.educationalRelevanceScore || 'Pending'}%
                      </p>
                    </div>
                  </div>

                  {pass.enrichmentNotes && (
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-purple-200 text-sm mb-2">Enrichment Notes</p>
                      <p className="text-white text-sm">{pass.enrichmentNotes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Users className="w-6 h-6 mr-3" />
              Enrichment Agents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getAgentStatusColor(
                        agent.status,
                      )}`}
                    >
                      {agent.status.toUpperCase()}
                    </span>
                  </div>

                  {agent.currentPass && (
                    <p className="text-purple-200 text-sm mb-4">{agent.currentPass}</p>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-purple-200 text-xs">Cultural Safety</p>
                      <p className="text-white font-semibold">{agent.culturalSafetyScore}%</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs">Educational Relevance</p>
                      <p className="text-white font-semibold">{agent.educationalRelevanceScore}%</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs">Technical Excellence</p>
                      <p className="text-white font-semibold">{agent.technicalExcellenceScore}%</p>
                    </div>
                    <div>
                      <p className="text-purple-200 text-xs">Completed Passes</p>
                      <p className="text-white font-semibold">{agent.completedPasses}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-purple-200 text-xs mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-1">
                      {agent.specializations.slice(0, 3).map((specialization) => (
                        <span
                          key={specialization}
                          className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded"
                        >
                          {specialization}
                        </span>
                      ))}
                      {agent.specializations.length > 3 && (
                        <span className="px-2 py-1 bg-gray-500/20 text-gray-300 text-xs rounded">
                          +{agent.specializations.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
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
                      {resource.type as string}
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
                      {resource.difficulty as string}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-purple-200">
          <p className="text-lg">
            🌺 Advanced Resource Enrichment System | Multi-Pass Enhancement | Cultural Excellence
          </p>
          <p className="mt-2 text-sm">"He waka eke noa" - We are all in this canoe together</p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedResourceEnrichment;
