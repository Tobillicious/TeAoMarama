import { motion } from 'framer-motion';
import {
  CheckCircle,
  Crown,
  Sparkles,
  Star,
  Award,
  Target,
  Gift,
  Rocket,
  ArrowRight,
  Heart,
  BookOpen,
  Users
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  useEffect(() => {
    // Celebration animation sequence
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Cycle through different success animations
    const interval = setInterval(() => {
      setCurrentAnimation(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "500+ Premium Lessons",
      description: "Full access to our NZ Curriculum library"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "AI-Powered Analytics",
      description: "Track student progress with intelligent insights"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Teacher Community",
      description: "Connect with 1,000+ NZ educators"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Cultural Integration",
      description: "Authentic tikanga Māori content validation"
    }
  ];

  const nextSteps = [
    {
      step: 1,
      title: "Check Your Email",
      description: "We've sent you login details and onboarding guide",
      action: "Open Email",
      color: "from-blue-500 to-purple-600"
    },
    {
      step: 2,
      title: "Complete Setup",
      description: "Personalize your dashboard and preferences",
      action: "Go to Dashboard",
      color: "from-green-500 to-blue-500"
    },
    {
      step: 3,
      title: "Explore Resources",
      description: "Browse our premium lesson plans and tools",
      action: "Browse Now",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-40 right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '-4s' }} />
      </div>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
              animate={{ 
                y: window.innerHeight + 100, 
                rotate: 360,
                transition: { 
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 2
                }
              }}
              className="absolute w-3 h-3 bg-gradient-to-br from-yellow-400 to-pink-500 rounded-full"
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            animate={currentAnimation === 0 ? { rotateY: 360 } : currentAnimation === 1 ? { scale: [1, 1.2, 1] } : { rotateZ: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 text-white mb-8 shadow-2xl"
          >
            <CheckCircle className="w-16 h-16" />
          </motion.div>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-6xl font-bold text-white mb-6"
          >
            Welcome to the Kingdom!
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl text-blue-200 mb-8 max-w-3xl mx-auto"
          >
            🎉 Congratulations! Your subscription is now active. You're ready to transform your teaching with Te Ao Mārama's premium features.
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex items-center justify-center space-x-2 text-green-300"
          >
            <Crown className="w-6 h-6" />
            <span className="text-lg font-semibold">Premium Member</span>
            <Sparkles className="w-6 h-6" />
          </motion.div>
        </motion.div>

        {/* What You Get */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            What You Have Access To
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-morphism rounded-3xl p-8 text-center group hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6 group-hover:scale-110 transition-transform duration-300"
                >
                  {benefit.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-blue-200">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Your Next Steps
          </h2>

          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="glass-morphism rounded-3xl p-8 flex items-center space-x-8 group hover:shadow-2xl transition-all duration-300"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl`}
                >
                  {step.step}
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-blue-200 mb-4">{step.description}</p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-xl bg-gradient-to-r ${step.color} text-white font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2`}
                >
                  <span>{step.action}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center"
        >
          <div className="glass-morphism rounded-3xl p-12 mb-8">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
              Your premium dashboard is waiting. Let's begin transforming your teaching experience today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/teacher')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-4 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-3"
              >
                <Rocket className="w-6 h-6" />
                <span>Launch Dashboard</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/resources')}
                className="bg-white/20 text-white px-12 py-4 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-3"
              >
                <BookOpen className="w-6 h-6" />
                <span>Browse Resources</span>
              </motion.button>
            </div>
          </div>

          {/* Support Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-center"
          >
            <p className="text-blue-200 text-sm">
              Need help getting started? 
              <a href="mailto:support@teaomarama.nz" className="text-green-400 hover:text-green-300 font-semibold ml-1">
                Contact our support team
              </a>
            </p>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="fixed bottom-6 right-6 glass-morphism rounded-2xl p-4 max-w-sm z-20"
        >
          <div className="flex items-center space-x-3">
            <div className="flex -space-x-2">
              {[1,2,3,4].map(i => (
                <motion.div 
                  key={i} 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border-2 border-white"
                />
              ))}
            </div>
            <div>
              <p className="text-white text-sm font-semibold flex items-center">
                <Heart className="w-4 h-4 text-red-400 mr-1" />
                Welcome to the community!
              </p>
              <p className="text-blue-200 text-xs">1,247 teachers strong</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;