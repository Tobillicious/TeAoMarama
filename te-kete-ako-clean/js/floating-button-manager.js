// Te Kete Ako - Floating Button Manager
// Organize and optimize all floating action buttons

class FloatingButtonManager {
    constructor() {
        this.buttons = new Map();
        this.isCollapsed = false;
        this.init();
    }

    init() {
        // Wait for all other systems to load
        setTimeout(() => {
            this.organizeButtons();
            this.createMasterToggle();
            this.bindEvents();
            console.log('🎯 Floating Button Manager optimized interface!');
        }, 1000);
    }

    organizeButtons() {
        // Find all floating buttons and organize them
        const floatingButtons = document.querySelectorAll(`
            #ai-assistant-toggle,
            #lesson-builder-btn,
            #game-generator-btn,
            #analytics-dashboard-btn,
            .dark-mode-toggle,
            .print-all-btn
        `);

        // Create organized button container
        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'floating-buttons-container';
        buttonContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 1002;
            display: flex;
            flex-direction: column;
            gap: 15px;
            transition: all 0.3s ease;
        `;

        // Reorganize buttons with proper spacing
        const buttonConfigs = [
            { id: 'ai-assistant-toggle', icon: '🤖', title: 'AI Teaching Assistant', color: 'linear-gradient(135deg, #2E8B57, #DAA520)' },
            { id: 'lesson-builder-btn', icon: '🏗️', title: 'Lesson Builder', color: 'linear-gradient(135deg, #7c3aed, #a855f7)' },
            { id: 'game-generator-btn', icon: '🎮', title: 'Game Generator', color: 'linear-gradient(135deg, #f59e0b, #d97706)' },
            { id: 'analytics-dashboard-btn', icon: '📊', title: 'Learning Analytics', color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' }
        ];

        buttonConfigs.forEach((config, index) => {
            let button = document.getElementById(config.id);
            if (!button) {
                // Create button if it doesn't exist
                button = document.createElement('button');
                button.id = config.id;
                button.innerHTML = config.icon;
                button.title = config.title;
            }

            // Standardize button styling
            button.style.cssText = `
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: ${config.color};
                color: white;
                border: none;
                font-size: 1.8rem;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            // Add hover effects
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'scale(1.1)';
                button.style.boxShadow = '0 6px 25px rgba(0,0,0,0.3)';
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'scale(1)';
                button.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            });

            buttonContainer.appendChild(button);
            this.buttons.set(config.id, button);
        });

        // Remove old buttons from their original positions
        floatingButtons.forEach(btn => {
            if (btn && btn.parentNode && !buttonContainer.contains(btn)) {
                btn.remove();
            }
        });

        document.body.appendChild(buttonContainer);
    }

    createMasterToggle() {
        // Create a master toggle button
        const masterToggle = document.createElement('button');
        masterToggle.id = 'floating-buttons-toggle';
        masterToggle.innerHTML = '⚡';
        masterToggle.title = 'Toggle Quick Tools';
        masterToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: linear-gradient(135deg, #1f2937, #374151);
            color: white;
            border: 3px solid white;
            font-size: 2rem;
            cursor: pointer;
            box-shadow: 0 6px 30px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
            z-index: 1003;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        masterToggle.addEventListener('click', () => {
            this.toggleButtons();
        });

        masterToggle.addEventListener('mouseenter', () => {
            masterToggle.style.transform = 'scale(1.1) rotate(90deg)';
        });

        masterToggle.addEventListener('mouseleave', () => {
            masterToggle.style.transform = 'scale(1) rotate(0deg)';
        });

        document.body.appendChild(masterToggle);
    }

    toggleButtons() {
        const container = document.getElementById('floating-buttons-container');
        const toggle = document.getElementById('floating-buttons-toggle');
        
        if (this.isCollapsed) {
            // Show buttons
            container.style.transform = 'translateX(0)';
            container.style.opacity = '1';
            container.style.pointerEvents = 'auto';
            toggle.innerHTML = '⚡';
            toggle.style.transform = 'scale(1) rotate(0deg)';
            this.isCollapsed = false;
        } else {
            // Hide buttons
            container.style.transform = 'translateX(-100px)';
            container.style.opacity = '0';
            container.style.pointerEvents = 'none';
            toggle.innerHTML = '🔧';
            toggle.style.transform = 'scale(1.1) rotate(180deg)';
            this.isCollapsed = true;
        }
    }

    bindEvents() {
        // Keyboard shortcut to toggle all buttons
        document.addEventListener('keydown', (e) => {
            // Alt + T to toggle tools
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                this.toggleButtons();
            }
        });

        // Auto-hide on mobile when scrolling
        if (window.innerWidth < 768) {
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                const container = document.getElementById('floating-buttons-container');
                const toggle = document.getElementById('floating-buttons-toggle');
                
                // Hide buttons while scrolling on mobile
                container.style.opacity = '0.3';
                toggle.style.opacity = '0.3';
                
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    container.style.opacity = '1';
                    toggle.style.opacity = '1';
                }, 1000);
            });
        }

        // Reposition buttons on window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleResize() {
        const container = document.getElementById('floating-buttons-container');
        const toggle = document.getElementById('floating-buttons-toggle');
        
        if (window.innerWidth < 768) {
            // Mobile positioning
            container.style.bottom = '90px';
            container.style.left = '10px';
            toggle.style.bottom = '20px';
            toggle.style.left = '10px';
            
            // Smaller buttons on mobile
            this.buttons.forEach(button => {
                button.style.width = '50px';
                button.style.height = '50px';
                button.style.fontSize = '1.5rem';
            });
            
            toggle.style.width = '60px';
            toggle.style.height = '60px';
            toggle.style.fontSize = '1.8rem';
        } else {
            // Desktop positioning
            container.style.bottom = '20px';
            container.style.left = '20px';
            toggle.style.bottom = '20px';
            toggle.style.left = '20px';
            
            // Full size buttons on desktop
            this.buttons.forEach(button => {
                button.style.width = '60px';
                button.style.height = '60px';
                button.style.fontSize = '1.8rem';
            });
            
            toggle.style.width = '70px';
            toggle.style.height = '70px';
            toggle.style.fontSize = '2rem';
        }
    }

    // Fix any positioning conflicts with existing elements
    fixPositionConflicts() {
        // Move other fixed elements that might conflict
        const darkModeToggle = document.querySelector('.dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.style.top = '20px';
            darkModeToggle.style.right = '20px';
            darkModeToggle.style.left = 'auto';
            darkModeToggle.style.bottom = 'auto';
        }

        // Move print button to right side
        const printBtn = document.querySelector('.print-all-btn');
        if (printBtn) {
            printBtn.style.bottom = '20px';
            printBtn.style.right = '20px';
            printBtn.style.left = 'auto';
        }

        // Ensure auth notice doesn't overlap
        const authNotice = document.querySelector('.auth-notice, .notification');
        if (authNotice) {
            authNotice.style.top = '20px';
            authNotice.style.left = '50%';
            authNotice.style.transform = 'translateX(-50%)';
            authNotice.style.right = 'auto';
        }
    }
}

// Initialize after other systems load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        new FloatingButtonManager();
    }, 1500);
});