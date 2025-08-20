/**
 * Migration Dashboard Component
 * Shows real-time migration progress and statistics
 */
import React, { useEffect, useState } from 'react'
import {migrationProgressTracker, type MigrationProgress} from '../services/MigrationProgressTracker'

export default function MigrationDashboard() {const [progress, setProgress] = useState<MigrationProgress | null>(null)
  const [statistics, setStatistics] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

useEffect_(() => {
const unsubscribe = migrationProgressTracker.subscribe(_(newProgress) => {
setProgress(newProgress)
      setStatistics(migrationProgressTracker.getStatistics())})

    // Initial load
setProgress(migrationProgressTracker.getProgress())
    setStatistics(migrationProgressTracker.getStatistics())

return unsubscribe
  }, [])

if (!progress || !statistics) {
return null
  }
const completionPercentage = (progress.processedResources / progress.totalResources) * 100
  const timeRemaining = progress.estimatedCompletion.getTime() - Date.now()
  const hoursRemaining = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60)))

if (!isVisible) {
return (
_<button
onClick={() => setIsVisible(true)}
className="fixed bottom-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-lg hover: bg-green-600 transition-colors"
title="Show Migration Dashboard"
      >
        📈
      </button>
    )
  }
return (
_<div className="fixed bottom-4 left-4 bg-white border rounded-lg shadow-lg p-4 w-96 z-50 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Migration Progress</h3>
        <button
onClick={() => setIsVisible(false)}
className="text-gray-500 hover: text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Completion</span>
          <span className="font-medium">{completionPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
className="bg-green-500 h-2 rounded-full transition-all duration-300"
style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{progress.processedResources.toLocaleString()}</div>
          <div className="text-xs text-blue-800">Processed</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{statistics.completionRate}%</div>
          <div className="text-xs text-green-800">Success Rate</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{progress.failedResources}</div>
          <div className="text-xs text-yellow-800">Failed</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{hoursRemaining}h</div>
          <div className="text-xs text-purple-800">Time Remaining</div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Resources:</span>
          <span className="font-medium">{progress.totalResources.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Pending:</span>
          <span className="font-medium">{progress.pendingResources.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Cultural Safety Checks:</span>
          <span className="font-medium">{progress.culturalSafetyChecks.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Quality Assurance Passed:</span>
          <span className="font-medium">{progress.qualityAssurancePassed.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Average Quality Score:</span>
          <span className="font-medium">{statistics.averageQualityScore}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Cultural Safety Pass Rate:</span>
          <span className="font-medium">{statistics.culturalSafetyPassRate}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Current Phase:</span>
          <span className="font-medium capitalize">{progress.currentPhase.replace('-', ' ')}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t flex gap-2">
        <button
onClick={() => migrationProgressTracker.simulateBatchProcessing(50)}
className="flex-1 bg-blue-500 text-white px-3 py-1 rounded text-sm hover: bg-blue-600 transition-colors"
        >
Process Batch
        </button>
        <button
onClick={() => migrationProgressTracker.reset()}
className="flex-1 bg-red-500 text-white px-3 py-1 rounded text-sm hover: bg-red-600 transition-colors"
        >
Reset
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-500 text-center">
Last updated: {progress.lastUpdated.toLocaleTimeString()}
      </div>
    </div>
  )
}
