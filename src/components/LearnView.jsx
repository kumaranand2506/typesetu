import React, { useState, useEffect, useRef } from 'react';
import { getAllLessons, getPhases, getPhaseForLevel } from '../data/lessonsEngine';
import { useTypingEngine } from '../hooks/useTypingEngine';
import IntegratedKeyboardHands from './IntegratedKeyboardHands';
import RollingTextDisplay from './RollingTextDisplay';
import AdBanner from './AdBanner';
import { checkNewBadges } from '../data/badgeSystem';
import {
  ArrowLeft,
  RotateCcw,
  ArrowRight,
  Star,
  Award,
  Zap,
  Target,
  AlertCircle,
  Sparkles,
  Keyboard,
  Search,
  ChevronLeft,
  ChevronRight,
  Layers,
  Lock,
  Unlock,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function LearnView({
  language,
  userStats,
  onUpdateStats,
  onUnlockBadge,
  onOpenAdSettings,
  onToggleFocusMode = null,
  isFocusMode = false,
}) {
  const allLessons = getAllLessons(language);
  const phases = getPhases(language);

  const [activeLessonId, setActiveLessonId] = useState(null);
  const [inputMode, setInputMode] = useState('mapper'); // 'mapper' | 'native'
  const [selectedPhaseId, setSelectedPhaseId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 24;

  const [completionResult, setCompletionResult] = useState(null);

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || null;
  const inputContainerRef = useRef(null);

  // Lesson completion & passing criteria:
  // - Minimum 90% accuracy required to pass & unlock next lesson
  // - 1 Star: 85-89%, 2 Stars: 90-97%, 3 Stars: 98-100%
  const handleLessonComplete = (stats) => {
    let stars = 0;
    if (stats.accuracy >= 98) {
      stars = 3;
    } else if (stats.accuracy >= 90) {
      stars = 2;
    } else if (stats.accuracy >= 85) {
      stars = 1;
    }

    const passed = stats.accuracy >= 90;

    const result = {
      ...stats,
      stars,
      passed,
      lessonId: activeLesson.id,
      isExam: activeLesson.level >= 270,
    };
    setCompletionResult(result);

    const updatedStats = {
      ...userStats,
      completedLessons: {
        ...userStats.completedLessons,
        [activeLesson.id]: {
          stars: Math.max(userStats.completedLessons?.[activeLesson.id]?.stars || 0, stars),
          wpm: Math.max(userStats.completedLessons?.[activeLesson.id]?.wpm || 0, stats.wpm),
          accuracy: Math.max(userStats.completedLessons?.[activeLesson.id]?.accuracy || 0, stats.accuracy),
          passed: Boolean(userStats.completedLessons?.[activeLesson.id]?.passed || passed),
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
    currentGrossWpm,
    currentAccuracy,
    cpm,
    targetChar,
    targetKeyInfo,
    upcomingSequence,
    lastPressedPhysicalKey,
    handleKeyDown,
    hiddenInputRef,
    focusInput,
    errorMode,
    setErrorMode,
    strictError,
    streak,
    hesitationPrompt,
    progressPercent,
  } = useTypingEngine({
    targetText: activeLesson ? activeLesson.text : '',
    language,
    inputMode,
    initialErrorMode: 'strict', // Pedagogical default: enforce Backspace error correction
    onComplete: handleLessonComplete,
  });

  // Auto-focus container
  useEffect(() => {
    if (activeLesson && inputContainerRef.current) {
      inputContainerRef.current.focus();
    }
  }, [activeLesson, activeLessonId]);

  const handleNextLesson = () => {
    const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
      setActiveLessonId(allLessons[currentIndex + 1].id);
      setCompletionResult(null);
    } else {
      setActiveLessonId(null);
      setCompletionResult(null);
    }
  };

  const handleRestart = () => {
    setCompletionResult(null);
    if (inputContainerRef.current) {
      inputContainerRef.current.focus();
    }
  };

  // Filter lessons by Phase & Search query
  const filteredLessons = allLessons.filter((lesson) => {
    if (selectedPhaseId !== 'all' && lesson.phaseId !== Number(selectedPhaseId)) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lesson.title.toLowerCase().includes(q) ||
        lesson.subtitle.toLowerCase().includes(q) ||
        lesson.text.toLowerCase().includes(q) ||
        String(lesson.level).includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredLessons.length / pageSize) || 1;
  const paginatedLessons = filteredLessons.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // LEVEL SELECTION DASHBOARD (300 PROGRESSIVE LESSONS)
  if (!activeLesson) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6 select-none">
        <AdBanner position="header" onOpenSettings={onOpenAdSettings} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2 border border-indigo-500/20">
              <Sparkles size={14} /> Muscle-Memory Touch Typing Curriculum
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'hindi' ? 'हिंदी कुर्ती देव ०१० (रेमिंगटन) 300 पाठ्य-शृंखला' : 'English Touch Typing: 300 Lesson Mastery'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-hindi leading-relaxed">
              {language === 'hindi'
                ? 'गृह पंक्ति से लेकर ऊपरी/निचली पंक्ति, छोटी \'ि\' के रेमिंगटन नियम, आधे अक्षर एवं शासकीय परीक्षा मानक (CPCT/SSC) तक।'
                : 'Progressive phased curriculum: Home Row anchor, spacebar rhythm, top & bottom reaches, shift discipline, and programmer syntax.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Curriculum</span>
              <span className="text-lg font-black text-indigo-400">300 Levels</span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Peak Speed</span>
              <span className="text-lg font-black text-emerald-400">{userStats.highestWpm || 0}</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Mastered</span>
              <span className="text-lg font-black text-amber-400">
                {Object.keys(userStats.completedLessons || {}).filter(k => k.startsWith(language === 'hindi' ? 'hi-' : 'en-')).length}
              </span>
            </div>
          </div>
        </div>

        {/* Phased Curriculum Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          <button
            onClick={() => { setSelectedPhaseId('all'); setCurrentPage(1); }}
            className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
              selectedPhaseId === 'all'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="text-base mb-1">🌟</div>
            <div className="font-bold text-xs truncate">All Phases</div>
            <div className="text-[10px] opacity-75">300 Lessons</div>
          </button>

          {phases.map((ph) => {
            const isSelected = selectedPhaseId === String(ph.id);
            return (
              <button
                key={ph.id}
                onClick={() => { setSelectedPhaseId(String(ph.id)); setCurrentPage(1); }}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-base mb-1">{ph.icon}</div>
                <div className="font-bold text-xs truncate">
                  {ph.name.split(':')[0]}
                </div>
                <div className="text-[10px] opacity-75">
                  Lvl {ph.range[0]}–{ph.range[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Search & Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search level #, keys, or words..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Showing {filteredLessons.length} lessons</span>
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5 ml-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 font-mono text-slate-200">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 24 Progressive Lesson Cards Grid per page */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedLessons.map((lesson) => {
            const progress = userStats.completedLessons?.[lesson.id];
            const stars = progress?.stars || 0;
            const isDone = Boolean(progress && progress.accuracy >= 90);

            // Progressive unlocking rule:
            // Level 1 is always unlocked.
            // Level N is unlocked if level N-1 has been passed with >= 90% accuracy.
            const prefix = language === 'hindi' ? 'hi-' : 'en-';
            const prevId = `${prefix}${lesson.level - 1}`;
            const prevCompleted = userStats.completedLessons?.[prevId];
            const isUnlocked = lesson.level === 1 || Boolean(prevCompleted?.accuracy >= 90) || Boolean(progress);

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  setCompletionResult(null);
                }}
                className={`group relative rounded-2xl p-4 sm:p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  !isUnlocked
                    ? 'bg-slate-950/40 border-slate-900/90 text-slate-600 hover:border-slate-800 opacity-70'
                    : isDone
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-indigo-500/60 hover:bg-slate-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-7 h-7 rounded-lg font-extrabold flex items-center justify-center text-xs border ${
                        !isUnlocked
                          ? 'bg-slate-900 text-slate-500 border-slate-800'
                          : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                      }`}>
                        {lesson.level}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {lesson.tier === 1 ? 'Tier 1: Drills' : lesson.tier === 2 ? 'Tier 2: Words' : 'Tier 3: Flow'}
                      </span>
                    </div>

                    <div className="flex items-center gap-0.5">
                      {!isUnlocked ? (
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <Lock size={12} /> Locked
                        </span>
                      ) : (
                        [1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            size={13}
                            className={s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-800'}
                          />
                        ))
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition font-hindi line-clamp-1">
                    {lesson.title}
                  </h3>
                  <h4 className="text-[11px] font-semibold text-indigo-400/90 mt-0.5 font-hindi line-clamp-1">
                    {lesson.subtitle}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1.5 font-hindi line-clamp-2 leading-relaxed">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-medium">
                    🎯 {lesson.targetWpm} WPM (90% Acc)
                  </span>

                  {isDone ? (
                    <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle2 size={13} /> {progress.wpm} WPM
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition text-xs flex items-center gap-0.5">
                      Start →
                    </span>
                  ) : (
                    <span className="text-slate-600 text-[10px]">
                      Pass Lvl {lesson.level - 1}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
      </div>
    );
  }

  // ACTIVE LESSON VIEW WITH LIVE SPEEDOMETER, REAL-TIME HAND OVERLAY & SAFEGUARDS
  return (
    <div
      ref={inputContainerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-7xl mx-auto px-4 py-3 sm:py-4 space-y-2.5 focus:outline-none select-none"
    >
      {/* Sleek Header: Back to lessons, Lesson Title, Tier Badge & Zen Mode */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl px-3.5 py-1.5 backdrop-blur-sm">
        <button
          onClick={() => {
            setActiveLessonId(null);
            setCompletionResult(null);
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft size={15} />
          <span>{language === 'hindi' ? 'सभी पाठ (300)' : 'All Lessons (300)'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
            Lvl {activeLesson.level}
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-400 font-semibold text-[11px] hidden sm:inline">
            {activeLesson.tier === 1 ? 'Tier 1: Drills' : activeLesson.tier === 2 ? 'Tier 2: Words' : 'Tier 3: Flow'}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-white font-hindi truncate max-w-xs sm:max-w-md">
            {activeLesson.title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {language === 'hindi' ? (
            <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setInputMode('mapper')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  inputMode === 'mapper' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                रेमिंगटन मैपर
              </button>
              <button
                onClick={() => setInputMode('native')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  inputMode === 'native' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                सिस्टम
              </button>
            </div>
          ) : null}

          {onToggleFocusMode && (
            <button
              type="button"
              onClick={onToggleFocusMode}
              className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-medium flex items-center gap-1 cursor-pointer transition"
              title="Toggle Distraction-Free Focus Mode"
            >
              <span>{isFocusMode ? 'Exit Zen' : 'Zen Focus'}</span>
            </button>
          )}
        </div>
      </div>

      {/* SPECIAL HINDI PHASE 4 'f' MATRA INSTRUCTIONAL BANNER */}
      {language === 'hindi' && activeLesson.phaseId === 4 && (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-hindi">
          <Info size={16} className="text-amber-400 shrink-0" />
          <span>
            <strong>रेमिंगटन टाइपराइटर नियम:</strong> छोटी <strong>'ि' (F कुँजी)</strong> हमेशा व्यंजन से <em>पहले</em> टाइप की जाती है! उदा. कि = <code>f + d</code>, दिन = <code>f + n</code>, सिर = <code>f + l + j</code>
          </span>
        </div>
      )}

      {/* TWO-LINE ROLLING CAROUSEL TEXT ENGINE WITH MINIMAL TELEMETRY PILL & STREAK */}
      <RollingTextDisplay
        targetText={activeLesson ? activeLesson.text : ''}
        typedIndex={typedIndex}
        history={history}
        strictError={strictError}
        errorMode={errorMode}
        onToggleErrorMode={setErrorMode}
        hiddenInputRef={hiddenInputRef}
        onKeyDown={handleKeyDown}
        onFocusTypingArea={focusInput}
        language={language}
        wpm={currentWpm}
        grossWpm={currentGrossWpm}
        accuracy={currentAccuracy}
        progressPercent={progressPercent}
        mistakes={mistakes}
        streak={streak}
        hesitationPrompt={hesitationPrompt}
        onRestart={handleRestart}
      />

      {/* INTEGRATED KEYBOARD WITH REALISTIC ORGANIC HAND OVERLAYS & REAL-TIME SHIFT UPDATES */}
      <IntegratedKeyboardHands
        targetKey={targetKeyInfo?.key || null}
        targetShift={targetKeyInfo?.shift || false}
        language={language}
        pressedKey={lastPressedPhysicalKey}
      />

      {/* Optimized Ad Banner Location: Bottom Footer */}
      {!isFocusMode && (
        <div className="pt-2">
          <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
        </div>
      )}

      {/* LESSON COMPLETION MODAL WITH 90% PASS CRITERIA & STAR RATINGS */}
      {completionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative space-y-6">
            <div>
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    size={36}
                    className={s <= completionResult.stars ? 'text-amber-400 fill-amber-400 animate-bounce' : 'text-slate-800'}
                  />
                ))}
              </div>

              {completionResult.passed ? (
                <>
                  <h3 className="text-2xl font-black text-white font-hindi">
                    {completionResult.stars === 3
                      ? '🎉 उत्कृष्ट प्रदर्शन! (3 Stars Mastery!)'
                      : '👍 पाठ सफल! (Lesson Passed!)'}
                  </h3>
                  <p className="text-xs text-emerald-400 font-semibold mt-1">
                    ✓ न्यूनतम 90% शुद्धता मानक पूर्ण — अगला पाठ अनलॉक हुआ!
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-rose-400 font-hindi">
                    ⚠️ पुनः प्रयास करें (90% शुद्धता आवश्यक)
                  </h3>
                  <p className="text-xs text-slate-400 font-hindi mt-1">
                    अगला पाठ अनलॉक करने के लिए कम से कम 90% शुद्धता आवश्यक है।
                  </p>
                </>
              )}
              <p className="text-sm text-slate-300 font-hindi mt-1.5 font-bold">
                {activeLesson.title}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Speed</span>
                <span className="text-2xl font-black text-indigo-400">{completionResult.wpm}</span>
                <span className="text-[10px] text-slate-500 block">WPM</span>
              </div>
              <div className="text-center border-x border-slate-800">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Accuracy</span>
                <span className={`text-2xl font-black ${completionResult.passed ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {completionResult.accuracy}%
                </span>
                <span className="text-[10px] text-slate-500 block">लक्ष्य: ≥90%</span>
              </div>
              <div className="text-center">
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Mistakes</span>
                <span className="text-2xl font-black text-rose-400">{completionResult.mistakes}</span>
                <span className="text-[10px] text-slate-500 block">त्रुटियाँ</span>
              </div>
            </div>

            <AdBanner position="practice-complete" onOpenSettings={onOpenAdSettings} />

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <RotateCcw size={15} /> पुनः अभ्यास (Retry)
              </button>
              {completionResult.passed ? (
                <button
                  onClick={handleNextLesson}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition"
                >
                  अगला पाठ (Next) <ArrowRight size={15} />
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800/60 text-slate-500 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed border border-slate-800"
                  title="अगले पाठ के लिए 90%+ शुद्धता आवश्यक है"
                >
                  <Lock size={14} /> अगला पाठ बंद (Locked)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
