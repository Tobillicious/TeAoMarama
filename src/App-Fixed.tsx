import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';

// Minimal lazy-loaded components to prevent bundle issues
const WorkingHomepage = React.lazy(() => import('./components/WorkingHomepage'));
const WorkingStudentDashboard = React.lazy(() => import('./components/WorkingStudentDashboard'));
const WorkingTeacherDashboard = React.lazy(() => import('./components/WorkingTeacherDashboard'));
const AssessmentWorkflow = React.lazy(() => import('./components/AssessmentWorkflow'));

// Simple loading component
const LoadingSpinner = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
    }}
  >
    <div
      style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid #f3f4f6',
          borderTop: '4px solid #1e40af',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px',
        }}
      ></div>
      <h2 style={{ color: '#1e40af', margin: '0 0 10px 0' }}>🌿 Loading Te Ao Mārama</h2>
      <p style={{ color: '#6b7280', margin: 0 }}>Initializing educational platform...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <EducationProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<WorkingHomepage />} />
          <Route path="/student" element={<WorkingStudentDashboard />} />
          <Route path="/teacher" element={<WorkingTeacherDashboard />} />
          <Route path="/assessment-workflow" element={<AssessmentWorkflow />} />
          {/* Fallback route */}
          <Route path="*" element={<WorkingHomepage />} />
        </Routes>
      </Suspense>
    </EducationProvider>
  );
};

export default App;
