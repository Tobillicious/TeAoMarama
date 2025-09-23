import React, { useState } from 'react';

const WorkingClassManagement: React.FC = () => {
  const [classes, setClasses] = useState([
    {
      id: 1,
      name: 'Year 8 Mathematics',
      subject: 'Mathematics',
      yearLevel: 'Year 8',
      students: 24,
      teacher: 'Ms. Johnson',
      room: 'Room 12',
      schedule: 'Mon, Wed, Fri 9:00 AM',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Year 9 Science',
      subject: 'Science',
      yearLevel: 'Year 9',
      students: 22,
      teacher: 'Mr. Smith',
      room: 'Lab 3',
      schedule: 'Tue, Thu 10:30 AM',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Year 7 English',
      subject: 'English',
      yearLevel: 'Year 7',
      students: 26,
      teacher: 'Ms. Brown',
      room: 'Room 8',
      schedule: 'Daily 11:15 AM',
      status: 'Active',
    },
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Aroha Williams',
      class: 'Year 8 Mathematics',
      yearLevel: 'Year 8',
      attendance: 95,
      lastSeen: '2024-01-15',
      status: 'Present',
      parentContact: 'parent@email.com',
    },
    {
      id: 2,
      name: 'James Mitchell',
      class: 'Year 8 Mathematics',
      yearLevel: 'Year 8',
      attendance: 88,
      lastSeen: '2024-01-14',
      status: 'Absent',
      parentContact: 'parent2@email.com',
    },
    {
      id: 3,
      name: 'Sofia Chen',
      class: 'Year 9 Science',
      yearLevel: 'Year 9',
      attendance: 98,
      lastSeen: '2024-01-15',
      status: 'Present',
      parentContact: 'parent3@email.com',
    },
  ]);

  const [newClass, setNewClass] = useState({
    name: '',
    subject: '',
    yearLevel: '',
    room: '',
    schedule: '',
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const handleCreateClass = () => {
    if (newClass.name && newClass.subject && newClass.yearLevel) {
      const classData = {
        id: classes.length + 1,
        ...newClass,
        students: 0,
        teacher: 'Current User',
        status: 'Active',
      };
      setClasses([...classes, classData]);
      setNewClass({
        name: '',
        subject: '',
        yearLevel: '',
        room: '',
        schedule: '',
      });
      setShowCreateForm(false);
    }
  };

  const filteredStudents = selectedClass
    ? students.filter(
        (student) => student.class === classes.find((c) => c.id === selectedClass)?.name,
      )
    : students;

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
            🏫 Class Management
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#4a5568',
              margin: '0',
            }}
          >
            Manage your classes, students, and classroom activities
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{classes.length}</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Active Classes</p>
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>{students.length}</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Total Students</p>
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>94%</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Average Attendance</p>
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
            <h3 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>3</h3>
            <p style={{ margin: '0', fontSize: '1rem' }}>Subjects Taught</p>
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
            onClick={() => setShowCreateForm(true)}
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
            ➕ Create New Class
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
            👥 Add Students
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
            📊 Attendance Report
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
            📧 Parent Communication
          </button>
        </div>

        {/* Create Class Form */}
        {showCreateForm && (
          <div
            style={{
              background: 'rgba(102, 126, 234, 0.1)',
              padding: '25px',
              borderRadius: '15px',
              marginBottom: '30px',
              border: '2px solid #667eea',
            }}
          >
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Create New Class</h3>
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
                  Class Name
                </label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  placeholder="e.g., Year 8 Mathematics"
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
                  Subject
                </label>
                <select
                  value={newClass.subject}
                  onChange={(e) => setNewClass({ ...newClass, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Science">Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Te Reo Māori">Te Reo Māori</option>
                  <option value="Art">Art</option>
                  <option value="Physical Education">Physical Education</option>
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
                  Year Level
                </label>
                <select
                  value={newClass.yearLevel}
                  onChange={(e) => setNewClass({ ...newClass, yearLevel: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                >
                  <option value="">Select Year Level</option>
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                  <option value="Year 5">Year 5</option>
                  <option value="Year 6">Year 6</option>
                  <option value="Year 7">Year 7</option>
                  <option value="Year 8">Year 8</option>
                  <option value="Year 9">Year 9</option>
                  <option value="Year 10">Year 10</option>
                  <option value="Year 11">Year 11</option>
                  <option value="Year 12">Year 12</option>
                  <option value="Year 13">Year 13</option>
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
                  Room
                </label>
                <input
                  type="text"
                  value={newClass.room}
                  onChange={(e) => setNewClass({ ...newClass, room: e.target.value })}
                  placeholder="e.g., Room 12"
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
                  Schedule
                </label>
                <input
                  type="text"
                  value={newClass.schedule}
                  onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                  placeholder="e.g., Mon, Wed, Fri 9:00 AM"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                onClick={handleCreateClass}
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
                Create Class
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
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

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
          }}
        >
          {/* Classes Section */}
          <div>
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>Your Classes</h3>
            <div
              style={{
                display: 'grid',
                gap: '20px',
              }}
            >
              {classes.map((classItem) => (
                <div
                  key={classItem.id}
                  style={{
                    background:
                      selectedClass === classItem.id ? 'rgba(102, 126, 234, 0.1)' : 'white',
                    border:
                      selectedClass === classItem.id ? '2px solid #667eea' : '2px solid #e2e8f0',
                    borderRadius: '15px',
                    padding: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  }}
                  onClick={() => setSelectedClass(classItem.id)}
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
                          fontSize: '1.2rem',
                          color: '#2d3748',
                        }}
                      >
                        {classItem.name}
                      </h4>
                      <p
                        style={{
                          margin: '0',
                          color: '#4a5568',
                          fontSize: '0.9rem',
                        }}
                      >
                        {classItem.subject} • {classItem.yearLevel}
                      </p>
                    </div>
                    <div
                      style={{
                        background: classItem.status === 'Active' ? '#48bb78' : '#ed8936',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {classItem.status}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '10px',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div>
                      <strong style={{ color: '#4a5568' }}>Students:</strong>
                      <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                        {classItem.students}
                      </span>
                    </div>
                    <div>
                      <strong style={{ color: '#4a5568' }}>Room:</strong>
                      <span style={{ marginLeft: '5px', color: '#2d3748' }}>{classItem.room}</span>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <strong style={{ color: '#4a5568' }}>Schedule:</strong>
                      <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                        {classItem.schedule}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students Section */}
          <div>
            <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>
              Students{' '}
              {selectedClass
                ? `- ${classes.find((c) => c.id === selectedClass)?.name}`
                : '- All Classes'}
            </h3>
            <div
              style={{
                display: 'grid',
                gap: '15px',
                maxHeight: '600px',
                overflowY: 'auto',
              }}
            >
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  style={{
                    background: 'white',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '15px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <h5
                      style={{
                        margin: '0',
                        fontSize: '1.1rem',
                        color: '#2d3748',
                      }}
                    >
                      {student.name}
                    </h5>
                    <div
                      style={{
                        background: student.status === 'Present' ? '#48bb78' : '#ed8936',
                        color: 'white',
                        padding: '3px 10px',
                        borderRadius: '12px',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                      }}
                    >
                      {student.status}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '8px',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div>
                      <strong style={{ color: '#4a5568' }}>Class:</strong>
                      <span style={{ marginLeft: '5px', color: '#2d3748' }}>{student.class}</span>
                    </div>
                    <div>
                      <strong style={{ color: '#4a5568' }}>Attendance:</strong>
                      <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                        {student.attendance}%
                      </span>
                    </div>
                    <div>
                      <strong style={{ color: '#4a5568' }}>Last Seen:</strong>
                      <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                        {student.lastSeen}
                      </span>
                    </div>
                    <div>
                      <strong style={{ color: '#4a5568' }}>Parent:</strong>
                      <span style={{ marginLeft: '5px', color: '#2d3748' }}>
                        {student.parentContact}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
            🌿 Inclusive Classroom Management
          </h4>
          <p style={{ margin: '0', color: '#4a5568', fontSize: '1rem' }}>
            Our class management system supports cultural safety, inclusive practices, and
            respectful communication with all students and their whānau.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkingClassManagement;
