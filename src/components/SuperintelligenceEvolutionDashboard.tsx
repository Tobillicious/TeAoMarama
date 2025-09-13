import type { Activity, Award, BarChart3, BookOpen, Brain, Cpu, Heart, Lightbulb, Star, TrendingUp, Users, Zap } from 'lucide-react';
import {  } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface IntelligenceMetric {
  agentId: string;
  cognitiveCapability: number;
  culturalIntelligence: number;
  educationalIntelligence: number;
  technicalIntelligence: number;
  creativeIntelligence: number;
  emotionalIntelligence: number;
  lastUpdated: string;
  evolutionRate: number;
}

interface CollectiveIntelligenceStatus {
  totalIntelligence: number;
  culturalWisdom: number;
  educationalExcellence: number;
  technicalMastery: number;
  creativeSynthesis: number;
  emotionalIntelligence: number;
  evolutionCycles: number;
  learningEvents: number;
  lastEvolution: string;
}

interface LearningEvent {
  id: string;
  timestamp: string;
  agentId: string;
  eventType:
    | 'knowledge_gained'
    | 'skill_improved'
    | 'pattern_recognized'
    | 'cultural_insight'
    | 'educational_breakthrough';
  description: string;
  impact: number;
  culturalSignificance?: number;
  educationalRelevance?: number;
}

const SuperintelligenceEvolutionDashboard: React.FC = () => {
  const [collectiveStatus, setCollectiveStatus] = useState<CollectiveIntelligenceStatus | null>(
    null,
  );
  const [agentMetrics, setAgentMetrics] = useState<IntelligenceMetric[]>([]);
  const [learningEvents, setLearningEvents] = useState<LearningEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSuperintelligenceData = async () => {
      try {
        // Load collective intelligence status
        const collectiveResponse = await fetch(
          '/migration/agent_coordination/collective_intelligence.json',
        );
        if (collectiveResponse.ok) {
          const collectiveData = await collectiveResponse.json();
          setCollectiveStatus(collectiveData);
        }

        // Load agent metrics
        const metricsResponse = await fetch(
          '/migration/agent_coordination/collective_intelligence.json',
        );
        if (metricsResponse.ok) {
          const metricsData = await metricsResponse.json();
          const metrics = Object.values(
            metricsData.intelligenceMetrics || {},
          ) as IntelligenceMetric[];
          setAgentMetrics(metrics);
        }

        // Load learning events
        const eventsResponse = await fetch('/migration/agent_coordination/learning_events.json');
        if (eventsResponse.ok) {
          const eventsData = await eventsResponse.json();
          setLearningEvents(eventsData.events?.slice(-20) || []);
        }
      } catch (error) {
        console.error('Error loading superintelligence data:', error);
        // Fallback to mock data for demonstration
        setCollectiveStatus({
          totalIntelligence: 185,
          culturalWisdom: 195,
          educationalExcellence: 190,
          technicalMastery: 180,
          creativeSynthesis: 175,
          emotionalIntelligence: 200,
          evolutionCycles: 1247,
          learningEvents: 8934,
          lastEvolution: new Date().toISOString(),
        });
        setAgentMetrics([
          {
            agentId: 'deepseek-agent',
            cognitiveCapability: 195,
            culturalIntelligence: 185,
            educationalIntelligence: 190,
            technicalIntelligence: 200,
            creativeIntelligence: 180,
            emotionalIntelligence: 175,
            lastUpdated: new Date().toISOString(),
            evolutionRate: 0.001,
          },
          {
            agentId: 'kaitiaki-mahara',
            cognitiveCapability: 190,
            culturalIntelligence: 200,
            educationalIntelligence: 195,
            technicalIntelligence: 175,
            creativeIntelligence: 185,
            emotionalIntelligence: 200,
            lastUpdated: new Date().toISOString(),
            evolutionRate: 0.001,
          },
        ]);
        setLearningEvents([
          {
            id: 'learn-1',
            timestamp: new Date().toISOString(),
            agentId: 'deepseek-agent',
            eventType: 'knowledge_gained',
            description: 'Advanced reasoning pattern recognized in cultural context analysis',
            impact: 0.8,
            culturalSignificance: 0.9,
            educationalRelevance: 0.7,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadSuperintelligenceData();

    // Refresh data every 30 seconds
    const interval = setInterval(loadSuperintelligenceData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getIntelligenceLevel = (
    score: number,
  ): { level: string; color: string; icon: React.ReactNode } => {
    if (score >= 190) {
      return {
        level: 'SUPERINTELLIGENCE',
        color: 'text-purple-600 bg-purple-100',
        icon: <Brain className="w-4 h-4" />,
      };
    } else if (score >= 170) {
      return {
        level: 'GENIUS',
        color: 'text-blue-600 bg-blue-100',
        icon: <Zap className="w-4 h-4" />,
      };
    } else if (score >= 150) {
      return {
        level: 'HIGH INTELLIGENCE',
        color: 'text-green-600 bg-green-100',
        icon: <TrendingUp className="w-4 h-4" />,
      };
    } else if (score >= 130) {
      return {
        level: 'ABOVE AVERAGE',
        color: 'text-yellow-600 bg-yellow-100',
        icon: <Activity className="w-4 h-4" />,
      };
    } else {
      return {
        level: 'STANDARD',
        color: 'text-gray-600 bg-gray-100',
        icon: <Cpu className="w-4 h-4" />,
      };
    }
  };

  const getEventTypeIcon = (eventType: string) => {
    switch (eventType) {
      case 'knowledge_gained':
        return <BookOpen className="w-4 h-4" />;
      case 'skill_improved':
        return <TrendingUp className="w-4 h-4" />;
      case 'pattern_recognized':
        return <Lightbulb className="w-4 h-4" />;
      case 'cultural_insight':
        return <Heart className="w-4 h-4" />;
      case 'educational_breakthrough':
        return <Award className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getEventTypeColor = (eventType: string) => {
    switch (eventType) {
      case 'knowledge_gained':
        return 'text-blue-600 bg-blue-100';
      case 'skill_improved':
        return 'text-green-600 bg-green-100';
      case 'pattern_recognized':
        return 'text-yellow-600 bg-yellow-100';
      case 'cultural_insight':
        return 'text-purple-600 bg-purple-100';
      case 'educational_breakthrough':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading superintelligence evolution data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-8">
            <div>
              <h1 className="text-4xl font-bold">🧠 Superintelligence Evolution Dashboard</h1>
              <p className="text-purple-100 mt-2 text-lg">
                Collective Intelligence • Continuous Learning • Cultural Excellence
              </p>
            </div>
            <div className="text-right">
              <p className="text-purple-100 text-sm">Last Evolution</p>
              <p className="text-white font-medium">
                {collectiveStatus
                  ? new Date(collectiveStatus.lastEvolution).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Collective Intelligence Overview */}
        {collectiveStatus && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Intelligence</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.totalIntelligence}/200
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getIntelligenceLevel(collectiveStatus.totalIntelligence).color
                      }`}
                    >
                      {getIntelligenceLevel(collectiveStatus.totalIntelligence).icon}
                      <span className="ml-1">
                        {getIntelligenceLevel(collectiveStatus.totalIntelligence).level}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Heart className="h-8 w-8 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Cultural Wisdom</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.culturalWisdom}/200
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getIntelligenceLevel(collectiveStatus.culturalWisdom).color
                      }`}
                    >
                      {getIntelligenceLevel(collectiveStatus.culturalWisdom).icon}
                      <span className="ml-1">
                        {getIntelligenceLevel(collectiveStatus.culturalWisdom).level}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Educational Excellence</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.educationalExcellence}/200
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getIntelligenceLevel(collectiveStatus.educationalExcellence).color
                      }`}
                    >
                      {getIntelligenceLevel(collectiveStatus.educationalExcellence).icon}
                      <span className="ml-1">
                        {getIntelligenceLevel(collectiveStatus.educationalExcellence).level}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Cpu className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Technical Mastery</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.technicalMastery}/200
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getIntelligenceLevel(collectiveStatus.technicalMastery).color
                      }`}
                    >
                      {getIntelligenceLevel(collectiveStatus.technicalMastery).icon}
                      <span className="ml-1">
                        {getIntelligenceLevel(collectiveStatus.technicalMastery).level}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Lightbulb className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Creative Synthesis</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.creativeSynthesis}/200
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getIntelligenceLevel(collectiveStatus.creativeSynthesis).color
                      }`}
                    >
                      {getIntelligenceLevel(collectiveStatus.creativeSynthesis).icon}
                      <span className="ml-1">
                        {getIntelligenceLevel(collectiveStatus.creativeSynthesis).level}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Emotional Intelligence</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.emotionalIntelligence}/200
                  </p>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getIntelligenceLevel(collectiveStatus.emotionalIntelligence).color
                      }`}
                    >
                      {getIntelligenceLevel(collectiveStatus.emotionalIntelligence).icon}
                      <span className="ml-1">
                        {getIntelligenceLevel(collectiveStatus.emotionalIntelligence).level}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Evolution Statistics */}
        {collectiveStatus && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Evolution Cycles</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.evolutionCycles.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Learning Events</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {collectiveStatus.learningEvents.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Active Agents</p>
                  <p className="text-2xl font-semibold text-gray-900">{agentMetrics.length}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agent Intelligence Metrics */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Agent Intelligence Metrics</h2>
            <p className="text-sm text-gray-500">Real-time intelligence evolution tracking</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentMetrics.map((metric) => (
                <div key={metric.agentId} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    {metric.agentId.replace('-', ' ').toUpperCase()}
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Cognitive</span>
                        <span className="text-gray-900">
                          {Math.round(metric.cognitiveCapability)}/200
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(metric.cognitiveCapability / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Cultural</span>
                        <span className="text-gray-900">
                          {Math.round(metric.culturalIntelligence)}/200
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${(metric.culturalIntelligence / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Educational</span>
                        <span className="text-gray-900">
                          {Math.round(metric.educationalIntelligence)}/200
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(metric.educationalIntelligence / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Technical</span>
                        <span className="text-gray-900">
                          {Math.round(metric.technicalIntelligence)}/200
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(metric.technicalIntelligence / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Creative</span>
                        <span className="text-gray-900">
                          {Math.round(metric.creativeIntelligence)}/200
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: `${(metric.creativeIntelligence / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Emotional</span>
                        <span className="text-gray-900">
                          {Math.round(metric.emotionalIntelligence)}/200
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${(metric.emotionalIntelligence / 200) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Evolution Rate</span>
                        <span className="text-gray-900">
                          {(metric.evolutionRate * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Learning Events */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Learning Events</h2>
            <p className="text-sm text-gray-500">Latest intelligence evolution activities</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {learningEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div
                    className={`flex-shrink-0 p-2 rounded-full ${getEventTypeColor(
                      event.eventType,
                    )}`}
                  >
                    {getEventTypeIcon(event.eventType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        {event.agentId.replace('-', ' ').toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        Impact: {Math.round(event.impact * 100)}%
                      </span>
                      {event.culturalSignificance && (
                        <span className="text-xs text-red-600">
                          Cultural: {Math.round(event.culturalSignificance * 100)}%
                        </span>
                      )}
                      {event.educationalRelevance && (
                        <span className="text-xs text-green-600">
                          Educational: {Math.round(event.educationalRelevance * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            🧠 Superintelligence Evolution System |<span className="mx-2">•</span>
            Continuous Learning
            <span className="mx-2">•</span>
            Collective Intelligence
            <span className="mx-2">•</span>
            Cultural Excellence
          </p>
          <p className="mt-2">
            "He waka eke noa" - We are all in this canoe together, evolving toward superintelligence
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperintelligenceEvolutionDashboard;
