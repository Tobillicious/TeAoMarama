import { Award, BookOpen, Download, FileText, Globe, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './ContentPreviewModal.css';

interface ContentItem {
  id: string;
  title: string;
  type: 'resource' | 'template' | 'lesson' | 'worksheet' | 'unit' | 'guide';
  subject: string;
  yearLevel: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  culturalContext?: string;
  curriculumAlignment?: string;
  popularity?: number;
  lastUpdated?: string;
  featured?: boolean;
}

interface ContentPreviewModalProps {
  content: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContentPreviewModal: React.FC<ContentPreviewModalProps> = ({ content, isOpen, onClose }) => {
  const [fileContent, setFileContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && content) {
      loadFileContent(content.path);
    }
  }, [isOpen, content]);

  const loadFileContent = async (filePath: string) => {
    setLoading(true);
    setError('');

    try {
      // For now, we'll show a placeholder since we can't directly read files from the public directory
      // In a real implementation, you'd have an API endpoint to serve file contents
      const response = await fetch(filePath);

      if (response.ok) {
        const text = await response.text();
        setFileContent(text);
      } else {
        // Show a preview of what the content would look like
        setFileContent(generateContentPreview(content!));
      }
    } catch (err) {
      console.error('Error loading file content:', err);
      setError('Unable to load file content');
      setFileContent(generateContentPreview(content!));
    } finally {
      setLoading(false);
    }
  };

  const generateContentPreview = (item: ContentItem): string => {
    const preview = `
# ${item.title}

**Subject:** ${item.subject}  
**Year Level:** ${item.yearLevel}  
**Type:** ${item.type}  
**Category:** ${item.category}

## Description
${item.description}

${
  item.culturalContext
    ? `## Cultural Context
${item.culturalContext}`
    : ''
}

${
  item.curriculumAlignment
    ? `## Curriculum Alignment
${item.curriculumAlignment}`
    : ''
}

## Content Preview
This is a preview of the ${item.type} content. The full content includes:

- Detailed learning objectives
- Step-by-step instructions
- Assessment criteria
- Cultural integration points
- Resource materials
- Extension activities

**Popularity:** ${item.popularity || 'N/A'}%  
**Last Updated:** ${item.lastUpdated || 'N/A'}

---

*This is a preview of the actual content. Click download to access the full resource.*
    `;

    return preview.trim();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'worksheet':
        return <FileText className="w-5 h-5" />;
      case 'unit':
        return <BookOpen className="w-5 h-5" />;
      case 'template':
        return <Award className="w-5 h-5" />;
      case 'guide':
        return <BookOpen className="w-5 h-5" />;
      case 'lesson':
        return <Users className="w-5 h-5" />;
      case 'resource':
        return <Globe className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'worksheet':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'unit':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'template':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'guide':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'lesson':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'resource':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDownload = () => {
    if (content) {
      // Create a download link for the file
      const link = document.createElement('a');
      link.href = content.path;
      link.download = `${content.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isOpen || !content) return null;

  return (
    <div className="content-preview-overlay">
      <div className="content-preview-modal">
        <div className="modal-header">
          <div className="header-content">
            <div className="content-icon">{getTypeIcon(content.type)}</div>
            <div className="content-info">
              <h2 className="content-title">{content.title}</h2>
              <div className="content-meta">
                <span className={`content-type ${getTypeColor(content.type)}`}>{content.type}</span>
                <span className="content-subject">{content.subject}</span>
                <span className="content-year">{content.yearLevel}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="modal-close"
            title="Close modal"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="modal-content">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading content...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p className="error-message">{error}</p>
              <div className="content-preview">
                <pre className="preview-text">{fileContent}</pre>
              </div>
            </div>
          ) : (
            <div className="content-preview">
              <pre className="preview-text">{fileContent}</pre>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <div className="footer-info">
            {content.culturalContext && (
              <div className="cultural-context">
                <strong>Cultural Context:</strong> {content.culturalContext}
              </div>
            )}
            {content.curriculumAlignment && (
              <div className="curriculum-alignment">
                <strong>Curriculum:</strong> {content.curriculumAlignment}
              </div>
            )}
          </div>
          <div className="footer-actions">
            <button onClick={handleDownload} className="download-button">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPreviewModal;
