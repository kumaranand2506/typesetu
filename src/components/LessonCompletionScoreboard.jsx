import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Star, RotateCcw, ArrowRight, Lock, CheckCircle2, AlertTriangle, Zap, Target, Clock, Activity, BarChart2 } from 'lucide-react';

export default function LessonCompletionScoreboard({
  result,
  lesson,
  language = 'english',
  onRetry,
  onNext,
}) {
  const isHindi = language === 'hindi';
  const stars = result.stars || 0;
  const passed = result.passed || result.accuracy >= 90;

  // Trigger celebration confetti on pass
  useEffect(() => {
    if (passed) {
      confetti({
        particleCount: stars === 5 ? 120 : 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
      });
    }
  }, [passed, stars]);

  // Extract error breakdown from history if available
  const errorMap = {};
  if (result.history) {
    result.history.forEach((h) => {
      if (h.status === 'error') {
        const key = h.char === ' ' ? 'Space' : h.char;
        errorMap[key] = (errorMap[key] || 0) + 1;
      }
    });
  }
  const errorEntries = Object.entries(errorMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="w-full max-w-lg bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6 relative overflow-hidden"
      >
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* 1 to 5 Stars Animated Rating */}
        <div className="text-center space-y-2">
          <div className="flex justify-center items-center gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <motion.div
                key={s}
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1 * s, type: 'spring', stiffness: 300 }}
              >
                <Star
                  size={32}
                  className={
                    s <= stars
                      ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                      : 'text-slate-800'
                  }
                />
              </motion.div>
            ))}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-hindi">
            {passed
              ? stars === 5
                ? '🏆 उत्कृष्ट महारत! (5 Stars Mastery!)'
                : '🎉 पाठ संपन्न! (Lesson Passed!)'
              : '⚠️ पुनः प्रयास करें (Retest Required)'}
          </h3>

          <p className="text-xs sm:text-sm font-semibold font-hindi">
            {passed ? (
              <span className="text-emerald-400">
                ✓ 90%+ शुद्धता प्राप्त — अगला पाठ अनलॉक हुआ! (Next Lesson Unlocked!)
              </span>
            ) : (
              <span className="text-rose-400">
                न्यूनतम 90% शुद्धता आवश्यक है। पुनः अभ्यास करें।
              </span>
            )}
          </p>
        </div>

        {/* Metrics Scorecard Grid */}
        <div className="grid grid-cols-4 gap-2 bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-center">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Net WPM</span>
            <span className="text-xl sm:text-2xl font-black text-indigo-400">{result.wpm || 0}</span>
            <span className="text-[9px] text-slate-500 block">गति</span>
          </div>
          <div className="border-l border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Accuracy</span>
            <span
              className={`text-xl sm:text-2xl font-black ${
                passed ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {result.accuracy || 100}%
            </span>
            <span className="text-[9px] text-slate-500 block">शुद्धता</span>
          </div>
          <div className="border-l border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Errors</span>
            <span className="text-xl sm:text-2xl font-black text-rose-400">{result.mistakes || 0}</span>
            <span className="text-[9px] text-slate-500 block">त्रुटियाँ</span>
          </div>
          <div className="border-l border-slate-800/80">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Time</span>
            <span className="text-xl sm:text-2xl font-black text-amber-400">{result.timeSeconds || 0}s</span>
            <span className="text-[9px] text-slate-500 block">समय</span>
          </div>
        </div>

        {/* ERROR HEATMAP & ANALYSIS CARD */}
        <div className="bg-slate-950/80 rounded-2xl p-3.5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5 text-slate-300">
              <BarChart2 size={14} className="text-indigo-400" />
              <span>{isHindi ? 'त्रुटि विश्लेषण (Error Heatmap):' : 'Error Heatmap & Analysis:'}</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {result.mistakes === 0 ? '0 Errors' : `${result.mistakes} Total Typos`}
            </span>
          </div>

          {errorEntries.length > 0 ? (
            <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-y-auto">
              {errorEntries.map(([key, count]) => (
                <div
                  key={key}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold"
                >
                  <span className="text-white font-hindi">{key}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-400">
                    {count} {count === 1 ? 'typo' : 'typos'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 py-1 text-xs text-emerald-400 font-semibold font-hindi">
              <CheckCircle2 size={16} />
              <span>
                {isHindi
                  ? 'अद्भुत! शून्य त्रुटियाँ — निर्दोष एवं सटीक टंकण!'
                  : 'Flawless execution! 100% clean keystroke accuracy.'}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={onRetry}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <RotateCcw size={15} /> पुनः अभ्यास (Retry)
          </button>

          {passed ? (
            <button
              onClick={onNext}
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
      </motion.div>
    </div>
  );
}
