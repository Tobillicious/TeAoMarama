import { Award, BookOpen, Calculator, Download, Eye, FileText, Globe, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import './TeKeteAkoResourceExplorer.css';

interface TeKeteAkoResource {
  id: string;
  title: string;
  type: 'worksheet' | 'unit' | 'lesson' | 'template' | 'guide';
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

  useEffect(() => {
    // Load TeKeteAko resources
    const teKeteAkoResources: TeKeteAkoResource[] = [
      // Math Worksheets
      {
        id: 'fractions-decimals-percentages',
        title: 'Fractions, Decimals, and Percentages',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 7-10',
        description:
          'Comprehensive worksheet covering conversions between fractions, decimals, and percentages with practice problems and answer key.',
        path: '/resources/te-kete-ako-clean/math_worksheets/fractions_decimals_percentages.md',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        curriculumAlignment: 'NZ Curriculum Level 4-5',
      },
      {
        id: 'area-perimeter',
        title: 'Area and Perimeter',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 7-9',
        description:
          'Interactive worksheet exploring area and perimeter calculations with real-world applications.',
        path: '/resources/te-kete-ako-clean/math_worksheets/area_and_perimeter.md',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        curriculumAlignment: 'NZ Curriculum Level 4',
      },
      {
        id: 'negative-numbers',
        title: 'Negative Numbers and Absolute Value',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 8-10',
        description:
          'Understanding negative numbers, absolute value, and operations with integers.',
        path: '/resources/te-kete-ako-clean/math_worksheets/negative_numbers_and_absolute_value.md',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        curriculumAlignment: 'NZ Curriculum Level 4-5',
      },
      {
        id: 'order-operations',
        title: 'Order of Operations',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 7-9',
        description:
          'Mastering BEDMAS/PEMDAS with progressive difficulty levels and real-world problems.',
        path: '/resources/te-kete-ako-clean/math_worksheets/order_of_operations.md',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        curriculumAlignment: 'NZ Curriculum Level 4',
      },
      {
        id: 'linear-equations',
        title: 'Solving Linear Equations',
        type: 'worksheet',
        subject: 'Mathematics',
        yearLevel: 'Years 9-11',
        description:
          'Step-by-step approach to solving linear equations with variables on both sides.',
        path: '/resources/te-kete-ako-clean/math_worksheets/solving_linear_equations.md',
        icon: <Calculator className="w-6 h-6" />,
        category: 'Mathematics',
        curriculumAlignment: 'NZ Curriculum Level 5-6',
      },

      // Social Studies Units
      {
        id: 'decolonized-history',
        title: 'Decolonized Aotearoa History',
        type: 'unit',
        subject: 'Social Studies',
        yearLevel: 'Years 9-13',
        description:
          'Comprehensive unit centering Māori perspectives, agency, and resistance in Aotearoa history. Challenges colonial narratives.',
        path: '/resources/te-kete-ako-clean/dist/units/urds/URD-Unit2-Decolonized-History.md',
        icon: <Globe className="w-6 h-6" />,
        category: 'Social Studies',
        culturalContext: 'Te Ao Māori perspectives, Tino Rangatiratanga',
        curriculumAlignment: 'NZ Curriculum Level 5-8',
      },
      {
        id: 'contemporary-issues',
        title: 'Contemporary Issues',
        type: 'unit',
        subject: 'Social Studies',
        yearLevel: 'Years 10-13',
        description:
          'Exploring current social, political, and cultural issues in Aotearoa with critical analysis frameworks.',
        path: '/resources/te-kete-ako-clean/dist/units/urds/URD-Unit4-Contemporary-Issues.md',
        icon: <Globe className="w-6 h-6" />,
        category: 'Social Studies',
        culturalContext: 'Contemporary Māori perspectives',
        curriculumAlignment: 'NZ Curriculum Level 6-8',
      },
      {
        id: 'digital-tech-ethics',
        title: 'Digital Technology and AI Ethics',
        type: 'unit',
        subject: 'Digital Technology',
        yearLevel: 'Years 9-13',
        description:
          'Exploring ethical implications of digital technology and AI from cultural and social perspectives.',
        path: '/resources/te-kete-ako-clean/dist/units/urds/URD-Unit7-Digital-Tech-AI-Ethics.md',
        icon: <Globe className="w-6 h-6" />,
        category: 'Digital Technology',
        culturalContext: 'Indigenous perspectives on technology',
        curriculumAlignment: 'NZ Curriculum Level 5-8',
      },

      // Professional Templates and Guides
      {
        id: 'lesson-template-guide',
        title: 'Professional Lesson Template Guide',
        type: 'template',
        subject: 'Teaching Resources',
        yearLevel: 'All Levels',
        description:
          'Comprehensive guide for creating culturally authentic, pedagogically sound lessons with Te Ao Māori integration.',
        path: '/resources/te-kete-ako-clean/dist/guided-inquiry-unit/LESSON_TEMPLATE_GUIDE.md',
        icon: <FileText className="w-6 h-6" />,
        category: 'Teaching Resources',
        culturalContext: 'Te Ao Māori integration protocols',
        curriculumAlignment: 'NZ Curriculum Framework',
      },
      {
        id: 'design-enhancement-report',
        title: 'Design Enhancement Report',
        type: 'guide',
        subject: 'Design System',
        yearLevel: 'All Levels',
        description:
          'Professional design system documentation with color palette, typography, and cultural integration guidelines.',
        path: '/resources/te-kete-ako-clean/dist/DESIGN_ENHANCEMENT_REPORT.md',
        icon: <Award className="w-6 h-6" />,
        category: 'Design System',
        culturalContext: 'Pounamu green, Kahurangi blue color palette',
        curriculumAlignment: 'Professional Standards',
      },
    ];

    setResources(teKeteAkoResources);
    setFilteredResources(teKeteAkoResources);
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
              Discover thousands of beautiful, professional educational resources from the TeKeteAko
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
