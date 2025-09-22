import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, BarChart3, Calendar, Settings, Bell, 
  Search, Plus, Star, Download, Share2, Filter, Eye,
  CheckCircle, Clock, AlertTriangle, TrendingUp
} from 'lucide-react';

interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: string;
  culturalAlignment: 'high' | 'medium' | 'low';
  curriculumStandards: string[];
  createdAt: Date;
  status: 'draft' | 'published' | 'archived';
  studentEngagement?: number;
}

interface StudentProgress {
  studentId: string;
  name: string;
  overallProgress: number;
  recentActivity: string;
  culturalEngagement: number;
  nextMilestone: string;
}

interface DashboardStats {
  totalLessonPlans: number;
  activeStudents: number;
  avgEngagement: number;
  culturalSafetyScore: number;
  weeklyProgress: number;
}

const TeacherDashboardBeta: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'students' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  // Mock data - in production this would come from APIs
  const [stats] = useState<DashboardStats>({
    totalLessonPlans: 47,
    activeStudents: 28,
    avgEngagement: 84,
    culturalSafetyScore: 96,
    weeklyProgress: 12
  });

  const [lessonPlans] = useState<LessonPlan[]>([
    {
      id: '1',
      title: 'Early New Zealand History: Māori Settlement',
      subject: 'Social Studies',
      yearLevel: 'Year 8',
      duration: '50 minutes',
      culturalAlignment: 'high',
      curriculumStandards: ['SS 8.1', 'SS 8.3'],
      createdAt: new Date('2024-01-15'),
      status: 'published',
      studentEngagement: 92
    },
    {
      id: '2',
      title: 'Environmental Science: NZ Native Ecosystems',
      subject: 'Science',
      yearLevel: 'Year 9',
      duration: '60 minutes', 
      culturalAlignment: 'high',
      curriculumStandards: ['S 9.2', 'S 9.4'],
      createdAt: new Date('2024-01-18'),
      status: 'published',
      studentEngagement: 88
    },
    {
      id: '3',
      title: 'Te Reo Māori Integration: Basic Greetings',
      subject: 'Languages',
      yearLevel: 'Year 7',
      duration: '40 minutes',
      culturalAlignment: 'high',
      curriculumStandards: ['L 7.1', 'L 7.2'],
      createdAt: new Date('2024-01-20'),
      status: 'draft',
      studentEngagement: 95
    }
  ]);

  const [studentProgress] = useState<StudentProgress[]>([
    {
      studentId: '1',
      name: 'Aroha Williams',
      overallProgress: 87,
      recentActivity: 'Completed Māori Settlement assessment',
      culturalEngagement: 94,
      nextMilestone: 'Treaty of Waitangi module'
    },
    {
      studentId: '2', 
      name: 'James Chen',
      overallProgress: 78,
      recentActivity: 'Working on ecosystem project',
      culturalEngagement: 82,
      nextMilestone: 'Native bird identification'
    },
    {
      studentId: '3',
      name: 'Sophie Brown',
      overallProgress: 92,
      recentActivity: 'Completed Te Reo greetings',
      culturalEngagement: 88,
      nextMilestone: 'Cultural protocols module'
    }
  ]);

  const getCulturalAlignmentBadge = (alignment: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
      low: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[alignment as keyof typeof colors]}`}>
        {alignment === 'high' ? 'Tikanga Compliant' : 
         alignment === 'medium' ? 'Cultural Review' : 'Needs Cultural Input'}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-blue-100 text-blue-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Lesson Plans</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLessonPlans}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeStudents}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
              <p className="text-2xl font-bold text-gray-900">{stats.avgEngagement}%</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">Cultural Safety</p>
              <p className="text-2xl font-bold text-gray-900">{stats.culturalSafetyScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Plus className="h-6 w-6 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-blue-900">New Lesson</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <BarChart3 className="h-6 w-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">Analytics</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Users className="h-6 w-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Student Progress</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Calendar className="h-6 w-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">Schedule</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Published "Māori Settlement" lesson</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Clock className="h-5 w-5 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">3 students completed Environmental Science assessment</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Star className="h-5 w-5 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-900">Received 5-star rating from colleague</p>
              <p className="text-xs text-gray-500">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LessonsTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lesson plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Years</option>
              <option value="7">Year 7</option>
              <option value="8">Year 8</option>
              <option value="9">Year 9</option>
              <option value="10">Year 10</option>
            </select>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Subjects</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Science">Science</option>
              <option value="Languages">Languages</option>
              <option value="English">English</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Lesson
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessonPlans.map((lesson) => (
          <div key={lesson.id} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{lesson.title}</h4>
                <p className="text-sm text-gray-600">{lesson.subject} • {lesson.yearLevel}</p>
              </div>
              <div className="flex gap-2">
                {getStatusBadge(lesson.status)}
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{lesson.duration}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Cultural Alignment:</span>
                {getCulturalAlignmentBadge(lesson.culturalAlignment)}
              </div>
              {lesson.studentEngagement && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Student Engagement:</span>
                  <span className="font-medium text-green-600">{lesson.studentEngagement}%</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-gray-500">
                {lesson.createdAt.toLocaleDateString('en-NZ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const StudentsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Progress Overview</h3>
        <div className="space-y-4">
          {studentProgress.map((student) => (
            <div key={student.studentId} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.recentActivity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{student.overallProgress}%</p>
                  <p className="text-xs text-gray-500">Overall Progress</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="font-medium">{student.overallProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{width: `${student.overallProgress}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Cultural Engagement</span>
                    <span className="font-medium">{student.culturalEngagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{width: `${student.culturalEngagement}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Next Milestone:</span>
                <span className="font-medium text-purple-600">{student.nextMilestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AnalyticsTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Dashboard</h3>
        <div className="text-center py-12">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Advanced Analytics Coming Soon</h4>
          <p className="text-gray-600">Detailed insights into student engagement, cultural alignment, and curriculum effectiveness.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back! Here's what's happening with your classes today.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'lessons', name: 'Lesson Plans', icon: BookOpen },
              { id: 'students', name: 'Students', icon: Users },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'lessons' && <LessonsTab />}
        {activeTab === 'students' && <StudentsTab />}
        {activeTab === 'analytics' && <AnalyticsTab />}
      </div>
    </div>
  );
};

export default TeacherDashboardBeta;