import React, { useState } from 'react';
import { RefreshCw, Sparkles, Compass, ShieldCheck, AlertCircle, CircleDot, Play } from 'lucide-react';
import { TRIGRAMS, WU_XING, HEXAGRAMS, getHexagramByCode } from '../../data/ichingData';
import { tossCoins, compileHexagram } from '../../utils/ichingEngine';
import { soundManager } from '../../audio/audioManager';

export default function IChingModule({ ichingResult, setIchingResult }) {
  const [castLines, setCastLines] = useState([]);
  const [isTossing, setIsTossing] = useState(false);
  const [currentTossCoins, setCurrentTossCoins] = useState([3, 3, 3]);
  const [activeTrigramModal, setActiveTrigramModal] = useState(null);

  const handleTossOnce = () => {
    if (castLines.length >= 6) return;
    soundManager.playCoinToss();
    setIsTossing(true);

    setTimeout(() => {
      const toss = tossCoins();
      setCurrentTossCoins(toss.coins);
      const updatedLines = [...castLines, toss];
      setCastLines(updatedLines);
      setIsTossing(false);

      if (updatedLines.length === 6) {
        // Complete 6 lines cast!
        const result = compileHexagram(updatedLines);
        setIchingResult(result);
        soundManager.playSingingBowl(432, 3);
      }
    }, 600);
  };

  const handleFastCast = () => {
    soundManager.playCoinToss();
    const lines = [];
    for (let i = 0; i < 6; i++) {
      lines.push(tossCoins());
    }
    setCastLines(lines);
    const result = compileHexagram(lines);
    setIchingResult(result);
    soundManager.playSingingBowl(528, 2.5);
  };

  const handleReset = () => {
    soundManager.playChime(1);
    setCastLines([]);
    setIchingResult(null);
  };

  const currentPrimary = ichingResult?.primaryHexagram || (castLines.length === 6 ? getHexagramByCode(castLines.map(l => l.bit).join('')) : null);
  const currentTransformed = ichingResult?.transformedHexagram;

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              周易六爻起卦与五行生克
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            以东方系统论与阴阳流变模型为底层，模拟传统三钱法，推演情境决策与本卦变卦
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleFastCast}
            className="btn-outline text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            一键太极起卦
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs"
            title="重置卦象"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Casting Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Coin Tossing Simulator & Line Builder (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 to-[#0a0e28] space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-serif text-sm font-bold text-amber-300">
              三钱法仪式起卦 (第 {castLines.length} / 6 爻)
            </span>
            <span className="text-[11px] text-purple-300 font-medium">
              自下而上生成
            </span>
          </div>

          {/* 3 Coins Visualizer */}
          <div className="flex items-center justify-center gap-4 py-4">
            {currentTossCoins.map((coinVal, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 rounded-full border-2 border-amber-400/80 bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-lg shadow-amber-500/20 flex items-center justify-center text-slate-950 font-bold font-serif relative ${
                  isTossing ? 'coin-flipping' : ''
                }`}
              >
                <div className="w-5 h-5 border border-amber-900/60 bg-amber-600/40 rounded-sm flex items-center justify-center text-[9px] text-amber-950">
                  通
                </div>
                <span className="absolute text-[8px] bottom-1 text-amber-950/80 font-mono">
                  {coinVal === 3 ? '阳(3)' : '阴(2)'}
                </span>
              </div>
            ))}
          </div>

          {/* Toss Action Button */}
          <button
            onClick={handleTossOnce}
            disabled={castLines.length >= 6 || isTossing}
            className={`w-full py-3 rounded-2xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              castLines.length >= 6
                ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                : 'btn-gold shadow-lg shadow-amber-500/25'
            }`}
          >
            <Play className="w-4 h-4" />
            {castLines.length >= 6 ? '六爻已圆满成卦' : isTossing ? '铜钱翻滚中...' : `抛掷第 ${castLines.length + 1} 爻`}
          </button>

          {/* 6-Line Hexagram Visualizer (from line 6 at top to line 1 at bottom) */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] text-slate-400 block text-center">爻位实时图谱 (自初爻至上爻)</span>
            <div className="space-y-1.5 max-w-xs mx-auto">
              {[5, 4, 3, 2, 1, 0].map((lineIndex) => {
                const line = castLines[lineIndex];
                const lineNames = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
                return (
                  <div
                    key={lineIndex}
                    className={`p-2 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      line
                        ? line.isChanging
                          ? 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                          : 'bg-white/5 border-white/10 text-white'
                        : 'bg-slate-900/40 border-dashed border-slate-700/50 text-slate-600'
                    }`}
                  >
                    <span className="font-serif text-[11px] w-12">{lineNames[lineIndex]}</span>
                    
                    {/* Line graphic */}
                    <div className="flex-1 flex justify-center items-center px-4">
                      {line ? (
                        line.bit === 1 ? (
                          // Yang Line (Continuous)
                          <div className="w-32 h-2.5 bg-amber-400 rounded-sm shadow-sm shadow-amber-400/50" />
                        ) : (
                          // Yin Line (Broken)
                          <div className="w-32 flex justify-between">
                            <div className="w-14 h-2.5 bg-purple-400 rounded-sm" />
                            <div className="w-14 h-2.5 bg-purple-400 rounded-sm" />
                          </div>
                        )
                      ) : (
                        <span className="text-[10px] text-slate-600">待掷</span>
                      )}
                    </div>

                    <span className="text-[10px] w-14 text-right">
                      {line ? line.name.split(' ')[0] : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Hexagram Interpretation & Wisdom (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {currentPrimary ? (
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/15 via-[#0c102c]/80 to-[#070913] space-y-6">
              {/* Primary Hexagram Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      本卦 · 第 {currentPrimary.number} 卦
                    </span>
                    <span className="text-xs text-purple-300">
                      上{currentPrimary.upper} 下{currentPrimary.lower}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-white mt-1">
                    {currentPrimary.name} ({currentPrimary.pinyin})
                  </h3>
                </div>

                <div className="flex flex-wrap gap-1">
                  {currentPrimary.keywords?.map((kw, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-amber-300">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Classic Judgement & Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                  <span className="text-amber-300 font-semibold block">【卦辞 · 彖传】</span>
                  <p className="text-slate-200 font-serif leading-relaxed">
                    “{currentPrimary.judgement}”
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                  <span className="text-blue-300 font-semibold block">【大象传 · 君子之道】</span>
                  <p className="text-slate-200 font-serif leading-relaxed">
                    “{currentPrimary.image}”
                  </p>
                </div>
              </div>

              {/* Modern Psychological & Systemic Decisive Guidance */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <span className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs md:text-sm">
                  <ShieldCheck className="w-4 h-4" /> 现代系统论与情境决策指导
                </span>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentPrimary.modernPsych}
                </p>
              </div>

              {/* Transformed Hexagram (if any changing lines) */}
              {currentTransformed && (
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                      变卦 · 演变未来
                    </span>
                    <h4 className="font-serif text-lg font-bold text-white">
                      {currentTransformed.name} (第 {currentTransformed.number} 卦)
                    </h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    因动爻触发，当前能量正在向【{currentTransformed.name}】演进：{currentTransformed.modernPsych}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 mx-auto flex items-center justify-center text-amber-400">
                <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '30s' }} />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                易道流转，静候起卦
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                点击左侧【抛掷铜钱】逐步起爻，或点击右上角【一键太极起卦】立即推演六十四卦。
              </p>
            </div>
          )}

          {/* 3D Bagua Trigrams Compass Preview */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
                <CircleDot className="w-4 h-4 text-amber-400" />
                先天八卦元能矩阵
              </h3>
              <span className="text-xs text-slate-400">点击卦象查看对应心智能量</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(TRIGRAMS).map(([code, tri]) => (
                <div
                  key={code}
                  onClick={() => {
                    soundManager.playChime(3);
                    setActiveTrigramModal(tri);
                  }}
                  className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all cursor-pointer text-center space-y-1"
                >
                  <span className="text-2xl font-serif text-amber-400">{tri.symbol}</span>
                  <div className="flex items-center justify-center gap-1">
                    <span className="font-serif text-sm font-bold text-white">{tri.name}</span>
                    <span className="text-[10px] text-slate-400">({tri.nature})</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 block">
                    {tri.attribute} · {tri.element}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trigram Details Modal */}
      {activeTrigramModal && (
        <div
          onClick={() => setActiveTrigramModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/50 max-w-md w-full space-y-4 bg-[#0a0e28] shadow-2xl relative"
          >
            <div className="flex items-start justify-between border-b border-purple-900/40 pb-3">
              <div>
                <span className="text-3xl font-serif text-amber-400">{activeTrigramModal.symbol}</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {activeTrigramModal.name}卦 · {activeTrigramModal.nature} ({activeTrigramModal.attribute})
                </h3>
              </div>
              <button
                onClick={() => setActiveTrigramModal(null)}
                className="text-slate-400 hover:text-white font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-purple-300 font-semibold block mb-1">五行归属</span>
                <p className="text-slate-300">{activeTrigramModal.element} 属性</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-300 font-semibold block mb-1">心理动力学映射</span>
                <p className="text-slate-300 leading-relaxed">{activeTrigramModal.psych}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveTrigramModal(null)}
              className="btn-mystic w-full text-xs justify-center"
            >
              领悟并返回
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
