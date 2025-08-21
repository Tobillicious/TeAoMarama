import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';

// Lazy load only existing components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const MigrationDashboard = lazy(() => import('./components/MigrationDashboard'));

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/migration-dashboard" element={<MigrationDashboard />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
