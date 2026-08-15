import React, { useState } from 'react';
import { Crown, Sparkles, Check, Zap, Shield, Diamond, Award, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';
import { updateUserProStatus } from '../../firebase/firestoreService';
import { soundManager } from '../../audio/audioManager';

export default function ProModal({ isOpen, onClose, currentUser, userProProfile, setUserProProfile }) {
  const [selectedPlan, setSelectedPlan] = useState('lifetime');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'basic',
      name: '灵犀月卡 (Monthly)',
      price: '￥19.9',
      duration: '30 天灵力畅享',
      crystals: 300,
      badge: '基础畅享',
      highlight: false
    },
    {
      id: 'lifetime',
      name: '无极自性 · 终身 PRO 会员',
      price: '￥88',
      originalPrice: '￥299',
      duration: '永久解锁 · 终身无限',
      crystals: 9999,
      badge: '最高人气 · 推荐',
      highlight: true
    },
    {
      id: 'crystals_pack',
      name: '灵力晶石充值包',
      price: '￥9.9',
      duration: '充值 100 灵力晶石',
      crystals: 100,
      badge: '单次补充',
      highlight: false
    }
  ];

  const privileges = [
    '解锁「全息灵心双镜」终极深度合一报告与高阶心理导师长文寄语',
    '无限次抽取 10 张凯尔特十字深度塔罗牌阵与投射解析',
    '完整推算十大人格行星落入十二宫位及主要相位能量网',
    '周易六十四卦六爻动爻深度演化与互卦变卦系统指引',
    '梦境深度荣格积极想象 (Active Imagination) 智能心灵解码',
    'Cloud Firestore 云端数据库自动实时云同步与多端永不丢失',
    '尊贵 Cosmic Gold 宇宙白金专属光晕与专属探索者头像框'
  ];

  const handleUpgrade = async () => {
    soundManager.playSingingBowl(528, 3);
    setIsProcessing(true);

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#fbbf24', '#a855f7', '#38bdf8']
    });

    const uid = currentUser?.uid || 'guest_user';
    const newProfile = {
      isPro: true,
      vipTier: selectedPlan === 'lifetime' ? 'LIFETIME_PRO' : 'PRO',
      crystals: (userProProfile?.crystals || 0) + (selectedPlan === 'lifetime' ? 9999 : 300)
    };

    await updateUserProStatus(uid, newProfile);
    setUserProProfile(newProfile);

    setTimeout(() => {
      setIsProcessing(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel p-6 md:p-10 rounded-3xl border-2 border-amber-400/60 max-w-xl w-full space-y-6 bg-gradient-to-b from-[#181135] via-[#0b0e27] to-[#070913] shadow-2xl shadow-amber-500/20 relative max-h-[90vh] overflow-y-auto"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-purple-900/40 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#070913] rounded-[14px] flex items-center justify-center">
                <Crown className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
                  升级 PRO · 尊享无极特权
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  VIP 充值中心
                </span>
              </div>
              <p className="text-xs text-purple-300">
                开启全息灵心镜最高维度心智洞察与云端专属特权
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

        {/* User Balance Bar */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
          <span className="text-slate-300 flex items-center gap-1.5">
            <Diamond className="w-4 h-4 text-cyan-400" />
            当前灵力晶石余额：
            <strong className="text-amber-300 text-sm font-serif">{userProProfile?.crystals || 100}</strong>
          </span>
          <span className="text-emerald-400 font-semibold text-[11px]">
            {userProProfile?.isPro ? '👑 已激活 PRO 会员' : '普通探索者'}
          </span>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {plans.map((p) => {
            const isSelected = selectedPlan === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  soundManager.playChime(2);
                  setSelectedPlan(p.id);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.03]'
                    : 'bg-white/5 border-white/10 hover:border-purple-500/40 hover:bg-white/10'
                }`}
              >
                {p.highlight && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-bl-lg">
                    {p.badge}
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-xs font-serif font-bold text-white block">
                    {p.name}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-serif text-amber-300">
                      {p.price}
                    </span>
                    {p.originalPrice && (
                      <span className="text-[10px] text-slate-500 line-through">
                        {p.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-purple-200 space-y-0.5">
                  <p>{p.duration}</p>
                  <p className="text-amber-400/90 font-semibold">赠 {p.crystals} 晶石</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privileges Checklist */}
        <div className="space-y-3 pt-2">
          <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-400" />
            PRO 会员专享 7 大终极权益：
          </span>
          <div className="space-y-2">
            {privileges.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade / Top-up Action Button */}
        <button
          onClick={handleUpgrade}
          disabled={isProcessing}
          className="w-full py-3.5 rounded-2xl btn-gold text-sm font-bold justify-center shadow-xl shadow-amber-500/30 cursor-pointer"
        >
          <Crown className="w-4 h-4" />
          {isProcessing ? '正在极速激活 PRO 特权...' : `立即充值升级 · ${plans.find(p => p.id === selectedPlan)?.price}`}
        </button>
      </div>
    </div>
  );
}
