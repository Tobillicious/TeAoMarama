import React from 'react';
import '../../../styles/te-kete-synthesis.css';
import { Card } from '../../Card';

interface ArtOfHakaProps {
  culturalContext?: string;
  yearLevel?: string;
  subject?: string;
}

const ArtOfHaka: React.FC<ArtOfHakaProps> = ({
  culturalContext = 'Māori performing arts and cultural expression',
  yearLevel = 'Year 7-10',
  subject = 'Social Studies, Te Reo Māori, Arts',
}) => {
  return (
    <div className="art-of-haka">
      <Card title="The Art of Haka" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Art of Haka</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <section className="video-resource">
            <h2 className="section-title">Kapa Haka | NPR Video Resource</h2>
            <p className="resource-description">
              This handout supports the video "Kapa Haka | NPR" which explores the cultural
              significance and performance elements of haka.
            </p>
            <div className="video-link">
              <a
                href="https://www.youtube.com/watch?v=QIwLu22b6QU"
                target="_blank"
                rel="noopener noreferrer"
                className="video-button"
              >
                <span className="video-icon">🎬</span>
                Watch the Video
              </a>
            </div>
          </section>

          <section className="discussion-points">
            <h2 className="section-title">Key Discussion Points</h2>

            <div className="points-container">
              <div className="discussion-point">
                <h3 className="point-title">1. Elements of Kapa Haka Performance</h3>
                <p className="point-description">
                  Explore the different components that make up a complete kapa haka performance,
                  including waiata, haka, poi, and whaikōrero.
                </p>
                <div className="cultural-note">
                  <span className="cultural-icon">🌿</span>
                  <span>
                    Kapa haka combines multiple art forms to tell stories and express cultural
                    identity
                  </span>
                </div>
              </div>

              <div className="discussion-point">
                <h3 className="point-title">2. Cultural Significance of Haka</h3>
                <p className="point-description">
                  Understand the deep cultural meaning behind haka as a form of communication,
                  celebration, challenge, and storytelling.
                </p>
                <div className="cultural-note">
                  <span className="cultural-icon">🌿</span>
                  <span>
                    Haka serves multiple purposes beyond performance - it's a living cultural
                    practice
                  </span>
                </div>
              </div>

              <div className="discussion-point">
                <h3 className="point-title">3. Haka and Māori Identity</h3>
                <p className="point-description">
                  Examine how haka connects to Māori identity, whakapapa, and the transmission of
                  cultural knowledge across generations.
                </p>
                <div className="cultural-note">
                  <span className="cultural-icon">🌿</span>
                  <span>Haka preserves and transmits cultural knowledge and values</span>
                </div>
              </div>
            </div>
          </section>

          <section className="reflection-questions">
            <h2 className="section-title">Reflection Questions</h2>

            <div className="questions-container">
              <div className="reflection-question">
                <p className="question-text">
                  What emotions and messages do you think the performers are trying to convey
                  through their haka?
                </p>
                <div className="response-area">
                  <textarea
                    className="response-textarea"
                    placeholder="Write your thoughts here..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="reflection-question">
                <p className="question-text">
                  How does haka compare to other forms of cultural expression you've learned about?
                </p>
                <div className="response-area">
                  <textarea
                    className="response-textarea"
                    placeholder="Write your thoughts here..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="reflection-question">
                <p className="question-text">
                  What role do you think performing arts play in preserving and sharing cultural
                  knowledge?
                </p>
                <div className="response-area">
                  <textarea
                    className="response-textarea"
                    placeholder="Write your thoughts here..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="cultural-connections">
            <h2 className="section-title">
              <span className="cultural-icon">🌿</span>
              Ngā Hononga Ahurea - Cultural Connections
            </h2>

            <div className="connections-grid">
              <div className="connection-item">
                <h4 className="connection-title">Whakapapa</h4>
                <p className="connection-description">
                  How haka connects to family and tribal history, passing down stories and knowledge
                  through generations.
                </p>
              </div>

              <div className="connection-item">
                <h4 className="connection-title">Mana</h4>
                <p className="connection-description">
                  The power and prestige that comes from performing haka with skill, respect, and
                  cultural understanding.
                </p>
              </div>

              <div className="connection-item">
                <h4 className="connection-title">Kaitiakitanga</h4>
                <p className="connection-description">
                  The responsibility to care for and preserve cultural practices like haka for
                  future generations.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ArtOfHaka;
