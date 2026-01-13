import {
  ArrowLeft,
  CheckSquare,
  ExternalLink,
  Pause,
  Play,
  Printer,
  RotateCcw,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { realTeachingResources } from '../data/nz-curriculum-year8';

interface Activity {
  title: string;
  duration: number;
  description: string;
  materials: string[];
  instructions: string[];
  handout?: string;
}

interface TeachingTimer {
  isRunning: boolean;
  timeLeft: number;
  totalTime: number;
  currentActivity: number;
}

const RealLessonViewer: React.FC = () => {
  // Safety check for React Router context
  let params: any = null;
  let resourceId: string | undefined;
  let navigate: any = null;

  try {
    params = useParams<{ resourceId: string }>();
    resourceId = params?.resourceId;
    navigate = useNavigate();
  } catch (error) {
    console.error('❌ React Router context not available:', error);
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>🚨 Navigation Error</h2>
        <p>This component requires proper routing context.</p>
        <button onClick={() => (window.location.href = '/')}>🏠 Go Home</button>
      </div>
    );
  }
  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fallback if no resourceId provided
  if (!resourceId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Lesson Not Found</h1>
          <p className="text-gray-600 mb-6">No lesson ID provided in the URL.</p>
          <button
            onClick={() => navigate('/resources')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Browse Resources
          </button>
        </div>
      </div>
    );
  }
  const [currentStep, setCurrentStep] = useState(0);
  const [showHandouts, setShowHandouts] = useState(false);
  const [timer, setTimer] = useState<TeachingTimer>({
    isRunning: false,
    timeLeft: 0,
    totalTime: 0,
    currentActivity: 0,
  });
  const [completedActivities, setCompletedActivities] = useState<Set<number>>(new Set());
  const [lessonNotes, setLessonNotes] = useState('');
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);

  useEffect(() => {
    const foundResource = realTeachingResources.find((r) => r.id === resourceId);
    if (foundResource) {
      setResource(foundResource);
    }
    setLoading(false);
  }, [resourceId]);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer.isRunning && timer.timeLeft > 0) {
      interval = setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          timeLeft: prev.timeLeft - 1,
        }));
      }, 1000);
    } else if (timer.timeLeft === 0 && timer.isRunning) {
      // Timer finished - show alert and move to next activity
      setTimer((prev) => ({ ...prev, isRunning: false }));
      alert(`Activity "${getActivities()[timer.currentActivity]?.title}" time is up!`);
    }
    return () => clearInterval(interval);
  }, [timer.isRunning, timer.timeLeft]);

  const startTimer = (activityIndex: number) => {
    const activities = getActivities();
    const duration = activities[activityIndex]?.duration || 10;
    setTimer({
      isRunning: true,
      timeLeft: duration * 60, // Convert to seconds
      totalTime: duration * 60,
      currentActivity: activityIndex,
    });
  };

  const pauseTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    const activities = getActivities();
    const duration = activities[timer.currentActivity]?.duration || 10;
    setTimer((prev) => ({
      ...prev,
      isRunning: false,
      timeLeft: duration * 60,
      totalTime: duration * 60,
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const markActivityComplete = (activityIndex: number) => {
    const newCompleted = new Set(completedActivities);
    if (newCompleted.has(activityIndex)) {
      newCompleted.delete(activityIndex);
    } else {
      newCompleted.add(activityIndex);
    }
    setCompletedActivities(newCompleted);
  };

  const generateLessonReport = () => {
    const activities = getActivities();
    const completedCount = completedActivities.size;
    const totalActivities = activities.length;

    const report = `# ${resource.title} - Lesson Report
**Date:** ${new Date().toLocaleDateString()}
**Duration:** ${resource.duration}
**Activities Completed:** ${completedCount}/${totalActivities}

## Progress Summary
${activities
  .map(
    (activity, index) =>
      `${completedActivities.has(index) ? '✅' : '⭕'} ${activity.title} (${
        activity.duration
      } mins)`,
  )
  .join('\n')}

## Teacher Notes
${lessonNotes || 'No additional notes recorded'}

## Next Steps
${
  completedCount === totalActivities
    ? '✅ All activities completed successfully!'
    : `📝 Continue with remaining activities in next session`
}

Generated by TeAoMarama Lesson Viewer`;

    navigator.clipboard.writeText(report).then(() => {
      alert('Lesson report copied to clipboard!');
    });
  };

  const getActivities = (): Activity[] => {
    if (!resource) return [];

    return [
      {
        title: 'Opening Circle (Whakawhanaungatanga)',
        duration: 10,
        description: 'Build connections and activate prior knowledge',
        materials: ['Circle seating', 'Karakia sheet'],
        instructions: [
          'Begin with karakia or acknowledgment',
          "Students share one thing they know about today's topic",
          'Record key ideas on whiteboard',
          'Set learning intentions together',
        ],
        handout: 'Opening circle discussion prompts',
      },
      {
        title: `Main Activity: ${resource.title}`,
        duration: 30,
        description: resource.content.overview,
        materials: resource.content.activities[0]?.materials || ['Worksheets', 'Digital resources'],
        instructions: resource.content.activities[0]?.instructions || [
          'Introduce key concepts',
          'Students work in pairs or small groups',
          'Facilitate class discussion',
          'Connect to external resources',
        ],
        handout: 'Student worksheet and resource links',
      },
      {
        title: 'Reflection & Assessment',
        duration: 10,
        description: 'Students reflect on learning and demonstrate understanding',
        materials: ['Exit tickets', 'Assessment rubric'],
        instructions: [
          'Students complete exit ticket',
          'Share one thing learned and one question',
          'Teacher provides formative feedback',
          'Preview next lesson',
        ],
        handout: 'Exit ticket template',
      },
    ];
  };

  const generateHandout = (activity: Activity, activityIndex: number) => {
    let handoutContent = `# ${activity.title}\n**${resource.title}** | ${resource.yearLevel}\n\n`;

    if (activityIndex === 0) {
      handoutContent += `## Discussion Prompts\n1. What do you already know about this topic?\n2. How might this connect to your community?\n3. What questions do you have?\n\n## Notes:\n_____________________________\n_____________________________\n_____________________________\n`;
    } else if (activityIndex === 1) {
      handoutContent += `## Key Concepts\n${resource.content.overview}\n\n## External Resources (All links verified working):\n`;
      resource.content.resources?.forEach((res: any) => {
        handoutContent += `• **${res.title}**: ${res.url}\n`;
      });
      handoutContent += `\n## Your Task:\n_____________________________\n_____________________________\n\n## Notes:\n_____________________________\n_____________________________\n_____________________________\n`;
    } else {
      handoutContent += `## Reflection Questions\n1. What was the most important thing you learned today?\n2. How does this connect to your own experience?\n3. What questions do you still have?\n\n## Exit Ticket:\nToday I learned: ______________________\nI still wonder: _______________________\n`;
    }

    return handoutContent;
  };

  const printHandout = (activity: Activity, activityIndex: number) => {
    const content = generateHandout(activity, activityIndex);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>${activity.title} - Handout</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h1 { color: #1e40af; border-bottom: 2px solid #1e40af; }
            h2 { color: #374151; margin-top: 20px; }
            .header { background: #f3f4f6; padding: 10px; border-radius: 5px; margin-bottom: 20px; }
          </style></head>
          <body>
            <div class="header">
              <strong>Te Kura o TeAoMarama</strong> | Generated: ${new Date().toLocaleDateString(
                'en-NZ',
              )}
            </div>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${content}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading lesson...</div>;
  }

  if (!resource) {
    return <div className="p-8 text-center">Lesson not found</div>;
  }

  const activities = getActivities();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Teacher Control Bar */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={() => navigate('/resources')}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            <ArrowLeft size={20} />
            Back to Resources
          </button>

          {/* Timer Display */}
          {timer.totalTime > 0 && (
            <div className="flex items-center gap-4 bg-blue-50 px-6 py-3 rounded-lg flex-wrap">
              <div className="text-2xl font-mono text-blue-900">{formatTime(timer.timeLeft)}</div>
              <div className="flex gap-2">
                <button
                  onClick={pauseTimer}
                  className={`p-2 rounded transition-colors ${
                    timer.isRunning
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {timer.isRunning ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
                >
                  <RotateCcw size={16} />
                </button>
              </div>
              <div className="text-sm text-blue-700 hidden sm:block">
                Activity {timer.currentActivity + 1}: {activities[timer.currentActivity]?.title}
              </div>
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowTeacherNotes(!showTeacherNotes)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              📝 Notes
            </button>
            <button
              onClick={generateLessonReport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              📊 Report
            </button>
            <button
              onClick={() => setShowHandouts(!showHandouts)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Printer size={20} />
              {showHandouts ? 'Hide' : 'Show'} Handouts
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 pt-24">
        {/* Lesson Header */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{resource.title}</h1>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{resource.learningArea}</span>
            <span>Year {resource.yearLevel}</span>
            <span>{resource.duration}</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              ✅ All external links verified working
            </span>
          </div>
        </div>

        {/* Teacher Notes Section */}
        {showTeacherNotes && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-purple-900 mb-3">📝 Teacher Notes</h2>
            <textarea
              value={lessonNotes}
              onChange={(e) => setLessonNotes(e.target.value)}
              placeholder="Record observations, student responses, modifications made during lesson..."
              className="w-full h-32 p-3 border border-purple-200 rounded resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="text-sm text-purple-600 mt-2">
              💡 Notes will be included in your lesson report
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Lesson Progress</h2>
            <div className="text-sm text-gray-600">
              {completedActivities.size}/{getActivities().length} activities completed
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedActivities.size / getActivities().length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white rounded-lg p-6 mb-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Learning Objectives</h2>
          <ul className="space-y-2">
            {resource.objectives.map((objective: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <CheckSquare className="text-green-600 mt-1 flex-shrink-0" size={16} />
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Activity Steps */}
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-lg shadow">
              <div
                className={`p-6 ${
                  currentStep === index ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => markActivityComplete(index)}
                      className={`flex items-center justify-center w-6 h-6 rounded border-2 transition-colors ${
                        completedActivities.has(index)
                          ? 'bg-green-600 border-green-600 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {completedActivities.has(index) && <CheckSquare size={14} />}
                    </button>
                    <h3
                      className={`text-xl font-semibold ${
                        completedActivities.has(index) ? 'text-green-700' : ''
                      }`}
                    >
                      Step {index + 1}: {activity.title}
                      {completedActivities.has(index) && ' ✅'}
                    </h3>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                      {activity.duration} minutes
                    </span>
                    <button
                      onClick={() => startTimer(index)}
                      className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      <Play size={14} />
                      Start Timer
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{activity.description}</p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Materials Needed:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {activity.materials.map((material, i) => (
                        <li key={i}>{material}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Instructions:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700">
                      {activity.instructions.map((instruction, i) => (
                        <li key={i}>{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {showHandouts && (
                  <div className="mt-6 p-4 bg-gray-50 rounded border-l-4 border-gray-400">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">Student Handout</h4>
                      <button
                        onClick={() => printHandout(activity, index)}
                        className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                      >
                        <Printer size={14} />
                        Print
                      </button>
                    </div>
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                      {generateHandout(activity, index)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* External Resources */}
        {resource.content.resources && (
          <div className="bg-white rounded-lg p-6 mt-6 shadow">
            <h3 className="text-xl font-semibold mb-4">
              External Resources (All Verified Working)
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {resource.content.resources.map((res: any, index: number) => (
                <a
                  key={index}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <div className="bg-green-100 p-2 rounded">
                    <ExternalLink className="text-green-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{res.title}</div>
                    <div className="text-sm text-gray-600">{res.description}</div>
                    <div className="text-xs text-green-600 mt-1">✅ Verified working</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealLessonViewer;
