// Firebase Authentication Service with Google Sign-In & Mock Fallback
import { auth, googleProvider } from './config';
import { 
  signInWithPopup, 
  signInWithRedirect, 
  signOut, 
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';

// Ensure persistence
try {
  setPersistence(auth, browserLocalPersistence);
} catch (e) {
  console.warn('Firebase persistence warning:', e);
}

// Sign In with Google
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return {
      success: true,
      user: {
        uid: user.uid,
        displayName: user.displayName || '灵心探索者',
        email: user.email,
        photoURL: user.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=Aetheria',
        isAnonymous: user.isAnonymous
      }
    };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    // If it's a popup blocked or demo credential error, offer clear info
    if (error.code === 'auth/popup-blocked') {
      try {
        await signInWithRedirect(auth, googleProvider);
        return { success: true, pendingRedirect: true };
      } catch (redirectErr) {
        return { success: false, error: redirectErr.message };
      }
    }
    return { success: false, error: error.message, code: error.code };
  }
}

// Guest / Demo Mock Login (allows instant testing without network/API keys setup)
export function signInMockUser(mockName = '灵心探索者 (Guest)') {
  const mockUser = {
    uid: 'guest_' + Math.random().toString(36).substring(2, 9),
    displayName: mockName,
    email: 'guest@aetheria.universe',
    photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + encodeURIComponent(mockName),
    isMock: true,
    isPro: true,
    crystals: 999
  };
  localStorage.setItem('aetheria_mock_user', JSON.stringify(mockUser));
  return mockUser;
}

export function getLocalMockUser() {
  try {
    const saved = localStorage.getItem('aetheria_mock_user');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(e);
  }
  return null;
}

// Sign Out
export async function signOutUser() {
  try {
    localStorage.removeItem('aetheria_mock_user');
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign Out Error:', error);
    return { success: false, error: error.message };
  }
}

// Subscribe to Auth State Changes
export function subscribeToAuth(callback) {
  // First check if a mock user is active
  const mockUser = getLocalMockUser();
  if (mockUser) {
    callback(mockUser);
  }

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        displayName: user.displayName || '灵心探索者',
        email: user.email,
        photoURL: user.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=Aetheria',
        isAnonymous: user.isAnonymous
      });
    } else {
      const currentMock = getLocalMockUser();
      callback(currentMock || null);
    }
  });
}
