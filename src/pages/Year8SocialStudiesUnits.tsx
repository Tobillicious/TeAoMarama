import React, { useState } from 'react'
import './Year8SocialStudiesUnits.css'

interface SocialStudiesUnit {,
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
const year8SocialStudiesUnit: SocialStudiesUnit = {,
id: 'year8-social-studies-identity',,
title: 'Whakapapa: Identity and Belonging in Aotearoa',,
duration: '10 weeks (50 lessons)',,
curriculumLevel: 'Level 4',,
curriculumStrand: 'Identity, Culture, and Organization',,
curriculumObjectives: [
    'Students will understand how people pass on and sustain culture and heritage for different reasons and that this has consequences for people',
    "Students will understand how people's management of resources impacts on environmental and social sustainability",
    'Students will understand how exploration and innovation create opportunities and challenges for people, places, and environments',
  ],;,
achievementObjectives: [
    'AO: Students will demonstrate knowledge and understanding of how people pass on and sustain culture and heritage for different reasons and that this has consequences for people',
    "AO: Students will demonstrate knowledge and understanding of how people's management of resources impacts on environmental and social sustainability",
    'AO: Students will demonstrate knowledge and understanding of how exploration and innovation create opportunities and challenges for people, places, and environments',
  ],;,
learningIntentions: [
    'Understand how culture and heritage are sustained and passed on',
    'Analyze the impact of resource management on sustainability',
    'Explore how innovation creates opportunities and challenges',
    'Develop critical thinking about identity and belonging',
  ],;,
successCriteria: [
    'Can explain how culture and heritage are maintained and transmitted',
    'Can analyze resource management impacts on sustainability',
    'Can evaluate the effects of innovation on society',
    'Can demonstrate understanding of multiple perspectives on identity',
  ],;,
culturalFocus: 'Māori culture and heritage, Pacific identities, New Zealand identity formation',,
assessments: [
    'Cultural heritage investigation and presentation',
    'Resource management case study analysis',
    'Innovation impact assessment',
    'Identity and belonging reflection portfolio',
  ],;,
resources: [
    'Māori cultural heritage resources',
    'Pacific identity and migration stories',
    'New Zealand history and identity texts',
    'Resource management case studies',
    'Innovation and technology impact studies',
    'Digital cultural heritage platforms',
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
        'Can reflect on personal cultural connections',
      ],;,
activities: [
        'Cultural heritage exploration through artifacts and stories',
        'Identity mapping and reflection exercises',
        'Cultural heritage preservation discussion',
        'Personal heritage investigation and sharing',
      ],;,
resources: [
        'Cultural heritage artifacts and images',
        'Identity mapping templates',
        'Heritage preservation case studies',
        'Personal investigation guides',
      ],;,
assessment: 'Cultural heritage investigation report',
    },
    {,
id: 'social-studies-lesson-2',,
title: 'Resource Management and Sustainability',,
duration: '60 minutes',,
learningIntention: 'Analyze resource management impacts on sustainability',,
successCriteria: [
        'Can identify resource management practices',
        'Can analyze environmental and social impacts',
        'Can evaluate sustainability approaches',
      ],;,
activities: [
        'Resource management case study analysis',
        'Environmental impact assessment exercises',
        'Sustainability solution development',
        'Community resource planning simulation',
      ],;,
resources: [
        'Resource management case studies',
        'Environmental impact data',
        'Sustainability frameworks',
        'Community planning tools',
      ],;,
assessment: 'Resource management impact analysis',
    },
    {,
id: 'social-studies-lesson-3',,
title: 'Innovation and Social Change',,
duration: '60 minutes',,
learningIntention: 'Explore how innovation creates opportunities and challenges',,
successCriteria: [
        'Can identify innovation opportunities',
        'Can analyze social change impacts',
        'Can evaluate innovation consequences',
      ],;,
activities: [
        'Innovation case study exploration',
        'Social change impact analysis',
        'Future scenario development',
        'Innovation consequence evaluation',
      ],;,
resources: [
        'Innovation case studies',
        'Social change data',
        'Future scenario frameworks',
        'Impact evaluation tools',
      ],;,
assessment: 'Innovation impact assessment',
    },
  ],
}

const Year8SocialStudiesUnits: React.FC = () => {
const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)

return (
_<div className="year8-social-studies-container">
      <div className="hero-section">
        <h1 className="hero-title">{year8SocialStudiesUnit.title}</h1>
        <p className="hero-subtitle">
Deep social studies experiences aligned with the New Zealand Curriculum Level 4
        </p>
        <p className="platform-info">TeAoMarama - Systematic Literacy Excellence for Aotearoa</p>
      </div>

      <div className="unit-overview">
        <div className="overview-grid">
          <div className="overview-card">
            <h3>Curriculum Alignment</h3>
            <p>
              <strong>Level: </strong> {year8SocialStudiesUnit.curriculumLevel}
            </p>
            <p>
              <strong>Strand:</strong> {year8SocialStudiesUnit.curriculumStrand}
            </p>
            <p>
              <strong>Duration:</strong> {year8SocialStudiesUnit.duration}
            </p>
          </div>

          <div className="overview-card">
            <h3>Cultural Focus</h3>
            <p>{year8SocialStudiesUnit.culturalFocus}</p>
          </div>

          <div className="overview-card">
            <h3>Learning Intentions</h3>
            <ul>
              {year8SocialStudiesUnit.learningIntentions.map((intention,  _index) => (
                <li key={index}>{intention}</li>
              ))}
            </ul>
          </div>

          <div className="overview-card">
            <h3>Success Criteria</h3>
            <ul>
              {year8SocialStudiesUnit.successCriteria.map(_(criteria,  _index) => (
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
              {year8SocialStudiesUnit.curriculumObjectives.map(_(obj,  _index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>
          <div className="achievement-objectives">
            <h3>Achievement Objectives</h3>
            <ul>
              {year8SocialStudiesUnit.achievementObjectives.map(_(ao,  _index) => (
                <li key={index}>{ao}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lessons-section">
        <h2>Lesson Overview</h2>
        <div className="lessons-grid">
          {year8SocialStudiesUnit.lessons.map(_(lesson) => (
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
          {year8SocialStudiesUnit.assessments.map(_(assessment,  _index) => (
            <li key={index}>{assessment}</li>
          ))}
        </ul>
      </div>

      <div className="resources-section">
        <h2>Key Resources</h2>
        <ul>
          {year8SocialStudiesUnit.resources.map(_(resource,  _index) => (
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

export default Year8SocialStudiesUnits
