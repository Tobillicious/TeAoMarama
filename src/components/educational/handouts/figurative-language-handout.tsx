import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface FigurativeLanguageHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const FigurativeLanguageHandout: React.FC<FigurativeLanguageHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="figurative-language-handout">
      <Card title="Figurative Language Handout | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Figurative Language Handout | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Unlocking Figurative Language</h1>
                <p class="page-subtitle">Adding colour and imagination to your writing.</p>
            </div>

            <!-- Definitions Section -->
            <section class="grid grid-cols-1 md: grid-cols-2 gap-4 mb-4">
                <!-- Simile -->
                <div class="technique-box">
                    <div class="flex items-center mb-2">
                        <span class="text-2xl mr-3">😊</span>
                        <h2 class="mb-2" class="wiley-section-title">Simile</h2>
                    </div>
                    <p class="text-sm text-secondary mb-2">A comparison between two different things using the words <strong>'like'</strong> or <strong>'as'</strong>.</p>
                    <p class="text-sm text-secondary bg-background rounded-md p-2 text-italic">"The lake was as smooth as glass."</p>
                </div>

                <!-- Metaphor -->
                <div class="technique-box">
                    <div class="flex items-center mb-2">
                        <span class="text-2xl mr-3">🤔</span>
                        <h2 class="mb-2" class="wiley-section-title">Metaphor</h2>
                    </div>
                    <p class="text-sm text-secondary mb-2">A direct comparison where one thing is said to <strong>be</strong> another. It doesn't use 'like' or 'as'.</p>
                    <p class="text-sm text-secondary bg-background rounded-md p-2 text-italic">"The classroom was a zoo."</p>
                </div>

                <!-- Personification -->
                <div class="technique-box">
                    <div class="flex items-center mb-2">
                        <span class="text-2xl mr-3">🌬️</span>
                        <h2 class="mb-2" class="wiley-section-title">Personification</h2>
                    </div>
                    <p class="text-sm text-secondary mb-2">Giving human qualities or actions to inanimate objects or animals.</p>
                    <p class="text-sm text-secondary bg-background rounded-md p-2 text-italic">"The wind whispered through the trees."</p>
                </div>

                <!-- Onomatopoeia -->
                <div class="technique-box">
                    <div class="flex items-center mb-2">
                        <span class="text-2xl mr-3">💥</span>
                        <h2 class="mb-2" class="wiley-section-title">Onomatopoeia</h2>
                    </div>
                    <p class="text-sm text-secondary mb-2">A word that imitates the sound it represents.</p>
                    <p class="text-sm text-secondary bg-background rounded-md p-2 text-italic">"The bacon sizzled in the pan."</p>
                </div>
                
                <!-- Alliteration -->
                <div class="technique-box">
                    <div class="flex items-center mb-2">
                        <span class="text-2xl mr-3">🐍</span>
                        <h2 class="mb-2" class="wiley-section-title">Alliteration</h2>
                    </div>
                    <p class="text-sm text-secondary mb-2">The repetition of the same sound at the beginning of words in a phrase.</p>
                    <p class="text-sm text-secondary bg-background rounded-md p-2 text-italic">"She sells seashells by the seashore."</p>
                </div>

                <!-- Hyperbole -->
                <div class="technique-box">
                    <div class="flex items-center mb-2">
                        <span class="text-2xl mr-3">🤯</span>
                        <h2 class="mb-2" class="wiley-section-title">Hyperbole</h2>
                    </div>
                    <p class="text-sm text-secondary mb-2">An extreme exaggeration used for emphasis or effect.</p>
                    <p class="text-sm text-secondary bg-background rounded-md p-2 text-italic">"I've told you a million times!"</p>
                </div>
            </section>

            <!-- Practice Section -->
            <section class="handout-questions mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">Identify the Technique 🕵️</h2>
                <div class="space-y-4">
                    <!-- Question 1 -->
                    <div class="question-block">
                        <p class="text-italic mb-2"><strong>1.</strong> The sun is a golden ball in the sky.</p>
                        <div class="flex items-center space-x-4 text-sm">
                            <p><strong>Technique:</strong></p>
                            
                        </div>
                    </div>

                    <!-- Question 2 -->
                    <div class="question-block">
                        <p class="text-italic mb-2"><strong>2.</strong> The curious cat crept cautiously.</p>
                        <div class="flex items-center space-x-4 text-sm">
                            <p><strong>Technique:</strong></p>
                            
                        </div>
                    </div>

                    <!-- Question 3 -->
                    <div class="question-block">
                        <p class="text-italic mb-2"><strong>3.</strong> I'm so hungry I could eat a horse.</p>
                        <div class="flex items-center space-x-4 text-sm">
                            <p><strong>Technique:</strong></p>
                            
                        </div>
                    </div>
                    
                    <!-- Question 4 -->
                    <div class="question-block">
                        <p class="text-italic mb-2"><strong>4.</strong> The old house groaned under the weight of the snow.</p>
                        <div class="flex items-center space-x-4 text-sm">
                            <p><strong>Technique:</strong></p>
                            
                        </div>
                    </div>
                </div>
            </section>

            <!-- Creative Challenge Section -->
            <section class="mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">Creative Challenge ✍️</h2>
                <p class="text-center text-secondary text-sm mb-4">Write a short paragraph about a stormy day. Try to use at least three different types of figurative language.</p>
                <div class="question-block">
                    <div class="space-y-2">

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

export default FigurativeLanguageHandout
