import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, Award, BookOpen, GraduationCap, Grid, Info, DollarSign } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function Navbar({
  currentLanguage,
  onLanguageChange,
  activeTab,
  onTabChange,
  userStats,
  onOpenAdSettings,
  onOpenPolicy,
  onOpenChart,
}) {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const handleToggleSound = () => {
    const next = soundManager.toggleMute();
    setIsMuted(next);
  };

  const unlockedBadgeCount = userStats?.unlockedBadges?.length || 0;
  const streak = userStats?.currentStreak || 1;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('learn')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition">
              <span>कA</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
                  Type<span className="text-indigo-400">Setu</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  टाइपसेतु
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Bilingual InScript & English Touch Tutor
              </p>
            </div>
          </button>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onTabChange('learn')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap size={15} />
            <span>{currentLanguage === 'hindi' ? 'सीखें (Learn)' : 'Learn'}</span>
          </button>

          <button
            onClick={() => onTabChange('practice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen size={15} />
            <span>{currentLanguage === 'hindi' ? 'अभ्यास (Practice)' : 'Practice'}</span>
          </button>

          <button
            onClick={() => onTabChange('badges')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award size={15} className={unlockedBadgeCount > 0 ? 'text-amber-400' : ''} />
            <span className="hidden md:inline">{currentLanguage === 'hindi' ? 'उपलब्धियां' : 'Badges'}</span>
            {unlockedBadgeCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-bold">
                {unlockedBadgeCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenChart}
            className="hidden lg:flex px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition cursor-pointer items-center gap-1"
            title="InScript Keyboard Layout Chart"
          >
            <Grid size={14} />
            <span>InScript Chart</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-xs font-bold">
            <button
              onClick={() => onLanguageChange('hindi')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer font-hindi ${
                currentLanguage === 'hindi'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('english')}
              className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                currentLanguage === 'english'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title={isMuted ? 'Unmute Typing Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX size={17} className="text-rose-400" /> : <Volume2 size={17} className="text-emerald-400" />}
          </button>

          {/* Monetize & Domain Guide Button */}
          <button
            onClick={onOpenAdSettings}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="Configure Google AdSense or Adsterra Ads"
          >
            <DollarSign size={14} />
            <span className="hidden sm:inline">Earn / Ads</span>
          </button>

          {/* Policy / About */}
          <button
            onClick={onOpenPolicy}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="About Us, Privacy Policy & Terms"
          >
            <Info size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
