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

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import Button from '../components/Button';

// TypeScript interfaces for comprehensive dashboard data
interface TeacherProfile {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  yearLevels: number[];
  currentTerm: number;
  currentWeek: number;
  school: string;
  culturalBackground?: string;
}

interface StudentProgress {
  id: string;
  studentName: string;
  yearLevel: number;
  subject: string;
  currentLevel: string;
  progressPercentage: number;
  lastAssessment: string;
  needsAttention: boolean;
  culturalEngagement: 'high' | 'medium' | 'low';
}

interface Resource {
  id: string;
  title: string;
  type: 'lesson' | 'activity' | 'assessment' | 'handout' | 'cultural_content';
  subject: string;
  yearLevel: number;
  nzcCodes: string[];
  culturalContext: boolean;
  approvalStatus: 'approved' | 'pending' | 'needs_review';
  lastModified: string;
  author: string;
}

interface Assessment {
  id: string;
  title: string;
  subject: string;
  yearLevel: number;
  type: 'formative' | 'summative' | 'diagnostic';
  dueDate: string;
  completionRate: number;
  averageScore?: number;
  culturalAlignment: boolean;
}

interface CulturalContent {
  id: string;
  title: string;
  type: 'story' | 'video' | 'activity' | 'resource';
  iwi?: string;
  region?: string;
  approvalStatus: 'approved' | 'pending_review' | 'needs_revision';
  reviewer?: string;
  culturalAdvisor?: string;
}

interface DashboardData {
  teacher: TeacherProfile;
  studentProgress: StudentProgress[];
  recentResources: Resource[];
  upcomingAssessments: Assessment[];
  culturalContent: CulturalContent[];
  quickStats: {
    totalStudents: number;
    resourcesCreated: number;
    assessmentsCompleted: number;
    culturalContentApproved: number;
  };
}

export default function TeacherDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'overview' | 'students' | 'resources' | 'assessments' | 'cultural'>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In production, this would fetch from your API
      const response = await fetch('/api/teacher-dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.warn('API unavailable, using sample data for alpha testing');
      setDashboardData(getSampleDashboardData());
    }
    setLoading(false);
  };

  const getSampleDashboardData = (): DashboardData => ({
    teacher: {
      id: 'teacher_001',
      name: 'Kaiako Sarah Thompson',
      email: 'sarah.thompson@mangakotukutuku.ac.nz',
      subjects: ['Mathematics', 'Science', 'Te Reo Māori'],
      yearLevels: [7, 8, 9],
      currentTerm: 3,
      currentWeek: 7,
      school: 'Mangakotukutuku College',
      culturalBackground: 'Ngāti Tūwharetoa'
    },
    studentProgress: [
      {
        id: 'student_001',
        studentName: 'Aroha Williams',
        yearLevel: 8,
        subject: 'Mathematics',
        currentLevel: '4A',
        progressPercentage: 78,
        lastAssessment: '2024-08-10',
        needsAttention: false,
        culturalEngagement: 'high'
      },
      {
        id: 'student_002',
        studentName: 'Tane Johnson',
        yearLevel: 7,
        subject: 'Science',
        currentLevel: '3P',
        progressPercentage: 65,
        lastAssessment: '2024-08-12',
        needsAttention: true,
        culturalEngagement: 'medium'
      },
      {
        id: 'student_003',
        studentName: 'Kaia Patel',
        yearLevel: 9,
        subject: 'Mathematics',
        currentLevel: '5B',
        progressPercentage: 89,
        lastAssessment: '2024-08-14',
        needsAttention: false,
        culturalEngagement: 'high'
      }
    ],
    recentResources: [
      {
        id: 'resource_001',
        title: 'Y8 Fractions with Traditional Māori Games',
        type: 'lesson',
        subject: 'Mathematics',
        yearLevel: 8,
        nzcCodes: ['NA4-1', 'NA4-2'],
        culturalContext: true,
        approvalStatus: 'approved',
        lastModified: '2024-08-15',
        author: 'Sarah Thompson'
      },
      {
        id: 'resource_002',
        title: 'Ecosystems of Aotearoa - Interactive Investigation',
        type: 'activity',
        subject: 'Science',
        yearLevel: 7,
        nzcCodes: ['LW2-1', 'LW2-2'],
        culturalContext: true,
        approvalStatus: 'pending',
        lastModified: '2024-08-14',
        author: 'Sarah Thompson'
      }
    ],
    upcomingAssessments: [
      {
        id: 'assessment_001',
        title: 'Y8 Algebraic Thinking Assessment',
        subject: 'Mathematics',
        yearLevel: 8,
        type: 'summative',
        dueDate: '2024-08-25',
        completionRate: 0,
        culturalAlignment: true
      },
      {
        id: 'assessment_002',
        title: 'Science Fair Project Presentations',
        subject: 'Science',
        yearLevel: 9,
        type: 'summative',
        dueDate: '2024-09-02',
        completionRate: 45,
        averageScore: 82,
        culturalAlignment: true
      }
    ],
    culturalContent: [
      {
        id: 'cultural_001',
        title: 'Tūrangawaewae: Understanding Place and Identity',
        type: 'story',
        iwi: 'Ngāti Tūwharetoa',
        region: 'Bay of Plenty',
        approvalStatus: 'approved',
        reviewer: 'Kaumātua Council',
        culturalAdvisor: 'Uncle Tom Richardson'
      },
      {
        id: 'cultural_002',
        title: 'Traditional Star Navigation Methods',
        type: 'activity',
        iwi: 'Various',
        region: 'Aotearoa',
        approvalStatus: 'pending_review',
        culturalAdvisor: 'Dr. Rangi Matamua'
      }
    ],
    quickStats: {
      totalStudents: 87,
      resourcesCreated: 23,
      assessmentsCompleted: 12,
      culturalContentApproved: 8
    }
  });

  if (loading) return <DashboardSkeleton />;
  if (!dashboardData) return <div className="p-8 text-center">Dashboard unavailable</div>;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-white)' }}>
      {/* Modern Sidebar */}
      <aside className={`fixed left-0 top-0 h-full transition-all duration-300 z-40 ${
        sidebarCollapsed ? 'w-16' : 'w-72'
      }`} style={{ backgroundColor: 'var(--color-royal-blue)' }}>
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            {!sidebarCollapsed && (
              <div>
                <h1 className="text-xl font-bold" style={{ color: 'var(--color-gold)' }}>
                  Te Kete Ako
                </h1>
                <p className="text-sm opacity-90" style={{ color: 'var(--color-white)' }}>
                  Mangakotukutuku College
                </p>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                color: 'var(--color-gold)'
              }}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: '📊' },
              { id: 'students', label: 'Student Progress', icon: '👥' },
              { id: 'resources', label: 'Resource Library', icon: '📚' },
              { id: 'assessments', label: 'Assessment Tools', icon: '📋' },
              { id: 'cultural', label: 'Cultural Content', icon: '🌿' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedView(item.id as any)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selectedView === item.id
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
                style={{
                  backgroundColor: selectedView === item.id 
                    ? 'var(--color-gold)' 
                    : 'transparent'
                }}
              >
                <span className="text-lg">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Teacher Profile */}
        {!sidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t" style={{ borderColor: 'rgba(255, 215, 0, 0.2)' }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-gold)' }}>
                <span className="text-lg">👩‍🏫</span>
              </div>
              <div>
                <p className="font-medium" style={{ color: 'var(--color-white)' }}>
                  {dashboardData.teacher.name}
                </p>
                <p className="text-xs opacity-70" style={{ color: 'var(--color-white)' }}>
                  {dashboardData.teacher.subjects.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-72'
      }`}>
        {/* Header */}
        <header className="border-b p-6" style={{ 
          backgroundColor: 'var(--color-white)',
          borderColor: 'var(--color-neutral-200)'
        }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                Kia ora, {dashboardData.teacher.name.split(' ')[1]} 👋
              </h1>
              <p style={{ color: 'var(--color-neutral-700)' }}>
                Term {dashboardData.teacher.currentTerm}, Week {dashboardData.teacher.currentWeek} • 
                Years {dashboardData.teacher.yearLevels.join(', ')} • 
                {dashboardData.teacher.subjects.join(' & ')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" style={{ 
                backgroundColor: 'var(--color-pounamu)',
                color: 'white'
              }}>
                📝 Create Resource
              </Button>
              <Button variant="muted">
                🔔 Notifications
              </Button>
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
          value={data.quickStats.resourcesCreated} 
          icon="📚" 
          color="var(--color-kowhai)" 
        />
        <StatsCard 
          title="Assessments" 
          value={data.quickStats.assessmentsCompleted} 
          icon="📋" 
          color="var(--color-moana)" 
        />
        <StatsCard 
          title="Cultural Content" 
          value={data.quickStats.culturalContentApproved} 
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
            {data.recentResources.map(resource => (
              <div key={resource.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                <span className="text-2xl">📝</span>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
                    {resource.title}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>
                    {resource.subject} • Year {resource.yearLevel} • {formatDate(resource.lastModified)}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  resource.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                  resource.approvalStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {resource.approvalStatus}
                </span>
              </div>
            ))}
            <Link to="/resources" className="text-center block py-2 rounded-lg transition-colors" style={{ 
              color: 'var(--color-pounamu)',
              backgroundColor: 'rgba(27, 127, 90, 0.05)'
            }}>
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
            {data.studentProgress.slice(0, 3).map(student => (
              <div key={student.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                  backgroundColor: student.needsAttention ? 'var(--color-warning)' : 'var(--color-success)'
                }}>
                  <span className="text-white text-sm font-bold">{student.progressPercentage}%</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium" style={{ color: 'var(--color-primary)' }}>
                    {student.studentName}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>
                    {student.subject} • Level {student.currentLevel}
                  </p>
                </div>
                {student.needsAttention && (
                  <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                    Needs attention
                  </span>
                )}
              </div>
            ))}
            <Link to="/students" className="text-center block py-2 rounded-lg transition-colors" style={{ 
              color: 'var(--color-pounamu)',
              backgroundColor: 'rgba(27, 127, 90, 0.05)'
            }}>
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
            {data.upcomingAssessments.map(assessment => (
              <div key={assessment.id} className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-neutral-200)' }}>
                <h4 className="font-medium mb-2" style={{ color: 'var(--color-primary)' }}>
                  {assessment.title}
                </h4>
                <div className="space-y-2 text-sm" style={{ color: 'var(--color-neutral-700)' }}>
                  <p>📚 {assessment.subject} • Year {assessment.yearLevel}</p>
                  <p>📅 Due: {formatDate(assessment.dueDate)}</p>
                  <p>📊 Completion: {assessment.completionRate}%</p>
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
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
          Student Progress Management
        </h2>
        <Button variant="primary">
          📊 Generate Progress Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.studentProgress.map(student => (
          <Card key={student.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                  backgroundColor: student.culturalEngagement === 'high' ? 'var(--color-success)' :
                                  student.culturalEngagement === 'medium' ? 'var(--color-warning)' :
                                  'var(--color-error)'
                }}>
                  <span className="text-white font-bold">{student.progressPercentage}%</span>
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: 'var(--color-primary)' }}>
                    {student.studentName}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>
                    Year {student.yearLevel} • {student.subject}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-neutral-700)' }}>Current Level:</span>
                  <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{student.currentLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-neutral-700)' }}>Cultural Engagement:</span>
                  <span className={`font-medium ${
                    student.culturalEngagement === 'high' ? 'text-green-600' :
                    student.culturalEngagement === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {student.culturalEngagement}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--color-neutral-700)' }}>Last Assessment:</span>
                  <span className="font-medium">{formatDate(student.lastAssessment)}</span>
                </div>
              </div>
              
              {student.needsAttention && (
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
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
          Resource Library
        </h2>
        <div className="flex gap-3">
          <Button variant="muted">
            📁 Browse Templates
          </Button>
          <Button variant="primary">
            ➕ Create New Resource
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.recentResources.map(resource => (
          <Card key={resource.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">
                  {resource.type === 'lesson' ? '📝' :
                   resource.type === 'activity' ? '🎯' :
                   resource.type === 'assessment' ? '📋' :
                   resource.type === 'handout' ? '📄' : '🌿'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  resource.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                  resource.approvalStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {resource.approvalStatus}
                </span>
              </div>
              
              <h3 className="font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                {resource.title}
              </h3>
              
              <div className="space-y-1 text-sm mb-4" style={{ color: 'var(--color-neutral-700)' }}>
                <p>📚 {resource.subject} • Year {resource.yearLevel}</p>
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
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
          Assessment Tools
        </h2>
        <Button variant="primary">
          📝 Create Assessment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.upcomingAssessments.map(assessment => (
          <Card key={assessment.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📋</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  assessment.type === 'summative' ? 'bg-blue-100 text-blue-800' :
                  assessment.type === 'formative' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {assessment.type}
                </span>
              </div>
              
              <h3 className="font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                {assessment.title}
              </h3>
              
              <div className="space-y-2 text-sm mb-4" style={{ color: 'var(--color-neutral-700)' }}>
                <p>📚 {assessment.subject} • Year {assessment.yearLevel}</p>
                <p>📅 Due: {formatDate(assessment.dueDate)}</p>
                <p>📊 Completion: {assessment.completionRate}%</p>
                {assessment.averageScore && (
                  <p>🎯 Average Score: {assessment.averageScore}%</p>
                )}
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
        <h2 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
          Cultural Content Approval Workflow
        </h2>
        <Button variant="primary">
          🌿 Submit for Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.culturalContent.map(content => (
          <Card key={content.id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">
                  {content.type === 'story' ? '📖' :
                   content.type === 'video' ? '🎥' :
                   content.type === 'activity' ? '🎯' : '📄'}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  content.approvalStatus === 'approved' ? 'bg-green-100 text-green-800' :
                  content.approvalStatus === 'pending_review' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {content.approvalStatus.replace('_', ' ')}
                </span>
              </div>
              
              <h3 className="font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                {content.title}
              </h3>
              
              <div className="space-y-1 text-sm mb-4" style={{ color: 'var(--color-neutral-700)' }}>
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
              <h4 className="font-bold mb-3" style={{ color: 'var(--color-primary)' }}>Submission Requirements</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--color-neutral-700)' }}>
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
              <h4 className="font-bold mb-3" style={{ color: 'var(--color-primary)' }}>Review Process</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2 rounded" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                  <span className="text-yellow-600">1</span>
                  <span className="text-sm">Initial teacher submission</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                  <span className="text-yellow-600">2</span>
                  <span className="text-sm">Cultural advisor review</span>
                </div>
                <div className="flex items-center gap-3 p-2 rounded" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
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
function StatsCard({ title, value, icon, color }: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: color }}>
            <span className="text-2xl text-white">{icon}</span>
          </div>
          <div>
            <p className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>{title}</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="w-72 h-screen" style={{ backgroundColor: 'var(--color-royal-blue)' }}>
          <div className="p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-white/20 rounded mb-2"></div>
              <div className="h-4 bg-white/10 rounded mb-8"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="h-12 bg-white/10 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Skeleton */}
        <div className="flex-1 p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-white rounded-lg"></div>
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-white rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-64 bg-white rounded-lg"></div>
              <div className="h-64 bg-white rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Functions
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NZ', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}