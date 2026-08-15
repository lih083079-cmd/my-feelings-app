// Cloud Firestore Data Persistence Service
import { db } from './config';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';

// Save complete user assessment state to Cloud Firestore
export async function saveUserAssessment(uid, {
  mbtiResult,
  natalChart,
  tarotCards,
  ichingResult,
  dreamResult,
  philosophyResult,
  soulReport
}) {
  if (!uid) return { success: false, error: 'User UID missing' };

  const payload = {
    updatedAt: new Date().toISOString(),
    mbtiResult: mbtiResult || null,
    natalChart: natalChart || null,
    tarotCards: tarotCards || [],
    ichingResult: ichingResult || null,
    dreamResult: dreamResult || null,
    philosophyResult: philosophyResult || null,
    soulReport: soulReport || null
  };

  // Always save to LocalStorage as instant cache
  try {
    localStorage.setItem(`aetheria_saved_${uid}`, JSON.stringify(payload));
  } catch (e) {
    console.warn('LocalStorage save warning', e);
  }

  try {
    const userDocRef = doc(db, 'users', uid, 'assessments', 'latest');
    await setDoc(userDocRef, {
      ...payload,
      firestoreTimestamp: serverTimestamp()
    }, { merge: true });

    // Also record a snapshot into history subcollection
    const historyRef = collection(db, 'users', uid, 'history');
    await addDoc(historyRef, {
      type: 'holistic_sync',
      mbtiType: mbtiResult?.typeCode || '未测',
      sunSign: natalChart?.planets?.[0]?.sign?.name || '未测',
      tarotCount: tarotCards?.length || 0,
      createdAt: serverTimestamp(),
      isoDate: new Date().toLocaleString()
    });

    return { success: true, savedToCloud: true };
  } catch (error) {
    console.warn('Firestore Cloud Save encountered issue, saved locally:', error);
    return { success: true, savedLocally: true, error: error.message };
  }
}

// Save specific module records to Firestore subcollections
export async function saveMbtiToFirestore(uid, mbtiResult) {
  if (!uid || !mbtiResult) return;
  try {
    const mbtiCol = collection(db, 'users', uid, 'mbti_records');
    await addDoc(mbtiCol, {
      typeCode: mbtiResult.typeCode,
      typeProfile: mbtiResult.typeProfile,
      normalized: mbtiResult.normalized,
      dichotomies: mbtiResult.dichotomies,
      createdAt: serverTimestamp(),
      isoDate: new Date().toLocaleString()
    });
  } catch (e) {
    console.warn('Firestore saveMbti error:', e);
  }
}

export async function saveTarotToFirestore(uid, tarotCards) {
  if (!uid || !tarotCards || tarotCards.length === 0) return;
  try {
    const tarotCol = collection(db, 'users', uid, 'tarot_readings');
    await addDoc(tarotCol, {
      cards: tarotCards,
      cardsCount: tarotCards.length,
      createdAt: serverTimestamp(),
      isoDate: new Date().toLocaleString()
    });
  } catch (e) {
    console.warn('Firestore saveTarot error:', e);
  }
}

export async function saveAstrologyToFirestore(uid, natalChart) {
  if (!uid || !natalChart) return;
  try {
    const astroCol = collection(db, 'users', uid, 'astrology_charts');
    await addDoc(astroCol, {
      sun: natalChart.planets?.find(p => p.id === 'sun')?.sign?.name,
      moon: natalChart.planets?.find(p => p.id === 'moon')?.sign?.name,
      asc: natalChart.asc?.sign?.name,
      planets: natalChart.planets,
      houses: natalChart.houses,
      createdAt: serverTimestamp(),
      isoDate: new Date().toLocaleString()
    });
  } catch (e) {
    console.warn('Firestore saveAstrology error:', e);
  }
}

export async function saveIChingToFirestore(uid, ichingResult) {
  if (!uid || !ichingResult) return;
  try {
    const ichingCol = collection(db, 'users', uid, 'iching_readings');
    await addDoc(ichingCol, {
      primaryHexagram: ichingResult.primaryHexagram?.name,
      transformedHexagram: ichingResult.transformedHexagram?.name || null,
      changingCount: ichingResult.changingCount,
      lines: ichingResult.lines,
      createdAt: serverTimestamp(),
      isoDate: new Date().toLocaleString()
    });
  } catch (e) {
    console.warn('Firestore saveIChing error:', e);
  }
}

export async function saveDreamToFirestore(uid, dreamResult) {
  if (!uid || !dreamResult) return;
  try {
    const dreamCol = collection(db, 'users', uid, 'dream_journals');
    await addDoc(dreamCol, {
      dreamTitle: dreamResult.dreamTitle,
      emotionTone: dreamResult.emotionTone,
      dominantArchetype: dreamResult.dominantArchetype,
      subconsciousMessage: dreamResult.subconsciousMessage,
      createdAt: serverTimestamp(),
      isoDate: new Date().toLocaleString()
    });
  } catch (e) {
    console.warn('Firestore saveDream error:', e);
  }
}

export async function savePhilosophyToFirestore(uid, philosophyResult) {
  if (!uid || !philosophyResult) return;
  try {
    const philCol = collection(db, 'users', uid, 'philosophy_results');
    await addDoc(philCol, {
      primarySchool: philosophyResult.primarySchool?.name,
      secondarySchool: philosophyResult.secondarySchool?.name,
      scores: philosophyResult.scores,
      createdAt: serverTimestamp(),
      isoDate: new Date().toLocaleString()
    });
  } catch (e) {
    console.warn('Firestore savePhilosophy error:', e);
  }
}

// Load user assessment from Firestore (or LocalStorage cache fallback)
export async function loadUserAssessment(uid) {
  if (!uid) return null;

  // Check LocalStorage first for instant responsiveness
  let localData = null;
  try {
    const local = localStorage.getItem(`aetheria_saved_${uid}`);
    if (local) localData = JSON.parse(local);
  } catch (e) {
    console.error(e);
  }

  try {
    const userDocRef = doc(db, 'users', uid, 'assessments', 'latest');
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      const cloudData = docSnap.data();
      return { ...localData, ...cloudData, fromCloud: true };
    }
  } catch (error) {
    console.warn('Firestore load failed, using local cache:', error);
  }

  return localData;
}

// Save or Update User Pro Status & Energy Crystals
export async function updateUserProStatus(uid, { isPro, crystals, vipTier = 'PRO' }) {
  const profile = {
    isPro: Boolean(isPro),
    crystals: Number(crystals) || 0,
    vipTier,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(`aetheria_vip_${uid}`, JSON.stringify(profile));
  } catch (_) {}

  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, {
      ...profile,
      firestoreTimestamp: serverTimestamp()
    }, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn('Firestore profile save warning:', error);
    return { success: true, localOnly: true };
  }
}

// Load User Pro & VIP Profile
export async function loadUserProProfile(uid) {
  if (!uid) return { isPro: false, crystals: 100, vipTier: 'FREE' };

  let local = null;
  try {
    const cached = localStorage.getItem(`aetheria_vip_${uid}`);
    if (cached) local = JSON.parse(cached);
  } catch (_) {}

  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { ...local, ...snap.data() };
    }
  } catch (_) {}

  return local || { isPro: false, crystals: 100, vipTier: 'FREE' };
}

// Retrieve Firestore History Records
export async function getUserFirestoreHistory(uid) {
  if (!uid) return [];
  try {
    const historyRef = collection(db, 'users', uid, 'history');
    const q = query(historyRef, orderBy('createdAt', 'desc'), limit(20));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((d) => {
      results.push({ id: d.id, ...d.data() });
    });
    return results;
  } catch (e) {
    console.warn('Failed to load firestore history', e);
    return [];
  }
}
