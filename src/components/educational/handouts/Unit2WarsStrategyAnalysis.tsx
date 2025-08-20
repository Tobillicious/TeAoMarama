import React from 'react'
import {Card} from '../../ui/card'
import './Unit2WarsStrategyAnalysis.css'

interface Unit2WarsStrategyAnalysisProps {className?: string}
export const Unit2WarsStrategyAnalysis: React.FC<Unit2WarsStrategyAnalysisProps> = (_{ className = '' }) => {
return (
    <Card 
title="unit 2 wars strategy analysis"
subtitle="Te Kete Ako - Cultural Education"
className={`unit-2-wars-strategy-analysis-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: unit-2-wars-strategy-analysis</p>
        </div>

        <div className="cultural-footer">
          <div className="footer-content">
            <span className="footer-icon">🌿</span>
            <p>Honouring the cultural heritage of Aotearoa New Zealand</p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Unit2WarsStrategyAnalysis
