
// Cultural Intelligence Detection System - Te Kura o TeAoMarama
class CulturalIntelligenceDetector {
  constructor() {
    this.maoriVocabulary = new Map([
      ['whakataukī', 'proverb'],
      ['tikanga', 'customs'],
      ['manaakitanga', 'hospitality'],
      ['whakapapa', 'genealogy'],
      ['kaitiakitanga', 'guardianship'],
      ['rangatiratanga', 'leadership'],
      ['whanaungatanga', 'relationships'],
      ['taonga', 'treasure'],
      ['iwi', 'tribe'],
      ['hapū', 'sub-tribe'],
      ['marae', 'ceremonial grounds']
    ]);
    
    this.culturalContext = {
      sensitivity: 'high',
      protocols: 'active',
      integration: 'seamless'
    };
    
    this.init();
  }

  init() {
    this.observeContentChanges();
    this.enhanceUIWithCulturalContext();
    this.monitorUserCulturalEngagement();
  }

  detectCulturalContent(text) {
    const words = text.toLowerCase().split(/\s+/);
    const culturalMatches = [];
    
    words.forEach(word => {
      if (this.maoriVocabulary.has(word)) {
        culturalMatches.push({
          term: word,
          meaning: this.maoriVocabulary.get(word),
          context: 'māori-language'
        });
      }
    });
    
    return {
      hasCulturalContent: culturalMatches.length > 0,
      matches: culturalMatches,
      culturalDensity: culturalMatches.length / words.length,
      recommendation: this.getCulturalRecommendation(culturalMatches.length)
    };
  }

  getCulturalRecommendation(matchCount) {
    if (matchCount >= 3) return 'high-cultural-context';
    if (matchCount >= 1) return 'moderate-cultural-context';
    return 'consider-cultural-integration';
  }

  enhanceUIWithCulturalContext() {
    // Add cultural sensitivity indicators
    const culturalIndicator = document.createElement('div');
    culturalIndicator.className = 'cultural-sensitivity-active';
    culturalIndicator.innerHTML = '🌿 Cultural Sensitivity Mode Active';
    culturalIndicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: var(--color-pounamu);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      z-index: 1000;
      opacity: 0.9;
    `;
    
    document.body.appendChild(culturalIndicator);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      culturalIndicator.style.opacity = '0';
      setTimeout(() => culturalIndicator.remove(), 300);
    }, 3000);
  }

  monitorUserCulturalEngagement() {
    let culturalInteractions = 0;
    
    document.addEventListener('click', (event) => {
      if (event.target.textContent && this.detectCulturalContent(event.target.textContent).hasCulturalContent) {
        culturalInteractions++;
        this.provideCulturalContext(event.target);
      }
    });
    
    // Report cultural engagement after 5 minutes
    setTimeout(() => {
      console.log(`🌿 Cultural Engagement Score: ${culturalInteractions}/10`);
      this.adaptUIBasedOnEngagement(culturalInteractions);
    }, 300000);
  }

  provideCulturalContext(element) {
    const detection = this.detectCulturalContent(element.textContent);
    if (detection.hasCulturalContent) {
      this.showCulturalTooltip(element, detection.matches[0]);
    }
  }

  showCulturalTooltip(element, match) {
    const tooltip = document.createElement('div');
    tooltip.className = 'cultural-tooltip';
    tooltip.innerHTML = `
      <strong>${match.term}</strong><br>
      <em>Meaning: ${match.meaning}</em><br>
      <small>Cultural Context: Māori</small>
    `;
    tooltip.style.cssText = `
      position: absolute;
      background: var(--color-neutral-800);
      color: white;
      padding: 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      z-index: 1001;
      max-width: 200px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = (rect.bottom + 10) + 'px';
    
    setTimeout(() => tooltip.remove(), 3000);
  }

  adaptUIBasedOnEngagement(score) {
    if (score >= 5) {
      document.body.classList.add('high-cultural-engagement');
      this.enableAdvancedCulturalFeatures();
    }
  }

  enableAdvancedCulturalFeatures() {
    // Add pronunciation guides, cultural protocols, etc.
    console.log('🎭 Advanced cultural features activated');
  }
}

// Initialize Cultural Intelligence
window.culturalIntelligence = new CulturalIntelligenceDetector();
