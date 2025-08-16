/**
 * Performance Test Runner Component
 * Executes performance tests and displays results in production app
 */

import React, { useState, useEffect } from 'react';
import type { ParsedResource } from '../services/MetadataParser';

interface PerformanceTestRunnerProps {
  resources: ParsedResource[];
  onTestComplete?: (metrics: PerformanceMetrics) => void;
}

export const PerformanceTestRunner: React.FC<PerformanceTestRunnerProps> = ({
  resources,
  onTestComplete
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<PerformanceMetrics | null>(null);
  const [progress, setProgress] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const runPerformanceTests = async () => {
    setIsRunning(true);
    setProgress('Initializing performance tests...');
    
    try {
      // Run complete test suite
      setProgress('Testing initial load performance...');
      const metrics = await PerformanceTester.runCompleteSuite(resources.length || 5000);
      
      setProgress('Generating recommendations...');
      const recs = PerformanceTester.generateRecommendations(metrics);
      
      setResults(metrics);
      setRecommendations(recs);
      setProgress('Performance tests completed!');
      
      if (onTestComplete) {
        onTestComplete(metrics);
      }
    } catch (error) {
      console.error('Performance test failed:', error);
      setProgress('Performance test failed - check console for details');
    } finally {
      setIsRunning(false);
    }
  };

  const formatTime = (ms: number) => `${ms.toFixed(2)}ms`;
  const formatMemory = (mb: number) => `${mb}MB`;

  return (
    <div className="bg-white rounded-lg border p-6 mt-6" style={{ borderColor: 'var(--color-border)' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
            Performance Test Suite
          </h3>
          <p className="text-sm" style={{ color: 'var(--color-neutral-700)' }}>
            Test production readiness with {resources.length.toLocaleString()} resources
          </p>
        </div>
        
        <button
          onClick={runPerformanceTests}
          disabled={isRunning}
          className="px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50"
          style={{
            backgroundColor: isRunning ? 'var(--color-neutral-400)' : 'var(--color-pounamu)',
            color: 'white'
          }}
        >
          {isRunning ? '🔄 Running Tests...' : '🚀 Run Performance Tests'}
        </button>
      </div>

      {progress && (
        <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
          <p className="text-sm font-medium">{progress}</p>
        </div>
      )}

      {results && (
        <div className="space-y-6">
          {/* Performance Metrics */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
              Performance Metrics
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--color-neutral-700)' }}>
                  Initial Load Time
                </h5>
                <p className="text-2xl font-bold" style={{ 
                  color: results.initialLoadTime > 3000 ? 'var(--color-error)' : 'var(--color-success)'
                }}>
                  {formatTime(results.initialLoadTime)}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>
                  Target: &lt; 3000ms
                </p>
              </div>

              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--color-neutral-700)' }}>
                  Search Response
                </h5>
                <p className="text-2xl font-bold" style={{ 
                  color: results.searchResponseTime > 100 ? 'var(--color-error)' : 'var(--color-success)'
                }}>
                  {formatTime(results.searchResponseTime)}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>
                  Target: &lt; 100ms
                </p>
              </div>

              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--color-neutral-700)' }}>
                  Filter Response
                </h5>
                <p className="text-2xl font-bold" style={{ 
                  color: results.filterResponseTime > 50 ? 'var(--color-error)' : 'var(--color-success)'
                }}>
                  {formatTime(results.filterResponseTime)}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>
                  Target: &lt; 50ms
                </p>
              </div>

              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--color-neutral-700)' }}>
                  Scroll FPS
                </h5>
                <p className="text-2xl font-bold" style={{ 
                  color: results.scrollPerformance.fps < 55 ? 'var(--color-error)' : 'var(--color-success)'
                }}>
                  {results.scrollPerformance.fps}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>
                  Target: &gt; 55 FPS
                </p>
              </div>
            </div>
          </div>

          {/* Memory Usage */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
              Memory Usage
            </h4>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--color-neutral-700)' }}>
                  Initial
                </h5>
                <p className="text-xl font-bold">{formatMemory(results.memoryUsage.initial)}</p>
              </div>

              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--color-neutral-700)' }}>
                  After Load
                </h5>
                <p className="text-xl font-bold">{formatMemory(results.memoryUsage.afterLoad)}</p>
              </div>

              <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--color-border)' }}>
                <h5 className="font-medium text-sm mb-2" style={{ color: 'var(--color-neutral-700)' }}>
                  Peak Usage
                </h5>
                <p className="text-xl font-bold" style={{ 
                  color: results.memoryUsage.peak > 100 ? 'var(--color-error)' : 'var(--color-success)'
                }}>
                  {formatMemory(results.memoryUsage.peak)}
                </p>
                <p className="text-xs" style={{ color: 'var(--color-neutral-500)' }}>
                  Target: &lt; 100MB
                </p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
              Optimization Recommendations
            </h4>
            
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    rec.startsWith('✅') ? 'bg-green-50 border-green-400' : 'bg-yellow-50 border-yellow-400'
                  }`}
                >
                  <p className="text-sm font-medium">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Metrics Table */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>
              Detailed Metrics
            </h4>
            
            <div className="overflow-x-auto">
              <table className="w-full border rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                <thead style={{ backgroundColor: 'var(--color-neutral-50)' }}>
                  <tr>
                    <th className="p-3 text-left font-medium">Metric</th>
                    <th className="p-3 text-left font-medium">Value</th>
                    <th className="p-3 text-left font-medium">Target</th>
                    <th className="p-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-3">Initial Load Time</td>
                    <td className="p-3">{formatTime(results.initialLoadTime)}</td>
                    <td className="p-3">&lt; 3000ms</td>
                    <td className="p-3">
                      {results.initialLoadTime <= 3000 ? '✅ Good' : '⚠️ Needs optimization'}
                    </td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-3">Search Response Time</td>
                    <td className="p-3">{formatTime(results.searchResponseTime)}</td>
                    <td className="p-3">&lt; 100ms</td>
                    <td className="p-3">
                      {results.searchResponseTime <= 100 ? '✅ Good' : '⚠️ Needs optimization'}
                    </td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-3">Filter Response Time</td>
                    <td className="p-3">{formatTime(results.filterResponseTime)}</td>
                    <td className="p-3">&lt; 50ms</td>
                    <td className="p-3">
                      {results.filterResponseTime <= 50 ? '✅ Good' : '⚠️ Needs optimization'}
                    </td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-3">Scroll Performance</td>
                    <td className="p-3">{results.scrollPerformance.fps} FPS</td>
                    <td className="p-3">&gt; 55 FPS</td>
                    <td className="p-3">
                      {results.scrollPerformance.fps >= 55 ? '✅ Good' : '⚠️ Needs optimization'}
                    </td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-3">Memory Usage (Peak)</td>
                    <td className="p-3">{formatMemory(results.memoryUsage.peak)}</td>
                    <td className="p-3">&lt; 100MB</td>
                    <td className="p-3">
                      {results.memoryUsage.peak <= 100 ? '✅ Good' : '⚠️ Needs optimization'}
                    </td>
                  </tr>
                  <tr className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="p-3">Jank Events</td>
                    <td className="p-3">{results.scrollPerformance.jankCount}</td>
                    <td className="p-3">&lt; 5</td>
                    <td className="p-3">
                      {results.scrollPerformance.jankCount <= 5 ? '✅ Good' : '⚠️ Needs optimization'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTestRunner;