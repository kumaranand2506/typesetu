import React, { useMemo, useEffect, useRef } from 'react';
import { ShieldAlert, Zap, ArrowRight, CornerDownLeft } from 'lucide-react';

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
  upcomingSequence = [],
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

  // Ensure perpetual focus whenever user clicks the typing viewport
  const handleViewportClick = (e) => {
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
      className="relative w-full bg-slate-950/95 dark:bg-slate-950/95 border-2 border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden cursor-text select-none group transition-all duration-200 hover:border-indigo-500/50"
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

      {/* Top Status & Mode Ribbon */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 font-mono text-[11px] font-semibold">
            Line {activeLineIdx + 1} / {lines.length}
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="text-[11px] text-slate-400">
            {Math.min(100, Math.round((typedIndex / (targetText.length || 1)) * 100))}% Complete
          </span>
        </div>

        {/* Dual Error Handling Mode Badge / Toggle */}
        <div className="flex items-center gap-2">
          {onToggleErrorMode && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleErrorMode(errorMode === 'strict' ? 'casual' : 'strict');
              }}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                errorMode === 'strict'
                  ? 'bg-rose-950/80 border-rose-700/60 text-rose-300 hover:bg-rose-900/60 shadow-sm shadow-rose-900/40'
                  : 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60 shadow-sm shadow-emerald-900/40'
              }`}
              title="Click to switch between Strict and Casual mode"
            >
              {errorMode === 'strict' ? (
                <>
                  <ShieldAlert size={13} className="text-rose-400" />
                  <span>Strict Mode (कठोर)</span>
                </>
              ) : (
                <>
                  <Zap size={13} className="text-emerald-400" />
                  <span>Casual Mode (सहज)</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* TWO-LINE ROLLING CAROUSEL TEXT ENGINE */}
      <div className="flex flex-col gap-4 min-h-[140px] justify-center">
        {/* LINE 1: ACTIVE CURRENT LINE */}
        <div
          key={`line-${activeLineIdx}`}
          className={`
            font-mono-custom tracking-wider leading-relaxed transition-all duration-300 transform
            ${fontSize === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}
            ${isHindi ? 'font-hindi font-medium' : 'font-mono-custom font-semibold'}
          `}
        >
          {Array.from((activeLine.text || '').normalize('NFC')).map((char, charOffset) => {
            const globalCharIndex = activeLine.startIndex + charOffset;
            const isCurrent = globalCharIndex === typedIndex;
            const isTyped = globalCharIndex < typedIndex;

            let charClass = 'text-slate-300 dark:text-slate-200';

            if (isTyped) {
              const hist = history[globalCharIndex];
              if (hist?.status === 'correct') {
                charClass = 'text-emerald-400 dark:text-emerald-400 font-semibold';
              } else {
                charClass =
                  'text-rose-400 bg-rose-500/20 underline decoration-rose-500 decoration-2 font-bold rounded';
              }
            } else if (isCurrent) {
              if (strictError) {
                // Strict mode error halt
                charClass =
                  'bg-rose-600/40 text-white ring-2 ring-rose-400 shadow-lg shadow-rose-500/50 rounded px-1 animate-bounce font-bold';
              } else {
                // Active bounding box cursor
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

        {/* LINE 2: UPCOMING PREVIEW LINE */}
        <div
          key={`preview-${activeLineIdx + 1}`}
          className={`
            font-mono-custom tracking-wider leading-relaxed opacity-45 select-none transition-all duration-300 text-slate-500 dark:text-slate-500
            ${fontSize === 'large' ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}
            ${isHindi ? 'font-hindi font-normal' : 'font-mono-custom font-normal'}
          `}
        >
          {nextLine ? (
            <div className="flex items-center gap-2">
              <span className="text-slate-600 text-xs shrink-0 flex items-center gap-1 font-mono">
                <ArrowRight size={13} className="text-slate-600" />
                Next:
              </span>
              <span>{nextLine.text}</span>
            </div>
          ) : (
            <div className="text-xs text-indigo-400/70 font-semibold flex items-center gap-1.5 pt-1">
              <span>🎉 अंतिम चरण! (Final line of practice)</span>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM KEYSTROKE SEQUENCE DECOMPOSITION (HINDI) */}
      {isHindi && upcomingSequence.length > 0 && (
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium text-[11px]">कुंजी संकेत (Key Sequence):</span>
            <div className="flex items-center gap-1.5 font-mono-custom">
              {upcomingSequence.slice(0, 4).map((item, sIdx) => (
                <div
                  key={sIdx}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs ${
                    sIdx === 0
                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold ring-1 ring-indigo-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="font-hindi text-sm">{item.char === ' ' ? '␣' : item.char}</span>
                  <span className="text-[10px] text-slate-500">➔</span>
                  <span className="font-bold text-amber-300 uppercase">
                    {item.shift ? `Shift+${item.key}` : item.key === ' ' ? 'Space' : item.key}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <CornerDownLeft size={12} />
            <span>Enter / Space line roll</span>
          </div>
        </div>
      )}
    </div>
  );
}
