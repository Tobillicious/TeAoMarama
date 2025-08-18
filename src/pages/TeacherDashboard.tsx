/**
 * TeacherDashboard - Comprehensive dashboard for Te Kete Ako educators at Mangakotukutuku College
 *
 * Features:
 * - Modern teacher-focused layout with sidebar navigation
 * - Beautiful UI using Te Kete Ako design system (porcelain white, gold, royal blue)
 * - Student progress overview and management
 * - Resource library with cultural content curation
 * - Assessment tools and cultural approval workflow
 * - Professional interface ready for alpha testing
 *
 * Design Philosophy:
 * - Clean, sophisticated aesthetic for professional educators
 * - Cultural safety and Māori perspectives embedded throughout
 * - Quick access to essential teaching tools
 * - Data-driven insights for improved student outcomes
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import './TeacherDashboard.css';

// TypeScript interfaces for comprehensive dashboard data
interface TeacherProfile {
  ___id: string;
  name: string;
  email: string;
  classes: ClassInfo[];
  culturalCompetency: number;
  yearsExperience: number;
  subjects: string[];
  yearLevels: number[];
  currentTerm: number;
  currentWeek: number;
  school: string;
  culturalBackground: string;
}

interface ClassInfo {
  ___id: string;
  name: string;
  subject: string;
  yearLevel: number;
  studentCount: number;
}

interface DashboardData {
  teacher: TeacherProfile;
  recentActivities: Activity[];
  upcomingDeadlines: Deadline[];
  studentProgress: StudentProgress[];
  recentResources: Resource[];
  upcomingAssessments: Assessment[];
  culturalContent: CulturalContent[];
  quickStats: QuickStats;
}

interface Activity {
  ___id: string;
  type: string;
  description: string;
  timestamp: string;
}

interface Deadline {
  ___id: string;
  title: string;
  date: string;
  priority: 'high' | 'medium' | 'low';
}

interface StudentProgress {
  lastAssessment?: string;
  studentId: string;
  name: string;
  progress: number;
  culturalEngagement: number;
  id?: string;
  studentName?: string;
  yearLevel?: number;
  subject?: string;
  currentLevel?: string;
  progressPercentage?: number;
}

interface Resource {
  ___id: string;
  __title: string;
  title?: string;
  type: string;
  _____subject: string;
  subject?: string;
  yearLevel: number;
  nzcCodes: string[];
  culturalContext: boolean;
  approvalStatus: string;
  lastModified: string;
  author: string;
  id?: string;
}

interface Assessment {
  ___id: string;
  title: string;
  type: string;
  _____subject: string;
  yearLevel: number;
  dueDate: string;
  status: string;
  priority: 'high' | 'medium' | 'low';
  id?: string;
  subject?: string;
  completionRate?: number;
  averageScore?: number;
  culturalAlignment?: boolean;
}

interface CulturalContent {
  ___id: string;
  title: string;
  type: string;
  culturalContext: string;
  teReoContent: boolean;
  approvalStatus: string;
  lastModified: string;
  id?: string;
  iwi?: string;
  region?: string;
  reviewer?: string;
  culturalAdvisor?: string;
}

interface QuickStats {
  totalStudents: number;
  activeResources: number;
  pendingAssessments: number;
  culturalEngagement: number;
  resourcesCreated?: number;
  assessmentsCompleted?: number;
  culturalContentApproved?: number;
}

export default function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<
    'overview' | 'students' | 'resources' | 'assessments' | 'cultural'
  >('overview');
  const [sidebarCollapsed] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In production, this would fetch from your API
      const response = await fetch('/api/teacher-dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch {
      console.warn('API unavailable, using sample data for alpha testing');
      setDashboardData(getSampleDashboardData());
    }
    setLoading(false);
  };

  const getSampleDashboardData = (): DashboardData => ({
    teacher: {
      ___id: 'teacher_001',
      name: 'Kaiako Sarah Thompson',
      email: 'sarah.thompson@mangakotukutuku.ac.nz',
      classes: [
        {
          ___id: 'class_001',
          name: 'Year 8 Mathematics',
          subject: 'Mathematics',
          yearLevel: 8,
          studentCount: 24,
        },
      ],
      culturalCompetency: 85,
      yearsExperience: 12,
      subjects: ['Mathematics', 'Science', 'Te Reo Māori'],
      yearLevels: [7, 8, 9],
      currentTerm: 3,
      currentWeek: 7,
      school: 'Mangakotukutuku College',
      culturalBackground: 'Ngāti Tūwharetoa',
    },
    studentProgress: [
      {
        studentId: 'student_001',
        name: 'Aroha Williams',
        progress: 78,
        culturalEngagement: 85,
      },
      {
        studentId: 'student_002',
        name: 'Tane Johnson',
        progress: 65,
        culturalEngagement: 70,
      },
      {
        studentId: 'student_003',
        name: 'Kaia Patel',
        progress: 89,
        culturalEngagement: 90,
      },
    ],
    recentResources: [
      {
        ___id: 'resource_001',
        __title: 'Y8 Fractions with Traditional Māori Games',
        type: 'lesson',
        _____subject: 'Mathematics',
        yearLevel: 8,
        nzcCodes: ['NA4-1', 'NA4-2'],
        culturalContext: true,
        approvalStatus: 'approved',
        lastModified: '2024-01-15',
        author: 'Sarah Thompson',
      },
    ],
    upcomingAssessments: [
      {
        ___id: 'assessment_001',
        title: 'Y8 Fractions Assessment',
        type: 'test',
        _____subject: 'Mathematics',
        yearLevel: 8,
        dueDate: '2024-01-20',
        status: 'pending',
        priority: 'high',
      },
    ],
    culturalContent: [
      {
        ___id: 'cultural_001',
        title: 'Māori Number Systems',
        type: 'resource',
        culturalContext: 'Traditional counting methods',
        teReoContent: true,
        approvalStatus: 'pending',
        lastModified: '2024-01-10',
      },
    ],
    recentActivities: [],
    upcomingDeadlines: [],
    quickStats: {
      totalStudents: 72,
      activeResources: 15,
      pendingAssessments: 3,
      culturalEngagement: 85,
      resourcesCreated: 8,
      assessmentsCompleted: 12,
      culturalContentApproved: 5,
    },
  });

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-porcelain)' }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: 'var(--color-gold)' }}
          ></div>
          <p className="mt-4 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-porcelain)' }}
      >
        <div className="text-center">
          <p className="text-lg text-red-600">Unable to load dashboard data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-porcelain)' }}>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full transition-all duration-300 ${
          sidebarCollapsed ? 'w-16' : 'w-72'
        }`}
        style={{ backgroundColor: 'var(--color-royal-blue)' }}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-gold)' }}
            >
              <span className="text-lg">🌿</span>
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 className="font-bold text-white">TeAoMarama</h2>
                <p className="text-xs text-white/70">Teacher Dashboard</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { ___id: 'overview', label: 'Dashboard Overview', icon: '📊' },
              { ___id: 'students', label: 'Student Progress', icon: '👥' },
              { ___id: 'resources', label: 'Resource Library', icon: '📚' },
              { ___id: 'assessments', label: 'Assessment Tools', icon: '📋' },
              { ___id: 'cultural', label: 'Cultural Content', icon: '🌿' },
            ].map((item) => (
              <button
                key={item.___id}
                onClick={() =>
                  setSelectedView(
                    item.___id as
                      | 'overview'
                      | 'students'
                      | 'resources'
                      | 'assessments'
                      | 'cultural',
                  )
                }
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selectedView === item.___id ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
                style={{
                  backgroundColor:
                    selectedView === item.___id ? 'var(--color-gold)' : 'transparent',
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Teacher Profile */}
        {!sidebarCollapsed && (
          <div
            className="absolute bottom-0 left-0 right-0 p-6 border-t"
            style={{ borderColor: 'rgba(255, 215, 0, 0.2)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--color-gold)' }}
              >
                <span className="text-lg">👩‍🏫</span>
              </div>
              <div>
                <p className="font-medium text-white">{dashboardData.teacher.name}</p>
                <p className="text-xs text-white/70">
                  {dashboardData.teacher.subjects.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
        {/* Header */}
        <header className="border-b p-6" style={{ borderColor: 'var(--color-gold)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Kia ora, {dashboardData.teacher.name.split(' ')[1]} 👋
              </h1>
              <p>
                Term {dashboardData.teacher.currentTerm}, Week {dashboardData.teacher.currentWeek} •
                Years {dashboardData.teacher.yearLevels.join(', ')} •
                {dashboardData.teacher.subjects.join(' & ')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                style={{
                  backgroundColor: 'var(--color-pounamu)',
                  color: 'white',
                }}
              >
                📝 Create Resource
              </Button>
              <Button variant="muted">🔔 Notifications</Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {selectedView === 'overview' && <OverviewView data={dashboardData} />}
          {selectedView === 'students' && <StudentsView data={dashboardData} />}
          {selectedView === 'resources' && <ResourcesView data={dashboardData} />}
          {selectedView === 'assessments' && <AssessmentsView data={dashboardData} />}
          {selectedView === 'cultural' && <CulturalView data={dashboardData} />}
        </div>
      </main>
    </div>
  );
}

// Dashboard Views
function OverviewView({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Students"
          value={data.quickStats.totalStudents}
          icon="👥"
          color="var(--color-pounamu)"
        />
        <StatsCard
          title="Resources Created"
          value={data.quickStats.resourcesCreated || 0}
          icon="📚"
          color="var(--color-kowhai)"
        />
        <StatsCard
          title="Assessments"
          value={data.quickStats.assessmentsCompleted || 0}
          icon="📋"
          color="var(--color-moana)"
        />
        <StatsCard
          title="Cultural Content"
          value={data.quickStats.culturalContentApproved || 0}
          icon="🌿"
          color="var(--color-primary)"
        />
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>⚡</span>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.recentResources.map((resource) => (
              <div key={resource.___id} className="flex items-center gap-3 p-3 rounded-lg">
                <span className="text-2xl">📝</span>
                <div className="flex-1">
                  <p className="font-medium">{resource.__title}</p>
                  <p className="text-sm">
                    {resource._____subject} • Year {resource.yearLevel} •{' '}
                    {formatDate(resource.lastModified)}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    resource.approvalStatus === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : resource.approvalStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {resource.approvalStatus}
                </span>
              </div>
            ))}
            <Link
              to="/resources"
              className="text-center block py-2 rounded-lg transition-colors"
              style={{
                color: 'var(--color-pounamu)',
                backgroundColor: 'rgba(27, 127, 90, 0.05)',
              }}
            >
              View All Resources →
            </Link>
          </CardContent>
        </Card>

        {/* Student Progress Highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📈</span>
              Student Progress Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.studentProgress.slice(0, 3).map((student) => (
              <div key={student.studentId} className="flex items-center gap-3 p-3 rounded-lg">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      student.culturalEngagement >= 80
                        ? 'var(--color-success)'
                        : student.culturalEngagement >= 60
                        ? 'var(--color-warning)'
                        : 'var(--color-error)',
                  }}
                >
                  <span className="text-white text-sm font-bold">{student.progress}%</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm">
                    Progress: {student.progress}% • Cultural: {student.culturalEngagement}%
                  </p>
                </div>
                {student.culturalEngagement < 60 && (
                  <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                    Needs attention
                  </span>
                )}
              </div>
            ))}
            <Link
              to="/students"
              className="text-center block py-2 rounded-lg transition-colors"
              style={{
                color: 'var(--color-pounamu)',
                backgroundColor: 'rgba(27, 127, 90, 0.05)',
              }}
            >
              View All Students →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📅</span>
            Upcoming Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.upcomingAssessments.map((assessment) => (
              <div key={assessment.___id} className="p-4 rounded-lg border">
                <h4 className="font-medium mb-2">{assessment.title}</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    📚 {assessment._____subject} • Year {assessment.yearLevel}
                  </p>
                  <p>📅 Due: {formatDate(assessment.dueDate)}</p>
                  <p>📊 Completion: {assessment.completionRate || 0}%</p>
                  {assessment.culturalAlignment && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      🌿 Culturally aligned
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StudentsView({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Student Progress Management</h2>
        <Button variant="primary">📊 Generate Progress Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.studentProgress.map((student) => (
          <Card key={student.studentId}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      student.culturalEngagement >= 80
                        ? 'var(--color-success)'
                        : student.culturalEngagement >= 60
                        ? 'var(--color-warning)'
                        : 'var(--color-error)',
                  }}
                >
                  <span className="text-white font-bold">{student.progressPercentage}%</span>
                </div>
                <div>
                  <h3 className="font-bold">{student.name}</h3>
                  <p className="text-sm">
                    Year {student.yearLevel} • {student.subject}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Current Level:</span>
                  <span className="font-medium">{student.currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cultural Engagement:</span>
                  <span
                    className={`font-medium ${
                      student.culturalEngagement >= 80
                        ? 'text-green-600'
                        : student.culturalEngagement >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {student.culturalEngagement}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Assessment:</span>
                  <span className="font-medium">
                    {student.lastAssessment ? formatDate(student.lastAssessment) : 'No assessment'}
                  </span>
                </div>
              </div>

              {student.culturalEngagement < 60 && (
                <div className="mt-4 p-3 rounded-lg bg-orange-50 border border-orange-200">
                  <p className="text-sm text-orange-800 font-medium">⚠️ Needs attention</p>
                </div>
              )}

              <Button variant="muted" className="w-full mt-4">
                View Student Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ResourcesView({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Resource Library</h2>
        <div className="flex gap-3">
          <Button variant="muted">📁 Browse Templates</Button>
          <Button variant="primary">➕ Create New Resource</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.recentResources.map((resource) => (
          <Card key={resource.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">
                  {resource.type === 'lesson'
                    ? '📝'
                    : resource.type === 'activity'
                    ? '🎯'
                    : resource.type === 'assessment'
                    ? '📋'
                    : resource.type === 'handout'
                    ? '📄'
                    : '🌿'}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    resource.approvalStatus === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : resource.approvalStatus === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {resource.approvalStatus}
                </span>
              </div>

              <h3 className="font-bold mb-2">{resource.__title}</h3>

              <div className="space-y-1 text-sm mb-4">
                <p>
                  📚 {resource.subject} • Year {resource.yearLevel}
                </p>
                <p>🏷️ {resource.nzcCodes.join(', ')}</p>
                <p>👤 By {resource.author}</p>
                <p>📅 Modified {formatDate(resource.lastModified)}</p>
              </div>

              {resource.culturalContext && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    🌿 Cultural context included
                  </span>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="muted" size="sm" className="flex-1">
                  👁️ Preview
                </Button>
                <Button variant="primary" size="sm" className="flex-1">
                  ✏️ Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AssessmentsView({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Assessment Tools</h2>
        <Button variant="primary">📝 Create Assessment</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.upcomingAssessments.map((assessment) => (
          <Card key={assessment.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📋</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    assessment.type === 'summative'
                      ? 'bg-blue-100 text-blue-800'
                      : assessment.type === 'formative'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {assessment.type}
                </span>
              </div>

              <h3 className="font-bold mb-2">{assessment.title}</h3>

              <div className="space-y-2 text-sm mb-4">
                <p>
                  📚 {assessment.subject} • Year {assessment.yearLevel}
                </p>
                <p>📅 Due: {formatDate(assessment.dueDate)}</p>
                <p>📊 Completion: {assessment.completionRate}%</p>
                {assessment.averageScore && <p>🎯 Average Score: {assessment.averageScore}%</p>}
              </div>

              {assessment.culturalAlignment && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    🌿 Culturally aligned
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <Button variant="primary" className="w-full">
                  📊 View Results
                </Button>
                <Button variant="muted" className="w-full">
                  ✏️ Edit Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CulturalView({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Cultural Content Approval Workflow</h2>
        <Button variant="primary">🌿 Submit for Review</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.culturalContent.map((content) => (
          <Card key={content.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">
                  {content.type === 'story'
                    ? '📖'
                    : content.type === 'video'
                    ? '🎥'
                    : content.type === 'activity'
                    ? '🎯'
                    : '📄'}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    content.approvalStatus === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : content.approvalStatus === 'pending_review'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {content.approvalStatus.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-bold mb-2">{content.title}</h3>

              <div className="space-y-1 text-sm mb-4">
                {content.iwi && <p>🏛️ Iwi: {content.iwi}</p>}
                {content.region && <p>🗺️ Region: {content.region}</p>}
                {content.reviewer && <p>👤 Reviewer: {content.reviewer}</p>}
                {content.culturalAdvisor && <p>🎓 Cultural Advisor: {content.culturalAdvisor}</p>}
              </div>

              <div className="space-y-2">
                <Button variant="muted" className="w-full">
                  👁️ Review Content
                </Button>
                {content.approvalStatus === 'approved' && (
                  <Button variant="primary" className="w-full">
                    📚 Add to Resources
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cultural Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📜</span>
            Cultural Guidelines & Protocols
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold mb-3">Submission Requirements</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Cultural context clearly identified
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Source attribution and permissions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Age-appropriate content verification
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Educational alignment documented
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Review Process</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded">
                  <span className="text-yellow-600">1</span>
                  <span className="text-sm">Initial teacher submission</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded">
                  <span className="text-yellow-600">2</span>
                  <span className="text-sm">Cultural advisor review</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded">
                  <span className="text-green-600">3</span>
                  <span className="text-sm">Final approval & integration</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Utility Components
function StatsCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: color }}
          >
            <span className="text-2xl text-white">{icon}</span>
          </div>
          <div>
            <p className="text-sm">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility Functions
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NZ', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
