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

// 🧠 ADVANCED AI SYSTEMS - Supreme coordination
import GLMSymphonyDashboard from './components/GLMSymphonyDashboard';
import SupremeOverseerDashboard from './components/SupremeOverseerDashboard';
import AdvancedAIOrchestrationDashboard from './components/AdvancedAIOrchestrationDashboard';

// 🎛️ COORDINATION SYSTEMS - Agent coordination
import HarmonyCoordinationDashboardSimple from './components/HarmonyCoordinationDashboardSimple';
import MCPCommunicationDashboardSimple from './components/MCPCommunicationDashboardSimple';
import IntelligenceKingdomDashboard from './components/IntelligenceKingdomDashboard';
import ChainOfAgentsDashboard from './components/ChainOfAgentsDashboard';

// 🧬 EVOLUTION SYSTEMS - Development tracking
import EvolutionDashboard from './components/EvolutionDashboard';

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
              <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>🏺 Loading Ultimate Treasures...</div>}>
                <Routes>
                  {/* 🏠 HOME */}
                  <Route path="/" element={<SimpleStableHomepage />} />

                  <Route path="/" element={<SimpleStableHomepage />} />
                  <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
                  <Route path="/assessmenttools" element={<WorkingAssessmentTools />} />
                  <Route path="/classmanagement" element={<WorkingClassManagement />} />
                  <Route path="/lessoncreator" element={<WorkingLessonCreator />} />
                  <Route path="/parentcommunication" element={<WorkingParentCommunication />} />
                  <Route path="/resourcebrowser" element={<WorkingResourceBrowser />} />
                  <Route path="/student" element={<WorkingStudentDashboard />} />
                  <Route path="/teacher" element={<WorkingTeacherDashboard />} />
                  <Route path="/treasurehunt" element={<TreasureHuntDashboard />} />
                  <Route path="/treasureinventory" element={<TreasureInventoryDashboard />} />
                  <Route path="/treasureintegration" element={<TreasureIntegrationDashboard />} />
                  <Route path="/harmonycoordination" element={<HarmonyCoordinationDashboardSimple />} />
                  <Route path="/mcpcommunication" element={<MCPCommunicationDashboardSimple />} />
                  <Route path="/intelligencekingdom" element={<IntelligenceKingdomDashboard />} />
                  // 🧬 Evolution and development tracking
                  <Route path="/evolution" element={<EvolutionDashboard />} />
                  <Route path="/chainofagents" element={<ChainOfAgentsDashboard />} />
                  <Route path="/glmsymphony" element={<GLMSymphonyDashboard />} />
                  <Route path="/supremeoverseer" element={<SupremeOverseerDashboard />} />
                  <Route path="/advancedaiorchestration" element={<AdvancedAIOrchestrationDashboard />} />

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