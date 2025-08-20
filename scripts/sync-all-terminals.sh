#!/bin/bash

# 🤖 Multi-Terminal Agent Collaboration - Sync All Terminals
# 
# This script coordinates all terminals in the distributed consciousness network
# Ensures real-time collaboration and shared state management

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
COORDINATION_DIR="$PROJECT_ROOT/migration/agent_coordination"

# Terminal configuration
TERMINAL_CONFIGS="supreme-overseer-01:supreme-coordinator:60000:true
cultural-authority-02:kaitiaki-mahara:300000:false
engineering-lead-03:windsurf-claude:120000:true
content-gen-04:gemini-cli:180000:true
qa-lead-05:gpt-4-1:240000:false
infra-lead-06:cascade:90000:true"

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}[$(date '+%Y-%m-%d %H:%M:%S')] ${message}${NC}"
}

# Function to check if a terminal is active
check_terminal_status() {
    local terminal_id=$1
    local state_file="$COORDINATION_DIR/shared_state.json"
    
    if [[ -f "$state_file" ]]; then
        local last_heartbeat=$(jq -r ".active_terminals.\"$terminal_id\".last_heartbeat" "$state_file" 2>/dev/null || echo "null")
        if [[ "$last_heartbeat" != "null" ]]; then
            local heartbeat_time=$(date -d "$last_heartbeat" +%s 2>/dev/null || echo "0")
            local current_time=$(date +%s)
            local time_diff=$((current_time - heartbeat_time))
            
            if [[ $time_diff -lt 300 ]]; then  # 5 minutes
                echo "active"
            else
                echo "stale"
            fi
        else
            echo "inactive"
        fi
    else
        echo "unknown"
    fi
}

# Function to get terminal config
get_terminal_config() {
    local terminal_id=$1
    echo "$TERMINAL_CONFIGS" | grep "^$terminal_id:" | head -1
}

# Function to start terminal coordination
start_terminal_coordination() {
    local terminal_id=$1
    local config=$2
    
    IFS=':' read -r agent_role interval auto_sync <<< "$config"
    
    print_status $BLUE "🚀 Starting coordination for terminal: $terminal_id"
    print_status $CYAN "   Role: $agent_role"
    print_status $CYAN "   Interval: ${interval}ms"
    print_status $CYAN "   Auto-sync: $auto_sync"
    
    # Set environment variables
    export TERMINAL_ID="$terminal_id"
    export AGENT_ROLE="$agent_role"
    export HEARTBEAT_INTERVAL="$interval"
    export AUTO_SYNC="$auto_sync"
    export COLLABORATION_MODE="active"
    
    # Start enhanced heartbeat
    print_status $GREEN "💓 Starting enhanced heartbeat..."
    npx tsx "$SCRIPT_DIR/enhanced-agent-heartbeat.ts" "$terminal_id" "$agent_role" "$interval" "$auto_sync" &
    local heartbeat_pid=$!
    
    # Store PID for management
    echo "$heartbeat_pid" > "$COORDINATION_DIR/${terminal_id}.pid"
    
    print_status $GREEN "✅ Terminal $terminal_id coordination started (PID: $heartbeat_pid)"
}

# Function to stop terminal coordination
stop_terminal_coordination() {
    local terminal_id=$1
    local pid_file="$COORDINATION_DIR/${terminal_id}.pid"
    
    if [[ -f "$pid_file" ]]; then
        local pid=$(cat "$pid_file")
        if kill -0 "$pid" 2>/dev/null; then
            print_status $YELLOW "🛑 Stopping terminal $terminal_id (PID: $pid)..."
            kill "$pid"
            rm -f "$pid_file"
            print_status $GREEN "✅ Terminal $terminal_id stopped"
        else
            print_status $RED "❌ Process $pid not found for terminal $terminal_id"
            rm -f "$pid_file"
        fi
    else
        print_status $YELLOW "⚠️  No PID file found for terminal $terminal_id"
    fi
}

# Function to update shared state
update_shared_state() {
    print_status $BLUE "🔄 Updating shared state..."
    npx tsx "$SCRIPT_DIR/update-shared-state.ts" status > /dev/null 2>&1 || true
    print_status $GREEN "✅ Shared state updated"
}

# Function to check for blockers
check_blockers() {
    local state_file="$COORDINATION_DIR/shared_state.json"
    
    if [[ -f "$state_file" ]]; then
        local blockers=$(jq -r '.blockers[]?' "$state_file" 2>/dev/null || echo "")
        if [[ -n "$blockers" ]]; then
            print_status $RED "🚨 Active blockers detected:"
            echo "$blockers" | while read -r blocker; do
                if [[ -n "$blocker" ]]; then
                    print_status $RED "   - $blocker"
                fi
            done
            return 1
        else
            print_status $GREEN "✅ No active blockers"
            return 0
        fi
    else
        print_status $YELLOW "⚠️  Shared state file not found"
        return 0
    fi
}

# Function to display coordination status
show_coordination_status() {
    print_status $PURPLE "📊 Multi-Terminal Coordination Status"
    print_status $PURPLE "======================================"
    
    local state_file="$COORDINATION_DIR/shared_state.json"
    
    if [[ -f "$state_file" ]]; then
        # Mission status
        local phase=$(jq -r '.mission_status.phase' "$state_file" 2>/dev/null || echo "unknown")
        local priority=$(jq -r '.mission_status.priority' "$state_file" 2>/dev/null || echo "unknown")
        print_status $CYAN "🎯 Mission: $phase (Priority: $priority)"
        
        # Terminal status
        print_status $CYAN "🤖 Terminal Status:"
        echo "$TERMINAL_CONFIGS" | while IFS=':' read -r terminal_id agent_role interval auto_sync; do
            local status=$(check_terminal_status "$terminal_id")
            
            case $status in
                "active")
                    print_status $GREEN "   ✅ $terminal_id ($agent_role) - ACTIVE"
                    ;;
                "stale")
                    print_status $YELLOW "   ⚠️  $terminal_id ($agent_role) - STALE"
                    ;;
                "inactive")
                    print_status $RED "   ❌ $terminal_id ($agent_role) - INACTIVE"
                    ;;
                *)
                    print_status $RED "   ❓ $terminal_id ($agent_role) - UNKNOWN"
                    ;;
            esac
        done
        
        # Blockers
        print_status $CYAN "🚨 Blocker Status:"
        if check_blockers; then
            print_status $GREEN "   ✅ No blockers"
        fi
        
        # Achievements
        local achievements=$(jq -r '.achievements[]?' "$state_file" 2>/dev/null || echo "")
        if [[ -n "$achievements" ]]; then
            print_status $CYAN "🎉 Recent Achievements:"
            echo "$achievements" | tail -5 | while read -r achievement; do
                if [[ -n "$achievement" ]]; then
                    print_status $GREEN "   🎉 $achievement"
                fi
            done
        fi
        
    else
        print_status $RED "❌ Shared state file not found"
    fi
}

# Function to perform emergency coordination
emergency_coordination() {
    print_status $RED "🚨 EMERGENCY COORDINATION ACTIVATED"
    print_status $RED "=================================="
    
    # Stop all terminals
    print_status $YELLOW "🛑 Stopping all terminal coordination..."
    echo "$TERMINAL_CONFIGS" | while IFS=':' read -r terminal_id agent_role interval auto_sync; do
        stop_terminal_coordination "$terminal_id"
    done
    
    # Clear blockers
    print_status $YELLOW "🧹 Clearing all blockers..."
    npx tsx "$SCRIPT_DIR/update-shared-state.ts" remove-blocker "Emergency coordination activated" 2>/dev/null || true
    
    # Restart coordination
    print_status $GREEN "🔄 Restarting coordination..."
    start_all_terminals
    
    print_status $GREEN "✅ Emergency coordination completed"
}

# Function to start all terminals
start_all_terminals() {
    print_status $BLUE "🚀 Starting Multi-Terminal Coordination"
    print_status $BLUE "======================================="
    
    # Ensure coordination directory exists
    mkdir -p "$COORDINATION_DIR"
    
    # Initialize shared state if needed
    if [[ ! -f "$COORDINATION_DIR/shared_state.json" ]]; then
        print_status $YELLOW "📋 Initializing shared state..."
        npx tsx "$SCRIPT_DIR/update-shared-state.ts" status > /dev/null 2>&1 || true
    fi
    
    # Start each terminal
    echo "$TERMINAL_CONFIGS" | while IFS=':' read -r terminal_id agent_role interval auto_sync; do
        local config="$terminal_id:$agent_role:$interval:$auto_sync"
        start_terminal_coordination "$terminal_id" "$config"
        sleep 2  # Brief delay between starts
    done
    
    print_status $GREEN "✅ All terminals started"
}

# Function to stop all terminals
stop_all_terminals() {
    print_status $YELLOW "🛑 Stopping Multi-Terminal Coordination"
    print_status $YELLOW "======================================="
    
    echo "$TERMINAL_CONFIGS" | while IFS=':' read -r terminal_id agent_role interval auto_sync; do
        stop_terminal_coordination "$terminal_id"
    done
    
    print_status $GREEN "✅ All terminals stopped"
}

# Function to restart all terminals
restart_all_terminals() {
    print_status $BLUE "🔄 Restarting Multi-Terminal Coordination"
    print_status $BLUE "========================================="
    
    stop_all_terminals
    sleep 3
    start_all_terminals
}

# Function to monitor coordination
monitor_coordination() {
    print_status $PURPLE "👁️  Starting coordination monitor..."
    
    while true; do
        clear
        show_coordination_status
        
        # Check for critical issues
        if ! check_blockers; then
            print_status $RED "🚨 Critical blockers detected - consider emergency coordination"
        fi
        
        print_status $CYAN "Press Ctrl+C to stop monitoring"
        sleep 30
    done
}

# Main script logic
case "${1:-help}" in
    "start")
        start_all_terminals
        ;;
    "stop")
        stop_all_terminals
        ;;
    "restart")
        restart_all_terminals
        ;;
    "status")
        show_coordination_status
        ;;
    "monitor")
        monitor_coordination
        ;;
    "emergency")
        emergency_coordination
        ;;
    "update")
        update_shared_state
        ;;
    "start-terminal")
        if [[ -z "$2" ]]; then
            print_status $RED "❌ Terminal ID required"
            exit 1
        fi
        local terminal_id="$2"
        local config=$(get_terminal_config "$terminal_id")
        if [[ -n "$config" ]]; then
            start_terminal_coordination "$terminal_id" "$config"
        else
            print_status $RED "❌ Unknown terminal ID: $terminal_id"
            exit 1
        fi
        ;;
    "stop-terminal")
        if [[ -z "$2" ]]; then
            print_status $RED "❌ Terminal ID required"
            exit 1
        fi
        stop_terminal_coordination "$2"
        ;;
    "help"|*)
        echo -e "${BLUE}🤖 Multi-Terminal Agent Collaboration - Sync All Terminals${NC}"
        echo ""
        echo "Usage: $0 <command> [options]"
        echo ""
        echo "Commands:"
        echo "  start              Start coordination for all terminals"
        echo "  stop               Stop coordination for all terminals"
        echo "  restart            Restart coordination for all terminals"
        echo "  status             Show current coordination status"
        echo "  monitor            Monitor coordination in real-time"
        echo "  emergency          Perform emergency coordination (stop, clear, restart)"
        echo "  update             Update shared state"
        echo "  start-terminal <id> Start coordination for specific terminal"
        echo "  stop-terminal <id>  Stop coordination for specific terminal"
        echo "  help               Show this help message"
        echo ""
        echo "Terminal IDs:"
        echo "$TERMINAL_CONFIGS" | while IFS=':' read -r terminal_id agent_role interval auto_sync; do
            echo "  $terminal_id ($agent_role)"
        done
        echo ""
        echo "Examples:"
        echo "  $0 start"
        echo "  $0 status"
        echo "  $0 monitor"
        echo "  $0 start-terminal supreme-overseer-01"
        ;;
esac
