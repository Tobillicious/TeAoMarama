import { Award, BookOpen, Search, Sparkles, Star, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { EnhancedResource } from '../utils/enhanced-resource-loader';
import {
  getEnhancedResourceStatistics,
  loadEnhancedResources,
} from '../utils/enhanced-resource-loader';
import './EnhancedResourceBrowser.css';

const EnhancedResourceBrowser: React.FC = () => {
  const [resources, setResources] = useState<EnhancedResource[]>([]);
  const [filteredResources, setFilteredResources] = useState<EnhancedResource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [qualityFilter, setQualityFilter] = useState(0);
  const [culturalFilter, setCulturalFilter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<EnhancedResource | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [statistics, setStatistics] = useState<any>(null);

  // Load enhanced resources
  useEffect(() => {
    const loadResources = async () => {
      setLoading(true);
      try {
        console.log('🚀 Loading enhanced resources...');

        // Test loading a single batch first
        const testResponse = await fetch('/enhanced-resources-output/batch-1-enhanced.json');
        if (!testResponse.ok) {
          throw new Error(`Failed to load test batch: ${testResponse.status}`);
        }
        const testBatch = await testResponse.json();
        console.log('✅ Test batch loaded:', testBatch.resources?.length || 0, 'resources');

        const enhancedResources = await loadEnhancedResources();
        console.log('📊 Enhanced resources loaded:', enhancedResources.length);

        setResources(enhancedResources);
        setFilteredResources(enhancedResources);

        const stats = getEnhancedResourceStatistics();
        setStatistics(stats);

        console.log(`✅ Loaded ${enhancedResources.length} enhanced resources`);

        // Force re-render if we have resources but they're not showing
        if (enhancedResources.length > 0) {
          setTimeout(() => {
            setFilteredResources([...enhancedResources]);
          }, 100);
        }
      } catch (error) {
        console.error('Error loading enhanced resources:', error);
        console.error('Error details:', error.message);

        // Fallback: Show some sample data so users can see the interface
        const sampleData = [
          {
            id: 'sample-1',
            title: 'Enhanced Resource Loading...',
            subject: 'Loading',
            yearLevel: 'All',
            type: 'System',
            description: 'Enhanced resources are being loaded. Please check console for details.',
            culturalElements: 0,
            currentPass: 0,
            originalQuality: 0,
            enhancement: {
              passesCompleted: 0,
              culturalAuthenticity: 0,
              pedagogicalDepth: 0,
              progressiveIndex: 0,
              qualityScore: 0,
              passes: [],
            },
            metadata: {
              created: new Date().toISOString(),
              lastModified: new Date().toISOString(),
              tags: ['loading'],
              difficulty: 0,
              estimatedDuration: 0,
            },
          },
        ];
        setResources(sampleData);
        setFilteredResources(sampleData);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, []);

  // Filter resources
  useEffect(() => {
    let filtered = resources;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Subject filter
    if (selectedSubject !== 'all') {
      filtered = filtered.filter((resource) => resource.subject === selectedSubject);
    }

    // Year level filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter((resource) => resource.yearLevel === selectedYear);
    }

    // Quality filter
    if (qualityFilter > 0) {
      filtered = filtered.filter((resource) => resource.enhancement.qualityScore >= qualityFilter);
    }

    // Cultural authenticity filter
    if (culturalFilter > 0) {
      filtered = filtered.filter(
        (resource) => resource.enhancement.culturalAuthenticity >= culturalFilter,
      );
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, selectedSubject, selectedYear, qualityFilter, culturalFilter]);

  const getQualityColor = (score: number) => {
    if (score >= 14) return 'quality-excellent';
    if (score >= 12) return 'quality-high';
    if (score >= 10) return 'quality-good';
    return 'quality-basic';
  };

  const getCulturalColor = (score: number) => {
    if (score >= 9) return 'cultural-excellent';
    if (score >= 8) return 'cultural-high';
    if (score >= 7) return 'cultural-good';
    return 'cultural-basic';
  };

  const getKaiakoInfo = (passes: any[]) => {
    return passes.map((pass) => `${pass.kaiako} (${pass.specialization})`).join(', ');
  };

  if (loading) {
    return (
      <div className="enhanced-browser loading">
        <div className="loading-spinner">
          <Sparkles className="animate-spin" size={48} />
          <p>Loading 6,055+ enhanced resources...</p>
          <p className="loading-detail">Progressive enrichment system initializing...</p>
        </div>
      </div>
    );
  }

  // Show message if no resources loaded
  if (!loading && filteredResources.length === 0) {
    return (
      <div className="enhanced-browser">
        <div className="browser-header">
          <div className="header-content">
            <h1>
              <Sparkles className="inline" /> Enhanced Resource Library
            </h1>
            <p className="subtitle">
              World-class educational resources enhanced through 4-pass progressive enrichment
            </p>
          </div>
        </div>
        <div className="no-resources-message">
          <Sparkles size={64} className="opacity-50" />
          <h2>Enhanced Resources Not Available</h2>
          <p>The enhanced resource library is currently being loaded. Please check:</p>
          <ul>
            <li>Browser console for loading status</li>
            <li>Network connectivity</li>
            <li>Try refreshing the page</li>
          </ul>
          <p>Expected: 6,055+ enhanced resources across all subjects</p>
        </div>
      </div>
    );
  }

  return (
    <div className="enhanced-browser">
      <div className="browser-header">
        <div className="header-content">
          <h1>
            <Sparkles className="inline" /> Enhanced Resource Library
          </h1>
          <p className="subtitle">
            World-class educational resources enhanced through 4-pass progressive enrichment
          </p>

          {statistics && (
            <div className="stats-summary">
              <div className="stat">
                <BookOpen size={20} />
                <span>{statistics.totalResources.toLocaleString()} Resources</span>
              </div>
              <div className="stat">
                <Star size={20} />
                <span>{statistics.averageQuality}/10 Avg Quality</span>
              </div>
              <div className="stat">
                <Award size={20} />
                <span>{statistics.averageCulturalAuthenticity}/10 Cultural Auth.</span>
              </div>
              <div className="stat">
                <Users size={20} />
                <span>{statistics.subjects.length} Subjects</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="browser-filters">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search enhanced resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="all">All Subjects</option>
            <option value="Social Studies">Social Studies</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Te Reo Māori">Te Reo Māori</option>
            <option value="Arts">Arts</option>
            <option value="Technology">Technology</option>
            <option value="Health & PE">Health & PE</option>
          </select>

          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="all">All Year Levels</option>
            <option value="Year 7">Year 7</option>
            <option value="Year 8">Year 8</option>
            <option value="Year 9">Year 9</option>
            <option value="Year 10">Year 10</option>
            <option value="Year 11">Year 11</option>
            <option value="Year 12">Year 12</option>
            <option value="Year 13">Year 13</option>
          </select>

          <div className="quality-filters">
            <label>
              Min Quality:
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={qualityFilter}
                onChange={(e) => setQualityFilter(parseFloat(e.target.value))}
              />
              <span>{qualityFilter}/15</span>
            </label>

            <label>
              Min Cultural Auth:
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={culturalFilter}
                onChange={(e) => setCulturalFilter(parseFloat(e.target.value))}
              />
              <span>{culturalFilter}/10</span>
            </label>
          </div>
        </div>
      </div>

      <div className="browser-results">
        <div className="results-header">
          <span>{filteredResources.length.toLocaleString()} enhanced resources found</span>
          <div className="view-controls">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </button>
            <button
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              List
            </button>
          </div>
        </div>

        <div className={`resources-container ${viewMode}`}>
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="resource-card enhanced"
              onClick={() => setSelectedResource(resource)}
            >
              <div className="resource-header">
                <h3>{resource.title}</h3>
                <div className="resource-badges">
                  <span
                    className={`quality-badge ${getQualityColor(
                      resource.enhancement.qualityScore,
                    )}`}
                  >
                    <Star size={14} />
                    {resource.enhancement.qualityScore.toFixed(1)}
                  </span>
                  <span
                    className={`cultural-badge ${getCulturalColor(
                      resource.enhancement.culturalAuthenticity,
                    )}`}
                  >
                    <Award size={14} />
                    {resource.enhancement.culturalAuthenticity.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="resource-meta">
                <span className="subject">{resource.subject}</span>
                <span className="year-level">{resource.yearLevel}</span>
                <span className="type">{resource.type}</span>
              </div>

              <div className="resource-description">{resource.description}</div>

              <div className="enhancement-info">
                <div className="passes-completed">
                  <Sparkles size={16} />
                  <span>{resource.enhancement.passesCompleted}/4 Enhancement Passes</span>
                </div>
                <div className="improvement">
                  <span className="improvement-badge">
                    +{(resource.enhancement.qualityScore - resource.originalQuality).toFixed(1)}{' '}
                    Quality
                  </span>
                </div>
              </div>

              <div className="kaiako-credits">
                Enhanced by: {getKaiakoInfo(resource.enhancement.passes)}
              </div>

              <div className="resource-actions">
                <button
                  className="view-content-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/actual-content/${resource.id}`, '_blank');
                  }}
                >
                  View Enhanced Content →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedResource && (
        <div className="resource-modal" onClick={() => setSelectedResource(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedResource.title}</h2>
              <button onClick={() => setSelectedResource(null)}>×</button>
            </div>

            <div className="modal-body">
              <div className="resource-details">
                <div className="detail-row">
                  <strong>Subject:</strong> {selectedResource.subject}
                </div>
                <div className="detail-row">
                  <strong>Year Level:</strong> {selectedResource.yearLevel}
                </div>
                <div className="detail-row">
                  <strong>Type:</strong> {selectedResource.type}
                </div>
                <div className="detail-row">
                  <strong>Quality Score:</strong>
                  <span
                    className={`score ${getQualityColor(
                      selectedResource.enhancement.qualityScore,
                    )}`}
                  >
                    {selectedResource.enhancement.qualityScore.toFixed(1)}/15
                  </span>
                </div>
                <div className="detail-row">
                  <strong>Cultural Authenticity:</strong>
                  <span
                    className={`score ${getCulturalColor(
                      selectedResource.enhancement.culturalAuthenticity,
                    )}`}
                  >
                    {selectedResource.enhancement.culturalAuthenticity.toFixed(1)}/10
                  </span>
                </div>
              </div>

              <div className="enhancement-details">
                <h3>Enhancement Passes</h3>
                {selectedResource.enhancement.passes.map((pass, index) => (
                  <div key={index} className="pass-detail">
                    <div className="pass-header">
                      <span className="pass-number">Pass {pass.passNumber}</span>
                      <span className="kaiako">{pass.kaiako}</span>
                    </div>
                    <div className="specialization">{pass.specialization}</div>
                    <div className="improvement">
                      +{pass.qualityImprovement.toFixed(1)} quality points
                    </div>
                  </div>
                ))}
              </div>

              <div className="resource-description-full">
                <h3>Description</h3>
                <p>{selectedResource.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedResourceBrowser;
