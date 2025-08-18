import { Suspense, lazy, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';

// Lazy load components for code splitting with preloading
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ResourcesEnhanced = lazy(() => import('./pages/ResourcesEnhanced'));
const DocPage = lazy(() => import('./pages/DocPage'));
const ResourceViewer = lazy(() => import('./pages/ResourceViewer'));
const Login = lazy(() => import('./components/Login'));
const SignUp = lazy(() => import('./components/SignUp'));
const StyleGuide = lazy(() => import('./pages/StyleGuide'));
const MiharaDashboard = lazy(() => import('./components/MiharaDashboard'));
const UnitPlan = lazy(() => import('./pages/UnitPlan'));
const LessonPlan = lazy(() => import('./pages/LessonPlan'));
const StructuredLiteracyUnit = lazy(() => import('./pages/StructuredLiteracyUnit'));
const StructuredLiteracyUnits = lazy(() => import('./pages/StructuredLiteracyUnits'));
const PhoneticsCards = lazy(() => import('./pages/PhoneticsCards'));
const PhonologicalAwareness = lazy(() => import('./pages/PhonologicalAwareness'));
const SightWords = lazy(() => import('./pages/SightWords'));
const AdvancedMorphology = lazy(() => import('./pages/AdvancedMorphology'));
const Year8AcademicVocab = lazy(() => import('./pages/Year8AcademicVocab'));
const Year8ReadingStrategies = lazy(() => import('./pages/Year8ReadingStrategies'));
const Year8WritingRevolution = lazy(() => import('./pages/Year8WritingRevolution'));
const Year8CriticalLiteracy = lazy(() => import('./pages/Year8CriticalLiteracy'));
const Year8ReadingUnits = lazy(() => import('./pages/Year8ReadingUnits'));
const Year8WritingUnits = lazy(() => import('./pages/Year8WritingUnits'));
const Year8SocialStudiesUnits = lazy(() => import('./pages/Year8SocialStudiesUnits'));

// Optimized loading component with React.memo
const LoadingSpinner = memo(() => (
  <div className="min-h-screen flex items-center justify-center lcp-optimized loading-spinner-container">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
      <p className="text-lg font-medium loading-spinner-text">Loading TeAoMarama...</p>
    </div>
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

// Preload critical routes for better performance
const preloadCriticalRoutes = () => {
  // Preload dashboard and resources as they're likely to be accessed
  const preloadDashboard = () => import('./pages/Dashboard');
  const preloadResources = () => import('./pages/ResourcesEnhanced');

  // Preload after initial render
  setTimeout(() => {
    preloadDashboard();
    preloadResources();
  }, 1000);
};

function App() {
  // Memoize routes configuration for better performance
  const routes = useMemo(
    () => [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/resources', element: <ResourcesEnhanced /> },
      { path: '/mihara', element: <MiharaDashboard /> },
      { path: '/resource', element: <ResourceViewer /> },
      { path: '/doc', element: <DocPage /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/styleguide', element: <StyleGuide /> },
      { path: '/unit-plan', element: <UnitPlan /> },
      { path: '/lesson-plan', element: <LessonPlan /> },
      { path: '/structured-literacy', element: <StructuredLiteracyUnit /> },
      { path: '/structured-literacy-units', element: <StructuredLiteracyUnits /> },
      { path: '/phonetics-cards', element: <PhoneticsCards /> },
      { path: '/phonological-awareness', element: <PhonologicalAwareness /> },
      { path: '/sight-words', element: <SightWords /> },
      { path: '/advanced-morphology', element: <AdvancedMorphology /> },
      { path: '/year8-academic-vocab', element: <Year8AcademicVocab /> },
      { path: '/year8-reading-strategies', element: <Year8ReadingStrategies /> },
      { path: '/year8-writing-revolution', element: <Year8WritingRevolution /> },
      { path: '/year8-critical-literacy', element: <Year8CriticalLiteracy /> },
      { path: '/year8-reading-units', element: <Year8ReadingUnits /> },
      { path: '/year8-writing-units', element: <Year8WritingUnits /> },
      { path: '/year8-social-studies-units', element: <Year8SocialStudiesUnits /> },
    ],
    [],
  );

  // Preload critical routes after component mounts
  useMemo(() => {
    preloadCriticalRoutes();
  }, []);

  return (
    <div className="App">
      <Navigation />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default memo(App);
