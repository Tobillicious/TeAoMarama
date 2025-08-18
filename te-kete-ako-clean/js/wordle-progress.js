// wordle-progress.js
// Progress tracking system for Te Reo Māori Wordle games

class WordleProgress {
    constructor() {
        this.init();
    }

    init() {
        console.log('Wordle Progress tracker initialized');
    }

    // Get user progress for a specific game
    async getProgress(gameType = 'wordle-5') {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return this.getLocalProgress(gameType);
        }

        const userId = user.email;
        const key = `wordle_progress_${gameType}_${userId}`;
        
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : this.getDefaultProgress();
        } catch (error) {
            console.error('Error loading Wordle progress:', error);
            return this.getDefaultProgress();
        }
    }

    // Save progress for logged-in users
    async saveProgress(gameType, gameData) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return this.saveLocalProgress(gameType, gameData);
        }

        const userId = user.email;
        const key = `wordle_progress_${gameType}_${userId}`;
        
        try {
            const currentProgress = await this.getProgress(gameType);
            const updatedProgress = {
                ...currentProgress,
                gamesPlayed: currentProgress.gamesPlayed + 1,
                gamesWon: gameData.won ? currentProgress.gamesWon + 1 : currentProgress.gamesWon,
                currentStreak: gameData.won ? currentProgress.currentStreak + 1 : 0,
                maxStreak: Math.max(currentProgress.maxStreak, gameData.won ? currentProgress.currentStreak + 1 : currentProgress.currentStreak),
                guessDistribution: this.updateGuessDistribution(currentProgress.guessDistribution, gameData),
                lastPlayed: new Date().toISOString(),
                totalTime: currentProgress.totalTime + (gameData.timeSpent || 0)
            };

            localStorage.setItem(key, JSON.stringify(updatedProgress));
            this.showProgressNotification(updatedProgress, gameData);
            return updatedProgress;
        } catch (error) {
            console.error('Error saving Wordle progress:', error);
            return null;
        }
    }

    // Default progress structure
    getDefaultProgress() {
        return {
            gamesPlayed: 0,
            gamesWon: 0,
            currentStreak: 0,
            maxStreak: 0,
            guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
            lastPlayed: null,
            totalTime: 0,
            averageTime: 0
        };
    }

    // Update guess distribution
    updateGuessDistribution(distribution, gameData) {
        if (gameData.won && gameData.guesses) {
            const guessCount = gameData.guesses;
            if (guessCount >= 1 && guessCount <= 6) {
                distribution[guessCount] = (distribution[guessCount] || 0) + 1;
            }
        }
        return distribution;
    }

    // For non-logged-in users
    getLocalProgress(gameType) {
        const key = `wordle_progress_${gameType}_local`;
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : this.getDefaultProgress();
        } catch {
            return this.getDefaultProgress();
        }
    }

    saveLocalProgress(gameType, gameData) {
        const key = `wordle_progress_${gameType}_local`;
        const currentProgress = this.getLocalProgress(gameType);
        const updatedProgress = {
            ...currentProgress,
            gamesPlayed: currentProgress.gamesPlayed + 1,
            gamesWon: gameData.won ? currentProgress.gamesWon + 1 : currentProgress.gamesWon,
            currentStreak: gameData.won ? currentProgress.currentStreak + 1 : 0,
            maxStreak: Math.max(currentProgress.maxStreak, gameData.won ? currentProgress.currentStreak + 1 : currentProgress.currentStreak),
            guessDistribution: this.updateGuessDistribution(currentProgress.guessDistribution, gameData),
            lastPlayed: new Date().toISOString()
        };

        localStorage.setItem(key, JSON.stringify(updatedProgress));
        return updatedProgress;
    }

    // Calculate win percentage
    getWinPercentage(progress) {
        if (progress.gamesPlayed === 0) return 0;
        return Math.round((progress.gamesWon / progress.gamesPlayed) * 100);
    }

    // Get average guesses for wins
    getAverageGuesses(progress) {
        const dist = progress.guessDistribution;
        const totalWins = Object.values(dist).reduce((sum, count) => sum + count, 0);
        
        if (totalWins === 0) return 0;
        
        const weightedSum = Object.entries(dist).reduce((sum, [guesses, count]) => {
            return sum + (parseInt(guesses) * count);
        }, 0);
        
        return (weightedSum / totalWins).toFixed(1);
    }

    // Update stats display in game
    updateStatsDisplay(gameType = 'wordle-5') {
        const progress = this.getProgress(gameType);
        const winPercentage = this.getWinPercentage(progress);
        
        // Update stats in the game interface
        const statsElements = {
            'games-played': progress.gamesPlayed,
            'win-percentage': winPercentage + '%',
            'current-streak': progress.currentStreak,
            'max-streak': progress.maxStreak
        };

        Object.entries(statsElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });

        // Update guess distribution chart if it exists
        this.updateGuessChart(progress.guessDistribution);
    }

    // Update guess distribution chart
    updateGuessChart(distribution) {
        const maxCount = Math.max(...Object.values(distribution));
        
        Object.entries(distribution).forEach(([guesses, count]) => {
            const barElement = document.getElementById(`guess-${guesses}`);
            if (barElement) {
                const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                barElement.style.width = percentage + '%';
                barElement.textContent = count;
            }
        });
    }

    // Show progress notification after game
    showProgressNotification(progress, gameData) {
        const winPercentage = this.getWinPercentage(progress);
        
        let message = '';
        if (gameData.won) {
            message = `🎉 Kei a koe! You solved it in ${gameData.guesses} guesses!<br>`;
            message += `📊 Stats: ${progress.gamesWon}/${progress.gamesPlayed} games won (${winPercentage}%)`;
            
            if (progress.currentStreak > 1) {
                message += `<br>🔥 ${progress.currentStreak} game winning streak!`;
            }
        } else {
            message = `😔 Ka pai te whakatā! Good try!<br>`;
            message += `📊 Stats: ${progress.gamesWon}/${progress.gamesPlayed} games won (${winPercentage}%)`;
        }

        this.showNotification(message, gameData.won ? 'success' : 'info');
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.wordle-notification');
        if (existing) {
            existing.remove();
        }

        const notification = document.createElement('div');
        notification.className = `wordle-notification wordle-notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#4299e1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 500;
            max-width: 350px;
            animation: slideInRight 0.3s ease-out;
            line-height: 1.4;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
                <span>${type === 'success' ? '🎉' : '📊'}</span>
                <div>
                    <div>${message}</div>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                            style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; float: right; margin-top: 0.5rem;">
                        ×
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 6000);
    }

    // Get leaderboard data for logged-in users
    async getLeaderboardData() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return null;
        }

        // This would typically fetch from a server, but for now we'll use localStorage
        const allProgress = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('wordle_progress_') && !key.includes('_local')) {
                try {
                    const data = JSON.parse(localStorage.getItem(key));
                    const userEmail = key.split('_').pop();
                    allProgress.push({
                        user: userEmail,
                        ...data,
                        winPercentage: this.getWinPercentage(data)
                    });
                } catch (error) {
                    console.error('Error parsing leaderboard data:', error);
                }
            }
        }

        return allProgress.sort((a, b) => b.winPercentage - a.winPercentage);
    }
}

// Initialize the progress tracker
window.wordleProgress = new WordleProgress();

console.log('Wordle Progress tracking system loaded');