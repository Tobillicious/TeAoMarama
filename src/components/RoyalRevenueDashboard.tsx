import {
  Award,
  BarChart3,
  CreditCard,
  Crown,
  DollarSign,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

interface RevenueMetrics {
  monthlyRevenue: number;
  annualRevenue: number;
  activeSubscribers: number;
  conversionRate: number;
  averageRevenuePerUser: number;
  churnRate: number;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  subscribers: number;
  revenue: number;
  growth: number;
}

const RoyalRevenueDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<RevenueMetrics>({
    monthlyRevenue: 15450,
    annualRevenue: 154500,
    activeSubscribers: 350,
    conversionRate: 12.5,
    averageRevenuePerUser: 44.14,
    churnRate: 3.2,
  });

  const [plans] = useState<SubscriptionPlan[]>([
    {
      id: 'basic',
      name: 'Kaiako Basic',
      price: 15,
      subscribers: 100,
      revenue: 1500,
      growth: 15.2,
    },
    {
      id: 'professional',
      name: 'Kaiako Professional',
      price: 45,
      subscribers: 200,
      revenue: 9000,
      growth: 28.7,
    },
    {
      id: 'enterprise',
      name: 'Kaiako Enterprise',
      price: 99,
      subscribers: 50,
      revenue: 4950,
      growth: 42.1,
    },
  ]);

  const [recentTransactions] = useState([
    { id: 1, teacher: 'Sarah Mitchell', plan: 'Professional', amount: 45, date: '2025-09-15' },
    { id: 2, teacher: 'James Wilson', plan: 'Basic', amount: 15, date: '2025-09-15' },
    { id: 3, school: 'Auckland Grammar', plan: 'Enterprise', amount: 99, date: '2025-09-14' },
    { id: 4, teacher: 'Emma Thompson', plan: 'Professional', amount: 45, date: '2025-09-14' },
    { id: 5, teacher: 'Michael Chen', plan: 'Basic', amount: 15, date: '2025-09-13' },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Royal Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-12 w-12 text-yellow-400 mr-4" />
            <h1 className="text-4xl font-bold text-white">Royal Revenue Dashboard</h1>
          </div>
          <p className="text-xl text-blue-200">Kingdom Financial Status - Central Bank Report</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Monthly Revenue</p>
                <p className="text-3xl font-bold text-white">
                  ${metrics.monthlyRevenue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-green-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm">+23.5% from last month</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Active Subscribers</p>
                <p className="text-3xl font-bold text-white">{metrics.activeSubscribers}</p>
              </div>
              <Users className="h-12 w-12 text-blue-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm">+18 new this week</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Conversion Rate</p>
                <p className="text-3xl font-bold text-white">{metrics.conversionRate}%</p>
              </div>
              <Target className="h-12 w-12 text-purple-400" />
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-400 text-sm">+2.1% improvement</span>
            </div>
          </div>
        </div>

        {/* Subscription Plans Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-blue-400" />
              Plan Performance
            </h3>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div>
                    <h4 className="font-semibold text-white">{plan.name}</h4>
                    <p className="text-blue-200 text-sm">${plan.price}/month</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">{plan.subscribers} subscribers</p>
                    <p className="text-green-400 text-sm">${plan.revenue.toLocaleString()}/month</p>
                    <p className="text-green-400 text-xs">+{plan.growth}% growth</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-green-400" />
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <p className="text-white font-medium">
                      {transaction.teacher || transaction.school}
                    </p>
                    <p className="text-blue-200 text-sm">{transaction.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-semibold">${transaction.amount}</p>
                    <p className="text-blue-200 text-xs">{transaction.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Optimization Actions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-yellow-400" />
            Revenue Optimization Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg border border-green-400/30">
              <Award className="h-8 w-8 text-green-400 mb-2" />
              <h4 className="font-semibold text-white mb-1">Free Trial</h4>
              <p className="text-green-200 text-sm">14-day trial to increase conversions</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg border border-blue-400/30">
              <Users className="h-8 w-8 text-blue-400 mb-2" />
              <h4 className="font-semibold text-white mb-1">Referral Program</h4>
              <p className="text-blue-200 text-sm">$50 credit for teacher referrals</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-400/30">
              <Star className="h-8 w-8 text-purple-400 mb-2" />
              <h4 className="font-semibold text-white mb-1">Annual Discount</h4>
              <p className="text-purple-200 text-sm">20% off annual subscriptions</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg border border-yellow-400/30">
              <Target className="h-8 w-8 text-yellow-400 mb-2" />
              <h4 className="font-semibold text-white mb-1">Bulk Pricing</h4>
              <p className="text-yellow-200 text-sm">Volume discounts for schools</p>
            </div>
          </div>
        </div>

        {/* Kingdom Status */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
            <Crown className="h-6 w-6 text-white mr-2" />
            <span className="text-white font-bold text-lg">
              Kingdom Revenue System: OPERATIONAL
            </span>
          </div>
          <p className="text-blue-200 mt-2">
            Ready to serve the Central Bank's financial interests
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoyalRevenueDashboard;
