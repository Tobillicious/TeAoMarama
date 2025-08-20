import React, { useState } from 'react'
import './StructuredLiteracyUnit.css'

interface Lesson {,
number: number,
title: string,
phase: '2' | '3',
codeComponents: string[],
writingRevolutionSkills: string[],
culturalConnections: string,
activities: {,
phonological: string,
phonics: string,
morphology: string,
writing: string,
assessment: string},
resources: string[]
}
interface StructuredLiteracyUnitData {,
title: string,
yearLevel: string,
duration: string,
targetStudents: string,
culturalFramework: string,
overview: {,
theCode: string[],
writingRevolution: string[],
culturalIntegration: string[]},
assessmentTools: {,
initial: string[],
ongoing: string[],
summative: string[]
  },
lessons: Lesson[]
}
const structuredLiteracyUnit: StructuredLiteracyUnitData = {,
title: "Kōrero Tuatahi - Foundational Literacy for Adolescent Learners",,
yearLevel: "Year 7-8",,
duration: "8 weeks (24 lessons)",,
targetStudents: "Students operating at Phase 2/3 literacy levels who need explicit, systematic instruction",,
culturalFramework: "Integrating mātauranga Māori with evidence-based structured literacy approaches, honoring both indigenous ways of knowing and systematic phonics instruction",,
overview: {,
theCode: [
      "Systematic phonics progression using Liz Kane's scope and sequence",
      "Explicit teaching of alphabetic code knowledge with gap identification",
      "Word Check assessments to place students at appropriate levels",
      "Structured lesson sequences with phonological awareness foundations"
    ],;,
writingRevolution: [
      "Sentence-level instruction as building blocks for all writing",
      "Explicit instruction in simple, compound, and complex sentences",
      "Grammar taught in context of student writing",
      "Planning and revising as critical phases of writing process"
    ],;,
culturalIntegration: [
      "Te reo Māori phonemes and sound patterns within English literacy",
      "Whakataukī and pēpeha as authentic text sources",
      "Cultural narratives as meaningful content for literacy practice",
      "Connecting traditional oral storytelling to written expression"
    ]
  },,
assessmentTools: {,
initial: [
      "Liz Kane Word Check spelling tests for phase identification",
      "Phonological Awareness Screening Tool (PAST)",
      "Writing sample analysis using TWR sentence structure criteria",
      "Cultural literacy background assessment"
    ],;,
ongoing: [
      "Weekly phonics pattern assessments",
      "Sentence construction progress monitoring",
      "Cultural vocabulary development tracking",
      "Oral reading fluency measures"
    ],;,
summative: [
      "Multi-paragraph writing incorporating taught patterns",
      "Dictation tests using culturally relevant content",
      "Oral presentation of traditional Māori stories",
      "Portfolio of literacy growth with cultural connections"
    ]
  },,
lessons: [
    {,
number: 1,,
title: "Whakapapa o ngā Oro - Mapping Our Sound Relationships",,
phase: '2',,
codeComponents: ["Single consonants", "Short vowels a, e, i, o, u", "CVC patterns"],;,
writingRevolutionSkills: ["Simple sentence construction", "Subject + verb patterns"],;,
culturalConnections: "Exploring how te reo Māori vowel sounds support English phonics learning",,
activities: {,
phonological: "Sound sorting with Māori and English phonemes, rhyme identification in waiata",,
phonics: "CVC word building using culturally relevant vocabulary (kai, whare, mana)",,
morphology: "Introduction to root words in both languages",,
writing: "Simple sentences about whakapapa connections using taught patterns",,
assessment: "Individual sound-symbol correspondence check"
      },,
resources: [
        "Liz Kane CVC word lists with cultural adaptations",
        "Traditional waiata recordings for phonological awareness",
        "Letter tiles and sound boxes",
        "Cultural vocabulary picture cards",
        "Simple sentence frames for writing practice"
      ]
    },
    {,
number: 2,,
title: "Kupu Hou - Building New Words with Confidence",,
phase: '2',,
codeComponents: ["Consonant blends (bl, cr, st)", "Silent e patterns", "Common digraphs (ch, sh, th)"],;,
writingRevolutionSkills: ["Compound sentences with 'and'", "Adding details with adjectives"],;,
culturalConnections: "Traditional place names (Aotearoa, Rotorua) as examples of complex sound patterns",,
activities: {,
phonological: "Blend identification in te reo place names and English words",,
phonics: "Silent e magic word transformations (cap/cape, kit/kite)",,
morphology: "Compound word creation linking cultures (schoolwhare, kai-time)",,
writing: "Describing whānau using compound sentences and adjectives",,
assessment: "Nonsense word decoding to check phonics automaticity"
      },,
resources: [
        "New Zealand place name pronunciation guides",
        "Silent e word transformation cards",
        "Cultural compound word examples",
        "Adjective word walls with te reo/English pairs",
        "Writing frames for family descriptions"
      ]
    },
    {,
number: 3,,
title: "Rerenga Roa - Long Vowel Journeys",,
phase: '3',,
codeComponents: ["Long vowel patterns (a_e, ai, ay)", "Vowel teams (ea, ee, ie)", "Y as vowel"],;,
writingRevolutionSkills: ["Complex sentences with 'because'", "Cause and effect relationships"],;,
culturalConnections: "Analyzing vowel patterns in traditional Māori names and English borrowings",,
activities: {,
phonological: "Long vowel identification in mihimihi and pepeha",,
phonics: "Vowel team pattern practice with cultural and English examples",,
morphology: "Suffix addition to long vowel base words (-ing, -ed, -er)",,
writing: "Explaining cultural practices using because/therefore sentence structures",,
assessment: "Reading fluency with mixed vowel pattern texts"
      },,
resources: [
        "Traditional mihimihi templates with vowel pattern highlighting",
        "Long vowel pattern cards with cultural examples",
        "Suffix addition practice sheets",
        "Cultural practice explanation writing frames",
        "Fluency passages with controlled vowel patterns"
      ]
    }
  ]
}

export default function StructuredLiteracyUnit() {const [selectedLesson, setSelectedLesson] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'assessment'>('overview')

const toggleLesson = (_lessonNumber: number) => {
setSelectedLesson(selectedLesson === lessonNumber ? null : lessonNumber)}

return (
_<div className="structured-literacy-container">
      {/* Header */}
      <header className="literacy-header">
        <div className="header-content">
          <h1 className="unit-title">{structuredLiteracyUnit.title}</h1>
          <div className="unit-metadata">
            <span className="metadata-item">{structuredLiteracyUnit.yearLevel}</span>
            <span className="metadata-item">{structuredLiteracyUnit.duration}</span>
            <span className="metadata-item">Phase 2/3 Focus</span>
          </div>
          <p className="target-description">{structuredLiteracyUnit.targetStudents}</p>
        </div>
      </header>

      {/* Cultural Framework */}
      <section className="cultural-framework">
        <h2>🌿 Cultural Framework & Approach</h2>
        <p>{structuredLiteracyUnit.culturalFramework}</p>
        <div className="framework-highlight">
          <strong>Kōrero Tuatahi Philosophy: </strong> "Every ākonga brings rich oral language traditions that we honor while building systematic literacy skills for academic success."
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="content-tabs">
        <button 
type="button"
className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
onClick={() => setActiveTab('overview')}
        >
          📚 Methodology Overview
        </button>
        <button 
type="button"
className={`tab-button ${activeTab === 'lessons' ? 'active' : ''}`}
onClick={() => setActiveTab('lessons')}
        >
          📖 Lesson Progression
        </button>
        <button 
type="button"
className={`tab-button ${activeTab === 'assessment' ? 'active' : ''}`}
onClick={() => setActiveTab('assessment')}
        >
          📊 Assessment Tools
        </button>
      </nav>

      {/* Content Sections */}
      {activeTab === 'overview' && (
        <section className="methodology-overview">
          <div className="methodology-grid">
            <div className="method-card">
              <h3>🔤 The Code (Liz Kane)</h3>
              <ul>
                {structuredLiteracyUnit.overview.theCode.map(_(item,  _index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="method-card">
              <h3>✍️ The Writing Revolution</h3>
              <ul>
                {structuredLiteracyUnit.overview.writingRevolution.map(_(item,  _index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="method-card cultural-integration">
              <h3>🌿 Cultural Integration</h3>
              <ul>
                {structuredLiteracyUnit.overview.culturalIntegration.map(_(item,  _index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'lessons' && (
_<section className="lessons-section">
          <div className="lessons-intro">
            <h2>📖 Structured Lesson Progression</h2>
            <p>Each lesson follows the systematic progression from The Code while integrating Writing Revolution sentence work and cultural connections.</p>
          </div>
          
          {structuredLiteracyUnit.lessons.map((lesson) => (
_<div key={lesson.number} className="lesson-card">
              <div 
className="lesson-header"
onClick={() => toggleLesson(lesson.number)}
              >
                <div className="lesson-meta">
                  <span className={`phase-badge phase-${lesson.phase}`}>Phase {lesson.phase}</span>
                  <span className="lesson-number">Lesson {lesson.number}</span>
                </div>
                <h3 className="lesson-title">{lesson.title}</h3>
                <span className="expand-icon">
                  {selectedLesson === lesson.number ? '▼' : '▶'}
                </span>
              </div>

              {selectedLesson === lesson.number && (
_<div className="lesson-details">
                  <div className="cultural-connection">
                    <h4>🌿 Cultural Connection</h4>
                    <p>{lesson.culturalConnections}</p>
                  </div>

                  <div className="skills-grid">
                    <div className="skills-section">
                      <h4>🔤 The Code Components</h4>
                      <ul>
                        {lesson.codeComponents.map((component,  _index) => (
                          <li key={index}>{component}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="skills-section">
                      <h4>✍️ Writing Revolution Skills</h4>
                      <ul>
                        {lesson.writingRevolutionSkills.map(_(skill,  _index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="activities-section">
                    <h4>🎯 Lesson Activities</h4>
                    <div className="activities-grid">
                      <div className="activity-item">
                        <strong>Phonological Awareness: </strong>
                        <p>{lesson.activities.phonological}</p>
                      </div>
                      <div className="activity-item">
                        <strong>Phonics Practice:</strong>
                        <p>{lesson.activities.phonics}</p>
                      </div>
                      <div className="activity-item">
                        <strong>Morphology:</strong>
                        <p>{lesson.activities.morphology}</p>
                      </div>
                      <div className="activity-item">
                        <strong>Writing Focus:</strong>
                        <p>{lesson.activities.writing}</p>
                      </div>
                      <div className="activity-item">
                        <strong>Assessment:</strong>
                        <p>{lesson.activities.assessment}</p>
                      </div>
                    </div>
                  </div>

                  <div className="resources-section">
                    <h4>📋 Required Resources</h4>
                    <ul className="resources-list">
                      {lesson.resources.map(_(resource,  _index) => (
                        <li key={index}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {activeTab === 'assessment' && (
_<section className="assessment-section">
          <h2>📊 Comprehensive Assessment Strategy</h2>
          
          <div className="assessment-grid">
            <div className="assessment-category">
              <h3>🎯 Initial Assessment</h3>
              <p>Use these tools to identify student needs and phase placement: </p>
              <ul>
                {structuredLiteracyUnit.assessmentTools.initial.map((tool,  _index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>

            <div className="assessment-category">
              <h3>📈 Ongoing Monitoring</h3>
              <p>Regular checks to track progress and adjust instruction: </p>
              <ul>
                {structuredLiteracyUnit.assessmentTools.ongoing.map(_(tool,  _index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>

            <div className="assessment-category">
              <h3>🏆 Summative Evaluation</h3>
              <p>Comprehensive assessment of literacy growth and cultural integration: </p>
              <ul>
                {structuredLiteracyUnit.assessmentTools.summative.map(_(tool,  _index) => (
                  <li key={index}>{tool}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="assessment-notes">
            <h4>📝 Assessment Guidelines</h4>
            <ul>
              <li><strong>Cultural Sensitivity: </strong> All assessments respect Māori cultural protocols and validate oral traditions</li>
              <li><strong>Multiple Modalities:</strong> Include oral, written, and visual assessment opportunities</li>
              <li><strong>Growth Focus: </strong> Track individual progress rather than comparing to age-level norms</li>
              <li><strong>Family Engagement:</strong> Share progress in culturally appropriate ways with whānau</li>
            </ul>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="literacy-footer">
        <div className="pld-connection">
          <h4>🎓 Perfect for PLD Implementation</h4>
          <p>This unit combines evidence-based structured literacy approaches with authentic cultural integration - ideal for professional learning communities focusing on equity and effectiveness.</p>
        </div>
        <p className="cultural-motto">🌿 "Kōrero tuatahi, kōrero mutunga kore" - First language, endless conversation</p>
        <p className="platform-info">Created with Te Kete Ako - Structured Literacy Excellence for Aotearoa</p>
      </footer>
    </div>
  )
}