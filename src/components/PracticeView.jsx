import React, { useState, useEffect, useRef } from 'react';
import { HINDI_PRACTICE, ENGLISH_PRACTICE } from '../data/practiceData';
import { useTypingEngine } from '../hooks/useTypingEngine';
import HandsDisplay from './HandsDisplay';
import VirtualKeyboard from './VirtualKeyboard';
import AdBanner from './AdBanner';
import { checkNewBadges } from '../data/badgeSystem';
import { BookOpen, RotateCcw, Sparkles, Zap, Target, Clock, AlertCircle, Eye, EyeOff, FileText, CheckCircle, Keyboard } from 'lucide-react';

export default function PracticeView({
  language,
  userStats,
  onUpdateStats,
  onUnlockBadge,
  onOpenAdSettings,
}) {
  const passages = language === 'hindi' ? HINDI_PRACTICE : ENGLISH_PRACTICE;

  const [selectedPassageId, setSelectedPassageId] = useState(passages[0]?.id || 'custom');
  const [customText, setCustomText] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [inputMode, setInputMode] = useState('mapper'); // 'mapper' | 'native'
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [completionResult, setCompletionResult] = useState(null);

  // Identify current passage text
  let currentPassage = passages.find((p) => p.id === selectedPassageId);
  if (!currentPassage && selectedPassageId === 'custom' && customText) {
    currentPassage = {
      id: 'custom',
      title: customTitle || (language === 'hindi' ? 'कस्टम लेख (Custom Text)' : 'Custom Passage'),
      author: 'User',
      category: 'Custom',
      text: customText,
    };
  } else if (!currentPassage) {
    currentPassage = passages[0];
  }

  const typingBoxRef = useRef(null);

  const handlePracticeComplete = (stats) => {
    const result = {
      ...stats,
      passageId: currentPassage?.id,
      isExam: currentPassage?.category?.includes('Exam') || currentPassage?.category?.includes('परीक्षा'),
    };
    setCompletionResult(result);

    const updatedStats = {
      ...userStats,
      completedPractice: {
        ...userStats.completedPractice,
        [currentPassage?.id]: {
          wpm: Math.max(userStats.completedPractice?.[currentPassage?.id]?.wpm || 0, stats.wpm),
          accuracy: Math.max(userStats.completedPractice?.[currentPassage?.id]?.accuracy || 0, stats.accuracy),
        },
      },
      highestWpm: Math.max(userStats.highestWpm || 0, stats.wpm),
      totalWordsTyped: (userStats.totalWordsTyped || 0) + Math.round(stats.charactersTyped / 5),
    };

    const newBadges = checkNewBadges(updatedStats, result);
    if (newBadges.length > 0) {
      updatedStats.unlockedBadges = [...new Set([...(updatedStats.unlockedBadges || []), ...newBadges])];
      newBadges.forEach((bId) => onUnlockBadge(bId));
    }

    onUpdateStats(updatedStats);
  };

  const {
    typedIndex,
    history,
    mistakes,
    isCompleted,
    currentWpm,
    currentAccuracy,
    targetChar,
    targetKeyInfo,
    lastPressedPhysicalKey,
    handleKeyDown,
    progressPercent,
  } = useTypingEngine({
    targetText: currentPassage?.text || '',
    language,
    inputMode,
    onComplete: handlePracticeComplete,
  });

  // Focus container
  useEffect(() => {
    if (typingBoxRef.current) {
      typingBoxRef.current.focus();
    }
  }, [selectedPassageId, customText]);

  const categories = ['All', ...new Set(passages.map((p) => p.category))];
  const filteredPassages = activeCategory === 'All'
    ? passages
    : passages.filter((p) => p.category === activeCategory);

  const handleApplyCustom = () => {
    if (!customText.trim()) return;
    setSelectedPassageId('custom');
    setShowCustomModal(false);
    setCompletionResult(null);
  };

  const handleReset = () => {
    setCompletionResult(null);
    if (typingBoxRef.current) typingBoxRef.current.focus();
  };

  return (
    <div
      ref={typingBoxRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-7xl mx-auto px-4 py-6 space-y-6 focus:outline-none select-none"
    >
      {/* Top Banner Ad */}
      <AdBanner position="header" onOpenSettings={onOpenAdSettings} />

      {/* TypeLit-Style Header & Book Shelf */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold mb-1 border border-violet-500/20">
              <BookOpen size={14} /> {language === 'hindi' ? 'साहित्य एवं परीक्षा अभ्यास (TypeLit Mode)' : 'Literature & Exam Room'}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-hindi">
              {currentPassage?.title}
            </h1>
            <p className="text-xs text-slate-400 font-hindi mt-0.5">
              रचनाकार / लेखक: <span className="text-slate-200 font-semibold">{currentPassage?.author || 'अज्ञात'}</span> • श्रेणी: {currentPassage?.category}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Input Mode Toggle (Hindi) */}
            {language === 'hindi' && (
              <button
                onClick={() => setInputMode(inputMode === 'mapper' ? 'native' : 'mapper')}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition"
              >
                <Keyboard size={14} className="text-indigo-400" />
                <span>{inputMode === 'mapper' ? 'इनस्क्रिप्ट मैपर' : 'सिस्टम कीबोर्ड'}</span>
              </button>
            )}

            {/* Toggle Keyboard Helper (Zen Mode) */}
            <button
              onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition"
              title="Toggle Keyboard & Finger visualizer"
            >
              {showKeyboardGuide ? <EyeOff size={14} className="text-amber-400" /> : <Eye size={14} className="text-emerald-400" />}
              <span>{showKeyboardGuide ? 'Zen Mode (Hide Keys)' : 'Show Keys & Hands'}</span>
            </button>

            {/* Custom Passage Button */}
            <button
              onClick={() => setShowCustomModal(true)}
              className="px-3 py-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 hover:bg-indigo-600/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition"
            >
              <FileText size={14} />
              <span>{language === 'hindi' ? '+ अपना लेख जोड़ें' : '+ Custom Text'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
              title="पुनः प्रारंभ करें (Restart)"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Category Pills & Passage Quick Selector */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Passage Dropdown */}
          <select
            value={selectedPassageId}
            onChange={(e) => {
              setSelectedPassageId(e.target.value);
              setCompletionResult(null);
            }}
            className="bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 max-w-xs cursor-pointer font-hindi"
          >
            {filteredPassages.map((p) => (
              <option key={p.id} value={p.id}>
                📖 {p.title}
              </option>
            ))}
            {customText && <option value="custom">📝 {customTitle || 'Custom Text'}</option>}
          </select>
        </div>
      </div>

      {/* Live Minimal Stats Ribbon (TypeLit Aesthetic) */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400 font-medium">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-400" />
            Speed: <strong className="text-white text-sm">{currentWpm}</strong> WPM
          </span>
          <span className="flex items-center gap-1.5">
            <Target size={14} className="text-blue-400" />
            Accuracy: <strong className="text-white text-sm">{currentAccuracy}%</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <AlertCircle size={14} className="text-rose-400" />
            Mistakes: <strong className="text-rose-400 text-sm">{mistakes}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>{progressPercent}% Complete</span>
          <div className="w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 transition-all duration-150" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Literature Reading Book Container (Fluid TypeLit Experience) */}
      <div className="relative bg-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl min-h-[220px] max-h-[380px] overflow-y-auto leading-relaxed select-none">
        <div className="text-xl sm:text-2xl lg:text-3xl font-hindi leading-[2.2] tracking-wide font-normal">
          {currentPassage?.text.split('').map((char, idx) => {
            let color = 'text-slate-500';
            const isCurrent = idx === typedIndex;

            if (idx < typedIndex) {
              const hist = history[idx];
              color = hist?.status === 'correct'
                ? 'text-emerald-400'
                : 'text-rose-500 bg-rose-500/20 rounded underline decoration-rose-500';
            } else if (isCurrent) {
              color = 'text-white bg-indigo-500/30 px-0.5 rounded ring-2 ring-indigo-400 shadow-md shadow-indigo-500/40 animate-pulse';
            }

            return (
              <span key={idx} className={`transition-colors duration-75 ${color}`}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Current Key Cue */}
        {targetKeyInfo && !isCompleted && (
          <div className="sticky bottom-0 mt-6 py-2 px-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-sm flex items-center justify-between text-xs text-slate-300">
            <span>
              Next Key: <span className="text-amber-300 font-mono-custom font-bold uppercase text-sm ml-1">{targetKeyInfo.key === ' ' ? 'Spacebar' : targetKeyInfo.key}</span>
              {targetKeyInfo.shift && <span className="ml-1 text-amber-400 font-bold">(+ Shift)</span>}
            </span>
            <span className="text-slate-400">
              Finger: <strong className="text-indigo-300">{targetKeyInfo.finger}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Optional Virtual Keyboard & 10 Fingers View (Shown unless Zen Mode is on) */}
      {showKeyboardGuide && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start pt-2">
          <div className="lg:col-span-4 flex justify-center">
            <HandsDisplay
              activeFinger={targetKeyInfo?.finger || null}
              language={language}
            />
          </div>
          <div className="lg:col-span-8 flex justify-center">
            <VirtualKeyboard
              targetKey={targetKeyInfo?.key || null}
              targetShift={targetKeyInfo?.shift || false}
              language={language}
              pressedKey={lastPressedPhysicalKey}
            />
          </div>
        </div>
      )}

      {/* Custom Text Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-white font-hindi">
              {language === 'hindi' ? 'अपना लेख या पाठ जोड़ें' : 'Paste Your Custom Text'}
            </h3>
            <p className="text-xs text-slate-400">
              Paste any custom passage in Hindi or English to practice typing with full 10-finger feedback and speed tracking.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Passage Title</label>
              <input
                type="text"
                placeholder="e.g. My Essay / निबंध"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500 font-hindi"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Passage Content</label>
              <textarea
                rows={5}
                placeholder="यहाँ अपना हिंदी या अंग्रेजी लेख पेस्ट करें..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-indigo-500 font-hindi leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustom}
                disabled={!customText.trim()}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-semibold shadow-md cursor-pointer"
              >
                अभ्यास शुरू करें (Start Practice)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal Result Overlay */}
      {completionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative space-y-6">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center text-3xl mb-3 border border-indigo-500/30">
                📚
              </div>
              <h3 className="text-2xl font-black text-white font-hindi">
                अभ्यास संपन्न! (Practice Completed!)
              </h3>
              <p className="text-sm text-slate-400 font-hindi mt-1">
                {currentPassage?.title}
              </p>
            </div>

            {/* Scorecard */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Speed</span>
                <span className="text-2xl font-black text-indigo-400">{completionResult.wpm}</span>
                <span className="text-[10px] text-slate-500 block">WPM</span>
              </div>
              <div className="text-center border-x border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Accuracy</span>
                <span className="text-2xl font-black text-emerald-400">{completionResult.accuracy}%</span>
                <span className="text-[10px] text-slate-500 block">सटीकता</span>
              </div>
              <div className="text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Time</span>
                <span className="text-2xl font-black text-amber-400">{completionResult.timeSeconds}s</span>
                <span className="text-[10px] text-slate-500 block">समय</span>
              </div>
            </div>

            {/* In-Card Ad Banner */}
            <AdBanner position="practice-complete" onOpenSettings={onOpenAdSettings} />

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <RotateCcw size={15} /> पुनः अभ्यास (Retry)
              </button>
              <button
                onClick={() => setCompletionResult(null)}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition"
              >
                नया पाठ चुनें (Choose Another)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Banner Ad */}
      <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
    </div>
  );
}
