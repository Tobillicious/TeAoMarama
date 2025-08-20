import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface ProbabilityHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const ProbabilityHandout: React.FC<ProbabilityHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="probability-handout">
      <Card title="Introduction to Probability Handout | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Introduction to Probability Handout | Te Kete Ako</h1>
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
            <!-- Probability Scale Section -->
            <section class="mb-4">
                <h2 class="text-xl font-bold text-gray-800 text-center mb-3" class="wiley-section-title">The Probability Scale</h2>
                <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <div class="relative h-8">
                        
                        <div class="absolute w-full flex justify-between text-center text-xs font-semibold">
                            <div class="w-1/4">
                                <p>Impossible</p>
                                
                                <p class="font-bold">0</p>
                            </div>
                            <div class="w-1/4">
                                <p>Unlikely</p>
                            </div>
                            <div class="w-1/4">
                                <p>Even Chance</p>
                                
                                <p class="font-bold">0.5 or 1/2</p>
                            </div>
                            <div class="w-1/4">
                                <p>Likely</p>
                            </div>
                            <div class="w-1/4">
                                <p>Certain</p>
                                
                                <p class="font-bold">1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Calculating Probability Section -->
            <section class="mb-4">
                <h2 class="text-xl font-bold text-gray-800 text-center mb-3 border-t-2 border-gray-200 pt-3" class="wiley-section-title">Calculating Probability</h2>
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200 text-center">
                    <p class="text-gray-700">The probability of an event is calculated with this formula:</p>
                    <p class="text-lg font-bold text-blue-800 my-2">P(event) = Number of favourable outcomes / Total number of possible outcomes</p>
                    <p class="text-sm text-gray-600">For example, the probability of rolling a 4 on a standard six-sided die is 1/6, because there is one '4' and six possible outcomes in total.</p>
                </div>
            </section>

            <!-- Practice Problems Section -->
            <section>
                <h2 class="text-2xl font-bold text-gray-800 text-center mb-4 border-t-2 border-gray-200 pt-4" class="wiley-section-title">Probability Practice 🎲</h2>
                <div class="space-y-3 text-sm">
                    <!-- Problem 1 -->
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-semibold text-gray-800 mb-2">1. A bag contains 5 red marbles, 3 blue marbles, and 2 green marbles.</p>
                        <div class="space-y-2 pl-4">
                            <div class="flex items-center">
                                <p class="w-48">a) What is the probability of pulling out a blue marble?</p>
                                
                            </div>
                            <div class="flex items-center">
                                <p class="w-48">b) What is the probability of pulling out a red marble?</p>
                                
                            </div>
                             <div class="flex items-center">
                                <p class="w-48">c) Is it more likely to pull a red or a blue marble?</p>
                                
                            </div>
                        </div>
                    </div>

                    <!-- Problem 2 -->
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-semibold text-gray-800 mb-2">2. You spin a spinner with 8 equal sections numbered 1-8.</p>
                        <div class="space-y-2 pl-4">
                            <div class="flex items-center">
                                <p class="w-48">a) What is the probability of landing on an even number?</p>
                                
                            </div>
                            <div class="flex items-center">
                                <p class="w-48">b) What is the probability of landing on a number greater than 5?</p>
                                
                            </div>
                        </div>
                    </div>
                    
                    <!-- Problem 3 -->
                    <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p class="font-semibold text-gray-800 mb-2">3. Mark the following events on the probability scale below.</p>
                        <p class="pl-4 text-gray-600">A) You will have homework this week. <br> B) A coin flip will land on heads. <br> C) It will snow in Auckland in July.</p>
                        <div class="relative h-8 mt-4">
                            
                            <div class="absolute w-full flex justify-between text-center text-xs font-semibold">
                                <span>Impossible</span>
                                <span>Even Chance</span>
                                <span>Certain</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl border border-green-200">
                <h2 class="text-lg font-bold text-green-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md: grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-green-100">
                        <h3 class="font-semibold text-green-700 mb-2">Mathematics & Statistics</h3>
                        <p class="text-green-600 mb-1"><strong>Achievement Objective:</strong> S4-1</p>
                        <p class="text-gray-700 text-xs">Plan and conduct investigations using the statistical enquiry cycle</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-blue-100">
                        <h3 class="font-semibold text-blue-700 mb-2">Key Competencies</h3>
                        <ul class="text-blue-600 text-xs space-y-1">
                            <li>• Thinking critically about probability concepts</li>
                            <li>• Using mathematical language and symbols</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 text-center">
                    <a href="curriculum-alignment.html" class="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        📋 View Full Curriculum Framework
                    </a>
                </div>
            </section>
            </article>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default ProbabilityHandout
