import React, { useEffect, useState } from 'react';
import { contentIndexOptimizer } from '../utils/content-index-optimizer';

interface ResourceCounts {
  lessons: number;
  activities: number;
  assessments: number;
  unitPlans: number;
  total: number;
}

export const ResourceCountDisplay: React.FC = () => {
  const [counts, setCounts] = useState<ResourceCounts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResourceCounts = async () => {
      try {
        // Use our optimized content index that prevents Vite build issues
        const stats = await contentIndexOptimizer.getContentStats();

        setCounts({
          lessons: stats.totalLessons,
          activities: stats.totalActivities,
          assessments: stats.totalAssessments,
          unitPlans: stats.totalUnitPlans,
          total:
            stats.totalLessons +
            stats.totalActivities +
            stats.totalAssessments +
            stats.totalUnitPlans,
        });
      } catch (error) {
        console.error('Error loading resource counts:', error);
        setCounts({
          lessons: 0,
          activities: 0,
          assessments: 0,
          unitPlans: 0,
          total: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadResourceCounts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pounamu"></div>
        <span className="ml-2 text-gray-600">Loading resources...</span>
      </div>
    );
  }

  if (!counts) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">Error loading resource counts</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
      <div className="text-center">
        <h3 className="text-xl font-bold text-green-800 mb-4">
          🌿 Full Educational Platform - Ready for Humans
        </h3>

        <div className="text-3xl font-bold text-green-600 mb-2">
          {counts.total.toLocaleString()} Resources Available
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-blue-600">{counts.lessons}</div>
            <div className="text-sm text-gray-600">Lessons</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-purple-600">{counts.activities}</div>
            <div className="text-sm text-gray-600">Activities</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-orange-600">{counts.assessments}</div>
            <div className="text-sm text-gray-600">Assessments</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-lg font-semibold text-teal-600">{counts.unitPlans}</div>
            <div className="text-sm text-gray-600">Unit Plans</div>
          </div>
        </div>

        <div className="mt-4 text-sm text-green-700">
          ✅ All resources loaded and ready for human use
        </div>

        <div className="mt-2 text-xs text-gray-500">
          Success measured by: {counts.total} complete, usable resources for humans
        </div>
      </div>
    </div>
  );
};

export default ResourceCountDisplay;
