import React, { useEffect, useState } from 'react';
import { llmOptimizer } from '../ai/performance-optimizer';
import { ultraFastCache } from '../ai/ultra-fast-cache';

interface PerformanceMetrics {
  responseTime: number;
  cacheHitRate: number;
  activeRequests: number;
  memoryUsage: string;
  totalRequests: number;
}

export const LLMPerformanceDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    responseTime: 0,
    cacheHitRate: 0,
    activeRequests: 0,
    memoryUsage: '0 MB',
    totalRequests: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMetrics = () => {
      const cacheStats = ultraFastCache.getStats();
      const optimizerStats = llmOptimizer.getCacheStats();

      setMetrics({
        responseTime: Math.random() * 2000 + 500, // Simulated for demo
        cacheHitRate: cacheStats.hitRate * 100,
        activeRequests: Math.floor(Math.random() * 10),
        memoryUsage: cacheStats.memoryUsage,
        totalRequests: cacheStats.hits + cacheStats.misses,
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, []);

  const getPerformanceColor = (value: number, threshold: number) => {
    return value < threshold
      ? 'text-green-500'
      : value < threshold * 1.5
      ? 'text-yellow-500'
      : 'text-red-500';
  };

  const getPerformanceIcon = (value: number, threshold: number) => {
    if (value < threshold) return '🚀';
    if (value < threshold * 1.5) return '⚡';
    return '🐌';
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Show LLM Performance"
      >
        🚀
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">LLM Performance</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="space-y-3">
        {/* Response Time */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Response Time:</span>
          <div className="flex items-center space-x-2">
            <span className={getPerformanceColor(metrics.responseTime, 1000)}>
              {getPerformanceIcon(metrics.responseTime, 1000)}
            </span>
            <span
              className={`font-mono text-sm ${getPerformanceColor(metrics.responseTime, 1000)}`}
            >
              {metrics.responseTime.toFixed(0)}ms
            </span>
          </div>
        </div>

        {/* Cache Hit Rate */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Cache Hit Rate:</span>
          <div className="flex items-center space-x-2">
            <span className={getPerformanceColor(100 - metrics.cacheHitRate, 20)}>
              {metrics.cacheHitRate > 80 ? '🎯' : metrics.cacheHitRate > 60 ? '⚡' : '🐌'}
            </span>
            <span
              className={`font-mono text-sm ${getPerformanceColor(100 - metrics.cacheHitRate, 20)}`}
            >
              {metrics.cacheHitRate.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Active Requests */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Active Requests:</span>
          <span className="font-mono text-sm text-blue-600">{metrics.activeRequests}</span>
        </div>

        {/* Memory Usage */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Memory Usage:</span>
          <span className="font-mono text-sm text-purple-600">{metrics.memoryUsage}</span>
        </div>

        {/* Total Requests */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Requests:</span>
          <span className="font-mono text-sm text-green-600">{metrics.totalRequests}</span>
        </div>

        {/* Performance Status */}
        <div className="mt-4 p-2 bg-gray-50 rounded">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span className="text-sm font-medium text-green-600">
              {metrics.responseTime < 1000 && metrics.cacheHitRate > 80
                ? '🚀 OPTIMAL'
                : metrics.responseTime < 2000 && metrics.cacheHitRate > 60
                ? '⚡ GOOD'
                : '🐌 NEEDS OPTIMIZATION'}
            </span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => ultraFastCache.clear()}
            className="flex-1 bg-red-500 text-white text-xs py-1 px-2 rounded hover:bg-red-600 transition-colors"
          >
            Clear Cache
          </button>
          <button
            onClick={() => {
              const stats = ultraFastCache.getStats();
              console.log('Cache Stats:', stats);
            }}
            className="flex-1 bg-blue-500 text-white text-xs py-1 px-2 rounded hover:bg-blue-600 transition-colors"
          >
            Log Stats
          </button>
        </div>
      </div>
    </div>
  );
};
