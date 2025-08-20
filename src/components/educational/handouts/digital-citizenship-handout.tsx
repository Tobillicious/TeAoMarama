import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface DigitalCitizenshipHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const DigitalCitizenshipHandout: React.FC<DigitalCitizenshipHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="digital-citizenship-handout">
      <Card title="Digital Citizenship Handout | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Digital Citizenship Handout | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Digital Citizenship & Online Safety</h1>
                <p class="page-subtitle">Being a responsible and safe member of the online world.</p>
            </div>

            <!-- Key Concepts Section -->
            <section class="mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">Core Pillars of Digital Citizenship</h2>
                <div class="grid grid-cols-1 md: grid-cols-2 gap-4">
                    <!-- Digital Footprint -->
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="text-2xl mr-3">👣</span>
                            <h3 class="mb-2">Digital Footprint</h3>
                        </div>
                        <p class="text-sm">This is the trail of data you leave behind online. It includes social media posts, search history, and photos you've shared. <strong>Think before you post!</strong></p>
                    </div>

                    <!-- Cyberbullying -->
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="text-2xl mr-3">😠</span>
                            <h3 class="mb-2">Cyberbullying</h3>
                        </div>
                        <p class="text-sm">Using digital technology to deliberately and repeatedly hurt, harass, or embarrass someone. It's never okay. <strong>Be an upstander, not a bystander.</strong></p>
                    </div>

                    <!-- Privacy & Security -->
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="text-2xl mr-3">🔒</span>
                            <h3 class="mb-2">Privacy & Security</h3>
                        </div>
                        <p class="text-sm">Protecting your personal information (like your full name, address, and passwords). Use strong, unique passwords and be careful what you share.</p>
                    </div>

                    <!-- Critical Thinking -->
                    <div class="technique-box">
                        <div class="flex items-center mb-2">
                            <span class="text-2xl mr-3">🤔</span>
                            <h3 class="mb-2">Critical Thinking</h3>
                        </div>
                        <p class="text-sm">Questioning what you see online. Is this information reliable? Is this person who they say they are? Not everything on the internet is true.</p>
                    </div>
                </div>
            </section>

            <!-- T.H.I.N.K. Before You Post Section -->
            <section class="mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">T.H.I.N.K. Before You Post</h2>
                <div class="question-block">
                    <ul>
                        <li><strong>T</strong> - Is it <strong>True?</strong></li>
                        <li><strong>H</strong> - Is it <strong>Helpful?</strong></li>
                        <li><strong>I</strong> - Is it <strong>Inspiring?</strong></li>
                        <li><strong>N</strong> - Is it <strong>Necessary?</strong></li>
                        <li><strong>K</strong> - Is it <strong>Kind?</strong></li>
                    </ul>
                </div>
            </section>

            <!-- Scenario Analysis Section -->
            <section class="mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">Scenario Analysis 🧐</h2>
                <div class="space-y-4">
                    <!-- Scenario 1 -->
                    <div class="question-block">
                        <p class="text-italic mb-2"><strong>Scenario 1: </strong> Your friend posts an embarrassing photo of you online as a joke. It's getting a lot of likes and comments. What should you do?</p>

                    </div>

                    <!-- Scenario 2 -->
                    <div class="question-block">
                        <p class="text-italic mb-2"><strong>Scenario 2:</strong> You receive a friend request from someone you don't know. They have a lot of mutual friends. Should you accept?</p>

                    </div>
                    
                    <!-- Scenario 3 -->
                    <div class="question-block">
                        <p class="text-italic mb-2"><strong>Scenario 3:</strong> You see a mean comment about another student on a group chat. What are your options?</p>

                    </div>
                </div>
            </section>

            <!-- Curriculum Alignment Section -->
            <section class="mt-6 bg-gradient-to-r from-violet-50 to-blue-50 p-4 rounded-xl border border-violet-200">
                <h2 class="text-lg font-bold text-violet-800 mb-3 text-center" class="wiley-section-title">📚 NZ Curriculum Alignment</h2>
                <div class="grid md:grid-cols-2 gap-4 text-sm">
                    <div class="bg-white p-3 rounded-lg border border-violet-100">
                        <h3 class="font-semibold text-violet-700 mb-2">Digital Technologies</h3>
                        <p class="text-violet-600 mb-1"><strong>Achievement Objective:</strong> DC4-1</p>
                        <p class="text-gray-700 text-xs">Understand digital citizenship and online safety</p>
                    </div>
                    <div class="bg-white p-3 rounded-lg border border-blue-100">
                        <h3 class="font-semibold text-blue-700 mb-2">Key Competencies</h3>
                        <ul class="text-blue-600 text-xs space-y-1">
                            <li>• Relating to others online responsibly</li>
                            <li>• Managing self in digital environments</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-3 text-center">
                    <a href="curriculum-alignment.html" class="inline-block bg-violet-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-violet-700 transition-colors">
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

export default DigitalCitizenshipHandout
