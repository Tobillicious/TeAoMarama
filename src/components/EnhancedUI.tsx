import type { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { Bell, Heart, Moon, Search, Settings, Sparkles, Star, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface EnhancedUIProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark' | 'auto';
}

const EnhancedUI: React.FC<EnhancedUIProps> = ({ children, theme = 'auto' }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<
    Array<{
      id: string;
      type: 'info' | 'success' | 'warning' | 'error';
      message: string;
      timestamp: Date;
    }>
  >([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Function to add notifications (can be used by child components)
  const addNotification = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
    const newNotification = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date(),
    };
    setNotifications((prev) => [...prev, newNotification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id));
    }, 5000);
  };

  // Add a demo notification on mount to show the system works
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification('success', 'Welcome to Te Ao Mārama!');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const getThemeColors = () => {
    if (currentTheme === 'dark') {
      return {
        bg: 'bg-gray-900',
        text: 'text-white',
        primary: 'bg-blue-600',
        secondary: 'bg-purple-600',
        accent: 'bg-emerald-500',
      };
    }
    return {
      bg: 'bg-white',
      text: 'text-gray-900',
      primary: 'bg-blue-500',
      secondary: 'bg-purple-500',
      accent: 'bg-emerald-400',
    };
  };

  const colors = getThemeColors();

  if (isLoading) {
    return (
      <div className={`min-h-screen ${colors.bg} ${colors.text} flex items-center justify-center`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full"
          />
          <h2 className="text-2xl font-bold mb-2">Te Ao Mārama</h2>
          <p className="text-gray-500">Loading your learning journey...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${colors.bg} ${colors.text} transition-colors duration-300`}>
      {/* Enhanced Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`sticky top-0 z-50 ${colors.bg} border-b border-gray-200 dark:border-gray-700`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Te Ao Mārama</span>
            </motion.div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {currentTheme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Settings className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Enhanced Footer */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`${colors.bg} border-t border-gray-200 dark:border-gray-700 py-8`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Te Ao Mārama</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Empowering learning through Māori wisdom and modern education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Lessons</li>
                <li>Activities</li>
                <li>Assessments</li>
                <li>Cultural Content</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Feedback</li>
                <li>Documentation</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-blue-500 text-white rounded-lg"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-purple-500 text-white rounded-lg"
                >
                  <Star className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Te Ao Mārama. All rights reserved.</p>
          </div>
        </div>
      </motion.footer>

      {/* Notification System */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed top-20 right-4 p-4 rounded-lg shadow-lg max-w-sm z-50 ${
              notification.type === 'success'
                ? 'bg-green-500 text-white'
                : notification.type === 'error'
                ? 'bg-red-500 text-white'
                : notification.type === 'warning'
                ? 'bg-yellow-500 text-black'
                : 'bg-blue-500 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm opacity-90">{notification.timestamp.toLocaleTimeString()}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
                }
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedUI;
