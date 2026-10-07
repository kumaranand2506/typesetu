import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BADGES_DEFINITION } from '../data/badgeSystem';
import { soundManager } from '../utils/soundEffects';
import { Award, Sparkles, X } from 'lucide-react';

export default function BadgeModal({ badgeId, onClose }) {
  if (!badgeId) return null;

  const badge = BADGES_DEFINITION.find((b) => b.id === badgeId);
  if (!badge) return null;

  useEffect(() => {
    // Trigger celebratory sound & confetti burst
    soundManager.playFanfare();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#ec4899', '#f59e0b', '#10b981'],
      });
    } catch (e) {}
  }, [badgeId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border-2 border-indigo-500/50 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X size={18} />
        </button>

        {/* Badge Icon Badge */}
        <div className="mx-auto w-24 h-24 rounded-2xl bg-gradient-to-tr flex items-center justify-center text-5xl shadow-xl shadow-indigo-500/25 mb-4 border border-white/20 animate-bounce">
          {badge.icon}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2 border border-indigo-500/30">
          <Sparkles size={13} /> उपलब्धि अनलॉक! (Badge Unlocked!)
        </div>

        <h3 className="text-xl font-bold text-white mb-1">
          {badge.name}
        </h3>
        <h4 className="text-base font-semibold text-amber-400 mb-2 font-hindi">
          {badge.hindiName}
        </h4>

        <p className="text-sm text-slate-300 mb-6">
          {badge.description}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 cursor-pointer"
        >
          शानदार! जारी रखें (Awesome, Keep Going!)
        </button>
      </div>
    </div>
  );
}
