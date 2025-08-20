import {useState} from 'react'
import './IndigenousWisdomSynthesis.css'

// TypeScript interfaces for cultural education
interface IndigenousGovernanceSystem {,
id: string,
name: string,
station: string,
culturalFocus: string,
keyPrinciples: string[],
respectfulLearning: boolean}
interface SynthesisResponse {,
id: string
  studentId?: string,
stationData: Record<string, string>,
commonPrinciples: string,
differences: string,
valuablePrinciples: string,
applicationPrinciples: string[],
personalReflection: string,
communityImpact: string
  submittedAt?: Date}
interface LearningObjective {,
id: string,
description: string,
culturalSafety: string,
nceaAlignment: string,
bloomsLevel: 'knowledge' | 'comprehension' | 'application' | 'analysis' | 'synthesis' | 'evaluation'}
const indigenousGovernanceSystems: IndigenousGovernanceSystem[] = [
  {,
id: 'te-ao-maori',,
name: 'Te Ao Māori Governance',,
station: 'Station 1',,
culturalFocus: 'Māori traditional governance systems and tikanga',,
keyPrinciples: ['Whakatōhea', 'Mana', 'Tapu', 'Whanaungatanga', 'Kaitiakitanga'],;,
respectfulLearning: true
  },
  {,
id: 'pacific-systems',,
name: 'Pacific Governance Systems',,
station: 'Station 2',,
culturalFocus: 'Pacific Island traditional governance and decision-making',,
keyPrinciples: ['Fa\'a Samoa', 'Matai system', 'Collective decision-making', 'Cultural protocols'],;,
respectfulLearning: true
  },
  {,
id: 'first-nations',,
name: 'First Nations Governance',,
station: 'Station 3',,
culturalFocus: 'First Nations governance and traditional law',,
keyPrinciples: ['Circle councils', 'Elder guidance', 'Consensus building', 'Seven generations'],;,
respectfulLearning: true
  },
  {,
id: 'other-indigenous',,
name: 'Other Indigenous Models',,
station: 'Station 4',,
culturalFocus: 'Various global Indigenous governance systems',,
keyPrinciples: ['Traditional councils', 'Ancestral wisdom', 'Land connection', 'Community harmony'],;,
respectfulLearning: true
  }
]

const learningObjectives: LearningObjective[] = [
  {,
id: 'cultural-understanding',,
description: 'Understand diverse Indigenous governance systems with respect and cultural safety',,
culturalSafety: 'Learn ABOUT systems, not to practice them inappropriately',,
nceaRelevance: 'Social Studies Achievement Standards - Cultural diversity and governance',,
bloomsLevel: 'comprehension'
  },
  {,
id: 'comparative-analysis',,
description: 'Analyze common principles across different Indigenous governance approaches',,
culturalSafety: 'Focus on respectful comparison and learning',,
nceaRelevance: 'Critical thinking and analysis skills for NCEA Social Studies',,
bloomsLevel: 'analysis'
  },
  {,
id: 'synthesis-application',,
description: 'Apply Indigenous governance principles to contemporary society design',,
culturalSafety: 'Apply principles respectfully without cultural appropriation',,
nceaRelevance: 'NCEA Social Studies - Society design and contemporary applications',,
bloomsLevel: 'synthesis'
  }
]

export default function IndigenousWisdomSynthesis() {const [currentStation, setCurrentStation] = useState<string>('te-ao-maori')
  const [synthesisData, setSynthesisData] = useState<Partial<SynthesisResponse>>({,
stationData: {},,
applicationPrinciples: []
  })
  const [showObjectives, setShowObjectives] = useState(false)
  const [studentInfo, setStudentInfo] = useState({,
name: '',,
date: new Date().toLocaleDateString('en-NZ'),,
groupMembers: ''
  })

const handleStationDataChange = (_field: string,  _value: string) => {
setSynthesisData(prev => ({
      ...prev,;,
stationData: {
        ...prev.stationData,
        [`${currentStation}-${field}`]: value
      }
    }))
  }

const handlePrincipleApplication = (_index: number,  _field: string,  _value: string) => {
setSynthesisData(_prev => ({
      ...prev, ,
_applicationPrinciples: prev.applicationPrinciples?.map((principle,  i) => 
i === index ? { ...principle, [field]: value } : principle
      ) || []
    }))
  }

const addApplicationPrinciple = () => {
setSynthesisData(prev => ({
      ...prev,;,
applicationPrinciples: [
        ...(prev.applicationPrinciples || []),
        { principle: '', application: '' }
      ]
    }))
  }

const getCurrentSystem = () =>
indigenousGovernanceSystems.find(system => system.id === currentStation)

return (
_<div className="te-kete-handout-container">
      {/* ERO Demonstration Header */}
      <header className="ero-demonstration-header">
        <div className="ero-badge">🌟 ERO HUI DEMONSTRATION READY</div>
        <h1 className="handout-title">
          🌿 Indigenous Wisdom Synthesis Worksheet - Whakakōtahi Mātauranga Taketake
        </h1>
        <p className="handout-subtitle">
Exploring Indigenous governance systems with respect,  _curiosity,  _and cultural safety
        </p>
        <div className="cultural-safety-banner">
          <span className="safety-icon">🔒</span>
          <span>Learning ABOUT systems with respect - not claiming to practice them</span>
        </div>
      </header>

      {/* Learning Objectives Section */}
      <section className="learning-objectives-section">
        <button 
className="objectives-toggle"
onClick={() => setShowObjectives(!showObjectives)}
        >
          🎯 Learning Objectives {showObjectives ? '▼' : '▶'}
        </button>
        
        {showObjectives && (
          <div className="objectives-grid">
            {learningObjectives.map(objective => (
              <div key={objective.id} className="objective-card">
                <h4 className={`bloom-level-${objective.bloomsLevel}`}>
                  {objective.description}
                </h4>
                <div className="objective-details">
                  <p><strong>🔒 Cultural Safety: </strong> {objective.culturalSafety}</p>
                  <p><strong>🎓 NCEA Relevance:</strong> {objective.nceaRelevance}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Instructions */}
      <section className="instructions-section">
        <h2>📋 Instructions - Ngā Tohutohu</h2>
        <div className="instructions-content">
          <p>
You will rotate through 4 stations exploring different Indigenous governance systems. 
At each station, record key information about how these communities organize themselves 
and make decisions.
          </p>
          <div className="cultural-reminder">
            <h3>🌿 Cultural Safety Reminder</h3>
            <p><strong>Remember: </strong> We are learning <em>about</em> these systems with respect and curiosity, not claiming to practice them ourselves.</p>
          </div>
        </div>
      </section>

      {/* Student Information */}
      <section className="student-info-section">
        <h3>👤 Student Information</h3>
        <div className="info-grid">
          <div className="info-field">
            <label htmlFor="student-name">Name: </label>
            <input
id="student-name"
type="text"
value={studentInfo.name}
onChange={(_e) => setStudentInfo(prev => ({...prev, name: e.target.value}))}
placeholder="Enter your name"
            />
          </div>
          <div className="info-field">
            <label htmlFor="student-date">Date: </label>
            <input
id="student-date"
type="text"
value={studentInfo.date}
onChange={(_e) => setStudentInfo(prev => ({...prev, date: e.target.value}))}
            />
          </div>
          <div className="info-field">
            <label htmlFor="group-members">Group Members:</label>
            <input
id="group-members"
type="text"
value={studentInfo.groupMembers}
onChange={(_e) => setStudentInfo(prev => ({...prev, groupMembers: e.target.value}))}
placeholder="List your group members"
            />
          </div>
        </div>
      </section>

      {/* Station Navigation */}
      <section className="station-navigation">
        <h3>🔄 Station Navigation</h3>
        <div className="station-buttons">
          {indigenousGovernanceSystems.map(_system => (
            <button
key={system.id}
className={`station-btn ${currentStation === system.id ? 'active' : ''}`}
onClick={() => setCurrentStation(system.id)}
            >
              {system.station}: {system.name}
            </button>
          ))}
        </div>
      </section>

      {/* Current Station Content */}
      <section className="station-content">
        {getCurrentSystem() && (
          <div className="station-box">
            <div className="station-header">
              <h3>{getCurrentSystem()?.station}: {getCurrentSystem()?.name}</h3>
              <p className="cultural-focus">
                <strong>Cultural Focus: </strong> {getCurrentSystem()?.culturalFocus}
              </p>
            </div>

            <div className="station-questions">
              <div className="question-section">
                <label>Key governance structure you learned about:</label>
                <textarea
className="writing-space"
placeholder="Describe the main governance structure..."
onChange={(_e) => handleStationDataChange('structure', e.target.value)}
rows={3}
                />
              </div>

              <div className="question-section">
                <label>How are decisions made in this system?</label>
                <textarea
className="writing-space"
placeholder="Explain the decision-making process..."
onChange={(_e) => handleStationDataChange('decisions', e.target.value)}
rows={3}
                />
              </div>

              <div className="question-section">
                <label>What values guide this governance approach?</label>
                <textarea
className="writing-space"
placeholder="Identify key values and principles..."
onChange={(_e) => handleStationDataChange('values', e.target.value)}
rows={3}
                />
              </div>

              <div className="question-section">
                <label>One thing that surprised or impressed you: </label>
                <textarea
className="writing-space"
placeholder="Share your reflection..."
onChange={(_e) => handleStationDataChange('reflection', e.target.value)}
rows={2}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Common Principles Analysis */}
      <section className="principles-analysis">
        <h3>🔍 Common Principles Analysis - Tātaritanga Mātāpono</h3>
        
        <div className="analysis-questions">
          <div className="question-section">
            <label>What common values or principles did you notice across these different Indigenous governance systems?</label>
            <textarea
className="large-writing-space"
placeholder="Analyze common themes and principles across all stations..."
value={synthesisData.commonPrinciples || ''}
onChange={(_e) => setSynthesisData(prev => ({...prev, commonPrinciples: e.target.value}))}
rows={4}
            />
          </div>

          <div className="question-section">
            <label>How do these approaches differ from governance systems you're more familiar with?</label>
            <textarea
className="large-writing-space"
placeholder="Compare with contemporary systems you know..."
value={synthesisData.differences || ''}
onChange={(_e) => setSynthesisData(prev => ({...prev, differences: e.target.value}))}
rows={4}
            />
          </div>

          <div className="question-section">
            <label>Which principles or approaches do you think could be valuable for any society? Why?</label>
            <textarea
className="large-writing-space"
placeholder="Identify valuable principles and explain your reasoning..."
value={synthesisData.valuablePrinciples || ''}
onChange={(_e) => setSynthesisData(prev => ({...prev, valuablePrinciples: e.target.value}))}
rows={4}
            />
          </div>
        </div>
      </section>

      {/* Application to Society Design */}
      <section className="synthesis-application">
        <h3>🏗️ Application to Your Society Design - Whakamahi ki tō Rōpū Taiao</h3>
        
        <div className="application-content">
          <p><strong>Choose 2-3 principles from Indigenous governance that could strengthen your group's society design: </strong></p>
          
          <button 
className="add-principle-btn"
onClick={addApplicationPrinciple}
          >
            ➕ Add Principle
          </button>

          {synthesisData.applicationPrinciples?.map(_(principle,  _index) => (
_<div key={index} className="principle-application">
              <h4>Principle {index + 1}:</h4>
              <div className="application-field">
                <label>Principle: </label>
                <input
type="text"
placeholder="Name the principle..."
value={principle.principle || ''}
onChange={(e) => handlePrincipleApplication(index, 'principle', e.target.value)}
                />
              </div>
              <div className="application-field">
                <label>How will you apply this in your society?</label>
                <textarea
className="writing-space"
placeholder="Explain how you'll implement this principle respectfully..."
value={principle.application || ''}
onChange={(_e) => handlePrincipleApplication(index, 'application', e.target.value)}
rows={3}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Reflection */}
      <section className="personal-reflection">
        <h3>💭 Personal Reflection - Whakaaroaro Motuhake</h3>
        
        <div className="reflection-questions">
          <div className="question-section">
            <label>What's one new perspective you gained about leadership and governance from today's learning?</label>
            <textarea
className="large-writing-space"
placeholder="Reflect on new insights about leadership and governance..."
value={synthesisData.personalReflection || ''}
onChange={(_e) => setSynthesisData(prev => ({...prev, personalReflection: e.target.value}))}
rows={4}
            />
          </div>

          <div className="question-section">
            <label>How might this learning influence how you participate in your school, whānau, or community?</label>
            <textarea
className="large-writing-space"
placeholder="Consider practical applications in your own contexts..."
value={synthesisData.communityImpact || ''}
onChange={(_e) => setSynthesisData(prev => ({...prev, communityImpact: e.target.value}))}
rows={4}
            />
          </div>
        </div>
      </section>

      {/* Cultural Safety Reminder */}
      <section className="cultural-safety-section">
        <h3>🌿 Cultural Safety Reminder - Whakamahinga Haumanu</h3>
        <div className="cultural-safety-content">
          <p><strong>Important: </strong> Indigenous knowledge systems are living traditions that belong to specific communities. We learn about them to:</p>
          <ul>
            <li>Understand different ways of organizing society</li>
            <li>Appreciate the wisdom in diverse approaches to governance</li>
            <li>Consider how these insights might inform our own society design</li>
            <li>Develop respect for Indigenous ways of knowing</li>
          </ul>
          <p className="emphasis">We do not claim to practice or represent these traditions ourselves.</p>
        </div>
      </section>

      {/* Resource Integration for ERO */}
      <section className="related-resources-section">
        <h3>📚 Related Educational Resources</h3>
        <div className="resources-grid">
          <div className="resource-card high-priority">
            <div className="resource-header">
              <span className="priority-badge">🔥 High Priority</span>
              <span className="subject-badge">Social Studies</span>
            </div>
            <h4>Indigenous Governance Systems - NZ Curriculum</h4>
            <p>Official curriculum resources for understanding governance and society</p>
            <p><strong>🌿 Cultural Relevance:</strong> Direct alignment with Indigenous knowledge systems</p>
            <div className="resource-meta">
              <span>Year 8 Social Studies</span>
              <span>Achievement Standards 2.1, 2.5</span>
            </div>
          </div>

          <div className="resource-card medium-priority">
            <div className="resource-header">
              <span className="priority-badge">⚡ Medium Priority</span>
              <span className="subject-badge">Civics</span>
            </div>
            <h4>Comparative Government Systems</h4>
            <p>Resources for comparing different governance approaches</p>
            <p><strong>🌿 Cultural Relevance: </strong> Respectful comparison frameworks</p>
            <div className="resource-meta">
              <span>Year 8-10</span>
              <span>Civics Education</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="handout-footer">
        <p className="cultural-motto">
          🌿 "Mā te ako, ka mōhio ai tātou" - Through learning, we come to understand
        </p>
        <p className="platform-info">
TeAoMarama - Indigenous Wisdom Synthesis • Cultural Safety Priority
        </p>
      </footer>
    </div>
  )
}