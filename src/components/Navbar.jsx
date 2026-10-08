import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Award, BookOpen, GraduationCap, Grid, Info, DollarSign, Sun, Moon, Library, Shield, Maximize2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export default function Navbar({
  currentLanguage,
  onLanguageChange,
  activeTab,
  onTabChange,
  userStats,
  theme,
  onToggleTheme,
  onOpenAdSettings,
  onOpenPolicy,
  onOpenChart,
}) {
  const [switchProfile, setSwitchProfile] = useState(() => soundManager.getSwitchProfile());

  const handleCycleSound = () => {
    const cycle = { blue: 'brown', brown: 'red', red: 'off', off: 'blue' };
    const next = cycle[switchProfile] || 'blue';
    soundManager.setSwitchProfile(next);
    soundManager.playClick();
    setSwitchProfile(next);
  };

  const unlockedBadgeCount = userStats?.unlockedBadges?.length || 0;

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 dark:bg-slate-950/85 light:bg-white/90 backdrop-blur-md border-b border-slate-800 dark:border-slate-800 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('learn')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-pink-500 flex items-center justify-center font-black text-white text-base shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition">
              <span>{currentLanguage === 'hindi' ? 'क' : 'TS'}</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white dark:text-white light:text-slate-900">
                  Type<span className="text-indigo-400">Setu</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  v2.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                {currentLanguage === 'hindi' ? 'शासकीय एवं व्यावसायिक टाइपिंग सेतु' : 'Bilingual InScript & English Platform'}
              </p>
            </div>
          </button>
        </div>

        {/* Primary Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5">
          {/* 300 Lessons Tab */}
          <button
            onClick={() => onTabChange('learn')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'learn'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap size={15} />
            <span>{currentLanguage === 'hindi' ? '300 पाठ' : '300 Lessons'}</span>
          </button>

          {/* 100+ Books Library Tab */}
          <button
            onClick={() => onTabChange('books')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'books'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Library size={15} />
            <span>{currentLanguage === 'hindi' ? '100+ पुस्तकें' : '100+ Books'}</span>
          </button>

          {/* Practice Room */}
          <button
            onClick={() => onTabChange('practice')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer hidden md:flex ${
              activeTab === 'practice'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen size={15} />
            <span>{currentLanguage === 'hindi' ? 'अभ्यास' : 'Practice'}</span>
          </button>

          {/* Dedicated Govt Exam Simulation Tab */}
          <button
            onClick={() => onTabChange('exam')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'exam'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Shield size={15} className={activeTab === 'exam' ? 'text-white' : 'text-emerald-400'} />
            <span>{currentLanguage === 'hindi' ? 'शासकीय परीक्षा (CPCT)' : 'Govt Exam (CPCT)'}</span>
          </button>

          {/* Badges Tab */}
          <button
            onClick={() => onTabChange('badges')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
              activeTab === 'badges'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 dark:text-slate-300 light:text-slate-600 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award size={15} className={unlockedBadgeCount > 0 ? 'text-amber-400' : ''} />
            <span className="hidden lg:inline">Badges</span>
            {unlockedBadgeCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-slate-950 font-bold">
                {unlockedBadgeCount}
              </span>
            )}
          </button>

          {/* InScript Reference Chart */}
          <button
            onClick={onOpenChart}
            className="hidden xl:flex px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition cursor-pointer items-center gap-1"
            title="InScript Keyboard Layout Chart"
          >
            <Grid size={14} />
            <span>InScript Chart</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-bold">
            <button
              onClick={() => onLanguageChange('hindi')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer font-hindi ${
                currentLanguage === 'hindi'
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => onLanguageChange('english')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                currentLanguage === 'english'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-indigo-400" />}
          </button>

          {/* Mechanical Switch Sound Toggle */}
          <button
            onClick={handleCycleSound}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            title={`Switch Sound: Cherry MX ${switchProfile}. Click to cycle.`}
          >
            {switchProfile === 'off' ? (
              <VolumeX size={15} className="text-rose-400" />
            ) : (
              <Volume2 size={15} className="text-emerald-400" />
            )}
            <span className="hidden sm:inline font-mono text-[10px] uppercase">
              {switchProfile === 'blue' ? 'MX Blue 🔵' : switchProfile === 'brown' ? 'MX Brown 🟤' : switchProfile === 'red' ? 'MX Red 🔴' : 'Mute 🔇'}
            </span>
          </button>

          {/* Monetize & Ads Guide */}
          <button
            onClick={onOpenAdSettings}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            title="Configure Google AdSense or Adsterra Ads"
          >
            <DollarSign size={14} />
            <span className="hidden sm:inline">Earn / Ads</span>
          </button>

          {/* Legal / Policy */}
          <button
            onClick={onOpenPolicy}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            title="About Us, Privacy Policy & Terms"
          >
            <Info size={17} />
          </button>
        </div>
      </div>
    </header>
  );
}
