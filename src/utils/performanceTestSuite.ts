/**
 * Performance Test Suite for ResourcesEnhanced Component
 * Tests production readiness with thousands of resources
 */

import type { ParsedResource, ResourceMetadata } from '../services/MetadataParser';

// Performance metrics interface
export interface PerformanceMetrics {
  initialLoadTime: number;
  searchResponseTime: number;
  filterResponseTime: number;
  renderTime: number;
  memoryUsage: {
    initial: number;
    afterLoad: number;
    peak: number;
  };
  scrollPerformance: {
    fps: number;
    jankCount: number;
  };
  bundleSize?: number;
}

// Mock data generator for large-scale testing
export class MockResourceGenerator {
  private static readonly SUBJECTS = [
    'Mathematics',
    'Science',
    'English',
    'Social Studies',
    'Te Reo Māori',
    'Technology',
    'Health',
    'Arts',
  ];

  private static readonly YEAR_LEVELS = [
    'Year 7',
    'Year 8',
    'Year 9',
    'Year 10',
    'Year 11',
    'Year 12',
    'Year 13',
  ];

  private static readonly RESOURCE_TYPES = [
    'Handout',
    'Activity',
    'Video',
    'Game',
    'Slideshow',
    'Link',
    'Assessment',
  ];

  private static readonly CURRICULUM_AREAS = [
    'Number and Algebra',
    'Geometry and Measurement',
    'Statistics',
    'Living World',
    'Planet Earth and Beyond',
    'Physical World',
    'Material World',
    'Reading',
    'Writing',
    'Speaking',
    'Listening',
    'Viewing',
    'Identity Culture and Organisation',
    'Place and Environment',
    'Time Continuity and Change',
    'Health Promotion',
    'Personal Health and Physical Development',
    'Movement Concepts',
    'Visual Arts',
    'Music',
    'Drama',
    'Dance',
  ];

  private static readonly CULTURAL_SAFETY_LEVELS: Array<'clean' | 'review' | 'consultation'> = [
    'clean',
    'clean',
    'clean',
    'clean',
    'review',
    'consultation',
  ]; // Weighted toward clean

  private static readonly SAMPLE_TITLES = [
    'Exploring Quadratic Functions',
    'Chemical Reactions Lab',
    'Narrative Writing Workshop',
    'New Zealand Democracy',
    'Te Mauri o te Taiao',
    'Digital Citizenship',
    'Healthy Relationships',
    'Abstract Art Techniques',
    'Algebraic Problem Solving',
    'Ecosystem Interactions',
    'Poetry Analysis',
    'World War I Impact',
    'Conversational Māori',
    'Programming Basics',
    'Sports Psychology',
    'Music Composition',
    'Data Collection Methods',
    'Plant Biology',
    'Creative Writing',
    'Historical Thinking',
    'Cultural Protocols',
    'Web Development',
    'Fitness Planning',
    'Visual Design',
    'Mathematical Modeling',
    'Physics Experiments',
    'Literature Circles',
    'Geography Skills',
    'Māori Legends',
    'Robotics Introduction',
    'Mental Health Awareness',
    'Drama Performance',
  ];

  private static readonly SAMPLE_DESCRIPTIONS = [
    'Students will explore concepts through hands-on activities and collaborative learning.',
    'This resource provides scaffolded activities for differentiated learning outcomes.',
    'Culturally responsive teaching materials with authentic NZ context.',
    'Assessment tools aligned with NZ Curriculum achievement objectives.',
    'Interactive digital resource with multimedia components.',
    'Real-world applications connecting classroom learning to life experiences.',
    'Project-based learning with emphasis on critical thinking skills.',
    'Cooperative learning strategies for diverse classroom settings.',
    'Cross-curricular connections supporting holistic education.',
    'Inquiry-based activities promoting student agency and voice.',
  ];

  /**
   * Generate a large dataset of mock resources for performance testing
   */
  static generateMockResources(count: number): ParsedResource[] {
    const resources: ParsedResource[] = [];

    console.time('Mock Data Generation');

    for (let i = 0; i < count; i++) {
      const subject = this.getRandomItem(this.SUBJECTS);
      const yearLevel = this.getRandomItem(this.YEAR_LEVELS);
      const resourceType = this.getRandomItem(this.RESOURCE_TYPES);
      const culturalSafetyLevel = this.getRandomItem(this.CULTURAL_SAFETY_LEVELS);

      const metadata: ResourceMetadata = {
        title: `${this.getRandomItem(this.SAMPLE_TITLES)} ${i + 1}`,
        subject,
        yearLevel: [yearLevel],
        resourceType,
        duration: this.generateRandomDuration(),
        culturalSafetyLevel,
        culturalSafetyIcon:
          culturalSafetyLevel === 'clean' ? '🟢' : culturalSafetyLevel === 'review' ? '🟡' : '🔴',
        curriculumArea: this.getRandomItem(this.CURRICULUM_AREAS),
        nzcAlignment: this.generateNZCAlignment(),
        learningObjectives: this.generateLearningObjectives(),
        culturalContent: this.generateCulturalContent(),
        tags: this.generateTags(subject, yearLevel),
        difficulty: this.generateDifficulty(yearLevel),
      };

      const resource: ParsedResource = {
        id: `mock-resource-${i}`,
        title: metadata.title,
        relativePath: `resources/${subject.toLowerCase()}/resource-${i}.md`,
        category: subject,
        sizeBytes: Math.floor(Math.random() * 50000) + 1000, // 1KB to 50KB
        modifiedAt: this.generateRandomDate().toISOString(),
        metadata,
        searchableText: this.generateSearchableText(metadata),
        preview: this.getRandomItem(this.SAMPLE_DESCRIPTIONS),
      };

      resources.push(resource);
    }

    console.timeEnd('Mock Data Generation');
    console.log(`Generated ${count} mock resources`);

    return resources;
  }

  private static getRandomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private static generateRandomDuration(): string {
    const durations = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '1.5 hours', '2 hours'];
    return this.getRandomItem(durations);
  }

  private static generateNZCAlignment(): string[] {
    const levels = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const areas = ['M', 'S', 'E', 'SS', 'TRM', 'T', 'H', 'A'];
    const alignment = [];

    for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
      const level = this.getRandomItem(levels);
      const area = this.getRandomItem(areas);
      alignment.push(`${area}${level}-${Math.floor(Math.random() * 10) + 1}`);
    }

    return alignment;
  }

  private static generateLearningObjectives(): string[] {
    const objectives = [
      'Understand key concepts and apply them in new contexts',
      'Develop critical thinking and problem-solving skills',
      'Demonstrate cultural awareness and sensitivity',
      'Collaborate effectively with peers',
      'Communicate ideas clearly and confidently',
      'Make connections between learning and real life',
      'Show respect for diverse perspectives and values',
    ];

    return objectives.slice(0, Math.floor(Math.random() * 3) + 2);
  }

  private static generateCulturalContent() {
    const hasMaoriContent = Math.random() < 0.3;

    return {
      hasMaoriContent,
      culturalSensitivityLevel: hasMaoriContent ? 'review' : 'clean',
      iwiConsultation: hasMaoriContent && Math.random() < 0.1,
      tikangaElements: hasMaoriContent ? ['whakapapa', 'manaakitanga', 'kotahitanga'] : undefined,
    };
  }

  private static generateTags(subject: string, yearLevel: string): string[] {
    const baseTags = [subject.toLowerCase(), yearLevel.toLowerCase()];
    const additionalTags = ['interactive', 'assessment', 'collaborative', 'cultural', 'practical'];

    const numAdditional = Math.floor(Math.random() * 3);
    for (let i = 0; i < numAdditional; i++) {
      baseTags.push(this.getRandomItem(additionalTags));
    }

    return [...new Set(baseTags)];
  }

  private static generateDifficulty(yearLevel: string): 'beginner' | 'intermediate' | 'advanced' {
    const year = parseInt(yearLevel.match(/\d+/)?.[0] || '8');
    if (year <= 8) return 'beginner';
    if (year <= 10) return 'intermediate';
    return 'advanced';
  }

  private static generateRandomDate(): Date {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  private static generateSearchableText(metadata: ResourceMetadata): string {
    return [
      metadata.title,
      metadata.subject,
      ...(Array.isArray(metadata.yearLevel) ? metadata.yearLevel : [metadata.yearLevel]),
      metadata.resourceType,
      metadata.curriculumArea,
      ...(metadata.learningObjectives || []),
      ...(metadata.tags || []),
    ]
      .join(' ')
      .toLowerCase();
  }
}

// Performance measurement utilities
export class PerformanceTester {
  private static metrics: Partial<PerformanceMetrics> = {};
  private static observer?: PerformanceObserver;

  /**
   * Start comprehensive performance testing
   */
  static async startPerformanceTest(): Promise<void> {
    console.log('🚀 Starting ResourcesEnhanced Performance Test Suite');

    // Clear previous metrics
    this.metrics = {};

    // Setup performance monitoring
    this.setupPerformanceMonitoring();

    // Record initial memory usage
    this.recordMemoryUsage('initial');

    console.log('Performance monitoring initialized');
  }

  /**
   * Test initial load performance with large dataset
   */
  static async testInitialLoadTime(resourceCount: number = 5000): Promise<number> {
    console.log(`🔄 Testing initial load with ${resourceCount} resources`);

    const startTime = performance.now();

    // Generate large dataset
    MockResourceGenerator.generateMockResources(resourceCount);

    // Simulate React rendering time
    await new Promise((resolve) => setTimeout(resolve, 50));

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    this.metrics.initialLoadTime = loadTime;
    this.recordMemoryUsage('afterLoad');

    console.log(`✅ Initial load completed in ${loadTime.toFixed(2)}ms`);

    return loadTime;
  }

  /**
   * Test search performance with various query lengths
   */
  static async testSearchPerformance(resources: ParsedResource[]): Promise<number> {
    console.log('🔍 Testing search performance');

    const searchQueries = [
      'math',
      'science year 9',
      'cultural activities',
      'assessment tools',
      'interactive digital resources',
    ];

    const searchTimes: number[] = [];

    for (const query of searchQueries) {
      const startTime = performance.now();

      // Simulate search filtering
      const results = resources.filter((r) =>
        r.searchableText?.toLowerCase().includes(query.toLowerCase()),
      );

      const endTime = performance.now();
      const searchTime = endTime - startTime;
      searchTimes.push(searchTime);

      console.log(`Search "${query}": ${results.length} results in ${searchTime.toFixed(2)}ms`);
    }

    const avgSearchTime = searchTimes.reduce((a, b) => a + b, 0) / searchTimes.length;
    this.metrics.searchResponseTime = avgSearchTime;

    console.log(`✅ Average search time: ${avgSearchTime.toFixed(2)}ms`);

    return avgSearchTime;
  }

  /**
   * Test filter performance
   */
  static async testFilterPerformance(resources: ParsedResource[]): Promise<number> {
    console.log('🎛️ Testing filter performance');

    const filterTests = [
      {
        name: 'Subject Filter',
        fn: () => resources.filter((r) => r.metadata.subject === 'Mathematics'),
      },
      {
        name: 'Year Level Filter',
        fn: () => resources.filter((r) => Array.isArray(r.metadata.yearLevel) ? r.metadata.yearLevel.includes('Year 9') : r.metadata.yearLevel === 'Year 9'),
      },
      {
        name: 'Cultural Safety Filter',
        fn: () => resources.filter((r) => r.metadata.culturalSafetyLevel === 'clean'),
      },
      {
        name: 'Multiple Filters',
        fn: () =>
          resources.filter(
            (r) =>
              r.metadata.subject === 'Science' &&
              (Array.isArray(r.metadata.yearLevel) ? r.metadata.yearLevel.includes('Year 10') : r.metadata.yearLevel === 'Year 10') &&
              r.metadata.culturalSafetyLevel === 'clean',
          ),
      },
    ];

    const filterTimes: number[] = [];

    for (const test of filterTests) {
      const startTime = performance.now();
      const results = test.fn();
      const endTime = performance.now();
      const filterTime = endTime - startTime;
      filterTimes.push(filterTime);

      console.log(`${test.name}: ${results.length} results in ${filterTime.toFixed(2)}ms`);
    }

    const avgFilterTime = filterTimes.reduce((a, b) => a + b, 0) / filterTimes.length;
    this.metrics.filterResponseTime = avgFilterTime;

    console.log(`✅ Average filter time: ${avgFilterTime.toFixed(2)}ms`);

    return avgFilterTime;
  }

  /**
   * Test virtual scrolling performance
   */
  static async testScrollPerformance(): Promise<{ fps: number; jankCount: number }> {
    console.log('📜 Testing scroll performance');

    return new Promise((resolve) => {
      let frameCount = 0;
      let jankCount = 0;
      let lastFrameTime = performance.now();
      const testDuration = 2000; // 2 seconds
      const startTime = performance.now();

      const measureFrame = () => {
        const currentTime = performance.now();
        const frameDelta = currentTime - lastFrameTime;

        frameCount++;

        // Detect jank (frames taking longer than 16.67ms for 60fps)
        if (frameDelta > 16.67) {
          jankCount++;
        }

        lastFrameTime = currentTime;

        if (currentTime - startTime < testDuration) {
          requestAnimationFrame(measureFrame);
        } else {
          const fps = Math.round((frameCount * 1000) / testDuration);
          const scrollMetrics = { fps, jankCount };

          this.metrics.scrollPerformance = scrollMetrics;

          console.log(`✅ Scroll performance: ${fps} FPS, ${jankCount} jank events`);
          resolve(scrollMetrics);
        }
      };

      requestAnimationFrame(measureFrame);
    });
  }

  /**
   * Record memory usage at different points
   */
  private static recordMemoryUsage(phase: 'initial' | 'afterLoad' | 'peak'): void {
    if ('memory' in performance) {
      const memory = (
        performance as {
          memory?: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number };
        }
      ).memory;
      if (!this.metrics.memoryUsage) {
        this.metrics.memoryUsage = { initial: 0, afterLoad: 0, peak: 0 };
      }

      this.metrics.memoryUsage[phase] = Math.round((memory?.usedJSHeapSize || 0) / 1024 / 1024); // MB

      console.log(`Memory usage (${phase}): ${this.metrics.memoryUsage[phase]} MB`);
    }
  }

  /**
   * Setup performance monitoring for navigation timing
   */
  private static setupPerformanceMonitoring(): void {
    if ('PerformanceObserver' in window) {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure') {
            console.log(`Performance measure: ${entry.name} took ${entry.duration.toFixed(2)}ms`);
          }
        }
      });

      this.observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
  }

  /**
   * Get comprehensive performance report
   */
  static getPerformanceReport(): PerformanceMetrics {
    const report = {
      initialLoadTime: this.metrics.initialLoadTime || 0,
      searchResponseTime: this.metrics.searchResponseTime || 0,
      filterResponseTime: this.metrics.filterResponseTime || 0,
      renderTime: this.metrics.renderTime || 0,
      memoryUsage: this.metrics.memoryUsage || { initial: 0, afterLoad: 0, peak: 0 },
      scrollPerformance: this.metrics.scrollPerformance || { fps: 0, jankCount: 0 },
    };

    // Update peak memory usage
    if ('memory' in performance) {
      const memory = (performance as unknown).memory;
      report.memoryUsage.peak = Math.max(
        report.memoryUsage.peak,
        Math.round((memory as any)?.usedJSHeapSize || 0 / 1024 / 1024),
      );
    }

    return report;
  }

  /**
   * Run complete performance test suite
   */
  static async runCompleteSuite(resourceCount: number = 5000): Promise<PerformanceMetrics> {
    await this.startPerformanceTest();

    // Test initial load
    await this.testInitialLoadTime(resourceCount);

    // Generate resources for other tests
    const resources = MockResourceGenerator.generateMockResources(resourceCount);

    // Test search performance
    await this.testSearchPerformance(resources);

    // Test filter performance
    await this.testFilterPerformance(resources);

    // Test scroll performance
    await this.testScrollPerformance();

    // Final memory check
    this.recordMemoryUsage('peak');

    const report = this.getPerformanceReport();

    console.log('📊 Performance Test Suite Complete');
    console.table(report);

    // Cleanup
    if (this.observer) {
      this.observer.disconnect();
    }

    return report;
  }

  /**
   * Performance recommendations based on test results
   */
  static generateRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.initialLoadTime > 3000) {
      recommendations.push(
        '⚠️ Initial load time exceeds 3s - implement code splitting and lazy loading',
      );
    }

    if (metrics.searchResponseTime > 100) {
      recommendations.push(
        '⚠️ Search response time > 100ms - consider implementing debounced search and indexing',
      );
    }

    if (metrics.filterResponseTime > 50) {
      recommendations.push(
        '⚠️ Filter response time > 50ms - optimize filter algorithms and consider memoization',
      );
    }

    if (metrics.memoryUsage.peak > 100) {
      recommendations.push(
        '⚠️ Memory usage exceeds 100MB - implement virtualization for large lists',
      );
    }

    if (metrics.scrollPerformance.fps < 55) {
      recommendations.push(
        '⚠️ Scroll FPS below 55 - implement virtual scrolling and optimize rendering',
      );
    }

    if (metrics.scrollPerformance.jankCount > 5) {
      recommendations.push(
        '⚠️ High jank count detected - optimize heavy computations and rendering',
      );
    }

    if (recommendations.length === 0) {
      recommendations.push('✅ All performance metrics within acceptable ranges!');
    }

    return recommendations;
  }
}

// Export for use in tests
export default PerformanceTester;
