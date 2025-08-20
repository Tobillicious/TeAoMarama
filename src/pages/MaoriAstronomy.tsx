import React from 'react'

interface MaoriAstronomyProps {className?: string}
export const MaoriAstronomy: React.FC<MaoriAstronomyProps> = (_{ className = '' }) => {
return (
    <div className={`maori-astronomy ${className}`}>
      <header className="astronomy-hero">
        <h1>Māori Astronomy & Navigation</h1>
        <p>Traditional star knowledge and wayfinding</p>
      </header>
      <section className="star-knowledge">
        <div className="constellation-card">
          <h3>✨ Matariki</h3>
          <p>The Pleiades cluster and New Year celebrations</p>
        </div>
        <div className="constellation-card">
          <h3>🌙 Te Ika-a-Māui</h3>
          <p>The Milky Way and creation stories</p>
        </div>
        <div className="constellation-card">
          <h3>🦅 Te Tahunga-o-te-rangi</h3>
          <p>Orion constellation and seasonal indicators</p>
        </div>
      </section>
      <section className="navigation-principles">
        <h2>Wayfinding Techniques</h2>
        <div className="technique-grid">
          <div className="technique-item">
            <h4>Star Compass</h4>
            <p>Using rising and setting points of stars for direction</p>
          </div>
          <div className="technique-item">
            <h4>Wave Patterns</h4>
            <p>Reading ocean swells and wave interactions</p>
          </div>
          <div className="technique-item">
            <h4>Natural Signs</h4>
            <p>Birds, clouds, and water colors as navigation aids</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MaoriAstronomy