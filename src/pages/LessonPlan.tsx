import React, { useState } from 'react';
import './LessonPlan.css';

interface LessonActivity {
  time: string;
  title: string;
  description: string;
  resources: string[];
  culturalConnection?: string;
}

interface LessonPlanData {
  title: string;
  yearLevel: string;
  subject: string;
  duration: string;
  culturalContext: string;
  learningObjectives: string[];
  curriculumLinks: {
    nzc: string[];
    mataiaho: string[];
  };
  activities: LessonActivity[];
  resources: string[];
  assessment: {
    formative: string[];
    summative: string[];
  };
  differentiation: string[];
  reflection: string;
}

const sampleLesson: LessonPlanData = {
  title: "Whakapapa and Ecosystems - Our Place in Nature",
  yearLevel: "Year 8",
  subject: "Science",
  duration: "75 minutes",
  culturalContext: "Urban Māori ākonga exploring their connection to Te Taiao through whakapapa and ecological relationships",
  learningObjectives: [
    "Understand the concept of whakapapa as it relates to natural systems",
    "Identify key relationships in local ecosystems",
    "Connect Māori worldview concepts to scientific understanding",
    "Use te reo Māori vocabulary for environmental concepts"
  ],
  curriculumLinks: {
    nzc: [
      "Living World - Level 4: Explain how living things are suited to their particular habitat and how they respond to environmental changes",
      "Nature of Science - Level 4: Use their growing science knowledge when considering issues of concern to them",
      "Key Competencies: Relating to others - work effectively with diverse people in a variety of contexts"
    ],
    mataiaho: [
      "DO: Investigate ecological relationships in local environments",
      "KNOW: Understand how all living things are connected",
      "UNDERSTAND: Appreciate the role of kaitiakitanga in environmental stewardship"
    ]
  },
  activities: [
    {
      time: "0-10 mins",
      title: "Karakia and Do Now - Whakapapa Web",
      description: "Students create a visual whakapapa showing their connections to the natural world using provided images and te reo Māori terms",
      resources: ["Whakapapa template", "Nature image cards", "Te reo vocabulary cards"],
      culturalConnection: "Acknowledgment of whakapapa as foundational Māori worldview concept"
    },
    {
      time: "10-25 mins",
      title: "Explicit Teaching - Ecosystems as Whānau",
      description: "Interactive presentation comparing ecosystem relationships to whānau structures. Teacher models thinking using ecological examples from local area",
      resources: ["Interactive slides", "Local ecosystem photos", "Relationship diagram templates"],
      culturalConnection: "Using whānau concept to understand predator-prey and symbiotic relationships"
    },
    {
      time: "25-40 mins",
      title: "Literacy Activity - Reading Ecosystem Stories",
      description: "Students read bilingual texts about local native species and their relationships, identifying key vocabulary and connections",
      resources: ["Bilingual ecosystem texts", "Vocabulary graphic organizers", "Reading comprehension sheets"],
      culturalConnection: "Traditional Māori stories about native species and their roles"
    },
    {
      time: "40-60 mins",
      title: "Hands-on Investigation - Local Ecosystem Mapping",
      description: "Groups investigate different local habitats using provided data and images, creating ecosystem maps showing relationships",
      resources: ["Habitat data sets", "Mapping materials", "Species identification guides", "Tablets/laptops"],
      culturalConnection: "Incorporating traditional ecological knowledge alongside scientific observation"
    },
    {
      time: "60-70 mins",
      title: "Numeracy Focus - Population Data Analysis",
      description: "Students analyze real population data for local native species, creating graphs and calculating changes over time",
      resources: ["Population data spreadsheets", "Graphing materials", "Calculators", "Analysis worksheets"],
      culturalConnection: "Connecting population changes to kaitiakitanga practices"
    },
    {
      time: "70-75 mins",
      title: "Reflection and Whakatōhia",
      description: "Students reflect on their learning and share one new understanding about their place in Te Taiao",
      resources: ["Reflection journals", "Sharing circle setup"],
      culturalConnection: "Closing acknowledgment of learning and connections made"
    }
  ],
  resources: [
    "Interactive presentation slides (Google Slides link)",
    "Whakapapa template worksheets (PDF)",
    "Native species image cards (laminated)",
    "Te reo Māori vocabulary cards",
    "Bilingual ecosystem reading texts",
    "Local habitat data sets (Excel files)",
    "Population analysis worksheets",
    "Tablets/laptops for research",
    "Graphing materials and calculators",
    "Reflection journals"
  ],
  assessment: {
    formative: [
      "Observation of student discussions during whakapapa activity",
      "Exit ticket: One new te reo term learned and its meaning",
      "Peer feedback on ecosystem maps",
      "Teacher questioning during explicit teaching"
    ],
    summative: [
      "Completed ecosystem map with labeled relationships",
      "Population data analysis with graph and conclusions",
      "Reflection journal entry connecting personal whakapapa to ecosystem health"
    ]
  },
  differentiation: [
    "Visual learners: Graphic organizers and image-based activities",
    "Kinesthetic learners: Hands-on mapping and data manipulation",
    "Advanced students: Extended research on traditional ecological practices",
    "Students needing support: Simplified vocabulary cards and guided worksheets",
    "ELL students: Bilingual texts and visual vocabulary supports"
  ],
  reflection: "This lesson successfully integrates Māori worldview with scientific inquiry, providing multiple entry points for diverse learners while maintaining cultural authenticity and academic rigor."
};

export default function LessonPlan() {
  const [currentLesson] = useState<LessonPlanData>(sampleLesson);
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null);

  const toggleActivity = (index: number) => {
    setExpandedActivity(expandedActivity === index ? null : index);
  };

  return (
    <div className="lesson-plan-container">
      {/* Header */}
      <header className="lesson-header">
        <div className="lesson-title-section">
          <h1 className="lesson-title">{currentLesson.title}</h1>
          <div className="lesson-meta">
            <span className="meta-item">{currentLesson.yearLevel}</span>
            <span className="meta-item">{currentLesson.subject}</span>
            <span className="meta-item">{currentLesson.duration}</span>
          </div>
        </div>
      </header>

      {/* Cultural Context */}
      <section className="cultural-context-section">
        <h2>Cultural Context & Approach</h2>
        <p>{currentLesson.culturalContext}</p>
      </section>

      {/* Learning Objectives */}
      <section className="objectives-section">
        <h2>Learning Objectives</h2>
        <ul className="objectives-list">
          {currentLesson.learningObjectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </section>

      {/* Curriculum Links */}
      <section className="curriculum-section">
        <h2>Curriculum Alignment</h2>
        <div className="curriculum-grid">
          <div className="curriculum-block">
            <h3>New Zealand Curriculum</h3>
            <ul>
              {currentLesson.curriculumLinks.nzc.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          </div>
          <div className="curriculum-block">
            <h3>Te Mātaiaho Framework</h3>
            <ul>
              {currentLesson.curriculumLinks.mataiaho.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Lesson Activities Timeline */}
      <section className="activities-section">
        <h2>Lesson Activities</h2>
        <div className="activities-timeline">
          {currentLesson.activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <div 
                className="activity-header"
                onClick={() => toggleActivity(index)}
              >
                <div className="activity-time">{activity.time}</div>
                <div className="activity-title">{activity.title}</div>
                <div className="expand-icon">
                  {expandedActivity === index ? '▼' : '▶'}
                </div>
              </div>
              
              {expandedActivity === index && (
                <div className="activity-details">
                  <p className="activity-description">{activity.description}</p>
                  
                  {activity.culturalConnection && (
                    <div className="cultural-connection">
                      <strong>Cultural Connection:</strong> {activity.culturalConnection}
                    </div>
                  )}
                  
                  <div className="activity-resources">
                    <strong>Resources Needed:</strong>
                    <ul>
                      {activity.resources.map((resource, idx) => (
                        <li key={idx}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Resources */}
      <section className="resources-section">
        <h2>All Resources Required</h2>
        <div className="resources-grid">
          {currentLesson.resources.map((resource, index) => (
            <div key={index} className="resource-item">
              <span className="resource-icon">📄</span>
              <span className="resource-name">{resource}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment */}
      <section className="assessment-section">
        <h2>Assessment Strategies</h2>
        <div className="assessment-grid">
          <div className="assessment-block">
            <h3>Formative Assessment</h3>
            <ul>
              {currentLesson.assessment.formative.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="assessment-block">
            <h3>Summative Assessment</h3>
            <ul>
              {currentLesson.assessment.summative.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="differentiation-section">
        <h2>Differentiation Strategies</h2>
        <ul className="differentiation-list">
          {currentLesson.differentiation.map((strategy, index) => (
            <li key={index}>{strategy}</li>
          ))}
        </ul>
      </section>

      {/* Teacher Reflection */}
      <section className="reflection-section">
        <h2>Teacher Reflection</h2>
        <p>{currentLesson.reflection}</p>
      </section>

      {/* Footer */}
      <footer className="lesson-footer">
        <p className="cultural-motto">🌿 Whaowhia te kete mātauranga - Fill the basket of knowledge</p>
        <p className="platform-credit">Created with TeAoMarama - Culturally Responsive Education Platform</p>
      </footer>
    </div>
  );
}