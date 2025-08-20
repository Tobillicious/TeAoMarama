import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface TraditionalEcologicalIndicatorsHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const TraditionalEcologicalIndicatorsHandout: React.FC<TraditionalEcologicalIndicatorsHandoutProps> = (_{
culturalContext = "Traditional knowledge and cultural practices", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="traditional-ecological-indicators-handout">
      <Card title="Traditional Ecological Indicators Handout | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Traditional Ecological Indicators Handout | Mangakōtukutuku College</h1>
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
            <div class="mb-4">
                <a href="handouts.html" class="breadcrumb">&larr Back to Handouts</a>
                <h1 class="page-title" class="wiley-hero-title">Traditional Ecological Indicators</h1>
                <p class="page-subtitle">Reading the Signs of a Healthy Environment</p>
            </div>

            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">What are Traditional Ecological Indicators?</h2>
                    <p>
For centuries, indigenous peoples around the world have developed deep, place-based knowledge of their environments. Instead of relying on complex technology, they learned to read the signs of nature. These signs, or <strong>indicators</strong>, are specific plants, animals, or environmental phenomena that provide information about the health of an ecosystem. They are a form of science based on generations of careful observation, pattern recognition, and oral tradition.
                    </p>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Examples from Aotearoa</h2>
                <div class="grid grid-cols-1 md: grid-cols-2 gap-4">
                    <div class="technique-box">
                        <h3 class="mb-2">The Flowering of the Pōhutukawa</h3>
                        <p class="text-italic text-secondary mb-2">Indicator of: Kina (sea urchin) readiness</p>
                        <p>
Many iwi hold the knowledge that when the pōhutukawa tree blooms its vibrant red flowers, usually in early summer, the kina are fat and ready for harvesting. This is a perfect example of a <strong>phenological indicator</strong>, where the timing of one biological event signals another.
                        </p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">The Presence of Tūī</h3>
                        <p class="text-italic text-secondary mb-2">Indicator of: Forest Health</p>
                        <p>
The tūī, with its beautiful song and energetic flight, is a key pollinator of many native trees. A forest with a large, healthy population of tūī is a sign of a thriving ecosystem with abundant food sources. A decline in tūī numbers can indicate a problem with the forest's health.
                        </p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Water Clarity and Smell</h3>
                        <p class="text-italic text-secondary mb-2">Indicator of: Water Quality</p>
                        <p>
Before chemical tests existed, Māori had sophisticated ways of assessing water quality. The clarity of the water, its smell, the types of plants growing in it, and the presence or absence of certain fish and insects all served as indicators of the health of a river or lake.
                        </p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">The Flight of the Pīpīwharauroa</h3>
                        <p class="text-italic text-secondary mb-2">Indicator of: The Coming of Spring</p>
                        <p>
The arrival of the shining cuckoo, or pīpīwharauroa, from its long migration is a well-known indicator that spring has begun. This signals the time for planting certain crops, like kūmara.
                        </p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Connecting Traditional and Modern Science</h2>
                <div class="question-block">
                    <p>
Traditional indicators and modern scientific monitoring are not in opposition. They are two different, complementary ways of knowing. A scientist might use a sensor to measure water temperature, while a kaumātua might observe the behaviour of eels in the same river. When you combine these two knowledge systems, you get a much richer, more complete picture of what is happening in the environment.
                    </p>
                </div>
            </section>

            <section class="handout-questions mb-4">
                <h2 class="section-title" class="wiley-section-title">Critical Thinking Questions</h2>
                <div class="space-y-4">
                    <div class="question-block">
                        <p><strong>1. Why is it important to use local indicators for a specific place?</p>
                        
                    </div>
                    <div class="question-block">
                        <p><strong>2. Choose one of the indicators above. What kind of modern scientific measurement could you use to test the same thing? (e.g., for water clarity, you could use a turbidity sensor).</p>
                        
                    </div>
                    <div class="question-block">
                        <p><strong>3. (Extension) Talk to your whānau or community members. Can you identify one traditional ecological indicator from your local area? Describe it below.</p>
                        
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

export default TraditionalEcologicalIndicatorsHandout
