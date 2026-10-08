import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LearnView from './components/LearnView';
import BookPracticeView from './components/BookPracticeView';
import PracticeView from './components/PracticeView';
import BadgesView from './components/BadgesView';
import AdSettingsModal from './components/AdSettingsModal';
import PolicyModal from './components/PolicyModal';
import KrutiDevChartModal from './components/KrutiDevChartModal';
import BadgeModal from './components/BadgeModal';
import { getUserStats, saveUserStats } from './data/badgeSystem';
import { Heart, Sparkles, BookOpen, GraduationCap, Award, Grid, ShieldCheck, DollarSign, Library } from 'lucide-react';

import ExamView from './components/ExamView';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      return localStorage.getItem('typesetu_lang') || 'hindi';
    } catch (e) {
      return 'hindi';
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('typesetu_theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'books' | 'practice' | 'exam' | 'badges'
  const [userStats, setUserStats] = useState(() => getUserStats());
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Modals
  const [isAdSettingsOpen, setIsAdSettingsOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [unlockedBadgeId, setUnlockedBadgeId] = useState(null);

  // Sync theme with <html> class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('typesetu_theme', theme);
    } catch (e) {}
  }, [theme]);

  // Global Escape key to exit Focus Mode
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === 'Escape' && isFocusMode) {
        setIsFocusMode(false);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isFocusMode]);

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    try {
      localStorage.setItem('typesetu_lang', lang);
    } catch (e) {}
  };

  const handleUpdateStats = (newStats) => {
    setUserStats(newStats);
    saveUserStats(newStats);
  };

  const handleResetStats = () => {
    const emptyStats = {
      completedLessons: {},
      completedPractice: {},
      unlockedBadges: [],
      totalWordsTyped: 0,
      totalPracticeSeconds: 0,
      highestWpm: 0,
      currentStreak: 1,
      lastActiveDate: new Date().toISOString().slice(0, 10),
    };
    handleUpdateStats(emptyStats);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      theme === 'dark' ? 'bg-[#0b0f17] text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* Floating Exit Focus Mode Pill */}
      {isFocusMode && (
        <div className="fixed top-3 right-4 z-50 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 rounded-full px-3.5 py-1.5 shadow-2xl backdrop-blur-md text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200 font-semibold">Focus Mode</span>
          <button
            onClick={() => setIsFocusMode(false)}
            className="ml-2 text-slate-300 hover:text-white px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 font-bold cursor-pointer text-[11px]"
            title="Exit Focus Mode (Esc)"
          >
            Exit (Esc)
          </button>
        </div>
      )}

      {/* Top Navigation (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <Navbar
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userStats={userStats}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenAdSettings={() => setIsAdSettingsOpen(true)}
          onOpenPolicy={() => setIsPolicyOpen(true)}
          onOpenChart={() => setIsChartModalOpen(true)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {activeTab === 'learn' && (
          <LearnView
            language={currentLanguage}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            onUnlockBadge={(bId) => setUnlockedBadgeId(bId)}
            onOpenAdSettings={() => setIsAdSettingsOpen(true)}
            onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
            isFocusMode={isFocusMode}
          />
        )}

        {activeTab === 'books' && (
          <BookPracticeView
            language={currentLanguage}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            onUnlockBadge={(bId) => setUnlockedBadgeId(bId)}
            onOpenAdSettings={() => setIsAdSettingsOpen(true)}
            onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
            isFocusMode={isFocusMode}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            language={currentLanguage}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            onUnlockBadge={(bId) => setUnlockedBadgeId(bId)}
            onOpenAdSettings={() => setIsAdSettingsOpen(true)}
            onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
            isFocusMode={isFocusMode}
          />
        )}

        {activeTab === 'exam' && (
          <ExamView
            language={currentLanguage}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            onUnlockBadge={(bId) => setUnlockedBadgeId(bId)}
            onOpenAdSettings={() => setIsAdSettingsOpen(true)}
            onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
            isFocusMode={isFocusMode}
          />
        )}

        {activeTab === 'badges' && (
          <BadgesView
            userStats={userStats}
            onResetStats={handleResetStats}
            onOpenAdSettings={() => setIsAdSettingsOpen(true)}
          />
        )}
      </main>

      {/* Footer (Hidden in Focus Mode) */}
      {!isFocusMode && (
        <footer className="w-full border-t border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-950/70 dark:bg-slate-950/70 light:bg-slate-100 py-8 px-4 sm:px-6 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white dark:text-white light:text-slate-900 text-sm">
                  TypeSetu (टाइपसेतु) v2.0
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">
                  Enterprise Bilingual Kruti Dev 010 & English Touch Typing Platform
                </span>
              </div>
            </div>

            {/* Quick Footer Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <button
                onClick={() => { setActiveTab('learn'); setCurrentLanguage('hindi'); }}
                className="hover:text-indigo-400 transition cursor-pointer font-hindi"
              >
                300 हिंदी पाठ
              </button>
              <button
                onClick={() => { setActiveTab('learn'); setCurrentLanguage('english'); }}
                className="hover:text-indigo-400 transition cursor-pointer"
              >
                300 English Lessons
              </button>
              <button
                onClick={() => setActiveTab('books')}
                className="hover:text-indigo-400 transition cursor-pointer"
              >
                100+ Classic Books
              </button>
              <button
                onClick={() => setActiveTab('exam')}
                className="hover:text-emerald-400 transition cursor-pointer font-semibold text-emerald-400"
              >
                CPCT / SSC Exam Mock
              </button>
              <button
                onClick={() => setIsChartModalOpen(true)}
                className="hover:text-indigo-400 transition cursor-pointer"
              >
                Kruti Dev Chart
              </button>
              <button
                onClick={() => setIsAdSettingsOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 transition cursor-pointer font-semibold flex items-center gap-1"
              >
                <DollarSign size={13} /> Ads & Domain
              </button>
              <button
                onClick={() => setIsPolicyOpen(true)}
                className="hover:text-indigo-400 transition cursor-pointer"
              >
                Privacy & About
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-900 dark:border-slate-900 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
            <div>
              Anonymous touch typing • No account required • Stored securely in your browser
            </div>
            <div>
              Kruti Dev 010 Remington Typewriter • CPCT, SSC CGL/CHSL & Court Exam Approved
            </div>
          </div>
        </footer>
      )}

      {/* Modals */}
      <AdSettingsModal
        isOpen={isAdSettingsOpen}
        onClose={() => setIsAdSettingsOpen(false)}
      />

      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />

      <KrutiDevChartModal
        isOpen={isChartModalOpen}
        onClose={() => setIsChartModalOpen(false)}
      />

      <BadgeModal
        badgeId={unlockedBadgeId}
        onClose={() => setUnlockedBadgeId(null)}
      />
    </div>
  );
}
