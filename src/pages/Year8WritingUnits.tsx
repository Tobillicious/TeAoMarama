import React, { useState } from 'react'
import './Year8WritingUnits.css'

interface WritingUnit {,
id: string,
title: string,
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
lessons: Lesson[]}
interface Lesson {,
id: string,
title: string,
duration: string,
learningIntention: string,
successCriteria: string[],
activities: string[],
resources: string[],
assessment: string}
const year8WritingUnit: WritingUnit = {,
id: 'year8-writing-craft',,
title: 'Whakairo Kupu: Crafting Sophisticated Writing',,
duration: '10 weeks (50 lessons)',,
curriculumLevel: 'Level 4',,
curriculumStrand: 'Creating meaning for a range of purposes and audiences',,
curriculumObjectives: [
    'Students will create a range of increasingly complex and coherent texts',
    'Students will use a range of language features appropriately, showing an increasing understanding of their effects',
    'Students will organize texts, using a range of appropriate structures',
  ],;,
achievementObjectives: [
    'AO: Students will show an increasing understanding of how to shape texts for different purposes and audiences',
    'AO: Students will show an increasing understanding of how language features are used for effect within and across texts',
    'AO: Students will show an increasing understanding of ideas within, across, and beyond texts',
  ],;,
learningIntentions: [
    'Create sophisticated texts for specific purposes and audiences',
    'Use language features effectively to enhance meaning',
    'Organize ideas coherently with appropriate structure',
    'Incorporate cultural perspectives and voices authentically',
  ],;,
successCriteria: [
    'Can write for different purposes with appropriate voice and style',
    'Can use sophisticated language features for effect',
    'Can structure texts logically with clear progression',
    'Can incorporate cultural elements authentically and respectfully',
  ],;,
culturalFocus: 'Māori writing styles, Pacific narrative traditions, cultural voice in writing',,
assessments: [
    'Portfolio of writing across different genres and purposes',
    'Writing process documentation and reflection',
    'Peer and teacher feedback integration',
    'Cultural authenticity and voice assessment',
  ],;,
resources: [
    'Māori writing exemplars and models',
    'Pacific narrative structures and patterns',
    'Writing process guides and templates',
    'Cultural voice development resources',
    'Genre-specific writing frameworks',
    'Digital writing tools and platforms',
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
        'Can reflect on voice development process',
      ],;,
activities: [
        'Analysis of cultural voice in mentor texts',
        'Voice experimentation exercises',
        'Cultural voice writing workshops',
        'Peer feedback on voice development',
      ],;,
resources: [
        'Mentor texts with strong cultural voice',
        'Voice analysis templates',
        'Writing workshop guides',
        'Peer feedback frameworks',
      ],;,
assessment: 'Cultural voice writing sample with reflection',
    },
    {,
id: 'writing-lesson-2',,
title: 'Narrative Structure and Cultural Patterns',,
duration: '60 minutes',,
learningIntention: 'Understand and apply cultural narrative structures',,
successCriteria: [
        'Can identify cultural narrative patterns',
        'Can apply cultural structures to own writing',
        'Can explain cultural significance of narrative choices',
      ],;,
activities: [
        'Cultural narrative pattern analysis',
        'Structure application exercises',
        'Cultural significance exploration',
        'Narrative structure experimentation',
      ],;,
resources: [
        'Cultural narrative exemplars',
        'Structure analysis guides',
        'Cultural significance resources',
        'Writing templates',
      ],;,
assessment: 'Cultural narrative with structure analysis',
    },
    {,
id: 'writing-lesson-3',,
title: 'Language Features for Cultural Expression',,
duration: '60 minutes',,
learningIntention: 'Use language features to express cultural meaning',,
successCriteria: [
        'Can select appropriate language features for cultural expression',
        'Can use figurative language for cultural meaning',
        'Can create cultural imagery through word choice',
      ],;,
activities: [
        'Language feature analysis in cultural texts',
        'Figurative language exercises',
        'Cultural imagery creation',
        'Word choice workshops',
      ],;,
resources: [
        'Cultural text excerpts',
        'Language feature guides',
        'Figurative language examples',
        'Cultural imagery resources',
      ],;,
assessment: 'Cultural text with language feature analysis',
    },
  ],
}

const Year8WritingUnits: React.FC = () => {
const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

return (
_<div className="year8-writing-container">
      <div className="hero-section">
        <h1 className="hero-title">{year8WritingUnit.title}</h1>
        <p className="hero-subtitle">
Sophisticated writing experiences aligned with the New Zealand Curriculum Level 4
        </p>
        <p className="platform-info">TeAoMarama - Systematic Literacy Excellence for Aotearoa</p>
      </div>

      <div className="unit-overview">
        <div className="overview-grid">
          <div className="overview-card">
            <h3>Curriculum Alignment</h3>
            <p>
              <strong>Level: </strong> {year8WritingUnit.curriculumLevel}
            </p>
            <p>
              <strong>Strand:</strong> {year8WritingUnit.curriculumStrand}
            </p>
            <p>
              <strong>Duration:</strong> {year8WritingUnit.duration}
            </p>
          </div>

          <div className="overview-card">
            <h3>Cultural Focus</h3>
            <p>{year8WritingUnit.culturalFocus}</p>
          </div>

          <div className="overview-card">
            <h3>Learning Intentions</h3>
            <ul>
              {year8WritingUnit.learningIntentions.map((intention,  _index) => (
                <li key={index}>{intention}</li>
              ))}
            </ul>
          </div>

          <div className="overview-card">
            <h3>Success Criteria</h3>
            <ul>
              {year8WritingUnit.successCriteria.map(_(criteria,  _index) => (
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
              {year8WritingUnit.curriculumObjectives.map(_(obj,  _index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
          <div className="achievement-objectives">
            <h3>Achievement Objectives</h3>
            <ul>
              {year8WritingUnit.achievementObjectives.map(_(ao,  _index) => (
                <li key={index}>{ao}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lessons-section">
        <h2>Lesson Overview</h2>
        <div className="lessons-grid">
          {year8WritingUnit.lessons.map(_(lesson) => (
_<div key={lesson.id} className="lesson-card" onClick={() => setSelectedLesson(lesson)}>
              <h3>{lesson.title}</h3>
              <p className="lesson-duration">{lesson.duration}</p>
              <p className="lesson-intention">{lesson.learningIntention}</p>
              <div className="lesson-activities">
                <h4>Key Activities: </h4>
                <ul>
                  {lesson.activities.slice(0, 2).map(_(activity,  _index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
              <div className="lesson-assessment">
                <strong>Assessment: </strong> {lesson.assessment}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="assessment-section">
        <h2>Assessment Overview</h2>
        <ul>
          {year8WritingUnit.assessments.map(_(assessment,  _index) => (
            <li key={index}>{assessment}</li>
          ))}
        </ul>
      </div>

      <div className="resources-section">
        <h2>Key Resources</h2>
        <ul>
          {year8WritingUnit.resources.map(_(resource,  _index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </div>

      {selectedLesson && (
_<div className="lesson-detail-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedLesson(null)}>
              ×
            </button>

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
                  {selectedLesson.successCriteria.map(_(criteria,  _index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              </div>

              <div className="activities-section">
                <h3>Activities</h3>
                <ul>
                  {selectedLesson.activities.map(_(activity,  _index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>

              <div className="resources-section">
                <h3>Resources</h3>
                <ul>
                  {selectedLesson.resources.map(_(resource,  _index) => (
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
  )
}

export default Year8WritingUnits
