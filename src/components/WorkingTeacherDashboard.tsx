import { BookOpen, CheckCircle, Plus, Star, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Lesson {
  id: string;
  title: string;
  subject: string;
  yearLevel: string;
  duration: string;
  completed: boolean;
  studentsCompleted: number;
  totalStudents: number;
  rating: number;
  lastUsed: string;
}

interface Student {
  id: string;
  name: string;
  progress: number;
  lastActive: string;
  completedLessons: number;
}

const WorkingTeacherDashboard: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Te Tiriti o Waitangi Unit',
      subject: 'Social Studies',
      yearLevel: 'Year 8',
      duration: '4-6 weeks',
      completed: false,
      studentsCompleted: 12,
      totalStudents: 28,
      rating: 4.9,
      lastUsed: '2 days ago',
    },
    {
      id: '2',
      title: 'Kākāpō Conservation Science',
      subject: 'Science',
      yearLevel: 'Year 8',
      duration: '3-4 weeks',
      completed: true,
      studentsCompleted: 28,
      totalStudents: 28,
      rating: 4.8,
      lastUsed: '1 week ago',
    },
    {
      id: '3',
      title: 'NZ Census Data Analysis',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      duration: '2-3 weeks',
      completed: false,
      studentsCompleted: 8,
      totalStudents: 28,
      rating: 4.7,
      lastUsed: '3 days ago',
    },
  ]);

  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'Aroha Smith', progress: 85, lastActive: '2 hours ago', completedLessons: 12 },
    { id: '2', name: 'James Chen', progress: 92, lastActive: '1 hour ago', completedLessons: 14 },
    {
      id: '3',
      name: 'Maria Rodriguez',
      progress: 78,
      lastActive: '4 hours ago',
      completedLessons: 10,
    },
    {
      id: '4',
      name: 'Tama Williams',
      progress: 95,
      lastActive: '30 minutes ago',
      completedLessons: 15,
    },
    {
      id: '5',
      name: 'Sarah Mitchell',
      progress: 88,
      lastActive: '3 hours ago',
      completedLessons: 13,
    },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const totalStudents = students.length;
  const averageProgress = Math.round(
    students.reduce((sum, s) => sum + s.progress, 0) / totalStudents,
  );
  const activeLessons = lessons.filter((l) => !l.completed).length;
  const completedLessons = lessons.filter((l) => l.completed).length;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px 40px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1
            style={{
              color: '#059669',
              fontSize: '2rem',
              margin: 0,
              fontWeight: 'bold',
            }}
          >
            👨‍🏫 Teacher Dashboard
          </h1>
          <p style={{ color: '#64748b', margin: '5px 0 0 0' }}>
            Welcome back! Here's your classroom overview.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e40af' }}>
              {currentTime.toLocaleTimeString()}
            </div>
            <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
              {currentTime.toLocaleDateString()}
            </div>
          </div>
          <button
            style={{
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Plus size={16} />
            New Lesson
          </button>
        </div>
      </div>

      <div style={{ padding: '40px' }}>
        {/* Stats Overview */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#dbeafe',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <Users style={{ color: '#1e40af', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e40af' }}>
                  {totalStudents}
                </div>
                <div style={{ color: '#64748b' }}>Total Students</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#dcfce7',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <TrendingUp style={{ color: '#16a34a', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
                  {averageProgress}%
                </div>
                <div style={{ color: '#64748b' }}>Average Progress</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#fef3c7',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <BookOpen style={{ color: '#d97706', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>
                  {activeLessons}
                </div>
                <div style={{ color: '#64748b' }}>Active Lessons</div>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div
                style={{
                  backgroundColor: '#e0e7ff',
                  padding: '12px',
                  borderRadius: '8px',
                }}
              >
                <CheckCircle style={{ color: '#7c3aed', width: '24px', height: '24px' }} />
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#7c3aed' }}>
                  {completedLessons}
                </div>
                <div style={{ color: '#64748b' }}>Completed Lessons</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '30px',
          }}
        >
          {/* Lessons Section */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '25px',
              }}
            >
              <h2 style={{ color: '#1e40af', fontSize: '1.5rem', margin: 0 }}>📚 My Lessons</h2>
              <button
                style={{
                  backgroundColor: '#1e40af',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Plus size={16} />
                Add Lesson
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  style={{
                    padding: '20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: lesson.completed ? '#f0fdf4' : '#fefefe',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '10px',
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          color: '#1e40af',
                          fontSize: '1.2rem',
                          margin: '0 0 5px 0',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        {lesson.title}
                        {lesson.completed && <CheckCircle size={16} style={{ color: '#16a34a' }} />}
                      </h3>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                        {lesson.subject} • {lesson.yearLevel} • {lesson.duration}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={16} style={{ color: '#fbbf24' }} />
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{lesson.rating}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      Progress: {lesson.studentsCompleted}/{lesson.totalStudents} students
                    </div>
                    <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                      Last used: {lesson.lastUsed}
                    </div>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${(lesson.studentsCompleted / lesson.totalStudents) * 100}%`,
                        height: '100%',
                        backgroundColor: lesson.completed ? '#16a34a' : '#3b82f6',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students Section */}
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: '1px solid #e2e8f0',
            }}
          >
            <h2 style={{ color: '#1e40af', fontSize: '1.5rem', margin: '0 0 25px 0' }}>
              👥 Student Progress
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {students.map((student) => (
                <div
                  key={student.id}
                  style={{
                    padding: '15px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    backgroundColor: '#fefefe',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ fontWeight: '600', color: '#1e40af' }}>{student.name}</div>
                    <div style={{ color: '#16a34a', fontSize: '0.9rem', fontWeight: '600' }}>
                      {student.progress}%
                    </div>
                  </div>

                  <div
                    style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: '#e2e8f0',
                      borderRadius: '2px',
                      overflow: 'hidden',
                      marginBottom: '5px',
                    }}
                  >
                    <div
                      style={{
                        width: `${student.progress}%`,
                        height: '100%',
                        backgroundColor: '#16a34a',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.8rem',
                      color: '#64748b',
                    }}
                  >
                    <span>{student.completedLessons} lessons</span>
                    <span>{student.lastActive}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingTeacherDashboard;
