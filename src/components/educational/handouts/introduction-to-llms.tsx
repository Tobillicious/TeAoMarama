import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface IntroductionToLlmsProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const IntroductionToLlms: React.FC<IntroductionToLlmsProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="introduction-to-llms">
      <Card title="Introduction to Large Language Models | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Introduction to Large Language Models | Te Kete Ako</h1>
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
                        <h2 class="wiley-section-title">What is a Large Language Model (LLM)?</h2>
                        <p>A Large Language Model is a type of artificial intelligence that has been trained on a massive amount of text data. This training allows it to understand the patterns, grammar, and context of human language. Its core function is to predict the next most likely word in a sequence, which enables it to generate human-like text, answer questions, translate languages, and much more.</p>
                        
                        <div class="cultural-note">
                            <h3>Te Ao Māori Perspective</h3>
                            <p>In Māori worldview, language (reo) is considered a <em>taonga</em> (treasure). As we explore AI language models, we must consider how they handle indigenous languages and cultural knowledge responsibly.</p>
                        </div>
        
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Key Concepts</h2>
                    
                    <div class="concept-cards">
                        <div class="concept-card">
                            <h3>Training Data</h3>
                            <p>LLMs are trained on vast datasets from the internet, books, and other sources. This is how they "learn" language patterns and knowledge. However, this is also the source of potential bias, as the training data may not represent all perspectives equally.</p>
                            <div class="key-point">
                                <strong>Critical Question: </strong> What voices might be missing from these datasets?
                            </div>
                        </div>

                        <div class="concept-card">
                            <h3>Parameters</h3>
                            <p>These are the internal variables the model uses to make predictions about what word comes next. Models are often measured by the number of parameters they have - ranging from millions to hundreds of billions.</p>
                            <div class="key-point">
                                <strong>Think About:</strong> More parameters don't always mean better performance!
                            </div>
                        </div>

                        <div class="concept-card">
                            <h3>Prompting</h3>
                            <p>This is the input you give to the model - your question or instruction. The quality and clarity of the prompt significantly affects the quality of the output you receive.</p>
                            <div class="key-point">
                                <strong>Practice:</strong> Clear, specific prompts yield better results.
                            </div>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Understanding How LLMs Work</h2>
                    
                    <div class="process-flow">
                        <div class="process-step">
                            <span class="step-number">1</span>
                            <h3>Text Input</h3>
                            <p>You type a question or prompt</p>
                        </div>
                        
                        <div class="process-step">
                            <span class="step-number">2</span>
                            <h3>Tokenization</h3>
                            <p>The model breaks your text into smaller pieces called tokens</p>
                        </div>
                        
                        <div class="process-step">
                            <span class="step-number">3</span>
                            <h3>Processing</h3>
                            <p>The model uses its parameters to understand context and meaning</p>
                        </div>
                        
                        <div class="process-step">
                            <span class="step-number">4</span>
                            <h3>Generation</h3>
                            <p>It predicts and generates the most likely response</p>
                        </div>
                    </div>
                </section>

                <section class="content-section">
                    <h2 class="wiley-section-title">Critical Considerations</h2>
                    
                    <div class="considerations-grid">
                        <div class="consideration-card ethical">
                            <h3>🤔 Bias and Fairness</h3>
                            <p>LLMs can perpetuate biases present in their training data. This is particularly important when considering representation of indigenous knowledge and perspectives.</p>
                        </div>
                        
                        <div class="consideration-card environmental">
                            <h3>🌍 Environmental Impact</h3>
                            <p>Training and running large models requires significant computational resources and energy consumption.</p>
                        </div>
                        
                        <div class="consideration-card cultural">
                            <h3>🎭 Cultural Sensitivity</h3>
                            <p>How well do these models understand and respect different cultural contexts, especially indigenous knowledge systems?</p>
                        </div>
                        
                        <div class="consideration-card privacy">
                            <h3>🔒 Privacy and Data</h3>
                            <p>What happens to the data you share with these models? Understanding data sovereignty is crucial.</p>
                        </div>
                    </div>
                </section>

                <section class="activity-section">
                    <h2 class="wiley-section-title">Reflection Questions</h2>
                    <div class="reflection-questions">
                        <ol>
                            <li>How might the training data of an LLM affect its understanding of Māori perspectives and knowledge?</li>
                            <li>What are the potential benefits and risks of using LLMs in education?</li>
                            <li>How could we ensure that indigenous voices and knowledge are properly represented in AI systems?</li>
                            <li>What questions would you ask before trusting information from an AI model?</li>
                        </ol>
                    </div>
                </section>

                <section class="curriculum-alignment">
                    <h2 class="wiley-section-title">Curriculum Connections</h2>
                    <div class="alignment-grid">
                        <div class="alignment-item">
                            <h3>Digital Technologies</h3>
                            <ul>
                                <li>Understanding digital systems and their impact</li>
                                <li>Exploring artificial intelligence concepts</li>
                                <li>Critical evaluation of digital tools</li>
                            </ul>
                        </div>
                        <div class="alignment-item">
                            <h3>Social Sciences</h3>
                            <ul>
                                <li>Understanding societal impact of technology</li>
                                <li>Exploring issues of equity and representation</li>
                                <li>Critical thinking about information sources</li>
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

export default IntroductionToLlms
