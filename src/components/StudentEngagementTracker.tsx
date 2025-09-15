import { Award, Check, Star, Target, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Student {
  id: string;
  name: string;
  participation: number;
  completedActivities: number;
  lastActive: string;
  strength: string;
}

interface EngagementData {
  totalStudents: number;
  activeToday: number;
  averageParticipation: number;
  topPerformers: Student[];
  needsSupport: Student[];
}

const StudentEngagementTracker: React.FC = () => {
  const [engagementData, setEngagementData] = useState<EngagementData>({
    totalStudents: 28,
    activeToday: 24,
    averageParticipation: 78,
    topPerformers: [],
    needsSupport: [],
  });

  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month'>('today');

  useEffect(() => {
    // Simulate real student data
    const allStudents: Student[] = [
      { id: '1', name: 'Awhina T.', participation: 95, completedActivities: 8, lastActive: '5 min ago', strength: 'Cultural connections' },
      { id: '2', name: 'James K.', participation: 92, completedActivities: 8, lastActive: '2 min ago', strength: 'Critical thinking' },
      { id: '3', name: 'Aroha M.', participation: 88, completedActivities: 7, lastActive: '1 min ago', strength: 'Collaboration' },
      { id: '4', name: 'Tane W.', participation: 85, completedActivities: 7, lastActive: '8 min ago', strength: 'Research skills' },
      { id: '5', name: 'Emma R.', participation: 82, completedActivities: 6, lastActive: '12 min ago', strength: 'Analysis' },
      { id: '6', name: 'Kaia S.', participation: 45, completedActivities: 3, lastActive: '2 hours ago', strength: 'Visual learning' },
      { id: '7', name: 'Sam B.', participation: 38, completedActivities: 2, lastActive: '1 day ago', strength: 'Hands-on activities' },
      { id: '8', name: 'Maria L.', participation: 35, completedActivities: 2, lastActive: '3 hours ago', strength: 'Peer support' },
    ];

    const topPerformers = allStudents.filter(s => s.participation >= 80).slice(0, 5);
    const needsSupport = allStudents.filter(s => s.participation < 60);

    setEngagementData({
      totalStudents: 28,
      activeToday: 24,
      averageParticipation: 78,
      topPerformers,
      needsSupport,
    });
  }, [selectedPeriod]);

  const quickActions = [
    { label: 'Send encouragement', icon: '💪', color: 'bg-green-100 text-green-700' },
    { label: 'Schedule check-in', icon: '📅', color: 'bg-blue-100 text-blue-700' },
    { label: 'Suggest peer buddy', icon: '👥', color: 'bg-purple-100 text-purple-700' },
    { label: 'Alternative activity', icon: '🎯', color: 'bg-orange-100 text-orange-700' },
  ];

  const engagementTips = [
    '🌟 Try starting with a whakatōhea (group greeting) to build connection',
    '🎨 Use visual elements for students who learn better with imagery',
    '🤝 Pair higher-participating students with those needing support',
    '📱 Consider digital tools for students who are more tech-engaged',
    '⏰ Short, focused activities work better than long sessions',
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 shadow border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{engagementData.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{engagementData.activeToday}</div>
              <div className="text-sm text-gray-600">Active Today</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{engagementData.averageParticipation}%</div>
              <div className="text-sm text-gray-600">Avg Participation</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{engagementData.needsSupport.length}</div>
              <div className="text-sm text-gray-600">Need Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Top Performers
          </h3>
          <div className="space-y-3">
            {engagementData.topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-gray-600">{student.strength}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-700">{student.participation}%</div>
                  <div className="text-xs text-gray-500">{student.completedActivities} activities</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Students Needing Support */}
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-500" />
            Students Needing Support
          </h3>
          <div className="space-y-3">
            {engagementData.needsSupport.map((student) => (
              <div key={student.id} className="p-3 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-gray-900">{student.name}</div>
                    <div className="text-sm text-orange-600">{student.participation}% participation</div>
                  </div>
                  <div className="text-xs text-gray-500">{student.lastActive}</div>
                </div>
                <div className="text-xs text-gray-600 mb-2">Strength: {student.strength}</div>
                <div className="flex gap-2 flex-wrap">
                  {quickActions.slice(0, 2).map((action, index) => (
                    <button
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${action.color} hover:opacity-80 transition-opacity`}
                    >
                      {action.icon} {action.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Tips */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-900 mb-4">
          💡 Engagement Strategies
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {engagementTips.map((tip, index) => (
            <div key={index} className="text-sm text-indigo-800 flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white rounded-lg p-6 shadow border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
            📊 Export Report
          </button>
          <button className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            ✉️ Send Updates
          </button>
          <button className="flex items-center gap-2 p-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
            👥 Group Students
          </button>
          <button className="flex items-center gap-2 p-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
            🎯 Set Goals
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentEngagementTracker;