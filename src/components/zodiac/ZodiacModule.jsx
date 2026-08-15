import React, { useState } from 'react';
import { Sun, Sparkles, Heart, Zap, Shield, Flame, Droplets, Wind, Mountain } from 'lucide-react';
import { ZODIAC_SIGNS } from '../../data/astrologyData';
import { soundManager } from '../../audio/audioManager';

export default function ZodiacModule() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeSign, setActiveSign] = useState(ZODIAC_SIGNS[7]); // Scorpio default
  const [synergyA, setSynergyA] = useState(ZODIAC_SIGNS[7]);
  const [synergyB, setSynergyB] = useState(ZODIAC_SIGNS[11]); // Pisces

  const filteredSigns = selectedFilter === 'all' 
    ? ZODIAC_SIGNS 
    : ZODIAC_SIGNS.filter(s => s.element === selectedFilter);

  const calculateSynergy = (signA, signB) => {
    let score = 75;
    let title = '相互吸引与互补';
    let advice = '你们在某些认知视角上有着奇妙的互补，通过真诚沟通能激发强烈的创造火花。';

    if (signA.element === signB.element) {
      score = 94;
      title = '同频共振 · 灵魂知己';
      advice = '你们流淌着相同的元素血液，无需过多言语即可心领神会，极具天然的默契与信任。';
    } else if (
      (signA.element === '火' && signB.element === '风') ||
      (signA.element === '风' && signB.element === '火')
    ) {
      score = 90;
      title = '风助火势 · 灵感飞扬';
      advice = '风象的创想能不断点燃火象的行动热情，你们在一起永远充满探索新奇的生机与欢笑。';
    } else if (
      (signA.element === '土' && signB.element === '水') ||
      (signA.element === '水' && signB.element === '土')
    ) {
      score = 92;
      title = '水土滋养 · 根深叶茂';
      advice = '水象的深情给土象带来温暖滋润，土象的稳固为水象筑起坚实的安全港湾，极具长线合力。';
    } else if (
      (signA.element === '火' && signB.element === '水') ||
      (signA.element === '水' && signB.element === '火')
    ) {
      score = 70;
      title = '水火交融 · 戏剧张力';
      advice = '水与火并存着极大的张力与激情，火需要收敛急躁避免灼伤水，水需要直接表达避免情绪内耗。';
    } else {
      score = 78;
      title = '理性与务实磨合';
      advice = '在目标与执行层面能形成严密的互补体系，多关注彼此的情感需求。';
    }

    return { score, title, advice };
  };

  const synergyResult = calculateSynergy(synergyA, synergyB);

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sun className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              十二星座与四象能量矩阵
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            火、土、风、水四大自然元素在人类心灵中的动态配比与互动化学反应
          </p>
        </div>

        {/* Element Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { id: 'all', label: '全部' },
            { id: '火', label: '火象 (直觉/行动)', icon: Flame, color: 'text-rose-400' },
            { id: '土', label: '土象 (务实/感官)', icon: Mountain, color: 'text-emerald-400' },
            { id: '风', label: '风象 (理性/沟通)', icon: Wind, color: 'text-cyan-400' },
            { id: '水', label: '水象 (共情/潜意识)', icon: Droplets, color: 'text-blue-400' }
          ].map(fl => (
            <button
              key={fl.id}
              onClick={() => {
                soundManager.playChime(1);
                setSelectedFilter(fl.id);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                selectedFilter === fl.id
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {fl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Signs Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {filteredSigns.map((sign) => {
          const isSelected = activeSign.id === sign.id;
          return (
            <div
              key={sign.id}
              onClick={() => {
                soundManager.playChime(2);
                setActiveSign(sign);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-900/40 border-amber-400 shadow-lg shadow-purple-900/30 scale-[1.03]'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xl font-bold font-serif" style={{ color: sign.color }}>
                    {sign.symbol}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300">
                    {sign.element}象
                  </span>
                </div>
                <h4 className="font-serif text-sm font-bold text-white">{sign.name}</h4>
                <span className="text-[10px] text-slate-400 block">{sign.dateRange}</span>
              </div>

              <div className="mt-3 pt-2 border-t border-white/5 text-[10px] text-purple-300/80 truncate">
                {sign.jungianArchetype.split(' / ')[0]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Sign Detailed Spotlight Card */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-[#140f33] via-[#0b0e27] to-[#070913] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-purple-600/30 border border-amber-400/40 flex items-center justify-center text-3xl font-serif" style={{ color: activeSign.color }}>
              {activeSign.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-white">{activeSign.name}</h3>
                <span className="text-xs text-slate-400">({activeSign.nameEn})</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                  {activeSign.dateRange}
                </span>
              </div>
              <p className="text-xs text-purple-300 mt-1">
                守护星: {activeSign.ruler} · 动力形态: {activeSign.modality}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {activeSign.keywords?.map((kw, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs md:text-sm">
          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
            <span className="text-amber-300 font-semibold block">荣格心灵原型</span>
            <p className="text-slate-200 font-medium">{activeSign.jungianArchetype}</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
            <span className="text-blue-300 font-semibold block">现代心理特质剖析</span>
            <p className="text-slate-300 leading-relaxed">{activeSign.psychProfile}</p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
            <span className="text-rose-300 font-semibold block">潜在阴影与成长盲点</span>
            <p className="text-slate-300 leading-relaxed">{activeSign.shadow}</p>
          </div>
        </div>
      </div>

      {/* Zodiac Chemistry & Synergy Calculator */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/15 to-[#0a0e28] space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" />
            双星座化学反应与共鸣契合模拟器
          </h3>
          <span className="text-xs text-amber-300 font-semibold">四象动力推演</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">选择星座 A：</label>
            <select
              value={synergyA.id}
              onChange={(e) => {
                soundManager.playChime(1);
                setSynergyA(ZODIAC_SIGNS.find(s => s.id === e.target.value) || ZODIAC_SIGNS[0]);
              }}
              className="w-full p-2.5 rounded-xl bg-[#0e132c] border border-white/10 text-white text-xs font-semibold"
            >
              {ZODIAC_SIGNS.map(s => (
                <option key={s.id} value={s.id}>{s.symbol} {s.name} ({s.element}象)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">选择星座 B：</label>
            <select
              value={synergyB.id}
              onChange={(e) => {
                soundManager.playChime(1);
                setSynergyB(ZODIAC_SIGNS.find(s => s.id === e.target.value) || ZODIAC_SIGNS[0]);
              }}
              className="w-full p-2.5 rounded-xl bg-[#0e132c] border border-white/10 text-white text-xs font-semibold"
            >
              {ZODIAC_SIGNS.map(s => (
                <option key={s.id} value={s.id}>{s.symbol} {s.name} ({s.element}象)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Synergy Result Box */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl" style={{ color: synergyA.color }}>
              {synergyA.symbol}
            </div>
            <span className="text-xl font-bold text-amber-400">×</span>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-2xl" style={{ color: synergyB.color }}>
              {synergyB.symbol}
            </div>
          </div>

          <div className="flex-1 space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h4 className="font-serif text-lg font-bold text-white">{synergyResult.title}</h4>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                契合指数: {synergyResult.score}%
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{synergyResult.advice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
