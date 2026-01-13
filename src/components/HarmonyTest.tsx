import React from 'react';
import { CoordinationMessage, CursorNode, harmonyCoordinator } from '../utils/harmony-coordinator';

const HarmonyTest: React.FC = () => {
  const testMessage: CoordinationMessage = {
    id: 'test-1',
    from: 'test',
    to: ['test'],
    type: 'harmony-check',
    content: 'Test message',
    priority: 'medium',
    timestamp: new Date(),
    requiresResponse: false,
  };

  const status = harmonyCoordinator.getHarmonyStatus();

  return (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <h2>Harmony Coordination Test</h2>
      <p>✅ CoordinationMessage import: Working</p>
      <p>✅ CursorNode import: Working</p>
      <p>✅ harmonyCoordinator import: Working</p>
      <p>Harmony Level: {status.harmonyLevel}%</p>
      <p>Active Nodes: {status.activeNodes}</p>
      <p>Test Message ID: {testMessage.id}</p>
    </div>
  );
};

export default HarmonyTest;
