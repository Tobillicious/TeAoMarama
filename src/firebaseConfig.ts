import { getAnalytics, type Analytics } from 'firebase/analytics';
import { initializeApp, type FirebaseApp, type FirebaseOptions } from 'firebase/app';
import {
  browserSessionPersistence,
  connectAuthEmulator,
  getAuth,
  setPersistence,
  type Auth,
} from 'firebase/auth';
import {
  connectFirestoreEmulator,
  disableNetwork,
  enableNetwork,
  getFirestore,
  type Firestore,
} from 'firebase/firestore';
import { connectFunctionsEmulator, getFunctions, type Functions } from 'firebase/functions';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { writeEpisode } from './ai/provenance';

// Enhanced Firebase Configuration with comprehensive types and validation
export interface EnhancedFirebaseConfig extends FirebaseOptions {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  databaseURL?: string;
}

// Configuration validation with fallback for ERO Hui demonstration
class FirebaseConfigValidator {
  private static readonly REQUIRED_FIELDS: (keyof EnhancedFirebaseConfig)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'storageBucket',
    'messagingSenderId',
    'appId',
  ];

  static validate(config: Partial<EnhancedFirebaseConfig>): EnhancedFirebaseConfig {
    const missingFields = this.REQUIRED_FIELDS.filter((field) => !config[field]);

    if (missingFields.length > 0) {
      const errorMsg = `Missing required Firebase config fields: ${missingFields.join(', ')}`;
      console.warn('🔥 Firebase Configuration Warning:', errorMsg);

      // For ERO Hui demonstration, provide fallback configuration
      if (import.meta.env.PROD || import.meta.env.VITE_ERO_DEMO_MODE === 'true') {
        console.log('🎯 ERO Hui Demo Mode: Using fallback Firebase configuration');
        return this.getFallbackConfig();
      }

      // In development, provide helpful guidance
      if (import.meta.env.DEV) {
        console.log('\n📝 Firebase Setup Guide:');
        console.log('1. Create a .env file in your project root');
        console.log('2. Add the following environment variables:');
        missingFields.forEach((field) => {
          console.log(`   VITE_FIREBASE_${field.toUpperCase()}=your_${field}_here`);
        });
        console.log('3. Restart your development server\n');
      }

      throw new Error(errorMsg);
    }

    // Validate format patterns
    if (config.apiKey && !config.apiKey.startsWith('AIza')) {
      console.warn('⚠️  Firebase API Key format may be incorrect');
    }

    if (config.authDomain && !config.authDomain.includes('firebaseapp.com')) {
      console.warn('⚠️  Firebase Auth Domain format may be incorrect');
    }

    return config as EnhancedFirebaseConfig;
  }

  // Fallback configuration for ERO Hui demonstration
  private static getFallbackConfig(): EnhancedFirebaseConfig {
    console.log('🌿 Using fallback Firebase configuration for ERO Hui demonstration');
    return {
      apiKey: 'demo-api-key-for-ero-hui',
      authDomain: 'teaomarama-demo.firebaseapp.com',
      projectId: 'teaomarama-demo',
      storageBucket: 'teaomarama-demo.appspot.com',
      messagingSenderId: '123456789',
      appId: '1:123456789:web:demo-app-id',
      measurementId: 'G-DEMO123',
    };
  }
}

// Enhanced Firebase service status tracking
export interface FirebaseServiceStatus {
  app: {
    initialized: boolean;
    error?: string;
    demoMode?: boolean;
  };
  auth: {
    initialized: boolean;
    connected: boolean;
    persistenceSet: boolean;
    error?: string;
    demoMode?: boolean;
  };
  firestore: {
    initialized: boolean;
    connected: boolean;
    offline: boolean;
    error?: string;
    demoMode?: boolean;
  };
  storage: {
    initialized: boolean;
    error?: string;
    demoMode?: boolean;
  };
  analytics?: {
    initialized: boolean;
    error?: string;
    demoMode?: boolean;
  };
  functions?: {
    initialized: boolean;
    error?: string;
    demoMode?: boolean;
  };
}

// Global Firebase service status (mutable for status tracking)
const serviceStatus: FirebaseServiceStatus = {
  app: { initialized: false },
  auth: { initialized: false, connected: false, persistenceSet: false },
  firestore: { initialized: false, connected: false, offline: false },
  storage: { initialized: false },
};

// Firebase configuration with environment variables and fallback
const firebaseConfig: EnhancedFirebaseConfig = FirebaseConfigValidator.validate({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // For Analytics
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL, // For Realtime Database
});

// Check if we're in demo mode
const isDemoMode =
  !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_ERO_DEMO_MODE === 'true';

// Initialize Firebase App with error handling
let app: FirebaseApp;

try {
  app = initializeApp(firebaseConfig);
  serviceStatus.app.initialized = true;
  serviceStatus.app.demoMode = isDemoMode;

  // Log successful initialization
  console.log('🔥 Firebase App initialized successfully');
  if (isDemoMode) {
    console.log('🎯 Running in ERO Hui Demo Mode');
  }

  // Log to provenance system (only if not in demo mode)
  if (!isDemoMode) {
    writeEpisode('firebase-config', {
      timestamp: new Date().toISOString(),
      agent: 'agent:firebase-system',
      action: 'firebase_app_initialized',
      context: {
        project_id: firebaseConfig.projectId,
        auth_domain: firebaseConfig.authDomain,
        environment: import.meta.env.MODE,
        text: `Firebase app initialized for project: ${firebaseConfig.projectId}`,
      },
    }).catch(console.error);
  }
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  serviceStatus.app.error = errorMessage;
  console.error('🚨 Firebase App initialization failed:', errorMessage);
  throw error;
}

// Initialize Firebase Authentication with enhanced configuration
let auth: Auth;

try {
  auth = getAuth(app);
  serviceStatus.auth.initialized = true;
  serviceStatus.auth.demoMode = isDemoMode;

  // Set persistence to session (survives tab refresh, not browser restart)
  setPersistence(auth, browserSessionPersistence)
    .then(() => {
      serviceStatus.auth.persistenceSet = true;
      console.log('🔐 Firebase Auth persistence set to session');
    })
    .catch((error) => {
      console.warn('⚠️  Could not set Firebase Auth persistence:', error.message);
    });

  // Connect to emulator in development
  if (import.meta.env.DEV && import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL) {
    try {
      const emulatorUrl = new URL(import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_URL);
      connectAuthEmulator(auth, `http://${emulatorUrl.hostname}:${emulatorUrl.port}`);
      console.log('🧪 Connected to Firebase Auth Emulator');
    } catch (emulatorError) {
      console.warn('⚠️  Could not connect to Firebase Auth Emulator:', emulatorError);
    }
  }

  serviceStatus.auth.connected = true;
  console.log('🔐 Firebase Auth initialized successfully');
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  serviceStatus.auth.error = errorMessage;
  console.error('🚨 Firebase Auth initialization failed:', errorMessage);
  throw error;
}

// Initialize Firestore with enhanced configuration
let db: Firestore;

try {
  db = getFirestore(app);
  serviceStatus.firestore.initialized = true;
  serviceStatus.firestore.demoMode = isDemoMode;

  // Connect to emulator in development
  if (import.meta.env.DEV && import.meta.env.VITE_FIRESTORE_EMULATOR_HOST) {
    try {
      const [host, port] = import.meta.env.VITE_FIRESTORE_EMULATOR_HOST.split(':');
      connectFirestoreEmulator(db, host, parseInt(port));
      console.log('🧪 Connected to Firestore Emulator');
    } catch (emulatorError) {
      console.warn('⚠️  Could not connect to Firestore Emulator:', emulatorError);
    }
  }

  // Monitor connection status
  enableNetwork(db)
    .then(() => {
      serviceStatus.firestore.connected = true;
      serviceStatus.firestore.offline = false;
      console.log('💾 Firestore connected successfully');
    })
    .catch((error) => {
      serviceStatus.firestore.offline = true;
      console.warn('⚠️  Firestore connection warning:', error.message);
    });

  console.log('💾 Firestore initialized successfully');
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  serviceStatus.firestore.error = errorMessage;
  console.error('🚨 Firestore initialization failed:', errorMessage);
  throw error;
}

// Initialize Firebase Storage
let storage: FirebaseStorage | undefined;

try {
  storage = getStorage(app);
  serviceStatus.storage.initialized = true;
  serviceStatus.storage.demoMode = isDemoMode;
  console.log('📁 Firebase Storage initialized successfully');
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  serviceStatus.storage.error = errorMessage;
  console.error('🚨 Firebase Storage initialization failed:', errorMessage);
  // Don't throw - storage is optional
  storage = undefined;
}

// Initialize Firebase Analytics (optional)
let analytics: Analytics | undefined;

try {
  if (firebaseConfig.measurementId && typeof window !== 'undefined' && !isDemoMode) {
    analytics = getAnalytics(app);
    serviceStatus.analytics = { initialized: true };
    console.log('📊 Firebase Analytics initialized successfully');
  } else if (isDemoMode) {
    serviceStatus.analytics = { initialized: false, demoMode: true };
    console.log('📊 Firebase Analytics disabled in demo mode');
  }
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  serviceStatus.analytics = { initialized: false, error: errorMessage };
  console.warn('⚠️  Firebase Analytics initialization warning:', errorMessage);
  // Don't throw - analytics is optional
}

// Initialize Cloud Functions (optional)
let functions: Functions | undefined;

try {
  functions = getFunctions(app, 'australia-southeast1'); // Closer to NZ

  // Connect to emulator in development
  if (import.meta.env.DEV && import.meta.env.VITE_FUNCTIONS_EMULATOR_HOST) {
    try {
      const [host, port] = import.meta.env.VITE_FUNCTIONS_EMULATOR_HOST.split(':');
      connectFunctionsEmulator(functions, host, parseInt(port));
      console.log('🧪 Connected to Functions Emulator');
    } catch (emulatorError) {
      console.warn('⚠️  Could not connect to Functions Emulator:', emulatorError);
    }
  }

  serviceStatus.functions = { initialized: true, demoMode: isDemoMode };
  console.log('⚡ Cloud Functions initialized successfully');
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  serviceStatus.functions = { initialized: false, error: errorMessage };
  console.warn('⚠️  Cloud Functions initialization warning:', errorMessage);
  // Don't throw - functions are optional
}

// Utility functions for service management
export const FirebaseService = {
  /**
   * Get current service status
   */
  getStatus(): FirebaseServiceStatus {
    return { ...serviceStatus };
  },

  /**
   * Check if all required services are ready
   */
  isReady(): boolean {
    return (
      serviceStatus.app.initialized &&
      serviceStatus.auth.initialized &&
      serviceStatus.firestore.initialized
    );
  },

  /**
   * Check if running in demo mode
   */
  isDemoMode(): boolean {
    return isDemoMode;
  },

  /**
   * Get health check summary for ERO demonstrations
   */
  getHealthCheck(): {
    status: 'healthy' | 'degraded' | 'error' | 'demo';
    message: string;
    details: FirebaseServiceStatus;
  } {
    if (isDemoMode) {
      return {
        status: 'demo',
        message: 'Running in ERO Hui Demo Mode - Firebase services available for demonstration',
        details: serviceStatus,
      };
    }

    const errors = [
      serviceStatus.app.error,
      serviceStatus.auth.error,
      serviceStatus.firestore.error,
      serviceStatus.storage.error,
    ].filter(Boolean);

    if (errors.length > 2) {
      return {
        status: 'error',
        message: 'Multiple Firebase services failed to initialize',
        details: serviceStatus,
      };
    }

    if (errors.length > 0) {
      return {
        status: 'degraded',
        message: `Some Firebase services have issues: ${errors.join(', ')}`,
        details: serviceStatus,
      };
    }

    return {
      status: 'healthy',
      message: 'All Firebase services operational',
      details: serviceStatus,
    };
  },

  /**
   * Attempt to reconnect Firestore if offline
   */
  async reconnectFirestore(): Promise<boolean> {
    try {
      await disableNetwork(db);
      await enableNetwork(db);
      serviceStatus.firestore.connected = true;
      serviceStatus.firestore.offline = false;
      return true;
    } catch (error) {
      console.error('Failed to reconnect Firestore:', error);
      return false;
    }
  },

  /**
   * Log service status for debugging
   */
  logStatus(): void {
    console.group('🔥 Firebase Service Status');
    console.log('Demo Mode:', isDemoMode);
    console.log('App:', serviceStatus.app);
    console.log('Auth:', serviceStatus.auth);
    console.log('Firestore:', serviceStatus.firestore);
    console.log('Storage:', serviceStatus.storage);
    if (serviceStatus.analytics) console.log('Analytics:', serviceStatus.analytics);
    if (serviceStatus.functions) console.log('Functions:', serviceStatus.functions);
    console.groupEnd();
  },
};

// Export Firebase services with proper typing
export { analytics, app, auth, db, functions, storage };
export type { Analytics, Auth, FirebaseStorage, Firestore, Functions };

// Development helper
if (import.meta.env.DEV) {
  // Make Firebase services available globally for debugging
  (window as unknown as { firebase: unknown }).firebase = {
    app,
    auth,
    db,
    storage,
    analytics,
    functions,
    service: FirebaseService,
  };

  // Log initialization summary
  setTimeout(() => {
    console.log('\n🔥 Firebase Initialization Complete');
    FirebaseService.logStatus();
  }, 100);
}

export default app;
