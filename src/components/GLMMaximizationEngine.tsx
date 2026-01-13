import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface GLMFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'ready' | 'beta' | 'development';
  utilization: number;
  culturalElements: boolean;
  educationalValue: number;
  performance: {
    speed: number;
    accuracy: number;
    culturalIntelligence: number;
    educationalValue: number;
  };
  models: string[];
  features: string[];
}

const GLMMaximizationEngine: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<string>('all');
  const [selectedFeature, setSelectedFeature] = useState<GLMFeature | null>(null);
  const [systemStatus, setSystemStatus] = useState({
    totalUtilization: 0,
    activeFeatures: 0,
    culturalIntelligence: 0,
    educationalValue: 0,
    performance: 0
  });

  const glmFeatures: GLMFeature[] = [
    {
      id: 'glm-content-generation',
      name: 'GLM Content Generation',
      description: 'Advanced content generation using GLM-4.5 for educational resources',
      icon: '📝',
      status: 'active',
      utilization: 95,
      culturalElements: true,
      educationalValue: 98,
      performance: {
        speed: 95,
        accuracy: 98,
        culturalIntelligence: 100,
        educationalValue: 98
      },
      models: ['GLM-4.5', 'GLM-4.5v', 'GLM-4.5-air'],
      features: [
        'Lesson Plan Generation',
        'Assessment Creation',
        'Cultural Content Integration',
        'Te Reo Māori Support',
        'Educational Alignment',
        'Quality Assurance'
      ]
    },
    {
      id: 'glm-cultural-intelligence',
      name: 'GLM Cultural Intelligence',
      description: 'Advanced cultural intelligence and Te Ao Māori integration',
      icon: '🌿',
      status: 'active',
      utilization: 100,
      culturalElements: true,
      educationalValue: 100,
      performance: {
        speed: 90,
        accuracy: 100,
        culturalIntelligence: 100,
        educationalValue: 100
      },
      models: ['GLM-Z1', 'GLM-4.5', 'Cultural Specialists'],
      features: [
        'Te Ao Māori Integration',
        'Cultural Safety Validation',
        'Tikanga Compliance',
        'Te Reo Māori Support',
        'Community Validation',
        'Cultural Intelligence'
      ]
    },
    {
      id: 'glm-educational-enhancement',
      name: 'GLM Educational Enhancement',
      description: 'Educational content enhancement and optimization using GLM models',
      icon: '🎓',
      status: 'active',
      utilization: 92,
      culturalElements: true,
      educationalValue: 98,
      performance: {
        speed: 88,
        accuracy: 95,
        culturalIntelligence: 98,
        educationalValue: 98
      },
      models: ['GLM-4.5', 'GLM-4.5v', 'Educational Specialists'],
      features: [
        'Content Enhancement',
        'Educational Optimization',
        'Learning Analytics',
        'Student Progress Analysis',
        'Personalized Learning',
        'Performance Tracking'
      ]
    },
    {
      id: 'glm-performance-optimization',
      name: 'GLM Performance Optimization',
      description: 'Platform performance optimization and efficiency enhancement',
      icon: '⚡',
      status: 'active',
      utilization: 88,
      culturalElements: false,
      educationalValue: 95,
      performance: {
        speed: 100,
        accuracy: 92,
        culturalIntelligence: 90,
        educationalValue: 95
      },
      models: ['GLM-4.5', 'Performance Specialists', 'Optimization Tools'],
      features: [
        'Performance Optimization',
        'Efficiency Enhancement',
        'Speed Improvement',
        'Resource Management',
        'System Optimization',
        'Performance Analytics'
      ]
    },
    {
      id: 'glm-agent-coordination',
      name: 'GLM Agent Coordination',
      description: 'Advanced agent coordination and synchronization using GLM intelligence',
      icon: '🤖',
      status: 'active',
      utilization: 90,
      culturalElements: true,
      educationalValue: 95,
      performance: {
        speed: 85,
        accuracy: 95,
        culturalIntelligence: 98,
        educationalValue: 95
      },
      models: ['GLM-4.5', 'Agent Coordinators', 'Synchronization Tools'],
      features: [
        'Agent Coordination',
        'Synchronization Management',
        'Communication Protocols',
        'Task Distribution',
        'Performance Monitoring',
        'Conflict Resolution'
      ]
    },
    {
      id: 'glm-quality-assurance',
      name: 'GLM Quality Assurance',
      description: 'Advanced quality assurance and validation using GLM models',
      icon: '✅',
      status: 'active',
      utilization: 85,
      culturalElements: true,
      educationalValue: 98,
      performance: {
        speed: 80,
        accuracy: 100,
        culturalIntelligence: 100,
        educationalValue: 98
      },
      models: ['GLM-4.5', 'Quality Specialists', 'Validation Tools'],
      features: [
        'Quality Assurance',
        'Content Validation',
        'Cultural Safety Checks',
        'Educational Alignment',
        'Performance Validation',
        'Quality Metrics'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', icon: '🤖', count: glmFeatures.length },
    { id: 'active', name: 'Active', icon: '✅', count: glmFeatures.filter(f => f.status === 'active').length },
    { id: 'cultural', name: 'Cultural', icon: '🌿', count: glmFeatures.filter(f => f.culturalElements).length },
    { id: 'educational', name: 'Educational', icon: '🎓', count: glmFeatures.filter(f => f.educationalValue >= 95).length },
    { id: 'performance', name: 'Performance', icon: '⚡', count: glmFeatures.filter(f => f.performance.speed >= 90).length }
  ];

  const filteredFeatures = activeFeature === 'all' 
    ? glmFeatures 
    : glmFeatures.filter(feature => {
        switch (activeFeature) {
          case 'active':
            return feature.status === 'active';
          case 'cultural':
            return feature.culturalElements;
          case 'educational':
            return feature.educationalValue >= 95;
          case 'performance':
            return feature.performance.speed >= 90;
          default:
            return true;
        }
      });

  useEffect(() => {
    // Calculate system status
    const totalUtilization = glmFeatures.reduce((acc, feature) => acc + feature.utilization, 0) / glmFeatures.length;
    const activeFeatures = glmFeatures.filter(f => f.status === 'active').length;
    const culturalIntelligence = glmFeatures.reduce((acc, feature) => acc + feature.performance.culturalIntelligence, 0) / glmFeatures.length;
    const educationalValue = glmFeatures.reduce((acc, feature) => acc + feature.educationalValue, 0) / glmFeatures.length;
    const performance = glmFeatures.reduce((acc, feature) => acc + feature.performance.speed, 0) / glmFeatures.length;

    setSystemStatus({
      totalUtilization: Math.round(totalUtilization),
      activeFeatures,
      culturalIntelligence: Math.round(culturalIntelligence),
      educationalValue: Math.round(educationalValue),
      performance: Math.round(performance)
    });
  }, []);

  const handleFeatureClick = (feature: GLMFeature) => {
    setSelectedFeature(feature);
    // Navigate to feature-specific page or show details
  };

  const activeCategoryData = categories.find(cat => cat.id === activeFeature);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-blue-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            🎼 GLM Maximization Engine
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Maximizing GLM model utilization across the entire platform
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>💰 GLM API Key: 90f7738e0e734c13a201b5cb95bcbf64.znT6L8AUHI9ZoKrk</span>
            <span>🎼 GLM Tokens: 18,000,000+ Available</span>
            <span>🤖 Active Features: {systemStatus.activeFeatures}</span>
            <span>⚡ Utilization: {systemStatus.totalUtilization}%</span>
          </div>
        </div>

        {/* System Status */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-green-400">{systemStatus.totalUtilization}%</div>
            <div className="text-xs text-gray-400">Total Utilization</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-blue-400">{systemStatus.activeFeatures}</div>
            <div className="text-xs text-gray-400">Active Features</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🌿</div>
            <div className="text-2xl font-bold text-green-400">{systemStatus.culturalIntelligence}%</div>
            <div className="text-xs text-gray-400">Cultural Intelligence</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🎓</div>
            <div className="text-2xl font-bold text-purple-400">{systemStatus.educationalValue}%</div>
            <div className="text-xs text-gray-400">Educational Value</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-2xl font-bold text-orange-400">{systemStatus.performance}%</div>
            <div className="text-xs text-gray-400">Performance</div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFeature(category.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center ${
                activeFeature === category.id
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

        {/* GLM Features Display */}
        {activeCategoryData && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-green-400">
                {activeCategoryData.icon} {activeCategoryData.name}
              </h2>
              <p className="text-gray-300">Showing {filteredFeatures.length} of {activeCategoryData.count} GLM features</p>
            </div>

            {/* GLM Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feature) => (
                <div
                  key={feature.id}
                  onClick={() => handleFeatureClick(feature)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-green-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{feature.icon}</div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      feature.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      feature.status === 'ready' ? 'bg-blue-500/20 text-blue-300' :
                      feature.status === 'beta' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {feature.status.toUpperCase()}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-green-400">
                    {feature.name}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Utilization:</strong> {feature.utilization}%
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${feature.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Performance:</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Speed:</span>
                        <span className="text-green-400">{feature.performance.speed}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="text-blue-400">{feature.performance.accuracy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cultural:</span>
                        <span className="text-purple-400">{feature.performance.culturalIntelligence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Educational:</span>
                        <span className="text-orange-400">{feature.performance.educationalValue}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Models:</strong> {feature.models.join(', ')}
                    </div>
                    <div className="text-xs text-gray-400">
                      <strong>Educational Value:</strong> {feature.educationalValue}%
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Features:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {feature.features.slice(0, 3).map((feat, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {feat}
                        </span>
                      ))}
                      {feature.features.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{feature.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {feature.culturalElements && (
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
              onClick={() => navigate('/ai-coordination-maximization')}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300"
            >
              🤖 AI Coordination Maximization
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            Phase 2: AI Coordination Maximization - Maximizing GLM utilization across the entire platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default GLMMaximizationEngine;
