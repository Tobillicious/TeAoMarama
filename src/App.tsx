import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import SimpleNavigation from './components/SimpleNavigation';
import {
  performanceMonitor,
  registerServiceWorker,
  useMemoryOptimization,
} from './utils/performance-optimizer';

// Simplified imports to avoid Node.js module issues
import './components/TestRoute.css';
import About from './pages/About';
import Contact from './pages/Contact';
import EducationalPlatformWorking from './pages/EducationalPlatformWorking';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

// Import the new enhanced components
import AdvancedEducationalDashboard from './components/AdvancedEducationalDashboard';
import CulturalLearningModules from './components/CulturalLearningModules';
import EducationalDashboard from './components/EducationalDashboard';
// const AuthenticationSystemLazy = lazy(
//   () => import(/* webpackChunkName: "authentication-system" */ './components/AuthenticationSystem'),
// );

import AdvancedWisdomAccelerator from './components/AdvancedWisdomAccelerator';
import CulturalLearningActivities from './components/CulturalLearningActivities';
import DemoAccessBanner from './components/DemoAccessBanner';
import PerformanceDashboard from './components/PerformanceDashboard';
import SupremeIntelligenceCoordinator from './components/SupremeIntelligenceCoordinator';

import AuthenticationTabs from './components/AuthenticationTabs';
import DatabaseIntegrationSystem from './components/DatabaseIntegrationSystem';
import EnhancedTeachingContentQualityDashboard from './components/EnhancedTeachingContentQualityDashboard';
import LessonManager from './components/LessonManager';
import LessonViewer from './components/LessonViewer';
import WorkingLogin from './components/WorkingLogin';

// Lazy load educational content pages
const Year8SocialStudies = lazy(
  () => import(/* webpackChunkName: "year8-social-studies" */ './pages/Year8SocialStudies'),
);

const Year8ReadingStrategies = lazy(
  () => import(/* webpackChunkName: "year8-reading" */ './pages/Year8ReadingStrategies'),
);

const Year8AcademicVocab = lazy(
  () => import(/* webpackChunkName: "year8-academic-vocab" */ './pages/Year8AcademicVocab'),
);

const Year8WritingUnits = lazy(
  () => import(/* webpackChunkName: "year8-writing-units" */ './pages/Year8WritingUnits'),
);

const Year8CriticalLiteracy = lazy(
  () => import(/* webpackChunkName: "year8-critical-literacy" */ './pages/Year8CriticalLiteracy'),
);

const Year8ReadingUnits = lazy(
  () => import(/* webpackChunkName: "year8-reading-units" */ './pages/Year8ReadingUnits'),
);

// Lazy load superintelligence components
const SuperintelligenceDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "ai-superintelligence" */ './components/SuperintelligenceDashboard'
    ),
);

const SuperintelligenceAssistantDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "ai-assistant" */ './components/SuperintelligenceAssistantDashboard'
    ),
);

const SuperintelligenceAssistanceDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "ai-assistance" */ './components/SuperintelligenceAssistanceDashboard'
    ),
);

const SuperintelligenceOrchestrator = lazy(
  () =>
    import(/* webpackChunkName: "ai-orchestrator" */ './components/SuperintelligenceOrchestrator'),
);

const EducationalResources = lazy(
  () => import(/* webpackChunkName: "educational-resources" */ './pages/EducationalResources'),
);

const AdvancedAnalyticsDashboard = lazy(
  () =>
    import(/* webpackChunkName: "advanced-analytics" */ './components/AdvancedAnalyticsDashboard'),
);

const CollaborationHub = lazy(
  () => import(/* webpackChunkName: "collaboration" */ './components/CollaborationHub'),
);

const MultimediaStudio = lazy(
  () => import(/* webpackChunkName: "multimedia" */ './components/MultimediaStudio'),
);

const StudentDashboard = lazy(
  () => import(/* webpackChunkName: "student-dashboard" */ './components/StudentDashboard'),
);

const TeacherDashboard = lazy(
  () => import(/* webpackChunkName: "teacher-dashboard" */ './components/TeacherDashboard'),
);

import KaitiakiDashboardPage from './pages/KaitiakiDashboard';

const AssessmentFramework = lazy(
  () => import(/* webpackChunkName: "assessment-framework" */ './components/AssessmentFramework'),
);

import CommunityFeedbackSystem from './components/CommunityFeedbackSystem';
import DiagnosticCheck from './components/DiagnosticCheck';
import ResourceUnlocker from './components/ResourceUnlocker';
import ResourceViewer from './components/ResourceViewer';

// WisdomEvolutionDashboard temporarily removed for build
// const WisdomEvolutionDashboardLazy = lazy(
//   () => import(/* webpackChunkName: "wisdom-evolution" */ './components/WisdomEvolutionDashboard'),
// );

// Import the new dual-role authentication components

// Import enhanced educational components
const EnhancedContentDiscovery = lazy(
  () =>
    import(
      /* webpackChunkName: "enhanced-content-discovery" */ './components/EnhancedContentDiscovery'
    ),
);

const CulturalLearningPathNavigator = lazy(
  () =>
    import(
      /* webpackChunkName: "cultural-learning-navigator" */ './components/CulturalLearningPathNavigator'
    ),
);

const InteractiveAssessmentSystem = lazy(
  () =>
    import(
      /* webpackChunkName: "interactive-assessment-system" */ './components/InteractiveAssessmentSystem'
    ),
);

const UnitDetail = lazy(
  () => import(/* webpackChunkName: "unit-detail" */ './components/UnitDetail'),
);

const TeKeteAkoResourceExplorer = lazy(
  () =>
    import(/* webpackChunkName: "te-kete-ako-explorer" */ './components/TeKeteAkoResourceExplorer'),
);

const ProfessionalLessonTemplate = lazy(
  () =>
    import(
      /* webpackChunkName: "professional-lesson-template" */ './components/ProfessionalLessonTemplate'
    ),
);

const UnifiedContentDiscovery = lazy(
  () =>
    import(
      /* webpackChunkName: "unified-content-discovery" */ './components/UnifiedContentDiscovery'
    ),
);

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Performance optimization hooks
  useMemoryOptimization();

  useEffect(() => {
    // Register service worker for offline functionality
    registerServiceWorker();

    // Performance monitoring
    const measurePerformance = async () => {
      try {
        const lcp = await performanceMonitor.measureLCP();
        const fid = await performanceMonitor.measureFID();
        const cls = await performanceMonitor.measureCLS();

        console.log('Performance Metrics:', {
          LCP: `${lcp}ms`,
          FID: `${fid}ms`,
          CLS: cls,
        });
      } catch {
        console.log('Performance monitoring not available in this browser');
      }
    };

    setTimeout(measurePerformance, 2000);
  }, []);

  return (
    <div className="App">
      {!isLandingPage && <DemoAccessBanner />}
      {!isLandingPage && <SimpleNavigation />}
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/login" element={<AuthenticationTabs />} />
            <Route path="/login-old" element={<WorkingLogin />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/kaitiaki-dashboard" element={<KaitiakiDashboardPage />} />
            <Route path="/performance-dashboard" element={<PerformanceDashboard />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/educational-platform" element={<EducationalPlatformWorking />} />
            <Route path="/educational-dashboard" element={<AdvancedEducationalDashboard />} />
            <Route path="/educational-dashboard-new" element={<EducationalDashboard />} />
            <Route path="/cultural-learning-modules" element={<CulturalLearningModules />} />
            <Route path="/cultural-activities" element={<CulturalLearningActivities />} />
            <Route path="/quality-lessons" element={<LessonManager />} />
            <Route path="/lesson/:lessonId" element={<LessonViewer />} />
            <Route path="/advanced-analytics" element={<AdvancedAnalyticsDashboard />} />
            {/* <Route path="/wisdom-evolution" element={<WisdomEvolutionDashboardLazy />} /> */}
            <Route path="/wisdom-accelerator" element={<AdvancedWisdomAccelerator />} />
            <Route path="/supreme-coordination" element={<SupremeIntelligenceCoordinator />} />
            <Route path="/superintelligence" element={<SuperintelligenceDashboard />} />
            <Route
              path="/superintelligence-assistant"
              element={<SuperintelligenceAssistantDashboard />}
            />
            <Route
              path="/superintelligence-assistance"
              element={<SuperintelligenceAssistanceDashboard />}
            />
            <Route path="/borg-collective" element={<SuperintelligenceOrchestrator />} />
            <Route path="/overseer-guidance" element={<SuperintelligenceOrchestrator />} />
            <Route path="/educational-resources" element={<EducationalResources />} />
            <Route path="/year8-social-studies" element={<Year8SocialStudies />} />
            <Route path="/year8-reading" element={<Year8ReadingStrategies />} />
            <Route path="/year8-academic-vocab" element={<Year8AcademicVocab />} />
            <Route path="/year8-writing-units" element={<Year8WritingUnits />} />
            <Route path="/year8-critical-literacy" element={<Year8CriticalLiteracy />} />
            <Route path="/year8-reading-units" element={<Year8ReadingUnits />} />
            <Route path="/year8-writing" element={<Year8WritingUnits />} />
            <Route path="/year8-vocab" element={<Year8AcademicVocab />} />
            <Route path="/analytics" element={<AdvancedAnalyticsDashboard />} />
            <Route path="/collaboration" element={<CollaborationHub />} />
            <Route path="/multimedia" element={<MultimediaStudio />} />
            <Route path="/assessment-framework" element={<AssessmentFramework />} />
            {/* <Route path="/authentication" element={<AuthenticationSystemLazy />} /> */}
            <Route path="/community-feedback" element={<CommunityFeedbackSystem />} />
            <Route path="/teaching-quality" element={<EnhancedTeachingContentQualityDashboard />} />
            <Route path="/database-integration" element={<DatabaseIntegrationSystem />} />
            <Route path="/resource-unlocker" element={<ResourceUnlocker />} />
            {/* Enhanced Educational Components */}
            <Route path="/enhanced-content-discovery" element={<EnhancedContentDiscovery />} />
            <Route path="/content-discovery" element={<EnhancedContentDiscovery />} />
            <Route path="/cultural-learning-paths" element={<CulturalLearningPathNavigator />} />
            <Route path="/learning-pathways" element={<CulturalLearningPathNavigator />} />
            <Route path="/interactive-assessments" element={<InteractiveAssessmentSystem />} />
            <Route path="/cultural-assessments" element={<InteractiveAssessmentSystem />} />
            <Route path="/smart-search" element={<EnhancedContentDiscovery />} />
            {/* Unit Detail Routes */}
            <Route path="/unit/:unitId" element={<UnitDetail />} />
            {/* TeKeteAko Resources */}
            <Route path="/te-kete-ako-resources" element={<TeKeteAkoResourceExplorer />} />
            <Route path="/resources/te-kete-ako" element={<TeKeteAkoResourceExplorer />} />
            {/* Professional Lesson Templates */}
            <Route path="/professional-lesson-templates" element={<ProfessionalLessonTemplate />} />
            <Route path="/lesson-templates" element={<ProfessionalLessonTemplate />} />
            {/* Unified Content Discovery */}
            <Route path="/unified-content-discovery" element={<UnifiedContentDiscovery />} />
            <Route path="/content-discovery" element={<UnifiedContentDiscovery />} />
            <Route path="/discover" element={<UnifiedContentDiscovery />} />
            {/* Additional missing routes */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/resources" element={<EducationalResources />} />
            <Route path="/diagnostic" element={<DiagnosticCheck />} />
            <Route path="/resource-viewer" element={<ResourceViewer />} />
            {/* StyleGuide route removed - component doesn't exist */}
            <Route path="/register" element={<AuthenticationTabs />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
