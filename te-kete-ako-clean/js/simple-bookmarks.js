// simple-bookmarks.js
// Simple localStorage-based bookmark system for Te Kete Ako

class SimpleBookmarks {
    constructor() {
        this.bookmarks = this.loadBookmarks();
        this.init();
    }

    init() {
        // Add bookmark buttons to resource cards on page load
        setTimeout(() => {
            this.addBookmarkButtons();
        }, 500);

        // Listen for auth state changes
        document.addEventListener('authStateChanged', () => {
            this.updateBookmarkButtons();
        });

        console.log('Simple Bookmarks initialized');
    }

    loadBookmarks() {
        try {
            const stored = localStorage.getItem('tekete_bookmarks');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading bookmarks:', error);
            return [];
        }
    }

    saveBookmarks() {
        try {
            localStorage.setItem('tekete_bookmarks', JSON.stringify(this.bookmarks));
        } catch (error) {
            console.error('Error saving bookmarks:', error);
        }
    }

    async addBookmark(title, url, description = '', type = 'resource') {
        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            this.showNotification('Please log in to save resources to your kete', 'info');
            return false;
        }

        // Check if already bookmarked
        const existing = this.bookmarks.find(b => b.url === url);
        if (existing) {
            this.showNotification(`"${title}" is already in your kete`, 'info');
            return false;
        }

        // Add new bookmark
        const bookmark = {
            id: Date.now().toString(),
            title: title,
            url: url,
            description: description,
            type: type,
            savedAt: new Date().toISOString(),
            savedBy: user.email
        };

        this.bookmarks.push(bookmark);
        this.saveBookmarks();
        this.updateBookmarkButtons();
        this.showNotification(`"${title}" saved to your kete!`, 'success');
        return true;
    }

    removeBookmark(url) {
        const index = this.bookmarks.findIndex(b => b.url === url);
        if (index > -1) {
            const bookmark = this.bookmarks[index];
            this.bookmarks.splice(index, 1);
            this.saveBookmarks();
            this.updateBookmarkButtons();
            this.showNotification(`"${bookmark.title}" removed from your kete`, 'success');
            return true;
        }
        return false;
    }

    isBookmarked(url) {
        return this.bookmarks.some(b => b.url === url);
    }

    async getBookmarks() {
        const { data: { user } } = await supabase.auth.getUser();
        return this.bookmarks.filter(b => 
            !user || 
            b.savedBy === user.email
        );
    }

    addBookmarkButtons() {
        // Find resource cards and add bookmark buttons
        const resourceCards = document.querySelectorAll('.resource-card, .featured-card');
        
        resourceCards.forEach(card => {
            // Skip if already has bookmark button
            if (card.querySelector('.bookmark-btn')) {
                return;
            }

            // Extract resource info
            const titleElement = card.querySelector('.resource-card-title, .card-title, h3');
            const descriptionElement = card.querySelector('.resource-card-description, .card-description');
            const linkElement = card.querySelector('a') || card;

            if (!titleElement || !linkElement) {
                return;
            }

            const title = titleElement.textContent.trim();
            const description = descriptionElement ? descriptionElement.textContent.trim() : '';
            const url = linkElement.href || window.location.href;

            // Create bookmark button
            const bookmarkBtn = this.createBookmarkButton(title, url, description);
            
            // Find the best place to add the button
            const metaArea = card.querySelector('.resource-card-meta, .card-meta');
            if (metaArea) {
                metaArea.appendChild(bookmarkBtn);
            } else {
                // Create a meta area if it doesn't exist
                const metaDiv = document.createElement('div');
                metaDiv.className = 'resource-card-meta';
                metaDiv.style.marginTop = '1rem';
                metaDiv.appendChild(bookmarkBtn);
                card.appendChild(metaDiv);
            }
        });

        // Add bookmark button to individual resource pages
        this.addPageBookmarkButton();
    }

    addPageBookmarkButton() {
        // Check if this is an individual resource page
        const isResourcePage = window.location.pathname.includes('/handouts/') || 
                              window.location.pathname.includes('/lessons/') ||
                              window.location.pathname.includes('/games/') ||
                              window.location.pathname.includes('/activities/');

        if (!isResourcePage) {
            return;
        }

        // Find page title
        const pageTitle = document.querySelector('h1, .game-title, .handout-title')?.textContent?.trim() || document.title;
        const pageDescription = document.querySelector('meta[name="description"]')?.content || '';
        const pageUrl = window.location.href;

        // Check if bookmark button already exists
        if (document.querySelector('.page-bookmark-btn')) {
            return;
        }

        // Create floating bookmark button
        const floatingBtn = document.createElement('button');
        floatingBtn.className = 'page-bookmark-btn bookmark-btn';
        floatingBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-secondary);
            color: white;
            border: none;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const isBookmarked = this.isBookmarked(pageUrl);
        floatingBtn.innerHTML = isBookmarked ? '❤️' : '🧺';
        floatingBtn.title = isBookmarked ? 'Remove from kete' : 'Save to kete';

        floatingBtn.addEventListener('click', () => {
            if (this.isBookmarked(pageUrl)) {
                this.removeBookmark(pageUrl);
            } else {
                this.addBookmark(pageTitle, pageUrl, pageDescription, 'page');
            }
        });

        floatingBtn.addEventListener('mouseenter', () => {
            floatingBtn.style.transform = 'scale(1.1)';
        });

        floatingBtn.addEventListener('mouseleave', () => {
            floatingBtn.style.transform = 'scale(1)';
        });

        document.body.appendChild(floatingBtn);
    }

    createBookmarkButton(title, url, description = '') {
        const button = document.createElement('button');
        button.className = 'bookmark-btn';
        button.style.cssText = `
            background: var(--color-secondary);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            margin: 0.25rem;
        `;

        const isBookmarked = this.isBookmarked(url);
        button.innerHTML = isBookmarked ? '❤️ Saved' : '🧺 Save';
        button.title = isBookmarked ? 'Remove from kete' : 'Save to kete';

        if (isBookmarked) {
            button.style.background = '#28a745';
        }

        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (this.isBookmarked(url)) {
                this.removeBookmark(url);
            } else {
                this.addBookmark(title, url, description);
            }
        });

        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        return button;
    }

    updateBookmarkButtons() {
        // Update all bookmark buttons on the page
        const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
        
        bookmarkBtns.forEach(btn => {
            // Get URL from button's parent card or from current page
            let url;
            const card = btn.closest('.resource-card, .featured-card');
            if (card) {
                const link = card.querySelector('a') || card;
                url = link.href;
            } else {
                url = window.location.href;
            }

            if (url) {
                const isBookmarked = this.isBookmarked(url);
                btn.innerHTML = isBookmarked ? '❤️ Saved' : '🧺 Save';
                btn.title = isBookmarked ? 'Remove from kete' : 'Save to kete';
                btn.style.background = isBookmarked ? '#28a745' : 'var(--color-secondary)';
            }
        });

        // Update floating button if it exists
        const floatingBtn = document.querySelector('.page-bookmark-btn');
        if (floatingBtn) {
            const isBookmarked = this.isBookmarked(window.location.href);
            floatingBtn.innerHTML = isBookmarked ? '❤️' : '🧺';
            floatingBtn.title = isBookmarked ? 'Remove from kete' : 'Save to kete';
        }
    }

    showNotification(message, type = 'info') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.bookmark-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `bookmark-notification bookmark-notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#f56565' : type === 'success' ? '#48bb78' : '#4299e1'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 500;
            max-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span>${type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'}</span>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: auto;">
                    ×
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    // Methods for My Kete page
    getBookmarksByType() {
        const bookmarks = this.getBookmarks();
        const byType = {};
        
        bookmarks.forEach(bookmark => {
            if (!byType[bookmark.type]) {
                byType[bookmark.type] = [];
            }
            byType[bookmark.type].push(bookmark);
        });

        return byType;
    }

    getBookmarkStats() {
        const bookmarks = this.getBookmarks();
        return {
            total: bookmarks.length,
            byType: this.getBookmarksByType()
        };
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .bookmark-btn:hover {
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .page-bookmark-btn:hover {
        box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important;
    }
`;
document.head.appendChild(style);

// Initialize bookmarks system
window.simpleBookmarks = new SimpleBookmarks();

console.log('Simple Bookmarks system loaded');