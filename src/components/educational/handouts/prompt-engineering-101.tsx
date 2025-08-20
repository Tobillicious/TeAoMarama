import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface PromptEngineering101Props {culturalContext?: string
  yearLevel?: string
  subject?: string}
const PromptEngineering101: React.FC<PromptEngineering101Props> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="prompt-engineering-101">
      <Card title="Prompt Engineering 101 | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Prompt Engineering 101 | Te Kete Ako</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <div 
className="te-kete-content"
dangerouslySetInnerHTML={{ __html: `
                
                <section class="concept-introduction">
                    <div class="highlight-box cultural-context">
                        <h2 class="wiley-section-title">The Art of the Ask - He Tapatahi o te Pātai</h2>
                        <p>Prompt engineering is the skill of crafting effective inputs (prompts) to guide a Large Language Model towards a desired output. It's like being a great director for a very talented but very literal actor - the clearer your instructions, the better the performance.</p>
                        
                        <div class="cultural-note">
                            <h3>Te Ao Māori Connection</h3>
                            <p>In Māori communication traditions, clarity and respect are fundamental. When we interact with AI, we bring these same values - clear intent, respectful language, and understanding that words have power (mana).</p>
                        </div>
        
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">The Four Pillars of Effective Prompting</h2>
                    
                    <div class="technique-grid">
                        <div class="technique-card clarity">
                            <span class="technique-icon">🎯</span>
                            <h3>1. Be Specific and Clear</h3>
                            <div class="example-comparison">
                                <div class="poor-example">
                                    <strong>❌ Poor: </strong> "Write about dogs."
                                </div>
                                <div class="good-example">
                                    <strong>✅ Better:</strong> "Write a 100-word paragraph about the loyalty of golden retrievers, in a warm and friendly tone suitable for Year 7 students."
                                </div>
                            </div>
                        </div>

                        <div class="technique-card context">
                            <span class="technique-icon">📚</span>
                            <h3>2. Provide Context</h3>
                            <div class="example-comparison">
                                <div class="poor-example">
                                    <strong>❌ Poor: </strong> "Explain the Treaty."
                                </div>
                                <div class="good-example">
                                    <strong>✅ Better:</strong> "I am a Year 12 student writing an essay on the Treaty of Waitangi for NCEA Level 2 History. Please explain the key provisions of the Treaty from both Māori and Crown perspectives."
                                </div>
                            </div>
                        </div>

                        <div class="technique-card persona">
                            <span class="technique-icon">🎭</span>
                            <h3>3. Assign a Persona</h3>
                            <div class="example-comparison">
                                <div class="poor-example">
                                    <strong>❌ Poor:</strong> "What caused the New Zealand Wars?"
                                </div>
                                <div class="good-example">
                                    <strong>✅ Better:</strong> "Act as a professional historian specializing in 19th century New Zealand. Explain the multiple causes of the New Zealand Wars, including different perspectives from Māori and European viewpoints."
                                </div>
                            </div>
                        </div>

                        <div class="technique-card examples">
                            <span class="technique-icon">💡</span>
                            <h3>4. Use Examples (Few-Shot Prompting)</h3>
                            <div class="example-comparison">
                                <div class="poor-example">
                                    <strong>❌ Poor: </strong> "Translate to Te Reo Māori."
                                </div>
                                <div class="good-example">
                                    <strong>✅ Better:</strong> "Translate the following from English to Te Reo Māori, following this pattern: <br>
Hello → Kia ora<br>
Goodbye → Haere rā<br>
Thank you → ?"
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Advanced Prompting Strategies</h2>
                    
                    <div class="advanced-techniques">
                        <div class="technique-detailed">
                            <h3>Chain of Thought Prompting</h3>
                            <p>Encourage the AI to show its reasoning process step by step.</p>
                            <div class="technique-example">
                                <strong>Example: </strong> "Let's work through this math problem step by step. First, identify what we know..."
                            </div>
                        </div>

                        <div class="technique-detailed">
                            <h3>Role-Based Prompting</h3>
                            <p>Have the AI take on specific professional or cultural perspectives.</p>
                            <div class="technique-example">
                                <strong>Example: </strong> "Respond as a Māori educator who specializes in traditional navigation techniques..."
                            </div>
                        </div>

                        <div class="technique-detailed">
                            <h3>Constraint Setting</h3>
                            <p>Set clear boundaries and limitations for the response.</p>
                            <div class="technique-example">
                                <strong>Example:</strong> "In exactly 150 words, using language appropriate for Year 9 students..."
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Cultural Sensitivity in Prompting</h2>
                    
                    <div class="cultural-guidelines">
                        <div class="guideline-card">
                            <h3>🌿 Respecting Indigenous Knowledge</h3>
                            <p>When asking about Māori or other indigenous topics, acknowledge the cultural significance and ask for culturally appropriate responses.</p>
                            <div class="example-text">
                                "Please explain traditional Māori navigation methods with appropriate cultural respect and acknowledgment of mātauranga Māori."
                            </div>
                        </div>

                        <div class="guideline-card">
                            <h3>🤝 Inclusive Language</h3>
                            <p>Use inclusive pronouns and language that represents diverse perspectives.</p>
                            <div class="example-text">
                                "Explain this concept using examples that would be relevant to students from diverse cultural backgrounds."
                            </div>
                        </div>

                        <div class="guideline-card">
                            <h3>⚖️ Balanced Perspectives</h3>
                            <p>For historical or controversial topics, explicitly ask for multiple viewpoints.</p>
                            <div class="example-text">
                                "Present both Māori and European perspectives on this historical event, noting areas of agreement and disagreement."
                            </div>
                        </div>
                    </div>
                </section>

                <section class="activity-section">
                    <h2 class="wiley-section-title">Practice Activity: Prompt Makeover</h2>
                    
                    <div class="practice-exercise">
                        <p><strong>Instructions:</strong> Rewrite these weak prompts using the techniques you've learned.</p>
                        
                        <div class="prompt-makeover">
                            <div class="weak-prompt">
                                <h4>Weak Prompt #1:</h4>
                                <p>"Tell me about climate change."</p>
                            </div>
                            <div class="makeover-space">
                                <h4>Your Improved Version:</h4>
                                <div class="writing-space">
                                    [Write your improved prompt here - consider: Who is your audience? What specific aspect? What tone? What perspective?]
                                </div>
                            </div>
                        </div>

                        <div class="prompt-makeover">
                            <div class="weak-prompt">
                                <h4>Weak Prompt #2:</h4>
                                <p>"Write a story."</p>
                            </div>
                            <div class="makeover-space">
                                <h4>Your Improved Version:</h4>
                                <div class="writing-space">
                                    [Write your improved prompt here]
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Ethical Considerations</h2>
                    
                    <div class="ethics-checklist">
                        <h3>Before You Prompt, Ask Yourself: </h3>
                        <ul class="checklist">
                            <li>Am I asking for something that respects cultural protocols?</li>
                            <li>Could my prompt lead to biased or harmful outputs?</li>
                            <li>Am I being transparent about using AI assistance?</li>
                            <li>Does my prompt encourage critical thinking rather than just accepting AI responses?</li>
                            <li>Am I considering data sovereignty and privacy implications?</li>
                        </ul>
                    </div>
                </section>

                <section class="curriculum-alignment">
                    <h2 class="wiley-section-title">Curriculum Connections</h2>
                    <div class="alignment-grid">
                        <div class="alignment-item">
                            <h3>Digital Technologies</h3>
                            <ul>
                                <li>Human-computer interaction principles</li>
                                <li>Understanding AI system capabilities and limitations</li>
                                <li>Digital citizenship and responsible AI use</li>
                            </ul>
                        </div>
                        <div class="alignment-item">
                            <h3>English/Literacy</h3>
                            <ul>
                                <li>Clear and effective communication</li>
                                <li>Purpose, audience, and context in writing</li>
                                <li>Critical evaluation of information sources</li>
                            </ul>
                        </div>
                    </div>
                </section>

            ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default PromptEngineering101
