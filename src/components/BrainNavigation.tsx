/**
 * BrainNavigation - Intelligent navigation that learns from teacher behavior
 *
 * This component uses our episodic memory system to surface the most relevant
 * navigation items based on:
 * - Recent teacher activity
 * - Current term/unit context
 * - Frequently accessed resources
 * - Time of day/week patterns
 * - Class-specific shortcuts
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationMemory {
  recentPages: string[];
  frequentPaths: { path: string; count: number; lastUsed: string }[];
  contextualSuggestions: string[];
  quickActions: QuickAction[];
}

interface QuickAction {
  id: string;
  label: string;
  path: string;
  icon: string;
  priority: number;
  confidence: number;
  reason: string;
}

export default function BrainNavigation() {
  const location = useLocation();
  const [memory, setMemory] = useState<NavigationMemory | null>(null);
  const [isExpanded] = useState(false);

  const loadNavigationMemory = useCallback(async () => {
    try {
      // In practice, this would call our brain API
      const response = await fetch('/brain/navigation-memory');
      const memoryData = await response.json();
      setMemory(memoryData);
    } catch {
      console.warn('Brain navigation memory unavailable, using static nav');
      setMemory(getStaticNavigation());
    }
  }, []);

  useEffect(() => {
    // Record this page visit as an episodic event
    recordPageVisit(location.pathname);

    // Load navigation memory
    loadNavigationMemory();
  }, [location, loadNavigationMemory]);

  const recordPageVisit = async (path: string) => {
    try {
      await fetch('/brain/episode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          who: 'teacher:current', // Would be actual teacher ID
          kind: 'navigation',
          text: `Visited ${path}`,
          cues: {
            path,
            timestamp: new Date().toISOString(),
            session_context: 'lesson_planning', // Could be inferred
          },
        }),
      });
    } catch {
      // Silent fail - navigation still works without brain
    }
  };

  const getStaticNavigation = (): NavigationMemory => ({
    recentPages: ['/dashboard', '/lessons', '/assessments'],
    frequentPaths: [
      { path: '/dashboard', count: 45, lastUsed: new Date().toISOString() },
      { path: '/lesson-planner', count: 32, lastUsed: new Date().toISOString() },
    ],
    contextualSuggestions: ['/nzc-browser', '/resource-library'],
    quickActions: [
      {
        id: 'new_lesson',
        label: 'New Lesson Plan',
        path: '/lessons/new',
        icon: '📝',
        priority: 1,
        confidence: 0.9,
        reason: 'You create lessons most Tuesdays around this time',
      },
      {
        id: 'this_weeks_plans',
        label: "This Week's Plans",
        path: '/dashboard/week',
        icon: '📅',
        priority: 2,
        confidence: 0.85,
        reason: 'Term 2 Week 6 - planning ahead',
      },
    ],
  });

  if (!memory) {
    return (
      <nav className="bg-surface border-b border-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-bold">T</span>
                </div>
                <span className="text-lg font-medium text-text">TeAoMarama</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <NavLink path="/dashboard" label="Dashboard" />
                <NavLink path="/lessons" label="Lessons" />
                <NavLink path="/resources" label="Resources" />
                <NavLink path="/assessments" label="Assessments" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-surface border-b border-accent/20">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
                <span className="text-white text-sm font-bold">T</span>
              </div>
              <span className="text-lg font-medium text-text">TeAoMarama</span>
            </Link>

            {/* Core Navigation */}
            <div className="hidden md:flex space-x-6">
              <NavLink path="/dashboard" label="Dashboard" />
              <NavLink path="/lessons" label="Lessons" />
              <NavLink path="/resources" label="Resources" />
              <NavLink path="/assessments" label="Assessments" />
            </div>
          </div>

          {/* Brain-Powered Quick Actions */}
          <div className="flex items-center space-x-4">
            <BrainQuickActions actions={memory.quickActions} />

            {/* Smart Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search or ask the brain..."
                className="w-64 px-4 py-2 rounded-lg border border-accent/30 focus:border-accent focus:ring-1 focus:ring-accent bg-white"
              />
              <span className="absolute right-3 top-2.5 text-muted text-sm">🧠</span>
            </div>

            {/* Profile & Notifications */}
            <button className="p-2 rounded-lg hover:bg-accent/10 transition-colors">
              <span className="text-xl">👤</span>
            </button>
          </div>
        </div>
      </div>

      {/* Brain Suggestions Panel - appears when expanded */}
      {isExpanded && (
        <div className="bg-background border-t border-accent/20">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <BrainSuggestions memory={memory} />
          </div>
        </div>
      )}

      {/* Smart Breadcrumbs with Context */}
      <SmartBreadcrumbs currentPath={location.pathname} />
    </nav>
  );
}

function NavLink({ path, label }: { path: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(path);

  return (
    <Link
      to={path}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive ? 'bg-accent text-white' : 'text-text hover:text-accent hover:bg-accent/10'
      }`}
    >
      {label}
    </Link>
  );
}

function BrainQuickActions({ actions }: { actions: QuickAction[] }) {
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-muted font-medium">Quick:</span>
      {actions.slice(0, 2).map((action) => (
        <div key={action.id} className="relative">
          <Link
            to={action.path}
            className="flex items-center space-x-1 px-3 py-1.5 bg-accent/10 hover:bg-accent/20 rounded-md text-sm text-accent font-medium transition-colors"
            onMouseEnter={() => setShowTooltip(action.id)}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <span>{action.icon}</span>
            <span>{action.label}</span>
          </Link>

          {/* Smart Tooltip */}
          {showTooltip === action.id && (
            <div className="absolute top-full mt-2 left-0 bg-text text-white text-xs rounded-md px-2 py-1 whitespace-nowrap z-10">
              {action.reason}
              <div className="text-xs opacity-75">
                Confidence: {(action.confidence * 100).toFixed(0)}%
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function BrainSuggestions({ memory }: { memory: NavigationMemory }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Recent Activity */}
      <div>
        <h3 className="text-sm font-medium text-text mb-2">Recent Activity</h3>
        <div className="space-y-2">
          {memory.recentPages.map((path) => (
            <Link
              key={path}
              to={path}
              className="block px-3 py-2 rounded-md bg-white hover:bg-accent/5 text-sm text-muted hover:text-text transition-colors"
            >
              {formatPath(path)}
            </Link>
          ))}
        </div>
      </div>

      {/* Frequent Actions */}
      <div>
        <h3 className="text-sm font-medium text-text mb-2">Your Patterns</h3>
        <div className="space-y-2">
          {memory.frequentPaths.map((item) => (
            <div
              key={item.path}
              className="flex items-center justify-between px-3 py-2 rounded-md bg-white"
            >
              <Link to={item.path} className="text-sm text-muted hover:text-text">
                {formatPath(item.path)}
              </Link>
              <span className="text-xs text-accent">{item.count}×</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contextual Suggestions */}
      <div>
        <h3 className="text-sm font-medium text-text mb-2">Brain Suggests</h3>
        <div className="space-y-2">
          {memory.contextualSuggestions.map((path) => (
            <Link
              key={path}
              to={path}
              className="flex items-center space-x-2 px-3 py-2 rounded-md bg-accent/5 hover:bg-accent/10 text-sm text-text transition-colors"
            >
              <span>🧠</span>
              <span>{formatPath(path)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function SmartBreadcrumbs({ currentPath }: { currentPath: string }) {
  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="bg-surface/50 border-b border-accent/10">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-muted hover:text-text">
            Home
          </Link>
          {pathParts.map((part, index) => {
            const path = '/' + pathParts.slice(0, index + 1).join('/');
            const isLast = index === pathParts.length - 1;

            return (
              <React.Fragment key={path}>
                <span className="text-muted">→</span>
                {isLast ? (
                  <span className="text-text font-medium">{formatPath(part)}</span>
                ) : (
                  <Link to={path} className="text-muted hover:text-text">
                    {formatPath(part)}
                  </Link>
                )}
              </React.Fragment>
            );
          })}

          {/* Brain Context */}
          <span className="ml-4 text-xs text-accent bg-accent/10 px-2 py-1 rounded">
            🧠 Learning your patterns
          </span>
        </div>
      </div>
    </div>
  );
}

function formatPath(path: string): string {
  return path.replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}
