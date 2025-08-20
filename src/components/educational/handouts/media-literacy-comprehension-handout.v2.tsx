import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface MediaLiteracyComprehensionHandout.V2Props {
culturalContext?: string
  yearLevel?: string
  subject?: string
}
const MediaLiteracyComprehensionHandout.V2: React.FC<MediaLiteracyComprehensionHandout.V2Props> = (_{
culturalContext = "Educational content with cultural integration", 
_yearLevel = "Year 7-8", 
_subject = "English,  _Literacy"
}) => {
return (
    <div className="media-literacy-comprehension-handout.v2">
      <Card title="Media Literacy: Navigating the Digital World | Te Kete Ako" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Media Literacy: Navigating the Digital World | Te Kete Ako</h1>
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
            <section class="handout-section">
                <h2 class="wiley-section-title">The Information Maze</h2>
                <p>Today, anyone can be a publisher. This is exciting, but it also means we need to be careful. Misinformation (accidental falsehoods) and disinformation (deliberate lies) can spread like wildfire. This handout will give you the tools to spot them.</p>
            </section>

            <section class="handout-section">
                <h2 class="wiley-section-title">Why Does Fake News Spread So Fast?</h2>
                <p>A study by MIT found that false news is <strong>70% more likely</strong> to be shared than the truth. Why? Because it's often designed to be shocking, emotional, and to confirm what we already believe (this is called confirmation bias).</p>
            </section>

            <div class="task-box">
                <h3>Task 1: Spot the Difference</h3>
                <p>In your own words, what is the difference between misinformation and disinformation? Think about intent.</p>
                
            </div>
        

            <div class="task-box">
                <h3>Task 2: Filter Bubbles</h3>
                <p>Social media uses algorithms to show you things it thinks you'll like. How could this create a "filter bubble" or "echo chamber"? What are the dangers of only hearing opinions you agree with?</p>
                
            </div>

            <section class="handout-section">
                <h2 class="wiley-section-title">Your Critical Thinking Toolkit</h2>
                <p>Before you believe or share something, ask these questions: </p>
                <ul>
                    <li><strong>Who created this?</strong> Are they a real person? An expert?</li>
                    <li><strong>What is the source?</strong> Is it a reputable news organisation or a random blog?</li>
                    <li><strong>Why was this made?</strong> To inform? To persuade? To make you angry?</li>
                    <li><strong>How can I check this?</strong> Can you find the same information on other trusted websites?</li>
                </ul>
            </section>

            <div class="task-box">
                <h3>Task 3: You're the Detective</h3>
                <p>You see a headline: "Scientists Announce That Gaming Makes You a Genius!" What are two steps you would take to check if this is true?</p>
                
            </div>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default MediaLiteracyComprehensionHandout.V2
