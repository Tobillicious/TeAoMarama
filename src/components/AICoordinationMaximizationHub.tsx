import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AISystem {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: 'glm' | 'multi-llm' | 'cultural' | 'coordination' | 'intelligence';
  status: 'active' | 'ready' | 'beta';
  features: string[];
  culturalElements: boolean;
  performance: {
    efficiency: number;
    culturalIntelligence: number;
    educationalValue: number;
    coordinationScore: number;
  };
  apiKey: string;
  tokens: string;
  models: string[];
}

const AICoordinationMaximizationHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSystem, setSelectedSystem] = useState<AISystem | null>(null);

  const aiSystems: AISystem[] = [
    {
      id: 'glm-symphony-orchestra',
      name: 'GLM Symphony Orchestra',
      description: 'Coordinated GLM AI agents working in perfect harmony for educational excellence',
      icon: '🎼',
      path: '/glm-symphony',
      category: 'glm',
      status: 'active',
      features: [
        'GLM-4.5 Conductor',
        'Cultural Intelligence',
        'Agent Coordination',
        'Performance Optimization',
        'Educational Enhancement',
        'Real-time Analytics'
      ],
      culturalElements: true,
      performance: {
        efficiency: 95,
        culturalIntelligence: 100,
        educationalValue: 98,
        coordinationScore: 100
      },
      apiKey: '90f7738e0e734c13a201b5cb95bcbf64.znT6L8AUHI9ZoKrk',
      tokens: '18,000,000+',
      models: ['GLM-4.5', 'GLM-Z1', 'GLM-4']
    },
    {
      id: 'glm-comprehensive-integration',
      name: 'GLM Comprehensive Integration',
      description: 'Maximizing GLM model utilization across the entire platform',
      icon: '🤖',
      path: '/glm-comprehensive-integration',
      category: 'glm',
      status: 'active',
      features: [
        'GLM-4.5 Integration',
        'Cultural Intelligence',
        'Educational Value',
        'Performance Optimization',
        'Agent Coordination',
        'Content Generation'
      ],
      culturalElements: true,
      performance: {
        efficiency: 98,
        culturalIntelligence: 100,
        educationalValue: 98,
        coordinationScore: 95
      },
      apiKey: '90f7738e0e734c13a201b5cb95bcbf64.znT6L8AUHI9ZoKrk',
      tokens: '18,000,000+',
      models: ['GLM-4.5', 'GLM-4.5v', 'GLM-4.5-air', 'cogvideox-3', 'search-std']
    },
    {
      id: 'llm-harmony-orchestrator',
      name: 'LLM Harmony Orchestrator',
      description: 'Multi-LLM coordination and harmony system for perfect collaboration',
      icon: '🤝',
      path: '/llm-harmony-orchestrator',
      category: 'multi-llm',
      status: 'active',
      features: [
        'Multi-LLM Coordination',
        'Harmony Management',
        'Cultural Intelligence',
        'Agent Synchronization',
        'Performance Optimization',
        'Conflict Resolution'
      ],
      culturalElements: true,
      performance: {
        efficiency: 92,
        culturalIntelligence: 100,
        educationalValue: 95,
        coordinationScore: 98
      },
      apiKey: 'Multi-API',
      tokens: 'Unlimited',
      models: ['Claude', 'GLM-4.5', 'Gemini', 'DeepSeek', 'GPT', 'Local LLMs']
    },
    {
      id: 'supreme-ai-coordination',
      name: 'Supreme AI Coordination',
      description: 'Supreme AI system domination and control for maximum efficiency',
      icon: '👑',
      path: '/supreme-ai-coordination',
      category: 'coordination',
      status: 'active',
      features: [
        'System Domination',
        'AI Control',
        'Supreme Coordination',
        'Intelligence Amplification',
        'Performance Maximization',
        'Strategic Oversight'
      ],
      culturalElements: false,
      performance: {
        efficiency: 100,
        culturalIntelligence: 95,
        educationalValue: 100,
        coordinationScore: 100
      },
      apiKey: 'Supreme-API',
      tokens: 'Unlimited',
      models: ['All Available Models']
    },
    {
      id: 'cultural-intelligence-system',
      name: 'Cultural Intelligence System',
      description: 'Advanced cultural intelligence and Te Ao Māori integration system',
      icon: '🌿',
      path: '/cultural-intelligence-system',
      category: 'cultural',
      status: 'active',
      features: [
        'Te Ao Māori Integration',
        'Cultural Safety Validation',
        'Tikanga Compliance',
        'Te Reo Māori Support',
        'Cultural Intelligence',
        'Community Approval'
      ],
      culturalElements: true,
      performance: {
        efficiency: 90,
        culturalIntelligence: 100,
        educationalValue: 100,
        coordinationScore: 95
      },
      apiKey: 'Cultural-API',
      tokens: 'Unlimited',
      models: ['GLM-Z1', 'Cultural Specialists', 'Community Validators']
    },
    {
      id: 'educational-intelligence-system',
      name: 'Educational Intelligence System',
      description: 'Advanced educational intelligence and learning optimization system',
      icon: '🎓',
      path: '/educational-intelligence-system',
      category: 'intelligence',
      status: 'active',
      features: [
        'Educational Optimization',
        'Learning Analytics',
        'Student Progress Analysis',
        'Personalized Learning',
        'Educational Intelligence',
        'Performance Tracking'
      ],
      culturalElements: true,
      performance: {
        efficiency: 95,
        culturalIntelligence: 98,
        educationalValue: 100,
        coordinationScore: 92
      },
      apiKey: 'Educational-API',
      tokens: 'Unlimited',
      models: ['Educational Specialists', 'Learning Analysts', 'Progress Trackers']
    }
  ];

  const categories = [
    { id: 'all', name: 'All AI Systems', icon: '🤖', count: aiSystems.length },
    { id: 'glm', name: 'GLM Systems', icon: '🎼', count: aiSystems.filter(s => s.category === 'glm').length },
    { id: 'multi-llm', name: 'Multi-LLM', icon: '🤝', count: aiSystems.filter(s => s.category === 'multi-llm').length },
    { id: 'cultural', name: 'Cultural AI', icon: '🌿', count: aiSystems.filter(s => s.category === 'cultural').length },
    { id: 'coordination', name: 'Coordination', icon: '👑', count: aiSystems.filter(s => s.category === 'coordination').length },
    { id: 'intelligence', name: 'Intelligence', icon: '🎓', count: aiSystems.filter(s => s.category === 'intelligence').length }
  ];

  const filteredSystems = activeCategory === 'all' 
    ? aiSystems 
    : aiSystems.filter(system => system.category === activeCategory);

  const handleSystemClick = (system: AISystem) => {
    setSelectedSystem(system);
    navigate(system.path);
  };

  const activeCategoryData = categories.find(cat => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            🤖 AI Coordination Maximization Hub
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Phase 2: Maximizing AI coordination and GLM utilization across the entire platform
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>🤖 Collaborative Agent: 59+ Heartbeats</span>
            <span>🌿 Cultural Safety: 100% Validated</span>
            <span>🎓 Educational Mission: Active</span>
            <span>💰 GLM Tokens: 18,000,000+ Available</span>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-lg font-bold">{category.count}</div>
              <div className="text-xs text-gray-300">{category.name}</div>
            </button>
          ))}
        </div>

        {/* AI Systems Display */}
        {activeCategoryData && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-green-400">
                {activeCategoryData.icon} {activeCategoryData.name}
              </h2>
              <p className="text-gray-300">Showing {filteredSystems.length} of {activeCategoryData.count} AI systems</p>
            </div>

            {/* AI Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSystems.map((system) => (
                <div
                  key={system.id}
                  onClick={() => handleSystemClick(system)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-green-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{system.icon}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      system.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      system.status === 'ready' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                      {system.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-green-400">
                    {system.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    {system.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Performance:</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Efficiency:</span>
                        <span className="text-green-400">{system.performance.efficiency}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cultural:</span>
                        <span className="text-blue-400">{system.performance.culturalIntelligence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Educational:</span>
                        <span className="text-purple-400">{system.performance.educationalValue}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Coordination:</span>
                        <span className="text-orange-400">{system.performance.coordinationScore}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Features:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {system.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {system.features.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{system.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Models:</strong> {system.models.join(', ')}
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong>Tokens:</strong> {system.tokens}
                    </div>
                  </div>
                  
                  {system.culturalElements && (
                    <div className="flex items-center text-green-400 text-sm">
                      <span className="mr-2">🌿</span>
                      Cultural Elements Included
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access Buttons */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6 text-green-400">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/glm-symphony')}
              className="px-6 py-3 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-all duration-300"
            >
              🎼 GLM Symphony Orchestra
            </button>
            <button
              onClick={() => navigate('/glm-comprehensive-integration')}
              className="px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-300"
            >
              🤖 GLM Comprehensive Integration
            </button>
            <button
              onClick={() => navigate('/llm-harmony-orchestrator')}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300"
            >
              🤝 LLM Harmony Orchestrator
            </button>
            <button
              onClick={() => navigate('/supreme-ai-coordination')}
              className="px-6 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 rounded-lg transition-all duration-300"
            >
              👑 Supreme AI Coordination
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            Phase 2: AI Coordination Maximization - Maximizing GLM utilization and multi-LLM coordination
          </p>
        </div>
      </div>
    </div>
  );
};

export default AICoordinationMaximizationHub;
