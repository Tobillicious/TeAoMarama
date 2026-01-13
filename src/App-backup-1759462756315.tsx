import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// PHASE 1: VERIFIED WORKING COMPONENTS
import Navigation from './components/Navigation';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';

// Core Educational Features - VERIFIED WORKING
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingParentCommunication from './components/WorkingParentCommunication';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';

// Test component - VERIFIED WORKING
import TestComponent from './components/TestComponent';

// PHASE 2: TREASURE COMPONENTS TO TEST
import TreasureHuntDashboard from './components/TreasureHuntDashboard';
import TreasureInventoryDashboard from './components/TreasureInventoryDashboard';
import TreasureIntegrationDashboard from './components/TreasureIntegrationDashboard';

// PHASE 2: COORDINATION SYSTEMS TO TEST
import HarmonyCoordinationDashboardSimple from './components/HarmonyCoordinationDashboardSimple';
import IntelligenceKingdomDashboard from './components/IntelligenceKingdomDashboard';

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
                  {/* PHASE 1: VERIFIED WORKING ROUTES */}
                  <Route path="/" element={<SimpleWorkingHomepage />} />
                  <Route path="/teacher" element={<WorkingTeacherDashboard />} />
                  <Route path="/student" element={<WorkingStudentDashboard />} />
                  <Route path="/resources" element={<WorkingResourceBrowser />} />
                  <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
                  <Route path="/create-lesson" element={<WorkingLessonCreator />} />
                  <Route path="/class-management" element={<WorkingClassManagement />} />
                  <Route path="/assessments" element={<WorkingAssessmentTools />} />
                  <Route path="/parent-communication" element={<WorkingParentCommunication />} />
                  <Route path="/test" element={<TestComponent />} />

                  {/* PHASE 2: TREASURE HUNT - TESTING */}
                  <Route path="/treasure-hunt" element={<TreasureHuntDashboard />} />
                  <Route path="/treasure-inventory" element={<TreasureInventoryDashboard />} />
                  <Route path="/treasure-integration" element={<TreasureIntegrationDashboard />} />

                  {/* PHASE 2: COORDINATION SYSTEMS - TESTING */}
                  <Route path="/harmony-coordination" element={<HarmonyCoordinationDashboardSimple />} />
                  <Route path="/intelligence-kingdom" element={<IntelligenceKingdomDashboard />} />

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
