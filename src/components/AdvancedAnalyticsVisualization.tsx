import {
  BarChart3,
  Calendar,
  Clock,
  Download,
  Filter,
  Globe,
  LineChart,
  PieChart,
  Settings,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';

interface AnalyticsData {
  studentEngagement: number;
  lessonCompletion: number;
  averageScore: number;
  timeSpent: number;
  activeStudents: number;
  resourcesUsed: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    color: string;
  }[];
}

const AdvancedAnalyticsVisualization: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('engagement');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    studentEngagement: 0,
    lessonCompletion: 0,
    averageScore: 0,
    timeSpent: 0,
    activeStudents: 0,
    resourcesUsed: 0,
  });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  // Animate data on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyticsData({
        studentEngagement: 87.3,
        lessonCompletion: 92.5,
        averageScore: 78.9,
        timeSpent: 24.7,
        activeStudents: 247,
        resourcesUsed: 156,
      });
      
      setChartData({
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Student Engagement',
            data: [85, 89, 87, 91, 88, 76, 82],
            color: 'from-blue-500 to-blue-600'
          },
          {
            label: 'Lesson Completion',
            data: [92, 95, 89, 94, 97, 88, 90],
            color: 'from-green-500 to-green-600'
          }
        ]
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedTimeframe]);

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

  const metricCards = [
    {
      title: 'Student Engagement',
      value: analyticsData.studentEngagement,
      suffix: '%',
      icon: <Users className="h-8 w-8 text-blue-500" />,
      change: '+5.2%',
      color: 'from-blue-500 to-blue-600',
      description: 'Average time spent actively learning'
    },
    {
      title: 'Lesson Completion',
      value: analyticsData.lessonCompletion,
      suffix: '%',
      icon: <BarChart3 className="h-8 w-8 text-green-500" />,
      change: '+12.1%',
      color: 'from-green-500 to-green-600',
      description: 'Students completing full lessons'
    },
    {
      title: 'Average Score',
      value: analyticsData.averageScore,
      suffix: '%',
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      change: '+3.7%',
      color: 'from-purple-500 to-purple-600',
      description: 'Assessment performance average'
    },
    {
      title: 'Time Spent Learning',
      value: analyticsData.timeSpent,
      suffix: ' min',
      icon: <Clock className="h-8 w-8 text-orange-500" />,
      change: '-2.1%',
      color: 'from-orange-500 to-orange-600',
      description: 'Average daily learning time'
    }
  ];

  const timeframes = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' }
  ];

  const studentPerformance = [
    { name: 'Top Performers', count: 45, percentage: 18, color: 'bg-green-500' },
    { name: 'Above Average', count: 82, percentage: 33, color: 'bg-blue-500' },
    { name: 'Average', count: 89, percentage: 36, color: 'bg-yellow-500' },
    { name: 'Needs Support', count: 31, percentage: 13, color: 'bg-red-500' }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', score: 85.2, trend: 'up', color: 'text-green-600' },
    { subject: 'Science', score: 78.9, trend: 'up', color: 'text-green-600' },
    { subject: 'Social Studies', score: 82.4, trend: 'down', color: 'text-red-600' },
    { subject: 'English', score: 79.7, trend: 'up', color: 'text-green-600' },
    { subject: 'Te Reo Māori', score: 88.1, trend: 'up', color: 'text-green-600' }
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
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            animate={{
              x: [Math.random() * 100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * 100],
              opacity: [0.1, 0.3, 0.1],
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
        className="max-w-7xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="mb-12" variants={itemVariants}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Advanced Analytics Dashboard
              </h1>
              <p className="text-xl text-gray-600">
                Real-time insights into student learning and engagement
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                className="flex items-center px-6 py-3 bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-lg hover:bg-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-5 w-5 mr-2 text-gray-600" />
                Export Report
              </motion.button>
              <motion.button
                className="p-3 bg-white/80 backdrop-blur-md rounded-xl border border-gray-200/50 shadow-lg hover:bg-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings className="h-6 w-6 text-gray-600" />
              </motion.button>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex space-x-2">
            {timeframes.map((timeframe) => (
              <motion.button
                key={timeframe.id}
                onClick={() => setSelectedTimeframe(timeframe.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedTimeframe === timeframe.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-md text-gray-700 hover:bg-white border border-gray-200/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {timeframe.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Metrics Overview */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12" variants={itemVariants}>
          {metricCards.map((metric, index) => (
            <motion.div
              key={metric.title}
              className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1, type: "spring" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                  {metric.icon}
                </div>
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
              </div>
              
              <motion.div 
                className="text-3xl font-bold text-gray-900 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {metric.value.toLocaleString()}{metric.suffix}
              </motion.div>
              <h3 className="font-semibold text-gray-900 mb-1">{metric.title}</h3>
              <p className="text-gray-600 text-sm">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Engagement Chart */}
          <motion.div 
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg"
            variants={itemVariants}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <LineChart className="h-6 w-6 text-blue-500 mr-2" />
                Weekly Engagement Trends
              </h2>
              <motion.button
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <Filter className="h-4 w-4 text-gray-600" />
              </motion.button>
            </div>
            
            <div className="h-64 flex items-end justify-between space-x-2">
              {chartData.labels.map((label, index) => (
                <div key={label} className="flex-1 flex flex-col items-center">
                  <motion.div
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg mb-2"
                    initial={{ height: 0 }}
                    animate={{ height: `${(chartData.datasets[0]?.data[index] || 0) * 2.5}px` }}
                    transition={{ delay: index * 0.1, duration: 0.8 }}
                  />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Student Performance Distribution */}
          <motion.div 
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <PieChart className="h-6 w-6 text-green-500 mr-2" />
              Student Performance Distribution
            </h2>
            
            <div className="space-y-4">
              {studentPerformance.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 ${item.color} rounded-full mr-3`} />
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{item.count} students</span>
                    <span className="font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Subject Performance & Real-time Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Subject Performance */}
          <motion.div 
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 text-purple-500 mr-2" />
              Subject Performance Overview
            </h2>
            
            <div className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <motion.div
                  key={subject.subject}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-100 hover:to-gray-50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">{subject.subject.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{subject.subject}</h3>
                      <p className="text-gray-600 text-sm">Average Score</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl font-bold text-gray-900">{subject.score}%</span>
                    {subject.trend === 'up' ? (
                      <TrendingUp className={`h-5 w-5 ${subject.color}`} />
                    ) : (
                      <TrendingDown className={`h-5 w-5 ${subject.color}`} />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Real-time Activity Feed */}
          <motion.div 
            className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="h-6 w-6 text-yellow-500 mr-2" />
              Real-time Learning Activity
            </h2>
            
            <div className="space-y-4">
              {[
                { student: 'Emma Wilson', activity: 'Completed Te Tiriti lesson', time: '2 min ago', type: 'completion' },
                { student: 'James Smith', activity: 'Started Kākāpō project', time: '5 min ago', type: 'start' },
                { student: 'Sarah Chen', activity: 'Achieved 95% on Math quiz', time: '8 min ago', type: 'achievement' },
                { student: 'Alex Brown', activity: 'Downloaded Science resource', time: '12 min ago', type: 'download' },
                { student: 'Maya Patel', activity: 'Joined collaborative workspace', time: '15 min ago', type: 'join' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`w-3 h-3 rounded-full mr-4 ${
                    activity.type === 'completion' ? 'bg-green-500' :
                    activity.type === 'achievement' ? 'bg-yellow-500' :
                    activity.type === 'start' ? 'bg-blue-500' :
                    activity.type === 'download' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.student}</p>
                    <p className="text-gray-600 text-sm">{activity.activity}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold mb-4">Unlock Advanced Analytics Features</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get deeper insights with predictive analytics, custom reports, and AI-powered recommendations
          </p>
          <motion.button
            className="bg-white text-blue-600 px-12 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center mx-auto shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Globe className="h-6 w-6 mr-3" />
            Upgrade to Professional
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdvancedAnalyticsVisualization;