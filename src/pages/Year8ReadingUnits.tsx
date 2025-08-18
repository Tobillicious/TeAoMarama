import React, { useState } from 'react';
import './Year8ReadingUnits.css';

interface ReadingUnit {
  id: string;
  title: string;
  duration: string;
  curriculumLevel: string;
  curriculumStrand: string;
  curriculumObjectives: string[];
  achievementObjectives: string[];
  learningIntentions: string[];
  successCriteria: string[];
  culturalFocus: string;
  assessments: string[];
  resources: string[];
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  learningIntention: string;
  successCriteria: string[];
  activities: string[];
  resources: string[];
  assessment: string;
}

const year8ReadingUnit: ReadingUnit = {
  id: 'year8-reading-complex-texts',
  title: 'Te Ao Mārama: Reading Complex Texts with Cultural Depth',
  duration: '10 weeks (50 lessons)',
  curriculumLevel: 'Level 4',
  curriculumStrand: 'Making meaning from texts',
  curriculumObjectives: [
    'Students will understand that texts are shaped for different purposes and audiences',
    'Students will identify and evaluate the writer\'s purposes and the ways in which writers use language and ideas to suit their purposes',
    'Students will think critically about texts with understanding and confidence'
  ],
  achievementObjectives: [
    'AO: Students will show an increasing understanding of how language features are used for effect within and across texts',
    'AO: Students will show an increasing understanding of ideas within, across, and beyond texts',
    'AO: Students will show an increasing understanding of how meaning is conveyed within, across, and beyond texts'
  ],
  learningIntentions: [
    'Understand how authors use language features to create meaning and effect',
    'Analyze complex texts with cultural and historical contexts',
    'Evaluate the reliability and validity of information sources',
    'Make connections between texts and real-world contexts'
  ],
  successCriteria: [
    'Can identify and explain the use of figurative language, symbolism, and cultural references',
    'Can analyze how text structure and language features contribute to meaning',
    'Can evaluate the credibility of sources and identify bias',
    'Can make sophisticated connections between texts and cultural contexts'
  ],
  culturalFocus: 'Māori literature, Pacific texts, New Zealand authors, cultural perspectives in reading',
  assessments: [
    'Text analysis portfolio with cultural context exploration',
    'Reading comprehension assessments with complex texts',
    'Critical reading responses with evidence-based analysis',
    'Cultural text comparison and synthesis tasks'
  ],
  resources: [
    'Witi Ihimaera texts (The Whale Rider, Tangi)',
    'Patricia Grace works (Potiki, Cousins)',
    'Hone Tuwhare poetry collections',
    'Contemporary Māori and Pacific literature',
    'Historical texts with cultural perspectives',
    'Digital reading platforms with cultural content'
  ],
  lessons: [
    {
      id: 'lesson-1',
      title: 'Introduction to Complex Text Analysis',
      duration: '60 minutes',
      learningIntention: 'Understand how to approach complex texts with cultural depth',
      successCriteria: [
        'Can identify cultural references and their significance',
        'Can analyze language features for effect',
        'Can make connections to personal and cultural knowledge'
      ],
      activities: [
        'Close reading of selected passages from Māori literature',
        'Cultural context exploration through group discussion',
        'Language feature identification and analysis',
        'Personal response writing with cultural connections'
      ],
      resources: [
        'Excerpts from The Whale Rider by Witi Ihimaera',
        'Cultural context information sheets',
        'Language feature analysis templates',
        'Response writing frameworks'
      ],
      assessment: 'Written analysis of cultural references in text'
    },
    {
      id: 'lesson-2',
      title: 'Symbolism and Cultural Meaning',
      duration: '60 minutes',
      learningIntention: 'Analyze how symbols carry cultural meaning in texts',
      successCriteria: [
        'Can identify cultural symbols and their meanings',
        'Can explain how symbols contribute to text meaning',
        'Can connect symbols to broader cultural contexts'
      ],
      activities: [
        'Symbol identification in Māori and Pacific texts',
        'Cultural symbol research and presentation',
        'Symbol analysis in contemporary literature',
        'Creative response using cultural symbols'
      ],
      resources: [
        'Symbol reference guides',
        'Cultural symbol databases',
        'Contemporary text excerpts',
        'Creative response templates'
      ],
      assessment: 'Symbol analysis presentation with cultural context'
    },
    {
      id: 'lesson-3',
      title: 'Critical Reading and Source Evaluation',
      duration: '60 minutes',
      learningIntention: 'Develop critical reading skills for evaluating information sources',
      successCriteria: [
        'Can identify author bias and perspective',
        'Can evaluate source credibility and reliability',
        'Can compare multiple sources for accuracy',
        'Can form evidence-based conclusions'
      ],
      activities: [
        'Source credibility analysis exercises',
        'Bias identification in historical texts',
        'Multiple source comparison activities',
        'Evidence-based argument construction'
      ],
      resources: [
        'Historical text excerpts',
        'Source evaluation checklists',
        'Bias identification guides',
        'Evidence analysis frameworks'
      ],
      assessment: 'Source evaluation report with credibility analysis'
    }
  ]
};

const Year8ReadingUnits: React.FC = () => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  return (
    <div className="year8-reading-container">
      <div className="hero-section">
        <h1 className="hero-title">{year8ReadingUnit.title}</h1>
        <p className="hero-subtitle">
          Deep, meaningful reading experiences aligned with the New Zealand Curriculum Level 4
        </p>
        <p className="platform-info">TeAoMarama - Systematic Literacy Excellence for Aotearoa</p>
      </div>

      <div className="unit-overview">
        <div className="overview-grid">
          <div className="overview-card">
            <h3>Curriculum Alignment</h3>
            <p><strong>Level:</strong> {year8ReadingUnit.curriculumLevel}</p>
            <p><strong>Strand:</strong> {year8ReadingUnit.curriculumStrand}</p>
            <p><strong>Duration:</strong> {year8ReadingUnit.duration}</p>
          </div>
          
          <div className="overview-card">
            <h3>Cultural Focus</h3>
            <p>{year8ReadingUnit.culturalFocus}</p>
          </div>

          <div className="overview-card">
            <h3>Learning Intentions</h3>
            <ul>
              {year8ReadingUnit.learningIntentions.map((intention, index) => (
                <li key={index}>{intention}</li>
              ))}
            </ul>
          </div>

          <div className="overview-card">
            <h3>Success Criteria</h3>
            <ul>
              {year8ReadingUnit.successCriteria.map((criteria, index) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="curriculum-section">
        <h2>New Zealand Curriculum Alignment</h2>
        <div className="curriculum-details">
          <div className="objectives">
            <h3>Curriculum Objectives</h3>
            <ul>
              {year8ReadingUnit.curriculumObjectives.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
          <div className="achievement-objectives">
            <h3>Achievement Objectives</h3>
            <ul>
              {year8ReadingUnit.achievementObjectives.map((ao, index) => (
                <li key={index}>{ao}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lessons-section">
        <h2>Lesson Overview</h2>
        <div className="lessons-grid">
          {year8ReadingUnit.lessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card" onClick={() => setSelectedLesson(lesson)}>
              <h3>{lesson.title}</h3>
              <p className="lesson-duration">{lesson.duration}</p>
              <p className="lesson-intention">{lesson.learningIntention}</p>
              <div className="lesson-activities">
                <h4>Key Activities:</h4>
                <ul>
                  {lesson.activities.slice(0, 2).map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div className="lesson-assessment">
                <strong>Assessment:</strong> {lesson.assessment}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="assessment-section">
        <h2>Assessment Overview</h2>
        <ul>
          {year8ReadingUnit.assessments.map((assessment, index) => (
            <li key={index}>{assessment}</li>
          ))}
        </ul>
      </div>

      <div className="resources-section">
        <h2>Key Resources</h2>
        <ul>
          {year8ReadingUnit.resources.map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </div>

      {selectedLesson && (
        <div className="lesson-detail-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedLesson(null)}>×</button>
            
            <div className="lesson-detail-header">
              <h2>{selectedLesson.title}</h2>
              <p className="lesson-duration">{selectedLesson.duration}</p>
            </div>

            <div className="lesson-detail-content">
              <div className="learning-section">
                <h3>Learning Intention</h3>
                <p>{selectedLesson.learningIntention}</p>
              </div>

              <div className="success-criteria-section">
                <h3>Success Criteria</h3>
                <ul>
                  {selectedLesson.successCriteria.map((criteria, index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              </div>

              <div className="activities-section">
                <h3>Activities</h3>
                <ul>
                  {selectedLesson.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>

              <div className="resources-section">
                <h3>Resources</h3>
                <ul>
                  {selectedLesson.resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>

              <div className="assessment-section">
                <h3>Assessment</h3>
                <p>{selectedLesson.assessment}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Year8ReadingUnits;
