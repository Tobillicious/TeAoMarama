import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// Essential components - verified to exist
import Navigation from './components/Navigation';
import SiteBreadcrumbs from './components/SiteBreadcrumbs';
import SimpleStableHomepage from './components/SimpleStableHomepage';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';
import TreasureShowcaseHomepage from './components/TreasureShowcaseHomepage';

// Core Educational Features - verified working
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingParentCommunication from './components/WorkingParentCommunication';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';

// 🏺 TREASURE HUNT SYSTEMS - All discovered treasures
import TreasureHuntDashboard from './components/TreasureHuntDashboard';
import TreasureIntegrationDashboard from './components/TreasureIntegrationDashboard';
import TreasureInventoryDashboard from './components/TreasureInventoryDashboard';
import TreasureDiscoveryEngine from './components/TreasureDiscoveryEngine';

// 🎛️ COORDINATION SYSTEMS - Verified to exist
import HarmonyCoordinationDashboardSimple from './components/HarmonyCoordinationDashboardSimple';
import MCPCommunicationDashboardSimple from './components/MCPCommunicationDashboardSimple';
import IntelligenceKingdomDashboard from './components/IntelligenceKingdomDashboard';
import CulturalIntelligenceDashboard from './components/CulturalIntelligenceDashboard';

// 🧠 INTELLIGENCE SYSTEMS - Advanced treasures
import SuperIntelligenceCoordinator from './components/SuperIntelligenceCoordinator';
import SupremeIntelligenceCoordinator from './components/SupremeIntelligenceCoordinator';
import QualityFilteringHarmonyDashboard from './components/QualityFilteringHarmonyDashboard';

// 🎯 AI INTEGRATION SYSTEMS
import SimpleGLMIntegration from './components/SimpleGLMIntegration';
import SimpleContentBrowser from './components/SimpleContentBrowser';

// Test components
import TestComponent from './components/TestComponent';
import SimpleTest from './components/SimpleTest';
import HarmonyTest from './components/HarmonyTest';

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
                  {/* 🏠 HOME - Multiple options */}
                  <Route path="/" element={<TreasureShowcaseHomepage />} />
                  <Route path="/home" element={<SimpleStableHomepage />} />
                  <Route path="/working-home" element={<SimpleWorkingHomepage />} />

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
                  <Route path="/treasure-discovery" element={<TreasureDiscoveryEngine />} />

                  {/* 🎛️ COORDINATION SYSTEMS */}
                  <Route path="/harmony-coordination" element={<HarmonyCoordinationDashboardSimple />} />
                  <Route path="/mcp-communication" element={<MCPCommunicationDashboardSimple />} />
                  <Route path="/intelligence-kingdom" element={<IntelligenceKingdomDashboard />} />
                  <Route path="/cultural-intelligence" element={<CulturalIntelligenceDashboard />} />

                  {/* 🧠 ADVANCED INTELLIGENCE SYSTEMS */}
                  <Route path="/super-intelligence" element={<SuperIntelligenceCoordinator />} />
                  <Route path="/supreme-intelligence" element={<SupremeIntelligenceCoordinator />} />
                  <Route path="/quality-filtering" element={<QualityFilteringHarmonyDashboard />} />

                  {/* 🎯 AI INTEGRATION */}
                  <Route path="/simple-glm" element={<SimpleGLMIntegration />} />
                  <Route path="/content-browser" element={<SimpleContentBrowser />} />

                  {/* 🧪 TEST SYSTEMS */}
                  <Route path="/test" element={<TestComponent />} />
                  <Route path="/simple-test" element={<SimpleTest />} />
                  <Route path="/harmony-test" element={<HarmonyTest />} />

                  {/* 🔄 FALLBACK */}
                  <Route path="*" element={<TreasureShowcaseHomepage />} />
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
