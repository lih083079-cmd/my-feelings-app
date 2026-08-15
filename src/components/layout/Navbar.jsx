import React, { useState } from 'react';
import { Sparkles, Brain, Moon, Compass, Sun, Volume2, VolumeX, Radio, BookOpen, Layers, Award, User, Crown, Cloud, Database } from 'lucide-react';
import { soundManager } from '../../audio/audioManager';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  userProProfile, 
  onOpenAuth, 
  onOpenPro, 
  onOpenFirestore,
  syncStatus 
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playChime(2);
  };

  const handleToggleAmbient = () => {
    const on = soundManager.toggleCosmicAmbient();
    setIsAmbientOn(on);
    if (on) soundManager.playSingingBowl(432, 2);
  };

  const handleNavClick = (tabId) => {
    soundManager.playChime(1);
    setActiveTab(tabId);
  };

  const navItems = [
    { id: 'hub', label: '序章全景', icon: Layers },
    { id: 'mbti', label: '荣格八维·MBTI', icon: Brain },
    { id: 'tarot', label: '塔罗潜意识', icon: Sparkles },
    { id: 'astrology', label: '本命天宫星盘', icon: Compass },
    { id: 'zodiac', label: '星座四象', icon: Sun },
    { id: 'iching', label: '周易六爻', icon: Compass },
    { id: 'dream', label: '梦境解析', icon: Moon },
    { id: 'philosophy', label: '哲学信条', icon: BookOpen },
    { id: 'report', label: '全息双镜画像', icon: Award, highlight: true }
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-purple-900/30 bg-[#070913]/85 transition-all">
      <div className="container-custom flex items-center justify-between py-3">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('hub')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-purple-600 to-indigo-800 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-purple-200 to-white">
                全息灵心镜
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold border border-amber-500/30">
                AETHERIA
              </span>
            </div>
            <p className="text-[11px] text-purple-300/70 tracking-tight hidden sm:block">
              科学与玄学·全息人格心理矩阵
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? item.highlight
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg shadow-amber-500/30'
                      : 'bg-purple-600/30 text-amber-300 border border-purple-500/40 shadow-md shadow-purple-900/30'
                    : item.highlight
                    ? 'text-amber-300 hover:bg-amber-500/10 border border-amber-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (item.highlight ? 'text-slate-950' : 'text-amber-400') : 'text-purple-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Tools: VIP Upgrade, Firestore Explorer, Google Account, Audio */}
        <div className="flex items-center gap-2">
          {/* Firestore Database Explorer Button */}
          <button
            onClick={() => {
              soundManager.playChime(4);
              onOpenFirestore();
            }}
            className="p-2 rounded-xl border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-900/40 text-cyan-300 text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            title="查看 Firestore 数据库实时文档"
          >
            <Database className="w-4 h-4 text-cyan-400" />
            <span className="hidden lg:inline text-[11px]">Firestore 数据库</span>
          </button>

          {/* Pro / Top-up Upgrade Button */}
          <button
            onClick={() => {
              soundManager.playChime(3);
              onOpenPro();
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              userProProfile?.isPro
                ? 'bg-gradient-to-r from-amber-500/20 to-purple-600/20 text-amber-300 border border-amber-400/50'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/25 hover:scale-105'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{userProProfile?.isPro ? '👑 PRO 尊享版' : '升级 PRO / 充值'}</span>
          </button>

          {/* User Profile / Login Button */}
          <button
            onClick={() => {
              soundManager.playChime(1);
              onOpenAuth();
            }}
            className="p-1.5 md:px-2.5 md:py-1.5 rounded-xl border border-purple-500/30 bg-purple-950/30 hover:bg-purple-900/40 text-slate-200 text-xs font-medium flex items-center gap-2 cursor-pointer transition-all"
            title={currentUser ? `已登录: ${currentUser.displayName}` : '点击登录 Google 账号'}
          >
            {currentUser ? (
              <img
                src={currentUser.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=Aetheria'}
                alt="Avatar"
                className="w-5 h-5 rounded-full border border-amber-400"
              />
            ) : (
              <User className="w-4 h-4 text-purple-300" />
            )}
            <span className="hidden md:inline text-[11px] truncate max-w-[100px]">
              {currentUser ? currentUser.displayName : 'Google 登录'}
            </span>
          </button>

          {/* Cosmic Ambient Drone Toggle */}
          <button
            onClick={handleToggleAmbient}
            title={isAmbientOn ? '关闭 432Hz 宇宙沉浸音景' : '开启 432Hz 宇宙沉浸音景'}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isAmbientOn
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md shadow-purple-500/20'
                : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200'
            }`}
          >
            <Radio className={`w-4 h-4 ${isAmbientOn ? 'text-purple-400 animate-pulse' : ''}`} />
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? '解除静音' : '静音交互音效'}
            className="p-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-purple-500/40 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Sub-bar */}
      <div className="xl:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-purple-900/20 bg-[#0a0e24]/90 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center gap-1 whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600/40 text-amber-300 border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3 h-3 text-purple-400" />
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
