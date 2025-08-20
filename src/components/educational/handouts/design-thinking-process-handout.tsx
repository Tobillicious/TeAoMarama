import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface DesignThinkingProcessHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const DesignThinkingProcessHandout: React.FC<DesignThinkingProcessHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="design-thinking-process-handout">
      <Card title="Design Thinking Process Handout" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Design Thinking Process Handout</h1>
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
            <!-- Stages of Design Thinking Section -->
            <section class="mb-4">
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div class="stage-card col-span-2 md:col-span-1 bg-blue-50 border-blue-200">
                        <div class="stage-icon">👥</div>
                        <h2 class="font-bold text-lg text-blue-800" class="wiley-section-title">1. Empathise</h2>
                        <p class="text-sm text-gray-700">Understand the user's needs, thoughts, and feelings. Who are you designing for?</p>
                    </div>
                    <div class="stage-card bg-green-50 border-green-200">
                        <div class="stage-icon">🎯</div>
                        <h2 class="font-bold text-lg text-green-800" class="wiley-section-title">2. Define</h2>
                        <p class="text-sm text-gray-700">Clearly state the problem you are trying to solve based on your user's needs.</p>
                    </div>
                    <div class="stage-card bg-purple-50 border-purple-200">
                        <div class="stage-icon">💡</div>
                        <h2 class="font-bold text-lg text-purple-800" class="wiley-section-title">3. Ideate</h2>
                        <p class="text-sm text-gray-700">Brainstorm a wide range of creative solutions and ideas. Think outside the box!</p>
                    </div>
                    <div class="stage-card bg-orange-50 border-orange-200">
                        <div class="stage-icon">🛠️</div>
                        <h2 class="font-bold text-lg text-orange-800" class="wiley-section-title">4. Prototype</h2>
                        <p class="text-sm text-gray-700">Build a simple, low-cost version of your solution to see how it works.</p>
                    </div>
                    <div class="stage-card bg-red-50 border-red-200 col-span-2 md: col-span-1">
                        <div class="stage-icon">🧪</div>
                        <h2 class="font-bold text-lg text-red-800" class="wiley-section-title">5. Test</h2>
                        <p class="text-sm text-gray-700">Get feedback from users on your prototype. What works? What doesn't?</p>
                    </div>
                </div>
                 <p class="text-center text-gray-600 text-sm mt-3">Design Thinking is a cycle! You often go back to earlier steps based on what you learn.</p>
            </section>

            <!-- Design Challenge Section -->
            <section>
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-3 border-t-2 border-gray-200 pt-4" class="wiley-section-title">Design Challenge: The Perfect School Bag</h2>
                <p class="text-center text-gray-600 text-sm mb-3">Apply the Design Thinking process to design a better school bag for students.</p>
                <div class="space-y-3 text-sm">
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-bold mb-1 text-blue-800">1. Empathise: What are the problems with current school bags?</p>
                        <p class="italic text-xs text-gray-600 mb-1">(Interview a friend or think about your own experience)</p>

                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-bold mb-1 text-green-800">2. Define: What is the main problem you want to solve?</p>
                         
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-bold mb-1 text-purple-800">3. Ideate: Brainstorm 3-5 features for your new bag design.</p>

                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-bold mb-1 text-orange-800">4. Prototype: Draw a quick sketch of your new school bag design.</p>
                        
                    </div>
                     <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-bold mb-1 text-red-800">5. Test: How would you get feedback on your design?</p>
                        
                    </div>
                </div>
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-green-50 to-purple-50 p-4 rounded-xl border border-green-200">
                <h2 class="text-lg font-bold text-green-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-green-100">
                        <h3 class="font-semibold text-green-700 mb-2">Digital Technologies</h3>
                        <p class="text-green-600 mb-1"><strong>Achievement Objective:</strong> DT4-1</p>
                        <p class="text-gray-700 text-xs">Understand how technological systems are created to meet needs</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-purple-100">
                        <h3 class="font-semibold text-purple-700 mb-2">Key Competencies</h3>
                        <ul class="text-purple-600 text-xs space-y-1">
                            <li>• Thinking creatively and critically</li>
                            <li>• Managing self through design process</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 text-center">
                    <a href="curriculum-alignment.html" class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
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

export default DesignThinkingProcessHandout
