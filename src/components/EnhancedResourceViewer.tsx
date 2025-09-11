import { ArrowLeft, Award, BookOpen, Clock, Download, Share, Star, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { EnhancedResource } from '../utils/enhanced-resource-loader';
import { getResourceById } from '../utils/enhanced-resource-loader';
import './EnhancedResourceViewer.css';

const EnhancedResourceViewer: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<EnhancedResource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePass, setActivePass] = useState(0);

  useEffect(() => {
    const loadResource = async () => {
      if (!resourceId) {
        setError('No resource ID provided');
        setLoading(false);
        return;
      }

      try {
        const enhancedResource = await getResourceById(resourceId);
        if (!enhancedResource) {
          setError('Resource not found');
        } else {
          setResource(enhancedResource);
          // Set active pass to the last completed pass
          setActivePass(enhancedResource.enhancement.passesCompleted - 1);
        }
      } catch (err) {
        setError('Failed to load resource');
        console.error('Error loading resource:', err);
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [resourceId]);

  const handleDownload = () => {
    if (!resource) return;

    // Create downloadable content
    const content = `
# ${resource.title}

**Subject:** ${resource.subject}  
**Year Level:** ${resource.yearLevel}  
**Type:** ${resource.type}  
**Quality Score:** ${resource.enhancement.qualityScore.toFixed(1)}/15  
**Cultural Authenticity:** ${resource.enhancement.culturalAuthenticity.toFixed(1)}/10  

## Description
${resource.description}

## Enhancement Details
This resource has been enhanced through our 4-pass progressive enrichment system:

${resource.enhancement.passes
  .map(
    (pass, index) => `
### Pass ${pass.passNumber}: ${pass.specialization}
**Enhanced by:** ${pass.kaiako}  
**Quality Improvement:** +${pass.qualityImprovement.toFixed(1)} points  
**Completed:** ${new Date(pass.timeCompleted).toLocaleDateString()}  

${
  pass.enhancedContent
    ? JSON.stringify(pass.enhancedContent, null, 2)
    : 'Enhanced content available in full version'
}
`,
  )
  .join('\n')}

## Cultural Elements
This resource incorporates ${
      resource.culturalElements
    } cultural elements connecting learning to Te Ao Māori perspectives.

## Metadata
- **Difficulty:** ${resource.metadata.difficulty}/10
- **Estimated Duration:** ${resource.metadata.estimatedDuration} minutes
- **Tags:** ${resource.metadata.tags.join(', ')}
- **Created:** ${new Date(resource.metadata.created).toLocaleDateString()}
- **Last Modified:** ${new Date(resource.metadata.lastModified).toLocaleDateString()}

---
Generated from TeAoMarama Enhanced Resource Library
    `;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resource.title.replace(/[^a-z0-9]/gi, '_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (!resource) return;

    const shareData = {
      title: resource.title,
      text: `Check out this enhanced educational resource: ${resource.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="resource-viewer loading">
        <div className="loading-spinner">
          <BookOpen className="animate-spin" size={48} />
          <p>Loading enhanced resource...</p>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="resource-viewer error">
        <div className="error-message">
          <h2>Resource Not Found</h2>
          <p>{error || 'The requested resource could not be found.'}</p>
          <button onClick={() => navigate('/enhanced-resources')} className="btn primary">
            <ArrowLeft size={20} />
            Back to Enhanced Resources
          </button>
        </div>
      </div>
    );
  }

  const currentPass = resource.enhancement.passes[activePass];

  return (
    <div className="resource-viewer">
      {/* Header */}
      <div className="viewer-header">
        <div className="header-controls">
          <button onClick={() => navigate('/enhanced-resources')} className="btn secondary">
            <ArrowLeft size={20} />
            Back to Resources
          </button>

          <div className="action-buttons">
            <button onClick={handleShare} className="btn secondary">
              <Share size={20} />
              Share
            </button>
            <button onClick={handleDownload} className="btn primary">
              <Download size={20} />
              Download
            </button>
          </div>
        </div>

        <div className="resource-title-section">
          <h1>{resource.title}</h1>
          <div className="resource-meta">
            <span className="subject">{resource.subject}</span>
            <span className="year-level">{resource.yearLevel}</span>
            <span className="type">{resource.type}</span>
          </div>
        </div>

        <div className="quality-indicators">
          <div className="quality-score">
            <Star size={20} />
            <span>Quality: {resource.enhancement.qualityScore.toFixed(1)}/15</span>
          </div>
          <div className="cultural-score">
            <Award size={20} />
            <span>Cultural Auth: {resource.enhancement.culturalAuthenticity.toFixed(1)}/10</span>
          </div>
          <div className="duration">
            <Clock size={20} />
            <span>{resource.metadata.estimatedDuration} min</span>
          </div>
          <div className="difficulty">
            <Users size={20} />
            <span>Level {resource.metadata.difficulty}/10</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="viewer-content">
        {/* Enhancement Pass Tabs */}
        <div className="pass-tabs">
          <h3>Enhancement Passes</h3>
          <div className="tabs">
            {resource.enhancement.passes.map((pass, index) => (
              <button
                key={index}
                className={`tab ${index === activePass ? 'active' : ''}`}
                onClick={() => setActivePass(index)}
              >
                <div className="tab-header">
                  <span className="pass-number">Pass {pass.passNumber}</span>
                  <span className="improvement">+{pass.qualityImprovement.toFixed(1)}</span>
                </div>
                <div className="tab-subtitle">{pass.specialization}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Pass Content */}
        {currentPass && (
          <div className="pass-content">
            <div className="pass-header">
              <h2>
                Pass {currentPass.passNumber}: {currentPass.specialization}
              </h2>
              <div className="kaiako-info">
                <strong>Enhanced by:</strong> {currentPass.kaiako}
              </div>
              <div className="completion-date">
                <strong>Completed:</strong>{' '}
                {new Date(currentPass.timeCompleted).toLocaleDateString()}
              </div>
            </div>

            <div className="enhanced-content">
              <h3>Enhanced Learning Content</h3>

              {/* Display the actual enhanced content */}
              {currentPass.enhancedContent ? (
                <div className="content-display">
                  {typeof currentPass.enhancedContent === 'string' ? (
                    <div className="text-content">
                      <pre>{currentPass.enhancedContent}</pre>
                    </div>
                  ) : (
                    <div className="structured-content">
                      {/* Handle structured content objects */}
                      {Object.entries(currentPass.enhancedContent).map(([key, value]) => (
                        <div key={key} className="content-section">
                          <h4>
                            {key
                              .replace(/([A-Z])/g, ' $1')
                              .replace(/^./, (str) => str.toUpperCase())}
                          </h4>
                          <div className="content-value">
                            {typeof value === 'string' ? (
                              <p>{value}</p>
                            ) : Array.isArray(value) ? (
                              <ul>
                                {value.map((item, idx) => (
                                  <li key={idx}>
                                    {typeof item === 'string' ? item : JSON.stringify(item)}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <pre>{JSON.stringify(value, null, 2)}</pre>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="placeholder-content">
                  <p>
                    This pass focused on {currentPass.specialization.toLowerCase()} and improved the
                    resource quality by {currentPass.qualityImprovement.toFixed(1)} points.
                  </p>
                  <p>
                    <strong>Kaiako Expertise:</strong> {currentPass.kaiako} applied their
                    specialized knowledge in {currentPass.specialization.toLowerCase()} to enhance
                    this educational resource.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Original Resource Description */}
        <div className="original-description">
          <h3>Resource Description</h3>
          <p>{resource.description}</p>

          {resource.metadata.tags.length > 0 && (
            <div className="tags">
              <strong>Tags:</strong>{' '}
              {resource.metadata.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cultural Integration Info */}
        {resource.culturalElements > 0 && (
          <div className="cultural-integration">
            <h3>Cultural Integration</h3>
            <p>
              This resource incorporates <strong>{resource.culturalElements}</strong> cultural
              elements that connect learning objectives with Te Ao Māori worldviews and practices.
            </p>
            <p>
              Cultural authenticity score:{' '}
              <strong>{resource.enhancement.culturalAuthenticity.toFixed(1)}/10</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedResourceViewer;
