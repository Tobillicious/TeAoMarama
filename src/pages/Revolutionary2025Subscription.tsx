import { loadStripe } from '@stripe/stripe-js';
import {
  ArrowRight,
  CheckCircle,
  Sparkles,
  Star,
  Users,
  Zap,
  Shield,
  BookOpen,
  TrendingUp,
  Crown,
  Award,
  Target,
  Heart,
  Rocket,
  Gem,
  Gift,
  Lock,
  Unlock
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  billing: 'monthly' | 'yearly';
  popular?: boolean;
  premium?: boolean;
  features: string[];
  culturalFeatures: string[];
  targetAudience: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
  savings?: string;
}

interface FormData {
  name: string;
  email: string;
  school: string;
  experience: string;
  goals: string[];
}

const Revolutionary2025Subscription: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string>('professional');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    school: '',
    experience: '',
    goals: []
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const steps = [
    { id: 1, title: 'Choose Your Plan', icon: <Crown className="w-6 h-6" /> },
    { id: 2, title: 'Tell Us About You', icon: <Users className="w-6 h-6" /> },
    { id: 3, title: 'Personalize Your Experience', icon: <Target className="w-6 h-6" /> },
    { id: 4, title: 'Secure Payment', icon: <Shield className="w-6 h-6" /> }
  ];

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Kaiako Foundation',
      price: billing === 'monthly' ? 19 : 190,
      originalPrice: billing === 'monthly' ? 25 : 300,
      billing,
      features: [
        '150+ NZ Curriculum lesson plans',
        'Basic student progress tracking',
        'Resource sharing community',
        'Mobile-friendly interface',
        'Email support',
        'Cultural safety guidelines'
      ],
      culturalFeatures: [
        'Te Reo Māori vocabulary integration',
        'Basic tikanga protocols',
        'Cultural awareness prompts'
      ],
      targetAudience: 'New & Beginning Teachers',
      color: 'from-emerald-500 to-teal-600',
      gradient: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      icon: <BookOpen className="w-8 h-8" />,
      savings: billing === 'yearly' ? 'Save $110/year' : undefined
    },
    {
      id: 'professional',
      name: 'Kaiako Elite',
      price: billing === 'monthly' ? 49 : 490,
      originalPrice: billing === 'monthly' ? 65 : 780,
      billing,
      popular: true,
      features: [
        '500+ premium multimedia lessons',
        'AI-powered student analytics',
        'Personalized learning pathways',
        'Advanced collaboration tools',
        'Priority support & training',
        'Custom content creation',
        'Professional development tracking',
        'Advanced cultural integration'
      ],
      culturalFeatures: [
        'Comprehensive Te Reo Māori support',
        'Advanced tikanga validation',
        'Cultural consultation access',
        'Māori pedagogical frameworks',
        'Whānau engagement strategies'
      ],
      targetAudience: 'Experienced Teachers & Leaders',
      color: 'from-blue-500 to-purple-600',
      gradient: 'bg-gradient-to-br from-blue-50 to-purple-50',
      icon: <Zap className="w-8 h-8" />,
      savings: billing === 'yearly' ? 'Save $290/year' : undefined
    },
    {
      id: 'enterprise',
      name: 'Kura Transformation',
      price: billing === 'monthly' ? 249 : 2490,
      originalPrice: billing === 'monthly' ? 350 : 4200,
      billing,
      premium: true,
      features: [
        'Unlimited teacher accounts (up to 100)',
        'School-wide curriculum mapping',
        'Advanced admin dashboards',
        'Custom cultural protocols',
        'Bulk student analytics',
        'Professional development coordination',
        'Dedicated account manager',
        'Custom content creation service',
        'White-label options'
      ],
      culturalFeatures: [
        'Bespoke tikanga protocols',
        'Custom cultural content creation',
        'Specialist Māori education consultancy',
        'Iwi-specific cultural integration',
        'Traditional knowledge preservation'
      ],
      targetAudience: 'Schools & Educational Institutions',
      color: 'from-purple-500 to-pink-600',
      gradient: 'bg-gradient-to-br from-purple-50 to-pink-50',
      icon: <Crown className="w-8 h-8" />,
      savings: billing === 'yearly' ? 'Save $1,710/year' : undefined
    }
  ];

  const teachingGoals = [
    { id: 'engagement', label: 'Boost Student Engagement', icon: <Heart className="w-5 h-5" /> },
    { id: 'cultural', label: 'Cultural Integration', icon: <Shield className="w-5 h-5" /> },
    { id: 'analytics', label: 'Data-Driven Teaching', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'collaboration', label: 'Teacher Collaboration', icon: <Users className="w-5 h-5" /> },
    { id: 'efficiency', label: 'Save Planning Time', icon: <Rocket className="w-5 h-5" /> },
    { id: 'outcomes', label: 'Improve Learning Outcomes', icon: <Target className="w-5 h-5" /> }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    // Add subtle haptic feedback effect
    navigator.vibrate?.(50);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoalToggle = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId) 
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  const handleStartTrial = async () => {
    const plan = plans.find(p => p.id === selectedPlan);
    if (!plan) return;

    setIsLoading(true);
    
    try {
      const stripe = await loadStripe(
        'pk_test_51Q8X4qL2KxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXxXx'
      );

      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch('http://localhost:3004/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: plan.id,
          price: plan.price,
          billing: plan.billing,
          teacherEmail: formData.email,
          teacherName: formData.name,
          formData
        })
      });

      const session = await response.json();
      if (session.error) throw new Error(session.error);

      await stripe.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment setup error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic background gradient based on mouse position
  const dynamicGradient = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(16, 185, 129, 0.1) 0%, 
      rgba(59, 130, 246, 0.08) 35%, 
      rgba(139, 92, 246, 0.06) 100%)`
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Billing Toggle with Enhanced Animation */}
      <div className="flex items-center justify-center mb-12">
        <div className="glass-morphism rounded-2xl p-2 inline-flex items-center space-x-6">
          <span className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            billing === 'monthly' 
              ? 'bg-white text-gray-900 shadow-lg' 
              : 'text-white/70 hover:text-white'
          }`}>
            Monthly
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className="relative w-16 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-1 transition-all duration-300"
          >
            <motion.div
              animate={{ x: billing === 'yearly' ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-6 h-6 bg-white rounded-full shadow-lg"
            />
          </motion.button>
          <span className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            billing === 'yearly' 
              ? 'bg-white text-gray-900 shadow-lg' 
              : 'text-white/70 hover:text-white'
          }`}>
            <span>Yearly</span>
            <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
              Save up to 37%
            </span>
          </span>
        </div>
      </div>

      {/* Plan Cards with Advanced Effects */}
      <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative group cursor-pointer ${
              selectedPlan === plan.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
            }`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {/* Popular/Premium Badge */}
            {plan.popular && (
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Most Popular
                </div>
              </motion.div>
            )}
            
            {plan.premium && (
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
                className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
              >
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full text-white font-bold text-sm shadow-lg">
                  <Crown className="w-4 h-4 inline mr-1" />
                  Premium
                </div>
              </motion.div>
            )}

            <div className={`glass-morphism rounded-3xl p-8 h-full relative overflow-hidden group-hover:shadow-2xl transition-all duration-500 ${plan.gradient}`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className={`w-full h-full bg-gradient-to-br ${plan.color} animate-pulse-slow`} />
              </div>

              {/* Plan Header */}
              <div className="relative z-10 text-center mb-8">
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} text-white mb-4 shadow-lg`}
                >
                  {plan.icon}
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm">{plan.targetAudience}</p>
                
                {/* Pricing Display */}
                <div className="mt-6">
                  <div className="flex items-center justify-center space-x-2">
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-2">
                    /{billing === 'monthly' ? 'month' : 'year'}
                  </p>
                  {plan.savings && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold"
                    >
                      <Gift className="w-4 h-4 mr-1" />
                      {plan.savings}
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Core Features
                </h4>
                <ul className="space-y-3">
                  {plan.features.slice(0, 4).map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start text-gray-700 text-sm"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                  {plan.features.length > 4 && (
                    <li className="text-sm text-gray-500 italic">
                      + {plan.features.length - 4} more features...
                    </li>
                  )}
                </ul>
              </div>

              {/* Cultural Features */}
              <div className="space-y-4 mb-8">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-blue-500" />
                  Cultural Integration
                </h4>
                <ul className="space-y-2">
                  {plan.culturalFeatures.slice(0, 3).map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start text-gray-600 text-sm"
                    >
                      <Shield className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Selection Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {selectedPlan === plan.id ? (
                  <span className="flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Selected
                  </span>
                ) : (
                  'Choose Plan'
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="text-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
        >
          Continue to Next Step
          <ArrowRight className="w-6 h-6 ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center mb-12">
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6"
        >
          <Users className="w-10 h-10" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-4">Tell Us About You</h2>
        <p className="text-blue-200 text-lg">Help us personalize your teaching experience</p>
      </div>

      <div className="glass-morphism rounded-3xl p-8 space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-white font-semibold text-lg">Your Name</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-all duration-300"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-white font-semibold text-lg">Email Address</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-all duration-300"
            placeholder="your.email@school.nz"
          />
        </div>

        {/* School Field */}
        <div className="space-y-2">
          <label className="block text-white font-semibold text-lg">School/Institution</label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            value={formData.school}
            onChange={(e) => setFormData(prev => ({ ...prev, school: e.target.value }))}
            className="w-full px-4 py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-blue-400 focus:outline-none transition-all duration-300"
            placeholder="Your school name"
          />
        </div>

        {/* Experience Level */}
        <div className="space-y-4">
          <label className="block text-white font-semibold text-lg">Teaching Experience</label>
          <div className="grid grid-cols-2 gap-4">
            {['New Teacher (0-2 years)', 'Experienced (3-10 years)', 'Veteran (10+ years)', 'Department Head/Leader'].map((level) => (
              <motion.button
                key={level}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFormData(prev => ({ ...prev, experience: level }))}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${
                  formData.experience === level
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {level}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
        >
          ← Previous
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={!formData.name || !formData.email || !formData.school || !formData.experience}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="text-center mb-12">
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-blue-600 text-white mb-6"
        >
          <Target className="w-10 h-10" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-4">What Are Your Goals?</h2>
        <p className="text-blue-200 text-lg">Select the areas where you want to excel (choose any that apply)</p>
      </div>

      <div className="glass-morphism rounded-3xl p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teachingGoals.map((goal, index) => (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleGoalToggle(goal.id)}
              className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                formData.goals.includes(goal.id)
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${
                  formData.goals.includes(goal.id) ? 'bg-white/20' : 'bg-white/10'
                }`}>
                  {goal.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{goal.label}</h3>
                  {formData.goals.includes(goal.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center mt-2"
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Selected
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/70">
            Selected {formData.goals.length} of {teachingGoals.length} goals
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrevious}
          className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
        >
          ← Previous
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={formData.goals.length === 0}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-12 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          Continue to Payment
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => {
    const selectedPlanData = plans.find(p => p.id === selectedPlan)!;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center mb-12">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-6"
          >
            <Shield className="w-10 h-10" />
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">Secure Checkout</h2>
          <p className="text-blue-200 text-lg">Review your selection and start your journey</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="glass-morphism rounded-3xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${selectedPlanData.color}`}>
                  {selectedPlanData.icon}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{selectedPlanData.name}</h4>
                  <p className="text-blue-200">{selectedPlanData.targetAudience}</p>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white">Plan ({billing})</span>
                  <span className="text-white font-semibold">${selectedPlanData.price}</span>
                </div>
                {selectedPlanData.originalPrice && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-300">Regular Price</span>
                    <span className="text-blue-300 line-through">${selectedPlanData.originalPrice}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t border-white/20">
                  <span className="text-white">Total</span>
                  <span className="text-white">${selectedPlanData.price}</span>
                </div>
              </div>
            </div>

            {/* Selected Goals */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Your Goals</h4>
              <div className="space-y-2">
                {formData.goals.map(goalId => {
                  const goal = teachingGoals.find(g => g.id === goalId)!;
                  return (
                    <div key={goalId} className="flex items-center space-x-3 text-blue-200">
                      {goal.icon}
                      <span>{goal.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-green-500/20 rounded-2xl p-6 border border-green-500/30">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-green-400" />
                <div>
                  <h4 className="font-semibold text-green-300">14-Day Money-Back Guarantee</h4>
                  <p className="text-green-200 text-sm">Not satisfied? Get a full refund, no questions asked.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Action */}
          <div className="glass-morphism rounded-3xl p-8 space-y-8">
            <h3 className="text-2xl font-bold text-white mb-6">Start Your Trial</h3>
            
            <div className="space-y-6">
              {/* Trial Benefits */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">What you get immediately:</h4>
                <ul className="space-y-3">
                  {[
                    'Full access to all features for 14 days',
                    'No credit card required for trial',
                    'Personal onboarding session',
                    'Instant access to resource library',
                    'Cancel anytime during trial'
                  ].map((benefit, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start text-blue-200"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Start Trial Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartTrial}
                disabled={isLoading}
                className="w-full py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden"
              >
                <AnimatePresence>
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                      Processing...
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <Rocket className="w-6 h-6 mr-3" />
                      Start 14-Day Free Trial
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Security Note */}
              <div className="text-center text-sm text-blue-200">
                <div className="flex items-center justify-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Secured by Stripe • SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300"
          >
            ← Previous
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 relative overflow-hidden"
      style={dynamicGradient}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 pt-8"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-blue-500 text-white mb-6 shadow-2xl"
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-4">
              Transform Your Teaching
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Join 1,000+ New Zealand teachers creating extraordinary learning experiences with AI-powered, culturally authentic educational tools
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="glass-morphism rounded-2xl p-6 mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      animate={{ 
                        scale: currentStep === step.id ? 1.2 : 1,
                        backgroundColor: currentStep >= step.id ? '#3b82f6' : '#374151'
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.icon
                      )}
                    </motion.div>
                    <div className="text-center">
                      <p className={`font-semibold text-sm ${
                        currentStep === step.id ? 'text-white' : 'text-blue-300'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-4">
                      <motion.div
                        animate={{ 
                          backgroundColor: currentStep > step.id ? '#3b82f6' : '#374151'
                        }}
                        className="h-2 rounded-full"
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>
      </div>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-4 right-4 glass-morphism rounded-2xl p-4 max-w-xs z-20"
      >
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white" />
            ))}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">127 teachers</p>
            <p className="text-blue-200 text-xs">joined today</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Revolutionary2025Subscription;