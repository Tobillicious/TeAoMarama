import React, { useState } from 'react';
import { useEducation } from '../contexts/EducationContext';

const WorkingLessonCreator: React.FC = () => {
  const { addResource } = useEducation();
  const [lessonData, setLessonData] = useState({
    title: '',
    yearLevel: '',
    subject: '',
    duration: '60 minutes',
    objectives: '',
    culturalIntegration: '',
    activities: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSaveLesson = async () => {
    if (!lessonData.title || !lessonData.yearLevel || !lessonData.subject || !lessonData.objectives) {
      setSaveMessage('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setSaveMessage('');

    try {
      // Calculate cultural safety score (simple version)
      const culturalKeywords = ['te reo', 'māori', 'tikanga', 'whānau', 'iwi', 'hapū', 'tangata whenua'];
      const contentLower = `${lessonData.objectives} ${lessonData.culturalIntegration} ${lessonData.activities}`.toLowerCase();
      const culturalSafetyScore = Math.min(100, culturalKeywords.reduce((acc, keyword) => {
        return contentLower.includes(keyword) ? acc + 10 : acc;
      }, 70));

      // Create new resource
      const newResource = {
        id: `lesson-${Date.now()}`,
        title: lessonData.title,
        type: 'lesson-plan' as const,
        subject: lessonData.subject,
        yearLevel: lessonData.yearLevel,
        description: lessonData.objectives,
        tags: [lessonData.subject.toLowerCase(), lessonData.yearLevel.toLowerCase()],
        culturalElements: lessonData.culturalIntegration ? [lessonData.culturalIntegration] : [],
        author: 'Te Ao Mārama Teacher',
        school: 'Local School',
        rating: 0,
        downloads: 0,
        fileSize: '1.2 MB',
        duration: lessonData.duration,
        difficulty: 'intermediate' as const,
        lastUpdated: new Date().toISOString().split('T')[0],
        isPremium: false,
        thumbnail: '📝'
      };

      // Add to context
      addResource(newResource);
      
      setSaveMessage(`✅ Lesson saved successfully! Cultural Safety Score: ${culturalSafetyScore}%`);
      
      // Reset form
      setLessonData({
        title: '',
        yearLevel: '',
        subject: '',
        duration: '60 minutes',
        objectives: '',
        culturalIntegration: '',
        activities: ''
      });
    } catch (error) {
      setSaveMessage('❌ Error saving lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCulturalReview = () => {
    const culturalKeywords = ['te reo', 'māori', 'tikanga', 'whānau', 'iwi', 'hapū', 'tangata whenua'];
    const contentLower = `${lessonData.objectives} ${lessonData.culturalIntegration} ${lessonData.activities}`.toLowerCase();
    const culturalScore = Math.min(100, culturalKeywords.reduce((acc, keyword) => {
      return contentLower.includes(keyword) ? acc + 10 : acc;
    }, 70));
    setSaveMessage(`🌿 Cultural Safety Analysis: ${culturalScore}% - ${culturalScore >= 90 ? 'Excellent cultural integration!' : culturalScore >= 80 ? 'Good, consider adding more Māori perspectives' : 'Needs more cultural content'}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '10px' }}>
            📝 Create New Lesson
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Build curriculum-aligned lessons with integrated Te Ao Māori perspectives
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
              Lesson Title *
            </label>
            <input
              type="text"
              value={lessonData.title}
              onChange={(e) => setLessonData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Te Tiriti o Waitangi - Founding Documents"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
              Year Level *
            </label>
            <select
              value={lessonData.yearLevel}
              onChange={(e) => setLessonData(prev => ({ ...prev, yearLevel: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select year level</option>
              <option value="Y8">Year 8</option>
              <option value="Y9">Year 9</option>
              <option value="Y10">Year 10</option>
              <option value="Y11">Year 11</option>
              <option value="Y12">Year 12</option>
              <option value="Y13">Year 13</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
              Subject Area *
            </label>
            <select
              value={lessonData.subject}
              onChange={(e) => setLessonData(prev => ({ ...prev, subject: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select subject</option>
              <option value="Social Studies">Social Studies</option>
              <option value="English">English</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Te Reo Māori">Te Reo Māori</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
            Learning Objectives *
          </label>
          <textarea
            value={lessonData.objectives}
            onChange={(e) => setLessonData(prev => ({ ...prev, objectives: e.target.value }))}
            placeholder="What will students learn? Align with NZ Curriculum Achievement Objectives..."
            style={{
              width: '100%',
              height: '100px',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ 
          background: '#ecfdf5', 
          border: '2px solid #10b981', 
          borderRadius: '12px', 
          padding: '20px',
          marginBottom: '25px'
        }}>
          <h3 style={{ color: '#065f46', marginBottom: '10px', fontSize: '1.2rem' }}>
            🌿 Cultural Integration
          </h3>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#047857' }}>
            Te Ao Māori Perspectives & Cultural Elements
          </label>
          <textarea
            value={lessonData.culturalIntegration}
            onChange={(e) => setLessonData(prev => ({ ...prev, culturalIntegration: e.target.value }))}
            placeholder="How will this lesson incorporate Māori worldviews, values, and perspectives?"
            style={{
              width: '100%',
              height: '80px',
              padding: '12px',
              border: '2px solid #10b981',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              resize: 'vertical',
              background: 'white'
            }}
          />
          <p style={{ color: '#047857', fontSize: '0.9rem', marginTop: '8px', margin: '8px 0 0 0' }}>
            Cultural integration is central to our platform. Consider how Māori knowledge systems can enhance learning.
          </p>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
            Learning Activities & Sequence
          </label>
          <textarea
            value={lessonData.activities}
            onChange={(e) => setLessonData(prev => ({ ...prev, activities: e.target.value }))}
            placeholder="Describe the lesson sequence, activities, and teaching strategies..."
            style={{
              width: '100%',
              height: '120px',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
              resize: 'vertical'
            }}
          />
        </div>

        {saveMessage && (
          <div style={{
            background: saveMessage.includes('❌') ? '#fef2f2' : saveMessage.includes('🌿') ? '#ecfdf5' : '#f0f9ff',
            border: `2px solid ${saveMessage.includes('❌') ? '#ef4444' : saveMessage.includes('🌿') ? '#10b981' : '#0ea5e9'}`,
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px',
            textAlign: 'center' as const,
            color: saveMessage.includes('❌') ? '#dc2626' : saveMessage.includes('🌿') ? '#047857' : '#0369a1',
            fontWeight: 'bold'
          }}>
            {saveMessage}
          </div>
        )}

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleSaveLesson}
            disabled={isLoading}
            style={{
              background: isLoading ? '#94a3b8' : 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? '⏳ Saving...' : '💾 Save Lesson Plan'}
          </button>
          
          <button
            onClick={() => setSaveMessage('📋 Template functionality coming soon!')}
            style={{
              background: 'transparent',
              color: '#1e40af',
              border: '2px solid #1e40af',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            📋 Save as Template
          </button>

          <button
            onClick={handleCulturalReview}
            style={{
              background: '#8b5cf6',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            🌿 Cultural Review
          </button>
        </div>

        <div style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          borderRadius: '8px',
          padding: '15px',
          marginTop: '25px'
        }}>
          <h4 style={{ color: '#0c4a6e', marginBottom: '8px', fontSize: '1rem' }}>
            💡 Lesson Planning Tips
          </h4>
          <ul style={{ color: '#0369a1', fontSize: '0.9rem', margin: 0, paddingLeft: '20px' }}>
            <li>Connect learning to students' lives and communities</li>
            <li>Include opportunities for student voice and choice</li>
            <li>Consider different learning styles and cultural perspectives</li>
            <li>Plan for both individual and collaborative work</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WorkingLessonCreator;