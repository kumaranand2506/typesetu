import React from 'react';
import { Hand, Sparkles, ArrowRight, CornerDownLeft, ShieldAlert } from 'lucide-react';
import { FINGER_INFO } from '../data/krutiDevMap';

/**
 * Humanized Finger Instruction Prompt
 * Embedded directly above the virtual keyboard to guide touch-typing posture,
 * keycap recognition, opposite-hand Shift pinky discipline, and Kruti Dev 010 rules.
 */
export default function FingerInstructionPrompt({
  targetKey = null,
  targetShift = false,
  targetGlyph = '',
  language = 'hindi',
}) {
  if (!targetKey && !targetGlyph) {
    return null;
  }

  const isHindi = language === 'hindi';
  const isSpace = targetKey === ' ' || targetKey === 'Space';

  // Find finger info
  let activeFingerId = null;
  if (isSpace) {
    activeFingerId = 'SPACE';
  } else {
    // Check against standard touch-typing physical key finger assignments
    const keyLower = targetKey ? targetKey.toLowerCase() : '';
    const leftPinkyKeys = ['`', '~', '1', '!', 'q', 'a', 'z'];
    const leftRingKeys = ['2', '@', 'w', 's', 'x'];
    const leftMiddleKeys = ['3', '#', 'e', 'd', 'c'];
    const leftIndexKeys = ['4', '$', '5', '%', 'r', 't', 'f', 'g', 'v', 'b'];

    const rightIndexKeys = ['6', '^', '7', '&', 'y', 'u', 'h', 'j', 'n', 'm'];
    const rightMiddleKeys = ['8', '*', 'i', 'k', ','];
    const rightRingKeys = ['9', '(', 'o', 'l', '.'];
    const rightPinkyKeys = ['0', ')', '-', '_', '=', '+', 'p', '[', '{', ']', '}', '\\', '|', ';', ':', "'", '"', '/', '?'];

    if (leftPinkyKeys.includes(keyLower)) activeFingerId = 'LP';
    else if (leftRingKeys.includes(keyLower)) activeFingerId = 'LR';
    else if (leftMiddleKeys.includes(keyLower)) activeFingerId = 'LM';
    else if (leftIndexKeys.includes(keyLower)) activeFingerId = 'LI';
    else if (rightIndexKeys.includes(keyLower)) activeFingerId = 'RI';
    else if (rightMiddleKeys.includes(keyLower)) activeFingerId = 'RM';
    else if (rightRingKeys.includes(keyLower)) activeFingerId = 'RR';
    else if (rightPinkyKeys.includes(keyLower)) activeFingerId = 'RP';
    else activeFingerId = 'RI';
  }

  const finger = FINGER_INFO[activeFingerId] || FINGER_INFO['RI'];

  // Opposite-hand Shift rule:
  // If striking with Left Hand -> Hold Right Shift with Right Pinky (RP)
  // If striking with Right Hand -> Hold Left Shift with Left Pinky (LP)
  const isLeftHandKey = ['LP', 'LR', 'LM', 'LI'].includes(activeFingerId);
  const shiftFinger = isLeftHandKey ? FINGER_INFO['RP'] : FINGER_INFO['LP'];
  const shiftHandText = isLeftHandKey ? 'Right Hand' : 'Left Hand';
  const shiftHandHindi = isLeftHandKey ? 'दायाँ हाथ' : 'बायाँ हाथ';
  const shiftKeyLabel = isLeftHandKey ? 'Right Shift' : 'Left Shift';

  // Color mapping (Pinky = Amber, Ring = Sky Blue, Middle = Emerald, Index = Purple, Thumb = Spacebar)
  const fingerColor = finger.color || '#a855f7';
  const shiftColor = '#f59e0b'; // Amber for Shift Pinky

  // Human-friendly key name
  const displayKey = isSpace ? 'Spacebar' : targetKey ? targetKey.toUpperCase() : '';
  const displayGlyph = targetGlyph || '';

  // Chhoti ee ('f' / 'ि') special tip
  const isChhotiEe = targetKey?.toLowerCase() === 'f' && isHindi;

  return (
    <div className="w-full max-w-5xl mx-auto mb-1.5 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md transition-all select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        
        {/* Left: Interactive Keycap Badge & Opposite-Hand Shift Combination */}
        <div className="flex items-center gap-2">
          {targetShift ? (
            <div className="flex items-center gap-1.5 bg-slate-950/90 border border-slate-800 px-2.5 py-1.5 rounded-xl shadow-inner">
              {/* Shift Keycap */}
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-xs shadow-[0_0_10px_rgba(245,158,11,0.3)] animate-pulse">
                <span>⇧</span>
                <span className="font-mono">{shiftKeyLabel}</span>
              </div>

              <span className="text-slate-500 font-black text-xs">+</span>

              {/* Target Character Keycap */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg border font-bold text-xs shadow-md transition-transform scale-105"
                style={{
                  backgroundColor: `${fingerColor}22`,
                  borderColor: fingerColor,
                  color: '#ffffff',
                  boxShadow: `0 0 12px ${fingerColor}40`,
                }}
              >
                <span className="font-mono text-white text-sm">{displayKey}</span>
                {isHindi && displayGlyph && (
                  <span className="text-amber-300 font-hindi text-base font-black">
                    ({displayGlyph})
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-xl border bg-slate-950/90 shadow-md"
              style={{
                borderColor: `${fingerColor}80`,
                boxShadow: `0 0 14px ${fingerColor}30`,
              }}
            >
              <span className="font-mono text-white text-sm sm:text-base font-black tracking-wide">
                {displayKey}
              </span>
              {isHindi && displayGlyph && (
                <span className="text-cyan-300 font-hindi text-lg sm:text-xl font-black">
                  ({displayGlyph})
                </span>
              )}
            </div>
          )}

          {/* Assigned Finger Badge with Glowing Stroke Indicator */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border"
            style={{
              backgroundColor: `${fingerColor}18`,
              borderColor: `${fingerColor}60`,
              color: fingerColor,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping"
              style={{ backgroundColor: fingerColor }}
            />
            <span className="font-hindi">
              {isHindi ? finger.hindiName : finger.name}
            </span>
            <span className="text-[10px] opacity-75 font-mono">
              ({finger.hand === 'left' ? 'Left' : finger.hand === 'right' ? 'Right' : 'Both'})
            </span>
          </div>
        </div>

        {/* Right: Humanized Instructional Guidance Text */}
        <div className="flex-1 text-left sm:text-right font-medium text-xs text-slate-300 font-hindi leading-snug">
          {targetShift ? (
            <div className="space-y-0.5">
              <p>
                <span className="text-amber-400 font-bold">
                  {shiftHandHindi} कनिष्ठिका (Pinky)
                </span>{' '}
                से <strong>Shift</strong> दबाकर रखें +{' '}
                <span style={{ color: fingerColor }} className="font-bold">
                  {finger.hindiName}
                </span>{' '}
                से <strong>'{displayKey}'</strong> ({displayGlyph}) दबाएँ।
              </p>
              <p className="text-[10px] text-slate-400 hidden md:block">
                Hold {shiftKeyLabel} with {shiftFinger.name} + Press '{displayKey}' with {finger.name}
              </p>
            </div>
          ) : isSpace ? (
            <div>
              <p>
                <span className="text-slate-300 font-bold">दायाँ या बायाँ अँगूठा (Thumb)</span> से{' '}
                <strong>स्पेसबार (Space)</strong> दबाएँ।
              </p>
              <p className="text-[10px] text-slate-400 hidden md:block">
                Press Spacebar rhythmically with thumb
              </p>
            </div>
          ) : isChhotiEe ? (
            <div className="text-amber-300">
              <p className="font-bold flex items-center justify-start sm:justify-end gap-1">
                <span>⚡ रेमिंगटन नियम:</span>
                <span>'ि' (F कुँजी) व्यंजन से <em>पहले</em> बायाँ तर्जनी (Left Index) से दबाएँ!</span>
              </p>
            </div>
          ) : (
            <div>
              <p>
                <span style={{ color: fingerColor }} className="font-bold">
                  {finger.hindiName} ({finger.name})
                </span>{' '}
                से <strong>'{displayKey}'</strong> {displayGlyph ? `(${displayGlyph})` : ''} दबाएँ।
              </p>
              <p className="text-[10px] text-slate-400 hidden md:block">
                Press '{displayKey}' {displayGlyph ? `(${displayGlyph})` : ''} with {finger.name}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
