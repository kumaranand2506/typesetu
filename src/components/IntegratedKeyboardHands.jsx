import React, { useState } from 'react';
import { KEYBOARD_ROWS, FINGER_INFO } from '../data/inscriptMap';
import { soundManager } from '../utils/soundEffects';
import { Volume2, Eye, Sliders, ShieldCheck } from 'lucide-react';

// Exact Key Coordinates within 940 x 280 SVG coordinate space
const KEY_COORD_MAP = {
  // Row 0: Y = 30
  'Backquote': { x: 42, y: 30 }, '`': { x: 42, y: 30 }, '~': { x: 42, y: 30 },
  'Digit1': { x: 98, y: 30 }, '1': { x: 98, y: 30 }, '!': { x: 98, y: 30 },
  'Digit2': { x: 154, y: 30 }, '2': { x: 154, y: 30 }, '@': { x: 154, y: 30 },
  'Digit3': { x: 210, y: 30 }, '3': { x: 210, y: 30 }, '#': { x: 210, y: 30 },
  'Digit4': { x: 266, y: 30 }, '4': { x: 266, y: 30 }, '$': { x: 266, y: 30 },
  'Digit5': { x: 322, y: 30 }, '5': { x: 322, y: 30 }, '%': { x: 322, y: 30 },
  'Digit6': { x: 378, y: 30 }, '6': { x: 378, y: 30 }, '^': { x: 378, y: 30 },
  'Digit7': { x: 434, y: 30 }, '7': { x: 434, y: 30 }, '&': { x: 434, y: 30 },
  'Digit8': { x: 490, y: 30 }, '8': { x: 490, y: 30 }, '*': { x: 490, y: 30 },
  'Digit9': { x: 546, y: 30 }, '9': { x: 546, y: 30 }, '(': { x: 546, y: 30 },
  'Digit0': { x: 602, y: 30 }, '0': { x: 602, y: 30 }, ')': { x: 602, y: 30 },
  'Minus': { x: 658, y: 30 }, '-': { x: 658, y: 30 }, '_': { x: 658, y: 30 },
  'Equal': { x: 714, y: 30 }, '=': { x: 714, y: 30 }, '+': { x: 714, y: 30 },
  'Backspace': { x: 820, y: 30 },

  // Row 1: Y = 84
  'Tab': { x: 50, y: 84 },
  'KeyQ': { x: 115, y: 84 }, 'q': { x: 115, y: 84 },
  'KeyW': { x: 171, y: 84 }, 'w': { x: 171, y: 84 },
  'KeyE': { x: 227, y: 84 }, 'e': { x: 227, y: 84 },
  'KeyR': { x: 283, y: 84 }, 'r': { x: 283, y: 84 },
  'KeyT': { x: 339, y: 84 }, 't': { x: 339, y: 84 },
  'KeyY': { x: 395, y: 84 }, 'y': { x: 395, y: 84 },
  'KeyU': { x: 451, y: 84 }, 'u': { x: 451, y: 84 },
  'KeyI': { x: 507, y: 84 }, 'i': { x: 507, y: 84 },
  'KeyO': { x: 563, y: 84 }, 'o': { x: 563, y: 84 },
  'KeyP': { x: 619, y: 84 }, 'p': { x: 619, y: 84 },
  'BracketLeft': { x: 675, y: 84 }, '[': { x: 675, y: 84 }, '{': { x: 675, y: 84 },
  'BracketRight': { x: 731, y: 84 }, ']': { x: 731, y: 84 }, '}': { x: 731, y: 84 },
  'Backslash': { x: 810, y: 84 }, '\\': { x: 810, y: 84 }, '|': { x: 810, y: 84 },

  // Row 2: Y = 138 (Home Row)
  'CapsLock': { x: 56, y: 138 },
  'KeyA': { x: 128, y: 138 }, 'a': { x: 128, y: 138 },
  'KeyS': { x: 184, y: 138 }, 's': { x: 184, y: 138 },
  'KeyD': { x: 240, y: 138 }, 'd': { x: 240, y: 138 },
  'KeyF': { x: 296, y: 138 }, 'f': { x: 296, y: 138 },
  'KeyG': { x: 352, y: 138 }, 'g': { x: 352, y: 138 },
  'KeyH': { x: 408, y: 138 }, 'h': { x: 408, y: 138 },
  'KeyJ': { x: 464, y: 138 }, 'j': { x: 464, y: 138 },
  'KeyK': { x: 520, y: 138 }, 'k': { x: 520, y: 138 },
  'KeyL': { x: 576, y: 138 }, 'l': { x: 576, y: 138 },
  'Semicolon': { x: 632, y: 138 }, ';': { x: 632, y: 138 }, ':': { x: 632, y: 138 },
  'Quote': { x: 688, y: 138 }, "'": { x: 688, y: 138 }, '"': { x: 688, y: 138 },
  'Enter': { x: 800, y: 138 },

  // Row 3: Y = 192
  'ShiftLeft': { x: 65, y: 192 },
  'KeyZ': { x: 145, y: 192 }, 'z': { x: 145, y: 192 },
  'KeyX': { x: 201, y: 192 }, 'x': { x: 201, y: 192 },
  'KeyC': { x: 257, y: 192 }, 'c': { x: 257, y: 192 },
  'KeyV': { x: 313, y: 192 }, 'v': { x: 313, y: 192 },
  'KeyB': { x: 369, y: 192 }, 'b': { x: 369, y: 192 },
  'KeyN': { x: 425, y: 192 }, 'n': { x: 425, y: 192 },
  'KeyM': { x: 481, y: 192 }, 'm': { x: 481, y: 192 },
  'Comma': { x: 537, y: 192 }, ',': { x: 537, y: 192 }, '<': { x: 537, y: 192 },
  'Period': { x: 593, y: 192 }, '.': { x: 593, y: 192 }, '>': { x: 593, y: 192 },
  'Slash': { x: 649, y: 192 }, '/': { x: 649, y: 192 }, '?': { x: 649, y: 192 },
  'ShiftRight': { x: 790, y: 192 },

  // Row 4: Y = 246 (Spacebar)
  'Space': { x: 470, y: 246 }, ' ': { x: 470, y: 246 },
};

export default function IntegratedKeyboardHands({
  targetKey = null,
  targetShift = false,
  language = 'hindi',
  pressedKey = null,
  initialHindiLayout = 'inscript',
  onLayoutChange = null,
}) {
  const [hindiLayout, setHindiLayout] = useState(initialHindiLayout);

  // High-Contrast Hand Overlay Mode: 'visible' | 'outline' | 'hidden'
  const [handMode, setHandMode] = useState(() => {
    try {
      return localStorage.getItem('typesetu_hands_mode') || 'visible';
    } catch (e) {
      return 'visible';
    }
  });

  // Hand Opacity: 20 to 100
  const [handOpacity, setHandOpacity] = useState(() => {
    try {
      return Number(localStorage.getItem('typesetu_hands_opacity')) || 85;
    } catch (e) {
      return 85;
    }
  });

  const [switchProfile, setSwitchProfile] = useState(() => soundManager.getSwitchProfile());

  const handleModeChange = (mode) => {
    setHandMode(mode);
    try {
      localStorage.setItem('typesetu_hands_mode', mode);
    } catch (e) {}
  };

  const handleOpacityChange = (val) => {
    const num = Number(val);
    setHandOpacity(num);
    try {
      localStorage.setItem('typesetu_hands_opacity', String(num));
    } catch (e) {}
  };

  const handleSwitchChange = (profile) => {
    soundManager.setSwitchProfile(profile);
    setSwitchProfile(profile);
  };

  // Find target key coordinates and responsible finger
  let activeFingerId = null;

  KEYBOARD_ROWS.forEach((row) => {
    row.forEach((k) => {
      const match =
        targetKey &&
        (k.key?.toLowerCase() === targetKey?.toLowerCase() ||
          k.code?.toLowerCase() === targetKey?.toLowerCase() ||
          (k.key === ' ' && targetKey === ' '));
      if (match) {
        activeFingerId = k.finger;
      }
    });
  });

  const isSpaceKey = targetKey === ' ' || targetKey === 'Space';
  const activeFinger = activeFingerId ? FINGER_INFO[activeFingerId] : null;

  // Touch typing opposite shift discipline
  const isRightHandStrike = activeFinger && ['RI', 'RM', 'RR', 'RP'].includes(activeFinger.id);
  const isLeftHandStrike = activeFinger && ['LI', 'LM', 'LR', 'LP'].includes(activeFinger.id);

  const needLeftShift = targetShift && (isRightHandStrike || !activeFinger);
  const needRightShift = targetShift && isLeftHandStrike;

  // Coordinates of target key
  const targetKeyCoord = targetKey ? KEY_COORD_MAP[targetKey] || KEY_COORD_MAP[targetKey.toLowerCase()] : null;

  // 10 Vector Line-Art Fingers Configuration resting over Home Row
  const leftFingersOverlay = [
    { id: 'LP', name: 'Pinky', restKey: 'A', restX: 128, restY: 138, kx: 155, ky: 215 },
    { id: 'LR', name: 'Ring', restKey: 'S', restX: 184, restY: 138, kx: 195, ky: 210 },
    { id: 'LM', name: 'Middle', restKey: 'D', restX: 240, restY: 138, kx: 235, ky: 205 },
    { id: 'LI', name: 'Index', restKey: 'F', restX: 296, restY: 138, kx: 275, ky: 210 },
    { id: 'LT', name: 'Thumb', restKey: '␣', restX: 410, restY: 246, kx: 330, ky: 240 },
  ];

  const rightFingersOverlay = [
    { id: 'RT', name: 'Thumb', restKey: '␣', restX: 510, restY: 246, kx: 450, ky: 240 },
    { id: 'RI', name: 'Index', restKey: 'J', restX: 464, restY: 138, kx: 485, ky: 210 },
    { id: 'RM', name: 'Middle', restKey: 'K', restX: 520, restY: 138, kx: 525, ky: 205 },
    { id: 'RR', name: 'Ring', restKey: 'L', restX: 576, restY: 138, kx: 565, ky: 210 },
    { id: 'RP', name: 'Pinky', restKey: ';', restX: 632, restY: 138, kx: 605, ky: 215 },
  ];

  // Active accent color: high-visibility neon cyan
  const ACCENT_COLOR = '#06b6d4'; // Cyan 500
  const SHIFT_COLOR = '#fbbf24'; // Amber 400

  // Opacity calculation
  const currentOpacity = handMode === 'hidden' ? 0 : handOpacity / 100;

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto space-y-2.5">
      {/* TOOLBAR CONTROLS: BIS STANDARD BADGE, HANDS TOGGLE, OPACITY SLIDER, AUDIO */}
      <div className="w-full flex flex-wrap items-center justify-between gap-2.5 px-3.5 py-2 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md text-xs">
        {/* Left: BIS IS 16350 InScript Standard Indicator */}
        <div className="flex items-center gap-2">
          {language === 'hindi' ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="font-bold text-white text-[11px] font-hindi">
                BIS IS 16350 मानक (InScript Mangal)
              </span>
              <span className="text-[10px] text-slate-500 hidden sm:inline">• शासकीय मानक</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="font-bold text-white text-[11px]">Standard QWERTY Layout</span>
            </div>
          )}
        </div>

        {/* Right: Hands Mode (Visible | Outline | Hidden), Opacity Slider, Audio Switch */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Hands Quick Toggle: Visible | Outline | Hidden */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-[11px]">
            <span className="text-slate-400 px-1.5 hidden md:inline flex items-center gap-1 font-semibold">
              <Eye size={12} />
              Hands:
            </span>
            {[
              { id: 'visible', label: 'Visible' },
              { id: 'outline', label: 'Outline' },
              { id: 'hidden', label: 'Hidden' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleModeChange(m.id)}
                className={`px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                  handMode === m.id
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Hand Mode: ${m.label}`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Opacity Slider (When not hidden) */}
          {handMode !== 'hidden' && (
            <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1 text-[11px]">
              <Sliders size={12} className="text-slate-400" />
              <input
                type="range"
                min="20"
                max="100"
                step="5"
                value={handOpacity}
                onChange={(e) => handleOpacityChange(e.target.value)}
                className="w-16 sm:w-20 accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                title={`Hand Opacity: ${handOpacity}%`}
              />
              <span className="font-mono text-[10px] text-slate-300 w-7 text-right">
                {handOpacity}%
              </span>
            </div>
          )}

          {/* Cherry MX Audio Switch Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-[11px]">
            <Volume2 size={13} className={switchProfile === 'off' ? 'text-slate-500' : 'text-emerald-400'} />
            {['blue', 'brown', 'red', 'off'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => handleSwitchChange(p)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase transition cursor-pointer ${
                  switchProfile === p
                    ? p === 'blue'
                      ? 'bg-blue-600 text-white'
                      : p === 'brown'
                      ? 'bg-amber-700 text-white'
                      : p === 'red'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-700 text-slate-300'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Cherry MX ${p}`}
              >
                {p === 'off' ? 'Mute' : p}
              </button>
            ))}
          </div>

          {/* Active Finger Status Badge */}
          {activeFinger ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse shadow-md"
                style={{ backgroundColor: activeFinger.color }}
              />
              <span className="font-bold text-xs text-cyan-300">
                {language === 'hindi' ? activeFinger.hindiName : activeFinger.name}
              </span>
              {targetShift && (
                <span className="ml-1 text-[9px] bg-amber-400 text-slate-950 px-1 py-0.5 rounded font-black uppercase">
                  + Shift
                </span>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* KEYBOARD CHASSIS WITH INTEGRATED DUAL KEYCAPS & SUPERIMPOSED HANDS */}
      <div className="relative flex flex-col gap-1.5 w-full min-w-[720px] max-w-[940px] px-2.5 py-3 bg-slate-950/95 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden select-none">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1.5 justify-center">
            {row.map((k) => {
              const finger = k.finger ? FINGER_INFO[k.finger] : null;

              const isTargetKey =
                targetKey &&
                (k.key?.toLowerCase() === targetKey?.toLowerCase() ||
                  k.code?.toLowerCase() === targetKey?.toLowerCase() ||
                  (k.key === ' ' && targetKey === ' '));

              const isTargetShift =
                (k.code === 'ShiftLeft' && needLeftShift) ||
                (k.code === 'ShiftRight' && needRightShift);

              const isPhysicallyPressed =
                pressedKey &&
                (pressedKey.code === k.code ||
                  pressedKey.key?.toLowerCase() === k.key?.toLowerCase());

              const widthClass = k.width || 'w-11 sm:w-14';

              const engPrimary = k.key || '';
              const engShift = k.shiftKey || '';

              const hindiPrimary = k.inscript || '';
              const hindiShift = k.inscriptShift || '';

              const fingerColor = finger ? finger.color : '#334155';

              return (
                <div
                  key={k.code}
                  className={`
                    relative h-12 sm:h-14 ${widthClass} rounded-xl flex flex-col justify-between p-1 sm:p-1.5
                    border transition-all duration-100 select-none cursor-default
                    ${isPhysicallyPressed ? 'scale-90 bg-indigo-600 border-indigo-400 text-white shadow-inner' : ''}
                    ${isTargetKey ? 'ring-4 ring-cyan-400 bg-cyan-950/80 border-cyan-300 shadow-xl shadow-cyan-500/40 -translate-y-1 z-10' : ''}
                    ${isTargetShift ? 'ring-4 ring-amber-400 bg-amber-950 border-amber-300 shadow-xl shadow-amber-500/40 -translate-y-1 z-10 animate-pulse' : ''}
                    ${!isTargetKey && !isTargetShift && !isPhysicallyPressed ? 'bg-slate-900/90 border-slate-800 text-slate-200' : ''}
                  `}
                  style={{
                    borderBottomWidth: '4px',
                    borderColor: isTargetKey
                      ? ACCENT_COLOR
                      : isTargetShift
                      ? SHIFT_COLOR
                      : isPhysicallyPressed
                      ? '#6366f1'
                      : `${fingerColor}55`,
                  }}
                >
                  {/* Finger color badge dot */}
                  {finger && !k.special && (
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full opacity-60"
                      style={{ backgroundColor: fingerColor }}
                    />
                  )}

                  {/* Special keys: Space, Shift, Enter, Backspace */}
                  {k.special ? (
                    <div className="flex items-center justify-center h-full">
                      <span
                        className={`text-[10px] sm:text-xs font-semibold ${
                          isTargetShift ? 'text-amber-300 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {k.label}
                      </span>
                    </div>
                  ) : (
                    /* DUAL KEYCAP: PRIMARY DEVANAGARI + SUBTLE ENGLISH SUBSCRIPT */
                    <div className="relative flex flex-col justify-between h-full w-full">
                      {language === 'hindi' ? (
                        <>
                          {/* Top row: Shifted Devanagari character */}
                          <div className="flex items-center justify-start text-[10px] sm:text-[11px] font-hindi leading-none">
                            <span className={`${targetShift && isTargetKey ? 'text-amber-300 font-bold' : 'text-slate-400 opacity-75'}`}>
                              {hindiShift}
                            </span>
                          </div>

                          {/* Center: Prominent Primary Devanagari glyph */}
                          <div className="flex items-center justify-center -mt-1 sm:-mt-1.5">
                            <span
                              className={`text-base sm:text-xl font-bold font-hindi leading-none transition-all ${
                                isTargetKey ? 'text-cyan-200 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-amber-300'
                              }`}
                            >
                              {targetShift ? (hindiShift || hindiPrimary) : hindiPrimary}
                            </span>
                          </div>

                          {/* Bottom-right: Subtle Standard English QWERTY subscript */}
                          <div className="flex items-center justify-end text-[9px] sm:text-[10px] font-mono-custom font-semibold text-slate-400 leading-none">
                            <span>{engPrimary.toUpperCase()}</span>
                          </div>
                        </>
                      ) : (
                        /* Standard English QWERTY keycap */
                        <>
                          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono-custom font-semibold text-slate-400 leading-none">
                            <span>{engShift !== engPrimary ? engShift : ''}</span>
                          </div>

                          <div className="flex items-center justify-center -mt-1">
                            <span
                              className={`text-sm sm:text-base font-bold font-mono-custom leading-none ${
                                isTargetKey ? 'text-cyan-200 scale-110' : 'text-slate-100'
                              }`}
                            >
                              {targetShift ? engShift : engPrimary.toUpperCase()}
                            </span>
                          </div>

                          <div className="h-2" />
                        </>
                      )}

                      {/* Tactile Home Row Bumps (F & J) */}
                      {k.homeBump && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-slate-500 rounded-full opacity-70" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* ====================================================================== */}
        {/* HIGH-CONTRAST SUPERIMPOSED HAND SILHOUETTE OVERLAY                     */}
        {/* ====================================================================== */}
        {handMode !== 'hidden' && (
          <svg
            viewBox="0 0 940 280"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-30 transition-opacity duration-200"
            style={{ opacity: currentOpacity }}
          >
            {/* LEFT PALM & WRIST FRAME SILHOUETTE */}
            <path
              d="M 120 230 C 130 268, 175 276, 230 276 C 285 276, 335 264, 345 230 C 310 215, 150 215, 120 230 Z"
              fill={handMode === 'visible' ? 'rgba(15, 23, 42, 0.70)' : 'none'}
              stroke={handMode === 'visible' ? 'rgba(226, 232, 240, 0.60)' : 'rgba(56, 189, 248, 0.75)'}
              strokeWidth="2"
              strokeDasharray={handMode === 'outline' ? '4 2' : 'none'}
            />

            {/* RIGHT PALM & WRIST FRAME SILHOUETTE */}
            <path
              d="M 450 230 C 460 264, 510 276, 565 276 C 620 276, 665 268, 675 230 C 640 215, 480 215, 450 230 Z"
              fill={handMode === 'visible' ? 'rgba(15, 23, 42, 0.70)' : 'none'}
              stroke={handMode === 'visible' ? 'rgba(226, 232, 240, 0.60)' : 'rgba(56, 189, 248, 0.75)'}
              strokeWidth="2"
              strokeDasharray={handMode === 'outline' ? '4 2' : 'none'}
            />

            {/* LEFT HAND 5 FINGERS (Pinky, Ring, Middle, Index, Thumb) */}
            {leftFingersOverlay.map((f) => {
              const isDirectTarget = activeFingerId === f.id && targetKeyCoord;
              const isShiftTarget = needLeftShift && f.id === 'LP';
              const isSpaceTarget = isSpaceKey && f.id === 'LT';
              const isActive = isDirectTarget || isShiftTarget || isSpaceTarget;

              let curX = f.restX;
              let curY = f.restY;

              if (isDirectTarget) {
                curX = targetKeyCoord.x;
                curY = targetKeyCoord.y;
              } else if (isShiftTarget) {
                curX = 65; // Left Shift keycap coordinate
                curY = 192;
              } else if (isSpaceTarget) {
                curX = f.restX;
                curY = f.restY + 6;
              }

              const strokeCol = isShiftTarget
                ? SHIFT_COLOR
                : isActive
                ? ACCENT_COLOR
                : handMode === 'visible'
                ? 'rgba(226, 232, 240, 0.65)'
                : 'rgba(148, 163, 184, 0.75)';

              const fillCol = isShiftTarget
                ? 'rgba(251, 191, 36, 0.35)'
                : isActive
                ? 'rgba(6, 182, 212, 0.40)'
                : handMode === 'visible'
                ? 'rgba(30, 41, 59, 0.70)'
                : 'none';

              return (
                <g key={f.id} className="transition-all duration-150">
                  {/* Finger Contour Stem */}
                  <path
                    d={`M ${f.kx - 7} ${f.ky} Q ${(f.kx + curX) / 2 - 3} ${(f.ky + curY) / 2} ${curX - 6} ${
                      curY + 5
                    } A 7 7 0 0 1 ${curX + 6} ${curY + 5} Q ${(f.kx + curX) / 2 + 3} ${(f.ky + curY) / 2} ${
                      f.kx + 7
                    } ${f.ky} Z`}
                    fill={fillCol}
                    stroke={strokeCol}
                    strokeWidth={isActive ? '3' : '1.8'}
                  />

                  {/* Knuckle Joint Marker */}
                  <circle
                    cx={f.kx}
                    cy={f.ky}
                    r="3.5"
                    fill={isActive ? strokeCol : 'rgba(226, 232, 240, 0.7)'}
                  />

                  {/* Pulsing Ripple Halo when Active */}
                  {isActive && (
                    <circle
                      cx={curX}
                      cy={curY}
                      r="22"
                      fill="none"
                      stroke={strokeCol}
                      strokeWidth="2.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Fingertip Target Pad */}
                  <circle
                    cx={curX}
                    cy={curY}
                    r={isActive ? 12 : 8.5}
                    fill={isActive ? strokeCol : 'rgba(15, 23, 42, 0.90)'}
                    stroke={isActive ? '#ffffff' : 'rgba(226, 232, 240, 0.85)'}
                    strokeWidth={isActive ? 3 : 1.5}
                  />

                  {/* Fingertip Rest/Home Marker */}
                  <text
                    x={curX}
                    y={curY + 3.5}
                    textAnchor="middle"
                    fontSize={isActive ? '9.5' : '8'}
                    fontWeight="bold"
                    fill={isActive ? '#0f172a' : '#e2e8f0'}
                  >
                    {isShiftTarget ? '⇧' : f.restKey}
                  </text>
                </g>
              );
            })}

            {/* RIGHT HAND 5 FINGERS (Thumb, Index, Middle, Ring, Pinky) */}
            {rightFingersOverlay.map((f) => {
              const isDirectTarget = activeFingerId === f.id && targetKeyCoord;
              const isShiftTarget = needRightShift && f.id === 'RP';
              const isSpaceTarget = isSpaceKey && f.id === 'RT';
              const isActive = isDirectTarget || isShiftTarget || isSpaceTarget;

              let curX = f.restX;
              let curY = f.restY;

              if (isDirectTarget) {
                curX = targetKeyCoord.x;
                curY = targetKeyCoord.y;
              } else if (isShiftTarget) {
                curX = 790; // Right Shift keycap coordinate
                curY = 192;
              } else if (isSpaceTarget) {
                curX = f.restX;
                curY = f.restY + 6;
              }

              const strokeCol = isShiftTarget
                ? SHIFT_COLOR
                : isActive
                ? ACCENT_COLOR
                : handMode === 'visible'
                ? 'rgba(226, 232, 240, 0.65)'
                : 'rgba(148, 163, 184, 0.75)';

              const fillCol = isShiftTarget
                ? 'rgba(251, 191, 36, 0.35)'
                : isActive
                ? 'rgba(6, 182, 212, 0.40)'
                : handMode === 'visible'
                ? 'rgba(30, 41, 59, 0.70)'
                : 'none';

              return (
                <g key={f.id} className="transition-all duration-150">
                  {/* Finger Contour Stem */}
                  <path
                    d={`M ${f.kx - 7} ${f.ky} Q ${(f.kx + curX) / 2 - 3} ${(f.ky + curY) / 2} ${curX - 6} ${
                      curY + 5
                    } A 7 7 0 0 1 ${curX + 6} ${curY + 5} Q ${(f.kx + curX) / 2 + 3} ${(f.ky + curY) / 2} ${
                      f.kx + 7
                    } ${f.ky} Z`}
                    fill={fillCol}
                    stroke={strokeCol}
                    strokeWidth={isActive ? '3' : '1.8'}
                  />

                  {/* Knuckle Joint Marker */}
                  <circle
                    cx={f.kx}
                    cy={f.ky}
                    r="3.5"
                    fill={isActive ? strokeCol : 'rgba(226, 232, 240, 0.7)'}
                  />

                  {/* Pulsing Ripple Halo when Active */}
                  {isActive && (
                    <circle
                      cx={curX}
                      cy={curY}
                      r="22"
                      fill="none"
                      stroke={strokeCol}
                      strokeWidth="2.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Fingertip Target Pad */}
                  <circle
                    cx={curX}
                    cy={curY}
                    r={isActive ? 12 : 8.5}
                    fill={isActive ? strokeCol : 'rgba(15, 23, 42, 0.90)'}
                    stroke={isActive ? '#ffffff' : 'rgba(226, 232, 240, 0.85)'}
                    strokeWidth={isActive ? 3 : 1.5}
                  />

                  {/* Fingertip Rest/Home Marker */}
                  <text
                    x={curX}
                    y={curY + 3.5}
                    textAnchor="middle"
                    fontSize={isActive ? '9.5' : '8'}
                    fontWeight="bold"
                    fill={isActive ? '#0f172a' : '#e2e8f0'}
                  >
                    {isShiftTarget ? '⇧' : f.restKey}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
