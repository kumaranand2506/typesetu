import React from 'react';
import { BADGES_DEFINITION } from '../data/badgeSystem';
import { Award, Sparkles, Zap, Flame, Target, BookOpen, CheckCircle, RotateCcw, Download, Upload } from 'lucide-react';
import AdBanner from './AdBanner';

export default function BadgesView({
  userStats,
  onResetStats,
  onOpenAdSettings,
}) {
  const unlockedIds = new Set(userStats.unlockedBadges || []);

  const totalCompletedLessons = Object.keys(userStats.completedLessons || {}).length;
  const totalCompletedPractice = Object.keys(userStats.completedPractice || {}).length;
  const highestWpm = userStats.highestWpm || 0;
  const totalWords = userStats.totalWordsTyped || 0;

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(userStats, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `typesetu_progress_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8 select-none">
      {/* Top Banner Ad */}
      <AdBanner position="header" onOpenSettings={onOpenAdSettings} />

      {/* Header & Stats Highlight */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2 border border-amber-500/20">
              <Award size={14} /> उपलब्धियां एवं व्यक्तिगत सांख्यिकी
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Trophies & Performance Profile
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-hindi">
              सभी उपलब्धियां और आंकड़े आपके ब्राउज़र (Local Storage) में स्वतः सुरक्षित रहते हैं। किसी खाते (Login) की आवश्यकता नहीं है।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportData}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition border border-slate-700"
              title="Download your progress JSON file"
            >
              <Download size={14} /> Backup Stats
            </button>
            <button
              onClick={() => {
                if (window.confirm('क्या आप अपनी सभी प्रगति रीसेट करना चाहते हैं? (Reset all progress?)')) {
                  onResetStats();
                }
              }}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition border border-rose-500/20"
              title="Reset progress"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl">
              ⚡
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">Peak Speed</span>
              <span className="text-2xl font-black text-white">{highestWpm} <span className="text-xs text-slate-400">WPM</span></span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
              ✍️
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">Words Typed</span>
              <span className="text-2xl font-black text-white">{totalWords}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
              🎓
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">Lessons Mastered</span>
              <span className="text-2xl font-black text-white">{totalCompletedLessons}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center text-xl">
              🏆
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-semibold block uppercase">Badges Earned</span>
              <span className="text-2xl font-black text-amber-400">{unlockedIds.size} / {BADGES_DEFINITION.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span>उपलब्धि पदक (Achievement Badges)</span>
          <span className="text-xs font-normal text-slate-400">
            ({unlockedIds.size} Unlocked)
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BADGES_DEFINITION.map((badge) => {
            const isUnlocked = unlockedIds.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`relative rounded-2xl p-5 border transition-all duration-200 flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-slate-900/90 border-slate-700/80 shadow-lg shadow-indigo-500/5'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60 grayscale'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr flex items-center justify-center text-3xl shadow-inner border border-white/10">
                      {badge.icon}
                    </div>

                    {isUnlocked ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle size={11} /> Unlocked
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 text-[10px] font-semibold">
                        Locked
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-white text-base">
                    {badge.name}
                  </h3>
                  <h4 className="text-xs font-semibold text-amber-400/90 mt-0.5 font-hindi">
                    {badge.hindiName}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-hindi leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500">
                  {isUnlocked ? 'प्राप्त हुआ • Achieved' : 'अभ्यास करके अनलॉक करें'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Banner Ad */}
      <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
    </div>
  );
}
