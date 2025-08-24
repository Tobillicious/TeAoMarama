import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './ResourceAccessModal.css';

interface EducationalResource {
  id: string;
  title: string;
  type: 'lesson' | 'activity' | 'story' | 'video' | 'interactive';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  culturalContext: string;
  learningObjectives: string[];
  tags: string[];
  status: 'available' | 'coming-soon' | 'restricted';
}

interface ResourceAccessModalProps {
  resource: EducationalResource | null;
  isOpen: boolean;
  onClose: () => void;
  onAccessResource: (resourceId: string) => void;
}

// Custom hook for modal accessibility (ReactBits.dev pattern)
const useModalAccessibility = (isOpen: boolean, onClose: () => void) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store current focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus modal
      modalRef.current?.focus();

      // Trap focus within modal
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );
          if (focusableElements) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
        previousFocusRef.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  return modalRef;
};

// Custom hook for cultural safety validation (ReactBits.dev pattern)
const useCulturalSafety = (resource: EducationalResource | null) => {
  const [culturalValidation, setCulturalValidation] = useState({
    isValid: false,
    warnings: [] as string[],
    kaitiakiApproval: false,
  });

  useEffect(() => {
    if (resource) {
      // Simulate cultural safety validation
      const validateCulturalSafety = async () => {
        // Check for appropriate cultural context
        const hasCulturalContext = resource.culturalContext.length > 0;
        const hasLearningObjectives = resource.learningObjectives.length > 0;
        // const isAppropriateDifficulty =
        //   resource.difficulty !== 'advanced' || resource.status === 'available';

        const warnings = [];
        if (!hasCulturalContext) warnings.push('Cultural context should be provided');
        if (!hasLearningObjectives) warnings.push('Learning objectives should be defined');
        if (resource.status === 'restricted') warnings.push('Resource requires special access');

        setCulturalValidation({
          isValid: hasCulturalContext && hasLearningObjectives,
          warnings,
          kaitiakiApproval: resource.status === 'available',
        });
      };

      validateCulturalSafety();
    }
  }, [resource]);

  return culturalValidation;
};

// Memoized resource content component (ReactBits.dev pattern)
const ResourceContent = React.memo<{ resource: EducationalResource }>(({ resource }) => {
  const content = useMemo(() => {
    switch (resource.type) {
      case 'lesson':
        return {
          icon: '📚',
          description: 'Interactive learning experience with cultural context',
          content: `This lesson explores ${resource.culturalContext} through engaging activities and traditional knowledge sharing.`,
        };
      case 'activity':
        return {
          icon: '🎯',
          description: 'Hands-on learning activity',
          content: `Participate in ${resource.culturalContext} through guided activities that respect traditional protocols.`,
        };
      case 'story':
        return {
          icon: '📖',
          description: 'Cultural story and narrative',
          content: `Discover the story of ${resource.culturalContext} as shared by our community elders and knowledge keepers.`,
        };
      case 'video':
        return {
          icon: '🎥',
          description: 'Video content with cultural guidance',
          content: `Watch and learn about ${resource.culturalContext} through carefully curated video content.`,
        };
      case 'interactive':
        return {
          icon: '🔄',
          description: 'Interactive digital experience',
          content: `Engage with ${resource.culturalContext} through interactive digital experiences.`,
        };
      default:
        return {
          icon: '📋',
          description: 'Educational resource',
          content: `Learn about ${resource.culturalContext} through this educational resource.`,
        };
    }
  }, [resource.type, resource.culturalContext]);

  return (
    <div className="resource-content" role="region" aria-label="Resource content">
      <div className="resource-header">
        <span className="resource-icon" aria-hidden="true">
          {content.icon}
        </span>
        <h3 className="resource-title">{resource.title}</h3>
        <span className="resource-type">{content.description}</span>
      </div>

      <div className="resource-details">
        <p className="resource-description">{content.content}</p>

        <div className="resource-meta">
          <div className="meta-item">
            <span className="meta-label">Difficulty:</span>
            <span className={`meta-value difficulty-${resource.difficulty}`}>
              {resource.difficulty}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Duration:</span>
            <span className="meta-value">{resource.duration}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Status:</span>
            <span className={`meta-value status-${resource.status}`}>{resource.status}</span>
          </div>
        </div>

        <div className="learning-objectives">
          <h4>Learning Objectives</h4>
          <ul>
            {resource.learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>

        <div className="resource-tags">
          {resource.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

ResourceContent.displayName = 'ResourceContent';

// Main modal component with ReactBits.dev patterns
export const EnhancedResourceAccessModal: React.FC<ResourceAccessModalProps> = ({
  resource,
  isOpen,
  onClose,
  onAccessResource,
}) => {
  const [currentView, setCurrentView] = useState<'info' | 'content' | 'cultural'>('info');
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useModalAccessibility(isOpen, onClose);
  const culturalValidation = useCulturalSafety(resource);

  // Memoized close handler (ReactBits.dev pattern)
  const handleClose = useCallback(() => {
    setCurrentView('info');
    setIsLoading(false);
    onClose();
  }, [onClose]);

  // Memoized access handler (ReactBits.dev pattern)
  const handleAccessResource = useCallback(async () => {
    if (!resource) return;

    setIsLoading(true);
    try {
      // Simulate resource access
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onAccessResource(resource.id);
      handleClose();
    } catch (error) {
      console.error('Failed to access resource:', error);
    } finally {
      setIsLoading(false);
    }
  }, [resource, onAccessResource, handleClose]);

  // Memoized tab navigation (ReactBits.dev pattern)
  const handleTabChange = useCallback((view: 'info' | 'content' | 'cultural') => {
    setCurrentView(view);
  }, []);

  // Early return for closed modal
  if (!isOpen || !resource) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div
        ref={modalRef}
        className="enhanced-modal-container"
        tabIndex={-1}
        role="document"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {resource.title}
          </h2>
          <button
            type="button"
            className="modal-close"
            onClick={handleClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="modal-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={currentView === 'info' ? 'true' : 'false'}
            aria-controls="tabpanel-info"
            className={`tab ${currentView === 'info' ? 'active' : ''}`}
            onClick={() => handleTabChange('info')}
          >
            Information
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={currentView === 'content' ? 'true' : 'false'}
            aria-controls="tabpanel-content"
            className={`tab ${currentView === 'content' ? 'active' : ''}`}
            onClick={() => handleTabChange('content')}
          >
            Content
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={currentView === 'cultural' ? 'true' : 'false'}
            aria-controls="tabpanel-cultural"
            className={`tab ${currentView === 'cultural' ? 'active' : ''}`}
            onClick={() => handleTabChange('cultural')}
          >
            Cultural Context
          </button>
        </div>

        <div className="modal-content">
          <div
            id="tabpanel-info"
            role="tabpanel"
            aria-labelledby="tab-info"
            className={`tab-panel ${currentView === 'info' ? 'active' : ''}`}
          >
            <ResourceContent resource={resource} />
          </div>

          <div
            id="tabpanel-content"
            role="tabpanel"
            aria-labelledby="tab-content"
            className={`tab-panel ${currentView === 'content' ? 'active' : ''}`}
          >
            <div className="content-preview">
              <h3>Content Preview</h3>
              <p>
                This resource contains interactive content that respects cultural protocols and
                traditional knowledge sharing practices.
              </p>
              <div className="content-placeholder">
                <span className="placeholder-icon">📚</span>
                <p>Content will be loaded when you access this resource</p>
              </div>
            </div>
          </div>

          <div
            id="tabpanel-cultural"
            role="tabpanel"
            aria-labelledby="tab-cultural"
            className={`tab-panel ${currentView === 'cultural' ? 'active' : ''}`}
          >
            <div className="cultural-context">
              <h3>Cultural Context</h3>
              <p className="cultural-description">{resource.culturalContext}</p>

              <div className="cultural-validation">
                <h4>Cultural Safety Validation</h4>
                <div
                  className={`validation-status ${
                    culturalValidation.isValid ? 'valid' : 'invalid'
                  }`}
                >
                  <span className="status-icon">{culturalValidation.isValid ? '✅' : '⚠️'}</span>
                  <span className="status-text">
                    {culturalValidation.isValid ? 'Culturally Safe' : 'Requires Review'}
                  </span>
                </div>

                {culturalValidation.warnings.length > 0 && (
                  <div className="validation-warnings">
                    <h5>Cultural Considerations:</h5>
                    <ul>
                      {culturalValidation.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="kaitiaki-approval">
                  <span className="approval-icon">
                    {culturalValidation.kaitiakiApproval ? '🛡️' : '⏳'}
                  </span>
                  <span className="approval-text">
                    {culturalValidation.kaitiakiApproval
                      ? 'Kaitiaki approved'
                      : 'Pending kaitiaki approval'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Close
          </button>
          <button
            type="button"
            className={`btn btn-primary ${isLoading ? 'loading' : ''}`}
            onClick={handleAccessResource}
            disabled={isLoading || !culturalValidation.isValid || resource.status !== 'available'}
            aria-describedby="access-description"
          >
            {isLoading ? 'Accessing...' : 'Access Resource'}
          </button>
          {resource.status !== 'available' && (
            <p id="access-description" className="access-note">
              This resource is currently {resource.status}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
