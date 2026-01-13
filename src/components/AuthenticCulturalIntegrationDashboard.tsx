import React, { useState } from 'react';
import AuthenticCulturalIntegrationSystem from '../utils/authentic-cultural-integration';

const AuthenticCulturalIntegrationDashboard: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('social-studies');
  const [selectedLevel, setSelectedLevel] = useState('Year 9');
  const [integrationReport, setIntegrationReport] = useState<string>('');

  const subjects = [
    { id: 'social-studies', name: 'Social Studies' },
    { id: 'science', name: 'Science' },
    { id: 'mathematics', name: 'Mathematics' },
    { id: 'english', name: 'English' },
  ];

  const levels = [
    'Year 1',
    'Year 2',
    'Year 3',
    'Year 4',
    'Year 5',
    'Year 6',
    'Year 7',
    'Year 8',
    'Year 9',
    'Year 10',
    'Year 11',
    'Year 12',
    'Year 13',
  ];

  const generateIntegrationReport = () => {
    const mockLesson = {
      id: `lesson-${Date.now()}`,
      title: `${selectedSubject} - Cultural Integration Example`,
      subject: selectedSubject,
      level: selectedLevel,
    };

    const report = AuthenticCulturalIntegrationSystem.generateCulturalIntegrationReport(mockLesson);
    setIntegrationReport(report);
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
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              color: '#1e40af',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px',
            }}
          >
            🌿 Authentic Cultural Integration System
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', margin: 0 }}>
            Deep integration of Te Ao Māori principles into educational practice
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '40px',
          }}
        >
          <div>
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Subject Selection</h3>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
              }}
            >
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 style={{ color: '#1e40af', marginBottom: '15px' }}>Year Level</h3>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
              }}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <button
            onClick={generateIntegrationReport}
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}
          >
            🎯 Generate Cultural Integration Report
          </button>
        </div>

        {integrationReport && (
          <div
            style={{
              background: '#f8fafc',
              borderRadius: '15px',
              padding: '30px',
              border: '2px solid #e2e8f0',
            }}
          >
            <h3 style={{ color: '#1e40af', marginBottom: '20px' }}>Cultural Integration Report</h3>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                color: '#374151',
              }}
            >
              {integrationReport}
            </pre>
          </div>
        )}

        <div
          style={{
            marginTop: '40px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            borderRadius: '15px',
            border: '2px solid #0ea5e9',
          }}
        >
          <h3 style={{ color: '#0c4a6e', marginBottom: '15px' }}>🌿 Core Cultural Principles</h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px',
            }}
          >
            {[
              { name: 'Whakapapa', translation: 'Genealogy, interconnectedness' },
              { name: 'Kaitiakitanga', translation: 'Guardianship, stewardship' },
              { name: 'Manaakitanga', translation: 'Hospitality, care for others' },
              { name: 'Whanaungatanga', translation: 'Relationships, connections' },
              { name: 'Mana', translation: 'Spiritual power, authority' },
              { name: 'Tikanga', translation: 'Correct way, protocols' },
            ].map((principle) => (
              <div
                key={principle.name}
                style={{
                  background: 'white',
                  padding: '15px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                }}
              >
                <strong style={{ color: '#1e40af' }}>{principle.name}</strong>
                <br />
                <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                  {principle.translation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticCulturalIntegrationDashboard;
