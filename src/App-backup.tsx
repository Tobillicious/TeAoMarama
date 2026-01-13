import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import TestComponent from './components/TestComponent';
import { EducationProvider } from './contexts/EducationContext';
import { SimpleAuthProvider } from './services/SimpleAuthProvider';

// Import key components
import ActualContentViewer from './components/ActualContentViewer';
import AdvancedCulturalIntegration from './components/AdvancedCulturalIntegration';
import AdvancedEducationalFeatures from './components/AdvancedEducationalFeatures';
import AdvancedResearchLaboratory from './components/AdvancedResearchLaboratory';
import AICoordinationMaximizationHub from './components/AICoordinationMaximizationHub';
import AssessmentFramework from './components/AssessmentFramework';
import AssessmentWorkflow from './components/AssessmentWorkflow';
import CollaborativeDevelopmentDashboard from './components/CollaborativeDevelopmentDashboard';
import CollaborativeMahiDashboard from './components/CollaborativeMahiDashboard';
import ComprehensiveNavigationHub from './components/ComprehensiveNavigationHub';
import CulturalLearningActivities from './components/CulturalLearningActivities';
import DeepResearchAudit from './components/DeepResearchAudit';
import EducationalResourceIntegrationHub from './components/EducationalResourceIntegrationHub';
import GLMMaximizationEngine from './components/GLMMaximizationEngine';
import IntelligenceKingdomDashboard from './components/IntelligenceKingdomDashboard';
import MegaNavigationSystem from './components/MegaNavigationSystem';
import MultiComponentSystems from './components/MultiComponentSystems';
import MultiLLMCoordinationCenter from './components/MultiLLMCoordinationCenter';
import RealGLMIntegrationDemo from './components/RealGLMIntegrationDemo';
// import RealContentBrowser from './components/RealContentBrowser';
import ScriptIntegrationInterface from './components/ScriptIntegrationInterface';
// import SimpleContentBrowser from './components/SimpleContentBrowser';
import SimpleGLMIntegration from './components/SimpleGLMIntegration';
import SupremeIntelligenceCoordinator from './components/SupremeIntelligenceCoordinator';
import SupremeOverseerDashboard from './components/SupremeOverseerDashboard';
import TreasureInventoryDashboard from './components/TreasureInventoryDashboard';
import UnifiedAgentCoordinationDashboard from './components/UnifiedAgentCoordinationDashboard';
// import CulturalLearningCard from './components/CulturalLearningCard';
import CulturalLearningModules from './components/CulturalLearningModules';
import CulturalLearningPathNavigator from './components/CulturalLearningPathNavigator';
import EnhancedAgentCoordination from './components/EnhancedAgentCoordination';
// import EnhancedAssessment from './components/EnhancedAssessment';
import AdvancedAnalyticsDashboard from './components/AdvancedAnalyticsDashboard';
import AdvancedAnalyticsVisualization from './components/AdvancedAnalyticsVisualization';
import AdvancedPerformanceMonitor from './components/AdvancedPerformanceMonitor';
import AdvancedResourceEnrichment from './components/AdvancedResourceEnrichment';
import AdvancedStudentAnalytics from './components/AdvancedStudentAnalytics';
import BrilliantOnboarding from './components/BrilliantOnboarding';
import CollaborationHub from './components/CollaborationHub';
import CommunityFeatures from './components/CommunityFeatures';
import CommunityFeedbackSystem from './components/CommunityFeedbackSystem';
import EnhancedEducationalPlatform from './components/EnhancedEducationalPlatform';
import EnhancedResourceBrowser from './components/EnhancedResourceBrowser';
import EnhancedResourceViewer from './components/EnhancedResourceViewer';
import EnhancedTeacherDashboard from './components/EnhancedTeacherDashboard';
import FunctionalResourceBrowser from './components/FunctionalResourceBrowser';
import HumanFocusedHomepage from './components/HumanFocusedHomepage';
import IntegratedOnboarding from './components/IntegratedOnboarding';
import InteractiveAssessmentSystem from './components/InteractiveAssessmentSystem';
import LessonManager from './components/LessonManager';
import MultimediaStudio from './components/MultimediaStudio';
import NewModelIntegration from './components/NewModelIntegration';
import PerformanceOptimizer from './components/PerformanceOptimizer';
import ProfessionalHomepage from './components/ProfessionalHomepage';
import RealLessonViewer from './components/RealLessonViewer';
import RealTimeTeachingAnalytics from './components/RealTimeTeachingAnalytics';
import ReferralSystem from './components/ReferralSystem';
import SimpleWorkingHomepage from './components/SimpleWorkingHomepage';
import TeacherSignupFlow from './components/TeacherSignupFlow';
import TreasureShowcaseHomepage from './components/TreasureShowcaseHomepage';
import UltraModernOnboarding from './components/UltraModernOnboarding';
import WorkingAnalyticsDashboard from './components/WorkingAnalyticsDashboard';
import WorkingAssessmentTools from './components/WorkingAssessmentTools';
import WorkingClassManagement from './components/WorkingClassManagement';
import WorkingLessonCreator from './components/WorkingLessonCreator';
import WorkingLessonViewer from './components/WorkingLessonViewer';
import WorkingParentCommunication from './components/WorkingParentCommunication';
import WorkingResourceBrowser from './components/WorkingResourceBrowser';
import WorkingStudentDashboard from './components/WorkingStudentDashboard';
import WorkingTeacherDashboard from './components/WorkingTeacherDashboard';

// AI Coordination & Multi-Agent Systems
import AdvancedResourceDiscovery from './components/AdvancedResourceDiscovery';
import AIModelCoordinator from './components/AIModelCoordinator';
import EnhancedGLMSymphony from './components/EnhancedGLMSymphony';
import ExaAIIntegration from './components/ExaAIIntegration';
import GLMModelDashboard from './components/GLMModelDashboard';
import GLMSymphonyDashboard from './components/GLMSymphonyDashboard';
import GraphRAGKnowledgeSystem from './components/GraphRAGKnowledgeSystem';
import LLMArmyDeployment from './components/LLMArmyDeployment';
import OverseerCommunication from './components/OverseerCommunication';
import QualityFilteringHarmonyDashboard from './components/QualityFilteringHarmonyDashboard';
import RoyalCommandDashboard from './components/RoyalCommandDashboard';
import SuperIntelligenceCoordinator from './components/SuperIntelligenceCoordinator';
import SuperintelligenceDashboard from './components/SuperintelligenceDashboard';
import SuperintelligenceOrchestrator from './components/SuperintelligenceOrchestrator';
import SupremeAICoordinationDashboard from './components/SupremeAICoordinationDashboard';
import SyncIssueResolver from './components/SyncIssueResolver';
import UnifiedLLMDashboard from './components/UnifiedLLMDashboard';

// Discovered Treasures - Cultural Intelligence & Advanced Systems
import AdvancedAIOrchestrationDashboard from './components/AdvancedAIOrchestrationDashboard';
import AdvancedCoordinationDashboard from './components/AdvancedCoordinationDashboard';
import AuthenticCulturalIntegrationDashboard from './components/AuthenticCulturalIntegrationDashboard';
import CulturalIntelligenceDashboard from './components/CulturalIntelligenceDashboard';
import GLMPageTesterDashboard from './components/GLMPageTesterDashboard';
import HarmonyCoordinationDashboard from './components/HarmonyCoordinationDashboard';
import MassiveLLMSocietyDashboard from './components/MassiveLLMSocietyDashboard';
import MassiveScaleDashboard from './components/MassiveScaleDashboard';
import MCPCommunicationDashboard from './components/MCPCommunicationDashboard';
import TreasureDiscoveryEngine from './components/TreasureDiscoveryEngine';

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

// Simple error boundary
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Arial, sans-serif',
            padding: '20px',
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              maxWidth: '600px',
            }}
          >
            <h1 style={{ color: '#e11d48', fontSize: '2rem', marginBottom: '20px' }}>
              ⚠️ Platform Error
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              We're experiencing technical difficulties. Please refresh the page or try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <SimpleAuthProvider>
        <EducationProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<SimpleWorkingHomepage />} />
              <Route path="/student" element={<WorkingStudentDashboard />} />
              <Route path="/teacher" element={<WorkingTeacherDashboard />} />
              <Route path="/enhanced-teacher" element={<EnhancedTeacherDashboard />} />
              <Route path="/resources" element={<WorkingResourceBrowser />} />
              <Route path="/lesson/:resourceId" element={<RealLessonViewer />} />
              <Route path="/working-lesson/:resourceId" element={<WorkingLessonViewer />} />
              <Route path="/lesson-manager" element={<LessonManager />} />

              {/* Enhanced Resource Browsers */}
              <Route path="/enhanced-resources" element={<EnhancedResourceBrowser />} />
              <Route path="/functional-resources" element={<FunctionalResourceBrowser />} />
              <Route path="/actual-content" element={<ActualContentViewer />} />
              <Route path="/enhanced-viewer" element={<EnhancedResourceViewer />} />
              {/* <Route path="/māori-resources" element={<MāoriFocusedResourceDisplay />} /> */}

              {/* Assessment Systems */}
              <Route path="/assessment-framework" element={<AssessmentFramework />} />
              {/* <Route path="/enhanced-assessment" element={<EnhancedAssessment />} /> */}
              <Route path="/interactive-assessment" element={<InteractiveAssessmentSystem />} />

              {/* Cultural Learning */}
              <Route path="/cultural-modules" element={<CulturalLearningModules />} />
              <Route path="/cultural-activities" element={<CulturalLearningActivities />} />
              {/* <Route path="/cultural-card" element={<CulturalLearningCard />} /> */}
              <Route path="/cultural-path" element={<CulturalLearningPathNavigator />} />
              <Route path="/cultural-integration" element={<AdvancedCulturalIntegration />} />
              <Route
                path="/authentic-cultural-integration"
                element={<AuthenticCulturalIntegrationDashboard />}
              />
              <Route path="/treasure-inventory" element={<TreasureInventoryDashboard />} />
              <Route path="/treasure-discovery" element={<TreasureDiscoveryEngine />} />
              <Route path="/harmony-coordination" element={<HarmonyCoordinationDashboard />} />
              <Route path="/advanced-coordination" element={<AdvancedCoordinationDashboard />} />
              <Route path="/cultural-intelligence" element={<CulturalIntelligenceDashboard />} />
              <Route path="/massive-scale" element={<MassiveScaleDashboard />} />
              <Route path="/glm-page-tester" element={<GLMPageTesterDashboard />} />
              <Route path="/mcp-communication" element={<MCPCommunicationDashboard />} />
              <Route path="/massive-llm-society" element={<MassiveLLMSocietyDashboard />} />
              <Route
                path="/advanced-ai-orchestration"
                element={<AdvancedAIOrchestrationDashboard />}
              />
              <Route path="/collaborative-mahi" element={<CollaborativeMahiDashboard />} />
              <Route path="/deep-research" element={<DeepResearchAudit />} />
              <Route path="/research-laboratory" element={<AdvancedResearchLaboratory />} />
              <Route path="/comprehensive-navigation" element={<ComprehensiveNavigationHub />} />
              <Route path="/script-integration" element={<ScriptIntegrationInterface />} />
              <Route path="/multi-component-systems" element={<MultiComponentSystems />} />
              <Route path="/mega-navigation" element={<MegaNavigationSystem />} />
              <Route
                path="/educational-resources"
                element={<EducationalResourceIntegrationHub />}
              />
              <Route path="/multi-llm-coordination" element={<MultiLLMCoordinationCenter />} />
              <Route path="/glm-maximization" element={<GLMMaximizationEngine />} />
              <Route
                path="/ai-coordination-maximization"
                element={<AICoordinationMaximizationHub />}
              />
              <Route path="/real-glm-integration" element={<RealGLMIntegrationDemo />} />
              {/* <Route path="/real-content-browser" element={<RealContentBrowser />} /> */}
              {/* <Route path="/simple-content-browser" element={<SimpleContentBrowser />} /> */}
              <Route path="/simple-glm-integration" element={<SimpleGLMIntegration />} />
              <Route path="/supreme-overseer" element={<SupremeOverseerDashboard />} />
              <Route path="/unified-coordination" element={<UnifiedAgentCoordinationDashboard />} />
              <Route path="/test" element={<TestComponent />} />

              <Route path="/analytics" element={<WorkingAnalyticsDashboard />} />
              <Route path="/create-lesson" element={<WorkingLessonCreator />} />
              <Route path="/class-management" element={<WorkingClassManagement />} />
              <Route path="/assessments" element={<WorkingAssessmentTools />} />
              <Route path="/parent-communication" element={<WorkingParentCommunication />} />
              <Route path="/assessment-workflow" element={<AssessmentWorkflow />} />
              <Route path="/enhanced-platform" element={<EnhancedEducationalPlatform />} />
              <Route path="/agent-coordination" element={<EnhancedAgentCoordination />} />

              {/* UI/UX & Business Systems */}
              <Route path="/professional-homepage" element={<ProfessionalHomepage />} />
              <Route path="/treasure-showcase-homepage" element={<TreasureShowcaseHomepage />} />
              <Route path="/human-focused-homepage" element={<HumanFocusedHomepage />} />
              <Route path="/ultra-modern-onboarding" element={<UltraModernOnboarding />} />
              <Route path="/brilliant-onboarding" element={<BrilliantOnboarding />} />
              <Route path="/integrated-onboarding" element={<IntegratedOnboarding />} />
              <Route path="/community-features" element={<CommunityFeatures />} />
              <Route path="/community-feedback" element={<CommunityFeedbackSystem />} />
              <Route path="/collaboration-hub" element={<CollaborationHub />} />
              <Route path="/referral-system" element={<ReferralSystem />} />
              <Route path="/teacher-signup" element={<TeacherSignupFlow />} />

              {/* New Model Integration */}
              <Route path="/new-model" element={<NewModelIntegration />} />

              {/* AI Coordination & Multi-Agent Systems */}
              <Route path="/supreme-intelligence" element={<SupremeIntelligenceCoordinator />} />
              <Route path="/supreme-ai-coordination" element={<SupremeAICoordinationDashboard />} />
              <Route path="/superintelligence-dashboard" element={<SuperintelligenceDashboard />} />
              <Route path="/unified-llm-dashboard" element={<UnifiedLLMDashboard />} />
              <Route path="/ai-model-coordinator" element={<AIModelCoordinator />} />
              <Route path="/llm-army-deployment" element={<LLMArmyDeployment />} />
              <Route
                path="/superintelligence-orchestrator"
                element={<SuperintelligenceOrchestrator />}
              />
              <Route
                path="/super-intelligence-coordinator"
                element={<SuperIntelligenceCoordinator />}
              />
              <Route path="/royal-command-dashboard" element={<RoyalCommandDashboard />} />
              <Route path="/glm-model-dashboard" element={<GLMModelDashboard />} />
              <Route path="/enhanced-glm-symphony" element={<EnhancedGLMSymphony />} />
              <Route path="/glm-symphony-dashboard" element={<GLMSymphonyDashboard />} />
              <Route
                path="/quality-filtering-harmony"
                element={<QualityFilteringHarmonyDashboard />}
              />
              <Route path="/overseer-communication" element={<OverseerCommunication />} />
              <Route path="/graphrag-knowledge-system" element={<GraphRAGKnowledgeSystem />} />
              <Route path="/advanced-resource-discovery" element={<AdvancedResourceDiscovery />} />
              <Route path="/exa-ai-integration" element={<ExaAIIntegration />} />
              <Route path="/sync-issue-resolver" element={<SyncIssueResolver />} />

              {/* Advanced Analytics & Performance */}
              <Route path="/advanced-analytics" element={<AdvancedAnalyticsDashboard />} />
              <Route path="/real-time-analytics" element={<RealTimeTeachingAnalytics />} />
              <Route path="/analytics-visualization" element={<AdvancedAnalyticsVisualization />} />
              <Route path="/student-analytics" element={<AdvancedStudentAnalytics />} />
              <Route path="/performance-monitor" element={<AdvancedPerformanceMonitor />} />
              <Route path="/performance-optimizer" element={<PerformanceOptimizer />} />
              <Route path="/resource-enrichment" element={<AdvancedResourceEnrichment />} />

              {/* Multimedia & Content */}
              <Route path="/multimedia-studio" element={<MultimediaStudio />} />
              {/* <Route path="/content-preview" element={<ContentPreviewModal />} /> */}
              {/* <Route path="/download-manager" element={<DownloadManager />} /> */}
              {/* <Route path="/optimized-image" element={<OptimizedImage />} /> */}

              <Route
                path="/development-dashboard"
                element={<CollaborativeDevelopmentDashboard />}
              />
              <Route path="/advanced-features" element={<AdvancedEducationalFeatures />} />
              <Route path="/intelligence-kingdom" element={<IntelligenceKingdomDashboard />} />
              {/* Fallback route */}
              <Route path="*" element={<SimpleWorkingHomepage />} />
            </Routes>
          </Suspense>
        </EducationProvider>
      </SimpleAuthProvider>
    </ErrorBoundary>
  );
};

export default App;
