/**
 * Performance Monitor Component
 * Shows real-time performance metrics for the application
 */

import React, { useEffect, useState } from 'react';
import { resourceCache } from '../services/ResourceCache';

interface PerformanceMetrics {
  cacheHits: number;
  cacheMisses: number;
  cacheSize: number;
  memoryUsage: number;
  resourceCount: number;
  loadTime: number;
  filterTime: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    cacheHits: 0,
    cacheMisses: 0,
    cacheSize: 0,
    memoryUsage: 0,
    resourceCount: 0,
    loadTime: 0,
    filterTime: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const cacheStats = resourceCache.getStats();
      setMetrics(prev => ({
        ...prev,
        cacheHits: cacheStats.hits,
        cacheMisses: cacheStats.misses,
        cacheSize: cacheStats.size,
        memoryUsage: cacheStats.memoryUsage,
      }));
    };

    // Update metrics every 2 seconds
    const interval = setInterval(updateMetrics, 2000);
    updateMetrics(); // Initial update

    return () => clearInterval(interval);
  }, []);

  const hitRate = metrics.cacheHits + metrics.cacheMisses > 0 
    ? ((metrics.cacheHits / (metrics.cacheHits + metrics.cacheMisses)) * 100).toFixed(1)
    : '0.0';

  const memoryUsageKB = (metrics.memoryUsage / 1024).toFixed(1);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        title="Show Performance Monitor"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 w-80 z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Cache Hit Rate:</span>
          <span className={`font-medium ${parseFloat(hitRate) > 80 ? 'text-green-600' : 'text-yellow-600'}`}>
            {hitRate}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Cache Hits:</span>
          <span className="font-medium text-green-600">{metrics.cacheHits}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Cache Misses:</span>
          <span className="font-medium text-red-600">{metrics.cacheMisses}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Cache Size:</span>
          <span className="font-medium">{metrics.cacheSize} entries</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Memory Usage:</span>
          <span className="font-medium">{memoryUsageKB} KB</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Resources:</span>
          <span className="font-medium">{metrics.resourceCount.toLocaleString()}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Load Time:</span>
          <span className="font-medium">{metrics.loadTime}ms</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Filter Time:</span>
          <span className="font-medium">{metrics.filterTime}ms</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t">
        <div className="flex justify-between text-xs text-gray-500">
          <span>Status: {parseFloat(hitRate) > 80 ? '🟢 Optimized' : '🟡 Needs Tuning'}</span>
          <span>Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
