/**
 * TeacherDashboard - The intelligent command center for kaiako
 * 
 * This dashboard learns from teacher behavior patterns and surfaces the most
 * relevant information using our episodic memory + GraphRAG brain.
 * 
 * Design Philosophy:
 * - Clean, warm aesthetic (following existing design system)
 * - Information hierarchy that adapts to teacher needs
 * - Cultural safety embedded throughout
 * - Quick access to frequently used resources
 * - Contextual AI assistance without overwhelming
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import Button from '../components/Button';

interface DashboardMemory {
  teacherContext: {
    name: string;
    subjects: string[];
    yearLevels: number[];
    currentTerm: number;
    currentWeek: number;
    recentActivity: Activity[];
  };
  brainInsights: {
    suggestedResources: Resource[];
    upcomingDeadlines: Deadline[];
    classroomPatterns: Pattern[];
    culturalReminders: CulturalReminder[];
  };
  quickActions: QuickAction[];
}

interface Activity {
  id: string;
  type: 'lesson_created' | 'resource_viewed' | 'assessment_graded' | 'reflection_added';
  description: string;
  timestamp: string;
  confidence: number;
}

interface Resource {
  id: string;
  title: string;
  type: 'lesson' | 'activity' | 'assessment' | 'handout';
  nzcCodes: string[];
  confidence: number;
  reason: string;
}

interface Deadline {
  id: string;
  title: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'due_soon' | 'overdue';
}

interface Pattern {
  id: string;
  insight: string;
  confidence: number;
  actionable: boolean;
  suggestion?: string;
}

interface CulturalReminder {
  id: string;
  message: string;
  type: 'celebration' | 'awareness' | 'review_needed';
  priority: 'info' | 'important' | 'urgent';
}

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  path?: string;
  action?: () => void;
  confidence: number;
}

export default function TeacherDashboard() {
  const [memory, setMemory] = useState<DashboardMemory | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'overview' | 'insights' | 'planning'>('overview');

  useEffect(() => {
    loadDashboardMemory();
  }, []);

  const loadDashboardMemory = async () => {
    try {
      // In practice, this calls our brain API with teacher context
      const response = await fetch('/brain/teacher-dashboard');
      const memoryData = await response.json();
      setMemory(memoryData);
    } catch (error) {
      console.warn('Brain unavailable, using static dashboard');
      setMemory(getStaticDashboard());
    }
    setLoading(false);
  };

  const getStaticDashboard = (): DashboardMemory => ({
    teacherContext: {
      name: 'Kaiako Smith',
      subjects: ['Mathematics', 'Science'],
      yearLevels: [7, 8, 9],
      currentTerm: 2,
      currentWeek: 6,
      recentActivity: [
        {
          id: '1',
          type: 'lesson_created',
          description: 'Created "Fractions with Māori Games" lesson',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          confidence: 0.95
        }
      ]
    },
    brainInsights: {
      suggestedResources: [
        {
          id: 'res_1',
          title: 'Y8 Algebra with Cultural Context',
          type: 'lesson',
          nzcCodes: ['NA4-1', 'NA4-2'],
          confidence: 0.89,
          reason: 'Matches your recent algebra focus and cultural integration approach'
        }
      ],
      upcomingDeadlines: [
        {
          id: 'dead_1',
          title: 'Term 2 Reports Due',
          dueDate: new Date(Date.now() + 7 * 24 * 3600000).toISOString(),
          priority: 'high',
          status: 'upcoming'
        }
      ],
      classroomPatterns: [
        {
          id: 'pat_1',
          insight: 'Your Y8 classes engage 23% more with hands-on activities after 10am',
          confidence: 0.82,
          actionable: true,
          suggestion: 'Consider scheduling practical lessons later in the morning'
        }
      ],
      culturalReminders: [
        {
          id: 'cult_1',
          message: 'Matariki approaches - great time to integrate astronomy into math lessons',
          type: 'awareness',
          priority: 'info'
        }
      ]
    },
    quickActions: [
      { id: 'new_lesson', label: 'New Lesson', icon: '📝', path: '/lessons/new', confidence: 0.9 },
      { id: 'view_classes', label: 'My Classes', icon: '👥', path: '/classes', confidence: 0.85 }
    ]
  });

  if (loading) return <DashboardSkeleton />;
  if (!memory) return <div>Dashboard unavailable</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <div className="bg-surface border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text">
                Kia ora, {memory.teacherContext.name} 👋
              </h1>
              <p className="text-muted mt-1">
                Term {memory.teacherContext.currentTerm}, Week {memory.teacherContext.currentWeek} • 
                {memory.teacherContext.subjects.join(', ')} • 
                Years {memory.teacherContext.yearLevels.join(', ')}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <ViewToggle selectedView={selectedView} onViewChange={setSelectedView} />
              <Button variant="primary">
                🧠 Ask the Brain
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-surface/50 border-b border-accent/10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <QuickActionsBar actions={memory.quickActions} />
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {selectedView === 'overview' && <OverviewView memory={memory} />}
        {selectedView === 'insights' && <InsightsView memory={memory} />}
        {selectedView === 'planning' && <PlanningView memory={memory} />}
      </div>
    </div>
  );
}

function ViewToggle({ selectedView, onViewChange }: { 
  selectedView: string; 
  onViewChange: (view: 'overview' | 'insights' | 'planning') => void;
}) {
  return (
    <div className="flex bg-background rounded-lg p-1">
      {[
        { id: 'overview', label: '📊 Overview' },
        { id: 'insights', label: '🧠 Insights' },
        { id: 'planning', label: '📋 Planning' }
      ].map(view => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id as any)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            selectedView === view.id
              ? 'bg-accent text-white'
              : 'text-muted hover:text-text hover:bg-accent/10'
          }`}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

function QuickActionsBar({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-text">Quick Actions:</span>
      {actions.map(action => (
        <Link
          key={action.id}
          to={action.path || '#'}
          className="flex items-center space-x-2 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 rounded-md text-sm font-medium text-accent transition-colors"
        >
          <span>{action.icon}</span>
          <span>{action.label}</span>
        </Link>
      ))}
    </div>
  );
}

function OverviewView({ memory }: { memory: DashboardMemory }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Left Column */}
      <div className="lg:col-span-2 space-y-6">
        {/* Today's Focus */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-text mb-4">Today's Focus</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
              <span className="text-2xl">📚</span>
              <div>
                <p className="font-medium text-text">Y8 Mathematics - Period 3</p>
                <p className="text-sm text-muted">Continuing fractions unit with hands-on activities</p>
              </div>
              <Button variant="muted" className="ml-auto">
                View Lesson
              </Button>
            </div>
          </div>
        </Card>

        {/* Brain Suggestions */}
        <Card className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl">🧠</span>
            <h2 className="text-lg font-semibold text-text">Brain Suggestions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {memory.brainInsights.suggestedResources.slice(0, 4).map(resource => (
              <div key={resource.id} className="p-4 bg-background rounded-lg border border-accent/20">
                <h3 className="font-medium text-text mb-1">{resource.title}</h3>
                <p className="text-sm text-muted mb-2">{resource.reason}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                    {(resource.confidence * 100).toFixed(0)}% match
                  </span>
                  <Link to={`/resources/${resource.id}`} className="text-sm text-accent hover:underline">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sidebar - Right Column */}
      <div className="space-y-6">
        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {memory.teacherContext.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3">
                <ActivityIcon type={activity.type} />
                <div className="flex-1">
                  <p className="text-sm text-text">{activity.description}</p>
                  <p className="text-xs text-muted">{formatRelativeTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cultural Awareness */}
        {memory.brainInsights.culturalReminders.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-text mb-4">Cultural Awareness</h3>
            <div className="space-y-3">
              {memory.brainInsights.culturalReminders.map(reminder => (
                <div key={reminder.id} className="p-3 bg-accent/5 rounded-lg">
                  <p className="text-sm text-text">{reminder.message}</p>
                  <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${
                    reminder.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    reminder.priority === 'important' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {reminder.type}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Upcoming Deadlines */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-text mb-4">Upcoming</h3>
          <div className="space-y-3">
            {memory.brainInsights.upcomingDeadlines.map(deadline => (
              <div key={deadline.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">{deadline.title}</p>
                  <p className="text-xs text-muted">{formatDate(deadline.dueDate)}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                  deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {deadline.priority}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function InsightsView({ memory }: { memory: DashboardMemory }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-text mb-6">Teaching Insights from Your Brain</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memory.brainInsights.classroomPatterns.map(pattern => (
            <div key={pattern.id} className="p-4 bg-background rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-text">Pattern Detected</h3>
                <span className="text-xs text-accent bg-accent/10 px-2 py-1 rounded">
                  {(pattern.confidence * 100).toFixed(0)}% confident
                </span>
              </div>
              <p className="text-sm text-text mb-3">{pattern.insight}</p>
              {pattern.actionable && pattern.suggestion && (
                <div className="p-3 bg-accent/5 rounded-md">
                  <p className="text-sm text-accent">💡 {pattern.suggestion}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PlanningView({ memory }: { memory: DashboardMemory }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-text mb-6">AI-Assisted Planning</h2>
        <p className="text-muted mb-6">
          Coming soon: Intelligent lesson planning with full NZC alignment and cultural integration
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="primary" className="justify-center">
            📝 Plan New Unit
          </Button>
          <Button variant="muted" className="justify-center">
            📅 Weekly Overview
          </Button>
        </div>
      </Card>
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  const icons: { [key: string]: string } = {
    lesson_created: '📝',
    resource_viewed: '👀',
    assessment_graded: '✅',
    reflection_added: '💭'
  };
  return <span className="text-lg">{icons[type] || '📄'}</span>;
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-surface border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-64 mb-2"></div>
            <div className="h-4 bg-accent/10 rounded w-96"></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="animate-pulse">
              <div className="h-48 bg-accent/10 rounded-lg mb-6"></div>
              <div className="h-64 bg-accent/10 rounded-lg"></div>
            </div>
          </div>
          <div>
            <div className="animate-pulse space-y-6">
              <div className="h-32 bg-accent/10 rounded-lg"></div>
              <div className="h-24 bg-accent/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility functions
function formatRelativeTime(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  return time.toLocaleDateString();
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-NZ', {
    weekday: 'short',
    month: 'short', 
    day: 'numeric'
  });
}