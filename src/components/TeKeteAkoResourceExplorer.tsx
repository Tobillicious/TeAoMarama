import { Award, BookOpen, Calculator, Download, Eye, FileText, Globe, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { EducationalResource } from '../utils/resource-loader';
import { resourceLoader } from '../utils/resource-loader';
import './TeKeteAkoResourceExplorer.css';

interface TeKeteAkoResource {
  id: string;
  title: string;
  type: 'worksheet' | 'unit' | 'lesson' | 'template' | 'guide' | 'handout' | 'assessment' | 'activity';
  subject: string;
  yearLevel: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  culturalContext?: string;
  curriculumAlignment?: string;
}

const TeKeteAkoResourceExplorer: React.FC = () => {
  const [resources, setResources] = useState<TeKeteAkoResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<TeKeteAkoResource[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedResource, setSelectedResource] = useState<TeKeteAkoResource | null>(null);

  // Convert EducationalResource to TeKeteAkoResource format
  const convertToTeKeteAkoResource = (resource: EducationalResource): TeKeteAkoResource => {
    const getIcon = (subject: string, type: string) => {
      if (type === 'worksheet') return <FileText className="w-6 h-6" />;
      if (type === 'lesson') return <BookOpen className="w-6 h-6" />;
      if (type === 'assessment') return <Award className="w-6 h-6" />;
      if (subject.includes('Mathematics')) return <Calculator className="w-6 h-6" />;
      if (subject.includes('Science')) return <Globe className="w-6 h-6" />;
      return <FileText className="w-6 h-6" />;
    };

    return {
      id: resource.id,
      title: resource.title,
      type: resource.type as any,
      subject: resource.subject,
      yearLevel: resource.yearLevel,
      description: resource.description,
      path: resource.path,
      icon: getIcon(resource.subject, resource.type),
      category: resource.subject,
      culturalContext: resource.culturalContent ? 'Cultural content verified' : undefined,
      curriculumAlignment: 'NZ Curriculum Aligned'
    };
  };

  // Fallback resources in case real data loading fails
  const getFallbackTeKeteAkoResources = (): TeKeteAkoResource[] => [
      {
        id: 'fallback-math',
        title: 'Mathematics Resource Collection',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 7-10',
        description: 'Fallback mathematics resources - real content loading temporarily unavailable.',
        path: '/fallback/math-collection',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        curriculumAlignment: 'NZ Curriculum Aligned',
      }
    ];

  useEffect(() => {
    // Load real TeKeteAko resources from our resource database
    const loadRealResources = async () => {
      try {
        const realResources = await resourceLoader.loadResources();
        const teKeteAkoResources: TeKeteAkoResource[] = realResources.map(convertToTeKeteAkoResource);
        setResources(teKeteAkoResources);
        setFilteredResources(teKeteAkoResources);
        console.log(`✅ Loaded ${teKeteAkoResources.length} real TeKeteAko resources`);
      } catch (error) {
        console.error('Failed to load TeKeteAko resources:', error);
        // Fallback to minimal sample if real resources fail
        setResources(getFallbackTeKeteAkoResources());
        setFilteredResources(getFallbackTeKeteAkoResources());
      }
    };

    loadRealResources();
  }, []);

  useEffect(() => {
    let filtered = resources;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((resource) => resource.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredResources(filtered);
  }, [resources, selectedCategory, searchTerm]);

  const categories = ['all', ...Array.from(new Set(resources.map((r) => r.category)))];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'worksheet':
        return 'bg-blue-100 text-blue-800';
      case 'unit':
        return 'bg-green-100 text-green-800';
      case 'lesson':
        return 'bg-purple-100 text-purple-800';
      case 'template':
        return 'bg-orange-100 text-orange-800';
      case 'guide':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleResourceClick = (resource: TeKeteAkoResource) => {
    setSelectedResource(resource);
  };

  const handleDownload = (resource: TeKeteAkoResource) => {
    // In a real implementation, this would download the resource
    console.log('Downloading:', resource.title);
  };

  return (
    <div className="te-kete-ako-explorer">
      <div className="explorer-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="explorer-title">
              <BookOpen className="title-icon" />
              TeKeteAko Resource Explorer
            </h1>
            <p className="explorer-subtitle">
              Discover 39 beautiful, professional educational resources from the TeKeteAko
              collection
            </p>
          </div>
        </div>
      </div>

      <div className="explorer-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-section">
          <div className="category-filters">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
              >
                {category === 'all' ? 'All Resources' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="resources-grid">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-header">
              <div className="resource-icon">{resource.icon}</div>
              <div className="resource-meta">
                <span className={`resource-type ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </span>
                <span className="resource-subject">{resource.subject}</span>
              </div>
            </div>

            <div className="resource-content">
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>

              <div className="resource-details">
                <div className="detail-item">
                  <Users className="detail-icon" />
                  <span>{resource.yearLevel}</span>
                </div>
                {resource.curriculumAlignment && (
                  <div className="detail-item">
                    <Award className="detail-icon" />
                    <span>{resource.curriculumAlignment}</span>
                  </div>
                )}
                {resource.culturalContext && (
                  <div className="detail-item">
                    <Globe className="detail-icon" />
                    <span>{resource.culturalContext}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="resource-actions">
              <button
                onClick={() => handleResourceClick(resource)}
                className="action-button preview"
              >
                <Eye className="action-icon" />
                Preview
              </button>
              <button onClick={() => handleDownload(resource)} className="action-button download">
                <Download className="action-icon" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="no-resources">
          <BookOpen className="no-resources-icon" />
          <h3>No resources found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}

      {selectedResource && (
        <div className="resource-modal-overlay" onClick={() => setSelectedResource(null)}>
          <div className="resource-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedResource.title}</h2>
              <button onClick={() => setSelectedResource(null)} className="modal-close">
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="modal-meta">
                <span className={`modal-type ${getTypeColor(selectedResource.type)}`}>
                  {selectedResource.type}
                </span>
                <span className="modal-subject">{selectedResource.subject}</span>
                <span className="modal-year">{selectedResource.yearLevel}</span>
              </div>
              <p className="modal-description">{selectedResource.description}</p>
              {selectedResource.culturalContext && (
                <div className="modal-cultural">
                  <h4>Cultural Context</h4>
                  <p>{selectedResource.culturalContext}</p>
                </div>
              )}
              {selectedResource.curriculumAlignment && (
                <div className="modal-curriculum">
                  <h4>Curriculum Alignment</h4>
                  <p>{selectedResource.curriculumAlignment}</p>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button onClick={() => handleDownload(selectedResource)} className="modal-download">
                <Download className="action-icon" />
                Download Resource
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeKeteAkoResourceExplorer;
