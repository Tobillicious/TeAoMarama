import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/LoadingSpinner';
import Navigation from './components/Navigation';

// Simplified imports to avoid Node.js module issues
import Home from './pages/Home';
import EducationalPlatformWorking from './pages/EducationalPlatformWorking';

function App() {
  return (
    <div className="App">
      <Navigation />
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/platform" element={<EducationalPlatformWorking />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;