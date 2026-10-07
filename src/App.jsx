import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LearnView from './components/LearnView';
import PracticeView from './components/PracticeView';
import BadgesView from './components/BadgesView';
import AdSettingsModal from './components/AdSettingsModal';
import PolicyModal from './components/PolicyModal';
import InScriptChartModal from './components/InScriptChartModal';
import BadgeModal from './components/BadgeModal';
import { getUserStats, saveUserStats } from './data/badgeSystem';
import { Heart, Sparkles, BookOpen, GraduationCap, Award, Grid, ShieldCheck, DollarSign } from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      return localStorage.getItem('typesetu_lang') || 'hindi';
    } catch (e) {
      return 'hindi';
    }
  });

  const [activeTab, setActiveTab] = useState('learn'); // 'learn' | 'practice' | 'badges'
  const [userStats, setUserStats] = useState(() => getUserStats());

  // Modals
  const [isAdSettingsOpen, setIsAdSettingsOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [isInScriptChartOpen, setIsInScriptChartOpen] = useState(false);
  const [unlockedBadgeId, setUnlockedBadgeId] = useState(null);

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
    <div className="min-h-screen flex flex-col bg-[#0b0f17] text-slate-100 font-sans">
      {/* Top Navigation */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userStats={userStats}
        onOpenAdSettings={() => setIsAdSettingsOpen(true)}
        onOpenPolicy={() => setIsPolicyOpen(true)}
        onOpenChart={() => setIsInScriptChartOpen(true)}
      />

      {/* Main App Content View */}
      <main className="flex-1 pb-12">
        {activeTab === 'learn' && (
          <LearnView
            language={currentLanguage}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            onUnlockBadge={(bId) => setUnlockedBadgeId(bId)}
            onOpenAdSettings={() => setIsAdSettingsOpen(true)}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeView
            language={currentLanguage}
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            onUnlockBadge={(bId) => setUnlockedBadgeId(bId)}
            onOpenAdSettings={() => setIsAdSettingsOpen(true)}
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

      {/* Footer */}
      <footer className="w-full border-t border-slate-850 bg-slate-950/70 py-8 px-4 sm:px-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">TypeSetu (टाइपसेतु)</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">100% Free & Open Bilingual Touch Typing Tutor</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => { setActiveTab('learn'); setCurrentLanguage('hindi'); }}
              className="hover:text-indigo-400 transition cursor-pointer font-hindi"
            >
              हिंदी इनस्क्रिप्ट ट्यूटर
            </button>
            <button
              onClick={() => { setActiveTab('learn'); setCurrentLanguage('english'); }}
              className="hover:text-indigo-400 transition cursor-pointer"
            >
              English Tutor
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="hover:text-indigo-400 transition cursor-pointer"
            >
              TypeLit Literature
            </button>
            <button
              onClick={() => setIsInScriptChartOpen(true)}
              className="hover:text-indigo-400 transition cursor-pointer"
            >
              InScript Chart
            </button>
            <button
              onClick={() => setIsAdSettingsOpen(true)}
              className="text-emerald-400 hover:text-emerald-300 transition cursor-pointer font-semibold flex items-center gap-1"
            >
              <DollarSign size={13} /> Ads & Domain Guide
            </button>
            <button
              onClick={() => setIsPolicyOpen(true)}
              className="hover:text-indigo-400 transition cursor-pointer"
            >
              Privacy & About
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            Anonymous usage • No registration required • Progress stored in your browser
          </div>
          <div>
            Built with InScript BIS Standard • Ready for CPCT, SSC, & High Court tests
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AdSettingsModal
        isOpen={isAdSettingsOpen}
        onClose={() => setIsAdSettingsOpen(false)}
      />

      <PolicyModal
        isOpen={isPolicyOpen}
        onClose={() => setIsPolicyOpen(false)}
      />

      <InScriptChartModal
        isOpen={isInScriptChartOpen}
        onClose={() => setIsInScriptChartOpen(false)}
      />

      <BadgeModal
        badgeId={unlockedBadgeId}
        onClose={() => setUnlockedBadgeId(null)}
      />
    </div>
  );
}
