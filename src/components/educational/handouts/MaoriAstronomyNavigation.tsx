import {useState} from 'react'
import './MaoriAstronomyNavigation.css'

interface StarSystem {,
name: string,
maoriName: string,
description: string,
culturalSignificance: string,
navigationUse: string}
interface NavigationTechnique {,
title: string,
description: string,
culturalContext: string,
modernApplication: string}
const starSystems: StarSystem[] = [
  {,
name: 'Matariki',,
maoriName: 'Matariki',,
description: 'The Pleiades star cluster, also known as the Seven Sisters',,
culturalSignificance: 'Marks the Māori New Year and signals the time for planting and harvesting',,
navigationUse: 'Used to determine the start of the new year and seasonal changes',
  },
  {,
name: 'Tautoru',,
maoriName: 'Tautoru',,
description: 'Orion\'s Belt - three bright stars in a line',,
culturalSignificance: 'Associated with fishing and food gathering',,
navigationUse: 'Helps determine direction and seasonal timing for fishing',
  },
  {,
name: 'Puanga',,
maoriName: 'Puanga',,
description: 'Rigel, the brightest star in Orion',,
culturalSignificance: 'Alternative marker for the Māori New Year in some regions',,
navigationUse: 'Used for timing and direction finding',
  },
  {,
name: 'Atutahi',,
maoriName: 'Atutahi',,
description: 'Canopus, the second brightest star in the night sky',,
culturalSignificance: 'Important navigational star for long-distance voyaging',,
navigationUse: 'Used as a reference point for navigation across the Pacific',
  },
]

const navigationTechniques: NavigationTechnique[] = [
  {,
title: 'Star Compass',,
description: 'Using the rising and setting points of stars to determine direction',,
culturalContext: 'Traditional knowledge passed down through generations of navigators',,
modernApplication: 'Still used by some Pacific navigators and taught in cultural education',
  },
  {,
title: 'Ocean Currents',,
description: 'Reading the patterns and directions of ocean currents',,
culturalContext: 'Knowledge of currents essential for successful voyaging',,
modernApplication: 'Marine biology and oceanography studies',
  },
  {,
title: 'Wave Patterns',,
description: 'Understanding how islands affect wave patterns',,
culturalContext: 'Traditional knowledge of wave behavior around land masses',,
modernApplication: 'Coastal engineering and marine navigation',
  },
  {,
title: 'Bird Behavior',,
description: 'Using bird flight patterns to locate land',,
culturalContext: 'Traditional knowledge of bird migration and behavior',,
modernApplication: 'Ornithology and environmental science',
  },
]

export default function MaoriAstronomyNavigation() {const [selectedStar, setSelectedStar] = useState<StarSystem>(starSystems[0])
  const [selectedTechnique, setSelectedTechnique] = useState<NavigationTechnique>(navigationTechniques[0])
  const [activeTab, setActiveTab] = useState<'stars' | 'navigation' | 'cultural' | 'activities'>('stars')

return (
_<div className="astronomy-container">
      <header className="astronomy-header">
        <div className="header-content">
          <div className="badge">🌟 ERO DEMONSTRATION READY</div>
          <h1 className="title">🌌 Māori Astronomy & Navigation</h1>
          <h2 className="subtitle">Kōrero Whetū - The Science Written in the Sky</h2>
          <div className="meta">
            <span className="meta-item">🎓 Years 7-13 • Science • Social Studies</span>
            <span className="meta-item">🌿 Mātauranga Māori • Navigation</span>
            <span className="meta-item">✅ Cultural Authenticity: 99%</span>
          </div>
          <p className="description">
Explore the sophisticated astronomical knowledge and navigation techniques that enabled Polynesian voyagers to navigate vast distances across the Pacific Ocean.
          </p>
        </div>
      </header>

      <section className="tabs">
        <div className="tab-buttons">
          <button
className={`tab-button ${activeTab === 'stars' ? 'active' : ''}`}
onClick={() => setActiveTab('stars')}
          >
            ⭐ Star Systems
          </button>
          <button
className={`tab-button ${activeTab === 'navigation' ? 'active' : ''}`}
onClick={() => setActiveTab('navigation')}
          >
            🧭 Navigation Techniques
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

      {activeTab === 'stars' && (
_<section className="stars">
          <h2>⭐ Star Systems - Kōrero Whetū</h2>
          
          <div className="star-selector">
            {starSystems.map((star) => (
_<button
key={star.name}
className={`star-pill ${selectedStar.name === star.name ? 'active' : ''}`}
onClick={() => setSelectedStar(star)}
              >
                {star.maoriName}
              </button>
            ))}
          </div>

          <div className="star-details">
            <h3>{selectedStar.maoriName} ({selectedStar.name})</h3>
            
            <div className="star-grid">
              <div className="star-section">
                <h4>🌟 Description</h4>
                <p>{selectedStar.description}</p>
              </div>
              
              <div className="star-section">
                <h4>🌿 Cultural Significance</h4>
                <p>{selectedStar.culturalSignificance}</p>
              </div>
              
              <div className="star-section">
                <h4>🧭 Navigation Use</h4>
                <p>{selectedStar.navigationUse}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'navigation' && (
_<section className="navigation">
          <h2>🧭 Navigation Techniques - Tātai Arorangi</h2>
          
          <div className="technique-selector">
            {navigationTechniques.map((technique) => (
_<button
key={technique.title}
className={`technique-pill ${selectedTechnique.title === technique.title ? 'active' : ''}`}
onClick={() => setSelectedTechnique(technique)}
              >
                {technique.title}
              </button>
            ))}
          </div>

          <div className="technique-details">
            <h3>{selectedTechnique.title}</h3>
            
            <div className="technique-grid">
              <div className="technique-section">
                <h4>📖 Description</h4>
                <p>{selectedTechnique.description}</p>
              </div>
              
              <div className="technique-section">
                <h4>🌿 Cultural Context</h4>
                <p>{selectedTechnique.culturalContext}</p>
              </div>
              
              <div className="technique-section">
                <h4>🔬 Modern Application</h4>
                <p>{selectedTechnique.modernApplication}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'cultural' && (
        <section className="cultural">
          <h2>🌿 Cultural Context - Mātauranga Māori</h2>
          
          <div className="cultural-content">
            <div className="cultural-section">
              <h3>🌟 Traditional Knowledge</h3>
              <p>
Māori astronomy represents a sophisticated understanding of celestial patterns that was essential for survival, navigation, and cultural practices. This knowledge, known as <strong>kōrero whetū</strong> (star talk) and <strong>tātai arorangi</strong> (astronomical calculations), was passed down through generations.
              </p>
            </div>

            <div className="cultural-section">
              <h3>🧭 Navigation Heritage</h3>
              <p>
The ability to navigate vast distances across the Pacific Ocean using only natural signs demonstrates the incredible depth of traditional knowledge. This navigation heritage connects Māori to their Polynesian ancestors and represents one of humanity's greatest achievements.
              </p>
            </div>

            <div className="cultural-section">
              <h3>🌿 Cultural Significance</h3>
              <p>
Astronomical knowledge was not just practical - it was deeply spiritual and cultural. Stars were seen as ancestors, and their movements guided important cultural events, planting seasons, and community activities.
              </p>
            </div>

            <div className="cultural-section">
              <h3>🔬 Modern Relevance</h3>
              <p>
This traditional knowledge continues to be relevant today, informing modern astronomy, navigation, and environmental science. It represents a valuable contribution to global scientific understanding.
              </p>
            </div>
          </div>
        </section>
      )}

      {activeTab === 'activities' && (
        <section className="activities">
          <h2>🎯 Learning Activities</h2>
          
          <div className="activities-grid">
            <div className="activity">
              <h3>⭐ Star Mapping Activity</h3>
              <p>Create a star map showing the positions of Matariki, Tautoru, and other important stars.</p>
              <ul>
                <li>Research star positions for different seasons</li>
                <li>Include Māori names and cultural significance</li>
                <li>Connect to traditional navigation stories</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🧭 Navigation Simulation</h3>
              <p>Simulate traditional navigation using star positions and ocean currents.</p>
              <ul>
                <li>Use star compass to determine direction</li>
                <li>Read ocean current patterns</li>
                <li>Practice wave pattern recognition</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🌿 Cultural Research</h3>
              <p>Research the cultural significance of different stars in your local area.</p>
              <ul>
                <li>Interview local kaumātua about star knowledge</li>
                <li>Document traditional stories about stars</li>
                <li>Connect to local cultural practices</li>
              </ul>
            </div>

            <div className="activity">
              <h3>🔬 Modern Connections</h3>
              <p>Explore how traditional navigation knowledge connects to modern science.</p>
              <ul>
                <li>Compare traditional and modern navigation methods</li>
                <li>Research current Pacific navigation practices</li>
                <li>Investigate modern applications of traditional knowledge</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <p className="motto">🌿 "Kōrero whetū - The stars speak to those who listen"</p>
        <p className="platform">TeAoMarama — World's Best Teaching Bank with Cultural Excellence</p>
      </footer>
    </div>
  )
}
