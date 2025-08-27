const fs = require('fs');
const path = require('path');

const appTsxPath = path.join(__dirname, 'src', 'App.tsx');

try {
  let content = fs.readFileSync(appTsxPath, 'utf8');

  // Add import statement
  if (!content.includes('AdvancedEducationalDashboard')) {
    const importMatch = content.match(/import.*Dashboard.*from.*['"]\.\/components\/.*['"];?\s*$/m);
    if (importMatch) {
      const importStatement =
        "import AdvancedEducationalDashboard from './components/AdvancedEducationalDashboard';\n";
      content = content.replace(importMatch[0], importMatch[0] + importStatement);
    }
  }

  // Add route
  if (!content.includes('/educational-dashboard')) {
    const routeMatch = content.match(/<Route.*path.*element.*\/>\s*$/m);
    if (routeMatch) {
      const routeStatement =
        '        <Route path="/educational-dashboard" element={<AdvancedEducationalDashboard />} />\n';
      content = content.replace(routeMatch[0], routeStatement + routeMatch[0]);
    }
  }

  fs.writeFileSync(appTsxPath, content);
  console.log('✅ Successfully added AdvancedEducationalDashboard route to App.tsx');
} catch (error) {
  console.error('❌ Error updating App.tsx:', error.message);
}
