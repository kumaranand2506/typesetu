import React from 'react';
import { FINGER_INFO } from '../data/inscriptMap';

export default function HandsDisplay({ activeFinger = null, language = 'english' }) {
  const currentFingerInfo = activeFinger ? FINGER_INFO[activeFinger] : null;

  const isLeftHand = activeFinger && ['LP', 'LR', 'LM', 'LI', 'LT', 'SPACE'].includes(activeFinger);
  const isRightHand = activeFinger && ['RP', 'RR', 'RM', 'RI', 'RT', 'SPACE'].includes(activeFinger);

  const fingersLeft = [
    { id: 'LP', label: 'Pinky', hindi: 'कनिष्ठिका', keyColor: '#f43f5e', x: 28, y: 75, width: 14, height: 50 },
    { id: 'LR', label: 'Ring', hindi: 'अनामिका', keyColor: '#fb923c', x: 48, y: 55, width: 14, height: 70 },
    { id: 'LM', label: 'Middle', hindi: 'मध्यमा', keyColor: '#facc15', x: 68, y: 40, width: 14, height: 85 },
    { id: 'LI', label: 'Index', hindi: 'तर्जनी', keyColor: '#4ade80', x: 88, y: 52, width: 14, height: 75 },
    { id: 'LT', label: 'Thumb', hindi: 'अँगूठा', keyColor: '#38bdf8', x: 110, y: 100, width: 16, height: 45, rotate: 30 },
  ];

  const fingersRight = [
    { id: 'RT', label: 'Thumb', hindi: 'अँगूठा', keyColor: '#38bdf8', x: 26, y: 100, width: 16, height: 45, rotate: -30 },
    { id: 'RI', label: 'Index', hindi: 'तर्जनी', keyColor: '#818cf8', x: 50, y: 52, width: 14, height: 75 },
    { id: 'RM', label: 'Middle', hindi: 'मध्यमा', keyColor: '#a855f7', x: 70, y: 40, width: 14, height: 85 },
    { id: 'RR', label: 'Ring', hindi: 'अनामिका', keyColor: '#ec4899', x: 90, y: 55, width: 14, height: 70 },
    { id: 'RP', label: 'Pinky', hindi: 'कनिष्ठिका', keyColor: '#14b8a6', x: 110, y: 75, width: 14, height: 50 },
  ];

  const isFingerActive = (id) => {
    if (activeFinger === 'SPACE' && (id === 'LT' || id === 'RT')) return true;
    return activeFinger === id;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-4 shadow-xl backdrop-blur-sm flex flex-col items-center">
      {/* Active Finger Status Bar */}
      <div className="flex items-center justify-between w-full max-w-md px-3 py-1.5 mb-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
        <span className="text-slate-400 font-medium">
          {language === 'hindi' ? 'सक्रिय उँगली (Active Finger):' : 'Active Finger Guide:'}
        </span>
        {currentFingerInfo ? (
          <div className="flex items-center gap-2 font-semibold">
            <span
              className="w-3 h-3 rounded-full animate-pulse shadow-sm"
              style={{ backgroundColor: currentFingerInfo.color }}
            />
            <span style={{ color: currentFingerInfo.color }}>
              {language === 'hindi' ? currentFingerInfo.hindiName : currentFingerInfo.name}
            </span>
          </div>
        ) : (
          <span className="text-slate-500 italic">Ready (तैयार)</span>
        )}
      </div>

      {/* Visual Hands Diagram */}
      <div className="flex items-center justify-center gap-6 sm:gap-12 w-full max-w-lg">
        {/* LEFT HAND */}
        <div className={`relative flex flex-col items-center transition-all duration-200 ${isLeftHand ? 'scale-105' : 'opacity-85'}`}>
          <div className="text-[11px] font-semibold text-slate-400 mb-1 tracking-wider uppercase">
            {language === 'hindi' ? 'बायाँ हाथ (Left)' : 'Left Hand'}
          </div>
          <svg width="150" height="155" viewBox="0 0 150 160" className="overflow-visible drop-shadow-md">
            {/* Palm base */}
            <path
              d="M 24 100 C 20 135, 45 155, 75 155 C 105 155, 125 135, 120 100 C 110 90, 30 90, 24 100 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Left Fingers */}
            {fingersLeft.map((f) => {
              const active = isFingerActive(f.id);
              return (
                <g key={f.id} transform={f.rotate ? `rotate(${f.rotate} ${f.x + f.width / 2} ${f.y + f.height / 2})` : ''}>
                  <rect
                    x={f.x}
                    y={f.y}
                    width={f.width}
                    height={f.height}
                    rx={f.width / 2}
                    fill={active ? f.keyColor : '#1e293b'}
                    stroke={active ? '#ffffff' : f.keyColor}
                    strokeWidth={active ? '2.5' : '1.5'}
                    className={`transition-all duration-150 ${active ? 'animate-bounce shadow-lg' : 'opacity-80 hover:opacity-100'}`}
                  />
                  {active && (
                    <circle
                      cx={f.x + f.width / 2}
                      cy={f.y + 10}
                      r="4"
                      fill="#ffffff"
                      className="animate-ping"
                    />
                  )}
                  <text
                    x={f.x + f.width / 2}
                    y={f.y + f.height / 2 + 3}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill={active ? '#ffffff' : '#94a3b8'}
                  >
                    {f.id.replace('L', '')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* RIGHT HAND */}
        <div className={`relative flex flex-col items-center transition-all duration-200 ${isRightHand ? 'scale-105' : 'opacity-85'}`}>
          <div className="text-[11px] font-semibold text-slate-400 mb-1 tracking-wider uppercase">
            {language === 'hindi' ? 'दायाँ हाथ (Right)' : 'Right Hand'}
          </div>
          <svg width="150" height="155" viewBox="0 0 150 160" className="overflow-visible drop-shadow-md">
            {/* Palm base */}
            <path
              d="M 30 100 C 25 135, 45 155, 75 155 C 105 155, 130 135, 126 100 C 120 90, 40 90, 30 100 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Right Fingers */}
            {fingersRight.map((f) => {
              const active = isFingerActive(f.id);
              return (
                <g key={f.id} transform={f.rotate ? `rotate(${f.rotate} ${f.x + f.width / 2} ${f.y + f.height / 2})` : ''}>
                  <rect
                    x={f.x}
                    y={f.y}
                    width={f.width}
                    height={f.height}
                    rx={f.width / 2}
                    fill={active ? f.keyColor : '#1e293b'}
                    stroke={active ? '#ffffff' : f.keyColor}
                    strokeWidth={active ? '2.5' : '1.5'}
                    className={`transition-all duration-150 ${active ? 'animate-bounce shadow-lg' : 'opacity-80 hover:opacity-100'}`}
                  />
                  {active && (
                    <circle
                      cx={f.x + f.width / 2}
                      cy={f.y + 10}
                      r="4"
                      fill="#ffffff"
                      className="animate-ping"
                    />
                  )}
                  <text
                    x={f.x + f.width / 2}
                    y={f.y + f.height / 2 + 3}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill={active ? '#ffffff' : '#94a3b8'}
                  >
                    {f.id.replace('R', '')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Home row guidance cue */}
      <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-3">
        <span>👈 ASDF (बायाँ हाथ)</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
        <span className="text-sky-400">अँगूठा: Space</span>
        <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
        <span>JKL; (दायाँ हाथ) 👉</span>
      </div>
    </div>
  );
}
