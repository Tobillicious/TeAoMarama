import {lazy, Suspense} from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'
import LoadingSpinner from './components/LoadingSpinner'
import Navigation from './components/Navigation'

// Simplified lazy loading - only essential components for now
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

function App() {return (
    <div className="App">
      <Navigation />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Additional routes can be added here as needed */}
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
