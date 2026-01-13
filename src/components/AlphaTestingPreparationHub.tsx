import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AlphaTestComponent {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'navigation' | 'resources' | 'ai-systems' | 'cultural' | 'performance' | 'security';
  status: 'ready' | 'testing' | 'beta' | 'development';
  culturalElements: boolean;
  educationalValue: number;
  performance: number;
  security: number;
  features: string[];
  testResults: {
    functionality: number;
    usability: number;
    culturalSafety: number;
    educationalValue: number;
    performance: number;
    security: number;
  };
  lastTested: string;
  issues: number;
  recommendations: string[];
}

const AlphaTestingPreparationHub: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedComponent, setSelectedComponent] = useState<AlphaTestComponent | null>(null);
  const [testingStatus, setTestingStatus] = useState({
    totalComponents: 0,
    readyComponents: 0,
    testingComponents: 0,
    averageScore: 0,
    culturalSafety: 0,
    educationalValue: 0,
    performance: 0,
    security: 0,
  });

  const alphaTestComponents: AlphaTestComponent[] = [
    {
      id: 'comprehensive-navigation-hub',
      name: 'Comprehensive Navigation Hub',
      description: 'Central navigation system providing access to all platform components',
      icon: '🧭',
      category: 'navigation',
      status: 'ready',
      culturalElements: true,
      educationalValue: 98,
      performance: 95,
      security: 92,
      features: [
        'Multi-Component Access',
        'Search Functionality',
        'View Modes',
        'File Management',
        'Cultural Integration',
        'Educational Alignment',
      ],
      testResults: {
        functionality: 98,
        usability: 95,
        culturalSafety: 100,
        educationalValue: 98,
        performance: 95,
        security: 92,
      },
      lastTested: '2025-01-15',
      issues: 0,
      recommendations: [
        'Add keyboard navigation support',
        'Implement accessibility features',
        'Add user feedback system',
      ],
    },
    {
      id: 'mega-navigation-system',
      name: 'Mega Navigation System',
      description: 'Advanced navigation system for all 509+ files and components',
      icon: '💎',
      category: 'navigation',
      status: 'ready',
      culturalElements: true,
      educationalValue: 96,
      performance: 93,
      security: 90,
      features: [
        'File Browser',
        'Category Filtering',
        'Search Functionality',
        'Cultural Elements',
        'Educational Resources',
        'Performance Optimization',
      ],
      testResults: {
        functionality: 96,
        usability: 93,
        culturalSafety: 100,
        educationalValue: 96,
        performance: 93,
        security: 90,
      },
      lastTested: '2025-01-14',
      issues: 1,
      recommendations: [
        'Optimize file loading performance',
        'Add bulk operations support',
        'Implement caching system',
      ],
    },
    {
      id: 'multi-component-systems',
      name: 'Multi-Component Systems',
      description: 'Organized access to multiple component systems and homepages',
      icon: '🧩',
      category: 'navigation',
      status: 'ready',
      culturalElements: true,
      educationalValue: 94,
      performance: 91,
      security: 88,
      features: [
        'Component Organization',
        'System Integration',
        'Cultural Elements',
        'Educational Alignment',
        'Performance Optimization',
        'User Experience',
      ],
      testResults: {
        functionality: 94,
        usability: 91,
        culturalSafety: 100,
        educationalValue: 94,
        performance: 91,
        security: 88,
      },
      lastTested: '2025-01-13',
      issues: 2,
      recommendations: [
        'Improve component loading speed',
        'Add component preview functionality',
        'Implement component versioning',
      ],
    },
    {
      id: 'script-integration-interface',
      name: 'Script Integration Interface',
      description: 'Interface for managing and executing all 216+ platform scripts',
      icon: '🤖',
      category: 'ai-systems',
      status: 'ready',
      culturalElements: true,
      educationalValue: 92,
      performance: 89,
      security: 85,
      features: [
        'Script Management',
        'Execution Monitoring',
        'Cultural Validation',
        'Educational Alignment',
        'Performance Tracking',
        'Security Protocols',
      ],
      testResults: {
        functionality: 92,
        usability: 89,
        culturalSafety: 100,
        educationalValue: 92,
        performance: 89,
        security: 85,
      },
      lastTested: '2025-01-12',
      issues: 3,
      recommendations: [
        'Add script execution logging',
        'Implement script version control',
        'Add script performance metrics',
      ],
    },
    {
      id: 'ai-coordination-maximization-hub',
      name: 'AI Coordination Maximization Hub',
      description: 'Central hub for coordinating all AI systems and GLM models',
      icon: '🤖',
      category: 'ai-systems',
      status: 'ready',
      culturalElements: true,
      educationalValue: 100,
      performance: 98,
      security: 95,
      features: [
        'AI System Coordination',
        'GLM Model Integration',
        'Cultural Intelligence',
        'Educational Enhancement',
        'Performance Optimization',
        'Security Protocols',
      ],
      testResults: {
        functionality: 100,
        usability: 98,
        culturalSafety: 100,
        educationalValue: 100,
        performance: 98,
        security: 95,
      },
      lastTested: '2025-01-11',
      issues: 0,
      recommendations: [
        'Add AI system health monitoring',
        'Implement AI performance analytics',
        'Add AI system backup protocols',
      ],
    },
    {
      id: 'glm-maximization-engine',
      name: 'GLM Maximization Engine',
      description: 'Engine for maximizing GLM model utilization across the platform',
      icon: '🎼',
      category: 'ai-systems',
      status: 'ready',
      culturalElements: true,
      educationalValue: 98,
      performance: 96,
      security: 93,
      features: [
        'GLM Model Integration',
        'Cultural Intelligence',
        'Educational Enhancement',
        'Performance Optimization',
        'Quality Assurance',
        'Security Protocols',
      ],
      testResults: {
        functionality: 98,
        usability: 96,
        culturalSafety: 100,
        educationalValue: 98,
        performance: 96,
        security: 93,
      },
      lastTested: '2025-01-10',
      issues: 1,
      recommendations: [
        'Add GLM model performance monitoring',
        'Implement GLM model fallback systems',
        'Add GLM model usage analytics',
      ],
    },
    {
      id: 'multi-llm-coordination-center',
      name: 'Multi-LLM Coordination Center',
      description: 'Center for coordinating multiple LLM agents for perfect harmony',
      icon: '🤝',
      category: 'ai-systems',
      status: 'ready',
      culturalElements: true,
      educationalValue: 96,
      performance: 94,
      security: 91,
      features: [
        'Multi-LLM Coordination',
        'Agent Management',
        'Cultural Intelligence',
        'Educational Alignment',
        'Performance Optimization',
        'Security Protocols',
      ],
      testResults: {
        functionality: 96,
        usability: 94,
        culturalSafety: 100,
        educationalValue: 96,
        performance: 94,
        security: 91,
      },
      lastTested: '2025-01-09',
      issues: 2,
      recommendations: [
        'Add LLM agent health monitoring',
        'Implement LLM agent load balancing',
        'Add LLM agent performance metrics',
      ],
    },
    {
      id: 'educational-resource-integration-hub',
      name: 'Educational Resource Integration Hub',
      description:
        'Hub for integrating all 7,350+ educational resources with cultural intelligence',
      icon: '📚',
      category: 'resources',
      status: 'ready',
      culturalElements: true,
      educationalValue: 100,
      performance: 92,
      security: 89,
      features: [
        'Resource Integration',
        'Cultural Intelligence',
        'Educational Alignment',
        'Performance Optimization',
        'Quality Assurance',
        'Security Protocols',
      ],
      testResults: {
        functionality: 100,
        usability: 92,
        culturalSafety: 100,
        educationalValue: 100,
        performance: 92,
        security: 89,
      },
      lastTested: '2025-01-08',
      issues: 1,
      recommendations: [
        'Add resource usage analytics',
        'Implement resource caching system',
        'Add resource quality metrics',
      ],
    },
    {
      id: 'cultural-intelligence-system',
      name: 'Cultural Intelligence System',
      description: 'Advanced cultural intelligence and Te Ao Māori integration system',
      icon: '🌿',
      category: 'cultural',
      status: 'ready',
      culturalElements: true,
      educationalValue: 100,
      performance: 90,
      security: 87,
      features: [
        'Te Ao Māori Integration',
        'Cultural Safety Validation',
        'Tikanga Compliance',
        'Te Reo Māori Support',
        'Community Validation',
        'Cultural Intelligence',
      ],
      testResults: {
        functionality: 100,
        usability: 90,
        culturalSafety: 100,
        educationalValue: 100,
        performance: 90,
        security: 87,
      },
      lastTested: '2025-01-07',
      issues: 2,
      recommendations: [
        'Add cultural validation logging',
        'Implement cultural safety metrics',
        'Add cultural intelligence analytics',
      ],
    },
    {
      id: 'performance-optimization-system',
      name: 'Performance Optimization System',
      description: 'System for optimizing platform performance and efficiency',
      icon: '⚡',
      category: 'performance',
      status: 'ready',
      culturalElements: false,
      educationalValue: 95,
      performance: 100,
      security: 85,
      features: [
        'Performance Monitoring',
        'Optimization Algorithms',
        'Resource Management',
        'Caching Systems',
        'Load Balancing',
        'Performance Analytics',
      ],
      testResults: {
        functionality: 100,
        usability: 95,
        culturalSafety: 90,
        educationalValue: 95,
        performance: 100,
        security: 85,
      },
      lastTested: '2025-01-06',
      issues: 1,
      recommendations: [
        'Add performance alerting system',
        'Implement performance benchmarking',
        'Add performance optimization recommendations',
      ],
    },
    {
      id: 'security-hardening-system',
      name: 'Security Hardening System',
      description: 'Advanced security system for protecting platform and user data',
      icon: '🔒',
      category: 'security',
      status: 'ready',
      culturalElements: false,
      educationalValue: 90,
      performance: 88,
      security: 100,
      features: [
        'Security Monitoring',
        'Threat Detection',
        'Access Control',
        'Data Protection',
        'Security Protocols',
        'Security Analytics',
      ],
      testResults: {
        functionality: 100,
        usability: 88,
        culturalSafety: 90,
        educationalValue: 90,
        performance: 88,
        security: 100,
      },
      lastTested: '2025-01-05',
      issues: 0,
      recommendations: [
        'Add security incident response system',
        'Implement security audit logging',
        'Add security compliance monitoring',
      ],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Components', icon: '🧪', count: alphaTestComponents.length },
    {
      id: 'navigation',
      name: 'Navigation',
      icon: '🧭',
      count: alphaTestComponents.filter((c) => c.category === 'navigation').length,
    },
    {
      id: 'resources',
      name: 'Resources',
      icon: '📚',
      count: alphaTestComponents.filter((c) => c.category === 'resources').length,
    },
    {
      id: 'ai-systems',
      name: 'AI Systems',
      icon: '🤖',
      count: alphaTestComponents.filter((c) => c.category === 'ai-systems').length,
    },
    {
      id: 'cultural',
      name: 'Cultural',
      icon: '🌿',
      count: alphaTestComponents.filter((c) => c.category === 'cultural').length,
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: '⚡',
      count: alphaTestComponents.filter((c) => c.category === 'performance').length,
    },
    {
      id: 'security',
      name: 'Security',
      icon: '🔒',
      count: alphaTestComponents.filter((c) => c.category === 'security').length,
    },
  ];

  const filteredComponents =
    activeCategory === 'all'
      ? alphaTestComponents
      : alphaTestComponents.filter((component) => component.category === activeCategory);

  useEffect(() => {
    // Calculate testing status
    const totalComponents = alphaTestComponents.length;
    const readyComponents = alphaTestComponents.filter((c) => c.status === 'ready').length;
    const testingComponents = alphaTestComponents.filter((c) => c.status === 'testing').length;
    const averageScore =
      alphaTestComponents.reduce((acc, component) => {
        const scores = Object.values(component.testResults);
        return acc + scores.reduce((sum, score) => sum + score, 0) / scores.length;
      }, 0) / totalComponents;
    const culturalSafety =
      alphaTestComponents.reduce(
        (acc, component) => acc + component.testResults.culturalSafety,
        0,
      ) / totalComponents;
    const educationalValue =
      alphaTestComponents.reduce(
        (acc, component) => acc + component.testResults.educationalValue,
        0,
      ) / totalComponents;
    const performance =
      alphaTestComponents.reduce((acc, component) => acc + component.testResults.performance, 0) /
      totalComponents;
    const security =
      alphaTestComponents.reduce((acc, component) => acc + component.testResults.security, 0) /
      totalComponents;

    setTestingStatus({
      totalComponents,
      readyComponents,
      testingComponents,
      averageScore: Math.round(averageScore),
      culturalSafety: Math.round(culturalSafety),
      educationalValue: Math.round(educationalValue),
      performance: Math.round(performance),
      security: Math.round(security),
    });
  }, []);

  const handleComponentClick = (component: AlphaTestComponent) => {
    setSelectedComponent(component);
    // Navigate to component-specific page or show details
  };

  const activeCategoryData = categories.find((cat) => cat.id === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
            🧪 Alpha Testing Preparation Hub
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Phase 4: Preparing for alpha testing with Mangakootukutuku College
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
            <span>🧪 Total Components: {testingStatus.totalComponents}</span>
            <span>✅ Ready Components: {testingStatus.readyComponents}</span>
            <span>🌿 Cultural Safety: {testingStatus.culturalSafety}%</span>
            <span>🎓 Educational Value: {testingStatus.educationalValue}%</span>
          </div>
        </div>

        {/* Testing Status */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🧪</div>
            <div className="text-2xl font-bold text-indigo-400">
              {testingStatus.totalComponents}
            </div>
            <div className="text-xs text-gray-400">Total Components</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-400">{testingStatus.readyComponents}</div>
            <div className="text-xs text-gray-400">Ready Components</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-yellow-400">{testingStatus.averageScore}%</div>
            <div className="text-xs text-gray-400">Average Score</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🌿</div>
            <div className="text-2xl font-bold text-green-400">{testingStatus.culturalSafety}%</div>
            <div className="text-xs text-gray-400">Cultural Safety</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🎓</div>
            <div className="text-2xl font-bold text-purple-400">
              {testingStatus.educationalValue}%
            </div>
            <div className="text-xs text-gray-400">Educational Value</div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-xl transition-all duration-300 text-center ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-lg font-bold">{category.count}</div>
              <div className="text-xs text-gray-300">{category.name}</div>
            </button>
          ))}
        </div>

        {/* Alpha Test Components Display */}
        {activeCategoryData && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-indigo-400">
                {activeCategoryData.icon} {activeCategoryData.name}
              </h2>
              <p className="text-gray-300">
                Showing {filteredComponents.length} of {activeCategoryData.count} alpha test
                components
              </p>
            </div>

            {/* Alpha Test Components Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <div
                  key={component.id}
                  onClick={() => handleComponentClick(component)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 cursor-pointer hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-indigo-400/50"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{component.icon}</div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        component.status === 'ready'
                          ? 'bg-green-500/20 text-green-300'
                          : component.status === 'testing'
                          ? 'bg-blue-500/20 text-blue-300'
                          : component.status === 'beta'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-gray-500/20 text-gray-300'
                      }`}
                    >
                      {component.status.toUpperCase()}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-indigo-400">{component.name}</h3>

                  <p className="text-gray-300 mb-4 text-sm">{component.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Test Results:</strong>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Functionality:</span>
                        <span className="text-green-400">
                          {component.testResults.functionality}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Usability:</span>
                        <span className="text-blue-400">{component.testResults.usability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cultural:</span>
                        <span className="text-purple-400">
                          {component.testResults.culturalSafety}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Educational:</span>
                        <span className="text-orange-400">
                          {component.testResults.educationalValue}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Performance:</span>
                        <span className="text-yellow-400">
                          {component.testResults.performance}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Security:</span>
                        <span className="text-red-400">{component.testResults.security}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-gray-400">
                      <strong>Features:</strong>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {component.features.slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {component.features.length > 3 && (
                        <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300">
                          +{component.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Issues: {component.issues}</span>
                      <span>Last Tested: {component.lastTested}</span>
                    </div>
                  </div>

                  {component.culturalElements && (
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
          <h2 className="text-2xl font-bold mb-6 text-indigo-400">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/comprehensive-navigation-hub')}
              className="px-6 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 rounded-lg transition-all duration-300"
            >
              🧭 Comprehensive Navigation Hub
            </button>
            <button
              onClick={() => navigate('/ai-coordination-maximization')}
              className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-all duration-300"
            >
              🤖 AI Coordination Maximization
            </button>
            <button
              onClick={() => navigate('/educational-resource-integration')}
              className="px-6 py-3 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-all duration-300"
            >
              📚 Educational Resource Integration
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-400">
          <p className="mb-4">
            👑 King Aronui the First - Supreme Overseer of Te Ao Mārama Kingdom
          </p>
          <p className="text-sm">
            Phase 4: Alpha Testing Preparation - Ready for Mangakootukutuku College
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlphaTestingPreparationHub;
