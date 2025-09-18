import {
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Crown,
  Download,
  FileText,
  Globe,
  Heart,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface DashboardStats {
  totalLessons: number;
  activeStudents: number;
  weeklyHours: number;
  engagementRate: number;
}

interface RecentActivity {
  id: string;
  type: 'lesson' | 'student' | 'resource';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
}

const BrilliantTeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalLessons: 0,
    activeStudents: 0,
    weeklyHours: 0,
    engagementRate: 0,
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'lesson',
      title: 'Te Tiriti o Waitangi Unit',
      description: 'Created new social studies lesson',
      time: '2 hours ago',
      icon: <BookOpen className="h-5 w-5 text-blue-400" />
    },
    {
      id: '2',
      type: 'student',
      title: 'Year 8 Progress Review',
      description: '25 students completed assessment',
      time: '4 hours ago',
      icon: <Users className="h-5 w-5 text-green-400" />
    },
    {
      id: '3',
      type: 'resource',
      title: 'Kākāpō Conservation Science',
      description: 'Downloaded premium resource',
      time: '1 day ago',
      icon: <Download className="h-5 w-5 text-purple-400" />
    },
  ]);

  // Animate stats on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalLessons: 47,
        activeStudents: 156,
        weeklyHours: 8.5,
        engagementRate: 94,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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

  const statCards = [
    {
      title: 'Total Lessons',
      value: stats.totalLessons,
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      change: '+12%',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Active Students',
      value: stats.activeStudents,
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: '+8%',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Weekly Hours',
      value: stats.weeklyHours,
      suffix: 'hrs',
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      change: '-5%',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Engagement Rate',
      value: stats.engagementRate,
      suffix: '%',
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />,
      change: '+15%',
      color: 'from-orange-500 to-orange-600'
    },
  ];

  const quickActions = [
    {
      title: 'Create New Lesson',
      description: 'Start building your next masterpiece',
      icon: <Plus className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      action: () => console.log('Create lesson')
    },
    {
      title: 'Browse Resources',
      description: 'Explore 500+ premium materials',
      icon: <Search className="h-6 w-6" />,
      color: 'from-green-500 to-green-600',
      action: () => console.log('Browse resources')
    },
    {
      title: 'View Analytics',
      description: 'Deep dive into student data',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      action: () => console.log('View analytics')
    },
    {
      title: 'Schedule Classes',
      description: 'Manage your teaching calendar',
      icon: <Calendar className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600',
      action: () => console.log('Schedule classes')
    },
  ];

  const upcomingLessons = [
    {
      id: '1',
      title: 'Māori Perspectives in Science',
      class: 'Year 8A',
      time: '9:00 AM - 10:00 AM',
      students: 28,
      subject: 'Science'
    },
    {
      id: '2',
      title: 'Early New Zealand History',
      class: 'Year 8B',
      time: '11:00 AM - 12:00 PM',
      students: 25,
      subject: 'Social Studies'
    },
    {
      id: '3',
      title: 'Te Reo Māori Basics',
      class: 'Year 7C',
      time: '2:00 PM - 3:00 PM',
      students: 30,
      subject: 'Language'
    },
  ];

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)
        `
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
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
        className="max-w-7xl mx-auto px-6 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, Sarah! 
                <motion.span
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ duration: 1, delay: 1 }}
                  className="inline-block ml-2"
                >
                  👋
                </motion.span>
              </h1>
              <p className="text-xl text-gray-600">Ready to inspire minds today?</p>
            </div>
            
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 border border-gray-200/50 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <span className="font-semibold text-gray-900">Professional Plan</span>
                </div>
              </div>
              <motion.button
                className="p-3 bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-lg hover:bg-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-6 w-6 text-gray-600" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" variants={itemVariants}>
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              
              <motion.div 
                className="text-3xl font-bold text-gray-900 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {stat.value}{stat.suffix}
              </motion.div>
              <p className="text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions & Recent Activity */}
          <motion.div className="lg:col-span-2 space-y-8" variants={itemVariants}>
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Zap className="h-6 w-6 text-yellow-500 mr-2" />
                Quick Actions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <motion.button
                    key={action.title}
                    onClick={action.action}
                    className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 hover:shadow-lg transition-all duration-300 text-left group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} inline-flex mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="h-6 w-6 text-blue-500 mr-2" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="p-3 bg-white rounded-lg mr-4 shadow-sm">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                      <p className="text-gray-600 text-sm">{activity.description}</p>
                    </div>
                    <span className="text-gray-500 text-sm">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Upcoming Lessons & Resources */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Upcoming Lessons */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 text-green-500 mr-2" />
                Today's Schedule
              </h2>
              
              <div className="space-y-4">
                {upcomingLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200/50 hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{lesson.title}</h3>
                      <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                        {lesson.subject}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{lesson.class}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{lesson.time}</span>
                      <div className="flex items-center text-gray-500">
                        <Users className="h-4 w-4 mr-1" />
                        {lesson.students}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Featured Resources */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Star className="h-6 w-6 text-yellow-500 mr-2" />
                Featured Resources
              </h2>
              
              <div className="space-y-4">
                {[
                  { title: 'Te Tiriti o Waitangi Teaching Kit', type: 'Social Studies', rating: 4.9 },
                  { title: 'Kākāpō Conservation Project', type: 'Science', rating: 4.8 },
                  { title: 'NZ Census Data Analysis', type: 'Mathematics', rating: 4.7 },
                ].map((resource, index) => (
                  <motion.div
                    key={resource.title}
                    className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm">{resource.title}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{resource.rating}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <motion.button
                className="w-full mt-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Browse All Resources
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to Create Something Amazing?</h2>
              <p className="text-blue-100">Join thousands of NZ teachers transforming education</p>
            </div>
            <motion.button
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Lesson
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BrilliantTeacherDashboard;