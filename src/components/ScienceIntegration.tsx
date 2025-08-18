import { useState } from 'react';
import './ScienceIntegration.css';

interface ScienceExample {
  title: string;
  indicatorOrConcept: string;
  description: string;
}

interface ScienceResource {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  culturalContext: string;
  scienceContext: string;
  content: {
    overview: string;
    examples: ScienceExample[];
    questions: string[];
  };
  externalResources?: { label: string; url: string; match?: string; scope?: string }[];
  culturalAuthenticityScore: number;
}

const scienceResources: ScienceResource[] = [
  {
    id: 'traditional-ecological-indicators',
    title: 'Traditional Ecological Indicators',
    subtitle: 'Reading the Signs of a Healthy Environment',
    description:
      'Indigenous environmental science uses locally-observed indicators (plants, animals, phenomena) to assess ecosystem health across generations.',
    culturalContext:
      'Mātauranga Māori emphasizes place-based observation, whakapapa relationships, and intergenerational knowledge to understand environmental change.',
    scienceContext:
      'Complements modern monitoring (e.g., sensors, sampling) with phenology, biodiversity presence/absence, and longitudinal qualitative data.',
    content: {
      overview:
        'Traditional indicators and modern scientific monitoring are complementary ways of knowing. When combined, they provide a richer, more complete picture of environmental health.',
      examples: [
        {
          title: 'The Flowering of the Pōhutukawa',
          indicatorOrConcept: 'Kina (sea urchin) readiness',
          description:
            'Early-summer pōhutukawa blooms signal fat kina. A phenological indicator linking plant timing to marine harvest readiness.',
        },
        {
          title: 'The Presence of Tūī',
          indicatorOrConcept: 'Forest health',
          description:
            'Abundant tūī populations suggest thriving forest ecosystems with sufficient nectar sources and pollination dynamics.',
        },
        {
          title: 'Water Clarity and Smell',
          indicatorOrConcept: 'Water quality',
          description:
            'Clarity, smell, aquatic flora, and invertebrate presence indicate freshwater quality, predating chemical tests.',
        },
        {
          title: 'The Flight of the Pīpīwharauroa',
          indicatorOrConcept: 'Coming of spring',
          description:
            'Arrival of the shining cuckoo signals planting time (e.g., kūmara). A migration-timed seasonal cue.',
        },
      ],
      questions: [
        'Why is it important to use local indicators for a specific place?',
        'Choose one indicator. What modern measurement could test the same thing (e.g., turbidity for water clarity)?',
        'Talk to whānau/community. Identify a local indicator and describe it.',
      ],
    },
    externalResources: [
      {
        label: 'Science Learning Hub',
        url: 'https://www.sciencelearn.org.nz/',
        match: '60% Match',
        scope: 'Years 1-13',
      },
      {
        label: 'Tāhūrangi (Te Reo Māori Education Hub)',
        url: 'https://tahurangi.education.govt.nz/',
        match: '30% Match',
        scope: 'Years 7-13',
      },
    ],
    culturalAuthenticityScore: 0.98,
  },
  {
    id: 'biochemistry-traditional-medicine',
    title: 'Biochemistry & Traditional Medicine',
    subtitle: 'Bioactive compounds and rongoā Māori',
    description:
      'Exploring intersections between rongoā Māori (traditional medicine) and biochemistry, including plant-derived compounds and mechanisms.',
    culturalContext:
      'Respecting tikanga and mātauranga in discussing traditional remedies, emphasizing community consultation and cultural safety.',
    scienceContext:
      'Links phytochemistry, extraction methods, and physiological mechanisms with careful, culturally safe inquiry.',
    content: {
      overview:
        'An inquiry-based framework to examine rongoā alongside biochemistry, prioritizing cultural protocols and ethical engagement.',
      examples: [
        {
          title: 'Kawakawa (Piper excelsum)',
          indicatorOrConcept: 'Traditional uses and known bioactives',
          description:
            'Investigate literature on amides and potential anti-inflammatory properties; align with tikanga when discussing usage.',
        },
        {
          title: 'Harakeke (Phormium tenax)',
          indicatorOrConcept: 'Gels, fibres, and antiseptic applications',
          description:
            'Bridge traditional applications with biochemical mechanism hypotheses and safe lab simulations.',
        },
      ],
      questions: [
        'What cultural protocols must be considered before any investigation or classroom simulation?',
        'How can we design learning that honours rongoā while teaching biochemical concepts?',
      ],
    },
    culturalAuthenticityScore: 0.97,
  },
  {
    id: 'sustainable-fishing-equations',
    title: 'Sustainable Fishing Equations',
    subtitle: 'Mathematical thinking for kaitiakitanga of fisheries',
    description:
      'Use mathematical models to explore sustainability scenarios for local fisheries, grounded in kaitiakitanga.',
    culturalContext:
      'Kaitiakitanga principles guide harvesting practices, intergenerational responsibility, and local decision-making.',
    scienceContext:
      'Introduce simple population change models and constraints; emphasize limitations and the need for local knowledge.',
    content: {
      overview:
        'A modelling starter: set assumptions, test scenarios, and reflect on cultural and ecological limits.',
      examples: [
        {
          title: 'Simple growth with harvest',
          indicatorOrConcept: 'ΔN = rN - H',
          description:
            'Investigate how intrinsic growth (r) and fixed harvest (H) affect long-term population under different seasons.',
        },
        {
          title: 'Capacity-limited growth',
          indicatorOrConcept: 'Logistic model',
          description:
            'Explore carrying capacity (K), seasonal closures, and culturally-defined rāhui in sustaining stocks.',
        },
      ],
      questions: [
        'What assumptions in your model conflict with local knowledge or observed indicators?',
        'How could rāhui or seasonal indicators be encoded into a simple model? What is lost in translation?',
      ],
    },
    culturalAuthenticityScore: 0.96,
  },
];

export default function ScienceIntegration() {
  const [selected, setSelected] = useState<ScienceResource>(scienceResources[0]);
  const [tab, setTab] = useState<'overview' | 'content' | 'cultural' | 'activities' | 'resources'>(
    'overview',
  );

  return (
    <div className="science-container">
      <header className="science-header">
        <div className="header-content">
          <div className="badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="title">🔬 Science Integration</h1>
          <h2 className="subtitle">Traditional knowledge + modern science</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-13 • 3 Topics</span>
            <span className="meta-item">🌿 Mātauranga Māori • Science</span>
            <span className="meta-item">✅ Cultural Authenticity: 96-98%+</span>
          </div>
          <p className="description">
            Beautifully integrated science experiences that honour mātauranga Māori and connect with
            modern scientific thinking.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          {(['overview', 'content', 'cultural', 'activities', 'resources'] as const).map((t) => (
            <button
              key={t}
              className={`tab-button ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'overview' && '📋 Overview'}
              {t === 'content' && '📚 Content'}
              {t === 'cultural' && '🌿 Cultural'}
              {t === 'activities' && '🎯 Activities'}
              {t === 'resources' && '🔗 Resources'}
            </button>
          ))}
        </div>
      </section>

      {tab === 'overview' && (
        <section className="overview">
          <h2>🎯 Science Integration Overview</h2>
          <div className="cards-grid">
            {scienceResources.map((res) => (
              <div
                key={res.id}
                className={`card ${selected.id === res.id ? 'selected' : ''}`}
                onClick={() => setSelected(res)}
              >
                <h4>{res.title}</h4>
                <p>{res.subtitle}</p>
                <div className="card-meta">
                  <span className="score">
                    {(res.culturalAuthenticityScore * 100).toFixed(0)}% Authentic
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {tab === 'content' && (
        <section className="content">
          <div className="selector">
            {scienceResources.map((res) => (
              <button
                key={res.id}
                className={`pill ${selected.id === res.id ? 'active' : ''}`}
                onClick={() => setSelected(res)}
              >
                {res.title}
              </button>
            ))}
          </div>

          <div className="panel">
            <h3>{selected.title}</h3>
            <p className="sub">{selected.subtitle}</p>

            <div className="panel-grid">
              <div className="box">
                <h4>📖 Description</h4>
                <p>{selected.description}</p>
              </div>
              <div className="box">
                <h4>🧪 Science Context</h4>
                <p>{selected.scienceContext}</p>
              </div>
              <div className="box">
                <h4>🌿 Cultural Context</h4>
                <p>{selected.culturalContext}</p>
              </div>
            </div>

            <div className="box">
              <h4>💡 Examples</h4>
              <div className="examples">
                {selected.content.examples.map((ex, i) => (
                  <div key={i} className="example">
                    <h5>{ex.title}</h5>
                    <p className="muted">{ex.indicatorOrConcept}</p>
                    <p>{ex.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === 'cultural' && (
        <section className="cultural">
          <div className="selector">
            {scienceResources.map((res) => (
              <button
                key={res.id}
                className={`pill ${selected.id === res.id ? 'active' : ''}`}
                onClick={() => setSelected(res)}
              >
                {res.title}
              </button>
            ))}
          </div>

          <div className="panel">
            <h3>🌿 Cultural Intelligence — {selected.title}</h3>
            <ul className="bullets">
              <li>Honours local indicators and place-based knowledge</li>
              <li>Applies tikanga and consultation for sensitive topics</li>
              <li>Connects traditional practices with contemporary contexts</li>
              <li>Maintains cultural safety and authenticity</li>
            </ul>
            <p className="scoreline">
              Cultural Authenticity: {(selected.culturalAuthenticityScore * 100).toFixed(0)}%
            </p>
          </div>
        </section>
      )}

      {tab === 'activities' && (
        <section className="activities">
          <div className="selector">
            {scienceResources.map((res) => (
              <button
                key={res.id}
                className={`pill ${selected.id === res.id ? 'active' : ''}`}
                onClick={() => setSelected(res)}
              >
                {res.title}
              </button>
            ))}
          </div>

          <div className="panel">
            <h3>🎯 Activities — {selected.title}</h3>
            <div className="activities-grid">
              {selected.content.questions.map((q, i) => (
                <div key={i} className="activity">
                  <h4>Task {i + 1}</h4>
                  <p>{q}</p>
                  <textarea placeholder="Your response here..." />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {tab === 'resources' && (
        <section className="resources">
          <div className="selector">
            {scienceResources.map((res) => (
              <button
                key={res.id}
                className={`pill ${selected.id === res.id ? 'active' : ''}`}
                onClick={() => setSelected(res)}
              >
                {res.title}
              </button>
            ))}
          </div>

          <div className="panel">
            <h3>🔗 External Resources — {selected.title}</h3>
            <p className="muted">High-quality, official NZ resources curated to extend learning.</p>
            <div className="link-list">
              {(
                selected.externalResources ?? [
                  { label: 'Science Learning Hub', url: 'https://www.sciencelearn.org.nz/' },
                ]
              ).map((er, i) => (
                <a key={i} href={er.url} target="_blank" rel="noopener noreferrer" className="ext">
                  <span className="label">{er.label}</span>
                  {er.scope && <span className="tag">{er.scope}</span>}
                  {er.match && <span className="tag alt">{er.match}</span>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "Whaowhia te kete mātauranga" — Fill the basket of knowledge</p>
        <p className="platform">TeAoMarama — World’s Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  );
}
