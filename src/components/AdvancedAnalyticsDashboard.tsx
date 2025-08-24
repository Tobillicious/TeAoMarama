import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './AdvancedAnalyticsDashboard.css';

interface AnalyticsData {
  learningProgress: Array<{
    subject: string;
    progress: number;
    engagement: number;
    culturalRelevance: number;
  }>;
  studentPerformance: Array<{
    month: string;
    achievement: number;
    participation: number;
    culturalIntegration: number;
  }>;
  resourceUsage: Array<{
    type: string;
    usage: number;
    culturalContent: number;
  }>;
  culturalMetrics: {
    teReoMāoriEngagement: number;
    tikangaIntegration: number;
    kaitiakiApproval: number;
    culturalSafety: number;
  };
}

const AdvancedAnalyticsDashboard: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedSubject, setSelectedSubject] = useState('all');

  useEffect(() => {
    // Simulate real-time analytics data
    const generateAnalyticsData = (): AnalyticsData => {
      return {
        learningProgress: [
          { subject: 'Mathematics', progress: 87, engagement: 92, culturalRelevance: 78 },
          { subject: 'Science', progress: 91, engagement: 88, culturalRelevance: 85 },
          { subject: 'Social Studies', progress: 94, engagement: 96, culturalRelevance: 98 },
          { subject: 'Te Reo Māori', progress: 89, engagement: 95, culturalRelevance: 100 },
          { subject: 'English', progress: 85, engagement: 83, culturalRelevance: 72 },
          { subject: 'Arts', progress: 93, engagement: 97, culturalRelevance: 89 }
        ],
        studentPerformance: [
          { month: 'Jan', achievement: 78, participation: 82, culturalIntegration: 75 },
          { month: 'Feb', achievement: 83, participation: 85, culturalIntegration: 80 },
          { month: 'Mar', achievement: 87, participation: 89, culturalIntegration: 84 },
          { month: 'Apr', achievement: 91, participation: 93, culturalIntegration: 88 },
          { month: 'May', achievement: 89, participation: 91, culturalIntegration: 90 },
          { month: 'Jun', achievement: 94, participation: 96, culturalIntegration: 93 }
        ],
        resourceUsage: [
          { type: 'Lessons', usage: 2341, culturalContent: 1876 },
          { type: 'Assessments', usage: 892, culturalContent: 634 },
          { type: 'Activities', usage: 1567, culturalContent: 1234 },
          { type: 'Unit Plans', usage: 432, culturalContent: 389 },
          { type: 'Videos', usage: 789, culturalContent: 567 },
          { type: 'Whakataukī', usage: 234, culturalContent: 234 }
        ],
        culturalMetrics: {
          teReoMāoriEngagement: 92,
          tikangaIntegration: 87,
          kaitiakiApproval: 95,
          culturalSafety: 98
        }
      };
    };

    setAnalyticsData(generateAnalyticsData());
    
    // Update data every 30 seconds to simulate real-time
    const interval = setInterval(() => {
      setAnalyticsData(generateAnalyticsData());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!analyticsData) {
    return (
      <div className="analytics-loading">
        <div className="loading-spinner"></div>
        <p>Loading advanced learning analytics...</p>
      </div>
    );
  }

  const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#d1fae5'];

  return (
    <div className="advanced-analytics-dashboard">
      <div className="analytics-header">
        <h1>🎓 Advanced Learning Analytics Dashboard</h1>
        <p className="analytics-subtitle">
          AI-Powered insights for Te Kura o TeAoMarama
        </p>
        
        <div className="analytics-controls">
          <select 
            value={selectedTimeframe} 
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="control-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="term">This Term</option>
            <option value="year">This Year</option>
          </select>
          
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="control-select"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="science">Science</option>
            <option value="social-studies">Social Studies</option>
            <option value="te-reo-maori">Te Reo Māori</option>
            <option value="english">English</option>
            <option value="arts">Arts</option>
          </select>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Cultural Metrics Overview */}
        <div className="analytics-card cultural-metrics-card">
          <h3>🌿 Cultural Integration Metrics</h3>
          <div className="cultural-metrics-grid">
            <div className="metric-item">
              <div className="metric-value">{analyticsData.culturalMetrics.teReoMāoriEngagement}%</div>
              <div className="metric-label">Te Reo Māori Engagement</div>
              <div className="metric-progress">
                <div 
                  className="metric-progress-bar te-reo"
                  style={{ width: `${analyticsData.culturalMetrics.teReoMāoriEngagement}%` }}
                ></div>
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-value">{analyticsData.culturalMetrics.tikangaIntegration}%</div>
              <div className="metric-label">Tikanga Integration</div>
              <div className="metric-progress">
                <div 
                  className="metric-progress-bar tikanga"
                  style={{ width: `${analyticsData.culturalMetrics.tikangaIntegration}%` }}
                ></div>
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-value">{analyticsData.culturalMetrics.kaitiakiApproval}%</div>
              <div className="metric-label">Kaitiaki Approval</div>
              <div className="metric-progress">
                <div 
                  className="metric-progress-bar kaitiaki"
                  style={{ width: `${analyticsData.culturalMetrics.kaitiakiApproval}%` }}
                ></div>
              </div>
            </div>
            
            <div className="metric-item">
              <div className="metric-value">{analyticsData.culturalMetrics.culturalSafety}%</div>
              <div className="metric-label">Cultural Safety</div>
              <div className="metric-progress">
                <div 
                  className="metric-progress-bar cultural-safety"
                  style={{ width: `${analyticsData.culturalMetrics.culturalSafety}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Progress Chart */}
        <div className="analytics-card chart-card">
          <h3>📊 Learning Progress by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.learningProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="progress" fill="#059669" name="Progress" />
              <Bar dataKey="engagement" fill="#10b981" name="Engagement" />
              <Bar dataKey="culturalRelevance" fill="#34d399" name="Cultural Relevance" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Student Performance Trends */}
        <div className="analytics-card chart-card">
          <h3>📈 Student Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.studentPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="achievement" stroke="#059669" strokeWidth={3} name="Achievement" />
              <Line type="monotone" dataKey="participation" stroke="#10b981" strokeWidth={3} name="Participation" />
              <Line type="monotone" dataKey="culturalIntegration" stroke="#34d399" strokeWidth={3} name="Cultural Integration" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resource Usage Distribution */}
        <div className="analytics-card chart-card">
          <h3>📚 Resource Usage Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.resourceUsage}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="usage"
              >
                {analyticsData.resourceUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI-Powered Insights */}
        <div className="analytics-card insights-card">
          <h3>🤖 AI-Powered Educational Insights</h3>
          <div className="insights-list">
            <div className="insight-item high-impact">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <h4>High Impact Opportunity</h4>
                <p>Te Reo Māori resources show 95% engagement. Consider expanding bilingual content across all subjects.</p>
              </div>
            </div>
            
            <div className="insight-item positive-trend">
              <div className="insight-icon">📈</div>
              <div className="insight-content">
                <h4>Positive Trend Detected</h4>
                <p>Cultural integration scores have increased 18% over the past 3 months, indicating strong tikanga adoption.</p>
              </div>
            </div>
            
            <div className="insight-item recommendation">
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h4>AI Recommendation</h4>
                <p>Mathematics engagement could benefit from more whakataukī integration and real-world Māori context examples.</p>
              </div>
            </div>
            
            <div className="insight-item cultural-highlight">
              <div className="insight-icon">🌿</div>
              <div className="insight-content">
                <h4>Cultural Excellence</h4>
                <p>All content maintains 98% cultural safety rating with active kaitiaki oversight across 5,439 resources.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="analytics-card activity-feed-card">
          <h3>⚡ Real-time Learning Activity</h3>
          <div className="activity-feed">
            <div className="activity-item">
              <span className="activity-time">2 minutes ago</span>
              <span className="activity-text">25 students accessed Te Reo Māori pronunciation guides</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">5 minutes ago</span>
              <span className="activity-text">New whakataukī added to Mathematics unit plan</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">8 minutes ago</span>
              <span className="activity-text">Cultural safety validation completed for Science resources</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">12 minutes ago</span>
              <span className="activity-text">Kaitiaki approved new Social Studies assessment</span>
            </div>
            <div className="activity-item">
              <span className="activity-time">15 minutes ago</span>
              <span className="activity-text">AI generated 3 new culturally responsive lesson plans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="analytics-actions">
        <button className="action-button primary">Generate Detailed Report</button>
        <button className="action-button secondary">Export Analytics Data</button>
        <button className="action-button cultural">Cultural Impact Assessment</button>
        <button className="action-button ai">AI Optimization Suggestions</button>
      </div>
    </div>
  );
};

export default AdvancedAnalyticsDashboard;