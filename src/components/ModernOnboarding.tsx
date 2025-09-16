import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  User, 
  Mail, 
  Lock, 
  School, 
  MapPin, 
  ArrowRight,
  Star,
  Shield,
  BookOpen,
  CreditCard,
  Award,
  Sparkles,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  school: string;
  region: string;
  teachingLevel: string;
  subjects: string[];
  experience: string;
  agreeToTerms: boolean;
  selectedPlan?: 'basic' | 'professional' | 'enterprise';
}

const ModernOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    region: '',
    teachingLevel: '',
    subjects: [],
    experience: '',
    agreeToTerms: false,
  });

  const steps = [
    { number: 1, title: 'Personal', icon: User, color: 'from-purple-500 to-pink-500' },
    { number: 2, title: 'School', icon: School, color: 'from-blue-500 to-cyan-500' },
    { number: 3, title: 'Teaching', icon: BookOpen, color: 'from-green-500 to-emerald-500' },
    { number: 4, title: 'Plan', icon: Star, color: 'from-yellow-500 to-orange-500' },
    { number: 5, title: 'Payment', icon: CreditCard, color: 'from-red-500 to-pink-500' },
    { number: 6, title: 'Welcome', icon: Award, color: 'from-indigo-500 to-purple-500' }
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Kaiako Basic',
      price: 15,
      description: 'Perfect for new teachers',
      gradient: 'from-green-400 to-emerald-600',
      features: [
        '100+ NZ Curriculum lessons',
        'Basic assessment tools',
        'Te Reo Māori integration',
        'Email support',
        'Mobile app access'
      ],
      badge: '🌱 Starter'
    },
    {
      id: 'professional',
      name: 'Kaiako Professional',
      price: 45,
      description: 'Most popular choice',
      gradient: 'from-blue-500 to-purple-600',
      popular: true,
      features: [
        '500+ premium lessons',
        'AI-powered analytics',
        'Advanced planning tools',
        'Cultural competency',
        'Priority support',
        'Collaboration features'
      ],
      badge: '⭐ Popular'
    },
    {
      id: 'enterprise',
      name: 'Kura Enterprise',
      price: 200,
      description: 'For schools & departments',
      gradient: 'from-orange-500 to-red-600',
      features: [
        'Unlimited accounts',
        'School-wide mapping',
        'Custom protocols',
        'Dedicated manager',
        'Training sessions',
        'Custom integrations'
      ],
      badge: '🏆 Enterprise'
    }
  ];

  const handleSubscribe = async (planId: 'basic' | 'professional' | 'enterprise') => {
    setLoading(true);
    try {
      const plan = plans.find(p => p.id === planId);
      const response = await fetch('http://localhost:3004/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          price: plan?.price,
          billing: 'monthly',
          teacherEmail: formData.email,
          teacherName: `${formData.firstName} ${formData.lastName}`
        })
      });
      
      const data = await response.json();
      if (data.url) {
        console.log('Payment session created:', data);
        setCurrentStep(6);
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ 
    icon: Icon, 
    label, 
    type = 'text', 
    value, 
    onChange, 
    placeholder,
    showToggle = false,
    showValue = true
  }: {
    icon: any;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    showToggle?: boolean;
    showValue?: boolean;
  }) => (
    <div className="group">
      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Icon className="w-4 h-4 text-blue-600" />
        {label}
      </label>
      <div className="relative">
        <input
          type={showToggle ? (showValue ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl 
                   focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300
                   text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl group-hover:border-blue-300"
          placeholder={placeholder}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => type === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            {showValue ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">Let's get started</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                Personal Information
              </h2>
              <p className="text-gray-600">Tell us about yourself to create your Te Ao Mārama account</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                icon={User}
                label="First Name"
                value={formData.firstName}
                onChange={(value) => setFormData({...formData, firstName: value})}
                placeholder="Enter your first name"
              />
              <InputField
                icon={User}
                label="Last Name"
                value={formData.lastName}
                onChange={(value) => setFormData({...formData, lastName: value})}
                placeholder="Enter your last name"
              />
            </div>

            <InputField
              icon={Mail}
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({...formData, email: value})}
              placeholder="your.name@school.co.nz"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                icon={Lock}
                label="Password"
                type="password"
                value={formData.password}
                onChange={(value) => setFormData({...formData, password: value})}
                placeholder="Create a secure password"
                showToggle={true}
                showValue={showPassword}
              />
              <InputField
                icon={Shield}
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={(value) => setFormData({...formData, confirmPassword: value})}
                placeholder="Confirm your password"
                showToggle={true}
                showValue={showConfirmPassword}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full mb-4">
                <School className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">School details</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                Your Teaching Environment
              </h2>
              <p className="text-gray-600">Help us understand your school context</p>
            </div>

            <InputField
              icon={School}
              label="School Name"
              value={formData.school}
              onChange={(value) => setFormData({...formData, school: value})}
              placeholder="Enter your school name"
            />

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl 
                         focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300
                         text-gray-900 shadow-lg hover:shadow-xl group-hover:border-blue-300"
              >
                <option value="">Select your region</option>
                <option value="auckland">Auckland</option>
                <option value="wellington">Wellington</option>
                <option value="canterbury">Canterbury</option>
                <option value="waikato">Waikato</option>
                <option value="otago">Otago</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full mb-4">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-700">Choose your plan</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
                Select Your Teaching Plan
              </h2>
              <p className="text-gray-600">Choose the perfect plan for your teaching journey</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                    plan.popular ? 'lg:scale-110 z-10' : ''
                  }`}
                  onClick={() => setFormData({...formData, selectedPlan: plan.id as any})}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        {plan.badge}
                      </div>
                    </div>
                  )}

                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-2xl">{plan.badge.split(' ')[0]}</div>
                      {!plan.popular && (
                        <div className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {plan.badge}
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                          ${plan.price}
                        </span>
                        <span className="text-gray-600">/month</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">14-day free trial</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3 text-sm text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({...formData, selectedPlan: plan.id as any});
                        setCurrentStep(5);
                      }}
                      className={`w-full py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                        plan.popular
                          ? `bg-gradient-to-r ${plan.gradient} text-white`
                          : 'bg-white border-2 border-gray-200 text-gray-900 hover:border-gray-300'
                      }`}
                    >
                      Choose {plan.name}
                      <ChevronRight className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-8 py-12">
            <div className="relative mx-auto w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full animate-pulse" />
              <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                Welcome to Te Ao Mārama!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Your educational journey begins now
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-blue-900 mb-6">🚀 What's Next?</h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">Explore Resources</h4>
                    <p className="text-blue-700 text-sm">500+ NZ curriculum-aligned lessons</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-900">AI-Powered Planning</h4>
                    <p className="text-blue-700 text-sm">Smart lesson recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.location.href = '/teacher'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold 
                       hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              Start Teaching
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep >= step.number
                        ? `bg-gradient-to-br ${step.color} text-white shadow-lg scale-110`
                        : 'bg-white/80 border-2 border-gray-200 text-gray-400'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <step.icon className="w-7 h-7" />
                    )}
                    {currentStep === step.number && (
                      <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping" />
                    )}
                  </div>
                  <span className={`mt-3 text-sm font-medium transition-colors ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-4 rounded-full transition-all duration-500 ${
                    currentStep > step.number
                      ? `bg-gradient-to-r ${step.color}`
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-12 max-w-5xl mx-auto">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          {currentStep < 4 && currentStep !== 6 && (
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className="px-8 py-3 border-2 border-gray-200 rounded-2xl font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
                disabled={currentStep === 1}
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernOnboarding;