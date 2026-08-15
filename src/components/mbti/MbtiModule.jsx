import React, { useState } from 'react';
import { Brain, CheckCircle2, RotateCcw, Sparkles, AlertTriangle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { MBTI_QUESTIONS, FUNCTION_DEFINITIONS } from '../../data/mbtiQuestions';
import { MBTI_TYPES } from '../../data/mbtiTypes';
import { calculateCognitiveFunctions } from '../../utils/mbtiCalculator';
import { soundManager } from '../../audio/audioManager';

export default function MbtiModule({ mbtiResult, setMbtiResult }) {
  const [currentStep, setCurrentStep] = useState(0); // question index
  const [answers, setAnswers] = useState({});
  const [isQuizMode, setIsQuizMode] = useState(!mbtiResult);
  const [selectedQuickType, setSelectedQuickType] = useState(mbtiResult?.typeCode || 'INTJ');

  const handleSelectOption = (value) => {
    soundManager.playChime(currentStep % 8);
    const newAnswers = { ...answers, [currentStep]: value };
    setAnswers(newAnswers);

    if (currentStep < MBTI_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finished all questions!
      const answersArray = MBTI_QUESTIONS.map((_, idx) => newAnswers[idx] || 3);
      const res = calculateCognitiveFunctions(MBTI_QUESTIONS, answersArray);
      setMbtiResult(res);
      setIsQuizMode(false);
      soundManager.playSingingBowl(528, 3);
    }
  };

  const handleQuickSelect = (typeCode) => {
    setSelectedQuickType(typeCode);
    soundManager.playChime(3);
    const profile = MBTI_TYPES[typeCode] || MBTI_TYPES.INTJ;
    
    // Simulate typical scores for that type
    const simulatedNormalized = {
      Ni: 50, Ne: 50, Si: 50, Se: 50, Ti: 50, Te: 50, Fi: 50, Fe: 50
    };
    if (profile.functions[0]) simulatedNormalized[profile.functions[0]] = 95;
    if (profile.functions[1]) simulatedNormalized[profile.functions[1]] = 80;
    if (profile.functions[2]) simulatedNormalized[profile.functions[2]] = 60;
    if (profile.functions[3]) simulatedNormalized[profile.functions[3]] = 35;

    const ranking = Object.entries(simulatedNormalized)
      .sort((a, b) => b[1] - a[1])
      .map(([func, score]) => ({
        func,
        score,
        definition: FUNCTION_DEFINITIONS[func]
      }));

    setMbtiResult({
      typeCode,
      typeProfile: profile,
      normalized: simulatedNormalized,
      ranking,
      dichotomies: {
        EI: { E: typeCode[0] === 'E' ? 75 : 25, I: typeCode[0] === 'I' ? 75 : 25, winner: typeCode[0] },
        SN: { S: typeCode[1] === 'S' ? 75 : 25, N: typeCode[1] === 'N' ? 75 : 25, winner: typeCode[1] },
        TF: { T: typeCode[2] === 'T' ? 75 : 25, F: typeCode[2] === 'F' ? 75 : 25, winner: typeCode[2] },
        JP: { J: typeCode[3] === 'J' ? 75 : 25, P: typeCode[3] === 'P' ? 75 : 25, winner: typeCode[3] }
      }
    });
    setIsQuizMode(false);
  };

  const handleRestartQuiz = () => {
    soundManager.playChime(1);
    setAnswers({});
    setCurrentStep(0);
    setIsQuizMode(true);
  };

  // Calculate SVG Polygon coordinates for 8-function Radar Chart
  const renderRadarChart = (scores = {}) => {
    const funcs = ['Ni', 'Ne', 'Ti', 'Te', 'Fi', 'Fe', 'Si', 'Se'];
    const size = 300;
    const center = size / 2;
    const radius = 105;

    // Generate background web rings
    const rings = [0.25, 0.5, 0.75, 1.0];

    // Calculate score polygon points
    const points = funcs.map((f, i) => {
      const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
      const score = (scores[f] || 50) / 100;
      const r = radius * score;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={size} height={size} className="overflow-visible mx-auto">
        {/* Background Rings */}
        {rings.map((ring, idx) => (
          <polygon
            key={idx}
            points={funcs.map((_, i) => {
              const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
              const r = radius * ring;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Axis Spokes */}
        {funcs.map((f, i) => {
          const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const labelX = center + (radius + 24) * Math.cos(angle);
          const labelY = center + (radius + 24) * Math.sin(angle) + 4;
          return (
            <g key={f}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1" />
              <text
                x={labelX}
                y={labelY}
                textAnchor="middle"
                fontSize="11"
                fontWeight="bold"
                fill={FUNCTION_DEFINITIONS[f]?.color || '#c084fc'}
              >
                {f}
              </text>
            </g>
          );
        })}

        {/* Data Radar Polygon */}
        <polygon
          points={points}
          fill="rgba(168, 85, 247, 0.35)"
          stroke="#f59e0b"
          strokeWidth="2.5"
          className="transition-all duration-700"
        />

        {/* Data Dots */}
        {funcs.map((f, i) => {
          const angle = (Math.PI * 2 / 8) * i - Math.PI / 2;
          const score = (scores[f] || 50) / 100;
          const r = radius * score;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);
          return (
            <circle
              key={f}
              cx={x}
              cy={y}
              r="4"
              fill="#fbbf24"
              stroke="#070913"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  };

  const currentQ = MBTI_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / MBTI_QUESTIONS.length) * 100);

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Brain className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              荣格八维与 MBTI 科学心理测评
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            以卡尔·荣格《心理类型》为基石，量化认知功能动态，破译内在心理机制
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQuizMode(true)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isQuizMode ? 'btn-mystic' : 'btn-outline'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            24题深度测验
          </button>
          <button
            onClick={() => setIsQuizMode(false)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              !isQuizMode ? 'btn-gold' : 'btn-outline'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            16型人格图谱
          </button>
        </div>
      </div>

      {isQuizMode ? (
        /* Quiz Interface */
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>第 {currentStep + 1} / {MBTI_QUESTIONS.length} 题</span>
              <span className="text-amber-400 font-bold">{progressPercent}% 完成</span>
            </div>
            <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="glass-panel p-8 rounded-3xl border border-purple-500/40 text-center space-y-8 bg-gradient-to-b from-purple-950/30 to-[#0c102a]/80 shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              测试维度: {currentQ?.dimension} ({currentQ?.func})
            </div>

            <h3 className="font-serif text-xl md:text-2xl font-bold text-white leading-relaxed px-4">
              “{currentQ?.text}”
            </h3>

            {/* Likert Scale 5 Options */}
            <div className="grid grid-cols-5 gap-2 md:gap-3 pt-4">
              {[
                { val: 1, label: '完全不符合', color: 'hover:border-rose-500 hover:bg-rose-500/15' },
                { val: 2, label: '较不符合', color: 'hover:border-rose-400 hover:bg-rose-400/10' },
                { val: 3, label: '中立 / 看情况', color: 'hover:border-slate-400 hover:bg-slate-500/10' },
                { val: 4, label: '比较符合', color: 'hover:border-emerald-400 hover:bg-emerald-400/10' },
                { val: 5, label: '完全符合', color: 'hover:border-emerald-500 hover:bg-emerald-500/20' }
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleSelectOption(opt.val)}
                  className={`p-3 md:p-4 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer group ${opt.color}`}
                >
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform ${
                    opt.val === 5 ? 'group-hover:border-emerald-400 group-hover:text-emerald-400' :
                    opt.val === 1 ? 'group-hover:border-rose-400 group-hover:text-rose-400' : ''
                  }`}>
                    {opt.val}
                  </div>
                  <span className="text-[10px] md:text-xs text-slate-400 group-hover:text-white transition-colors">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Profile Interface */
        <div className="space-y-8">
          {/* Quick 16 Type Switcher Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-purple-900/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="font-semibold text-amber-300">快速切换 16 型人格解析：</span>
              <button
                onClick={handleRestartQuiz}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> 重新测试
              </button>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1.5">
              {Object.keys(MBTI_TYPES).map((code) => (
                <button
                  key={code}
                  onClick={() => handleQuickSelect(code)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    mbtiResult?.typeCode === code
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Type Hero Banner */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-[#0a0e28]/70 to-[#070913] grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl md:text-4xl font-serif font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  {mbtiResult?.typeCode || 'INTJ'}
                </span>
                <span className="text-lg md:text-xl font-bold text-white font-serif">
                  {mbtiResult?.typeProfile?.title}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  荣格原型: {mbtiResult?.typeProfile?.archetype}
                </span>
              </div>

              <p className="text-amber-200/90 text-sm font-serif italic">
                {mbtiResult?.typeProfile?.tagline}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {mbtiResult?.typeProfile?.traits?.map((trait, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar Chart */}
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#070913]/60 border border-purple-500/20">
              <span className="text-[11px] text-amber-300/80 font-semibold mb-1">
                荣格认知八维雷达图谱
              </span>
              {renderRadarChart(mbtiResult?.normalized)}
            </div>
          </div>

          {/* Cognitive Stack Function Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mbtiResult?.typeProfile?.functions?.map((f, idx) => {
              const def = FUNCTION_DEFINITIONS[f];
              const roleNames = ['主导功能 (Hero 👑)', '辅助功能 (Parent 🛡️)', '第三功能 (Child 🎭)', '劣势功能 (Inferior/Shadow 🌑)'];
              const roleDesc = [
                '最自如熟练的心智引擎，掌控核心决策',
                '负责平衡与支持主导功能，提供现实支撑',
                '带有孩童般的创造性灵感，也是放松的源泉',
                '潜意识脆弱盲区，压力下容易爆发失控'
              ];
              return (
                <div
                  key={f}
                  className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 left-0 h-1 w-full"
                    style={{ backgroundColor: def?.color || '#a855f7' }}
                  />
                  <span className="text-[11px] text-amber-300 font-bold block">
                    {roleNames[idx]}
                  </span>
                  <div className="flex items-baseline justify-between">
                    <h4 className="text-xl font-bold font-serif" style={{ color: def?.color }}>
                      {f}
                    </h4>
                    <span className="text-xs text-slate-400">
                      {def?.archetype}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-200">
                    {def?.short}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    {roleDesc[idx]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Metaphysics & Archetype Cross-Mapping */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              科学×玄学跨维度映射图谱
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 space-y-1">
                <span className="text-[11px] text-purple-300 font-semibold">塔罗大阿尔卡那原型</span>
                <p className="font-serif text-sm font-bold text-white">
                  {mbtiResult?.typeProfile?.tarotCard}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                <span className="text-[11px] text-amber-300 font-semibold">占星星座共鸣</span>
                <p className="font-serif text-sm font-bold text-white">
                  {mbtiResult?.typeProfile?.astroSign}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                <span className="text-[11px] text-rose-300 font-semibold">周易本命卦象</span>
                <p className="font-serif text-sm font-bold text-white">
                  {mbtiResult?.typeProfile?.ichingHexagram}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
                <span className="text-[11px] text-cyan-300 font-semibold">灵魂哲学流派</span>
                <p className="font-serif text-sm font-bold text-white">
                  {mbtiResult?.typeProfile?.philosophySchool}
                </p>
              </div>
            </div>
          </div>

          {/* Stress Shadow & Growth Path */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
              <h4 className="font-serif text-base font-bold text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                极端压力下的阴影模式 (Grip / Loop)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {mbtiResult?.typeProfile?.stressShadow}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <h4 className="font-serif text-base font-bold text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                自性整合与成长突破路径
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {mbtiResult?.typeProfile?.growthPath}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
