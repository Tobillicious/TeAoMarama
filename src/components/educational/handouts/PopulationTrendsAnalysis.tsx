import React from 'react'
import {Card} from '../../ui/card'
import './PopulationTrendsAnalysis.css'

interface PopulationTrendsAnalysisProps {className?: string}
export const PopulationTrendsAnalysis: React.FC<PopulationTrendsAnalysisProps> = (_{ className = '' }) => {
return (
    <Card 
title="population trends analysis"
subtitle="Te Kete Ako - Cultural Education"
className={`population-trends-analysis-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: population-trends-analysis</p>
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

export default PopulationTrendsAnalysis
