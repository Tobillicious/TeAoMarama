import React, { useState } from 'react';
import './DownloadManager.css';

interface DownloadItem {
  id: string;
  title: string;
  description: string;
  fileType: 'pdf' | 'docx' | 'pptx' | 'zip' | 'mp4' | 'mp3' | 'json';
  size: string;
  category: 'lesson-plan' | 'assessment' | 'resources' | 'multimedia' | 'worksheet' | 'rubric';
  culturalSafety: boolean;
  lastUpdated: Date;
  downloadUrl?: string;
}

interface DownloadManagerProps {
  lessonId: string;
  lessonTitle: string;
  showCulturalGuidance?: boolean;
}

const DownloadManager: React.FC<DownloadManagerProps> = ({ 
  lessonId, 
  lessonTitle, 
  showCulturalGuidance = true 
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [downloadFormat, setDownloadFormat] = useState<'individual' | 'bundle'>('individual');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  // Generate available downloads for the lesson
  const availableDownloads: DownloadItem[] = [
    {
      id: 'lesson-plan-pdf',
      title: 'Complete Lesson Plan (PDF)',
      description: 'Full lesson plan with objectives, activities, and assessment criteria',
      fileType: 'pdf',
      size: '2.3 MB',
      category: 'lesson-plan',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/lesson-plan.pdf`
    },
    {
      id: 'lesson-plan-docx',
      title: 'Editable Lesson Plan (Word)',
      description: 'Customizable Word document version for teachers to modify',
      fileType: 'docx',
      size: '1.8 MB',
      category: 'lesson-plan',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/lesson-plan.docx`
    },
    {
      id: 'assessment-rubric',
      title: 'Assessment Rubric',
      description: 'Detailed rubric with cultural responsiveness criteria',
      fileType: 'pdf',
      size: '450 KB',
      category: 'rubric',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/assessment-rubric.pdf`
    },
    {
      id: 'student-worksheets',
      title: 'Student Activity Worksheets',
      description: 'Printable worksheets and activity templates',
      fileType: 'pdf',
      size: '1.2 MB',
      category: 'worksheet',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/student-worksheets.pdf`
    },
    {
      id: 'presentation-slides',
      title: 'Teaching Presentation',
      description: 'PowerPoint slides with cultural imagery and content',
      fileType: 'pptx',
      size: '15.7 MB',
      category: 'multimedia',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/presentation.pptx`
    },
    {
      id: 'audio-pronunciations',
      title: 'Te Reo Māori Pronunciations',
      description: 'Audio files for correct pronunciation of Māori terms',
      fileType: 'mp3',
      size: '8.2 MB',
      category: 'multimedia',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/pronunciations.mp3`
    },
    {
      id: 'cultural-resources',
      title: 'Cultural Context Resources',
      description: 'Additional reading and cultural background materials',
      fileType: 'pdf',
      size: '3.4 MB',
      category: 'resources',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/cultural-resources.pdf`
    },
    {
      id: 'complete-bundle',
      title: 'Complete Lesson Bundle',
      description: 'All materials in one convenient ZIP file',
      fileType: 'zip',
      size: '32.1 MB',
      category: 'lesson-plan',
      culturalSafety: true,
      lastUpdated: new Date(),
      downloadUrl: `/downloads/${lessonId}/complete-bundle.zip`
    }
  ];

  const getFileIcon = (fileType: string): string => {
    const icons: Record<string, string> = {
      pdf: '📄',
      docx: '📝',
      pptx: '📊',
      zip: '📦',
      mp4: '🎬',
      mp3: '🎵',
      json: '📋'
    };
    return icons[fileType] || '📄';
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'lesson-plan': '📚',
      'assessment': '📊',
      'resources': '📖',
      'multimedia': '🎬',
      'worksheet': '📝',
      'rubric': '📋'
    };
    return icons[category] || '📄';
  };

  const handleItemSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAll = () => {
    setSelectedItems(availableDownloads.map(item => item.id));
  };

  const clearSelection = () => {
    setSelectedItems([]);
  };

  const simulateDownload = async (itemId: string): Promise<void> => {
    return new Promise((resolve) => {
      setDownloadProgress(prev => ({ ...prev, [itemId]: 0 }));
      
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          const currentProgress = prev[itemId] || 0;
          const newProgress = Math.min(currentProgress + Math.random() * 25, 100);
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setDownloadProgress(prev => {
                const newPrev = { ...prev };
                delete newPrev[itemId];
                return newPrev;
              });
              resolve();
            }, 500);
          }
          
          return { ...prev, [itemId]: newProgress };
        });
      }, 200);
    });
  };

  const downloadSelected = async () => {
    if (selectedItems.length === 0) return;
    
    setIsDownloading(true);
    
    try {
      if (downloadFormat === 'bundle') {
        // Download as bundle
        await simulateDownload('bundle');
        
        // Create a virtual download for the bundle
        const selectedDownloads = availableDownloads.filter(item => 
          selectedItems.includes(item.id)
        );
        
        const bundleContent = {
          title: `${lessonTitle} - Resource Bundle`,
          items: selectedDownloads.map(item => ({
            title: item.title,
            description: item.description,
            fileType: item.fileType
          })),
          downloadedAt: new Date().toISOString(),
          culturalSafety: selectedDownloads.every(item => item.culturalSafety)
        };
        
        // Simulate bundle download
        const blob = new Blob([JSON.stringify(bundleContent, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${lessonId}-resource-bundle.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
      } else {
        // Download individual files
        for (const itemId of selectedItems) {
          await simulateDownload(itemId);
          
          // Simulate individual file download
          const item = availableDownloads.find(d => d.id === itemId);
          if (item) {
            const content = `# ${item.title}\n\n${item.description}\n\nThis is a simulated download for: ${lessonTitle}`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${item.title.toLowerCase().replace(/\s+/g, '-')}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
        }
      }
      
      // Clear selection after successful download
      setSelectedItems([]);
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const getTotalSize = (): string => {
    const selectedDownloads = availableDownloads.filter(item => 
      selectedItems.includes(item.id)
    );
    
    let totalMB = 0;
    selectedDownloads.forEach(item => {
      const sizeNum = parseFloat(item.size.replace(/[^\d.]/g, ''));
      const sizeUnit = item.size.includes('KB') ? 0.001 : 1;
      totalMB += sizeNum * sizeUnit;
    });
    
    return totalMB < 1 ? `${Math.round(totalMB * 1000)} KB` : `${totalMB.toFixed(1)} MB`;
  };

  return (
    <div className="download-manager">
      <div className="download-header">
        <h2>📥 Download Lesson Materials</h2>
        <p>Access all resources for <strong>{lessonTitle}</strong></p>
      </div>

      {showCulturalGuidance && (
        <div className="cultural-guidance">
          <div className="guidance-icon">🌿</div>
          <div className="guidance-content">
            <h3>Cultural Responsibility Reminder</h3>
            <p>
              These resources contain culturally significant content. Please ensure you:
            </p>
            <ul>
              <li>Understand the cultural context before using</li>
              <li>Consult with local iwi or cultural advisors when appropriate</li>
              <li>Use materials respectfully and with cultural sensitivity</li>
              <li>Acknowledge the sources and cultural perspectives included</li>
            </ul>
          </div>
        </div>
      )}

      <div className="download-controls">
        <div className="selection-controls">
          <button className="control-btn" onClick={selectAll}>
            ✓ Select All
          </button>
          <button className="control-btn" onClick={clearSelection}>
            ✕ Clear Selection
          </button>
          <span className="selection-info">
            {selectedItems.length} of {availableDownloads.length} items selected
            {selectedItems.length > 0 && ` (${getTotalSize()})`}
          </span>
        </div>

        <div className="format-controls">
          <label>
            <input
              type="radio"
              name="downloadFormat"
              value="individual"
              checked={downloadFormat === 'individual'}
              onChange={(e) => setDownloadFormat(e.target.value as 'individual' | 'bundle')}
            />
            <span>Individual Files</span>
          </label>
          <label>
            <input
              type="radio"
              name="downloadFormat"
              value="bundle"
              checked={downloadFormat === 'bundle'}
              onChange={(e) => setDownloadFormat(e.target.value as 'individual' | 'bundle')}
            />
            <span>ZIP Bundle</span>
          </label>
        </div>
      </div>

      <div className="downloads-grid">
        {availableDownloads.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          const progress = downloadProgress[item.id];
          const isDownloadingThis = progress !== undefined;

          return (
            <div 
              key={item.id} 
              className={`download-item ${isSelected ? 'selected' : ''} ${isDownloadingThis ? 'downloading' : ''}`}
              onClick={() => !isDownloadingThis && handleItemSelect(item.id)}
            >
              <div className="item-header">
                <div className="item-icons">
                  <span className="file-icon">{getFileIcon(item.fileType)}</span>
                  <span className="category-icon">{getCategoryIcon(item.category)}</span>
                </div>
                <div className="item-meta">
                  <span className="file-size">{item.size}</span>
                  {item.culturalSafety && <span className="cultural-safe">🌿</span>}
                </div>
              </div>

              <div className="item-content">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-description">{item.description}</p>
              </div>

              <div className="item-footer">
                <div className="item-info">
                  <span className="file-type">{item.fileType.toUpperCase()}</span>
                  <span className="category">{item.category.replace('-', ' ')}</span>
                </div>
                
                {isDownloadingThis && (
                  <div className="download-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="progress-text">{Math.round(progress)}%</span>
                  </div>
                )}
              </div>

              <div className="selection-indicator">
                {isSelected && <div className="checkmark">✓</div>}
              </div>
            </div>
          );
        })}
      </div>

      {selectedItems.length > 0 && (
        <div className="download-actions">
          <div className="download-summary">
            <strong>{selectedItems.length} items selected</strong>
            <span>Total size: {getTotalSize()}</span>
          </div>
          
          <button
            className="download-btn"
            onClick={downloadSelected}
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <span className="download-spinner">⏳</span>
                Downloading...
              </>
            ) : (
              <>
                📥 Download {downloadFormat === 'bundle' ? 'Bundle' : 'Selected'}
              </>
            )}
          </button>
        </div>
      )}

      <div className="download-info">
        <h3>📋 Download Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>File Formats:</strong> PDF for reading, Word for editing, PowerPoint for presentations
          </div>
          <div className="info-item">
            <strong>Cultural Safety:</strong> All materials include cultural context and safety guidance
          </div>
          <div className="info-item">
            <strong>Licensing:</strong> Materials are licensed for educational use with proper attribution
          </div>
          <div className="info-item">
            <strong>Updates:</strong> Materials are regularly updated based on feedback and cultural consultation
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadManager;