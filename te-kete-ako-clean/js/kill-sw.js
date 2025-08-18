// This script is a "kill switch" for a rogue service worker.
// It will find any active service worker registrations and unregister them.

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister()
        .then(function() {
          console.log('Service Worker unregistered successfully');
        })
        .catch(function(error) {
          console.error('Service Worker unregistration failed:', error);
        });
    }
  });
}

// Force a hard reload to bypass any cache after unregistering.
// This is aggressive, but necessary in this situation.
window.location.reload(true);
