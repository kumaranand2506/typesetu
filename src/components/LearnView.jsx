import React, { useState, useEffect, useRef } from 'react';
import { HINDI_LESSONS, ENGLISH_LESSONS } from '../data/lessonsData';
import { useTypingEngine } from '../hooks/useTypingEngine';
import HandsDisplay from './HandsDisplay';
import VirtualKeyboard from './VirtualKeyboard';
import AdBanner from './AdBanner';
import { checkNewBadges } from '../data/badgeSystem';
import { ArrowLeft, RotateCcw, ArrowRight, Star, Award, Zap, Target, AlertCircle, Sparkles, Keyboard } from 'lucide-react';

export default function LearnView({
  language,
  userStats,
  onUpdateStats,
  onUnlockBadge,
  onOpenAdSettings,
}) {
  const lessons = language === 'hindi' ? HINDI_LESSONS : ENGLISH_LESSONS;

  const [activeLessonId, setActiveLessonId] = useState(null);
  const [inputMode, setInputMode] = useState('mapper'); // 'mapper' | 'native'
  const [completionResult, setCompletionResult] = useState(null);

  const activeLesson = lessons.find((l) => l.id === activeLessonId) || null;
  const inputContainerRef = useRef(null);

  // Complete callback for engine
  const handleLessonComplete = (stats) => {
    let stars = 1;
    if (stats.accuracy >= 95 && stats.wpm >= (activeLesson?.targetWpm || 15)) {
      stars = 3;
    } else if (stats.accuracy >= 90) {
      stars = 2;
    }

    const result = {
      ...stats,
      stars,
      lessonId: activeLesson.id,
      isExam: activeLesson.level >= 13,
    };
    setCompletionResult(result);

    // Save to userStats
    const updatedStats = {
      ...userStats,
      completedLessons: {
        ...userStats.completedLessons,
        [activeLesson.id]: {
          stars: Math.max(userStats.completedLessons?.[activeLesson.id]?.stars || 0, stars),
          wpm: Math.max(userStats.completedLessons?.[activeLesson.id]?.wpm || 0, stats.wpm),
          accuracy: Math.max(userStats.completedLessons?.[activeLesson.id]?.accuracy || 0, stats.accuracy),
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
    targetText: activeLesson ? activeLesson.text : '',
    language,
    inputMode,
    onComplete: handleLessonComplete,
  });

  // Keep focus on typing container
  useEffect(() => {
    if (activeLesson && inputContainerRef.current) {
      inputContainerRef.current.focus();
    }
  }, [activeLesson, activeLessonId]);

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex((l) => l.id === activeLessonId);
    if (currentIndex >= 0 && currentIndex < lessons.length - 1) {
      setActiveLessonId(lessons[currentIndex + 1].id);
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

  // If no lesson is selected, show curriculum level grid (TypingClub style)
  if (!activeLesson) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Banner Ad Slot */}
        <AdBanner position="header" onOpenSettings={onOpenAdSettings} />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2 border border-indigo-500/20">
              <Sparkles size={14} /> {language === 'hindi' ? 'क्रमबद्ध टंकण पाठ्यक्रम' : 'Step-by-Step Curriculum'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === 'hindi' ? 'हिंदी इनस्क्रिप्ट टाइपिंग ट्यूटर' : 'English Touch Typing Tutor'}
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl font-hindi">
              {language === 'hindi'
                ? 'सरकारी परीक्षाओं (CPCT, SSC, High Court) एवं दैनिक कार्य हेतु 10-उँगलियों से मानक इनस्क्रिप्ट कीबोर्ड सीखें।'
                : 'Master touch typing with all 10 fingers. Progress from Home Row foundations to high-speed fluency.'}
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 p-3 rounded-2xl">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Levels</span>
              <span className="text-lg font-black text-indigo-400">{lessons.length}</span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Best WPM</span>
              <span className="text-lg font-black text-emerald-400">{userStats.highestWpm || 0}</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[11px] text-slate-400 uppercase font-bold block">Done</span>
              <span className="text-lg font-black text-amber-400">
                {Object.keys(userStats.completedLessons || {}).filter(k => k.startsWith(language === 'hindi' ? 'hi-' : 'en-')).length}
              </span>
            </div>
          </div>
        </div>

        {/* Level Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {lessons.map((lesson) => {
            const progress = userStats.completedLessons?.[lesson.id];
            const stars = progress?.stars || 0;
            const isCompleted = !!progress;

            return (
              <div
                key={lesson.id}
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  setCompletionResult(null);
                }}
                className={`group relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/10'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-300 font-extrabold flex items-center justify-center text-xs border border-indigo-500/30">
                      {lesson.level}
                    </span>

                    {/* Star Rating Display */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          size={15}
                          className={s <= stars ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition font-hindi leading-snug">
                    {lesson.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-indigo-400/90 mt-0.5 font-hindi">
                    {lesson.subtitle}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-hindi line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium">
                      🎯 {lesson.targetWpm} WPM
                    </span>
                  </div>

                  {isCompleted ? (
                    <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                      ✓ {progress.wpm} WPM
                    </span>
                  ) : (
                    <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition text-xs flex items-center gap-0.5">
                      Start →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
      </div>
    );
  }

  // ACTIVE LESSON VIEW
  return (
    <div
      ref={inputContainerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-6 space-y-4 focus:outline-none select-none"
    >
      {/* Lesson Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 rounded-2xl p-3 sm:p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveLessonId(null);
              setCompletionResult(null);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1 text-xs font-medium"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">पाठ सूची (All Lessons)</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold text-xs border border-indigo-500/30">
                Level {activeLesson.level}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white font-hindi">
                {activeLesson.title}
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-hindi mt-0.5 hidden sm:block">
              {activeLesson.subtitle} — {activeLesson.description}
            </p>
          </div>
        </div>

        {/* Input Mode Toggle (Hindi only) */}
        {language === 'hindi' && (
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setInputMode('mapper')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                inputMode === 'mapper'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Automatically maps your English keyboard keystrokes to InScript Hindi characters without any OS setup!"
            >
              <Keyboard size={14} />
              <span>इनस्क्रिप्ट मैपर (No Setup)</span>
            </button>
            <button
              onClick={() => setInputMode('native')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                inputMode === 'native'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Use Windows/Mac native InScript Hindi keyboard layout"
            >
              <span>सिस्टम कीबोर्ड (OS Native)</span>
            </button>
          </div>
        )}

        <button
          onClick={handleRestart}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
          title="पुनः प्रारंभ करें (Restart)"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Live Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Zap size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Speed (गति)</span>
            <span className="text-xl font-black text-white">{currentWpm} <span className="text-xs font-normal text-slate-400">WPM</span></span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <Target size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Accuracy (सटीकता)</span>
            <span className="text-xl font-black text-white">{currentAccuracy}%</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <AlertCircle size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-semibold block">Errors (त्रुटियाँ)</span>
            <span className="text-xl font-black text-rose-400">{mistakes}</span>
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3 flex flex-col justify-center">
          <div className="flex justify-between text-[11px] text-slate-400 font-semibold mb-1">
            <span>Progress (प्रगति)</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Text Box Display */}
      <div className="relative bg-slate-950/90 border-2 border-indigo-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl min-h-[140px] sm:min-h-[160px] flex items-center justify-center text-center overflow-hidden">
        <div className="text-2xl sm:text-3xl lg:text-4xl leading-relaxed tracking-wider font-hindi font-medium select-none">
          {activeLesson.text.split('').map((char, idx) => {
            let color = 'text-slate-500'; // Upcoming
            let isCurrent = idx === typedIndex;

            if (idx < typedIndex) {
              const hist = history[idx];
              color = hist?.status === 'correct' ? 'text-emerald-400' : 'text-rose-500 underline decoration-rose-500 decoration-2';
            } else if (isCurrent) {
              color = 'text-white bg-indigo-500/30 px-1 rounded ring-2 ring-indigo-400 animate-pulse';
            }

            return (
              <span key={idx} className={`transition-all duration-75 ${color}`}>
                {char}
              </span>
            );
          })}
        </div>

        {/* Keystroke helper guidance subtitle */}
        {targetKeyInfo && !isCompleted && (
          <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2 text-xs text-indigo-300 font-medium bg-slate-950/80 py-1">
            <span>
              दबाएँ: <strong className="text-amber-300 font-mono-custom text-sm font-bold uppercase">{targetKeyInfo.key === ' ' ? 'Spacebar' : targetKeyInfo.key}</strong>
              {targetKeyInfo.shift && <span className="ml-1 text-amber-400 font-bold">(Shift के साथ)</span>}
            </span>
          </div>
        )}
      </div>

      {/* 10 Fingers Visualizer & Interactive Virtual Keyboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* 10 Fingers Visualizer */}
        <div className="lg:col-span-4 flex justify-center">
          <HandsDisplay
            activeFinger={targetKeyInfo?.finger || null}
            language={language}
          />
        </div>

        {/* Virtual Keyboard */}
        <div className="lg:col-span-8 flex justify-center">
          <VirtualKeyboard
            targetKey={targetKeyInfo?.key || null}
            targetShift={targetKeyInfo?.shift || false}
            language={language}
            pressedKey={lastPressedPhysicalKey}
          />
        </div>
      </div>

      {/* Completion Modal Result Overlay */}
      {completionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative space-y-6">
            <div>
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    size={36}
                    className={s <= completionResult.stars ? 'text-amber-400 fill-amber-400 animate-bounce' : 'text-slate-700'}
                  />
                ))}
              </div>
              <h3 className="text-2xl font-black text-white font-hindi">
                {completionResult.stars === 3 ? '🎉 उत्कृष्ट प्रदर्शन! (Outstanding!)' : '👍 पाठ संपन्न! (Lesson Complete!)'}
              </h3>
              <p className="text-sm text-slate-400 font-hindi mt-1">
                {activeLesson.title}
              </p>
            </div>

            {/* Scorecard grid */}
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
                <span className="text-[11px] text-slate-400 uppercase font-semibold block">Mistakes</span>
                <span className="text-2xl font-black text-rose-400">{completionResult.mistakes}</span>
                <span className="text-[10px] text-slate-500 block">त्रुटियाँ</span>
              </div>
            </div>

            {/* In-Card Ad Unit */}
            <AdBanner position="practice-complete" onOpenSettings={onOpenAdSettings} />

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
              >
                <RotateCcw size={15} /> पुनः अभ्यास (Retry)
              </button>
              <button
                onClick={handleNextLesson}
                className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition"
              >
                अगला पाठ (Next) <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
