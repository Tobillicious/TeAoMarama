import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/useAuth';
import { EducationProvider } from './contexts/EducationContext';

// Minimal lazy-loaded components to prevent bundle issues
const SimpleWorkingHomepage = React.lazy(() => import('./components/SimpleWorkingHomepage'));
const WorkingStudentDashboard = React.lazy(() => import('./components/WorkingStudentDashboard'));
const WorkingTeacherDashboard = React.lazy(() => import('./components/WorkingTeacherDashboard'));
const WorkingLessonCreator = React.lazy(() => import('./components/WorkingLessonCreator'));
const WorkingResourceBrowser = React.lazy(() => import('./components/WorkingResourceBrowser'));
const WorkingAnalyticsDashboard = React.lazy(
  () => import('./components/WorkingAnalyticsDashboard'),
);
const WorkingClassManagement = React.lazy(() => import('./components/WorkingClassManagement'));
const WorkingAssessmentTools = React.lazy(() => import('./components/WorkingAssessmentTools'));
const WorkingParentCommunication = React.lazy(
  () => import('./components/WorkingParentCommunication'),
);
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
    <AuthProvider>
      <EducationProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<SimpleWorkingHomepage />} />
            <Route path="/student" element={<WorkingStudentDashboard />} />
            <Route path="/teacher" element={<WorkingTeacherDashboard />} />
            <Route path="/create-lesson" element={<WorkingLessonCreator />} />
            <Route path="/resources" element={<WorkingResourceBrowser />} />
            <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
            <Route path="/class-management" element={<WorkingClassManagement />} />
            <Route path="/assessments" element={<WorkingAssessmentTools />} />
            <Route path="/parent-communication" element={<WorkingParentCommunication />} />
            <Route path="/assessment-workflow" element={<AssessmentWorkflow />} />
            {/* Fallback route */}
            <Route path="*" element={<SimpleWorkingHomepage />} />
          </Routes>
        </Suspense>
      </EducationProvider>
    </AuthProvider>
  );
};

export default App;
