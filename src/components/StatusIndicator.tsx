import React from 'react'

interface StatusIndicatorProps {,
resourcesCompleted: number,
totalResources: number,
culturalSafety: string,
systemStatus: string,
lastUpdated: string}
export const StatusIndicator: React.FC<StatusIndicatorProps> = (_{
resourcesCompleted, 
_totalResources, 
_culturalSafety, 
_systemStatus, 
_lastUpdated
}) => {
const progressPercentage = (resourcesCompleted / totalResources) * 100

return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          🤖 Mihara Production Status
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-600 font-medium">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{resourcesCompleted}</div>
          <div className="text-xs text-gray-600">Resources Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalResources}</div>
          <div className="text-xs text-gray-600">Total Target</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progressPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
style={{width: `${progressPercentage}%`}}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Cultural Safety:</span>
          <span className="ml-2 text-green-600 font-medium">{culturalSafety}</span>
        </div>
        <div>
          <span className="text-gray-600">System Status:</span>
          <span className="ml-2 text-blue-600 font-medium">{systemStatus}</span>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
Last updated: {lastUpdated}
        </div>
      </div>
    </div>
  )
}

export default StatusIndicator
