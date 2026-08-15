import React, { useRef, useState } from 'react';
import { Award, Sparkles, Brain, Moon, Compass, Sun, BookOpen, Download, Share2, Shield, Heart, Zap, RefreshCw } from 'lucide-react';
import html2canvas from 'html2canvas';
import confetti from 'canvas-confetti';
import { generateHolisticSoulReport } from '../../data/archetypes';
import { soundManager } from '../../audio/audioManager';

export default function HolisticReportModule({
  mbtiResult,
  natalChart,
  tarotCards,
  ichingResult,
  dreamResult,
  philosophyResult,
  setActiveTab
}) {
  const posterRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const report = generateHolisticSoulReport({
    mbtiResult,
    natalChart,
    tarotCards,
    ichingResult,
    dreamResult,
    philosophyResult
  });

  const handleExportPoster = async () => {
    if (!posterRef.current) return;
    soundManager.playSingingBowl(528, 2);
    setIsExporting(true);

    try {
      // Trigger festive celebration confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#a855f7', '#06b6d4', '#ec4899', '#ffffff']
      });

      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        backgroundColor: '#070913',
        useCORS: true
      });

      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Aetheria_Soul_Report_${report.dimensions.scienceMirror.mbtiCode}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Export poster failed', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Award className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              灵心双镜 · 全息综合画像
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            融合科学心理认知、西方现代占星、塔罗潜意识投射、周易系统论与存在哲学的终极自性图谱
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleExportPoster}
          disabled={isExporting}
          className="btn-gold text-xs cursor-pointer"
        >
          <Download className={`w-4 h-4 ${isExporting ? 'animate-bounce' : ''}`} />
          {isExporting ? '高清海报渲染中...' : '一键生成高颜值报告海报'}
        </button>
      </div>

      {/* Printable / Exportable Holographic Poster Card */}
      <div
        ref={posterRef}
        className="glass-panel p-8 md:p-12 rounded-3xl border-2 border-amber-500/40 bg-gradient-to-b from-[#120d2d] via-[#090b1c] to-[#070913] space-y-8 shadow-2xl relative overflow-hidden"
      >
        {/* Ambient background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Poster Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold uppercase tracking-wider">
                AETHERIA MATRIX · 灵心双镜
              </span>
              <span className="text-xs text-slate-400">
                全息人格测评综合报告
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-200 to-cyan-300 mt-2">
              {report.soulMatrixTitle}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed max-w-2xl">
              {report.coreSoulPattern}
            </p>
          </div>

          {/* Resonance Gauge */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-amber-500/30 shrink-0">
            <span className="text-[10px] text-slate-400 font-semibold">全息心灵共鸣指数</span>
            <div className="font-serif text-3xl font-black text-amber-400">
              {report.resonanceScore}%
            </div>
            <span className="text-[9px] text-emerald-400 font-bold">高阶心智自性整合</span>
          </div>
        </div>

        {/* Dual Mirrors Grid (Science Mirror vs Metaphysics Mirror) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Science Mirror (Left) */}
          <div className="p-6 rounded-3xl bg-blue-950/20 border border-blue-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900/30 pb-2">
              <h3 className="font-serif text-base font-bold text-blue-300 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                {report.dimensions.scienceMirror.title}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">
                {report.dimensions.scienceMirror.mbtiCode}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">人格原型定位</span>
                <p className="font-serif text-sm font-bold text-white">
                  {report.dimensions.scienceMirror.personalityTitle}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">主导认知武器 (Dominant Function)</span>
                <p className="text-blue-200 font-medium">
                  {report.dimensions.scienceMirror.dominantFunction}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">理性赋能与突破</span>
                <p className="text-slate-300 leading-relaxed">
                  {report.dimensions.scienceMirror.rationalGift}
                </p>
              </div>
            </div>
          </div>

          {/* Metaphysics Mirror (Right) */}
          <div className="p-6 rounded-3xl bg-purple-950/20 border border-purple-500/30 space-y-4">
            <div className="flex items-center justify-between border-b border-purple-900/30 pb-2">
              <h3 className="font-serif text-base font-bold text-purple-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                {report.dimensions.mysticMirror.title}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                天体与易道
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">本命天宫三大核心 (Sun / Moon / Rising)</span>
                <p className="font-serif text-sm font-bold text-amber-300">
                  日座 {report.dimensions.mysticMirror.bigThree.sun} · 月座 {report.dimensions.mysticMirror.bigThree.moon} · 上升 {report.dimensions.mysticMirror.bigThree.rising}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">塔罗生命原型卡 / 潜意识镜映</span>
                <p className="text-purple-200 font-medium">
                  【{report.dimensions.mysticMirror.tarotSoulCard}】 · {report.dimensions.mysticMirror.tarotArchetype}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block text-[11px]">周易本命卦象 / 系统演化</span>
                <p className="text-slate-300 leading-relaxed">
                  【{report.dimensions.mysticMirror.ichingLifeHex}】: {report.dimensions.mysticMirror.ichingWisdom}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy & Subconscious Dream Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Philosophy Mirror */}
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
            <h4 className="font-serif text-sm font-bold text-cyan-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {report.dimensions.philosophyMirror.title} ({report.dimensions.philosophyMirror.schoolName})
            </h4>
            <p className="text-xs text-amber-200/90 font-serif italic leading-relaxed">
              {report.dimensions.philosophyMirror.motto}
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              行动信条：{report.dimensions.philosophyMirror.existentialAction}
            </p>
          </div>

          {/* Dream Mirror */}
          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2">
            <h4 className="font-serif text-sm font-bold text-indigo-300 flex items-center gap-2">
              <Moon className="w-4 h-4" />
              {report.dimensions.dreamMirror.title} ({report.dimensions.dreamMirror.dominantSymbol})
            </h4>
            <p className="text-xs text-indigo-200 leading-relaxed">
              潜意识基调：{report.dimensions.dreamMirror.recentTone}
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {report.dimensions.dreamMirror.subconsciousGuidance}
            </p>
          </div>
        </div>

        {/* Mentor Epiphany Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-amber-950/25 via-[#131138] to-[#0a0d24] border border-amber-500/40 relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-serif text-base font-bold text-white">
              AI 灵性心理导师 · 终极合一寄语
            </h4>
          </div>
          <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed whitespace-pre-line font-serif">
            {report.mentorEpiphany}
          </p>
        </div>

        {/* Poster Footer Watermark */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] text-slate-500 relative z-10">
          <span>全息灵心镜 · Aetheria Holographic Psyche & Astro Matrix</span>
          <span>科学解构 · 玄学映照 · 哲学立心</span>
        </div>
      </div>
    </div>
  );
}
