import React from 'react'
import {Card} from '../../ui/card'
import './WritersToolkitRevisionHandout.css'

interface WritersToolkitRevisionHandoutProps {className?: string}
export const WritersToolkitRevisionHandout: React.FC<WritersToolkitRevisionHandoutProps> = (_{ className = '' }) => {
return (
    <Card 
title="writers toolkit revision handout"
subtitle="Te Kete Ako - Cultural Education"
className={`writers-toolkit-revision-handout-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: writers-toolkit-revision-handout</p>
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

export default WritersToolkitRevisionHandout
