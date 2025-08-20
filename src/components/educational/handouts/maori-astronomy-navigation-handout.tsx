import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MaoriAstronomyNavigationHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const MaoriAstronomyNavigationHandout: React.FC<MaoriAstronomyNavigationHandoutProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 8-10", 
_subject = "Mathematics,  _Science"
}) => {
return (
    <div className="maori-astronomy-navigation-handout">
      <Card title="Māori Astronomy and Navigation Handout" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Māori Astronomy and Navigation Handout</h1>
          <div className="handout-meta">
            <span className="year-level">{yearLevel}</span>
            <span className="subject">{subject}</span>
            <span className="cultural-context">🌿 {culturalContext}</span>
          </div>
        </div>

        <div className="handout-content">
          <div 
className="te-kete-content"
dangerouslySetInnerHTML={{ __html: `
            <section class="mb-6">
                <div class="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                    <h2 class="text-xl font-bold text-indigo-800 mb-2" class="wiley-section-title">A Science Written in the Sky</h2>
                    <p class="text-gray-700 text-justify">
Long before the invention of GPS or compasses, Polynesian navigators sailed vast distances across the Pacific Ocean. Their primary tool was an incredibly deep understanding of the stars, sun, moon, and ocean currents. This was not luck it was a precise science passed down through generations. In Aotearoa, this knowledge, known as **kōrero whetū** or **tātai arorangi**, was essential for navigation, timing planting and harvesting, and for cultural identity.
                    </p>
                </div>
        
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4" class="wiley-section-title">Key Stars and Constellations</h2>
                <div class="grid md: grid-cols-2 gap-6">
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-purple-700 mb-2">Matariki (The Pleiades)</h3>
                        <p class="text-sm text-gray-600 italic mb-2">Indicator of: The Māori New Year</p>
                        <p class="text-gray-700">
The pre-dawn rising of the Matariki star cluster in mid-winter marks the beginning of the Māori New Year. Its brightness and the clarity of each star were used to predict the success of the coming season. A clear, bright Matariki signalled a warm and productive year ahead.
                        </p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-purple-700 mb-2">Tautoru (Orion's Belt)</h3>
                        <p class="text-sm text-gray-600 italic mb-2">Indicator of: The "Tuna" or Eel Season</p>
                        <p class="text-gray-700">
When Tautoru, the three bright stars of Orion's Belt, is seen rising in the east, it signals the time when the tuna (eels) begin their migration. This was a crucial time for harvesting this important food source.
                        </p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-purple-700 mb-2">Te Pae Māhutonga (The Southern Cross)</h3>
                        <p class="text-sm text-gray-600 italic mb-2">Indicator of: South</p>
                        <p class="text-gray-700">
This is perhaps the most famous navigating constellation in the Southern Hemisphere. By identifying Te Pae Māhutonga, navigators could reliably find the direction of south, allowing them to orient their waka (canoe) on the open ocean.
                        </p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-purple-700 mb-2">Rehua (Antares)</h3>
                        <p class="text-sm text-gray-600 italic mb-2">Indicator of: The Height of Summer</p>
                        <p class="text-gray-700">
Rehua is one of the brightest stars in the sky. Its appearance high in the summer sky was associated with the hottest months and the time when certain fruits and berries were ripe for picking.
                        </p>
                    </div>
                </div>
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4" class="wiley-section-title">The Star Compass: A Mental Map</h2>
                <div class="bg-teal-50 p-4 rounded-xl border border-teal-200">
                    <p class="text-gray-700 text-justify">
Māori navigators did not use a physical compass. Instead, they used a mental model called a **star compass**. They memorised the rising and setting points of over 200 stars on the horizon. By knowing the sequence of stars that would rise and set throughout the night, they could hold a steady course. This was combined with knowledge of ocean swells, wind patterns, and the flight of birds to create a sophisticated and reliable navigation system.
                    </p>
                </div>
            </section>

            <section>
                <h2 class="text-2xl font-bold text-gray-800 mb-4" class="wiley-section-title">Critical Thinking Questions</h2>
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg shadow">
                        <p class="font-semibold mb-2">1. How is the Māori practice of using Matariki to predict the coming season a form of scientific forecasting?</p>
                        
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <p class="font-semibold mb-2">2. The star compass is a "mental model". Why would it be important for every navigator on a waka to have the same mental model?</p>
                        
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <p class="font-semibold mb-2">3. (Extension) Go outside on a clear night. Can you identify any of the stars or constellations mentioned in this handout? What direction are you facing?</p>
                        
                    </div>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default MaoriAstronomyNavigationHandout
