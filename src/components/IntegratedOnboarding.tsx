import React, { useState } from 'react';
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
  Award
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

const IntegratedOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
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
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'School Details', icon: School },
    { number: 3, title: 'Teaching Info', icon: BookOpen },
    { number: 4, title: 'Choose Plan', icon: Star },
    { number: 5, title: 'Payment', icon: CreditCard },
    { number: 6, title: 'Welcome', icon: Award }
  ];

  const plans = [
    {
      id: 'basic',
      name: 'Kaiako Basic',
      price: 15,
      description: 'New & Beginning Teachers',
      features: [
        '100+ NZ Curriculum lesson plans',
        'Basic assessment tools',
        'Te Reo Māori integration',
        'Email support'
      ]
    },
    {
      id: 'professional',
      name: 'Kaiako Professional',
      price: 45,
      description: 'Experienced Teachers',
      popular: true,
      features: [
        '500+ premium lesson plans',
        'Advanced analytics',
        'AI-powered suggestions',
        'Cultural competency tools',
        'Priority support'
      ]
    },
    {
      id: 'enterprise',
      name: 'Kura Enterprise',
      price: 200,
      description: 'Schools & Departments',
      features: [
        'Unlimited teacher accounts',
        'School-wide mapping',
        'Custom cultural protocols',
        'Dedicated support'
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubscribe = async (planId: 'basic' | 'professional' | 'enterprise') => {
    setLoading(true);
    try {
      const plan = plans.find(p => p.id === planId);
      const response = await fetch('http://localhost:3004/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        // In real app, would redirect to Stripe
        console.log('Payment session created:', data);
        setCurrentStep(6); // Go to welcome step
      }
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="your.email@school.nz"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Create a secure password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">School Details</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <School className="inline w-4 h-4 mr-2" />
                School Name
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={(e) => setFormData({...formData, school: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your school name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-2" />
                Region
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Teaching Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <BookOpen className="inline w-4 h-4 mr-2" />
                Teaching Level
              </label>
              <select
                value={formData.teachingLevel}
                onChange={(e) => setFormData({...formData, teachingLevel: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select teaching level</option>
                <option value="primary">Primary (Years 1-8)</option>
                <option value="intermediate">Intermediate (Years 7-8)</option>
                <option value="secondary">Secondary (Years 9-13)</option>
                <option value="kura">Kura Kaupapa Māori</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Level
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select experience level</option>
                <option value="new">New Teacher (0-2 years)</option>
                <option value="experienced">Experienced (3-10 years)</option>
                <option value="senior">Senior Teacher (10+ years)</option>
                <option value="leader">Department Head/Leader</option>
              </select>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <p className="text-gray-600 mb-8">Select the plan that best fits your teaching needs</p>
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    plan.popular 
                      ? 'border-blue-500 shadow-lg transform scale-105' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                  onClick={() => setFormData({...formData, selectedPlan: plan.id as any})}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="text-3xl font-bold text-gray-900 mb-4">
                    ${plan.price}<span className="text-lg text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
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
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Choose {plan.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        const selectedPlanData = plans.find(p => p.id === formData.selectedPlan);
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Subscription</h2>
            {selectedPlanData && (
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  {selectedPlanData.name}
                </h3>
                <p className="text-blue-700 mb-4">{selectedPlanData.description}</p>
                <div className="text-2xl font-bold text-blue-900">
                  ${selectedPlanData.price}/month
                </div>
              </div>
            )}
            <div className="bg-gray-50 p-6 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-4">Account Details</h4>
              <p className="text-gray-600">Name: {formData.firstName} {formData.lastName}</p>
              <p className="text-gray-600">Email: {formData.email}</p>
              <p className="text-gray-600">School: {formData.school}</p>
            </div>
            <button
              onClick={() => handleSubscribe(formData.selectedPlan!)}
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Subscribe for $${selectedPlanData?.price}/month`}
            </button>
            <p className="text-sm text-gray-500 text-center">
              14-day free trial • Cancel anytime • Secure payment
            </p>
          </div>
        );

      case 6:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome to Te Ao Mārama!</h2>
            <p className="text-xl text-gray-600">
              Your account has been created and subscription is active.
            </p>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold text-blue-900 mb-2">What's Next?</h3>
              <ul className="text-left space-y-2 text-blue-800">
                <li>• Explore 500+ NZ curriculum-aligned resources</li>
                <li>• Start your 14-day free trial</li>
                <li>• Access AI-powered lesson planning</li>
                <li>• Connect with other NZ teachers</li>
              </ul>
            </div>
            <button
              onClick={() => window.location.href = '/teacher'}
              className="bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Teaching with Te Ao Mārama
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="ml-2 text-sm font-medium text-gray-600">
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 ml-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                disabled={currentStep === 1}
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegratedOnboarding;