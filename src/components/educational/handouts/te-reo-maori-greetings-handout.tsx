import React from 'react'
import {Card} from '../../Card'
import '../../../styles/te-kete-synthesis.css'

interface TeReoMaoriGreetingsHandoutProps {culturalContext?: string
  yearLevel?: string
  subject?: string}
const TeReoMaoriGreetingsHandout: React.FC<TeReoMaoriGreetingsHandoutProps> = (_{
culturalContext = "Māori cultural knowledge and Aotearoa context", 
_yearLevel = "Year 7-10", 
_subject = "Cross-curricular"
}) => {
return (
    <div className="te-reo-maori-greetings-handout">
      <Card title="Te Reo Māori Greetings Handout | Mangakōtukutuku College" className="handout-card cultural-focus">
        <div className="handout-header">
          <h1 className="handout-title">Te Reo Māori Greetings Handout | Mangakōtukutuku College</h1>
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
                <h1 class="page-title" class="wiley-hero-title">Basic Te Reo Māori Greetings</h1>
                <p class="page-subtitle">Everyday phrases for starting a conversation.</p>
            </div>

            <section class="mb-4">
                <div class="question-block">
                    <h2 class="section-title" class="wiley-section-title">The Importance of Greetings (Tikanga)</h2>
                    <p>In Te Ao Māori (the Māori world), greeting someone is more than just saying hello. It's about acknowledging their mana (prestige, spiritual power) and making a connection. Using Te Reo Māori greetings is a way of showing respect for the indigenous culture of Aotearoa and helping to keep the language alive.</p>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Greetings & Responses</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Kia ora</h3>
                        <p class="text-italic text-secondary">Pronounced: kee-ah o-ra</p>
                        <p class="text-sm">Hello (A general, all-purpose greeting for one person or many)</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Mōrena</h3>
                        <p class="text-italic text-secondary">Pronounced: moh-re-na</p>
                        <p class="text-sm">Good morning</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Ata mārie</h3>
                        <p class="text-italic text-secondary">Pronounced: a-ta maa-ree-eh</p>
                        <p class="text-sm">Good morning (a more formal alternative)</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Kei te pēhea koe?</h3>
                        <p class="text-italic text-secondary">Pronounced: kay teh peh-heh-a ko-eh</p>
                        <p class="text-sm">How are you? (to one person)</p>
                    </div>
                     <div class="technique-box">
                        <h3 class="mb-2">Kei te pai</h3>
                        <p class="text-italic text-secondary">Pronounced: kay teh pie</p>
                        <p class="text-sm">I am good / Fine</p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title" class="wiley-section-title">Introductions & Farewells</h2>
                <div class="space-y-4">
                    <div class="technique-box">
                        <h3 class="mb-2">Ko wai tō ingoa?</h3>
                        <p class="text-italic text-secondary">Pronounced: ko why toh e-ngo-a</p>
                        <p class="text-sm">What is your name?</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Ko [name] ahau.</h3>
                        <p class="text-italic text-secondary">Pronounced: ko [name] a-how</p>
                        <p class="text-sm">My name is [name].</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Ka kite anō</h3>
                        <p class="text-italic text-secondary">Pronounced: ka kee-teh ah-noh</p>
                        <p class="text-sm">See you again</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">Haere rā</h3>
                        <p class="text-italic text-secondary">Pronounced: ha-eh-reh raa</p>
                        <p class="text-sm">Goodbye (said to someone leaving)</p>
                    </div>
                    <div class="technique-box">
                        <h3 class="mb-2">E noho rā</h3>
                        <p class="text-italic text-secondary">Pronounced: eh no-ho raa</p>
                        <p class="text-sm">Goodbye (said to someone staying)</p>
                    </div>
                </div>
            </section>

            <section class="mb-4">
                <h2 class="section-title text-center" class="wiley-section-title">Mini-Conversation (He Kōrero Poto)</h2>
                <p class="text-center text-secondary text-sm mb-3">Here is how you might use these phrases together.</p>
                <div class="question-block">
                    <p><strong>Person A:</strong> Mōrena!</p>
                    <p><strong>Person B:</strong> Kia ora! Kei te pēhea koe?</p>
                    <p><strong>Person A:</strong> Kei te pai. Ko wai tō ingoa?</p>
                    <p><strong>Person B:</strong> Ko Hemi ahau.</p>
                    <p><strong>Person A:</strong> Ka kite anō, Hemi.</p>
                    <p><strong>Person B: </strong> Haere rā.</p>
                </div>
            </section>
        ` }}
          />
        </div>
      </Card>
    </div>
  )
}

export default TeReoMaoriGreetingsHandout
