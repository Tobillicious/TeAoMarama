import { useState } from 'react';
import './AssessmentFramework.css';

interface AssessmentLevel {
  level: string;
  maoriName: string;
  description: string;
  criteria: {
    category: string;
    western: string[];
    cultural: string[];
  }[];
}

interface InvestigationProject {
  id: string;
  title: string;
  description: string;
  researchQuestion: string;
  dataCollection: string[];
  analysisMethods: string[];
  culturalConsiderations: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const assessmentLevels: AssessmentLevel[] = [
  {
    level: 'Level 1',
    maoriName: 'Kōwhao Timatanga',
    description: 'Emerging Inquirer - Beginning to develop inquiry skills with support',
    criteria: [
      {
        category: 'Question Formulation',
        western: [
          'Asks simple, concrete questions about observable phenomena',
          'Shows curiosity about immediate environment',
          'Requires scaffolding to develop questions',
        ],
        cultural: [
          'May ask questions through storytelling or whakataukī',
          'Questions may reflect home cultural contexts',
          'Shows wonder about spiritual or relational aspects',
        ],
      },
      {
        category: 'Investigation Skills',
        western: [
          'Uses basic tools and methods with guidance',
          'Observes and records simple data',
          'Follows prescribed investigation steps',
        ],
        cultural: [
          'May prefer collective investigation approaches',
          'Draws on traditional knowledge from home cultures',
          'Considers impact on whānau and community',
        ],
      },
      {
        category: 'Evidence Analysis',
        western: [
          'Identifies obvious patterns with support',
          'Makes simple connections between cause and effect',
          'Describes what they observed',
        ],
        cultural: [
          'May interpret evidence through tikanga framework',
          'Connects findings to cultural knowledge systems',
          'Considers emotional and spiritual significance',
        ],
      },
    ],
  },
  {
    level: 'Level 2',
    maoriName: 'Kōwhao Tipu',
    description: 'Developing Inquirer - Building independent inquiry capabilities',
    criteria: [
      {
        category: 'Question Formulation',
        western: [
          'Develops questions that can be investigated',
          'Shows understanding of what makes a good research question',
          'Beginning to show independent questioning',
        ],
        cultural: [
          'Incorporates whakataukī or traditional stories into questioning',
          'Questions reflect broader cultural perspectives',
          'Asks questions about social and spiritual dimensions',
        ],
      },
      {
        category: 'Investigation Skills',
        western: [
          'Selects appropriate methods for investigation',
          'Uses tools and technology effectively',
          "Adapts approach when initial method doesn't work",
        ],
        cultural: [
          'Seeks guidance from kaumātua or cultural experts',
          'Incorporates traditional research methods',
          'Considers multiple ways of gathering knowledge',
        ],
      },
      {
        category: 'Evidence Analysis',
        western: [
          'Identifies patterns and trends in data',
          'Makes logical connections between evidence and conclusions',
          'Compares findings with predictions or hypotheses',
        ],
        cultural: [
          'Analyzes through mātauranga Māori frameworks',
          'Compares findings across cultural knowledge systems',
          'Considers implications for relationships and community',
        ],
      },
    ],
  },
  {
    level: 'Level 3',
    maoriName: 'Kōwhao Puawai',
    description: 'Capable Inquirer - Demonstrating sophisticated inquiry skills',
    criteria: [
      {
        category: 'Question Formulation',
        western: [
          'Develops complex, multi-faceted research questions',
          'Shows understanding of different types of inquiry',
          'Questions reflect deep curiosity and critical thinking',
        ],
        cultural: [
          'Integrates multiple cultural perspectives in questioning',
          'Questions honor traditional knowledge systems',
          'Shows understanding of cultural protocols in inquiry',
        ],
      },
      {
        category: 'Investigation Skills',
        western: [
          'Designs sophisticated investigation methodologies',
          'Uses advanced tools and technology appropriately',
          'Adapts methods based on emerging findings',
        ],
        cultural: [
          'Collaborates respectfully with cultural experts',
          'Balances traditional and modern research approaches',
          'Maintains cultural safety throughout investigation',
        ],
      },
      {
        category: 'Evidence Analysis',
        western: [
          'Synthesizes complex data from multiple sources',
          'Identifies nuanced patterns and relationships',
          'Evaluates quality and reliability of evidence',
        ],
        cultural: [
          'Integrates multiple knowledge systems in analysis',
          'Honors cultural protocols in data interpretation',
          'Considers broader community and environmental impacts',
        ],
      },
    ],
  },
  {
    level: 'Level 4',
    maoriName: 'Rangatira',
    description: 'Expert Inquirer - Leading inquiry with cultural wisdom',
    criteria: [
      {
        category: 'Question Formulation',
        western: [
          'Leads inquiry that addresses complex, real-world problems',
          'Develops questions that advance knowledge in the field',
          'Mentors others in developing effective research questions',
        ],
        cultural: [
          'Leads inquiry that honors and advances cultural knowledge',
          'Develops questions that serve community needs',
          'Models cultural protocols in inquiry leadership',
        ],
      },
      {
        category: 'Investigation Skills',
        western: [
          'Creates innovative investigation methodologies',
          'Leads collaborative research teams effectively',
          'Adapts methods to address emerging challenges',
        ],
        cultural: [
          'Leads culturally-grounded research initiatives',
          'Mentors others in cultural research protocols',
          'Bridges traditional and modern research approaches',
        ],
      },
      {
        category: 'Evidence Analysis',
        western: [
          'Develops new analytical frameworks and approaches',
          'Leads synthesis of complex, multi-disciplinary evidence',
          'Advances understanding in the field through analysis',
        ],
        cultural: [
          'Develops culturally-responsive analytical frameworks',
          'Leads integration of multiple knowledge systems',
          'Advances cultural understanding through respectful inquiry',
        ],
      },
    ],
  },
];

const investigationProjects: InvestigationProject[] = [
  {
    id: 'housing-affordability',
    title: 'Housing Affordability Analysis',
    description: 'Investigate housing affordability trends for young New Zealanders',
    researchQuestion: 'Is housing becoming less affordable for young New Zealanders?',
    dataCollection: [
      'House prices, youth incomes, student debt levels (2018-2023)',
      'Calculate ratios: House price to income ratios for different age groups',
      'Regional comparison: How does affordability vary across New Zealand?',
      'Historical context: Compare current ratios to previous decades',
    ],
    analysisMethods: [
      'Descriptive statistics: Mean, median, range for house price-to-income ratios',
      'Correlation analysis: Relationship between location and affordability',
      'Trend analysis: Changes over time using percentage change calculations',
      'Comparative analysis: New Zealand vs. other similar countries',
    ],
    culturalConsiderations: [
      'Consider Māori perspectives on land and housing',
      'Include Pacific Island community housing needs',
      'Respect cultural connections to whenua (land)',
      'Acknowledge historical land dispossession impacts',
    ],
    difficulty: 'advanced',
  },
  {
    id: 'educational-outcomes',
    title: 'Educational Outcomes Investigation',
    description: 'Analyze how educational qualifications correlate with employment and income',
    researchQuestion: 'How do educational qualifications correlate with employment and income?',
    dataCollection: [
      'Employment rates by qualification level',
      'Income distributions by education level',
      'Regional variations in educational attainment',
      'Industry preferences by qualification type',
    ],
    analysisMethods: [
      'Cross-tabulation: Education level vs. employment status',
      'Mean comparisons: Average income by qualification level',
      'Percentage analysis: What proportion of graduates work in their field?',
      'Scatter plot analysis: Is there a linear relationship between education and income?',
    ],
    culturalConsiderations: [
      'Include Māori and Pacific educational achievement data',
      'Consider cultural factors in educational success',
      'Respect diverse pathways to learning and achievement',
      'Acknowledge systemic barriers and cultural strengths',
    ],
    difficulty: 'intermediate',
  },
  {
    id: 'climate-change',
    title: 'Climate Change Impact Assessment',
    description: 'Investigate climate change effects on different regions of New Zealand',
    researchQuestion: 'How is climate change affecting different regions of New Zealand?',
    dataCollection: [
      'Temperature trends across major cities over 20+ years',
      'Rainfall pattern changes by region',
      'Extreme weather frequency analysis',
      'Sea level rise at different coastal locations',
    ],
    analysisMethods: [
      'Time series analysis of temperature and rainfall data',
      'Statistical significance testing for climate trends',
      'Geographic comparison of regional impacts',
      'Predictive modeling for future climate scenarios',
    ],
    culturalConsiderations: [
      'Include mātauranga Māori perspectives on environmental change',
      'Respect traditional knowledge of weather patterns',
      'Consider impacts on Māori communities and whenua',
      'Honor kaitiakitanga principles in environmental research',
    ],
    difficulty: 'advanced',
  },
];

export default function AssessmentFramework() {
  const [selectedLevel, setSelectedLevel] = useState<AssessmentLevel>(assessmentLevels[0]);
  const [selectedProject, setSelectedProject] = useState<InvestigationProject>(
    investigationProjects[0],
  );
  const [activeTab, setActiveTab] = useState<'rubric' | 'projects' | 'cultural'>('rubric');

  return (
    <div className="assessment-container">
      <header className="assessment-header">
        <div className="header-content">
          <div className="badge">🎯 ERO DEMONSTRATION READY</div>
          <h1 className="title">📊 Assessment Framework</h1>
          <h2 className="subtitle">Cultural responsiveness + inquiry excellence</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-13 • 4 Levels</span>
            <span className="meta-item">🌿 Te Ao Māori • Western Academic</span>
            <span className="meta-item">✅ Cultural Safety: 100%</span>
          </div>
          <p className="description">
            Sophisticated assessment frameworks that honor diverse ways of knowing and being,
            integrating Te Ao Māori with Western academic approaches.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'rubric' ? 'active' : ''}`}
            onClick={() => setActiveTab('rubric')}
          >
            📋 Inquiry Rubric
          </button>
          <button
            className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            🔬 Investigation Projects
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural Framework
          </button>
        </div>
      </section>

      {activeTab === 'rubric' && (
        <section className="rubric">
          <h2>🎯 Inquiry Learning Rubric: Te Ao Mārama Framework</h2>

          <div className="level-selector">
            {assessmentLevels.map((level) => (
              <button
                key={level.level}
                className={`level-pill ${selectedLevel.level === level.level ? 'active' : ''}`}
                onClick={() => setSelectedLevel(level)}
              >
                {level.level} - {level.maoriName}
              </button>
            ))}
          </div>

          <div className="level-details">
            <h3>
              {selectedLevel.level}: {selectedLevel.maoriName}
            </h3>
            <p className="level-description">{selectedLevel.description}</p>

            <div className="criteria-grid">
              {selectedLevel.criteria.map((criterion, index) => (
                <div key={index} className="criterion-card">
                  <h4>{criterion.category}</h4>

                  <div className="approaches">
                    <div className="approach">
                      <h5>🔬 Western Academic</h5>
                      <ul>
                        {criterion.western.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="approach">
                      <h5>🌿 Cultural Responsiveness</h5>
                      <ul>
                        {criterion.cultural.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'projects' && (
        <section className="projects">
          <h2>🔬 Statistical Investigation Projects</h2>

          <div className="project-selector">
            {investigationProjects.map((project) => (
              <button
                key={project.id}
                className={`project-pill ${selectedProject.id === project.id ? 'active' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                {project.title}
              </button>
            ))}
          </div>

          <div className="project-details">
            <h3>{selectedProject.title}</h3>
            <p className="project-description">{selectedProject.description}</p>

            <div className="difficulty-badge">
              Difficulty:{' '}
              {selectedProject.difficulty.charAt(0).toUpperCase() +
                selectedProject.difficulty.slice(1)}
            </div>

            <div className="project-grid">
              <div className="project-section">
                <h4>🔍 Research Question</h4>
                <p>{selectedProject.researchQuestion}</p>
              </div>

              <div className="project-section">
                <h4>📊 Data Collection</h4>
                <ul>
                  {selectedProject.dataCollection.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="project-section">
                <h4>📈 Analysis Methods</h4>
                <ul>
                  {selectedProject.analysisMethods.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="project-section">
                <h4>🌿 Cultural Considerations</h4>
                <ul>
                  {selectedProject.culturalConsiderations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural">
          <h2>🌿 Cultural Foundation & Safety</h2>

          <div className="cultural-notice">
            <h3>🛡️ Cultural Safety Notice</h3>
            <p>
              This rubric contains Te Ao Māori concepts and cultural elements. All cultural
              assessments must be reviewed by appropriate kaitiaki before implementation.
            </p>
          </div>

          <div className="cultural-principles">
            <h3>🌟 Cultural Foundation</h3>
            <p>This framework honors diverse ways of knowing and being:</p>

            <div className="principles-grid">
              <div className="principle">
                <h4>🌿 Te Ao Māori</h4>
                <p>Indigenous Māori worldview and knowledge systems</p>
              </div>
              <div className="principle">
                <h4>🔬 Western Academic</h4>
                <p>Traditional academic inquiry methods</p>
              </div>
              <div className="principle">
                <h4>🌍 Multicultural</h4>
                <p>Diverse cultural approaches to investigation</p>
              </div>
              <div className="principle">
                <h4>💫 Holistic</h4>
                <p>Whole person learning (tinana, hinengaro, wairua, whānau)</p>
              </div>
            </div>
          </div>

          <div className="cultural-guidelines">
            <h3>📋 Implementation Guidelines</h3>
            <ul>
              <li>All cultural assessments require cultural advisor validation</li>
              <li>Maintain cultural safety protocols throughout implementation</li>
              <li>Honor diverse learning styles and cultural expressions</li>
              <li>Include community consultation in assessment design</li>
              <li>Provide culturally responsive feedback and support</li>
            </ul>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "Whaowhia te kete mātauranga" — Fill the basket of knowledge</p>
        <p className="platform">TeAoMarama — World's Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  );
}
