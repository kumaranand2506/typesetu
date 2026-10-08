import React, { useState } from 'react';
import { KEYBOARD_ROWS, FINGER_INFO } from '../data/inscriptMap';
import { soundManager } from '../utils/soundEffects';
import { Volume2, Layers, Sparkles } from 'lucide-react';

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
  initialHindiLayout = 'inscript', // 'inscript' | 'remington'
  onLayoutChange = null,
}) {
  const [hindiLayout, setHindiLayout] = useState(initialHindiLayout);
  const [handDisplayMode, setHandDisplayMode] = useState(() => {
    try {
      return localStorage.getItem('typesetu_hand_mode') || 'overlay'; // 'overlay' | 'console' | 'both'
    } catch (e) {
      return 'overlay';
    }
  });

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

  const handleModeChange = (mode) => {
    setHandDisplayMode(mode);
    try {
      localStorage.setItem('typesetu_hand_mode', mode);
    } catch (e) {}
  };

  const handleSwitchChange = (profile) => {
    soundManager.setSwitchProfile(profile);
    setSwitchProfile(profile);
  };

  const handleHindiLayoutToggle = (layout) => {
    setHindiLayout(layout);
    if (onLayoutChange) {
      onLayoutChange(layout);
    }
  };

  // Find target key coordinates and responsible finger
  let activeFingerId = null;
  let targetRowIdx = -1;
  let targetColIdx = -1;

  KEYBOARD_ROWS.forEach((row, rIdx) => {
    row.forEach((k, cIdx) => {
      const match =
        targetKey &&
        (k.key?.toLowerCase() === targetKey?.toLowerCase() ||
          k.code?.toLowerCase() === targetKey?.toLowerCase() ||
          (k.key === ' ' && targetKey === ' '));
      if (match) {
        activeFingerId = k.finger;
        targetRowIdx = rIdx;
        targetColIdx = cIdx;
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

  // 10 Minimalist Vector Line-Art Fingers Configuration
  // Resting Home-Row Coordinates (ASDF + JKL; + Space)
  const leftFingersOverlay = [
    { id: 'LP', name: 'Pinky', restKey: 'A', restX: 128, restY: 138, kx: 155, ky: 215, defaultColor: '#f43f5e', zone: '1, Q, A, Z' },
    { id: 'LR', name: 'Ring', restKey: 'S', restX: 184, restY: 138, kx: 195, ky: 210, defaultColor: '#fb923c', zone: '2, W, S, X' },
    { id: 'LM', name: 'Middle', restKey: 'D', restX: 240, restY: 138, kx: 235, ky: 205, defaultColor: '#facc15', zone: '3, E, D, C' },
    { id: 'LI', name: 'Index', restKey: 'F', restX: 296, restY: 138, kx: 275, ky: 210, defaultColor: '#4ade80', zone: '4, 5, R, T, F, G, V, B' },
    { id: 'LT', name: 'Thumb', restKey: '␣', restX: 410, restY: 246, kx: 330, ky: 240, defaultColor: '#38bdf8', zone: 'Spacebar' },
  ];

  const rightFingersOverlay = [
    { id: 'RT', name: 'Thumb', restKey: '␣', restX: 510, restY: 246, kx: 450, ky: 240, defaultColor: '#38bdf8', zone: 'Spacebar' },
    { id: 'RI', name: 'Index', restKey: 'J', restX: 464, restY: 138, kx: 485, ky: 210, defaultColor: '#818cf8', zone: '6, 7, Y, U, H, J, N, M' },
    { id: 'RM', name: 'Middle', restKey: 'K', restX: 520, restY: 138, kx: 525, ky: 205, defaultColor: '#a855f7', zone: '8, I, K, ,' },
    { id: 'RR', name: 'Ring', restKey: 'L', restX: 576, restY: 138, kx: 565, ky: 210, defaultColor: '#ec4899', zone: '9, O, L, .' },
    { id: 'RP', name: 'Pinky', restKey: ';', restX: 632, restY: 138, kx: 605, ky: 215, defaultColor: '#14b8a6', zone: '0, P, ;, /, Enter, Shift' },
  ];

  // Opacity conversion
  const opacityFloat = handOpacity === '0' ? 0 : handOpacity === '20' ? 0.30 : handOpacity === '50' ? 0.60 : 0.90;

  // Active accent color: high-visibility electric cyan/blue
  const ACCENT_COLOR = '#06b6d4'; // Cyan 500

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto space-y-3">
      {/* TOOLBAR CONTROLS */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md">
        {/* Left: Layout & Mode Selector */}
        <div className="flex items-center gap-2">
          {language === 'hindi' && (
            <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => handleHindiLayoutToggle('inscript')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  hindiLayout === 'inscript'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                इनस्क्रिप्ट (InScript)
              </button>
              <button
                type="button"
                onClick={() => handleHindiLayoutToggle('remington')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                  hindiLayout === 'remington'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                रेमिंगटन गेल (Remington Gail)
              </button>
            </div>
          )}

          {/* Hand Guide Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-[11px] font-medium">
            <span className="text-slate-400 px-1 hidden sm:inline flex items-center gap-1">
              <Layers size={12} />
              Guide:
            </span>
            <button
              type="button"
              onClick={() => handleModeChange('overlay')}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                handDisplayMode === 'overlay'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Minimalist vector line-art hands overlaid directly on keyboard"
            >
              कीबोर्ड पर (On Keys)
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('console')}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                handDisplayMode === 'console'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Separate hand console under keyboard"
            >
              नीचे (Console)
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('both')}
              className={`px-2 py-0.5 rounded-lg transition cursor-pointer hidden md:inline ${
                handDisplayMode === 'both'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Show both overlay and console"
            >
              दोनों (Both)
            </button>
          </div>
        </div>

        {/* Right: Sound, Opacity, and Active Finger HUD */}
        <div className="flex items-center gap-2">
          {/* Cherry MX Audio Switch Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-[11px]">
            <Volume2 size={13} className={switchProfile === 'off' ? 'text-slate-500' : 'text-emerald-400'} />
            <span className="text-slate-400 mr-1 hidden sm:inline">Switch:</span>
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

          {/* Hand Opacity Selector */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-xl px-2 py-1 text-[11px]">
            <span className="text-slate-400 mr-1 hidden sm:inline">Hands:</span>
            {['100', '50', '20', '0'].map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => handleOpacityChange(op)}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                  handOpacity === op ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
                title={op === '0' ? 'Hide Hands' : `${op}% Opacity`}
              >
                {op === '0' ? 'Hide' : `${op}%`}
              </button>
            ))}
          </div>

          {/* Active Finger Cue */}
          {activeFinger ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
              <span
                className="w-2.5 h-2.5 rounded-full animate-bounce shadow-md"
                style={{ backgroundColor: ACCENT_COLOR }}
              />
              <span className="font-bold text-xs text-cyan-400">
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

      {/* KEYBOARD CHASSIS WITH INTEGRATED VECTOR LINE-ART HANDS OVERLAY */}
      <div className="relative flex flex-col gap-1.5 w-full min-w-[720px] max-w-[940px] px-2 py-3 bg-slate-950/95 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden select-none">
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
                    ${isTargetKey ? 'ring-4 ring-cyan-400 bg-cyan-950/80 border-cyan-300 shadow-xl shadow-cyan-500/40 -translate-y-1 z-10' : ''}
                    ${isTargetShift ? 'ring-4 ring-amber-400 bg-amber-950 border-amber-300 shadow-xl shadow-amber-500/40 -translate-y-1 z-10 animate-pulse' : ''}
                    ${!isTargetKey && !isTargetShift && !isPhysicallyPressed ? 'bg-slate-900/90 border-slate-800 text-slate-200' : ''}
                  `}
                  style={{
                    borderBottomWidth: '4px',
                    borderColor: isTargetKey
                      ? ACCENT_COLOR
                      : isTargetShift
                      ? '#fbbf24'
                      : isPhysicallyPressed
                      ? '#6366f1'
                      : `${fingerColor}60`,
                  }}
                >
                  {/* Finger zone indicator */}
                  {finger && !k.special && (
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full opacity-60"
                      style={{ backgroundColor: fingerColor }}
                    />
                  )}

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
                    <>
                      <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono-custom font-semibold text-slate-400 leading-none">
                        <span>{engShift}</span>
                        <span className="text-slate-500 text-[9px] uppercase">{engPrimary}</span>
                      </div>

                      <div className="flex items-baseline justify-between mt-auto">
                        {language === 'hindi' ? (
                          <>
                            <span
                              className={`text-base sm:text-lg font-bold font-hindi leading-none ${
                                isTargetKey ? 'text-cyan-200' : 'text-amber-300'
                              }`}
                            >
                              {targetShift ? hindiShift || hindiPrimary : hindiPrimary}
                            </span>
                            {hindiShift && (
                              <span className="text-[10px] font-hindi text-slate-400 opacity-80">
                                {hindiShift}
                              </span>
                            )}
                          </>
                        ) : (
                          <span
                            className={`text-sm sm:text-base font-bold font-mono-custom leading-none ${
                              isTargetKey ? 'text-cyan-200' : 'text-slate-100'
                            }`}
                          >
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

        {/* ====================================================================== */}
        {/* DYNAMIC MINIMALIST VECTOR LINE-ART HANDS OVERLAY                       */}
        {/* ====================================================================== */}
        {(handDisplayMode === 'overlay' || handDisplayMode === 'both') && handOpacity !== '0' && (
          <svg
            viewBox="0 0 940 280"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-30 transition-opacity duration-200"
            style={{ opacity: opacityFloat }}
          >
            {/* MINIMALIST LEFT PALM & WRIST FRAME CONTOUR */}
            <path
              d="M 120 230 C 130 268, 175 276, 230 276 C 285 276, 335 264, 345 230 C 310 215, 150 215, 120 230 Z"
              fill="rgba(15, 23, 42, 0.35)"
              stroke="rgba(148, 163, 184, 0.40)"
              strokeWidth="1.6"
              strokeDasharray="4 2"
            />

            {/* MINIMALIST RIGHT PALM & WRIST FRAME CONTOUR */}
            <path
              d="M 450 230 C 460 264, 510 276, 565 276 C 620 276, 665 268, 675 230 C 640 215, 480 215, 450 230 Z"
              fill="rgba(15, 23, 42, 0.35)"
              stroke="rgba(148, 163, 184, 0.40)"
              strokeWidth="1.6"
              strokeDasharray="4 2"
            />

            {/* LEFT HAND 5 FINGERS (Pinky, Ring, Middle, Index, Thumb) */}
            {leftFingersOverlay.map((f) => {
              const isDirectTarget = activeFingerId === f.id && targetKeyCoord;
              const isShiftTarget = needLeftShift && f.id === 'LP';
              const isSpaceTarget = isSpaceKey && f.id === 'LT'; // Thumb Space tap
              const isActive = isDirectTarget || isShiftTarget || isSpaceTarget;

              let curX = f.restX;
              let curY = f.restY;

              if (isDirectTarget) {
                curX = targetKeyCoord.x;
                curY = targetKeyCoord.y;
              } else if (isShiftTarget) {
                curX = 65; // Left Shift
                curY = 192;
              } else if (isSpaceTarget) {
                curX = f.restX;
                curY = f.restY + 8; // Animate thumb pressing down toward Spacebar
              }

              return (
                <g key={f.id} className="transition-all duration-150">
                  {/* Minimalist Vector Line-Art Finger Stem */}
                  <path
                    d={`M ${f.kx - 7} ${f.ky} Q ${(f.kx + curX) / 2 - 3} ${(f.ky + curY) / 2} ${curX - 6} ${
                      curY + 5
                    } A 7 7 0 0 1 ${curX + 6} ${curY + 5} Q ${(f.kx + curX) / 2 + 3} ${(f.ky + curY) / 2} ${
                      f.kx + 7
                    } ${f.ky} Z`}
                    fill={isActive ? 'rgba(6, 182, 212, 0.35)' : 'rgba(15, 23, 42, 0.35)'}
                    stroke={isActive ? ACCENT_COLOR : 'rgba(148, 163, 184, 0.45)'}
                    strokeWidth={isActive ? '2.5' : '1.4'}
                  />

                  {/* Knuckle Joint Marker */}
                  <circle
                    cx={f.kx}
                    cy={f.ky}
                    r="3"
                    fill={isActive ? ACCENT_COLOR : 'rgba(148, 163, 184, 0.5)'}
                  />

                  {/* Pulsing Ripple Halo when Active */}
                  {isActive && (
                    <circle
                      cx={curX}
                      cy={curY}
                      r="22"
                      fill="none"
                      stroke={ACCENT_COLOR}
                      strokeWidth="2.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Fingertip Target Pad */}
                  <circle
                    cx={curX}
                    cy={curY}
                    r={isActive ? 12 : 8.5}
                    fill={isActive ? ACCENT_COLOR : 'rgba(15, 23, 42, 0.85)'}
                    stroke={isActive ? '#ffffff' : 'rgba(148, 163, 184, 0.6)'}
                    strokeWidth={isActive ? 2.5 : 1.2}
                  />

                  {/* Fingertip Label */}
                  <text
                    x={curX}
                    y={curY + 3.5}
                    textAnchor="middle"
                    fontSize={isActive ? '9.5' : '8'}
                    fontWeight="bold"
                    fill={isActive ? '#0f172a' : '#94a3b8'}
                  >
                    {f.restKey}
                  </text>
                </g>
              );
            })}

            {/* RIGHT HAND 5 FINGERS (Thumb, Index, Middle, Ring, Pinky) */}
            {rightFingersOverlay.map((f) => {
              const isDirectTarget = activeFingerId === f.id && targetKeyCoord;
              const isShiftTarget = needRightShift && f.id === 'RP';
              const isSpaceTarget = isSpaceKey && f.id === 'RT'; // Right Thumb Space tap
              const isActive = isDirectTarget || isShiftTarget || isSpaceTarget;

              let curX = f.restX;
              let curY = f.restY;

              if (isDirectTarget) {
                curX = targetKeyCoord.x;
                curY = targetKeyCoord.y;
              } else if (isShiftTarget) {
                curX = 790; // Right Shift
                curY = 192;
              } else if (isSpaceTarget) {
                curX = f.restX;
                curY = f.restY + 8; // Animate thumb pressing down toward Spacebar
              }

              return (
                <g key={f.id} className="transition-all duration-150">
                  {/* Minimalist Vector Line-Art Finger Stem */}
                  <path
                    d={`M ${f.kx - 7} ${f.ky} Q ${(f.kx + curX) / 2 - 3} ${(f.ky + curY) / 2} ${curX - 6} ${
                      curY + 5
                    } A 7 7 0 0 1 ${curX + 6} ${curY + 5} Q ${(f.kx + curX) / 2 + 3} ${(f.ky + curY) / 2} ${
                      f.kx + 7
                    } ${f.ky} Z`}
                    fill={isActive ? 'rgba(6, 182, 212, 0.35)' : 'rgba(15, 23, 42, 0.35)'}
                    stroke={isActive ? ACCENT_COLOR : 'rgba(148, 163, 184, 0.45)'}
                    strokeWidth={isActive ? '2.5' : '1.4'}
                  />

                  {/* Knuckle Joint Marker */}
                  <circle
                    cx={f.kx}
                    cy={f.ky}
                    r="3"
                    fill={isActive ? ACCENT_COLOR : 'rgba(148, 163, 184, 0.5)'}
                  />

                  {/* Pulsing Ripple Halo when Active */}
                  {isActive && (
                    <circle
                      cx={curX}
                      cy={curY}
                      r="22"
                      fill="none"
                      stroke={ACCENT_COLOR}
                      strokeWidth="2.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Fingertip Target Pad */}
                  <circle
                    cx={curX}
                    cy={curY}
                    r={isActive ? 12 : 8.5}
                    fill={isActive ? ACCENT_COLOR : 'rgba(15, 23, 42, 0.85)'}
                    stroke={isActive ? '#ffffff' : 'rgba(148, 163, 184, 0.6)'}
                    strokeWidth={isActive ? 2.5 : 1.2}
                  />

                  {/* Fingertip Label */}
                  <text
                    x={curX}
                    y={curY + 3.5}
                    textAnchor="middle"
                    fontSize={isActive ? '9.5' : '8'}
                    fontWeight="bold"
                    fill={isActive ? '#0f172a' : '#94a3b8'}
                  >
                    {f.restKey}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>

      {/* ====================================================================== */}
      {/* SEPARATE HAND CONSOLE (UNDER KEYBOARD)                                  */}
      {/* ====================================================================== */}
      {(handDisplayMode === 'console' || handDisplayMode === 'both') && handOpacity !== '0' && (
        <div
          className="w-full max-w-[940px] pt-3 flex flex-col sm:flex-row items-center justify-around gap-6 bg-slate-950/70 rounded-2xl border border-slate-800/80 p-3 transition-opacity duration-200"
          style={{ opacity: opacityFloat }}
        >
          {/* Left Hand Console */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1 text-xs font-bold text-slate-300">
              <span>बायाँ हाथ (Left Hand)</span>
              <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded font-mono">
                A S D F
              </span>
            </div>

            <svg width="220" height="150" viewBox="0 0 160 150" className="overflow-visible drop-shadow-2xl">
              <path
                d="M 22 92 C 16 128, 40 148, 75 148 C 110 148, 128 128, 124 92 C 114 82, 28 82, 22 92 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2.5"
              />

              {[
                { id: 'LP', name: 'Pinky', restKey: 'A', x: 28, y: 56, w: 14, h: 54 },
                { id: 'LR', name: 'Ring', restKey: 'S', x: 49, y: 36, w: 15, h: 74 },
                { id: 'LM', name: 'Middle', restKey: 'D', x: 71, y: 22, w: 15, h: 88 },
                { id: 'LI', name: 'Index', restKey: 'F', x: 93, y: 34, w: 15, h: 76 },
                { id: 'LT', name: 'Thumb', restKey: 'Space', x: 116, y: 84, w: 17, h: 48, rotate: 26 },
              ].map((f) => {
                const isCurrent = activeFingerId === f.id;
                const isShift = needLeftShift && f.id === 'LP';
                const isSpace = isSpaceKey && f.id === 'LT';
                const isActive = isCurrent || isShift || isSpace;

                let dx = 0;
                let dy = 0;
                if (isCurrent && targetRowIdx >= 0) {
                  if (targetRowIdx === 0) dy = -50;
                  else if (targetRowIdx === 1) dy = -25;
                  else if (targetRowIdx === 2) dy = -4;
                  else if (targetRowIdx === 3) dy = 25;
                  else if (targetRowIdx === 4) dy = 14;
                } else if (isShift) {
                  dx = -24;
                  dy = 24;
                } else if (isSpace) {
                  dy = 8;
                }

                return (
                  <g
                    key={f.id}
                    style={{
                      transform: `translate(${dx}px, ${dy}px) ${f.rotate ? `rotate(${f.rotate}deg)` : ''}`,
                      transformOrigin: `${f.x + f.w / 2}px ${f.y + f.h}px`,
                      transition: 'transform 0.16s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
                    }}
                  >
                    {isActive && (
                      <circle
                        cx={f.x + f.w / 2}
                        cy={f.y + 8}
                        r="14"
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}
                    <rect
                      x={f.x}
                      y={f.y}
                      width={f.w}
                      height={f.h}
                      rx={f.w / 2}
                      fill={isActive ? ACCENT_COLOR : '#1e293b'}
                      stroke={isActive ? '#ffffff' : '#475569'}
                      strokeWidth={isActive ? '3' : '1.5'}
                      className="transition-colors duration-150"
                    />
                    <circle
                      cx={f.x + f.w / 2}
                      cy={f.y + 11}
                      r="5.5"
                      fill={isActive ? '#ffffff' : '#0f172a'}
                      stroke={isActive ? ACCENT_COLOR : '#64748b'}
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
                      {f.restKey === 'Space' ? '␣' : f.restKey}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Center Touch-Typing Pedagogy Advice */}
          <div className="hidden lg:flex flex-col items-center justify-center max-w-[210px] text-center px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="font-bold text-slate-200">Home Row Rule</span>
            <p className="leading-snug">
              उँगलियों को हमेशा <strong>ASDF</strong> और <strong>JKL;</strong> पर रखें। स्पेसबार अंगूठे से दबाएँ।
            </p>
            <div className="w-full border-t border-slate-800 pt-1 text-[10px] text-cyan-400 font-semibold">
              {language === 'hindi' ? 'बायाँ: स्वर • दायाँ: व्यंजन' : 'F & J have tactile home bumps'}
            </div>
          </div>

          {/* Right Hand Console */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1 text-xs font-bold text-slate-300">
              <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded font-mono">
                J K L ;
              </span>
              <span>दायाँ हाथ (Right Hand)</span>
            </div>

            <svg width="220" height="150" viewBox="0 0 160 150" className="overflow-visible drop-shadow-2xl">
              <path
                d="M 26 92 C 20 128, 42 148, 77 148 C 112 148, 130 128, 126 92 C 116 82, 32 82, 26 92 Z"
                fill="#1e293b"
                stroke="#334155"
                strokeWidth="2.5"
              />

              {[
                { id: 'RT', name: 'Thumb', restKey: 'Space', x: 26, y: 84, w: 17, h: 48, rotate: -26 },
                { id: 'RI', name: 'Index', restKey: 'J', x: 50, y: 34, w: 15, h: 76 },
                { id: 'RM', name: 'Middle', restKey: 'K', x: 72, y: 22, w: 15, h: 88 },
                { id: 'RR', name: 'Ring', restKey: 'L', x: 94, y: 36, w: 15, h: 74 },
                { id: 'RP', name: 'Pinky', restKey: ';', x: 116, y: 56, w: 14, h: 54 },
              ].map((f) => {
                const isCurrent = activeFingerId === f.id;
                const isShift = needRightShift && f.id === 'RP';
                const isSpace = isSpaceKey && f.id === 'RT';
                const isActive = isCurrent || isShift || isSpace;

                let dx = 0;
                let dy = 0;
                if (isCurrent && targetRowIdx >= 0) {
                  if (targetRowIdx === 0) dy = -50;
                  else if (targetRowIdx === 1) dy = -25;
                  else if (targetRowIdx === 2) dy = -4;
                  else if (targetRowIdx === 3) dy = 25;
                  else if (targetRowIdx === 4) dy = 14;
                } else if (isShift) {
                  dx = 24;
                  dy = 24;
                } else if (isSpace) {
                  dy = 8;
                }

                return (
                  <g
                    key={f.id}
                    style={{
                      transform: `translate(${dx}px, ${dy}px) ${f.rotate ? `rotate(${f.rotate}deg)` : ''}`,
                      transformOrigin: `${f.x + f.w / 2}px ${f.y + f.h}px`,
                      transition: 'transform 0.16s cubic-bezier(0.2, 0.9, 0.3, 1.2)',
                    }}
                  >
                    {isActive && (
                      <circle
                        cx={f.x + f.w / 2}
                        cy={f.y + 8}
                        r="14"
                        fill="none"
                        stroke={ACCENT_COLOR}
                        strokeWidth="2"
                        className="animate-ping"
                      />
                    )}
                    <rect
                      x={f.x}
                      y={f.y}
                      width={f.w}
                      height={f.h}
                      rx={f.w / 2}
                      fill={isActive ? ACCENT_COLOR : '#1e293b'}
                      stroke={isActive ? '#ffffff' : '#475569'}
                      strokeWidth={isActive ? '3' : '1.5'}
                      className="transition-colors duration-150"
                    />
                    <circle
                      cx={f.x + f.w / 2}
                      cy={f.y + 11}
                      r="5.5"
                      fill={isActive ? '#ffffff' : '#0f172a'}
                      stroke={isActive ? ACCENT_COLOR : '#64748b'}
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
                      {f.restKey === 'Space' ? '␣' : f.restKey}
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
