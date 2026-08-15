import React, { useState } from 'react';
import { Sparkles, Shuffle, RefreshCw, Eye, HelpCircle, Layers, Compass } from 'lucide-react';
import { TAROT_SPREADS, ALL_TAROT_CARDS } from '../../data/tarotDeck';
import { soundManager } from '../../audio/audioManager';

export default function TarotModule({ tarotCards, setTarotCards }) {
  const [selectedSpread, setSelectedSpread] = useState(TAROT_SPREADS[1]); // Default: 3-card Time Flow
  const [drawnCards, setDrawnCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [activeCardModal, setActiveCardModal] = useState(null);

  const handleSelectSpread = (spread) => {
    soundManager.playChime(1);
    setSelectedSpread(spread);
    setDrawnCards([]);
  };

  const handleShuffleAndDraw = () => {
    soundManager.playCardFlip();
    setIsShuffling(true);

    setTimeout(() => {
      // Pick random cards from deck
      const shuffled = [...ALL_TAROT_CARDS].sort(() => Math.random() - 0.5);
      const count = selectedSpread.cardsCount;
      const picked = shuffled.slice(0, count).map((card, idx) => ({
        ...card,
        isReversed: Math.random() > 0.7, // 30% chance reversed
        isFlipped: false,
        positionTitle: selectedSpread.positions[idx] || `第 ${idx + 1} 牌位`
      }));

      setDrawnCards(picked);
      setTarotCards(picked);
      setIsShuffling(false);
      soundManager.playSingingBowl(528, 2.5);
    }, 800);
  };

  const handleFlipCard = (index) => {
    soundManager.playCardFlip();
    const updated = [...drawnCards];
    updated[index].isFlipped = !updated[index].isFlipped;
    setDrawnCards(updated);
    setTarotCards(updated);
  };

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              塔罗牌阵与潜意识投射
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            以 78 张象征图谱作为心理投射之镜，在共时性契机中观照当下与潜能
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleShuffleAndDraw}
          disabled={isShuffling}
          className="btn-gold text-sm cursor-pointer"
        >
          <Shuffle className={`w-4 h-4 ${isShuffling ? 'animate-spin' : ''}`} />
          {isShuffling ? '潜意识共鸣中...' : '洗牌与仪式抽牌'}
        </button>
      </div>

      {/* Spreads Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TAROT_SPREADS.map((sp) => {
          const isSelected = selectedSpread.id === sp.id;
          return (
            <div
              key={sp.id}
              onClick={() => handleSelectSpread(sp)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-purple-900/40 border-amber-400/80 shadow-lg shadow-purple-900/30'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-serif text-sm font-bold text-white">
                  {sp.name}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold">
                  {sp.cardsCount} 张牌
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {sp.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Card Table Stage */}
      <div className="glass-panel p-6 md:p-10 rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/20 via-[#0a0e28]/80 to-[#070913] min-h-[420px] flex flex-col items-center justify-center relative overflow-hidden">
        {drawnCards.length === 0 ? (
          <div className="text-center space-y-4 max-w-md my-8">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 mx-auto flex items-center justify-center text-amber-400">
              <Layers className="w-8 h-8 animate-pulse" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white">
              牌阵已就绪，静心凝神
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              在心中默想你当前最关注的问题或人生议题，随后点击上方【洗牌与仪式抽牌】按钮开启潜意识投射。
            </p>
            <button
              onClick={handleShuffleAndDraw}
              className="btn-mystic text-sm mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              开启抽取 ({selectedSpread.name})
            </button>
          </div>
        ) : (
          <div className="w-full space-y-8">
            <div className="text-center">
              <span className="text-xs text-amber-400 font-semibold tracking-wider uppercase">
                当前牌阵 · {selectedSpread.name}
              </span>
              <p className="text-xs text-slate-400 mt-0.5">点击下方每张卡牌以翻转查看潜意识投射解析</p>
            </div>

            {/* Cards Grid */}
            <div className={`grid gap-5 justify-center ${
              drawnCards.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
              drawnCards.length === 3 ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto' :
              'grid-cols-2 sm:grid-cols-5 max-w-5xl mx-auto'
            }`}>
              {drawnCards.map((card, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-2">
                  <span className="text-[11px] text-purple-300 font-semibold px-2 py-0.5 rounded-md bg-purple-500/15 border border-purple-500/20 text-center line-clamp-1">
                    {card.positionTitle}
                  </span>

                  {/* 3D Card Container */}
                  <div
                    onClick={() => handleFlipCard(idx)}
                    className="card-perspective w-44 h-72 cursor-pointer group"
                  >
                    <div className={`card-inner ${card.isFlipped ? 'flipped' : ''}`}>
                      {/* Card Back (Mystic Sacred Geometry) */}
                      <div className="card-back glass-card-gold p-3 flex flex-col items-center justify-between border-2 border-amber-500/40 bg-gradient-to-br from-[#120e2e] via-[#090b1c] to-[#1c1236] group-hover:scale-105 transition-transform duration-300">
                        <div className="w-full text-center text-[10px] text-amber-400/60 font-serif">
                          ✧ AETHERIA TAROT ✧
                        </div>
                        
                        <div className="relative w-24 h-24 rounded-full border border-amber-500/30 flex items-center justify-center bg-purple-950/40">
                          <Compass className="w-12 h-12 text-amber-400/70 animate-spin" style={{ animationDuration: '60s' }} />
                          <div className="absolute inset-2 border border-dashed border-purple-400/40 rounded-full" />
                        </div>

                        <span className="text-[11px] text-amber-300/80 font-medium flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" /> 点击翻开
                        </span>
                      </div>

                      {/* Card Front */}
                      <div className={`card-front glass-panel p-4 flex flex-col justify-between border-2 bg-gradient-to-b from-[#181133] to-[#070913] text-left ${
                        card.isReversed ? 'border-rose-500/50' : 'border-amber-400/60'
                      }`}>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-serif text-amber-400 font-bold">
                              {card.number || '★'}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              card.isReversed ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {card.isReversed ? '逆位 (Reversed)' : '正位 (Upright)'}
                            </span>
                          </div>

                          <h4 className="font-serif text-base font-bold text-white mt-1">
                            {card.name}
                          </h4>
                          <span className="text-[10px] text-purple-300/80 block">
                            {card.nameEn}
                          </span>
                        </div>

                        {/* Card Core Meaning & Archetype */}
                        <div className="space-y-1 py-2">
                          <div className="text-[11px] text-amber-200/90 font-medium leading-snug line-clamp-3">
                            {card.isReversed ? card.reversed : card.upright}
                          </div>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {card.keywords?.slice(0, 3).map((kw, i) => (
                              <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Open Details Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCardModal(card);
                          }}
                          className="w-full py-1 text-center text-[10px] font-semibold text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors border border-purple-500/20"
                        >
                          深度投射解析 ➔
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Deep Psychological Interpretation Modal */}
      {activeCardModal && (
        <div
          onClick={() => setActiveCardModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/50 max-w-lg w-full space-y-5 bg-[#0a0e28] shadow-2xl relative"
          >
            <div className="flex items-start justify-between border-b border-purple-900/40 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-serif font-bold">
                  {activeCardModal.number} · {activeCardModal.nameEn}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
                  {activeCardModal.name}
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    activeCardModal.isReversed ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {activeCardModal.isReversed ? '逆位' : '正位'}
                  </span>
                </h3>
              </div>
              <button
                onClick={() => setActiveCardModal(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs md:text-sm">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                <span className="text-amber-300 font-semibold block">荣格原型意象 (Jungian Archetype)</span>
                <p className="text-slate-200">{activeCardModal.archetype || '自性转化之光'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-purple-300 font-semibold block">牌义与象征解析</span>
                <p className="text-slate-300 leading-relaxed">
                  {activeCardModal.isReversed ? activeCardModal.reversed : activeCardModal.upright}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" /> 潜意识投射反思提问
                </span>
                <p className="text-amber-100/90 font-serif italic text-xs md:text-sm leading-relaxed">
                  “{activeCardModal.projection}”
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveCardModal(null)}
              className="btn-mystic w-full text-xs justify-center"
            >
              完成反思并返回
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
