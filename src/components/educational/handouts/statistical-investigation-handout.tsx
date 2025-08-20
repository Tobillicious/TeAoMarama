import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface StatisticalInvestigationHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const StatisticalInvestigationHandout: React.FC<StatisticalInvestigationHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="statistical-investigation-handout">
      <Card title="Statistical Investigation Guide | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Statistical Investigation Guide | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">🔬 Statistical Investigation Guide</h1>
                <p class="page-subtitle">Level 4: Plan and conduct investigations using the statistical enquiry
cycle</p>
            </div>

            <!-- Investigation Cycle Section -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">📊 The Statistical Enquiry Cycle</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="step-number">1</span>
                            <h3 class="mb-2">Problem</h3>
                        </div>
                        <p class="text-xs text-secondary">What question do you want to answer?</p>
                    </div>
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="step-number">2</span>
                            <h3 class="mb-2">Plan</h3>
                        </div>
                        <p class="text-xs text-secondary">How will you collect your data?</p>
                    </div>
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="step-number">3</span>
                            <h3 class="mb-2">Data</h3>
                        </div>
                        <p class="text-xs text-secondary">Collect and organize your information</p>
                    </div>
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="step-number">4</span>
                            <h3 class="mb-2">Analysis</h3>
                        </div>
                        <p class="text-xs text-secondary">What patterns do you see?</p>
                    </div>
                </div>
            </section>

            <!-- Data Collection Methods -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">📋 Data Collection Methods</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">🎯 Surveys & Questionnaires</h3>
                        <p class="text-xs text-secondary">Ask people questions to gather opinions and preferences</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">👀 Observations</h3>
                        <p class="text-xs text-secondary">Watch and record what happens naturally</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">📊 Existing Data</h3>
                        <p class="text-xs text-secondary">Use information that's already been collected</p>
                    </div>
                </div>
            </section>

            <!-- Example Investigation -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">🔍 Example: School Lunch Investigation</h2>
                <div class="question-block mb-3">
                    <div class="chart-container">
                        <canvas id="lunchChart" role="img" aria-label="Bar chart showing school lunch investigation results with data for different lunch options, demonstrating how statistical investigation can be used to analyze student preferences and draw conclusions about the most popular food choices"></canvas>
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="flex items-center space-x-4">
                        <p class="text-sm"><strong>1. What was the investigation question?</p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm"><strong>2. How was this data collected?</p>
                        
                    </div>
                    <div class="flex items-center space-x-4">
                        <p class="text-sm"><strong>3. What conclusion can you draw?</p>
                        
                    </div>
                </div>
            </section>

            <!-- Your Investigation Plan -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">✏️ Plan Your Own Investigation</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Step 1: Choose Your Question</h3>
                        <p class="text-xs text-secondary mb-2">What do you want to find out about your school?</p>
                        
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Step 2: Plan Your Data Collection</h3>
                        <p class="text-xs text-secondary mb-2">How will you gather your information?</p>
                        <div class="space-y-2">
                            <label class="flex items-center text-xs"><input type="checkbox" class="mr-2"> Survey
students</label>
                            <label class="flex items-center text-xs"><input type="checkbox" class="mr-2"> Count
observations</label>
                            <label class="flex items-center text-xs"><input type="checkbox" class="mr-2"> Use school
records</label>
                        </div>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Step 3: Design Your Data Table</h3>
                        <div class="question-block">
                            <table class="w-full text-xs">
                                <tr class="border-b">
                                    <td class="font-bold p-1">Category</td>
                                    <td class="font-bold p-1">Count</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-1">_____________</td>
                                    <td class="p-1">_____</td>
                                </tr>
                                <tr class="border-b">
                                    <td class="p-1">_____________</td>
                                    <td class="p-1">_____</td>
                                </tr>
                                <tr>
                                    <td class="p-1">_____________</td>
                                    <td class="p-1">_____</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Key Terms -->
            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">📖 Key Statistical Terms</h2>
                <div class="grid grid-cols-2 gap-4">
                    <div class="question-block">
                        <p class="text-xs"><strong>Mode:</strong> Most common value</p>
                    </div>
                    <div class="question-block">
                        <p class="text-xs"><strong>Range:</strong> Difference between highest and lowest</p>
                    </div>
                    <div class="question-block">
                        <p class="text-xs"><strong>Total:</strong> Sum of all values</p>
                    </div>
                    <div class="question-block">
                        <p class="text-xs"><strong>Category:</strong> Group of similar items</p>
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

export default StatisticalInvestigationHandout
