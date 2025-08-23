import {
  enhanceContent,
  generateHope,
  initializeSuperintelligence,
  measureHumanSuccess,
} from './superintelligence';

// Test the superintelligence system
export function testSuperintelligence() {
  console.log('🧠 Testing Superintelligence System...');

  // Initialize the system
  const config = initializeSuperintelligence({
    enabled: true,
    debug: true,
    heartbeatMs: 30000, // 30 seconds for testing
    name: 'Mihara Test System',
    brainArchitecture: true,
    graphRag: true,
    overseerCouncil: true,
  });

  console.log('✅ Superintelligence initialized:', config);

  // Test human success measurement
  const successMetrics = measureHumanSuccess();
  console.log('📊 Human Success Metrics:', successMetrics);

  // Test hope generation
  const hopeMessage = generateHope();
  console.log('🌟 Hope Generation:', hopeMessage);

  // Test content enhancement
  const enhancedContent = enhanceContent('test-content-123');
  console.log('✨ Content Enhancement:', enhancedContent);

  // Test global object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globalObj = window as any;
  if (globalObj.Superintelligence) {
    console.log('🌐 Global Superintelligence Object:', {
      name: globalObj.Superintelligence.name,
      version: globalObj.Superintelligence.version,
      enabled: globalObj.Superintelligence.enabled,
    });
  }

  return {
    config,
    successMetrics,
    hopeMessage,
    enhancedContent,
    globalObject: globalObj.Superintelligence ? 'Available' : 'Not Available',
  };
}

// Auto-run test if this file is imported
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  setTimeout(() => {
    testSuperintelligence();
  }, 1000);
}
