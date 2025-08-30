import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// Check if Firebase environment variables are available
const hasFirebaseConfig =
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_API_KEY !== 'your_actual_api_key_here';

// Initialize Firebase only if we have valid configuration
let app;
let auth;
let db;
let storage;
let analytics;

if (hasFirebaseConfig) {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain:
      import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
      `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:
      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
      `${import.meta.env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);

    // Initialize Analytics conditionally
    analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));

    console.log('🔥 Firebase initialized successfully');
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed:', error);
    console.log('🔄 Running in demo mode without Firebase');
  }

  // Connect to emulators in development
  if (
    import.meta.env.DEV &&
    import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' &&
    auth &&
    db &&
    storage
  ) {
    try {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectStorageEmulator(storage, 'localhost', 9199);
      console.log('🔥 Connected to Firebase emulators');
    } catch (error) {
      console.warn('⚠️ Firebase emulator connection failed:', error);
    }
  }
} else {
  console.log('🔄 Firebase configuration not found - running in demo mode');
  console.log('📝 To enable Firebase, add valid environment variables to .env file');
}

// Health check function
export const getFirebaseHealth = async () => {
  if (!auth || !db) {
    return {
      status: 'demo-mode',
      message: 'Running in demo mode without Firebase',
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const authState = auth.currentUser ? 'authenticated' : 'unauthenticated';
    const firestoreConnected = db ? 'connected' : 'disconnected';

    return {
      status: 'healthy',
      auth: authState,
      firestore: firestoreConnected,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    };
  }
};

export { analytics, app, auth, db, storage };
export default app;
