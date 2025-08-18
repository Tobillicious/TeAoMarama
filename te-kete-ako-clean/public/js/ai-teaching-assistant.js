// Te Kete Ako - AI Teaching Assistant
// Intelligent teaching support with cultural awareness

class AITeachingAssistant {
    constructor() {
        this.isActive = false;
        this.conversationHistory = [];
        this.culturalContext = this.loadCulturalContext();
        this.init();
    }

    init() {
        this.createAssistantUI();
        this.bindEvents();
        }

    loadCulturalContext() {
        return {
            whakataukī: [
                { māori: "He aha te mea nui o te ao? He tangata, he tangata, he tangata", 
                  english: "What is the most important thing in the world? It is people, it is people, it is people",
                  context: "Emphasizes the importance of relationships and people in education" },
                { māori: "Whaowhia te kete mātauranga", 
                  english: "Fill the basket of knowledge",
                  context: "Our platform's core philosophy - continuous learning" },
                { māori: "Kia hora te marino, kia whakapapa pounamu te moana", 
                  english: "May peace be widespread, may the sea glisten like jade",
                  context: "Creates calm learning environment" }
            ],
            values: ['Whakapapa', 'Manaakitanga', 'Kaitiakitanga', 'Whanaungatanga', 'Rangatiratanga'],
            pedagogies: ['Ako', 'Whakatōhea', 'Pūrākau', 'Waiata', 'Haka']
        };
    }

    createAssistantUI() {
        // Floating assistant button
        const assistantBtn = document.createElement('button');
        assistantBtn.id = 'ai-assistant-toggle';
        assistantBtn.textContent = '🤖';
        assistantBtn.title = 'AI Teaching Assistant - Reo Ā-Taiao';
        assistantBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #2E8B57, #DAA520);
            color: white;
            border: none;
            font-size: 1.8rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(46, 139, 87, 0.3);
            transition: all 0.3s ease;
            z-index: 1001;
            animation: pulse 2s infinite;
        `;

        // Pulsing animation for attention
        const pulseStyle = document.createElement('style');
        pulseStyle.textContent = `
            @keyframes pulse {
                0% { box-shadow: 0 4px 20px rgba(46, 139, 87, 0.3); }
                50% { box-shadow: 0 4px 30px rgba(46, 139, 87, 0.6); transform: scale(1.05); }
                100% { box-shadow: 0 4px 20px rgba(46, 139, 87, 0.3); }
            }
        `;
        document.head.appendChild(pulseStyle);

        // Chat interface
        const chatInterface = document.createElement('div');
        chatInterface.id = 'ai-chat-interface';
        chatInterface.style.cssText = `
            position: fixed;
            bottom: 90px;
            left: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            display: none;
            flex-direction: column;
            z-index: 1000;
            border: 2px solid var(--color-primary, #2E8B57);
            overflow: hidden;
        `;

        // Chat header with cultural greeting
        const chatHeader = document.createElement('div');
        chatHeader.style.cssText = `
            background: linear-gradient(135deg, #2E8B57, #DAA520);
            color: white;
            padding: 15px;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        chatHeader.textContent = `
            <span style="font-size: 1.5rem;">🤖</span>
            <div>
                <div>AI Pouako (Teacher)</div>
                <div style="font-size: 0.8rem; opacity: 0.9;">Kia ora! Ready to teach?</div>
            </div>
        `;

        // Chat messages area
        const chatMessages = document.createElement('div');
        chatMessages.id = 'chat-messages';
        chatMessages.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 15px;
            background: #f8f9fa;
        `;

        // Welcome message with cultural context
        chatMessages.textContent = `
            <div class="ai-message">
                <div style="background: #e8f5e8; padding: 12px; border-radius: 12px; margin-bottom: 10px; border-left: 4px solid #2E8B57;">
                    <strong>🌿 Kia ora, kaiako!</strong><br>
                    I'm your AI teaching assistant, here to support your mahi (work) with culturally responsive pedagogy and curriculum expertise.<br><br>
                    <em>Try asking me:</em><br>
                    • "How can I make this lesson more engaging?"<br>
                    • "Suggest Māori perspectives for this topic"<br>
                    • "Create assessment criteria for this activity"<br>
                    • "What's a good whakataukī for this lesson?"
                </div>
            </div>
        `;

        // Chat input area
        const chatInput = document.createElement('div');
        chatInput.style.cssText = `
            padding: 15px;
            border-top: 1px solid #e5e7eb;
            background: white;
        `;

        const inputField = document.createElement('textarea');
        inputField.id = 'ai-input';
        inputField.placeholder = 'Ask me anything about teaching... (He aha tō pātai?)';
        inputField.style.cssText = `
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            resize: none;
            font-family: inherit;
            min-height: 60px;
            box-sizing: border-box;
        `;

        const sendBtn = document.createElement('button');
        sendBtn.textContent = 'Tuku (Send) ➤';
        sendBtn.style.cssText = `
            width: 100%;
            margin-top: 8px;
            padding: 10px;
            background: var(--color-primary, #2E8B57);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        `;

        // Quick suggestion buttons
        const suggestions = document.createElement('div');
        suggestions.style.cssText = `
            margin-top: 10px;
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        `;
        
        const quickSuggestions = [
            '🌿 Māori perspective',
            '📝 Assessment ideas', 
            '🎯 Learning objectives',
            '🎨 Creative activities'
        ];

        quickSuggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.textContent = suggestion;
            btn.style.cssText = `
                padding: 5px 10px;
                background: #f3f4f6;
                border: 1px solid #d1d5db;
                border-radius: 15px;
                font-size: 0.8rem;
                cursor: pointer;
                transition: all 0.2s ease;
            `;
            btn.addEventListener('click', () => {
                inputField.value = `Suggest ${suggestion.split(' ')[1]} for this lesson topic`;
                this.sendMessage();
            });
            suggestions.appendChild(btn);
        });

        // Assemble interface
        chatInput.appendChild(inputField);
        chatInput.appendChild(sendBtn);
        chatInput.appendChild(suggestions);
        
        chatInterface.appendChild(chatHeader);
        chatInterface.appendChild(chatMessages);
        chatInterface.appendChild(chatInput);

        document.body.appendChild(assistantBtn);
        document.body.appendChild(chatInterface);

        // Toggle functionality
        assistantBtn.addEventListener('click', () => {
            this.toggleChat();
        });

        sendBtn.addEventListener('click', () => this.sendMessage());
        inputField.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }

    toggleChat() {
        const chatInterface = document.getElementById('ai-chat-interface');
        const isVisible = chatInterface.style.display === 'flex';
        
        chatInterface.style.display = isVisible ? 'none' : 'flex';
        this.isActive = !isVisible;

        if (this.isActive) {
            // Focus input when opened
            setTimeout(() => {
                document.getElementById('ai-input').focus();
            }, 100);
        }
    }

    async sendMessage() {
        const input = document.getElementById('ai-input');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message to chat
        this.addMessageToChat(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and generate response
        const response = await this.generateResponse(message);
        
        // Remove typing indicator and add AI response
        this.removeTypingIndicator();
        this.addMessageToChat(response, 'ai');
    }

    addMessageToChat(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        
        if (sender === 'user') {
            messageDiv.style.cssText = `
                background: var(--color-primary, #2E8B57);
                color: white;
                padding: 12px;
                border-radius: 12px;
                margin: 10px 0;
                margin-left: 50px;
                text-align: right;
            `;
            messageDiv.textContent = message;
        } else {
            messageDiv.style.cssText = `
                background: #e8f5e8;
                padding: 12px;
                border-radius: 12px;
                margin: 10px 0;
                margin-right: 50px;
                border-left: 4px solid var(--color-secondary, #DAA520);
            `;
            messageDiv.textContent = `<strong>🤖 AI Pouako:</strong><br>${message}`;
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.style.cssText = `
            background: #f3f4f6;
            padding: 12px;
            border-radius: 12px;
            margin: 10px 0;
            margin-right: 50px;
            font-style: italic;
            color: #6b7280;
        `;
        typingDiv.textContent = '🤖 AI Pouako is thinking... 💭';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async generateResponse(message) {
        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const lowerMessage = message.toLowerCase();
        
        // Cultural context responses
        if (lowerMessage.includes('māori') || lowerMessage.includes('maori') || lowerMessage.includes('cultural')) {
            return this.generateCulturalResponse(message);
        }
        
        // Assessment responses
        if (lowerMessage.includes('assess') || lowerMessage.includes('rubric') || lowerMessage.includes('criteria')) {
            return this.generateAssessmentResponse(message);
        }

        // Activity suggestions
        if (lowerMessage.includes('activity') || lowerMessage.includes('engage') || lowerMessage.includes('fun')) {
            return this.generateActivityResponse(message);
        }

        // Learning objectives
        if (lowerMessage.includes('objective') || lowerMessage.includes('goal') || lowerMessage.includes('outcome')) {
            return this.generateObjectivesResponse(message);
        }

        // Whakataukī requests
        if (lowerMessage.includes('whakatauk') || lowerMessage.includes('proverb') || lowerMessage.includes('saying')) {
            return this.generateWhakataukīResponse(message);
        }

        // General teaching advice
        return this.generateGeneralResponse(message);
    }

    generateCulturalResponse(message) {
        const responses = [
            `🌿 **Adding Māori Perspective:**<br><br>
            Consider incorporating these elements:<br>
            • **Whakapapa** - Show connections and relationships<br>
            • **Mātauranga Māori** - Traditional knowledge systems<br>
            • **Ako** - Reciprocal teaching and learning<br><br>
            Try starting with a whakataukī relevant to your topic, or invite students to share their own cultural connections.`,
            
            `🌿 **Cultural Integration Ideas:**<br><br>
            • Use **pūrākau** (traditional stories) to introduce concepts<br>
            • Include **Te Reo Māori** vocabulary naturally<br>
            • Connect to **tikanga** (customs) where appropriate<br>
            • Consider the **Māori world view** in your explanations<br><br>
            Remember: Authenticity is key - ensure cultural elements are respectful and accurate.`,
            
            `🌿 **Māori Pedagogical Approaches:**<br><br>
            Try these culturally responsive methods:<br>
            • **Kōrero** - Discussion and oral tradition<br>
            • **Mahi-a-ringa** - Learning through doing<br>
            • **Whakatōhea** - Collaborative learning<br>
            • **Tuakiri** - Connecting to identity<br><br>
            These approaches honor Māori ways of knowing and learning.`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    generateAssessmentResponse(message) {
        return `📝 **Assessment Strategy Suggestions:**<br><br>
        **Formative Assessment:**<br>
        • Exit tickets with one thing learned, one question<br>
        • Peer feedback using "Two stars and a wish"<br>
        • Quick check-ins during activities<br><br>
        
        **Authentic Assessment:**<br>
        • Real-world application tasks<br>
        • Portfolio-based evidence collection<br>
        • Student self-reflection journals<br><br>
        
        **Cultural Considerations:**<br>
        • Allow for different ways of demonstrating knowledge<br>
        • Value oral as well as written communication<br>
        • Include whānau (family) perspectives where appropriate`;
    }

    generateActivityResponse(message) {
        const activities = [
            `🎯 **Engaging Activity Ideas:**<br><br>
            **Collaborative Learning:**<br>
            • **Think-Pair-Share** with cultural twist<br>
            • **Gallery Walk** featuring student creations<br>
            • **Jigsaw method** for complex topics<br><br>
            
            **Creative Expression:**<br>
            • Create waiata (songs) about the topic<br>
            • Design posters with Māori motifs<br>
            • Role-play historical events<br><br>
            
            **Hands-on Learning:**<br>
            • Build models or prototypes<br>
            • Conduct experiments or investigations<br>
            • Create games to teach concepts`,

            `🎨 **Interactive Activities:**<br><br>
            **Digital Creativity:**<br>
            • Create kahoot quizzes<br>
            • Make short videos explaining concepts<br>
            • Design infographics<br><br>
            
            **Community Connections:**<br>
            • Interview whānau members<br>
            • Research local history<br>
            • Connect with community experts<br><br>
            
            **Movement & Kinesthetic:**<br>
            • Learning through haka movements<br>
            • Acting out processes or cycles<br>
            • Outdoor learning experiences`
        ];
        
        return activities[Math.floor(Math.random() * activities.length)];
    }

    generateObjectivesResponse(message) {
        return `🎯 **Learning Objectives Framework:**<br><br>
        **SMART Objectives Template:**<br>
        • **Specific:** Students will be able to...<br>
        • **Measurable:** Through demonstration/explanation<br>
        • **Achievable:** Appropriate for year level<br>
        • **Relevant:** Connected to real-world contexts<br>
        • **Time-bound:** By end of lesson/unit<br><br>
        
        **Cultural Integration:**<br>
        • Include Te Ao Māori perspectives<br>
        • Connect to student identity and background<br>
        • Value different ways of knowing<br><br>
        
        **NZ Curriculum Alignment:**<br>
        • Link to specific achievement objectives<br>
        • Include key competencies<br>
        • Consider cross-curricular connections`;
    }

    generateWhakataukīResponse(message) {
        const randomWhakataukī = this.culturalContext.whakataukī[
            Math.floor(Math.random() * this.culturalContext.whakataukī.length)
        ];
        
        return `🌿 **Whakataukī for Your Lesson:**<br><br>
        **${randomWhakataukī.māori}**<br>
        <em>"${randomWhakataukī.english}"</em><br><br>
        
        **Teaching Application:**<br>
        ${randomWhakataukī.context}<br><br>
        
        **How to Use:**<br>
        • Start your lesson with this whakataukī<br>
        • Ask students to reflect on its meaning<br>
        • Connect it to your lesson objectives<br>
        • Return to it during lesson summary<br><br>
        
        Remember to pronounce it correctly and explain the cultural significance!`;
    }

    generateGeneralResponse(message) {
        const responses = [
            `💡 **Teaching Tip:**<br><br>
            Great question! Here are some strategies to consider:<br>
            • Start with what students already know<br>
            • Use concrete examples before abstract concepts<br>
            • Include multiple ways to access the content<br>
            • Provide opportunities for practice and feedback<br><br>
            
            Consider how you can make this culturally relevant and personally meaningful for your students.`,
            
            `🎓 **Pedagogical Suggestion:**<br><br>
            Try the **5 E's Model**:<br>
            • **Engage** - Hook students' interest<br>
            • **Explore** - Let them investigate<br>
            • **Explain** - Provide clear instruction<br>
            • **Elaborate** - Apply to new situations<br>
            • **Evaluate** - Assess understanding<br><br>
            
            This works especially well when combined with ako (reciprocal learning) principles.`,
            
            `🌟 **Student-Centered Approach:**<br><br>
            Consider these student-focused strategies:<br>
            • Give students choice in how they learn<br>
            • Connect to their interests and experiences<br>
            • Encourage questions and curiosity<br>
            • Celebrate different perspectives<br><br>
            
            Remember: Every student brings valuable knowledge to your classroom!`
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    bindEvents() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt + A to toggle assistant
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                this.toggleChat();
            }
        });

        // Context-aware suggestions based on page content
        this.addContextualSuggestions();
    }

    addContextualSuggestions() {
        // Analyze current page content for smart suggestions
        const pageTitle = document.title.toLowerCase();
        const pageContent = document.body.textContent.toLowerCase();
        
        // If on a specific subject page, show relevant quick actions
        if (pageTitle.includes('science')) {
            this.addQuickAction('🔬 Science Experiment Ideas', 'Suggest hands-on science experiments with Māori connections');
        }
        
        if (pageTitle.includes('english') || pageTitle.includes('writing')) {
            this.addQuickAction('✍️ Writing Prompts', 'Create culturally relevant writing prompts');
        }
        
        if (pageTitle.includes('math')) {
            this.addQuickAction('🧮 Math Real-World', 'Connect math concepts to Māori contexts');
        }
        
        if (pageContent.includes('treaty') || pageContent.includes('waitangi')) {
            this.addQuickAction('📜 Treaty Teaching', 'Best practices for teaching Treaty of Waitangi');
        }
    }

    addQuickAction(title, prompt) {
        // Add contextual quick action buttons (implementation would go here)
        }
}

// Initialize AI Teaching Assistant when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AITeachingAssistant());
} else {
    new AITeachingAssistant();
}