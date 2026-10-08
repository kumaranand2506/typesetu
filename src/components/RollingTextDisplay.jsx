import React, { useMemo, useEffect, useRef } from 'react';
import { Zap, Target, AlertCircle, RotateCcw, ShieldAlert, Check } from 'lucide-react';

/**
 * Break target text into balanced lines of ~45-55 characters,
 * respecting word boundaries and explicit newlines.
 */
function chunkTextIntoRollingLines(rawText, maxLineLen = 50) {
  const text = (rawText || '').normalize('NFC');
  if (!text) return [{ text: '', startIndex: 0, endIndex: 0 }];

  const lines = [];
  let currentIndex = 0;

  // Split by explicit line breaks first if present
  const paragraphs = text.split('\n');

  paragraphs.forEach((para) => {
    if (!para.trim()) {
      if (para.length > 0) {
        lines.push({
          text: para,
          startIndex: currentIndex,
          endIndex: currentIndex + para.length,
        });
        currentIndex += para.length;
      }
      return;
    }

    const words = para.split(' ');
    let currentLine = '';
    let lineStart = currentIndex;

    words.forEach((word, wIdx) => {
      const isFirstWord = wIdx === 0;
      const testLine = isFirstWord ? word : `${currentLine} ${word}`;

      if (!isFirstWord && testLine.length > maxLineLen) {
        // Push completed line (including the space after it)
        const lineWithTrailingSpace = currentLine + ' ';
        lines.push({
          text: lineWithTrailingSpace,
          startIndex: lineStart,
          endIndex: lineStart + lineWithTrailingSpace.length,
        });
        lineStart += lineWithTrailingSpace.length;
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine.length > 0) {
      lines.push({
        text: currentLine,
        startIndex: lineStart,
        endIndex: lineStart + currentLine.length,
      });
      lineStart += currentLine.length;
    }

    currentIndex = lineStart;
  });

  return lines.length > 0 ? lines : [{ text, startIndex: 0, endIndex: text.length }];
}

export default function RollingTextDisplay({
  targetText = '',
  typedIndex = 0,
  history = [],
  strictError = false,
  errorMode = 'casual',
  onToggleErrorMode = null,
  hiddenInputRef = null,
  onKeyDown = null,
  onFocusTypingArea = null,
  fontSize = 'normal', // 'normal' | 'large'
  language = 'hindi',
  // Telemetry props for minimal top status pill
  wpm = null,
  grossWpm = null,
  accuracy = null,
  progressPercent = null,
  mistakes = null,
  onRestart = null,
}) {
  const containerRef = useRef(null);

  // Chunk text into rolling 2-line queue
  const lines = useMemo(() => {
    return chunkTextIntoRollingLines(targetText, 52);
  }, [targetText]);

  // Identify current active line index
  const activeLineIdx = useMemo(() => {
    for (let i = 0; i < lines.length; i++) {
      if (typedIndex >= lines[i].startIndex && typedIndex < lines[i].endIndex) {
        return i;
      }
    }
    return Math.max(0, lines.length - 1);
  }, [lines, typedIndex]);

  const activeLine = lines[activeLineIdx] || { text: '', startIndex: 0, endIndex: 0 };
  const nextLine = lines[activeLineIdx + 1] || null;

  // Perpetual keyboard focus handler
  const handleViewportClick = () => {
    if (hiddenInputRef && hiddenInputRef.current) {
      hiddenInputRef.current.focus({ preventScroll: true });
    }
    if (onFocusTypingArea) {
      onFocusTypingArea();
    }
  };

  // Auto-focus input on mount
  useEffect(() => {
    if (hiddenInputRef && hiddenInputRef.current) {
      hiddenInputRef.current.focus({ preventScroll: true });
    }
  }, [hiddenInputRef]);

  const isHindi = language === 'hindi';

  return (
    <div
      ref={containerRef}
      onClick={handleViewportClick}
      className="relative w-full bg-slate-950/95 dark:bg-slate-950/95 border-2 border-indigo-500/30 hover:border-indigo-500/50 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden cursor-text select-none group transition-all duration-200"
    >
      {/* Invisible auto-focus input for perpetual keyboard trapping */}
      {hiddenInputRef && (
        <input
          ref={hiddenInputRef}
          type="text"
          data-typing-input="true"
          onKeyDown={onKeyDown}
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="absolute -top-96 -left-96 opacity-0 w-1 h-1 pointer-events-none"
        />
      )}

      {/* MINIMAL TOP TELEMETRY STATUS PILL (Monkeytype / TypingClub style) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-4 border-b border-slate-800/80 text-xs">
        {/* Left: Essential live telemetry */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Live Net WPM */}
          <div className="flex items-center gap-1.5 font-bold">
            <Zap size={14} className="text-emerald-400" />
            <span className="text-white text-base font-black font-mono">
              {wpm !== null ? wpm : 0}
            </span>
            <span className="text-slate-400 text-[11px] uppercase font-semibold">WPM</span>
          </div>

          <span className="text-slate-700 font-bold">•</span>

          {/* Live Accuracy */}
          <div className="flex items-center gap-1.5 font-bold">
            <Target size={14} className="text-cyan-400" />
            <span className="text-white text-base font-black font-mono">
              {accuracy !== null ? accuracy : 100}%
            </span>
            <span className="text-slate-400 text-[11px] uppercase font-semibold">ACC</span>
          </div>

          <span className="text-slate-700 font-bold hidden sm:inline">•</span>

          {/* Progress / Timer */}
          <div className="items-center gap-1.5 font-mono text-slate-300 hidden sm:flex">
            <span className="text-indigo-400 font-bold text-[11px]">
              {progressPercent !== null ? progressPercent : 0}%
            </span>
            <span className="text-slate-500 text-[11px]">done</span>
          </div>

          {/* Mistakes count (if any) */}
          {mistakes > 0 && (
            <div className="flex items-center gap-1 text-rose-400 text-[11px] font-bold">
              <AlertCircle size={13} />
              <span>{mistakes}</span>
            </div>
          )}
        </div>

        {/* Right: Mode Toggle (Casual / Strict) & Restart */}
        <div className="flex items-center gap-2">
          {/* Line index badge */}
          <span className="text-slate-500 font-mono text-[11px] hidden md:inline">
            Line {activeLineIdx + 1}/{lines.length}
          </span>

          {/* Strict / Casual Mode toggle pill */}
          {onToggleErrorMode && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleErrorMode(errorMode === 'strict' ? 'casual' : 'strict');
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                errorMode === 'strict'
                  ? 'bg-rose-950/80 border-rose-700/60 text-rose-300 hover:bg-rose-900/60 shadow-sm'
                  : 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60 shadow-sm'
              }`}
              title="Click to toggle between Casual and Strict error mode"
            >
              {errorMode === 'strict' ? (
                <>
                  <ShieldAlert size={12} className="text-rose-400" />
                  <span>Strict</span>
                </>
              ) : (
                <>
                  <Check size={12} className="text-emerald-400" />
                  <span>Casual</span>
                </>
              )}
            </button>
          )}

          {/* Quick Restart Button */}
          {onRestart && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRestart();
              }}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
              title="पुनः प्रारंभ करें (Restart / Reset)"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* TWO-LINE ROLLING CAROUSEL TEXT VIEWPORT */}
      <div className="flex flex-col gap-3 min-h-[130px] justify-center">
        {/* LINE 1: ACTIVE CURRENT LINE WITH LIVE CHARACTER HIGHLIGHTING & CARET */}
        <div
          key={`line-${activeLineIdx}`}
          className={`
            font-mono-custom tracking-wider leading-relaxed transition-all duration-200 transform
            ${fontSize === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}
            ${isHindi ? 'font-hindi font-medium' : 'font-mono-custom font-semibold'}
          `}
        >
          {Array.from((activeLine.text || '').normalize('NFC')).map((char, charOffset) => {
            const globalCharIndex = activeLine.startIndex + charOffset;
            const isCurrent = globalCharIndex === typedIndex;
            const isTyped = globalCharIndex < typedIndex;

            let charClass = 'text-slate-400 dark:text-slate-300';

            if (isTyped) {
              const hist = history[globalCharIndex];
              if (hist?.status === 'correct') {
                charClass = 'text-emerald-400 font-semibold';
              } else {
                charClass =
                  'text-rose-400 bg-rose-500/20 underline decoration-rose-500 decoration-2 font-bold rounded';
              }
            } else if (isCurrent) {
              if (strictError) {
                // Strict mode error halt: highlighted in red
                charClass =
                  'bg-rose-600/40 text-white ring-2 ring-rose-400 shadow-lg shadow-rose-500/50 rounded px-1 animate-bounce font-bold';
              } else {
                // Smooth active caret bounding cursor
                charClass =
                  'bg-indigo-600/40 text-white ring-2 ring-indigo-400 shadow-lg shadow-indigo-500/50 rounded px-1 animate-pulse font-bold';
              }
            }

            return (
              <span key={charOffset} className={`inline-block transition-colors duration-75 ${charClass}`}>
                {char === ' ' ? (
                  isCurrent ? (
                    <span className="text-indigo-300 font-sans opacity-90 px-0.5">␣</span>
                  ) : (
                    '\u00A0'
                  )
                ) : (
                  char
                )}
              </span>
            );
          })}
        </div>

        {/* LINE 2: UPCOMING PREVIEW LINE (CLEAN TYPOGRAPHY, NO CLUTTER) */}
        <div
          key={`preview-${activeLineIdx + 1}`}
          className={`
            font-mono-custom tracking-wider leading-relaxed opacity-50 select-none transition-all duration-200 text-slate-500 dark:text-slate-500
            ${fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}
            ${isHindi ? 'font-hindi font-normal' : 'font-mono-custom font-normal'}
          `}
        >
          {nextLine ? (
            <div className="truncate">
              {nextLine.text}
            </div>
          ) : (
            <div className="text-xs text-indigo-400/80 font-semibold pt-1">
              🎉 अंतिम चरण (Final line of practice)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
