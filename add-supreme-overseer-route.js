#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const appTsxPath = path.join(__dirname, 'src', 'App.tsx');

try {
  let content = fs.readFileSync(appTsxPath, 'utf8');

  // Add import statement
  if (!content.includes('SupremeOverseerCommandCenter')) {
    const importMatch = content.match(/import.*Dashboard.*from.*['"]\.\/components\/.*['"];?\s*$/m);
    if (importMatch) {
      const importStatement =
        "import SupremeOverseerCommandCenter from './components/SupremeOverseerCommandCenter';\n";
      content = content.replace(importMatch[0], importMatch[0] + importStatement);
    }
  }

  // Add route
  if (!content.includes('/supreme-overseer')) {
    const routeMatch = content.match(/<Route.*path.*element.*\/>\s*$/m);
    if (routeMatch) {
      const routeStatement =
        '        <Route path="/supreme-overseer" element={<SupremeOverseerCommandCenter />} />\n';
      content = content.replace(routeMatch[0], routeStatement + routeMatch[0]);
    }
  }

  fs.writeFileSync(appTsxPath, content);
  console.log('✅ Successfully added SupremeOverseerCommandCenter route to App.tsx');
} catch (error) {
  console.error('❌ Error updating App.tsx:', error.message);
}
