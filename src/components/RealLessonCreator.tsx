import React, { useState, useRef } from 'react';

interface LessonComponent {
  id: string;
  type: 'text' | 'image' | 'video' | 'activity' | 'assessment' | 'resource';
  title: string;
  content: string;
  position: { x: number; y: number };
}

interface LessonTemplate {
  id: string;
  name: string;
  description: string;
  components: LessonComponent[];
}

const RealLessonCreator: React.FC = () => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonSubject, setLessonSubject] = useState('');
  const [lessonYearLevel, setLessonYearLevel] = useState('');
  const [lessonDuration, setLessonDuration] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');
  const [components, setComponents] = useState<LessonComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const availableComponents = [
    { type: 'text', icon: '📝', label: 'Text Block', description: 'Add text content' },
    { type: 'image', icon: '🖼️', label: 'Image', description: 'Add images or diagrams' },
    { type: 'video', icon: '🎥', label: 'Video', description: 'Embed videos' },
    { type: 'activity', icon: '🎯', label: 'Activity', description: 'Interactive activities' },
    { type: 'assessment', icon: '📝', label: 'Assessment', description: 'Quizzes and tests' },
    { type: 'resource', icon: '📚', label: 'Resource', description: 'External resources' }
  ];

  const lessonTemplates: LessonTemplate[] = [
    {
      id: '1',
      name: 'Te Reo Māori Basics',
      description: 'Template for Māori language lessons',
      components: [
        {
          id: '1',
          type: 'text',
          title: 'Learning Objectives',
          content: 'Students will learn basic Māori greetings and introductions.',
          position: { x: 50, y: 50 }
        },
        {
          id: '2',
          type: 'activity',
          title: 'Greeting Practice',
          content: 'Practice saying "Kia ora" to each other.',
          position: { x: 50, y: 200 }
        }
      ]
    },
    {
      id: '2',
      name: 'Science Exploration',
      description: 'Template for science lessons with experiments',
      components: [
        {
          id: '1',
          type: 'text',
          title: 'Hypothesis',
          content: 'What do you think will happen?',
          position: { x: 50, y: 50 }
        },
        {
          id: '2',
          type: 'activity',
          title: 'Experiment',
          content: 'Conduct the experiment step by step.',
          position: { x: 50, y: 200 }
        },
        {
          id: '3',
          type: 'assessment',
          title: 'Results Analysis',
          content: 'Record and analyze your results.',
          position: { x: 50, y: 350 }
        }
      ]
    }
  ];

  const addComponent = (type: string) => {
    const newComponent: LessonComponent = {
      id: Date.now().toString(),
      type: type as any,
      title: `New ${type}`,
      content: '',
      position: { x: Math.random() * 400 + 50, y: Math.random() * 300 + 50 }
    };
    setComponents([...components, newComponent]);
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const updateComponent = (id: string, updates: Partial<LessonComponent>) => {
    setComponents(components.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  };

  const handleMouseDown = (e: React.MouseEvent, componentId: string) => {
    e.preventDefault();
    setIsDragging(true);
    setSelectedComponent(componentId);
    
    const component = components.find(c => c.id === componentId);
    if (component && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - component.position.x,
        y: e.clientY - rect.top - component.position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedComponent || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left - dragOffset.x;
    const newY = e.clientY - rect.top - dragOffset.y;
    
    updateComponent(selectedComponent, {
      position: { x: Math.max(0, newX), y: Math.max(0, newY) }
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const loadTemplate = (template: LessonTemplate) => {
    setComponents(template.components.map(comp => ({ ...comp, id: Date.now() + Math.random().toString() })));
    setLessonTitle(template.name);
    setLessonDescription(template.description);
  };

  const saveLesson = () => {
    const lesson = {
      title: lessonTitle,
      subject: lessonSubject,
      yearLevel: lessonYearLevel,
      duration: lessonDuration,
      description: lessonDescription,
      components: components,
      createdAt: new Date().toISOString()
    };
    
    console.log('Saving lesson:', lesson);
    alert('Lesson saved successfully!');
  };

  const exportLesson = () => {
    const lessonData = {
      title: lessonTitle,
      subject: lessonSubject,
      yearLevel: lessonYearLevel,
      duration: lessonDuration,
      description: lessonDescription,
      components: components
    };
    
    const blob = new Blob([JSON.stringify(lessonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lessonTitle.replace(/\s+/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          marginBottom: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            🎨 Lesson Creator
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            Create engaging lessons with drag-and-drop components
          </p>

          {/* Lesson Info */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <input
              type="text"
              placeholder="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
            <select
              value={lessonSubject}
              onChange={(e) => setLessonSubject(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            >
              <option value="">Select Subject</option>
              <option value="Te Reo Māori">Te Reo Māori</option>
              <option value="Science">Science</option>
              <option value="Mathematics">Mathematics</option>
              <option value="English">English</option>
              <option value="Social Studies">Social Studies</option>
              <option value="Arts">Arts</option>
            </select>
            <select
              value={lessonYearLevel}
              onChange={(e) => setLessonYearLevel(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            >
              <option value="">Select Year Level</option>
              <option value="Year 1-2">Year 1-2</option>
              <option value="Year 3-4">Year 3-4</option>
              <option value="Year 5-6">Year 5-6</option>
              <option value="Year 7-8">Year 7-8</option>
              <option value="Year 9-10">Year 9-10</option>
            </select>
            <input
              type="text"
              placeholder="Duration (e.g., 45 minutes)"
              value={lessonDuration}
              onChange={(e) => setLessonDuration(e.target.value)}
              style={{
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          <textarea
            placeholder="Lesson Description"
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1rem',
              minHeight: '100px',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '250px 1fr 300px',
          gap: '2rem',
          height: '600px'
        }}>
          {/* Component Palette */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              🧩 Components
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {availableComponents.map(component => (
                <button
                  key={component.type}
                  onClick={() => addComponent(component.type)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '10px',
                    padding: '1rem',
                    color: 'white',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    {component.icon}
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                    {component.label}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                    {component.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Canvas */}
          <div
            ref={canvasRef}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {components.length === 0 && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '1.2rem'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
                <div>Drag components here to start building your lesson</div>
              </div>
            )}

            {components.map(component => (
              <div
                key={component.id}
                style={{
                  position: 'absolute',
                  left: component.position.x,
                  top: component.position.y,
                  background: selectedComponent === component.id 
                    ? 'rgba(74, 222, 128, 0.3)' 
                    : 'rgba(255, 255, 255, 0.2)',
                  border: selectedComponent === component.id 
                    ? '2px solid #4ade80' 
                    : '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '15px',
                  padding: '1.5rem',
                  minWidth: '200px',
                  maxWidth: '300px',
                  cursor: 'grab',
                  transition: 'all 0.2s',
                  color: 'white'
                }}
                onMouseDown={(e) => handleMouseDown(e, component.id)}
                onClick={() => setSelectedComponent(component.id)}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>
                    {availableComponents.find(c => c.type === component.type)?.icon}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteComponent(component.id);
                    }}
                    style={{
                      background: 'rgba(239, 68, 68, 0.3)',
                      border: 'none',
                      borderRadius: '5px',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.8rem',
                      cursor: 'pointer'
                    }}
                  >
                    ✕
                  </button>
                </div>
                <input
                  type="text"
                  value={component.title}
                  onChange={(e) => updateComponent(component.id, { title: e.target.value })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    width: '100%',
                    marginBottom: '0.5rem'
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <textarea
                  value={component.content}
                  onChange={(e) => updateComponent(component.id, { content: e.target.value })}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.9rem',
                    width: '100%',
                    minHeight: '60px',
                    resize: 'vertical'
                  }}
                  placeholder="Component content..."
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            ))}
          </div>

          {/* Templates & Actions */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {/* Templates */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                📋 Templates
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {lessonTemplates.map(template => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '10px',
                      padding: '1rem',
                      color: 'white',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>
                      {template.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                      {template.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                ⚡ Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button
                  onClick={saveLesson}
                  style={{
                    background: 'linear-gradient(45deg, #4ade80, #22c55e)',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '1rem',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  💾 Save Lesson
                </button>
                <button
                  onClick={exportLesson}
                  style={{
                    background: 'rgba(59, 130, 246, 0.3)',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    borderRadius: '10px',
                    padding: '1rem',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  📤 Export Lesson
                </button>
                <button
                  onClick={() => {
                    setComponents([]);
                    setLessonTitle('');
                    setLessonDescription('');
                    setSelectedComponent(null);
                  }}
                  style={{
                    background: 'rgba(239, 68, 68, 0.3)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    borderRadius: '10px',
                    padding: '1rem',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  🗑️ Clear All
                </button>
              </div>
            </div>

            {/* Lesson Stats */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem'
              }}>
                📊 Lesson Stats
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem'
                }}>
                  <span>Components:</span>
                  <span style={{ fontWeight: 'bold' }}>{components.length}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem'
                }}>
                  <span>Words:</span>
                  <span style={{ fontWeight: 'bold' }}>
                    {components.reduce((sum, comp) => sum + comp.content.split(' ').length, 0)}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.9rem'
                }}>
                  <span>Status:</span>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: components.length > 0 ? '#4ade80' : '#f59e0b'
                  }}>
                    {components.length > 0 ? 'Ready' : 'Empty'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealLessonCreator;
