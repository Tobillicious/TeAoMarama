#!/usr/bin/env node

const fs = require('fs');

async function fixFinal800() {
  console.log('🔧 Fixing Final 800 Errors - Last Push!');
  
  const filePath = 'src/agents/audit-agents.ts';
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix 1: Remove double semicolons
    content = content.replace(/;;/g, ';');
    
    // Fix 2: Fix malformed variable declarations
    content = content.replace(/const\s+(\w+):\s*([^;]+);\s*=\s*([^;]+);/g, 'const $1: $2 = $3;');
    
    // Fix 3: Fix malformed object properties
    content = content.replace(/(\w+):\s*([^,;\n]+);\s*$/gm, '$1: $2,');
    
    // Fix 4: Fix missing commas in object literals
    content = content.replace(/success:\s*false;/g, 'success: false,');
    
    // Fix 5: Fix malformed function parameters
    content = content.replace(/culturalSensitive:\s*false;/g, 'culturalSensitive: false,');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed audit-agents.ts syntax issues');
    
  } catch (error) {
    console.error('❌ Error fixing audit-agents.ts:', error.message);
  }
}

fixFinal800().catch(console.error);
