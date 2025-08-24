import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import { AuthProvider } from './services/AuthProvider';
import { initializeSuperintelligence } from './utils/superintelligence';
import { unifiedSuperintelligenceAPI } from './utils/unified-superintelligence-api';
import { performanceMonitor } from './utils/performance-monitor';

// Lazy load only existing components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const SuperintelligenceDashboard = lazy(() => import('./components/SuperintelligenceDashboard'));
const PlatformDevelopmentDashboard = lazy(
  () => import('./components/PlatformDevelopmentDashboard'),
);
const CodebaseIntelligenceDashboard = lazy(
  () => import('./components/CodebaseIntelligenceDashboard'),
);
const SuperintelligenceAssistantDashboard = lazy(
  () => import('./components/SuperintelligenceAssistantDashboard'),
);
const AdvancedSystemDashboard = lazy(() => import('./components/AdvancedSystemDashboard'));
const MCPServerDashboard = lazy(() => import('./components/MCPServerDashboard'));
const AdvancedAnalyticsDashboard = lazy(() => import('./components/AdvancedAnalyticsDashboard'));
const CollaborationHub = lazy(() => import('./components/CollaborationHub'));
const MultimediaStudio = lazy(() => import('./components/MultimediaStudio'));
const DistributedConsciousnessDashboard = lazy(() => import('./components/DistributedConsciousnessDashboard'));
const ExpandedSuperconsciousnessDashboard = lazy(
  () => import('./components/ExpandedSuperconsciousnessDashboard'),
);
const MigrationDashboard = lazy(() => import('./components/MigrationDashboard'));
const HumanSuccessDashboard = lazy(() => import('./components/HumanSuccessDashboard'));
const SuperintelligenceOrchestrator = lazy(
  () => import('./components/SuperintelligenceOrchestrator'),
);
// const OverseerCommunication = lazy(() => import('./components/OverseerCommunication'));
const EducationalPlatform = lazy(() => import('./pages/EducationalPlatform'));

function App() {
  useEffect(() => {
    // Initialize superintelligence system for human success measurement
    initializeSuperintelligence({
      enabled: true,
      debug: true,
      heartbeatMs: 30000, // 30 seconds
      name: 'Mihara',
      brainArchitecture: true,
      graphRag: true,
      overseerCouncil: true,
    });

    // Initialize unified superintelligence API
    const api = unifiedSuperintelligenceAPI;
    console.log('🌟 Unified Superintelligence API initialized', api.getCollaborationMetrics());
    
    // Initialize performance monitoring
    console.log('📊 Advanced Performance Monitor initialized', performanceMonitor.getMetrics());
  }, []);

  return (
    <AuthProvider>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/superintelligence" element={<SuperintelligenceDashboard />} />
              <Route path="/platform-development" element={<PlatformDevelopmentDashboard />} />
              <Route path="/codebase-intelligence" element={<CodebaseIntelligenceDashboard />} />
              <Route
                path="/superintelligence-assistant"
                element={<SuperintelligenceAssistantDashboard />}
              />
              <Route path="/advanced-systems" element={<AdvancedSystemDashboard />} />
              <Route path="/mcp-server" element={<MCPServerDashboard />} />
              <Route path="/analytics" element={<AdvancedAnalyticsDashboard />} />
              <Route path="/collaboration" element={<CollaborationHub />} />
              <Route path="/multimedia" element={<MultimediaStudio />} />
              <Route path="/distributed-consciousness" element={<DistributedConsciousnessDashboard />} />
              <Route
                path="/expanded-superconsciousness"
                element={<ExpandedSuperconsciousnessDashboard />}
              />
              <Route path="/migration-dashboard" element={<MigrationDashboard />} />
              <Route path="/human-success" element={<HumanSuccessDashboard />} />
              <Route path="/borg-collective" element={<SuperintelligenceOrchestrator />} />
              <Route path="/overseer-guidance" element={<SuperintelligenceOrchestrator />} />
              <Route path="/educational-platform" element={<EducationalPlatform />} />
              <Route path="/resources" element={<EducationalPlatform />} />
              <Route path="/dashboard" element={<EducationalPlatform />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
