import { AlertTriangle, ArrowUp, BarChart3, CheckCircle, FileText, Globe } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { ContentAuditResult } from '../utils/platform-audit-engine';
import { auditPlatformContent, generateAuditReport } from '../utils/platform-audit-engine';

const PlatformAuditDashboard: React.FC = () => {
  const [auditResult, setAuditResult] = useState<ContentAuditResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showFullReport, setShowFullReport] = useState(false);

  const runAudit = async () => {
    setLoading(true);
    try {
      const result = await auditPlatformContent();
      setAuditResult(result);
      console.log('🎯 Audit completed:', result);
    } catch (error) {
      console.error('❌ Audit failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runAudit();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f8fafc',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px',
            }}
          ></div>
          <h2 style={{ color: '#1f2937', marginBottom: '8px' }}>🔍 Auditing Platform Content</h2>
          <p style={{ color: '#6b7280' }}>
            Analyzing educational resources for quality and cultural authenticity...
          </p>
        </div>
      </div>
    );
  }

  if (!auditResult) return <div>Failed to load audit results</div>;

  const readyResources = auditResult.contentReadiness.ready + auditResult.contentReadiness.exemplar;
  const readinessPercent = Math.round((readyResources / auditResult.fileCount) * 100);
  const culturallyIntegrated =
    auditResult.culturalIntegration.integrated + auditResult.culturalIntegration.authentic;
  const culturalPercent = Math.round((culturallyIntegrated / auditResult.fileCount) * 100);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)',
          color: 'white',
          padding: '24px 0',
          boxShadow: '0 4px 20px rgba(220, 38, 38, 0.15)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          <h1 style={{ fontSize: '2.25rem', fontWeight: '700', margin: '0 0 8px 0' }}>
            📊 Platform Content Audit
          </h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, margin: '0' }}>
            TeAoMarama Educational Resource Quality Analysis
          </p>
        </div>
      </header>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        {/* Critical Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
            >
              <CheckCircle className="w-8 h-8" style={{ color: '#16a34a' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0' }}>
                Production Ready
              </h3>
            </div>
            <div
              style={{ fontSize: '3rem', fontWeight: '700', color: '#16a34a', marginBottom: '8px' }}
            >
              {readinessPercent}%
            </div>
            <p style={{ color: '#6b7280', margin: '0' }}>
              {readyResources} of {auditResult.fileCount} resources classroom-ready
            </p>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
            >
              <Globe className="w-8 h-8" style={{ color: '#059669' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0' }}>
                Cultural Integration
              </h3>
            </div>
            <div
              style={{ fontSize: '3rem', fontWeight: '700', color: '#059669', marginBottom: '8px' }}
            >
              {culturalPercent}%
            </div>
            <p style={{ color: '#6b7280', margin: '0' }}>
              {culturallyIntegrated} resources with authentic Māori perspectives
            </p>
          </div>

          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
            }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}
            >
              <AlertTriangle className="w-8 h-8" style={{ color: '#dc2626' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', margin: '0' }}>Issues Found</h3>
            </div>
            <div
              style={{ fontSize: '3rem', fontWeight: '700', color: '#dc2626', marginBottom: '8px' }}
            >
              {auditResult.technicalIssues.length}
            </div>
            <p style={{ color: '#6b7280', margin: '0' }}>
              Technical and content quality issues identified
            </p>
          </div>
        </div>

        {/* Quality Breakdown */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb',
          }}
        >
          <h2
            style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <BarChart3 className="w-6 h-6" style={{ color: '#3b82f6' }} />
            Content Quality Distribution
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#dc2626',
                  marginBottom: '4px',
                }}
              >
                {auditResult.qualityDistribution.skeleton}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#991b1b',
                  marginBottom: '2px',
                }}
              >
                SKELETON TEMPLATES
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Basic templates with placeholders
              </div>
            </div>

            <div
              style={{
                background: '#fffbeb',
                border: '1px solid #fed7aa',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#d97706',
                  marginBottom: '4px',
                }}
              >
                {auditResult.qualityDistribution.template}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '2px',
                }}
              >
                TEMPLATE RESOURCES
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Some content, needs development
              </div>
            </div>

            <div
              style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#16a34a',
                  marginBottom: '4px',
                }}
              >
                {auditResult.qualityDistribution.enhanced}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#15803d',
                  marginBottom: '2px',
                }}
              >
                ENHANCED CONTENT
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Good content, nearly ready
              </div>
            </div>

            <div
              style={{
                background: '#eff6ff',
                border: '1px solid #93c5fd',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: '#2563eb',
                  marginBottom: '4px',
                }}
              >
                {auditResult.qualityDistribution.complete}
              </div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1d4ed8',
                  marginBottom: '2px',
                }}
              >
                COMPLETE LESSONS
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Production-ready resources
              </div>
            </div>
          </div>
        </div>

        {/* Technical Issues */}
        {auditResult.technicalIssues.length > 0 && (
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid #fed7d7',
            }}
          >
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertTriangle className="w-5 h-5" />
              Critical Issues Detected
            </h3>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              {auditResult.technicalIssues.map((issue, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: '8px',
                    color: '#991b1b',
                    fontSize: '0.875rem',
                  }}
                >
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            border: '1px solid #d1fae5',
          }}
        >
          <h3
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#059669',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <ArrowUp className="w-5 h-5" />
            Recommended Actions
          </h3>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            {auditResult.recommendations.map((rec, index) => (
              <li
                key={index}
                style={{
                  marginBottom: '12px',
                  color: '#065f46',
                  fontSize: '0.875rem',
                  lineHeight: '1.5',
                }}
              >
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '32px',
          }}
        >
          <button
            onClick={runAudit}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #1e40af)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <BarChart3 className="w-4 h-4" />
            Re-run Audit
          </button>

          <button
            onClick={() => setShowFullReport(!showFullReport)}
            style={{
              background: 'white',
              color: '#374151',
              border: '1px solid #d1d5db',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <FileText className="w-4 h-4" />
            {showFullReport ? 'Hide' : 'Show'} Full Report
          </button>
        </div>

        {/* Full Report */}
        {showFullReport && (
          <div
            style={{
              background: '#1f2937',
              color: '#f9fafb',
              borderRadius: '8px',
              padding: '24px',
              marginTop: '24px',
              fontFamily: 'Monaco, Consolas, monospace',
              fontSize: '0.75rem',
              lineHeight: '1.6',
            }}
          >
            <pre style={{ margin: '0', whiteSpace: 'pre-wrap' }}>
              {generateAuditReport(auditResult)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformAuditDashboard;
