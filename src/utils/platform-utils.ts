// Utility Functions for Te Kura o TeAoMarama
export const culturalUtils = {
  /**
   * Check if content has cultural sensitivity
   */
  hasCulturalContent(text: string): boolean {
    const culturalMarkers = [
      'māori',
      'maori',
      'te reo',
      'tikanga',
      'whakataukī',
      'kaitiakitanga',
      'manaakitanga',
      'whanaungatanga',
    ];
    return culturalMarkers.some((marker) => text.toLowerCase().includes(marker));
  },

  /**
   * Get cultural sensitivity level
   */
  getCulturalSensitivity(text: string): 'low' | 'medium' | 'high' | 'sacred' {
    if (text.toLowerCase().includes('sacred') || text.toLowerCase().includes('tapu')) {
      return 'sacred';
    }
    if (this.hasCulturalContent(text)) {
      return 'high';
    }
    return 'low';
  },

  /**
   * Validate cultural safety of content
   */
  validateCulturalSafety(content: string): {
    isSafe: boolean;
    concerns: string[];
    recommendations: string[];
  } {
    const concerns: string[] = [];
    const recommendations: string[] = [];

    if (content.toLowerCase().includes('appropriation')) {
      concerns.push('Potential cultural appropriation detected');
      recommendations.push('Review content with cultural advisor');
    }

    return {
      isSafe: concerns.length === 0,
      concerns,
      recommendations,
    };
  },
};

export const performanceUtils = {
  /**
   * Debounce function for performance optimization
   */
  debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  },

  /**
   * Throttle function for performance optimization
   */
  throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number,
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

export const educationalUtils = {
  /**
   * Check if content is appropriate for educational level
   */
  checkEducationalLevel(content: string, level: string): boolean {
    // Simple heuristic based on content complexity
    const sentences = content.split('.').length;
    const avgWordsPerSentence = content.split(' ').length / sentences;

    switch (level.toLowerCase()) {
      case 'primary':
        return avgWordsPerSentence < 15;
      case 'intermediate':
        return avgWordsPerSentence < 20;
      case 'secondary':
        return avgWordsPerSentence < 25;
      default:
        return true;
    }
  },

  /**
   * Generate learning objectives
   */
  generateLearningObjectives(topic: string, level: string): string[] {
    return [
      `Students will understand the key concepts of ${topic}`,
      `Students will be able to apply ${topic} knowledge in practical situations`,
      `Students will appreciate the cultural significance of ${topic} in Te Ao Māori context`,
    ];
  },
};
