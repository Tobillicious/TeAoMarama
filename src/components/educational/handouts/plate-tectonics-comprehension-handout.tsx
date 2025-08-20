import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface PlateTectonicsComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const PlateTectonicsComprehensionHandout: React.FC<PlateTectonicsComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="plate-tectonics-comprehension-handout">
      <Card title="Plate Tectonics Reading Comprehension" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Plate Tectonics Reading Comprehension</h1>
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
            <article class="mb-6 prose max-w-none">
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">Living on the Edge</h2>
                <p class="text-justify">
New Zealand's dramatic landscape of mountains, volcanoes, and hot springs is the direct result of its precarious position on the boundary of two of the world's major tectonic plates. The country sits astride the junction of the Pacific Plate and the Australian Plate. To the east of the North Island, the Pacific Plate is being forced under the Australian Plate in a process called subduction. In the South Island, the plates grind past each other along the Alpine Fault. This constant geological activity is responsible for the approximately 20,000 earthquakes New Zealand experiences each year, though only about 250 of these are strong enough to be felt.
                </p>
                <p class="text-justify">
This same tectonic activity, however, provides New Zealand with a significant natural advantage: abundant geothermal energy. In areas like the Taupō Volcanic Zone, magma (molten rock) sits relatively close to the Earth's surface, heating underground water reservoirs to extreme temperatures. Geothermal power plants harness this energy by drilling wells deep into these reservoirs. The hot, high-pressure steam that rushes to the surface is used to spin turbines, which generate electricity. The Wairākei Geothermal Power Station, opened in 1958, was the first of its kind in the world to use 'wet' steam technology.
                </p>
                <p class="text-justify">
Geothermal energy is a key part of New Zealand's renewable energy profile. It is a more reliable power source than wind or solar, as it is not dependent on weather conditions and can operate 24/7. In 2022, geothermal energy accounted for approximately 18% of New Zealand's total electricity generation. While the initial construction of a geothermal plant is expensive, they have low running costs and a small environmental footprint compared to fossil fuels. The challenge for the future is to manage these geothermal resources sustainably, ensuring that the rate of energy extraction does not exceed the rate at which the underground reservoirs are naturally replenished by rainwater.
                </p>
            </article>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Comprehension & Critical Thinking Questions</h3>
                
                <div class="space-y-5">
                    <!-- Question 1 -->
                    <div>
                        <p class="font-semibold mb-2">1. What geological process occurs to the east of the North Island?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) Two plates moving apart from each other.</div>
                            <div class="question-option">B) Two plates grinding past each other.</div>
                            <div class="question-option">C) One plate being forced underneath another.</div>
                            <div class="question-option">D) The formation of new tectonic plates.</div>
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div>
                        <p class="font-semibold mb-2">2. (Numeracy) Out of the 20,000 earthquakes experienced each year, what percentage is strong enough to be felt?</p>
                         <div class="flex items-center space-x-2">
                            <p class="font-semibold">Answer: </p>
                            
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div>
                        <p class="font-semibold mb-2">3. What is the primary advantage of geothermal energy over wind and solar power, according to the text?</p>
                        <div class="grid grid-cols-1 md: grid-cols-2 gap-2 text-sm">
                            <div class="question-option">A) It is cheaper to build the power plants.</div>
                            <div class="question-option">B) It is more reliable and not dependent on the weather.</div>
                            <div class="question-option">C) It can only be used in the South Island.</div>
                            <div class="question-option">D) It produces more energy than all other sources combined.</div>
                        </div>
                    </div>

                    <!-- Question 4 -->
                    <div>
                        <p class="font-semibold mb-2">4. (Critical Thinking) How is the geological process that causes earthquakes and volcanoes also beneficial to New Zealand?</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Question 5 -->
                    <div>
                        <p class="font-semibold mb-2">5. (Critical Thinking) The text mentions the need to manage geothermal resources "sustainably." What might be the consequences if a geothermal reservoir is not managed sustainably?</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
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

export default PlateTectonicsComprehensionHandout
