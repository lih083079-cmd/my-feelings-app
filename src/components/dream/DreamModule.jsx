import React, { useState } from 'react';
import { Moon, Sparkles, BookOpen, Compass, Eye, ShieldAlert, HeartHandshake, HelpCircle } from 'lucide-react';
import { DREAM_THEORIES, DREAM_SYMBOLS, analyzeDreamText } from '../../data/dreamData';
import { soundManager } from '../../audio/audioManager';

export default function DreamModule({ dreamResult, setDreamResult }) {
  const [dreamTitle, setDreamTitle] = useState('在星空下的无垠回廊翱翔');
  const [dreamContent, setDreamContent] = useState('梦见自己突然从一座高耸的古代神庙边缘一跃而下，但没有坠落，反而迎风飞翔，掠过一片澄澈深邃的大海，水底仿佛有一座发光的古城...');
  const [emotionTone, setEmotionTone] = useState('震撼、自由但隐隐有对未知的敬畏');
  const [selectedSymbols, setSelectedSymbols] = useState(['flight', 'water_ocean']);
  const [activeSymbolModal, setActiveSymbolModal] = useState(null);

  const handleAnalyze = () => {
    soundManager.playSingingBowl(528, 2.5);
    const result = analyzeDreamText({
      dreamTitle,
      dreamContent,
      emotionTone,
      mainSymbols: selectedSymbols
    });
    setDreamResult(result);
  };

  const toggleSymbolTag = (id) => {
    soundManager.playChime(2);
    if (selectedSymbols.includes(id)) {
      setSelectedSymbols(selectedSymbols.filter(s => s !== id));
    } else {
      setSelectedSymbols([...selectedSymbols, id]);
    }
  };

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Moon className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              梦境解析与潜意识破译
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            融合弗洛伊德欲望隐喻与荣格自性补偿理论，破译夜间心灵密语
          </p>
        </div>

        <button
          onClick={handleAnalyze}
          className="btn-gold text-xs"
        >
          <Sparkles className="w-4 h-4" />
          破译当前梦境
        </button>
      </div>

      {/* Dual Theory Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Freud */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-purple-300">
              {DREAM_THEORIES.freud.name}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200">
              欲望与压抑解构
            </span>
          </div>
          <p className="text-xs text-amber-200/90 font-serif italic">
            “{DREAM_THEORIES.freud.coreConcept}”
          </p>
          <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
            {DREAM_THEORIES.freud.keyMechanisms.slice(0, 2).map((m, i) => (
              <li key={i}><span className="text-purple-400 font-semibold">{m.term}</span>: {m.desc}</li>
            ))}
          </ul>
        </div>

        {/* Jung */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-cyan-300">
              {DREAM_THEORIES.jung.name}
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200">
              自性补偿与积极想象
            </span>
          </div>
          <p className="text-xs text-cyan-200/90 font-serif italic">
            “{DREAM_THEORIES.jung.coreConcept}”
          </p>
          <ul className="text-[11px] text-slate-300 space-y-1 pt-1">
            {DREAM_THEORIES.jung.keyMechanisms.slice(0, 2).map((m, i) => (
              <li key={i}><span className="text-cyan-400 font-semibold">{m.term}</span>: {m.desc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Dream Input & Decoder Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Dream Journal Input (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4 bg-gradient-to-b from-purple-950/20 to-[#0a0e28]">
          <h3 className="font-serif text-base font-bold text-amber-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> 潜意识梦境记录本
          </h3>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">梦境主题 / 标题</label>
            <input
              type="text"
              value={dreamTitle}
              onChange={(e) => setDreamTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
              placeholder="例如：在无垠大海上翱翔..."
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">梦境剧情与场景叙述</label>
            <textarea
              rows="5"
              value={dreamContent}
              onChange={(e) => setDreamContent(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none leading-relaxed"
              placeholder="尽可能详细记录你在梦中看到的画面、人物、动作与奇幻细节..."
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">醒来时的核心情绪氛围</label>
            <input
              type="text"
              value={emotionTone}
              onChange={(e) => setEmotionTone(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
              placeholder="例如：恐惧、释怀、欣喜、困惑..."
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1.5">核心意象标签（多选）：</label>
            <div className="flex flex-wrap gap-1.5">
              {DREAM_SYMBOLS.map((sym) => {
                const isSelected = selectedSymbols.includes(sym.id);
                return (
                  <button
                    key={sym.id}
                    onClick={() => toggleSymbolTag(sym.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {sym.name.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            className="btn-mystic w-full text-xs justify-center"
          >
            <Sparkles className="w-4 h-4" />
            生成深度梦境剖析
          </button>
        </div>

        {/* Right: Decoding Results & Active Imagination (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {dreamResult ? (
            <div className="glass-panel p-6 md:p-8 rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/20 via-[#0a0e28] to-[#070913] space-y-6">
              <div className="border-b border-purple-900/30 pb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                  破译原型: {dreamResult.dominantArchetype}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {dreamResult.dreamTitle}
                </h3>
              </div>

              {/* Subconscious message */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
                <span className="text-amber-300 font-semibold text-xs flex items-center gap-1.5">
                  <Eye className="w-4 h-4" /> 潜意识补偿性核心密语
                </span>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {dreamResult.subconsciousMessage}
                </p>
              </div>

              {/* Matched Symbols Dual Breakdown */}
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-semibold block">核心意象双重释义：</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dreamResult.matchedSymbols?.map((sym) => (
                    <div
                      key={sym.id}
                      onClick={() => setActiveSymbolModal(sym)}
                      className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 hover:bg-white/10 transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-bold text-amber-300">{sym.name}</span>
                        <span className="text-[10px] text-purple-300">{sym.category}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">
                        {sym.jungView}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Imagination Guide */}
              <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <span className="text-amber-400 font-semibold flex items-center gap-1.5 text-xs md:text-sm">
                  <HeartHandshake className="w-4 h-4" /> 荣格“积极想象 (Active Imagination)”心灵对话指南
                </span>
                <p className="text-xs md:text-sm text-amber-100/90 font-serif italic leading-relaxed">
                  {dreamResult.activeImaginationPrompt}
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 text-center space-y-4 py-16">
              <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 mx-auto flex items-center justify-center text-indigo-400">
                <Moon className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                潜意识大门等待开启
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                在左侧记录你的梦境或直接点击【破译当前梦境】获取原型分析与积极想象指南。
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Dream Symbol Encyclopedia Gallery */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
        <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          潜意识梦境经典象征意象词典 (10 大核心原型)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {DREAM_SYMBOLS.map((sym) => (
            <div
              key={sym.id}
              onClick={() => {
                soundManager.playChime(3);
                setActiveSymbolModal(sym);
              }}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all cursor-pointer space-y-1 text-center"
            >
              <span className="font-serif text-xs font-bold text-white block">{sym.name}</span>
              <span className="text-[10px] text-purple-300 block">{sym.archetype}</span>
              <span className="text-[9px] text-slate-500 block">{sym.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Symbol Modal */}
      {activeSymbolModal && (
        <div
          onClick={() => setActiveSymbolModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/50 max-w-lg w-full space-y-4 bg-[#0a0e28] shadow-2xl relative"
          >
            <div className="flex items-start justify-between border-b border-purple-900/40 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-bold">{activeSymbolModal.category} · {activeSymbolModal.archetype}</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {activeSymbolModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveSymbolModal(null)}
                className="text-slate-400 hover:text-white font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-purple-300 font-semibold block mb-1">弗洛伊德视角 (欲望与本能)</span>
                <p className="text-slate-300 leading-relaxed">{activeSymbolModal.freudView}</p>
              </div>

              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-cyan-300 font-semibold block mb-1">荣格分析心理学视角 (原型与自性补偿)</span>
                <p className="text-slate-300 leading-relaxed">{activeSymbolModal.jungView}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-300 font-semibold block mb-1 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> 觉察与反思之问
                </span>
                <p className="text-slate-200 font-serif italic">{activeSymbolModal.reflection}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveSymbolModal(null)}
              className="btn-mystic w-full text-xs justify-center"
            >
              领悟完毕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
