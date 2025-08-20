import React from 'react';
import { Card } from '../../ui/Card';
import './MaoriBattalionLegacy.css';

interface MaoriBattalionLegacyProps {
  className?: string;
}

export const MaoriBattalionLegacy: React.FC<MaoriBattalionLegacyProps> = ({ className = '' }) => {
  return (
    <Card 
      title='"Ake Ake Kia Kaha E!": The Legacy of the 28th (Māori) Battalion' 
      subtitle="Service, Sacrifice, and the Fight for Citizenship"
      className={`maori-battalion-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        {/* Whakataukī Header */}
        <div className="whakatauki-section">
          <div className="whakatauki-content">
            <span className="whakatauki-icon">🌿</span>
            <blockquote className="whakatauki-text">
              "He kōrero te kai a te rangatira."
            </blockquote>
            <p className="whakatauki-translation">Speech is the food of chiefs.</p>
          </div>
        </div>

        {/* Main Content */}
        <section className="content-section">
          <h2 className="section-title cultural-title">
            <span className="title-icon">⚔️</span>
            The Price of Citizenship
          </h2>
          <p className="content-text">
            During World War II, thousands of Māori men volunteered to fight for New Zealand. 
            They formed the 28th (Māori) Battalion, which became one of the most celebrated 
            and feared infantry units in the Allied forces. Their service was driven by a 
            complex mix of loyalty, warrior tradition (mana), and the belief that their 
            sacrifice on the battlefield would earn them equal citizenship and respect back 
            home in Aotearoa.
          </p>
        </section>

        <section className="content-section">
          <h2 className="section-title cultural-title">
            <span className="title-icon">🔄</span>
            A Paradox of Service
          </h2>
          
          <div className="paradox-grid">
            <div className="paradox-card fighting-abroad">
              <div className="paradox-header">
                <span className="paradox-icon">🌍</span>
                <h3>Fighting for Freedom Abroad</h3>
              </div>
              <p>
                The Battalion fought with incredible bravery in Greece, Crete, North Africa, 
                and Italy. They earned a formidable reputation for their courage and skill 
                in close-quarters combat. Their motto, "Ake Ake Kia Kaha E!" (For ever and 
                ever, be strong!), embodied their fierce determination.
              </p>
            </div>

            <div className="paradox-card fighting-home">
              <div className="paradox-header">
                <span className="paradox-icon">🏠</span>
                <h3>Fighting for Rights at Home</h3>
              </div>
              <p>
                When the soldiers returned, they were often denied the same rights and 
                opportunities as their Pākehā comrades. Many were unable to get loans to 
                buy farms or houses, and they returned to a society where racial 
                discrimination was still common. This created a bitter paradox: they had 
                fought against tyranny overseas, only to face injustice in their own homeland.
              </p>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2 className="section-title cultural-title">
            <span className="title-icon">💭</span>
            Critical Thinking
          </h2>
          <div className="critical-thinking-box">
            <p className="thinking-question">
              <strong>The government was reluctant to create a separate Māori battalion. 
              Why do you think Māori leaders pushed so hard for it? What did having their 
              own battalion represent?</strong>
            </p>
          </div>
        </section>

        {/* External Resources */}
        <section className="external-resources-section">
          <div className="resources-header">
            <span className="resources-icon">🌿</span>
            <h3>Nga Rauemi Tauwehe - External Resources</h3>
          </div>
          <p className="resources-description">
            High-quality resources from official New Zealand education sites to extend and 
            enrich this learning content.
          </p>
          
          <div className="resources-list">
            <div className="resource-item">
              <h4>
                <a 
                  href="https://www.28maoribattalion.org.nz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  28th Māori Battalion Official Website
                </a>
              </h4>
              <div className="resource-tags">
                <span className="tag official">Official Resource</span>
                <span className="tag years">Years 7-13</span>
                <span className="tag match">95% Match</span>
              </div>
            </div>

            <div className="resource-item">
              <h4>
                <a 
                  href="https://teara.govt.nz/en/28-maori-battalion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  Te Ara - The Encyclopedia of New Zealand
                </a>
              </h4>
              <div className="resource-tags">
                <span className="tag official">Official Resource</span>
                <span className="tag years">Years 7-13</span>
                <span className="tag match">88% Match</span>
              </div>
            </div>

            <div className="resource-item">
              <h4>
                <a 
                  href="https://nzhistory.govt.nz/war/maori-in-second-world-war/maori-battalion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="resource-link"
                >
                  NZ History - The 28th (Māori) Battalion
                </a>
              </h4>
              <div className="resource-tags">
                <span className="tag official">Official Resource</span>
                <span className="tag years">Years 7-13</span>
                <span className="tag match">92% Match</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cultural Footer */}
        <div className="cultural-footer">
          <div className="footer-content">
            <span className="footer-icon">🌿</span>
            <p className="footer-text">
              This content honours the legacy of the 28th (Māori) Battalion and their 
              contribution to Aotearoa New Zealand. We acknowledge their service, sacrifice, 
              and the ongoing impact of their legacy on our nation's journey toward 
              equality and justice.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};


export default MaoriBattalionLegacy;
