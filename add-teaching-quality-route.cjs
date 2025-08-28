const fs = require('fs');
const path = require('path');

const appTsxPath = path.join(__dirname, 'src', 'App.tsx');

try {
  // Read the current App.tsx file
  let appContent = fs.readFileSync(appTsxPath, 'utf8');

  // Check if the import already exists
  if (!appContent.includes('EnhancedTeachingContentQualityDashboard')) {
    // Add the import statement
    const importStatement = "import EnhancedTeachingContentQualityDashboard from './components/EnhancedTeachingContentQualityDashboard';";
    
    // Find the last import statement and add our import after it
    const importRegex = /import.*from.*['"];?\s*$/gm;
    const imports = appContent.match(importRegex);
    
    if (imports) {
      const lastImport = imports[imports.length - 1];
      const lastImportIndex = appContent.lastIndexOf(lastImport) + lastImport.length;
      appContent = appContent.slice(0, lastImportIndex) + '\n' + importStatement + appContent.slice(lastImportIndex);
    } else {
      // If no imports found, add at the beginning after React import
      const reactImportIndex = appContent.indexOf("import React");
      const nextLineIndex = appContent.indexOf('\n', reactImportIndex) + 1;
      appContent = appContent.slice(0, nextLineIndex) + importStatement + '\n' + appContent.slice(nextLineIndex);
    }
  }

  // Check if the route already exists
  if (!appContent.includes('/teaching-quality')) {
    // Find the Routes section and add our route
    const routesMatch = appContent.match(/<Routes>([\s\S]*?)<\/Routes>/);
    
    if (routesMatch) {
      const routesContent = routesMatch[1];
      const newRoute = '\n        <Route path="/teaching-quality" element={<EnhancedTeachingContentQualityDashboard />} />';
      
      // Add the route before the closing Routes tag
      const updatedRoutesContent = routesContent + newRoute;
      appContent = appContent.replace(routesMatch[0], `<Routes>${updatedRoutesContent}\n      </Routes>`);
    }
  }

  // Write the updated content back to the file
  fs.writeFileSync(appTsxPath, appContent, 'utf8');
  
  console.log('✅ Enhanced Teaching Content Quality Dashboard route added successfully!');
  console.log('📍 Route: /teaching-quality');
  console.log('🌟 Supreme AI Overseer: Teaching content quality enhancement system deployed!');
  
} catch (error) {
  console.error('❌ Error adding teaching quality route:', error.message);
  process.exit(1);
}
