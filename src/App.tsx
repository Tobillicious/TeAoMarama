import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SimpleNavigation from './components/SimpleNavigation';
import {
  performanceMonitor,
  registerServiceWorker,
  useMemoryOptimization,
} from './utils/performance-optimizer';

// Essential pages only - no duplicates
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Core functionality only - single version each
const TeacherDashboard = lazy(() => import('./components/ProfessionalTeacherDashboard'));
const StudentDashboard = lazy(() => import('./components/EnhancedStudentDashboard'));
const ResourceBrowser = lazy(() => import('./components/FunctionalResourceBrowser'));
const HumanReadableContentBrowser = lazy(() => import('./components/HumanReadableContentBrowser'));
const LessonViewer = lazy(() => import('./components/RealLessonViewer'));
const Login = lazy(() => import('./components/ComprehensiveAuthSystem'));
const TeacherDemoDashboard = lazy(() => import('./components/TeacherDemoDashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Educational content - keep Year 8 only for now
const Year8SocialStudies = lazy(() => import('./pages/Year8SocialStudies'));

// Cultural Learning and Analytics
const CulturalLearningModules = lazy(() => import('./components/CulturalLearningModules'));
const AdvancedAnalytics = lazy(() => import('./components/AdvancedAnalyticsDashboard'));

// Superintelligence and Advanced Features
const SuperintelligenceDashboard = lazy(() => import('./components/SuperintelligenceDashboard'));
const SuperIntelligenceCoordinator = lazy(
  () => import('./components/SuperIntelligenceCoordinator'),
);
const MultimediaStudio = lazy(() => import('./components/MultimediaStudio'));
const AssessmentHub = lazy(() => import('./components/AdvancedStudentAnalytics')); // Using available component
const PlatformAuditDashboard = lazy(() => import('./components/PlatformAuditDashboard'));
const GLMModelDashboard = lazy(() => import('./components/GLMModelDashboard'));

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
        const lcp = performanceMonitor.measureLCP();
        const fid = performanceMonitor.measureFID();
        const cls = performanceMonitor.measureCLS();

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
      {!isLandingPage && <SimpleNavigation />}
      <main className="main-content">
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Landing */}
              <Route path="/" element={<Home />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />

              {/* Core Dashboards - single route each */}
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />

              {/* Resources - single route */}
              <Route path="/resources" element={<ResourceBrowser />} />
              <Route path="/working-resources" element={<ResourceBrowser />} />
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
              <Route path="/super-intelligence" element={<SuperIntelligenceCoordinator />} />
              <Route path="/multimedia" element={<MultimediaStudio />} />
              <Route path="/assessments" element={<AssessmentHub />} />
              <Route path="/audit" element={<PlatformAuditDashboard />} />
              <Route path="/glm-models" element={<GLMModelDashboard />} />
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
  );
}

export default App;
