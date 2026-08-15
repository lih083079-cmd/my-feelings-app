// Firebase Configuration & Initialization
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Default Firebase Configuration (can be overridden via localStorage or custom config)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyForAetheriaAppInitialization",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aetheria-psyche.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aetheria-psyche",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aetheria-psyche.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "102938475612",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:102938475612:web:a1b2c3d4e5f6g7h8i9j0"
};

// Retrieve any custom user-provided config from localStorage
export function getActiveFirebaseConfig() {
  try {
    const saved = localStorage.getItem('aetheria_firebase_config');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read custom firebase config', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

export function saveActiveFirebaseConfig(newConfig) {
  try {
    localStorage.setItem('aetheria_firebase_config', JSON.stringify(newConfig));
    // Reload page to re-initialize firebase with new config
    window.location.reload();
  } catch (e) {
    console.error('Failed to save firebase config', e);
  }
}

// Initialize Firebase
const firebaseConfig = getActiveFirebaseConfig();
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const db = getFirestore(app);
export default app;
