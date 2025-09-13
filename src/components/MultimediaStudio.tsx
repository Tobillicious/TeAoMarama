import React, { useCallback, useRef, useState } from 'react';
import './MultimediaStudio.css';

interface MediaAsset {
  id: string;
  name: string;
  type: 'video' | 'audio' | 'image' | 'document' | 'interactive';
  url: string;
  thumbnail?: string;
  duration?: number;
  size: number;
  culturalContext: {
    requiresKaitiakiApproval: boolean;
    culturalSensitivity: 'low' | 'medium' | 'high';
    tikangaCompliant: boolean;
    teReoContent: boolean;
  };
  metadata: {
    uploadedBy: string;
    uploadDate: Date;
    tags: string[];
    description: string;
    educationalLevel: string[];
    subjects: string[];
  };
  status: 'processing' | 'ready' | 'needs_review' | 'approved';
}

interface CreationTool {
  id: string;
  name: string;
  icon: string;
  description: string;
  culturalFeatures: string[];
  category: 'video' | 'audio' | 'interactive' | 'document';
}

const MultimediaStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'library' | 'edit' | 'cultural'>('create');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<MediaAsset[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const creationTools: CreationTool[] = [
    {
      id: 'video-recorder',
      name: 'Cultural Video Creator',
      icon: '🎥',
      description:
        'Record educational videos with Te Reo Māori support and cultural context overlays',
      culturalFeatures: [
        'Te Reo subtitles',
        'Tikanga guidance',
        'Cultural safety checks',
        'Pronunciation guides',
      ],
      category: 'video',
    },
    {
      id: 'audio-studio',
      name: 'Māori Audio Studio',
      icon: '🎵',
      description:
        'Create audio content with proper Te Reo pronunciation and traditional music integration',
      culturalFeatures: [
        'Te Reo pronunciation',
        'Traditional instruments',
        'Waiata integration',
        'Audio tikanga',
      ],
      category: 'audio',
    },
    {
      id: 'interactive-builder',
      name: 'Interactive Pūrākau Builder',
      icon: '🎮',
      description:
        'Build interactive storytelling experiences based on Māori legends and cultural narratives',
      culturalFeatures: [
        'Pūrākau templates',
        'Cultural storytelling',
        'Interactive elements',
        'Kaitiaki approval',
      ],
      category: 'interactive',
    },
    {
      id: 'whakataukī-designer',
      name: 'Whakataukī Visual Designer',
      icon: '📜',
      description:
        'Create beautiful visual representations of Māori proverbs with cultural context',
      culturalFeatures: [
        'Traditional patterns',
        'Cultural symbols',
        'Context explanations',
        'Pronunciation audio',
      ],
      category: 'document',
    },
    {
      id: 'cultural-slideshow',
      name: 'Cultural Presentation Builder',
      icon: '📊',
      description: 'Design presentations that respectfully incorporate Māori cultural elements',
      culturalFeatures: [
        'Cultural templates',
        'Tikanga guidelines',
        'Image permissions',
        'Context validation',
      ],
      category: 'document',
    },
    {
      id: 'virtual-marae',
      name: 'Virtual Marae Experience',
      icon: '🏛️',
      description: 'Create immersive virtual marae experiences for cultural education',
      culturalFeatures: [
        '3D marae models',
        'Protocol guidance',
        'Cultural navigation',
        'Respectful interaction',
      ],
      category: 'interactive',
    },
  ];

  const mockMediaAssets: MediaAsset[] = [
    {
      id: '1',
      name: 'Te Reo Māori Numbers 1-10',
      type: 'video',
      url: '/videos/te-reo-numbers.mp4',
      thumbnail: '/thumbnails/te-reo-numbers.jpg',
      duration: 180,
      size: 25600000,
      culturalContext: {
        requiresKaitiakiApproval: true,
        culturalSensitivity: 'medium',
        tikangaCompliant: true,
        teReoContent: true,
      },
      metadata: {
        uploadedBy: 'Aroha Thompson',
        uploadDate: new Date('2024-01-15'),
        tags: ['te-reo', 'numbers', 'pronunciation', 'primary'],
        description: 'Educational video teaching Māori numbers 1-10 with proper pronunciation',
        educationalLevel: ['Primary', 'Intermediate'],
        subjects: ['Te Reo Māori', 'Mathematics'],
      },
      status: 'approved',
    },
    {
      id: '2',
      name: 'Traditional Māori Patterns',
      type: 'interactive',
      url: '/interactive/maori-patterns',
      size: 15400000,
      culturalContext: {
        requiresKaitiakiApproval: true,
        culturalSensitivity: 'high',
        tikangaCompliant: true,
        teReoContent: false,
      },
      metadata: {
        uploadedBy: 'Mere Williams',
        uploadDate: new Date('2024-01-20'),
        tags: ['patterns', 'art', 'culture', 'interactive'],
        description:
          'Interactive exploration of traditional Māori geometric patterns and their meanings',
        educationalLevel: ['Intermediate', 'Secondary'],
        subjects: ['Arts', 'Social Studies', 'Cultural Studies'],
      },
      status: 'needs_review',
    },
    {
      id: '3',
      name: 'Whakataukī: Kia kaha',
      type: 'audio',
      url: '/audio/whakataukī-kia-kaha.mp3',
      duration: 45,
      size: 3200000,
      culturalContext: {
        requiresKaitiakiApproval: true,
        culturalSensitivity: 'medium',
        tikangaCompliant: true,
        teReoContent: true,
      },
      metadata: {
        uploadedBy: 'David Kim',
        uploadDate: new Date('2024-01-25'),
        tags: ['whakataukī', 'pronunciation', 'wisdom', 'audio'],
        description:
          'Audio pronunciation guide for the whakataukī "Kia kaha" with cultural context',
        educationalLevel: ['All levels'],
        subjects: ['Te Reo Māori', 'Cultural Studies'],
      },
      status: 'approved',
    },
  ];

  React.useEffect(() => {
    setMediaLibrary(mockMediaAssets);
  }, []);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Add new file to library
          const file = files[0];
          const newAsset: MediaAsset = {
            id: Date.now().toString(),
            name: file.name,
            type: file.type.startsWith('video/')
              ? 'video'
              : file.type.startsWith('audio/')
              ? 'audio'
              : file.type.startsWith('image/')
              ? 'image'
              : 'document',
            url: URL.createObjectURL(file),
            size: file.size,
            culturalContext: {
              requiresKaitiakiApproval: true,
              culturalSensitivity: 'medium',
              tikangaCompliant: false,
              teReoContent: false,
            },
            metadata: {
              uploadedBy: 'Current User',
              uploadDate: new Date(),
              tags: [],
              description: '',
              educationalLevel: [],
              subjects: [],
            },
            status: 'processing',
          };
          setMediaLibrary((prev) => [newAsset, ...prev]);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCulturalBadge = (asset: MediaAsset): string => {
    if (asset.culturalContext.culturalSensitivity === 'high') return '🌿 High Cultural Content';
    if (asset.culturalContext.teReoContent) return '🗣️ Te Reo Māori';
    if (asset.culturalContext.tikangaCompliant) return '✅ Tikanga Compliant';
    return '📚 Educational Content';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved':
        return '#059669';
      case 'ready':
        return '#0891b2';
      case 'needs_review':
        return '#f59e0b';
      case 'processing':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="multimedia-studio">
      <div className="studio-header">
        <h1>🎨 Multimedia Creation Studio</h1>
        <p>Create culturally responsive educational content with AI-powered tools</p>

        <div className="studio-tabs">
          <button
            className={`tab-button ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            🎨 Create
          </button>
          <button
            className={`tab-button ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            📚 Media Library
          </button>
          <button
            className={`tab-button ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            ✏️ Edit & Enhance
          </button>
          <button
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural Validation
          </button>
        </div>
      </div>

      <div className="studio-content">
        {activeTab === 'create' && (
          <div className="creation-workspace">
            <div className="tools-section">
              <h3>🛠️ Creation Tools</h3>
              <div className="tools-grid">
                {creationTools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`tool-card ${selectedTool === tool.id ? 'selected' : ''}`}
                    onClick={() => setSelectedTool(tool.id)}
                  >
                    <div className="tool-icon">{tool.icon}</div>
                    <div className="tool-info">
                      <h4>{tool.name}</h4>
                      <p>{tool.description}</p>
                      <div className="cultural-features">
                        {tool.culturalFeatures.map((feature) => (
                          <span key={feature} className="feature-tag">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="tool-launch-btn">Launch Tool</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="upload-section">
              <h3>📤 Upload Media</h3>
              <div className="upload-area" onClick={() => fileInputRef.current?.click()}>
                <div className="upload-content">
                  <div className="upload-icon">📁</div>
                  <p>Click to upload or drag and drop</p>
                  <span>Supports: Video, Audio, Images, Documents</span>
                  <span className="cultural-note">
                    🌿 All uploads will be reviewed for cultural appropriateness
                  </span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="video/*,audio/*,image/*,.pdf,.doc,.docx"
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'none' }}
                />
              </div>

              {isUploading && (
                <div className="upload-progress">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                  <span>{Math.round(uploadProgress)}% uploaded</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="library-workspace">
            <div className="library-header">
              <h3>📚 Media Library ({mediaLibrary.length} items)</h3>
              <div className="library-filters">
                <select className="filter-select" aria-label="Filter by media type">
                  <option value="all">All Types</option>
                  <option value="video">Videos</option>
                  <option value="audio">Audio</option>
                  <option value="image">Images</option>
                  <option value="interactive">Interactive</option>
                  <option value="document">Documents</option>
                </select>
                <select className="filter-select" aria-label="Filter by media status">
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="needs_review">Needs Review</option>
                  <option value="processing">Processing</option>
                </select>
              </div>
            </div>

            <div className="media-grid">
              {mediaLibrary.map((asset) => (
                <div key={asset.id} className={`media-card ${asset.type}`}>
                  <div className="media-preview">
                    <div className="media-type-icon">
                      {asset.type === 'video' && '🎥'}
                      {asset.type === 'audio' && '🎵'}
                      {asset.type === 'image' && '🖼️'}
                      {asset.type === 'interactive' && '🎮'}
                      {asset.type === 'document' && '📄'}
                    </div>
                    <div
                      className="status-indicator"
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(asset.status) }}
                    ></div>
                  </div>

                  <div className="media-info">
                    <h4>{asset.name}</h4>
                    <div className="media-meta">
                      <span className="file-size">{formatFileSize(asset.size)}</span>
                      {asset.duration && (
                        <span className="duration">{formatDuration(asset.duration)}</span>
                      )}
                    </div>

                    <div className="cultural-info">
                      <span className="cultural-badge">{getCulturalBadge(asset)}</span>
                      {asset.culturalContext.requiresKaitiakiApproval && (
                        <span className="kaitiaki-badge">🌿 Kaitiaki Review</span>
                      )}
                    </div>

                    <div className="media-tags">
                      {asset.metadata.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                      {asset.metadata.tags.length > 3 && (
                        <span className="tag more">+{asset.metadata.tags.length - 3}</span>
                      )}
                    </div>

                    <div className="media-actions">
                      <button className="action-btn preview">👁️ Preview</button>
                      <button className="action-btn edit">✏️ Edit</button>
                      <button className="action-btn share">📤 Share</button>
                    </div>

                    <div className="upload-info">
                      <small>
                        By {asset.metadata.uploadedBy} •{' '}
                        {asset.metadata.uploadDate.toLocaleDateString('en-NZ')}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="edit-workspace">
            <h3>✏️ Edit & Enhance</h3>

            <div className="edit-tools">
              <div className="tool-category">
                <h4>🎥 Video Tools</h4>
                <div className="edit-tool-grid">
                  <button className="edit-tool">Te Reo Subtitles</button>
                  <button className="edit-tool">Cultural Overlays</button>
                  <button className="edit-tool">Pronunciation Guides</button>
                  <button className="edit-tool">Traditional Transitions</button>
                </div>
              </div>

              <div className="tool-category">
                <h4>🎵 Audio Tools</h4>
                <div className="edit-tool-grid">
                  <button className="edit-tool">Voice Enhancement</button>
                  <button className="edit-tool">Background Music</button>
                  <button className="edit-tool">Noise Reduction</button>
                  <button className="edit-tool">Cultural Audio</button>
                </div>
              </div>

              <div className="tool-category">
                <h4>🌿 Cultural Enhancement</h4>
                <div className="edit-tool-grid">
                  <button className="edit-tool">Tikanga Validation</button>
                  <button className="edit-tool">Cultural Context</button>
                  <button className="edit-tool">Māori Patterns</button>
                  <button className="edit-tool">Sacred Content Check</button>
                </div>
              </div>
            </div>

            <div className="ai-enhancement">
              <h4>🤖 AI-Powered Enhancements</h4>
              <div className="ai-tools">
                <button className="ai-tool">
                  <span className="ai-icon">🧠</span>
                  <div>
                    <strong>Cultural Context AI</strong>
                    <p>Automatically add appropriate cultural context to educational content</p>
                  </div>
                </button>

                <button className="ai-tool">
                  <span className="ai-icon">🗣️</span>
                  <div>
                    <strong>Te Reo Pronunciation</strong>
                    <p>Generate accurate Te Reo Māori pronunciation guides using AI</p>
                  </div>
                </button>

                <button className="ai-tool">
                  <span className="ai-icon">🎨</span>
                  <div>
                    <strong>Visual Enhancement</strong>
                    <p>Add traditional Māori design elements respectfully</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cultural' && (
          <div className="cultural-workspace">
            <h3>🌿 Cultural Validation Center</h3>

            <div className="validation-dashboard">
              <div className="validation-stats">
                <div className="stat-card">
                  <div className="stat-number">23</div>
                  <div className="stat-label">Pending Review</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">156</div>
                  <div className="stat-label">Kaitiaki Approved</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">98%</div>
                  <div className="stat-label">Cultural Safety Score</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">12</div>
                  <div className="stat-label">Active Kaitiaki</div>
                </div>
              </div>

              <div className="validation-queue">
                <h4>📋 Validation Queue</h4>
                <div className="queue-items">
                  <div className="queue-item high-priority">
                    <div className="item-info">
                      <strong>Traditional Māori Patterns</strong>
                      <span>Interactive content requiring cultural sensitivity review</span>
                    </div>
                    <div className="item-meta">
                      <span className="priority-badge high">High Priority</span>
                      <span className="time-waiting">2 days waiting</span>
                    </div>
                  </div>

                  <div className="queue-item medium-priority">
                    <div className="item-info">
                      <strong>Whakataukī Collection</strong>
                      <span>Audio pronunciation guide for traditional proverbs</span>
                    </div>
                    <div className="item-meta">
                      <span className="priority-badge medium">Medium Priority</span>
                      <span className="time-waiting">5 hours waiting</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cultural-guidelines">
                <h4>📚 Cultural Guidelines</h4>
                <div className="guidelines-grid">
                  <div className="guideline-card">
                    <h5>🌿 Sacred Content</h5>
                    <p>
                      Content involving sacred Māori knowledge requires senior Kaitiaki approval
                    </p>
                  </div>
                  <div className="guideline-card">
                    <h5>🗣️ Te Reo Usage</h5>
                    <p>All Te Reo Māori content must include proper pronunciation guides</p>
                  </div>
                  <div className="guideline-card">
                    <h5>🎨 Visual Elements</h5>
                    <p>Traditional patterns and symbols require cultural context explanations</p>
                  </div>
                  <div className="guideline-card">
                    <h5>📖 Educational Value</h5>
                    <p>All content must align with culturally responsive teaching practices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultimediaStudio;
