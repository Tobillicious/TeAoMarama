import fs from 'fs';
import path from 'path';

const _appTsxPath = path.join(process.cwd(), 'src', 'App.tsx');

function cleanupAppTsx() {
  console.log('🧹 Cleaning up App.tsx...');

  // Read the current file
  let content = fs.readFileSync(appTsxPath, 'utf8');

  // Extract all unique component imports
  const _importRegex = /const\s+([a-zA-Z0-9_]+)\s*=\s*lazy(()\s*=>\s*import('([^']+)'))/g;
  const _imports = new Map();

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const _variableName = match[1];
    const _importPath = match[2];

    // Skip invalid variable names
    if (variableName.includes('.') || variableName.includes('-')) {
      continue;
    }

    imports.set(variableName, importPath);
  }

  // Extract all unique routes
  const _routeRegex = /\{\s*path:\s*'([^']+)',\s*element:\s*<([^>]+)\s*/>\s*\}/g;
  const _routes = new Map();

  while ((match = routeRegex.exec(content)) !== null) {
    const _path = match[1];
    const _component = match[2];

    // Skip invalid component names
    if (component.includes('.') || component.includes('-')) {
      continue;
    }

    routes.set(path, component);
  }

  // Rebuild the file
  let newContent = `import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load components
`;

  // Add all imports
  for (const [variableName, importPath] of imports) {
    newContent += `const ${variableName} = lazy(() => import('${importPath}'));\n`;
  }

  newContent += `
function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
`;

  // Add all routes properly wrapped in Route components
  for (const [path, component] of routes) {
    newContent += `            <Route path="${path}" element={<${component} />} />\n`;
  }

  newContent += `          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
`;

  fs.writeFileSync(appTsxPath, newContent);

  console.log(`✅ Cleaned up App.tsx with ${imports.size} components and ${routes.size} routes`);
}

cleanupAppTsx();
