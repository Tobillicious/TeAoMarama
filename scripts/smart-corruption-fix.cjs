#!/usr/bin/env node

/**
 * SMART CORRUPTION FIX
 * Targets specific corruption patterns found in ESLint output
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SmartCorruptionFix {
  constructor() {
    this.fixedFiles = 0;
    this.fixedErrors = 0;
    console.log('🧠 SMART CORRUPTION FIX ACTIVATED');
  }

  async execute() {
    console.log('🎯 Phase 1: Fix import statement corruption');
    await this.fixImportStatements();
    
    console.log('🎯 Phase 2: Fix unterminated string literals');
    await this.fixUnterminatedStrings();
    
    console.log('🎯 Phase 3: Fix export statement corruption');
    await this.fixExportStatements();
    
    console.log(`✅ SMART FIX COMPLETE: ${this.fixedFiles} files, ${this.fixedErrors} errors fixed`);
  }

  async fixImportStatements() {
    const srcDir = path.join(process.cwd(), 'src');
    await this.processDirectoryForImports(srcDir);
  }

  async processDirectoryForImports(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        await this.processDirectoryForImports(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        await this.fixFileImports(fullPath);
      }
    }
  }

  async fixFileImports(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let fixes = 0;
      
      // Fix: import React from 'react;'''' -> import React from 'react';
      content = content.replace(/import\s+([^'"\s]+)\s+from\s+'([^']+);''''/g, "import $1 from '$2';");
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix: import { something } from 'module;'''' -> import { something } from 'module';
      content = content.replace(/import\s*\{\s*([^}]+)\s*\}\s*from\s*'([^']+);''''/g, "import { $1 } from '$2';");
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix: from 'react; -> from 'react';
      content = content.replace(/from\s+'([^']+);'/g, "from '$1';");
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix: from   'react; -> from 'react';
      content = content.replace(/from\s+\s+'([^']+);/g, "from '$1';");
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix missing quotes in imports
      content = content.replace(/import\s+([^'"\s]+)\s+from\s+([^'";]+);/g, "import $1 from '$2';");
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix missing quotes in curly imports
      content = content.replace(/import\s*\{\s*([^}]+)\s*\}\s*from\s*([^'";]+);/g, "import { $1 } from '$2';");
      fixes += (content !== originalContent) ? 1 : 0;
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.fixedFiles++;
        this.fixedErrors += fixes;
        console.log(`🔧 Fixed ${fixes} import issues in ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.warn(`⚠️ Could not fix imports in ${filePath}: ${error.message}`);
    }
  }

  async fixUnterminatedStrings() {
    const srcDir = path.join(process.cwd(), 'src');
    await this.processDirectoryForStrings(srcDir);
  }

  async processDirectoryForStrings(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        await this.processDirectoryForStrings(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        await this.fixFileStrings(fullPath);
      }
    }
  }

  async fixFileStrings(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let fixes = 0;
      
      // Fix: unterminated strings at end of lines
      content = content.replace(/;'$/gm, ';');
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix: )}'; -> });
      content = content.replace(/\)}';/g, '});');
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix: '; -> ;
      content = content.replace(/';$/gm, ';');
      fixes += (content !== originalContent) ? 1 : 0;
      
      // Fix: trailing quotes
      content = content.replace(/'$/gm, '');
      fixes += (content !== originalContent) ? 1 : 0;
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.fixedFiles++;
        this.fixedErrors += fixes;
        console.log(`🔧 Fixed ${fixes} string issues in ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.warn(`⚠️ Could not fix strings in ${filePath}: ${error.message}`);
    }
  }

  async fixExportStatements() {
    const srcDir = path.join(process.cwd(), 'src');
    await this.processDirectoryForExports(srcDir);
  }

  async processDirectoryForExports(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        await this.processDirectoryForExports(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        await this.fixFileExports(fullPath);
      }
    }
  }

  async fixFileExports(filePath) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      let fixes = 0;
      
      // Fix: export default Something;' -> export default Something;
      content = content.replace(/export\s+default\s+([^;]+);'/g, 'export default $1;');
      fixes += (content !== originalContent) ? 1 : 0;
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        this.fixedFiles++;
        this.fixedErrors += fixes;
        console.log(`🔧 Fixed ${fixes} export issues in ${path.relative(process.cwd(), filePath)}`);
      }
    } catch (error) {
      console.warn(`⚠️ Could not fix exports in ${filePath}: ${error.message}`);
    }
  }
}

// Execute immediately
const smartFix = new SmartCorruptionFix();
smartFix.execute().catch(error => {
  console.error('❌ SMART FIX FAILED:', error);
  process.exit(1);
});