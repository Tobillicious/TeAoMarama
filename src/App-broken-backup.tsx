import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// Essential components only
import Navigation from './components/Navigation';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';
import ProfessionalHomepage from './components/ProfessionalHomepage';
import SimpleStableHomepage from './components/SimpleStableHomepage';
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingParentCommunication from './components/WorkingParentCommunication';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';

// AI Systems - All Discovered Treasures
import AdvancedAIOrchestrationDashboard from './components/AdvancedAIOrchestrationDashboard';
import AdvancedCoordinationDashboard from './components/AdvancedCoordinationDashboard';
import AuthenticCulturalIntegrationDashboard from './components/AuthenticCulturalIntegrationDashboard';
import BrilliantTeacherDashboard from './components/BrilliantTeacherDashboard';
import ChainOfAgentsDashboard from './components/ChainOfAgentsDashboard';
import CulturalIntelligenceDashboard from './components/CulturalIntelligenceDashboard';
import CulturalIntegrationDashboard from './components/CulturalIntegrationDashboard';
import CulturalSafetyComplianceDashboard from './components/CulturalSafetyComplianceDashboard';
import DesignTeamDashboard from './components/DesignTeamDashboard';
import EmpireCommandCenter from './components/EmpireCommandCenter';
import EnhancedStudentDashboard from './components/EnhancedStudentDashboard';
import EvolvedAISocietyDashboard from './components/EvolvedAISocietyDashboard';
import GLMModelDashboard from './components/GLMModelDashboard';
import GLMPageTesterDashboard from './components/GLMPageTesterDashboard';
import GLMSymphonyDashboard from './components/GLMSymphonyDashboard';
import HarmonyCoordinationDashboardSimple from './components/HarmonyCoordinationDashboardSimple';
import IntelligenceKingdomDashboard from './components/IntelligenceKingdomDashboard';
import LLMCoordinationDashboard from './components/LLMCoordinationDashboard';
import MCPCommunicationDashboard from './components/MCPCommunicationDashboard';
import MassiveLLMSocietyDashboard from './components/MassiveLLMSocietyDashboard';
import MassiveScaleDashboard from './components/MassiveScaleDashboard';
import PlatformAuditDashboard from './components/PlatformAuditDashboard';
import QualityFilteringHarmonyDashboard from './components/QualityFilteringHarmonyDashboard';
import SimpleGLMIntegration from './components/SimpleGLMIntegration';
import SuperintelligenceDashboard from './components/SuperintelligenceDashboard';
import SupremeAICoordinationDashboard from './components/SupremeAICoordinationDashboard';
import SupremeOverseerDashboard from './components/SupremeOverseerDashboard';
import TeacherAnalyticsDashboard from './components/TeacherAnalyticsDashboard';
import TreasureInventoryDashboard from './components/TreasureInventoryDashboard';
import TreasureIntegrationDashboard from './components/TreasureIntegrationDashboard';
import TreasureHuntDashboard from './components/TreasureHuntDashboard';
import UnifiedAgentCoordinationDashboard from './components/UnifiedAgentCoordinationDashboard';
import UnifiedLLMDashboard from './components/UnifiedLLMDashboard';
import HarmonyTest from './components/HarmonyTest';

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
                  <Route path="/" element={<SimpleStableHomepage />} />

                  {/* Core Educational Features */}
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

                  {/* 👑 SUPREME COORDINATION SYSTEMS */}
                  <Route path="/supreme-overseer" element={<SupremeOverseerDashboard />} />
                  <Route path="/intelligence-kingdom" element={<IntelligenceKingdomDashboard />} />
                  <Route path="/glm-symphony" element={<GLMSymphonyDashboard />} />
                  <Route path="/chain-of-agents" element={<ChainOfAgentsDashboard />} />
                  <Route path="/unified-coordination" element={<UnifiedAgentCoordinationDashboard />} />
                  <Route path="/advanced-ai-orchestration" element={<AdvancedAIOrchestrationDashboard />} />

                  {/* 🏰 EMPIRE & SOCIETY SYSTEMS */}
                  <Route path="/empire-command" element={<EmpireCommandCenter />} />
                  <Route path="/evolved-society" element={<EvolvedAISocietyDashboard />} />
                  <Route path="/design-team" element={<DesignTeamDashboard />} />
                  <Route path="/supreme-ai-coordination" element={<SupremeAICoordinationDashboard />} />
                  <Route path="/massive-scale" element={<MassiveScaleDashboard />} />
                  <Route path="/massive-llm-society" element={<MassiveLLMSocietyDashboard />} />

                  {/* 🌿 CULTURAL INTELLIGENCE SYSTEMS */}
                  <Route path="/cultural-intelligence" element={<CulturalIntelligenceDashboard />} />
                  <Route path="/authentic-cultural" element={<AuthenticCulturalIntegrationDashboard />} />
                  <Route path="/cultural-integration" element={<CulturalIntegrationDashboard />} />
                  <Route path="/cultural-safety" element={<CulturalSafetyComplianceDashboard />} />

                  {/* 🎛️ SPECIALIZED DASHBOARDS */}
                  <Route path="/harmony-coordination" element={<HarmonyCoordinationDashboardSimple />} />
                  <Route path="/advanced-coordination" element={<AdvancedCoordinationDashboard />} />
                  <Route path="/llm-coordination" element={<LLMCoordinationDashboard />} />
                  <Route path="/mcp-communication" element={<MCPCommunicationDashboard />} />
                  <Route path="/glm-page-tester" element={<GLMPageTesterDashboard />} />
                  <Route path="/unified-llm" element={<UnifiedLLMDashboard />} />
                  <Route path="/superintelligence" element={<SuperintelligenceDashboard />} />
                  <Route path="/quality-filtering" element={<QualityFilteringHarmonyDashboard />} />
                  
                  {/* 🏆 ENHANCED DASHBOARDS - TREASURE HUNT DISCOVERIES */}
                  <Route path="/treasure-integration-dashboard" element={<TreasureIntegrationDashboard />} />
                  <Route path="/enhanced-student-dashboard" element={<EnhancedStudentDashboard />} />
                  <Route path="/brilliant-teacher-dashboard" element={<BrilliantTeacherDashboard />} />
                  <Route path="/cultural-integration-dashboard" element={<CulturalIntegrationDashboard />} />
                  <Route path="/authentic-cultural-dashboard" element={<AuthenticCulturalIntegrationDashboard />} />
                  <Route path="/glm-model-dashboard" element={<GLMModelDashboard />} />
                  <Route path="/teacher-analytics-dashboard" element={<TeacherAnalyticsDashboard />} />
                  <Route path="/platform-audit" element={<PlatformAuditDashboard />} />
                  <Route path="/glm-model" element={<GLMModelDashboard />} />

                  {/* Additional AI Systems */}
                  <Route path="/simple-glm-integration" element={<SimpleGLMIntegration />} />

                  {/* Test */}
                  <Route path="/test" element={<TestComponent />} />
                  <Route path="/harmony-test" element={<HarmonyTest />} />

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
