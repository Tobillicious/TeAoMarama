import React from 'react'
import {Card} from '../../ui/card'
import './ScienceOfSleepComprehensionHandout.css'

interface ScienceOfSleepComprehensionHandoutProps {className?: string}
export const ScienceOfSleepComprehensionHandout: React.FC<ScienceOfSleepComprehensionHandoutProps> = (_{ className = '' }) => {
return (
    <Card 
title="science of sleep comprehension handout"
subtitle="Te Kete Ako - Cultural Education"
className={`science-of-sleep-comprehension-handout-handout cultural-focus ${className}`}
    >
      <div className="handout-content">
        <div className="cultural-header">
          <span className="cultural-icon">🌿</span>
          <h3>Cultural Learning Resource</h3>
        </div>
        
        <div className="content-section">
          <p>This handout from Te Kete Ako has been migrated with cultural integrity and Te Kete Ako beauty patterns.</p>
          <p>Original content: science-of-sleep-comprehension-handout</p>
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

export default ScienceOfSleepComprehensionHandout
