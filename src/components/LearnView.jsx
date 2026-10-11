import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  getTypingClubChapters,
  getTypingClubLessons,
} from '../data/typingClubCurriculum';
import { getAllLessons, getPhases } from '../data/lessonsEngine';
import { useTypingEngine } from '../hooks/useTypingEngine';
import IntegratedKeyboardHands from './IntegratedKeyboardHands';
import RollingTextDisplay from './RollingTextDisplay';
import LessonIntroModal from './LessonIntroModal';
import LessonCompletionScoreboard from './LessonCompletionScoreboard';
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
  Layers,
  Lock,
  Unlock,
  CheckCircle2,
  Info,
  BookOpen,
  GraduationCap,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

export default function LearnView({
  language = 'hindi',
  userStats,
  onUpdateStats,
  onUnlockBadge,
  onOpenAdSettings,
  onToggleFocusMode = null,
  isFocusMode = false,
}) {
  // Course curriculum mode: 'typingClub' (6 Chapters) or 'mastery300' (300 Drills)
  const [courseMode, setCourseMode] = useState(() => {
    try {
      return localStorage.getItem('typesetu_course_mode') || 'typingClub';
    } catch (e) {
      return 'typingClub';
    }
  });

  // Hindi Keyboard Layout: 'inscript' (BIS IS 16350) or 'krutiDev' (Remington)
  const [hindiLayout, setHindiLayout] = useState(() => {
    try {
      return localStorage.getItem('typesetu_hindi_layout') || 'inscript';
    } catch (e) {
      return 'inscript';
    }
  });

  const [activeLessonId, setActiveLessonId] = useState(null);
  const [pendingIntroLesson, setPendingIntroLesson] = useState(null);
  const [inputMode, setInputMode] = useState('mapper'); // 'mapper' | 'native'
  const [selectedChapterId, setSelectedChapterId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completionResult, setCompletionResult] = useState(null);

  const inputContainerRef = useRef(null);

  const handleCourseModeChange = (mode) => {
    setCourseMode(mode);
    setActiveLessonId(null);
    setCompletionResult(null);
    setPendingIntroLesson(null);
    try {
      localStorage.setItem('typesetu_course_mode', mode);
    } catch (e) {}
  };

  const handleHindiLayoutChange = (layout) => {
    setHindiLayout(layout);
    try {
      localStorage.setItem('typesetu_hindi_layout', layout);
    } catch (e) {}
  };

  // Lessons and Chapters based on active course mode
  const typingClubLessons = useMemo(() => getTypingClubLessons(language), [language]);
  const typingClubChapters = useMemo(() => getTypingClubChapters(language), [language]);
  const mastery300Lessons = useMemo(() => getAllLessons(language), [language]);
  const mastery300Phases = useMemo(() => getPhases(language), [language]);

  const activeLessonList = courseMode === 'typingClub' ? typingClubLessons : mastery300Lessons;
  const activeLesson = activeLessonList.find((l) => l.id === activeLessonId) || null;

  // Passing criteria: >=90% accuracy
  // Star rating: 1 to 5 Stars (TypingClub pedagogy)
  const handleLessonComplete = (stats) => {
    let stars = 0;
    const targetWpm = activeLesson?.targetWpm || 20;

    if (stats.accuracy >= 98 && stats.wpm >= targetWpm) {
      stars = 5;
    } else if (stats.accuracy >= 95) {
      stars = 4;
    } else if (stats.accuracy >= 90) {
      stars = 3;
    } else if (stats.accuracy >= 85) {
      stars = 2;
    } else if (stats.accuracy >= 80) {
      stars = 1;
    }

    const passed = stats.accuracy >= 90;

    const result = {
      ...stats,
      stars,
      passed,
      lessonId: activeLesson.id,
      isExam: false,
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
    isTypoShaking,
    progressPercent,
  } = useTypingEngine({
    targetText: activeLesson ? activeLesson.text : '',
    language,
    hindiLayout,
    inputMode,
    initialErrorMode: 'strict', // Pedagogical default: enforce correction
    onComplete: handleLessonComplete,
  });

  // Auto-focus container when active lesson starts
  useEffect(() => {
    if (activeLesson && inputContainerRef.current) {
      inputContainerRef.current.focus();
    }
  }, [activeLesson, activeLessonId]);

  const handleStartLessonFromIntro = () => {
    if (pendingIntroLesson) {
      setActiveLessonId(pendingIntroLesson.id);
      setPendingIntroLesson(null);
      setCompletionResult(null);
    }
  };

  const handleNextLesson = () => {
    const currentIndex = activeLessonList.findIndex((l) => l.id === activeLessonId);
    if (currentIndex >= 0 && currentIndex < activeLessonList.length - 1) {
      const nextLesson = activeLessonList[currentIndex + 1];
      setCompletionResult(null);
      if (nextLesson.illustration && courseMode === 'typingClub') {
        setActiveLessonId(null);
        setPendingIntroLesson(nextLesson);
      } else {
        setActiveLessonId(nextLesson.id);
      }
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

  const handleSelectLesson = (lesson, isUnlocked) => {
    if (!isUnlocked) return;
    if (lesson.illustration && courseMode === 'typingClub') {
      setPendingIntroLesson(lesson);
    } else {
      setActiveLessonId(lesson.id);
      setCompletionResult(null);
    }
  };

  // Filter lessons
  const filteredLessons = activeLessonList.filter((lesson) => {
    if (courseMode === 'typingClub') {
      if (selectedChapterId !== 'all' && lesson.chapterId !== Number(selectedChapterId)) {
        return false;
      }
    } else {
      if (selectedChapterId !== 'all' && lesson.phaseId !== Number(selectedChapterId)) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lesson.title.toLowerCase().includes(q) ||
        (lesson.subtitle && lesson.subtitle.toLowerCase().includes(q)) ||
        (lesson.text && lesson.text.toLowerCase().includes(q)) ||
        String(lesson.lessonNumber || lesson.level).includes(q)
      );
    }
    return true;
  });

  // Total stars earned
  const totalStarsEarned = useMemo(() => {
    let sum = 0;
    activeLessonList.forEach((l) => {
      sum += userStats.completedLessons?.[l.id]?.stars || 0;
    });
    return sum;
  }, [activeLessonList, userStats.completedLessons]);

  const totalLessonsPassed = useMemo(() => {
    let count = 0;
    activeLessonList.forEach((l) => {
      if (userStats.completedLessons?.[l.id]?.passed) {
        count++;
      }
    });
    return count;
  }, [activeLessonList, userStats.completedLessons]);

  // =========================================================================
  // VIEW 1: CURRICULUM DASHBOARD (TYPINGCLUB STYLE)
  // =========================================================================
  if (!activeLesson) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6 select-none">
        <AdBanner position="header" onOpenSettings={onOpenAdSettings} />

        {/* TOP HERO SECTION: COURSE TITLE, LANGUAGE TOGGLES & METRICS */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2 border border-indigo-500/20">
              <Sparkles size={14} /> TypingClub Interactive Touch Typing Curriculum
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'hindi'
                ? 'हिंदी टंकण सेतु (Typing Jungle Hindi Curriculum)'
                : 'English Typing Jungle: Touch Typing Curriculum'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-hindi leading-relaxed">
              {language === 'hindi'
                ? 'प्रगतिशील 6-अध्याय पाठ्यक्रम: गृह पंक्ति आधार, ऊपरी एवं निचली पंक्ति, शिफ्ट एवं महाप्राण, हलंत संयुक्ताक्षर और 20→40→60 WPM गति मानक।'
                : 'Progressive 6-chapter touch typing curriculum: Home Row anchor, Top & Bottom reaches, Opposite-hand Shift, word patterns, and 20→40→60 WPM speed benchmarks.'}
            </p>
          </div>

          {/* Quick Metrics & Settings Cards */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Hindi Layout Switcher Pill */}
            {language === 'hindi' && (
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-1 text-xs">
                <button
                  type="button"
                  onClick={() => handleHindiLayoutChange('inscript')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    hindiLayout === 'inscript'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Official Indian Standard BIS IS 16350 InScript Layout"
                >
                  <ShieldCheck size={14} />
                  <span>इनस्क्रिप्ट (BIS IS 16350)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleHindiLayoutChange('krutiDev')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    hindiLayout === 'krutiDev'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Kruti Dev 010 Remington Typewriter Layout"
                >
                  <span>कुर्ती देव ०१०</span>
                </button>
              </div>
            )}

            {/* Course Switcher (Typing Jungle vs 300 Drills) */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-2xl p-1 text-xs">
              <button
                type="button"
                onClick={() => handleCourseModeChange('typingClub')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  courseMode === 'typingClub'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap size={14} />
                <span>Typing Jungle (6 Chapters)</span>
              </button>
              <button
                type="button"
                onClick={() => handleCourseModeChange('mastery300')}
                className={`px-3 py-1.5 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  courseMode === 'mastery300'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers size={14} />
                <span>300 Drills</span>
              </button>
            </div>

            {/* Gamification Progress Counters */}
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 p-2.5 rounded-2xl">
              <div className="text-center px-2.5 border-r border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Passed</span>
                <span className="text-base font-black text-indigo-400">
                  {totalLessonsPassed}/{activeLessonList.length}
                </span>
              </div>
              <div className="text-center px-2.5 border-r border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Stars</span>
                <span className="text-base font-black text-amber-400 flex items-center gap-0.5 justify-center">
                  <Star size={12} className="fill-amber-400 text-amber-400 inline" /> {totalStarsEarned}
                </span>
              </div>
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Peak WPM</span>
                <span className="text-base font-black text-emerald-400">
                  {userStats.highestWpm || 0}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CHAPTER / PHASE NAVIGATION TABS */}
        {courseMode === 'typingClub' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                selectedChapterId === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-base mb-1">🌟</div>
              <div className="font-bold text-xs truncate">All Chapters</div>
              <div className="text-[10px] opacity-75">{activeLessonList.length} Lessons</div>
            </button>

            {typingClubChapters.map((ch) => {
              const isSelected = selectedChapterId === String(ch.id);
              const chapterLessons = activeLessonList.filter((l) => l.chapterId === ch.id);
              const passedInChapter = chapterLessons.filter(
                (l) => userStats.completedLessons?.[l.id]?.passed
              ).length;

              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChapterId(String(ch.id))}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-base mb-1">{ch.icon}</div>
                  <div className="font-bold text-xs truncate font-hindi">{ch.title.split(':')[0]}</div>
                  <div className="text-[10px] opacity-75">
                    {passedInChapter}/{chapterLessons.length} Done
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                selectedChapterId === 'all'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-base mb-1">🌟</div>
              <div className="font-bold text-xs truncate">All Phases</div>
              <div className="text-[10px] opacity-75">300 Lessons</div>
            </button>
            {mastery300Phases.map((ph) => {
              const isSelected = selectedChapterId === String(ph.id);
              return (
                <button
                  key={ph.id}
                  onClick={() => setSelectedChapterId(String(ph.id))}
                  className={`p-3 rounded-2xl border text-left transition cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="text-base mb-1">{ph.icon}</div>
                  <div className="font-bold text-xs truncate font-hindi">{ph.name.split(':')[0]}</div>
                  <div className="text-[10px] opacity-75">Lvl {ph.range[0]}–{ph.range[1]}</div>
                </button>
              );
            })}
          </div>
        )}

        {/* SEARCH BAR */}
        <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-2.5">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder={
              language === 'hindi'
                ? 'पाठ खोजें (उदा. F & J, क & र, मात्रा, गति)...'
                : 'Search lessons (e.g. F & J, Home Row, Shift, 40 WPM)...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        {/* LESSON CARDS GRID (WITH 5-STAR RATINGS, LOCKS, TARGET KEYCAPS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredLessons.map((lesson, idx) => {
            const rawIndex = activeLessonList.findIndex((l) => l.id === lesson.id);
            // Lesson 1 is always unlocked. Next lessons unlock when preceding lesson is passed (>=90%)
            const isUnlocked =
              rawIndex === 0 ||
              Boolean(userStats.completedLessons?.[activeLessonList[rawIndex - 1]?.id]?.passed);

            const progress = userStats.completedLessons?.[lesson.id] || null;
            const stars = progress?.stars || 0;
            const isDone = Boolean(progress?.passed);

            return (
              <div
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson, isUnlocked)}
                className={`
                  p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between text-left relative group
                  ${
                    !isUnlocked
                      ? 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-70 cursor-not-allowed'
                      : isDone
                      ? 'bg-slate-900/90 border-emerald-500/30 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer'
                      : 'bg-slate-900/80 border-slate-800 hover:border-indigo-500/80 hover:shadow-lg hover:shadow-indigo-500/20 cursor-pointer'
                  }
                `}
              >
                <div>
                  {/* Top card bar: Lesson Badge + Star Ratings */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-7 h-7 rounded-lg font-black flex items-center justify-center text-xs border ${
                          !isUnlocked
                            ? 'bg-slate-900 text-slate-500 border-slate-800'
                            : isDone
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                        }`}
                      >
                        {lesson.lessonNumber || lesson.level}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {lesson.chapterId
                          ? `Ch ${lesson.chapterId}`
                          : lesson.tier === 1
                          ? 'Tier 1'
                          : lesson.tier === 2
                          ? 'Tier 2'
                          : 'Tier 3'}
                      </span>
                    </div>

                    {/* 5 Star indicators */}
                    <div className="flex items-center gap-0.5">
                      {!isUnlocked ? (
                        <span className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                          <Lock size={12} /> Locked
                        </span>
                      ) : (
                        [1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={12}
                            className={
                              s <= stars
                                ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]'
                                : 'text-slate-800'
                            }
                          />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Target Keycaps Preview if present */}
                  {lesson.targetKeys && lesson.targetKeys.length > 0 && (
                    <div className="flex items-center gap-1 mb-2">
                      {lesson.targetKeys.slice(0, 4).map((k, kIdx) => (
                        <span
                          key={kIdx}
                          className="px-1.5 py-0.5 rounded bg-slate-800/90 border border-slate-700/80 text-[10px] font-mono-custom font-bold text-amber-300 uppercase"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title & Subtitle */}
                  <h3 className="font-bold text-white text-sm group-hover:text-indigo-300 transition font-hindi line-clamp-1">
                    {lesson.title}
                  </h3>
                  <h4 className="text-[11px] font-semibold text-indigo-400/90 mt-0.5 font-hindi line-clamp-1">
                    {lesson.subtitle || lesson.description}
                  </h4>
                </div>

                {/* Bottom card bar: Target WPM and completion badge */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300 font-medium">
                    🎯 {lesson.targetWpm || 20} WPM (≥90% Acc)
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
                      Pass Lesson {rawIndex}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ILLUSTRATED LESSON INTRO POPUP (TypingClub style) */}
        {pendingIntroLesson && (
          <LessonIntroModal
            isOpen={Boolean(pendingIntroLesson)}
            lesson={pendingIntroLesson}
            language={language}
            onStart={handleStartLessonFromIntro}
            onClose={() => setPendingIntroLesson(null)}
          />
        )}

        <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE TYPING PRACTICE CANVAS
  // =========================================================================
  return (
    <div
      ref={inputContainerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-7xl mx-auto px-4 py-3 sm:py-4 space-y-2.5 focus:outline-none select-none"
    >
      {/* Sleek Top Navigation Bar */}
      <div className="flex items-center justify-between gap-3 bg-slate-900/60 border border-slate-800/80 rounded-2xl px-3.5 py-1.5 backdrop-blur-sm">
        <button
          onClick={() => {
            setActiveLessonId(null);
            setCompletionResult(null);
          }}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
        >
          <ArrowLeft size={15} />
          <span>
            {language === 'hindi'
              ? `सभी पाठ (${activeLessonList.length})`
              : `All Lessons (${activeLessonList.length})`}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
            #{activeLesson.lessonNumber || activeLesson.level}
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
                  inputMode === 'mapper'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {hindiLayout === 'inscript' ? 'इनस्क्रिप्ट मैपर' : 'रेमिंगटन मैपर'}
              </button>
              <button
                onClick={() => setInputMode('native')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  inputMode === 'native'
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
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

      {/* SPECIAL HINDI INSTRUCTIONAL BANNER */}
      {language === 'hindi' && hindiLayout === 'krutiDev' && activeLesson.phaseId === 4 && (
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-hindi">
          <Info size={16} className="text-amber-400 shrink-0" />
          <span>
            <strong>रेमिंगटन टाइपराइटर नियम:</strong> छोटी <strong>'ि' (F कुँजी)</strong> हमेशा व्यंजन से <em>पहले</em> टाइप की जाती है! उदा. कि = <code>f + d</code>
          </span>
        </div>
      )}

      {/* TWO-LINE ROLLING CAROUSEL DISPLAY WITH TYPO SHAKE & MINIMAL TELEMETRY */}
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
        isTypoShaking={isTypoShaking}
        onRestart={handleRestart}
      />

      {/* DYNAMIC VIRTUAL KEYBOARD WITH ORGANIC HAND SILHOUETTES & OPPOSITE SHIFT ANIMATION */}
      <IntegratedKeyboardHands
        targetKey={targetKeyInfo?.key || null}
        targetShift={targetKeyInfo?.shift || false}
        language={language}
        hindiLayout={hindiLayout}
        pressedKey={lastPressedPhysicalKey}
      />

      {/* Optimized Ad Banner */}
      {!isFocusMode && (
        <div className="pt-2">
          <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
        </div>
      )}

      {/* LESSON COMPLETION SCOREBOARD WITH 1-5 STARS & ERROR HEATMAP BREAKDOWN */}
      {completionResult && (
        <LessonCompletionScoreboard
          result={completionResult}
          lesson={activeLesson}
          language={language}
          onRetry={handleRestart}
          onNext={handleNextLesson}
        />
      )}
    </div>
  );
}
