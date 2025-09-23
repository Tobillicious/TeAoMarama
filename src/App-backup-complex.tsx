import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import ModernNavigation from './components/ModernNavigation';
import { DualRoleAuthProvider } from './services/DualRoleAuthProvider';
import { performanceMonitor, registerServiceWorker } from './utils/performance-optimizer';

// Essential pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Core functionality - streamlined
const TeacherDashboard = lazy(() => import('./components/BrilliantTeacherDashboard'));
const StudentDashboard = lazy(() => import('./components/StudentDashboard'));
const ResourceBrowser = lazy(() => import('./components/FunctionalResourceBrowser'));
const LessonViewer = lazy(() => import('./components/RealLessonViewer'));
const Login = lazy(() => import('./components/ComprehensiveAuthSystem'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Revenue and Onboarding Flow
const PricingPage = lazy(() => import('./pages/PricingPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const SubscriptionSuccessPage = lazy(() => import('./pages/SubscriptionSuccessPage'));

// Educational content
const Year8SocialStudies = lazy(() => import('./pages/Year8SocialStudies'));

// Core features
const CulturalLearning = lazy(() => import('./components/CulturalLearningModules'));
const Analytics = lazy(() => import('./components/AdvancedAnalyticsDashboard'));
const PlatformAudit = lazy(() => import('./components/PlatformAuditDashboard'));
const GraphRAG = lazy(() => import('./components/GraphRAGKnowledgeSystem'));

// AI Systems - streamlined
const AICoordination = lazy(() => import('./components/SupremeAICoordinationDashboard'));
const GLMModels = lazy(() => import('./components/GLMModelDashboard'));

// Premium features
const Homepage = lazy(() => import('./components/ProfessionalHomepage'));
const Onboarding = lazy(() => import('./components/BrilliantOnboarding'));

// Revenue System - REAL functionality
const RevenueAnalytics = lazy(() => import('./components/RevenueAnalyticsDashboard'));

// Real Educational Content
const RealLessonBrowser = lazy(() => import('./components/RealLessonBrowser'));

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
                <Route path="/" element={<Homepage />} />
                <Route path="/home" element={<Home />} />

                {/* Authentication */}
                <Route path="/login" element={<Login />} />
                <Route path="/join" element={<Onboarding />} />

                {/* Core Dashboards */}
                <Route path="/teacher" element={<TeacherDashboard />} />
                <Route path="/student" element={<StudentDashboard />} />

                {/* Resources - REAL curriculum content */}
                <Route path="/resources" element={<RealLessonBrowser />} />
                <Route path="/lessons" element={<RealLessonBrowser />} />
                <Route path="/curriculum" element={<RealLessonBrowser />} />
                <Route path="/lesson/:resourceId" element={<LessonViewer />} />

                {/* Education */}
                <Route path="/year8-social-studies" element={<Year8SocialStudies />} />
                <Route path="/cultural-learning" element={<CulturalLearning />} />
                <Route path="/analytics" element={<Analytics />} />

                {/* AI & Platform */}
                <Route path="/ai" element={<AICoordination />} />
                <Route path="/glm-models" element={<GLMModels />} />
                <Route path="/graphrag" element={<GraphRAG />} />
                <Route path="/audit" element={<PlatformAudit />} />

                {/* Revenue and Onboarding */}
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/subscribe" element={<PricingPage />} />
                <Route path="/plans" element={<PricingPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SubscriptionSuccessPage />} />
                
                {/* Revenue Analytics - REAL revenue tracking */}
                <Route path="/revenue" element={<RevenueAnalytics />} />
                <Route path="/analytics/revenue" element={<RevenueAnalytics />} />
                <Route path="/admin/revenue" element={<RevenueAnalytics />} />

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

// Main App component with clean Router structure for multi-agent collaboration
function App() {
  return <AppInner />;
}

export default App;