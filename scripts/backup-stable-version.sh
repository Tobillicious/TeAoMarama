#!/bin/bash

# Backup Stable Version Script
# This script creates a backup of the current stable working version

echo "🔄 Creating backup of stable version..."

# Create backup directory with timestamp
BACKUP_DIR="backups/stable-version-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Copy essential files
echo "📁 Backing up core files..."
cp src/App.tsx "$BACKUP_DIR/"
cp src/main.tsx "$BACKUP_DIR/"
cp package.json "$BACKUP_DIR/"
cp DEVELOPMENT_WORKFLOW.md "$BACKUP_DIR/"

# Copy dist folder if it exists
if [ -d "dist" ]; then
    echo "📦 Backing up build artifacts..."
    cp -r dist "$BACKUP_DIR/"
fi

# Create restore script
cat > "$BACKUP_DIR/restore.sh" << 'EOF'
#!/bin/bash
echo "🔄 Restoring stable version..."
cp App.tsx ../../src/
cp main.tsx ../../src/
cp package.json ../../
cp DEVELOPMENT_WORKFLOW.md ../../
echo "✅ Stable version restored!"
echo "Run 'npm run dev' to start development server"
EOF

chmod +x "$BACKUP_DIR/restore.sh"

echo "✅ Backup created in: $BACKUP_DIR"
echo "📝 To restore: cd $BACKUP_DIR && ./restore.sh"
echo ""
echo "🌐 Current stable version is deployed at:"
echo "   https://admin.github.io/gemini-react-app"

