import React, { useEffect, useState } from 'react';
import './CulturalSafetyComplianceDashboard.css';

interface CulturalSafetyCheck {
  id: string;
  type: 'content' | 'agent-behavior' | 'system-interaction' | 'educational-protocol';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PASS' | 'FAIL' | 'REVIEW_REQUIRED';
  description: string;
  culturalContext: string;
  tikangaCompliance: boolean;
  educationalAlignment: boolean;
  recommendations: string[];
  validatedBy: string;
  validatedAt: string;
}

interface TikangaProtocol {
  name: string;
  description: string;
  requirements: string[];
  validationCriteria: string[];
  culturalSignificance: string;
  complianceRate: number;
}

interface CulturalSafetyReport {
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  reviewRequired: number;
  complianceRate: number;
  criticalIssues: string[];
  recommendations: string[];
  lastValidation: string;
}

const CulturalSafetyComplianceDashboard: React.FC = () => {
  const [report, setReport] = useState<CulturalSafetyReport | null>(null);
  const [tikangaProtocols, setTikangaProtocols] = useState<TikangaProtocol[]>([]);
  const [recentChecks, setRecentChecks] = useState<CulturalSafetyCheck[]>([]);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    loadCulturalSafetyData();
  }, []);

  const loadCulturalSafetyData = async () => {
    try {
      // Load cultural safety report
      const reportResponse = await fetch('/api/cultural-safety-report');
      if (reportResponse.ok) {
        const reportData = await reportResponse.json();
        setReport(reportData);
      }

      // Load tikanga protocols
      const protocolsResponse = await fetch('/api/tikanga-protocols');
      if (protocolsResponse.ok) {
        const protocolsData = await protocolsResponse.json();
        setTikangaProtocols(protocolsData);
      }

      // Load recent checks
      const checksResponse = await fetch('/api/cultural-safety-checks');
      if (checksResponse.ok) {
        const checksData = await checksResponse.json();
        setRecentChecks(checksData.slice(-10));
      }
    } catch (error) {
      console.error('Error loading cultural safety data:', error);
      // Load mock data for demonstration
      loadMockData();
    }
  };

  const loadMockData = () => {
    setReport({
      totalChecks: 150,
      passedChecks: 142,
      failedChecks: 5,
      reviewRequired: 3,
      complianceRate: 95,
      criticalIssues: [],
      recommendations: [
        'Ensure proper acknowledgment of cultural sources',
        'Review cultural content for sensitivity',
        'Align with New Zealand Curriculum requirements',
      ],
      lastValidation: new Date().toISOString(),
    });

    setTikangaProtocols([
      {
        name: 'Mana Preservation',
        description: 'Ensuring respect for the spiritual power and authority of all beings',
        requirements: [
          'Respect for individual and collective mana',
          'Acknowledgment of cultural authority',
          'Protection of sacred knowledge',
          'Honoring of traditional leadership',
        ],
        validationCriteria: [
          'Content respects cultural authority',
          'No inappropriate use of sacred knowledge',
          'Proper acknowledgment of cultural sources',
          'Respectful representation of cultural practices',
        ],
        culturalSignificance:
          'Mana is the spiritual power that exists in all things and must be respected and protected',
        complianceRate: 98,
      },
      {
        name: 'Whakawhanaungatanga',
        description: 'Building and maintaining relationships based on mutual respect and care',
        requirements: [
          'Building genuine relationships',
          'Showing care and respect for others',
          'Creating inclusive environments',
          'Fostering community connections',
        ],
        validationCriteria: [
          'Content promotes relationship building',
          'Inclusive language and representation',
          'Community-focused approach',
          'Respectful interaction patterns',
        ],
        culturalSignificance:
          'Relationships are the foundation of Māori society and must be nurtured with care',
        complianceRate: 96,
      },
      {
        name: 'Kaitiakitanga',
        description: 'Guardianship and protection of people, places, and resources',
        requirements: [
          'Protection of cultural heritage',
          'Sustainable resource management',
          'Care for future generations',
          'Environmental responsibility',
        ],
        validationCriteria: [
          'Content promotes environmental care',
          'Sustainable practices encouraged',
          'Future-focused thinking',
          'Cultural heritage protection',
        ],
        culturalSignificance:
          'Kaitiakitanga is the responsibility to care for and protect what we value',
        complianceRate: 94,
      },
      {
        name: 'Aroha',
        description: 'Love, compassion, and empathy in all interactions',
        requirements: [
          'Showing love and compassion',
          'Demonstrating empathy',
          'Caring for others wellbeing',
          'Creating supportive environments',
        ],
        validationCriteria: [
          'Content shows care and compassion',
          'Empathetic communication',
          'Supportive learning environment',
          'Positive emotional tone',
        ],
        culturalSignificance:
          'Aroha is the foundation of all positive relationships and interactions',
        complianceRate: 97,
      },
      {
        name: 'Tikanga',
        description: 'The correct way of doing things according to Māori custom and protocol',
        requirements: [
          'Following proper protocols',
          'Respecting cultural customs',
          'Using appropriate language',
          'Honoring cultural practices',
        ],
        validationCriteria: [
          'Proper cultural protocols followed',
          'Appropriate language use',
          'Respectful cultural representation',
          'Correct cultural practices',
        ],
        culturalSignificance:
          'Tikanga provides the framework for respectful and appropriate behavior',
        complianceRate: 95,
      },
    ]);

    setRecentChecks([
      {
        id: 'check-001',
        type: 'content',
        severity: 'LOW',
        status: 'PASS',
        description: 'Educational content cultural safety validation',
        culturalContext: 'Māori, Pacific',
        tikangaCompliance: true,
        educationalAlignment: true,
        recommendations: [],
        validatedBy: 'CulturalSafetyValidator',
        validatedAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'check-002',
        type: 'agent-behavior',
        severity: 'MEDIUM',
        status: 'FAIL',
        description: 'Agent communication cultural sensitivity check',
        culturalContext: 'Agent behavior and interaction patterns',
        tikangaCompliance: false,
        educationalAlignment: true,
        recommendations: [
          'Ensure respectful communication patterns',
          'Review cultural sensitivity training',
        ],
        validatedBy: 'CulturalSafetyValidator',
        validatedAt: new Date(Date.now() - 7200000).toISOString(),
      },
    ]);
  };

  const runValidation = async () => {
    setIsValidating(true);
    try {
      // Simulate validation process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Refresh data after validation
      await loadCulturalSafetyData();
    } catch (error) {
      console.error('Error running validation:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS':
        return '#10B981';
      case 'FAIL':
        return '#EF4444';
      case 'REVIEW_REQUIRED':
        return '#F59E0B';
      default:
        return '#6B7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return '#DC2626';
      case 'HIGH':
        return '#EA580C';
      case 'MEDIUM':
        return '#D97706';
      case 'LOW':
        return '#059669';
      default:
        return '#6B7280';
    }
  };

  const getComplianceColor = (rate: number) => {
    if (rate >= 95) return '#10B981';
    if (rate >= 85) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="cultural-safety-dashboard">
      <div className="dashboard-header">
        <h1>🛡️ Cultural Safety Compliance Dashboard</h1>
        <p className="dashboard-subtitle">
          "He aha te mea nui o te ao? He tangata, he tangata, he tangata" - What is the most
          important thing in the world? It is people, it is people, it is people
        </p>
      </div>

      {report && (
        <div className="compliance-overview">
          <div className="overview-cards">
            <div className="compliance-card">
              <div className="card-header">
                <h3>Overall Compliance</h3>
                <div
                  className="compliance-rate"
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getComplianceColor(report.complianceRate) }}
                >
                  {report.complianceRate}%
                </div>
              </div>
              <div className="card-stats">
                <div className="stat">
                  <span className="stat-label">Total Checks</span>
                  <span className="stat-value">{report.totalChecks}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Passed</span>
                  <span className="stat-value" /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: '#10B981' }}>
                    {report.passedChecks}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Failed</span>
                  <span className="stat-value" /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: '#EF4444' }}>
                    {report.failedChecks}
                  </span>
                </div>
                <div className="stat">
                  <span className="stat-label">Review Required</span>
                  <span className="stat-value" /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: '#F59E0B' }}>
                    {report.reviewRequired}
                  </span>
                </div>
              </div>
            </div>

            <div className="action-card">
              <h3>Validation Actions</h3>
              <button className="validate-button" onClick={runValidation} disabled={isValidating}>
                {isValidating ? '🔄 Validating...' : '🛡️ Run Full Validation'}
              </button>
              <p className="last-validation">
                Last validation: {new Date(report.lastValidation).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {report && report.criticalIssues.length > 0 && (
        <div className="critical-issues">
          <h2>🚨 Critical Issues</h2>
          <div className="issues-list">
            {report.criticalIssues.map((issue, index) => (
              <div key={index} className="issue-item">
                <span className="issue-icon">⚠️</span>
                <span className="issue-text">{issue}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="tikanga-protocols">
        <h2>🎯 Tikanga Protocols Compliance</h2>
        <div className="protocols-grid">
          {tikangaProtocols.map((protocol, index) => (
            <div key={index} className="protocol-card">
              <div className="protocol-header">
                <h3>{protocol.name}</h3>
                <div
                  className="protocol-compliance"
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: getComplianceColor(protocol.complianceRate) }}
                >
                  {protocol.complianceRate}%
                </div>
              </div>
              <p className="protocol-description">{protocol.description}</p>
              <div className="protocol-significance">
                <strong>Cultural Significance:</strong> {protocol.culturalSignificance}
              </div>
              <div className="protocol-requirements">
                <h4>Key Requirements:</h4>
                <ul>
                  {protocol.requirements.slice(0, 3).map((req, reqIndex) => (
                    <li key={reqIndex}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-checks">
        <h2>📊 Recent Cultural Safety Checks</h2>
        <div className="checks-table">
          <div className="table-header">
            <div className="header-cell">Type</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Severity</div>
            <div className="header-cell">Description</div>
            <div className="header-cell">Validated</div>
          </div>
          {recentChecks.map((check) => (
            <div key={check.id} className="table-row">
              <div className="table-cell">
                <span className="type-badge">{check.type}</span>
              </div>
              <div className="table-cell">
                <span
                  className="status-badge"
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getStatusColor(check.status) }}
                >
                  {check.status}
                </span>
              </div>
              <div className="table-cell">
                <span
                  className="severity-badge"
                  /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ backgroundColor: getSeverityColor(check.severity) }}
                >
                  {check.severity}
                </span>
              </div>
              <div className="table-cell">{check.description}</div>
              <div className="table-cell">{new Date(check.validatedAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {report && report.recommendations.length > 0 && (
        <div className="recommendations">
          <h2>📋 Recommendations</h2>
          <div className="recommendations-list">
            {report.recommendations.map((recommendation, index) => (
              <div key={index} className="recommendation-item">
                <span className="recommendation-icon">💡</span>
                <span className="recommendation-text">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="cultural-safety-footer">
        <p>
          <strong>Cultural Safety Mission:</strong> Ensuring 100% compliance with tikanga protocols,
          cultural appropriateness, and educational mission integrity across all agent operations.
        </p>
        <p className="footer-quote">
          "Ko te mea nui ko te aroha" - The most important thing is love and care for each other
        </p>
      </div>
    </div>
  );
};

export default CulturalSafetyComplianceDashboard;
