import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Star, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Clock,
  Target,
  Zap,
  Heart,
  Shield,
  Globe,
  ArrowRight,
  Play,
  Download
} from 'lucide-react';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  action: string;
}

interface TeacherProfile {
  name: string;
  school: string;
  subjects: string[];
  experience: string;
  goals: string[];
  challenges: string[];
}

const ConversionOptimizedOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>({
    name: '',
    school: '',
    subjects: [],
    experience: '',
    goals: [],
    challenges: []
  });
  const [showPricing, setShowPricing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: "Welcome to TeKeteAkoClient",
      description: "The most comprehensive NZ teaching platform",
      icon: <Heart className="h-8 w-8 text-red-500" />,
      completed: currentStep > 0,
      action: "Get Started"
    },
    {
      id: 2,
      title: "Tell us about yourself",
      description: "Help us personalize your experience",
      icon: <Users className="h-8 w-8 text-blue-500" />,
      completed: currentStep > 1,
      action: "Continue"
    },
    {
      id: 3,
      title: "Your teaching goals",
      description: "What do you want to achieve?",
      icon: <Target className="h-8 w-8 text-green-500" />,
      completed: currentStep > 2,
      action: "Next"
    },
    {
      id: 4,
      title: "Choose your plan",
      description: "Unlock your teaching potential",
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      completed: currentStep > 3,
      action: "Select Plan"
    }
  ];

  const subjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 
    'Te Reo Māori', 'Art', 'Music', 'Physical Education',
    'Technology', 'Health', 'Other'
  ];

  const experienceLevels = [
    'New Teacher (0-2 years)',
    'Experienced (3-10 years)',
    'Senior Teacher (10+ years)',
    'Principal/Leadership'
  ];

  const goals = [
    'Improve student engagement',
    'Save time on lesson planning',
    'Access quality NZ resources',
    'Track student progress',
    'Connect with other teachers',
    'Develop cultural competency',
    'Enhance assessment practices',
    'Integrate technology effectively'
  ];

  const challenges = [
    'Finding quality resources',
    'Time management',
    'Student engagement',
    'Assessment workload',
    'Cultural integration',
    'Technology barriers',
    'Curriculum alignment',
    'Parent communication'
  ];

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individual teachers',
      features: [
        'Access to 100+ lesson plans',
        'Basic analytics dashboard',
        'Email support',
        'Mobile app access',
        'Resource downloads'
      ],
      popular: false,
      cta: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$49',
      period: '/month',
      description: 'Most popular for active teachers',
      features: [
        'Everything in Starter',
        '500+ premium resources',
        'Advanced analytics',
        'Priority support',
        'Collaboration tools',
        'Custom assessments',
        'Progress tracking'
      ],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      id: 'school',
      name: 'School',
      price: '$199',
      period: '/month',
      description: 'For entire schools and departments',
      features: [
        'Everything in Professional',
        'Unlimited teachers',
        'School-wide analytics',
        'Custom branding',
        'Dedicated support',
        'Bulk user management',
        'Advanced reporting',
        'API access'
      ],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowPricing(true);
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setTeacherProfile(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setTeacherProfile(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleChallengeToggle = (challenge: string) => {
    setTeacherProfile(prev => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter(c => c !== challenge)
        : [...prev.challenges, challenge]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">
                Welcome to the Future of NZ Education
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of New Zealand teachers who are transforming education with 
                AI-powered tools, culturally-rich resources, and data-driven insights.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
                <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-blue-900 mb-2">500+ Resources</h3>
                <p className="text-blue-700 text-sm">Curriculum-aligned, culturally-rich lesson plans</p>
              </div>
              <div className="p-6 bg-green-50 rounded-xl border border-green-200">
                <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">AI Analytics</h3>
                <p className="text-green-700 text-sm">Track student progress with intelligent insights</p>
              </div>
              <div className="p-6 bg-purple-50 rounded-xl border border-purple-200">
                <Globe className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Te Ao Māori</h3>
                <p className="text-purple-700 text-sm">Deep cultural integration and perspectives</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
              </div>
              <p className="text-gray-700 font-medium">
                "TeKeteAkoClient has transformed how I teach. The resources are incredible and the analytics help me understand my students better than ever."
              </p>
              <p className="text-sm text-gray-600 mt-2">- Sarah M., Year 8 Teacher, Auckland</p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us about yourself</h2>
              <p className="text-gray-600">Help us personalize your teaching experience</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={teacherProfile.name}
                  onChange={(e) => setTeacherProfile(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Name
                </label>
                <input
                  type="text"
                  value={teacherProfile.school}
                  onChange={(e) => setTeacherProfile(prev => ({ ...prev, school: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your school name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teaching Experience
                </label>
                <select
                  value={teacherProfile.experience}
                  onChange={(e) => setTeacherProfile(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select your experience level</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subjects you teach (select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map(subject => (
                    <button
                      key={subject}
                      onClick={() => handleSubjectToggle(subject)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        teacherProfile.subjects.includes(subject)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your teaching goals</h2>
              <p className="text-gray-600">What do you want to achieve with TeKeteAkoClient?</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals (select all that apply)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {goals.map(goal => (
                    <button
                      key={goal}
                      onClick={() => handleGoalToggle(goal)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        teacherProfile.goals.includes(goal)
                          ? 'bg-green-50 text-green-800 border-green-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center">
                        {teacherProfile.goals.includes(goal) && (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        )}
                        {goal}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current challenges (select all that apply)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenges.map(challenge => (
                    <button
                      key={challenge}
                      onClick={() => handleChallengeToggle(challenge)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        teacherProfile.challenges.includes(challenge)
                          ? 'bg-red-50 text-red-800 border-red-300'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-center">
                        {teacherProfile.challenges.includes(challenge) && (
                          <CheckCircle className="h-5 w-5 text-red-500 mr-3" />
                        )}
                        {challenge}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose your plan</h2>
              <p className="text-gray-600">Unlock your teaching potential with the right plan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {pricingPlans.map(plan => (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl border-2 transition-all ${
                    plan.popular
                      ? 'border-blue-500 bg-blue-50 scale-105'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 mt-2">{plan.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setShowPricing(true);
                    }}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                      plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">All plans include a 14-day free trial</p>
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Secure payment
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Cancel anytime
                </div>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Instant access
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showPricing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to TeKeteAkoClient!</h1>
            <p className="text-xl text-gray-600">
              Your personalized teaching dashboard is ready. Let's get you started!
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">Name: {teacherProfile.name}</p>
                <p className="text-gray-600">School: {teacherProfile.school}</p>
                <p className="text-gray-600">Experience: {teacherProfile.experience}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Teaching Focus</h3>
                <p className="text-gray-600">Subjects: {teacherProfile.subjects.join(', ')}</p>
                <p className="text-gray-600">Goals: {teacherProfile.goals.length} selected</p>
                <p className="text-gray-600">Challenges: {teacherProfile.challenges.length} identified</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Recommended Next Steps</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <Play className="h-6 w-6 text-blue-500 mr-3" />
                  <span className="text-blue-900 font-medium">Watch Tutorial</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <Download className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-green-900 font-medium">Download Resources</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg">
                  <Users className="h-6 w-6 text-purple-500 mr-3" />
                  <span className="text-purple-900 font-medium">Join Community</span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => window.location.href = '/teacher'}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center"
              >
                Go to Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
              <button
                onClick={() => window.location.href = '/resources'}
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center"
              >
                Browse Resources
                <BookOpen className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">TeKeteAkoClient</h1>
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {renderStepContent()}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>

          <div className="flex space-x-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  index === currentStep
                    ? 'bg-blue-100 text-blue-700'
                    : index < currentStep
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.icon
                )}
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center"
          >
            {currentStep === steps.length - 1 ? 'Complete Setup' : 'Next'}
            <ArrowRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionOptimizedOnboarding;

