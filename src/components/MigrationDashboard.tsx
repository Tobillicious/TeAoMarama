import React, { useEffect, useState } from 'react';
import './MigrationDashboard.css';

interface MigrationProgress {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  culturalReviewsCompleted: number;
  culturalReviewsPending: number;
  estimatedCompletionTime: string;
  lastUpdated: string;
}

interface MigrationTask {
  id: string;
  resourceId: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  category: string;
  culturalReviewRequired: boolean;
  estimatedTime: number;
  assignedAgent?: string;
  startedAt?: string;
  completedAt?: string;
  error?: string;
}

const MigrationDashboard: React.FC = () => {
  const [progress, setProgress] = useState<MigrationProgress | null>(null);
  const [tasks, setTasks] = useState<MigrationTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch progress data
        const progressResponse = await fetch('/reports/migration-progress.json');
        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setProgress(progressData);
        }
        
        // Fetch tasks data
        const tasksResponse = await fetch('/reports/migration-tasks.json');
        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setTasks(tasksData);
        }
      } catch {
        setError('Failed to load migration data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="migration-dashboard">
        <div className="dashboard-header">
          <h1>6k Changes Migration Dashboard</h1>
          <p>Loading migration progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="migration-dashboard">
        <div className="dashboard-header">
          <h1>6k Changes Migration Dashboard</h1>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!progress) {
    return (
      <div className="migration-dashboard">
        <div className="dashboard-header">
          <h1>6k Changes Migration Dashboard</h1>
          <p>No migration data available</p>
        </div>
      </div>
    );
  }

  const successRate =
    progress.totalTasks > 0
      ? ((progress.completedTasks / progress.totalTasks) * 100).toFixed(1)
      : '0.0';

  const filteredTasks = tasks.filter((task) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'cultural') return task.culturalReviewRequired;
    return task.status === selectedFilter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#dc2626';
      case 'high':
        return '#ea580c';
      case 'medium':
        return '#d97706';
      case 'low':
        return '#059669';
      default:
        return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#059669';
      case 'in-progress':
        return '#d97706';
      case 'failed':
        return '#dc2626';
      case 'pending':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="migration-dashboard">
      <div className="dashboard-header">
        <h1>6k Changes Migration Dashboard</h1>
        <p>
          Monitoring the migration of {progress.totalTasks.toLocaleString()} educational resources
        </p>
        <div className="last-updated">
          Last updated: {new Date(progress.lastUpdated).toLocaleString()}
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{progress.totalTasks.toLocaleString()}</div>
          <div className="stat-label">Total Resources</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-number">{progress.completedTasks.toLocaleString()}</div>
          <div className="stat-label">Completed</div>
          <div className="stat-percentage">{successRate}%</div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-number">{progress.inProgressTasks.toLocaleString()}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card failed">
          <div className="stat-number">{progress.failedTasks.toLocaleString()}</div>
          <div className="stat-label">Failed</div>
        </div>
        <div className="stat-card cultural">
          <div className="stat-number">{progress.culturalReviewsCompleted.toLocaleString()}</div>
          <div className="stat-label">Cultural Reviews</div>
          <div className="stat-subtitle">{progress.culturalReviewsPending} pending</div>
        </div>
      </div>

      <div className="dashboard-progress">
        <h2>Migration Progress</h2>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${(progress.completedTasks / progress.totalTasks) * 100}%`,
              backgroundColor: '#059669',
            }}
          />
        </div>
        <div className="progress-labels">
          <span>0</span>
          <span>{progress.totalTasks.toLocaleString()}</span>
        </div>
      </div>

      {progress.estimatedCompletionTime && (
        <div className="completion-estimate">
          <h3>Estimated Completion</h3>
          <p>{new Date(progress.estimatedCompletionTime).toLocaleString()}</p>
        </div>
      )}

      <div className="dashboard-filters">
        <h2>Task Details</h2>
        <div className="filter-buttons">
          <button
            className={selectedFilter === 'all' ? 'active' : ''}
            onClick={() => setSelectedFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={selectedFilter === 'cultural' ? 'active' : ''}
            onClick={() => setSelectedFilter('cultural')}
          >
            Cultural ({tasks.filter((t) => t.culturalReviewRequired).length})
          </button>
          <button
            className={selectedFilter === 'pending' ? 'active' : ''}
            onClick={() => setSelectedFilter('pending')}
          >
            Pending ({progress.pendingTasks})
          </button>
          <button
            className={selectedFilter === 'in-progress' ? 'active' : ''}
            onClick={() => setSelectedFilter('in-progress')}
          >
            In Progress ({progress.inProgressTasks})
          </button>
          <button
            className={selectedFilter === 'completed' ? 'active' : ''}
            onClick={() => setSelectedFilter('completed')}
          >
            Completed ({progress.completedTasks})
          </button>
          <button
            className={selectedFilter === 'failed' ? 'active' : ''}
            onClick={() => setSelectedFilter('failed')}
          >
            Failed ({progress.failedTasks})
          </button>
        </div>
      </div>

      <div className="tasks-table">
        <table>
          <thead>
            <tr>
              <th>Resource ID</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Agent</th>
              <th>Cultural Review</th>
              <th>Started</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.slice(0, 100).map((task) => (
              <tr key={task.id} className={`task-row ${task.status}`}>
                <td>{task.resourceId}</td>
                <td>{task.category}</td>
                <td>
                  <span
                    className="priority-badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority}
                  </span>
                </td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status}
                  </span>
                </td>
                <td>{task.assignedAgent || '-'}</td>
                <td>
                  {task.culturalReviewRequired ? (
                    <span className="cultural-badge">Required</span>
                  ) : (
                    <span className="no-cultural-badge">Not Required</span>
                  )}
                </td>
                <td>{task.startedAt ? new Date(task.startedAt).toLocaleTimeString() : '-'}</td>
                <td>{task.completedAt ? new Date(task.completedAt).toLocaleTimeString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTasks.length > 100 && (
          <div className="table-footer">Showing first 100 of {filteredTasks.length} tasks</div>
        )}
      </div>
    </div>
  );
};

export default MigrationDashboard;