import React, { useState } from 'react';
import { KEYBOARD_ROWS, FINGER_INFO } from '../data/inscriptMap';
import { soundManager } from '../utils/soundEffects';
import { Volume2, Settings, X, ShieldCheck, Sliders, Eye } from 'lucide-react';

// Exact Key Coordinates within 940 x 270 SVG coordinate space
const KEY_COORD_MAP = {
  // Row 0: Y = 28
  'Backquote': { x: 42, y: 28 }, '`': { x: 42, y: 28 }, '~': { x: 42, y: 28 },
  'Digit1': { x: 98, y: 28 }, '1': { x: 98, y: 28 }, '!': { x: 98, y: 28 },
  'Digit2': { x: 154, y: 28 }, '2': { x: 154, y: 28 }, '@': { x: 154, y: 28 },
  'Digit3': { x: 210, y: 28 }, '3': { x: 210, y: 28 }, '#': { x: 210, y: 28 },
  'Digit4': { x: 266, y: 28 }, '4': { x: 266, y: 28 }, '$': { x: 266, y: 28 },
  'Digit5': { x: 322, y: 28 }, '5': { x: 322, y: 28 }, '%': { x: 322, y: 28 },
  'Digit6': { x: 378, y: 28 }, '6': { x: 378, y: 28 }, '^': { x: 378, y: 28 },
  'Digit7': { x: 434, y: 28 }, '7': { x: 434, y: 28 }, '&': { x: 434, y: 28 },
  'Digit8': { x: 490, y: 28 }, '8': { x: 490, y: 28 }, '*': { x: 490, y: 28 },
  'Digit9': { x: 546, y: 28 }, '9': { x: 546, y: 28 }, '(': { x: 546, y: 28 },
  'Digit0': { x: 602, y: 28 }, '0': { x: 602, y: 28 }, ')': { x: 602, y: 28 },
  'Minus': { x: 658, y: 28 }, '-': { x: 658, y: 28 }, '_': { x: 658, y: 28 },
  'Equal': { x: 714, y: 28 }, '=': { x: 714, y: 28 }, '+': { x: 714, y: 28 },
  'Backspace': { x: 820, y: 28 },

  // Row 1: Y = 78
  'Tab': { x: 50, y: 78 },
  'KeyQ': { x: 115, y: 78 }, 'q': { x: 115, y: 78 },
  'KeyW': { x: 171, y: 78 }, 'w': { x: 171, y: 78 },
  'KeyE': { x: 227, y: 78 }, 'e': { x: 227, y: 78 },
  'KeyR': { x: 283, y: 78 }, 'r': { x: 283, y: 78 },
  'KeyT': { x: 339, y: 78 }, 't': { x: 339, y: 78 },
  'KeyY': { x: 395, y: 78 }, 'y': { x: 395, y: 78 },
  'KeyU': { x: 451, y: 78 }, 'u': { x: 451, y: 78 },
  'KeyI': { x: 507, y: 78 }, 'i': { x: 507, y: 78 },
  'KeyO': { x: 563, y: 78 }, 'o': { x: 563, y: 78 },
  'KeyP': { x: 619, y: 78 }, 'p': { x: 619, y: 78 },
  'BracketLeft': { x: 675, y: 78 }, '[': { x: 675, y: 78 }, '{': { x: 675, y: 78 },
  'BracketRight': { x: 731, y: 78 }, ']': { x: 731, y: 78 }, '}': { x: 731, y: 78 },
  'Backslash': { x: 810, y: 78 }, '\\': { x: 810, y: 78 }, '|': { x: 810, y: 78 },

  // Row 2: Y = 128 (Home Row)
  'CapsLock': { x: 56, y: 128 },
  'KeyA': { x: 128, y: 128 }, 'a': { x: 128, y: 128 },
  'KeyS': { x: 184, y: 128 }, 's': { x: 184, y: 128 },
  'KeyD': { x: 240, y: 128 }, 'd': { x: 240, y: 128 },
  'KeyF': { x: 296, y: 128 }, 'f': { x: 296, y: 128 },
  'KeyG': { x: 352, y: 128 }, 'g': { x: 352, y: 128 },
  'KeyH': { x: 408, y: 128 }, 'h': { x: 408, y: 128 },
  'KeyJ': { x: 464, y: 128 }, 'j': { x: 464, y: 128 },
  'KeyK': { x: 520, y: 128 }, 'k': { x: 520, y: 128 },
  'KeyL': { x: 576, y: 128 }, 'l': { x: 576, y: 128 },
  'Semicolon': { x: 632, y: 128 }, ';': { x: 632, y: 128 }, ':': { x: 632, y: 128 },
  'Quote': { x: 688, y: 128 }, "'": { x: 688, y: 128 }, '"': { x: 688, y: 128 },
  'Enter': { x: 800, y: 128 },

  // Row 3: Y = 178
  'ShiftLeft': { x: 65, y: 178 },
  'KeyZ': { x: 145, y: 178 }, 'z': { x: 145, y: 178 },
  'KeyX': { x: 201, y: 178 }, 'x': { x: 201, y: 178 },
  'KeyC': { x: 257, y: 178 }, 'c': { x: 257, y: 178 },
  'KeyV': { x: 313, y: 178 }, 'v': { x: 313, y: 178 },
  'KeyB': { x: 369, y: 178 }, 'b': { x: 369, y: 178 },
  'KeyN': { x: 425, y: 178 }, 'n': { x: 425, y: 178 },
  'KeyM': { x: 481, y: 178 }, 'm': { x: 481, y: 178 },
  'Comma': { x: 537, y: 178 }, ',': { x: 537, y: 178 }, '<': { x: 537, y: 178 },
  'Period': { x: 593, y: 178 }, '.': { x: 593, y: 178 }, '>': { x: 593, y: 178 },
  'Slash': { x: 649, y: 178 }, '/': { x: 649, y: 178 }, '?': { x: 649, y: 178 },
  'ShiftRight': { x: 790, y: 178 },

  // Row 4: Y = 228 (Spacebar)
  'Space': { x: 470, y: 228 }, ' ': { x: 470, y: 228 },
};

/**
 * Helper to build an organic tapered finger silhouette path
 * from knuckle (kx, ky) to fingertip (tx, ty) with rounded fingertip dome.
 */
function createOrganicFingerPath(kx, ky, tx, ty, baseWidth = 14, tipWidth = 10) {
  const dx = tx - kx;
  const dy = ty - ky;
  const angle = Math.atan2(dy, dx);
  const perp = angle + Math.PI / 2;

  const cosP = Math.cos(perp);
  const sinP = Math.sin(perp);

  const halfBase = baseWidth / 2;
  const halfTip = tipWidth / 2;

  // Base knuckle points
  const bx1 = kx - halfBase * cosP;
  const by1 = ky - halfBase * sinP;
  const bx2 = kx + halfBase * cosP;
  const by2 = ky + halfBase * sinP;

  // Tip points before rounded dome
  const tx1 = tx - halfTip * cosP;
  const ty1 = ty - halfTip * sinP;
  const tx2 = tx + halfTip * cosP;
  const ty2 = ty + halfTip * sinP;

  // Dome tip point extending slightly beyond target
  const domeDist = halfTip * 0.9;
  const domeX = tx + domeDist * Math.cos(angle);
  const domeY = ty + domeDist * Math.sin(angle);

  // Smooth Bézier curves for organic human flesh
  const midX1 = (bx1 + tx1) / 2 + (halfBase - halfTip) * 0.2 * cosP;
  const midY1 = (by1 + ty1) / 2 + (halfBase - halfTip) * 0.2 * sinP;
  const midX2 = (bx2 + tx2) / 2 - (halfBase - halfTip) * 0.2 * cosP;
  const midY2 = (by2 + ty2) / 2 - (halfBase - halfTip) * 0.2 * sinP;

  return `M ${bx1.toFixed(1)} ${by1.toFixed(1)} Q ${midX1.toFixed(1)} ${midY1.toFixed(1)} ${tx1.toFixed(1)} ${ty1.toFixed(1)} Q ${domeX.toFixed(1)} ${domeY.toFixed(1)} ${tx2.toFixed(1)} ${ty2.toFixed(1)} Q ${midX2.toFixed(1)} ${midY2.toFixed(1)} ${bx2.toFixed(1)} ${by2.toFixed(1)} Z`;
}

export default function IntegratedKeyboardHands({
  targetKey = null,
  targetShift = false,
  language = 'hindi',
  pressedKey = null,
}) {
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
      return Number(localStorage.getItem('typesetu_hands_opacity')) || 80;
    } catch (e) {
      return 80;
    }
  });

  const [switchProfile, setSwitchProfile] = useState(() => soundManager.getSwitchProfile());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  // 10 Organic Human Fingers Configuration resting over Home Row (ASDF & JKL; + Space)
  const leftFingers = [
    { id: 'LP', name: 'Pinky', restX: 128, restY: 128, kx: 150, ky: 200, baseW: 13, tipW: 10 },
    { id: 'LR', name: 'Ring', restX: 184, restY: 128, kx: 192, ky: 195, baseW: 14, tipW: 11 },
    { id: 'LM', name: 'Middle', restX: 240, restY: 128, kx: 236, ky: 190, baseW: 15, tipW: 11.5 },
    { id: 'LI', name: 'Index', restX: 296, restY: 128, kx: 278, ky: 195, baseW: 14.5, tipW: 11 },
    { id: 'LT', name: 'Thumb', restX: 410, restY: 228, kx: 320, ky: 225, baseW: 16, tipW: 12.5 },
  ];

  const rightFingers = [
    { id: 'RT', name: 'Thumb', restX: 530, restY: 228, kx: 620, ky: 225, baseW: 16, tipW: 12.5 },
    { id: 'RI', name: 'Index', restX: 464, restY: 128, kx: 482, ky: 195, baseW: 14.5, tipW: 11 },
    { id: 'RM', name: 'Middle', restX: 520, restY: 128, kx: 524, ky: 190, baseW: 15, tipW: 11.5 },
    { id: 'RR', name: 'Ring', restX: 576, restY: 128, kx: 568, ky: 195, baseW: 14, tipW: 11 },
    { id: 'RP', name: 'Pinky', restX: 632, restY: 128, kx: 610, ky: 200, baseW: 13, tipW: 10 },
  ];

  const ACCENT_COLOR = '#06b6d4'; // Cyan neon
  const SHIFT_COLOR = '#fbbf24';  // Amber neon

  const currentOpacity = handMode === 'hidden' ? 0 : handOpacity / 100;
  const isHindi = language === 'hindi';

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto mt-1 sm:mt-1.5 space-y-1.5 select-none">
      {/* STREAMLINED COMPACT HEADER: LAYOUT INDICATOR + SETTINGS MODAL TRIGGER */}
      <div className="w-full flex items-center justify-between px-3 py-1 bg-slate-900/70 border border-slate-800/80 rounded-xl backdrop-blur-sm text-xs">
        {/* Left: Official Layout Indicator (Strictly Separated) */}
        <div className="flex items-center gap-1.5">
          {isHindi ? (
            <div className="flex items-center gap-1.5 text-slate-300">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="font-bold text-white text-[11px] font-hindi">
                BIS IS 16350 मानक इनस्क्रिप्ट (Mangal)
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="font-bold text-white text-[11px]">
                Standard QWERTY Layout
              </span>
            </div>
          )}
        </div>

        {/* Right: Quick Hands Toggle + Floating Settings Button (No Active Finger Tag) */}
        <div className="flex items-center gap-1.5">
          {/* Quick Hands Toggle */}
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[10px]">
            <button
              type="button"
              onClick={() => handleModeChange('visible')}
              className={`px-2 py-0.5 rounded transition font-medium cursor-pointer ${
                handMode === 'visible' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hands
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('outline')}
              className={`px-2 py-0.5 rounded transition font-medium cursor-pointer ${
                handMode === 'outline' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Outline
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('hidden')}
              className={`px-2 py-0.5 rounded transition font-medium cursor-pointer ${
                handMode === 'hidden' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Off
            </button>
          </div>

          {/* Floating Settings Button (⚙️) */}
          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="p-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            title="Keyboard & Hand Guide Settings"
          >
            <Settings size={13} />
          </button>
        </div>
      </div>

      {/* FLOATING KEYBOARD SETTINGS MODAL (⚙️) */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Settings size={15} className="text-indigo-400" />
                <span>Keyboard & Hand Settings</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Hands Mode */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-300 block">
                Realistic Hand Overlay:
              </span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: 'visible', label: 'Visible' },
                  { id: 'outline', label: 'Outline' },
                  { id: 'hidden', label: 'Hidden' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleModeChange(m.id)}
                    className={`py-1.5 rounded-xl border text-center transition cursor-pointer font-medium ${
                      handMode === m.id
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity Slider */}
            {handMode !== 'hidden' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span className="font-semibold">Hand Silhouette Opacity:</span>
                  <span className="font-mono text-indigo-400 font-bold">{handOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={handOpacity}
                  onChange={(e) => handleOpacityChange(e.target.value)}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-950 rounded-lg"
                />
              </div>
            )}

            {/* Mechanical Switch Audio Profile */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-300 block">
                Mechanical Key Sound:
              </span>
              <div className="grid grid-cols-4 gap-1 text-[11px]">
                {['blue', 'brown', 'red', 'off'].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handleSwitchChange(p)}
                    className={`py-1 rounded-lg border text-center transition cursor-pointer font-bold uppercase ${
                      switchProfile === p
                        ? p === 'blue'
                          ? 'bg-blue-600 text-white border-blue-500'
                          : p === 'brown'
                          ? 'bg-amber-700 text-white border-amber-600'
                          : p === 'red'
                          ? 'bg-rose-600 text-white border-rose-500'
                          : 'bg-slate-700 text-slate-200 border-slate-600'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {p === 'off' ? 'Mute' : p}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPACT VIRTUAL KEYBOARD WITH STRICT LANGUAGE SEPARATION */}
      <div className="relative flex flex-col gap-1 w-full min-w-[700px] max-w-[920px] px-2 py-2 bg-slate-950/95 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden select-none">
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-1 justify-center">
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

              const widthClass = k.width || 'w-10 sm:w-13';

              const engPrimary = k.key || '';
              const engShift = k.shiftKey || '';

              const hindiPrimary = k.inscript || '';
              const hindiShift = k.inscriptShift || '';

              const fingerColor = finger ? finger.color : '#334155';

              return (
                <div
                  key={k.code}
                  className={`
                    relative h-11 sm:h-12 ${widthClass} rounded-lg flex flex-col justify-between p-1
                    border transition-all duration-75 select-none cursor-default
                    ${isPhysicallyPressed ? 'scale-95 bg-indigo-600 border-indigo-400 text-white shadow-inner' : ''}
                    ${isTargetKey ? 'ring-2 ring-cyan-400 bg-cyan-950/90 border-cyan-300 shadow-lg shadow-cyan-500/40 -translate-y-0.5 z-10' : ''}
                    ${isTargetShift ? 'ring-2 ring-amber-400 bg-amber-950 border-amber-300 shadow-lg shadow-amber-500/40 -translate-y-0.5 z-10 animate-pulse' : ''}
                    ${!isTargetKey && !isTargetShift && !isPhysicallyPressed ? 'bg-slate-900/90 border-slate-800 text-slate-200' : ''}
                  `}
                  style={{
                    borderBottomWidth: '3px',
                    borderColor: isTargetKey
                      ? ACCENT_COLOR
                      : isTargetShift
                      ? SHIFT_COLOR
                      : isPhysicallyPressed
                      ? '#6366f1'
                      : `${fingerColor}45`,
                  }}
                >
                  {/* Subtle finger color accent line on bottom edge */}
                  {finger && !k.special && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full opacity-40"
                      style={{ backgroundColor: fingerColor }}
                    />
                  )}

                  {/* Special keys: Space, Shift, Enter, Backspace */}
                  {k.special ? (
                    <div className="flex items-center justify-center h-full">
                      <span
                        className={`text-[10px] sm:text-[11px] font-semibold ${
                          isTargetShift ? 'text-amber-300 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {isHindi
                          ? k.code === 'Space'
                            ? 'स्पेसबार'
                            : k.code.includes('Shift')
                            ? 'शिफ्ट'
                            : k.code === 'Enter'
                            ? 'एंटर'
                            : k.code === 'Backspace'
                            ? 'बैकस्पेस'
                            : k.label
                          : k.label}
                      </span>
                    </div>
                  ) : (
                    /* DUAL KEYCAP WITH STRICT LANGUAGE SEPARATION */
                    <div className="relative flex flex-col justify-between h-full w-full">
                      {isHindi ? (
                        /* HINDI INSCRIPT MODE: PROMINENT DEVANAGARI + MUTED QWERTY CORNER */
                        <>
                          {/* Shifted Devanagari character in top-left */}
                          <div className="flex items-center justify-start text-[9.5px] sm:text-[10.5px] font-hindi leading-none">
                            <span className={targetShift && isTargetKey ? 'text-amber-300 font-bold' : 'text-slate-400/70'}>
                              {hindiShift}
                            </span>
                          </div>

                          {/* Primary Devanagari Glyph Centered */}
                          <div className="flex items-center justify-center -mt-1 sm:-mt-1.5">
                            <span
                              className={`text-base sm:text-lg font-bold font-hindi leading-none transition-transform ${
                                isTargetKey ? 'text-cyan-200 scale-110 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'text-amber-300'
                              }`}
                            >
                              {targetShift ? (hindiShift || hindiPrimary) : hindiPrimary}
                            </span>
                          </div>

                          {/* Small Muted QWERTY Subscript in Bottom-Right */}
                          <div className="flex items-center justify-end text-[8.5px] font-mono-custom text-slate-500/70 uppercase leading-none">
                            <span>{engPrimary}</span>
                          </div>
                        </>
                      ) : (
                        /* ENGLISH MODE: PURE QWERTY KEYCAPS (NO HINDI OVERLAYS) */
                        <>
                          <div className="flex items-center justify-between text-[9.5px] font-mono-custom text-slate-500 leading-none">
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

                          <div className="h-1.5" />
                        </>
                      )}

                      {/* Tactile Home Row Bumps (F & J) */}
                      {k.homeBump && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-slate-400 rounded-full opacity-80" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* ====================================================================== */}
        {/* REALISTIC HUMAN HAND & FINGER SILHOUETTE OVERLAYS (ORGANIC & SOFT)     */}
        {/* ====================================================================== */}
        {handMode !== 'hidden' && (
          <svg
            viewBox="0 0 940 270"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-30 transition-opacity duration-200"
            style={{ opacity: currentOpacity }}
          >
            <defs>
              {/* Soft Human Hand Translucent Gradients */}
              <linearGradient id="leftPalmGrad" x1="0" y1="1" x2="0.3" y2="0">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.80" />
                <stop offset="60%" stopColor="#1e293b" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.30" />
              </linearGradient>

              <linearGradient id="rightPalmGrad" x1="0" y1="1" x2="-0.3" y2="0">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.80" />
                <stop offset="60%" stopColor="#1e293b" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#334155" stopOpacity="0.30" />
              </linearGradient>

              <linearGradient id="activeFingerGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#0891b2" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.35" />
              </linearGradient>

              <linearGradient id="shiftFingerGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#d97706" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.35" />
              </linearGradient>
            </defs>

            {/* ORGANIC LEFT PALM & WRIST SILHOUETTE */}
            <path
              d="M 145 268 C 130 248, 132 215, 142 200 C 170 196, 255 190, 290 196 C 315 215, 335 235, 325 245 C 290 268, 220 272, 145 268 Z"
              fill={handMode === 'visible' ? 'url(#leftPalmGrad)' : 'none'}
              stroke={handMode === 'visible' ? 'rgba(226, 232, 240, 0.45)' : 'rgba(56, 189, 248, 0.65)'}
              strokeWidth="1.6"
              strokeDasharray={handMode === 'outline' ? '4 2' : 'none'}
            />

            {/* ORGANIC RIGHT PALM & WRIST SILHOUETTE */}
            <path
              d="M 595 268 C 610 248, 608 215, 598 200 C 570 196, 485 190, 450 196 C 425 215, 405 235, 415 245 C 450 268, 520 272, 595 268 Z"
              fill={handMode === 'visible' ? 'url(#rightPalmGrad)' : 'none'}
              stroke={handMode === 'visible' ? 'rgba(226, 232, 240, 0.45)' : 'rgba(56, 189, 248, 0.65)'}
              strokeWidth="1.6"
              strokeDasharray={handMode === 'outline' ? '4 2' : 'none'}
            />

            {/* 5 ORGANIC LEFT FINGERS (Pinky, Ring, Middle, Index, Thumb) */}
            {leftFingers.map((f) => {
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
                curX = 65; // Left Shift
                curY = 178;
              } else if (isSpaceTarget) {
                curX = f.restX;
                curY = f.restY + 6;
              }

              const fingerPath = createOrganicFingerPath(f.kx, f.ky, curX, curY, f.baseW, f.tipW);

              const strokeCol = isShiftTarget
                ? SHIFT_COLOR
                : isActive
                ? ACCENT_COLOR
                : handMode === 'visible'
                ? 'rgba(226, 232, 240, 0.50)'
                : 'rgba(148, 163, 184, 0.65)';

              const fillCol = isShiftTarget
                ? 'url(#shiftFingerGrad)'
                : isActive
                ? 'url(#activeFingerGrad)'
                : handMode === 'visible'
                ? 'rgba(30, 41, 59, 0.45)'
                : 'none';

              return (
                <g key={f.id} className="transition-all duration-150">
                  {/* Organic Human Finger Contour */}
                  <path
                    d={fingerPath}
                    fill={fillCol}
                    stroke={strokeCol}
                    strokeWidth={isActive ? '2.5' : '1.4'}
                  />

                  {/* Pulsing Ripple Halo when Active */}
                  {isActive && (
                    <circle
                      cx={curX}
                      cy={curY}
                      r="18"
                      fill="none"
                      stroke={strokeCol}
                      strokeWidth="2"
                      className="animate-ping"
                    />
                  )}

                  {/* Rounded Soft Fingertip Pad */}
                  <circle
                    cx={curX}
                    cy={curY}
                    r={isActive ? 10 : 7.5}
                    fill={isActive ? strokeCol : 'rgba(15, 23, 42, 0.75)'}
                    stroke={isActive ? '#ffffff' : 'rgba(226, 232, 240, 0.70)'}
                    strokeWidth={isActive ? 2 : 1}
                  />

                  {/* Soft subtle indicator icon on active fingertip */}
                  {isActive && (
                    <text
                      x={curX}
                      y={curY + 3}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="bold"
                      fill="#0f172a"
                    >
                      {isShiftTarget ? '⇧' : '•'}
                    </text>
                  )}
                </g>
              );
            })}

            {/* 5 ORGANIC RIGHT FINGERS (Thumb, Index, Middle, Ring, Pinky) */}
            {rightFingers.map((f) => {
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
                curX = 790; // Right Shift
                curY = 178;
              } else if (isSpaceTarget) {
                curX = f.restX;
                curY = f.restY + 6;
              }

              const fingerPath = createOrganicFingerPath(f.kx, f.ky, curX, curY, f.baseW, f.tipW);

              const strokeCol = isShiftTarget
                ? SHIFT_COLOR
                : isActive
                ? ACCENT_COLOR
                : handMode === 'visible'
                ? 'rgba(226, 232, 240, 0.50)'
                : 'rgba(148, 163, 184, 0.65)';

              const fillCol = isShiftTarget
                ? 'url(#shiftFingerGrad)'
                : isActive
                ? 'url(#activeFingerGrad)'
                : handMode === 'visible'
                ? 'rgba(30, 41, 59, 0.45)'
                : 'none';

              return (
                <g key={f.id} className="transition-all duration-150">
                  {/* Organic Human Finger Contour */}
                  <path
                    d={fingerPath}
                    fill={fillCol}
                    stroke={strokeCol}
                    strokeWidth={isActive ? '2.5' : '1.4'}
                  />

                  {/* Pulsing Ripple Halo when Active */}
                  {isActive && (
                    <circle
                      cx={curX}
                      cy={curY}
                      r="18"
                      fill="none"
                      stroke={strokeCol}
                      strokeWidth="2"
                      className="animate-ping"
                    />
                  )}

                  {/* Rounded Soft Fingertip Pad */}
                  <circle
                    cx={curX}
                    cy={curY}
                    r={isActive ? 10 : 7.5}
                    fill={isActive ? strokeCol : 'rgba(15, 23, 42, 0.75)'}
                    stroke={isActive ? '#ffffff' : 'rgba(226, 232, 240, 0.70)'}
                    strokeWidth={isActive ? 2 : 1}
                  />

                  {/* Soft subtle indicator icon on active fingertip */}
                  {isActive && (
                    <text
                      x={curX}
                      y={curY + 3}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="bold"
                      fill="#0f172a"
                    >
                      {isShiftTarget ? '⇧' : '•'}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
