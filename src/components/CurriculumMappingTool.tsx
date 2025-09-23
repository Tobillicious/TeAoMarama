import React, { useState } from 'react';

interface CurriculumArea {
  id: string;
  name: string;
  description: string;
  levels: string[];
  keyCompetencies: string[];
  progressIndicators: string[];
}

interface LessonAlignment {
  lessonId: string;
  curriculumAreas: string[];
  levels: string[];
  keyCompetencies: string[];
  progressIndicators: string[];
  culturalElements: string[];
  assessmentCriteria: string[];
}

const CurriculumMappingTool: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [lessonAlignments, setLessonAlignments] = useState<LessonAlignment[]>([]);

  const curriculumAreas: CurriculumArea[] = [
    {
      id: 'english',
      name: 'English',
      description: 'Language, literature, and literacy development',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Understands and uses a range of vocabulary',
        'Reads and comprehends texts at appropriate level',
        'Writes for different purposes and audiences',
        'Speaks clearly and listens actively'
      ]
    },
    {
      id: 'mathematics',
      name: 'Mathematics and Statistics',
      description: 'Number, algebra, geometry, measurement, and statistics',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Uses number knowledge and strategies',
        'Applies mathematical reasoning',
        'Interprets and communicates mathematical information',
        'Uses appropriate mathematical tools and technology'
      ]
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Nature of science, living world, material world, physical world, planet earth and beyond',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Develops scientific knowledge and understanding',
        'Uses scientific processes and skills',
        'Applies scientific knowledge to real-world contexts',
        'Communicates scientific ideas effectively'
      ]
    },
    {
      id: 'social-studies',
      name: 'Social Studies',
      description: 'Identity, culture, and organisation; place and environment; continuity and change; economic world',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Understands how societies work and are organised',
        'Explores how people participate in society',
        'Investigates how people interact with places and environments',
        'Examines how the past influences the present and future'
      ]
    },
    {
      id: 'te-reo-maori',
      name: 'Te Reo Māori',
      description: 'Māori language learning and cultural understanding',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Uses basic Māori vocabulary and phrases',
        'Understands Māori cultural concepts',
        'Participates in Māori cultural practices',
        'Communicates in te reo Māori appropriately'
      ]
    },
    {
      id: 'arts',
      name: 'The Arts',
      description: 'Dance, drama, music, and visual arts',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Develops practical knowledge in the arts',
        'Develops ideas in the arts',
        'Communicates and interprets meaning in the arts',
        'Understands the arts in context'
      ]
    },
    {
      id: 'health-pe',
      name: 'Health and Physical Education',
      description: 'Personal health and physical development, movement concepts and motor skills, relationships with other people, healthy communities and environments',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Develops personal health and physical development',
        'Develops movement concepts and motor skills',
        'Develops relationships with other people',
        'Participates in healthy communities and environments'
      ]
    },
    {
      id: 'technology',
      name: 'Technology',
      description: 'Technological practice, technological knowledge, nature of technology',
      levels: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5', 'Level 6', 'Level 7', 'Level 8'],
      keyCompetencies: [
        'Using language, symbols, and texts',
        'Managing self',
        'Relating to others',
        'Participating and contributing',
        'Thinking'
      ],
      progressIndicators: [
        'Develops technological practice',
        'Develops technological knowledge',
        'Understands the nature of technology',
        'Uses technology to solve problems'
      ]
    }
  ];

  const culturalElements = [
    'Māori perspectives and worldviews',
    'Pacific Island perspectives',
    'Cultural diversity and inclusion',
    'Environmental stewardship',
    'Community values and relationships',
    'Traditional knowledge systems',
    'Cultural protocols and practices',
    'Indigenous rights and perspectives'
  ];

  const assessmentCriteria = [
    'Achieved - Meets the standard',
    'Merit - Exceeds the standard',
    'Excellence - Significantly exceeds the standard',
    'Not Achieved - Below the standard'
  ];

  const selectedCurriculumArea = curriculumAreas.find(area => area.id === selectedArea);

  const handleCreateAlignment = () => {
    if (selectedArea && selectedLevel) {
      const newAlignment: LessonAlignment = {
        lessonId: `lesson-${Date.now()}`,
        curriculumAreas: [selectedArea],
        levels: [selectedLevel],
        keyCompetencies: selectedCurriculumArea?.keyCompetencies || [],
        progressIndicators: selectedCurriculumArea?.progressIndicators || [],
        culturalElements: [],
        assessmentCriteria: []
      };
      setLessonAlignments(prev => [newAlignment, ...prev]);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          borderBottom: '3px solid #667eea',
          paddingBottom: '20px'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            color: '#2d3748',
            margin: '0 0 10px 0',
            fontWeight: '700'
          }}>
            🗺️ Curriculum Mapping Tool
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#4a5568',
            margin: '0'
          }}>
            Align your lessons with the New Zealand Curriculum Framework
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Left Column - Curriculum Selection */}
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Select Curriculum Area</h2>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#4a5568' }}>
                Learning Area
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white'
                }}
              >
                <option value="">Select a learning area</option>
                {curriculumAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCurriculumArea && (
              <>
                <div style={{
                  background: '#f7fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  border: '2px solid #e2e8f0'
                }}>
                  <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>
                    {selectedCurriculumArea.name}
                  </h3>
                  <p style={{ color: '#4a5568', marginBottom: '15px' }}>
                    {selectedCurriculumArea.description}
                  </p>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>Available Levels:</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {selectedCurriculumArea.levels.map((level) => (
                        <span
                          key={level}
                          style={{
                            background: selectedLevel === level ? '#667eea' : '#e2e8f0',
                            color: selectedLevel === level ? 'white' : '#4a5568',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                          }}
                          onClick={() => setSelectedLevel(level)}
                        >
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>Key Competencies:</h4>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {selectedCurriculumArea.keyCompetencies.map((competency, index) => (
                        <li key={index} style={{ color: '#2d3748', marginBottom: '5px' }}>
                          {competency}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>Progress Indicators:</h4>
                    <ul style={{ margin: '0', paddingLeft: '20px' }}>
                      {selectedCurriculumArea.progressIndicators.map((indicator, index) => (
                        <li key={index} style={{ color: '#2d3748', marginBottom: '5px' }}>
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleCreateAlignment}
                  disabled={!selectedLevel}
                  style={{
                    width: '100%',
                    background: selectedLevel ? 'linear-gradient(135deg, #48bb78, #38a169)' : '#cbd5e0',
                    color: 'white',
                    border: 'none',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: selectedLevel ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Create Lesson Alignment
                </button>
              </>
            )}
          </div>

          {/* Right Column - Lesson Alignments */}
          <div>
            <h2 style={{ color: '#2d3748', marginBottom: '20px' }}>Lesson Alignments</h2>
            
            {lessonAlignments.length === 0 ? (
              <div style={{
                background: '#f7fafc',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                border: '2px dashed #e2e8f0'
              }}>
                <p style={{ color: '#718096', fontSize: '1.1rem', margin: '0' }}>
                  No lesson alignments created yet. Select a curriculum area and level to get started.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {lessonAlignments.map((alignment, index) => (
                  <div
                    key={alignment.lessonId}
                    style={{
                      background: 'white',
                      border: '2px solid #e2e8f0',
                      borderRadius: '15px',
                      padding: '25px',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h3 style={{ color: '#2d3748', margin: '0', fontSize: '1.3rem' }}>
                        Lesson Alignment #{index + 1}
                      </h3>
                      <button style={{
                        background: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}>
                        Remove
                      </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>Curriculum Areas:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {alignment.curriculumAreas.map((area) => (
                            <span
                              key={area}
                              style={{
                                background: '#667eea',
                                color: 'white',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {curriculumAreas.find(a => a.id === area)?.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>Levels:</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {alignment.levels.map((level) => (
                            <span
                              key={level}
                              style={{
                                background: '#48bb78',
                                color: 'white',
                                padding: '3px 10px',
                                borderRadius: '12px',
                                fontSize: '0.85rem'
                              }}
                            >
                              {level}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                      <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>Key Competencies:</h4>
                      <ul style={{ margin: '0', paddingLeft: '20px' }}>
                        {alignment.keyCompetencies.slice(0, 3).map((competency, idx) => (
                          <li key={idx} style={{ color: '#2d3748', marginBottom: '3px', fontSize: '0.9rem' }}>
                            {competency}
                          </li>
                        ))}
                        {alignment.keyCompetencies.length > 3 && (
                          <li style={{ color: '#718096', fontSize: '0.9rem' }}>
                            +{alignment.keyCompetencies.length - 3} more...
                          </li>
                        )}
                      </ul>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                      <h4 style={{ color: '#4a5568', marginBottom: '8px' }}>Progress Indicators:</h4>
                      <ul style={{ margin: '0', paddingLeft: '20px' }}>
                        {alignment.progressIndicators.slice(0, 2).map((indicator, idx) => (
                          <li key={idx} style={{ color: '#2d3748', marginBottom: '3px', fontSize: '0.9rem' }}>
                            {indicator}
                          </li>
                        ))}
                        {alignment.progressIndicators.length > 2 && (
                          <li style={{ color: '#718096', fontSize: '0.9rem' }}>
                            +{alignment.progressIndicators.length - 2} more...
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Cultural Integration Section */}
        <div style={{ marginTop: '40px', padding: '30px', background: '#f7fafc', borderRadius: '15px' }}>
          <h2 style={{ color: '#2d3748', marginBottom: '20px', textAlign: 'center' }}>
            🌿 Cultural Integration Framework
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div>
              <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>Cultural Elements</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {culturalElements.map((element, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    {element}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ color: '#4a5568', marginBottom: '15px' }}>Assessment Criteria</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {assessmentCriteria.map((criteria, index) => (
                  <span
                    key={index}
                    style={{
                      background: 'linear-gradient(135deg, #4299e1, #3182ce)',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      fontSize: '0.9rem',
                      fontWeight: '500'
                    }}
                  >
                    {criteria}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumMappingTool;
