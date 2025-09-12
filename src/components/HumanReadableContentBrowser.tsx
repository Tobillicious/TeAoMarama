import React, { useEffect, useState } from 'react';
import type { ContentFile, ContentStats } from '../services/ContentService';
import { contentService } from '../services/ContentService';
import '../styles/kaitiaki-dashboard.css';
import './HumanReadableContentBrowser.css';

const HumanReadableContentBrowser: React.FC = () => {
  const [contentFiles, setContentFiles] = useState<ContentFile[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [stats, setStats] = useState<ContentStats>({
    multimedia: 0,
    unitPlans: 0,
    lessons: 0,
    assessments: 0,
    total: 0,
  });

  // Load content files from the ContentService
  useEffect(() => {
    const loadContentFiles = async () => {
      try {
        setLoading(true);

        // Load content and stats from the ContentService
        const [content, stats] = await Promise.all([
          contentService.loadAllContent(),
          contentService.getContentStats(),
        ]);

        setContentFiles(content);
        setFilteredContent(content);
        setStats(stats);
      } catch (err) {
        setError('Failed to load content files');
        console.error('Error loading content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContentFiles();
  }, []);

  // Filter content based on search and filters
  useEffect(() => {
    let filtered = contentFiles;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (content) =>
          content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          content.yearLevel.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter((content) => content.type === selectedType);
    }

    // Subject filter
    if (selectedSubject !== 'all') {
      filtered = filtered.filter((content) => content.subject === selectedSubject);
    }

    // Year filter
    if (selectedYear !== 'all') {
      filtered = filtered.filter((content) => content.yearLevel === selectedYear);
    }

    setFilteredContent(filtered);
  }, [contentFiles, searchTerm, selectedType, selectedSubject, selectedYear]);

  const getTypeEmoji = (type: string): string => {
    const emojiMap: { [key: string]: string } = {
      multimedia: '🎬',
      'unit-plan': '📅',
      lesson: '📝',
      assessment: '📊',
    };
    return emojiMap[type] || '📄';
  };

  const getSubjectEmoji = (subject: string): string => {
    const emojiMap: { [key: string]: string } = {
      'Te Reo Māori': '🌺',
      'Social Studies': '🏛️',
      Science: '🔬',
      Mathematics: '🔢',
      English: '📚',
      Arts: '🎨',
      Technology: '💻',
      Health: '🏥',
      'Physical Education': '🏃',
    };
    return emojiMap[subject] || '📖';
  };

  const getYearEmoji = (yearLevel: string): string => {
    const emojiMap: { [key: string]: string } = {
      'Year 1': '1️⃣',
      'Year 2': '2️⃣',
      'Year 3': '3️⃣',
      'Year 4': '4️⃣',
      'Year 5': '5️⃣',
      'Year 6': '6️⃣',
      'Year 7': '7️⃣',
      'Year 8': '8️⃣',
      'Year 9': '9️⃣',
      'Year 10': '🔟',
      'Year 11': '1️⃣1️⃣',
      'Year 12': '1️⃣2️⃣',
      'Year 13': '1️⃣3️⃣',
    };
    return emojiMap[yearLevel] || '📚';
  };

  if (loading) {
    return (
      <div className="content-browser">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading human-readable content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-browser">
        <div className="error-container">
          <h2>❌ Error Loading Content</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-browser">
      <div className="browser-header">
        <h1>📚 Human-Readable Educational Content</h1>
        <p className="browser-subtitle">
          Access comprehensive, culturally-safe educational resources converted from JSON format
        </p>

        {/* Statistics */}
        <div className="content-stats">
          <div className="stat-card">
            <span className="stat-icon">🎬</span>
            <span className="stat-number">{stats.multimedia}</span>
            <span className="stat-label">Multimedia</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📅</span>
            <span className="stat-number">{stats.unitPlans}</span>
            <span className="stat-label">Unit Plans</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📝</span>
            <span className="stat-number">{stats.lessons}</span>
            <span className="stat-label">Lessons</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📊</span>
            <span className="stat-number">{stats.assessments}</span>
            <span className="stat-label">Assessments</span>
          </div>
          <div className="stat-card total">
            <span className="stat-icon">📚</span>
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="browser-filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search content, subjects, or year levels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="filter-select"
            title="Filter by content type"
          >
            <option value="all">All Types</option>
            <option value="multimedia">🎬 Multimedia</option>
            <option value="unit-plan">📅 Unit Plans</option>
            <option value="lesson">📝 Lessons</option>
            <option value="assessment">📊 Assessments</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="filter-select"
            title="Filter by subject"
          >
            <option value="all">All Subjects</option>
            <option value="Te Reo Māori">🌺 Te Reo Māori</option>
            <option value="Social Studies">🏛️ Social Studies</option>
            <option value="Science">🔬 Science</option>
            <option value="Mathematics">🔢 Mathematics</option>
            <option value="English">📚 English</option>
            <option value="Arts">🎨 Arts</option>
            <option value="Technology">💻 Technology</option>
            <option value="Health">🏥 Health</option>
            <option value="Physical Education">🏃 Physical Education</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="filter-select"
            title="Filter by year level"
          >
            <option value="all">All Year Levels</option>
            <option value="Year 1">1️⃣ Year 1</option>
            <option value="Year 2">2️⃣ Year 2</option>
            <option value="Year 3">3️⃣ Year 3</option>
            <option value="Year 4">4️⃣ Year 4</option>
            <option value="Year 5">5️⃣ Year 5</option>
            <option value="Year 6">6️⃣ Year 6</option>
            <option value="Year 7">7️⃣ Year 7</option>
            <option value="Year 8">8️⃣ Year 8</option>
            <option value="Year 9">9️⃣ Year 9</option>
            <option value="Year 10">🔟 Year 10</option>
            <option value="Year 11">1️⃣1️⃣ Year 11</option>
            <option value="Year 12">1️⃣2️⃣ Year 12</option>
            <option value="Year 13">1️⃣3️⃣ Year 13</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="browser-results">
        <div className="results-header">
          <h3>Found {filteredContent.length} content files</h3>
          {filteredContent.length !== contentFiles.length && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedSubject('all');
                setSelectedYear('all');
              }}
              className="clear-filters-btn"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="content-grid">
          {filteredContent.map((content) => (
            <div key={content.id} className="content-card">
              <div className="content-header">
                <div className="content-type">
                  <span className="type-icon">{getTypeEmoji(content.type)}</span>
                  <span className="type-label">{content.type.replace('-', ' ')}</span>
                </div>
                <div className="depth-badge" data-depth={content.depth}>
                  {content.depth}
                </div>
              </div>

              <h3 className="content-title">{content.title}</h3>

              <div className="content-meta">
                <div className="meta-item">
                  <span className="meta-icon">{getSubjectEmoji(content.subject)}</span>
                  <span className="meta-text">{content.subject}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">{getYearEmoji(content.yearLevel)}</span>
                  <span className="meta-text">{content.yearLevel}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">⏱️</span>
                  <span className="meta-text">{content.duration}</span>
                </div>
              </div>

              <div className="content-actions">
                <a
                  href={content.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn primary"
                >
                  📖 View Content
                </a>
                <button className="action-btn secondary">⭐ Favorite</button>
              </div>
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="no-results">
            <h3>🔍 No content found</h3>
            <p>Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      {/* Cultural Context */}
      <div className="cultural-context">
        <h3>🌺 Cultural Context</h3>
        <p>
          All content has been developed with cultural safety and tikanga protocols in mind,
          ensuring authentic integration of Te Reo Māori and Māori perspectives. Each resource
          maintains 100% cultural compliance and supports differentiated learning approaches.
        </p>
      </div>
    </div>
  );
};

export default HumanReadableContentBrowser;
