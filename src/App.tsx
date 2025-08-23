import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import { AuthProvider } from './services/AuthProvider';
import { initializeSuperintelligence } from './utils/superintelligence';

// Lazy load only existing components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MigrationDashboard = lazy(() => import('./components/MigrationDashboard'));
const SuperintelligenceDashboard = lazy(() => import('./components/SuperintelligenceDashboard'));
const PlatformDevelopmentDashboard = lazy(
  () => import('./components/PlatformDevelopmentDashboard'),
);
const HumanSuccessDashboard = lazy(() => import('./components/HumanSuccessDashboard'));
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
              <Route path="/migration-dashboard" element={<MigrationDashboard />} />
              <Route path="/superintelligence" element={<SuperintelligenceDashboard />} />
              <Route path="/platform-development" element={<PlatformDevelopmentDashboard />} />
              <Route path="/human-success" element={<HumanSuccessDashboard />} />
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
