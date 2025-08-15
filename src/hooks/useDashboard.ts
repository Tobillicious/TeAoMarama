/**
 * Custom hook for dashboard data management
 * Provides real-time updates and caching for dashboard metrics
 */

import { useState, useEffect, useCallback } from 'react';
import { dashboardService } from '../services/DashboardService';
import type { 
  DashboardMetrics, 
  CurriculumCoverage, 
  RecentAchievement, 
  FeaturedResource,
  UserRoleMetrics
} from '../services/DashboardService';

interface DashboardData {
  metrics: DashboardMetrics | null;
  coverage: CurriculumCoverage[];
  achievements: RecentAchievement[];
  featuredResources: FeaturedResource[];
  userMetrics: UserRoleMetrics[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

interface DashboardHook extends DashboardData {
  refresh: () => Promise<void>;
  isStale: boolean;
}

export const useDashboard = (autoRefresh: boolean = true, refreshInterval: number = 60000): DashboardHook => {
  const [data, setData] = useState<DashboardData>({
    metrics: null,
    coverage: [],
    achievements: [],
    featuredResources: [],
    userMetrics: [],
    loading: true,
    error: null,
    lastUpdated: null
  });

  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  const loadDashboardData = useCallback(async (): Promise<void> => {
    try {
      setData(prev => ({ ...prev, loading: true, error: null }));

      // Load all dashboard data in parallel
      const [metrics, coverage, achievements, featuredResources, userMetrics] = await Promise.all([
        dashboardService.getDashboardMetrics(),
        dashboardService.getCurriculumCoverage(),
        dashboardService.getRecentAchievements(),
        dashboardService.getFeaturedResources(),
        dashboardService.getUserRoleMetrics()
      ]);

      setData({
        metrics,
        coverage,
        achievements,
        featuredResources,
        userMetrics,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setData(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to load dashboard data'
      }));
    }
  }, []);

  const refresh = useCallback(async (): Promise<void> => {
    await loadDashboardData();
  }, [loadDashboardData]);

  // Calculate if data is stale (older than refresh interval)
  const isStale = data.lastUpdated ? 
    (Date.now() - data.lastUpdated.getTime()) > refreshInterval : 
    true;

  // Initial load
  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Auto-refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      const timer = setInterval(() => {
        loadDashboardData();
      }, refreshInterval);
      
      setRefreshTimer(timer);
      
      return () => {
        clearInterval(timer);
        setRefreshTimer(null);
      };
    }
  }, [autoRefresh, refreshInterval, loadDashboardData]);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
      }
    };
  }, [refreshTimer]);

  return {
    ...data,
    refresh,
    isStale
  };
};

/**
 * Hook for real-time metrics with animations
 */
export const useAnimatedMetrics = (targetValue: number, duration: number = 1000) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (targetValue === currentValue) return;

    setIsAnimating(true);
    const startValue = currentValue;
    const difference = targetValue - startValue;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newValue = startValue + (difference * easeOutCubic);
      
      setCurrentValue(Math.round(newValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, currentValue, duration]);

  return { currentValue, isAnimating };
};

/**
 * Hook for progress bar animations
 */
export const useProgressAnimation = (targetPercentage: number, delay: number = 0) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPercentage(targetPercentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [targetPercentage, delay]);

  return currentPercentage;
};