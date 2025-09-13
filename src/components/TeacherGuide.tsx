/**
 * 📚 TEACHER GUIDE
 *
 * Comprehensive guide for teachers using Te Ao Mārama
 * Includes best practices, cultural safety, and platform features
 */

import React, { useState } from 'react';

interface GuideSection {
  id: string;
  title: string;
  icon: string;
  content: React.ReactNode;
}

const TeacherGuide: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('getting-started');

  const guideSections: GuideSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-4">🌿 Welcome to Te Ao Mārama</h3>
            <p className="text-green-700 mb-4">
              Te Ao Mārama is designed to support you in creating culturally-rich, engaging learning
              experiences for your students. This guide will help you make the most of the platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Your Goals</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Create engaging lessons</li>
                  <li>• Integrate Māori perspectives</li>
                  <li>• Track student progress</li>
                  <li>• Build cultural competency</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">✨ Platform Benefits</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• 5,439+ ready-to-use resources</li>
                  <li>• AI-powered personalization</li>
                  <li>• Cultural safety protocols</li>
                  <li>• Real-time analytics</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-4">🎯 Quick Start Checklist</h3>
            <div className="space-y-3">
              {[
                'Explore the resource browser to find content for your subject',
                'Review cultural safety guidelines before using Māori content',
                'Set up your teacher dashboard for personalized experience',
                'Try the AI-powered search to find specific resources',
                'Check out the assessment tools for student evaluation',
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-blue-500">✓</span>
                  <span className="text-blue-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'cultural-safety',
      title: 'Cultural Safety',
      icon: '🌿',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-4">🌿 Cultural Safety Guidelines</h3>
            <p className="text-green-700 mb-4">
              Cultural safety is fundamental to using Te Ao Mārama effectively. These guidelines
              ensure respectful and authentic engagement with Māori content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4">✅ Do's</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Respect Māori protocols and tikanga</li>
                <li>• Use Te Reo Māori correctly and respectfully</li>
                <li>• Acknowledge Māori knowledge and perspectives</li>
                <li>• Connect with local Māori communities</li>
                <li>• Seek guidance from Māori educators</li>
                <li>• Honor the spiritual dimension of learning</li>
                <li>• Practice manaakitanga (hospitality)</li>
                <li>• Build whanaungatanga (relationships)</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4">❌ Don'ts</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Don't appropriate Māori culture</li>
                <li>• Don't use Te Reo Māori incorrectly</li>
                <li>• Don't ignore cultural protocols</li>
                <li>• Don't tokenize Māori perspectives</li>
                <li>• Don't assume cultural knowledge</li>
                <li>• Don't rush cultural learning</li>
                <li>• Don't ignore community input</li>
                <li>• Don't treat culture as decoration</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">🤝 Building Relationships</h3>
            <p className="text-yellow-700 mb-4">
              Authentic cultural integration requires building genuine relationships with Māori
              communities and educators.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🏫 School Level</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Connect with local marae</li>
                  <li>• Engage Māori parents/whānau</li>
                  <li>• Partner with Māori educators</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">👥 Community Level</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Attend community events</li>
                  <li>• Support Māori initiatives</li>
                  <li>• Learn from elders</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🌐 Platform Level</h4>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Use cultural safety features</li>
                  <li>• Engage with Māori content creators</li>
                  <li>• Participate in cultural learning</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'platform-features',
      title: 'Platform Features',
      icon: '⚡',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-4">⚡ Key Platform Features</h3>
            <p className="text-blue-700 mb-4">
              Te Ao Mārama offers powerful tools to enhance your teaching and support student
              learning with cultural integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: '📚 Resource Browser',
                description: 'Access 5,439+ curriculum-aligned resources',
                features: [
                  'Search by subject and year level',
                  'Cultural content filtering',
                  'Quality ratings',
                  'Ready-to-use lessons',
                ],
              },
              {
                title: '🤖 AI-Powered Search',
                description: 'Find exactly what you need with smart search',
                features: [
                  'Natural language queries',
                  'Cultural context understanding',
                  'Personalized recommendations',
                  'Learning path suggestions',
                ],
              },
              {
                title: '📊 Analytics Dashboard',
                description: 'Track student progress and engagement',
                features: [
                  'Real-time progress monitoring',
                  'Cultural competency tracking',
                  'Learning analytics',
                  'Performance insights',
                ],
              },
              {
                title: '👥 Collaboration Tools',
                description: 'Connect with other educators and students',
                features: [
                  'Teacher communities',
                  'Student collaboration',
                  'Resource sharing',
                  'Peer feedback',
                ],
              },
              {
                title: '📝 Assessment Tools',
                description: 'Comprehensive assessment and evaluation',
                features: [
                  'Formative assessments',
                  'Cultural competency evaluation',
                  'Portfolio creation',
                  'Progress tracking',
                ],
              },
              {
                title: '🌿 Cultural Integration',
                description: 'Authentic Māori perspectives and content',
                features: [
                  'Te Reo Māori resources',
                  'Cultural safety protocols',
                  'Māori worldviews',
                  'Community connections',
                ],
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.features.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center space-x-2">
                      <span className="text-green-500">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'best-practices',
      title: 'Best Practices',
      icon: '⭐',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-purple-800 mb-4">⭐ Teaching Best Practices</h3>
            <p className="text-purple-700 mb-4">
              These best practices will help you create engaging, culturally-rich learning
              experiences for your students.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                title: '🎯 Lesson Planning',
                icon: '📋',
                practices: [
                  'Start with learning outcomes that include cultural competency',
                  'Integrate Māori perspectives throughout, not just at the end',
                  'Use authentic Māori resources and community connections',
                  'Plan for different learning styles and cultural backgrounds',
                  'Include assessment that honors cultural ways of knowing',
                ],
              },
              {
                title: '🌿 Cultural Integration',
                icon: '🌿',
                practices: [
                  'Begin with your own cultural competency development',
                  'Use Te Reo Māori respectfully and correctly',
                  "Connect learning to students' cultural backgrounds",
                  'Honor Māori protocols and tikanga in your classroom',
                  'Build relationships with Māori communities and educators',
                ],
              },
              {
                title: '👥 Student Engagement',
                icon: '👥',
                practices: [
                  'Create safe spaces for cultural learning and sharing',
                  'Use collaborative learning approaches',
                  'Encourage student voice and cultural expression',
                  'Provide multiple ways to demonstrate learning',
                  'Celebrate cultural diversity and contributions',
                ],
              },
              {
                title: '📊 Assessment & Evaluation',
                icon: '📊',
                practices: [
                  'Use formative assessment to guide cultural learning',
                  'Include cultural competency in evaluation criteria',
                  'Provide feedback that honors cultural perspectives',
                  'Use portfolios to showcase cultural learning',
                  'Involve students in self-assessment and reflection',
                ],
              },
            ].map((section, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl">{section.icon}</span>
                  <h4 className="text-xl font-bold text-gray-800">{section.title}</h4>
                </div>
                <ul className="space-y-2">
                  {section.practices.map((practice, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="text-gray-700">{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'support',
      title: 'Support & Resources',
      icon: '🆘',
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-800 mb-4">🆘 Getting Help</h3>
            <p className="text-red-700 mb-4">
              We're here to support you in your journey with Te Ao Mārama. Here are the resources
              available to help you succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4">📞 Direct Support</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500">📧</span>
                  <div>
                    <div className="font-semibold">Email Support</div>
                    <div className="text-sm text-gray-600">support@teaoamrama.nz</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">💬</span>
                  <div>
                    <div className="font-semibold">Live Chat</div>
                    <div className="text-sm text-gray-600">Available 9am-5pm NZST</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500">📞</span>
                  <div>
                    <div className="font-semibold">Phone Support</div>
                    <div className="text-sm text-gray-600">0800 TE AO MARAMA</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800 mb-4">📚 Learning Resources</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-orange-500">🎥</span>
                  <div>
                    <div className="font-semibold">Video Tutorials</div>
                    <div className="text-sm text-gray-600">Step-by-step guides</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-indigo-500">📖</span>
                  <div>
                    <div className="font-semibold">Documentation</div>
                    <div className="text-sm text-gray-600">Comprehensive guides</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-pink-500">👥</span>
                  <div>
                    <div className="font-semibold">Teacher Community</div>
                    <div className="text-sm text-gray-600">Peer support and sharing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-800 mb-4">🌿 Cultural Support</h3>
            <p className="text-green-700 mb-4">
              Specialized support for cultural integration and Māori content.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🏫 School Support</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Cultural competency training</li>
                  <li>• Curriculum integration support</li>
                  <li>• Community connection guidance</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">👨‍🏫 Teacher Development</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Te Reo Māori learning</li>
                  <li>• Cultural safety training</li>
                  <li>• Māori pedagogy workshops</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🤝 Community Engagement</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Marae connection support</li>
                  <li>• Whānau engagement</li>
                  <li>• Cultural protocol guidance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const getSectionById = (id: string) => guideSections.find((s) => s.id === id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">📚 Teacher Guide</h1>
            <p className="text-xl opacity-90">
              Your comprehensive guide to using Te Ao Mārama effectively
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold mb-6 text-gray-800">📖 Guide Sections</h2>
              <div className="space-y-2">
                {guideSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-green-100 border-2 border-green-500 text-green-800'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {getSectionById(activeSection)?.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGuide;
