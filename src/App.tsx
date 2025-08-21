import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';
import { AuthProvider } from './services/AuthProvider';

// Lazy load only existing components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MigrationDashboard = lazy(() => import('./components/MigrationDashboard'));
const SuperintelligenceDashboard = lazy(() => import('./components/SuperintelligenceDashboard'));

function App() {
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
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
