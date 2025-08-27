import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import { AuthProvider } from './services/AuthProvider';

// Priority components - immediate load for critical paths
const Home = lazy(() => import('./pages/Home'));
const EducationalPlatform = lazy(() => import('./pages/EducationalPlatformWorking'));

// Secondary components - load on demand
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// AI/Dashboard components - heavy lazy load with preload hints
const SuperintelligenceDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "ai-superintelligence" */ './components/SuperintelligenceDashboard'
    ),
);
const PlatformDevelopmentDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "dashboard-platform" */ './components/PlatformDevelopmentDashboard'
    ),
);
const CodebaseIntelligenceDashboard = lazy(
  () => import(/* webpackChunkName: "ai-codebase" */ './components/CodebaseIntelligenceDashboard'),
);
const SuperintelligenceAssistantDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "ai-assistant" */ './components/SuperintelligenceAssistantDashboard'
    ),
);
const AdvancedSystemDashboard = lazy(
  () => import(/* webpackChunkName: "dashboard-advanced" */ './components/AdvancedSystemDashboard'),
);
const MCPServerDashboard = lazy(
  () => import(/* webpackChunkName: "dashboard-mcp" */ './components/MCPServerDashboard'),
);
const AdvancedAnalyticsDashboard = lazy(
  () =>
    import(/* webpackChunkName: "dashboard-analytics" */ './components/AdvancedAnalyticsDashboard'),
);
const CollaborationHub = lazy(
  () => import(/* webpackChunkName: "collab-hub" */ './components/CollaborationHub'),
);
const MultimediaStudio = lazy(
  () => import(/* webpackChunkName: "multimedia" */ './components/MultimediaStudio'),
);
const DistributedConsciousnessDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "ai-distributed" */ './components/DistributedConsciousnessDashboard'
    ),
);
const ExpandedSuperconsciousnessDashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "ai-expanded" */ './components/ExpandedSuperconsciousnessDashboard'
    ),
);
const MigrationDashboard = lazy(
  () => import(/* webpackChunkName: "dashboard-migration" */ './components/MigrationDashboard'),
);
const HumanSuccessDashboard = lazy(
  () => import(/* webpackChunkName: "dashboard-success" */ './components/HumanSuccessDashboard'),
);
const SuperintelligenceOrchestrator = lazy(
  () =>
    import(/* webpackChunkName: "ai-orchestrator" */ './components/SuperintelligenceOrchestrator'),
);

function App() {
  const [, setIsAiSystemsReady] = useState(false);

  // Performance mode detection
  const isPerformanceMode = import.meta.env.VITE_PERFORMANCE_MODE === 'aggressive';
  const disableAiFeatures = import.meta.env.VITE_DISABLE_AI_FEATURES === 'true';

  useEffect(() => {
    // Skip AI initialization in performance mode
    if (isPerformanceMode || disableAiFeatures) {
      setIsAiSystemsReady(true);
      return;
    }

    // Defer AI initialization to improve FCP/LCP
    const initializeAiSystems = async () => {
      try {
        // Load AI systems asynchronously after initial render
        const [{ initializeSuperintelligence }] = await Promise.all([
          import('./utils/superintelligence'),
          import('./utils/unified-superintelligence-api'),
          import('./utils/performance-monitor'),
        ]);

        // Initialize with minimal overhead for Core Web Vitals
        initializeSuperintelligence({
          enabled: !isPerformanceMode,
          debug: false, // Reduce console output
          heartbeatMs: isPerformanceMode ? 300000 : 60000, // Much less frequent in perf mode
          name: 'Mihara',
          brainArchitecture: false, // Defer heavy features
          graphRag: false,
          overseerCouncil: false,
        });

        if (typeof window !== 'undefined' && window.requestIdleCallback) {
          // Use idle callback for non-critical initialization
          window.requestIdleCallback(() => {
            if (!isPerformanceMode) {
              console.log('🌟 Unified Superintelligence API ready');
              console.log('📊 Performance Monitor active');
            }
            setIsAiSystemsReady(true);
          });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(
            () => {
              setIsAiSystemsReady(true);
            },
            isPerformanceMode ? 0 : 100,
          );
        }
      } catch (error) {
        if (!isPerformanceMode) {
          console.warn('AI systems initialization deferred:', error);
        }
        setIsAiSystemsReady(true); // Continue without AI for performance
      }
    };

    // Defer initialization to next tick for better FCP
    if (typeof window !== 'undefined') {
      const timeoutId = setTimeout(initializeAiSystems, isPerformanceMode ? 0 : 0);
      return () => clearTimeout(timeoutId);
    }
  }, [isPerformanceMode, disableAiFeatures]);

  // Minimal loading component for performance mode
  const MinimalSpinner = () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200px',
        fontSize: '18px',
        color: '#059669',
      }}
    >
      Loading...
    </div>
  );

  return (
    <AuthProvider>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Suspense fallback={isPerformanceMode ? <MinimalSpinner /> : <LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/educational-platform" element={<EducationalPlatform />} />
              <Route path="/resources" element={<EducationalPlatform />} />
              <Route path="/dashboard" element={<EducationalPlatform />} />

              {/* Essential routes always available */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Tool routes - only functional ones */}
              {!isPerformanceMode && (
                <>
                  <Route path="/analytics" element={<AdvancedAnalyticsDashboard />} />
                  <Route path="/collaboration" element={<CollaborationHub />} />
                  <Route path="/multimedia" element={<MultimediaStudio />} />
                </>
              )}
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
