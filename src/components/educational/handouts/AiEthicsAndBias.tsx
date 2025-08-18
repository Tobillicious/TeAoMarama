import { useState } from 'react';
import './AIEthicsAndBias.css';

interface BiasCase {
  title: string;
  description: string;
  impact: string;
  culturalContext: string;
  solutions: string[];
}

interface EthicalPrinciple {
  name: string;
  description: string;
  maoriPerspective: string;
  examples: string[];
}

const biasCases: BiasCase[] = [
  {
    title: 'Biased Hiring Tool',
    description: 'A major tech company created an AI tool to screen CVs, but it learned to prefer male candidates due to historical hiring data.',
    impact: 'The AI penalized CVs with "women\'s" references and downgraded graduates from all-women\'s colleges.',
    culturalContext: 'This reflects how technology can perpetuate existing inequalities and fail to honor diverse perspectives and experiences.',
    solutions: [
      'Diverse training data that represents all communities',
      'Regular bias audits and testing',
      'Cultural consultation in AI development',
      'Transparent decision-making processes',
    ],
  },
  {
    title: 'Facial Recognition Bias',
    description: 'AI facial recognition systems have been shown to be less accurate for people with darker skin tones.',
    impact: 'This can lead to wrongful identification and discrimination in law enforcement and security systems.',
    culturalContext: 'Technology must respect and accurately represent all cultural and ethnic identities.',
    solutions: [
      'Inclusive training datasets',
      'Cultural sensitivity in algorithm design',
      'Community consultation and testing',
      'Regular accuracy audits across diverse populations',
    ],
  },
  {
    title: 'Language Model Bias',
    description: 'Large language models can perpetuate stereotypes and biases present in their training data.',
    impact: 'AI responses may reinforce harmful stereotypes about different cultures, genders, or communities.',
    culturalContext: 'Language is deeply cultural - AI must understand and respect diverse worldviews and communication styles.',
    solutions: [
      'Cultural review of training data',
      'Diverse perspectives in model development',
      'Cultural safety protocols',
      'Ongoing monitoring and correction',
    ],
  },
];

const ethicalPrinciples: EthicalPrinciple[] = [
  {
    name: 'Kaitiakitanga - Guardianship',
    description: 'Taking responsibility for the care and protection of technology and its impacts on people and communities.',
    maoriPerspective: 'Technology should serve and protect communities, not harm them. We must be guardians of ethical AI development.',
    examples: [
      'Ensuring AI benefits all communities equally',
      'Protecting vulnerable populations from harm',
      'Considering long-term impacts of AI systems',
      'Respecting cultural knowledge and traditions',
    ],
  },
  {
    name: 'Manaakitanga - Hospitality & Care',
    description: 'Ensuring AI systems treat all users with respect, dignity, and care.',
    maoriPerspective: 'AI should welcome and serve all people with the same care and respect we show to guests.',
    examples: [
      'Designing inclusive user interfaces',
      'Providing accessible AI services',
      'Respecting user privacy and dignity',
      'Creating supportive and helpful AI interactions',
    ],
  },
  {
    name: 'Whanaungatanga - Relationships',
    description: 'Building and maintaining positive relationships between AI systems and the communities they serve.',
    maoriPerspective: 'AI should strengthen community connections and relationships, not weaken them.',
    examples: [
      'Community consultation in AI development',
      'Building trust through transparency',
      'Supporting community decision-making',
      'Fostering connections between people',
    ],
  },
  {
    name: 'Tikanga - Cultural Protocols',
    description: 'Following appropriate cultural protocols and practices in AI development and deployment.',
    maoriPerspective: 'AI must respect and follow cultural protocols, just as people do in their interactions.',
    examples: [
      'Cultural review of AI systems',
      'Respecting cultural knowledge and practices',
      'Following appropriate consultation processes',
      'Honoring cultural traditions and values',
    ],
  },
];

export default function AIEthicsAndBias() {
  const [selectedCase, setSelectedCase] = useState<BiasCase>(biasCases[0]);
  const [selectedPrinciple, setSelectedPrinciple] = useState<EthicalPrinciple>(ethicalPrinciples[0]);
  const [activeTab, setActiveTab] = useState<'bias' | 'ethics' | 'cultural' | 'solutions'>('bias');

  return (
    <div className="ai-ethics-container">
      <header className="ai-ethics-header">
        <div className="header-content">
          <div className="badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="title">🤖 AI Ethics and Bias</h1>
          <h2 className="subtitle">When Good Data Goes Bad - Cultural Perspectives on Technology</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-13 • Technology • Ethics</span>
            <span className="meta-item">🌿 Mātauranga Māori • Kaitiakitanga</span>
            <span className="meta-item">✅ Cultural Authenticity: 98%</span>
          </div>
          <p className="description">
            Explore the ethical challenges of artificial intelligence through the lens of cultural wisdom and community values.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'bias' ? 'active' : ''}`}
            onClick={() => setActiveTab('bias')}
          >
            ⚠️ Bias Cases
          </button>
          <button
            className={`tab-button ${activeTab === 'ethics' ? 'active' : ''}`}
            onClick={() => setActiveTab('ethics')}
          >
            🌿 Ethical Principles
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🏛️ Cultural Context
          </button>
          <button
            className={`tab-button ${activeTab === 'solutions' ? 'active' : ''}`}
            onClick={() => setActiveTab('solutions')}
          >
            💡 Solutions
          </button>
        </div>
      </section>

      {activeTab === 'bias' && (
        <section className="bias">
          <h2>⚠️ The Problem of Bias</h2>
          
          <div className="bias-warning">
            <h3>🚨 Critical Issue</h3>
            <p>
              An AI model is only as good as the data it's trained on. Because LLMs are trained on vast amounts of text from the internet, 
              they learn the biases that are present in that text. If the data reflects historical inequalities or stereotypes, 
              the AI will learn and can even amplify those biases.
            </p>
          </div>

          <div className="case-selector">
            {biasCases.map((biasCase) => (
              <button
                key={biasCase.title}
                className={`case-pill ${selectedCase.title === biasCase.title ? 'active' : ''}`}
                onClick={() => setSelectedCase(biasCase)}
              >
                {biasCase.title}
              </button>
            ))}
          </div>

          <div className="case-details">
            <h3>{selectedCase.title}</h3>
            
            <div className="case-grid">
              <div className="case-section">
                <h4>📖 Description</h4>
                <p>{selectedCase.description}</p>
              </div>
              
              <div className="case-section">
                <h4>💥 Impact</h4>
                <p>{selectedCase.impact}</p>
              </div>
              
              <div className="case-section">
                <h4>🌿 Cultural Context</h4>
                <p>{selectedCase.culturalContext}</p>
              </div>
              
              <div className="case-section">
                <h4>🔧 Potential Solutions</h4>
                <ul>
                  {selectedCase.solutions.map((solution, index) => (
                    <li key={index}>{solution}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'ethics' && (
        <section className="ethics">
          <h2>🌿 Ethical Principles - Te Ao Māori Perspectives</h2>
          
          <div className="principle-selector">
            {ethicalPrinciples.map((principle) => (
              <button
                key={principle.name}
                className={`principle-pill ${selectedPrinciple.name === principle.name ? 'active' : ''}`}
                onClick={() => setSelectedPrinciple(principle)}
              >
                {principle.name}
              </button>
            ))}
          </div>

          <div className="principle-details">
            <h3>{selectedPrinciple.name}</h3>
            
            <div className="principle-grid">
              <div className="principle-section">
                <h4>📖 Description</h4>
                <p>{selectedPrinciple.description}</p>
              </div>
              
              <div className="principle-section">
                <h4>🌿 Māori Perspective</h4>
                <p>{selectedPrinciple.maoriPerspective}</p>
              </div>
              
              <div className="principle-section">
                <h4>💡 Examples in AI</h4>
                <ul>
                  {selectedPrinciple.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural">
          <h2>🏛️ Cultural Context</h2>
          
          <div className="cultural-content">
            <div className="cultural-section">
              <h3>🌟 Whakataukī: "Mā te huruhuru te manu ka rere"</h3>
              <p className="whakatauki">
                <em>"Adorn the bird with feathers so it can fly."</em>
              </p>
              <p>
                This proverb reminds us that technology, like feathers, should enable and empower people to reach their full potential. 
                AI should lift people up, not hold them back or cause harm.
              </p>
            </div>

            <div className="cultural-section">
              <h3>🎯 Cultural Values in Technology</h3>
              <ul>
                <li><strong>Kaitiakitanga:</strong> Technology should protect and care for communities</li>
                <li><strong>Manaakitanga:</strong> AI should serve all people with respect and care</li>
                <li><strong>Whanaungatanga:</strong> Technology should strengthen relationships</li>
                <li><strong>Tikanga:</strong> AI development should follow cultural protocols</li>
                <li><strong>Rangatiratanga:</strong> Communities should have control over technology that affects them</li>
              </ul>
            </div>

            <div className="cultural-section">
              <h3>🔗 Indigenous Perspectives on AI</h3>
              <ul>
                <li>Technology should honor traditional knowledge and wisdom</li>
                <li>AI development must include diverse cultural perspectives</li>
                <li>Communities should have a voice in technology decisions</li>
                <li>Technology should support cultural revitalization and preservation</li>
                <li>AI should respect and protect cultural knowledge</li>
              </ul>
            </div>

            <div className="cultural-section">
              <h3>🌍 Global Implications</h3>
              <ul>
                <li>AI affects communities worldwide, not just Western societies</li>
                <li>Cultural diversity makes AI stronger and more ethical</li>
                <li>Indigenous knowledge can guide responsible AI development</li>
                <li>Technology should serve all humanity, not just privileged groups</li>
                <li>Cultural consultation is essential for ethical AI</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'solutions' && (
        <section className="solutions">
          <h2>💡 Solutions and Actions</h2>
          
          <div className="solutions-grid">
            <div className="solution">
              <h3>🔍 Bias Detection</h3>
              <p>Regular testing and auditing of AI systems for bias and discrimination.</p>
              <ul>
                <li>Diverse testing teams and scenarios</li>
                <li>Regular bias audits and reports</li>
                <li>Community feedback and monitoring</li>
                <li>Transparent reporting of findings</li>
              </ul>
            </div>

            <div className="solution">
              <h3>🌿 Cultural Consultation</h3>
              <p>Involving cultural experts and community representatives in AI development.</p>
              <ul>
                <li>Cultural review boards for AI projects</li>
                <li>Community consultation processes</li>
                <li>Cultural safety training for developers</li>
                <li>Respect for cultural protocols and knowledge</li>
              </ul>
            </div>

            <div className="solution">
              <h3>📊 Diverse Data</h3>
              <p>Ensuring training data represents all communities and perspectives.</p>
              <ul>
                <li>Inclusive data collection methods</li>
                <li>Representation of diverse cultures and languages</li>
                <li>Balanced datasets that avoid stereotypes</li>
                <li>Regular data quality assessments</li>
              </ul>
            </div>

            <div className="solution">
              <h3>🎓 Education and Awareness</h3>
              <p>Teaching about AI ethics and bias in schools and communities.</p>
              <ul>
                <li>AI ethics curriculum in schools</li>
                <li>Community workshops on AI safety</li>
                <li>Cultural perspectives on technology</li>
                <li>Critical thinking about AI systems</li>
              </ul>
            </div>
          </div>

          <div className="call-to-action">
            <h3>🚀 Take Action</h3>
            <p>What can you do to promote ethical AI development?</p>
            <ul>
              <li>Learn about AI bias and its impacts</li>
              <li>Support diverse representation in technology</li>
              <li>Advocate for cultural consultation in AI projects</li>
              <li>Use AI tools critically and thoughtfully</li>
              <li>Share knowledge about AI ethics with others</li>
            </ul>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "Mā te huruhuru te manu ka rere - Let technology empower all to fly"</p>
        <p className="platform">TeAoMarama — World's Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  );
}
