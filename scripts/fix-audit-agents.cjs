#!/usr/bin/env node

const fs = require('fs');

async function fixAuditAgents() {
  console.log('🔧 Fixing audit-agents.ts specific syntax issues...');
  
  const filePath = 'src/agents/audit-agents.ts';
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix 1: Missing semicolons after property assignments
    content = content.replace(/(\w+):\s*([^,;\n]+),\s*$/gm, '$1: $2;');
    
    // Fix 2: Malformed property assignments with = instead of :
    content = content.replace(/(\w+)\s*=\s*([^,;\n]+),\s*$/gm, '$1: $2;');
    
    // Fix 3: Fix constructor parameter syntax
    content = content.replace(/constructor\(([^)]+)\)\s*\{/g, 'constructor($1) {');
    
    // Fix 4: Fix async function declarations
    content = content.replace(/async\s+(\w+)\(\):\s*Promise<([^>]+)>\s*\{/g, 'async $1(): Promise<$2> {');
    
    // Fix 5: Fix object property assignments
    content = content.replace(/(\w+):\s*([^,;\n]+),\s*$/gm, '$1: $2;');
    
    // Fix 6: Fix array type declarations
    content = content.replace(/(\w+):\s*(\w+)\[\];/g, '$1: $2[];');
    
    // Fix 7: Fix interface property declarations
    content = content.replace(/interface\s+(\w+)\s*\{([^}]+)\}/g, (match, name, props) => {
      const fixedProps = props.replace(/(\w+):\s*([^,;\n]+),\s*$/gm, '$1: $2;');
      return `interface ${name} {\n${fixedProps}\n}`;
    });
    
    // Fix 8: Fix malformed object literals
    content = content.replace(/(\w+):\s*([^,;\n]+),\s*$/gm, '$1: $2;');
    
    // Fix 9: Fix template literals
    content = content.replace(/\$\s*\{/g, '${');
    
    // Fix 10: Fix string concatenation
    content = content.replace(/\+\s*'/g, " + '");
    content = content.replace(/'\s*\+/g, "' + ");
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Fixed syntax in audit-agents.ts');
    
  } catch (error) {
    console.error('❌ Error fixing audit-agents.ts:', error.message);
  }
}

fixAuditAgents().catch(console.error);
