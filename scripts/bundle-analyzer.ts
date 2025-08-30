#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🔍 **BUNDLE ANALYZER - Te Kura o TeAoMarama**\n');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

try {
  console.log('📦 Building with bundle analysis...');
  
  // Build with analyze mode
  execSync('npm run build:analyze', { stdio: 'inherit' });
  
  console.log('\n✅ Bundle analysis complete!');
  console.log('📊 Open dist/stats.html to view detailed bundle analysis');
  
  // Check bundle sizes
  const distPath = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distPath)) {
    const assetsPath = path.join(distPath, 'assets');
    if (fs.existsSync(assetsPath)) {
      const files = fs.readdirSync(assetsPath);
      const jsFiles = files.filter(file => file.endsWith('.js'));
      
      console.log('\n📋 Bundle Summary:');
      jsFiles.forEach(file => {
        const filePath = path.join(assetsPath, file);
        const stats = fs.statSync(filePath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        console.log(`  ${file}: ${sizeKB} KB`);
      });
    }
  }
  
} catch (error) {
  console.error('❌ Bundle analysis failed:', error);
  process.exit(1);
}
