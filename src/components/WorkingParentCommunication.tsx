import React, { useState } from 'react';

const WorkingParentCommunication: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      to: 'parent@email.com',
      studentName: 'Aroha Williams',
      subject: 'Excellent Progress in Mathematics',
      content:
        "Aroha has shown remarkable improvement in her mathematics skills this term. Her problem-solving abilities have developed significantly, and she's been very engaged in class discussions.",
      date: '2024-01-15',
      type: 'Positive',
      status: 'Sent',
      priority: 'Normal',
    },
    {
      id: 2,
      to: 'parent2@email.com',
      studentName: 'James Mitchell',
      subject: 'Attendance Concern',
      content:
        "I wanted to reach out regarding James's recent absences. He has missed 3 classes this week, and I'm concerned about his progress. Please let me know if there's anything we can do to support him.",
      date: '2024-01-14',
      type: 'Concern',
      status: 'Sent',
      priority: 'High',
    },
    {
      id: 3,
      to: 'parent3@email.com',
      studentName: 'Sofia Chen',
      subject: 'Science Project Update',
      content:
        "Sofia's science project on renewable energy is progressing excellently. She has demonstrated great research skills and creativity. The project is due next Friday.",
      date: '2024-01-13',
      type: 'Update',
      status: 'Draft',
      priority: 'Normal',
    },
  ]);

  const [newMessage, setNewMessage] = useState({
    to: '',
    studentName: '',
    subject: '',
    content: '',
    type: 'Update',
    priority: 'Normal',
  });

  const [showComposeForm, setShowComposeForm] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const handleSendMessage = () => {
    if (newMessage.to && newMessage.studentName && newMessage.subject && newMessage.content) {
      const message = {
        id: messages.length + 1,
        ...newMessage,
        date: new Date().toISOString().split('T')[0],
        status: 'Sent',
      };
      setMessages([...messages, message]);
      setNewMessage({
        to: '',
        studentName: '',
        subject: '',
        content: '',
        type: 'Update',
        priority: 'Normal',
      });
      setShowComposeForm(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Positive':
        return '#48bb78';
      case 'Concern':
        return '#ed8936';
      case 'Update':
        return '#4299e1';
      case 'Urgent':
        return '#f56565';
      default:
        return '#a0aec0';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return '#f56565';
      case 'Normal':
        return '#48bb78';
      case 'Low':
        return '#a0aec0';
      default:
        return '#a0aec0';
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
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
            textAlign: 'center',
            marginBottom: '40px',
            borderBottom: '3px solid #667eea',
            paddingBottom: '20px',
          }}
        >
          <h1
            style={{
              fontSize: '2.5rem',
              color: '#2d3748',
              margin: '0 0 10px 0',
              fontWeight: 'bold',
            }}
          >
            📧 Parent Communication
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Communicate effectively with parents and whānau
          </p>
        </div>

        {/* Quick Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{messages.length}</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Total Messages</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {messages.filter((m) => m.status === 'Sent').length}
            </h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Messages Sent</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
              {messages.filter((m) => m.status === 'Draft').length}
            </h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Draft Messages</p>
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: 'white',
              textAlign: 'center',
            }}
          >
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>24</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Parent Responses</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '30px',
            flexWrap: 'wrap',
          }}
        >
          <button
            onClick={() => setShowComposeForm(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 5px 15px rgba(102, 126, 234, 0.4)',
            }}
          >
            ✉️ Compose Message
          </button>
          <button
            style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 5px 15px rgba(79, 172, 254, 0.4)',
            }}
          >
            📋 Message Templates
          </button>
          <button
            style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 5px 15px rgba(67, 233, 123, 0.4)',
            }}
          >
            📊 Communication Report
          </button>
          <button
            style={{
              background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              boxShadow: '0 5px 15px rgba(250, 112, 154, 0.4)',
            }}
          >
            🎯 Bulk Messaging
          </button>
        </div>

        {/* Compose Message Form */}
        {showComposeForm && (
          <div
            style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '30px',
              border: '2px solid #667eea',
            }}
          >
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Compose New Message</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '20px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Parent Email
                </label>
                <input
                  type="email"
                  value={newMessage.to}
                  onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
                  placeholder="parent@email.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Student Name
                </label>
                <input
                  type="text"
                  value={newMessage.studentName}
                  onChange={(e) => setNewMessage({ ...newMessage, studentName: e.target.value })}
                  placeholder="Student's name"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Message Type
                </label>
                <select
                  value={newMessage.type}
                  onChange={(e) => setNewMessage({ ...newMessage, type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="Update">Update</option>
                  <option value="Positive">Positive</option>
                  <option value="Concern">Concern</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '5px',
                    fontWeight: 'bold',
                    color: '#4a5568',
                  }}
                >
                  Priority
                </label>
                <select
                  value={newMessage.priority}
                  onChange={(e) => setNewMessage({ ...newMessage, priority: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#4a5568',
                }}
              >
                Subject
              </label>
              <input
                type="text"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                placeholder="Message subject..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                  color: '#4a5568',
                }}
              >
                Message Content
              </label>
              <textarea
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                placeholder="Type your message here..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={handleSendMessage}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Send Message
              </button>
              <button
                onClick={() => setShowComposeForm(false)}
                style={{
                  background: '#e2e8f0',
                  color: '#4a5568',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Messages List */}
        <div>
          <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Message History</h3>
          <div
            style={{
              display: 'grid',
              gap: '20px',
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  borderRadius: '15px',
                  padding: '25px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                  }}
                >
                  <div>
                    <h4
                      style={{
                        margin: '0 0 5px 0',
                        fontSize: '1.3rem',
                        color: '#2d3748',
                      }}
                    >
                      {message.subject}
                    </h4>
                    <p
                      style={{
                        margin: '0',
                        color: '#4a5568',
                        fontSize: '1rem',
                      }}
                    >
                      To: {message.to} • Student: {message.studentName}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div
                      style={{
                        background: getTypeColor(message.type),
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {message.type}
                    </div>
                    <div
                      style={{
                        background: getPriorityColor(message.priority),
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {message.priority}
                    </div>
                    <div
                      style={{
                        background: message.status === 'Sent' ? '#48bb78' : '#ed8936',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {message.status}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    background: '#f7fafc',
                    padding: '15px',
                    borderRadius: '10px',
                    marginBottom: '15px',
                  }}
                >
                  <p
                    style={{
                      margin: '0',
                      color: '#2d3748',
                      lineHeight: '1.6',
                    }}
                  >
                    {message.content}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ color: '#4a5568', fontSize: '0.9rem' }}>Sent: {message.date}</span>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      Reply
                    </button>
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cultural Safety Note */}
        <div
          style={{
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            padding: '20px',
            borderRadius: '15px',
            marginTop: '30px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>
            🌿 Respectful Communication with Whānau
          </h4>
          <p style={{ margin: '0', color: '#4a5568', fontSize: '1rem' }}>
            All communication respects cultural protocols, acknowledges the importance of whānau in
            education, and maintains the dignity and mana of all students and their families.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkingParentCommunication;
