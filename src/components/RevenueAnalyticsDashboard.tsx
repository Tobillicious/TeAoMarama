import React, { useState, useEffect } from 'react';
import { revenueEngine } from '../services/revenue-engine';

const RevenueAnalyticsDashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<any>(null);

  useEffect(() => {
    const data = revenueEngine.generateReport();
    setRevenueData(data);
  }, []);

  if (!revenueData) {
    return <div className="p-8">Loading revenue analytics...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">💰 Te Ao Mārama Revenue Engine</h1>
          <p className="text-blue-200">Real revenue generation for NZ educational excellence</p>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-2">💵 Total Revenue</h3>
            <p className="text-3xl font-bold text-green-400">
              ${revenueData.summary.totalRevenue.toFixed(2)} NZD
            </p>
            <p className="text-sm text-gray-300 mt-2">All-time earnings</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-2">📈 Monthly Recurring</h3>
            <p className="text-3xl font-bold text-blue-400">
              ${revenueData.summary.monthlyRecurring.toFixed(2)} NZD
            </p>
            <p className="text-sm text-gray-300 mt-2">Subscription revenue</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold mb-2">👥 Subscribers</h3>
            <p className="text-3xl font-bold text-purple-400">
              {revenueData.summary.subscribers}
            </p>
            <p className="text-sm text-gray-300 mt-2">Active subscriptions</p>
          </div>
        </div>

        {/* Revenue Streams */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold mb-4">💎 Revenue Streams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {revenueEngine.getRevenueStreams().map((stream) => (
              <div key={stream.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-semibold text-lg">{stream.name}</h3>
                <p className="text-2xl font-bold text-green-400 my-2">
                  ${stream.price} {stream.currency}
                  {stream.type === 'subscription' && <span className="text-sm">/month</span>}
                  {stream.type === 'usage-based' && <span className="text-sm">/use</span>}
                </p>
                <p className="text-gray-300 text-sm">{stream.description}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                  stream.type === 'subscription' ? 'bg-green-500/20 text-green-300' :
                  stream.type === 'one-time' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-purple-500/20 text-purple-300'
                }`}>
                  {stream.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Projections */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold mb-4">📊 Revenue Projections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {revenueData.projections.map((projection: any, index: number) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="font-semibold text-lg text-yellow-400">{projection.scenario}</h3>
                <p className="text-gray-300 text-sm mb-3">{projection.timeframe}</p>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-400">Monthly Revenue:</span>
                    <p className="text-xl font-bold text-green-400">
                      ${projection.monthlyRevenue.toFixed(2)} NZD
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-400">Annual Revenue:</span>
                    <p className="text-lg font-semibold text-blue-400">
                      ${projection.annualRevenue.toFixed(2)} NZD
                    </p>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <span className="text-xs text-gray-400">Target Subscribers:</span>
                    <div className="grid grid-cols-2 gap-1 text-xs mt-1">
                      <div>Teachers: {projection.subscribers.teachers}</div>
                      <div>Schools: {projection.subscribers.schools}</div>
                      <div>Cultural: {projection.subscribers.culturalPacks}</div>
                      <div>AI Use: {projection.subscribers.assessments}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optimization Strategies */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold mb-4">🚀 Revenue Optimization Strategies</h2>
          <div className="space-y-4">
            {revenueData.strategies.map((strategy: any, index: number) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{strategy.strategy}</h3>
                  <div className="flex space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${
                      strategy.impact === 'high' ? 'bg-red-500/20 text-red-300' :
                      strategy.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {strategy.impact} impact
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      strategy.effort === 'high' ? 'bg-red-500/20 text-red-300' :
                      strategy.effort === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {strategy.effort} effort
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-2">{strategy.description}</p>
                <p className="text-green-400 font-semibold text-sm">
                  Expected: {strategy.expectedIncrease}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-400/30 mt-8">
          <h2 className="text-2xl font-bold mb-4">🎯 Next Steps for Revenue Generation</h2>
          <ul className="space-y-2">
            {revenueData.recommendations.map((rec: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <p className="font-semibold text-yellow-400">⚠️ Current Status: Demo Mode</p>
            <p className="text-sm text-gray-300 mt-1">
              Revenue figures shown are projections. To start generating real revenue:
            </p>
            <ol className="text-sm text-gray-300 mt-2 space-y-1">
              <li>1. Integrate Stripe payment processing</li>
              <li>2. Implement subscription management</li>
              <li>3. Launch marketing campaigns</li>
              <li>4. Onboard first paying customers</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalyticsDashboard;