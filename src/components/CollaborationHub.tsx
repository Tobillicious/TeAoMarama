import React, { useState, useEffect, useRef } from 'react';
import './CollaborationHub.css';

interface Educator {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  role: string;
  kaitiakiLevel: number;
  culturalExpertise: string[];
}

interface CollaborationMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'resource_share' | 'cultural_consultation' | 'system_notification';
  culturalContext?: {
    requiresKaitiakiApproval: boolean;
    culturalSensitivity: 'low' | 'medium' | 'high';
    tikangaGuidance?: string;
  };
}

interface CollaborativeResource {
  id: string;
  title: string;
  type: 'lesson_plan' | 'assessment' | 'activity' | 'whakataukī';
  status: 'draft' | 'review' | 'approved' | 'published';
  contributors: string[];
  culturalValidation: {
    kaitiakiApproved: boolean;
    culturalSafetyScore: number;
    reviewComments?: string;
  };
  lastModified: Date;
}

const CollaborationHub: React.FC = () => {
  const [connectedEducators, setConnectedEducators] = useState<Educator[]>([]);
  const [messages, setMessages] = useState<CollaborationMessage[]>([]);
  const [collaborativeResources, setCollaborativeResources] = useState<CollaborativeResource[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'resources' | 'planning' | 'cultural'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('general');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate real-time educator connections
    const mockEducators: Educator[] = [
      {
        id: '1',
        name: 'Aroha Thompson',
        avatar: '👩🏽‍🏫',
        status: 'online',
        role: 'Kaitiaki - Cultural Advisor',
        kaitiakiLevel: 5,
        culturalExpertise: ['Te Reo Māori', 'Tikanga', 'Whakataukī']
      },
      {
        id: '2', 
        name: 'James Mitchell',
        avatar: '👨🏻‍🏫',
        status: 'online',
        role: 'Mathematics Teacher',
        kaitiakiLevel: 2,
        culturalExpertise: ['STEM Integration']
      },
      {
        id: '3',
        name: 'Mere Williams',
        avatar: '👩🏽‍💼',
        status: 'away',
        role: 'Social Studies Lead',
        kaitiakiLevel: 4,
        culturalExpertise: ['NZ History', 'Cultural Context']
      },
      {
        id: '4',
        name: 'David Kim',
        avatar: '👨🏻‍💻',
        status: 'online',
        role: 'Digital Learning Specialist',
        kaitiakiLevel: 1,
        culturalExpertise: ['Technology Integration']
      }
    ];

    const mockMessages: CollaborationMessage[] = [
      {
        id: '1',
        senderId: '1',
        senderName: 'Aroha Thompson',
        content: 'Kia ora whānau! I\'ve just reviewed the new Mathematics unit plan. The integration of traditional Māori counting systems is fantastic. Just need to check the pronunciation guides.',
        timestamp: new Date(Date.now() - 600000),
        type: 'cultural_consultation',
        culturalContext: {
          requiresKaitiakiApproval: true,
          culturalSensitivity: 'medium',
          tikangaGuidance: 'Consider adding contextual tikanga around the use of traditional counting'
        }
      },
      {
        id: '2',
        senderId: '2',
        senderName: 'James Mitchell',
        content: 'Thanks Aroha! I\'ve added the pronunciation audio files. The students really engage better when they can hear the correct pronunciation.',
        timestamp: new Date(Date.now() - 540000),
        type: 'message'
      },
      {
        id: '3',
        senderId: '3',
        senderName: 'Mere Williams',
        content: 'The Treaty of Waitangi resources are ready for collaborative review. Cultural validation needed before publishing.',
        timestamp: new Date(Date.now() - 300000),
        type: 'resource_share',
        culturalContext: {
          requiresKaitiakiApproval: true,
          culturalSensitivity: 'high'
        }
      }
    ];

    const mockResources: CollaborativeResource[] = [
      {
        id: '1',
        title: 'Mathematics with Māori Number Systems',
        type: 'lesson_plan',
        status: 'review',
        contributors: ['James Mitchell', 'Aroha Thompson'],
        culturalValidation: {
          kaitiakiApproved: false,
          culturalSafetyScore: 85,
          reviewComments: 'Audio pronunciation needed'
        },
        lastModified: new Date(Date.now() - 900000)
      },
      {
        id: '2',
        title: 'Treaty of Waitangi Interactive Assessment',
        type: 'assessment',
        status: 'draft',
        contributors: ['Mere Williams'],
        culturalValidation: {
          kaitiakiApproved: false,
          culturalSafetyScore: 90
        },
        lastModified: new Date(Date.now() - 300000)
      },
      {
        id: '3',
        title: 'Whakataukī for Science Learning',
        type: 'whakataukī',
        status: 'approved',
        contributors: ['Aroha Thompson', 'David Kim'],
        culturalValidation: {
          kaitiakiApproved: true,
          culturalSafetyScore: 98,
          reviewComments: 'Excellent cultural integration'
        },
        lastModified: new Date(Date.now() - 1800000)
      }
    ];

    setConnectedEducators(mockEducators);
    setMessages(mockMessages);
    setCollaborativeResources(mockResources);

    // Simulate real-time message updates
    const messageInterval = setInterval(() => {
      const randomEducator = mockEducators[Math.floor(Math.random() * mockEducators.length)];
      const systemMessages = [
        'New resource added to cultural review queue',
        'Kaitiaki approval received for Māori Legends unit',
        'AI generated 3 new culturally appropriate activities',
        'Cultural safety score updated for Social Studies resources'
      ];
      
      if (Math.random() > 0.7) {
        const newMessage: CollaborationMessage = {
          id: Date.now().toString(),
          senderId: randomEducator.id,
          senderName: randomEducator.name,
          content: systemMessages[Math.floor(Math.random() * systemMessages.length)],
          timestamp: new Date(),
          type: 'system_notification'
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    }, 15000);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: CollaborationMessage = {
        id: Date.now().toString(),
        senderId: 'current-user',
        senderName: 'You',
        content: newMessage,
        timestamp: new Date(),
        type: 'message'
      };
      
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-NZ', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getCulturalBadge = (educator: Educator) => {
    if (educator.kaitiakiLevel >= 4) return '🌿 Kaitiaki';
    if (educator.kaitiakiLevel >= 2) return '🎓 Cultural Advisor';
    return '👋 Educator';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'away': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="collaboration-hub">
      <div className="collaboration-header">
        <h1>🤝 Collaborative Learning Hub</h1>
        <p>Real-time collaboration for culturally responsive education</p>
        
        <div className="collaboration-tabs">
          <button 
            className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat
          </button>
          <button 
            className={`tab-button ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
          >
            📚 Collaborative Resources
          </button>
          <button 
            className={`tab-button ${activeTab === 'planning' ? 'active' : ''}`}
            onClick={() => setActiveTab('planning')}
          >
            📋 Planning Board
          </button>
          <button 
            className={`tab-button ${activeTab === 'cultural' ? 'active' : ''}`}
            onClick={() => setActiveTab('cultural')}
          >
            🌿 Cultural Guidance
          </button>
        </div>
      </div>

      <div className="collaboration-content">
        <div className="sidebar">
          <div className="connected-educators">
            <h3>🌟 Connected Educators ({connectedEducators.filter(e => e.status === 'online').length})</h3>
            <div className="educators-list">
              {connectedEducators.map(educator => (
                <div key={educator.id} className="educator-item">
                  <div className="educator-avatar">
                    {educator.avatar}
                    <div 
                      className="status-indicator"
                      /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(educator.status) }}
                    ></div>
                  </div>
                  <div className="educator-info">
                    <div className="educator-name">{educator.name}</div>
                    <div className="educator-role">{educator.role}</div>
                    <div className="cultural-badge">{getCulturalBadge(educator)}</div>
                    {educator.culturalExpertise.length > 0 && (
                      <div className="expertise-tags">
                        {educator.culturalExpertise.map(expertise => (
                          <span key={expertise} className="expertise-tag">
                            {expertise}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="main-content">
          {activeTab === 'chat' && (
            <div className="chat-container">
              <div className="chat-room-selector">
                <select 
                  value={selectedRoom} 
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="room-select"
                >
                  <option value="general">General Discussion</option>
                  <option value="cultural">Cultural Guidance</option>
                  <option value="curriculum">Curriculum Planning</option>
                  <option value="resources">Resource Development</option>
                  <option value="kaitiaki">Kaitiaki Circle</option>
                </select>
              </div>
              
              <div className="messages-container">
                {messages.map(message => (
                  <div key={message.id} className={`message-item ${message.type}`}>
                    <div className="message-header">
                      <span className="sender-name">{message.senderName}</span>
                      <span className="message-time">{formatTime(message.timestamp)}</span>
                      {message.type === 'cultural_consultation' && (
                        <span className="cultural-indicator">🌿 Cultural Context</span>
                      )}
                      {message.type === 'system_notification' && (
                        <span className="system-indicator">🤖 System</span>
                      )}
                    </div>
                    <div className="message-content">{message.content}</div>
                    {message.culturalContext && (
                      <div className="cultural-context">
                        <div className="cultural-sensitivity">
                          Sensitivity: <span className={message.culturalContext.culturalSensitivity}>
                            {message.culturalContext.culturalSensitivity}
                          </span>
                        </div>
                        {message.culturalContext.tikangaGuidance && (
                          <div className="tikanga-guidance">
                            💡 {message.culturalContext.tikangaGuidance}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              
              <div className="message-input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message... (cultural guidance available)"
                  className="message-input"
                />
                <button onClick={handleSendMessage} className="send-button">
                  Send 📤
                </button>
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="resources-container">
              <div className="resources-header">
                <h3>📚 Collaborative Educational Resources</h3>
                <button className="create-resource-btn">+ Create New Resource</button>
              </div>
              
              <div className="resources-grid">
                {collaborativeResources.map(resource => (
                  <div key={resource.id} className={`resource-card ${resource.status}`}>
                    <div className="resource-header">
                      <h4>{resource.title}</h4>
                      <span className={`status-badge ${resource.status}`}>
                        {resource.status.charAt(0).toUpperCase() + resource.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="resource-type">
                      {resource.type.replace('_', ' ').toUpperCase()}
                    </div>
                    
                    <div className="contributors">
                      <strong>Contributors:</strong> {resource.contributors.join(', ')}
                    </div>
                    
                    <div className="cultural-validation">
                      <div className="validation-header">
                        <strong>Cultural Validation:</strong>
                      </div>
                      <div className="validation-details">
                        <div className="safety-score">
                          Safety Score: <span className="score">{resource.culturalValidation.culturalSafetyScore}/100</span>
                        </div>
                        <div className="kaitiaki-approval">
                          Kaitiaki: {resource.culturalValidation.kaitiakiApproved ? '✅ Approved' : '⏳ Pending'}
                        </div>
                        {resource.culturalValidation.reviewComments && (
                          <div className="review-comments">
                            💬 {resource.culturalValidation.reviewComments}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="resource-actions">
                      <button className="action-btn edit">Edit</button>
                      <button className="action-btn review">Review</button>
                      <button className="action-btn cultural">Cultural Check</button>
                    </div>
                    
                    <div className="last-modified">
                      Modified: {resource.lastModified.toLocaleDateString('en-NZ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'planning' && (
            <div className="planning-container">
              <h3>📋 Collaborative Curriculum Planning</h3>
              <div className="planning-board">
                <div className="planning-column">
                  <h4>Ideas 💡</h4>
                  <div className="planning-items">
                    <div className="planning-item">
                      <div className="item-title">Māori Science Integration</div>
                      <div className="item-contributor">by Aroha Thompson</div>
                    </div>
                    <div className="planning-item">
                      <div className="item-title">Digital Storytelling Project</div>
                      <div className="item-contributor">by David Kim</div>
                    </div>
                  </div>
                </div>
                
                <div className="planning-column">
                  <h4>In Development 🚧</h4>
                  <div className="planning-items">
                    <div className="planning-item">
                      <div className="item-title">Treaty Education Module</div>
                      <div className="item-contributor">by Mere Williams</div>
                    </div>
                  </div>
                </div>
                
                <div className="planning-column">
                  <h4>Cultural Review 🌿</h4>
                  <div className="planning-items">
                    <div className="planning-item">
                      <div className="item-title">Mathematics Unit Plan</div>
                      <div className="item-contributor">Kaitiaki review needed</div>
                    </div>
                  </div>
                </div>
                
                <div className="planning-column">
                  <h4>Ready 🎓</h4>
                  <div className="planning-items">
                    <div className="planning-item">
                      <div className="item-title">Whakataukī Collection</div>
                      <div className="item-contributor">Approved & Published</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cultural' && (
            <div className="cultural-guidance-container">
              <h3>🌿 Cultural Guidance Center</h3>
              
              <div className="guidance-sections">
                <div className="guidance-section">
                  <h4>🎯 Kaitiaki Guidelines</h4>
                  <div className="guideline-item">
                    <strong>Cultural Sensitivity Levels:</strong>
                    <ul>
                      <li><span className="level high">High:</span> Sacred content, traditional knowledge</li>
                      <li><span className="level medium">Medium:</span> Cultural practices, Te Reo usage</li>
                      <li><span className="level low">Low:</span> General cultural references</li>
                    </ul>
                  </div>
                </div>
                
                <div className="guidance-section">
                  <h4>📚 Te Reo Māori Resources</h4>
                  <div className="resource-links">
                    <button className="resource-link">Pronunciation Guide</button>
                    <button className="resource-link">Common Phrases</button>
                    <button className="resource-link">Whakataukī Collection</button>
                    <button className="resource-link">Cultural Context</button>
                  </div>
                </div>
                
                <div className="guidance-section">
                  <h4>✅ Cultural Validation Checklist</h4>
                  <div className="checklist">
                    <div className="checklist-item">✅ Appropriate use of Te Reo Māori</div>
                    <div className="checklist-item">✅ Respectful cultural representation</div>
                    <div className="checklist-item">✅ Kaitiaki approval for sensitive content</div>
                    <div className="checklist-item">✅ Cultural context provided</div>
                    <div className="checklist-item">✅ Educational value aligned with tikanga</div>
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

export default CollaborationHub;