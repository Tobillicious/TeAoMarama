import React, { useState, useEffect } from 'react';
import { useEducation } from '../contexts/EducationContext';

interface Communication {
  id: string;
  type: 'announcement' | 'progress-update' | 'concern' | 'celebration' | 'meeting-request';
  title: string;
  content: string;
  studentId: string;
  studentName: string;
  parentId: string;
  parentName: string;
  teacherId: string;
  teacherName: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'draft' | 'sent' | 'read' | 'replied';
  culturalElements: string[];
  attachments: string[];
  sentAt?: Date;
  readAt?: Date;
  repliedAt?: Date;
  reply?: string;
  createdAt: Date;
}

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredLanguage: string;
  children: string[];
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    phone: boolean;
    inPerson: boolean;
  };
  culturalBackground: string;
}

const RealParentCommunicationSystem: React.FC = () => {
  const { students, classes } = useEducation();
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [selectedCommunication, setSelectedCommunication] = useState<Communication | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [selectedParent, setSelectedParent] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [viewMode, setViewMode] = useState<'inbox' | 'sent' | 'drafts'>('inbox');
  const [newCommunication, setNewCommunication] = useState<Partial<Communication>>({
    type: 'announcement',
    title: '',
    content: '',
    priority: 'medium',
    culturalElements: [],
    attachments: []
  });

  // Generate sample data
  useEffect(() => {
    const sampleParents: Parent[] = [
      {
        id: 'parent-1',
        name: 'Sarah Thompson',
        email: 'sarah.thompson@email.com',
        phone: '+64 21 123 4567',
        preferredLanguage: 'English',
        children: ['student-1', 'student-2'],
        communicationPreferences: {
          email: true,
          sms: true,
          phone: false,
          inPerson: true
        },
        culturalBackground: 'Pākehā'
      },
      {
        id: 'parent-2',
        name: 'Hemi Williams',
        email: 'hemi.williams@email.com',
        phone: '+64 21 234 5678',
        preferredLanguage: 'Te Reo Māori',
        children: ['student-3'],
        communicationPreferences: {
          email: true,
          sms: false,
          phone: true,
          inPerson: true
        },
        culturalBackground: 'Māori'
      },
      {
        id: 'parent-3',
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '+64 21 345 6789',
        preferredLanguage: 'Spanish',
        children: ['student-4'],
        communicationPreferences: {
          email: true,
          sms: true,
          phone: true,
          inPerson: false
        },
        culturalBackground: 'Pacific Islander'
      }
    ];

    const sampleCommunications: Communication[] = [
      {
        id: 'comm-1',
        type: 'progress-update',
        title: 'Excellent Progress in Mathematics',
        content: 'I wanted to share some great news about Alex\'s progress in mathematics this term. They have shown significant improvement in problem-solving skills and are now confidently tackling more complex equations. Their cultural integration work has been particularly impressive, showing how mathematical concepts connect to traditional Māori patterns and designs.',
        studentId: 'student-1',
        studentName: 'Alex Thompson',
        parentId: 'parent-1',
        parentName: 'Sarah Thompson',
        teacherId: 'teacher-1',
        teacherName: 'Ms. Johnson',
        priority: 'medium',
        status: 'sent',
        culturalElements: ['Mathematical thinking', 'Cultural patterns', 'Problem solving'],
        attachments: ['math-progress-report.pdf'],
        sentAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        readAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'comm-2',
        type: 'celebration',
        title: 'Outstanding Cultural Presentation',
        content: 'Kia ora! I wanted to celebrate Koa\'s amazing presentation on whakapapa and family history. Their understanding of tikanga and ability to share their story with the class was truly inspiring. This demonstrates excellent cultural competency and communication skills.',
        studentId: 'student-3',
        studentName: 'Koa Williams',
        parentId: 'parent-2',
        parentName: 'Hemi Williams',
        teacherId: 'teacher-1',
        teacherName: 'Ms. Johnson',
        priority: 'low',
        status: 'sent',
        culturalElements: ['Whakapapa', 'Tikanga', 'Cultural storytelling', 'Te Reo Māori'],
        attachments: ['cultural-presentation-video.mp4'],
        sentAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        readAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        repliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        reply: 'Kia ora Ms. Johnson, thank you for the wonderful feedback. Koa was so excited to share our family story. We appreciate your support in helping them connect with their culture.',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'comm-3',
        type: 'concern',
        title: 'Support Needed in Reading',
        content: 'I wanted to reach out regarding Sofia\'s reading progress. While she shows great enthusiasm for stories, she\'s finding some challenges with comprehension. I\'d like to discuss some strategies we can use both at school and home to support her development. I\'m confident we can help her succeed with the right support.',
        studentId: 'student-4',
        studentName: 'Sofia Santos',
        parentId: 'parent-3',
        parentName: 'Maria Santos',
        teacherId: 'teacher-1',
        teacherName: 'Ms. Johnson',
        priority: 'high',
        status: 'sent',
        culturalElements: ['Reading support', 'Cultural stories', 'Bilingual learning'],
        attachments: ['reading-assessment.pdf', 'support-strategies.pdf'],
        sentAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      }
    ];

    setParents(sampleParents);
    setCommunications(sampleCommunications);
  }, [students, classes]);

  const getFilteredCommunications = () => {
    let filtered = communications;
    
    if (viewMode === 'sent') {
      filtered = filtered.filter(c => c.status === 'sent');
    } else if (viewMode === 'drafts') {
      filtered = filtered.filter(c => c.status === 'draft');
    } else {
      filtered = filtered.filter(c => c.status === 'sent' || c.status === 'read' || c.status === 'replied');
    }

    if (selectedStudent) {
      filtered = filtered.filter(c => c.studentId === selectedStudent);
    }

    if (selectedParent) {
      filtered = filtered.filter(c => c.parentId === selectedParent);
    }

    return filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  const handleCreateCommunication = () => {
    if (!newCommunication.title || !newCommunication.content || !selectedStudent || !selectedParent) {
      alert('Please fill in all required fields');
      return;
    }

    const student = students.find(s => s.id === selectedStudent);
    const parent = parents.find(p => p.id === selectedParent);

    const communication: Communication = {
      id: `comm-${Date.now()}`,
      type: newCommunication.type!,
      title: newCommunication.title!,
      content: newCommunication.content!,
      studentId: selectedStudent,
      studentName: student?.name || '',
      parentId: selectedParent,
      parentName: parent?.name || '',
      teacherId: 'teacher-1',
      teacherName: 'Ms. Johnson',
      priority: newCommunication.priority!,
      status: 'draft',
      culturalElements: newCommunication.culturalElements || [],
      attachments: newCommunication.attachments || [],
      createdAt: new Date()
    };

    setCommunications(prev => [communication, ...prev]);
    setNewCommunication({
      type: 'announcement',
      title: '',
      content: '',
      priority: 'medium',
      culturalElements: [],
      attachments: []
    });
    setSelectedStudent('');
    setSelectedParent('');
    setIsCreating(false);
  };

  const handleSendCommunication = (communicationId: string) => {
    setCommunications(prev => prev.map(comm => 
      comm.id === communicationId 
        ? { ...comm, status: 'sent', sentAt: new Date() }
        : comm
    ));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return '#3b82f6';
      case 'progress-update': return '#10b981';
      case 'concern': return '#ef4444';
      case 'celebration': return '#f59e0b';
      case 'meeting-request': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return '#3b82f6';
      case 'read': return '#10b981';
      case 'replied': return '#059669';
      case 'draft': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h1 style={{ color: '#1e40af', fontSize: '2.5rem', margin: 0 }}>
              💬 Parent Communication System
            </h1>
            <button
              onClick={() => setIsCreating(true)}
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              ✉️ New Message
            </button>
          </div>
          <p style={{ color: '#6b7280', fontSize: '1.1rem', margin: 0 }}>
            Communicate with parents about student progress, celebrations, and concerns
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selectedCommunication ? '1fr 2fr' : '1fr', gap: '2rem' }}>
          {/* Communication List */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            height: 'fit-content'
          }}>
            {/* Filters */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                {(['inbox', 'sent', 'drafts'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      background: viewMode === mode ? '#1e40af' : 'white',
                      color: viewMode === mode ? 'white' : '#374151',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">All Students</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>
                <select
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #d1d5db',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="">All Parents</option>
                  {parents.map(parent => (
                    <option key={parent.id} value={parent.id}>{parent.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Communication List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {getFilteredCommunications().map(communication => (
                <div
                  key={communication.id}
                  onClick={() => setSelectedCommunication(communication)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: selectedCommunication?.id === communication.id ? '2px solid #1e40af' : '1px solid #e5e7eb',
                    cursor: 'pointer',
                    background: selectedCommunication?.id === communication.id ? '#eff6ff' : 'white',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1rem' }}>
                      {communication.title}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        background: getTypeColor(communication.type),
                        color: 'white'
                      }}>
                        {communication.type}
                      </span>
                      <span style={{
                        padding: '0.125rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        background: getPriorityColor(communication.priority),
                        color: 'white'
                      }}>
                        {communication.priority}
                      </span>
                    </div>
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>
                    {communication.studentName} • {communication.parentName}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>
                      {communication.createdAt.toLocaleDateString()}
                    </span>
                    <span style={{
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.25rem',
                      fontSize: '0.75rem',
                      background: getStatusColor(communication.status),
                      color: 'white'
                    }}>
                      {communication.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Detail */}
          {selectedCommunication && (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h2 style={{ color: '#1f2937', fontSize: '1.8rem', margin: 0 }}>
                    {selectedCommunication.title}
                  </h2>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {selectedCommunication.status === 'draft' && (
                      <button
                        onClick={() => handleSendCommunication(selectedCommunication.id)}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Send
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#dbeafe',
                    color: '#1e40af',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedCommunication.type}
                  </span>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#fef3c7',
                    color: '#d97706',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedCommunication.priority}
                  </span>
                  <span style={{
                    padding: '0.5rem 1rem',
                    background: '#dcfce7',
                    color: '#059669',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}>
                    {selectedCommunication.status}
                  </span>
                </div>
                <p style={{ color: '#6b7280', margin: 0 }}>
                  To: {selectedCommunication.parentName} • About: {selectedCommunication.studentName}
                </p>
              </div>

              {/* Message Content */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  Message Content
                </h3>
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '0.5rem',
                  padding: '1.5rem',
                  border: '1px solid #e5e7eb'
                }}>
                  <p style={{ color: '#4b5563', lineHeight: '1.6', margin: 0 }}>
                    {selectedCommunication.content}
                  </p>
                </div>
              </div>

              {/* Cultural Elements */}
              {selectedCommunication.culturalElements.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                    🌿 Cultural Elements
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selectedCommunication.culturalElements.map((element, index) => (
                      <span key={index} style={{
                        padding: '0.5rem 1rem',
                        background: '#ecfdf5',
                        color: '#059669',
                        borderRadius: '0.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid #a7f3d0'
                      }}>
                        {element}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {selectedCommunication.attachments.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                    📎 Attachments
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {selectedCommunication.attachments.map((attachment, index) => (
                      <div key={index} style={{
                        padding: '0.75rem',
                        background: '#f3f4f6',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ color: '#374151' }}>{attachment}</span>
                        <button style={{
                          padding: '0.25rem 0.75rem',
                          background: '#1e40af',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.25rem',
                          cursor: 'pointer',
                          fontSize: '0.75rem'
                        }}>
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <h3 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                  📅 Timeline
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#3b82f6'
                    }}></div>
                    <span style={{ color: '#4b5563' }}>
                      Created: {selectedCommunication.createdAt.toLocaleString()}
                    </span>
                  </div>
                  {selectedCommunication.sentAt && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#10b981'
                      }}></div>
                      <span style={{ color: '#4b5563' }}>
                        Sent: {selectedCommunication.sentAt.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedCommunication.readAt && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#f59e0b'
                      }}></div>
                      <span style={{ color: '#4b5563' }}>
                        Read: {selectedCommunication.readAt.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {selectedCommunication.repliedAt && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: '#059669'
                      }}></div>
                      <span style={{ color: '#4b5563' }}>
                        Replied: {selectedCommunication.repliedAt.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Reply */}
                {selectedCommunication.reply && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                    <h4 style={{ color: '#1f2937', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
                      Parent Reply
                    </h4>
                    <div style={{
                      background: '#f0f9ff',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      border: '1px solid #bae6fd'
                    }}>
                      <p style={{ color: '#1e40af', margin: 0 }}>
                        {selectedCommunication.reply}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Create Communication Modal */}
        {isCreating && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}>
              <h2 style={{ color: '#1f2937', fontSize: '1.5rem', margin: '0 0 1rem 0' }}>
                Create New Communication
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Student
                    </label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="">Select Student</option>
                      {students.map(student => (
                        <option key={student.id} value={student.id}>{student.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Parent
                    </label>
                    <select
                      value={selectedParent}
                      onChange={(e) => setSelectedParent(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="">Select Parent</option>
                      {parents.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Type
                    </label>
                    <select
                      value={newCommunication.type || ''}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, type: e.target.value as any }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="announcement">Announcement</option>
                      <option value="progress-update">Progress Update</option>
                      <option value="concern">Concern</option>
                      <option value="celebration">Celebration</option>
                      <option value="meeting-request">Meeting Request</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                      Priority
                    </label>
                    <select
                      value={newCommunication.priority || ''}
                      onChange={(e) => setNewCommunication(prev => ({ ...prev, priority: e.target.value as any }))}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #d1d5db',
                        fontSize: '1rem'
                      }}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Title
                  </label>
                  <input
                    type="text"
                    value={newCommunication.title || ''}
                    onChange={(e) => setNewCommunication(prev => ({ ...prev, title: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem'
                    }}
                    placeholder="Enter message title"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                    Message
                  </label>
                  <textarea
                    value={newCommunication.content || ''}
                    onChange={(e) => setNewCommunication(prev => ({ ...prev, content: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #d1d5db',
                      fontSize: '1rem',
                      minHeight: '120px',
                      resize: 'vertical'
                    }}
                    placeholder="Enter your message..."
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={handleCreateCommunication}
                    style={{
                      background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      flex: 1
                    }}
                  >
                    Create Communication
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    style={{
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      padding: '1rem 2rem',
                      borderRadius: '0.5rem',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealParentCommunicationSystem;
