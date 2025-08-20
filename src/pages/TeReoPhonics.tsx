import React from 'react'

interface TeReoPhonicsPros {className?: string}
export const TeReoPhonics: React.FC<TeReoPhonicsPros> = (_{ className = '' }) => {
return (
    <div className={`te-reo-phonics ${className}`}>
      <header className="phonics-hero">
        <h1>Te Reo Māori Phonics</h1>
        <p>Foundation sounds and pronunciation</p>
      </header>
      <section className="vowel-sounds">
        <h2>Ngā Orokati - The Vowels</h2>
        <div className="vowel-grid">
          <div className="vowel-card">
            <h3>A</h3>
            <p>/a/ as in 'car' - aroha, awa, kai</p>
          </div>
          <div className="vowel-card">
            <h3>E</h3>
            <p>/e/ as in 'get' - kere, whenua, arohe</p>
          </div>
          <div className="vowel-card">
            <h3>I</h3>
            <p>/i/ as in 'see' - iwi, kiwi, riri</p>
          </div>
          <div className="vowel-card">
            <h3>O</h3>
            <p>/o/ as in 'saw' - ko, wharo, roto</p>
          </div>
          <div className="vowel-card">
            <h3>U</h3>
            <p>/u/ as in 'moon' - kupu, whutu, uru</p>
          </div>
        </div>
      </section>
      <section className="special-sounds">
        <h2>Special Combinations</h2>
        <div className="sound-patterns">
          <div className="pattern-item">
            <h4>NG</h4>
            <p>Like 'singer' - nga, tangata, kingitanga</p>
          </div>
          <div className="pattern-item">
            <h4>WH</h4>
            <p>Like 'f' sound - whakapapa, whenua, whare</p>
          </div>
          <div className="pattern-item">
            <h4>Long vowels</h4>
            <p>Macrons extend the sound - Māori, pēpe, kōwhai</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default TeReoPhonics