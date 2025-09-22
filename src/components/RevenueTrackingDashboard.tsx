import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  School,
  Crown,
  Sparkles
} from 'lucide-react';

interface RevenueMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  yearlyRevenue: number;
  activeSubscriptions: number;
  churnRate: number;
  avgRevenuePerUser: number;
  conversionRate: number;
  ltv: number;
}

interface SubscriptionBreakdown {
  plan: string;
  subscribers: number;
  revenue: number;
  growth: number;
  color: string;
}

const RevenueTrackingDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [metrics, setMetrics] = useState<RevenueMetrics>({
    totalRevenue: 287450,
    monthlyRevenue: 42300,
    yearlyRevenue: 287450,
    activeSubscriptions: 1247,
    churnRate: 2.3,
    avgRevenuePerUser: 34.50,
    conversionRate: 12.4,
    ltv: 450.80
  });

  const subscriptionBreakdown: SubscriptionBreakdown[] = [
    {
      plan: 'Kaiako Standard',
      subscribers: 850,
      revenue: 25500,
      growth: 8.5,
      color: '#10b981'
    },
    {
      plan: 'Kaiako Premium',
      subscribers: 287,
      revenue: 14350,
      growth: 15.2,
      color: '#3b82f6'
    },
    {
      plan: 'School District',
      subscribers: 85,
      revenue: 12750,
      growth: 22.1,
      color: '#8b5cf6'
    },
    {
      plan: 'Enterprise',
      subscribers: 25,
      revenue: 15000,
      growth: 35.8,
      color: '#f59e0b'
    }
  ];

  const monthlyGrowth = [
    { month: 'Jan', revenue: 18500, subscriptions: 890 },
    { month: 'Feb', revenue: 22300, subscriptions: 945 },
    { month: 'Mar', revenue: 28750, subscriptions: 1020 },
    { month: 'Apr', revenue: 35200, subscriptions: 1150 },
    { month: 'May', revenue: 38900, subscriptions: 1205 },
    { month: 'Jun', revenue: 42300, subscriptions: 1247 }
  ];

  const styles = {
    dashboard: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '24px',
      color: 'white'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      marginBottom: '32px',
      textAlign: 'center' as const
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '8px'
    },
    subtitle: {
      color: '#94a3b8',
      fontSize: '1.1rem'
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    },
    metricCard: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    metricHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    metricTitle: {
      color: '#cbd5e1',
      fontSize: '0.9rem',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em'
    },
    metricValue: {
      fontSize: '2.2rem',
      fontWeight: '800',
      marginBottom: '8px'
    },
    metricChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    chartContainer: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
      marginBottom: '32px'
    },
    chart: {
      background: 'rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(20px)',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    subscriptionList: {
      display: 'grid',
      gap: '16px'
    },
    subscriptionItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '16px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    timeframeButtons: {
      display: 'flex',
      gap: '8px',
      marginBottom: '16px'
    },
    timeframeButton: (active: boolean) => ({
      padding: '8px 16px',
      borderRadius: '8px',
      border: 'none',
      background: active ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '0.9rem'
    })
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Revenue Analytics</h1>
          <p style={styles.subtitle}>
            Te Ao Mārama Revenue Performance Dashboard
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div style={styles.metricsGrid}>
          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Total Revenue</span>
              <DollarSign size={24} style={{ color: '#10b981' }} />
            </div>
            <div style={{ ...styles.metricValue, color: '#10b981' }}>
              {formatCurrency(metrics.totalRevenue)}
            </div>
            <div style={{ ...styles.metricChange, color: '#10b981' }}>
              <ArrowUpRight size={16} />
              {formatPercentage(18.5)} this month
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Monthly Revenue</span>
              <TrendingUp size={24} style={{ color: '#3b82f6' }} />
            </div>
            <div style={{ ...styles.metricValue, color: '#3b82f6' }}>
              {formatCurrency(metrics.monthlyRevenue)}
            </div>
            <div style={{ ...styles.metricChange, color: '#3b82f6' }}>
              <ArrowUpRight size={16} />
              {formatPercentage(12.3)} vs last month
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Active Subscribers</span>
              <Users size={24} style={{ color: '#8b5cf6' }} />
            </div>
            <div style={{ ...styles.metricValue, color: '#8b5cf6' }}>
              {metrics.activeSubscriptions.toLocaleString()}
            </div>
            <div style={{ ...styles.metricChange, color: '#8b5cf6' }}>
              <ArrowUpRight size={16} />
              {formatPercentage(8.2)} growth
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>ARPU</span>
              <Target size={24} style={{ color: '#f59e0b' }} />
            </div>
            <div style={{ ...styles.metricValue, color: '#f59e0b' }}>
              {formatCurrency(metrics.avgRevenuePerUser)}
            </div>
            <div style={{ ...styles.metricChange, color: '#10b981' }}>
              <ArrowUpRight size={16} />
              {formatPercentage(5.7)} improvement
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Conversion Rate</span>
              <CreditCard size={24} style={{ color: '#06b6d4' }} />
            </div>
            <div style={{ ...styles.metricValue, color: '#06b6d4' }}>
              {metrics.conversionRate}%
            </div>
            <div style={{ ...styles.metricChange, color: '#10b981' }}>
              <ArrowUpRight size={16} />
              {formatPercentage(2.1)} this quarter
            </div>
          </div>

          <div style={styles.metricCard}>
            <div style={styles.metricHeader}>
              <span style={styles.metricTitle}>Churn Rate</span>
              <ArrowDownRight size={24} style={{ color: '#ef4444' }} />
            </div>
            <div style={{ ...styles.metricValue, color: '#ef4444' }}>
              {metrics.churnRate}%
            </div>
            <div style={{ ...styles.metricChange, color: '#10b981' }}>
              <ArrowDownRight size={16} />
              {formatPercentage(-0.8)} improvement
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={styles.chartContainer}>
          <div style={styles.chart}>
            <div style={styles.metricHeader}>
              <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '700' }}>
                Revenue Growth Trend
              </h3>
              <div style={styles.timeframeButtons}>
                {(['7d', '30d', '90d', '1y'] as const).map((period) => (
                  <button
                    key={period}
                    style={styles.timeframeButton(timeframe === period)}
                    onClick={() => setTimeframe(period)}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Simplified chart representation */}
            <div style={{
              height: '300px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'end',
                gap: '12px',
                height: '200px'
              }}>
                {monthlyGrowth.map((data, index) => (
                  <div
                    key={data.month}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: `${(data.revenue / 45000) * 180}px`,
                        background: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`,
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <span style={{
                      color: '#94a3b8',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {data.month}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={styles.chart}>
            <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '700', marginBottom: '24px' }}>
              Subscription Breakdown
            </h3>
            <div style={styles.subscriptionList}>
              {subscriptionBreakdown.map((plan) => (
                <div key={plan.plan} style={styles.subscriptionItem}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <div style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: plan.color
                      }} />
                      <span style={{
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.95rem'
                      }}>
                        {plan.plan}
                      </span>
                    </div>
                    <span style={{
                      color: plan.growth > 0 ? '#10b981' : '#ef4444',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>
                      {formatPercentage(plan.growth)}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.9rem',
                    color: '#94a3b8'
                  }}>
                    <span>{plan.subscribers} subscribers</span>
                    <span>{formatCurrency(plan.revenue)}/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Educational Institution Metrics */}
        <div style={{
          ...styles.chart,
          textAlign: 'center'
        }}>
          <h3 style={{ color: 'white', fontSize: '1.4rem', fontWeight: '700', marginBottom: '24px' }}>
            Educational Impact Metrics
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px'
          }}>
            <div>
              <School size={32} style={{ color: '#10b981', marginBottom: '8px' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>
                150
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Schools Served
              </div>
            </div>
            <div>
              <Users size={32} style={{ color: '#3b82f6', marginBottom: '8px' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6' }}>
                25,847
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Students Reached
              </div>
            </div>
            <div>
              <Crown size={32} style={{ color: '#8b5cf6', marginBottom: '8px' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#8b5cf6' }}>
                1,247
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Active Kaiako
              </div>
            </div>
            <div>
              <Sparkles size={32} style={{ color: '#f59e0b', marginBottom: '8px' }} />
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f59e0b' }}>
                96.2%
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTrackingDashboard;