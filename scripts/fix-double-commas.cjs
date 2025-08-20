#!/usr/bin/env node

const fs = require('fs');

async function fixDoubleCommas() {
  console.log('🔧 Fixing Double Commas and Import Issues...');

  const files = ['src/ai/orchestrator.ts', 'src/ai/qa-overseer.ts'];

  let totalFixed = 0;

  for (const filePath of files) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  File not found: ${filePath}`);
        continue;
      }

      let content = fs.readFileSync(filePath, 'utf8');
      const beforeContent = content;

      // Fix double commas in import statements
      content = content.replace(/,\s*,/g, ',');

      // Fix malformed import statements
      content = content.replace(
        /import\s+type\s+\{\s*([^}]+)\s*\}\s*from\s*["']([^"']+)["']/g,
        (match, imports, path) => {
          const cleanImports = imports.replace(/,\s*,/g, ',').replace(/,\s*$/g, '');
          return `import type { ${cleanImports} } from "${path}"`;
        },
      );

      // Fix other common syntax issues
      content = content.replace(/\(\s*,/g, '(');
      content = content.replace(/,\s*\)/g, ')');
      content = content.replace(/\[\s*,/g, '[');
      content = content.replace(/,\s*\]/g, ']');
      content = content.replace(/\{\s*,/g, '{');
      content = content.replace(/,\s*\}/g, '}');

      if (content !== beforeContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        totalFixed++;
        console.log(`✅ Fixed syntax in ${filePath}`);
      } else {
        console.log(`ℹ️  No changes needed in ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
  }

  console.log(`\n🎉 Fixed syntax in ${totalFixed} files`);
}

fixDoubleCommas().catch(console.error);
