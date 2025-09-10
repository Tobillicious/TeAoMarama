/**
 * 📊 REAL-TIME TEACHING ANALYTICS DASHBOARD
 * Live insights into lesson effectiveness and student engagement
 * Built by Whaea Aroha's data intelligence team
 */

import {
  Activity,
  BarChart3,
  Brain,
  Clock,
  Eye,
  Heart,
  LineChart,
  PieChart,
  TrendingDown,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface StudentEngagementData {
  studentId: string;
  name: string;
  engagementScore: number;
  participationRate: number;
  comprehensionLevel: 'low' | 'medium' | 'high';
  culturalConnection: number;
  lastActivity: Date;
  behaviorIndicators: string[];
}

interface LessonMetrics {
  id: string;
  lessonTitle: string;
  subject: string;
  yearLevel: string;
  startTime: Date;
  duration: number;
  currentPhase: 'introduction' | 'development' | 'practice' | 'assessment' | 'closure';
  overallEngagement: number;
  comprehensionRate: number;
  culturalResonance: number;
  pacingScore: number;
  differentiationEffectiveness: number;
  studentCount: number;
  completionRate: number;
}

interface RealTimeInsight {
  type: 'engagement' | 'comprehension' | 'pacing' | 'cultural' | 'differentiation';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  suggestion: string;
  timestamp: Date;
  affectedStudents?: number;
}

interface AnalyticsData {
  currentLesson: LessonMetrics | null;
  studentEngagement: StudentEngagementData[];
  realTimeInsights: RealTimeInsight[];
  historicalTrends: {
    date: string;
    engagement: number;
    comprehension: number;
    cultural: number;
  }[];
  subjectPerformance: {
    subject: string;
    averageEngagement: number;
    lessonCount: number;
    culturalIntegration: number;
  }[];
}

const RealTimeTeachingAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    currentLesson: null,
    studentEngagement: [],
    realTimeInsights: [],
    historicalTrends: [],
    subjectPerformance: []
  });
  const [isLive, setIsLive] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'students' | 'insights' | 'trends'>('overview');

  // Simulate real-time data updates
  useEffect(() => {
    const generateMockData = () => {
      const mockLesson: LessonMetrics = {
        id: 'lesson-current',
        lessonTitle: 'Year 9 Social Studies: Treaty of Waitangi - Understanding Our Foundation',
        subject: 'Social Studies',
        yearLevel: 'Year 9',
        startTime: new Date(Date.now() - 25 * 60 * 1000), // Started 25 minutes ago
        duration: 60,
        currentPhase: 'development',
        overallEngagement: 78,
        comprehensionRate: 73,
        culturalResonance: 85,
        pacingScore: 82,
        differentiationEffectiveness: 76,
        studentCount: 28,
        completionRate: 65
      };

      const mockStudents: StudentEngagementData[] = Array.from({ length: 28 }, (_, i) => ({
        studentId: `student-${i + 1}`,
        name: `Student ${i + 1}`,
        engagementScore: Math.floor(Math.random() * 40) + 60,
        participationRate: Math.floor(Math.random() * 50) + 50,
        comprehensionLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as any,
        culturalConnection: Math.floor(Math.random() * 5) + 1,
        lastActivity: new Date(Date.now() - Math.random() * 10 * 60 * 1000),
        behaviorIndicators: [
          'Active participation',
          'Asking questions',
          'Helping peers',
          'Cultural engagement',
          'Critical thinking'
        ].slice(0, Math.floor(Math.random() * 3) + 1)
      }));

      const mockInsights: RealTimeInsight[] = [
        {
          type: 'engagement',
          severity: 'warning',
          title: '4 students showing low engagement',
          description: 'Students in the back corner are showing decreased participation in the last 5 minutes',
          suggestion: 'Consider moving to group activity or checking in with those students individually',
          timestamp: new Date(Date.now() - 2 * 60 * 1000),
          affectedStudents: 4
        },
        {
          type: 'cultural',
          severity: 'info',
          title: 'High cultural resonance detected',
          description: 'Students are particularly engaged with the Treaty discussion and whakapapa connections',
          suggestion: 'Extend this section by 3-5 minutes to capitalize on engagement',
          timestamp: new Date(Date.now() - 5 * 60 * 1000)
        },
        {
          type: 'comprehension',
          severity: 'critical',
          title: 'Comprehension gap identified',
          description: 'Several students are struggling with the concept of sovereignty',
          suggestion: 'Pause for clarification using visual aids or Te Reo Māori explanations',
          timestamp: new Date(Date.now() - 1 * 60 * 1000),
          affectedStudents: 8
        }
      ];

      const mockTrends = Array.from({ length: 14 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        engagement: Math.floor(Math.random() * 30) + 65,
        comprehension: Math.floor(Math.random() * 25) + 70,
        cultural: Math.floor(Math.random() * 20) + 75
      })).reverse();

      const mockSubjectPerformance = [
        { subject: 'Social Studies', averageEngagement: 82, lessonCount: 12, culturalIntegration: 4.2 },
        { subject: 'English', averageEngagement: 76, lessonCount: 15, culturalIntegration: 3.1 },
        { subject: 'Mathematics', averageEngagement: 71, lessonCount: 18, culturalIntegration: 2.8 },
        { subject: 'Science', averageEngagement: 79, lessonCount: 14, culturalIntegration: 3.5 },
        { subject: 'Te Reo Māori', averageEngagement: 89, lessonCount: 8, culturalIntegration: 4.8 }
      ];

      setAnalyticsData({
        currentLesson: mockLesson,
        studentEngagement: mockStudents,
        realTimeInsights: mockInsights,
        historicalTrends: mockTrends,
        subjectPerformance: mockSubjectPerformance
      });
    };

    generateMockData();

    // Update data every 15 seconds when live
    let interval: NodeJS.Timeout;
    if (isLive) {
      interval = setInterval(() => {
        setAnalyticsData(prev => ({
          ...prev,
          currentLesson: prev.currentLesson ? {
            ...prev.currentLesson,
            overallEngagement: Math.max(50, Math.min(100, prev.currentLesson.overallEngagement + (Math.random() - 0.5) * 10)),
            comprehensionRate: Math.max(40, Math.min(100, prev.currentLesson.comprehensionRate + (Math.random() - 0.5) * 8)),
            culturalResonance: Math.max(60, Math.min(100, prev.currentLesson.culturalResonance + (Math.random() - 0.5) * 6))
          } : null,
          studentEngagement: prev.studentEngagement.map(student => ({
            ...student,
            engagementScore: Math.max(40, Math.min(100, student.engagementScore + (Math.random() - 0.5) * 15))
          }))
        }));
      }, 15000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const getEngagementColor = (score: number) => {
    if (score >= 80) return '#10b981'; // High - Green
    if (score >= 65) return '#f59e0b'; // Medium - Yellow
    return '#ef4444'; // Low - Red
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'engagement': return <Users className="w-5 h-5" />;
      case 'comprehension': return <Brain className="w-5 h-5" />;
      case 'pacing': return <Clock className="w-5 h-5" />;
      case 'cultural': return <Heart className="w-5 h-5" />;
      case 'differentiation': return <Zap className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getInsightColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' };
      case 'warning': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-800' };
      default: return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-purple-600" />
                Real-Time Teaching Analytics
              </h1>
              <p className="text-lg text-gray-600 mt-2">
                Live insights • Student engagement tracking • AI-powered recommendations • Cultural responsiveness metrics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg ${isLive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-600 animate-pulse' : 'bg-gray-400'}`}></div>
                  {isLive ? 'LIVE' : 'OFFLINE'}
                </div>
              </div>
              <button
                onClick={() => setIsLive(!isLive)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isLive 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isLive ? 'Stop Live Tracking' : 'Start Live Tracking'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview', icon: <Eye className="w-4 h-4" /> },
              { id: 'students', label: 'Student Engagement', icon: <Users className="w-4 h-4" /> },
              { id: 'insights', label: 'Live Insights', icon: <Brain className="w-4 h-4" /> },
              { id: 'trends', label: 'Trends', icon: <LineChart className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  selectedView === tab.id 
                    ? 'border-purple-600 text-purple-600' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Current Lesson Status */}
        {analyticsData.currentLesson && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{analyticsData.currentLesson.lessonTitle}</h2>
                <div className="flex items-center gap-4 mt-2 text-gray-600">
                  <span>{analyticsData.currentLesson.subject} • {analyticsData.currentLesson.yearLevel}</span>
                  <span>•</span>
                  <span className="capitalize">{analyticsData.currentLesson.currentPhase} Phase</span>
                  <span>•</span>
                  <span>{analyticsData.currentLesson.studentCount} Students</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">
                  {Math.floor((Date.now() - analyticsData.currentLesson.startTime.getTime()) / 1000 / 60)} min
                </div>
                <div className="text-sm text-gray-600">Elapsed Time</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className={`text-2xl font-bold`} style={{ color: getEngagementColor(analyticsData.currentLesson.overallEngagement) }}>
                  {analyticsData.currentLesson.overallEngagement}%
                </div>
                <div className="text-sm text-gray-600">Overall Engagement</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold`} style={{ color: getEngagementColor(analyticsData.currentLesson.comprehensionRate) }}>
                  {analyticsData.currentLesson.comprehensionRate}%
                </div>
                <div className="text-sm text-gray-600">Comprehension</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold`} style={{ color: getEngagementColor(analyticsData.currentLesson.culturalResonance) }}>
                  {analyticsData.currentLesson.culturalResonance}%
                </div>
                <div className="text-sm text-gray-600">Cultural Resonance</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold`} style={{ color: getEngagementColor(analyticsData.currentLesson.pacingScore) }}>
                  {analyticsData.currentLesson.pacingScore}%
                </div>
                <div className="text-sm text-gray-600">Pacing Score</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold`} style={{ color: getEngagementColor(analyticsData.currentLesson.differentiationEffectiveness) }}>
                  {analyticsData.currentLesson.differentiationEffectiveness}%
                </div>
                <div className="text-sm text-gray-600">Differentiation</div>
              </div>
            </div>
          </div>
        )}

        {/* Content based on selected view */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Key Metrics */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Engagement Trends (Live)
                </h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <LineChart className="w-12 h-12 mx-auto mb-2" />
                    <p>Real-time engagement graph would display here</p>
                    <p className="text-sm">Showing minute-by-minute student engagement data</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Student Comprehension Distribution
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {['High', 'Medium', 'Low'].map((level, index) => {
                    const count = analyticsData.studentEngagement.filter(
                      s => s.comprehensionLevel === level.toLowerCase()
                    ).length;
                    const percentage = Math.round((count / analyticsData.studentEngagement.length) * 100);
                    
                    return (
                      <div key={level} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`text-2xl font-bold ${
                          index === 0 ? 'text-green-600' : 
                          index === 1 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {count}
                        </div>
                        <div className="text-sm text-gray-600">{level} ({percentage}%)</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Subject Performance */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Subject Performance
                </h3>
                <div className="space-y-4">
                  {analyticsData.subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">{subject.subject}</span>
                        <span className="text-sm text-gray-600">{subject.averageEngagement}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${subject.averageEngagement}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{subject.lessonCount} lessons</span>
                        <span>Cultural: {subject.culturalIntegration}/5</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'students' && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Individual Student Engagement</h3>
              <p className="text-gray-600 mt-1">Real-time monitoring of each student's participation and understanding</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {analyticsData.studentEngagement.map((student) => (
                  <div
                    key={student.studentId}
                    className={`p-4 rounded-lg border-2 ${
                      student.engagementScore >= 80 ? 'border-green-200 bg-green-50' :
                      student.engagementScore >= 65 ? 'border-yellow-200 bg-yellow-50' :
                      'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{student.name}</h4>
                      <div className={`text-lg font-bold ${
                        student.engagementScore >= 80 ? 'text-green-600' :
                        student.engagementScore >= 65 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {student.engagementScore}%
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Participation:</span>
                        <span className="font-medium">{student.participationRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Comprehension:</span>
                        <span className={`font-medium capitalize ${
                          student.comprehensionLevel === 'high' ? 'text-green-600' :
                          student.comprehensionLevel === 'medium' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {student.comprehensionLevel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cultural Connection:</span>
                        <span className="font-medium">{student.culturalConnection}/5</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="text-xs text-gray-500 mb-1">Recent Activity:</div>
                      <div className="text-xs text-gray-600">
                        {Math.floor((Date.now() - student.lastActivity.getTime()) / 1000 / 60)} min ago
                      </div>
                    </div>
                    
                    {student.behaviorIndicators.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {student.behaviorIndicators.slice(0, 2).map((indicator, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedView === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Real-Time AI Insights & Recommendations
              </h3>
              <div className="space-y-4">
                {analyticsData.realTimeInsights.map((insight, index) => {
                  const colors = getInsightColor(insight.severity);
                  return (
                    <div key={index} className={`p-4 rounded-lg border-l-4 ${colors.bg} ${colors.border}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${colors.bg} ${colors.text}`}>
                          {getInsightIcon(insight.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-semibold ${colors.text}`}>{insight.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              {insight.affectedStudents && (
                                <span>{insight.affectedStudents} students</span>
                              )}
                              <span>{Math.floor((Date.now() - insight.timestamp.getTime()) / 1000 / 60)} min ago</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{insight.description}</p>
                          <div className="bg-white p-3 rounded border border-gray-200">
                            <div className="text-sm font-medium text-gray-900 mb-1">💡 Suggested Action:</div>
                            <div className="text-sm text-gray-700">{insight.suggestion}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                  <Users className="w-6 h-6 text-blue-600 mb-2" />
                  <div className="font-medium text-blue-900">Check In with Low Engagement Students</div>
                  <div className="text-sm text-blue-700 mt-1">4 students need attention</div>
                </button>
                <button className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                  <Heart className="w-6 h-6 text-green-600 mb-2" />
                  <div className="font-medium text-green-900">Extend Cultural Discussion</div>
                  <div className="text-sm text-green-700 mt-1">High cultural engagement detected</div>
                </button>
                <button className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition-colors">
                  <Clock className="w-6 h-6 text-yellow-600 mb-2" />
                  <div className="font-medium text-yellow-900">Adjust Pacing</div>
                  <div className="text-sm text-yellow-700 mt-1">Some students falling behind</div>
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'trends' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                14-Day Engagement Trend
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <LineChart className="w-12 h-12 mx-auto mb-2" />
                  <p>Historical trend chart would display here</p>
                  <p className="text-sm">Showing engagement patterns over time</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-blue-600">
                    {Math.round(analyticsData.historicalTrends.reduce((acc, day) => acc + day.engagement, 0) / analyticsData.historicalTrends.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Engagement</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {Math.round(analyticsData.historicalTrends.reduce((acc, day) => acc + day.comprehension, 0) / analyticsData.historicalTrends.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Comprehension</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">
                    {Math.round(analyticsData.historicalTrends.reduce((acc, day) => acc + day.cultural, 0) / analyticsData.historicalTrends.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Avg Cultural</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Teaching Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900">Strengths Identified</span>
                  </div>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Excellent cultural integration in Social Studies</li>
                    <li>• Strong student-teacher relationships evident</li>
                    <li>• Effective use of differentiation strategies</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">Growth Opportunities</span>
                  </div>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Consider more hands-on activities in Mathematics</li>
                    <li>• Increase cultural connections in Science lessons</li>
                    <li>• Use more peer collaboration strategies</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-purple-900">AI Recommendations</span>
                  </div>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li>• Schedule 1-on-1 check-ins with 3 students</li>
                    <li>• Try more kinesthetic learning activities</li>
                    <li>• Incorporate more real-world examples</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeTeachingAnalytics;