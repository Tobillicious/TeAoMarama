import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// Essential components only - verified to exist
import Navigation from './components/Navigation';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingParentCommunication from './components/WorkingParentCommunication';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';

// AI Systems - Essential only
import AdvancedAIOrchestrationDashboard from './components/AdvancedAIOrchestrationDashboard';
import EvolvedAISocietyDashboard from './components/EvolvedAISocietyDashboard';
import DesignTeamDashboard from './components/DesignTeamDashboard';
import GLMPageTesterDashboard from './components/GLMPageTesterDashboard';
import GLMSymphonyDashboard from './components/GLMSymphonyDashboard';
import SimpleGLMIntegration from './components/SimpleGLMIntegration';
import SupremeOverseerDashboard from './components/SupremeOverseerDashboard';
import UnifiedAgentCoordinationDashboard from './components/UnifiedAgentCoordinationDashboard';
import TreasureInventoryDashboard from './components/TreasureInventoryDashboard';
import TreasureHuntDashboard from './components/TreasureHuntDashboard';

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
                  <Route path="/evolved-society" element={<EvolvedAISocietyDashboard />} />
                  <Route path="/design-team" element={<DesignTeamDashboard />} />
                  <Route path="/glm-symphony" element={<GLMSymphonyDashboard />} />
                  <Route path="/treasure-inventory" element={<TreasureInventoryDashboard />} />
                  <Route path="/treasure-hunt" element={<TreasureHuntDashboard />} />
                  <Route path="/glm-page-tester" element={<GLMPageTesterDashboard />} />
                  <Route path="/advanced-ai-orchestration" element={<AdvancedAIOrchestrationDashboard />} />
                  <Route path="/simple-glm-integration" element={<SimpleGLMIntegration />} />

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