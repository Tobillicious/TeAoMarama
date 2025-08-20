import React from 'react'
import {Card} from '../../ui/card'
import './TraditionalDyeChemistry.css'

interface TraditionalDyeChemistryProps {className?: string}
export const TraditionalDyeChemistry: React.FC<TraditionalDyeChemistryProps> = (_{ className = '' }) => {
return (
    <Card 
title="traditional dye chemistry"
subtitle="Te Kete Ako - Cultural Education"
className={`traditional-dye-chemistry-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: traditional-dye-chemistry</p>
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

export default TraditionalDyeChemistry
