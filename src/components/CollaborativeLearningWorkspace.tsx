import React, { useEffect, useState } from 'react';
import { Users, MessageCircle, Share2, Edit3, Eye, Heart, Star, Target, Clock, CheckCircle } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  role: 'teacher' | 'student' | 'kaitiaki';
  avatar: string;
  status: 'online' | 'away' | 'offline';
  currentActivity: string;
  culturalRole?: string;
}

interface CollaborationActivity {
  id: string;
  title: string;
  type: 'discussion' | 'project' | 'cultural-sharing' | 'peer-review';
  participants: string[];
  culturalContext: 'māori-focused' | 'multicultural' | 'general';
  status: 'active' | 'completed' | 'upcoming';
  timeRemaining?: number;
  description: string;
  outcomes: string[];
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
  type: 'text' | 'cultural-insight' | 'achievement' | 'question';
  culturalLanguage?: 'te-reo' | 'english' | 'mixed';
}

const CollaborativeLearningWorkspace: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [activities, setActivities] = useState<CollaborationActivity[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [activeView, setActiveView] = useState<'overview' | 'activity' | 'cultural-circle'>('overview');

  useEffect(() => {
    generateWorkspaceData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateParticipantActivity();
      simulateNewMessages();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const generateWorkspaceData = () => {
    const sampleParticipants: Participant[] = [
      {
        id: 'teacher-1',
        name: 'Whaea Sarah',
        role: 'teacher',
        avatar: '👩‍🏫',
        status: 'online',
        currentActivity: 'Facilitating cultural discussion',
        culturalRole: 'Facilitator'
      },
      {
        id: 'kaitiaki-1',
        name: 'Matua Tane',
        role: 'kaitiaki',
        avatar: '🌿',
        status: 'online',
        currentActivity: 'Sharing traditional knowledge',
        culturalRole: 'Cultural Guardian'
      },
      {
        id: 'student-1',
        name: 'Aroha',
        role: 'student',
        avatar: '👧',
        status: 'online',
        currentActivity: 'Contributing to whakatōhea project'
      },
      {
        id: 'student-2',
        name: 'James',
        role: 'student',
        avatar: '👦',
        status: 'online',
        currentActivity: 'Researching environmental impact'
      },
      {
        id: 'student-3',
        name: 'Mere',
        role: 'student',
        avatar: '👧',
        status: 'online',
        currentActivity: 'Creating digital artwork'
      },
      {
        id: 'student-4',
        name: 'Te Koha',
        role: 'student',
        avatar: '👦',
        status: 'away',
        currentActivity: 'Taking break'
      }
    ];

    const sampleActivities: CollaborationActivity[] = [
      {
        id: 'activity-1',
        title: 'Whakatōhea: Our Connection to the Land',
        type: 'cultural-sharing',
        participants: ['teacher-1', 'kaitiaki-1', 'student-1', 'student-2', 'student-3'],
        culturalContext: 'māori-focused',
        status: 'active',
        timeRemaining: 25,
        description: 'Collaborative exploration of relationships between people and environment through Māori perspectives',
        outcomes: ['Cultural understanding', 'Environmental awareness', 'Community connection']
      },
      {
        id: 'activity-2',
        title: 'Peer Review: Science Investigation Projects',
        type: 'peer-review',
        participants: ['teacher-1', 'student-1', 'student-2', 'student-4'],
        culturalContext: 'general',
        status: 'active',
        timeRemaining: 15,
        description: 'Students review each others scientific method and findings',
        outcomes: ['Critical thinking', 'Communication skills', 'Scientific literacy']
      },
      {
        id: 'activity-3',
        title: 'Storytelling Circle: Legends and Modern Life',
        type: 'discussion',
        participants: ['kaitiaki-1', 'student-1', 'student-3'],
        culturalContext: 'māori-focused',
        status: 'upcoming',
        description: 'Traditional storytelling methods to explore contemporary challenges',
        outcomes: ['Cultural knowledge', 'Narrative skills', 'Critical reflection']
      }
    ];

    const sampleMessages: ChatMessage[] = [
      {
        id: 'msg-1',
        senderId: 'kaitiaki-1',
        senderName: 'Matua Tane',
        message: 'Kia ora whānau! Let\'s begin our exploration of whakapapa connections to this whenua.',
        timestamp: new Date(Date.now() - 300000),
        type: 'cultural-insight',
        culturalLanguage: 'mixed'
      },
      {
        id: 'msg-2',
        senderId: 'student-1',
        senderName: 'Aroha',
        message: 'I\'ve been thinking about how my grandparents\' stories connect to what we\'re learning about sustainability.',
        timestamp: new Date(Date.now() - 180000),
        type: 'text'
      },
      {
        id: 'msg-3',
        senderId: 'teacher-1',
        senderName: 'Whaea Sarah',
        message: 'Excellent insight, Aroha! Can you share how those stories might inform our environmental project?',
        timestamp: new Date(Date.now() - 120000),
        type: 'question'
      },
      {
        id: 'msg-4',
        senderId: 'student-2',
        senderName: 'James',
        message: '🌟 Achievement unlocked: Connected traditional knowledge with modern science!',
        timestamp: new Date(Date.now() - 60000),
        type: 'achievement'
      }
    ];

    setParticipants(sampleParticipants);
    setActivities(sampleActivities);
    setChatMessages(sampleMessages);
    setSelectedActivity('activity-1');
  };

  const updateParticipantActivity = () => {
    const activities = [
      'Sharing cultural insights',
      'Reviewing peer work',
      'Contributing to discussion',
      'Creating digital content',
      'Researching environmental data',
      'Practicing te reo pronunciation',
      'Collaborating on project',
      'Reflecting on learning'
    ];

    setParticipants(prev => 
      prev.map(participant => ({
        ...participant,
        currentActivity: participant.status === 'online' 
          ? activities[Math.floor(Math.random() * activities.length)]
          : participant.currentActivity
      }))
    );
  };

  const simulateNewMessages = () => {
    const sampleNewMessages = [
      'This reminds me of the whakataukī: "He aha te mea nui o te taiao? He tangata, he tangata, he tangata"',
      'I\'m seeing patterns between traditional practices and modern sustainability',
      'Can we explore this connection to biodiversity?',
      'Great point! How does this apply to our local ecosystem?',
      'This is helping me understand my cultural identity better'
    ];

    const randomMessage = sampleNewMessages[Math.floor(Math.random() * sampleNewMessages.length)];
    const randomParticipant = participants[Math.floor(Math.random() * participants.length)];

    if (Math.random() > 0.7 && randomParticipant) {
      const newMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        senderId: randomParticipant.id,
        senderName: randomParticipant.name,
        message: randomMessage,
        timestamp: new Date(),
        type: 'text'
      };

      setChatMessages(prev => [...prev, newMsg]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'away': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'discussion': return '💬';
      case 'project': return '🛠️';
      case 'cultural-sharing': return '🌿';
      case 'peer-review': return '👀';
      default: return '📚';
    }
  };

  const formatTimeRemaining = (minutes?: number) => {
    if (!minutes) return 'No time limit';
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m remaining`;
    }
    return `${minutes}m remaining`;
  };

  const selectedActivityData = activities.find(a => a.id === selectedActivity);

  return (
    <div /* TODO: Move to external CSS */ style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f0fdfa 0%, #e6fffa 100%)',
      padding: '1rem'
    }}>
      <div /* TODO: Move to external CSS */ style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div /* TODO: Move to external CSS */ style={{ 
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '1.5rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e2e8f0'
        }}>
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 /* TODO: Move to external CSS */ style={{ fontSize: '2rem', fontWeight: '700', color: '#1a365d', margin: '0 0 0.5rem 0' }}>
                🤝 Collaborative Learning Workspace
              </h1>
              <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: 0 }}>
                Real-time collaboration with cultural intelligence and peer learning
              </p>
            </div>
            
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} /* TODO: Move to external CSS */ style={{ color: '#059669' }} />
                <span /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#059669' }}>
                  {participants.filter(p => p.status === 'online').length} online
                </span>
              </div>
              
              <div /* TODO: Move to external CSS */ style={{ 
                background: '#d1fae5',
                color: '#065f46',
                padding: '0.5rem 1rem',
                borderRadius: '12px',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}>
                🌿 Culturally Safe Space
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'activity', label: 'Active Session', icon: '🎯' },
              { id: 'cultural-circle', label: 'Cultural Circle', icon: '🌿' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                /* TODO: Move to external CSS */ style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeView === tab.id ? '#059669' : '#f7fafc',
                  color: activeView === tab.id ? 'white' : '#4a5568',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div /* TODO: Move to external CSS */ style={{ display: 'grid', gridTemplateColumns: '300px 1fr 350px', gap: '1.5rem' }}>
          {/* Participants Panel */}
          <div /* TODO: Move to external CSS */ style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            height: 'fit-content'
          }}>
            <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#1a365d', fontWeight: '600' }}>
              👥 Participants
            </h3>
            
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {participants.map(participant => (
                <div 
                  key={participant.id}
                  /* TODO: Move to external CSS */ style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    background: '#f8fafc',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}
                >
                  <div /* TODO: Move to external CSS */ style={{ position: 'relative' }}>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem' }}>{participant.avatar}</span>
                    <div /* TODO: Move to external CSS */ style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: getStatusColor(participant.status),
                      border: '2px solid white'
                    }} />
                  </div>
                  
                  <div /* TODO: Move to external CSS */ style={{ flex: 1 }}>
                    <div /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748', fontSize: '0.9rem' }}>
                      {participant.name}
                    </div>
                    <div /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#718096' }}>
                      {participant.culturalRole || participant.role}
                    </div>
                    <div /* TODO: Move to external CSS */ style={{ fontSize: '0.7rem', color: '#a0aec0', marginTop: '0.25rem' }}>
                      {participant.currentActivity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div /* TODO: Move to external CSS */ style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            {activeView === 'overview' && (
              <div>
                <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1.5rem 0', color: '#1a365d', fontWeight: '600' }}>
                  📚 Active Learning Activities
                </h3>
                
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {activities.map(activity => (
                    <div 
                      key={activity.id}
                      onClick={() => {
                        setSelectedActivity(activity.id);
                        setActiveView('activity');
                      }}
                      style={{
                        padding: '1.5rem',
                        background: selectedActivity === activity.id ? '#f0fdfa' : '#f8fafc',
                        border: `2px solid ${selectedActivity === activity.id ? '#059669' : '#e2e8f0'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                        <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span /* TODO: Move to external CSS */ style={{ fontSize: '1.2rem' }}>{getActivityTypeIcon(activity.type)}</span>
                          <h4 /* TODO: Move to external CSS */ style={{ margin: 0, color: '#2d3748', fontWeight: '600' }}>
                            {activity.title}
                          </h4>
                        </div>
                        
                        <div /* TODO: Move to external CSS */ style={{
                          background: activity.status === 'active' ? '#d1fae5' : '#fef3c7',
                          color: activity.status === 'active' ? '#065f46' : '#92400e',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '600'
                        }}>
                          {activity.status.toUpperCase()}
                        </div>
                      </div>
                      
                      <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
                        {activity.description}
                      </p>
                      
                      <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Users size={14} /* TODO: Move to external CSS */ style={{ color: '#718096' }} />
                          <span /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#718096' }}>
                            {activity.participants.length} participants
                          </span>
                        </div>
                        
                        {activity.timeRemaining && (
                          <div /* TODO: Move to external CSS */ style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <Clock size={14} /* TODO: Move to external CSS */ style={{ color: '#ea580c' }} />
                            <span /* TODO: Move to external CSS */ style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: '600' }}>
                              {formatTimeRemaining(activity.timeRemaining)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeView === 'activity' && selectedActivityData && (
              <div>
                <div /* TODO: Move to external CSS */ style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 /* TODO: Move to external CSS */ style={{ margin: 0, color: '#1a365d', fontWeight: '600' }}>
                    {getActivityTypeIcon(selectedActivityData.type)} {selectedActivityData.title}
                  </h3>
                  
                  {selectedActivityData.timeRemaining && (
                    <div /* TODO: Move to external CSS */ style={{ 
                      background: '#fed7d7',
                      color: '#c53030',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.9rem'
                    }}>
                      ⏰ {formatTimeRemaining(selectedActivityData.timeRemaining)}
                    </div>
                  )}
                </div>
                
                <div /* TODO: Move to external CSS */ style={{ 
                  background: '#f7fafc',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '1.5rem'
                }}>
                  <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: '0 0 1rem 0' }}>
                    {selectedActivityData.description}
                  </p>
                  
                  <div>
                    <h4 /* TODO: Move to external CSS */ style={{ color: '#2d3748', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                      Learning Outcomes:
                    </h4>
                    <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {selectedActivityData.outcomes.map((outcome, index) => (
                        <span 
                          key={index}
                          /* TODO: Move to external CSS */ style={{
                            background: '#059669',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '500'
                          }}
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div /* TODO: Move to external CSS */ style={{ 
                  background: '#fffbeb',
                  border: '1px solid #f59e0b',
                  borderRadius: '12px',
                  padding: '1rem',
                  textAlign: 'center'
                }}>
                  <div /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                  <p /* TODO: Move to external CSS */ style={{ color: '#92400e', fontWeight: '600', margin: 0 }}>
                    Active collaboration session in progress
                  </p>
                  <p /* TODO: Move to external CSS */ style={{ color: '#a16207', fontSize: '0.9rem', margin: '0.5rem 0 0 0' }}>
                    Students are engaging with cultural perspectives and peer learning
                  </p>
                </div>
              </div>
            )}

            {activeView === 'cultural-circle' && (
              <div /* TODO: Move to external CSS */ style={{ textAlign: 'center', padding: '3rem' }}>
                <div /* TODO: Move to external CSS */ style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
                <h3 /* TODO: Move to external CSS */ style={{ color: '#1a365d', margin: '0 0 1rem 0' }}>Cultural Circle</h3>
                <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: '0 0 2rem 0' }}>
                  A dedicated space for sharing cultural knowledge, stories, and wisdom
                </p>
                
                <div /* TODO: Move to external CSS */ style={{
                  background: '#f0fdfa',
                  border: '1px solid #059669',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'left'
                }}>
                  <h4 /* TODO: Move to external CSS */ style={{ color: '#065f46', margin: '0 0 1rem 0' }}>
                    Current Focus: Whakatōhea and Environmental Stewardship
                  </h4>
                  <p /* TODO: Move to external CSS */ style={{ color: '#047857', margin: 0 }}>
                    Exploring traditional Māori relationships with the land and how ancient wisdom 
                    guides modern environmental practices.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Chat Panel */}
          <div /* TODO: Move to external CSS */ style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            height: '600px'
          }}>
            <h3 /* TODO: Move to external CSS */ style={{ margin: '0 0 1rem 0', color: '#1a365d', fontWeight: '600' }}>
              💬 Live Discussion
            </h3>
            
            <div /* TODO: Move to external CSS */ style={{ 
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              {chatMessages.map(message => (
                <div 
                  key={message.id}
                  style={{
                    padding: '0.75rem',
                    background: message.type === 'cultural-insight' ? '#f0fdfa' : 
                               message.type === 'achievement' ? '#fef3c7' : '#f8fafc',
                    borderRadius: '8px',
                    border: `1px solid ${
                      message.type === 'cultural-insight' ? '#059669' : 
                      message.type === 'achievement' ? '#f59e0b' : '#e2e8f0'
                    }`
                  }}
                >
                  <div /* TODO: Move to external CSS */ style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span /* TODO: Move to external CSS */ style={{ fontWeight: '600', color: '#2d3748', fontSize: '0.9rem' }}>
                      {message.senderName}
                    </span>
                    <span /* TODO: Move to external CSS */ style={{ fontSize: '0.75rem', color: '#a0aec0' }}>
                      {message.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p /* TODO: Move to external CSS */ style={{ color: '#4a5568', margin: 0, fontSize: '0.9rem' }}>
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
            
            <div /* TODO: Move to external CSS */ style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts..."
                /* TODO: Move to external CSS */ style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && newMessage.trim()) {
                    const newMsg: ChatMessage = {
                      id: `msg-${Date.now()}`,
                      senderId: 'current-user',
                      senderName: 'You',
                      message: newMessage,
                      timestamp: new Date(),
                      type: 'text'
                    };
                    setChatMessages(prev => [...prev, newMsg]);
                    setNewMessage('');
                  }
                }}
              />
              <button
                onClick={() => {
                  if (newMessage.trim()) {
                    const newMsg: ChatMessage = {
                      id: `msg-${Date.now()}`,
                      senderId: 'current-user',
                      senderName: 'You',
                      message: newMessage,
                      timestamp: new Date(),
                      type: 'text'
                    };
                    setChatMessages(prev => [...prev, newMsg]);
                    setNewMessage('');
                  }
                }}
                /* TODO: Move to external CSS */ style={{
                  padding: '0.75rem',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeLearningWorkspace;