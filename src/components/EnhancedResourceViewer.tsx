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

    // Create comprehensive downloadable content
    const content = `
# ${resource.title}

## 📚 Resource Overview
**Subject:** ${resource.subject}  
**Year Level:** ${resource.yearLevel}  
**Type:** ${resource.type}  
**Quality Score:** ${resource.enhancement.qualityScore.toFixed(1)}/15  
**Cultural Authenticity:** ${resource.enhancement.culturalAuthenticity.toFixed(1)}/10  
**Pedagogical Depth:** ${resource.enhancement.pedagogicalDepth.toFixed(1)}/10  
**Progressive Index:** ${resource.enhancement.progressiveIndex.toFixed(1)}/10  

## 📖 Description
${resource.description}

## 🌿 Cultural Integration
This resource incorporates ${
      resource.culturalElements
    } cultural elements connecting learning to Te Ao Māori perspectives, ensuring authentic cultural representation and respect for traditional knowledge systems.

## 🎯 Learning Objectives
- Develop understanding of ${resource.subject} through culturally responsive pedagogy
- Connect learning to Te Ao Māori worldviews and values
- Apply progressive pedagogical approaches for enhanced learning outcomes
- Engage with authentic cultural contexts and traditional knowledge

## 🔄 Enhancement Journey
This resource has been enhanced through our comprehensive 4-pass progressive enrichment system:

${resource.enhancement.passes
  .map(
    (pass, index) => `
### Pass ${pass.passNumber}: ${pass.specialization}
**Enhanced by:** ${pass.kaiako}  
**Quality Improvement:** +${pass.qualityImprovement.toFixed(1)} points  
**Completed:** ${new Date(pass.timeCompleted).toLocaleDateString()}  
**Cultural Authenticity Score:** ${pass.culturalAuthenticity?.toFixed(1) || 'N/A'}/10  
**Pedagogical Depth Score:** ${pass.pedagogicalDepth?.toFixed(1) || 'N/A'}/10  

#### Enhanced Content Highlights:
${
  pass.enhancedContent
    ? Object.entries(pass.enhancedContent)
        .map(
          ([key, value]) =>
            `- **${key.replace(/([A-Z])/g, ' $1').trim()}:** ${
              typeof value === 'object' ? JSON.stringify(value, null, 2) : value
            }`,
        )
        .join('\n')
    : 'Enhanced content available in full version'
}
`,
  )
  .join('\n')}

## 📊 Quality Metrics
- **Overall Quality Score:** ${resource.enhancement.qualityScore.toFixed(1)}/15
- **Cultural Authenticity:** ${resource.enhancement.culturalAuthenticity.toFixed(1)}/10
- **Pedagogical Depth:** ${resource.enhancement.pedagogicalDepth.toFixed(1)}/10
- **Progressive Index:** ${resource.enhancement.progressiveIndex.toFixed(1)}/10
- **Enhancement Passes Completed:** ${resource.enhancement.passesCompleted}/4

## 🏷️ Resource Metadata
- **Difficulty Level:** ${resource.metadata.difficulty}/10
- **Estimated Duration:** ${resource.metadata.estimatedDuration} minutes
- **Tags:** ${resource.metadata.tags.join(', ')}
- **Created:** ${new Date(resource.metadata.created).toLocaleDateString()}
- **Last Modified:** ${new Date(resource.metadata.lastModified).toLocaleDateString()}
- **Current Pass:** ${resource.currentPass}/4

## 🎓 Implementation Notes
This resource has been carefully crafted to align with:
- New Zealand Curriculum requirements
- Te Ao Māori principles and values
- Progressive pedagogical best practices
- Cultural safety and inclusion standards
- Authentic learning experiences

---
Generated from TeAoMarama Enhanced Resource Library
Mangakōtukutuku Excellence Standards
Progressive Multi-Pass Enhancement System
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
        <ResourceContentDisplay
          resource={resource}
          activePass={activePass}
          onPassChange={setActivePass}
        />
      </div>
    </div>
  );
};

export default EnhancedResourceViewer;
