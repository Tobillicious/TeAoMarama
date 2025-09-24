import React, { useState } from 'react';

const ProfessionalTeacherOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '10px' }}>
            🌿 Welcome to Te Ao Mārama
          </h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
            Join New Zealand's premier educational platform
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}
          >
            Full Name *
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}
          >
            Email Address *
          </label>
          <input
            type="email"
            placeholder="your.email@school.nz"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}
          >
            School/Institution *
          </label>
          <input
            type="text"
            placeholder="Your school or institution name"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}
          >
            Teaching Level *
          </label>
          <select
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          >
            <option>Primary Years 1-6</option>
            <option>Intermediate Years 7-8</option>
            <option>Secondary Years 9-13</option>
            <option>Early Childhood</option>
            <option>Mixed Levels</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}
          >
            Primary Subject Areas
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {[
              'English',
              'Mathematics',
              'Science',
              'Social Studies',
              'The Arts',
              'Health & PE',
              'Technology',
              'Te Reo Māori',
            ].map((subject) => (
              <label
                key={subject}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <input type="checkbox" style={{ marginRight: '8px' }} />
                <span style={{ fontSize: '0.9rem' }}>{subject}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label
            style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}
          >
            Te Reo Māori Proficiency
          </label>
          <select
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          >
            <option>Beginner - Learning basic kupu</option>
            <option>Intermediate - Simple conversations</option>
            <option>Advanced - Comfortable communication</option>
            <option>Fluent - Native or near-native</option>
          </select>
        </div>

        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '25px',
          }}
        >
          <h4 style={{ color: '#065f46', marginBottom: '8px', fontSize: '1rem' }}>
            🤝 Cultural Safety Commitment
          </h4>
          <p style={{ color: '#047857', fontSize: '0.9rem', lineHeight: '1.4', margin: 0 }}>
            Our platform ensures all resources are culturally appropriate and tikanga-compliant,
            supporting both Māori and non-Māori educators.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = '/teacher')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
            color: 'white',
            border: 'none',
            padding: '15px',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Complete Setup & Access Dashboard
        </button>

        <p
          style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', marginTop: '15px' }}
        >
          By joining, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default ProfessionalTeacherOnboarding;
