import React, { useState, useEffect } from 'react';
import { Database, Cloud, RefreshCw, Layers, CheckCircle2, Shield, Eye, FileText } from 'lucide-react';
import { loadUserAssessment, getUserFirestoreHistory } from '../../firebase/firestoreService';
import { soundManager } from '../../audio/audioManager';

export default function FirestoreExplorerModal({ isOpen, onClose, currentUser, onForceSync }) {
  const [activeSubTab, setActiveSubTab] = useState('latest');
  const [firestoreData, setFirestoreData] = useState(null);
  const [historyList, setHistoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      loadData();
    }
  }, [isOpen, currentUser]);

  const loadData = async () => {
    if (!currentUser) return;
    setIsLoading(true);
    soundManager.playChime(1);
    const data = await loadUserAssessment(currentUser.uid);
    const history = await getUserFirestoreHistory(currentUser.uid);
    setFirestoreData(data);
    setHistoryList(history);
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-panel p-6 md:p-8 rounded-3xl border border-cyan-500/50 max-w-3xl w-full space-y-5 bg-[#0a0e28] shadow-2xl relative max-h-[88vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-cyan-900/40 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-white">
                  Cloud Firestore 数据库监控与档案视窗
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                  实时已连接
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                当前数据挂载路径：<code className="text-cyan-300 font-mono">users/{currentUser?.uid || 'guest'}/assessments/latest</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white text-xs cursor-pointer"
              title="刷新数据库"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white font-bold text-lg p-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 border-b border-white/5 pb-2">
          <button
            onClick={() => setActiveSubTab('latest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'latest' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" /> 实时 JSON 档案结构
          </button>
          <button
            onClick={() => setActiveSubTab('history')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeSubTab === 'history' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> 历史快照集合 ({historyList.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-[300px] text-xs space-y-4">
          {activeSubTab === 'latest' ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>文档更新时间：<strong className="text-amber-300">{firestoreData?.updatedAt || '刚刚'}</strong></span>
                <span>数据源：<strong className="text-emerald-400">{firestoreData?.fromCloud ? '☁️ Cloud Firestore' : '💾 本地/内存缓存'}</strong></span>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-cyan-900/50 font-mono text-[11px] text-cyan-200 overflow-x-auto leading-relaxed max-h-[360px]">
                <pre>{JSON.stringify(firestoreData || { status: '暂无测验数据，请先完成任意测验' }, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {historyList.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <Cloud className="w-12 h-12 mx-auto text-slate-600 mb-2" />
                  <p>暂无云端历史快照，进行测验后会自动在此追加时间轴快照记录</p>
                </div>
              ) : (
                historyList.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="font-serif font-bold text-white text-xs block">
                        快照 #{idx + 1} · {item.mbtiType} · {item.sunSign}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        时间: {item.isoDate || '近期'} · 抽取塔罗: {item.tarotCount || 0} 张
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono">
                      {item.id || 'snapshot'}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-cyan-900/40 text-xs">
          <span className="text-slate-400 text-[11px]">
            安全规则：仅允许登录用户读写自身 UID 路径下的文档
          </span>
          <button
            onClick={() => {
              soundManager.playSingingBowl(432, 2);
              onForceSync();
            }}
            className="btn-gold text-xs py-1.5"
          >
            <Cloud className="w-4 h-4" /> 强制全量同步到云端
          </button>
        </div>
      </div>
    </div>
  );
}
