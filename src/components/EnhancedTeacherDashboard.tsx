import {
  AlertCircle,
  Award,
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  Leaf,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Student {
  id: string;
  name: string;
  engagement: number;
  culturalProgress: number;
  academicProgress: number;
  teReoUsage: number;
  lastActive: string;
  achievements: string[];
}

interface CulturalMetrics {
  teReoUsage: number;
  culturalEngagement: number;
  whakapapaConnections: number;
  kaitiakitangaActivities: number;
  totalCulturalPoints: number;
}

interface AcademicMetrics {
  averageEngagement: number;
  completionRate: number;
  assessmentScores: number;
  timeSpent: number;
  resourcesAccessed: number;
}

interface DashboardData {
  students: Student[];
  culturalMetrics: CulturalMetrics;
  academicMetrics: AcademicMetrics;
  recentActivity: Array<{
    id: string;
    type: 'lesson' | 'assessment' | 'cultural' | 'achievement';
    description: string;
    timestamp: string;
    student?: string;
  }>;
}

export const EnhancedTeacherDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'week' | 'month' | 'term'>('week');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setDashboardData({
        students: [
          {
            id: '1',
            name: 'Aroha Smith',
            engagement: 92,
            culturalProgress: 88,
            academicProgress: 85,
            teReoUsage: 45,
            lastActive: '2 hours ago',
            achievements: ['Te Reo Champion', 'Kaitiaki Helper', 'Math Explorer'],
          },
          {
            id: '2',
            name: 'Koa Johnson',
            engagement: 78,
            culturalProgress: 65,
            academicProgress: 82,
            teReoUsage: 32,
            lastActive: '1 day ago',
            achievements: ['Science Explorer', 'Team Player'],
          },
          {
            id: '3',
            name: 'Mana Williams',
            engagement: 95,
            culturalProgress: 92,
            academicProgress: 88,
            teReoUsage: 67,
            lastActive: '30 minutes ago',
            achievements: ['Cultural Leader', 'Te Reo Master', 'Whakapapa Explorer'],
          },
        ],
        culturalMetrics: {
          teReoUsage: 48,
          culturalEngagement: 82,
          whakapapaConnections: 76,
          kaitiakitangaActivities: 89,
          totalCulturalPoints: 295,
        },
        academicMetrics: {
          averageEngagement: 88,
          completionRate: 92,
          assessmentScores: 85,
          timeSpent: 1240, // minutes
          resourcesAccessed: 156,
        },
        recentActivity: [
          {
            id: '1',
            type: 'cultural',
            description: 'Mana completed Whakapapa mapping activity',
            timestamp: '2 hours ago',
            student: 'Mana Williams',
          },
          {
            id: '2',
            type: 'achievement',
            description: 'Aroha earned "Te Reo Champion" badge',
            timestamp: '4 hours ago',
            student: 'Aroha Smith',
          },
          {
            id: '3',
            type: 'lesson',
            description: 'Class completed Environmental Science: Māori Perspectives',
            timestamp: '1 day ago',
          },
          {
            id: '4',
            type: 'assessment',
            description: 'Algebra and Patterns assessment completed',
            timestamp: '2 days ago',
          },
        ],
      });

      setIsLoading(false);
    };

    loadDashboardData();
  }, [selectedTimeframe]);

  const getEngagementColor = (engagement: number) => {
    if (engagement >= 90) return 'text-green-600 bg-green-100';
    if (engagement >= 80) return 'text-blue-600 bg-blue-100';
    if (engagement >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCulturalProgressColor = (progress: number) => {
    if (progress >= 90) return 'text-green-600 bg-green-100';
    if (progress >= 80) return 'text-blue-600 bg-blue-100';
    if (progress >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'assessment':
        return <Target className="w-4 h-4 text-purple-600" />;
      case 'cultural':
        return <Leaf className="w-4 h-4 text-green-600" />;
      case 'achievement':
        return <Award className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Failed to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-gray-600">Mangakōtukutuku College - Year 8 Class</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value as 'week' | 'month' | 'term')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="term">This Term</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dashboardData.students.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Average Engagement</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dashboardData.academicMetrics.averageEngagement}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Cultural Engagement</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dashboardData.culturalMetrics.culturalEngagement}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {dashboardData.academicMetrics.completionRate}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Student Progress */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Student Progress</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.students.map((student) => (
                    <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{student.name}</h4>
                        <span className="text-sm text-gray-500">
                          Last active: {student.lastActive}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Engagement</p>
                          <div
                            className={`px-2 py-1 rounded text-sm font-medium ${getEngagementColor(
                              student.engagement,
                            )}`}
                          >
                            {student.engagement}%
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Cultural Progress</p>
                          <div
                            className={`px-2 py-1 rounded text-sm font-medium ${getCulturalProgressColor(
                              student.culturalProgress,
                            )}`}
                          >
                            {student.culturalProgress}%
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Academic</p>
                          <div className="px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800">
                            {student.academicProgress}%
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Te Reo Usage</p>
                          <div className="px-2 py-1 rounded text-sm font-medium bg-yellow-100 text-yellow-800">
                            {student.teReoUsage}%
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {student.achievements.map((achievement, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            <Award className="w-3 h-3 mr-1" />
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cultural Metrics & Recent Activity */}
          <div className="space-y-6">
            {/* Cultural Metrics */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-green-600" />
                  Cultural Intelligence
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Te Reo Māori Usage</span>
                    <span className="font-medium">{dashboardData.culturalMetrics.teReoUsage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${dashboardData.culturalMetrics.teReoUsage}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cultural Engagement</span>
                    <span className="font-medium">
                      {dashboardData.culturalMetrics.culturalEngagement}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${dashboardData.culturalMetrics.culturalEngagement}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Whakapapa Connections</span>
                    <span className="font-medium">
                      {dashboardData.culturalMetrics.whakapapaConnections}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${dashboardData.culturalMetrics.whakapapaConnections}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Kaitiakitanga Activities</span>
                    <span className="font-medium">
                      {dashboardData.culturalMetrics.kaitiakitangaActivities}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${dashboardData.culturalMetrics.kaitiakitangaActivities}%` }}
                    ></div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">
                        Total Cultural Points
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        {dashboardData.culturalMetrics.totalCulturalPoints}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.description}</p>
                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTeacherDashboard;
