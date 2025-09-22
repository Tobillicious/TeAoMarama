import {
  ArrowUp,
  Calendar,
  CreditCard,
  DollarSign,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface RevenueData {
  daily: number;
  weekly: number;
  monthly: number;
  total: number;
  subscribers: number;
  conversionRate: number;
  avgRevenuePerUser: number;
}

const RealTimeRevenueDashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData>({
    daily: 0,
    weekly: 0,
    monthly: 0,
    total: 0,
    subscribers: 0,
    conversionRate: 0,
    avgRevenuePerUser: 0
  });

  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Simulate real-time revenue updates
    const updateRevenue = () => {
      setRevenueData({
        daily: 1847,
        weekly: 12950,
        monthly: 47850,
        total: 184720,
        subscribers: 1247,
        conversionRate: 8.3,
        avgRevenuePerUser: 38.4
      });
    };

    updateRevenue();

    // Update every 30 seconds
    const interval = setInterval(() => {
      setRevenueData(prev => ({
        ...prev,
        daily: prev.daily + Math.floor(Math.random() * 50),
        total: prev.total + Math.floor(Math.random() * 50),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const revenueCards = [
    {
      title: 'Today\'s Revenue',
      value: `$${revenueData.daily.toLocaleString()}`,
      change: '+12.5%',
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Weekly Revenue',
      value: `$${revenueData.weekly.toLocaleString()}`,
      change: '+18.2%',
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Monthly Revenue',
      value: `$${revenueData.monthly.toLocaleString()}`,
      change: '+24.7%',
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Total Revenue',
      value: `$${revenueData.total.toLocaleString()}`,
      change: '+156.3%',
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const kpiCards = [
    {
      title: 'Active Subscribers',
      value: revenueData.subscribers.toLocaleString(),
      subtext: 'Paying customers',
      icon: <Users className="h-6 w-6 text-blue-600" />
    },
    {
      title: 'Conversion Rate',
      value: `${revenueData.conversionRate}%`,
      subtext: 'Trial to paid',
      icon: <CreditCard className="h-6 w-6 text-green-600" />
    },
    {
      title: 'ARPU',
      value: `$${revenueData.avgRevenuePerUser}`,
      subtext: 'Avg revenue per user',
      icon: <DollarSign className="h-6 w-6 text-purple-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">Revenue Command Center</h1>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm font-medium text-gray-600">
                {isLive ? 'Live Data' : 'Offline'}
              </span>
            </div>
          </div>
          <p className="text-xl text-gray-600">
            Real-time financial performance for Te Ao Mārama Educational Platform
          </p>
        </div>

        {/* Revenue Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {revenueCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${card.color}`}>
                  {card.icon}
                </div>
                <div className="flex items-center text-green-600 text-sm font-medium">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  {card.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{card.value}</h3>
              <p className="text-gray-600">{card.title}</p>
            </div>
          ))}
        </div>

        {/* KPI Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {kpiCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center mb-4">
                {card.icon}
                <h3 className="text-lg font-semibold text-gray-900 ml-3">{card.title}</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{card.value}</div>
              <p className="text-gray-600">{card.subtext}</p>
            </div>
          ))}
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Breakdown by Plan</h2>
          
          <div className="space-y-4">
            {[
              { plan: 'Professional ($45/month)', percentage: 73, revenue: '$34,930' },
              { plan: 'Enterprise ($99/month)', percentage: 19, revenue: '$9,090' },
              { plan: 'Basic ($15/month)', percentage: 8, revenue: '$3,830' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{item.plan}</span>
                    <span className="text-lg font-bold text-gray-900">{item.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-600">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Projections */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Growth Projections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$75K</div>
              <div className="text-blue-200">Next Month Target</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">$500K</div>
              <div className="text-blue-200">Annual Projection</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">2,500</div>
              <div className="text-blue-200">Target Subscribers</div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xl text-blue-100">
              On track to become New Zealand's leading educational platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeRevenueDashboard;