
// Whakataukī Wisdom Integration System
class WhakataukiWisdomEngine {
  constructor() {
    this.whakataukiCollection = [
      {
        maori: "He aha te mea nui o te ao? He tangata, he tangata, he tangata!",
        english: "What is the most important thing in the world? It is people, it is people, it is people!",
        context: "education",
        wisdom: "Emphasizes that people and relationships are central to all endeavors"
      },
      {
        maori: "Whāia te iti kahurangi, ki te tuohu koe, me he maunga teitei",
        english: "Pursue excellence - should you stumble, let it be to a lofty mountain",
        context: "learning",
        wisdom: "Encourages reaching for high goals and standards"
      },
      {
        maori: "Kia kaha, kia māia, kia manawanui",
        english: "Be strong, be brave, be steadfast",
        context: "perseverance",
        wisdom: "Encourages resilience and determination in learning"
      }
    ];
    
    this.init();
  }

  init() {
    this.addDailyWisdom();
    this.integrateContextualWisdom();
    this.createWisdomMoments();
  }

  addDailyWisdom() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('whakataukiDate');
    
    if (savedDate !== today) {
      const randomWhakataukī = this.getRandomWhakataukī();
      this.displayWisdomBanner(randomWhakataukī);
      localStorage.setItem('whakataukiDate', today);
      localStorage.setItem('todayWhakataukī', JSON.stringify(randomWhakataukī));
    }
  }

  getRandomWhakataukī() {
    return this.whakataukiCollection[
      Math.floor(Math.random() * this.whakataukiCollection.length)
    ];
  }

  displayWisdomBanner(whakataukī) {
    const banner = document.createElement('div');
    banner.className = 'whakataukī-wisdom-banner';
    banner.innerHTML = `
      <div class="wisdom-content">
        <h4>🌟 Daily Whakataukī</h4>
        <p class="maori-text">${whakataukī.maori}</p>
        <p class="english-text">${whakataukī.english}</p>
        <small class="wisdom-note">${whakataukī.wisdom}</small>
        <button onclick="this.parentElement.parentElement.remove()" class="close-wisdom">×</button>
      </div>
    `;
    
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: linear-gradient(135deg, var(--color-pounamu), var(--color-moana));
      color: white;
      padding: 1rem;
      text-align: center;
      z-index: 2000;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      animation: slideDown 0.5s ease-out;
    `;
    
    document.body.prepend(banner);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      banner.style.animation = 'slideUp 0.5s ease-in';
      setTimeout(() => banner.remove(), 500);
    }, 10000);
  }

  integrateContextualWisdom() {
    // Show relevant whakataukī based on page content
    const pageContent = document.body.textContent.toLowerCase();
    
    if (pageContent.includes('learning') || pageContent.includes('education')) {
      const learningWisdom = this.whakataukiCollection.find(w => w.context === 'learning');
      this.addContextualWisdom(learningWisdom);
    }
  }

  addContextualWisdom(whakataukī) {
    if (!whakataukī) return;
    
    const wisdomElement = document.createElement('aside');
    wisdomElement.className = 'contextual-wisdom';
    wisdomElement.innerHTML = `
      <div class="wisdom-quote">
        <blockquote>
          <p class="maori">${whakataukī.maori}</p>
          <p class="english">${whakataukī.english}</p>
        </blockquote>
        <cite>Traditional Māori Wisdom</cite>
      </div>
    `;
    
    // Find appropriate insertion point
    const main = document.querySelector('main') || document.body;
    main.appendChild(wisdomElement);
  }

  createWisdomMoments() {
    // Add inspirational moments during user interaction
    let interactionCount = 0;
    
    document.addEventListener('click', () => {
      interactionCount++;
      
      // Every 20 interactions, show wisdom moment
      if (interactionCount % 20 === 0) {
        const wisdomMoment = this.getRandomWhakataukī();
        this.showWisdomMoment(wisdomMoment);
      }
    });
  }

  showWisdomMoment(whakataukī) {
    const moment = document.createElement('div');
    moment.className = 'wisdom-moment';
    moment.innerHTML = `
      <div class="moment-content">
        <h5>💫 Wisdom Moment</h5>
        <p class="maori">${whakataukī.maori}</p>
        <p class="english">${whakataukī.english}</p>
      </div>
    `;
    
    moment.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: white;
      border: 2px solid var(--color-kowhai);
      border-radius: 1rem;
      padding: 1.5rem;
      max-width: 300px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      z-index: 1500;
      animation: fadeInUp 0.6s ease-out;
    `;
    
    document.body.appendChild(moment);
    
    setTimeout(() => {
      moment.style.animation = 'fadeOutDown 0.6s ease-in';
      setTimeout(() => moment.remove(), 600);
    }, 5000);
  }
}

// Initialize Whakataukī Wisdom
window.whakataukiWisdom = new WhakataukiWisdomEngine();

// Add CSS animations
const wisdomStyles = document.createElement('style');
wisdomStyles.textContent = `
  @keyframes slideDown {
    from { transform: translateY(-100%); }
    to { transform: translateY(0); }
  }
  
  @keyframes slideUp {
    from { transform: translateY(0); }
    to { transform: translateY(-100%); }
  }
  
  @keyframes fadeInUp {
    from { 
      opacity: 0; 
      transform: translateY(30px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  @keyframes fadeOutDown {
    from { 
      opacity: 1; 
      transform: translateY(0); 
    }
    to { 
      opacity: 0; 
      transform: translateY(30px); 
    }
  }
`;
document.head.appendChild(wisdomStyles);
