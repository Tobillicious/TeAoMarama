import React, { useEffect, useState } from 'react';
import './DatabaseIntegrationSystem.css';

interface DatabaseRecord {
  id: string;
  type: 'student' | 'lesson' | 'assessment' | 'cultural-content' | 'analytics';
  data: any;
  metadata: {
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    culturalContext: string;
    tags: string[];
    version: number;
  };
  status: 'active' | 'archived' | 'pending' | 'error';
}

interface DatabaseStats {
  totalRecords: number;
  activeRecords: number;
  culturalContent: number;
  students: number;
  lessons: number;
  assessments: number;
  storageUsed: string;
  lastSync: string;
  syncStatus: 'synced' | 'syncing' | 'error';
}

interface QueryResult {
  records: DatabaseRecord[];
  totalCount: number;
  queryTime: number;
  filters: any;
}

const DatabaseIntegrationSystem: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    'overview' | 'query' | 'sync' | 'backup' | 'analytics'
  >('overview');
  const [databaseStats, setDatabaseStats] = useState<DatabaseStats>({
    totalRecords: 0,
    activeRecords: 0,
    culturalContent: 0,
    students: 0,
    lessons: 0,
    assessments: 0,
    storageUsed: '0 MB',
    lastSync: new Date().toISOString(),
    syncStatus: 'synced',
  });

  const [queryResults, setQueryResults] = useState<QueryResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [queryFilters, setQueryFilters] = useState({
    type: '',
    culturalContext: '',
    dateRange: 'all',
    status: 'all',
    searchTerm: '',
  });

  const [syncProgress, setSyncProgress] = useState(0);
  const [backupStatus, setBackupStatus] = useState<'idle' | 'backing-up' | 'completed' | 'error'>(
    'idle',
  );

  useEffect(() => {
    loadDatabaseStats();
    loadSampleData();
  }, []);

  const loadDatabaseStats = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockStats: DatabaseStats = {
        totalRecords: 1247,
        activeRecords: 1189,
        culturalContent: 456,
        students: 234,
        lessons: 189,
        assessments: 368,
        storageUsed: '2.4 GB',
        lastSync: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        syncStatus: 'synced',
      };

      setDatabaseStats(mockStats);
    } catch (error) {
      console.error('Failed to load database stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSampleData = async () => {
    const mockRecords: DatabaseRecord[] = [
      {
        id: 'rec-001',
        type: 'student',
        data: {
          name: 'Aria Tāne',
          yearLevel: 8,
          culturalBackground: 'Māori, Pacific',
          progress: 92,
          culturalEngagement: 85,
        },
        metadata: {
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-20T14:22:00Z',
          createdBy: 'teacher-001',
          culturalContext: 'Māori',
          tags: ['student', 'year8', 'māori', 'pacific'],
          version: 3,
        },
        status: 'active',
      },
      {
        id: 'rec-002',
        type: 'lesson',
        data: {
          title: 'Whakapapa: Understanding Family Connections',
          subject: 'Social Studies',
          yearLevel: 8,
          duration: 45,
          culturalElements: ['Whakapapa', 'Family History', 'Cultural Identity'],
        },
        metadata: {
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-18T16:45:00Z',
          createdBy: 'teacher-002',
          culturalContext: 'Māori',
          tags: ['lesson', 'social-studies', 'whakapapa', 'cultural'],
          version: 2,
        },
        status: 'active',
      },
      {
        id: 'rec-003',
        type: 'assessment',
        data: {
          title: 'Cultural Understanding Assessment',
          type: 'formative',
          subject: 'English',
          yearLevel: 8,
          totalMarks: 50,
          culturalElements: ['Critical Analysis', 'Cultural Representation'],
        },
        metadata: {
          createdAt: '2024-01-12T11:20:00Z',
          updatedAt: '2024-01-19T13:30:00Z',
          createdBy: 'teacher-001',
          culturalContext: 'General',
          tags: ['assessment', 'english', 'cultural-literacy'],
          version: 1,
        },
        status: 'active',
      },
    ];

    setQueryResults({
      records: mockRecords,
      totalCount: mockRecords.length,
      queryTime: 0.045,
      filters: queryFilters,
    });
  };

  const handleQuery = async () => {
    setIsLoading(true);
    try {
      // Simulate query execution
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Mock query results based on filters
      const filteredRecords =
        queryResults?.records.filter((record) => {
          if (queryFilters.type && record.type !== queryFilters.type) return false;
          if (
            queryFilters.culturalContext &&
            !record.metadata.culturalContext
              .toLowerCase()
              .includes(queryFilters.culturalContext.toLowerCase())
          )
            return false;
          if (queryFilters.status !== 'all' && record.status !== queryFilters.status) return false;
          if (queryFilters.searchTerm) {
            const searchLower = queryFilters.searchTerm.toLowerCase();
            const dataString = JSON.stringify(record.data).toLowerCase();
            if (!dataString.includes(searchLower)) return false;
          }
          return true;
        }) || [];

      setQueryResults({
        records: filteredRecords,
        totalCount: filteredRecords.length,
        queryTime: Math.random() * 0.1 + 0.02,
        filters: queryFilters,
      });
    } catch (error) {
      console.error('Query failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncProgress(0);
    setDatabaseStats((prev) => ({ ...prev, syncStatus: 'syncing' }));

    // Simulate sync process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setSyncProgress(i);
    }

    setDatabaseStats((prev) => ({
      ...prev,
      syncStatus: 'synced',
      lastSync: new Date().toISOString(),
    }));
  };

  const handleBackup = async () => {
    setBackupStatus('backing-up');
    try {
      // Simulate backup process
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setBackupStatus('completed');

      // Reset status after 3 seconds
      setTimeout(() => setBackupStatus('idle'), 3000);
    } catch (error) {
      setBackupStatus('error');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'archived':
        return '#6b7280';
      case 'pending':
        return '#f59e0b';
      case 'error':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student':
        return '👩‍🎓';
      case 'lesson':
        return '📚';
      case 'assessment':
        return '📝';
      case 'cultural-content':
        return '🏛️';
      case 'analytics':
        return '📊';
      default:
        return '📄';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="database-integration-system">
      <div className="db-header">
        <h1>🗄️ Database Integration System</h1>
        <p>Comprehensive data management with cultural context awareness</p>
      </div>

      <div className="db-navigation">
        <button
          className={`nav-btn ${currentView === 'overview' ? 'active' : ''}`}
          onClick={() => setCurrentView('overview')}
        >
          📊 Overview
        </button>
        <button
          className={`nav-btn ${currentView === 'query' ? 'active' : ''}`}
          onClick={() => setCurrentView('query')}
        >
          🔍 Query
        </button>
        <button
          className={`nav-btn ${currentView === 'sync' ? 'active' : ''}`}
          onClick={() => setCurrentView('sync')}
        >
          🔄 Sync
        </button>
        <button
          className={`nav-btn ${currentView === 'backup' ? 'active' : ''}`}
          onClick={() => setCurrentView('backup')}
        >
          💾 Backup
        </button>
        <button
          className={`nav-btn ${currentView === 'analytics' ? 'active' : ''}`}
          onClick={() => setCurrentView('analytics')}
        >
          📈 Analytics
        </button>
      </div>

      <div className="db-content">
        {currentView === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <h3>Total Records</h3>
                  <p className="stat-number">{databaseStats.totalRecords.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>Active Records</h3>
                  <p className="stat-number">{databaseStats.activeRecords.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🏛️</div>
                <div className="stat-info">
                  <h3>Cultural Content</h3>
                  <p className="stat-number">{databaseStats.culturalContent.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">👩‍🎓</div>
                <div className="stat-info">
                  <h3>Students</h3>
                  <p className="stat-number">{databaseStats.students.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <h3>Lessons</h3>
                  <p className="stat-number">{databaseStats.lessons.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <h3>Assessments</h3>
                  <p className="stat-number">{databaseStats.assessments.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="system-info">
              <div className="info-card">
                <h3>Storage Usage</h3>
                <div className="storage-info">
                  <div className="storage-bar">
                    <div className="storage-fill" style={{ width: '65%' }}></div>
                  </div>
                  <p>{databaseStats.storageUsed} used</p>
                </div>
              </div>

              <div className="info-card">
                <h3>Sync Status</h3>
                <div className="sync-status">
                  <span className={`status-indicator ${databaseStats.syncStatus}`}>
                    {databaseStats.syncStatus === 'synced'
                      ? '✅ Synced'
                      : databaseStats.syncStatus === 'syncing'
                      ? '🔄 Syncing'
                      : '❌ Error'}
                  </span>
                  <p>Last sync: {formatDate(databaseStats.lastSync)}</p>
                </div>
              </div>

              <div className="info-card">
                <h3>Database Health</h3>
                <div className="health-indicators">
                  <div className="health-item">
                    <span className="health-dot healthy"></span>
                    <span>Connection</span>
                  </div>
                  <div className="health-item">
                    <span className="health-dot healthy"></span>
                    <span>Performance</span>
                  </div>
                  <div className="health-item">
                    <span className="health-dot healthy"></span>
                    <span>Backup</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'query' && (
          <div className="query-section">
            <div className="query-controls">
              <h2>🔍 Database Query Tool</h2>

              <div className="query-filters">
                <div className="filter-group">
                  <label>Record Type</label>
                  <select
                    value={queryFilters.type}
                    onChange={(e) => setQueryFilters((prev) => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="">All Types</option>
                    <option value="student">Student</option>
                    <option value="lesson">Lesson</option>
                    <option value="assessment">Assessment</option>
                    <option value="cultural-content">Cultural Content</option>
                    <option value="analytics">Analytics</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Cultural Context</label>
                  <input
                    type="text"
                    placeholder="e.g., Māori, Pacific, General"
                    value={queryFilters.culturalContext}
                    onChange={(e) =>
                      setQueryFilters((prev) => ({ ...prev, culturalContext: e.target.value }))
                    }
                  />
                </div>

                <div className="filter-group">
                  <label>Status</label>
                  <select
                    value={queryFilters.status}
                    onChange={(e) =>
                      setQueryFilters((prev) => ({ ...prev, status: e.target.value }))
                    }
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                    <option value="pending">Pending</option>
                    <option value="error">Error</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Search Term</label>
                  <input
                    type="text"
                    placeholder="Search in data..."
                    value={queryFilters.searchTerm}
                    onChange={(e) =>
                      setQueryFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
                    }
                  />
                </div>

                <button className="query-btn" onClick={handleQuery} disabled={isLoading}>
                  {isLoading ? 'Querying...' : 'Execute Query'}
                </button>
              </div>
            </div>

            {queryResults && (
              <div className="query-results">
                <div className="results-header">
                  <h3>Query Results</h3>
                  <div className="results-meta">
                    <span>{queryResults.totalCount} records found</span>
                    <span>Query time: {queryResults.queryTime.toFixed(3)}s</span>
                  </div>
                </div>

                <div className="results-list">
                  {queryResults.records.map((record) => (
                    <div key={record.id} className="result-item">
                      <div className="result-header">
                        <div className="result-type">
                          {getTypeIcon(record.type)} {record.type}
                        </div>
                        <span
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(record.status) }}
                        >
                          {record.status}
                        </span>
                      </div>

                      <div className="result-data">
                        <pre>{JSON.stringify(record.data, null, 2)}</pre>
                      </div>

                      <div className="result-meta">
                        <span>Created: {formatDate(record.metadata.createdAt)}</span>
                        <span>Updated: {formatDate(record.metadata.updatedAt)}</span>
                        <span>Version: {record.metadata.version}</span>
                        <span>Context: {record.metadata.culturalContext}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'sync' && (
          <div className="sync-section">
            <h2>🔄 Data Synchronization</h2>

            <div className="sync-status-card">
              <h3>Current Status</h3>
              <div className="sync-info">
                <div className="sync-indicator">
                  <span className={`sync-dot ${databaseStats.syncStatus}`}></span>
                  <span className="sync-text">
                    {databaseStats.syncStatus === 'synced'
                      ? 'All data synchronized'
                      : databaseStats.syncStatus === 'syncing'
                      ? 'Synchronizing...'
                      : 'Sync error detected'}
                  </span>
                </div>
                <p>Last sync: {formatDate(databaseStats.lastSync)}</p>
              </div>
            </div>

            <div className="sync-controls">
              <button
                className="sync-btn"
                onClick={handleSync}
                disabled={databaseStats.syncStatus === 'syncing'}
              >
                {databaseStats.syncStatus === 'syncing' ? 'Syncing...' : 'Start Sync'}
              </button>
            </div>

            {databaseStats.syncStatus === 'syncing' && (
              <div className="sync-progress">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${syncProgress}%` }}></div>
                </div>
                <p>{syncProgress}% complete</p>
              </div>
            )}

            <div className="sync-history">
              <h3>Recent Sync History</h3>
              <div className="history-list">
                <div className="history-item success">
                  <span className="history-time">
                    {formatDate(new Date(Date.now() - 300000).toISOString())}
                  </span>
                  <span className="history-status">✅ Success</span>
                  <span className="history-details">1,247 records synced</span>
                </div>
                <div className="history-item success">
                  <span className="history-time">
                    {formatDate(new Date(Date.now() - 900000).toISOString())}
                  </span>
                  <span className="history-status">✅ Success</span>
                  <span className="history-details">1,245 records synced</span>
                </div>
                <div className="history-item success">
                  <span className="history-time">
                    {formatDate(new Date(Date.now() - 1500000).toISOString())}
                  </span>
                  <span className="history-status">✅ Success</span>
                  <span className="history-details">1,243 records synced</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'backup' && (
          <div className="backup-section">
            <h2>💾 Database Backup & Recovery</h2>

            <div className="backup-controls">
              <button
                className="backup-btn"
                onClick={handleBackup}
                disabled={backupStatus === 'backing-up'}
              >
                {backupStatus === 'backing-up' ? 'Creating Backup...' : 'Create Backup'}
              </button>
            </div>

            {backupStatus === 'backing-up' && (
              <div className="backup-progress">
                <div className="progress-spinner"></div>
                <p>Creating backup... Please wait</p>
              </div>
            )}

            {backupStatus === 'completed' && (
              <div className="backup-success">
                <span className="success-icon">✅</span>
                <p>Backup completed successfully!</p>
              </div>
            )}

            {backupStatus === 'error' && (
              <div className="backup-error">
                <span className="error-icon">❌</span>
                <p>Backup failed. Please try again.</p>
              </div>
            )}

            <div className="backup-info">
              <div className="backup-stats">
                <h3>Backup Statistics</h3>
                <div className="stats-list">
                  <div className="stat-item">
                    <span>Total Backups:</span>
                    <span>24</span>
                  </div>
                  <div className="stat-item">
                    <span>Last Backup:</span>
                    <span>{formatDate(new Date(Date.now() - 86400000).toISOString())}</span>
                  </div>
                  <div className="stat-item">
                    <span>Backup Size:</span>
                    <span>2.1 GB</span>
                  </div>
                  <div className="stat-item">
                    <span>Retention Period:</span>
                    <span>30 days</span>
                  </div>
                </div>
              </div>

              <div className="recovery-options">
                <h3>Recovery Options</h3>
                <div className="recovery-buttons">
                  <button className="recovery-btn">Restore from Backup</button>
                  <button className="recovery-btn">Export Data</button>
                  <button className="recovery-btn">Import Data</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'analytics' && (
          <div className="analytics-section">
            <h2>📈 Database Analytics</h2>

            <div className="analytics-grid">
              <div className="analytics-card">
                <h3>Data Growth</h3>
                <div className="growth-chart">
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '75%' }}></div>
                  <div className="chart-bar" style={{ height: '85%' }}></div>
                  <div className="chart-bar" style={{ height: '90%' }}></div>
                  <div className="chart-bar" style={{ height: '100%' }}></div>
                </div>
                <p>Records added this month: +156</p>
              </div>

              <div className="analytics-card">
                <h3>Cultural Content Distribution</h3>
                <div className="cultural-distribution">
                  <div className="distribution-item">
                    <span>Māori</span>
                    <div className="distribution-bar">
                      <div className="distribution-fill" style={{ width: '45%' }}></div>
                    </div>
                    <span>45%</span>
                  </div>
                  <div className="distribution-item">
                    <span>Pacific</span>
                    <div className="distribution-bar">
                      <div className="distribution-fill" style={{ width: '30%' }}></div>
                    </div>
                    <span>30%</span>
                  </div>
                  <div className="distribution-item">
                    <span>General</span>
                    <div className="distribution-bar">
                      <div className="distribution-fill" style={{ width: '25%' }}></div>
                    </div>
                    <span>25%</span>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Query Performance</h3>
                <div className="performance-metrics">
                  <div className="metric-item">
                    <span>Average Query Time:</span>
                    <span>0.045s</span>
                  </div>
                  <div className="metric-item">
                    <span>Peak Queries/Hour:</span>
                    <span>1,247</span>
                  </div>
                  <div className="metric-item">
                    <span>Cache Hit Rate:</span>
                    <span>87%</span>
                  </div>
                </div>
              </div>

              <div className="analytics-card">
                <h3>Storage Trends</h3>
                <div className="storage-trends">
                  <div className="trend-item">
                    <span>Data Growth Rate:</span>
                    <span>+12% monthly</span>
                  </div>
                  <div className="trend-item">
                    <span>Storage Efficiency:</span>
                    <span>94%</span>
                  </div>
                  <div className="trend-item">
                    <span>Compression Ratio:</span>
                    <span>3.2:1</span>
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

export default DatabaseIntegrationSystem;
