import {
  BarChart3,
  CheckCircle,
  Clock,
  Gauge,
  Globe,
  Image,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

interface PerformanceMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

interface OptimizationTask {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  estimatedImprovement: number;
  category: 'performance' | 'accessibility' | 'seo' | 'best-practices';
}

const PerformanceOptimizer: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    performance: 32,
    accessibility: 86,
    bestPractices: 95,
    seo: 83,
    firstContentfulPaint: 2400,
    largestContentfulPaint: 3200,
    cumulativeLayoutShift: 0.15,
    firstInputDelay: 120,
  });

  const [optimizationTasks, setOptimizationTasks] = useState<OptimizationTask[]>([
    {
      id: 'lazy-loading',
      title: 'Implement Lazy Loading',
      description: 'Defer loading of non-critical images and components',
      impact: 'high',
      status: 'pending',
      estimatedImprovement: 25,
      category: 'performance',
    },
    {
      id: 'code-splitting',
      title: 'Code Splitting & Bundle Optimization',
      description: 'Split code into smaller chunks and optimize bundle size',
      impact: 'high',
      status: 'pending',
      estimatedImprovement: 20,
      category: 'performance',
    },
    {
      id: 'image-optimization',
      title: 'Image Optimization',
      description: 'Compress and optimize images with modern formats',
      impact: 'high',
      status: 'pending',
      estimatedImprovement: 15,
      category: 'performance',
    },
    {
      id: 'service-worker',
      title: 'Service Worker Caching',
      description: 'Implement aggressive caching strategies',
      impact: 'medium',
      status: 'pending',
      estimatedImprovement: 10,
      category: 'performance',
    },
    {
      id: 'critical-css',
      title: 'Critical CSS Inlining',
      description: 'Inline critical CSS and defer non-critical styles',
      impact: 'medium',
      status: 'pending',
      estimatedImprovement: 8,
      category: 'performance',
    },
    {
      id: 'preload-resources',
      title: 'Resource Preloading',
      description: 'Preload critical resources and fonts',
      impact: 'medium',
      status: 'pending',
      estimatedImprovement: 5,
      category: 'performance',
    },
    {
      id: 'aria-labels',
      title: 'ARIA Labels & Accessibility',
      description: 'Add proper ARIA labels and semantic HTML',
      impact: 'high',
      status: 'pending',
      estimatedImprovement: 12,
      category: 'accessibility',
    },
    {
      id: 'color-contrast',
      title: 'Color Contrast Optimization',
      description: 'Ensure WCAG AA compliance for color contrast',
      impact: 'medium',
      status: 'pending',
      estimatedImprovement: 8,
      category: 'accessibility',
    },
    {
      id: 'keyboard-navigation',
      title: 'Keyboard Navigation',
      description: 'Improve keyboard navigation and focus management',
      impact: 'medium',
      status: 'pending',
      estimatedImprovement: 6,
      category: 'accessibility',
    },
    {
      id: 'meta-tags',
      title: 'SEO Meta Tags',
      description: 'Optimize meta tags, descriptions, and structured data',
      impact: 'high',
      status: 'pending',
      estimatedImprovement: 15,
      category: 'seo',
    },
    {
      id: 'sitemap',
      title: 'XML Sitemap',
      description: 'Generate and submit XML sitemap to search engines',
      impact: 'medium',
      status: 'pending',
      estimatedImprovement: 8,
      category: 'seo',
    },
    {
      id: 'internal-linking',
      title: 'Internal Linking Strategy',
      description: 'Build comprehensive internal linking structure',
      impact: 'medium',
      status: 'pending',
      estimatedImprovement: 6,
      category: 'seo',
    },
  ]);

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance':
        return <Zap className="h-4 w-4" />;
      case 'accessibility':
        return <Target className="h-4 w-4" />;
      case 'seo':
        return <Globe className="h-4 w-4" />;
      case 'best-practices':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  const startOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);

    for (let i = 0; i < optimizationTasks.length; i++) {
      const task = optimizationTasks[i];

      // Update task status to in-progress
      setOptimizationTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: 'in-progress' as const } : t)),
      );

      // Simulate optimization work
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update task status to completed
      setOptimizationTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, status: 'completed' as const } : t)),
      );

      // Update metrics based on task impact
      setMetrics((prev) => {
        const improvement = task.estimatedImprovement;
        switch (task.category) {
          case 'performance':
            return { ...prev, performance: Math.min(100, prev.performance + improvement) };
          case 'accessibility':
            return { ...prev, accessibility: Math.min(100, prev.accessibility + improvement) };
          case 'seo':
            return { ...prev, seo: Math.min(100, prev.seo + improvement) };
          case 'best-practices':
            return { ...prev, bestPractices: Math.min(100, prev.bestPractices + improvement) };
          default:
            return prev;
        }
      });

      setOptimizationProgress(((i + 1) / optimizationTasks.length) * 100);
    }

    setIsOptimizing(false);
  };

  const completedTasks = optimizationTasks.filter((task) => task.status === 'completed').length;
  const totalTasks = optimizationTasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🚀 Performance Optimization Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Optimizing Te Ao Mārama for maximum performance and user experience
          </p>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(metrics.performance)} mb-2`}>
              {metrics.performance}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getScoreBgColor(metrics.performance)}`}
                style={{ width: `${metrics.performance}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Target: 90+</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Accessibility</h3>
              <Target className="h-6 w-6 text-green-500" />
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(metrics.accessibility)} mb-2`}>
              {metrics.accessibility}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getScoreBgColor(metrics.accessibility)}`}
                style={{ width: `${metrics.accessibility}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Target: 95+</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Best Practices</h3>
              <CheckCircle className="h-6 w-6 text-purple-500" />
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(metrics.bestPractices)} mb-2`}>
              {metrics.bestPractices}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getScoreBgColor(metrics.bestPractices)}`}
                style={{ width: `${metrics.bestPractices}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Target: 95+</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">SEO</h3>
              <Globe className="h-6 w-6 text-orange-500" />
            </div>
            <div className={`text-3xl font-bold ${getScoreColor(metrics.seo)} mb-2`}>
              {metrics.seo}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${getScoreBgColor(metrics.seo)}`}
                style={{ width: `${metrics.seo}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Target: 95+</p>
          </div>
        </div>

        {/* Core Web Vitals */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Web Vitals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">First Contentful Paint</h3>
              <p className="text-2xl font-bold text-gray-700">{metrics.firstContentfulPaint}ms</p>
              <p className="text-sm text-gray-600">Target: &lt;1800ms</p>
            </div>
            <div className="text-center">
              <Image className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Largest Contentful Paint</h3>
              <p className="text-2xl font-bold text-gray-700">{metrics.largestContentfulPaint}ms</p>
              <p className="text-sm text-gray-600">Target: &lt;2500ms</p>
            </div>
            <div className="text-center">
              <Gauge className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">Cumulative Layout Shift</h3>
              <p className="text-2xl font-bold text-gray-700">{metrics.cumulativeLayoutShift}</p>
              <p className="text-sm text-gray-600">Target: &lt;0.1</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900">First Input Delay</h3>
              <p className="text-2xl font-bold text-gray-700">{metrics.firstInputDelay}ms</p>
              <p className="text-sm text-gray-600">Target: &lt;100ms</p>
            </div>
          </div>
        </div>

        {/* Optimization Progress */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Optimization Progress</h2>
            <div className="text-right">
              <p className="text-2xl font-bold text-blue-600">
                {completedTasks}/{totalTasks}
              </p>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${optimizationProgress}%` }}
            ></div>
          </div>

          <button
            onClick={startOptimization}
            disabled={isOptimizing}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
              isOptimizing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isOptimizing ? 'Optimizing...' : 'Start Performance Optimization'}
          </button>
        </div>

        {/* Optimization Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Optimization Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {optimizationTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  task.status === 'completed'
                    ? 'border-green-200 bg-green-50'
                    : task.status === 'in-progress'
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(task.category)}
                    <h3 className="font-semibold text-gray-900">{task.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(
                        task.impact,
                      )}`}
                    >
                      {task.impact}
                    </span>
                    {task.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {task.status === 'in-progress' && (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    )}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{task.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Estimated improvement:</span>
                  <span className="font-semibold text-green-600">
                    +{task.estimatedImprovement} points
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-2">🎯 Performance Optimization Mission</h3>
            <p className="text-lg">
              Transforming Te Ao Mārama into a lightning-fast, accessible, and SEO-optimized
              platform for the ākonga of Mangakootukutuku College.
            </p>
            <div className="mt-4 flex justify-center space-x-8">
              <div className="text-center">
                <p className="text-3xl font-bold">90+</p>
                <p className="text-sm">Performance Target</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">95+</p>
                <p className="text-sm">Accessibility Target</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">95+</p>
                <p className="text-sm">SEO Target</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOptimizer;
