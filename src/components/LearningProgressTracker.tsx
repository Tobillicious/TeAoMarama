import { Award, BookOpen, CheckCircle, Clock, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LearningProgress {
  userId: string;
  completedLessons: string[];
  completedAssessments: string[];
  culturalEngagement: number;
  teReoProgress: number;
  totalTimeSpent: number;
  achievements: string[];
  currentStreak: number;
  favoriteTopics: string[];
}

interface ProgressTrackerProps {
  userId: string;
  onProgressUpdate?: (progress: LearningProgress) => void;
}

export function LearningProgressTracker({ userId, onProgressUpdate }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<LearningProgress>({
    userId,
    completedLessons: [],
    completedAssessments: [],
    culturalEngagement: 0,
    teReoProgress: 0,
    totalTimeSpent: 0,
    achievements: [],
    currentStreak: 0,
    favoriteTopics: [],
  });

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Load progress from localStorage or API
    const savedProgress = localStorage.getItem(`learning-progress-${userId}`);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch {
        console.warn('Could not load learning progress');
      }
    }
  }, [userId]);

  useEffect(() => {
    // Save progress changes
    localStorage.setItem(`learning-progress-${userId}`, JSON.stringify(progress));
    onProgressUpdate?.(progress);
  }, [progress, userId, onProgressUpdate]);

  const calculateOverallProgress = () => {
    const lessonWeight = 40;
    const assessmentWeight = 30;
    const culturalWeight = 20;
    const teReoWeight = 10;

    const lessonProgress = (progress.completedLessons.length / 50) * lessonWeight; // Assuming 50 total lessons
    const assessmentProgress = (progress.completedAssessments.length / 20) * assessmentWeight; // Assuming 20 assessments
    const culturalProgress = (progress.culturalEngagement / 100) * culturalWeight;
    const teReoProgressWeighted = (progress.teReoProgress / 100) * teReoWeight;

    return Math.min(
      100,
      lessonProgress + assessmentProgress + culturalProgress + teReoProgressWeighted,
    );
  };

  const getNextMilestone = () => {
    const overall = calculateOverallProgress();
    if (overall < 25) return { target: 25, reward: 'Cultural Explorer Badge' };
    if (overall < 50) return { target: 50, reward: 'Te Reo Learner Certificate' };
    if (overall < 75) return { target: 75, reward: 'Tikanga Guardian Status' };
    if (overall < 100) return { target: 100, reward: 'Kaitiaki Achievement' };
    return { target: 100, reward: 'Master Learner' };
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const overallProgress = calculateOverallProgress();
  const nextMilestone = getNextMilestone();

  return (
    <div className="learning-progress-tracker bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-green-600" />
          Your Learning Journey
          <span className="text-sm font-normal text-gray-600">/ Tō Taiao Ako</span>
        </h2>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-sm text-blue-600 hover:underline"
        >
          {showDetails ? 'Hide Details' : 'View Details'}
        </button>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm text-gray-600">{overallProgress.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-600">
          Next milestone: {nextMilestone.target}% - {nextMilestone.reward}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-green-800">{progress.completedLessons.length}</div>
          <div className="text-xs text-green-600">Lessons</div>
        </div>

        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Award className="w-6 h-6 text-blue-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-blue-800">{progress.achievements.length}</div>
          <div className="text-xs text-blue-600">Achievements</div>
        </div>

        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <Clock className="w-6 h-6 text-purple-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-purple-800">
            {formatTime(progress.totalTimeSpent)}
          </div>
          <div className="text-xs text-purple-600">Time Spent</div>
        </div>

        <div className="text-center p-3 bg-red-50 rounded-lg">
          <Heart className="w-6 h-6 text-red-600 mx-auto mb-1" />
          <div className="text-lg font-bold text-red-800">{progress.currentStreak}</div>
          <div className="text-xs text-red-600">Day Streak</div>
        </div>
      </div>

      {/* Cultural & Te Reo Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Cultural Engagement / Hononga Ahurea
            </span>
            <span className="text-sm text-gray-600">{progress.culturalEngagement}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full"
              style={{ width: `${progress.culturalEngagement}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Te Reo Māori Progress</span>
            <span className="text-sm text-gray-600">{progress.teReoProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-600 h-2 rounded-full"
              style={{ width: `${progress.teReoProgress}%` }}
            />
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Detailed Progress</h3>

          {progress.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Achievements</h4>
              <div className="flex flex-wrap gap-2">
                {progress.achievements.slice(-5).map((achievement, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full"
                  >
                    🏆 {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}

          {progress.favoriteTopics.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Favorite Topics</h4>
              <div className="flex flex-wrap gap-2">
                {progress.favoriteTopics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 mt-4">
            <p>🌿 Cultural engagement measures your interaction with Māori concepts and values</p>
            <p>📚 Te Reo progress tracks your growth in Māori language learning</p>
            <p>⭐ Keep learning daily to maintain your streak and unlock new achievements!</p>
          </div>
        </div>
      )}
    </div>
  );
}
