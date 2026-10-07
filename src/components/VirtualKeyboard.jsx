import React from 'react';
import { KEYBOARD_ROWS, FINGER_INFO } from '../data/inscriptMap';

export default function VirtualKeyboard({
  targetKey = null,
  targetShift = false,
  language = 'hindi',
  pressedKey = null,
}) {
  return (
    <div className="w-full max-w-5xl bg-slate-950/80 border border-slate-800 rounded-2xl p-3 sm:p-5 shadow-2xl backdrop-blur-md select-none overflow-x-auto">
      {/* Keyboard Header Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">
            {language === 'hindi' ? 'कीबोर्ड लेआउट: इनस्क्रिप्ट (InScript)' : 'Keyboard Layout: English QWERTY'}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {language === 'hindi' ? 'मानक देवनागरी (BIS)' : 'Standard US'}
          </span>
        </div>

        {/* Finger Color Legend */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> कनिष्ठिका (Pinky)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> अनामिका (Ring)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500"></span> मध्यमा (Middle)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> तर्जनी (Index L)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> तर्जनी (Index R)</span>
          <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> अँगूठा (Thumb)</span>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1.5 min-w-[700px]">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1.5 justify-center">
            {row.map((k) => {
              const finger = k.finger ? FINGER_INFO[k.finger] : null;
              const isTargetKey = targetKey && (
                k.key?.toLowerCase() === targetKey?.toLowerCase() ||
                k.code?.toLowerCase() === targetKey?.toLowerCase() ||
                (k.key === ' ' && targetKey === ' ')
              );

              // Shift key highlight logic:
              // If target requires Shift, highlight the appropriate Shift key
              const isTargetShift = targetShift && (
                (k.code === 'ShiftLeft' && ['RI', 'RM', 'RR', 'RP'].includes(finger?.id || '')) ||
                (k.code === 'ShiftRight' && ['LP', 'LR', 'LM', 'LI'].includes(finger?.id || '')) ||
                // fallback if finger unknown
                (k.code === 'ShiftLeft' || k.code === 'ShiftRight')
              );

              const isPhysicallyPressed = pressedKey && (
                pressedKey.code === k.code ||
                pressedKey.key?.toLowerCase() === k.key?.toLowerCase()
              );

              const widthClass = k.width || 'w-12 sm:w-14';

              // Determine display symbols
              const engPrimary = k.key || '';
              const engShift = k.shiftKey || '';
              const hindiPrimary = k.inscript || '';
              const hindiShift = k.inscriptShift || '';

              return (
                <div
                  key={k.code}
                  className={`
                    relative h-12 sm:h-14 ${widthClass} rounded-lg flex flex-col justify-between p-1 sm:p-1.5
                    border transition-all duration-100 select-none
                    ${isPhysicallyPressed ? 'scale-95 bg-indigo-600 border-indigo-400 text-white shadow-inner' : ''}
                    ${isTargetKey ? 'ring-2 ring-indigo-400 bg-indigo-950/80 border-indigo-400 shadow-lg shadow-indigo-500/25 -translate-y-0.5' : ''}
                    ${isTargetShift ? 'ring-2 ring-amber-400 bg-amber-950/80 border-amber-400 animate-pulse' : ''}
                    ${!isTargetKey && !isTargetShift && !isPhysicallyPressed ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200' : ''}
                  `}
                  style={{
                    borderBottomWidth: '3px',
                    borderColor: isTargetKey ? '#818cf8' : isTargetShift ? '#fbbf24' : isPhysicallyPressed ? '#6366f1' : finger ? `${finger.color}40` : '#334155',
                  }}
                >
                  {/* Finger indicator dot */}
                  {finger && !k.special && (
                    <div
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: finger.color }}
                      title={`${finger.name} (${finger.hindiName})`}
                    />
                  )}

                  {/* Special Key (Shift, Enter, Space, etc.) */}
                  {k.special ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-[11px] sm:text-xs font-semibold text-slate-300">
                        {k.label}
                      </span>
                      {isTargetShift && (
                        <span className="ml-1 text-[9px] bg-amber-400 text-slate-950 px-1 rounded font-bold uppercase animate-bounce">
                          Hold
                        </span>
                      )}
                    </div>
                  ) : k.code === 'Space' ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-xs text-slate-400 font-medium tracking-wide">
                        {language === 'hindi' ? '— स्पेस बार (अँगूठा) —' : '— Spacebar (Thumbs) —'}
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* Top row of the key: English & Shifted symbol */}
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono-custom leading-none">
                        <span className="opacity-80 font-semibold">{engShift}</span>
                        <span className="text-slate-500 font-medium">{engPrimary.toUpperCase()}</span>
                      </div>

                      {/* Bottom/Center of the key: Hindi InScript character */}
                      <div className="flex items-baseline justify-between mt-auto">
                        {language === 'hindi' ? (
                          <>
                            <span className={`text-base sm:text-lg font-bold font-hindi leading-none ${isTargetKey ? 'text-indigo-300' : 'text-amber-300'}`}>
                              {targetShift ? (hindiShift || hindiPrimary) : hindiPrimary}
                            </span>
                            {hindiShift && (
                              <span className="text-[10px] font-hindi text-slate-400 opacity-75">
                                {hindiShift}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className={`text-sm sm:text-base font-bold font-mono-custom leading-none ${isTargetKey ? 'text-indigo-300' : 'text-slate-100'}`}>
                            {targetShift ? engShift : engPrimary}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
