import React, { useEffect, useState } from 'react';
import './DatabaseIntegrationSystem.css';

interface DatabaseConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mongodb' | 'mysql' | 'supabase' | 'firebase';
  host: string;
  port: number;
  database: string;
  username: string;
  status: 'connected' | 'disconnected' | 'error' | 'connecting';
  lastSync: Date;
  tables: string[];
  connectionString: string;
}

interface Migration {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  sql: string;
  rollbackSql: string;
}

interface SyncJob {
  id: string;
  name: string;
  sourceTable: string;
  targetTable: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  lastRun: Date;
  nextRun: Date;
  recordsProcessed: number;
  recordsTotal: number;
}

interface DataModel {
  id: string;
  name: string;
  description: string;
  fields: DataField[];
  relationships: DataRelationship[];
  createdAt: Date;
  updatedAt: Date;
}

interface DataField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'json' | 'array';
  required: boolean;
  defaultValue?: string | number | boolean | Date | Record<string, unknown> | unknown[];
  constraints?: string[];
}

interface DataRelationship {
  name: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  sourceTable: string;
  targetTable: string;
  sourceField: string;
  targetField: string;
}

const DatabaseIntegrationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'connections' | 'migrations' | 'sync' | 'models' | 'monitoring'
  >('connections');
  const [connections, setConnections] = useState<DatabaseConnection[]>([]);
  const [migrations, setMigrations] = useState<Migration[]>([]);
  const [syncJobs, setSyncJobs] = useState<SyncJob[]>([]);
  const [dataModels, setDataModels] = useState<DataModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data
  useEffect(() => {
    const mockConnections: DatabaseConnection[] = [
      {
        id: '1',
        name: 'Primary PostgreSQL',
        type: 'postgresql',
        host: 'localhost',
        port: 5432,
        database: 'te_kete_ako',
        username: 'admin',
        status: 'connected',
        lastSync: new Date(),
        tables: ['users', 'content', 'assessments', 'cultural_data'],
        connectionString: 'postgresql://admin:password@localhost:5432/te_kete_ako',
      },
      {
        id: '2',
        name: 'Supabase Cloud',
        type: 'supabase',
        host: 'supabase.co',
        port: 5432,
        database: 'te_kete_ako_prod',
        username: 'postgres',
        status: 'connected',
        lastSync: new Date(Date.now() - 300000),
        tables: ['users', 'content', 'analytics', 'cultural_insights'],
        connectionString: 'postgresql://postgres:[password]@db.supabase.co:5432/postgres',
      },
      {
        id: '3',
        name: 'MongoDB Cultural Data',
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'cultural_learning',
        username: 'mongo_user',
        status: 'disconnected',
        lastSync: new Date(Date.now() - 86400000),
        tables: ['cultural_content', 'learning_paths', 'user_progress'],
        connectionString: 'mongodb://mongo_user:password@localhost:27017/cultural_learning',
      },
    ];

    const mockMigrations: Migration[] = [
      {
        id: '1',
        name: 'Add Cultural Preferences Table',
        description: 'Create table for storing user cultural learning preferences',
        status: 'completed',
        createdAt: new Date(Date.now() - 86400000),
        completedAt: new Date(Date.now() - 86400000 + 5000),
        sql: `CREATE TABLE cultural_preferences (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          te_reo_level VARCHAR(20),
          cultural_focus TEXT[],
          learning_style VARCHAR(20),
          created_at TIMESTAMP DEFAULT NOW()
        );`,
        rollbackSql: 'DROP TABLE IF EXISTS cultural_preferences;',
      },
      {
        id: '2',
        name: 'Add Assessment Framework Tables',
        description: 'Create tables for comprehensive assessment system',
        status: 'running',
        createdAt: new Date(Date.now() - 3600000),
        sql: `CREATE TABLE assessments (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          description TEXT,
          cultural_context TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );`,
        rollbackSql: 'DROP TABLE IF EXISTS assessments;',
      },
      {
        id: '3',
        name: 'Add Analytics Tracking',
        description: 'Create analytics tables for learning progress tracking',
        status: 'pending',
        createdAt: new Date(),
        sql: `CREATE TABLE learning_analytics (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id),
          content_id INTEGER,
          interaction_type VARCHAR(50),
          duration INTEGER,
          cultural_relevance_score DECIMAL(3,2),
          created_at TIMESTAMP DEFAULT NOW()
        );`,
        rollbackSql: 'DROP TABLE IF EXISTS learning_analytics;',
      },
    ];

    const mockSyncJobs: SyncJob[] = [
      {
        id: '1',
        name: 'Cultural Content Sync',
        sourceTable: 'cultural_content',
        targetTable: 'content_cache',
        status: 'running',
        lastRun: new Date(Date.now() - 300000),
        nextRun: new Date(Date.now() + 300000),
        recordsProcessed: 1250,
        recordsTotal: 2000,
      },
      {
        id: '2',
        name: 'User Progress Sync',
        sourceTable: 'user_progress',
        targetTable: 'analytics_cache',
        status: 'completed',
        lastRun: new Date(Date.now() - 600000),
        nextRun: new Date(Date.now() + 1800000),
        recordsProcessed: 500,
        recordsTotal: 500,
      },
      {
        id: '3',
        name: 'Assessment Data Sync',
        sourceTable: 'assessment_results',
        targetTable: 'reporting_cache',
        status: 'idle',
        lastRun: new Date(Date.now() - 3600000),
        nextRun: new Date(Date.now() + 3600000),
        recordsProcessed: 0,
        recordsTotal: 0,
      },
    ];

    const mockDataModels: DataModel[] = [
      {
        id: '1',
        name: 'Cultural Learning User',
        description: 'User model with cultural learning preferences and progress tracking',
        fields: [
          { name: 'id', type: 'number', required: true },
          { name: 'email', type: 'string', required: true },
          { name: 'name', type: 'string', required: true },
          { name: 'te_reo_level', type: 'string', required: false, defaultValue: 'beginner' },
          { name: 'cultural_focus', type: 'array', required: false },
          { name: 'learning_style', type: 'string', required: false, defaultValue: 'mixed' },
          { name: 'created_at', type: 'date', required: true },
        ],
        relationships: [
          {
            name: 'user_assessments',
            type: 'one-to-many',
            sourceTable: 'users',
            targetTable: 'assessments',
            sourceField: 'id',
            targetField: 'user_id',
          },
        ],
        createdAt: new Date(Date.now() - 86400000),
        updatedAt: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        name: 'Cultural Content',
        description: 'Educational content with cultural context and metadata',
        fields: [
          { name: 'id', type: 'number', required: true },
          { name: 'title', type: 'string', required: true },
          { name: 'description', type: 'string', required: false },
          { name: 'content_type', type: 'string', required: true },
          { name: 'cultural_context', type: 'json', required: false },
          { name: 'difficulty_level', type: 'number', required: false, defaultValue: 1 },
          { name: 'tags', type: 'array', required: false },
          { name: 'created_at', type: 'date', required: true },
        ],
        relationships: [
          {
            name: 'content_assessments',
            type: 'one-to-many',
            sourceTable: 'cultural_content',
            targetTable: 'assessments',
            sourceField: 'id',
            targetField: 'content_id',
          },
        ],
        createdAt: new Date(Date.now() - 172800000),
        updatedAt: new Date(Date.now() - 7200000),
      },
    ];

    setConnections(mockConnections);
    setMigrations(mockMigrations);
    setSyncJobs(mockSyncJobs);
    setDataModels(mockDataModels);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'completed':
        return '#10b981';
      case 'running':
        return '#3b82f6';
      case 'disconnected':
      case 'idle':
        return '#6b7280';
      case 'error':
      case 'failed':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
      case 'completed':
        return '✅';
      case 'running':
        return '🔄';
      case 'disconnected':
      case 'idle':
        return '⏸️';
      case 'error':
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const handleTestConnection = async (connectionId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock connection test
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setConnections((prev) =>
        prev.map((conn) =>
          conn.id === connectionId
            ? { ...conn, status: 'connected' as const, lastSync: new Date() }
            : conn,
        ),
      );
    } catch {
      setError('Connection test failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunMigration = async (migrationId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock migration execution
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setMigrations((prev) =>
        prev.map((migration) =>
          migration.id === migrationId
            ? { ...migration, status: 'completed' as const, completedAt: new Date() }
            : migration,
        ),
      );
    } catch {
      setError('Migration failed. Please check the SQL syntax.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartSync = async (syncJobId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock sync job start
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSyncJobs((prev) =>
        prev.map((job) =>
          job.id === syncJobId ? { ...job, status: 'running' as const, lastRun: new Date() } : job,
        ),
      );
    } catch {
      setError('Failed to start sync job.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="database-integration-system">
      <div className="db-container">
        <div className="db-header">
          <h1>🗄️ Database Integration System</h1>
          <p>Manage database connections, migrations, and data synchronization</p>
        </div>

        <div className="db-tabs">
          <button
            className={`db-tab ${activeTab === 'connections' ? 'active' : ''}`}
            onClick={() => setActiveTab('connections')}
            aria-label="Database connections tab"
          >
            🔌 Connections
          </button>
          <button
            className={`db-tab ${activeTab === 'migrations' ? 'active' : ''}`}
            onClick={() => setActiveTab('migrations')}
            aria-label="Database migrations tab"
          >
            📦 Migrations
          </button>
          <button
            className={`db-tab ${activeTab === 'sync' ? 'active' : ''}`}
            onClick={() => setActiveTab('sync')}
            aria-label="Data synchronization tab"
          >
            🔄 Sync Jobs
          </button>
          <button
            className={`db-tab ${activeTab === 'models' ? 'active' : ''}`}
            onClick={() => setActiveTab('models')}
            aria-label="Data models tab"
          >
            📊 Data Models
          </button>
          <button
            className={`db-tab ${activeTab === 'monitoring' ? 'active' : ''}`}
            onClick={() => setActiveTab('monitoring')}
            aria-label="System monitoring tab"
          >
            📈 Monitoring
          </button>
        </div>

        {error && (
          <div className="db-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        <div className="db-content">
          {activeTab === 'connections' && (
            <div className="connections-section">
              <div className="section-header">
                <h2>Database Connections</h2>
                <button className="add-connection-btn">➕ Add Connection</button>
              </div>

              <div className="connections-grid">
                {connections.map((connection) => (
                  <div key={connection.id} className="connection-card">
                    <div className="connection-header">
                      <div className="connection-info">
                        <h3>{connection.name}</h3>
                        <p>
                          {connection.type.toUpperCase()} • {connection.host}:{connection.port}
                        </p>
                      </div>
                      <div
                        className="status-indicator"
                        /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(connection.status) }}
                      >
                        {getStatusIcon(connection.status)} {connection.status}
                      </div>
                    </div>

                    <div className="connection-details">
                      <div className="detail-item">
                        <span>Database:</span>
                        <span>{connection.database}</span>
                      </div>
                      <div className="detail-item">
                        <span>Username:</span>
                        <span>{connection.username}</span>
                      </div>
                      <div className="detail-item">
                        <span>Last Sync:</span>
                        <span>{connection.lastSync.toLocaleString()}</span>
                      </div>
                      <div className="detail-item">
                        <span>Tables:</span>
                        <span>{connection.tables.length} tables</span>
                      </div>
                    </div>

                    <div className="connection-actions">
                      <button
                        className="test-connection-btn"
                        onClick={() => handleTestConnection(connection.id)}
                        disabled={isLoading}
                        aria-label={`Test connection to ${connection.name}`}
                      >
                        {isLoading ? '🔄 Testing...' : '🔍 Test Connection'}
                      </button>
                      <button
                        className="view-tables-btn"
                        aria-label={`View tables in ${connection.name}`}
                      >
                        📋 View Tables
                      </button>
                      <button
                        className="edit-connection-btn"
                        aria-label={`Edit ${connection.name} connection`}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'migrations' && (
            <div className="migrations-section">
              <div className="section-header">
                <h2>Database Migrations</h2>
                <button className="create-migration-btn">➕ Create Migration</button>
              </div>

              <div className="migrations-list">
                {migrations.map((migration) => (
                  <div key={migration.id} className="migration-card">
                    <div className="migration-header">
                      <div className="migration-info">
                        <h3>{migration.name}</h3>
                        <p>{migration.description}</p>
                      </div>
                      <div
                        className="status-indicator"
                        /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(migration.status) }}
                      >
                        {getStatusIcon(migration.status)} {migration.status}
                      </div>
                    </div>

                    <div className="migration-details">
                      <div className="detail-item">
                        <span>Created:</span>
                        <span>{migration.createdAt.toLocaleString()}</span>
                      </div>
                      {migration.completedAt && (
                        <div className="detail-item">
                          <span>Completed:</span>
                          <span>{migration.completedAt.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    <div className="migration-actions">
                      {migration.status === 'pending' && (
                        <button
                          className="run-migration-btn"
                          onClick={() => handleRunMigration(migration.id)}
                          disabled={isLoading}
                          aria-label={`Run migration ${migration.name}`}
                        >
                          {isLoading ? '🔄 Running...' : '▶️ Run Migration'}
                        </button>
                      )}
                      <button
                        className="view-sql-btn"
                        aria-label={`View SQL for ${migration.name}`}
                      >
                        📄 View SQL
                      </button>
                      <button className="rollback-btn" aria-label={`Rollback ${migration.name}`}>
                        ↩️ Rollback
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sync' && (
            <div className="sync-section">
              <div className="section-header">
                <h2>Data Synchronization Jobs</h2>
                <button className="create-sync-job-btn">➕ Create Sync Job</button>
              </div>

              <div className="sync-jobs-grid">
                {syncJobs.map((job) => (
                  <div key={job.id} className="sync-job-card">
                    <div className="sync-job-header">
                      <div className="sync-job-info">
                        <h3>{job.name}</h3>
                        <p>
                          {job.sourceTable} → {job.targetTable}
                        </p>
                      </div>
                      <div
                        className="status-indicator"
                        /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(job.status) }}
                      >
                        {getStatusIcon(job.status)} {job.status}
                      </div>
                    </div>

                    <div className="sync-job-details">
                      <div className="detail-item">
                        <span>Last Run:</span>
                        <span>{job.lastRun.toLocaleString()}</span>
                      </div>
                      <div className="detail-item">
                        <span>Next Run:</span>
                        <span>{job.nextRun.toLocaleString()}</span>
                      </div>
                      <div className="detail-item">
                        <span>Progress:</span>
                        <span>
                          {job.recordsProcessed} / {job.recordsTotal} records
                        </span>
                      </div>
                    </div>

                    {job.recordsTotal > 0 && (
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(job.recordsProcessed / job.recordsTotal) * 100}%` }}
                        ></div>
                      </div>
                    )}

                    <div className="sync-job-actions">
                      {job.status === 'idle' && (
                        <button
                          className="start-sync-btn"
                          onClick={() => handleStartSync(job.id)}
                          disabled={isLoading}
                          aria-label={`Start sync job ${job.name}`}
                        >
                          {isLoading ? '🔄 Starting...' : '▶️ Start Sync'}
                        </button>
                      )}
                      <button className="view-logs-btn" aria-label={`View logs for ${job.name}`}>
                        📋 View Logs
                      </button>
                      <button
                        className="edit-sync-job-btn"
                        aria-label={`Edit ${job.name} sync job`}
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'models' && (
            <div className="models-section">
              <div className="section-header">
                <h2>Data Models</h2>
                <button className="create-model-btn">➕ Create Model</button>
              </div>

              <div className="models-grid">
                {dataModels.map((model) => (
                  <div key={model.id} className="model-card">
                    <div className="model-header">
                      <h3>{model.name}</h3>
                      <p>{model.description}</p>
                    </div>

                    <div className="model-details">
                      <div className="detail-item">
                        <span>Fields:</span>
                        <span>{model.fields.length} fields</span>
                      </div>
                      <div className="detail-item">
                        <span>Relationships:</span>
                        <span>{model.relationships.length} relationships</span>
                      </div>
                      <div className="detail-item">
                        <span>Created:</span>
                        <span>{model.createdAt.toLocaleDateString()}</span>
                      </div>
                      <div className="detail-item">
                        <span>Updated:</span>
                        <span>{model.updatedAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="model-fields">
                      <h4>Fields</h4>
                      <div className="fields-list">
                        {model.fields.slice(0, 3).map((field, index) => (
                          <div key={index} className="field-item">
                            <span className="field-name">{field.name}</span>
                            <span className="field-type">{field.type}</span>
                            {field.required && <span className="required-badge">Required</span>}
                          </div>
                        ))}
                        {model.fields.length > 3 && (
                          <div className="more-fields">+{model.fields.length - 3} more fields</div>
                        )}
                      </div>
                    </div>

                    <div className="model-actions">
                      <button
                        className="view-model-btn"
                        aria-label={`View full model ${model.name}`}
                      >
                        👁️ View Model
                      </button>
                      <button className="edit-model-btn" aria-label={`Edit model ${model.name}`}>
                        ✏️ Edit
                      </button>
                      <button
                        className="generate-sql-btn"
                        aria-label={`Generate SQL for ${model.name}`}
                      >
                        📄 Generate SQL
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'monitoring' && (
            <div className="monitoring-section">
              <div className="section-header">
                <h2>System Monitoring</h2>
                <button className="refresh-metrics-btn">🔄 Refresh</button>
              </div>

              <div className="monitoring-grid">
                <div className="metric-card">
                  <h3>Database Health</h3>
                  <div className="metric-value">98%</div>
                  <div className="metric-label">Overall Health Score</div>
                  <div className="health-indicators">
                    <div className="health-item good">✅ Connections: 2/3</div>
                    <div className="health-item good">✅ Migrations: 1/3</div>
                    <div className="health-item warning">⚠️ Sync Jobs: 1/3</div>
                  </div>
                </div>

                <div className="metric-card">
                  <h3>Performance Metrics</h3>
                  <div className="metric-value">1.2s</div>
                  <div className="metric-label">Average Query Time</div>
                  <div className="performance-chart">
                    <div className="chart-bar" /* TODO: Move to external CSS */ style={{ height: '60%' }}></div>
                    <div className="chart-bar" /* TODO: Move to external CSS */ style={{ height: '80%' }}></div>
                    <div className="chart-bar" /* TODO: Move to external CSS */ style={{ height: '40%' }}></div>
                    <div className="chart-bar" /* TODO: Move to external CSS */ style={{ height: '90%' }}></div>
                    <div className="chart-bar" /* TODO: Move to external CSS */ style={{ height: '70%' }}></div>
                  </div>
                </div>

                <div className="metric-card">
                  <h3>Data Volume</h3>
                  <div className="metric-value">2.4GB</div>
                  <div className="metric-label">Total Database Size</div>
                  <div className="storage-breakdown">
                    <div className="storage-item">
                      <span>Users:</span>
                      <span>1.2GB</span>
                    </div>
                    <div className="storage-item">
                      <span>Content:</span>
                      <span>800MB</span>
                    </div>
                    <div className="storage-item">
                      <span>Analytics:</span>
                      <span>400MB</span>
                    </div>
                  </div>
                </div>

                <div className="metric-card">
                  <h3>Active Connections</h3>
                  <div className="metric-value">24</div>
                  <div className="metric-label">Current Active Users</div>
                  <div className="connection-types">
                    <div className="connection-type">
                      <span>Students:</span>
                      <span>18</span>
                    </div>
                    <div className="connection-type">
                      <span>Teachers:</span>
                      <span>4</span>
                    </div>
                    <div className="connection-type">
                      <span>Admins:</span>
                      <span>2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseIntegrationSystem;
