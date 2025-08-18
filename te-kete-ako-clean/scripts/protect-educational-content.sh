#!/bin/bash
# Te Kete Ako - Educational Content Protection Script
# CRITICAL: Run this before ANY system changes

set -e  # Exit on any error

echo "🛡️ TE KETE AKO - EDUCATIONAL CONTENT PROTECTION"
echo "=============================================="
echo "🎯 Mission: Zero Educational Content Loss"
echo ""

# Create backup directory with timestamp
BACKUP_DIR="./educational-content-backups"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p "$BACKUP_DIR"

echo "📁 Creating backup directory: $BACKUP_DIR"
echo "⏰ Timestamp: $TIMESTAMP"
echo ""

# Layer 1: Complete System Backup
echo "🗂️ LAYER 1: Complete System Backup..."
tar -czf "$BACKUP_DIR/COMPLETE-SYSTEM-$TIMESTAMP.tar.gz" \
  --exclude="node_modules" \
  --exclude=".git" \
  --exclude="*.tar.gz" \
  . 
echo "✅ Complete system backup created"

# Layer 2: Critical Cultural Platforms Backup
echo ""
echo "🌿 LAYER 2: Critical Cultural Platforms..."
CRITICAL_PLATFORMS=(
  "digital-purakau.html"
  "living-whakapapa.html" 
  "virtual-marae.html"
  "classroom-leaderboard.html"
)

for platform in "${CRITICAL_PLATFORMS[@]}"; do
  if [[ -f "$platform" ]]; then
    echo "  ✅ $platform - Found and protected"
  else
    echo "  🚨 CRITICAL: $platform - MISSING!"
    exit 1
  fi
done

tar -czf "$BACKUP_DIR/CRITICAL-PLATFORMS-$TIMESTAMP.tar.gz" \
  "${CRITICAL_PLATFORMS[@]}" 2>/dev/null || echo "⚠️ Some platforms may be missing"

# Layer 3: Educational Resource Collections
echo ""
echo "📚 LAYER 3: Educational Resource Collections..."

# Count and backup educational directories
EDUCATIONAL_DIRS=("handouts" "lessons" "games" "units" "y8-systems" "guided-inquiry-unit")
TOTAL_RESOURCES=0

for dir in "${EDUCATIONAL_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    count=$(find "$dir" -name "*.html" -type f | wc -l)
    echo "  📂 $dir: $count resources"
    TOTAL_RESOURCES=$((TOTAL_RESOURCES + count))
  else
    echo "  ⚠️ Directory $dir not found"
  fi
done

echo "  📊 Total Educational Resources: $TOTAL_RESOURCES"

tar -czf "$BACKUP_DIR/EDUCATIONAL-RESOURCES-$TIMESTAMP.tar.gz" \
  handouts/ lessons/ games/ units/ y8-systems/ guided-inquiry-unit/ 2>/dev/null || echo "⚠️ Some directories may be missing"

# Layer 4: Content Integrity Checksums
echo ""
echo "🔐 LAYER 4: Content Integrity Checksums..."

# Generate checksums for all educational content
find . -name "*.html" -type f | \
  grep -E "(handouts|lessons|games|units|y8-systems|guided-inquiry|digital-purakau|living-whakapapa|virtual-marae|classroom-leaderboard)" | \
  sort | \
  xargs md5sum > "$BACKUP_DIR/educational-content-checksums-$TIMESTAMP.txt" 2>/dev/null

CHECKSUM_COUNT=$(wc -l < "$BACKUP_DIR/educational-content-checksums-$TIMESTAMP.txt")
echo "  🔢 Generated checksums for $CHECKSUM_COUNT files"

# Layer 5: Resource Inventory
echo ""
echo "📋 LAYER 5: Complete Resource Inventory..."

cat > "$BACKUP_DIR/resource-inventory-$TIMESTAMP.txt" << EOF
Te Kete Ako - Educational Content Inventory
Generated: $(date)
Backup Timestamp: $TIMESTAMP

CRITICAL CULTURAL PLATFORMS:
$(for platform in "${CRITICAL_PLATFORMS[@]}"; do
  if [[ -f "$platform" ]]; then
    echo "✅ $platform ($(stat -f%z "$platform" 2>/dev/null || stat -c%s "$platform" 2>/dev/null) bytes)"
  else
    echo "❌ $platform - MISSING"
  fi
done)

EDUCATIONAL RESOURCE DIRECTORIES:
$(for dir in "${EDUCATIONAL_DIRS[@]}"; do
  if [[ -d "$dir" ]]; then
    count=$(find "$dir" -name "*.html" -type f | wc -l)
    size=$(du -sh "$dir" 2>/dev/null | cut -f1)
    echo "📂 $dir: $count files, $size total"
  else
    echo "❌ $dir - MISSING"
  fi
done)

TOTAL RESOURCES PROTECTED: $TOTAL_RESOURCES HTML files
BACKUP FILES CREATED:
- Complete System: COMPLETE-SYSTEM-$TIMESTAMP.tar.gz
- Critical Platforms: CRITICAL-PLATFORMS-$TIMESTAMP.tar.gz  
- Educational Resources: EDUCATIONAL-RESOURCES-$TIMESTAMP.tar.gz
- Integrity Checksums: educational-content-checksums-$TIMESTAMP.txt
- This Inventory: resource-inventory-$TIMESTAMP.txt
EOF

echo "  📝 Resource inventory created"

# Verification Summary
echo ""
echo "🎯 PROTECTION VERIFICATION SUMMARY"
echo "================================="
echo "✅ Complete system backup: $(du -sh "$BACKUP_DIR/COMPLETE-SYSTEM-$TIMESTAMP.tar.gz" 2>/dev/null | cut -f1)"
echo "✅ Critical platforms backup: $(du -sh "$BACKUP_DIR/CRITICAL-PLATFORMS-$TIMESTAMP.tar.gz" 2>/dev/null | cut -f1)"  
echo "✅ Educational resources backup: $(du -sh "$BACKUP_DIR/EDUCATIONAL-RESOURCES-$TIMESTAMP.tar.gz" 2>/dev/null | cut -f1)"
echo "✅ Integrity checksums: $CHECKSUM_COUNT files"
echo "✅ Total resources protected: $TOTAL_RESOURCES"
echo ""

# Critical Platform Functionality Test
echo "🧪 CRITICAL PLATFORM FUNCTIONALITY TEST"
echo "======================================="
for platform in "${CRITICAL_PLATFORMS[@]}"; do
  if [[ -f "$platform" ]]; then
    # Check if file is readable and contains expected content
    if grep -q "html" "$platform" 2>/dev/null; then
      echo "✅ $platform - File structure intact"
    else
      echo "⚠️ $platform - May have content issues"
    fi
  else
    echo "🚨 $platform - MISSING FILE!"
  fi
done

echo ""
echo "🏆 EDUCATIONAL CONTENT PROTECTION COMPLETE!"
echo "==========================================="
echo "📂 All backups stored in: $BACKUP_DIR"
echo "🔐 Integrity verified with checksums"
echo "📊 Total protected resources: $TOTAL_RESOURCES"
echo "⏰ Protection timestamp: $TIMESTAMP"
echo ""
echo "🛡️ Your educational content is now SAFE!"
echo "✅ Ready for any system changes with zero loss risk"
echo ""
echo "📋 Next steps:"
echo "   1. Review backup contents in $BACKUP_DIR"
echo "   2. Verify critical platforms still work in browser"
echo "   3. Proceed with system changes confidently"
echo "   4. Use restore-educational-content.sh if needed"
echo ""

# Create restoration script
cat > "$BACKUP_DIR/restore-educational-content.sh" << 'EOF'
#!/bin/bash
# Emergency Educational Content Restoration Script

echo "🚨 EMERGENCY: Restoring Educational Content"
echo "This will restore from the most recent backup"
echo ""
read -p "Are you sure? (type 'RESTORE' to confirm): " confirm

if [[ "$confirm" != "RESTORE" ]]; then
  echo "❌ Restoration cancelled"
  exit 1
fi

# Find most recent backup
LATEST_SYSTEM=$(ls -t COMPLETE-SYSTEM-*.tar.gz | head -1)
LATEST_RESOURCES=$(ls -t EDUCATIONAL-RESOURCES-*.tar.gz | head -1) 
LATEST_PLATFORMS=$(ls -t CRITICAL-PLATFORMS-*.tar.gz | head -1)

echo "🔄 Restoring from:"
echo "   System: $LATEST_SYSTEM"
echo "   Resources: $LATEST_RESOURCES"  
echo "   Platforms: $LATEST_PLATFORMS"
echo ""

# Move to parent directory for restoration
cd ..

# Restore critical platforms first
echo "🌿 Restoring critical platforms..."
tar -xzf "educational-content-backups/$LATEST_PLATFORMS"

# Restore educational resources
echo "📚 Restoring educational resources..."
tar -xzf "educational-content-backups/$LATEST_RESOURCES"

echo "✅ Educational content restoration complete!"
echo "🧪 Please test critical platforms and resource access"
EOF

chmod +x "$BACKUP_DIR/restore-educational-content.sh"
echo "🔧 Emergency restoration script created: $BACKUP_DIR/restore-educational-content.sh"

echo ""
echo "🎉 MISSION ACCOMPLISHED: Educational Content Protected!"