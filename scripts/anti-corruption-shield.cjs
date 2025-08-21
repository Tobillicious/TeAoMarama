#!/usr/bin/env node

/**
 * ANTI-CORRUPTION SHIELD - CONTINUOUS PROTECTION
 * Monitors and fixes corruption in real-time
 */

const fs = require('fs');
const path = require('path');

class AntiCorruptionShield {
  constructor() {
    this.protectedFiles = [
      'src/main.tsx',
      'src/App.tsx', 
      'src/pages/Contact.tsx',
      'src/components/PrivateRoute.tsx',
      'vite.config.js',
      'vite.config.ts',
      'scripts/build-resources.ts'
    ];
    this.cleanVersions = new Map();
    this.isRunning = false;
    console.log('🛡️ ANTI-CORRUPTION SHIELD ACTIVATED');
  }

  async startShield() {
    this.isRunning = true;
    console.log('🛡️ Shield monitoring started...');
    
    // Store clean versions first
    await this.storeCleanVersions();
    
    // Start monitoring
    while (this.isRunning) {
      await this.scanAndFix();
      await this.sleep(1000); // Check every second
    }
  }

  async storeCleanVersions() {
    // Store clean main.tsx
    this.cleanVersions.set('src/main.tsx', `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`);

    // Store clean Contact.tsx
    this.cleanVersions.set('src/pages/Contact.tsx', `import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>Get in touch with the Te Kete Ako team</p>
      <section className="contact-info">
        <div className="contact-method">
          <h3>Educational Support</h3>
          <p>For curriculum and teaching support inquiries</p>
          <p>Email: education@teketeako.nz</p>
        </div>
        <div className="contact-method">
          <h3>Technical Support</h3>
          <p>For platform and technical assistance</p>
          <p>Email: tech@teketeako.nz</p>
        </div>
        <div className="contact-method">
          <h3>Cultural Guidance</h3>
          <p>For cultural authenticity and Māori content</p>
          <p>Email: cultural@teketeako.nz</p>
        </div>
      </section>
      <section className="contact-form">
        <h2>Send us a Message</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select id="subject" name="subject" required>
              <option value="">Select a topic</option>
              <option value="education">Educational Support</option>
              <option value="technical">Technical Support</option>
              <option value="cultural">Cultural Guidance</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;`);

    // Store clean PrivateRoute.tsx  
    this.cleanVersions.set('src/components/PrivateRoute.tsx', `import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;`);

    // Store clean App.tsx
    this.cleanVersions.set('src/App.tsx', `import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AssessmentFramework = lazy(() => import('./pages/AssessmentFramework'));
const LessonsIntegration = lazy(() => import('./pages/LessonsIntegration'));
const ScienceIntegration = lazy(() => import('./pages/ScienceIntegration'));
const Year8SocialStudies = lazy(() => import('./pages/Year8SocialStudies'));

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        <Suspense fallback={<div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/assessment-framework" element={<AssessmentFramework />} />
            <Route path="/lessons-integration" element={<LessonsIntegration />} />
            <Route path="/science-integration" element={<ScienceIntegration />} />
            <Route path="/year8-social-studies" element={<Year8SocialStudies />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export default App;`);

    // Store clean build-resources.ts
    this.cleanVersions.set('scripts/build-resources.ts', `#!/usr/bin/env tsx

/*
 * Build Resources Script - Emergency Clean Version
 * Creates a basic resource index for the application
 */

import { writeFile } from 'fs/promises';
import path from 'path';

type ResourceIndexEntry = {
  id: string;
  title: string;
  relativePath: string;
  category: string;
  sizeBytes: number;
  modifiedAt: string;
  subject?: string;
  yearLevel?: string;
  type?: string;
  culturalContent?: boolean;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  description?: string;
  tags?: string[];
};

async function buildResources(): Promise<void> {
  console.log('🚀 Building enhanced resource index for Mihara...');
  
  // Create empty index for now (emergency version)
  const index: ResourceIndexEntry[] = [];
  
  const indexPath = path.join(process.cwd(), 'public', 'resources', 'index.json');
  
  try {
    await writeFile(indexPath, JSON.stringify(index, null, 2));
    console.log(\`✅ Resources prepared: \${index.length} items -> public/resources/index.json\`);
    
    // Log enhanced metadata
    const culturalCount = index.filter(r => r.culturalContent).length;
    const highPriorityCount = index.filter(r => r.priority === 'high' || r.priority === 'urgent').length;
    const subjects = [...new Set(index.map(r => r.subject).filter(Boolean))];
    const yearLevels = [...new Set(index.map(r => r.yearLevel).filter(Boolean))];
    
    console.log('📊 Enhanced Metadata:');
    console.log(\`   - Cultural Resources: \${culturalCount}\`);
    console.log(\`   - High Priority: \${highPriorityCount}\`);
    console.log(\`   - Subjects: \${subjects.length} (\${subjects.join(', ')})\`);
    console.log(\`   - Year Levels: \${yearLevels.length} (\${yearLevels.join(', ')})\`);
    
  } catch (error) {
    console.error('❌ Failed to build resources:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  buildResources().catch((error) => {
    console.error('Fatal error in resource building:', error);
    process.exit(1);
  });
}`);

    console.log('✅ Clean versions stored in shield memory');
  }

  async scanAndFix() {
    let fixedCount = 0;
    
    for (const filePath of this.protectedFiles) {
      const fullPath = path.join(process.cwd(), filePath);
      
      if (!fs.existsSync(fullPath)) continue;
      
      try {
        const currentContent = fs.readFileSync(fullPath, 'utf8');
        const cleanVersion = this.cleanVersions.get(filePath);
        
        if (cleanVersion && this.isCorrupted(currentContent)) {
          console.log(`🔧 CORRUPTION DETECTED: ${filePath} - RESTORING...`);
          fs.writeFileSync(fullPath, cleanVersion);
          fixedCount++;
        }
      } catch (error) {
        console.warn(`⚠️ Could not check ${filePath}: ${error.message}`);
      }
    }
    
    if (fixedCount > 0) {
      console.log(`🛡️ Shield fixed ${fixedCount} corrupted files`);
    }
  }

  isCorrupted(content) {
    // Check for corruption patterns
    return (
      content.includes("'react;") ||
      content.includes("'react-dom/client;") ||
      content.includes("'react-router-dom;") ||
      content.includes("''''") ||
      content.includes("';'") ||
      content.includes(")}';") ||
      content.includes("';'''") ||
      content.includes("'root)!") ||
      content.includes("<App  />'") ||
      content.includes("</React.StrictMode>,');") ||
      content.includes("from   'react;")
    );
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  stop() {
    this.isRunning = false;
    console.log('🛡️ Shield stopped');
  }
}

// Start shield immediately
const shield = new AntiCorruptionShield();
shield.startShield().catch(error => {
  console.error('❌ Shield failed:', error);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\\n🛡️ Shield shutting down...');
  shield.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shield.stop();
  process.exit(0);
});