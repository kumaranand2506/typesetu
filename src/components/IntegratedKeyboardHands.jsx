import React, { useState, useEffect } from 'react';
import { KEYBOARD_ROWS, FINGER_INFO } from '../data/inscriptMap';
import { soundManager } from '../utils/soundEffects';
import { Eye, EyeOff, Volume2, Sparkles, Sliders, Keyboard } from 'lucide-react';

export default function IntegratedKeyboardHands({
  targetKey = null,
  targetShift = false,
  language = 'hindi',
  pressedKey = null,
  initialHindiLayout = 'inscript', // 'inscript' | 'remington'
}) {
  const [hindiLayout, setHindiLayout] = useState(initialHindiLayout);
  const [handOpacity, setHandOpacity] = useState(() => {
    try {
      return localStorage.getItem('typesetu_hand_opacity') || '100';
    } catch (e) {
      return '100';
    }
  });
  const [switchProfile, setSwitchProfile] = useState(() => soundManager.getSwitchProfile());

  const handleOpacityChange = (val) => {
    setHandOpacity(val);
    try {
      localStorage.setItem('typesetu_hand_opacity', val);
    } catch (e) {}
  };

  const handleSwitchChange = (profile) => {
    soundManager.setSwitchProfile(profile);
    setSwitchProfile(profile);
  };

  // Find target key coordinates and responsible finger
  let activeFingerId = null;
  let targetRowIdx = -1;
  let targetColIdx = -1;

  KEYBOARD_ROWS.forEach((row, rIdx) => {
    row.forEach((k, cIdx) => {
      const match = targetKey && (
        k.key?.toLowerCase() === targetKey?.toLowerCase() ||
        k.code?.toLowerCase() === targetKey?.toLowerCase() ||
        (k.key === ' ' && targetKey === ' ')
      );
      if (match) {
        activeFingerId = k.finger;
        targetRowIdx = rIdx;
        targetColIdx = cIdx;
      }
    });
  });

  const activeFinger = activeFingerId ? FINGER_INFO[activeFingerId] : null;

  // Touch typing opposite shift discipline
  const isRightHandStrike = activeFinger && ['RI', 'RM', 'RR', 'RP'].includes(activeFinger.id);
  const isLeftHandStrike = activeFinger && ['LI', 'LM', 'LR', 'LP'].includes(activeFinger.id);

  const needLeftShift = targetShift && (isRightHandStrike || !activeFinger);
  const needRightShift = targetShift && isLeftHandStrike;

  // Compute realistic reach vectors (dx, dy) for the active finger based on target key
  const computeFingerReach = (fingerId) => {
    if (activeFingerId !== fingerId) return { dx: 0, dy: 0, scale: 1, isStriking: false };

    let dy = 0;
    let dx = 0;

    // Row delta relative to Home row (Row 2)
    // Row 0: Numbers (1-0), Row 1: Top (Q-P), Row 2: Home (A-;), Row 3: Bottom (Z-/), Row 4: Space
    if (targetRowIdx === 0) dy = -52; // Number row reach
    else if (targetRowIdx === 1) dy = -26; // Top row reach
    else if (targetRowIdx === 2) dy = -4; // Home row strike tap
    else if (targetRowIdx === 3) dy = 26; // Bottom row reach
    else if (targetRowIdx === 4) dy = 16; // Spacebar

    // Lateral reach adjustments for index and pinky fingers
    if (fingerId === 'LI') {
      // Resting on F (Col 4 of Row 2)
      // Reaching for T, 5 (col 5) or G (col 5) or B (col 5)
      if (['KeyT', 'KeyG', 'KeyB', 'Digit5'].includes(KEYBOARD_ROWS[targetRowIdx]?.[targetColIdx]?.code)) {
        dx = 16;
      }
    } else if (fingerId === 'RI') {
      // Resting on J (Col 7 of Row 2)
      // Reaching for Y, 6 (col 6) or H (col 6) or N (col 6)
      if (['KeyY', 'KeyH', 'KeyN', 'Digit6'].includes(KEYBOARD_ROWS[targetRowIdx]?.[targetColIdx]?.code)) {
        dx = -16;
      }
    } else if (fingerId === 'LP') {
      // Reaching for Tab, Caps, Left Shift
      if (['Tab', 'CapsLock', 'ShiftLeft', 'Backquote', 'Digit1'].includes(KEYBOARD_ROWS[targetRowIdx]?.[targetColIdx]?.code)) {
        dx = -14;
      }
    } else if (fingerId === 'RP') {
      // Reaching for Enter, Backspace, Bracket, Slash
      if (['BracketLeft', 'BracketRight', 'Backslash', 'Enter', 'Backspace', 'ShiftRight', 'Slash'].includes(KEYBOARD_ROWS[targetRowIdx]?.[targetColIdx]?.code)) {
        dx = 16;
      }
    }

    return { dx, dy, scale: 1.08, isStriking: true };
  };

  // Left Hand resting fingers (ASDF + Space)
  const leftFingers = [
    { id: 'LP', name: 'Pinky', restKey: 'A', x: 28, y: 56, w: 14, h: 54, color: '#f43f5e', zone: '1, Q, A, Z' },
    { id: 'LR', name: 'Ring', restKey: 'S', x: 49, y: 36, w: 15, h: 74, color: '#fb923c', zone: '2, W, S, X' },
    { id: 'LM', name: 'Middle', restKey: 'D', x: 71, y: 22, w: 15, h: 88, color: '#facc15', zone: '3, E, D, C' },
    { id: 'LI', name: 'Index', restKey: 'F', x: 93, y: 34, w: 15, h: 76, color: '#4ade80', zone: '4, 5, R, T, F, G, V, B' },
    { id: 'LT', name: 'Thumb', restKey: 'Space', x: 116, y: 84, w: 17, h: 48, rotate: 26, color: '#38bdf8', zone: 'Spacebar' },
  ];

  // Right Hand resting fingers (JKL; + Space)
  const rightFingers = [
    { id: 'RT', name: 'Thumb', restKey: 'Space', x: 26, y: 84, w: 17, h: 48, rotate: -26, color: '#38bdf8', zone: 'Spacebar' },
    { id: 'RI', name: 'Index', restKey: 'J', x: 50, y: 34, w: 15, h: 76, color: '#818cf8', zone: '6, 7, Y, U, H, J, N, M' },
    { id: 'RM', name: 'Middle', restKey: 'K', x: 72, y: 22, w: 15, h: 88, color: '#a855f7', zone: '8, I, K, ,' },
    { id: 'RR', name: 'Ring', restKey: 'L', x: 94, y: 36, w: 15, h: 74, color: '#ec4899', zone: '9, O, L, .' },
    { id: 'RP', name: 'Pinky', restKey: ';', x: 116, y: 56, w: 14, h: 54, color: '#14b8a6', zone: '0, P, ;, /, Enter' },
  ];

  const opacityValue = handOpacity === '0' ? 0 : handOpacity === '20' ? 0.2 : handOpacity === '50' ? 0.5 : 1;

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900/95 dark:bg-slate-950/95 border-2 border-slate-700/80 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-md select-none overflow-hidden flex flex-col items-center transition-all">
      {/* Top Interactive Toolbar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-800/80 text-xs">
        {/* Layout & Mode Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-200">
              {language === 'hindi' ? (
                hindiLayout === 'inscript' ? 'हिंदी इनस्क्रिप्ट (BIS)' : 'हिंदी रेमिंगटन (Krutidev)'
              ) : (
                'English QWERTY Layout'
              )}
            </span>
          </div>

          {/* Hindi Layout Switcher Pill */}
          {language === 'hindi' && (
            <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[11px] font-semibold">
              <button
                onClick={() => setHindiLayout('inscript')}
                className={`px-2 py-0.5 rounded transition cursor-pointer ${hindiLayout === 'inscript' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                InScript
              </button>
              <button
                onClick={() => setHindiLayout('remington')}
                className={`px-2 py-0.5 rounded transition cursor-pointer ${hindiLayout === 'remington' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Remington
              </button>
            </div>
          )}
        </div>

        {/* Hand Opacity & Switch Sound Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mechanical Switch Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-[11px]">
            <Volume2 size={13} className={switchProfile === 'off' ? 'text-slate-500' : 'text-emerald-400'} />
            <span className="text-slate-400 mr-1 hidden sm:inline">Switch:</span>
            {['blue', 'brown', 'red', 'off'].map((p) => (
              <button
                key={p}
                onClick={() => handleSwitchChange(p)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase transition cursor-pointer ${
                  switchProfile === p
                    ? p === 'blue' ? 'bg-blue-600 text-white' : p === 'brown' ? 'bg-amber-700 text-white' : p === 'red' ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Cherry MX ${p}`}
              >
                {p === 'off' ? 'Mute' : p}
              </button>
            ))}
          </div>

          {/* Hand Opacity Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-[11px]">
            <span className="text-slate-400 mr-1 hidden sm:inline">Hands:</span>
            {['100', '50', '20', '0'].map((op) => (
              <button
                key={op}
                onClick={() => handleOpacityChange(op)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  handOpacity === op
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={op === '0' ? 'Hide Hands' : `${op}% Opacity`}
              >
                {op === '0' ? 'Hide' : `${op}%`}
              </button>
            ))}
          </div>

          {/* Live Finger Instruction Cue */}
          {activeFinger ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
              <span
                className="w-2.5 h-2.5 rounded-full animate-bounce shadow-md"
                style={{ backgroundColor: activeFinger.color }}
              />
              <span className="font-bold text-xs" style={{ color: activeFinger.color }}>
                {language === 'hindi' ? activeFinger.hindiName : activeFinger.name}
              </span>
              {targetShift && (
                <span className="ml-1 text-[9px] bg-amber-400 text-slate-950 px-1 py-0.2 rounded font-black uppercase animate-pulse">
                  + Shift
                </span>
              )}
            </div>
          ) : (
            <span className="text-slate-500 italic text-xs">Ready</span>
          )}
        </div>
      </div>

      {/* KEYBOARD CHASSIS WITH COLOR-CODED FINGER ZONES */}
      <div className="flex flex-col gap-1.5 w-full min-w-[720px] max-w-[940px] px-2 py-3 bg-slate-950/90 rounded-2xl border border-slate-800 shadow-2xl overflow-x-auto">
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

              // Character labels based on layout
              const engPrimary = k.key || '';
              const engShift = k.shiftKey || '';

              let hindiPrimary = k.inscript || '';
              let hindiShift = k.inscriptShift || '';
              if (hindiLayout === 'remington') {
                hindiPrimary = k.remington || '';
                hindiShift = k.remingtonShift || '';
              }

              const fingerColor = finger ? finger.color : '#334155';

              return (
                <div
                  key={k.code}
                  className={`
                    relative h-12 sm:h-14 ${widthClass} rounded-xl flex flex-col justify-between p-1 sm:p-1.5
                    border transition-all duration-100 select-none cursor-default
                    ${isPhysicallyPressed ? 'scale-90 bg-indigo-600 border-indigo-400 text-white shadow-inner' : ''}
                    ${isTargetKey ? 'ring-4 ring-indigo-400 bg-indigo-950 border-indigo-300 shadow-xl shadow-indigo-500/40 -translate-y-1 z-10' : ''}
                    ${isTargetShift ? 'ring-4 ring-amber-400 bg-amber-950 border-amber-300 shadow-xl shadow-amber-500/40 -translate-y-1 z-10 animate-pulse' : ''}
                    ${!isTargetKey && !isTargetShift && !isPhysicallyPressed ? 'bg-slate-900/90 border-slate-800 text-slate-200' : ''}
                  `}
                  style={{
                    borderBottomWidth: '4px',
                    borderColor: isTargetKey ? '#818cf8' : isTargetShift ? '#fbbf24' : isPhysicallyPressed ? '#6366f1' : `${fingerColor}60`,
                  }}
                >
                  {/* Finger zone indicator dot on keycap */}
                  {finger && !k.special && (
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full opacity-60"
                      style={{ backgroundColor: fingerColor }}
                    />
                  )}

                  {k.special ? (
                    <div className="flex items-center justify-center h-full">
                      <span className={`text-[10px] sm:text-xs font-semibold ${isTargetShift ? 'text-amber-300 font-bold' : 'text-slate-400'}`}>
                        {k.label}
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* Top row label: English character or Shift symbol */}
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono-custom font-semibold text-slate-400 leading-none">
                        <span>{engShift}</span>
                        <span className="text-slate-500 text-[9px] uppercase">{engPrimary}</span>
                      </div>

                      {/* Bottom row label: Hindi character */}
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

      {/* TYPINGCLUB-STYLE ANIMATED HANDS OVERLAY */}
      {handOpacity !== '0' && (
        <div
          className="w-full max-w-[940px] pt-4 flex flex-col sm:flex-row items-center justify-around gap-6 bg-slate-950/70 rounded-2xl border border-slate-800/80 mt-2 p-3 transition-opacity duration-200"
          style={{ opacity: opacityValue }}
        >
          {/* LEFT HAND (ASDF Resting Zone + Dynamic Reach) */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-slate-300">
              <span>बायाँ हाथ (Left Hand)</span>
              <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono">
                A S D F
              </span>
            </div>

            <svg width="230" height="155" viewBox="0 0 160 150" className="overflow-visible drop-shadow-2xl">
              {/* Anatomical Left Palm Contour */}
              <path
                d="M 22 92 C 16 128, 40 148, 75 148 C 110 148, 128 128, 124 92 C 114 82, 28 82, 22 92 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2.5"
              />

              {/* Dynamic Fingers with Animated Reach Trajectory */}
              {leftFingers.map((f) => {
                const reach = computeFingerReach(f.id);
                // Also trigger Left Pinky reach when Shift is needed on opposite hand
                const isShiftTriggered = needLeftShift && f.id === 'LP';
                const finalDx = isShiftTriggered ? -26 : reach.dx;
                const finalDy = isShiftTriggered ? 26 : reach.dy;
                const isActive = reach.isStriking || isShiftTriggered;

                return (
                  <g
                    key={f.id}
                    style={{
                      transform: `translate(${finalDx}px, ${finalDy}px) ${f.rotate ? `rotate(${f.rotate}deg)` : ''}`,
                      transformOrigin: `${f.x + f.w / 2}px ${f.y + f.h}px`,
                      transition: 'transform 0.16s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
                    }}
                  >
                    {/* Glowing shockwave ring when striking */}
                    {isActive && (
                      <circle
                        cx={f.x + f.w / 2}
                        cy={f.y + 8}
                        r="14"
                        fill="none"
                        stroke={f.color}
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}

                    {/* Articulated Finger Stem */}
                    <rect
                      x={f.x}
                      y={f.y}
                      width={f.w}
                      height={f.h}
                      rx={f.w / 2}
                      fill={isActive ? f.color : '#1e293b'}
                      stroke={isActive ? '#ffffff' : f.color}
                      strokeWidth={isActive ? '3' : '1.5'}
                      className={`transition-colors duration-150 ${isActive ? 'shadow-2xl' : 'opacity-85'}`}
                    />

                    {/* Knuckle joint line */}
                    <line
                      x1={f.x + 2}
                      y1={f.y + f.h * 0.55}
                      x2={f.x + f.w - 2}
                      y2={f.y + f.h * 0.55}
                      stroke={isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="1"
                    />

                    {/* Fingertip target badge */}
                    <circle
                      cx={f.x + f.w / 2}
                      cy={f.y + 11}
                      r="5.5"
                      fill={isActive ? '#ffffff' : '#0f172a'}
                      stroke={f.color}
                      strokeWidth="1.2"
                    />
                    <text
                      x={f.x + f.w / 2}
                      y={f.y + 14}
                      textAnchor="middle"
                      fontSize="7"
                      fontWeight="bold"
                      fill={isActive ? '#0f172a' : '#94a3b8'}
                    >
                      {f.restKey}
                    </text>

                    {/* Finger label */}
                    <text
                      x={f.x + f.w / 2}
                      y={f.y + f.h - 8}
                      textAnchor="middle"
                      fontSize="6.5"
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
          <div className="hidden lg:flex flex-col items-center justify-center max-w-[210px] text-center px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-200">Home Row Rule</span>
            <p className="leading-snug">
              उँगलियों को हमेशा <strong>ASDF</strong> और <strong>JKL;</strong> पर विश्राम दें। अंगूठे स्पेसबार पर रखें।
            </p>
            <div className="w-full border-t border-slate-800 pt-1 text-[10px] text-indigo-400 font-semibold">
              {language === 'hindi' ? 'बायाँ: स्वर • दायाँ: व्यंजन' : 'F & J have tactile home bumps'}
            </div>
          </div>

          {/* RIGHT HAND (JKL; Resting Zone + Dynamic Reach) */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-slate-300">
              <span className="text-[10px] bg-slate-800 text-indigo-300 px-2 py-0.5 rounded font-mono">
                J K L ;
              </span>
              <span>दायाँ हाथ (Right Hand)</span>
            </div>

            <svg width="230" height="155" viewBox="0 0 160 150" className="overflow-visible drop-shadow-2xl">
              {/* Anatomical Right Palm Contour */}
              <path
                d="M 26 92 C 20 128, 42 148, 77 148 C 112 148, 130 128, 126 92 C 116 82, 32 82, 26 92 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2.5"
              />

              {/* Dynamic Right Fingers with Animated Reach */}
              {rightFingers.map((f) => {
                const reach = computeFingerReach(f.id);
                // Also trigger Right Pinky reach when Shift is needed on opposite hand
                const isShiftTriggered = needRightShift && f.id === 'RP';
                const finalDx = isShiftTriggered ? 26 : reach.dx;
                const finalDy = isShiftTriggered ? 26 : reach.dy;
                const isActive = reach.isStriking || isShiftTriggered;

                return (
                  <g
                    key={f.id}
                    style={{
                      transform: `translate(${finalDx}px, ${finalDy}px) ${f.rotate ? `rotate(${f.rotate}deg)` : ''}`,
                      transformOrigin: `${f.x + f.w / 2}px ${f.y + f.h}px`,
                      transition: 'transform 0.16s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
                    }}
                  >
                    {/* Glowing shockwave ring when striking */}
                    {isActive && (
                      <circle
                        cx={f.x + f.w / 2}
                        cy={f.y + 8}
                        r="14"
                        fill="none"
                        stroke={f.color}
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}

                    {/* Articulated Finger Stem */}
                    <rect
                      x={f.x}
                      y={f.y}
                      width={f.w}
                      height={f.h}
                      rx={f.w / 2}
                      fill={isActive ? f.color : '#1e293b'}
                      stroke={isActive ? '#ffffff' : f.color}
                      strokeWidth={isActive ? '3' : '1.5'}
                      className={`transition-colors duration-150 ${isActive ? 'shadow-2xl' : 'opacity-85'}`}
                    />

                    {/* Knuckle joint line */}
                    <line
                      x1={f.x + 2}
                      y1={f.y + f.h * 0.55}
                      x2={f.x + f.w - 2}
                      y2={f.y + f.h * 0.55}
                      stroke={isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)'}
                      strokeWidth="1"
                    />

                    {/* Fingertip target badge */}
                    <circle
                      cx={f.x + f.w / 2}
                      cy={f.y + 11}
                      r="5.5"
                      fill={isActive ? '#ffffff' : '#0f172a'}
                      stroke={f.color}
                      strokeWidth="1.2"
                    />
                    <text
                      x={f.x + f.w / 2}
                      y={f.y + 14}
                      textAnchor="middle"
                      fontSize="7"
                      fontWeight="bold"
                      fill={isActive ? '#0f172a' : '#94a3b8'}
                    >
                      {f.restKey}
                    </text>

                    {/* Finger label */}
                    <text
                      x={f.x + f.w / 2}
                      y={f.y + f.h - 8}
                      textAnchor="middle"
                      fontSize="6.5"
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
      )}
    </div>
  );
}
