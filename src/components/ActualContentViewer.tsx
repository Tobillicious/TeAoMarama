import { ArrowLeft, Award, BookOpen, Clock, Download, FileText, Globe } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { EnhancedResource } from '../utils/enhanced-resource-loader';
import { getResourceById } from '../utils/enhanced-resource-loader';
import './ActualContentViewer.css';

const ActualContentViewer: React.FC = () => {
  const { resourceId } = useParams<{ resourceId: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<EnhancedResource | null>(null);
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

        // We'll display the enhanced resource data directly
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
    if (!resource) return;

    const content = `# ${resource.title}

**Subject:** ${resource.subject}  
**Year Level:** ${resource.yearLevel}  
**Type:** ${resource.type}  
**Description:** ${resource.description}  
**Cultural Elements:** ${resource.culturalElements}  
**Current Pass:** ${resource.currentPass}  

## Enhancement Process
${resource.enhancement?.passes
  ?.map(
    (pass) => `
### Pass ${pass.passNumber}: ${pass.specialization}
**Kaiako:** ${pass.kaiako}
**Focus:** ${pass.enhancedContent?.focus}
**Elements:**
${pass.enhancedContent?.elements?.map((element: string) => `- ${element}`).join('\n')}
**Quality Improvement:** +${pass.qualityImprovement?.toFixed(2)}
`,
  )
  .join('\n')}

## Quality Scores
**Quality Score:** ${resource.enhancement?.qualityScore?.toFixed(1)}/15
**Cultural Authenticity:** ${resource.enhancement?.culturalAuthenticity?.toFixed(1)}/10
**Pedagogical Depth:** ${resource.enhancement?.pedagogicalDepth?.toFixed(1)}/10
**Progressive Index:** ${resource.enhancement?.progressiveIndex?.toFixed(1)}/10

## Metadata
**Estimated Duration:** ${resource.metadata?.estimatedDuration} minutes
**Tags:** ${resource.metadata?.tags?.join(', ')}
**Created:** ${new Date(resource.metadata?.created || '').toLocaleDateString()}
**Last Modified:** ${new Date(resource.metadata?.lastModified || '').toLocaleDateString()}
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

  if (!resource) {
    return (
      <div className="actual-content-viewer error">
        <div className="error-card">
          <div className="error-icon">❌</div>
          <h2>No Content Available</h2>
          <p>This resource doesn't have enriched content yet.</p>
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
          <h1>{resource.title}</h1>
          <div className="content-meta">
            <span className="subject">{resource.subject}</span>
            <span className="year-level">{resource.yearLevel}</span>
            <span className="type">{resource.type}</span>
            <span className="depth">{resource.metadata?.difficulty || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="content-section">
        <h2>
          <FileText size={24} /> Description
        </h2>
        <p className="description">{resource.description}</p>
      </div>

      {/* Enhancement Passes */}
      <div className="content-section">
        <h2>
          <BookOpen size={24} /> Enhancement Process
        </h2>
        <div className="enhancement-passes">
          {resource.enhancement?.passes?.map((pass, index) => (
            <div key={index} className="pass-card">
              <h3>
                Pass {pass.passNumber}: {pass.specialization}
              </h3>
              <p>
                <strong>Kaiako:</strong> {pass.kaiako}
              </p>
              <p>
                <strong>Focus:</strong> {pass.enhancedContent?.focus}
              </p>
              <div className="pass-elements">
                <strong>Elements:</strong>
                <ul>
                  {pass.enhancedContent?.elements?.map((element: string, idx: number) => (
                    <li key={idx}>{element}</li>
                  ))}
                </ul>
              </div>
              <div className="quality-improvement">
                <strong>Quality Improvement:</strong> +{pass.qualityImprovement?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cultural Elements */}
      <div className="content-section">
        <h2>
          <Globe size={24} /> Cultural Elements
        </h2>
        <div className="cultural-info">
          <p>
            <strong>Cultural Elements Count:</strong> {resource.culturalElements}
          </p>
          <p>
            <strong>Current Pass:</strong> {resource.currentPass}
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="content-section">
        <h2>
          <Clock size={24} /> Additional Information
        </h2>
        <div className="info-item">
          <strong>Estimated Duration:</strong> {resource.metadata?.estimatedDuration} minutes
        </div>
        <div className="info-item">
          <strong>Tags:</strong> {resource.metadata?.tags?.join(', ')}
        </div>
        <div className="info-item">
          <strong>Created:</strong>{' '}
          {new Date(resource.metadata?.created || '').toLocaleDateString()}
        </div>
        <div className="info-item">
          <strong>Last Modified:</strong>{' '}
          {new Date(resource.metadata?.lastModified || '').toLocaleDateString()}
        </div>
      </div>

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
