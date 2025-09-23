import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle,
  Crown,
  Mail,
  School,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  school: string;
  region: string;
  teachingLevel: string;
  experience: string;
  subjects: string[];
  selectedPlan?: 'basic' | 'professional' | 'enterprise';
}

const BrilliantOnboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    school: '',
    region: '',
    teachingLevel: '',
    experience: '',
    subjects: [],
  });

  const totalSteps = 6;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const stepVariants = {
    hidden: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { x: -300, opacity: 0, transition: { duration: 0.3 } }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle completion
      navigate('/subscription');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Crown className="h-20 w-20 text-yellow-400 mx-auto" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome to the Future</h2>
              <p className="text-xl text-blue-200">Your journey to educational excellence starts here</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Target className="h-8 w-8 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Your Mission</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• Create engaging, culturally-rich lessons</li>
                  <li>• Access premium NZ Curriculum resources</li>
                  <li>• Track student progress with AI insights</li>
                  <li>• Connect with the teaching community</li>
                </ul>
              </motion.div>

              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Award className="h-8 w-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">What You'll Get</h3>
                <ul className="space-y-2 text-blue-200">
                  <li>• 3 complete curriculum units + 36 supporting resources</li>
                  <li>• Advanced student analytics</li>
                  <li>• Cultural integration tools</li>
                  <li>• 24/7 teacher support</li>
                </ul>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.div
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white font-bold text-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="h-6 w-6 mr-2" />
                Join 1,247+ NZ Teachers
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <Mail className="h-16 w-16 text-blue-400 mx-auto" />
              <h2 className="text-3xl font-bold text-white">Personal Information</h2>
              <p className="text-lg text-blue-200">Let's get to know you better</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-medium">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-medium">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="teacher@school.nz"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white font-medium">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Create a secure password"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white font-medium">Confirm Password</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <School className="h-16 w-16 text-green-400 mx-auto" />
              <h2 className="text-3xl font-bold text-white">School Details</h2>
              <p className="text-lg text-blue-200">Tell us about your educational environment</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-white font-medium">School Name</label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Auckland Grammar School"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Region</label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({...formData, region: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select your region</option>
                  <option value="northland">Northland</option>
                  <option value="auckland">Auckland</option>
                  <option value="waikato">Waikato</option>
                  <option value="wellington">Wellington</option>
                  <option value="canterbury">Canterbury</option>
                  <option value="otago">Otago</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <Users className="h-16 w-16 text-purple-400 mx-auto" />
              <h2 className="text-3xl font-bold text-white">Teaching Experience</h2>
              <p className="text-lg text-blue-200">Help us customize your experience</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-white font-medium">Teaching Level</label>
                <select
                  value={formData.teachingLevel}
                  onChange={(e) => setFormData({...formData, teachingLevel: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select teaching level</option>
                  <option value="primary">Primary (Years 1-6)</option>
                  <option value="intermediate">Intermediate (Years 7-8)</option>
                  <option value="secondary">Secondary (Years 9-13)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Years of Experience</label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select experience level</option>
                  <option value="new">New Teacher (0-2 years)</option>
                  <option value="developing">Developing (3-5 years)</option>
                  <option value="experienced">Experienced (6-10 years)</option>
                  <option value="expert">Expert (10+ years)</option>
                </select>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <Crown className="h-16 w-16 text-yellow-400 mx-auto" />
              <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
              <p className="text-lg text-blue-200">Select the perfect plan for your needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 'basic',
                  name: 'Basic',
                  price: '$15',
                  features: ['100+ resources', 'Basic analytics', 'Email support']
                },
                {
                  id: 'professional',
                  name: 'Professional',
                  price: '$45',
                  popular: true,
                  features: ['3 units + 36 resources', 'Advanced analytics', 'Priority support', 'AI insights']
                },
                {
                  id: 'enterprise',
                  name: 'Enterprise',
                  price: '$99',
                  features: ['Unlimited resources', 'Custom integration', 'Dedicated manager', 'White-label']
                }
              ].map((plan) => (
                <motion.div
                  key={plan.id}
                  className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    formData.selectedPlan === plan.id
                      ? 'bg-white/20 border-yellow-400'
                      : 'bg-white/10 border-white/20 hover:bg-white/15'
                  } backdrop-blur-md`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({...formData, selectedPlan: plan.id as any})}
                >
                  {plan.popular && (
                    <div className="text-center mb-4">
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    <div className="text-3xl font-bold text-white mt-2">{plan.price}<span className="text-lg">/month</span></div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-blue-200">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div
            key="step6"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
              >
                <Sparkles className="h-20 w-20 text-yellow-400 mx-auto" />
              </motion.div>
              <h2 className="text-4xl font-bold text-white">You're All Set!</h2>
              <p className="text-xl text-blue-200">Welcome to the future of education</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Premium Access</h3>
                <p className="text-blue-200">All features unlocked</p>
              </motion.div>

              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Award className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">NZ Curriculum</h3>
                <p className="text-blue-200">Fully aligned resources</p>
              </motion.div>

              <motion.div 
                className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Student Success</h3>
                <p className="text-blue-200">Proven results</p>
              </motion.div>
            </div>

            <div className="text-center">
              <motion.button
                onClick={() => navigate('/subscription')}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-12 py-6 rounded-full font-bold text-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 flex items-center mx-auto shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Crown className="h-8 w-8 mr-3" />
                Start Your Journey
                <ArrowRight className="h-8 w-8 ml-3" />
              </motion.button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.3) 0%, transparent 50%),
          linear-gradient(135deg, #667eea 0%, #764ba2 100%)
        `
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="max-w-4xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-5xl font-bold text-white mb-4">
            Brilliant Onboarding
          </h1>
          <p className="text-2xl text-blue-200">
            Step {currentStep} of {totalSteps}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            {Array.from({ length: totalSteps }, (_, index) => (
              <div key={index} className="flex items-center">
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                    index + 1 <= currentStep
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-500 text-white'
                      : 'bg-white/10 border-white/30 text-white/60'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {index + 1 < currentStep ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="font-bold">{index + 1}</span>
                  )}
                </motion.div>
                {index < totalSteps - 1 && (
                  <motion.div
                    className={`w-16 h-1 mx-4 rounded-full ${
                      index + 1 < currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-white/20'
                    }`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: index + 1 < currentStep ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20 mb-12 shadow-2xl"
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <motion.button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
              whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
              whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
            >
              Previous
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep === totalSteps ? 'Complete' : 'Continue'}
              <ArrowRight className="h-6 w-6 ml-2" />
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Benefits */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          {[
            { icon: Star, title: 'Premium Quality', text: 'NZ Curriculum aligned resources' },
            { icon: Zap, title: 'Save Time', text: 'Reduce planning time by 70%' },
            { icon: TrendingUp, title: 'Better Outcomes', text: 'Improve student engagement' }
          ].map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <benefit.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-blue-200">{benefit.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BrilliantOnboarding;