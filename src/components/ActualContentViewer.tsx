import { ArrowLeft, Award, BookOpen, Clock, Download, FileText, Globe, Target } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActualLesson,
  ActualUnitPlan,
  loadActualLesson,
  loadActualUnitPlan,
} from '../utils/actual-content-loader';
import { EnhancedResource, getResourceById } from '../utils/enhanced-resource-loader';
import './ActualContentViewer.css';

const ActualContentViewer: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<EnhancedResource | null>(null);
  const [actualContent, setActualContent] = useState<ActualLesson | ActualUnitPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      if (!resourceId) {
        setError('No resource ID provided');
        setLoading(false);
        return;
      }

      try {
        // Load the enhanced resource metadata
        const enhancedResource = await getResourceById(resourceId);
        if (!enhancedResource) {
          setError('Resource not found');
          setLoading(false);
          return;
        }
        setResource(enhancedResource);

        // Try to load actual content
        let content: ActualLesson | ActualUnitPlan | null = null;

        // Try loading as lesson first
        content = await loadActualLesson(resourceId);

        // If not found as lesson, try as unit plan
        if (!content) {
          content = await loadActualUnitPlan(resourceId);
        }

        if (content) {
          setActualContent(content);
        } else {
          setError('No actual content found for this resource');
        }
      } catch (err) {
        setError('Failed to load content');
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [resourceId]);

  const downloadContent = () => {
    if (!actualContent || !resource) return;

    const content = `# ${actualContent.title}

**Subject:** ${actualContent.subject}  
**Year Level:** ${actualContent.yearLevel}  
**Type:** ${actualContent.type}  
**Cultural Context:** ${actualContent.culturalContext}  
**Depth:** ${actualContent.depth}  

## Learning Objectives
${actualContent.learningObjectives.map((obj) => `- ${obj}`).join('\n')}

## Activities
${
  Array.isArray(actualContent.activities)
    ? actualContent.activities
        .map((activity, index) =>
          typeof activity === 'string'
            ? `${index + 1}. ${activity}`
            : `### ${activity.title}\n${activity.description}`,
        )
        .join('\n\n')
    : actualContent.activities.map((activity, index) => `${index + 1}. ${activity}`).join('\n')
}

## Resources
${actualContent.resources.map((resource) => `- ${resource}`).join('\n')}

## Assessment
**Type:** ${actualContent.assessment.type}

**Tasks:**
${actualContent.assessment.tasks.map((task) => `- ${task}`).join('\n')}

${actualContent.duration ? `**Duration:** ${actualContent.duration}` : ''}
${
  actualContent.nzcAlignment
    ? `\n**NZC Alignment:**\n${actualContent.nzcAlignment
        .map((alignment) => `- ${alignment}`)
        .join('\n')}`
    : ''
}

---
*Enhanced Resource Quality Score: ${resource.enhancement?.qualityScore?.toFixed(1) || 'N/A'}/15*
*Cultural Authenticity: ${resource.enhancement?.culturalAuthenticity?.toFixed(1) || 'N/A'}/10*
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${actualContent.title.replace(/[^a-z0-9]/gi, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="actual-content-viewer loading">
        <div className="loading-spinner">
          <BookOpen className="animate-spin" size={48} />
          <p>Loading actual enriched content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="actual-content-viewer error">
        <div className="error-card">
          <div className="error-icon">❌</div>
          <h2>Content Not Found</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/working-resources')} className="btn primary">
            <ArrowLeft size={20} />
            Back to Working Resources
          </button>
        </div>
      </div>
    );
  }

  if (!actualContent || !resource) {
    return (
      <div className="actual-content-viewer error">
        <div className="error-card">
          <div className="error-icon">❌</div>
          <h2>No Content Available</h2>
          <p>This resource doesn't have actual enriched content yet.</p>
          <button onClick={() => navigate('/working-resources')} className="btn primary">
            <ArrowLeft size={20} />
            Back to Working Resources
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="actual-content-viewer">
      {/* Header */}
      <div className="content-header">
        <div className="header-controls">
          <button onClick={() => navigate('/working-resources')} className="btn secondary">
            <ArrowLeft size={20} />
            Back to Resources
          </button>

          <button onClick={downloadContent} className="btn primary">
            <Download size={20} />
            Download Content
          </button>
        </div>

        <div className="content-title-section">
          <h1>{actualContent.title}</h1>
          <div className="content-meta">
            <span className="subject">{actualContent.subject}</span>
            <span className="year-level">{actualContent.yearLevel}</span>
            <span className="type">{actualContent.type}</span>
            <span className="depth">{actualContent.depth}</span>
          </div>
        </div>
      </div>

      {/* Cultural Context */}
      <div className="content-section">
        <h2>
          <Globe size={24} /> Cultural Context
        </h2>
        <p className="cultural-context">{actualContent.culturalContext}</p>
      </div>

      {/* Learning Objectives */}
      <div className="content-section">
        <h2>
          <Target size={24} /> Learning Objectives
        </h2>
        <ul className="objectives-list">
          {actualContent.learningObjectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
      </div>

      {/* Activities */}
      <div className="content-section">
        <h2>
          <BookOpen size={24} /> Activities
        </h2>
        {Array.isArray(actualContent.activities) &&
        typeof actualContent.activities[0] === 'object' ? (
          actualContent.activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          ))
        ) : (
          <ul className="activities-list">
            {actualContent.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Resources */}
      <div className="content-section">
        <h2>
          <FileText size={24} /> Resources
        </h2>
        <ul className="resources-list">
          {actualContent.resources.map((resource, index) => (
            <li key={index}>{resource}</li>
          ))}
        </ul>
      </div>

      {/* Assessment */}
      <div className="content-section">
        <h2>
          <Award size={24} /> Assessment
        </h2>
        <div className="assessment-info">
          <h3>Assessment Type: {actualContent.assessment.type}</h3>
          <h4>Assessment Tasks:</h4>
          <ul className="assessment-tasks">
            {actualContent.assessment.tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional Info */}
      {(actualContent.duration || actualContent.nzcAlignment) && (
        <div className="content-section">
          <h2>
            <Clock size={24} /> Additional Information
          </h2>
          {actualContent.duration && (
            <div className="info-item">
              <strong>Duration:</strong> {actualContent.duration}
            </div>
          )}
          {actualContent.nzcAlignment && (
            <div className="info-item">
              <strong>NZC Alignment:</strong>
              <ul className="alignment-list">
                {actualContent.nzcAlignment.map((alignment, index) => (
                  <li key={index}>{alignment}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Quality Information */}
      <div className="content-section quality-section">
        <h2>
          <Award size={24} /> Enhancement Quality
        </h2>
        <div className="quality-badges">
          <div className="quality-badge">
            <span className="label">Quality Score:</span>
            <span className="value">
              {resource.enhancement?.qualityScore?.toFixed(1) || 'N/A'}/15
            </span>
          </div>
          <div className="quality-badge">
            <span className="label">Cultural Authenticity:</span>
            <span className="value">
              {resource.enhancement?.culturalAuthenticity?.toFixed(1) || 'N/A'}/10
            </span>
          </div>
          <div className="quality-badge">
            <span className="label">Pedagogical Depth:</span>
            <span className="value">
              {resource.enhancement?.pedagogicalDepth?.toFixed(1) || 'N/A'}/10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualContentViewer;
