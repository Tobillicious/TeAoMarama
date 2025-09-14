import {
  Award,
  BarChart3,
  BookOpen,
  Camera,
  CheckCircle,
  Download,
  Eye,
  Globe,
  Pause,
  Play,
  PresentationChart,
  Share,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  Users,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DemoLesson {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: number;
  culturalElements: string[];
  learningObjectives: string[];
  resources: string[];
  activities: string[];
  assessment: string[];
  status: 'ready' | 'in-progress' | 'completed';
  rating: number;
  feedback: string[];
}

interface DemoMetrics {
  totalLessons: number;
  completedLessons: number;
  averageRating: number;
  totalParticipants: number;
  culturalCompliance: number;
  engagementScore: number;
  successRate: number;
}

interface LiveDemo {
  isActive: boolean;
  currentLesson: DemoLesson | null;
  participants: number;
  startTime: string | null;
  duration: number;
  chatMessages: Array<{
    id: string;
    user: string;
    message: string;
    timestamp: string;
  }>;
}

const TeacherDemoShowcase: React.FC = () => {
  const [lessons, setLessons] = useState<DemoLesson[]>([]);
  const [metrics, setMetrics] = useState<DemoMetrics>({
    totalLessons: 0,
    completedLessons: 0,
    averageRating: 0,
    totalParticipants: 0,
    culturalCompliance: 0,
    engagementScore: 0,
    successRate: 0,
  });
  const [liveDemo, setLiveDemo] = useState<LiveDemo>({
    isActive: false,
    currentLesson: null,
    participants: 0,
    startTime: null,
    duration: 0,
    chatMessages: [],
  });
  const [selectedLesson, setSelectedLesson] = useState<DemoLesson | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    initializeDemoLessons();
    updateMetrics();
  }, []);

  const initializeDemoLessons = () => {
    const demoLessons: DemoLesson[] = [
      {
        id: 'te-tiriti-demo',
        title: 'Te Tiriti o Waitangi - Interactive Learning Journey',
        subject: 'Social Studies',
        yearLevel: 'Year 8',
        duration: 45,
        culturalElements: ['Te Reo Māori', 'Tikanga', 'Manaakitanga', 'Kaitiakitanga'],
        learningObjectives: [
          'Understand the historical context of Te Tiriti o Waitangi',
          'Explore different perspectives on the Treaty',
          'Develop cultural awareness and respect',
          'Analyze primary and secondary sources',
        ],
        resources: [
          'Archives New Zealand Treaty documents',
          'Interactive timeline',
          'Cultural context videos',
          'Māori language audio',
        ],
        activities: [
          'Opening karakia and mihi',
          'Interactive timeline exploration',
          'Source analysis workshop',
          'Cultural perspective discussion',
          'Reflection and closing',
        ],
        assessment: [
          'Participation in cultural protocols',
          'Source analysis worksheet',
          'Reflection journal entry',
          'Peer discussion contribution',
        ],
        status: 'ready',
        rating: 4.8,
        feedback: [
          'Excellent cultural integration',
          'Engaging interactive elements',
          'Respectful approach to sensitive topics',
          'Clear learning objectives',
        ],
      },
      {
        id: 'kakapo-science-demo',
        title: 'Kākāpō Conservation - Science in Action',
        subject: 'Science',
        yearLevel: 'Year 8',
        duration: 50,
        culturalElements: ['Kaitiakitanga', 'Mātauranga Māori', 'Environmental stewardship'],
        learningObjectives: [
          'Understand kākāpō biology and behavior',
          'Explore conservation science methods',
          'Learn about Māori environmental knowledge',
          'Analyze data and draw conclusions',
        ],
        resources: [
          'DOC kākāpō monitoring data',
          'Māori environmental knowledge resources',
          'Conservation science videos',
          'Interactive data visualizations',
        ],
        activities: [
          'Kākāpō behavior observation',
          'Data analysis workshop',
          'Māori knowledge integration',
          'Conservation planning exercise',
          'Presentation and discussion',
        ],
        assessment: [
          'Data analysis report',
          'Cultural knowledge integration',
          'Conservation proposal',
          'Peer presentation',
        ],
        status: 'ready',
        rating: 4.9,
        feedback: [
          'Outstanding integration of science and culture',
          'Real-world data makes learning relevant',
          'Excellent use of technology',
          'Inspiring conservation focus',
        ],
      },
      {
        id: 'census-mathematics-demo',
        title: 'Census 2023 - Mathematics in Real Life',
        subject: 'Mathematics',
        yearLevel: 'Year 8',
        duration: 40,
        culturalElements: ['Statistical literacy', 'Community representation', 'Data sovereignty'],
        learningObjectives: [
          'Analyze census data and statistics',
          'Create data visualizations',
          'Understand statistical concepts',
          'Explore community demographics',
        ],
        resources: [
          'Stats NZ Census 2023 data',
          'Data visualization tools',
          'Statistical analysis worksheets',
          'Community demographic resources',
        ],
        activities: [
          'Census data exploration',
          'Statistical analysis workshop',
          'Data visualization creation',
          'Community discussion',
          'Presentation of findings',
        ],
        assessment: [
          'Statistical analysis report',
          'Data visualization portfolio',
          'Community insights presentation',
          'Reflection on data interpretation',
        ],
        status: 'ready',
        rating: 4.7,
        feedback: [
          'Real census data makes math relevant',
          'Great use of visualization tools',
          'Community focus is engaging',
          'Clear statistical concepts',
        ],
      },
    ];

    setLessons(demoLessons);
  };

  const updateMetrics = () => {
    const totalLessons = lessons.length;
    const completedLessons = lessons.filter((l) => l.status === 'completed').length;
    const averageRating = lessons.reduce((sum, lesson) => sum + lesson.rating, 0) / totalLessons;
    const totalParticipants = 247; // Simulated
    const culturalCompliance = 100; // All lessons have cultural elements
    const engagementScore = 94.2; // Simulated
    const successRate = (completedLessons / totalLessons) * 100;

    setMetrics({
      totalLessons,
      completedLessons,
      averageRating,
      totalParticipants,
      culturalCompliance,
      engagementScore,
      successRate,
    });
  };

  const handleStartDemo = (lesson: DemoLesson) => {
    setLiveDemo({
      isActive: true,
      currentLesson: lesson,
      participants: Math.floor(Math.random() * 50) + 20,
      startTime: new Date().toISOString(),
      duration: 0,
      chatMessages: [
        {
          id: '1',
          user: 'Teacher',
          message: 'Welcome to our interactive lesson on ' + lesson.title,
          timestamp: new Date().toISOString(),
        },
      ],
    });
    setSelectedLesson(lesson);
  };

  const handleStopDemo = () => {
    setLiveDemo({
      isActive: false,
      currentLesson: null,
      participants: 0,
      startTime: null,
      duration: 0,
      chatMessages: [],
    });
    setSelectedLesson(null);
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleToggleSharing = () => {
    setIsSharing(!isSharing);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <PresentationChart className="w-12 h-12 text-purple-600" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Teacher Demo Showcase</h1>
            <p className="text-lg text-gray-600">
              Interactive Lesson Demonstrations with Cultural Integration
            </p>
          </div>
        </div>

        {/* Demo Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-600">{metrics.totalLessons}</p>
            <p className="text-sm text-gray-600">Demo Lessons</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">{metrics.completedLessons}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-yellow-600">{metrics.averageRating.toFixed(1)}</p>
            <p className="text-sm text-gray-600">Avg Rating</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">{metrics.totalParticipants}</p>
            <p className="text-sm text-gray-600">Participants</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <Globe className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-indigo-600">{metrics.culturalCompliance}%</p>
            <p className="text-sm text-gray-600">Cultural</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <BarChart3 className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-pink-600">{metrics.engagementScore}%</p>
            <p className="text-sm text-gray-600">Engagement</p>
          </div>
        </div>

        {/* Live Demo Status */}
        {liveDemo.isActive && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-800 flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Live Demo in Progress
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-green-700">
                    {liveDemo.participants} participants
                  </span>
                  <span className="text-sm text-green-700">
                    Duration: {Math.floor(liveDemo.duration / 60)}:
                    {(liveDemo.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
              <p className="text-green-800 mb-4">
                Currently demonstrating: <strong>{liveDemo.currentLesson?.title}</strong>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleToggleRecording}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isRecording
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>
                <button
                  onClick={handleToggleSharing}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isSharing
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  <Share className="w-4 h-4" />
                  {isSharing ? 'Stop Sharing' : 'Start Sharing'}
                </button>
                <button
                  onClick={handleStopDemo}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  End Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demo Lessons */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-purple-600" />
            Available Demo Lessons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      lesson.status,
                    )}`}
                  >
                    {lesson.status.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1">
                    {getRatingStars(lesson.rating)}
                    <span className="text-sm text-gray-600 ml-1">({lesson.rating})</span>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-2">{lesson.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>{lesson.subject}</span>
                  <span>•</span>
                  <span>{lesson.yearLevel}</span>
                  <span>•</span>
                  <span>{lesson.duration} min</span>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Cultural Elements:</p>
                    <div className="flex flex-wrap gap-1">
                      {lesson.culturalElements.map((element) => (
                        <span
                          key={element}
                          className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded"
                        >
                          {element}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Learning Objectives:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {lesson.learningObjectives.slice(0, 2).map((objective, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <Target className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                      {lesson.learningObjectives.length > 2 && (
                        <li className="text-gray-500">
                          +{lesson.learningObjectives.length - 2} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartDemo(lesson)}
                    disabled={liveDemo.isActive}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Play className="w-4 h-4" />
                    Start Demo
                  </button>
                  <button
                    onClick={() => setSelectedLesson(lesson)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Details Modal */}
        {selectedLesson && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">{selectedLesson.title}</h3>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Lesson Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Subject & Year Level:</p>
                      <p className="text-gray-600">
                        {selectedLesson.subject} - {selectedLesson.yearLevel}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Duration:</p>
                      <p className="text-gray-600">{selectedLesson.duration} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Rating:</p>
                      <div className="flex items-center gap-1">
                        {getRatingStars(selectedLesson.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          ({selectedLesson.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Cultural Elements</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedLesson.culturalElements.map((element) => (
                      <span
                        key={element}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded"
                      >
                        {element}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Learning Objectives</h4>
                  <ul className="space-y-2">
                    {selectedLesson.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Activities</h4>
                  <ul className="space-y-2">
                    {selectedLesson.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Feedback</h4>
                  <div className="space-y-2">
                    {selectedLesson.feedback.map((feedback, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <ThumbsUp className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feedback}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => handleStartDemo(selectedLesson)}
                  disabled={liveDemo.isActive}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Start Demo
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Resources
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg">
            <Sparkles className="w-5 h-5" />
            Create New Demo
          </button>

          <button className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all transform hover:scale-105 shadow-lg">
            <Share className="w-5 h-5" />
            Share Showcase
          </button>
        </div>

        {/* Status Summary */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
          <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
            <Award className="w-5 h-5" />
            Teacher Demo Showcase Status
          </h3>
          <p className="text-purple-800">
            🎯 <strong>DEMO SHOWCASE READY:</strong> {metrics.totalLessons} interactive lessons
            available,
            {metrics.completedLessons} completed with {metrics.averageRating.toFixed(1)}/5 average
            rating.
            {metrics.totalParticipants} participants engaged with {metrics.culturalCompliance}%
            cultural compliance. Engagement score: {metrics.engagementScore}%. Ready for live
            demonstrations! 🌟
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeacherDemoShowcase;
