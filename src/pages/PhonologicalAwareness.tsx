import React, { useState } from 'react'
import './PhonologicalAwareness.css'

interface Activity {,
id: string,
title: string,
type: 'rhyming' | 'syllables' | 'onset-rime' | 'phoneme' | 'blending' | 'segmenting',
level: 'foundation' | 'developing' | 'advanced',
description: string,
instructions: string,
culturalConnection: string,
materials: string[],
examples: string[],
targetSkills: string[],
ageRange: string,
duration: string}
const phonologicalActivities: Activity[] = [
  {,
id: 'rhyming-waiata',,
title: 'Waiata Rhyme Time',,
type: 'rhyming',,
level: 'foundation',,
description: 'Traditional Māori songs and rhymes to develop rhyming awareness',,
instructions: 'Sing traditional waiata and identify rhyming patterns. Students join in with familiar rhymes and create new ones.',,
culturalConnection: 'Uses traditional waiata like "Pōkarekare Ana" and nursery rhymes in Te Reo Māori',,
materials: ['Audio recordings of waiata', 'Picture cards', 'Rhythm instruments', 'Song sheets'],;,
examples: ['kai/wai', 'mana/hana', 'kite/bite', 'cat/hat'],;,
targetSkills: ['Rhyme recognition', 'Rhyme production', 'Rhythm awareness', 'Cultural songs'],;,
ageRange: '4-7 years',,
duration: '15-20 minutes'
  },
  {,
id: 'syllable-clapping',,
title: 'Ngā Wehenga - Syllable Beats',,
type: 'syllables',,
level: 'foundation',,
description: 'Clapping and counting syllables in Māori and English names and words',,
instructions: 'Students clap each syllable in their names, whānau names, and familiar kupu. Use body percussion for engagement.',,
culturalConnection: 'Practice with Māori place names like A-o-te-a-ro-a, Tau-ran-ga, Ro-to-ru-a',,
materials: ['Name cards', 'Pictures of places', 'Drums or clapping sticks', 'Syllable counting mats'],;,
examples: ['Kai (1)', 'Whā-nau (2)', 'A-o-te-a-ro-a (6)', 'Wel-ling-ton (3)'],;,
targetSkills: ['Syllable awareness', 'Counting skills', 'Name recognition', 'Cultural vocabulary'],;,
ageRange: '4-8 years',,
duration: '10-15 minutes'
  },
  {,
id: 'onset-rime-games',,
title: 'Timatanga me te Mutunga - Beginning and End Sounds',,
type: 'onset-rime',,
level: 'developing',,
description: 'Breaking words into onset (beginning) and rime (ending) patterns',,
instructions: 'Use familiar words to separate initial sounds from word families. Build new words by changing onsets.',,
culturalConnection: 'Focus on Māori consonants and vowel patterns, comparing with English sound structures',,
materials: ['Onset-rime cards', 'Letter tiles', 'Picture sorting mats', 'Magnetic letters'],;,
examples: ['k-ai', 'wh-are', 'c-at', 'b-at', 'm-at'],;,
targetSkills: ['Sound segmentation', 'Word family recognition', 'Phonemic manipulation', 'Pattern awareness'],;,
ageRange: '5-8 years',,
duration: '15-25 minutes'
  },
  {,
id: 'phoneme-isolation',,
title: 'Oro Takitahi - Individual Sound Hunters',,
type: 'phoneme',,
level: 'developing',,
description: 'Identifying individual sounds (phonemes) in beginning, middle, and end positions',,
instructions: 'Students identify specific sounds in different word positions. Use Elkonin boxes for sound mapping.',,
culturalConnection: 'Compare English phonemes with Te Reo Māori sounds, noting similarities and differences',,
materials: ['Elkonin boxes', 'Sound cards', 'Picture cards', 'Counting tokens'],;,
examples: ['/k/ in kai', '/a/ in cat', '/t/ in mat', '/ng/ in ring'],;,
targetSkills: ['Phoneme isolation', 'Sound positioning', 'Auditory discrimination', 'Sound-symbol connection'],;,
ageRange: '6-9 years',,
duration: '20-30 minutes'
  },
  {,
id: 'blending-practice',,
title: 'Whakakotahi Oro - Sound Blending Magic',,
type: 'blending',,
level: 'developing',,
description: 'Blending individual sounds together to form complete words',,
instructions: 'Teacher says sounds separately, students blend to make words. Progress from simple to complex patterns.',,
culturalConnection: 'Practice with both English and Māori sound patterns, noting different blending rules',,
materials: ['Sound arrows', 'Blending slides', 'Picture-word cards', 'Audio recordings'],;,
examples: ['/k/-/a/-/i/ = kai', '/c/-/a/-/t/ = cat', '/wh/-/a/-/r/-/e/ = whare'],;,
targetSkills: ['Sound blending', 'Word formation', 'Listening skills', 'Phonemic synthesis'],;,
ageRange: '5-8 years',,
duration: '15-20 minutes'
  },
  {,
id: 'segmenting-sounds',,
title: 'Whakatakoto Oro - Breaking Words Apart',,
type: 'segmenting',,
level: 'advanced',,
description: 'Breaking words into individual sounds (phonemes) for spelling and writing',,
instructions: 'Students stretch words like rubber bands, identifying each sound. Use sound boxes for visual support.',,
culturalConnection: 'Analyze both English and Māori words to understand different phonemic structures',,
materials: ['Sound stretching cards', 'Phoneme frames', 'Rubber bands', 'Writing materials'],;,
examples: ['cat = /c/-/a/-/t/', 'kai = /k/-/a/-/i/', 'tree = /t/-/r/-/ee/'],;,
targetSkills: ['Phoneme segmentation', 'Spelling preparation', 'Sound analysis', 'Writing readiness'],;,
ageRange: '6-10 years',,
duration: '20-25 minutes'
  },
  {,
id: 'sound-substitution',,
title: 'Whakakapi Oro - Sound Swapping Games',,
type: 'phoneme',,
level: 'advanced',,
description: 'Changing one sound in a word to make a new word (phoneme manipulation)',,
instructions: 'Start with a word, change one sound to make new words. Use physical manipulation with letter cards.',,
culturalConnection: 'Explore how changing sounds affects meaning in both languages',,
materials: ['Letter manipulation cards', 'Word family wheels', 'Sound substitution games', 'Writing boards'],;,
examples: ['cat → bat → hat', 'kai → kei → kau', 'run → sun → fun'],;,
targetSkills: ['Phoneme manipulation', 'Word building', 'Spelling patterns', 'Cognitive flexibility'],;,
ageRange: '7-11 years',,
duration: '25-30 minutes'
  },
  {,
id: 'alliteration-play',,
title: 'Oro Rite - Same Sound Stories',,
type: 'phoneme',,
level: 'foundation',,
description: 'Creating sentences and stories with words that start with the same sound',,
instructions: 'Students create alliterative sentences using their names and cultural vocabulary. Build group stories.',,
culturalConnection: 'Use Māori and English alliteration, exploring cultural concepts and values',,
materials: ['Name cards', 'Picture collections', 'Story templates', 'Cultural vocabulary cards'],;,
examples: ['Koro kai kai', 'Silly snakes slither', 'Māori mauri mana'],;,
targetSkills: ['Initial sound awareness', 'Vocabulary building', 'Creative expression', 'Cultural connections'],;,
ageRange: '4-8 years',,
duration: '15-20 minutes'
  }
]

export default function PhonologicalAwareness() {const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null)
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

const filteredActivities = phonologicalActivities.filter(activity => {
if (selectedType !== 'all' && activity.type !== selectedType) return false
    if (selectedLevel !== 'all' && activity.level !== selectedLevel) return false
    return true})

const selectRandomActivity = () => {
if (filteredActivities.length > 0) {
const randomIndex = Math.floor(Math.random() * filteredActivities.length)
      setCurrentActivity(filteredActivities[randomIndex])
      setExpandedActivity(null)
    }
  }

const toggleActivity = (_activityId: string) => {
setExpandedActivity(expandedActivity === activityId ? null : activityId)
  }

const getLevelColor = (_level: string) => {
switch (level) {
case 'foundation': return '#4caf50'
      case 'developing': return '#ff9800'
      case 'advanced': return '#2196f3',
default: return '#666'
    }
  }

const getTypeColor = (_type: string) => {
const colors = {
      'rhyming': '#e8f5e8',
      'syllables': '#fff3e0',
      'onset-rime': '#e3f2fd',
      'phoneme': '#f3e5f5',
      'blending': '#fce4ec',
      'segmenting': '#e0f2f1'
    }
    return colors[type as keyof typeof colors] || '#f5f5f5'
  }

const playDemo = () => {
    // Placeholder for audio demo functionality
setIsPlaying(true)
    setTimeout_(() => setIsPlaying(false), 3000)
  }

return (
_<div className="phonological-container">
      <header className="phonological-header">
        <h1 className="phonological-title">🎵 Phonological Awareness - Mataara Oro</h1>
        <p className="phonological-subtitle">
Building foundational sound awareness through culturally responsive activities and games
        </p>
      </header>

      {/* Cultural Framework */}
      <section className="cultural-framework">
        <h2>🌿 Oral Tradition & Sound Awareness</h2>
        <p>
Phonological awareness builds on the rich oral traditions of Te Ao Māori,  _where sound,  _rhythm,  
_and pattern have always been central to learning and cultural transmission. These activities 
honor both traditional ways of knowing and systematic skill development.
        </p>
        <div className="framework-highlight">
          <strong>Whakatauki: </strong> "Ko te reo te mauri o te mana" - Language is the life force of spiritual power.
        </div>
      </section>

      {/* Skill Development Overview */}
      <section className="skills-overview">
        <h3>🎯 Phonological Awareness Continuum</h3>
        <div className="skills-progression">
          <div className="skill-stage foundation">
            <h4>Foundation</h4>
            <ul>
              <li>Listening & Attention</li>
              <li>Environmental Sounds</li>
              <li>Rhythm & Rhyme</li>
              <li>Word Awareness</li>
            </ul>
          </div>
          <div className="skill-stage developing">
            <h4>Developing</h4>
            <ul>
              <li>Syllable Segmentation</li>
              <li>Onset-Rime Awareness</li>
              <li>Initial Sound Isolation</li>
              <li>Sound Blending</li>
            </ul>
          </div>
          <div className="skill-stage advanced">
            <h4>Advanced</h4>
            <ul>
              <li>Phoneme Segmentation</li>
              <li>Sound Manipulation</li>
              <li>Complex Blending</li>
              <li>Phonemic Awareness</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="filters-section">
        <h3>🔍 Find Activities</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label htmlFor="type-filter">Activity Type:</label>
            <select 
id="type-filter"
value={selectedType} 
onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="rhyming">Rhyming</option>
              <option value="syllables">Syllables</option>
              <option value="onset-rime">Onset-Rime</option>
              <option value="phoneme">Phoneme Work</option>
              <option value="blending">Blending</option>
              <option value="segmenting">Segmenting</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="level-filter">Skill Level: </label>
            <select 
id="level-filter"
value={selectedLevel} 
onChange={(_e) => setSelectedLevel(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="foundation">Foundation</option>
              <option value="developing">Developing</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button 
className="random-activity-btn"
onClick={selectRandomActivity}
disabled={filteredActivities.length === 0}
          >
            🎲 Random Activity
          </button>
        </div>
        
        <div className="filter-results">
          <span className="results-count">{filteredActivities.length} activities available</span>
        </div>
      </section>

      {/* Featured Activity */}
      {currentActivity && (
        <section className="featured-activity">
          <div 
className="activity-spotlight"
style={{ backgroundColor: getTypeColor(currentActivity.type) }}
          >
            <div className="activity-header">
              <div className="activity-badges">
                <span className="type-badge">{currentActivity.type}</span>
                <span 
className="level-badge"
style={{ backgroundColor: getLevelColor(currentActivity.level) }}
                >
                  {currentActivity.level}
                </span>
                <span className="age-badge">{currentActivity.ageRange}</span>
                <span className="duration-badge">{currentActivity.duration}</span>
              </div>
              
              <h3 className="activity-title">{currentActivity.title}</h3>
              <p className="activity-description">{currentActivity.description}</p>
            </div>

            <div className="activity-details">
              <div className="instructions-section">
                <h4>📝 Instructions</h4>
                <p>{currentActivity.instructions}</p>
              </div>

              <div className="cultural-connection">
                <h4>🌿 Cultural Connection</h4>
                <p>{currentActivity.culturalConnection}</p>
              </div>

              <div className="activity-components">
                <div className="target-skills">
                  <h4>🎯 Target Skills</h4>
                  <div className="skills-tags">
                    {currentActivity.targetSkills.map(_(skill,  _index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="materials-needed">
                  <h4>📋 Materials</h4>
                  <ul>
                    {currentActivity.materials.map(_(material,  _index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>

                <div className="examples-section">
                  <h4>💡 Examples</h4>
                  <div className="examples-grid">
                    {currentActivity.examples.map(_(example,  _index) => (
                      <span key={index} className="example-item">{example}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="activity-actions">
                <button 
className="demo-btn"
onClick={() => playDemo(currentActivity.type)}
disabled={isPlaying}
                >
                  {isPlaying ? '🔊 Playing...' : '▶️ Audio Demo'}
                </button>
                <button className="print-btn">🖨️ Print Activity</button>
                <button className="adapt-btn">✏️ Adapt for My Class</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Activities Grid */}
      <section className="activities-grid-section">
        <h3>📚 All Activities ({filteredActivities.length})</h3>
        <div className="activities-grid">
          {filteredActivities.map(_(activity) => (
            <div 
key={activity.id} 
className="activity-card"
style={{ backgroundColor: getTypeColor(activity.type) }}
            >
              <div 
className="activity-card-header"
onClick={() => toggleActivity(activity.id)}
              >
                <div className="card-badges">
                  <span className="card-type-badge">{activity.type}</span>
                  <span 
className="card-level-dot"
style={{ backgroundColor: getLevelColor(activity.level) }}
                  ></span>
                </div>
                
                <h4 className="card-title">{activity.title}</h4>
                <p className="card-description">{activity.description}</p>
                
                <div className="card-meta">
                  <span className="card-age">{activity.ageRange}</span>
                  <span className="card-duration">{activity.duration}</span>
                </div>

                <span className="card-expand-icon">
                  {expandedActivity === activity.id ? '▼' : '▶'}
                </span>
              </div>

              {expandedActivity === activity.id && (
_<div className="activity-card-details">
                  <div className="card-instructions">
                    <h5>Instructions: </h5>
                    <p>{activity.instructions}</p>
                  </div>
                  
                  <div className="card-cultural">
                    <h5>Cultural Connection:</h5>
                    <p>{activity.culturalConnection}</p>
                  </div>

                  <div className="card-actions">
                    <button 
className="select-btn"
onClick={() => setCurrentActivity(activity)}
                    >
                      ⭐ Feature This Activity
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Assessment & Progress */}
      <section className="assessment-section">
        <h3>📊 Assessment & Progress Tracking</h3>
        <div className="assessment-grid">
          <div className="assessment-category">
            <h4>🎯 Observation Checklist</h4>
            <ul>
              <li>Participates actively in sound games</li>
              <li>Identifies rhyming words accurately</li>
              <li>Claps syllables in familiar words</li>
              <li>Isolates initial sounds consistently</li>
              <li>Blends sounds to form words</li>
              <li>Segments words into individual sounds</li>
            </ul>
          </div>

          <div className="assessment-category">
            <h4>📈 Progress Indicators</h4>
            <ul>
              <li>Increasing accuracy in phonological tasks</li>
              <li>Faster processing of sound patterns</li>
              <li>Transfer to reading and spelling activities</li>
              <li>Self-correction in sound work</li>
              <li>Creative use of sound patterns in play</li>
              <li>Cultural sound pattern recognition</li>
            </ul>
          </div>

          <div className="assessment-category">
            <h4>🌿 Cultural Assessment</h4>
            <ul>
              <li>Recognizes Māori sound patterns</li>
              <li>Compares English and Māori phonemes</li>
              <li>Uses cultural vocabulary confidently</li>
              <li>Shows pride in bilingual abilities</li>
              <li>Makes cultural connections in activities</li>
              <li>Engages with traditional songs/stories</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="phonological-footer">
        <p className="cultural-motto">🌿 "Mā te rongo, ka mōhio" - Through listening, we come to know</p>
        <p className="platform-info">Te Kete Ako - Phonological Excellence for Aotearoa</p>
      </footer>
    </div>
  )
}