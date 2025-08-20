import React from 'react'
import './MaoriBattalionLegacy.css'

interface MaoriBattalionLegacyProps {,
culturalAuthenticityScore: number // 0-1,
difficultyLevel: 'beginner' | 'intermediate' | 'advanced',
subjectArea: 'social-studies' | 'history' | 'cultural-studies',
yearLevel: 'year-8' | 'year-9' | 'year-10'}
const MaoriBattalionLegacy: React.FC<MaoriBattalionLegacyProps> = (_{
culturalAuthenticityScore = 0.98, 
_difficultyLevel = 'intermediate', 
_subjectArea = 'social-studies', 
_yearLevel = 'year-9', 
_}) => {
return (
    <div className="maori-battalion-legacy">
      {/* Cultural Header with Whakataukī */}
      <header className="cultural-header">
        <div className="whakatauki-banner">
          <div className="whakatauki-text">
            <h2 className="maori-text">"He kōrero te kai a te rangatira."</h2>
            <p className="english-translation">Speech is the food of chiefs.</p>
          </div>
          <div className="cultural-authenticity-badge">
            <span className="authenticity-score">
              {Math.round(culturalAuthenticityScore * 100)}%
            </span>
            <span className="authenticity-label">Cultural Authenticity</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="content-area">
        <div className="handout-container">
          <h1 className="handout-title">The Legacy of the Māori Battalion</h1>

          <div className="metadata-bar">
            <span className="difficulty-badge difficulty-intermediate">{difficultyLevel}</span>
            <span className="subject-badge subject-social-studies">{subjectArea}</span>
            <span className="year-badge year-9">{yearLevel}</span>
          </div>

          {/* Introduction Section */}
          <section className="content-section">
            <h2 className="section-title">Introduction</h2>
            <p className="content-text">
The 28th (Māori) Battalion, also known as Te Hokowhitu-a-Tū, was one of the most
decorated units in the New Zealand Army during World War II. This handout explores the
battalion's formation, achievements, and lasting impact on Māori communities and New
Zealand society.
            </p>
          </section>

          {/* Key Learning Objectives */}
          <section className="learning-objectives">
            <h2 className="section-title">Learning Objectives</h2>
            <div className="objectives-grid">
              <div className="objective-card">
                <h3>Historical Understanding</h3>
                <p>Analyze the formation and role of the Māori Battalion in World War II</p>
              </div>
              <div className="objective-card">
                <h3>Cultural Significance</h3>
                <p>Explore the cultural values and traditions that guided the battalion</p>
              </div>
              <div className="objective-card">
                <h3>Social Impact</h3>
                <p>Examine the lasting effects on Māori communities and New Zealand society</p>
              </div>
            </div>
          </section>

          {/* Historical Context */}
          <section className="content-section">
            <h2 className="section-title">Historical Context</h2>
            <div className="timeline-container">
              <div className="timeline-event">
                <div className="event-date">1939</div>
                <div className="event-content">
                  <h4>World War II Begins</h4>
                  <p>
New Zealand declares war on Germany, Māori leaders begin discussions about Māori
participation
                  </p>
                </div>
              </div>
              <div className="timeline-event">
                <div className="event-date">1940</div>
                <div className="event-content">
                  <h4>Battalion Formation</h4>
                  <p>
The 28th (Māori) Battalion is officially formed, drawing volunteers from across
Aotearoa
                  </p>
                </div>
              </div>
              <div className="timeline-event">
                <div className="event-date">1941-1945</div>
                <div className="event-content">
                  <h4>Active Service</h4>
                  <p>
The battalion serves in Greece, Crete, North Africa, and Italy, earning numerous
decorations
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Cultural Values */}
          <section className="content-section cultural-values">
            <h2 className="section-title">Cultural Values in Action</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Mana</h3>
                <p>
Honor and prestige - The battalion maintained the mana of their iwi and ancestors
                </p>
              </div>
              <div className="value-card">
                <h3>Whanaungatanga</h3>
                <p>
Relationships and kinship - Strong bonds between soldiers supported their
effectiveness
                </p>
              </div>
              <div className="value-card">
                <h3>Kaitiakitanga</h3>
                <p>Guardianship - Protecting their homeland and future generations</p>
              </div>
              <div className="value-card">
                <h3>Tino Rangatiratanga</h3>
                <p>Self-determination - Māori choosing to serve and contribute to the war effort</p>
              </div>
            </div>
          </section>

          {/* Legacy and Impact */}
          <section className="content-section">
            <h2 className="section-title">Legacy and Impact</h2>
            <div className="legacy-points">
              <div className="legacy-point">
                <h3>Social Change</h3>
                <p>
The battalion's success challenged stereotypes and contributed to greater
recognition of Māori capabilities
                </p>
              </div>
              <div className="legacy-point">
                <h3>Cultural Pride</h3>
                <p>Strengthened Māori cultural identity and pride in their heritage</p>
              </div>
              <div className="legacy-point">
                <h3>Political Influence</h3>
                <p>
Veterans became leaders in Māori communities and contributed to post-war social
movements
                </p>
              </div>
            </div>
          </section>

          {/* Reflection Questions */}
          <section className="reflection-section">
            <h2 className="section-title">Reflection Questions</h2>
            <div className="questions-list">
              <div className="question-item">
                <h3>Historical Analysis</h3>
                <p>
How did the Māori Battalion's experiences reflect both the challenges and
opportunities of Māori participation in New Zealand society?
                </p>
              </div>
              <div className="question-item">
                <h3>Cultural Understanding</h3>
                <p>
What cultural values do you think were most important to the battalion's success
and cohesion?
                </p>
              </div>
              <div className="question-item">
                <h3>Contemporary Relevance</h3>
                <p>
How does the legacy of the Māori Battalion continue to influence New Zealand
society today?
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer with Cultural Elements */}
      <footer className="cultural-footer">
        <div className="footer-content">
          <p className="footer-text">
            <span className="maori-text">"Kia kaha, kia maia, kia manawanui"</span>
            <span className="english-text"> - Be strong, be brave, be steadfast</span>
          </p>
          <div className="cultural-credits">
            <span>Te Kete Ako - Mātauranga Māori Integration</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MaoriBattalionLegacy
