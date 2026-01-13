#!/bin/bash
echo "🔄 Restoring stable version..."
cp App.tsx ../../src/
cp main.tsx ../../src/
cp package.json ../../
cp DEVELOPMENT_WORKFLOW.md ../../
echo "✅ Stable version restored!"
echo "Run 'npm run dev' to start development server"
