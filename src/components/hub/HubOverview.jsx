import React from 'react';
import { Sparkles, Brain, Moon, Compass, Sun, BookOpen, Award, ArrowRight, Shield, Zap, RefreshCw } from 'lucide-react';
import { soundManager } from '../../audio/audioManager';

export default function HubOverview({ setActiveTab, mbtiResult, natalChart, tarotCards, ichingResult, philosophyResult }) {
  const modules = [
    {
      id: 'mbti',
      title: '荣格八维 & MBTI',
      category: '科学心理',
      badge: '认知机制',
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30',
      icon: Brain,
      desc: '解构 Ni/Ne/Si/Se/Ti/Te/Fi/Fe 八大认知功能层级，洞悉人格底色与阴影压力破局。',
      status: mbtiResult ? `已完成: ${mbtiResult.typeCode}` : '未测试',
      statusColor: mbtiResult ? 'text-emerald-400' : 'text-slate-400'
    },
    {
      id: 'tarot',
      title: '塔罗潜意识牌阵',
      category: '潜意识投射',
      badge: '共时性镜映',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      icon: Sparkles,
      desc: '78张完整塔罗牌库，支持单牌/时空之流/圣三角/凯尔特十字，以荣格原型照见内心投射。',
      status: tarotCards.length > 0 ? `已抽取 ${tarotCards.length} 张牌` : '可随时开牌',
      statusColor: tarotCards.length > 0 ? 'text-amber-400' : 'text-slate-400'
    },
    {
      id: 'astrology',
      title: '本命天宫星盘',
      category: '现代占星',
      badge: '时空印记',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      icon: Compass,
      desc: '高精度推算日月升三大核心及十大行星落座与十二宫位，配备交互式天宫轮盘。',
      status: natalChart ? `日座: ${natalChart.planets[0]?.sign?.name}` : '未配置',
      statusColor: natalChart ? 'text-amber-400' : 'text-slate-400'
    },
    {
      id: 'zodiac',
      title: '星座与四象能量',
      category: '能量平衡',
      badge: '元素动态',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      icon: Sun,
      desc: '火土风水四象与本位/固定/变动三态配比，星座化学反应与共鸣分析。',
      status: '实时推演',
      statusColor: 'text-emerald-400'
    },
    {
      id: 'iching',
      title: '周易六爻与五行',
      category: '东方系统论',
      badge: '易道演化',
      color: 'from-rose-500/20 to-amber-500/20',
      borderColor: 'border-rose-500/30',
      icon: RefreshCw,
      desc: '3D铜钱抛掷六爻起卦，推演六十四卦本卦与变卦，五行生克与立体八卦罗盘。',
      status: ichingResult ? `本卦: ${ichingResult.primaryHexagram?.name}` : '可抛掷起卦',
      statusColor: ichingResult ? 'text-amber-400' : 'text-slate-400'
    },
    {
      id: 'dream',
      title: '梦境解析与潜意识',
      category: '潜意识科学',
      badge: '意象破译',
      color: 'from-indigo-500/20 to-cyan-500/20',
      borderColor: 'border-indigo-500/30',
      icon: Moon,
      desc: '结合弗洛伊德欲望解构与荣格自性补偿，意象词典与积极想象心灵对话。',
      status: '随时记录解梦',
      statusColor: 'text-cyan-400'
    },
    {
      id: 'philosophy',
      title: '哲学流派与信条',
      category: '存在思辨',
      badge: '终极意义',
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'border-cyan-500/30',
      icon: BookOpen,
      desc: '斯多葛、存在主义、道家禅宗、阳明心学，经典思想实验测出灵魂哲学底色。',
      status: philosophyResult ? `主导: ${philosophyResult.primarySchool?.name}` : '未测验',
      statusColor: philosophyResult ? 'text-purple-400' : 'text-slate-400'
    }
  ];

  return (
    <div className="py-8 space-y-12 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 md:p-12 border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-[#0a0e27]/80 to-[#070913] shadow-2xl shadow-purple-950/50">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 animate-spin text-amber-400" style={{ animationDuration: '6s' }} />
            科学与玄学·全息双镜测评体系
          </div>

          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            以科学拆解<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-300 to-cyan-300">心理机制</span>
            <br />
            以玄学映照<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-amber-400">潜意识图景</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            告别纯粹宿命论与刻板标签。本系统将现代认知心理学（MBTI认知八维、荣格原型、梦境解析）与人类古老哲学神秘学智慧（塔罗牌阵、现代西方占星、周易六十四卦、先秦与存在主义哲学）融为一体，助你从全息视角洞见内在自性。
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => {
                soundManager.playChime(3);
                setActiveTab('mbti');
              }}
              className="btn-gold text-sm"
            >
              <Brain className="w-4 h-4" />
              开启认知八维测验
            </button>
            <button
              onClick={() => {
                soundManager.playChime(1);
                setActiveTab('report');
              }}
              className="btn-mystic text-sm"
            >
              <Award className="w-4 h-4 text-amber-300" />
              查看全息双镜报告
            </button>
          </div>
        </div>
      </div>

      {/* Core Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              全息模块矩阵 (7 大核心维度)
            </h2>
            <p className="text-xs text-slate-400">自由探索各个模块，数据将实时融合进入终极「全息双镜报告」</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => {
                  soundManager.playChime(2);
                  setActiveTab(mod.id);
                }}
                className={`glass-panel p-6 rounded-2xl border ${mod.borderColor} bg-gradient-to-br ${mod.color} hover:scale-[1.02] cursor-pointer flex flex-col justify-between group transition-all`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-purple-200">
                      {mod.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className={`font-medium ${mod.statusColor}`}>
                    {mod.status}
                  </span>
                  <span className="text-purple-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    进入模块 <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Epistemological Balance Section */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 space-y-6">
        <div className="max-w-2xl">
          <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">方法论基石</span>
          <h3 className="font-serif text-2xl font-bold text-white mt-1">
            为什么将“科学心理”与“玄学意象”结合？
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="font-serif text-base font-bold text-amber-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> 1. 荣格原型与共时性
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              瑞士心理学家荣格指出，塔罗、周易与占星本质上是人类集体潜意识的象征图谱。抽牌与起卦并非怪力乱神，而是心灵与宇宙在某一瞬间的“非因果共时性 (Synchronicity)”连接。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="font-serif text-base font-bold text-purple-300 flex items-center gap-1.5">
              <Brain className="w-4 h-4" /> 2. 投射测验与潜意识激活
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              正如罗夏墨迹测验，神秘学符号提供了一个极其丰富的“投射幕布”。当我们解读一张塔罗或卦象时，被激活的正是我们平时被理性抑制的真实渴望与恐惧。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <h4 className="font-serif text-base font-bold text-cyan-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> 3. 认知科学与行动赋能
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              MBTI 认知八维提供了明晰的逻辑武器，帮助我们看清思维偏误；而哲学与易道则赋予我们面对不确定性的从容心境，实现“知行合一，自性圆满”。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
