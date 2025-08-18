import React from 'react';
import { Card } from '../../Card';
import '../../../styles/te-kete-synthesis.css';

interface ArgumentsOfTinoRangatiratangaProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const ArgumentsOfTinoRangatiratanga: React.FC<ArgumentsOfTinoRangatiratangaProps> = ({
  culturalContext = "Māori sovereignty and historical justice",
  yearLevel = "Year 9-10",
  subject = "Social Studies, English"
}) => {
  return (
    <div className="arguments-of-tino-rangatiratanga">
      <Card title="Arguments of Tino Rangatiratanga" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Arguments of Tino Rangatiratanga</h1>
          <p className="handout-subtitle">The 1975 Māori Land March and PEEL Structure</p>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <section className="introduction">
            <div className="intro-content">
              <p className="intro-text">
                In 1975, a group of Māori leaders, led by Dame Whina Cooper, organized a march from the top of the North Island to Parliament in Wellington. The hīkoi (march) was a protest against the ongoing loss of Māori land. The arguments they made were not just emotional; they were carefully structured, powerful, and designed to persuade a nation. This handout analyzes those arguments using the PEEL structure.
              </p>
              <p className="resource-link">
                This resource is a companion to the <a href="/writers-toolkit-peel-argument-handout.html" className="link">PEEL Argument Handout</a>.
              </p>
            </div>
          </section>

          <section className="argument-deconstruction">
            <h2 className="section-title">Deconstructing the Argument</h2>
            <div className="peel-structure">
              <div className="peel-item">
                <h3 className="peel-title">P - Point: "Not one more acre of Māori land."</h3>
                <p className="peel-content">
                  This was the central, unifying point of the entire movement. It was a clear, concise, and powerful statement of their goal. It argued that the historical process of land alienation had to stop immediately.
                </p>
              </div>

              <div className="peel-item">
                <h3 className="peel-title">E - Evidence: The Memorial of Right</h3>
                <p className="peel-content">
                  The marchers carried a 'Memorial of Right' to Parliament. This document was their key piece of evidence. It detailed the specific laws and government actions that had led to the loss of millions of acres of land since the signing of the Treaty of Waitangi. It listed statutes, dates, and the exact amount of land lost, providing factual evidence to support their point.
                </p>
              </div>

              <div className="peel-item">
                <h3 className="peel-title">E - Explanation: The Betrayal of Te Tiriti</h3>
                <p className="peel-content">
                  The leaders explained that this land loss was not just an economic issue; it was a betrayal of the promises made in Te Tiriti o Waitangi. They explained that the Treaty was supposed to protect Māori tino rangatiratanga (sovereignty, self-determination), including their right to their lands. The loss of land, they explained, was a direct assault on their culture, identity, and mana.
                </p>
              </div>

              <div className="peel-item">
                <h3 className="peel-title">L - Link: A Call for Justice</h3>
                <p className="peel-content">
                  The march linked the historical evidence of land loss directly to a call for present-day action. By walking the length of the island, they physically linked the land to the seat of power in Wellington. The final link was their demand: that the government honour the Treaty, protect the remaining Māori land, and begin a process of redress for past injustices. This led directly to the creation of the Waitangi Tribunal.
                </p>
              </div>
            </div>
          </section>

          <section className="practice-section">
            <div className="practice-box">
              <h2 className="section-title">He Mahi (Practice Your Skills)</h2>
              <p className="practice-description">
                Now that you have seen a breakdown of the argument, it's your turn to analyze the primary source material yourself. The following handout contains excerpts from the 1975 Memorial of Right and a worksheet to help you build your own PEEL paragraph.
              </p>
              <a 
                href="/primary-source-analysis-1975-memorial-of-right.html" 
                className="practice-button"
              >
                Open the Analysis Worksheet
              </a>
            </div>
          </section>

          <section className="critical-thinking">
            <h2 className="section-title">Critical Thinking</h2>
            <div className="thinking-question">
              <p className="question-text">
                Why was using a structured, evidence-based argument like this more powerful than simply expressing anger or frustration? How did the PEEL structure help make their case to the government and the public?
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

          <section className="further-reading">
            <h2 className="section-title">Further Reading & Viewing</h2>
            <div className="reading-list">
              <ul className="resource-links">
                <li>
                  <a href="https://nzhistory.govt.nz/culture/maori-land-march-1975" target="_blank" rel="noopener noreferrer">
                    NZ History - The 1975 Māori Land March
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/watch?v=8-g-b-c-g-c" target="_blank" rel="noopener noreferrer">
                    The 1975 Land March - A Documentary
                  </a>
                </li>
              </ul>
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
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ArgumentsOfTinoRangatiratanga;
