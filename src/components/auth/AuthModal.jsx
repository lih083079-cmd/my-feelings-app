import React, { useState } from 'react';
import { LogIn, LogOut, User, Sparkles, Cloud, CheckCircle2, Shield, Settings, Key, AlertCircle } from 'lucide-react';
import { signInWithGoogle, signInMockUser, signOutUser } from '../../firebase/authService';
import { getActiveFirebaseConfig, saveActiveFirebaseConfig } from '../../firebase/config';
import { soundManager } from '../../audio/audioManager';

export default function AuthModal({ isOpen, onClose, currentUser, setCurrentUser, onSyncCloud, syncStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfigEditor, setShowConfigEditor] = useState(false);
  const [customConfig, setCustomConfig] = useState(getActiveFirebaseConfig());

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    soundManager.playSingingBowl(528, 2);
    setIsLoading(true);
    setErrorMessage('');

    const res = await signInWithGoogle();
    setIsLoading(false);

    if (res.success && res.user) {
      setCurrentUser(res.user);
      onSyncCloud(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || '登录受限或取消，您可使用下方【一键免密访客快速体验】');
    }
  };

  const handleMockLogin = () => {
    soundManager.playChime(3);
    const user = signInMockUser('灵心探索者 · 尊享版');
    setCurrentUser(user);
    onSyncCloud(user);
    onClose();
  };

  const handleLogout = async () => {
    soundManager.playChime(1);
    await signOutUser();
    setCurrentUser(null);
    onClose();
  };

  const handleSaveCustomConfig = () => {
    soundManager.playSingingBowl(432, 2);
    saveActiveFirebaseConfig(customConfig);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/50 max-w-md w-full space-y-6 bg-[#0a0e28] shadow-2xl relative"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-purple-900/40 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-purple-600 p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#070913] rounded-[9px] flex items-center justify-center">
                <User className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">
                {currentUser ? '灵心档案与云端账号' : '登录 / 连接灵心账号'}
              </h3>
              <p className="text-[11px] text-purple-300">
                {currentUser ? '已开启 Cloud Firestore 实时同步' : '登录后跨设备云端保存所有测评与历史'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white font-bold text-lg p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Current User Logged In View */}
        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-[#120f33] border border-purple-500/30 flex items-center gap-3">
              <img
                src={currentUser.photoURL || 'https://api.dicebear.com/7.x/bottts/svg?seed=Aetheria'}
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-amber-400/80 bg-slate-900"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif text-sm font-bold text-white truncate">
                    {currentUser.displayName}
                  </h4>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 shrink-0">
                    VIP 探索者
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                  <Cloud className="w-3 h-3" /> {syncStatus || '已与 Cloud Firestore 同步'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => {
                  soundManager.playSingingBowl(528, 2);
                  onSyncCloud(currentUser);
                }}
                className="btn-gold justify-center text-xs"
              >
                <Cloud className="w-4 h-4" /> 立即上传同步
              </button>

              <button
                onClick={handleLogout}
                className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300 hover:bg-rose-900/30 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /> 退出登录
              </button>
            </div>
          </div>
        ) : (
          /* Login Form */
          <div className="space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Google One-Click Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-lg hover:shadow-xl cursor-pointer"
            >
              {/* Google Colored G Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              {isLoading ? '正在连接 Google 授权...' : '使用 Google 账号一键登录'}
            </button>

            {/* Instant Guest Mock Login */}
            <button
              onClick={handleMockLogin}
              className="btn-mystic w-full text-xs justify-center py-3 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              一键开启本地免密体验 (赠送 Pro 权限与 999 灵石)
            </button>

            <div className="pt-2 text-center">
              <button
                onClick={() => setShowConfigEditor(!showConfigEditor)}
                className="text-[11px] text-slate-400 hover:text-purple-300 flex items-center gap-1 mx-auto cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                {showConfigEditor ? '收起自定义 Firebase 配置' : '配置自定义 Firebase 项目参数'}
              </button>
            </div>

            {/* Custom Firebase Config Accordion */}
            {showConfigEditor && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs animate-fadeIn">
                <span className="text-[11px] text-amber-300 font-semibold block">
                  连接您在 Firebase Console 创建的项目：
                </span>
                <div>
                  <label className="text-[10px] text-slate-400 block">API Key</label>
                  <input
                    type="text"
                    value={customConfig.apiKey}
                    onChange={(e) => setCustomConfig({ ...customConfig, apiKey: e.target.value })}
                    className="w-full p-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Project ID</label>
                  <input
                    type="text"
                    value={customConfig.projectId}
                    onChange={(e) => setCustomConfig({ ...customConfig, projectId: e.target.value })}
                    className="w-full p-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block">Auth Domain</label>
                  <input
                    type="text"
                    value={customConfig.authDomain}
                    onChange={(e) => setCustomConfig({ ...customConfig, authDomain: e.target.value })}
                    className="w-full p-1.5 rounded-lg bg-black/40 border border-white/10 text-white text-[11px]"
                  />
                </div>
                <button
                  onClick={handleSaveCustomConfig}
                  className="btn-gold w-full text-xs justify-center py-1.5 mt-1"
                >
                  保存并重载配置
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
