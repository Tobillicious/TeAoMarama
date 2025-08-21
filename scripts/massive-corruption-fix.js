#!/usr/bin/env node

const fs = require(fs);
const glob = require(glob);
console.log(MASSIVE CORRUPTION FIX - EMERGENCY MODE);
const patterns = [
  'src/**/*.{ts,tsx,js,jsx}','
  'scripts/**/*.{ts,tsx,js,jsx}', '
  '*.{ts,tsx,js,jsx}
];
let totalFixed = 0;
patterns.forEach(pattern => {'
  const files = glob.sync(pattern, { ignore: ['node_modules/**'] });
  files.forEach(file => {
    try {'
      const content = fs.readFileSync(file, 'utf-8);
      let fixed = content;
      // Fix all quote corruption patterns
      fixed = fixed
        .split(\n)
        .map(line => {
          // Remove trailing quotes'
          if (line.endsWith("';")) {
            return line.slice(0, -1);
          }'
          if (line.endsWith("'") && line.length > 5) {
            return line.slice(0, -1);
          }
          // Fix missing quotes in imports/strings'
          if (line.includes(from ) && !line.includes("'") && !line.includes(")) {'
            return line + "'";
          }
          return line;
        })
        .join(\n);
      // Fix broken object syntax' */
      fixed = fixed.replace(/{\s*'/g, '{);'
      fixed = fixed.replace(/'\s*}/g, });'
      fixed = fixed.replace(/\(\s*'/g, '();'
      fixed = fixed.replace(/'\s*\)/g, ));
      if (content !== fixed) {'
        fs.writeFileSync(file, fixed, 'utf-8);
        totalFixed++;
        console.log(`Fixed: ${file}`);
      }
    } catch (error) {`
      console.log(`Error: ${file}`);
    }
  });
});
`
console.log(`\nFIXED ${totalFixed} FILES`);'`