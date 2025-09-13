import type { BookOpen, GraduationCap, Home, LogOut, Menu, Settings, Shield, User, Users, X } from 'lucide-react';
import {  } from 'lucide-react';
import React, { useState } from 'react';
import type { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/DualRoleAuthProvider';

const RoleAdaptiveNavigation: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getRoleBasedNavItems = () => {
    if (!currentUser) return [];

    const baseItems = [
      { name: 'Home', path: '/', icon: Home },
      { name: 'Resources', path: '/resources', icon: BookOpen },
    ];

    switch (currentUser.role) {
      case 'teacher':
        return [
          ...baseItems,
          { name: 'Teacher Dashboard', path: '/teacher-dashboard', icon: GraduationCap },
          { name: 'Students', path: '/students', icon: Users },
          { name: 'Assessments', path: '/assessments', icon: Shield },
          { name: 'Settings', path: '/settings', icon: Settings },
        ];
      case 'student':
        return [
          ...baseItems,
          { name: 'Student Dashboard', path: '/student-dashboard', icon: GraduationCap },
          { name: 'My Progress', path: '/progress', icon: BookOpen },
          { name: 'Assignments', path: '/assignments', icon: Shield },
          { name: 'Profile', path: '/profile', icon: User },
        ];
      case 'admin':
        return [
          ...baseItems,
          { name: 'Admin Dashboard', path: '/admin-dashboard', icon: Shield },
          { name: 'User Management', path: '/users', icon: Users },
          { name: 'System Settings', path: '/system-settings', icon: Settings },
        ];
      default:
        return baseItems;
    }
  };

  const navItems = getRoleBasedNavItems();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Te Ao Mārama</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {currentUser?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="text-sm">
                <p className="text-gray-900 font-medium">{currentUser?.name || 'User'}</p>
                <p className="text-gray-500 capitalize">{currentUser?.role || 'user'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile User Info */}
            <div className="px-3 py-2 border-t border-gray-200 mt-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="text-sm">
                  <p className="text-gray-900 font-medium">{currentUser?.name || 'User'}</p>
                  <p className="text-gray-500 capitalize">{currentUser?.role || 'user'}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center w-full mt-3 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default RoleAdaptiveNavigation;
