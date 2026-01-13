import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

import Navigation from './components/Navigation';
import SiteBreadcrumbs from './components/SiteBreadcrumbs';
import SimpleStableHomepage from './components/SimpleStableHomepage';

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

                  <Route path="/" element={<SimpleStableHomepage />} />

                  /* 📚 CORE EDUCATIONAL FEATURES */
                  <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
                  <Route path="/assessmenttools" element={<WorkingAssessmentTools />} />
                  <Route path="/classmanagement" element={<WorkingClassManagement />} />
                  <Route path="/lessoncreator" element={<WorkingLessonCreator />} />
                  <Route path="/parentcommunication" element={<WorkingParentCommunication />} />
                  <Route path="/resourcebrowser" element={<WorkingResourceBrowser />} />
                  <Route path="/student" element={<WorkingStudentDashboard />} />
                  <Route path="/teacher" element={<WorkingTeacherDashboard />} />

                  /* 🏺 TREASURE HUNT MISSION - PRIORITY SYSTEMS */
                  // 🏺 Main treasure hunt interface
                  <Route path="/treasurehunt" element={<TreasureHuntDashboard />} />
                  // 💎 Inventory of discovered treasures
                  <Route path="/treasureinventory" element={<TreasureInventoryDashboard />} />
                  // 🏰 Integration of treasures into platform
                  <Route path="/treasureintegration" element={<TreasureIntegrationDashboard />} />

                  /* 🎛️ COORDINATION SYSTEMS */
                  <Route path="/harmonycoordination" element={<HarmonyCoordinationDashboardSimple />} />
                  <Route path="/mcpcommunication" element={<MCPCommunicationDashboardSimple />} />
                  <Route path="/intelligencekingdom" element={<IntelligenceKingdomDashboard />} />

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