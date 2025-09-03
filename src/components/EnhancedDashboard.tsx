import { motion } from 'framer-motion';
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle,
  Clock,
  Globe,
  Heart,
  Play,
  Settings,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './EnhancedDashboard.css';

interface EnhancedDashboardProps {
  userRole: 'teacher' | 'student' | 'admin';
  userName: string;
}

const EnhancedDashboard: React.FC<EnhancedDashboardProps> = ({ userRole, userName }) => {
  const [stats] = useState({
    totalStudents: 1247,
    activeCourses: 23,
    completionRate: 87.5,
    culturalEngagement: 92.3,
    averageProgress: 78.9,
    culturalValidationScore: 94.7,
    lessonsCompleted: 24,
    currentStreak: 7,
    totalPoints: 1250,
    achievements: 8,
    accuracy: 92,
    timeSpent: 45,
  });

  useEffect(() => {
    // Simulate loading stats
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
  }, []);

  const getRoleSpecificContent = () => {
    switch (userRole) {
      case 'teacher':
        return {
          title: 'Teacher Dashboard',
          subtitle: 'Manage your classroom and track student progress',
          stats: [
            { label: 'Students', value: '32', icon: Users, color: 'blue' },
            { label: 'Lessons Created', value: '18', icon: BookOpen, color: 'green' },
            { label: 'Assessments', value: '12', icon: Award, color: 'purple' },
            { label: 'Class Average', value: '87%', icon: TrendingUp, color: 'orange' },
          ],
          quickActions: [
            { label: 'Create Lesson', icon: BookOpen, action: () => console.log('Create lesson') },
            { label: 'View Students', icon: Users, action: () => console.log('View students') },
            { label: 'Analytics', icon: BarChart3, action: () => console.log('Analytics') },
            { label: 'Settings', icon: Settings, action: () => console.log('Settings') },
          ],
        };
      case 'student':
        return {
          title: 'Student Dashboard',
          subtitle: 'Track your learning progress and achievements',
          stats: [
            {
              label: 'Lessons Completed',
              value: stats.lessonsCompleted.toString(),
              icon: CheckCircle,
              color: 'green',
            },
            {
              label: 'Current Streak',
              value: stats.currentStreak.toString(),
              icon: Zap,
              color: 'orange',
            },
            {
              label: 'Total Points',
              value: stats.totalPoints.toString(),
              icon: Star,
              color: 'yellow',
            },
            {
              label: 'Achievements',
              value: stats.achievements.toString(),
              icon: Award,
              color: 'purple',
            },
          ],
          quickActions: [
            {
              label: 'Continue Learning',
              icon: Play,
              action: () => console.log('Continue learning'),
            },
            {
              label: 'View Progress',
              icon: TrendingUp,
              action: () => console.log('View progress'),
            },
            { label: 'Achievements', icon: Award, action: () => console.log('Achievements') },
            { label: 'Study Timer', icon: Clock, action: () => console.log('Study timer') },
          ],
        };
      default:
        return {
          title: 'Admin Dashboard',
          subtitle: 'System overview and management',
          stats: [
            { label: 'Total Users', value: '1,247', icon: Users, color: 'blue' },
            { label: 'Active Sessions', value: '89', icon: Globe, color: 'green' },
            { label: 'System Health', value: '98%', icon: Shield, color: 'green' },
            { label: 'Resources', value: '5,432', icon: BookOpen, color: 'purple' },
          ],
          quickActions: [
            { label: 'User Management', icon: Users, action: () => console.log('User management') },
            {
              label: 'System Analytics',
              icon: BarChart3,
              action: () => console.log('System analytics'),
            },
            {
              label: 'Content Management',
              icon: BookOpen,
              action: () => console.log('Content management'),
            },
            { label: 'Security', icon: Shield, action: () => console.log('Security') },
          ],
        };
    }
  };

  const content = getRoleSpecificContent();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{content.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{content.subtitle}</p>
            </div>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {content.stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                  <stat.icon
                    className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.quickActions.map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <action.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Progress Section */}
        {userRole === 'student' && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Learning Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Learning Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Weekly Goal</span>
                    <span className="text-gray-900 dark:text-white font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Accuracy</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {stats.accuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.accuracy}%` }}
                      transition={{ duration: 1, delay: 0.6 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                {[
                  { action: 'Completed Lesson', time: '2 hours ago', icon: CheckCircle },
                  { action: 'Earned Achievement', time: '1 day ago', icon: Award },
                  { action: 'Started New Module', time: '2 days ago', icon: Play },
                  { action: 'Reached Streak Goal', time: '3 days ago', icon: Zap },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <activity.icon className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Welcome Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-lg">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Welcome back, {userName}! 👋</h3>
              <p className="text-blue-100">
                Ready to continue your learning journey? Let's make today productive!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedDashboard;
