import fs from 'fs';
import path from 'path';

const appTsxPath = path.join(process.cwd(), 'src', 'App.tsx');

function kebabToPascalCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

function fixVariableNames() {
  console.log('🔧 Fixing variable names in App.tsx...');

  let content = fs.readFileSync(appTsxPath, 'utf8');

  // Find all const declarations with hyphens
  const constRegex = /const\s+([a-zA-Z0-9-]+)\s*=\s*lazy\(/g;
  const matches = [...content.matchAll(constRegex)];

  let replacements = 0;

  for (const match of matches) {
    const fullMatch = match[0];
    const variableName = match[1];

    if (variableName.includes('-')) {
      const newVariableName = kebabToPascalCase(variableName);
      const newDeclaration = fullMatch.replace(variableName, newVariableName);

      content = content.replace(fullMatch, newDeclaration);
      replacements++;

      console.log(`  Fixed: ${variableName} → ${newVariableName}`);
    }
  }

  // Also fix any route mappings that reference these variables
  for (const match of matches) {
    const variableName = match[1];

    if (variableName.includes('-')) {
      const newVariableName = kebabToPascalCase(variableName);

      // Fix route mappings
      const routeRegex = new RegExp(
        `element:\\s*<${variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*/>`,
        'g',
      );
      content = content.replace(routeRegex, `element: <${newVariableName} />`);

      // Fix any other references
      const refRegex = new RegExp(
        `\\b${variableName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`,
        'g',
      );
      content = content.replace(refRegex, newVariableName);
    }
  }

  fs.writeFileSync(appTsxPath, content);

  console.log(`✅ Fixed ${replacements} variable names!`);
}

fixVariableNames();
