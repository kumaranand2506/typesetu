import React from 'react';
import { Zap, Target, AlertCircle, Activity } from 'lucide-react';

export default function Speedometer({
  wpm = 0,
  cpm = 0,
  accuracy = 100,
  mistakes = 0,
  errors,
  maxWpm = 100,
}) {
  const displayMistakes = errors !== undefined ? errors : mistakes;

  // Calculate angle for gauge needle (-90 deg to +90 deg)
  const clampedWpm = Math.min(Math.max(wpm, 0), maxWpm);
  const ratio = clampedWpm / maxWpm;
  const rotationDegrees = -90 + ratio * 180;

  // Determine speed tier color
  let tierColor = '#38bdf8'; // Sky (0-20)
  let tierLabel = 'Beginner';
  if (wpm >= 80) {
    tierColor = '#f43f5e'; // Rose
    tierLabel = 'Godspeed 🔥';
  } else if (wpm >= 60) {
    tierColor = '#f97316'; // Orange
    tierLabel = 'Pro Typist ⚡';
  } else if (wpm >= 40) {
    tierColor = '#eab308'; // Amber/Yellow
    tierLabel = 'Advanced ✨';
  } else if (wpm >= 20) {
    tierColor = '#10b981'; // Emerald
    tierLabel = 'Intermediate 👍';
  }

  return (
    <div className="w-full bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
      {/* Radial Speedometer Gauge */}
      <div className="relative flex flex-col items-center justify-center shrink-0 w-36 h-24 overflow-hidden">
        <svg viewBox="0 0 160 95" className="w-full h-full overflow-visible">
          {/* Background Track Arc */}
          <path
            d="M 20 85 A 60 60 0 0 1 140 85"
            fill="none"
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Active Gradient Arc */}
          <path
            d="M 20 85 A 60 60 0 0 1 140 85"
            fill="none"
            stroke={tierColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="188.5"
            strokeDashoffset={188.5 * (1 - ratio)}
            className="transition-all duration-300"
          />

          {/* Needle */}
          <g
            transform={`translate(80, 85) rotate(${rotationDegrees})`}
            className="transition-transform duration-200 ease-out"
          >
            <line x1="0" y1="0" x2="0" y2="-52" stroke="currentColor" className="text-slate-700 dark:text-white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="0" r="6" fill="currentColor" className="text-slate-700 dark:text-white" />
            <circle cx="0" cy="0" r="3" fill="currentColor" className="text-slate-100 dark:text-slate-900" />
          </g>
        </svg>

        {/* Digital Speed & Tier Label */}
        <div className="absolute bottom-0 text-center flex flex-col items-center">
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
            {wpm}
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold ml-1">WPM</span>
          </div>
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5" style={{ color: tierColor }}>
            {tierLabel}
          </span>
        </div>
      </div>

      {/* Metrics Readout Cards */}
      <div className="grid grid-cols-3 gap-2.5 w-full max-w-md">
        {/* Accuracy */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">
            <Target size={13} className="text-blue-500 dark:text-blue-400" />
            <span>Accuracy</span>
          </div>
          <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{accuracy}%</div>
        </div>

        {/* CPM */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">
            <Activity size={13} className="text-indigo-500 dark:text-indigo-400" />
            <span>CPM</span>
          </div>
          <div className="text-lg font-black text-indigo-600 dark:text-indigo-300">{cpm || Math.round(wpm * 5)}</div>
        </div>

        {/* Errors */}
        <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">
            <AlertCircle size={13} className="text-rose-500 dark:text-rose-400" />
            <span>Errors</span>
          </div>
          <div className="text-lg font-black text-rose-600 dark:text-rose-400">{displayMistakes}</div>
        </div>
      </div>
    </div>
  );
}
