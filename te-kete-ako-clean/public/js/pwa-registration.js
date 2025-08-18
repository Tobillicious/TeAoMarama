/**
 * PWA Service Worker Registration for Te Kete Ako
 * Handles offline functionality and caching for educational platform
 */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('✅ Service Worker registered successfully:', registration.scope);
                
                // Handle updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Show update available notification
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('❌ Service Worker registration failed:', error);
            });

        // Handle controller change (when new SW takes control)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            window.location.reload();
        });
    });
}

function showUpdateNotification() {
    // Create a simple update notification
    const updateBanner = document.createElement('div');
    updateBanner.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: var(--primary-color, #c41e3a);
        color: white;
        padding: 12px;
        text-align: center;
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    updateBanner.innerHTML = `
        <span>🆕 Te Kete Ako has been updated!</span>
        <button onclick="window.location.reload()" style="margin-left: 10px; padding: 4px 8px; background: white; color: var(--primary-color, #c41e3a); border: none; border-radius: 4px; cursor: pointer;">
            Refresh Now
        </button>
        <button onclick="this.parentElement.remove()" style="margin-left: 5px; padding: 4px 8px; background: transparent; color: white; border: 1px solid white; border-radius: 4px; cursor: pointer;">
            Later
        </button>
    `;
    document.body.prepend(updateBanner);
}

// Handle offline status
window.addEventListener('online', () => {
    console.log('🌐 Back online - syncing data...');
    // You can add sync logic here
});

window.addEventListener('offline', () => {
    console.log('📱 Working offline - cached content available');
    // Show offline indicator
    showOfflineIndicator();
});

function showOfflineIndicator() {
    let indicator = document.getElementById('offline-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'offline-indicator';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: #666;
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        indicator.innerHTML = '📱 Offline Mode';
        document.body.appendChild(indicator);
    }
    
    // Remove when back online
    window.addEventListener('online', () => {
        if (indicator && indicator.parentElement) {
            indicator.remove();
        }
    }, { once: true });
}