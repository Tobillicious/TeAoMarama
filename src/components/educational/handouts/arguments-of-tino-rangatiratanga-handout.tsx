import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ArgumentsOfTinoRangatiratangaHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ArgumentsOfTinoRangatiratangaHandout: React.FC<ArgumentsOfTinoRangatiratangaHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="arguments-of-tino-rangatiratanga-handout">
      <Card title="Arguments of Tino Rangatiratanga" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Arguments of Tino Rangatiratanga</h1>
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
                <div class="bg-red-50 p-4 rounded-xl border border-red-200">
                    <h2 class="text-xl font-bold text-red-800 mb-2" class="wiley-section-title">Context: A Nation on the Move</h2>
                    <p class="text-gray-700">
In 1975, a group of Māori leaders, led by Dame Whina Cooper, organized a march from the top of the North Island to Parliament in Wellington. The hīkoi (march) was a protest against the ongoing loss of Māori land. The arguments they made were not just emotional they were carefully structured, powerful, and designed to persuade a nation. This handout analyzes those arguments using the PEEL structure.
                    </p>
                    <p class="text-sm text-gray-600 mt-2">
This resource is a companion to the <a href="/writers-toolkit-peel-argument-handout.html" class="text-blue-500 hover: underline">PEEL Argument Handout</a>.
                    </p>
                </div>
        
            </section>

            <section class="mb-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4" class="wiley-section-title">Deconstructing the Argument</h2>
                <div class="space-y-4">
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg text-blue-700">P - Point: "Not one more acre of Māori land."</h3>
                        <p class="mt-2 text-gray-700">This was the central, unifying point of the entire movement. It was a clear, concise, and powerful statement of their goal. It argued that the historical process of land alienation had to stop immediately.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg text-blue-700">E - Evidence: The Memorial of Right</h3>
                        <p class="mt-2 text-gray-700">The marchers carried a 'Memorial of Right' to Parliament. This document was their key piece of evidence. It detailed the specific laws and government actions that had led to the loss of millions of acres of land since the signing of the Treaty of Waitangi. It listed statutes, dates, and the exact amount of land lost, providing factual evidence to support their point.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg text-blue-700">E - Explanation: The Betrayal of Te Tiriti</h3>
                        <p class="mt-2 text-gray-700">The leaders explained that this land loss was not just an economic issue it was a betrayal of the promises made in Te Tiriti o Waitangi. They explained that the Treaty was supposed to protect Māori tino rangatiratanga (sovereignty, self-determination), including their right to their lands. The loss of land, they explained, was a direct assault on their culture, identity, and mana.</p>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow">
                        <h3 class="font-bold text-lg text-blue-700">L - Link: A Call for Justice</h3>
                        <p class="mt-2 text-gray-700">The march linked the historical evidence of land loss directly to a call for present-day action. By walking the length of the island, they physically linked the land to the seat of power in Wellington. The final link was their demand: that the government honour the Treaty, protect the remaining Māori land, and begin a process of redress for past injustices. This led directly to the creation of the Waitangi Tribunal.</p>
                    </div>
                </div>
            </section>

            <section class="mb-6">
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h2 class="text-xl font-bold text-blue-800 mb-2" class="wiley-section-title">He Mahi (Practice Your Skills)</h2>
                    <p class="text-gray-700">
Now that you have seen a breakdown of the argument, it's your turn to analyze the primary source material yourself. The following handout contains excerpts from the 1975 Memorial of Right and a worksheet to help you build your own PEEL paragraph.
                    </p>
                    <a href="/primary-source-analysis-1975-memorial-of-right.html" class="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded hover: bg-blue-700 mt-2">Open the Analysis Worksheet</a>
                </div>
            </section>

            <section>
                <h2 class="text-2xl font-bold text-gray-800 mb-4" class="wiley-section-title">Critical Thinking</h2>
                <div class="bg-white p-4 rounded-lg shadow">
                    <p class="font-semibold mb-2">Why was using a structured, evidence-based argument like this more powerful than simply expressing anger or frustration? How did the PEEL structure help make their case to the government and the public?</p>
                    
                </div>
            </section>
            <section class="handout-footer">
                <div class="curriculum-links-box">
                    <h3>Further Reading & Viewing</h3>
                    <ul>
                        <li><a href="https: //nzhistory.govt.nz/culture/maori-land-march-1975" target="_blank" rel="noopener noreferrer">NZ History - The 1975 Māori Land March</a></li>
                        <li><a href="https://www.youtube.com/watch?v=8-g-b-c-g-c" target="_blank" rel="noopener noreferrer">The 1975 Land March - A Documentary</a></li>
                    </ul>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default ArgumentsOfTinoRangatiratangaHandout
