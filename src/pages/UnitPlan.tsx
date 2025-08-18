import React from 'react';
import './UnitPlan.css';

interface Lesson {
  number: number;
  title: string;
  duration: string;
  learningObjectives: string[];
  activities: string[];
  resources: string[];
}

interface Assessment {
  type: 'Formative' | 'Summative' | 'Guided Inquiry';
  title: string;
  description: string;
  criteria: string[];
}

interface UnitPlanData {
  title: string;
  yearLevel: string;
  duration: string;
  culturalContext: string;
  curriculumLinks: {
    mataiaho: string[];
    nzc: string[];
    other: string[];
  };
  lessons: Lesson[];
  assessments: Assessment[];
}

const sampleUnitPlan: UnitPlanData = {
  title: "Te Taiao: Our Natural Environment",
  yearLevel: "Year 8",
  duration: "6 weeks (12 lessons)",
  culturalContext: "Urban Māori ākonga connecting with whenua and whakapapa through environmental science",
  curriculumLinks: {
    mataiaho: [
      "DO: Investigate how living things and their environment interact",
      "KNOW: Understand the connections between all living things in an ecosystem",
      "UNDERSTAND: Appreciate the role of kaitiakitanga in environmental stewardship"
    ],
    nzc: [
      "Living World - Level 4: Explain how living things are suited to their particular habitat",
      "Nature of Science - Level 4: Appreciate that science is a way of explaining the world",
      "Social Sciences - Level 4: Understand how people view and use places differently"
    ],
    other: [
      "Te Reo Māori - Use te reo Māori vocabulary related to the natural environment",
      "Literacy - Read and interpret scientific texts and environmental reports",
      "Numeracy - Use measurement and data analysis in environmental monitoring"
    ]
  },
  lessons: [
    {
      number: 1,
      title: "Whakapapa - Our Connection to Nature",
      duration: "75 minutes",
      learningObjectives: [
        "Understand the concept of whakapapa in relation to natural systems",
        "Identify local native species and their relationships",
        "Introduce key te reo Māori terms for environmental concepts"
      ],
      activities: [
        "Do Now: Photo matching - native birds to their names in te reo",
        "Whakapapa mapping activity using local ecosystem",
        "Story sharing circle about family connections to nature",
        "Field sketching of local environment"
      ],
      resources: [
        "Native bird photo cards",
        "Local ecosystem diagram",
        "Sketchpads and pencils",
        "Video: 'Te Urewera - Living Landscape'"
      ]
    },
    {
      number: 2,
      title: "Kaitiakitanga - Guardianship in Action",
      duration: "75 minutes",
      learningObjectives: [
        "Understand the role of kaitiaki in environmental protection",
        "Analyze human impact on local ecosystems",
        "Plan practical conservation actions"
      ],
      activities: [
        "Do Now: Quick-write about environmental responsibilities",
        "Case study analysis of local conservation projects",
        "Design a kaitiakitanga action plan for school grounds",
        "Numeracy focus: Calculate environmental impact data"
      ],
      resources: [
        "Local conservation case studies",
        "Environmental impact calculators",
        "Action plan templates",
        "Guest speaker: Local kaitiaki"
      ]
    }
  ],
  assessments: [
    {
      type: 'Formative',
      title: 'Te Reo Environmental Vocabulary Check',
      description: 'Weekly vocabulary assessments using te reo Māori terms for natural phenomena',
      criteria: [
        'Correct pronunciation of te reo terms',
        'Understanding of term meanings in context',
        'Application in written work'
      ]
    },
    {
      type: 'Summative',
      title: 'Ecosystem Health Report',
      description: 'Scientific report on local ecosystem health with cultural perspective',
      criteria: [
        'Scientific accuracy of observations',
        'Integration of mātauranga Māori perspectives',
        'Quality of recommendations for improvement',
        'Appropriate use of te reo Māori terminology'
      ]
    },
    {
      type: 'Guided Inquiry',
      title: 'Kaitiaki Action Project',
      description: 'Student-led environmental action project addressing a real local issue',
      criteria: [
        'Identification of genuine environmental concern',
        'Research into traditional and modern solutions',
        'Community engagement and consultation',
        'Implementation of practical action steps',
        'Reflection on learning and impact'
      ]
    }
  ]
};

export default function UnitPlan() {
  return (
    <div className="unit-plan-container">
      <header className="unit-header">
        <h1 className="unit-title">{sampleUnitPlan.title}</h1>
        <div className="unit-meta">
          <span className="year-level">{sampleUnitPlan.yearLevel}</span>
          <span className="duration">{sampleUnitPlan.duration}</span>
        </div>
      </header>

      <section className="cultural-context">
        <h2>Cultural Context & Approach</h2>
        <p>{sampleUnitPlan.culturalContext}</p>
      </section>

      <section className="curriculum-links">
        <h2>Curriculum Alignment</h2>
        
        <div className="curriculum-section">
          <h3>Te Mātaiaho Framework</h3>
          <ul>
            {sampleUnitPlan.curriculumLinks.mataiaho.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        <div className="curriculum-section">
          <h3>New Zealand Curriculum</h3>
          <ul>
            {sampleUnitPlan.curriculumLinks.nzc.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>

        <div className="curriculum-section">
          <h3>Cross-Curricular Links</h3>
          <ul>
            {sampleUnitPlan.curriculumLinks.other.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lessons-overview">
        <h2>Lesson Overview</h2>
        <div className="lessons-grid">
          {sampleUnitPlan.lessons.map((lesson) => (
            <div key={lesson.number} className="lesson-card">
              <h3>Lesson {lesson.number}: {lesson.title}</h3>
              <p className="duration">{lesson.duration}</p>
              
              <div className="objectives">
                <h4>Learning Objectives:</h4>
                <ul>
                  {lesson.learningObjectives.map((obj, index) => (
                    <li key={index}>{obj}</li>
                  ))}
                </ul>
              </div>

              <div className="activities">
                <h4>Key Activities:</h4>
                <ul>
                  {lesson.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>

              <div className="resources">
                <h4>Resources Needed:</h4>
                <ul>
                  {lesson.resources.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="assessments">
        <h2>Assessment Strategy</h2>
        <div className="assessments-grid">
          {sampleUnitPlan.assessments.map((assessment, index) => (
            <div key={index} className={`assessment-card ${assessment.type.toLowerCase().replace(' ', '-')}`}>
              <div className="assessment-type">{assessment.type}</div>
              <h3>{assessment.title}</h3>
              <p>{assessment.description}</p>
              
              <div className="criteria">
                <h4>Success Criteria:</h4>
                <ul>
                  {assessment.criteria.map((criterion, idx) => (
                    <li key={idx}>{criterion}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="unit-footer">
        <p className="motto">🌿 Whaowhia te kete mātauranga - Fill the basket of knowledge</p>
        <p className="platform">Created with TeAoMarama - Culturally Responsive Education Platform</p>
      </footer>
    </div>
  );
}