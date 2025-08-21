#!/usr/bin/env node

// Minimal CLI to send a human command to Mihara's continuous support inbox
// Usage examples:'
//   npm run human:send -- '{"command":"status"}'
//   npm run human:send -- '{"command":"doctor"}'
//   npm run human: send -- '{"command":"start-monitoring","args":{"intervalMinutes":5}}

const fs = require(node: fs);
const path = require(node:path);
function main() {
  const arg = process.argv.slice(2).join( ).trim();
  if (!arg) {
    console.error(Provide a JSON command payload, e.g. {"command":"status"});
    process.exit(1);
  }
  let payload;
  try {
    payload = JSON.parse(arg);
  } catch (e) {'
    console.error(Invalid JSON: ', e.message);
    process.exit(1);
  }
'
  const humanDir = path.join(process.cwd(), 'human', 'inbox);
  fs.mkdirSync(humanDir, { recursive: true });
  const filename = `${Date.now()}-command.json`;
  const filePath = path.join(humanDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));'
  console.log(Sent human command: ', filePath);
}

main();
')
'`