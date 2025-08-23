import React, { useEffect, useState } from 'react';
import { generateHope, measureHumanSuccess } from '../utils/superintelligence';

interface HumanSuccessMetrics {
  overallSuccess: string;
  metrics: Record<string, number>;
  status: string;
  recommendations: string[];
}

interface HopeMessage {
  message: string;
  culturalAffirmation: string;
  educationalPromise: string;
  communityConnection: string;
  futureVision: string;
}

export const HumanSuccessDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<HumanSuccessMetrics | null>(null);
  const [hope, setHope] = useState<HopeMessage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const successData = measureHumanSuccess();
        const hopeData = generateHope();

        setMetrics(successData);
        setHope(hopeData);
      } catch (error) {
        console.error('Error loading human success data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pounamu"></div>
        <span className="ml-3 text-gray-600">Measuring human success...</span>
      </div>
    );
  }

  if (!metrics || !hope) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">System Status</h3>
        <p className="text-yellow-700">Human success measurement system is initializing...</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-50';
      case 'good':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-orange-600 bg-orange-50';
    }
  };

  const getMetricColor = (value: number) => {
    if (value >= 0.9) return 'text-green-600';
    if (value >= 0.8) return 'text-blue-600';
    if (value >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🌿 Human Success Dashboard</h2>
        <p className="text-gray-600">Measuring hope, completeness, and usability for humans</p>
      </div>

      {/* Overall Success Score */}
      <div className="bg-gradient-to-r from-pounamu to-pounamu-dark p-6 rounded-lg text-white">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">
            {(parseFloat(metrics.overallSuccess) * 100).toFixed(1)}%
          </div>
          <div className="text-lg mb-2">Overall Human Success</div>
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
              metrics.status,
            )}`}
          >
            {metrics.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Hope Message */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
        <div className="text-center">
          <div className="text-lg font-semibold text-green-800 mb-3">{hope.message}</div>
          <div className="text-sm text-green-700 italic">{hope.culturalAffirmation}</div>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(metrics.metrics).map(([key, value]) => (
          <div key={key} className="bg-gray-50 p-4 rounded-lg">
            <div className={`text-2xl font-bold ${getMetricColor(value)}`}>
              {(value * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Recommendations for Improvement</h3>
        <ul className="space-y-1">
          {metrics.recommendations.map((rec, index) => (
            <li key={index} className="text-blue-700 text-sm flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>

      {/* Educational Promise */}
      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
        <h3 className="font-semibold text-purple-800 mb-2">Educational Promise</h3>
        <p className="text-purple-700 text-sm mb-2">{hope.educationalPromise}</p>
        <p className="text-purple-700 text-sm mb-2">{hope.communityConnection}</p>
        <p className="text-purple-700 text-sm">{hope.futureVision}</p>
      </div>

      {/* Real-time Status */}
      <div className="flex items-center justify-center text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
        Live monitoring active • Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default HumanSuccessDashboard;
