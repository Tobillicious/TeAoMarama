import React, { useState, useEffect } from 'react';
import type { REAL_RESOURCES } from '../utils/resource-indexer';
import { loadResourceContent } from '../utils/resource-indexer';

const ResourceTestPage: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalResources: 0,
    subjects: {} as Record<string, number>,
    yearLevels: {} as Record<string, number>,
    types: {} as Record<string, number>,
    culturalResources: 0
  });

  useEffect(() => {
    // Calculate comprehensive statistics
    const subjects: Record<string, number> = {};
    const yearLevels: Record<string, number> = {};
    const types: Record<string, number> = {};
    let culturalResources = 0;

    REAL_RESOURCES.forEach(resource => {
      subjects[resource.subject] = (subjects[resource.subject] || 0) + 1;
      yearLevels[resource.yearLevel] = (yearLevels[resource.yearLevel] || 0) + 1;
      types[resource.type] = (types[resource.type] || 0) + 1;
      if (resource.culturalElements > 0) culturalResources++;
    });

    setStats({
      totalResources: REAL_RESOURCES.length,
      subjects,
      yearLevels,
      types,
      culturalResources
    });
  }, []);

  const testResourceLoading = async () => {
    setLoading(true);
    setTestResult('Testing resource loading...\n\n');

    try {
      // Test the first few resources
      const testResources = REAL_RESOURCES.slice(0, 3);

      for (const resource of testResources) {
        setTestResult((prev) => prev + `Testing: ${resource.title}\n`);
        setTestResult((prev) => prev + `Path: ${resource.path}\n`);

        try {
          const content = await loadResourceContent(resource);
          setTestResult((prev) => prev + `✅ SUCCESS: Loaded ${content.length} characters\n`);
          setTestResult((prev) => prev + `Preview: ${content.substring(0, 100)}...\n\n`);
        } catch (error) {
          setTestResult(
            (prev) =>
              prev + `❌ ERROR: ${error instanceof Error ? error.message : 'Unknown error'}\n\n`,
          );
        }
      }

      setTestResult((prev) => prev + `\n🎉 Resource loading test completed!`);
    } catch (error) {
      setTestResult(
        (prev) =>
          prev + `\n❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '16px' }}>🚀 Comprehensive Resource Library Test</h1>
      <p /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '32px' }}>Testing our expanded library of {stats.totalResources.toLocaleString()} educational resources!</p>
      
      {/* Stats Grid */}
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
          <h3 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1rem', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>Total Resources</h3>
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2.5rem', fontWeight: '700', color: '#059669' }}>{stats.totalResources.toLocaleString()}</div>
        </div>

        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
          <h3 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1rem', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>Cultural Resources</h3>
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2.5rem', fontWeight: '700', color: '#7c3aed' }}>{stats.culturalResources.toLocaleString()}</div>
        </div>

        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
          <h3 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1rem', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>Subjects</h3>
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2.5rem', fontWeight: '700', color: '#3b82f6' }}>{Object.keys(stats.subjects).length}</div>
        </div>

        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
          <h3 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1rem', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>Resource Types</h3>
          <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '2.5rem', fontWeight: '700', color: '#d97706' }}>{Object.keys(stats.types).length}</div>
        </div>
      </div>
      
      {/* Subject Breakdown */}
      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb', marginBottom: '32px' }}>
        <h2 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0' }}>Resources by Subject</h2>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {Object.entries(stats.subjects).map(([subject, count]) => (
            <div key={subject} /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
              <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>{count.toLocaleString()}</div>
              <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '0.875rem', color: '#6b7280' }}>{subject}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={testResourceLoading}
        disabled={loading}
        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '2rem',
        }}
      >
        {loading ? 'Testing...' : 'Test Resource Loading'}
      </button>

      <div
        /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '1rem',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          minHeight: '400px',
        }}
      >
        {testResult || 'Click the button above to test resource loading...'}
      </div>

      <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ marginTop: '2rem', background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)', border: '1px solid #e5e7eb' }}>
        <h3 /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: '0 0 20px 0' }}>Resource Preview ({REAL_RESOURCES.length.toLocaleString()} total)</h3>
        <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {REAL_RESOURCES.slice(0, 20).map((resource, index) => (
            <div
              key={resource.id}
              /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{
                padding: '0.5rem',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '0.9rem',
              }}
            >
              <strong>{index + 1}.</strong> {resource.title}
              <span /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ color: '#666', marginLeft: '1rem' }}>
                ({resource.subject} - {resource.yearLevel})
              </span>
            </div>
          ))}
          {REAL_RESOURCES.length > 20 && (
            <div /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ /* TODO: Move to external CSS */ style={{ padding: '0.5rem', color: '#666', fontStyle: 'italic' }}>
              ... and {REAL_RESOURCES.length - 20} more resources
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceTestPage;
