import React, { useEffect, useMemo, useState } from 'react';

import './CulturalLearningPathNavigator.css';

interface CulturalLearningPath {
  id: string;
  title: string;
  description: string;
  culturalFocus: string;
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  culturalElements: string[];
  pathSteps: LearningStep[];
  prerequisites: string[];
  outcomes: string[];
  culturalSignificance: string;
  maoriValues: string[];
}

interface LearningStep {
  id: string;
  title: string;
  description: string;
  resourceIds: string[];
  estimatedTime: number;
  culturalContext: string;
  interactiveElements: string[];
  assessmentType: 'formative' | 'summative' | 'reflection' | 'cultural-practice';
  completed: boolean;
  culturalValidation: boolean;
}

interface UserLearningJourney {
  userId: string;
  currentPath: string;
  completedPaths: string[];
  currentStep: number;
  culturalEngagementScore: number;
  strongestCulturalAreas: string[];
  recommendedNextPaths: string[];
}

const CulturalLearningPathNavigator: React.FC = () => {
  const [learningPaths, setLearningPaths] = useState<CulturalLearningPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CulturalLearningPath | null>(null);
  const [userJourney, setUserJourney] = useState<UserLearningJourney | null>(null);

  const [currentStep, setCurrentStep] = useState(0);
  const [pathFilter, setPathFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>(
    'all',
  );
  const [culturalFocusFilter, setCulturalFocusFilter] = useState<string>('all');

  // Comprehensive cultural learning paths
  const predefinedPaths: CulturalLearningPath[] = useMemo(
    () => [
      {
        id: 'te-ao-maori-foundation',
        title: 'Te Ao Māori Foundation Journey',
        description:
          'Begin your journey into Māori worldview, exploring fundamental concepts, values, and perspectives that shape Te Ao Māori.',
        culturalFocus: 'te-ao-maori-worldview',
        estimatedDuration: '6-8 weeks',
        difficulty: 'beginner',
        culturalElements: ['Whakapapa', 'Mana', 'Tapu', 'Noa', 'Mauri', 'Whakatōhea'],
        maoriValues: ['Aroha', 'Manaakitanga', 'Whanaungatanga', 'Kaitiakitanga'],
        culturalSignificance:
          'Understanding Te Ao Māori worldview is essential for all New Zealanders to develop cultural competency and respect for tangata whenua.',
        prerequisites: [
          'Basic willingness to learn',
          'Open mindset',
          'Respect for cultural knowledge',
        ],
        outcomes: [
          'Understand fundamental Māori concepts and values',
          'Develop cultural awareness and sensitivity',
          'Appreciate Māori worldview and perspectives',
          'Build foundation for further cultural learning',
        ],
        pathSteps: [
          {
            id: 'step-1-introduction',
            title: 'Introduction to Te Ao Māori',
            description: 'Explore the rich Māori worldview and its foundational concepts',
            resourceIds: ['intro-te-ao-maori', 'maori-worldview-basics'],
            estimatedTime: 90,
            culturalContext: 'foundational-knowledge',
            interactiveElements: [
              'Virtual marae visit',
              'Cultural concept mapping',
              'Reflection journal',
            ],
            assessmentType: 'reflection',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-2-whakapapa',
            title: 'Understanding Whakapapa',
            description: 'Learn about genealogy, connections, and relationships in Māori culture',
            resourceIds: ['whakapapa-concept', 'genealogy-connections'],
            estimatedTime: 75,
            culturalContext: 'relationship-systems',
            interactiveElements: ['Family tree creation', 'Connection mapping', 'Cultural stories'],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-3-values-system',
            title: 'Māori Values in Practice',
            description: 'Explore how Māori values guide daily life and decision-making',
            resourceIds: ['maori-values-practice', 'aroha-manaakitanga'],
            estimatedTime: 60,
            culturalContext: 'values-application',
            interactiveElements: [
              'Scenario-based learning',
              'Value identification games',
              'Community examples',
            ],
            assessmentType: 'formative',
            completed: false,
            culturalValidation: true,
          },
        ],
      },
      {
        id: 'te-reo-cultural-immersion',
        title: 'Te Reo Māori Cultural Immersion',
        description:
          'Immerse yourself in Te Reo Māori language learning within rich cultural contexts, connecting language with tikanga.',
        culturalFocus: 'te-reo-language-culture',
        estimatedDuration: '10-12 weeks',
        difficulty: 'intermediate',
        culturalElements: ['Kōrero', 'Waiata', 'Karakia', 'Whaikōrero', 'Hongi'],
        maoriValues: ['Ako', 'Whakatōhea', 'Kotahitanga'],
        culturalSignificance:
          'Te Reo Māori is a taonga (treasure) and the heartbeat of Māori culture. Learning te reo within cultural context deepens understanding and connection.',
        prerequisites: [
          'Basic Te Ao Māori knowledge',
          'Commitment to daily practice',
          'Cultural sensitivity awareness',
        ],
        outcomes: [
          'Communicate effectively in basic Te Reo Māori',
          'Understand cultural protocols around language use',
          'Appreciate the deep connection between language and culture',
          'Participate respectfully in Māori cultural contexts',
        ],
        pathSteps: [
          {
            id: 'step-1-greetings-protocols',
            title: 'Greetings and Cultural Protocols',
            description: 'Master Māori greetings within their proper cultural contexts',
            resourceIds: ['maori-greetings', 'cultural-protocols-greeting'],
            estimatedTime: 45,
            culturalContext: 'social-protocols',
            interactiveElements: [
              'Interactive greeting practice',
              'Protocol scenarios',
              'Cultural context videos',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-2-whakatau-powhiri',
            title: 'Welcome Ceremonies - Whakatau and Pōwhiri',
            description: 'Understand the language and protocols of Māori welcome ceremonies',
            resourceIds: ['powhiri-process', 'welcome-ceremony-language'],
            estimatedTime: 90,
            culturalContext: 'ceremonial-protocols',
            interactiveElements: [
              'Virtual ceremony participation',
              'Language practice in context',
              'Cultural significance exploration',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-3-waiata-cultural-songs',
            title: 'Waiata - Songs of Culture',
            description: 'Learn traditional Māori songs and their cultural meanings',
            resourceIds: ['traditional-waiata', 'cultural-songs-meaning'],
            estimatedTime: 75,
            culturalContext: 'musical-cultural-expression',
            interactiveElements: [
              'Song learning',
              'Cultural meaning exploration',
              'Community singing practice',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
        ],
      },
      {
        id: 'environmental-kaitiakitanga',
        title: 'Environmental Kaitiakitanga Path',
        description:
          'Explore Māori environmental guardianship principles and their application to modern sustainability challenges.',
        culturalFocus: 'environmental-stewardship',
        estimatedDuration: '8-10 weeks',
        difficulty: 'intermediate',
        culturalElements: ['Kaitiakitanga', 'Taiao', 'Whenua', 'Wai', 'Rakau'],
        maoriValues: ['Kaitiakitanga', 'Whakatōhea', 'Aroha ki te taiao'],
        culturalSignificance:
          'Kaitiakitanga represents the Māori approach to environmental stewardship, emphasizing guardianship rather than ownership of natural resources.',
        prerequisites: [
          'Basic environmental awareness',
          'Understanding of Māori values',
          'Interest in sustainability',
        ],
        outcomes: [
          'Understand kaitiakitanga principles and practices',
          'Apply Māori environmental knowledge to modern contexts',
          'Develop sustainable practices based on Māori wisdom',
          'Appreciate the interconnectedness of all living things',
        ],
        pathSteps: [
          {
            id: 'step-1-kaitiaki-concept',
            title: 'Understanding Kaitiaki Responsibility',
            description: 'Explore the role and responsibilities of environmental guardians',
            resourceIds: ['kaitiaki-role', 'environmental-guardianship'],
            estimatedTime: 60,
            culturalContext: 'environmental-responsibility',
            interactiveElements: [
              'Guardian role-play',
              'Environmental assessment',
              'Community case studies',
            ],
            assessmentType: 'reflection',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-2-traditional-practices',
            title: 'Traditional Environmental Practices',
            description: 'Learn about traditional Māori environmental management practices',
            resourceIds: ['traditional-conservation', 'maori-environmental-practices'],
            estimatedTime: 90,
            culturalContext: 'traditional-knowledge-systems',
            interactiveElements: [
              'Practice demonstrations',
              'Traditional knowledge videos',
              'Community elder interviews',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-3-modern-application',
            title: 'Modern Applications of Kaitiakitanga',
            description: 'Apply traditional principles to contemporary environmental challenges',
            resourceIds: ['modern-kaitiakitanga', 'sustainability-applications'],
            estimatedTime: 75,
            culturalContext: 'contemporary-application',
            interactiveElements: [
              'Project planning',
              'Solution development',
              'Community action plans',
            ],
            assessmentType: 'summative',
            completed: false,
            culturalValidation: true,
          },
        ],
      },
      {
        id: 'matariki-astronomical-knowledge',
        title: 'Matariki and Māori Astronomical Knowledge',
        description:
          'Journey through Māori astronomy, seasonal cycles, and the cultural significance of Matariki and other celestial knowledge.',
        culturalFocus: 'astronomical-cultural-knowledge',
        estimatedDuration: '6-8 weeks',
        difficulty: 'advanced',
        culturalElements: ['Matariki', 'Maramataka', 'Rēhia', 'Whetū', 'Astronomical navigation'],
        maoriValues: ['Mātauranga', 'Whakapapa ki nga whetū', 'Taiao connection'],
        culturalSignificance:
          'Māori astronomical knowledge represents sophisticated understanding of celestial cycles and their connection to earthly activities and spiritual wellbeing.',
        prerequisites: [
          'Strong foundation in Te Ao Māori',
          'Interest in astronomy',
          'Advanced cultural knowledge',
        ],
        outcomes: [
          'Understand Matariki constellation and its cultural significance',
          'Learn about Māori lunar calendar (Maramataka)',
          'Appreciate astronomical navigation techniques',
          'Connect celestial knowledge to seasonal activities',
        ],
        pathSteps: [
          {
            id: 'step-1-matariki-stars',
            title: 'The Stars of Matariki',
            description:
              'Learn about each star in the Matariki constellation and their individual significance',
            resourceIds: ['matariki-constellation', 'individual-star-meanings'],
            estimatedTime: 90,
            culturalContext: 'astronomical-cultural-knowledge',
            interactiveElements: [
              'Star identification',
              'Cultural story exploration',
              'Interactive star maps',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-2-maramataka-lunar-calendar',
            title: 'Maramataka - The Māori Lunar Calendar',
            description:
              'Understand the Māori lunar calendar system and its practical applications',
            resourceIds: ['maramataka-system', 'lunar-calendar-application'],
            estimatedTime: 75,
            culturalContext: 'temporal-cultural-systems',
            interactiveElements: [
              'Calendar creation',
              'Seasonal activity planning',
              'Moon phase tracking',
            ],
            assessmentType: 'formative',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-3-navigation-wayfinding',
            title: 'Celestial Navigation and Wayfinding',
            description:
              'Explore traditional Māori navigation techniques using stars and celestial markers',
            resourceIds: ['celestial-navigation', 'traditional-wayfinding'],
            estimatedTime: 120,
            culturalContext: 'navigational-knowledge',
            interactiveElements: [
              'Navigation simulation',
              'Star chart creation',
              'Journey planning exercises',
            ],
            assessmentType: 'summative',
            completed: false,
            culturalValidation: true,
          },
        ],
      },
      {
        id: 'traditional-arts-crafts',
        title: 'Traditional Māori Arts and Crafts',
        description:
          'Hands-on journey through traditional Māori artistic expressions, learning techniques while understanding cultural significance.',
        culturalFocus: 'artistic-cultural-expression',
        estimatedDuration: '12-14 weeks',
        difficulty: 'intermediate',
        culturalElements: ['Raranga', 'Whakairo', 'Tā Moko', 'Kowhaiwhai', 'Kapa Haka'],
        maoriValues: ['Mahi toi', 'Whakatōhea', 'Cultural preservation'],
        culturalSignificance:
          'Traditional Māori arts carry deep cultural meanings, stories, and spiritual significance that connect practitioners to their ancestors and cultural identity.',
        prerequisites: [
          'Respect for cultural arts',
          'Willingness for hands-on learning',
          'Understanding of cultural protocols',
        ],
        outcomes: [
          'Create traditional Māori art pieces',
          'Understand cultural meanings behind artistic motifs',
          'Appreciate the spiritual aspects of traditional arts',
          'Develop skills in traditional techniques',
        ],
        pathSteps: [
          {
            id: 'step-1-raranga-weaving',
            title: 'Raranga - Traditional Weaving',
            description: 'Learn the art of traditional Māori weaving using harakeke (flax)',
            resourceIds: ['raranga-basics', 'flax-weaving-techniques'],
            estimatedTime: 180,
            culturalContext: 'traditional-craft-skills',
            interactiveElements: [
              'Hands-on weaving workshops',
              'Cultural protocol learning',
              'Master craftsperson guidance',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-2-kowhaiwhai-patterns',
            title: 'Kowhaiwhai - Painted Patterns',
            description: 'Explore traditional Māori painted patterns and their symbolic meanings',
            resourceIds: ['kowhaiwhai-patterns', 'symbolic-meanings'],
            estimatedTime: 90,
            culturalContext: 'symbolic-artistic-expression',
            interactiveElements: [
              'Pattern creation workshops',
              'Symbolic meaning exploration',
              'Digital art creation',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
          {
            id: 'step-3-whakairo-carving',
            title: 'Whakairo - Traditional Carving',
            description:
              'Introduction to traditional Māori carving techniques and cultural protocols',
            resourceIds: ['whakairo-introduction', 'carving-cultural-protocols'],
            estimatedTime: 240,
            culturalContext: 'sacred-artistic-practice',
            interactiveElements: [
              'Carving workshops',
              'Cultural protocol instruction',
              'Master carver demonstrations',
            ],
            assessmentType: 'cultural-practice',
            completed: false,
            culturalValidation: true,
          },
        ],
      },
    ],
    [],
  );

  // Initialize learning paths and user journey
  useEffect(() => {
    setLearningPaths(predefinedPaths);

    // Simulate user journey data
    const mockUserJourney: UserLearningJourney = {
      userId: 'current-user',
      currentPath: 'te-ao-maori-foundation',
      completedPaths: [],
      currentStep: 0,
      culturalEngagementScore: 75,
      strongestCulturalAreas: ['te-ao-maori-worldview', 'environmental-stewardship'],
      recommendedNextPaths: ['te-reo-cultural-immersion', 'environmental-kaitiakitanga'],
    };

    setUserJourney(mockUserJourney);

    // Load available resources
    // loadAvailableResources();
  }, [predefinedPaths]);

  // Filter paths based on criteria
  const filteredPaths = useMemo(() => {
    return learningPaths.filter((path) => {
      if (pathFilter !== 'all' && path.difficulty !== pathFilter) return false;
      if (culturalFocusFilter !== 'all' && path.culturalFocus !== culturalFocusFilter) return false;
      return true;
    });
  }, [learningPaths, pathFilter, culturalFocusFilter]);

  // Calculate path completion percentage
  const calculatePathCompletion = (path: CulturalLearningPath): number => {
    const completedSteps = path.pathSteps.filter((step) => step.completed).length;
    return Math.round((completedSteps / path.pathSteps.length) * 100);
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case 'beginner':
        return '#10b981';
      case 'intermediate':
        return '#f59e0b';
      case 'advanced':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  // Start a learning path
  const startLearningPath = (path: CulturalLearningPath) => {
    setSelectedPath(path);
    setCurrentStep(0);
    if (userJourney) {
      setUserJourney({
        ...userJourney,
        currentPath: path.id,
        currentStep: 0,
      });
    }
  };

  // Continue current path
  const continueCurrentPath = () => {
    if (userJourney) {
      const currentPath = learningPaths.find((p) => p.id === userJourney.currentPath);
      if (currentPath) {
        setSelectedPath(currentPath);
        setCurrentStep(userJourney.currentStep);
      }
    }
  };

  // Progress to next step
  const progressToNextStep = () => {
    if (selectedPath && currentStep < selectedPath.pathSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (userJourney) {
        setUserJourney({
          ...userJourney,
          currentStep: nextStep,
        });
      }
    }
  };

  // Mark step as completed
  const completeStep = (stepIndex: number) => {
    if (selectedPath) {
      const updatedPath = {
        ...selectedPath,
        pathSteps: selectedPath.pathSteps.map((step, index) =>
          index === stepIndex ? { ...step, completed: true } : step,
        ),
      };
      setSelectedPath(updatedPath);

      // Update in learning paths
      setLearningPaths((paths) => paths.map((p) => (p.id === selectedPath.id ? updatedPath : p)));
    }
  };

  return (
    <div className="cultural-learning-path-navigator">
      {!selectedPath ? (
        // Path Selection View
        <div className="path-selection-view">
          <div className="navigator-header">
            <h1>🌿 Cultural Learning Path Navigator</h1>
            <p>Discover structured pathways through Māori cultural knowledge and practices</p>
          </div>

          {/* User Journey Overview */}
          {userJourney && (
            <div className="user-journey-overview">
              <h2>👤 Your Cultural Learning Journey</h2>
              <div className="journey-stats">
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <h3>{userJourney.culturalEngagementScore}%</h3>
                    <p>Cultural Engagement</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <h3>{userJourney.completedPaths.length}</h3>
                    <p>Completed Paths</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🌟</div>
                  <div className="stat-content">
                    <h3>{userJourney.strongestCulturalAreas.length}</h3>
                    <p>Strong Areas</p>
                  </div>
                </div>
              </div>

              {userJourney.currentPath && (
                <div className="current-path-resumption">
                  <h3>📚 Continue Your Current Path</h3>
                  <button className="continue-path-btn" onClick={continueCurrentPath}>
                    Continue: {learningPaths.find((p) => p.id === userJourney.currentPath)?.title}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Path Filters */}
          <div className="path-filters">
            <div className="filter-section">
              <label>Difficulty Level:</label>
              <select
                value={pathFilter}
                onChange={(e) =>
                  setPathFilter(e.target.value as 'all' | 'beginner' | 'intermediate' | 'advanced')
                }
                className="filter-select"
                aria-label="Select difficulty level"
              >
                <option value="all">All Levels</option>
                <option value="beginner">🌱 Beginner</option>
                <option value="intermediate">🌿 Intermediate</option>
                <option value="advanced">🌳 Advanced</option>
              </select>
            </div>

            <div className="filter-section">
              <label>Cultural Focus:</label>
              <select
                value={culturalFocusFilter}
                onChange={(e) => setCulturalFocusFilter(e.target.value)}
                className="filter-select"
                aria-label="Select cultural focus area"
              >
                <option value="all">All Areas</option>
                <option value="te-ao-maori-worldview">Te Ao Māori Worldview</option>
                <option value="te-reo-language-culture">Te Reo & Culture</option>
                <option value="environmental-stewardship">Environmental Stewardship</option>
                <option value="astronomical-cultural-knowledge">Astronomical Knowledge</option>
                <option value="artistic-cultural-expression">Arts & Crafts</option>
              </select>
            </div>
          </div>

          {/* Learning Paths Grid */}
          <div className="learning-paths-grid">
            {filteredPaths.map((path) => (
              <div key={path.id} className="learning-path-card">
                <div className="path-header">
                  <div
                    className="path-difficulty"
                    style={{ backgroundColor: getDifficultyColor(path.difficulty) }}
                  >
                    {path.difficulty}
                  </div>
                  <div className="path-duration">⏱️ {path.estimatedDuration}</div>
                </div>

                <div className="path-content">
                  <h3>{path.title}</h3>
                  <p className="path-description">{path.description}</p>

                  <div className="cultural-significance">
                    <h4>🌿 Cultural Significance:</h4>
                    <p>{path.culturalSignificance}</p>
                  </div>

                  <div className="path-details">
                    <div className="detail-section">
                      <h4>Cultural Elements:</h4>
                      <div className="element-tags">
                        {path.culturalElements.slice(0, 4).map((element, index) => (
                          <span key={index} className="element-tag">
                            {element}
                          </span>
                        ))}
                        {path.culturalElements.length > 4 && (
                          <span className="element-more">
                            +{path.culturalElements.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Māori Values:</h4>
                      <div className="value-tags">
                        {path.maoriValues.map((value, index) => (
                          <span key={index} className="value-tag">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="detail-section">
                      <h4>Learning Outcomes:</h4>
                      <ul className="outcomes-list">
                        {path.outcomes.slice(0, 3).map((outcome, index) => (
                          <li key={index}>{outcome}</li>
                        ))}
                        {path.outcomes.length > 3 && (
                          <li className="outcomes-more">
                            +{path.outcomes.length - 3} more outcomes
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="path-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${calculatePathCompletion(path)}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{calculatePathCompletion(path)}% Complete</span>
                  </div>
                </div>

                <div className="path-actions">
                  <button className="start-path-btn" onClick={() => startLearningPath(path)}>
                    {calculatePathCompletion(path) > 0 ? 'Continue Path' : 'Start Journey'}
                  </button>
                  <button className="preview-path-btn">Preview Steps</button>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended Paths */}
          {userJourney && userJourney.recommendedNextPaths.length > 0 && (
            <div className="recommended-paths">
              <h3>🎯 Recommended for You</h3>
              <div className="recommendation-cards">
                {userJourney.recommendedNextPaths.map((pathId) => {
                  const path = learningPaths.find((p) => p.id === pathId);
                  if (!path) return null;

                  return (
                    <div key={path.id} className="recommendation-card">
                      <h4>{path.title}</h4>
                      <p>
                        Based on your strong areas: {userJourney.strongestCulturalAreas.join(', ')}
                      </p>
                      <button
                        className="recommended-start-btn"
                        onClick={() => startLearningPath(path)}
                      >
                        Start Recommended Path
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Active Learning Path View
        <div className="active-path-view">
          <div className="path-navigation">
            <button className="back-to-paths-btn" onClick={() => setSelectedPath(null)}>
              ← Back to Paths
            </button>
            <div className="path-progress-indicator">
              <span>
                Step {currentStep + 1} of {selectedPath.pathSteps.length}
              </span>
              <div className="step-progress-bar">
                <div
                  className="step-progress-fill"
                  style={{ width: `${((currentStep + 1) / selectedPath.pathSteps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="active-path-header">
            <h1>{selectedPath.title}</h1>
            <p>{selectedPath.description}</p>
          </div>

          {/* Current Step Content */}
          <div className="current-step-content">
            <div className="step-header">
              <h2>{selectedPath.pathSteps[currentStep].title}</h2>
              <div className="step-metadata">
                <span className="step-time">
                  ⏱️ {selectedPath.pathSteps[currentStep].estimatedTime} min
                </span>
                <span className="step-context">
                  🌿 {selectedPath.pathSteps[currentStep].culturalContext.replace('-', ' ')}
                </span>
                {selectedPath.pathSteps[currentStep].culturalValidation && (
                  <span className="cultural-validation">✅ Culturally Validated</span>
                )}
              </div>
            </div>

            <div className="step-description">
              <p>{selectedPath.pathSteps[currentStep].description}</p>
            </div>

            <div className="interactive-elements">
              <h3>🎯 Interactive Learning Elements</h3>
              <div className="elements-grid">
                {selectedPath.pathSteps[currentStep].interactiveElements.map((element, index) => (
                  <div key={index} className="interactive-element">
                    <span className="element-icon">🎮</span>
                    <span className="element-name">{element}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="step-resources">
              <h3>📚 Learning Resources</h3>
              <div className="resources-list">
                {selectedPath.pathSteps[currentStep].resourceIds.map((resourceId, index) => (
                  <div key={index} className="resource-item">
                    <span className="resource-icon">📖</span>
                    <span className="resource-name">{resourceId.replace('-', ' ')}</span>
                    <button className="access-resource-btn">Access</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="assessment-info">
              <h3>
                📝 Assessment Type:{' '}
                {selectedPath.pathSteps[currentStep].assessmentType.replace('-', ' ')}
              </h3>
              <p>Complete the learning activities and assessment to progress to the next step.</p>
            </div>

            <div className="step-actions">
              <button
                className="complete-step-btn"
                onClick={() => completeStep(currentStep)}
                disabled={selectedPath.pathSteps[currentStep].completed}
              >
                {selectedPath.pathSteps[currentStep].completed
                  ? '✅ Completed'
                  : 'Mark as Complete'}
              </button>

              {currentStep < selectedPath.pathSteps.length - 1 && (
                <button
                  className="next-step-btn"
                  onClick={progressToNextStep}
                  disabled={!selectedPath.pathSteps[currentStep].completed}
                >
                  Next Step →
                </button>
              )}

              {currentStep === selectedPath.pathSteps.length - 1 &&
                selectedPath.pathSteps[currentStep].completed && (
                  <button className="complete-path-btn">🎉 Complete Learning Path</button>
                )}
            </div>
          </div>

          {/* Path Overview Sidebar */}
          <div className="path-overview-sidebar">
            <h3>Path Overview</h3>
            <div className="path-steps-list">
              {selectedPath.pathSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`step-item ${index === currentStep ? 'current' : ''} ${
                    step.completed ? 'completed' : ''
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className="step-number">{step.completed ? '✅' : index + 1}</div>
                  <div className="step-info">
                    <h4>{step.title}</h4>
                    <span className="step-duration">{step.estimatedTime} min</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="path-completion-summary">
              <h4>Progress Summary</h4>
              <div className="completion-stats">
                <div className="stat">
                  <span className="stat-label">Completed Steps:</span>
                  <span className="stat-value">
                    {selectedPath.pathSteps.filter((s) => s.completed).length} /{' '}
                    {selectedPath.pathSteps.length}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Total Time:</span>
                  <span className="stat-value">
                    {selectedPath.pathSteps.reduce((sum, step) => sum + step.estimatedTime, 0)} min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalLearningPathNavigator;
