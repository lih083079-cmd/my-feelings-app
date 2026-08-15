import React, { useState } from 'react';
import { BookOpen, Sparkles, Compass, CheckCircle2, RotateCcw, Award, Lightbulb } from 'lucide-react';
import { PHILOSOPHY_SCHOOLS, PHILOSOPHY_DILEMMA_QUESTIONS, calculatePhilosophyProfile } from '../../data/philosophyData';
import { soundManager } from '../../audio/audioManager';

export default function PhilosophyModule({ philosophyResult, setPhilosophyResult }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTesting, setIsTesting] = useState(!philosophyResult);
  const [activeSchoolModal, setActiveSchoolModal] = useState(null);

  const handleSelectOption = (optionIndex) => {
    soundManager.playChime(currentStep % 8);
    const newAnswers = { ...answers, [currentStep]: optionIndex };
    setAnswers(newAnswers);

    if (currentStep < PHILOSOPHY_DILEMMA_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed all dilemma questions!
      const answersArr = PHILOSOPHY_DILEMMA_QUESTIONS.map((_, i) => newAnswers[i] ?? 0);
      const res = calculatePhilosophyProfile(answersArr);
      setPhilosophyResult(res);
      setIsTesting(false);
      soundManager.playSingingBowl(528, 3);
    }
  };

  const handleRestart = () => {
    soundManager.playChime(1);
    setAnswers({});
    setCurrentStep(0);
    setIsTesting(true);
  };

  const currentQ = PHILOSOPHY_DILEMMA_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / PHILOSOPHY_DILEMMA_QUESTIONS.length) * 100);

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              哲学流派与灵魂信条罗盘
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            通过经典思想实验与存在困境抉择，测算出你灵魂深处的哲学底色与人生破局信条
          </p>
        </div>

        <div className="flex items-center gap-2">
          {philosophyResult && (
            <button
              onClick={handleRestart}
              className="btn-outline text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" /> 重新思辨测验
            </button>
          )}
        </div>
      </div>

      {isTesting ? (
        /* Dilemmas Test Interface */
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>思想实验 第 {currentStep + 1} / {PHILOSOPHY_DILEMMA_QUESTIONS.length} 题</span>
              <span className="text-cyan-400 font-bold">{progressPercent}% 完成</span>
            </div>
            <div className="w-full h-2 bg-slate-800/80 rounded-full overflow-hidden border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Dilemma Question Card */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 text-left space-y-6 bg-gradient-to-b from-cyan-950/20 via-[#0c102a] to-[#070913] shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {currentQ.title}
            </div>

            <p className="text-slate-200 text-sm md:text-base font-serif leading-relaxed">
              {currentQ.scenario}
            </p>

            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-cyan-400/60 hover:bg-cyan-500/15 transition-all text-left flex items-start gap-3 cursor-pointer group"
                >
                  <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center text-xs text-slate-300 group-hover:border-cyan-400 group-hover:text-cyan-400 shrink-0 mt-0.5 font-bold">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-xs md:text-sm text-slate-200 group-hover:text-white leading-relaxed">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Results & Philosophical Compass */
        <div className="space-y-8">
          {/* Primary School Spotlight Hero */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/30 via-[#0b0e27] to-[#070913] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
              <div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30">
                  灵魂主导哲学底色
                </span>
                <h3 className="font-serif text-3xl font-bold text-white mt-1">
                  {philosophyResult?.primarySchool?.name}
                </h3>
                <span className="text-xs text-slate-400 mt-1 block">
                  代表大师：{philosophyResult?.primarySchool?.representative}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {philosophyResult?.primarySchool?.keywords?.map((kw, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-xl bg-white/5 border border-white/10 text-cyan-300">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Motto */}
            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
              <span className="text-xs text-amber-400 font-semibold block mb-1">【终极核心信条】</span>
              <p className="text-sm md:text-base text-amber-100/90 font-serif italic leading-relaxed">
                {philosophyResult?.primarySchool?.coreMotto}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs md:text-sm">
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
                <span className="text-purple-300 font-semibold block">学派核心教义</span>
                <p className="text-slate-300 leading-relaxed">
                  {philosophyResult?.primarySchool?.doctrine}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                <span className="text-emerald-300 font-semibold block">现代生活破局之道</span>
                <p className="text-slate-300 leading-relaxed">
                  {philosophyResult?.primarySchool?.lifeAdvice}
                </p>
              </div>
            </div>
          </div>

          {/* All Philosophical Schools Gallery */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              各大哲学流派心智矩阵 (点击查看完整信条)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(PHILOSOPHY_SCHOOLS).map((school) => {
                const isPrimary = philosophyResult?.primarySchool?.id === school.id;
                return (
                  <div
                    key={school.id}
                    onClick={() => {
                      soundManager.playChime(3);
                      setActiveSchoolModal(school);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                      isPrimary
                        ? 'bg-cyan-950/40 border-cyan-400/80 shadow-md shadow-cyan-900/30'
                        : 'bg-white/5 border-white/10 hover:border-purple-500/40 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-bold text-white">{school.name.split(' (')[0]}</h4>
                      {isPrimary && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-400 text-slate-950 font-bold">
                          我的底色
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {school.coreMotto}
                    </p>
                    <span className="text-[10px] text-purple-300/80 block truncate">
                      代表: {school.representative}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* School Modal */}
      {activeSchoolModal && (
        <div
          onClick={() => setActiveSchoolModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/50 max-w-lg w-full space-y-4 bg-[#0a0e28] shadow-2xl relative"
          >
            <div className="flex items-start justify-between border-b border-purple-900/40 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-bold">{activeSchoolModal.representative}</span>
                <h3 className="font-serif text-2xl font-bold text-white mt-1">
                  {activeSchoolModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveSchoolModal(null)}
                className="text-slate-400 hover:text-white font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-cyan-300 font-semibold block mb-1">学派箴言</span>
                <p className="text-amber-200/90 font-serif italic">{activeSchoolModal.coreMotto}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-purple-300 font-semibold block mb-1">哲学教义</span>
                <p className="text-slate-300 leading-relaxed">{activeSchoolModal.doctrine}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-emerald-300 font-semibold block mb-1">行动指南</span>
                <p className="text-slate-300 leading-relaxed">{activeSchoolModal.lifeAdvice}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveSchoolModal(null)}
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
