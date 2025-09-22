import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ModernNavigation from './components/ModernNavigation';
import { DualRoleAuthProvider } from './services/DualRoleAuthProvider';
import { performanceMonitor, registerServiceWorker } from './utils/performance-optimizer';

// Essential pages only - no duplicates
const Home = lazy(() => import('./pages/Home'));
const SimpleTestHomepage = lazy(() => import('./components/SimpleTestHomepage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Core functionality only - single version each
const TeacherDashboard = lazy(() => import('./components/ProfessionalTeacherDashboard'));
const StudentDashboard = lazy(() => import('./components/EnhancedStudentDashboard'));
const EngagingStudentDashboard = lazy(() => import('./components/EngagingStudentDashboard'));
const ResourceBrowser = lazy(() => import('./components/FunctionalResourceBrowser'));
const HumanReadableContentBrowser = lazy(() => import('./components/HumanReadableContentBrowser'));
const LessonViewer = lazy(() => import('./components/RealLessonViewer'));
const Login = lazy(() => import('./components/ComprehensiveAuthSystem'));
const TeacherSignupFlow = lazy(() => import('./components/TeacherSignupFlow'));
const WorkingSubscription = lazy(() => import('./pages/WorkingSubscription'));
const TeacherDemoDashboard = lazy(() => import('./components/TeacherDemoDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Educational content - keep Year 8 only for now
const Year8SocialStudies = lazy(() => import('./pages/Year8SocialStudies'));

// Cultural Learning and Analytics
const CulturalLearningModules = lazy(() => import('./components/CulturalLearningModules'));
const AdvancedAnalytics = lazy(() => import('./components/AdvancedAnalyticsDashboard'));

// Superintelligence and Advanced Features
const SuperintelligenceDashboard = lazy(() => import('./components/SuperintelligenceDashboard'));
const MultimediaStudio = lazy(() => import('./components/MultimediaStudio'));
const AssessmentHub = lazy(() => import('./components/AdvancedStudentAnalytics')); // Using available component
const PlatformAuditDashboard = lazy(() => import('./components/PlatformAuditDashboard'));
const GLMModelDashboard = lazy(() => import('./components/GLMModelDashboard'));
const GLMSymphonyDashboard = lazy(() => import('./components/GLMSymphonyDashboard'));
const SupremeAICoordinationDashboard = lazy(
  () => import('./components/SupremeAICoordinationDashboard'),
);
const GraphRAGKnowledgeSystem = lazy(() => import('./components/GraphRAGKnowledgeSystem'));
const LLMArmyDeployment = lazy(() => import('./components/LLMArmyDeployment'));
const ExaAIIntegration = lazy(() => import('./components/ExaAIIntegration'));
const TeacherDemoShowcase = lazy(() => import('./components/TeacherDemoShowcase'));
const UnifiedLLMDashboard = lazy(() => import('./components/UnifiedLLMDashboard'));
const QualityFilteringHarmonyDashboard = lazy(
  () => import('./components/QualityFilteringHarmonyDashboard'),
);
const RealTimeLearningAnalytics = lazy(() => import('./components/RealTimeLearningAnalytics'));
const CollaborativeLearningWorkspace = lazy(
  () => import('./components/CollaborativeLearningWorkspace'),
);
const AdvancedAssessmentHub = lazy(() => import('./components/AdvancedAssessmentHub'));
const TeacherShowcaseDashboard = lazy(() => import('./components/TeacherShowcaseDashboard'));
const TeacherGuide = lazy(() => import('./components/TeacherGuide'));
const TeacherDashboardBeta = lazy(() => import('./components/TeacherDashboardBeta'));
const BrilliantTeacherDashboard = lazy(() => import('./components/BrilliantTeacherDashboard'));
const PremiumLessonPlanShowcase = lazy(() => import('./components/PremiumLessonPlanShowcase'));
const RoyalCommandDashboard = lazy(() => import('./components/RoyalCommandDashboard'));
const RoyalRevenueDashboard = lazy(() => import('./components/RoyalRevenueDashboard'));
const AdvancedTeacherOnboarding = lazy(() => import('./components/AdvancedTeacherOnboarding'));
const ProfessionalHomepage = lazy(() => import('./components/ProfessionalHomepage'));
const UltraModernOnboarding = lazy(() => import('./components/UltraModernOnboarding'));
const BrilliantOnboarding = lazy(() => import('./components/BrilliantOnboarding'));
const BeautifulSubscription = lazy(() => import('./components/BeautifulSubscription'));
const Revolutionary2025Subscription = lazy(() => import('./pages/Revolutionary2025Subscription'));
const ReferralSystem = lazy(() => import('./components/ReferralSystem'));
const PremiumContentShowcase = lazy(() => import('./components/PremiumContentShowcase'));

// Router-safe App component with error boundaries
function AppInner() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Performance monitoring
  useEffect(() => {
    console.log('🌿 TeAoMarama Platform Loading...');

    // Register service worker
    registerServiceWorker();

    // Log performance metrics
    setTimeout(() => {
      const metrics = performanceMonitor.getMetrics();
      if (metrics) {
        console.log('📊 Performance Metrics:', metrics);
      }
    }, 1000);
  }, []);

  return (
    <DualRoleAuthProvider>
      <div className="App">
        {!isLandingPage && <ModernNavigation />}
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Suspense fallback={<div>Loading...</div>}>
        <Routes>
                {/* Landing */}
                <Route path="/" element={<ProfessionalHomepage />} />
                <Route path="/home" element={<Home />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<TeacherSignupFlow />} />

                {/* Core Dashboards - single route each */}
                <Route path="/teacher" element={<BrilliantTeacherDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student-engaging" element={<EngagingStudentDashboard />} />

                {/* Resources - single route */}
                <Route path="/resources" element={<ResourceBrowser />} />
                <Route path="/human-content" element={<HumanReadableContentBrowser />} />
                <Route path="/lesson/:resourceId" element={<LessonViewer />} />

                {/* Year Level Content - Year 8 only for now */}
                <Route path="/year8-social-studies" element={<Year8SocialStudies />} />

                {/* Cultural Learning and Analytics */}
                <Route path="/cultural-learning-modules" element={<CulturalLearningModules />} />
                <Route path="/advanced-analytics" element={<AdvancedAnalytics />} />
                <Route path="/platform" element={<Home />} />

                {/* Superintelligence and Advanced Features */}
                <Route path="/superintelligence" element={<SuperintelligenceDashboard />} />
                <Route path="/multimedia" element={<MultimediaStudio />} />
                <Route path="/assessments" element={<AssessmentHub />} />
                <Route path="/audit" element={<PlatformAuditDashboard />} />

                {/* GLM Models - Priority Routes */}
                <Route path="/glm-models" element={<GLMModelDashboard />} />
                <Route path="/ai-models" element={<GLMModelDashboard />} />
                <Route path="/glm-symphony" element={<GLMSymphonyDashboard />} />
                <Route path="/supreme-ai" element={<SupremeAICoordinationDashboard />} />
                <Route path="/graphrag" element={<GraphRAGKnowledgeSystem />} />
                <Route path="/llm-army" element={<LLMArmyDeployment />} />
                <Route path="/exa-ai" element={<ExaAIIntegration />} />
                <Route path="/teacher-demo" element={<TeacherDemoShowcase />} />
                <Route path="/unified-llm" element={<UnifiedLLMDashboard />} />
                <Route path="/quality-filtering" element={<QualityFilteringHarmonyDashboard />} />
                <Route path="/real-time-analytics" element={<RealTimeLearningAnalytics />} />
                <Route
                  path="/collaborative-workspace"
                  element={<CollaborativeLearningWorkspace />}
                />
                <Route path="/advanced-assessments" element={<AdvancedAssessmentHub />} />
                <Route path="/teacher-showcase" element={<TeacherShowcaseDashboard />} />
                <Route path="/teacher-guide" element={<TeacherGuide />} />
                <Route path="/subscribe" element={<WorkingSubscription />} />
                <Route path="/pricing" element={<WorkingSubscription />} />
                <Route path="/dashboard-beta" element={<TeacherDashboardBeta />} />
                <Route path="/premium-lessons" element={<PremiumLessonPlanShowcase />} />
                <Route path="/royal-command" element={<RoyalCommandDashboard />} />
                <Route path="/royal-revenue" element={<RoyalRevenueDashboard />} />
                <Route path="/onboarding" element={<AdvancedTeacherOnboarding />} />
                <Route path="/join" element={<BrilliantOnboarding />} />
                <Route path="/subscription" element={<Revolutionary2025Subscription />} />
                <Route path="/subscription-classic" element={<BeautifulSubscription />} />
                <Route path="/referrals" element={<ReferralSystem />} />
                <Route path="/premium-content" element={<PremiumContentShowcase />} />

                <Route path="/teacher-demo" element={<TeacherDemoDashboard />} />

                {/* Static Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
                      </Routes>
      </Suspense>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </DualRoleAuthProvider>
  );
}

// Fallback App component for when Router context is completely unavailable
const FallbackApp = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: '#1e40af', fontSize: '2.5rem', marginBottom: '20px' }}>
          🌿 Te Ao Mārama
        </h1>
        <p style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '30px' }}>
          New Zealand's Educational Platform - Initializing...
        </p>
        <div style={{ color: '#f59e0b', fontWeight: 'bold' }}>
          Router context loading, please refresh page if this persists.
        </div>
      </div>
    </div>
  );
};

// Main App component
function App() {
  return <AppInner />;
}

export default App;