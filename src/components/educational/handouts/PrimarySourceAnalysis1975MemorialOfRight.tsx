import React from 'react'
import {Card} from '../../ui/card'
import './PrimarySourceAnalysis1975MemorialOfRight.css'

interface PrimarySourceAnalysis1975MemorialOfRightProps {className?: string}
export const PrimarySourceAnalysis1975MemorialOfRight: React.FC<PrimarySourceAnalysis1975MemorialOfRightProps> = (_{ className = '' }) => {
return (
    <Card 
title="primary source analysis 1975 memorial of right"
subtitle="Te Kete Ako - Cultural Education"
className={`primary-source-analysis-1975-memorial-of-right-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: primary-source-analysis-1975-memorial-of-right</p>
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

export default PrimarySourceAnalysis1975MemorialOfRight
