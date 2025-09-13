import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Heart, Star } from 'lucide-react';

interface DemoStats {
  conceptsLearned: number;
  timeSpent: number;
  culturalEngagement: number;
  streak: number;
}

export function QuickLearningDemo() : void {
  const [stats, setStats] = useState<DemoStats>({
    conceptsLearned: 0,
    timeSpent: 0,
    culturalEngagement: 0,
    streak: 0
  });

  const [isActive, setIsActive] = useState(false);

  // Simulate learning progress
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setStats(prev => ({
          conceptsLearned: Math.min(25, prev.conceptsLearned + 1),
          timeSpent: prev.timeSpent + 2,
          culturalEngagement: Math.min(100, prev.culturalEngagement + 3),
          streak: Math.min(30, prev.streak + 1)
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const resetDemo = () => {
    setStats({
      conceptsLearned: 0,
      timeSpent: 0,
      culturalEngagement: 0,
      streak: 0
    });
    setIsActive(false);
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          🎓 Interactive Learning Demo
        </h3>
        <p className="text-gray-600">
          See how Te Kura o TeAoMarama enhances your learning journey
        </p>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
          <BookOpen className="w-6 h-6 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-800">
            {stats.conceptsLearned}
          </div>
          <div className="text-xs text-green-600">Concepts</div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
          <Brain className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-800">
            {Math.floor(stats.timeSpent / 60)}m
          </div>
          <div className="text-xs text-blue-600">Learning Time</div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border border-orange-200">
          <Heart className="w-6 h-6 text-orange-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-800">
            {stats.culturalEngagement}%
          </div>
          <div className="text-xs text-orange-600">Cultural</div>
        </div>

        <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
          <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-800">
            {stats.streak}
          </div>
          <div className="text-xs text-purple-600">Day Streak</div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Overall Progress</span>
          <span>{Math.round((stats.conceptsLearned / 25) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${(stats.conceptsLearned / 25) * 100}%` }}
          />
        </div>
      </div>

      {/* Cultural Engagement Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Cultural Engagement / Hononga Ahurea</span>
          <span>{stats.culturalEngagement}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${stats.culturalEngagement}%` }}
          />
        </div>
      </div>

      {/* Demo Controls */}
      <div className="text-center space-y-3">
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isActive ? 'Pause Learning' : 'Start Learning Demo'}
          </button>
          
          <button
            onClick={resetDemo}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
          >
            Reset Demo
          </button>
        </div>

        {isActive && (
          <div className="text-center p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-800 font-medium">
              🌟 Learning in Progress! 
            </p>
            <p className="text-sm text-green-700 mt-1">
              Your cultural engagement and knowledge are growing with each concept
            </p>
          </div>
        )}

        {stats.conceptsLearned >= 25 && (
          <div className="text-center p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800 font-bold">
              🏆 Congratulations! Demo Complete!
            </p>
            <p className="text-sm text-yellow-700 mt-1">
              You've experienced the full learning journey of Te Kura o TeAoMarama
            </p>
          </div>
        )}
      </div>

      {/* Features Highlight */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Platform Features Demonstrated:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Progress tracking & analytics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Cultural engagement metrics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Interactive learning elements</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Gamification & achievements</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>Te Reo Māori integration</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>Real-time learning feedback</span>
          </div>
        </div>
      </div>
    </div>
  );
}