import React from 'react'
import './RelatedResources.css'

// Dynamic resource integration for ERO demonstration
interface EducationalResource {,
id: string,
title: string,
subject: string,
yearLevel: string,
description: string
  culturalRelevance?: string,
priority: 'high' | 'medium' | 'low'
  url?: string}
interface RelatedResourcesProps {,
resources: EducationalResource[],
resourceStats: {,
total: number,
cultural: number,
highPriority: number,
year8: number}
  title?: string
}
export const RelatedResources: React.FC<RelatedResourcesProps> = (_{
resources, 
_resourceStats, 
_title = '📚 Related Educational Resources', 
_}) => {
if (!resources || resources.length === 0) return null

return (
_<section className="related-resources-section">
      <h3>{title}</h3>
      <div className="resources-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <span className={`priority-badge priority-${resource.priority}`}>
                {resource.priority === 'high' ? '🔥' : resource.priority === 'medium' ? '⚡' : '📖'}
              </span>
              <span className="subject-badge">{resource.subject}</span>
            </div>
            <div className="resource-content">
              <h4 className="resource-title">{resource.title}</h4>
              <p className="resource-description">{resource.description}</p>
              {resource.culturalRelevance && (
                <p className="cultural-relevance">
                  <strong>🌿 Cultural Relevance: </strong> {resource.culturalRelevance}
                </p>
              )}
              <div className="resource-meta">
                <span className="year-level">{resource.yearLevel}</span>
                <span className="resource-id">ID: {resource.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="resource-stats">
        <p>
          📊 Connected to {resourceStats.total} total resources • {resourceStats.cultural} Māori
cultural resources • {resourceStats.highPriority} high priority items
        </p>
      </div>
    </section>
  )
}

export default RelatedResources
