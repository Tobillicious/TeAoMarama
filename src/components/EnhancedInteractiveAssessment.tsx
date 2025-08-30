import { Award, BookOpen, Brain, CheckCircle, Heart, Star, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AssessmentQuestion {
  id: string;
  type: 'multiple-choice' | 'cultural-context' | 'te-reo-matching' | 'scenario-based';
  question: string;
  questionTe?: string;
  options?: string[];
  correctAnswer: string | string[];
  culturalContext?: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'tikanga' | 'te-reo' | 'history' | 'values' | 'contemporary';
  points: number;
}

interface AssessmentProps {
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  onComplete: (results: AssessmentResults) => void;
  showTeReo?: boolean;
}

interface AssessmentResults {
  score: number;
  totalPoints: number;
  percentage: number;
  culturalEngagement: number;
  timeSpent: number;
  strengths: string[];
  improvements: string[];
  nextRecommendations: string[];
}

export function EnhancedInteractiveAssessment({
  title,
  description,
  questions,
  onComplete,
  showTeReo = false,
}: AssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    if (currentQuestion.type === 'te-reo-matching') {
      const newSelection = selectedAnswers.includes(answer)
        ? selectedAnswers.filter((a) => a !== answer)
        : [...selectedAnswers, answer];
      setSelectedAnswers(newSelection);
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: answer });
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion.type === 'te-reo-matching') {
      setAnswers({ ...answers, [currentQuestion.id]: selectedAnswers });
      setSelectedAnswers([]);
    }

    if (isLastQuestion) {
      completeAssessment();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    }
  };

  const completeAssessment = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60); // minutes
    let totalScore = 0;
    let maxPoints = 0;
    let culturalEngagement = 0;
    const strengths: string[] = [];
    const improvements: string[] = [];

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const isCorrect = Array.isArray(question.correctAnswer)
        ? JSON.stringify(userAnswer) === JSON.stringify(question.correctAnswer)
        : userAnswer === question.correctAnswer;

      maxPoints += question.points;

      if (isCorrect) {
        totalScore += question.points;
        if (question.category === 'tikanga' || question.category === 'values') {
          culturalEngagement += 20;
        }
        strengths.push(question.category);
      } else {
        improvements.push(question.category);
      }
    });

    const percentage = Math.round((totalScore / maxPoints) * 100);
    culturalEngagement = Math.min(100, culturalEngagement);

    // Generate personalized recommendations
    const nextRecommendations = [];
    if (improvements.includes('te-reo')) {
      nextRecommendations.push('Focus on Te Reo Māori vocabulary building');
    }
    if (improvements.includes('tikanga')) {
      nextRecommendations.push('Explore traditional Māori customs and protocols');
    }
    if (improvements.includes('history')) {
      nextRecommendations.push('Study New Zealand history and Treaty of Waitangi');
    }
    if (percentage >= 80) {
      nextRecommendations.push('Try advanced cultural concepts');
    }

    const results: AssessmentResults = {
      score: totalScore,
      totalPoints: maxPoints,
      percentage,
      culturalEngagement,
      timeSpent,
      strengths: [...new Set(strengths)],
      improvements: [...new Set(improvements)],
      nextRecommendations,
    };

    setAssessmentResults(results);
    setShowResults(true);
    onComplete(results);
  };

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'mi-NZ';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'tikanga':
        return <Heart className="w-4 h-4" />;
      case 'te-reo':
        return <Volume2 className="w-4 h-4" />;
      case 'history':
        return <BookOpen className="w-4 h-4" />;
      case 'values':
        return <Star className="w-4 h-4" />;
      case 'contemporary':
        return <Brain className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  if (showResults && assessmentResults) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {assessmentResults.percentage >= 80
              ? '🏆'
              : assessmentResults.percentage >= 60
              ? '🌟'
              : '📚'}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
          <div className="text-lg text-gray-600">
            {showTeReo ? 'Kua oti tō aromatawai!' : 'You scored'}{' '}
            <span className="font-bold text-green-600">{assessmentResults.percentage}%</span>
          </div>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
            <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">
              {assessmentResults.score}/{assessmentResults.totalPoints}
            </div>
            <div className="text-sm text-blue-600">Points Earned</div>
          </div>

          <div className="text-center p-6 bg-orange-50 rounded-lg border border-orange-200">
            <Heart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-800">
              {assessmentResults.culturalEngagement}%
            </div>
            <div className="text-sm text-orange-600">Cultural Engagement</div>
          </div>

          <div className="text-center p-6 bg-purple-50 rounded-lg border border-purple-200">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-800">{assessmentResults.timeSpent}m</div>
            <div className="text-sm text-purple-600">Time Spent</div>
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {assessmentResults.strengths.length > 0 && (
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {showTeReo ? 'Ngā Kaha / Strengths' : 'Your Strengths'}
              </h3>
              <div className="space-y-2">
                {assessmentResults.strengths.map((strength, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {getCategoryIcon(strength)}
                    <span className="text-green-700 capitalize">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {assessmentResults.improvements.length > 0 && (
            <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" />
                {showTeReo ? 'Ngā Wāhanga Hei Whakapai / Growth Areas' : 'Areas to Focus On'}
              </h3>
              <div className="space-y-2">
                {assessmentResults.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {getCategoryIcon(improvement)}
                    <span className="text-yellow-700 capitalize">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {assessmentResults.nextRecommendations.length > 0 && (
          <div className="p-6 bg-indigo-50 rounded-lg border border-indigo-200 mb-8">
            <h3 className="text-lg font-semibold text-indigo-800 mb-3">
              {showTeReo ? 'Ngā Tūtohu / Next Steps' : 'Recommended Next Steps'}
            </h3>
            <ul className="space-y-2">
              {assessmentResults.nextRecommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-indigo-600 mt-1">•</span>
                  <span className="text-indigo-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cultural Recognition */}
        {assessmentResults.culturalEngagement > 70 && (
          <div className="p-6 bg-orange-50 rounded-lg border border-orange-200 text-center">
            <div className="text-3xl mb-2">🌿</div>
            <h3 className="text-lg font-semibold text-orange-800 mb-2">
              Cultural Connection Achieved!
            </h3>
            <p className="text-orange-700 text-sm">
              {showTeReo
                ? 'Kua whakatōngia koe ki ngā tikanga Māori. He pai hoki tēnei!'
                : 'You have demonstrated strong understanding of Māori culture and values. Ka pai!'}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Current Question */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{getCategoryIcon(currentQuestion.category)}</span>
            <span
              className={`px-3 py-1 text-sm rounded-full ${getDifficultyColor(
                currentQuestion.difficulty,
              )}`}
            >
              {currentQuestion.difficulty}
            </span>
          </div>
          <div className="text-sm text-gray-600">{currentQuestion.points} points</div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {showTeReo && currentQuestion.questionTe
            ? currentQuestion.questionTe
            : currentQuestion.question}
        </h2>

        {currentQuestion.questionTe && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-600">
              {showTeReo ? currentQuestion.question : currentQuestion.questionTe}
            </span>
            <button
              onClick={() => playPronunciation(currentQuestion.questionTe!)}
              className="text-orange-600 hover:text-orange-700 p-1 rounded-full hover:bg-orange-100"
              aria-label="Play pronunciation"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Cultural Context */}
        {currentQuestion.culturalContext && (
          <div className="mb-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-300">
            <h4 className="text-sm font-semibold text-orange-800 mb-2">
              🌿 Cultural Context / Horopaki Ahurea
            </h4>
            <p className="text-sm text-orange-700">{currentQuestion.culturalContext}</p>
          </div>
        )}

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 text-left border rounded-lg transition-all ${
                (currentQuestion.type === 'te-reo-matching' && selectedAnswers.includes(option)) ||
                (currentQuestion.type !== 'te-reo-matching' &&
                  answers[currentQuestion.id] === option)
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    (currentQuestion.type === 'te-reo-matching' &&
                      selectedAnswers.includes(option)) ||
                    (currentQuestion.type !== 'te-reo-matching' &&
                      answers[currentQuestion.id] === option)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-400'
                  }`}
                >
                  {((currentQuestion.type === 'te-reo-matching' &&
                    selectedAnswers.includes(option)) ||
                    (currentQuestion.type !== 'te-reo-matching' &&
                      answers[currentQuestion.id] === option)) && (
                    <div className="w-full h-full rounded-full bg-white transform scale-50" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h4 className="text-sm font-semibold text-indigo-800 mb-2">Explanation:</h4>
            <p className="text-sm text-indigo-700">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          {showExplanation ? 'Hide' : 'Show'} Explanation
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={
            (currentQuestion.type === 'te-reo-matching' && selectedAnswers.length === 0) ||
            (currentQuestion.type !== 'te-reo-matching' && !answers[currentQuestion.id])
          }
          className={`px-6 py-2 text-white rounded-lg font-semibold transition-all ${
            (currentQuestion.type === 'te-reo-matching' && selectedAnswers.length === 0) ||
            (currentQuestion.type !== 'te-reo-matching' && !answers[currentQuestion.id])
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
        </button>
      </div>
    </div>
  );
}
