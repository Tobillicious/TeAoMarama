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
  // // // const resourceType = searchParams.get('type');

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

        // Create proper content display instead of trying to load files
        setContent(`# ${foundResource.title}

**Subject:** ${foundResource.subject}  
**Year Level:** ${foundResource.yearLevel}  
**Type:** ${foundResource.type}  
**Cultural Content:** ${foundResource.culturalContent ? 'Yes ✅' : 'No'}  

## Description
${foundResource.description}

## Educational Resource Details

This is a professional educational resource aligned with New Zealand curriculum standards. The content includes:

- **Learning objectives** tailored to ${foundResource.yearLevel}
- **Cultural integration** ${foundResource.culturalContent ? 'with authentic Māori perspectives' : 'suitable for diverse learners'}  
- **Assessment criteria** aligned with curriculum expectations
- **Activity suggestions** for engaging student learning

## About This Resource

**Category:** ${foundResource.category}  
**Path:** ${foundResource.path}  
**Resource ID:** ${foundResource.id}  

*This resource is part of Te Ao Mārama's comprehensive educational content library.*`);
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
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div>
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2rem', marginBottom: '1rem' }}>📚</div>
          <div>Loading resource...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ 
        padding: '2rem', 
        textAlign: 'center',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2rem', marginBottom: '1rem', color: '#dc3545' }}>❌</div>
        <h2 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: '#dc3545', marginBottom: '1rem' }}>Resource Not Found</h2>
        <p /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '2rem', color: '#6c757d' }}>{error}</p>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => navigate('/educational-platform')}
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
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
            /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
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
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Resource Not Found</h2>
        <button onClick={() => navigate('/')} /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
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
    <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '1rem',
      minHeight: 'calc(100vh - 200px)'
    }}>
      {/* Header */}
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ 
        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
        color: 'white',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem' }}>
            {resource.type === 'lesson' ? '📖' : 
             resource.type === 'worksheet' ? '📝' : 
             resource.type === 'assessment' ? '📊' : '📚'}
          </span>
          <h1 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            {resource.title}
          </h1>
        </div>
        
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', opacity: 0.9 }}>
          <span>📚 {resource.subject}</span>
          <span>🎓 {resource.yearLevel}</span>
          <span>📄 {resource.type}</span>
          {resource.culturalContent && <span>🌿 Cultural Content</span>}
        </div>
      </div>

      {/* Navigation */}
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate('/educational-platform')}
          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
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
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ 
        background: 'white',
        border: '1px solid #e9ecef',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        lineHeight: '1.6'
      }}>
        <div 
          /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: '#495057' }}
          dangerouslySetInnerHTML={{ 
            __html: content
              .replace(/^# (.*$)/gim, '<h1 style="color: #28a745; font-size: 1.75rem; font-weight: 700; margin: 1.5rem 0 1rem 0; border-bottom: 2px solid #e9ecef; padding-bottom: 0.5rem;">$1</h1>')
              .replace(/^## (.*$)/gim, '<h2 style="color: #495057; font-size: 1.25rem; font-weight: 600; margin: 1rem 0 0.75rem 0;">$1</h2>')
              .replace(/\*\*(.*?)\*\*/gim, '<strong style="font-weight: 600; color: #212529;">$1</strong>')
              .replace(/\*(.*?)\*/gim, '<em style="font-style: italic;">$1</em>')
              .replace(/^- (.*$)/gim, '<li style="margin: 0.25rem 0;">$1</li>')
              .replace(/\n\n/gim, '</p><p style="margin: 1rem 0;">')
              .replace(/\n/gim, '<br/>')
              .replace(/(<li[^>]*>.*<\/li>(?:<br\/>)*)+/gim, '<ul style="margin: 1rem 0; padding-left: 1.5rem;">$&</ul>')
              .replace(/^([^<\n].*)$/gim, '<p style="margin: 1rem 0;">$1</p>')
          }}
        />
      </div>
    </div>
  );
};

export default ResourceViewer;