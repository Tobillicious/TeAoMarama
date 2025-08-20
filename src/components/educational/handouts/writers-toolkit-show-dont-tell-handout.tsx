import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface WritersToolkitShowDontTellHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const WritersToolkitShowDontTellHandout: React.FC<WritersToolkitShowDontTellHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="writers-toolkit-show-dont-tell-handout">
      <Card title="The Writer's Toolkit: Show, Don't Tell | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Show, Don't Tell | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">The Writer's Toolkit: Show, Don't Tell</h1>
                <p class="page-subtitle">Crafting Vivid and Entertaining Descriptions</p>
            </div>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">What Does "Show, Don't Tell" Mean?</h2>
                <p>
                    "Show, Don't Tell" is one of the most powerful rules in creative writing. Instead of simply telling the reader something is true (e.g., "The man was angry"), a good writer shows it through actions, dialogue, and sensory details, allowing the reader to experience the scene for themselves. Telling is direct and informative, but showing is immersive and entertaining. It invites the reader to become a detective, drawing their own conclusions from the evidence you provide. This technique is essential for creating a world that feels real and characters that come alive.
                </p>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Telling vs. Showing: An Example</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Telling 😴</h3>
                        <p class="text-italic text-secondary">The room was messy.</p>
                        <p class="text-sm">This gives us the basic information, but it's boring. The reader has no connection to the space.</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Showing 😎</h3>
                        <p class="text-italic text-secondary">Week-old pizza boxes teetered on a stack of textbooks, and clothes were strewn across the floor like a colourful, fabric avalanche. The air was thick with the smell of stale coffee and dust.</p>
                        <p class="text-sm">This uses specific details (pizza boxes, clothes) and sensory information (smell of coffee) to create a vivid picture of the mess.</p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Deconstruction & Application</h2>
                
                <div class="space-y-4">
                    <!-- Deconstruction -->
                    <div class="question-block">
                        <p><strong>1. Deconstruction: Read the "Telling" sentence below. How could you "Show" this instead? Brainstorm sensory details (sight, sound, smell, touch, taste) and specific actions.</p>
                        <div class="technique-box mb-2">
                            <h4 class="mb-2">Telling Sentence: </h4>
                            <p class="text-italic text-secondary">The girl was nervous about her speech.</p>
                        </div>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>

                    <!-- Application -->
                    <div class="question-block">
                        <p><strong>2. Application: Rewrite the following short paragraph. Your goal is to replace the "Telling" parts with "Showing" details to make the scene more entertaining and immersive.</p>
                        <div class="technique-box mb-2">
                             <p class="text-italic text-secondary">It was a very cold day. The old man walked down the street. He was poor but happy. He went into the warm bakery.</p>
                        </div>
                        <div class="answer-space answer-space-lg">

                        </div>
                    </div>
                    
                    <!-- Critical Thinking -->
                    <div class="question-block">
                        <p><strong>3. (Critical Thinking) Is "Telling" always bad? Can you think of a situation where a writer might deliberately choose to "Tell" instead of "Show"?</p>
                        <div class="answer-space answer-space-lg">

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

export default WritersToolkitShowDontTellHandout
