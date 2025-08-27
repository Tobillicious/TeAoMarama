import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';

// Simplified imports to avoid Node.js module issues
import EducationalPlatformWorking from './pages/EducationalPlatformWorking';
import Home from './pages/Home';

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

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/educational-platform" element={<EducationalPlatformWorking />} />
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
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
