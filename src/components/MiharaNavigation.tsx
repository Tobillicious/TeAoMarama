import React from 'react';
import { Link } from 'react-router-dom';

const MiharaNavigation: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold hover:text-blue-200 transition-colors">
            🌟 Te Kete Ako
          </Link>
          <Link to="/resources" className="hover:text-blue-200 transition-colors">
            📚 Resources
          </Link>
          <Link to="/mihara" className="hover:text-blue-200 transition-colors">
            🤖 Mihara Dashboard
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm bg-green-500 px-2 py-1 rounded-full">
            🌟 Mihara Active
          </span>
          <span className="text-sm bg-blue-500 px-2 py-1 rounded-full">
            🚀 Great Migration
          </span>
        </div>
      </div>
    </div>
  );
};

export default MiharaNavigation;
