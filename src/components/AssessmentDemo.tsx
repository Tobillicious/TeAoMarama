import React, { useState } from 'react';
import { EnhancedInteractiveAssessment } from './EnhancedInteractiveAssessment';
import { BookOpen, Star, Award } from 'lucide-react';

const sampleQuestions = [
  {
    id: 'q1',
    type: 'multiple-choice' as const,
    question: 'What does "Kia Ora" mean in English?',
    questionTe: 'He aha te tikanga o "Kia Ora" i te reo Pākehā?',
    options: ['Hello/Goodbye', 'Thank you', 'Please', 'Excuse me'],
    correctAnswer: 'Hello/Goodbye',
    culturalContext: 'Kia Ora is one of the most recognized Māori phrases, used as both a greeting and farewell. It literally means "be well/healthy" and reflects the Māori value of wishing wellness upon others.',
    explanation: 'Kia Ora is a versatile greeting that can be used in many contexts. It embodies the Māori concept of caring for others\' wellbeing.',
    difficulty: 'beginner' as const,
    category: 'te-reo' as const,
    points: 10
  },
  {
    id: 'q2',
    type: 'cultural-context' as const,
    question: 'Which of these best describes the concept of Manaakitanga?',
    questionTe: 'Ko tēhea o ēnei he whakamārama pai rawa mō te ariā o Manaakitanga?',
    options: [
      'Hosting guests with respect and generosity',
      'Protecting the environment',
      'Telling traditional stories',
      'Performing traditional dances'
    ],
    correctAnswer: 'Hosting guests with respect and generosity',
    culturalContext: 'Manaakitanga is a fundamental value in Māori culture. It encompasses the process of showing respect, generosity, and care for others, particularly when hosting guests.',
    explanation: 'Manaakitanga goes beyond simple hospitality - it\'s about creating a sense of belonging and ensuring the physical and spiritual wellbeing of visitors.',
    difficulty: 'intermediate' as const,
    category: 'tikanga' as const,
    points: 15
  },
  {
    id: 'q3',
    type: 'scenario-based' as const,
    question: 'You are visiting a marae for the first time. What should you do when you arrive?',
    questionTe: 'Kei te toro koe ki tētahi marae hei te taima tuatahi. Me aha koe i tō taenga mai?',
    options: [
      'Wait to be welcomed before entering the courtyard',
      'Walk straight onto the marae grounds',
      'Enter the meeting house immediately',
      'Start taking photos of the buildings'
    ],
    correctAnswer: 'Wait to be welcomed before entering the courtyard',
    culturalContext: 'Visiting a marae involves following specific protocols (tikanga). The pōwhiri (welcome ceremony) is an important process that must be completed before visitors can enter the marae grounds.',
    explanation: 'Respecting marae protocols is essential. Visitors should wait for the formal welcome process, which includes speeches and a hongi (traditional greeting), before fully entering the marae.',
    difficulty: 'intermediate' as const,
    category: 'tikanga' as const,
    points: 20
  },
  {
    id: 'q4',
    type: 'te-reo-matching' as const,
    question: 'Match the Māori terms with their English meanings:',
    questionTe: 'Whakatauritea ngā kupu Māori ki ō rātou tikanga Pākehā:',
    options: ['Whānau', 'Aroha', 'Kaitiaki', 'Whakapapa'],
    correctAnswer: ['Whānau', 'Aroha', 'Kaitiaki', 'Whakapapa'],
    culturalContext: 'These are fundamental concepts in te ao Māori (the Māori worldview). Each represents important relationships and responsibilities within Māori culture.',
    explanation: 'Whānau (family), Aroha (love/compassion), Kaitiaki (guardian/protector), and Whakapapa (genealogy/connections) are core concepts that shape how Māori understand relationships with people and the environment.',
    difficulty: 'advanced' as const,
    category: 'te-reo' as const,
    points: 25
  },
  {
    id: 'q5',
    type: 'multiple-choice' as const,
    question: 'What is the significance of the Treaty of Waitangi in New Zealand?',
    questionTe: 'He aha te hiranga o te Tiriti o Waitangi ki Aotearoa?',
    options: [
      'It established trade relationships with Britain',
      'It founded New Zealand as a British colony and promised Māori protection',
      'It divided land between Māori tribes',
      'It created the New Zealand Constitution'
    ],
    correctAnswer: 'It founded New Zealand as a British colony and promised Māori protection',
    culturalContext: 'Te Tiriti o Waitangi, signed in 1840, is New Zealand\'s founding document. It established British sovereignty while promising to protect Māori rights, lands, and taonga (treasures).',
    explanation: 'The Treaty of Waitangi remains central to New Zealand\'s identity and ongoing conversations about partnership between Māori and non-Māori.',
    difficulty: 'intermediate' as const,
    category: 'history' as const,
    points: 15
  }
];

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

export function AssessmentDemo() : void {
  const [showAssessment, setShowAssessment] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showTeReo, setShowTeReo] = useState(false);

  const handleAssessmentComplete = (assessmentResults: AssessmentResults) => {
    setResults(assessmentResults);
    console.log('Assessment completed:', assessmentResults);
  };

  const resetAssessment = () => {
    setShowAssessment(false);
    setResults(null);
  };

  if (showAssessment) {
    return (
      <EnhancedInteractiveAssessment
        title={showTeReo ? "Aromatawai Ahurea - Cultural Assessment" : "Cultural Knowledge Assessment"}
        description={showTeReo 
          ? "Whakamātauria tō mātauranga mō te taiao Māori me ngā tikanga"
          : "Test your understanding of Māori culture, language, and New Zealand history"}
        questions={sampleQuestions}
        onComplete={handleAssessmentComplete}
        showTeReo={showTeReo}
      />
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <BookOpen className="text-blue-600" />
          📝 Cultural Assessment Demo
        </h3>
        <p className="text-gray-600 mb-4">
          Experience Te Kura o TeAoMarama's advanced assessment system
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setShowTeReo(!showTeReo)}
            className="px-3 py-1 text-sm bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            {showTeReo ? 'English' : 'Te Reo Māori'}
          </button>
        </div>
      </div>

      {/* Assessment Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-white rounded-lg border border-blue-200">
          <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-gray-800">5 Questions</div>
          <div className="text-xs text-gray-600">Mixed difficulty levels</div>
        </div>
        
        <div className="text-center p-4 bg-white rounded-lg border border-green-200">
          <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-gray-800">Cultural Focus</div>
          <div className="text-xs text-gray-600">Tikanga & Te Reo</div>
        </div>
        
        <div className="text-center p-4 bg-white rounded-lg border border-purple-200">
          <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <div className="text-sm font-semibold text-gray-800">85 Points</div>
          <div className="text-xs text-gray-600">Maximum score</div>
        </div>
      </div>

      {/* Features List */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">Assessment Features:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Interactive question types</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Cultural context explanations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            <span>Te Reo Māori integration</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>Personalized feedback</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <span>Progress tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
            <span>Learning recommendations</span>
          </div>
        </div>
      </div>

      {/* Previous Results */}
      {results && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="text-sm font-semibold text-green-800 mb-2">🏆 Last Assessment Results:</h4>
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <div className="font-bold text-green-700">{results.percentage}%</div>
              <div className="text-green-600">Score</div>
            </div>
            <div>
              <div className="font-bold text-green-700">{results.culturalEngagement}%</div>
              <div className="text-green-600">Cultural</div>
            </div>
            <div>
              <div className="font-bold text-green-700">{results.timeSpent}m</div>
              <div className="text-green-600">Time</div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="text-center space-y-3">
        <button
          onClick={() => setShowAssessment(true)}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg"
        >
          {results ? 'Retake Assessment' : 'Start Cultural Assessment'}
        </button>
        
        {results && (
          <button
            onClick={resetAssessment}
            className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all text-sm"
          >
            Reset Results
          </button>
        )}
      </div>

      <div className="mt-4 text-center text-xs text-gray-500">
        ⏱️ Estimated time: 5-8 minutes • 📊 Detailed feedback provided
      </div>
    </div>
  );
}