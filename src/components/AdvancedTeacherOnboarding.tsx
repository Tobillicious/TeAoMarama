import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Crown,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

const AdvancedTeacherOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 1,
      title: 'Welcome to TeKeteAkoClient',
      description: 'Your journey to becoming a premium educator starts here',
      icon: <Crown className="h-8 w-8 text-yellow-400" />,
      completed: true,
    },
    {
      id: 2,
      title: 'Explore Premium Resources',
      description: 'Discover 500+ NZ Curriculum aligned lesson plans',
      icon: <BookOpen className="h-8 w-8 text-blue-400" />,
      completed: false,
    },
    {
      id: 3,
      title: 'Join the Community',
      description: 'Connect with 1000+ New Zealand teachers',
      icon: <Users className="h-8 w-8 text-green-400" />,
      completed: false,
    },
    {
      id: 4,
      title: 'Unlock Analytics',
      description: 'Track student progress with advanced insights',
      icon: <TrendingUp className="h-8 w-8 text-purple-400" />,
      completed: false,
    },
    {
      id: 5,
      title: 'Start Your Free Trial',
      description: '14 days of full access to all premium features',
      icon: <Zap className="h-8 w-8 text-orange-400" />,
      completed: false,
    },
  ]);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleStepComplete = (stepId: number) => {
    setSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, completed: true } : step)),
    );

    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const handleStartTrial = () => {
    // Redirect to subscription page
    window.location.href = '/subscription';
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Welcome to the Kingdom!</h1>
            <p className="text-xl text-blue-200 mb-8">
              You're now ready to experience the full power of TeKeteAkoClient
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-white/5 rounded-lg">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Premium Access</p>
                <p className="text-blue-200 text-sm">All features unlocked</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <Award className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-white font-semibold">NZ Curriculum</p>
                <p className="text-blue-200 text-sm">Fully aligned resources</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <Target className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-white font-semibold">Student Success</p>
                <p className="text-blue-200 text-sm">Proven results</p>
              </div>
            </div>
            <button
              onClick={handleStartTrial}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center mx-auto"
            >
              Start Your Free Trial
              <ArrowRight className="h-6 w-6 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Teacher Onboarding</h1>
          <p className="text-xl text-blue-200">
            Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-600 text-gray-300'
                  }`}
                >
                  {step.completed ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="font-bold">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-2 ${step.completed ? 'bg-green-500' : 'bg-gray-600'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <div className="text-center mb-8">
            <div className="mb-4">{currentStepData?.icon}</div>
            <h2 className="text-3xl font-bold text-white mb-4">{currentStepData?.title}</h2>
            <p className="text-xl text-blue-200">{currentStepData?.description}</p>
          </div>

          {/* Step Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {currentStep === 1 && (
              <>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">🎯 Your Mission</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Create engaging lessons for your students</li>
                    <li>• Access premium NZ Curriculum resources</li>
                    <li>• Track student progress with analytics</li>
                    <li>• Connect with the teaching community</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">🏆 What You'll Get</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• 500+ premium lesson plans</li>
                    <li>• Advanced student analytics</li>
                    <li>• Cultural integration tools</li>
                    <li>• 24/7 teacher support</li>
                  </ul>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">📚 Resource Categories</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Mathematics & Statistics</li>
                    <li>• English & Literature</li>
                    <li>• Science & Technology</li>
                    <li>• Social Studies & History</li>
                    <li>• Te Reo Māori & Culture</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">✨ Premium Features</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Interactive multimedia content</li>
                    <li>• Assessment rubrics</li>
                    <li>• Differentiated learning paths</li>
                    <li>• Cultural safety protocols</li>
                  </ul>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">👥 Community Benefits</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Share resources with colleagues</li>
                    <li>• Get feedback on lesson plans</li>
                    <li>• Join subject-specific groups</li>
                    <li>• Attend virtual workshops</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">🤝 Collaboration Tools</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Real-time lesson planning</li>
                    <li>• Peer review system</li>
                    <li>• Resource sharing library</li>
                    <li>• Professional development</li>
                  </ul>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">📊 Analytics Dashboard</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Student progress tracking</li>
                    <li>• Learning outcome analysis</li>
                    <li>• Engagement metrics</li>
                    <li>• Performance predictions</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">🎯 Insights & Reports</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Individual student reports</li>
                    <li>• Class performance summaries</li>
                    <li>• Curriculum coverage tracking</li>
                    <li>• Intervention recommendations</li>
                  </ul>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">🆓 Free Trial Includes</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Full access to all resources</li>
                    <li>• Advanced analytics features</li>
                    <li>• Community participation</li>
                    <li>• Premium support</li>
                  </ul>
                </div>
                <div className="p-6 bg-white/5 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">💳 No Credit Card Required</h3>
                  <ul className="space-y-2 text-blue-200">
                    <li>• Start immediately</li>
                    <li>• Cancel anytime</li>
                    <li>• No hidden fees</li>
                    <li>• Full feature access</li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={() => handleStepComplete(currentStep)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center mx-auto"
            >
              {currentStep === steps.length ? 'Complete Onboarding' : 'Continue'}
              <ArrowRight className="h-6 w-6 ml-2" />
            </button>
          </div>
        </div>

        {/* Benefits Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Premium Quality</h3>
            <p className="text-blue-200">
              NZ Curriculum aligned resources created by expert educators
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Save Time</h3>
            <p className="text-blue-200">
              Reduce lesson planning time by 70% with ready-to-use resources
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Better Outcomes</h3>
            <p className="text-blue-200">Improve student engagement and learning outcomes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTeacherOnboarding;
