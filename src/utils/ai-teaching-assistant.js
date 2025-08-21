
// AI Teaching Assistant - Te Kura o TeAoMarama
class AITeachingAssistant {
  constructor() {
    this.culturalKnowledge = new Map();
    this.studentProfiles = new Map();
    this.teachingStrategies = [];
    this.init();
  }

  init() {
    this.createAssistantInterface();
    this.loadCulturalKnowledge();
    this.setupIntelligentResponses();
  }

  createAssistantInterface() {
    const assistant = document.createElement('div');
    assistant.id = 'ai-teaching-assistant';
    assistant.innerHTML = `
      <div class="assistant-avatar">
        <div class="avatar-circle">🧠</div>
        <div class="assistant-status online"></div>
      </div>
      <div class="assistant-chat" id="assistant-chat" style="display: none;">
        <div class="chat-header">
          <h4>Kaitiaki AI - Your Teaching Assistant</h4>
          <button onclick="this.parentElement.parentElement.style.display='none'">×</button>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-input">
          <input type="text" id="assistant-input" placeholder="Ask about cultural integration, teaching strategies...">
          <button onclick="window.aiAssistant.sendMessage()">Send</button>
        </div>
      </div>
    `;
    
    assistant.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 2000;
    `;
    
    document.body.appendChild(assistant);
    
    // Avatar click handler
    assistant.querySelector('.assistant-avatar').addEventListener('click', () => {
      const chat = document.getElementById('assistant-chat');
      chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
    });
  }

  loadCulturalKnowledge() {
    this.culturalKnowledge.set('tikanga', {
      definition: 'Māori customs and traditions',
      teachingTips: 'Always approach with respect and cultural sensitivity',
      integration: 'Weave into curriculum naturally, not as separate topic'
    });
    
    this.culturalKnowledge.set('te-reo', {
      definition: 'The Māori language',
      teachingTips: 'Encourage pronunciation practice and cultural context',
      integration: 'Use in greetings, instructions, and subject terminology'
    });
  }

  sendMessage() {
    const input = document.getElementById('assistant-input');
    const message = input.value.trim();
    if (!message) return;
    
    this.addMessageToChat('user', message);
    input.value = '';
    
    // Simulate AI response (in real implementation, would call AI service)
    setTimeout(() => {
      const response = this.generateIntelligentResponse(message);
      this.addMessageToChat('assistant', response);
    }, 1000);
  }

  addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `message ${sender}`;
    messageEl.innerHTML = `
      <div class="message-content">${message}</div>
      <div class="message-time">${new Date().toLocaleTimeString()}</div>
    `;
    
    chatMessages.appendChild(messageEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  generateIntelligentResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cultural') || lowerMessage.includes('māori') || lowerMessage.includes('maori')) {
      return "🌿 For cultural integration, I recommend starting with whakataukī to introduce concepts, then weaving tikanga throughout your lessons. Would you like specific suggestions for your subject area?";
    }
    
    if (lowerMessage.includes('engagement') || lowerMessage.includes('student')) {
      return "🎯 To boost engagement, try connecting learning to students' cultural backgrounds and local contexts. Interactive activities that honor different ways of knowing work well. What age group are you teaching?";
    }
    
    if (lowerMessage.includes('assessment') || lowerMessage.includes('evaluate')) {
      return "📊 Consider holistic assessment approaches that include cultural competency alongside academic achievement. Portfolio-based assessments can capture the full range of student learning.";
    }
    
    return "🤔 That's a great question! I'm here to help with cultural integration, teaching strategies, and educational resources. Could you provide more context about what you're working on?";
  }
}

// Initialize AI Teaching Assistant
window.aiAssistant = new AITeachingAssistant();
