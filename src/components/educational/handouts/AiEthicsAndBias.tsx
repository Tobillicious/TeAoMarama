import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface AiEthicsAndBiasProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const AiEthicsAndBias: React.FC<AiEthicsAndBiasProps> = ({
  culturalContext = "Digital ethics and cultural responsibility",
  yearLevel = "Year 9-10",
  subject = "Digital Technologies, Social Studies"
}) => {
  return (
    <div className="ai-ethics-and-bias">
      <Card title="AI Ethics and Bias" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">AI Ethics and Bias</h1>
          <p className="handout-subtitle">When Good Data Goes Bad</p>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <section className="problem-section">
            <div className="alert-box">
              <h2 className="section-title">The Problem of Bias</h2>
              <p className="alert-content">
                An AI model is only as good as the data it's trained on. Because LLMs are trained on vast amounts of text from the internet, they learn the biases that are present in that text. If the data reflects historical inequalities or stereotypes, the AI will learn and can even amplify those biases.
              </p>
            </div>
          </section>

          <section className="case-study">
            <h2 className="section-title">Case Study: Biased Hiring Tool</h2>
            <div className="case-study-content">
              <p>
                A major tech company created an AI tool to help them screen CVs. The goal was to find the best candidates. They trained the model on the CVs of people they had hired over the last 10 years. However, because the company had historically hired more men than women, the AI learned that male candidates were preferable. It started penalizing CVs that included the word "women's" (e.g., "women's chess club captain") and downgrading graduates from all-women's colleges. The company had to scrap the tool.
              </p>
            </div>
          </section>

          <section className="critical-thinking">
            <h2 className="section-title">Critical Thinking</h2>
            <div className="question-block">
              <p className="question-text">
                Who is responsible for the bias in the AI hiring tool? The programmers? The company? The historical data? Explain your reasoning.
              </p>
              <div className="response-area">
                <textarea 
                  className="response-textarea"
                  placeholder="Write your analysis here..."
                  rows={6}
                />
              </div>
            </div>
          </section>

          <section className="cultural-reflection">
            <h2 className="section-title">
              <span className="cultural-icon">🌿</span>
              Ngā Whakaaro Ahurea - Cultural Reflection
            </h2>
            <div className="reflection-content">
              <p className="reflection-text">
                Consider how AI bias might affect Māori and other indigenous communities. What responsibilities do we have when creating technology that could perpetuate historical inequalities?
              </p>
              <div className="response-area">
                <textarea 
                  className="response-textarea"
                  placeholder="Share your thoughts on cultural responsibility in AI development..."
                  rows={4}
                />
              </div>
            </div>
          </section>

          <section className="external-resources">
            <h3 className="section-title">
              <span className="cultural-icon">🌿</span>
              Ngā Rauemi Tauwehe - External Resources
            </h3>
            <p className="resources-description">
              High-quality resources from official New Zealand education sites to extend and enrich this learning content.
            </p>
            
            <div className="resources-list">
              <div className="resource-item">
                <h4 className="resource-title">
                  <a href="https://www.sciencelearn.org.nz/" target="_blank" rel="noopener noreferrer">
                    Science Learning Hub
                  </a>
                </h4>
                <p className="resource-description">
                  Over 11,550 NZ science education resources for teachers, students and community
                </p>
                <div className="resource-tags">
                  <span className="tag year-tag">Years: 1-13</span>
                  <span className="tag match-tag">60% Match</span>
                  <span className="tag official-tag">Official NZ Resource</span>
                </div>
              </div>

              <div className="resource-item">
                <h4 className="resource-title">
                  <a href="https://tahurangi.education.govt.nz/" target="_blank" rel="noopener noreferrer">
                    Tāhūrangi - Te Reo Māori Education Hub
                  </a>
                </h4>
                <p className="resource-description">
                  Official NZ government hub for te reo Māori resources, guidance, and teaching support
                </p>
                <div className="resource-tags">
                  <span className="tag year-tag">Years: 7-13</span>
                  <span className="tag match-tag">30% Match</span>
                  <span className="tag official-tag">Official NZ Resource</span>
                </div>
              </div>
            </div>

            <div className="ai-curation-note">
              <p>
                🤖 <em>These resources were automatically curated by Te Kete Ako's AI system to complement this content. 
                All external links lead to official New Zealand educational and government websites.</em>
              </p>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default AiEthicsAndBias;
