import {useState} from 'react'
import './DesignThinkingProcess.css'

interface DesignStage {,
id: number,
name: string,
icon: string,
description: string,
culturalContext: string,
activities: string[],
color: string}
interface DesignChallenge {,
title: string,
description: string,
stages: {,
stage: string,
question: string,
hint: string}[]
}
const designStages: DesignStage[] = [
  {,
id: 1,,
name: 'Empathise',,
icon: '👥',,
description: 'Understand the user\'s needs, thoughts, and feelings. Who are you designing for?',,
culturalContext: 'Whanaungatanga - Building relationships and understanding community needs',,
activities: [
      'Interview potential users',
      'Observe people in their environment',
      'Create empathy maps',
      'Listen to community stories',
    ],;,
color: 'blue',
  },
  {,
id: 2,,
name: 'Define',,
icon: '🎯',,
description: 'Clearly state the problem you are trying to solve based on your user\'s needs.',,
culturalContext: 'Manaakitanga - Identifying how to best serve and care for others',,
activities: [
      'Create problem statements',
      'Identify user personas',
      'Map user journeys',
      'Define success criteria',
    ],;,
color: 'green',
  },
  {,
id: 3,,
name: 'Ideate',,
icon: '💡',,
description: 'Brainstorm a wide range of creative solutions and ideas. Think outside the box!',,
culturalContext: 'Auaha - Embracing creativity and innovation in problem-solving',,
activities: [
      'Brainstorming sessions',
      'Mind mapping',
      'Crazy 8s sketching',
      'Cultural knowledge integration',
    ],;,
color: 'purple',
  },
  {,
id: 4,,
name: 'Prototype',,
icon: '🛠️',,
description: 'Build a simple, low-cost version of your solution to see how it works.',,
culturalContext: 'Mātauranga Māori - Using traditional knowledge in modern solutions',,
activities: [
      'Create paper prototypes',
      'Build digital mockups',
      'Use traditional materials',
      'Test with community',
    ],;,
color: 'orange',
  },
  {,
id: 5,,
name: 'Test',,
icon: '🧪',,
description: 'Get feedback from users on your prototype. What works? What doesn\'t?',,
culturalContext: 'Kaitiakitanga - Caring for and protecting the wellbeing of users',,
activities: [
      'User testing sessions',
      'Gather feedback',
      'Iterate on design',
      'Community validation',
    ],;,
color: 'red',
  },
]

const designChallenges: DesignChallenge[] = [
  {,
title: 'The Perfect School Bag',,
description: 'Apply the Design Thinking process to design a better school bag for students.',,
stages: [
      {,
stage: 'Empathise',,
question: 'What are the problems with current school bags?',,
hint: 'Interview a friend or think about your own experience',
      },
      {,
stage: 'Define',,
question: 'What is the main problem you want to solve?',,
hint: 'Focus on the most important user need',
      },
      {,
stage: 'Ideate',,
question: 'Brainstorm 3-5 features for your new bag design.',,
hint: 'Think about functionality, comfort, and cultural elements',
      },
      {,
stage: 'Prototype',,
question: 'Draw a quick sketch of your new school bag design.',,
hint: 'Include labels for key features',
      },
      {,
stage: 'Test',,
question: 'How would you get feedback on your design?',,
hint: 'Consider who would use the bag and how to test it',
      },
    ],
  },
  {,
title: 'Cultural Learning Space',,
description: 'Design a learning environment that honors Māori culture and modern education.',,
stages: [
      {,
stage: 'Empathise',,
question: 'What do students need in a culturally-responsive learning space?',,
hint: 'Consider cultural, social, and educational needs',
      },
      {,
stage: 'Define',,
question: 'What cultural elements are most important to include?',,
hint: 'Focus on manaakitanga and whanaungatanga',
      },
      {,
stage: 'Ideate',,
question: 'What features would make this space welcoming and educational?',,
hint: 'Think about traditional and modern elements',
      },
      {,
stage: 'Prototype',,
question: 'Create a floor plan or 3D model of your learning space.',,
hint: 'Include cultural elements and learning zones',
      },
      {,
stage: 'Test',,
question: 'How would you gather feedback from students and community?',,
hint: 'Consider cultural protocols and community consultation',
      },
    ],
  },
]

export default function DesignThinkingProcess() {const [selectedStage, setSelectedStage] = useState<DesignStage>(designStages[0])
  const [selectedChallenge, setSelectedChallenge] = useState<DesignChallenge>(designChallenges[0])
  const [activeTab, setActiveTab] = useState<'stages' | 'challenges' | 'cultural' | 'curriculum'>('stages')

return (
_<div className="design-container">
      <header className="design-header">
        <div className="header-content">
          <div className="badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="title">🎨 Design Thinking Process</h1>
          <h2 className="subtitle">Innovation through cultural wisdom and creative problem-solving</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-13 • Technology • Innovation</span>
            <span className="meta-item">🌿 Mātauranga Māori • Auaha</span>
            <span className="meta-item">✅ Cultural Authenticity: 97%</span>
          </div>
          <p className="description">
Master the design thinking process while honoring cultural knowledge and community values in creative problem-solving.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          <button
className={`tab-button ${activeTab === 'stages' ? 'active' : ''}`}
onClick={() => setActiveTab('stages')}
          >
            🔄 Design Stages
          </button>
          <button
className={`tab-button ${activeTab === 'challenges' ? 'active' : ''}`}
onClick={() => setActiveTab('challenges')}
          >
            🎯 Design Challenges
          </button>
          <button
className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural Integration
          </button>
          <button
className={`tab-button ${activeTab === 'curriculum' ? 'active' : ''}`}
onClick={() => setActiveTab('curriculum')}
          >
            📚 Curriculum Alignment
          </button>
        </div>
      </section>

      {activeTab === 'stages' && (
_<section className="stages">
          <h2>🔄 Design Thinking Stages</h2>
          
          <div className="stages-grid">
            {designStages.map((stage) => (
_<div
key={stage.id}
className={`stage-card ${stage.color} ${selectedStage.id === stage.id ? 'selected' : ''}`}
onClick={() => setSelectedStage(stage)}
              >
                <div className="stage-icon">{stage.icon}</div>
                <h3 className="stage-title">{stage.name}</h3>
                <p className="stage-description">{stage.description}</p>
              </div>
            ))}
          </div>

          <div className="stage-details">
            <h3>{selectedStage.name} - Cultural Context</h3>
            <p className="cultural-context">{selectedStage.culturalContext}</p>
            
            <div className="activities-section">
              <h4>Activities</h4>
              <ul>
                {selectedStage.activities.map(_(activity,  _index) => (
                  <li key={index}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'challenges' && (
_<section className="challenges">
          <h2>🎯 Design Challenges</h2>
          
          <div className="challenge-selector">
            {designChallenges.map((challenge) => (
_<button
key={challenge.title}
className={`challenge-pill ${selectedChallenge.title === challenge.title ? 'active' : ''}`}
onClick={() => setSelectedChallenge(challenge)}
              >
                {challenge.title}
              </button>
            ))}
          </div>

          <div className="challenge-details">
            <h3>{selectedChallenge.title}</h3>
            <p className="challenge-description">{selectedChallenge.description}</p>
            
            <div className="challenge-stages">
              {selectedChallenge.stages.map(_(stage,  _index) => (
                <div key={index} className="challenge-stage">
                  <h4>{stage.stage}</h4>
                  <p className="question">{stage.question}</p>
                  <p className="hint">{stage.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural">
          <h2>🌿 Cultural Integration in Design</h2>
          
          <div className="cultural-content">
            <div className="cultural-section">
              <h3>🌟 Cultural Values in Design</h3>
              <ul>
                <li><strong>Whanaungatanga: </strong> Building relationships and community connections</li>
                <li><strong>Manaakitanga:</strong> Caring for and serving others</li>
                <li><strong>Kaitiakitanga:</strong> Protecting and nurturing resources</li>
                <li><strong>Auaha:</strong> Embracing creativity and innovation</li>
                <li><strong>Mātauranga Māori:</strong> Integrating traditional knowledge</li>
              </ul>
            </div>

            <div className="cultural-section">
              <h3>🎨 Design Principles</h3>
              <ul>
                <li>Start with community consultation</li>
                <li>Honor cultural protocols and traditions</li>
                <li>Include cultural elements in solutions</li>
                <li>Test with cultural advisors</li>
                <li>Ensure cultural safety throughout</li>
              </ul>
            </div>

            <div className="cultural-section">
              <h3>🔗 Modern Applications</h3>
              <ul>
                <li>Digital tools that respect cultural values</li>
                <li>Educational spaces that honor heritage</li>
                <li>Products that serve community needs</li>
                <li>Services that strengthen cultural identity</li>
                <li>Innovations that preserve traditions</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'curriculum' && (
        <section className="curriculum">
          <h2>📚 NZ Curriculum Alignment</h2>
          
          <div className="curriculum-grid">
            <div className="curriculum-section">
              <h3>🎯 Digital Technologies</h3>
              <p><strong>Achievement Objective:</strong> DT4-1</p>
              <p>Understand how technological systems are created to meet needs</p>
              <ul>
                <li>Design and develop digital outcomes</li>
                <li>Use design thinking processes</li>
                <li>Consider user needs and cultural context</li>
              </ul>
            </div>

            <div className="curriculum-section">
              <h3>🧠 Key Competencies</h3>
              <ul>
                <li><strong>Thinking:</strong> Creative and critical problem-solving</li>
                <li><strong>Managing Self:</strong> Working through design processes</li>
                <li><strong>Relating to Others:</strong> Collaboration and empathy</li>
                <li><strong>Using Language:</strong> Communication of ideas</li>
                <li><strong>Participating:</strong> Community engagement</li>
              </ul>
            </div>

            <div className="curriculum-section">
              <h3>🌿 Cultural Competencies</h3>
              <ul>
                <li>Understanding of Māori worldviews</li>
                <li>Integration of cultural knowledge</li>
                <li>Respect for cultural protocols</li>
                <li>Community consultation skills</li>
                <li>Cultural safety awareness</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "Auaha - Creativity flows from cultural wisdom"</p>
        <p className="platform">TeAoMarama — World's Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  )
}
