import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface WritersToolkitHookHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const WritersToolkitHookHandout: React.FC<WritersToolkitHookHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="writers-toolkit-hook-handout">
      <Card title="The Writer's Toolkit: Crafting Hooks" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">The Writer's Toolkit: Crafting Hooks</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">Why Your First Sentence Matters</h2>
                <p class="text-justify">
The first sentence of any piece of writing is the most important. It's the "hook" that grabs your reader's attention and makes them want to keep reading. A boring introduction signals a boring piece of writing, and you risk losing your audience before you've even made your point. A strong hook, on the other hand, creates curiosity, sets the tone, and makes a promise to the reader about the interesting content to come. Different hooks work best for different purposes.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">Types of Hooks</h3>
                <div class="grid grid-cols-1 md: grid-cols-2 gap-4">
                    <div class="technique-box">
                        <h4 class="font-bold text-teal-700 mb-1">1. The Surprising Fact</h4>
                        <p class="text-sm text-gray-600">Start with a shocking or little-known piece of information to make your reader curious.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> "The average person will spend six months of their life waiting for red lights to turn green."</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-teal-700 mb-1">2. The Rhetorical Question</h4>
                        <p class="text-sm text-gray-600">Ask a question that makes the reader think and reflect on the topic.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example:</strong> "If you could have one superpower, what would it be and why?"</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-teal-700 mb-1">3. The Vivid Description</h4>
                        <p class="text-sm text-gray-600">Drop the reader directly into a scene. Use strong sensory details ("Show, Don't Tell").</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example: </strong> "The air was thick with the smell of salt and woodsmoke, and the only sound was the rhythmic sigh of the waves."</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-teal-700 mb-1">4. The Short, Personal Story (Anecdote)</h4>
                        <p class="text-sm text-gray-600">Begin with a very brief, relevant story to create a personal connection with the reader.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example: </strong> "I'll never forget the day my grandfather taught me how to fish. It wasn't about the fish it was about the silence."</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-teal-700 mb-1">5. The Bold Statement</h4>
                        <p class="text-sm text-gray-600">Start with a strong, and perhaps controversial, claim to grab the reader's attention immediately.</p>
                        <p class="text-sm mt-1 italic"><strong class="font-semibold">Example: </strong> "Homework is a waste of time."</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Application</h3>
                <div>
                    <p class="font-semibold mb-2">Your task is to write three different hooks for an essay arguing that social media is harmful to teenagers. Write one hook for three of the types listed above.</p>
                    <div class="h-32 bg-gray-50 border border-gray-300 rounded-md p-2 text-sm space-y-2">
                        <p><strong>1. Type: __________________:</strong></p>
                        <p><strong>2. Type: __________________:</strong></p>
                        <p><strong>3. Type: __________________:</strong></p>
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

export default WritersToolkitHookHandout
