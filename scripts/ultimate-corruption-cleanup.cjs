#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

async function ultimateCorruptionCleanup() {
  console.log('🚨 ULTIMATE CORRUPTION CLEANUP STRIKE FORCE DEPLOYED');
  console.log('🎯 TARGET: Fix ALL corrupted files');

  const directories = ['migration', 'src', 'scripts'];
  let fixedFiles = 0;

  for (const dir of directories) {
    try {
      const files = getTypeScriptFiles(dir);
      console.log(`📊 Processing ${files.length} files in ${dir}`);

      for (const file of files) {
        try {
          const content = fs.readFileSync(file, 'utf-8');
          const originalContent = content;

          // ULTIMATE CORRUPTION CLEANUP FIXES
          let fixedContent = content
            // Fix corrupted import statements
            .replace(/import\s*{([^}]+)}\s*from\s*['"]([^'"]+)['"]/g, "import {$1} from '$2'")
            .replace(/import\s+([^]+)\s+from\s+['"]([^'"]+)['"]/g, "import $1 from '$2'")

            // Fix corrupted export statements
            .replace(/export\s*{([^}]+)}/g, 'export {$1}')
            .replace(/export\s+default\s+([^]+)/g, 'export default $1')

            // Fix corrupted interface declarations
            .replace(/interface\s+(\w+)\s*{([^}]+)}/g, (match, name, body) => {
              const cleanBody = body
                .replace(/+/g, '')
                .replace(/\s*/g, '')
                .replace(/\s*/g, '')
                .trim();
              return `interface ${name} {\n  ${cleanBody
                .split('')
                .filter((s) => s.trim())
                .join('\n  ')}\n}`;
            })

            // Fix corrupted class declarations
            .replace(/class\s+(\w+)\s*{([^}]+)}/g, (match, name, body) => {
              const cleanBody = body
                .replace(/+/g, '')
                .replace(/\s*/g, '')
                .replace(/\s*/g, '')
                .trim();
              return `class ${name} {\n  ${cleanBody
                .split('')
                .filter((s) => s.trim())
                .join('\n  ')}\n}`;
            })

            // Fix corrupted function declarations
            .replace(/function\s+(\w+)\s*\(([^)]*)\)\s*{([^}]+)}/g, (match, name, params, body) => {
              const cleanBody = body
                .replace(/+/g, '')
                .replace(/\s*/g, '')
                .replace(/\s*/g, '')
                .trim();
              return `function ${name}(${params}) {\n  ${cleanBody
                .split('')
                .filter((s) => s.trim())
                .join('\n  ')}\n}`;
            })

            // Fix corrupted const declarations
            .replace(/const\s+(\w+)\s*=\s*([^]+)/g, 'const $1 = $2')

            // Fix corrupted let declarations
            .replace(/let\s+(\w+)\s*=\s*([^]+)/g, 'let $1 = $2')

            // Fix corrupted type declarations
            .replace(/type\s+(\w+)\s*=\s*([^]+)/g, 'type $1 = $2')

            // Fix corrupted async function declarations
            .replace(
              /async\s+function\s+(\w+)\s*\(([^)]*)\)\s*{([^}]+)}/g,
              (match, name, params, body) => {
                const cleanBody = body
                  .replace(/+/g, '')
                  .replace(/\s*/g, '')
                  .replace(/\s*/g, '')
                  .trim();
                return `async function ${name}(${params}) {\n  ${cleanBody
                  .split('')
                  .filter((s) => s.trim())
                  .join('\n  ')}\n}`;
              },
            )

            // Fix corrupted arrow functions
            .replace(
              /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>\s*{([^}]+)}/g,
              (match, name, params, body) => {
                const cleanBody = body
                  .replace(/+/g, '')
                  .replace(/\s*/g, '')
                  .replace(/\s*/g, '')
                  .trim();
                return `const ${name} = (${params}) => {\n  ${cleanBody
                  .split('')
                  .filter((s) => s.trim())
                  .join('\n  ')}\n}`;
              },
            )

            // Fix corrupted object literals
            .replace(/(\w+):\s*(;[;^;]+)*/g, '$1: $2')
            .replace(/(\w+):\s*([^]+)*/g, '$1: $2')

            // Fix corrupted array literals
            .replace(/([^]+)*/g, '$1')
            .replace(/([;^;]+)*/g, '$1')

            // Fix missing semicolons
            .replace(/(\w+)\s*=\s*([^]+)(?!\s*)/g, '$1 = $2')
            .replace(/(\w+)\s*:\s*([^]+)(?!\s*)/g, '$1: $2')

            // Fix extra semicolons
            .replace(/+/g, '')
            .replace(/\s*/g, '')
            .replace(/\s*/g, '')

            // Fix trailing commas
            .replace(/(\s*[}\]])/g, '$1')

            // Fix multiple spaces
            .replace(/\s+/g, ' ')

            // Fix empty lines
            .replace(/\n\s*\n\s*\n/g, '\n\n');

          if (fixedContent !== originalContent) {
            fs.writeFileSync(file, fixedContent, 'utf-8');
            fixedFiles++;
            console.log(`✅ Ultimate corruption cleanup applied to: ${file}`);
          }
        } catch (error) {
          console.error(`❌ Error fixing file ${file}:`, error);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing directory ${dir}:`, error);
    }
  }

  console.log(`\n🚨 ULTIMATE CORRUPTION CLEANUP COMPLETE:`);
  console.log(`📁 Files fixed: ${fixedFiles}`);
}

function getTypeScriptFiles(dir) {
  const files = [];

  function scanDirectory(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          scanDirectory(fullPath);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Directory doesn't exist, skip
    }
  }

  scanDirectory(dir);
  return files;
}

ultimateCorruptionCleanup().catch(console.error);
