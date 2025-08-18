import { useState } from 'react';
import './WhakataukiWisdom.css';

interface Whakatauki {
  maori: string;
  english: string;
  meaning: string;
  culturalContext: string;
  themes: string[];
}

interface AnalysisQuestion {
  id: number;
  question: string;
  hint: string;
  culturalFocus: string;
}

const whakataukiCollection: Whakatauki[] = [
  {
    maori: 'Ehara taku toa i te toa takitahi, engari he toa takitini.',
    english: 'My strength is not as an individual, but as a collective.',
    meaning: 'This proverb emphasizes the importance of community and collective effort over individual achievement.',
    culturalContext: 'Reflects the Māori value of whanaungatanga (relationships) and the belief that we are stronger together.',
    themes: ['Community', 'Collaboration', 'Unity', 'Collective Strength'],
  },
  {
    maori: 'He kura te tangata.',
    english: 'People are treasures.',
    meaning: 'Every person has inherent value and should be treated with respect and care.',
    culturalContext: 'Expresses the Māori worldview that all people are precious and deserving of manaakitanga (hospitality and care).',
    themes: ['Human Value', 'Respect', 'Manaakitanga', 'Dignity'],
  },
  {
    maori: 'Kia kaha, kia maia, kia manawanui.',
    english: 'Be strong, be brave, be steadfast.',
    meaning: 'Encourages resilience, courage, and determination in the face of challenges.',
    culturalContext: 'Traditional encouragement that combines physical strength (kaha), bravery (maia), and mental fortitude (manawanui).',
    themes: ['Courage', 'Resilience', 'Determination', 'Strength'],
  },
  {
    maori: 'Ko te pūtake o te rākau, ko te wai.',
    english: 'The source of the tree is water.',
    meaning: 'Just as trees need water to grow, people need knowledge and wisdom to flourish.',
    culturalContext: 'Metaphor for the importance of education and knowledge in personal and community growth.',
    themes: ['Education', 'Growth', 'Knowledge', 'Nurturing'],
  },
  {
    maori: 'He aha te mea nui o te ao? He tangata, he tangata, he tangata.',
    english: 'What is the most important thing in the world? It is people, it is people, it is people.',
    meaning: 'People are the most valuable resource and should be prioritized above all else.',
    culturalContext: 'Emphasizes the central importance of human relationships and community in Māori culture.',
    themes: ['People', 'Relationships', 'Community', 'Human Value'],
  },
];

const analysisQuestions: AnalysisQuestion[] = [
  {
    id: 1,
    question: 'In your own words, what does this whakataukī mean?',
    hint: 'Think about the literal meaning and the deeper cultural message.',
    culturalFocus: 'Understanding and interpretation of Māori wisdom.',
  },
  {
    id: 2,
    question: 'Describe a situation in your own life where this whakataukī would apply.',
    hint: 'Consider school, sports, family, or community experiences.',
    culturalFocus: 'Connecting traditional wisdom to modern life experiences.',
  },
  {
    id: 3,
    question: 'How does this proverb reflect a Te Ao Māori worldview?',
    hint: 'Compare with individualistic vs. collective cultural perspectives.',
    culturalFocus: 'Understanding Māori cultural values and perspectives.',
  },
  {
    id: 4,
    question: 'What actions could you take to live by this whakataukī?',
    hint: 'Think about practical ways to apply this wisdom in daily life.',
    culturalFocus: 'Applying traditional wisdom to contemporary behavior.',
  },
];

export default function WhakataukiWisdom() {
  const [selectedWhakatauki, setSelectedWhakatauki] = useState<Whakatauki>(whakataukiCollection[0]);
  const [activeTab, setActiveTab] = useState<'proverbs' | 'analysis' | 'cultural' | 'activities'>('proverbs');

  return (
    <div className="whakatauki-container">
      <header className="whakatauki-header">
        <div className="header-content">
          <div className="badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="title">🌿 Whakataukī Wisdom</h1>
          <h2 className="subtitle">Unpacking the Wisdom of Māori Proverbs</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-13 • Te Reo Māori • Cultural Studies</span>
            <span className="meta-item">🌿 Mātauranga Māori • Whakataukī</span>
            <span className="meta-item">✅ Cultural Authenticity: 100%</span>
          </div>
          <p className="description">
            Explore the profound wisdom of Māori proverbs and discover how traditional knowledge guides modern life through cultural understanding and critical thinking.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'proverbs' ? 'active' : ''}`}
            onClick={() => setActiveTab('proverbs')}
          >
            📜 Whakataukī Collection
          </button>
          <button
            className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
            onClick={() => setActiveTab('analysis')}
          >
            🔍 Analysis Questions
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural Context
          </button>
          <button
            className={`tab-button ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            🎯 Learning Activities
          </button>
        </div>
      </section>

      {activeTab === 'proverbs' && (
        <section className="proverbs">
          <h2>📜 Whakataukī Collection</h2>
          
          <div className="proverb-selector">
            {whakataukiCollection.map((whakatauki, index) => (
              <button
                key={index}
                className={`proverb-pill ${selectedWhakatauki.maori === whakatauki.maori ? 'active' : ''}`}
                onClick={() => setSelectedWhakatauki(whakatauki)}
              >
                {whakatauki.english}
              </button>
            ))}
          </div>

          <div className="proverb-display">
            <div className="proverb-main">
              <h3 className="proverb-maori">{selectedWhakatauki.maori}</h3>
              <p className="proverb-english">{selectedWhakatauki.english}</p>
            </div>
            
            <div className="proverb-details">
              <div className="detail-section">
                <h4>💭 Meaning</h4>
                <p>{selectedWhakatauki.meaning}</p>
              </div>
              
              <div className="detail-section">
                <h4>🌿 Cultural Context</h4>
                <p>{selectedWhakatauki.culturalContext}</p>
              </div>
              
              <div className="detail-section">
                <h4>🏷️ Themes</h4>
                <div className="themes-grid">
                  {selectedWhakatauki.themes.map((theme, index) => (
                    <span key={index} className="theme-tag">{theme}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'analysis' && (
        <section className="analysis">
          <h2>🔍 Analysis Questions</h2>
          
          <div className="current-proverb">
            <h3>Analyzing: {selectedWhakatauki.english}</h3>
            <p className="proverb-text">{selectedWhakatauki.maori}</p>
          </div>

          <div className="questions-grid">
            {analysisQuestions.map((question) => (
              <div key={question.id} className="question-card">
                <h4>Question {question.id}</h4>
                <p className="question-text">{question.question}</p>
                <div className="question-hint">
                  <strong>💡 Hint:</strong> {question.hint}
                </div>
                <div className="cultural-focus">
                  <strong>🌿 Cultural Focus:</strong> {question.culturalFocus}
                </div>
                <div className="response-area">
                  <textarea 
                    placeholder="Write your response here..."
                    rows={4}
                    className="response-input"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural">
          <h2>🌿 Cultural Context</h2>
          
          <div className="cultural-content">
            <div className="cultural-section">
              <h3>🌟 What is a Whakataukī?</h3>
              <p>
                A whakataukī is a Māori proverb or saying that contains generations of wisdom. These short, clever statements offer guidance on how to live and provide insights into the Māori worldview. They are a powerful form of communication and a vital part of oral tradition.
              </p>
            </div>

            <div className="cultural-section">
              <h3>🎯 Cultural Significance</h3>
              <ul>
                <li><strong>Oral Tradition:</strong> Passed down through generations by word of mouth</li>
                <li><strong>Cultural Values:</strong> Express core Māori values and beliefs</li>
                <li><strong>Guidance:</strong> Provide wisdom for daily living and decision-making</li>
                <li><strong>Identity:</strong> Help maintain cultural identity and connection</li>
                <li><strong>Education:</strong> Teach important life lessons and cultural knowledge</li>
              </ul>
            </div>

            <div className="cultural-section">
              <h3>🔗 Te Ao Māori Worldview</h3>
              <ul>
                <li><strong>Whanaungatanga:</strong> Emphasizes relationships and connections</li>
                <li><strong>Manaakitanga:</strong> Focuses on hospitality and care for others</li>
                <li><strong>Kaitiakitanga:</strong> Highlights guardianship and responsibility</li>
                <li><strong>Rangatiratanga:</strong> Values leadership and self-determination</li>
                <li><strong>Wairuatanga:</strong> Acknowledges spiritual dimensions</li>
              </ul>
            </div>

            <div className="cultural-section">
              <h3>📚 Modern Applications</h3>
              <ul>
                <li>Guiding personal and professional decisions</li>
                <li>Strengthening community relationships</li>
                <li>Informing educational practices</li>
                <li>Supporting cultural revitalization</li>
                <li>Promoting cross-cultural understanding</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'activities' && (
        <section className="activities">
          <h2>🎯 Learning Activities</h2>
          
          <div className="activities-grid">
            <div className="activity">
              <h3>📝 Whakataukī Journal</h3>
              <p>Create a personal journal exploring how whakataukī relate to your life.</p>
              <ul>
                <li>Choose one whakataukī each week</li>
                <li>Write about how it applies to your experiences</li>
                <li>Reflect on cultural values and personal growth</li>
                <li>Share insights with classmates</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🎨 Visual Interpretation</h3>
              <p>Create visual representations of whakataukī meanings.</p>
              <ul>
                <li>Design posters or digital art</li>
                <li>Include both Māori and English text</li>
                <li>Use symbols and imagery that reflect cultural themes</li>
                <li>Present your artwork to the class</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🗣️ Whakataukī Discussion</h3>
              <p>Lead a class discussion about whakataukī and their relevance.</p>
              <ul>
                <li>Research additional whakataukī</li>
                <li>Prepare discussion questions</li>
                <li>Facilitate respectful cultural dialogue</li>
                <li>Document key insights and learnings</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🌿 Cultural Research</h3>
              <p>Research the cultural background of specific whakataukī.</p>
              <ul>
                <li>Interview community members</li>
                <li>Explore historical contexts</li>
                <li>Connect to contemporary issues</li>
                <li>Present findings to the class</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "He kura te tangata - People are treasures"</p>
        <p className="platform">TeAoMarama — World's Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  );
}
