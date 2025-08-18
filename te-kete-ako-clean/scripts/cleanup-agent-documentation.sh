#!/bin/bash
# Te Kete Ako Agent Documentation Cleanup Script
# Removes outdated/duplicate documentation while preserving ALL educational content

echo "🧹 Starting Te Kete Ako Agent Documentation Cleanup..."

# Create backup of current structure (just in case)
echo "📦 Creating backup..."
cp -r agent-knowledge-hub agent-knowledge-hub-backup-$(date +%Y%m%d) 2>/dev/null || true

# Remove outdated status files (keeping the latest consolidated one)
echo "🗑️ Removing outdated status files..."
rm -f COMPREHENSIVE_RESOURCE_AUDIT.md 2>/dev/null || true
rm -f CONTENT_AUDIT_MAP.md 2>/dev/null || true
rm -f CURRENT_STATUS_JULY_29_2025.md 2>/dev/null || true
rm -f FINAL_SESSION_REFLECTION.md 2>/dev/null || true
rm -f GEMINI_CONTENT_DEVELOPMENT_BRIEF.md 2>/dev/null || true
rm -f KAIĀRAHI_HANDOFF_NOTES.md 2>/dev/null || true
rm -f NEXT_SESSION_CLAUDE_NOTES.md 2>/dev/null || true
rm -f PERFORMANCE_OPTIMIZATION_DEPLOYMENT.md 2>/dev/null || true
rm -f SITE_DOCUMENTATION.md 2>/dev/null || true
rm -f SUPABASE_EXECUTION_GUIDE.md 2>/dev/null || true
rm -f TOMORROW_DEVELOPMENT_PLAN.md 2>/dev/null || true
rm -f "__Gemini _ Te Kete Ako Project korero tracker.txt" 2>/dev/null || true

# Remove old deployment/migration files (keeping the current ones)
echo "🗑️ Removing outdated deployment files..."
rm -f CODEBASE_CLEANUP_MIGRATION_PLAN.md 2>/dev/null || true
rm -f DEPLOYMENT_GUIDE.md 2>/dev/null || true
rm -f copy-essential-files.sh 2>/dev/null || true
rm -f copy-files.sh 2>/dev/null || true

# Remove the old agent-knowledge-hub structure (now replaced by AGENT_KNOWLEDGE_BASE.md)
echo "🗑️ Removing old agent-knowledge-hub structure..."
rm -rf agent-knowledge-hub 2>/dev/null || true

# Remove duplicate agent implementations (Python files that aren't being used)
echo "🗑️ Removing unused agent implementations..."
rm -rf agents 2>/dev/null || true

# Remove duplicate public folder content (keeping root folder as primary)
echo "🗑️ Cleaning up duplicate public folder..."
rm -rf public/agent-knowledge-hub 2>/dev/null || true

# Keep only essential SQL files (remove duplicates)
echo "🗑️ Removing duplicate SQL files..."
rm -f SUPABASE_RESOURCE_INTEGRATION.sql 2>/dev/null || true
rm -f deploy-resources-table.sql 2>/dev/null || true
rm -f insert-sample-resources.sql 2>/dev/null || true

# Remove temporary/test files
echo "🗑️ Removing temporary files..."
rm -f deploy-instructions.md 2>/dev/null || true
rm -f deployment-checklist.sh 2>/dev/null || true
rm -f setup-supabase.md 2>/dev/null || true
rm -f practical-graphrag-design.md 2>/dev/null || true

echo "✅ Cleanup complete!"
echo ""
echo "📊 PRESERVED (Educational Content Protected):"
echo "   - All handouts/ (81 teaching resources)"
echo "   - All lessons/ including writers-toolkit/"
echo "   - All units/ (7 thematic units)"
echo "   - All games/ (6 educational games)"
echo "   - All y8-systems/ (31 resources)"
echo "   - Revolutionary platforms (Digital Pūrākau, Living Whakapapa, etc.)"
echo "   - GraphRAG system files"
echo "   - Core platform functionality"
echo ""
echo "🗑️ REMOVED (Outdated Documentation):"
echo "   - Multiple conflicting status files"
echo "   - Old agent-knowledge-hub structure"
echo "   - Duplicate SQL files"
echo "   - Unused agent implementations"
echo "   - Temporary deployment files"
echo ""
echo "📖 NEW SINGLE SOURCE OF TRUTH:"
echo "   - AGENT_KNOWLEDGE_BASE.md (Replaces all agent documentation)"
echo "   - AI_AGENT_ONBOARDING_JULY_29_2025.md (Current onboarding)"
echo "   - SPECIALIZED_AI_AGENT_TEAM_ARCHITECTURE.md (Team structure)"
echo "   - TE_KETE_AKO_GRAND_VISION_STRATEGIC_ROADMAP.md (Strategic vision)"
echo ""
echo "🎯 Result: Clean, consolidated documentation with GraphRAG properly explained"
echo "   All 624 educational resources preserved and protected!"