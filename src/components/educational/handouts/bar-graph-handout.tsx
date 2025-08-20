import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface BarGraphHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const BarGraphHandout: React.FC<BarGraphHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="bar-graph-handout">
      <Card title="Bar Graph Worksheet" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Bar Graph Worksheet</h1>
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
            <!-- Instructions Section -->
            <section class="mb-4">
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h2 class="text-lg font-bold text-blue-800 mb-2" class="wiley-section-title">📋 Level 4 Achievement Objectives:</h2>
                    <ul class="text-sm text-gray-700 space-y-1">
                        <li>• <strong>Collect data</strong> using simple frequency tables</li>
                        <li>• <strong>Display data</strong> using bar graphs with appropriate scales</li>
                        <li>• <strong>Interpret data</strong> by reading values and comparing categories</li>
                        <li>• <strong>Make statements</strong> about patterns and relationships in the data</li>
                        <li>• <strong>Ask questions</strong> that can be answered using the data</li>
                    </ul>
                </div>
            </section>

            <!-- Graph 1 Section -->
            <section class="mb-4">
                <h2 class="text-lg font-bold text-gray-800 mb-2" class="wiley-section-title">🍕 Graph 1: Mangakōtukutuku College Students' Favourite
Lunch Options</h2>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                    <div class="chart-container">
                        <canvas id="homeworkChart" role="img" aria-label="Bar chart showing Mangakōtukutuku College students' favourite lunch options: Sandwiches 45 students, Pizza 32 students, Sushi 18 students, Pasta 25 students, and Salad 12 students. Sandwiches are the most popular choice."></canvas>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">1. What is the most popular lunch choice at our school?</p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">2. How many more students prefer sandwiches than sushi?</p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">3. What percentage of students chose pizza? (Show your working)
                        </p>
                        
                    </div>

                </div>
            </section>

            <!-- Graph 2 Section -->
            <section class="mb-4">
                <h2 class="text-lg font-bold text-gray-800 mb-2" class="wiley-section-title">🏃 Graph 2: Mangakōtukutuku College Sports Teams (Year
                    8-10)</h2>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                    <div class="chart-container">
                        <canvas id="deviceChart" role="img" aria-label="Bar chart showing Mangakōtukutuku College sports team participation for Years 8-10: Rugby 28 students, Netball 22 students, Basketball 18 students, Football 15 students, and Hockey 8 students. Rugby has the highest participation."></canvas>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">1. Which sport has the most students participating?</p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">2. How many students are in the rugby team?</p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">3. What is the total number of students in all sports teams?
                        </p>
                        
                    </div>

                </div>
            </section>

            <!-- Graph 3 Section -->
            <section class="mb-4">
                <h2 class="text-lg font-bold text-gray-800 mb-2" class="wiley-section-title">📚 Graph 3: Mangakōtukutuku College Library Book
Borrowing (This Term)</h2>
                <div class="bg-gray-50 p-3 rounded-lg border border-gray-200 mb-3">
                    <div class="chart-container">
                        <canvas id="sportsChart" role="img" aria-label="Bar chart showing Mangakōtukutuku College library book borrowing by genre this term: Fiction 156 books, Non-Fiction 89 books, Manga 67 books, Biography 43 books, and Science 34 books. Fiction books are borrowed most frequently with 389 total books borrowed."></canvas>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">1. Which book genre is borrowed most often?</p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">2. How many more fiction books were borrowed than non-fiction?
                        </p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm font-semibold">3. What is the total number of books borrowed this term?</p>
                        
                    </div>

                </div>
            </section>

            <!-- Challenge Section -->
            <section>
                <div class="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h2 class="text-lg font-bold text-purple-800 mb-2" class="wiley-section-title">✏️ Level 4 Challenge</h2>
                    <p class="text-sm text-gray-700 mb-3">Write a question about our school data that could be answered
by collecting more information: </p>
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

export default BarGraphHandout
