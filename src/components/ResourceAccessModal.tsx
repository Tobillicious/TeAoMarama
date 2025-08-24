import React from 'react';
import '../styles/next-level-design-system.css';

interface EducationalResource {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  description?: string;
  culturalContext: string;
  type: 'lesson' | 'assessment' | 'activity' | 'resource';
  isAvailable: boolean;
}

interface ResourceAccessModalProps {
  resource: EducationalResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ResourceAccessModal: React.FC<ResourceAccessModalProps> = ({
  resource,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !resource) {
    return null;
  }

  return (
    <div className="modal-next-level" onClick={onClose}>
      <div className="modal-content-next-level" onClick={(e) => e.stopPropagation()}>
        <h2 className="cultural-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          {resource.title}
        </h2>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '1rem', lineHeight: '1.6' }}>
          {resource.description}
        </p>

        <div style={{ marginBottom: '1rem' }}>
          <div
            style={{ color: 'var(--secondary-pounamu)', fontWeight: '600', marginBottom: '0.5rem' }}
          >
            🌿 Cultural Context:
          </div>
          <div style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.5' }}>
            {resource.culturalContext}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <span className="status-badge-next-level status-success">{resource.subject}</span>
          <span className="status-badge-next-level status-warning">{resource.yearLevel}</span>
          <span className="status-badge-next-level status-info">{resource.type}</span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button className="btn-next-level" onClick={onClose}>
            Close
          </button>
          <button className="btn-next-level">Access Resource</button>
        </div>
      </div>
    </div>
  );
};
