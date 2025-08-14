import React, { useState, useEffect } from 'react';
import { useAuth } from '../services/useAuth';
import { resourceService, type TeachingResource } from '../services/ResourceService';
import { BookOpen, Play, Download, Heart, Clock, Trophy, TrendingUp, Calendar } from 'lucide-react';

interface StudentProgress {
  resourcesCompleted: number;
  totalTimeSpent: number; // minutes
  streakDays: number;
  favoriteSubjects: string[];
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: string;
  type: 'completed' | 'started' | 'liked' | 'downloaded';
  resourceTitle: string;
  timestamp: string;
  timeSpent?: number;
}

const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const [recentResources, setRecentResources] = useState<TeachingResource[]>([]);
  const [recommendedResources, setRecommendedResources] = useState<TeachingResource[]>([]);
  const [progress, setProgress] = useState<StudentProgress>({
    resourcesCompleted: 0,
    totalTimeSpent: 0,
    streakDays: 0,
    favoriteSubjects: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      // Get student-appropriate resources
      const recentResult = await resourceService.searchResources({
        sortBy: 'recent',
        limit: 6
      }, 'student');

      const recommendedResult = await resourceService.searchResources({
        sortBy: 'popular',
        limit: 8
      }, 'student');

      setRecentResources(recentResult.resources);
      setRecommendedResources(recommendedResult.resources);

      // Mock student progress data
      setProgress({
        resourcesCompleted: 23,
        totalTimeSpent: 1247, // minutes
        streakDays: 7,
        favoriteSubjects: ['Mathematics', 'Science', 'Te Reo Māori'],
        recentActivity: [
          {
            id: '1',
            type: 'completed',
            resourceTitle: 'Photosynthesis Interactive Lab',
            timestamp: '2025-01-15T10:30:00Z',
            timeSpent: 45
          },
          {
            id: '2', 
            type: 'started',
            resourceTitle: 'Te Reo Māori Greetings',
            timestamp: '2025-01-15T09:15:00Z'
          },
          {
            id: '3',
            type: 'liked',
            resourceTitle: 'Statistics Real-World Problems',
            timestamp: '2025-01-14T14:20:00Z'
          }
        ]
      });

      setLoading(false);
    } catch (error) {
      console.error('Failed to load student data:', error);
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return <Trophy className="w-4 h-4 text-green-600" />;
      case 'started': return <Play className="w-4 h-4 text-blue-600" />;
      case 'liked': return <Heart className="w-4 h-4 text-red-600" />;
      case 'downloaded': return <Download className="w-4 h-4 text-gray-600" />;
      default: return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatTimeAgo = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const ProgressCard: React.FC<{ 
    title: string; 
    value: string | number; 
    icon: React.ReactNode; 
    color: string;
    subtitle?: string;
  }> = ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const ResourceCard: React.FC<{ 
    resource: TeachingResource; 
    showProgress?: boolean;
    progressPercent?: number;
  }> = ({ resource, showProgress = false, progressPercent = 0 }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 group cursor-pointer">
      {/* Cultural Content Badge */}
      {resource.culturalContent.hasMaoriContent && (
        <div className="mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Māori Content
          </span>
        </div>
      )}

      {/* Resource Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-500 capitalize">
            {resource.type.replace('_', ' ')}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Heart className="w-4 h-4 text-gray-300 hover:text-red-500 cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Resource Title & Description */}
      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {resource.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {resource.description}
      </p>

      {/* Progress Bar (if applicable) */}
      {showProgress && (
        <div className="mb-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Resource Metadata */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>{resource.subject}</span>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>{resource.content.duration || 30}min</span>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
        {showProgress && progressPercent > 0 ? 'Continue Learning' : 'Start Learning'}
      </button>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your learning dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {currentUser?.email?.split('@')[0] || 'Student'}! 
              </h1>
              <p className="text-gray-600 mt-1">
                Ready to continue your learning journey?
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{progress.streakDays} day streak!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProgressCard
            title="Resources Completed"
            value={progress.resourcesCompleted}
            icon={<Trophy className="w-6 h-6 text-white" />}
            color="bg-green-500"
            subtitle="This term"
          />
          <ProgressCard
            title="Learning Time"
            value={`${Math.floor(progress.totalTimeSpent / 60)}h ${progress.totalTimeSpent % 60}m`}
            icon={<Clock className="w-6 h-6 text-white" />}
            color="bg-blue-500"
            subtitle="Total this month"
          />
          <ProgressCard
            title="Current Streak"
            value={`${progress.streakDays} days`}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            color="bg-orange-500"
            subtitle="Keep it up!"
          />
          <ProgressCard
            title="Favorite Subject"
            value={progress.favoriteSubjects[0] || 'Mathematics'}
            icon={<BookOpen className="w-6 h-6 text-white" />}
            color="bg-purple-500"
            subtitle="Most time spent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Continue Learning */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentResources.slice(0, 4).map((resource, index) => (
                  <ResourceCard 
                    key={resource.id} 
                    resource={resource}
                    showProgress={index < 2}
                    progressPercent={index === 0 ? 65 : index === 1 ? 30 : 0}
                  />
                ))}
              </div>
            </section>

            {/* Recommended for You */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  See more →
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedResources.slice(0, 4).map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar - Recent Activity & Stats */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                {progress.recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 truncate">
                        {activity.resourceTitle}
                      </p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <span className="capitalize">{activity.type}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(activity.timestamp)}</span>
                        {activity.timeSpent && (
                          <>
                            <span>•</span>
                            <span>{activity.timeSpent}min</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Progress */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Progress</h3>
              
              <div className="space-y-4">
                {progress.favoriteSubjects.map((subject, index) => (
                  <div key={subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{subject}</span>
                      <span className="text-gray-500">{85 - index * 10}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{ width: `${85 - index * 10}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Goals */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">This Week's Goal</h3>
              <p className="text-blue-700 text-sm mb-4">
                Complete 5 resources and maintain your learning streak!
              </p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-700">Progress</span>
                <span className="text-blue-700">3/5 resources</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;