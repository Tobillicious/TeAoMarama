import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface PoliticalCartoonAnalysisHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const PoliticalCartoonAnalysisHandout: React.FC<PoliticalCartoonAnalysisHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="political-cartoon-analysis-handout">
      <Card title="Analysing Political Cartoons" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Analysing Political Cartoons</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">What is a Political Cartoon?</h2>
                <p class="text-justify">
A political cartoon is a drawing that makes a point about a political issue, event, or person. They are a powerful form of persuasive text, using images and symbols to convey a complex message quickly and effectively. Unlike a written opinion piece, a cartoon uses visual language to make its argument, often relying on humour, satire, or irony to engage the reader. To understand a political cartoon, you need to be a visual detective, decoding the symbols and techniques the artist has used to present their point of view.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">Key Techniques Used by Cartoonists</h3>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h4 class="font-bold text-gray-800 mb-1">1. Symbolism</h4>
                        <p class="text-sm text-gray-600">Using a simple object or image to stand for a larger idea. For example, a dove might represent peace, a kiwi might represent New Zealand, or a dollar sign might represent the economy.</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-gray-800 mb-1">2. Caricature & Exaggeration</h4>
                        <p class="text-sm text-gray-600">Exaggerating a person's physical features or a situation's characteristics to make a point or for comedic effect. A politician might be drawn with extra-large ears to suggest they are listening to the wrong people.</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-gray-800 mb-1">3. Labelling & Captions</h4>
                        <p class="text-sm text-gray-600">Artists often label objects or people to make their meaning clear. A caption or title can also provide context or state the cartoon's main message directly.</p>
                    </div>
                     <div class="technique-box">
                        <h4 class="font-bold text-gray-800 mb-1">4. Irony & Satire</h4>
                        <p class="text-sm text-gray-600">Using humour, irony, or sarcasm to critique or mock a person or situation. The cartoon might show a situation that is the opposite of what is expected to highlight a flaw or injustice.</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Deconstruction & Application</h3>
                
                <div class="space-y-5">
                    <!-- Deconstruction -->
                    <div>
                        <p class="font-semibold mb-2">1. Deconstruction: Imagine a cartoon showing a tiny kiwi bird trying to push a giant boulder labelled "Housing Prices" up a steep hill. Identify two techniques the cartoonist is using.</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>

                    <!-- Application -->
                    <div>
                        <p class="font-semibold mb-2">2. Application: What is the main message or argument of the cartoon described above?</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Critical Thinking -->
                    <div>
                        <p class="font-semibold mb-2">3. (Critical Thinking) Sketch a simple political cartoon about the issue of "youth vaping." Think about what symbols you could use for vaping, young people, and health. Briefly explain your cartoon's message.</p>
                        
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

export default PoliticalCartoonAnalysisHandout
