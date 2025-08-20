import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface FilmSceneAnalysisHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const FilmSceneAnalysisHandout: React.FC<FilmSceneAnalysisHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="film-scene-analysis-handout">
      <Card title="Analysing a Film Scene" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Analysing a Film Scene</h1>
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
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">How Do Films Create Meaning?</h2>
                <p class="text-justify">
A film is more than just a story with moving pictures it's a carefully constructed text where every element is chosen to create a specific meaning and emotional response. Directors use a visual language made up of cinematic techniques to tell their story. By learning to identify and analyse these techniques, we can move beyond simply watching a film to actively deconstructing how it makes us feel and think. This process is key to developing a deep understanding of film as an art form.
                </p>
            </section>

            <section class="mb-6">
                <h3 class="text-lg font-bold text-gray-800 mb-3">Key Cinematic Techniques (Mise-en-scène)</h3>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h4 class="font-bold text-slate-800 mb-1">1. Camera Angles & Shots</h4>
                        <p class="text-sm text-gray-600">The position and distance of the camera tells us about power and relationships. A <strong class="font-semibold">low-angle shot</strong> (looking up) can make a character seem powerful, while a <strong class="font-semibold">high-angle shot</strong> (looking down) can make them seem weak or vulnerable. A <strong class="font-semibold">close-up shot</strong> focuses on emotion, while a <strong class="font-semibold">long shot</strong> establishes the setting.</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-slate-800 mb-1">2. Sound (Diegetic & Non-Diegetic)</h4>
                        <p class="text-sm text-gray-600"><strong class="font-semibold">Diegetic sound</strong> is part of the world of the film (e.g., dialogue, footsteps, a car radio). <strong class="font-semibold">Non-diegetic sound</strong> is added for the audience (e.g., the musical score, a narrator's voice). Sound is crucial for setting the mood, creating tension, or signalling emotion.</p>
                    </div>
                    <div class="technique-box">
                        <h4 class="font-bold text-slate-800 mb-1">3. Lighting</h4>
                        <p class="text-sm text-gray-600">Lighting shapes how we see characters and settings. <strong class="font-semibold">High-key lighting</strong> is bright and even, often used in comedies and musicals. <strong class="font-semibold">Low-key lighting</strong> uses deep shadows and high contrast, common in thrillers and horror films to create mystery and suspense.</p>
                    </div>
                </div>
            </section>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Application: Analysing a Scene</h3>
                
                <div class="space-y-5">
                    <p class="font-semibold mb-2">Your teacher will show you a short film scene. As you watch, take notes in the boxes below. Your goal is to explain HOW the director uses these techniques to create a specific mood or idea.</p>
                    
                    <!-- Analysis Box 1 -->
                    <div>
                        <h4 class="font-bold text-slate-800 mb-1">Camera Angles & Shots</h4>
                        <p class="text-sm text-gray-600 mb-2">Describe one important shot. What effect does it have on the audience?</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>

                    <!-- Analysis Box 2 -->
                     <div>
                        <h4 class="font-bold text-slate-800 mb-1">Sound</h4>
                        <p class="text-sm text-gray-600 mb-2">Describe the key sounds in the scene (music, dialogue, sound effects). What mood do they create?</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <!-- Analysis Box 3 -->
                     <div>
                        <h4 class="font-bold text-slate-800 mb-1">Lighting</h4>
                        <p class="text-sm text-gray-600 mb-2">How is the scene lit? Is it bright or dark? What does the lighting tell you about the mood or characters?</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                </div>
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-indigo-50 to-red-50 p-4 rounded-xl border border-indigo-200">
                <h2 class="text-lg font-bold text-indigo-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md: grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-indigo-100">
                        <h3 class="font-semibold text-indigo-700 mb-2">English - Reading/Viewing</h3>
                        <p class="text-indigo-600 mb-1"><strong>Achievement Objective:</strong> RV4-3</p>
                        <p class="text-gray-700 text-xs">Critically evaluate texts through discussion and written response</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-red-100">
                        <h3 class="font-semibold text-red-700 mb-2">The Arts - Drama</h3>
                        <ul class="text-red-600 text-xs space-y-1">
                            <li>• Analyzing dramatic elements</li>
                            <li>• Understanding visual storytelling</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 text-center">
                    <a href="curriculum-alignment.html" class="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                        📋 View Full Curriculum Framework
                    </a>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default FilmSceneAnalysisHandout
