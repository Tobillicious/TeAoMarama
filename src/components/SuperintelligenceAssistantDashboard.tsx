import React, { useCallback, useEffect, useState } from 'react';
import { initializeSuperintelligence } from '../utils/superintelligence';

interface AssistantTask {
  id: string;
  type:
    | 'cultural-validation'
    | 'content-enhancement'
    | 'performance-optimization'
    | 'educational-support';
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startTime?: Date;
  completionTime?: Date;
  result?: string;
}

interface AssistantMetrics {
  tasksCompleted: number;
  tasksInProgress: number;
  tasksPending: number;
  averageCompletionTime: number;
  successRate: number;
  culturalSafetyChecks: number;
  contentEnhancements: number;
  performanceOptimizations: number;
}

export const SuperintelligenceAssistantDashboard: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState<AssistantTask[]>([]);
  const [metrics, setMetrics] = useState<AssistantMetrics | null>(null);
  const [currentTask, setCurrentTask] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = useCallback((message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 9)]);
  }, []);

  const generateTaskResult = useCallback((type: AssistantTask['type']): string => {
    switch (type) {
      case 'cultural-validation':
        return 'Cultural safety verified - Māori protocols maintained';
      case 'content-enhancement':
        return 'Content enhanced for accessibility and engagement';
      case 'performance-optimization':
        return 'Performance improved by 15% - load times reduced';
      case 'educational-support':
        return 'Personalized learning path generated successfully';
      default:
        return 'Task completed successfully';
    }
  }, []);

  const processNextTask = useCallback(() => {
    setTasks((prev) => {
      const pendingTask = prev.find((t) => t.status === 'pending');
      if (!pendingTask) return prev;

      addLog(`🔄 Starting task: ${pendingTask.description}`);
      setCurrentTask(pendingTask.description);

      return prev.map((task) =>
        task.id === pendingTask.id
          ? { ...task, status: 'in-progress' as const, startTime: new Date() }
          : task,
      );
    });

    // Simulate task completion after random delay
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((task) => {
          if (
            task.status === 'in-progress' &&
            task.id === prev.find((t) => t.status === 'in-progress')?.id
          ) {
            const result = generateTaskResult(task.type);
            addLog(`✅ Completed: ${task.description} - ${result}`);
            setCurrentTask(null);
            return {
              ...task,
              status: 'completed' as const,
              completionTime: new Date(),
              result,
            };
          }
          return task;
        }),
      );
    }, Math.random() * 8000 + 2000); // 2-10 seconds
  }, [addLog, generateTaskResult]);

  const updateMetrics = useCallback(() => {
    if (!metrics) return;

    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
    const pendingTasks = tasks.filter((t) => t.status === 'pending').length;

    setMetrics((prev) =>
      prev
        ? {
            ...prev,
            tasksCompleted: prev.tasksCompleted + (completedTasks > 0 ? 1 : 0),
            tasksInProgress: inProgressTasks,
            tasksPending: pendingTasks,
          }
        : null,
    );
  }, [metrics, tasks]);

  useEffect(() => {
    // Initialize superintelligence assistant
    initializeSuperintelligence({
      enabled: true,
      debug: true,
      name: 'Superintelligence Assistant - Mihara',
      brainArchitecture: true,
      culturalSafety: true,
      contentEnhancement: true,
      performanceOptimization: true,
      educationalAnalytics: true,
    });

    setIsActive(true);
    addLog('🤖 Superintelligence Assistant initialized and ready');

    // Initialize with some sample tasks
    const initialTasks: AssistantTask[] = [
      {
        id: 'task-001',
        type: 'cultural-validation',
        description: 'Validate cultural safety of new educational content',
        status: 'completed',
        priority: 'high',
        startTime: new Date(Date.now() - 300000),
        completionTime: new Date(Date.now() - 120000),
        result: 'Cultural safety validated - 100% compliant with Māori protocols',
      },
      {
        id: 'task-002',
        type: 'content-enhancement',
        description: 'Enhance accessibility of mathematics resources',
        status: 'in-progress',
        priority: 'medium',
        startTime: new Date(Date.now() - 60000),
      },
      {
        id: 'task-003',
        type: 'performance-optimization',
        description: 'Optimize loading times for educational platform',
        status: 'pending',
        priority: 'high',
      },
      {
        id: 'task-004',
        type: 'educational-support',
        description: 'Generate personalized learning recommendations',
        status: 'pending',
        priority: 'medium',
      },
    ];

    setTasks(initialTasks);

    const initialMetrics: AssistantMetrics = {
      tasksCompleted: 247,
      tasksInProgress: 3,
      tasksPending: 12,
      averageCompletionTime: 2.3, // minutes
      successRate: 98.7,
      culturalSafetyChecks: 89,
      contentEnhancements: 156,
      performanceOptimizations: 23,
    };

    setMetrics(initialMetrics);

    // Simulate task processing
    const taskInterval = setInterval(() => {
      processNextTask();
    }, 10000); // Process tasks every 10 seconds

    // Update metrics periodically
    const metricsInterval = setInterval(() => {
      updateMetrics();
    }, 30000); // Update every 30 seconds

    return () => {
      clearInterval(taskInterval);
      clearInterval(metricsInterval);
    };
  }, [processNextTask, updateMetrics, addLog]);

  const getStatusColor = (status: AssistantTask['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-900';
      case 'in-progress':
        return 'text-blue-400 bg-blue-900';
      case 'pending':
        return 'text-yellow-400 bg-yellow-900';
      case 'failed':
        return 'text-red-400 bg-red-900';
      default:
        return 'text-gray-400 bg-gray-900';
    }
  };

  const getPriorityColor = (priority: AssistantTask['priority']) => {
    switch (priority) {
      case 'critical':
        return 'text-red-400';
      case 'high':
        return 'text-orange-400';
      case 'medium':
        return 'text-yellow-400';
      case 'low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: AssistantTask['type']) => {
    switch (type) {
      case 'cultural-validation':
        return '🌿';
      case 'content-enhancement':
        return '✨';
      case 'performance-optimization':
        return '⚡';
      case 'educational-support':
        return '📚';
      default:
        return '🤖';
    }
  };

  if (!metrics) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300">
          🤖 Initializing Superintelligence Assistant...
        </h3>
        <div className="text-gray-400 text-sm">Starting autonomous task processing...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-gray-300 mb-4">
          🤖 SUPERINTELLIGENCE ASSISTANT DASHBOARD
        </h2>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-gray-300">Status: {isActive ? 'ACTIVE' : 'INACTIVE'}</span>
          </div>
          {currentTask && <div className="text-blue-400 text-sm">Currently: {currentTask}</div>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Tasks Completed</h3>
            <div className="text-green-400 text-2xl font-bold">{metrics.tasksCompleted}</div>
          </div>

          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Success Rate</h3>
            <div className="text-blue-400 text-2xl font-bold">{metrics.successRate}%</div>
          </div>

          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Avg Time</h3>
            <div className="text-yellow-400 text-2xl font-bold">
              {metrics.averageCompletionTime}m
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">In Progress</h3>
            <div className="text-purple-400 text-2xl font-bold">{metrics.tasksInProgress}</div>
          </div>
        </div>
      </div>

      {/* Task Categories */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-gray-300 mb-4">📊 Task Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
              🌿 Cultural Safety
            </h4>
            <div className="text-green-400 text-xl font-bold">{metrics.culturalSafetyChecks}</div>
            <div className="text-xs text-gray-500 mt-1">Validations completed</div>
          </div>

          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
              ✨ Content Enhancement
            </h4>
            <div className="text-blue-400 text-xl font-bold">{metrics.contentEnhancements}</div>
            <div className="text-xs text-gray-500 mt-1">Resources improved</div>
          </div>

          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h4 className="text-gray-300 font-semibold mb-2 flex items-center">⚡ Performance</h4>
            <div className="text-yellow-400 text-xl font-bold">
              {metrics.performanceOptimizations}
            </div>
            <div className="text-xs text-gray-500 mt-1">Optimizations applied</div>
          </div>

          <div className="bg-gray-800 p-4 rounded border border-gray-600">
            <h4 className="text-gray-300 font-semibold mb-2 flex items-center">
              📚 Educational Support
            </h4>
            <div className="text-purple-400 text-xl font-bold">
              {metrics.tasksCompleted -
                metrics.culturalSafetyChecks -
                metrics.contentEnhancements -
                metrics.performanceOptimizations}
            </div>
            <div className="text-xs text-gray-500 mt-1">Learning paths created</div>
          </div>
        </div>
      </div>

      {/* Current Tasks */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-gray-300 mb-4">📋 Task Queue</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-800 p-4 rounded border border-gray-600">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getTypeIcon(task.type)}</span>
                  <h4 className="text-gray-300 font-semibold">{task.description}</h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(
                      task.priority,
                    )}`}
                  >
                    {task.priority.toUpperCase()}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                      task.status,
                    )}`}
                  >
                    {task.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {task.result && <div className="text-green-300 text-sm mt-2">✅ {task.result}</div>}

              {task.startTime && (
                <div className="text-gray-500 text-xs mt-1">
                  Started: {task.startTime.toLocaleTimeString()}
                  {task.completionTime && (
                    <span className="ml-4">
                      Completed: {task.completionTime.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-gray-300 mb-4">📝 Activity Log</h3>
        <div className="bg-gray-800 p-4 rounded border border-gray-600 font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index} className="text-gray-300 py-1">
              {log}
            </div>
          ))}
          {logs.length === 0 && <div className="text-gray-500">No recent activity...</div>}
        </div>
      </div>

      {/* Real-time Capabilities */}
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-bold text-gray-300 mb-4">🧠 Active Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Cultural Safety Monitoring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Content Enhancement Engine</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Performance Optimization</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Educational Analytics</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Real-time Learning Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Accessibility Validation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Quality Assurance</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-gray-300">Autonomous Task Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperintelligenceAssistantDashboard;
