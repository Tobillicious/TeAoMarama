import React from 'react'
import {Card} from '../../ui/card'
import './IwiPopulationGraphs.css'

interface IwiPopulationGraphsProps {className?: string}
export const IwiPopulationGraphs: React.FC<IwiPopulationGraphsProps> = (_{ className = '' }) => {
return (
    <Card 
title="iwi population graphs"
subtitle="Te Kete Ako - Cultural Education"
className={`iwi-population-graphs-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: iwi-population-graphs</p>
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

export default IwiPopulationGraphs
