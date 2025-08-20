import React, { useState } from 'react'
import './StructuredLiteracyUnits.css'

interface Unit {,
id: string,
title: string,
subject: string,
yearLevel: string,
duration: string,
curriculumLevel: string,
curriculumStrand: string,
curriculumObjectives: string[],
achievementObjectives: string[],
learningIntentions: string[],
successCriteria: string[],
culturalFocus: string,
assessments: string[],
resources: string[],
lessons: Lesson[],
difficulty: 'foundation' | 'developing' | 'secure',
status: 'draft' | 'ready' | 'piloted'}
interface Lesson {,
id: string,
title: string,
duration: string,
learningIntention: string,
successCriteria: string[],
activities: string[],
resources: string[],
assessment: string}
const year8StructuredUnits: Unit[] = [
  {,
id: 'year8-reading-complex-texts',,
title: 'Te Ao Mārama: Reading Complex Texts with Cultural Depth',,
subject: 'English - Reading',,
yearLevel: 'Year 8',,
duration: '10 weeks (50 lessons)',,
curriculumLevel: 'Level 4',,
curriculumStrand: 'Making meaning from texts',,
curriculumObjectives: [
      'Students will understand that texts are shaped for different purposes and audiences',
      'Students will identify and evaluate the writer\'s purposes and the ways in which writers use language and ideas to suit their purposes',
      'Students will think critically about texts with understanding and confidence'
    ],;,
achievementObjectives: [
      'AO: Students will show an increasing understanding of how language features are used for effect within and across texts',
      'AO: Students will show an increasing understanding of ideas within, across, and beyond texts',
      'AO: Students will show an increasing understanding of how meaning is conveyed within, across, and beyond texts'
    ],;,
learningIntentions: [
      'Understand how authors use language features to create meaning and effect',
      'Analyze complex texts with cultural and historical contexts',
      'Evaluate the reliability and validity of information sources',
      'Make connections between texts and real-world contexts'
    ],;,
successCriteria: [
      'Can identify and explain the use of figurative language, symbolism, and cultural references',
      'Can analyze how text structure and language features contribute to meaning',
      'Can evaluate the credibility of sources and identify bias',
      'Can make sophisticated connections between texts and cultural contexts'
    ],;,
culturalFocus: 'Māori literature, Pacific texts, New Zealand authors, cultural perspectives in reading',,
assessments: [
      'Text analysis portfolio with cultural context exploration',
      'Reading comprehension assessments with complex texts',
      'Critical reading responses with evidence-based analysis',
      'Cultural text comparison and synthesis tasks'
    ],;,
resources: [
      'Witi Ihimaera texts (The Whale Rider, Tangi)',
      'Patricia Grace works (Potiki, Cousins)',
      'Hone Tuwhare poetry collections',
      'Contemporary Māori and Pacific literature',
      'Historical texts with cultural perspectives',
      'Digital reading platforms with cultural content'
    ],;,
lessons: [
      {,
id: 'lesson-1',,
title: 'Introduction to Complex Text Analysis',,
duration: '60 minutes',,
learningIntention: 'Understand how to approach complex texts with cultural depth',,
successCriteria: [
          'Can identify cultural references and their significance',
          'Can analyze language features for effect',
          'Can make connections to personal and cultural knowledge'
        ],;,
activities: [
          'Close reading of selected passages from Māori literature',
          'Cultural context exploration through group discussion',
          'Language feature identification and analysis',
          'Personal response writing with cultural connections'
        ],;,
resources: [
          'Excerpts from The Whale Rider by Witi Ihimaera',
          'Cultural context information sheets',
          'Language feature analysis templates',
          'Response writing frameworks'
        ],;,
assessment: 'Written analysis of cultural references in text'
      },
      {,
id: 'lesson-2',,
title: 'Symbolism and Cultural Meaning',,
duration: '60 minutes',,
learningIntention: 'Analyze how symbols carry cultural meaning in texts',,
successCriteria: [
          'Can identify cultural symbols and their meanings',
          'Can explain how symbols contribute to text meaning',
          'Can connect symbols to broader cultural contexts'
        ],;,
activities: [
          'Symbol identification in Māori and Pacific texts',
          'Cultural symbol research and presentation',
          'Symbol analysis in contemporary literature',
          'Creative response using cultural symbols'
        ],;,
resources: [
          'Symbol reference guides',
          'Cultural symbol databases',
          'Contemporary text excerpts',
          'Creative response templates'
        ],;,
assessment: 'Symbol analysis presentation with cultural context'
      }
    ],;,
difficulty: 'secure',,
status: 'ready'
  },
  {,
id: 'year8-writing-craft',,
title: 'Whakairo Kupu: Crafting Sophisticated Writing',,
subject: 'English - Writing',,
yearLevel: 'Year 8',,
duration: '10 weeks (50 lessons)',,
curriculumLevel: 'Level 4',,
curriculumStrand: 'Creating meaning for a range of purposes and audiences',,
curriculumObjectives: [
      'Students will create a range of increasingly complex and coherent texts',
      'Students will use a range of language features appropriately, showing an increasing understanding of their effects',
      'Students will organize texts, using a range of appropriate structures'
    ],;,
achievementObjectives: [
      'AO: Students will show an increasing understanding of how to shape texts for different purposes and audiences',
      'AO: Students will show an increasing understanding of how language features are used for effect within and across texts',
      'AO: Students will show an increasing understanding of ideas within, across, and beyond texts'
    ],;,
learningIntentions: [
      'Create sophisticated texts for specific purposes and audiences',
      'Use language features effectively to enhance meaning',
      'Organize ideas coherently with appropriate structure',
      'Incorporate cultural perspectives and voices authentically'
    ],;,
successCriteria: [
      'Can write for different purposes with appropriate voice and style',
      'Can use sophisticated language features for effect',
      'Can structure texts logically with clear progression',
      'Can incorporate cultural elements authentically and respectfully'
    ],;,
culturalFocus: 'Māori writing styles, Pacific narrative traditions, cultural voice in writing',,
assessments: [
      'Portfolio of writing across different genres and purposes',
      'Writing process documentation and reflection',
      'Peer and teacher feedback integration',
      'Cultural authenticity and voice assessment'
    ],;,
resources: [
      'Māori writing exemplars and models',
      'Pacific narrative structures and patterns',
      'Writing process guides and templates',
      'Cultural voice development resources',
      'Genre-specific writing frameworks',
      'Digital writing tools and platforms'
    ],;,
lessons: [
      {,
id: 'writing-lesson-1',,
title: 'Cultural Voice in Writing',,
duration: '60 minutes',,
learningIntention: 'Develop authentic cultural voice in writing',,
successCriteria: [
          'Can identify cultural voice in mentor texts',
          'Can experiment with cultural voice in own writing',
          'Can reflect on voice development process'
        ],;,
activities: [
          'Analysis of cultural voice in mentor texts',
          'Voice experimentation exercises',
          'Cultural voice writing workshops',
          'Peer feedback on voice development'
        ],;,
resources: [
          'Mentor texts with strong cultural voice',
          'Voice analysis templates',
          'Writing workshop guides',
          'Peer feedback frameworks'
        ],;,
assessment: 'Cultural voice writing sample with reflection'
      }
    ],;,
difficulty: 'secure',,
status: 'ready'
  },
  {,
id: 'year8-social-studies-identity',,
title: 'Whakapapa: Identity and Belonging in Aotearoa',,
subject: 'Social Studies',,
yearLevel: 'Year 8',,
duration: '10 weeks (50 lessons)',,
curriculumLevel: 'Level 4',,
curriculumStrand: 'Identity, Culture, and Organization',,
curriculumObjectives: [
      'Students will understand how people pass on and sustain culture and heritage for different reasons and that this has consequences for people',
      'Students will understand how people\'s management of resources impacts on environmental and social sustainability',
      'Students will understand how exploration and innovation create opportunities and challenges for people, places, and environments'
    ],;,
achievementObjectives: [
      'AO: Students will demonstrate knowledge and understanding of how people pass on and sustain culture and heritage for different reasons and that this has consequences for people',
      'AO: Students will demonstrate knowledge and understanding of how people\'s management of resources impacts on environmental and social sustainability',
      'AO: Students will demonstrate knowledge and understanding of how exploration and innovation create opportunities and challenges for people, places, and environments'
    ],;,
learningIntentions: [
      'Understand how culture and heritage are sustained and passed on',
      'Analyze the impact of resource management on sustainability',
      'Explore how innovation creates opportunities and challenges',
      'Develop critical thinking about identity and belonging'
    ],;,
successCriteria: [
      'Can explain how culture and heritage are maintained and transmitted',
      'Can analyze resource management impacts on sustainability',
      'Can evaluate the effects of innovation on society',
      'Can demonstrate understanding of multiple perspectives on identity'
    ],;,
culturalFocus: 'Māori culture and heritage, Pacific identities, New Zealand identity formation',,
assessments: [
      'Cultural heritage investigation and presentation',
      'Resource management case study analysis',
      'Innovation impact assessment',
      'Identity and belonging reflection portfolio'
    ],;,
resources: [
      'Māori cultural heritage resources',
      'Pacific identity and migration stories',
      'New Zealand history and identity texts',
      'Resource management case studies',
      'Innovation and technology impact studies',
      'Digital cultural heritage platforms'
    ],;,
lessons: [
      {,
id: 'social-studies-lesson-1',,
title: 'Cultural Heritage and Identity',,
duration: '60 minutes',,
learningIntention: 'Understand how cultural heritage shapes identity',,
successCriteria: [
          'Can identify elements of cultural heritage',
          'Can explain how heritage influences identity',
          'Can reflect on personal cultural connections'
        ],;,
activities: [
          'Cultural heritage exploration through artifacts and stories',
          'Identity mapping and reflection exercises',
          'Cultural heritage preservation discussion',
          'Personal heritage investigation and sharing'
        ],;,
resources: [
          'Cultural heritage artifacts and images',
          'Identity mapping templates',
          'Heritage preservation case studies',
          'Personal investigation guides'
        ],;,
assessment: 'Cultural heritage investigation report'
      }
    ],;,
difficulty: 'secure',,
status: 'ready'
  }
]

const StructuredLiteracyUnits: React.FC = () => {
const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null)
  const [filter, setFilter] = useState('all')

const filteredUnits = year8StructuredUnits.filter(unit => {
if (filter === 'all') return true
    return unit.subject.toLowerCase().includes(filter.toLowerCase())
  })

return (
_<div className="structured-literacy-container">
      <div className="hero-section">
        <h1 className="hero-title">Year 8 Curriculum-Aligned Units</h1>
        <p className="hero-subtitle">
Deep,  _meaningful learning experiences aligned with the New Zealand Curriculum
        </p>
        <p className="platform-info">TeAoMarama - Systematic Literacy Excellence for Aotearoa</p>
      </div>

      <div className="filter-section">
        <button 
className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
onClick={() => setFilter('all')}
        >
All Subjects
        </button>
        <button 
className={`filter-btn ${filter === 'reading' ? 'active' : ''}`}
onClick={() => setFilter('reading')}
        >
Reading
        </button>
        <button 
className={`filter-btn ${filter === 'writing' ? 'active' : ''}`}
onClick={() => setFilter('writing')}
        >
Writing
        </button>
        <button 
className={`filter-btn ${filter === 'social studies' ? 'active' : ''}`}
onClick={() => setFilter('social studies')}
        >
Social Studies
        </button>
      </div>

      <div className="units-grid">
        {filteredUnits.map(_(unit) => (
_<div key={unit.id} className="unit-card" onClick={() => setSelectedUnit(unit)}>
            <div className="unit-header">
              <h3 className="unit-title">{unit.title}</h3>
              <span className="unit-subject">{unit.subject}</span>
            </div>
            <div className="unit-details">
              <p className="unit-duration">{unit.duration}</p>
              <p className="unit-level">Level {unit.curriculumLevel}</p>
            </div>
            <div className="unit-focus">
              <h4>Learning Focus: </h4>
              <ul>
                {unit.learningIntentions.slice(0, 2).map(_(intention,  _index) => (
                  <li key={index}>{intention}</li>
                ))}
              </ul>
            </div>
            <div className="unit-status">
              <span className={`status-badge ${unit.status}`}>{unit.status}</span>
              <span className={`difficulty-badge ${unit.difficulty}`}>{unit.difficulty}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedUnit && (
_<div className="unit-detail-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedUnit(null)}>×</button>
            
            <div className="unit-detail-header">
              <h2>{selectedUnit.title}</h2>
              <div className="unit-meta">
                <span className="subject-badge">{selectedUnit.subject}</span>
                <span className="level-badge">Level {selectedUnit.curriculumLevel}</span>
                <span className="duration-badge">{selectedUnit.duration}</span>
              </div>
            </div>

            <div className="curriculum-section">
              <h3>New Zealand Curriculum Alignment</h3>
              <div className="curriculum-details">
                <div className="strand-info">
                  <h4>Strand: {selectedUnit.curriculumStrand}</h4>
                </div>
                <div className="objectives">
                  <h4>Curriculum Objectives:</h4>
                  <ul>
                    {selectedUnit.curriculumObjectives.map(_(obj,  _index) => (
                      <li key={index}>{obj}</li>
                    ))}
                  </ul>
                </div>
                <div className="achievement-objectives">
                  <h4>Achievement Objectives: </h4>
                  <ul>
                    {selectedUnit.achievementObjectives.map(_(ao,  _index) => (
                      <li key={index}>{ao}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="learning-section">
              <h3>Learning Intentions & Success Criteria</h3>
              <div className="learning-details">
                <div className="intentions">
                  <h4>Learning Intentions: </h4>
                  <ul>
                    {selectedUnit.learningIntentions.map(_(intention,  _index) => (
                      <li key={index}>{intention}</li>
                    ))}
                  </ul>
                </div>
                <div className="success-criteria">
                  <h4>Success Criteria: </h4>
                  <ul>
                    {selectedUnit.successCriteria.map(_(criteria,  _index) => (
                      <li key={index}>{criteria}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="cultural-section">
              <h3>Cultural Focus</h3>
              <p>{selectedUnit.culturalFocus}</p>
            </div>

            <div className="lessons-section">
              <h3>Lesson Overview</h3>
              <div className="lessons-grid">
                {selectedUnit.lessons.map(_(lesson) => (
_<div key={lesson.id} className="lesson-card">
                    <h4>{lesson.title}</h4>
                    <p className="lesson-duration">{lesson.duration}</p>
                    <p className="lesson-intention">{lesson.learningIntention}</p>
                    <div className="lesson-activities">
                      <h5>Activities: </h5>
                      <ul>
                        {lesson.activities.map((activity,  _index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="assessment-section">
              <h3>Assessment</h3>
              <ul>
                {selectedUnit.assessments.map(_(assessment,  _index) => (
                  <li key={index}>{assessment}</li>
                ))}
              </ul>
            </div>

            <div className="resources-section">
              <h3>Resources</h3>
              <ul>
                {selectedUnit.resources.map(_(resource,  _index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StructuredLiteracyUnits