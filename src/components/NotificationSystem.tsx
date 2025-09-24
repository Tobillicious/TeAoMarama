import React, { useState } from 'react';

interface Notification {
  id: string;
  type: 'collaboration' | 'assignment' | 'resource' | 'system' | 'reminder' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionText?: string;
  sender?: string;
  metadata?: Record<string, any>;
}

const NotificationSystem: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'collaboration',
      title: 'New Collaboration Request',
      message:
        'Sarah Mitchell from Auckland Grammar School wants to collaborate on your Māori Settlement Patterns lesson.',
      timestamp: '2024-01-16T10:30:00Z',
      isRead: false,
      priority: 'medium',
      actionUrl: '/collaboration',
      actionText: 'View Request',
      sender: 'Sarah Mitchell',
    },
    {
      id: '2',
      type: 'assignment',
      title: 'Assignment Due Soon',
      message: 'Te Reo Māori Speaking Assessment is due in 2 days for Room 12 students.',
      timestamp: '2024-01-16T09:15:00Z',
      isRead: false,
      priority: 'high',
      actionUrl: '/gradebook',
      actionText: 'View Assignment',
    },
    {
      id: '3',
      type: 'resource',
      title: 'New Resource Available',
      message:
        'A new interactive timeline resource for Pacific Island Migration has been added to the library.',
      timestamp: '2024-01-16T08:45:00Z',
      isRead: true,
      priority: 'low',
      actionUrl: '/resource-library',
      actionText: 'View Resource',
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Student Achievement',
      message: 'Aroha Thompson has completed 5 consecutive assignments with excellence grades!',
      timestamp: '2024-01-15T16:20:00Z',
      isRead: true,
      priority: 'medium',
      actionUrl: '/student/Aroha-Thompson',
      actionText: 'View Student',
    },
    {
      id: '5',
      type: 'system',
      title: 'System Maintenance',
      message:
        'Scheduled maintenance will occur tonight from 11 PM to 1 AM. Some features may be temporarily unavailable.',
      timestamp: '2024-01-15T14:00:00Z',
      isRead: true,
      priority: 'medium',
    },
    {
      id: '6',
      type: 'reminder',
      title: 'Parent Meeting Reminder',
      message: "You have a parent meeting with James Chen's family tomorrow at 3:00 PM.",
      timestamp: '2024-01-15T12:30:00Z',
      isRead: false,
      priority: 'high',
      actionUrl: '/parent-communication',
      actionText: 'View Meeting',
    },
  ]);

  const [filter, setFilter] = useState<
    | 'all'
    | 'unread'
    | 'collaboration'
    | 'assignment'
    | 'resource'
    | 'system'
    | 'reminder'
    | 'achievement'
  >('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>('newest');
  const [showSettings, setShowSettings] = useState(false);

  const filteredNotifications = notifications
    .filter((notification) => {
      if (filter === 'all') return true;
      if (filter === 'unread') return !notification.isRead;
      return notification.type === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'oldest':
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, isRead: true } : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'collaboration':
        return '🤝';
      case 'assignment':
        return '📝';
      case 'resource':
        return '📚';
      case 'system':
        return '⚙️';
      case 'reminder':
        return '⏰';
      case 'achievement':
        return '🏆';
      default:
        return '🔔';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return '#e53e3e';
      case 'high':
        return '#ed8936';
      case 'medium':
        return '#4299e1';
      case 'low':
        return '#48bb78';
      default:
        return '#718096';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '20px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '2.5rem',
                color: '#2d3748',
                margin: '0 0 5px 0',
                fontWeight: '700',
              }}
            >
              🔔 Notification Center
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                color: '#4a5568',
                margin: '0',
              }}
            >
              Stay updated with collaboration requests, assignments, and system updates
            </p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {unreadCount > 0 && (
              <div
                style={{
                  background: '#e53e3e',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                {unreadCount} unread
              </div>
            )}
            <button
              onClick={() => setShowSettings(!showSettings)}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
              }}
            >
              ⚙️ Settings
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{notifications.length}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Total Notifications</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #f093fb, #f5576c)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{unreadCount}</h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Unread</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {notifications.filter((n) => n.priority === 'high' || n.priority === 'urgent').length}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>High Priority</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #43e97b, #38f9d7)',
              color: 'white',
              padding: '20px',
              borderRadius: '15px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {notifications.filter((n) => n.type === 'collaboration').length}
            </h3>
            <p style={{ margin: '0', opacity: '0.9' }}>Collaborations</p>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div
            style={{
              background: '#f7fafc',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '30px',
              border: '2px solid #e2e8f0',
            }}
          >
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Notification Settings</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#4a5568',
                  }}
                >
                  Email Notifications
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white',
                  }}
                >
                  <option value="all">All notifications</option>
                  <option value="important">Important only</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#4a5568',
                  }}
                >
                  Push Notifications
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white',
                  }}
                >
                  <option value="enabled">Enabled</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#4a5568',
                  }}
                >
                  Quiet Hours
                </label>
                <select
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    background: 'white',
                  }}
                >
                  <option value="none">None</option>
                  <option value="10pm-7am">10 PM - 7 AM</option>
                  <option value="11pm-6am">11 PM - 6 AM</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Controls */}
        <div
          style={{
            background: '#f7fafc',
            padding: '20px',
            borderRadius: '15px',
            marginBottom: '30px',
            border: '2px solid #e2e8f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px',
            }}
          >
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <label style={{ color: '#4a5568', fontWeight: '500' }}>Filter:</label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  background: 'white',
                }}
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="collaboration">Collaborations</option>
                <option value="assignment">Assignments</option>
                <option value="resource">Resources</option>
                <option value="system">System</option>
                <option value="reminder">Reminders</option>
                <option value="achievement">Achievements</option>
              </select>

              <label style={{ color: '#4a5568', fontWeight: '500' }}>Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  padding: '8px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '0.95rem',
                  background: 'white',
                }}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                style={{
                  background: unreadCount === 0 ? '#cbd5e0' : '#48bb78',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: unreadCount === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}
              >
                Mark All Read
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              style={{
                background: notification.isRead ? 'white' : '#f0f9ff',
                border: `2px solid ${notification.isRead ? '#e2e8f0' : '#3b82f6'}`,
                borderRadius: '15px',
                padding: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                position: 'relative',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
              }}
            >
              {!notification.isRead && (
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    width: '8px',
                    height: '8px',
                    background: '#3b82f6',
                    borderRadius: '50%',
                  }}
                />
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div
                  style={{
                    fontSize: '2rem',
                    flexShrink: 0,
                    marginTop: '5px',
                  }}
                >
                  {getNotificationIcon(notification.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px',
                    }}
                  >
                    <h3
                      style={{
                        color: '#2d3748',
                        margin: '0',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                      }}
                    >
                      {notification.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <span
                        style={{
                          background: getPriorityColor(notification.priority),
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '0.7rem',
                          fontWeight: '500',
                          textTransform: 'uppercase',
                        }}
                      >
                        {notification.priority}
                      </span>
                      <span style={{ color: '#718096', fontSize: '0.9rem' }}>
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                  </div>

                  <p
                    style={{
                      color: '#4a5568',
                      margin: '0 0 15px 0',
                      lineHeight: '1.5',
                    }}
                  >
                    {notification.message}
                  </p>

                  {notification.sender && (
                    <p
                      style={{
                        color: '#718096',
                        margin: '0 0 15px 0',
                        fontSize: '0.9rem',
                      }}
                    >
                      From: {notification.sender}
                    </p>
                  )}

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {notification.actionUrl && notification.actionText && (
                      <a
                        href={notification.actionUrl}
                        style={{
                          background: '#667eea',
                          color: 'white',
                          textDecoration: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                          transition: 'background 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = '#5a67d8')}
                        onMouseOut={(e) => (e.currentTarget.style.background = '#667eea')}
                      >
                        {notification.actionText}
                      </a>
                    )}

                    {!notification.isRead && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        style={{
                          background: '#48bb78',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '500',
                        }}
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      style={{
                        background: '#e53e3e',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#718096',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔔</div>
            <h3 style={{ color: '#4a5568', marginBottom: '10px' }}>No notifications found</h3>
            <p>You're all caught up! Check back later for new updates.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSystem;
