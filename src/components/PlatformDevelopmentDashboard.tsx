import React, { useEffect, useState } from 'react';
import {
  platformDevelopmentService,
  type DevelopmentMetrics,
  type PlatformTask,
} from '../services/PlatformDevelopmentService';

export const PlatformDevelopmentDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<PlatformTask[]>([]);
  const [metrics, setMetrics] = useState<DevelopmentMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = () => {
    setTasks(platformDevelopmentService.getTasks());
    setMetrics(platformDevelopmentService.getMetrics());
    setIsLoading(false);
  };

  const handleProcessTask = async (taskId: string) => {
    try {
      await platformDevelopmentService.processTask(taskId);
      loadDashboardData();
    } catch (error) {
      console.error('Failed to process task:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pounamu mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Platform Development Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="platform-development-dashboard p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto my-8">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-pounamu to-blue-600 rounded-lg flex items-center justify-center mr-4">
          <span className="text-white text-2xl">🚀</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Platform Development Dashboard</h2>
          <p className="text-gray-600">Te Kura o TeAoMarama - Development Coordination</p>
        </div>
      </div>

      {metrics && (
        <div className="metrics-section mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Development Metrics</h3>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.codeQuality}</div>
              <div className="text-sm text-gray-600">Code Quality</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.performance}</div>
              <div className="text-sm text-gray-600">Performance</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.accessibility}</div>
              <div className="text-sm text-gray-600">Accessibility</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{metrics.culturalSafety}</div>
              <div className="text-sm text-gray-600">Cultural Safety</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-indigo-600">{metrics.educationalValue}</div>
              <div className="text-sm text-gray-600">Educational Value</div>
            </div>
            <div className="bg-gradient-to-r from-pounamu to-blue-600 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-white">{metrics.overallScore}</div>
              <div className="text-sm text-white opacity-90">Overall Score</div>
            </div>
          </div>
        </div>
      )}

      <div className="tasks-section mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Development Tasks</h3>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-50 p-4 rounded-lg border-l-4 border-pounamu">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        task.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : task.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {task.status.toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        task.priority === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : task.priority === 'high'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {task.priority.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500 capitalize">{task.type}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{task.description}</p>
                </div>
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleProcessTask(task.id)}
                    className="px-3 py-1 bg-pounamu text-white rounded text-sm hover:bg-pounamu-dark transition-colors"
                  >
                    Process
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformDevelopmentDashboard;
