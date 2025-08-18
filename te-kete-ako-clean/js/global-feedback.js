/**
 * Global Feedback System - Toast Notifications & Loading States
 * Based on Te Kete Ako V2.2 Implementation Artifacts
 * 
 * Provides professional user feedback across the entire site
 */

// Global Toast Notification System
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('toast-show'), 10);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function getToastIcon(type) {
    const icons = {
        'success': '✅',
        'error': '❌', 
        'warning': '⚠️',
        'info': 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Global Button Loading State Manager
function setButtonLoading(button, isLoading, loadingText = 'Loading...') {
    if (!button) return;
    
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span class="spinner"></span> ${loadingText}`;
        button.classList.add('btn-loading');
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || button.innerHTML;
        button.classList.remove('btn-loading');
        delete button.dataset.originalText;
    }
}

// Enhanced Form Submission Handler
async function handleFormSubmission(form, submitHandler, options = {}) {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const loadingText = options.loadingText || 'Processing...';
    const successMessage = options.successMessage || 'Success!';
    const errorMessage = options.errorMessage || 'An error occurred. Please try again.';
    
    try {
        setButtonLoading(submitButton, true, loadingText);
        
        const result = await submitHandler(form);
        
        if (result && result.success !== false) {
            showToast(successMessage, 'success');
            if (options.resetForm !== false) {
                form.reset();
            }
            if (options.onSuccess) {
                options.onSuccess(result);
            }
        } else {
            throw new Error(result?.message || errorMessage);
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showToast(error.message || errorMessage, 'error');
        
        if (options.onError) {
            options.onError(error);
        }
    } finally {
        setButtonLoading(submitButton, false);
    }
}

// Auto-initialize feedback system
document.addEventListener('DOMContentLoaded', () => {
    // Add toast container styles if not already present
    if (!document.getElementById('toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                min-width: 300px;
                max-width: 500px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border-left: 4px solid var(--color-primary);
                transform: translateX(100%);
                transition: transform 0.3s ease;
                margin-bottom: 10px;
            }
            
            .toast-show {
                transform: translateX(0);
            }
            
            .toast-success {
                border-left-color: #10B981;
            }
            
            .toast-error {
                border-left-color: #EF4444;
            }
            
            .toast-warning {
                border-left-color: #F59E0B;
            }
            
            .toast-info {
                border-left-color: var(--color-primary);
            }
            
            .toast-content {
                padding: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .toast-icon {
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .toast-message {
                flex: 1;
                font-size: 14px;
                line-height: 1.4;
                color: var(--color-text);
            }
            
            .toast-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                transition: background-color 0.2s;
            }
            
            .toast-close:hover {
                background-color: #f5f5f5;
                color: #666;
            }
            
            .spinner {
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 2px solid #f3f3f3;
                border-top: 2px solid var(--color-primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .btn-loading {
                cursor: not-allowed;
                opacity: 0.7;
            }
            
            @media (max-width: 640px) {
                .toast {
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    console.log('🎉 Te Kete Ako Global Feedback System initialized');
});

// Make functions globally available
window.showToast = showToast;
window.setButtonLoading = setButtonLoading;
window.handleFormSubmission = handleFormSubmission;