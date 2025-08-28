import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';

// Simplified imports to avoid Node.js module issues
import EducationalPlatformWorking from './pages/EducationalPlatformWorking';
import Home from './pages/Home';

// Import the new enhanced components
import AdvancedEducationalDashboard from './components/AdvancedEducationalDashboard';
import AdvancedPerformanceMonitor from './components/AdvancedPerformanceMonitor';

import CulturalLearningActivities from './components/CulturalLearningActivities';
import EducationalPlatformOverview from './components/EducationalPlatformOverview';

import EnhancedTeachingContentQualityDashboard from './components/EnhancedTeachingContentQualityDashboard';
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

const WisdomEvolutionDashboardLazy = lazy(
  () => import(/* webpackChunkName: "wisdom-evolution" */ './components/WisdomEvolutionDashboard'),
);

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/performance-monitor" element={<AdvancedPerformanceMonitor />} />
            <Route path="/" element={<EducationalPlatformOverview />} />
            <Route path="/home" element={<Home />} />
            <Route path="/educational-platform" element={<EducationalPlatformWorking />} />
            <Route path="/educational-dashboard" element={<AdvancedEducationalDashboard />} />
            <Route path="/cultural-activities" element={<CulturalLearningActivities />} />
            <Route path="/advanced-analytics" element={<AdvancedAnalyticsDashboard />} />
            <Route path="/wisdom-evolution" element={<WisdomEvolutionDashboardLazy />} />
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
            <Route path="/student-dashboard" element={<StudentDashboard />} />

            <Route path="/teaching-quality" element={<EnhancedTeachingContentQualityDashboard />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
