import {
  AlertCircle,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Target,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';

interface Student {
  id: string;
  name: string;
  avatar: string;
  yearLevel: number;
  subjects: string[];
  overallProgress: number;
  lastActivity: string;
  achievements: number;
  needsSupport: boolean;
}

interface SubjectProgress {
  subject: string;
  currentLevel: number;
  targetLevel: number;
  progress: number;
  lastAssessment: string;
  nextMilestone: string;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  subject: string;
  completed: boolean;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
}

const StudentProgressTracker: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string>('1');

  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'Emma Thompson',
      avatar: '👩‍🎓',
      yearLevel: 8,
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies'],
      overallProgress: 85,
      lastActivity: '2 hours ago',
      achievements: 12,
      needsSupport: false,
    },
    {
      id: '2',
      name: 'James Wilson',
      avatar: '👨‍🎓',
      yearLevel: 8,
      subjects: ['Mathematics', 'English', 'Science'],
      overallProgress: 72,
      lastActivity: '1 day ago',
      achievements: 8,
      needsSupport: false,
    },
    {
      id: '3',
      name: 'Sarah Mitchell',
      avatar: '👩‍🎓',
      yearLevel: 8,
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Te Reo Māori'],
      overallProgress: 95,
      lastActivity: '30 minutes ago',
      achievements: 18,
      needsSupport: false,
    },
    {
      id: '4',
      name: 'Michael Chen',
      avatar: '👨‍🎓',
      yearLevel: 8,
      subjects: ['Mathematics', 'English', 'Science'],
      overallProgress: 45,
      lastActivity: '3 days ago',
      achievements: 3,
      needsSupport: true,
    },
  ]);

  const [subjectProgress] = useState<Record<string, SubjectProgress[]>>({
    '1': [
      {
        subject: 'Mathematics',
        currentLevel: 4,
        targetLevel: 5,
        progress: 85,
        lastAssessment: '2025-09-10',
        nextMilestone: 'Algebra Mastery',
      },
      {
        subject: 'English',
        currentLevel: 4,
        targetLevel: 5,
        progress: 88,
        lastAssessment: '2025-09-12',
        nextMilestone: 'Creative Writing',
      },
      {
        subject: 'Science',
        currentLevel: 5,
        targetLevel: 5,
        progress: 92,
        lastAssessment: '2025-09-14',
        nextMilestone: 'Advanced Chemistry',
      },
      {
        subject: 'Social Studies',
        currentLevel: 4,
        targetLevel: 5,
        progress: 78,
        lastAssessment: '2025-09-08',
        nextMilestone: 'Te Tiriti Analysis',
      },
    ],
    '2': [
      {
        subject: 'Mathematics',
        currentLevel: 3,
        targetLevel: 4,
        progress: 72,
        lastAssessment: '2025-09-09',
        nextMilestone: 'Geometry Basics',
      },
      {
        subject: 'English',
        currentLevel: 3,
        targetLevel: 4,
        progress: 68,
        lastAssessment: '2025-09-11',
        nextMilestone: 'Reading Comprehension',
      },
      {
        subject: 'Science',
        currentLevel: 4,
        targetLevel: 4,
        progress: 75,
        lastAssessment: '2025-09-13',
        nextMilestone: 'Physics Concepts',
      },
    ],
    '3': [
      {
        subject: 'Mathematics',
        currentLevel: 5,
        targetLevel: 5,
        progress: 98,
        lastAssessment: '2025-09-14',
        nextMilestone: 'Advanced Statistics',
      },
      {
        subject: 'English',
        currentLevel: 5,
        targetLevel: 5,
        progress: 95,
        lastAssessment: '2025-09-13',
        nextMilestone: 'Literary Analysis',
      },
      {
        subject: 'Science',
        currentLevel: 5,
        targetLevel: 5,
        progress: 96,
        lastAssessment: '2025-09-15',
        nextMilestone: 'Research Project',
      },
      {
        subject: 'Social Studies',
        currentLevel: 5,
        targetLevel: 5,
        progress: 94,
        lastAssessment: '2025-09-12',
        nextMilestone: 'Historical Research',
      },
      {
        subject: 'Te Reo Māori',
        currentLevel: 4,
        targetLevel: 5,
        progress: 87,
        lastAssessment: '2025-09-10',
        nextMilestone: 'Conversational Fluency',
      },
    ],
    '4': [
      {
        subject: 'Mathematics',
        currentLevel: 2,
        targetLevel: 4,
        progress: 35,
        lastAssessment: '2025-09-05',
        nextMilestone: 'Basic Operations',
      },
      {
        subject: 'English',
        currentLevel: 3,
        targetLevel: 4,
        progress: 55,
        lastAssessment: '2025-09-07',
        nextMilestone: 'Grammar Fundamentals',
      },
      {
        subject: 'Science',
        currentLevel: 3,
        targetLevel: 4,
        progress: 45,
        lastAssessment: '2025-09-06',
        nextMilestone: 'Scientific Method',
      },
    ],
  });

  const [milestones] = useState<Record<string, Milestone[]>>({
    '1': [
      {
        id: '1',
        title: 'Complete Algebra Unit',
        description: 'Master basic algebraic equations',
        subject: 'Mathematics',
        completed: true,
        dueDate: '2025-09-15',
        priority: 'high',
      },
      {
        id: '2',
        title: 'Creative Writing Portfolio',
        description: 'Submit 5 creative writing pieces',
        subject: 'English',
        completed: false,
        dueDate: '2025-09-20',
        priority: 'medium',
      },
      {
        id: '3',
        title: 'Science Fair Project',
        description: 'Complete and present science experiment',
        subject: 'Science',
        completed: false,
        dueDate: '2025-09-25',
        priority: 'high',
      },
    ],
    '2': [
      {
        id: '4',
        title: 'Geometry Assessment',
        description: 'Complete geometry unit test',
        subject: 'Mathematics',
        completed: false,
        dueDate: '2025-09-18',
        priority: 'high',
      },
      {
        id: '5',
        title: 'Reading Comprehension',
        description: 'Improve reading comprehension skills',
        subject: 'English',
        completed: false,
        dueDate: '2025-09-22',
        priority: 'medium',
      },
    ],
    '3': [
      {
        id: '6',
        title: 'Advanced Statistics Project',
        description: 'Complete statistical analysis project',
        subject: 'Mathematics',
        completed: false,
        dueDate: '2025-09-20',
        priority: 'medium',
      },
      {
        id: '7',
        title: 'Literary Analysis Essay',
        description: 'Write comprehensive literary analysis',
        subject: 'English',
        completed: false,
        dueDate: '2025-09-18',
        priority: 'high',
      },
    ],
    '4': [
      {
        id: '8',
        title: 'Basic Math Operations',
        description: 'Master addition, subtraction, multiplication, division',
        subject: 'Mathematics',
        completed: false,
        dueDate: '2025-09-30',
        priority: 'high',
      },
      {
        id: '9',
        title: 'Grammar Fundamentals',
        description: 'Complete grammar basics unit',
        subject: 'English',
        completed: false,
        dueDate: '2025-09-25',
        priority: 'high',
      },
    ],
  });

  const currentStudent = students.find((s) => s.id === selectedStudent);
  const currentProgress = subjectProgress[selectedStudent] || [];
  const currentMilestones = milestones[selectedStudent] || [];

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Progress Tracker</h1>
          <p className="text-xl text-gray-600">
            Monitor individual student progress and provide targeted support
          </p>
        </div>

        {/* Student Selector */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {students.map((student) => (
              <button
                key={student.id}
                onClick={() => setSelectedStudent(student.id)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedStudent === student.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{student.avatar}</div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">Year {student.yearLevel}</p>
                  <div className="mt-2">
                    <div className="flex items-center justify-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(
                            student.overallProgress,
                          )}`}
                          style={{ width: `${student.overallProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{student.overallProgress}%</span>
                    </div>
                  </div>
                  {student.needsSupport && (
                    <div className="mt-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Needs Support
                      </span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {currentStudent && (
          <>
            {/* Student Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center mb-6">
                  <div className="text-6xl mr-4">{currentStudent.avatar}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentStudent.name}</h2>
                    <p className="text-gray-600">Year {currentStudent.yearLevel} Student</p>
                    <p className="text-sm text-gray-500">
                      Last activity: {currentStudent.lastActivity}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {currentStudent.overallProgress}%
                    </div>
                    <p className="text-sm text-blue-700">Overall Progress</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {currentStudent.achievements}
                    </div>
                    <p className="text-sm text-green-700">Achievements</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <BookOpen className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">
                      {currentStudent.subjects.length}
                    </div>
                    <p className="text-sm text-purple-700">Subjects</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-500" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Schedule Meeting
                  </button>
                  <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                    Send Encouragement
                  </button>
                  <button className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                    Assign Extra Work
                  </button>
                  <button className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    View Full Report
                  </button>
                </div>
              </div>
            </div>

            {/* Subject Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <BarChart3 className="h-6 w-6 mr-2 text-green-500" />
                  Subject Progress
                </h3>
                <div className="space-y-4">
                  {currentProgress.map((subject, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                        <span className="text-sm font-semibold text-gray-700">
                          {subject.progress}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Level {subject.currentLevel} → {subject.targetLevel}
                        </span>
                        <span className="text-xs text-gray-500">
                          Last: {subject.lastAssessment}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${getProgressColor(subject.progress)}`}
                          style={{ width: `${subject.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600">Next: {subject.nextMilestone}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="h-6 w-6 mr-2 text-purple-500" />
                  Upcoming Milestones
                </h3>
                <div className="space-y-4">
                  {currentMilestones.map((milestone) => (
                    <div
                      key={milestone.id}
                      className={`p-4 rounded-lg border ${
                        milestone.completed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            ) : (
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            )}
                            <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{milestone.subject}</span>
                            <span className="text-xs text-gray-500">Due: {milestone.dueDate}</span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                            milestone.priority,
                          )}`}
                        >
                          {milestone.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Support Recommendations */}
            {currentStudent.needsSupport && (
              <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-6 w-6 mr-2 text-red-500" />
                  Support Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-900 mb-2">📚 Academic Support</h4>
                    <p className="text-red-700 text-sm">
                      Consider one-on-one tutoring sessions for Mathematics and Science
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-900 mb-2">⏰ Time Management</h4>
                    <p className="text-yellow-700 text-sm">
                      Help develop better study habits and time management skills
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">🤝 Peer Support</h4>
                    <p className="text-blue-700 text-sm">
                      Pair with a study buddy or peer mentor for motivation
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">🏆 Small Wins</h4>
                    <p className="text-green-700 text-sm">
                      Focus on achievable goals to build confidence and momentum
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProgressTracker;
