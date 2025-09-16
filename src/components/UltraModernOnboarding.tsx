import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Crown,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UltraModernOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = [
    {
      id: 1,
      title: 'Welcome to the Future of Teaching',
      subtitle: 'Your journey to educational excellence starts here',
      icon: <Crown className="h-16 w-16 text-yellow-400" />,
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-lg mb-4">
              <Sparkles className="h-6 w-6 mr-2" />
              Join 1,000+ NZ Teachers
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">🎯 Your Mission</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Create engaging, culturally-rich lessons</li>
                <li>• Access premium NZ Curriculum resources</li>
                <li>• Track student progress with AI insights</li>
                <li>• Connect with the teaching community</li>
              </ul>
            </div>
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">🏆 What You'll Get</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• 500+ premium lesson plans</li>
                <li>• Advanced student analytics</li>
                <li>• Cultural integration tools</li>
                <li>• 24/7 teacher support</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Discover Premium Resources',
      subtitle: '500+ NZ Curriculum aligned lesson plans at your fingertips',
      icon: <BookOpen className="h-16 w-16 text-blue-400" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">📚 Resource Categories</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Mathematics & Statistics</li>
                <li>• English & Literature</li>
                <li>• Science & Technology</li>
                <li>• Social Studies & History</li>
                <li>• Te Reo Māori & Culture</li>
              </ul>
            </div>
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">✨ Premium Features</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Interactive multimedia content</li>
                <li>• Assessment rubrics</li>
                <li>• Differentiated learning paths</li>
                <li>• Cultural safety protocols</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg">
              <BookOpen className="h-6 w-6 mr-2" />
              Explore Resources Now
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Join the Community',
      subtitle: 'Connect with 1,000+ New Zealand teachers',
      icon: <Users className="h-16 w-16 text-green-400" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">👥 Community Benefits</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Share resources with colleagues</li>
                <li>• Get feedback on lesson plans</li>
                <li>• Join subject-specific groups</li>
                <li>• Attend virtual workshops</li>
              </ul>
            </div>
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">🤝 Collaboration Tools</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Real-time lesson planning</li>
                <li>• Peer review system</li>
                <li>• Resource sharing library</li>
                <li>• Professional development</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-full text-white font-bold text-lg">
              <Users className="h-6 w-6 mr-2" />
              Join the Community
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Unlock Analytics',
      subtitle: 'Track student progress with advanced AI insights',
      icon: <TrendingUp className="h-16 w-16 text-purple-400" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">📊 Analytics Dashboard</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Student progress tracking</li>
                <li>• Learning outcome analysis</li>
                <li>• Engagement metrics</li>
                <li>• Performance predictions</li>
              </ul>
            </div>
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">🎯 Insights & Reports</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Individual student reports</li>
                <li>• Class performance summaries</li>
                <li>• Curriculum coverage tracking</li>
                <li>• Intervention recommendations</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold text-lg">
              <TrendingUp className="h-6 w-6 mr-2" />
              View Analytics Demo
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Start Your Free Trial',
      subtitle: '14 days of full access to all premium features',
      icon: <Zap className="h-16 w-16 text-orange-400" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">🆓 Free Trial Includes</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Full access to all resources</li>
                <li>• Advanced analytics features</li>
                <li>• Community participation</li>
                <li>• Premium support</li>
              </ul>
            </div>
            <div className="p-6 bg-white/10 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-3">💳 No Credit Card Required</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Start immediately</li>
                <li>• Cancel anytime</li>
                <li>• No hidden fees</li>
                <li>• Full feature access</li>
              </ul>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={() => setShowSuccess(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-full font-bold text-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 flex items-center mx-auto"
            >
              <Zap className="h-8 w-8 mr-3" />
              Start Your Free Trial
              <ArrowRight className="h-8 w-8 ml-3" />
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handleStartTrial = () => {
    navigate('/subscription');
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
            <div className="mb-8">
              <CheckCircle className="h-24 w-24 text-green-400 mx-auto mb-6" />
              <h1 className="text-5xl font-bold text-white mb-4">Welcome to the Kingdom!</h1>
              <p className="text-2xl text-blue-200 mb-8">
                You're now ready to experience the full power of TeKeteAkoClient
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-6 bg-white/5 rounded-xl">
                <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Premium Access</h3>
                <p className="text-blue-200">All features unlocked</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl">
                <Award className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">NZ Curriculum</h3>
                <p className="text-blue-200">Fully aligned resources</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl">
                <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Student Success</h3>
                <p className="text-blue-200">Proven results</p>
              </div>
            </div>

            <button
              onClick={handleStartTrial}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-6 rounded-full font-bold text-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center mx-auto"
            >
              <Crown className="h-8 w-8 mr-3" />
              Start Your Free Trial
              <ArrowRight className="h-8 w-8 ml-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Ultra Modern Onboarding</h1>
          <p className="text-2xl text-blue-200">
            Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    step.id <= currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle className="h-8 w-8" />
                  ) : (
                    <span className="font-bold text-lg">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-20 h-2 mx-4 rounded-full ${
                      step.id < currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-12">
          <div className="text-center mb-12">
            <div className="mb-6">{currentStepData?.icon}</div>
            <h2 className="text-4xl font-bold text-white mb-4">{currentStepData?.title}</h2>
            <p className="text-2xl text-blue-200">{currentStepData?.subtitle}</p>
          </div>

          {/* Step Content */}
          <div className="mb-12">{currentStepData?.content}</div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-6 rounded-full font-bold text-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center mx-auto"
            >
              {currentStep === steps.length ? 'Complete Onboarding' : 'Continue'}
              <ArrowRight className="h-8 w-8 ml-3" />
            </button>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <Star className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Premium Quality</h3>
            <p className="text-blue-200 text-lg">
              NZ Curriculum aligned resources created by expert educators
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <Zap className="h-16 w-16 text-orange-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Save Time</h3>
            <p className="text-blue-200 text-lg">
              Reduce lesson planning time by 70% with ready-to-use resources
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
            <TrendingUp className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Better Outcomes</h3>
            <p className="text-blue-200 text-lg">
              Improve student engagement and learning outcomes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraModernOnboarding;
