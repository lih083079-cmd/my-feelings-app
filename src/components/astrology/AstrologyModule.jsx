import React, { useState, useEffect } from 'react';
import { Compass, Sun, Moon, Calendar, MapPin, Clock, Sparkles, Layers, Info } from 'lucide-react';
import { MAJOR_CITIES, ZODIAC_SIGNS, PLANETS, HOUSES } from '../../data/astrologyData';
import { calculateNatalChart } from '../../utils/astroEngine';
import { soundManager } from '../../audio/audioManager';

export default function AstrologyModule({ natalChart, setNatalChart }) {
  const [birthData, setBirthData] = useState({
    year: 1998,
    month: 10,
    day: 24,
    hour: 14,
    minute: 30,
    cityName: '北京 (Beijing)',
    lat: 39.9042,
    lng: 116.4074,
    tz: 8
  });

  const [activePlanetModal, setActivePlanetModal] = useState(null);

  // Auto calculate on initial load if not yet calculated
  useEffect(() => {
    if (!natalChart) {
      handleCalculate();
    }
  }, []);

  const handleCityChange = (cityName) => {
    const found = MAJOR_CITIES.find(c => c.name === cityName);
    if (found) {
      setBirthData(prev => ({
        ...prev,
        cityName: found.name,
        lat: found.lat,
        lng: found.lng,
        tz: found.tz
      }));
    }
  };

  const handleCalculate = () => {
    soundManager.playSingingBowl(432, 2.5);
    const chart = calculateNatalChart(birthData);
    setNatalChart(chart);
  };

  // Render SVG Interactive Natal Wheel
  const renderNatalChartSVG = (chart) => {
    if (!chart) return null;
    const size = 360;
    const center = size / 2;
    const outerRadius = 165;
    const zodiacInnerRadius = 135;
    const houseInnerRadius = 100;
    const coreRadius = 45;

    const ascDegree = chart.asc?.totalDegree || 0;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto overflow-visible select-none">
        {/* Deep Space Background Circle */}
        <circle cx={center} cy={center} r={outerRadius} fill="#090b1c" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1.5" />

        {/* 12 Zodiac Wheel Sectors */}
        {ZODIAC_SIGNS.map((sign, idx) => {
          // Angle rotated relative to Ascendant (Ascendant is on the 9 o'clock / 180° left position)
          const startDeg = (idx * 30 - ascDegree + 180) % 360;
          const endDeg = (startDeg + 30) % 360;

          const startRad = (startDeg * Math.PI) / 180;
          const endRad = (endDeg * Math.PI) / 180;
          const midRad = ((startDeg + 15) * Math.PI) / 180;

          const x1 = center + outerRadius * Math.cos(startRad);
          const y1 = center + outerRadius * Math.sin(startRad);
          const x2 = center + zodiacInnerRadius * Math.cos(startRad);
          const y2 = center + zodiacInnerRadius * Math.sin(startRad);

          const textX = center + ((outerRadius + zodiacInnerRadius) / 2) * Math.cos(midRad);
          const textY = center + ((outerRadius + zodiacInnerRadius) / 2) * Math.sin(midRad) + 4;

          return (
            <g key={sign.id}>
              {/* Sector boundary */}
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(168, 85, 247, 0.25)" strokeWidth="1" />
              {/* Zodiac Symbol Glyph */}
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                fontSize="13"
                fill={sign.color}
                fontWeight="bold"
                className="cursor-pointer hover:scale-125 transition-transform"
              >
                {sign.symbol}
              </text>
            </g>
          );
        })}

        {/* Zodiac Ring Divider */}
        <circle cx={center} cy={center} r={zodiacInnerRadius} fill="none" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1.5" />

        {/* 12 House Dividing Lines */}
        {chart.houses?.map((h) => {
          const deg = (h.cuspDeg - ascDegree + 180) % 360;
          const rad = (deg * Math.PI) / 180;
          const x1 = center + zodiacInnerRadius * Math.cos(rad);
          const y1 = center + zodiacInnerRadius * Math.sin(rad);
          const x2 = center + coreRadius * Math.cos(rad);
          const y2 = center + coreRadius * Math.sin(rad);

          return (
            <line
              key={h.num}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={h.num === 1 || h.num === 10 ? 'rgba(245, 158, 11, 0.8)' : 'rgba(255, 255, 255, 0.15)'}
              strokeWidth={h.num === 1 || h.num === 10 ? '2' : '1'}
              strokeDasharray={h.num === 1 || h.num === 10 ? 'none' : '2 2'}
            />
          );
        })}

        {/* Aspect Lines inside Center */}
        {chart.aspects?.slice(0, 15).map((asp, idx) => {
          const p1 = chart.planets.find(p => p.name === asp.p1);
          const p2 = chart.planets.find(p => p.name === asp.p2);
          if (!p1 || !p2) return null;

          const r = houseInnerRadius - 10;
          const rad1 = ((p1.totalDegree - ascDegree + 180) * Math.PI) / 180;
          const rad2 = ((p2.totalDegree - ascDegree + 180) * Math.PI) / 180;

          return (
            <line
              key={idx}
              x1={center + r * Math.cos(rad1)}
              y1={center + r * Math.sin(rad1)}
              x2={center + r * Math.cos(rad2)}
              y2={center + r * Math.sin(rad2)}
              stroke={asp.color}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
          );
        })}

        {/* Planet Markers */}
        {chart.planets?.map((p) => {
          const rad = ((p.totalDegree - ascDegree + 180) * Math.PI) / 180;
          const r = houseInnerRadius;
          const px = center + r * Math.cos(rad);
          const py = center + r * Math.sin(rad) + 4;

          return (
            <g
              key={p.id}
              onClick={() => {
                soundManager.playChime(4);
                setActivePlanetModal(p);
              }}
              className="cursor-pointer group"
            >
              <circle
                cx={px}
                cy={py - 4}
                r="10"
                fill="#070913"
                stroke={p.isCore ? '#f59e0b' : '#a855f7'}
                strokeWidth="1.5"
                className="group-hover:fill-purple-900 transition-colors"
              />
              <text
                x={px}
                y={py}
                textAnchor="middle"
                fontSize="11"
                fill="#f8fafc"
                fontWeight="bold"
              >
                {p.symbol}
              </text>
            </g>
          );
        })}

        {/* Core Center Hub */}
        <circle cx={center} cy={center} r={coreRadius} fill="#0d1127" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="1" />
        <text x={center} y={center - 4} textAnchor="middle" fontSize="10" fill="#fbbf24" fontWeight="bold">
          NATAL
        </text>
        <text x={center} y={center + 10} textAnchor="middle" fontSize="8" fill="#94a3b8">
          ASTROLABE
        </text>
      </svg>
    );
  };

  const sunPlanet = natalChart?.planets?.find(p => p.id === 'sun');
  const moonPlanet = natalChart?.planets?.find(p => p.id === 'moon');
  const ascInfo = natalChart?.asc;

  return (
    <div className="py-6 space-y-8 animate-fadeIn">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-900/30 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Compass className="w-5 h-5" />
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
              本命天宫星盘与心理占星
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            高精度计算日月升三大核心及十大行星落座与十二宫位，解读灵魂时空蓝图
          </p>
        </div>
      </div>

      {/* Birth Time & Location Input Form */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/20 to-[#0a0e28]/70 space-y-4">
        <h3 className="font-serif text-base font-bold text-amber-300 flex items-center gap-2">
          <Calendar className="w-4 h-4" /> 出生时空参数配置
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">出生年份</label>
            <input
              type="number"
              value={birthData.year}
              onChange={(e) => setBirthData({ ...birthData, year: parseInt(e.target.value) || 1998 })}
              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">出生月份</label>
            <input
              type="number"
              min="1"
              max="12"
              value={birthData.month}
              onChange={(e) => setBirthData({ ...birthData, month: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">出生日期</label>
            <input
              type="number"
              min="1"
              max="31"
              value={birthData.day}
              onChange={(e) => setBirthData({ ...birthData, day: parseInt(e.target.value) || 1 })}
              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">时 (24小时制)</label>
            <input
              type="number"
              min="0"
              max="23"
              value={birthData.hour}
              onChange={(e) => setBirthData({ ...birthData, hour: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">分</label>
            <input
              type="number"
              min="0"
              max="59"
              value={birthData.minute}
              onChange={(e) => setBirthData({ ...birthData, minute: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 block mb-1">出生城市</label>
            <select
              value={birthData.cityName}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-[#0e132c] border border-white/10 text-white text-xs focus:border-amber-400 focus:outline-none"
            >
              {MAJOR_CITIES.map(c => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            onClick={handleCalculate}
            className="btn-gold text-xs"
          >
            <Sparkles className="w-4 h-4" />
            推算本命天宫星盘
          </button>
        </div>
      </div>

      {/* Natal Chart & Big Three Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Astrolabe SVG Wheel */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col items-center justify-center relative shadow-2xl">
          <span className="text-xs text-amber-400 font-semibold mb-2">
            交互式本命天宫盘 (点击行星查看深层意涵)
          </span>
          {renderNatalChartSVG(natalChart)}
          <span className="text-[11px] text-slate-400 mt-2">
            上升点 (ASC): {natalChart?.asc?.sign?.name} {natalChart?.asc?.degreeStr}
          </span>
        </div>

        {/* Right: Big Three Trinity Matrix */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-[#0c102c]/80 to-[#070913] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-400" />
              灵魂三大支柱 (The Big Three)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Sun */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-amber-300 font-semibold">太阳 (Sun ☉)</span>
                  <span className="text-xs text-amber-400 font-bold">{sunPlanet?.sign?.symbol}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-white">
                  {sunPlanet?.sign?.name}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  显意识核心自我，代表你的生命动力、价值追求与主导人生意志。
                </p>
              </div>

              {/* Moon */}
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-purple-300 font-semibold">月亮 (Moon ☽)</span>
                  <span className="text-xs text-purple-400 font-bold">{moonPlanet?.sign?.symbol}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-white">
                  {moonPlanet?.sign?.name}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  潜意识情感容器与安全感来源，代表你的内在小孩与本能情绪反应。
                </p>
              </div>

              {/* Ascendant */}
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-cyan-300 font-semibold">上升点 (ASC)</span>
                  <span className="text-xs text-cyan-400 font-bold">{ascInfo?.sign?.symbol}</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-white">
                  {ascInfo?.sign?.name}
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  人格面具 (Persona) 与生命剧本镜头，是你与世界初遇时的气质。
                </p>
              </div>
            </div>
          </div>

          {/* Elemental & Modality Bar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">四象元素能量分布</span>
              <div className="grid grid-cols-4 gap-1 text-center">
                {Object.entries(natalChart?.elements || {}).map(([elem, val]) => (
                  <div key={elem} className="p-1.5 rounded-lg bg-white/5">
                    <span className="text-[10px] text-slate-400">{elem}象</span>
                    <p className="text-sm font-bold text-amber-400">{val} 星</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">三态动力节奏</span>
              <div className="grid grid-cols-3 gap-1 text-center">
                {Object.entries(natalChart?.modalities || {}).map(([mod, val]) => (
                  <div key={mod} className="p-1.5 rounded-lg bg-white/5">
                    <span className="text-[10px] text-slate-400">{mod}</span>
                    <p className="text-sm font-bold text-purple-300">{val} 星</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Planetary Table */}
      <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
        <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          全行星落座与宫位明细
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {natalChart?.planets?.map((p) => (
            <div
              key={p.id}
              onClick={() => setActivePlanetModal(p)}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-amber-300 flex items-center justify-center text-sm font-bold font-serif">
                  {p.symbol}
                </span>
                <div>
                  <span className="text-xs font-bold text-white block">{p.name}</span>
                  <span className="text-[11px] text-slate-400">落第 {p.house} 宫</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-amber-300 block">
                  {p.sign?.name} {p.degreeStr}
                </span>
                <span className="text-[10px] text-purple-300">
                  {p.sign?.element}象 · {p.sign?.modality.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Planet Info Modal */}
      {activePlanetModal && (
        <div
          onClick={() => setActivePlanetModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-panel p-6 md:p-8 rounded-3xl border border-purple-500/50 max-w-md w-full space-y-4 bg-[#0a0e28] shadow-2xl relative"
          >
            <div className="flex items-start justify-between border-b border-purple-900/40 pb-3">
              <div>
                <span className="text-xs text-amber-400 font-bold">{activePlanetModal.symbol} 天体意向</span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {activePlanetModal.name} 落入 {activePlanetModal.sign?.name} (第 {activePlanetModal.house} 宫)
                </h3>
              </div>
              <button
                onClick={() => setActivePlanetModal(null)}
                className="text-slate-400 hover:text-white font-bold text-lg p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs md:text-sm">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <span className="text-purple-300 font-semibold block mb-1">天体心理学功能</span>
                <p className="text-slate-300 leading-relaxed">
                  {PLANETS.find(pl => pl.id === activePlanetModal.id)?.meaning}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-amber-300 font-semibold block mb-1">落入星座特质</span>
                <p className="text-slate-300 leading-relaxed">
                  {activePlanetModal.sign?.psychProfile}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-cyan-300 font-semibold block mb-1">落入宫位舞台</span>
                <p className="text-slate-300 leading-relaxed">
                  {HOUSES.find(h => h.num === activePlanetModal.house)?.desc}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActivePlanetModal(null)}
              className="btn-mystic w-full text-xs justify-center"
            >
              了解完毕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
