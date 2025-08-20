import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MediaLiteracyComprehensionHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const MediaLiteracyComprehensionHandout: React.FC<MediaLiteracyComprehensionHandoutProps> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="media-literacy-comprehension-handout">
      <Card title="Media Literacy Reading Comprehension | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Media Literacy Reading Comprehension | Te Kete Ako</h1>
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
            <div style="margin-bottom: 2rem">
                <a href="handouts.html" class="breadcrumb">&larr Back to Handouts</a>
                <h1 class="page-title" class="wiley-hero-title">Media Literacy Reading Comprehension</h1>
                <p class="page-subtitle">Developing critical thinking skills for analyzing media</p>
            </div>

            <div class="no-print" style="background-color: var(--color-surface) padding: var(--space-4) border-radius: var(--radius-md) margin-bottom: 2rem text-align: center">
                <button onclick="window.print()" style="background-color: var(--color-secondary) color: white border: none padding: 0.75rem 1.5rem border-radius: 6px font-weight: bold cursor: pointer">
Print or Save as PDF
                </button>
            </div>

            <article class="handout-content">
                            <header class="site-header no-print">
        <div class="nav-container">
            <a href="index.html" class="nav-brand">Te Kete Ako</a>
            <nav class="main-nav">
                <ul>
                    <li>
                        <a href="unit-plans.html">
                            <span class="nav-icon">📚</span>
                            <span class="nav-text-en">Unit Plans</span>
                            <span class="nav-text-mi" lang="mi">Ngā Waehere</span>
                        </a>
                    </li>
                    <li>
                        <a href="teachers/index.html">
                            <span class="nav-icon">🧑‍🏫</span>
                            <span class="nav-text-en">Teachers</span>
                            <span class="nav-text-mi" lang="mi">Ngā Kaiako</span>
                        </a>
                    </li>
                    <li>
                        <a href="lessons.html">
                            <span class="nav-icon">🎓</span>
                            <span class="nav-text-en">Lessons</span>
                            <span class="nav-text-mi" lang="mi">Ngā Akoranga</span>
                        </a>
                    </li>
                    <li>
                        <a href="handouts.html">
                            <span class="nav-icon">📄</span>
                            <span class="nav-text-en">Handouts</span>
                            <span class="nav-text-mi" lang="mi">Ngā Rauemi</span>
                        </a>
                    </li>
                    <li>
                        <a href="games.html">
                            <span class="nav-icon">🎮</span>
                            <span class="nav-text-en">Games</span>
                            <span class="nav-text-mi" lang="mi">Ngā Kēmu</span>  
                        </a>
                    </li>
                    <li class="auth-nav my-kete-link" style="display: none">
                        <a href="my-kete.html">
                            <span class="nav-icon">🧺</span>
My Kete
                        </a>
                    </li>
                    <li class="auth-nav">
                        <a href="login.html" class="login-btn">
                            <span class="nav-icon">👤</span>
Login
                        </a>
                    </li>
                    <li class="auth-nav" style="display: none">
                        <a href="register-simple.html" class="register-btn">
                            <span class="nav-icon">📝</span>
Register
                        </a>
                    </li>
                </ul>
            </nav>
            <nav class="breadcrumbs no-print" aria-label="Breadcrumb">
                <ol id="breadcrumbs" class="breadcrumbs-list"></ol>
            </nav>
        </div>
    </header>
    <div class="mobile-nav-overlay" id="mobileNavOverlay" onclick="closeMobileNav()"></div>

        <main>
            <article class="mb-6 prose max-w-none">
                <h2 class="text-xl font-bold text-gray-800 mb-2" class="wiley-section-title">Navigating the Modern Information Maze</h2>
                <p class="text-justify">
In the past, information was primarily distributed by a small number of trusted sources, like established newspapers and television networks. Today, the internet and social media have created a vast, decentralised information landscape where anyone can be a publisher. While this has democratised the flow of information, it has also created a significant challenge: the rise of "fake news," or more accurately, misinformation and disinformation. Misinformation is false information spread unintentionally, while disinformation is false information spread deliberately to deceive.
                </p>
                <p class="text-justify">
These false narratives often spread faster and wider than factual reporting. A 2018 study by MIT found that false news on Twitter was 70% more likely to be retweeted than the truth. This is because false stories are often more novel and emotionally charged, appealing to our biases and fears. Social media algorithms, which are designed to maximise engagement, can amplify this problem by creating "filter bubbles" or "echo chambers." These algorithms show us content they think we will like, reinforcing our existing beliefs and limiting our exposure to different perspectives. This can make it difficult to distinguish fact from fiction.
                </p>
                <p class="text-justify">
Developing strong media literacy skills is the essential defence against this modern problem. This involves more than just consuming information it requires active questioning and critical evaluation. Key strategies include checking the source of an article, looking for evidence and corroboration from other reputable outlets, and being aware of our own emotional responses to a story. Before sharing a shocking headline, a critical thinker asks: Who created this? Why did they create it? And who benefits from me believing it? In an age of information overload, the ability to critically evaluate sources is no longer just an academic skill—it is a fundamental requirement for responsible citizenship.
                </p>
            </article>

            <section>
                <h3 class="text-xl font-bold text-gray-800 mb-4 border-t-2 border-gray-200 pt-4">Comprehension & Critical Thinking Questions</h3>
                
                <div class="space-y-5">
                    <div>
                        <p class="font-semibold mb-2">1. What is the key difference between misinformation and disinformation?</p>
                        <div class="text-sm">
                            <p>The key difference is intent. Misinformation is spread by accident, whereas disinformation is spread deliberately to deceive.</p>
                        </div>
                    </div>

                    <div>
                        <p class="font-semibold mb-2">2. (Numeracy) According to the MIT study, if a true news story was retweeted 1,000 times, how many times would a false news story be expected to be retweeted?</p>
                         <div class="text-sm">
                            <p>1,000 x 1.70 = 1,700 times.</p>
                        </div>
                    </div>

                    <div>
                        <p class="font-semibold mb-2">3. What is a "filter bubble" or "echo chamber"?</p>
                        <div class="text-sm">
                            <p>It's a situation where you primarily see content that confirms your existing beliefs, limiting exposure to different views.</p>
                        </div>
                    </div>

                    <div>
                        <p class="font-semibold mb-2">4. (Critical Thinking) The text states that false news often appeals to our "biases and fears." Why would this make it more likely to be shared?</p>
                        <div class="h-16 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
                    </div>
                    
                    <div>
                        <p class="font-semibold mb-2">5. (Critical Thinking) Imagine you see a headline on social media that says: "Scientists Prove That Eating Chocolate Cures All Illnesses." What are two specific steps you would take to verify this claim before believing or sharing it?</p>
                        <div class="h-20 bg-gray-50 border border-gray-300 rounded-md p-2">

                        </div>
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

export default MediaLiteracyComprehensionHandout
