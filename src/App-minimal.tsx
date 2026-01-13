import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// Essential components only
import Navigation from './components/Navigation';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingParentCommunication from './components/WorkingParentCommunication';

// AI Systems - Essential only
import SupremeOverseerDashboard from './components/SupremeOverseerDashboard';
import UnifiedAgentCoordinationDashboard from './components/UnifiedAgentCoordinationDashboard';
import GLMSymphonyDashboard from './components/GLMSymphonyDashboard';

// Test component
import TestComponent from './components/TestComponent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SimpleAuthProvider>
        <EducationProvider>
          <div className="App">
            <Navigation />
            <main>
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <Routes>
                  {/* Home */}
                  <Route path="/" element={<SimpleWorkingHomepage />} />
                  
                  {/* Core Educational Features */}
                  <Route path="/teacher" element={<WorkingTeacherDashboard />} />
                  <Route path="/student" element={<WorkingStudentDashboard />} />
                  <Route path="/resources" element={<WorkingResourceBrowser />} />
                  <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
                  <Route path="/create-lesson" element={<WorkingLessonCreator />} />
                  <Route path="/class-management" element={<WorkingClassManagement />} />
                  <Route path="/assessments" element={<WorkingAssessmentTools />} />
                  <Route path="/parent-communication" element={<WorkingParentCommunication />} />
                  
                  {/* AI Systems */}
                  <Route path="/supreme-overseer" element={<SupremeOverseerDashboard />} />
                  <Route path="/unified-coordination" element={<UnifiedAgentCoordinationDashboard />} />
                  <Route path="/glm-symphony" element={<GLMSymphonyDashboard />} />
                  
                  {/* Test */}
                  <Route path="/test" element={<TestComponent />} />
                  
                  {/* Fallback */}
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
