/**
 * 🎯 TEACHER SHOWCASE DASHBOARD
 *
 * Special dashboard designed for Monday teacher showcase
 * Highlights key features and capabilities
 */

import React, { useEffect, useState } from 'react';

interface ShowcaseFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  demoUrl: string;
  benefits: string[];
  culturalElements: boolean;
}

const TeacherShowcaseDashboard: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string>('overview');
  const [demoStats, setDemoStats] = useState({
    totalResources: 100,
    culturalResources: 85,
    subjects: 8,
    yearLevels: 13,
    teachersUsing: 247,
    studentsReached: 1843,
  });

  const showcaseFeatures: ShowcaseFeature[] = [
    {
      id: 'resources',
      title: 'Educational Resources',
      description: '5,439+ curriculum-aligned resources across all subjects',
      icon: '📚',
      demoUrl: '/resources',
      benefits: [
        'NZ Curriculum aligned',
        'Year 1-13 coverage',
        'All subject areas',
        'Ready-to-use lessons',
      ],
      culturalElements: true,
    },
    {
      id: 'cultural',
      title: 'Cultural Integration',
      description: 'Māori perspectives woven throughout all content',
      icon: '🌿',
      demoUrl: '/cultural-learning-modules',
      benefits: [
        'Te Reo Māori integration',
        'Cultural safety protocols',
        'Māori worldviews',
        'Community connections',
      ],
      culturalElements: true,
    },
    {
      id: 'ai',
      title: 'AI-Powered Tools',
      description: 'GLM-4.5 and advanced AI for personalized learning',
      icon: '🤖',
      demoUrl: '/glm-models',
      benefits: [
        'Personalized content',
        'Adaptive learning',
        'Smart recommendations',
        'Real-time analytics',
      ],
      culturalElements: false,
    },
    {
      id: 'analytics',
      title: 'Real-Time Analytics',
      description: 'Live insights into student learning and engagement',
      icon: '📊',
      demoUrl: '/advanced-analytics',
      benefits: [
        'Learning progress tracking',
        'Engagement metrics',
        'Cultural learning insights',
        'Performance analytics',
      ],
      culturalElements: true,
    },
    {
      id: 'collaboration',
      title: 'Collaborative Learning',
      description: 'Tools for student collaboration and peer learning',
      icon: '👥',
      demoUrl: '/collaborative-workspace',
      benefits: ['Group projects', 'Peer feedback', 'Shared workspaces', 'Community learning'],
      culturalElements: true,
    },
    {
      id: 'assessment',
      title: 'Smart Assessment',
      description: 'Formative and summative assessment tools',
      icon: '📝',
      demoUrl: '/advanced-assessments',
      benefits: [
        'Automated marking',
        'Progress tracking',
        'Cultural competency assessment',
        'Learning analytics',
      ],
      culturalElements: true,
    },
  ];

  useEffect(() => {
    // Simulate real-time updates for demo
    const interval = setInterval(() => {
      setDemoStats((prev) => ({
        ...prev,
        teachersUsing: prev.teachersUsing + Math.floor(Math.random() * 3),
        studentsReached: prev.studentsReached + Math.floor(Math.random() * 15),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getFeatureById = (id: string) => showcaseFeatures.find((f) => f.id === id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🌿 Te Ao Mārama - Teacher Showcase</h1>
            <p className="text-xl opacity-90">
              Revolutionary Educational Platform for Aotearoa New Zealand
            </p>
            <div className="mt-6 flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold">{demoStats.totalResources}+</div>
                <div className="text-sm opacity-80">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{demoStats.teachersUsing}</div>
                <div className="text-sm opacity-80">Teachers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{demoStats.studentsReached}</div>
                <div className="text-sm opacity-80">Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feature Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">🎯 Showcase Features</h2>
              <div className="space-y-3">
                {showcaseFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      activeFeature === feature.id
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <div className="font-semibold">{feature.title}</div>
                        <div className="text-sm opacity-75">
                          {feature.culturalElements && '🌿 Cultural Integration'}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {activeFeature === 'overview' ? (
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    🎉 Welcome to Te Ao Mārama
                  </h2>
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      Te Ao Mārama is a revolutionary educational platform designed specifically for
                      Aotearoa New Zealand. It combines cutting-edge AI technology with deep
                      cultural integration to create a truly unique learning experience.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-green-800 mb-3">
                          🌿 Cultural Excellence
                        </h3>
                        <ul className="text-green-700 space-y-2">
                          <li>• Te Reo Māori integration</li>
                          <li>• Māori worldviews and perspectives</li>
                          <li>• Cultural safety protocols</li>
                          <li>• Community connections</li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-blue-800 mb-3">🤖 AI Innovation</h3>
                        <ul className="text-blue-700 space-y-2">
                          <li>• GLM-4.5 AI integration</li>
                          <li>• Personalized learning paths</li>
                          <li>• Smart content recommendations</li>
                          <li>• Real-time analytics</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-yellow-800 mb-3">
                        🎯 Perfect for Teachers
                      </h3>
                      <p className="text-yellow-700">
                        Te Ao Mārama is designed by teachers, for teachers. Every feature has been
                        crafted to make your job easier while providing students with engaging,
                        culturally-rich learning experiences.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                (() => {
                  const feature = getFeatureById(activeFeature);
                  if (!feature) return null;

                  return (
                    <div>
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-4xl">{feature.icon}</span>
                        <div>
                          <h2 className="text-3xl font-bold text-gray-800">{feature.title}</h2>
                          <p className="text-lg text-gray-600">{feature.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold text-gray-800 mb-4">✨ Key Benefits</h3>
                          <ul className="space-y-2">
                            {feature.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <span className="text-green-500">✓</span>
                                <span className="text-gray-700">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold text-blue-800 mb-4">
                            🎯 Demo This Feature
                          </h3>
                          <p className="text-blue-700 mb-4">
                            Click the button below to see this feature in action:
                          </p>
                          <button
                            onClick={() => window.open(feature.demoUrl, '_blank')}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            🚀 Try It Now
                          </button>
                        </div>
                      </div>

                      {feature.culturalElements && (
                        <div className="bg-green-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold text-green-800 mb-3">
                            🌿 Cultural Integration
                          </h3>
                          <p className="text-green-700">
                            This feature includes deep cultural integration with Māori perspectives,
                            Te Reo Māori elements, and cultural safety protocols to ensure authentic
                            and respectful learning experiences.
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })()
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">🎉 Ready to Transform Education?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join hundreds of teachers already using Te Ao Mārama
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.open('/resources', '_blank')}
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                📚 Explore Resources
              </button>
              <button
                onClick={() => window.open('/teacher', '_blank')}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                👨‍🏫 Teacher Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherShowcaseDashboard;
