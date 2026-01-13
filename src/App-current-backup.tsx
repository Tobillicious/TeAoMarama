import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// Essential components - verified to exist and work
import Navigation from './components/Navigation';
import SiteBreadcrumbs from './components/SiteBreadcrumbs';
import SimpleStableHomepage from './components/SimpleStableHomepage';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';

// Core Educational Features - verified working
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingParentCommunication from './components/WorkingParentCommunication';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';

// 🏺 TREASURE HUNT SYSTEMS - Core mission components
import TreasureHuntDashboard from './components/TreasureHuntDashboard';
import TreasureInventoryDashboard from './components/TreasureInventoryDashboard';
import TreasureIntegrationDashboard from './components/TreasureIntegrationDashboard';

// 🎛️ COORDINATION SYSTEMS - Simple versions to avoid export errors
import HarmonyCoordinationDashboardSimple from './components/HarmonyCoordinationDashboardSimple';
import MCPCommunicationDashboardSimple from './components/MCPCommunicationDashboardSimple';
import IntelligenceKingdomDashboard from './components/IntelligenceKingdomDashboard';

// Test components
import TestComponent from './components/TestComponent';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SimpleAuthProvider>
        <EducationProvider>
          <div className="App">
            <Navigation />
            <SiteBreadcrumbs />
            <main style={{ flexGrow: 1, padding: '1rem' }}>
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>🏺 Loading Treasures...</div>}>
                <Routes>
                  {/* 🏠 HOME */}
                  <Route path="/" element={<SimpleStableHomepage />} />

                  {/* 📚 CORE EDUCATIONAL FEATURES */}
                  <Route path="/teacher" element={<WorkingTeacherDashboard />} />
                  <Route path="/student" element={<WorkingStudentDashboard />} />
                  <Route path="/resources" element={<WorkingResourceBrowser />} />
                  <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
                  <Route path="/create-lesson" element={<WorkingLessonCreator />} />
                  <Route path="/class-management" element={<WorkingClassManagement />} />
                  <Route path="/assessments" element={<WorkingAssessmentTools />} />
                  <Route path="/parent-communication" element={<WorkingParentCommunication />} />

                  {/* 🏺 TREASURE HUNT MISSION - PRIORITY SYSTEMS */}
                  <Route path="/treasure-hunt" element={<TreasureHuntDashboard />} />
                  <Route path="/treasure-integration" element={<TreasureIntegrationDashboard />} />
                  <Route path="/treasure-inventory" element={<TreasureInventoryDashboard />} />

                  {/* 🎛️ COORDINATION SYSTEMS */}
                  <Route path="/harmony-coordination" element={<HarmonyCoordinationDashboardSimple />} />
                  <Route path="/mcp-communication" element={<MCPCommunicationDashboardSimple />} />
                  <Route path="/intelligence-kingdom" element={<IntelligenceKingdomDashboard />} />

                  {/* 🧪 TEST */}
                  <Route path="/test" element={<TestComponent />} />

                  {/* 🔄 FALLBACK */}
                  <Route path="*" element={<SimpleStableHomepage />} />
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