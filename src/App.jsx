import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import CosmicBackground from './components/layout/CosmicBackground';
import HubOverview from './components/hub/HubOverview';
import MbtiModule from './components/mbti/MbtiModule';
import TarotModule from './components/tarot/TarotModule';
import AstrologyModule from './components/astrology/AstrologyModule';
import ZodiacModule from './components/zodiac/ZodiacModule';
import IChingModule from './components/iching/IChingModule';
import DreamModule from './components/dream/DreamModule';
import PhilosophyModule from './components/philosophy/PhilosophyModule';
import HolisticReportModule from './components/report/HolisticReportModule';
import AuthModal from './components/auth/AuthModal';
import ProModal from './components/vip/ProModal';
import FirestoreExplorerModal from './components/firestore/FirestoreExplorerModal';

import { subscribeToAuth } from './firebase/authService';
import { 
  saveUserAssessment, 
  loadUserAssessment, 
  loadUserProProfile,
  saveMbtiToFirestore,
  saveTarotToFirestore,
  saveAstrologyToFirestore,
  saveIChingToFirestore,
  saveDreamToFirestore,
  savePhilosophyToFirestore
} from './firebase/firestoreService';

export default function App() {
  const [activeTab, setActiveTab] = useState('hub');

  // Shared holistic states across modules
  const [mbtiResult, setMbtiResult] = useState(null);
  const [natalChart, setNatalChart] = useState(null);
  const [tarotCards, setTarotCards] = useState([]);
  const [ichingResult, setIchingResult] = useState(null);
  const [dreamResult, setDreamResult] = useState(null);
  const [philosophyResult, setPhilosophyResult] = useState(null);

  // User Auth, Pro VIP & Firestore states
  const [currentUser, setCurrentUser] = useState(null);
  const [userProProfile, setUserProProfile] = useState({ isPro: false, crystals: 100, vipTier: 'FREE' });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [isFirestoreModalOpen, setIsFirestoreModalOpen] = useState(false);
  const [syncToast, setSyncToast] = useState('');

  // Subscribe to Auth state on mount
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Load user's VIP & Pro profile
        const proProfile = await loadUserProProfile(user.uid);
        setUserProProfile(proProfile);

        // Load user's saved assessments from Firestore
        const savedData = await loadUserAssessment(user.uid);
        if (savedData) {
          if (savedData.mbtiResult) setMbtiResult(savedData.mbtiResult);
          if (savedData.natalChart) setNatalChart(savedData.natalChart);
          if (savedData.tarotCards?.length > 0) setTarotCards(savedData.tarotCards);
          if (savedData.ichingResult) setIchingResult(savedData.ichingResult);
          if (savedData.dreamResult) setDreamResult(savedData.dreamResult);
          if (savedData.philosophyResult) setPhilosophyResult(savedData.philosophyResult);
          
          showToast('✨ 已成功从 Cloud Firestore 恢复云端灵魂档案');
        }
      }
    });

    return () => unsubscribe && unsubscribe();
  }, []);

  const showToast = (msg) => {
    setSyncToast(msg);
    setTimeout(() => setSyncToast(''), 4000);
  };

  // Cloud Sync Handler
  const handleSyncCloud = async (user = currentUser) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const res = await saveUserAssessment(user.uid, {
      mbtiResult,
      natalChart,
      tarotCards,
      ichingResult,
      dreamResult,
      philosophyResult
    });

    if (res.savedToCloud) {
      showToast('☁️ 已成功实时同步到 Cloud Firestore 数据库');
    } else {
      showToast('💾 数据已保存到本地安全缓存');
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070913] text-slate-100 selection:bg-purple-600 selection:text-white font-sans">
      {/* Dynamic Animated Cosmic Canvas Background */}
      <CosmicBackground />

      {/* Cloud Sync Toast Notification */}
      {syncToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-900/90 to-[#0c102c]/90 border border-amber-400/60 text-amber-300 text-xs font-semibold shadow-2xl backdrop-blur-md animate-fadeIn flex items-center gap-2">
          <span>{syncToast}</span>
        </div>
      )}

      {/* Main App Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          currentUser={currentUser}
          userProProfile={userProProfile}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onOpenPro={() => setIsProModalOpen(true)}
          onOpenFirestore={() => setIsFirestoreModalOpen(true)}
          syncStatus="云端已连接"
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 container-custom py-6">
          {activeTab === 'hub' && (
            <HubOverview
              setActiveTab={setActiveTab}
              mbtiResult={mbtiResult}
              natalChart={natalChart}
              tarotCards={tarotCards}
              ichingResult={ichingResult}
              philosophyResult={philosophyResult}
            />
          )}

          {activeTab === 'mbti' && (
            <MbtiModule
              mbtiResult={mbtiResult}
              setMbtiResult={(res) => {
                setMbtiResult(res);
                if (currentUser) {
                  saveMbtiToFirestore(currentUser.uid, res);
                  handleSyncCloud(currentUser);
                }
              }}
            />
          )}

          {activeTab === 'tarot' && (
            <TarotModule
              tarotCards={tarotCards}
              setTarotCards={(cards) => {
                setTarotCards(cards);
                if (currentUser) {
                  saveTarotToFirestore(currentUser.uid, cards);
                  handleSyncCloud(currentUser);
                }
              }}
            />
          )}

          {activeTab === 'astrology' && (
            <AstrologyModule
              natalChart={natalChart}
              setNatalChart={(chart) => {
                setNatalChart(chart);
                if (currentUser) {
                  saveAstrologyToFirestore(currentUser.uid, chart);
                  handleSyncCloud(currentUser);
                }
              }}
            />
          )}

          {activeTab === 'zodiac' && (
            <ZodiacModule />
          )}

          {activeTab === 'iching' && (
            <IChingModule
              ichingResult={ichingResult}
              setIchingResult={(res) => {
                setIchingResult(res);
                if (currentUser) {
                  saveIChingToFirestore(currentUser.uid, res);
                  handleSyncCloud(currentUser);
                }
              }}
            />
          )}

          {activeTab === 'dream' && (
            <DreamModule
              dreamResult={dreamResult}
              setDreamResult={(res) => {
                setDreamResult(res);
                if (currentUser) {
                  saveDreamToFirestore(currentUser.uid, res);
                  handleSyncCloud(currentUser);
                }
              }}
            />
          )}

          {activeTab === 'philosophy' && (
            <PhilosophyModule
              philosophyResult={philosophyResult}
              setPhilosophyResult={(res) => {
                setPhilosophyResult(res);
                if (currentUser) {
                  savePhilosophyToFirestore(currentUser.uid, res);
                  handleSyncCloud(currentUser);
                }
              }}
            />
          )}

          {activeTab === 'report' && (
            <HolisticReportModule
              mbtiResult={mbtiResult}
              natalChart={natalChart}
              tarotCards={tarotCards}
              ichingResult={ichingResult}
              dreamResult={dreamResult}
              philosophyResult={philosophyResult}
              setActiveTab={setActiveTab}
            />
          )}
        </main>

        {/* Aesthetic Footer */}
        <footer className="border-t border-purple-900/30 bg-[#070913]/90 py-8 mt-12 backdrop-blur-md">
          <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-slate-300">全息灵心镜 Aetheria</span>
              <span>· 科学解构心理机制，玄学映照潜意识图景</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px]">
              <button onClick={() => setActiveTab('mbti')} className="hover:text-purple-400">MBTI认知八维</button>
              <button onClick={() => setActiveTab('tarot')} className="hover:text-purple-400">塔罗潜意识</button>
              <button onClick={() => setActiveTab('astrology')} className="hover:text-purple-400">本命星盘</button>
              <button onClick={() => setActiveTab('iching')} className="hover:text-purple-400">周易六爻</button>
              <button onClick={() => setActiveTab('dream')} className="hover:text-purple-400">梦境解析</button>
              <button onClick={() => setActiveTab('philosophy')} className="hover:text-purple-400">哲学信条</button>
              <button onClick={() => setIsFirestoreModalOpen(true)} className="text-cyan-400 hover:text-cyan-300 font-semibold">Firestore 数据库</button>
              <button onClick={() => setActiveTab('report')} className="text-amber-400 hover:text-amber-300 font-semibold">全息综合画像</button>
            </div>
          </div>
        </footer>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onSyncCloud={handleSyncCloud}
      />

      {/* Pro VIP & Top-up Modal */}
      <ProModal
        isOpen={isProModalOpen}
        onClose={() => setIsProModalOpen(false)}
        currentUser={currentUser}
        userProProfile={userProProfile}
        setUserProProfile={setUserProProfile}
      />

      {/* Firestore Real-time Database Inspector Modal */}
      <FirestoreExplorerModal
        isOpen={isFirestoreModalOpen}
        onClose={() => setIsFirestoreModalOpen(false)}
        currentUser={currentUser}
        onForceSync={() => handleSyncCloud(currentUser)}
      />
    </div>
  );
}
