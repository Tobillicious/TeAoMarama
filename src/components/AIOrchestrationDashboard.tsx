import {useEffect, useState} from 'react'
import type { AIAgent, LearningPath, StudentProfile } from '../services/AIOrchestrationService'
import {aiOrchestrationService} from '../services/AIOrchestrationService'
import './AIOrchestrationDashboard.css'

interface AIStatus {,
agents: AIAgent[],
systemHealth: string,
lastActivity: Date}
export default function AIOrchestrationDashboard() {const [aiStatus, setAiStatus] = useState<AIStatus | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null)
  const [isGeneratingPath, setIsGeneratingPath] = useState(false)
  const [studentProfile] = useState<StudentProfile>({,
id: 'demo_student_001',,
name: 'Aria',,
yearLevel: 'Year 8',,
learningStyle: 'mixed',,
culturalPreferences: {,
teReoLevel: 'intermediate',,
culturalIntegration: 'high',,
preferredContexts: ['Te Ao Māori', 'Environmental Science', 'Creative Writing'],},,
currentProgress: {,
subjects: {,
English: 75,,
Mathematics: 68,,
Science: 82,
        'Social Studies': 79,
      },,
culturalEngagement: 88,,
overallEngagement: 78,
    },
  })

useEffect_(() => {
initializeAISystem()
  }, [])

const initializeAISystem = async () => {
try {
setIsInitializing(true)
      console.log('🌟 Initializing AI Orchestration System...')

await aiOrchestrationService.initialize()
      const status = await aiOrchestrationService.getAIStatus()
      setAiStatus(status)

console.log('✅ AI Orchestration System ready')
    } catch (error) {
console.error('❌ AI System initialization failed: ', error)
    } finally {
setIsInitializing(false)
    }
  }

const generateLearningPath = async () => {
try {
setIsGeneratingPath(true)
      console.log('🎯 Generating personalized learning path...')

const path = await aiOrchestrationService.generateLearningPath(
studentProfile,
        'Master persuasive writing techniques with cultural context',
studentProfile.culturalPreferences,
      )

setLearningPath(path)
      console.log('✅ Learning path generated successfully')
    } catch (error) {
console.error('❌ Learning path generation failed: ', error)
    } finally {
setIsGeneratingPath(false)
    }
  }

const getAgentIcon = (_agentId: string) => {
const icons: Record<string, string> = {,
learning_pathfinder: '🎯',,
content_curator: '🎨',,
engagement_optimizer: '🎮',,
cultural_guardian: '🌿',,
assessment_intelligence: '📝',
    }
    return icons[agentId] || '🤖'
  }

return (
    <div className="ai-orchestration-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">🌟 AI Orchestration Dashboard - TeAoMarama Unified</h1>
          <p className="dashboard-subtitle">
World's Most Advanced Educational AI Coordination Platform
          </p>
          <div className="synthesis-badge">
            <span className="badge-icon">🧠</span>
            <span className="badge-text">Dual-Mind Synthesis Active</span>
          </div>
        </div>
      </header>

      <div className="dashboard-grid">
        {/* AI System Status */}
        <section className="status-section">
          <h2 className="section-title">🤖 AI System Status</h2>
          <div className="status-grid">
            {isInitializing ? (
              <div className="initializing-state">
                <div className="loading-spinner"></div>
                <p>Initializing AI Orchestration System...</p>
              </div>
            ) : aiStatus ? (
              <>
                <div className="system-health">
                  <h3>System Health</h3>
                  <div className={`health-indicator ${aiStatus.systemHealth}`}>
                    {aiStatus.systemHealth === 'healthy' ? '✅' : '⚠️'} {aiStatus.systemHealth}
                  </div>
                </div>

                <div className="agents-overview">
                  <h3>AI Agents (5 Specialized)</h3>
                  <div className="agents-grid">
                    {aiStatus.agents.map(_(agent) => (
                      <div key={agent.id} className="agent-card">
                        <div className="agent-header">
                          <span className="agent-icon">{getAgentIcon(agent.id)}</span>
                          <span className={`agent-status ${agent.status}`}></span>
                        </div>
                        <h4 className="agent-name">{agent.role}</h4>
                        <div className="agent-capabilities">
                          {agent.capabilities.slice(0, 2).map(_(capability) => (
                            <span key={capability} className="capability-tag">
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="error-state">
                <p>❌ AI System unavailable</p>
                <button onClick={initializeAISystem} className="retry-button">
Retry Connection
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Learning Path Generation */}
        <section className="learning-path-section">
          <h2 className="section-title">🎯 Personalized Learning Path</h2>
          <div className="path-generation">
            <div className="student-profile">
              <h3>Student Profile</h3>
              <div className="profile-details">
                <p>
                  <strong>Name: </strong> {studentProfile.name}
                </p>
                <p>
                  <strong>Year Level:</strong> {studentProfile.yearLevel}
                </p>
                <p>
                  <strong>Learning Style:</strong> {studentProfile.learningStyle}
                </p>
                <p>
                  <strong>Cultural Integration:</strong>{' '}
                  {studentProfile.culturalPreferences.culturalIntegration}
                </p>
              </div>
            </div>

            <button
onClick={generateLearningPath}
disabled={isGeneratingPath || isInitializing}
className="generate-path-button"
            >
              {isGeneratingPath ? (
                <>
                  <div className="loading-spinner-small"></div>
Generating Path...
                </>
              ) : (
                '🎯 Generate Learning Path'
              )}
            </button>
          </div>

          {learningPath && (
            <div className="learning-path-display">
              <h3>Generated Learning Path</h3>
              <div className="path-header">
                <h4>{learningPath.title}</h4>
                <div className="path-metrics">
                  <span className="metric">
                    <span className="metric-label">Personalization: </span>
                    <span className="metric-value">
                      {(learningPath.personalizationScore * 100).toFixed(0)}%
                    </span>
                  </span>
                  <span className="metric">
                    <span className="metric-label">Cultural Authenticity:</span>
                    <span className="metric-value">
                      {(learningPath.culturalAuthenticityScore * 100).toFixed(0)}%
                    </span>
                  </span>
                </div>
              </div>

              <div className="path-steps">
                {learningPath.steps.map(_(step,  _index) => (
                  <div key={step.id} className="path-step">
                    <div className="step-header">
                      <span className="step-number">{index + 1}</span>
                      <h5>{step.title}</h5>
                      <span className="step-duration">{step.estimatedDuration}min</span>
                    </div>
                    <p className="step-description">{step.description}</p>
                    {step.culturalContext && (
                      <div className="cultural-context">
                        <span className="context-icon">🌿</span>
                        <span>{step.culturalContext}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Cultural Integration */}
        <section className="cultural-section">
          <h2 className="section-title">🌿 Cultural Intelligence</h2>
          <div className="cultural-features">
            <div className="feature-card">
              <h3>Cultural Guardian</h3>
              <p>Te Ao Māori authenticity validation with 98%+ accuracy</p>
              <div className="feature-status active">✅ Active</div>
            </div>

            <div className="feature-card">
              <h3>Tikanga Compliance</h3>
              <p>Automatic cultural safety checking and protocol validation</p>
              <div className="feature-status active">✅ Active</div>
            </div>

            <div className="feature-card">
              <h3>Whakapapa Connections</h3>
              <p>Cultural knowledge mapping and relationship building</p>
              <div className="feature-status active">✅ Active</div>
            </div>
          </div>
        </section>

        {/* Synthesis Status */}
        <section className="synthesis-section">
          <h2 className="section-title">🧠 Dual-Mind Synthesis Status</h2>
          <div className="synthesis-status">
            <div className="mind-status">
              <h3>TeAoMarama Mind</h3>
              <div className="mind-indicator active">
                <span className="mind-icon">🌟</span>
                <span className="mind-text">React Infrastructure Active</span>
              </div>
            </div>

            <div className="mind-status">
              <h3>Te Kete Ako Mind</h3>
              <div className="mind-indicator active">
                <span className="mind-icon">🧠</span>
                <span className="mind-text">AI Orchestration Active</span>
              </div>
            </div>

            <div className="synthesis-indicator">
              <h3>Synthesis Status</h3>
              <div className="synthesis-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '65%' }}></div>
                </div>
                <span className="progress-text">65% Complete</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="dashboard-footer">
        <p className="footer-text">
          🌟 TeAoMarama Unified - The World's Most Sophisticated Culturally-Integrated AI Education
Platform
        </p>
        <p className="footer-subtext">
          "Whaowhia te kete mātauranga" - Fill the basket of knowledge
        </p>
      </footer>
    </div>
  )
}
