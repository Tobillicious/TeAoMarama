import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// VERIFIED WORKING COMPONENTS ONLY
import Navigation from './components/Navigation';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';

// Core Educational Features - VERIFIED
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingParentCommunication from './components/WorkingParentCommunication';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';

// Test component - VERIFIED
import TestComponent from './components/TestComponent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SimpleAuthProvider>
        <EducationProvider>
          <div className="App">
            <Navigation />
            <main style={{ padding: '1rem' }}>
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
                <Routes>
                  {/* Home - VERIFIED WORKING */}
                  <Route path="/" element={<SimpleWorkingHomepage />} />

                  {/* Core Educational Features - VERIFIED WORKING */}
                  <Route path="/teacher" element={<WorkingTeacherDashboard />} />
                  <Route path="/student" element={<WorkingStudentDashboard />} />
                  <Route path="/resources" element={<WorkingResourceBrowser />} />
                  <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
                  <Route path="/create-lesson" element={<WorkingLessonCreator />} />
                  <Route path="/class-management" element={<WorkingClassManagement />} />
                  <Route path="/assessments" element={<WorkingAssessmentTools />} />
                  <Route path="/parent-communication" element={<WorkingParentCommunication />} />

                  {/* Test - VERIFIED WORKING */}
                  <Route path="/test" element={<TestComponent />} />

                  {/* Fallback - VERIFIED WORKING */}
                  <Route path="*" element={<SimpleWorkingHomepage />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </EducationProvider>
      </SimpleAuthProvider>
    </BrowserRouter>
  );
};

export default App;
