import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resourceLoader } from '../utils/resource-loader';
// import './ResourceViewer.css'; // Using inline styles for now

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  type: string;
  culturalContent: boolean;
  description: string;
  path: string;
  category: string;
}

const ResourceViewer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resource, setResource] = useState<EducationalResource | null>(null);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const resourceId = searchParams.get('id');
  const resourceType = searchParams.get('type');

  useEffect(() => {
    const loadResource = async () => {
      if (!resourceId) {
        setError('No resource ID provided');
        setLoading(false);
        return;
      }

      try {
        // Load resources and find the specific one
        const resources = await resourceLoader.loadResources();
        const foundResource = resources.find(r => r.id === resourceId);

        if (!foundResource) {
          setError(`Resource with ID "${resourceId}" not found`);
          setLoading(false);
          return;
        }

        setResource(foundResource);

        // Try to load the actual content
        try {
          const response = await fetch(`/resources/${foundResource.path}`);
          if (response.ok) {
            const text = await response.text();
            setContent(text);
          } else {
            setContent(`# ${foundResource.title}

**Subject:** ${foundResource.subject}
**Year Level:** ${foundResource.yearLevel}
**Type:** ${foundResource.type}
**Cultural Content:** ${foundResource.culturalContent ? 'Yes' : 'No'}

## Description
${foundResource.description}

---

*This is a preview - the full content file could not be loaded.*`);
          }
        } catch (contentError) {
          console.warn('Could not load resource content:', contentError);
          setContent(`# ${foundResource.title}

**Subject:** ${foundResource.subject}
**Year Level:** ${foundResource.yearLevel}
**Type:** ${foundResource.type}
**Cultural Content:** ${foundResource.culturalContent ? 'Yes' : 'No'}

## Description
${foundResource.description}

---

*This resource is available but the content file is not accessible via web.*`);
        }
      } catch (err) {
        console.error('Error loading resource:', err);
        setError('Failed to load resource');
      } finally {
        setLoading(false);
      }
    };

    loadResource();
  }, [resourceId]);

  if (loading) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
          <div>Loading resource...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <div style={{ fontSize: '2rem', marginBottom: '1rem', color: '#dc3545' }}>❌</div>
        <h2 style={{ color: '#dc3545', marginBottom: '1rem' }}>Resource Not Found</h2>
        <p style={{ marginBottom: '2rem', color: '#6c757d' }}>{error}</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/educational-platform')}
            style={{
              background: '#28a745',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            ← Back to Resources
          </button>
          <button
            onClick={() => navigate('/')}
            style={{
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            🏠 Home
          </button>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Resource Not Found</h2>
        <button onClick={() => navigate('/')} style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}>
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '1rem',
      minHeight: 'calc(100vh - 200px)'
    }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>
            {resource.type === 'lesson' ? '📖' : 
             resource.type === 'worksheet' ? '📝' : 
             resource.type === 'assessment' ? '📊' : '📚'}
          </span>
          <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            {resource.title}
          </h1>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.9 }}>
          <span>📚 {resource.subject}</span>
          <span>🎓 {resource.yearLevel}</span>
          <span>📄 {resource.type}</span>
          {resource.culturalContent && <span>🌿 Cultural Content</span>}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/educational-platform')}
          style={{
            background: 'transparent',
            border: '1px solid #28a745',
            color: '#28a745',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          ← Back to Educational Platform
        </button>
      </div>

      {/* Content */}
      <div style={{ 
        background: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        lineHeight: '1.6'
      }}>
        <pre style={{ 
          whiteSpace: 'pre-wrap', 
          fontFamily: 'inherit', 
          margin: 0,
          color: '#495057'
        }}>
          {content || 'No content available for this resource.'}
        </pre>
      </div>
    </div>
  );
};

export default ResourceViewer;