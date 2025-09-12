import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

// Firebase configuration - using actual values from your project
const firebaseConfig = {
  apiKey: 'AIzaSyCRkpICJx9lXq6ggNJFjjMVB93l5cVGyp8',
  authDomain: 'teao-marama.firebaseapp.com',
  projectId: 'teao-marama',
  storageBucket: 'teao-marama.appspot.com',
  messagingSenderId: '28147937673',
  appId: '1:28147937673:web:b69bb650dafba206a0b158',
  measurementId: 'G-89HLG0TB4E',
};

// Initialize Firebase - always initialize with proper error handling
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Analytics conditionally
let analytics: Awaited<ReturnType<typeof getAnalytics>> | null | undefined;
try {
  analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
} catch (error) {
  console.warn('Analytics initialization failed, continuing without analytics:', error);
  analytics = null;
}

console.log('🔥 Firebase initialized successfully');
console.log('Auth initialized:', !!auth);
console.log('Firestore initialized:', !!db);

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

// Health check function
export const getFirebaseHealth = async () => {
  try {
    const authState = auth.currentUser ? 'authenticated' : 'unauthenticated';
    const firestoreConnected = 'connected';

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
