import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ResearchMethodsHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ResearchMethodsHandout: React.FC<ResearchMethodsHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="research-methods-handout">
      <Card title="Research Methods | Te Kete Ako Handout" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Research Methods | Te Kete Ako Handout</h1>
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
        <div class="handout-header">
            <h1 class="wiley-hero-title">🔍 Research Methods Handout</h1>
            <p class="handout-subtitle">Essential skills for gathering, evaluating, and presenting information</p>
            <div class="handout-meta">
                <span class="meta-item"><strong>Subject: </strong> Cross-curricular</span>
                <span class="meta-item"><strong>Level:</strong> Year 9-13</span>
                <span class="meta-item"><strong>Duration:</strong> Reference guide</span>
                <span class="meta-item"><strong>Cultural Level:</strong> Medium</span>
            </div>
        
        </div>

        <section class="handout-section">
            <h2 class="wiley-section-title">📋 Research Process Overview</h2>
            <div class="process-steps">
                <div class="step">
                    <div class="step-number">1</div>
                    <div class="step-content">
                        <h3>Define Your Research Question</h3>
                        <p>Start with a clear, focused question that guides your investigation.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">2</div>
                    <div class="step-content">
                        <h3>Plan Your Research Strategy</h3>
                        <p>Identify what types of sources you need and where to find them.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">3</div>
                    <div class="step-content">
                        <h3>Gather Information</h3>
                        <p>Collect data from reliable, diverse sources using appropriate methods.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">4</div>
                    <div class="step-content">
                        <h3>Evaluate Sources</h3>
                        <p>Assess the credibility, relevance, and reliability of your information.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">5</div>
                    <div class="step-content">
                        <h3>Analyze and Synthesize</h3>
                        <p>Make connections between sources and draw meaningful conclusions.</p>
                    </div>
                </div>
                <div class="step">
                    <div class="step-number">6</div>
                    <div class="step-content">
                        <h3>Present Findings</h3>
                        <p>Communicate your research clearly and cite sources appropriately.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="handout-section">
            <h2 class="wiley-section-title">🎯 Types of Research Methods</h2>
            
            <div class="method-type">
                <h3>Primary Research</h3>
                <p>Original data collection through direct investigation.</p>
                <ul>
                    <li><strong>Surveys & Questionnaires: </strong> Gather quantitative and qualitative data from target groups</li>
                    <li><strong>Interviews:</strong> Conduct structured or open-ended conversations with experts or stakeholders</li>
                    <li><strong>Observations:</strong> Record behaviors, events, or phenomena directly</li>
                    <li><strong>Experiments: </strong> Test hypotheses under controlled conditions</li>
                    <li><strong>Field Work:</strong> Study subjects in their natural environment</li>
                </ul>
            </div>

            <div class="method-type">
                <h3>Secondary Research</h3>
                <p>Analysis of existing information and data sources.</p>
                <ul>
                    <li><strong>Academic Articles:</strong> Peer-reviewed scholarly publications</li>
                    <li><strong>Books & Reports:</strong> Published research and expert analysis</li>
                    <li><strong>Government Data:</strong> Official statistics and policy documents</li>
                    <li><strong>Media Sources:</strong> News articles, documentaries, broadcasts</li>
                    <li><strong>Online Databases: </strong> Digital libraries and research repositories</li>
                </ul>
            </div>
        </section>

        <section class="handout-section cultural-context">
            <h2 class="wiley-section-title">🌿 Cultural Research Considerations</h2>
            <div class="cultural-note">
                <h4>Mātauranga Māori Research Principles</h4>
                <p>When researching topics related to Māori culture or communities, consider these important principles: </p>
                <ul>
                    <li><strong>Tino Rangatiratanga:</strong> Respect Māori authority and decision-making</li>
                    <li><strong>Taonga Tuku Iho:</strong> Acknowledge cultural treasures and knowledge systems</li>
                    <li><strong>Whakapapa:</strong> Understand relationships and connections</li>
                    <li><strong>He Tangata:</strong> Center people and their wellbeing in research</li>
                    <li><strong>Kaitiakitanga:</strong> Practice guardianship and protection of knowledge</li>
                </ul>
            </div>
        </section>

        <section class="handout-section">
            <h2 class="wiley-section-title">✅ Source Evaluation Checklist</h2>
            <div class="evaluation-grid">
                <div class="eval-category">
                    <h3>Authority</h3>
                    <ul>
                        <li>Who is the author?</li>
                        <li>What are their qualifications?</li>
                        <li>Is the publisher reputable?</li>
                        <li>Are contact details provided?</li>
                    </ul>
                </div>
                <div class="eval-category">
                    <h3>Accuracy</h3>
                    <ul>
                        <li>Are facts verified?</li>
                        <li>Are sources cited?</li>
                        <li>Is information consistent with other sources?</li>
                        <li>Are there obvious errors?</li>
                    </ul>
                </div>
                <div class="eval-category">
                    <h3>Currency</h3>
                    <ul>
                        <li>When was it published?</li>
                        <li>When was it last updated?</li>
                        <li>Is current information important for this topic?</li>
                        <li>Are links still active?</li>
                    </ul>
                </div>
                <div class="eval-category">
                    <h3>Relevance</h3>
                    <ul>
                        <li>Does it answer your research question?</li>
                        <li>Is it appropriate for your level?</li>
                        <li>Is it too basic or advanced?</li>
                        <li>Does it support your argument?</li>
                    </ul>
                </div>
                <div class="eval-category">
                    <h3>Purpose & Bias</h3>
                    <ul>
                        <li>What is the purpose of the information?</li>
                        <li>Is there obvious bias?</li>
                        <li>Is it trying to sell something?</li>
                        <li>Are multiple perspectives presented?</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="handout-section">
            <h2 class="wiley-section-title">📚 Citation Guidelines</h2>
            <div class="citation-examples">
                <h3>APA Style Examples</h3>
                <div class="citation-type">
                    <h4>Book:</h4>
                    <p class="citation">Author, A. A. (Year). <em>Title of book</em>. Publisher.</p>
                </div>
                <div class="citation-type">
                    <h4>Journal Article: </h4>
                    <p class="citation">Author, A. A. (Year). Title of article. <em>Journal Name</em>, <em>Volume</em>(Issue), pages.</p>
                </div>
                <div class="citation-type">
                    <h4>Website: </h4>
                    <p class="citation">Author, A. A. (Year, Month Date). Title of webpage. <em>Website Name</em>. URL</p>
                </div>
                <div class="citation-type">
                    <h4>Government Document: </h4>
                    <p class="citation">Government Agency. (Year). <em>Title of document</em>. Publisher.</p>
                </div>
            </div>
        </section>

        <section class="handout-section">
            <h2 class="wiley-section-title">🚀 Research Tips for Success</h2>
            <div class="tips-grid">
                <div class="tip">
                    <h4>Start Early</h4>
                    <p>Good research takes time. Begin well before your deadline to allow for thorough investigation.</p>
                </div>
                <div class="tip">
                    <h4>Keep Records</h4>
                    <p>Track your sources as you go. It's much harder to find them again later.</p>
                </div>
                <div class="tip">
                    <h4>Use Keywords</h4>
                    <p>Experiment with different search terms and phrases to find the best sources.</p>
                </div>
                <div class="tip">
                    <h4>Ask for Help</h4>
                    <p>Librarians and teachers are excellent resources for research guidance.</p>
                </div>
                <div class="tip">
                    <h4>Stay Organized</h4>
                    <p>Use folders, bookmarks, or research management tools to keep track of information.</p>
                </div>
                <div class="tip">
                    <h4>Be Critical</h4>
                    <p>Question everything. Good researchers are skeptical and verify information.</p>
                </div>
            </div>
        </section>

        <section class="handout-section activity-section">
            <h2 class="wiley-section-title">💪 Practice Activity</h2>
            <div class="activity-box">
                <h3>Research Evaluation Challenge</h3>
                <p>Choose a current news topic and find three different sources about it. Use the evaluation checklist to assess each source and explain which you would trust most for academic research.</p>
                
                <div class="activity-steps">
                    <ol>
                        <li>Select a topic of current interest</li>
                        <li>Find three sources (e.g., news article, academic paper, blog post)</li>
                        <li>Apply the 5-point evaluation criteria to each</li>
                        <li>Rank the sources in order of reliability</li>
                        <li>Explain your reasoning in 100-150 words</li>
                    </ol>
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

export default ResearchMethodsHandout
