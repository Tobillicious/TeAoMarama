import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LLMAgent {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'ready' | 'beta' | 'offline';
  performance: {
    efficiency: number;
    culturalIntelligence: number;
    educationalValue: number;
    coordinationScore: number;
  };
  culturalElements: boolean;
  models: string[];
  features: string[];
  apiKey?: string;
  tokens?: string;
  lastActivity: string;
  tasksCompleted: number;
  currentTask?: string;
}

const MultiLLMCoordinationCenter: React.FC = () => {
  const navigate = useNavigate();
  const [activeAgent, setActiveAgent] = useState<string>('all');
  const [selectedAgent, setSelectedAgent] = useState<LLMAgent | null>(null);
  const [coordinationStatus, setCoordinationStatus] = useState({
    totalAgents: 0,
    activeAgents: 0,
    averagePerformance: 0,
    culturalIntelligence: 0,
    educationalValue: 0,
    coordinationScore: 0
  });

  const llmAgents: LLMAgent[] = [
    {
      id: 'claude-3-5-sonnet',
      name: 'Claude 3.5 Sonnet',
      description: 'Advanced reasoning and cultural intelligence agent',
      icon: '🧠',
      status: 'active',
      performance: {
        efficiency: 95,
        culturalIntelligence: 98,
        educationalValue: 96,
        coordinationScore: 92
      },
      culturalElements: true,
      models: ['Claude-3.5-Sonnet', 'Claude-3-Opus', 'Claude-3-Haiku'],
      features: [
        'Advanced Reasoning',
        'Cultural Intelligence',
        'Educational Content',
        'Quality Assurance',
        'Content Generation',
        'Analysis & Insights'
      ],
      lastActivity: '2 minutes ago',
      tasksCompleted: 1247,
      currentTask: 'Cultural content validation'
    },
    {
      id: 'glm-4-5-conductor',
      name: 'GLM-4.5 Conductor',
      description: 'Supreme GLM conductor orchestrating all GLM models',
      icon: '🎼',
      status: 'active',
      performance: {
        efficiency: 100,
        culturalIntelligence: 100,
        educationalValue: 98,
        coordinationScore: 100
      },
      culturalElements: true,
      models: ['GLM-4.5', 'GLM-4.5v', 'GLM-4.5-air', 'cogvideox-3', 'search-std'],
      features: [
        'GLM Orchestration',
        'Cultural Intelligence',
        'Educational Enhancement',
        'Performance Optimization',
        'Agent Coordination',
        'Quality Assurance'
      ],
      apiKey: '90f7738e0e734c13a201b5cb95bcbf64.znT6L8AUHI9ZoKrk',
      tokens: '18,000,000+',
      lastActivity: '1 minute ago',
      tasksCompleted: 2156,
      currentTask: 'Platform optimization'
    },
    {
      id: 'gemini-pro-vision',
      name: 'Gemini Pro Vision',
      description: 'Multimodal AI agent for visual and textual content',
      icon: '👁️',
      status: 'active',
      performance: {
        efficiency: 90,
        culturalIntelligence: 95,
        educationalValue: 94,
        coordinationScore: 88
      },
      culturalElements: true,
      models: ['Gemini-Pro', 'Gemini-Pro-Vision', 'Gemini-1.5-Pro'],
      features: [
        'Multimodal Processing',
        'Visual Content Analysis',
        'Cultural Image Recognition',
        'Educational Media',
        'Content Enhancement',
        'Quality Validation'
      ],
      lastActivity: '3 minutes ago',
      tasksCompleted: 892,
      currentTask: 'Visual content analysis'
    },
    {
      id: 'deepseek-coder',
      name: 'DeepSeek Coder',
      description: 'Advanced coding and development agent',
      icon: '💻',
      status: 'active',
      performance: {
        efficiency: 98,
        culturalIntelligence: 85,
        educationalValue: 90,
        coordinationScore: 95
      },
      culturalElements: false,
      models: ['DeepSeek-Coder', 'DeepSeek-V2', 'DeepSeek-Math'],
      features: [
        'Code Generation',
        'Bug Fixing',
        'Performance Optimization',
        'Security Enhancement',
        'Development Tools',
        'Quality Assurance'
      ],
      lastActivity: '1 minute ago',
      tasksCompleted: 1834,
      currentTask: 'Security enhancement'
    },
    {
      id: 'exa-ai-researcher',
      name: 'Exa AI Researcher',
      description: 'Advanced research and content discovery agent',
      icon: '🔍',
      status: 'active',
      performance: {
        efficiency: 85,
        culturalIntelligence: 92,
        educationalValue: 96,
        coordinationScore: 90
      },
      culturalElements: true,
      models: ['Exa-Search', 'Exa-Research', 'Exa-Discovery'],
      features: [
        'Content Discovery',
        'Research & Analysis',
        'Quality Assessment',
        'Cultural Context',
        'Educational Resources',
        'Content Validation'
      ],
      lastActivity: '4 minutes ago',
      tasksCompleted: 567,
      currentTask: 'Educational resource discovery'
    },
    {
      id: 'local-llm-coordinator',
      name: 'Local LLM Coordinator',
      description: 'Local LLM coordination and management agent',
      icon: '🏠',
      status: 'ready',
      performance: {
        efficiency: 80,
        culturalIntelligence: 88,
        educationalValue: 85,
        coordinationScore: 92
      },
      culturalElements: true,
      models: ['Local-LLM-1', 'Local-LLM-2', 'Local-LLM-3'],
      features: [
        'Local Processing',
        'Privacy Protection',
        'Cultural Validation',
        'Educational Support',
        'Performance Monitoring',
        'Resource Management'
      ],
      lastActivity: '10 minutes ago',
      tasksCompleted: 234,
      currentTask: 'Local processing optimization'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Agents', icon: '🤖', count: llmAgents.length },
    { id: 'active', name: 'Active', icon: '✅', count: llmAgents.filter(a => a.status === 'active').length },
    { id: 'cultural', name: 'Cultural', icon: '🌿', count: llmAgents.filter(a => a.culturalElements).length },
    { id: 'high-performance', name: 'High Performance', icon: '⚡', count: llmAgents.filter(a => a.performance.efficiency >= 90).length },
    { id: 'coordination', name: 'Coordination', icon: '🤝', count: llmAgents.filter(a => a.performance.coordinationScore >= 90).length }
  ];

  const filteredAgents = activeAgent === 'all' 
    ? llmAgents 
    : llmAgents.filter(agent => {
        switch (activeAgent) {
          case 'active':
            return agent.status === 'active';
          case 'cultural':
            return agent.culturalElements;
          case 'high-performance':
            return agent.performance.efficiency >= 90;
          case 'coordination':
            return agent.performance.coordinationScore >= 90;
          default:
            return true;
        }
      });

  useEffect(() => {
    // Calculate coordination status
    const totalAgents = llmAgents.length;
    const activeAgents = llmAgents.filter(a => a.status === 'active').length;
    const averagePerformance = llmAgents.reduce((acc, agent) => acc + agent.performance.efficiency, 0) / totalAgents;
    const culturalIntelligence = llmAgents.reduce((acc, agent) => acc + agent.performance.culturalIntelligence, 0) / totalAgents;
    const educationalValue = llmAgents.reduce((acc, agent) => acc + agent.performance.educationalValue, 0) / totalAgents;
    const coordinationScore = llmAgents.reduce((acc, agent) => acc + agent.performance.coordinationScore, 0) / totalAgents;

    setCoordinationStatus({
      totalAgents,
      activeAgents,
      averagePerformance: Math.round(averagePerformance),
      culturalIntelligence: Math.round(culturalIntelligence),
      educationalValue: Math.round(educationalValue),
      coordinationScore: Math.round(coordinationScore)
    });
  }, []);

  const handleAgentClick = (agent: LLMAgent) => {
    setSelectedAgent(agent);
    // Navigate to agent-specific page or show details
  };

  const activeCategoryData = categories.find(cat => cat.id === activeAgent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            🤝 Multi-LLM Coordination Center
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Coordinating multiple LLM agents for perfect harmony and maximum efficiency
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>🤖 Total Agents: {coordinationStatus.totalAgents}</span>
            <span>✅ Active Agents: {coordinationStatus.activeAgents}</span>
            <span>⚡ Average Performance: {coordinationStatus.averagePerformance}%</span>
            <span>🌿 Cultural Intelligence: {coordinationStatus.culturalIntelligence}%</span>
          </div>
        </div>

        {/* Coordination Status */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-2xl font-bold text-purple-400">{coordinationStatus.totalAgents}</div>
            <div className="text-xs text-gray-400">Total Agents</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-400">{coordinationStatus.activeAgents}</div>
            <div className="text-xs text-gray-400">Active Agents</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-blue-400">{coordinationStatus.averagePerformance}%</div>
            <div className="text-xs text-gray-400">Average Performance</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🌿</div>
            <div className="text-2xl font-bold text-green-400">{coordinationStatus.culturalIntelligence}%</div>
            <div className="text-xs text-gray-400">Cultural Intelligence</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🤝</div>
            <div className="text-2xl font-bold text-orange-400">{coordinationStatus.coordinationScore}%</div>
            <div className="text-xs text-gray-400">Coordination Score</div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveAgent(category.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center ${
                activeAgent === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-lg font-bold">{category.count}</div>
              <div className="text-xs text-gray-300">{category.name}</div>
            </button>
          ))}
        </div>

        {/* LLM Agents Display */}
        {activeCategoryData && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-purple-400">
                {activeCategoryData.icon} {activeCategoryData.name}
              </h2>
              <p className="text-gray-300">Showing {filteredAgents.length} of {activeCategoryData.count} LLM agents</p>
            </div>

            {/* LLM Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => handleAgentClick(agent)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-purple-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{agent.icon}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      agent.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      agent.status === 'ready' ? 'bg-blue-500/20 text-blue-300' :
                      agent.status === 'beta' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {agent.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-purple-400">
                    {agent.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    {agent.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Performance:</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Efficiency:</span>
                        <span className="text-green-400">{agent.performance.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cultural:</span>
                        <span className="text-blue-400">{agent.performance.culturalIntelligence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Educational:</span>
                        <span className="text-purple-400">{agent.performance.educationalValue}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Coordination:</span>
                        <span className="text-orange-400">{agent.performance.coordinationScore}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Models:</strong> {agent.models.join(', ')}
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong>Tasks Completed:</strong> {agent.tasksCompleted}
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong>Last Activity:</strong> {agent.lastActivity}
                    </div>
                    {agent.currentTask && (
                      <div className="text-xs text-gray-400">
                        <strong>Current Task:</strong> {agent.currentTask}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Features:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {agent.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {agent.features.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{agent.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {agent.culturalElements && (
                    <div className="flex items-center text-green-400 text-sm">
                      <span className="mr-2">🌿</span>
                      Cultural Elements Included
                    </div>
                  )}
                  
                  {agent.apiKey && (
                    <div className="mt-4 p-2 bg-green-500/10 rounded text-xs text-green-400">
                      <strong>API Key:</strong> {agent.apiKey.substring(0, 20)}...
                    </div>
                  )}
                  
                  {agent.tokens && (
                    <div className="mt-2 p-2 bg-blue-500/10 rounded text-xs text-blue-400">
                      <strong>Tokens:</strong> {agent.tokens}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access Buttons */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/glm-symphony')}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all duration-300"
            >
              🎼 GLM Symphony Orchestra
            </button>
            <button
              onClick={() => navigate('/ai-coordination-maximization')}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300"
            >
              🤖 AI Coordination Maximization
            </button>
            <button
              onClick={() => navigate('/glm-maximization-engine')}
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300"
            >
              🎼 GLM Maximization Engine
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            Phase 2: AI Coordination Maximization - Multi-LLM coordination for perfect harmony
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiLLMCoordinationCenter;
