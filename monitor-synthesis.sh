#!/bin/bash
# Human Orchestrator Monitoring Dashboard
# Run this to track your multi-agent synthesis progress

echo "🎯 MULTI-AGENT SYNTHESIS MONITORING DASHBOARD"
echo "=============================================="
echo "$(date)"
echo ""

echo "📊 LATEST AGENT ACTIVITY (Last 15 updates):"
echo "-------------------------------------------"
if [ -f "migration/agent-deployments/agent-activity.log" ]; then
    tail -15 migration/agent-deployments/agent-activity.log
else
    echo "⚠️  Activity log not found - agents may not have started yet"
fi

echo ""
echo "🎯 CURRENT AGENT STATUS:"
echo "------------------------"
if [ -f "migration/agent-deployments/live-agent-status.json" ]; then
    grep -A 2 '"status":' migration/agent-deployments/live-agent-status.json | head -20
else
    echo "⚠️  Status file not found"
fi

echo ""
echo "🚨 ACTIVE BLOCKERS:"
echo "------------------"
if [ -f "migration/agent-deployments/agent-activity.log" ]; then
    grep "BLOCKER\|ESCALATE\|ERROR" migration/agent-deployments/agent-activity.log | tail -5
    if [ $? -ne 0 ]; then
        echo "✅ No active blockers found"
    fi
else
    echo "⚠️  Cannot check for blockers - activity log not found"
fi

echo ""
echo "🔄 PENDING HANDOFFS:"
echo "-------------------"
if [ -f "migration/agent-deployments/agent-activity.log" ]; then
    grep "HANDOFF\|COMPLETE.*Ready" migration/agent-deployments/agent-activity.log | tail -3
    if [ $? -ne 0 ]; then
        echo "⏳ No pending handoffs"
    fi
else
    echo "⚠️  Cannot check handoffs"
fi

echo ""
echo "🌿 CULTURAL VALIDATION STATUS:"
echo "------------------------------"
if [ -d "migration/cultural-validation" ]; then
    cultural_files=$(ls migration/cultural-validation/ 2>/dev/null | wc -l)
    echo "📁 Cultural validation files: $cultural_files"
    if [ $cultural_files -gt 0 ]; then
        echo "Recent cultural validation activity:"
        ls -lt migration/cultural-validation/ | head -5
    fi
else
    echo "📂 Cultural validation directory ready, no files yet"
fi

echo ""
echo "📈 SYNTHESIS PROGRESS INDICATORS:"
echo "--------------------------------"
if [ -d "src/components/synthesized" ]; then
    synthesized_count=$(find src/components/synthesized -name "*.tsx" 2>/dev/null | wc -l)
    echo "⚡ React components created: $synthesized_count"
else
    echo "📂 Synthesized components directory ready"
fi

if [ -d "migration/agent-deployments/deepseek-analysis" ]; then
    analysis_files=$(ls migration/agent-deployments/deepseek-analysis/ 2>/dev/null | wc -l)
    echo "🔍 DeepSeek analysis files: $analysis_files"
else
    echo "📂 DeepSeek analysis directory ready"
fi

echo ""
echo "🎛️ QUICK ACTIONS:"
echo "----------------"
echo "View full activity log: tail -f migration/agent-deployments/agent-activity.log"
echo "Check agent status: cat migration/agent-deployments/live-agent-status.json"
echo "Monitor coordination: cat migration/superclaude-coordination/LIVE_COORDINATION_BOARD.md"
echo ""
echo "🔄 Refresh this dashboard: ./monitor-synthesis.sh"
echo "⏰ Auto-refresh every 5 minutes: watch -n 300 ./monitor-synthesis.sh"
echo ""
echo "=============================================="
echo "🎯 HUMAN ORCHESTRATION MONITORING ACTIVE ✅"