// wordle-sharing.js
// NYT-style Wordle sharing system for Te Reo Māori Wordle

class WordleSharing {
    constructor() {
        this.init();
    }

    init() {
        console.log('Wordle sharing system initialized');
    }

    // Generate the classic NYT Wordle sharing format
    generateShareText(gameData) {
        const { guesses, won, attempts, gameNumber } = gameData;
        
        // Header line like "Te Reo Māori Wordle #123 4/6"
        let shareText = `Te Reo Māori Wordle #${gameNumber || this.getTodaysGameNumber()} `;
        shareText += won ? `${attempts}/6` : 'X/6';
        shareText += '\n\n';

        // Generate colored squares for each guess
        guesses.forEach(guess => {
            guess.forEach(letter => {
                if (letter.status === 'correct') {
                    shareText += '🟩'; // Green square
                } else if (letter.status === 'present') {
                    shareText += '🟨'; // Yellow square
                } else {
                    shareText += '⬛'; // Black square
                }
            });
            shareText += '\n';
        });

        shareText += '\n';
        shareText += '🧺 Play Te Reo Māori Wordle: https://tekete.netlify.app/games/te-reo-wordle.html';
        shareText += '\n\n';
        shareText += 'Kia ora from Mangakotukutuku College! 🌿';

        return shareText;
    }

    // Get today's game number (days since launch)
    getTodaysGameNumber() {
        const launchDate = new Date('2024-01-01'); // Adjust to your launch date
        const today = new Date();
        const diffTime = Math.abs(today - launchDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    // Generate game data from current game state
    generateGameData() {
        // This will be called when the game ends
        const gameData = {
            guesses: [],
            won: false,
            attempts: 0,
            gameNumber: this.getTodaysGameNumber()
        };

        // Extract game board state
        const board = document.getElementById('gameBoard');
        if (board) {
            const rows = board.querySelectorAll('.row');
            rows.forEach(row => {
                const tiles = row.querySelectorAll('.tile');
                const guess = [];
                let hasContent = false;
                
                tiles.forEach(tile => {
                    const letter = tile.textContent.trim();
                    if (letter) {
                        hasContent = true;
                        guess.push({
                            letter: letter,
                            status: this.getTileStatus(tile)
                        });
                    }
                });
                
                if (hasContent) {
                    gameData.guesses.push(guess);
                    gameData.attempts++;
                }
            });
        }

        // Check if won (look for a row of all correct tiles)
        gameData.won = gameData.guesses.some(guess => 
            guess.length === 5 && guess.every(letter => letter.status === 'correct')
        );

        return gameData;
    }

    // Determine tile status from CSS classes
    getTileStatus(tile) {
        if (tile.classList.contains('correct') || tile.style.backgroundColor === 'rgb(106, 170, 100)') {
            return 'correct';
        } else if (tile.classList.contains('present') || tile.style.backgroundColor === 'rgb(201, 180, 88)') {
            return 'present';
        } else {
            return 'absent';
        }
    }

    // Show sharing modal
    showSharingModal(gameData) {
        const shareText = this.generateShareText(gameData);
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'share-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                text-align: center;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            ">
                <h2 style="color: var(--color-primary); margin-bottom: 1rem;">
                    🎉 ${gameData.won ? 'Ka pai! Well done!' : 'Ka pai te whakamātau! Good try!'}
                </h2>
                
                <div style="
                    background: #f8f9fa;
                    padding: 1rem;
                    border-radius: 8px;
                    margin: 1rem 0;
                    font-family: monospace;
                    white-space: pre-line;
                    font-size: 1.1rem;
                    line-height: 1.2;
                ">${shareText}</div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem;">
                    <button onclick="wordleSharing.copyToClipboard(\`${shareText.replace(/`/g, '\\`')}\`)" 
                            style="
                                background: var(--color-secondary);
                                color: white;
                                border: none;
                                padding: 0.75rem 1.5rem;
                                border-radius: 6px;
                                cursor: pointer;
                                font-weight: 600;
                            ">
                        📋 Copy to Clipboard
                    </button>
                    
                    <button onclick="wordleSharing.shareViaEmail(\`${shareText.replace(/`/g, '\\`')}\`)"
                            style="
                                background: var(--color-accent);
                                color: white;
                                border: none;
                                padding: 0.75rem 1.5rem;
                                border-radius: 6px;
                                cursor: pointer;
                                font-weight: 600;
                            ">
                        📧 Share via Email
                    </button>
                    
                    <button onclick="this.parentElement.parentElement.parentElement.remove()"
                            style="
                                background: #666;
                                color: white;
                                border: none;
                                padding: 0.75rem 1.5rem;
                                border-radius: 6px;
                                cursor: pointer;
                                font-weight: 600;
                            ">
                        Close
                    </button>
                </div>
                
                <p style="color: #666; font-size: 0.9rem; margin-top: 1rem;">
                    Perfect for sharing with your Mangakotukutuku College whānau! 🌿
                </p>
            </div>
        `;

        document.body.appendChild(modal);

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Copy to clipboard
    copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('📋 Copied to clipboard! Ready to paste anywhere.', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('📋 Copied to clipboard!', 'success');
        });
    }

    // Share via email
    shareViaEmail(text) {
        const subject = encodeURIComponent('My Te Reo Māori Wordle Result! 🧺');
        const body = encodeURIComponent(text);
        const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    }

    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#4299e1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Hook into game completion (called externally)
    onGameComplete() {
        // Wait a moment for the final tile animations to complete
        setTimeout(() => {
            const gameData = this.generateGameData();
            this.showSharingModal(gameData);
        }, 1500);
    }
}

// Initialize the sharing system
window.wordleSharing = new WordleSharing();

console.log('Wordle sharing system loaded - ready for email sharing!');