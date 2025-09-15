import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import { DualRoleAuthProvider } from './services/DualRoleAuthProvider';
import { performanceMonitor, registerServiceWorker } from './utils/performance-optimizer';

// Essential pages only - no duplicates
const Home = lazy(() => import('./pages/Home'));
const HumanFocusedHomepage = lazy(() => import('./components/HumanFocusedHomepage'));
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
const TeacherSubscription = lazy(() => import('./pages/TeacherSubscription'));
const TeacherDemoDashboard = lazy(() => import('./components/TeacherDemoDashboard'));
// Temporarily disabled due to missing dependencies
// const ComprehensiveSearchInterface = lazy(
//   () => import('./components/ComprehensiveSearchInterface'),
// );
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
const PremiumLessonPlanShowcase = lazy(() => import('./components/PremiumLessonPlanShowcase'));
const RoyalCommandDashboard = lazy(() => import('./components/RoyalCommandDashboard'));

function App() {
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
        {!isLandingPage && <Navigation />}
        <main className="main-content">
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Landing */}
                <Route path="/" element={<HumanFocusedHomepage />} />
                <Route path="/home" element={<Home />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<TeacherSignupFlow />} />

                {/* Core Dashboards - single route each */}
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student-engaging" element={<EngagingStudentDashboard />} />

                {/* Resources - single route */}
                <Route path="/resources" element={<ResourceBrowser />} />
                <Route path="/human-content" element={<HumanReadableContentBrowser />} />
                {/* <Route path="/search" element={<ComprehensiveSearchInterface />} /> */}
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
                <Route path="/subscribe" element={<TeacherSubscription />} />
                <Route path="/pricing" element={<TeacherSubscription />} />
                <Route path="/dashboard-beta" element={<TeacherDashboardBeta />} />
                <Route path="/premium-lessons" element={<PremiumLessonPlanShowcase />} />
                <Route path="/royal-command" element={<RoyalCommandDashboard />} />

                <Route path="/teacher-demo" element={<TeacherDemoDashboard />} />

                {/* Static Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </DualRoleAuthProvider>
  );
}

export default App;
