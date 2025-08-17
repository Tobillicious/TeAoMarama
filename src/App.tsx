import { Suspense, lazy, memo, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

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

// Optimized loading component with React.memo
const LoadingSpinner = memo(() => (
  <div
    className="min-h-screen flex items-center justify-center lcp-optimized"
    style={{ backgroundColor: 'var(--color-bg)' }}
  >
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
      <p className="text-lg font-medium" style={{ color: 'var(--color-pounamu)' }}>
        Loading Te Kete Ako...
      </p>
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
    ],
    [],
  );

  // Preload critical routes after component mounts
  useMemo(() => {
    preloadCriticalRoutes();
  }, []);

  return (
    <div className="App">
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
