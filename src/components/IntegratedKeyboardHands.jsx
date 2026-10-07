import React from 'react';
import { KEYBOARD_ROWS, FINGER_INFO } from '../data/inscriptMap';

export default function IntegratedKeyboardHands({
  targetKey = null,
  targetShift = false,
  language = 'hindi',
  pressedKey = null,
}) {
  // Find which finger is targeting the active key
  let activeFingerId = null;
  let activeKeyCoord = null;

  KEYBOARD_ROWS.forEach((row, rowIdx) => {
    row.forEach((k, colIdx) => {
      const match = targetKey && (
        k.key?.toLowerCase() === targetKey?.toLowerCase() ||
        k.code?.toLowerCase() === targetKey?.toLowerCase() ||
        (k.key === ' ' && targetKey === ' ')
      );
      if (match) {
        activeFingerId = k.finger;
        activeKeyCoord = { row: rowIdx, col: colIdx, code: k.code };
      }
    });
  });

  const activeFinger = activeFingerId ? FINGER_INFO[activeFingerId] : null;

  // Opposite Shift logic (touch typing standard):
  // If striking key with Right hand (RI, RM, RR, RP), hold Left Shift (LP).
  // If striking key with Left hand (LI, LM, LR, LP), hold Right Shift (RP).
  const isRightHandKey = activeFinger && ['RI', 'RM', 'RR', 'RP'].includes(activeFinger.id);
  const isLeftHandKey = activeFinger && ['LI', 'LM', 'LR', 'LP'].includes(activeFinger.id);

  const needLeftShift = targetShift && (isRightHandKey || !activeFinger);
  const needRightShift = targetShift && isLeftHandKey;

  // Left hand fingers with resting home positions (ASDF)
  const leftHandFingers = [
    { id: 'LP', name: 'Pinky', hindi: 'कनिष्ठिका', restingKey: 'A', x: 26, y: 70, w: 14, h: 52, color: '#f43f5e' },
    { id: 'LR', name: 'Ring', hindi: 'अनामिका', restingKey: 'S', x: 47, y: 46, w: 15, h: 72, color: '#fb923c' },
    { id: 'LM', name: 'Middle', hindi: 'मध्यमा', restingKey: 'D', x: 69, y: 32, w: 15, h: 86, color: '#facc15' },
    { id: 'LI', name: 'Index', hindi: 'तर्जनी', restingKey: 'F', x: 91, y: 44, w: 15, h: 74, color: '#4ade80' },
    { id: 'LT', name: 'Thumb', hindi: 'अँगूठा', restingKey: 'Space', x: 114, y: 92, w: 18, h: 48, rotate: 28, color: '#38bdf8' },
  ];

  // Right hand fingers with resting home positions (JKL;)
  const rightHandFingers = [
    { id: 'RT', name: 'Thumb', hindi: 'अँगूठा', restingKey: 'Space', x: 28, y: 92, w: 18, h: 48, rotate: -28, color: '#38bdf8' },
    { id: 'RI', name: 'Index', hindi: 'तर्जनी', restingKey: 'J', x: 52, y: 44, w: 15, h: 74, color: '#818cf8' },
    { id: 'RM', name: 'Middle', hindi: 'मध्यमा', restingKey: 'K', x: 74, y: 32, w: 15, h: 86, color: '#a855f7' },
    { id: 'RR', name: 'Ring', hindi: 'अनामिका', restingKey: 'L', x: 96, y: 46, w: 15, h: 72, color: '#ec4899' },
    { id: 'RP', name: 'Pinky', hindi: 'कनिष्ठिका', restingKey: ';', x: 118, y: 70, w: 14, h: 52, color: '#14b8a6' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md select-none overflow-hidden flex flex-col items-center">
      {/* Top Banner Guide on the Keyboard */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-slate-200">
            {language === 'hindi' ? 'हिंदी इनस्क्रिप्ट (BIS Standard Layout)' : 'English Touch Layout (QWERTY)'}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            10-Finger Interactive Tutor
          </span>
        </div>

        {/* Live Finger Instruction Cue */}
        <div className="flex items-center gap-2">
          {activeFinger ? (
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700/80 shadow-inner">
              <span className="text-slate-400 text-[11px]">Next Finger:</span>
              <span
                className="w-3 h-3 rounded-full animate-bounce shadow-md"
                style={{ backgroundColor: activeFinger.color }}
              />
              <span className="font-bold text-xs" style={{ color: activeFinger.color }}>
                {language === 'hindi' ? activeFinger.hindiName : activeFinger.name}
              </span>
              {targetShift && (
                <span className="ml-1 text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-black uppercase animate-pulse">
                  + Hold Shift
                </span>
              )}
            </div>
          ) : (
            <span className="text-slate-500 italic text-xs">Ready (प्रारंभ करें)</span>
          )}
        </div>
      </div>

      {/* KEYBOARD CHASSIS */}
      <div className="flex flex-col gap-1.5 w-full min-w-[720px] max-w-[940px] px-2 py-3 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-2xl">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1.5 justify-center">
            {row.map((k) => {
              const finger = k.finger ? FINGER_INFO[k.finger] : null;

              const isTargetKey = targetKey && (
                k.key?.toLowerCase() === targetKey?.toLowerCase() ||
                k.code?.toLowerCase() === targetKey?.toLowerCase() ||
                (k.key === ' ' && targetKey === ' ')
              );

              // Shift key highlight logic
              const isTargetShift = (
                (k.code === 'ShiftLeft' && needLeftShift) ||
                (k.code === 'ShiftRight' && needRightShift)
              );

              const isPhysicallyPressed = pressedKey && (
                pressedKey.code === k.code ||
                pressedKey.key?.toLowerCase() === k.key?.toLowerCase()
              );

              const widthClass = k.width || 'w-11 sm:w-14';

              const engPrimary = k.key || '';
              const engShift = k.shiftKey || '';
              const hindiPrimary = k.inscript || '';
              const hindiShift = k.inscriptShift || '';

              return (
                <div
                  key={k.code}
                  className={`
                    relative h-12 sm:h-14 ${widthClass} rounded-xl flex flex-col justify-between p-1 sm:p-1.5
                    border transition-all duration-100 select-none cursor-default
                    ${isPhysicallyPressed ? 'scale-90 bg-indigo-600 border-indigo-400 text-white shadow-inner' : ''}
                    ${isTargetKey ? 'ring-4 ring-indigo-400 bg-indigo-950 border-indigo-300 shadow-xl shadow-indigo-500/40 -translate-y-1 z-10' : ''}
                    ${isTargetShift ? 'ring-4 ring-amber-400 bg-amber-950 border-amber-300 shadow-xl shadow-amber-500/40 -translate-y-1 z-10 animate-pulse' : ''}
                    ${!isTargetKey && !isTargetShift && !isPhysicallyPressed ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-200' : ''}
                  `}
                  style={{
                    borderBottomWidth: '4px',
                    borderColor: isTargetKey ? '#818cf8' : isTargetShift ? '#fbbf24' : isPhysicallyPressed ? '#6366f1' : finger ? `${finger.color}50` : '#334155',
                  }}
                >
                  {/* Finger color dot indicator on keycap */}
                  {finger && !k.special && (
                    <div
                      className="absolute top-1 right-1 w-2 h-2 rounded-full border border-black/30"
                      style={{ backgroundColor: finger.color }}
                      title={`${finger.name} (${finger.hindiName})`}
                    />
                  )}

                  {/* Tactile Home Row Nub (on F and J) */}
                  {k.homeBump && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded bg-slate-400/80" />
                  )}

                  {/* Special Key (Shift, Enter, Tab) */}
                  {k.special ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-[11px] sm:text-xs font-bold text-slate-300">
                        {k.label}
                      </span>
                      {isTargetShift && (
                        <span className="ml-1 text-[9px] bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black uppercase">
                          HOLD
                        </span>
                      )}
                    </div>
                  ) : k.code === 'Space' ? (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-xs text-slate-400 font-semibold tracking-wide">
                        {language === 'hindi' ? '— स्पेस बार (दोनों अँगूठे) —' : '— Spacebar (Thumbs) —'}
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* Top label: English letters */}
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono-custom leading-none">
                        <span className="opacity-75 font-medium">{engShift}</span>
                        <span className="text-slate-500 font-bold">{engPrimary.toUpperCase()}</span>
                      </div>

                      {/* Bottom/Center label: Hindi InScript character */}
                      <div className="flex items-baseline justify-between mt-auto">
                        {language === 'hindi' ? (
                          <>
                            <span className={`text-base sm:text-lg font-bold font-hindi leading-none ${isTargetKey ? 'text-indigo-200' : 'text-amber-300'}`}>
                              {targetShift ? (hindiShift || hindiPrimary) : hindiPrimary}
                            </span>
                            {hindiShift && (
                              <span className="text-[10px] font-hindi text-slate-400 opacity-80">
                                {hindiShift}
                              </span>
                            )}
                          </>
                        ) : (
                          <span className={`text-sm sm:text-base font-bold font-mono-custom leading-none ${isTargetKey ? 'text-indigo-200' : 'text-slate-100'}`}>
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

      {/* INTEGRATED RESTING HANDS POSITIONED DIRECTLY ON THE KEYBOARD CHASSIS */}
      <div className="w-full max-w-[940px] pt-4 flex flex-col sm:flex-row items-center justify-around gap-6 bg-slate-950/60 rounded-2xl border border-slate-800/80 mt-2 p-3">
        {/* LEFT HAND (ASDF resting zone) */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-slate-300">
            <span>बायाँ हाथ (Left Hand)</span>
            <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono">
              A S D F
            </span>
          </div>

          <svg width="220" height="150" viewBox="0 0 160 150" className="overflow-visible drop-shadow-xl">
            {/* Left Palm Outline */}
            <path
              d="M 24 95 C 18 130, 42 148, 75 148 C 108 148, 126 130, 122 95 C 112 85, 30 85, 24 95 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Guide lines from palm to fingers */}
            {leftHandFingers.map((f) => {
              const isActive = (activeFingerId === f.id) || (activeFingerId === 'SPACE' && f.id === 'LT') || (needLeftShift && f.id === 'LP');
              return (
                <g key={f.id} transform={f.rotate ? `rotate(${f.rotate} ${f.x + f.w / 2} ${f.y + f.h / 2})` : ''}>
                  <rect
                    x={f.x}
                    y={isActive ? f.y - 8 : f.y}
                    width={f.w}
                    height={f.h}
                    rx={f.w / 2}
                    fill={isActive ? f.color : '#1e293b'}
                    stroke={isActive ? '#ffffff' : f.color}
                    strokeWidth={isActive ? '3' : '1.5'}
                    className={`transition-all duration-150 ${isActive ? 'shadow-xl shadow-indigo-500' : 'opacity-75'}`}
                  />
                  {/* Finger resting key badge */}
                  <circle
                    cx={f.x + f.w / 2}
                    cy={f.y + 12}
                    r="5"
                    fill={isActive ? '#ffffff' : '#0f172a'}
                    stroke={f.color}
                    strokeWidth="1"
                  />
                  <text
                    x={f.x + f.w / 2}
                    y={f.y + 15}
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill={isActive ? '#0f172a' : '#94a3b8'}
                  >
                    {f.restingKey}
                  </text>
                  {/* Finger Hindi name */}
                  <text
                    x={f.x + f.w / 2}
                    y={f.y + f.h - 10}
                    textAnchor="middle"
                    fontSize="6"
                    fontWeight="bold"
                    fill={isActive ? '#ffffff' : '#64748b'}
                  >
                    {f.id.replace('L', '')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* CENTER PEDAGOGY GUIDANCE */}
        <div className="hidden lg:flex flex-col items-center justify-center max-w-[200px] text-center px-2 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
          <span className="font-bold text-slate-200">Home Row Rule</span>
          <p className="leading-snug">
            उँगलियों को हमेशा <strong>ASDF</strong> और <strong>JKL;</strong> पर विश्राम दें। अंगूठे स्पेसबार पर रखें।
          </p>
          <div className="w-full border-t border-slate-800 pt-1 text-[10px] text-indigo-400 font-semibold">
            {language === 'hindi' ? 'बायाँ: स्वर • दायाँ: व्यंजन' : 'F & J have tactile bumps'}
          </div>
        </div>

        {/* RIGHT HAND (JKL; resting zone) */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-slate-300">
            <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono">
              J K L ;
            </span>
            <span>दायाँ हाथ (Right Hand)</span>
          </div>

          <svg width="220" height="150" viewBox="0 0 160 150" className="overflow-visible drop-shadow-xl">
            {/* Right Palm Outline */}
            <path
              d="M 28 95 C 22 130, 44 148, 75 148 C 106 148, 128 130, 122 95 C 114 85, 34 85, 28 95 Z"
              fill="#1e293b"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Right Fingers */}
            {rightHandFingers.map((f) => {
              const isActive = (activeFingerId === f.id) || (activeFingerId === 'SPACE' && f.id === 'RT') || (needRightShift && f.id === 'RP');
              return (
                <g key={f.id} transform={f.rotate ? `rotate(${f.rotate} ${f.x + f.w / 2} ${f.y + f.h / 2})` : ''}>
                  <rect
                    x={f.x}
                    y={isActive ? f.y - 8 : f.y}
                    width={f.w}
                    height={f.h}
                    rx={f.w / 2}
                    fill={isActive ? f.color : '#1e293b'}
                    stroke={isActive ? '#ffffff' : f.color}
                    strokeWidth={isActive ? '3' : '1.5'}
                    className={`transition-all duration-150 ${isActive ? 'shadow-xl shadow-indigo-500' : 'opacity-75'}`}
                  />
                  {/* Resting key badge */}
                  <circle
                    cx={f.x + f.w / 2}
                    cy={f.y + 12}
                    r="5"
                    fill={isActive ? '#ffffff' : '#0f172a'}
                    stroke={f.color}
                    strokeWidth="1"
                  />
                  <text
                    x={f.x + f.w / 2}
                    y={f.y + 15}
                    textAnchor="middle"
                    fontSize="7"
                    fontWeight="bold"
                    fill={isActive ? '#0f172a' : '#94a3b8'}
                  >
                    {f.restingKey}
                  </text>
                  {/* Finger label */}
                  <text
                    x={f.x + f.w / 2}
                    y={f.y + f.h - 10}
                    textAnchor="middle"
                    fontSize="6"
                    fontWeight="bold"
                    fill={isActive ? '#ffffff' : '#64748b'}
                  >
                    {f.id.replace('R', '')}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
