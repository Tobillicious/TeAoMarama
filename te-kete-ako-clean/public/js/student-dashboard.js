// Student Dashboard functionality

// Authentication check and user data loading
window.addEventListener('load', async () => {
    // Check if user is authenticated using standard supabase client
    try {
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        
        if (!user) {
            window.location.href = 'login.html';
            return;
        }

        // For demo purposes, we'll use user data directly
        // In production, this would come from the database
        const currentUser = {
            display_name: user.user_metadata?.display_name || user.email?.split('@')[0],
            email: user.email,
            role: 'student', // This would come from the database
            year_level: 8, // This would come from the database
            school_name: 'Mangakōtukutuku College' // This would come from the database
        };

        // Update welcome message
        const welcomeMsg = document.getElementById('welcome-message');
        const userInfo = document.getElementById('user-info');

        welcomeMsg.textContent = `Kia ora, ${currentUser.display_name}!`;
        userInfo.textContent = `Year ${currentUser.year_level} | ${currentUser.school_name}`;

        // Load dashboard data
        await loadDashboardData(currentUser);
        
    } catch (error) {
        console.error('Authentication error:', error);
        window.location.href = 'login.html';
    }
});

async function loadDashboardData(user) {
    try {
        // In a real implementation, these would be API calls to Netlify Functions
        // For now, we'll use placeholder data and localStorage for demo

        // Load learning progress (placeholder)
        document.getElementById('projects-completed').textContent = '2';
        document.getElementById('activities-done').textContent = '8';
        document.getElementById('cultural-score').textContent = '85%';

        // Load announcements (placeholder)
        const announcementsContainer = document.getElementById('announcements-container');
        announcementsContainer.innerHTML = `
            <div class="announcement">
                <h4>📢 Welcome to Te Kete Ako Digital Platform!</h4>
                <p>Your enhanced learning experience now includes collaborative tools, project submissions, and personalized tracking. Explore your new dashboard features!</p>
            </div>
        `;

        // Update society project status based on user data
        const projectStatus = document.getElementById('society-project-status');
        if (user.year_level == 8) {
            projectStatus.textContent = 'Year 8 Systems Unit: Ready to design your ideal society with your collaborative team!';
        } else {
            projectStatus.textContent = 'Explore our society design resources and collaborative learning tools.';
        }

    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Dashboard interaction functions (placeholders for future implementation)
function viewProgressDetails() {
    alert('Progress details functionality coming soon!');
}

function viewProjectSubmissions() {
    window.location.href = 'my-submissions.html';
}

function openCollaborationTools() {
    alert('Collaboration tools coming soon!');
}

function viewPeerFeedback() {
    alert('Peer feedback functionality coming soon!');
}

function viewSavedResources() {
    alert('Saved resources functionality coming soon!');
}

function viewAllAchievements() {
    alert('Achievements system coming soon!');
}

// AI Companion functionality
async function sendAIMessage() {
    const input = document.getElementById('ai-companion-input');
    const chat = document.getElementById('ai-companion-chat');
    const message = input.value.trim();

    if (!message) return;

    // Clear placeholder text on first use
    if (chat.innerHTML.includes('Ask your AI companion')) {
        chat.innerHTML = '';
    }

    // Add user message
    addChatMessage('You', message, 'user');
    input.value = '';

    // Add loading indicator
    addChatMessage('AI Companion', 'Thinking...', 'ai-loading');

    try {
        // Get current user
        const { data: { user } } = await window.supabaseClient.auth.getUser();
        
        if (!user) {
            throw new Error('Not authenticated');
        }

        const response = await fetch('/.netlify/functions/ai-companion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: message,
                userRole: 'student',
                userId: user.id,
                context: {
                    yearLevel: 8, // Would come from user profile
                    currentProjects: ['society-design'] // Would come from actual data
                }
            })
        });

        const result = await response.json();

        // Remove loading indicator
        removeLoadingMessage();

        if (result.success) {
            const aiResponse = result.response;

            // Add AI response with cultural elements
            let responseHTML = `
                <div style="margin-bottom: 1rem;">
                    <strong>🌺 ${aiResponse.encouragement}</strong>
                </div>
                <div style="margin-bottom: 1rem;">
                    ${aiResponse.message}
                </div>
            `;

            if (aiResponse.whakatauki) {
                responseHTML += `
                    <div style="background: var(--color-cultural-light); padding: 0.75rem; border-radius: 6px; border-left: 3px solid var(--color-secondary); margin: 0.5rem 0; font-size: 0.9rem;">
                        <div style="font-style: italic; color: var(--color-primary); margin-bottom: 0.25rem;">
                            "${aiResponse.whakatauki.mi}"
                        </div>
                        <div style="color: var(--color-text-secondary); font-size: 0.8rem; margin-bottom: 0.25rem;">
                            ${aiResponse.whakatauki.en}
                        </div>
                        <div style="color: var(--color-text-secondary); font-size: 0.8rem;">
                            ${aiResponse.whakatauki.application}
                        </div>
                    </div>
                `;
            }

            if (aiResponse.cultural_connection) {
                responseHTML += `
                    <div style="background: #f0f8f0; padding: 0.75rem; border-radius: 6px; margin: 0.5rem 0; font-size: 0.9rem;">
                        <strong>🔗 Cultural Connection:</strong><br>
                        ${aiResponse.cultural_connection}
                    </div>
                `;
            }

            addChatMessage('AI Companion', responseHTML, 'ai', true);
        } else {
            addChatMessage('AI Companion', 'Sorry, I\'m having trouble right now. Please try again later.', 'ai-error');
        }

    } catch (error) {
        console.error('AI Companion error:', error);
        removeLoadingMessage();
        addChatMessage('AI Companion', 'I\'m temporarily unavailable. Please try again in a moment.', 'ai-error');
    }
}

function addChatMessage(sender, message, type, isHTML = false) {
    const chat = document.getElementById('ai-companion-chat');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;

    let messageStyle = '';
    if (type === 'user') {
        messageStyle = 'background: var(--color-secondary); color: white; margin-left: 2rem; text-align: right;';
    } else if (type === 'ai-loading') {
        messageStyle = 'background: #e9ecef; color: var(--color-text-secondary); font-style: italic;';
    } else if (type === 'ai-error') {
        messageStyle = 'background: #f8d7da; color: #721c24; border-left: 3px solid #dc3545;';
    } else {
        messageStyle = 'background: white; border-left: 3px solid var(--color-primary);';
    }

    messageDiv.style.cssText = `${messageStyle} padding: 0.75rem; margin: 0.5rem 0; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);`;

    if (isHTML) {
        messageDiv.innerHTML = `<strong>${sender}:</strong><br>${message}`;
    } else {
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    }

    chat.appendChild(messageDiv);
    chat.scrollTop = chat.scrollHeight;
}

function removeLoadingMessage() {
    const chat = document.getElementById('ai-companion-chat');
    const loadingMessage = chat.querySelector('.ai-loading');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}