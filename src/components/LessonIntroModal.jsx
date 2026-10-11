import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, Keyboard, Target, CheckCircle2, Hand, Lightbulb } from 'lucide-react';

export default function LessonIntroModal({
  isOpen,
  lesson,
  language = 'english',
  onStart,
  onClose,
}) {
  // Listen for Enter or Spacebar to start lesson immediately
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        onStart();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onStart, onClose]);

  if (!isOpen || !lesson) return null;

  const isHindi = language === 'hindi';
  const illustration = lesson.illustration || {};
  const visualKeys = illustration.visualKeys || [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md select-none">
        {/* Backdrop motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl text-slate-100 overflow-hidden space-y-5"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 font-black flex items-center justify-center text-sm border border-indigo-500/40">
                {lesson.lessonNumber || lesson.level}
              </span>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  {lesson.chapterTitle || 'Touch Typing Guide'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white font-hindi">
                  {lesson.title}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Illustrated Keycaps & Finger Placement Guide */}
          <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold flex items-center gap-1.5 text-slate-300">
                <Hand size={14} className="text-indigo-400" />
                <span>{isHindi ? 'लक्ष्य कुंजियाँ एवं उँगली स्थान:' : 'Target Keys & Finger Placement:'}</span>
              </span>
              <span className="text-[11px] text-indigo-400 font-mono">
                {isHindi ? 'इनस्क्रिप्ट लेआउट' : 'QWERTY Layout'}
              </span>
            </div>

            {/* Illustrated Keycaps Row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 py-1">
              {visualKeys.length > 0 ? (
                visualKeys.map((vk, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-2.5 rounded-2xl bg-slate-900 border-2 shadow-lg min-w-[70px] sm:min-w-[85px] transition-transform hover:scale-105"
                    style={{ borderColor: vk.color || '#6366f1' }}
                  >
                    <span className="text-xl sm:text-2xl font-black text-white font-hindi">
                      {vk.key}
                    </span>
                    <span
                      className="text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${vk.color}25`,
                        color: vk.color || '#cbd5e1',
                      }}
                    >
                      {vk.finger}
                    </span>
                  </div>
                ))
              ) : (
                (lesson.targetKeys || []).map((k, idx) => (
                  <div
                    key={idx}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 border border-indigo-500/50 text-base font-black text-white font-hindi shadow-md"
                  >
                    {k === ' ' ? 'Spacebar' : k}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Educational Breakdown Card: InScript logic for Hindi or Finger placement for English */}
          <div className="rounded-2xl p-4 bg-indigo-950/20 border border-indigo-500/30 space-y-2">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Lightbulb size={15} className="text-amber-400 shrink-0" />
              <span>{isHindi ? 'इनस्क्रिप्ट टंकण नियम (Linguistic Logic):' : 'Touch Typing Technique:'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-hindi leading-relaxed">
              {illustration.guidanceText || lesson.description}
            </p>
            {illustration.pedagogicalTip && (
              <div className="text-[11px] text-amber-300/90 font-hindi flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>{illustration.pedagogicalTip}</span>
              </div>
            )}
          </div>

          {/* Target Metrics Strip */}
          <div className="grid grid-cols-3 gap-2.5 bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Target Speed</span>
              <span className="text-sm font-black text-indigo-400">{lesson.targetWpm || 15} WPM</span>
            </div>
            <div className="border-x border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Passing Acc</span>
              <span className="text-sm font-black text-emerald-400">{lesson.passingAccuracy || 90}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Length</span>
              <span className="text-sm font-black text-amber-400">
                {(lesson.text || '').length} {isHindi ? 'वर्ण' : 'Chars'}
              </span>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={onClose}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition cursor-pointer"
            >
              {isHindi ? 'बाद में (Back)' : 'Cancel'}
            </button>
            <button
              onClick={onStart}
              className="flex-1 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition cursor-pointer group"
            >
              <span>{isHindi ? 'अभ्यास प्रारंभ करें (Start Typing)' : 'Start Lesson Now'}</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              <span className="hidden sm:inline text-[10px] opacity-75 font-normal ml-1">(Enter ↵)</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
