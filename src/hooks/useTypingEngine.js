import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  KRUTI_DEV_NORMAL,
  KRUTI_DEV_SHIFT,
  tokenizeDevanagariToKrutiDev,
  findKeyForChar,
} from '../data/krutiDevMap';
import { soundManager } from '../utils/soundEffects';

export function useTypingEngine({
  targetText = '',
  language = 'hindi',
  inputMode = 'mapper', // 'mapper' | 'native'
  initialErrorMode = null, // 'strict' | 'casual'
  backspaceRule = 'allowed', // 'allowed' | 'currentWord' | 'disabled'
  timeLimitSeconds = null, // e.g., 300, 600, 900 for 5, 10, 15 min exams
  onComplete = null,
}) {
  const [typedIndex, setTypedIndex] = useState(0);
  const [history, setHistory] = useState([]); // [{ char, status: 'correct'|'error', typedChar }]
  const [mistakes, setMistakes] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [lastPressedPhysicalKey, setLastPressedPhysicalKey] = useState(null);
  const [currentWpm, setCurrentWpm] = useState(0); // Net WPM
  const [currentGrossWpm, setCurrentGrossWpm] = useState(0); // Gross WPM
  const [currentAccuracy, setCurrentAccuracy] = useState(100);
  const [strictError, setStrictError] = useState(false); // When true in strict mode, cursor is halted
  const [remainingSeconds, setRemainingSeconds] = useState(timeLimitSeconds || null);

  const [errorMode, setErrorModeState] = useState(() => {
    if (initialErrorMode) return initialErrorMode;
    try {
      return localStorage.getItem('typesetu_error_mode') || 'casual';
    } catch (e) {
      return 'casual';
    }
  });

  const hiddenInputRef = useRef(null);
  const timerRef = useRef(null);

  // Normalize target text with Unicode NFC, strip zero-width chars and NBSP
  const normalizedTarget = useMemo(() => {
    return (targetText || '')
      .normalize('NFC')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\u00A0/g, ' ');
  }, [targetText]);

  // Tokenize target into exact sequential keystroke units:
  // For Hindi: Tokenized into Kruti Dev 010 Remington typing sequence (e.g. 'f' before consonant for 'ि')
  // For English: Tokenized character-by-character
  const tokens = useMemo(() => {
    if (!normalizedTarget) return [];
    if (language === 'hindi') {
      return tokenizeDevanagariToKrutiDev(normalizedTarget);
    } else {
      return Array.from(normalizedTarget).map((ch) => {
        const info = findKeyForChar(ch, 'english');
        return {
          key: info.key,
          shift: info.shift,
          glyph: ch,
          finger: info.finger,
          raw: ch,
        };
      });
    }
  }, [normalizedTarget, language]);

  const totalTokens = tokens.length;

  const setErrorMode = useCallback((mode) => {
    setErrorModeState(mode);
    try {
      localStorage.setItem('typesetu_error_mode', mode);
    } catch (e) {}
  }, []);

  // Reset state when target, language, or timeLimit changes
  useEffect(() => {
    setTypedIndex(0);
    setHistory([]);
    setMistakes(0);
    setTotalKeystrokes(0);
    setStartTime(null);
    setEndTime(null);
    setIsCompleted(false);
    setCurrentWpm(0);
    setCurrentGrossWpm(0);
    setCurrentAccuracy(100);
    setStrictError(false);
    setRemainingSeconds(timeLimitSeconds || null);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [normalizedTarget, language, timeLimitSeconds]);

  // Finish typing test / exam helper
  const finalizeTest = useCallback((isTimeUp = false) => {
    const now = Date.now();
    setEndTime(now);
    setIsCompleted(true);
    if (timerRef.current) clearInterval(timerRef.current);

    soundManager.playSuccess();

    const actualDurationMinutes = Math.max(0.05, (now - (startTime || now)) / 60000);
    const durationMinutes = timeLimitSeconds ? (timeLimitSeconds / 60) : actualDurationMinutes;

    const finalGrossWpm = Math.round((totalKeystrokes / 5) / durationMinutes);
    // Standard Govt Exam Net WPM: (Gross Words - Errors) / Minutes
    const finalNetWpm = Math.max(
      0,
      Math.round(((totalKeystrokes / 5) - mistakes) / durationMinutes)
    );
    const acc = totalKeystrokes > 0
      ? Math.max(0, Math.round(((totalKeystrokes - mistakes) / totalKeystrokes) * 100))
      : 100;

    const finalCpm = Math.round(finalNetWpm * 5);

    if (onComplete) {
      onComplete({
        wpm: finalNetWpm,
        grossWpm: finalGrossWpm,
        netWpm: finalNetWpm,
        cpm: finalCpm,
        accuracy: acc,
        mistakes,
        totalKeystrokes,
        timeSeconds: Math.round((now - (startTime || now)) / 1000),
        charactersTyped: typedIndex,
        isTimeUp,
      });
    }
  }, [startTime, totalKeystrokes, mistakes, timeLimitSeconds, typedIndex, onComplete]);

  // Periodic high-precision metrics calculation (Net WPM, Gross WPM, Accuracy, Countdown)
  useEffect(() => {
    if (startTime && !endTime && !isCompleted) {
      timerRef.current = setInterval(() => {
        const elapsedSeconds = (Date.now() - startTime) / 1000;
        const elapsedMinutes = elapsedSeconds / 60;

        // Countdown timer for Exam Mode
        if (timeLimitSeconds) {
          const rem = Math.max(0, Math.round(timeLimitSeconds - elapsedSeconds));
          setRemainingSeconds(rem);
          if (rem <= 0) {
            finalizeTest(true);
            return;
          }
        }

        if (elapsedMinutes > 0) {
          const gross = Math.round((totalKeystrokes / 5) / elapsedMinutes);
          const net = Math.max(
            0,
            Math.round(((typedIndex / 5) - (errorMode === 'casual' ? mistakes / 5 : 0)) / elapsedMinutes)
          );
          setCurrentGrossWpm(gross);
          setCurrentWpm(net);

          const acc =
            totalKeystrokes > 0
              ? Math.max(0, Math.round(((totalKeystrokes - mistakes) / totalKeystrokes) * 100))
              : 100;
          setCurrentAccuracy(acc);
        }
      }, 250);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, endTime, isCompleted, typedIndex, totalKeystrokes, mistakes, errorMode, timeLimitSeconds, finalizeTest]);

  const targetToken = tokens[typedIndex] || null;
  const targetChar = targetToken ? targetToken.glyph : (normalizedTarget[typedIndex] || '');

  // Calculate upcoming 4 tokens for sequence breakdown
  const upcomingSequence = [];
  if (tokens && !isCompleted) {
    for (let i = typedIndex; i < Math.min(tokens.length, typedIndex + 4); i++) {
      const tok = tokens[i];
      upcomingSequence.push({
        char: tok.glyph,
        key: tok.key,
        shift: tok.shift,
        finger: tok.finger,
      });
    }
  }

  const targetKeyInfo = targetToken
    ? {
        key: targetToken.key,
        shift: targetToken.shift,
        finger: targetToken.finger,
        glyph: targetToken.glyph,
      }
    : null;

  // Perpetual focus helper
  const focusInput = useCallback(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus({ preventScroll: true });
    }
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (isCompleted || totalTokens === 0 || typedIndex >= totalTokens) return;

      // 1. Prevent default browser scrolling on Space and Arrow keys
      if (
        e.code === 'Space' ||
        e.key === ' ' ||
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End'].includes(e.key)
      ) {
        e.preventDefault();
      }

      // 2. Prevent default browser focus loss on Tab key
      if (e.key === 'Tab') {
        e.preventDefault();
      }

      // Ignore lone modifier keys
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock'].includes(e.key)) {
        return;
      }

      // Start timer on first active keystroke
      if (!startTime) {
        setStartTime(Date.now());
      }

      setLastPressedPhysicalKey({ key: e.key, code: e.code });
      setTimeout(() => setLastPressedPhysicalKey(null), 140);

      // Backspace handling with Exam Rules (Allowed, Current Word Only, Disabled)
      if (e.key === 'Backspace') {
        e.preventDefault();

        // 1. Strict Backspace Disabled (Court Exam rule)
        if (backspaceRule === 'disabled') {
          soundManager.playError();
          return;
        }

        // 2. Current Word Only (CPCT / SSC rule: cannot backspace past previous word)
        if (backspaceRule === 'currentWord') {
          // Find index of previous space token
          let prevSpaceTokenIdx = -1;
          for (let ti = typedIndex - 1; ti >= 0; ti--) {
            if (tokens[ti]?.key === ' ' || tokens[ti]?.glyph === ' ') {
              prevSpaceTokenIdx = ti;
              break;
            }
          }
          if (typedIndex <= prevSpaceTokenIdx + 1) {
            soundManager.playError();
            return;
          }
        }

        // 3. Clear halted strict error on current char if present
        if (errorMode === 'strict' && strictError) {
          setStrictError(false);
          return;
        }

        if (typedIndex > 0) {
          setStrictError(false);
          setTypedIndex((prev) => prev - 1);
          setHistory((prev) => prev.slice(0, -1));
        }
        return;
      }

      setTotalKeystrokes((prev) => prev + 1);

      const currentExpectedToken = tokens[typedIndex];
      if (!currentExpectedToken) return;

      let producedChar = e.key;

      // Hindi Typing powered strictly by Kruti Dev 010 Remington Typewriter
      if (language === 'hindi' && inputMode === 'mapper') {
        e.preventDefault();
        if (e.shiftKey) {
          producedChar = KRUTI_DEV_SHIFT[e.key] || KRUTI_DEV_SHIFT[e.code] || e.key;
        } else {
          producedChar = KRUTI_DEV_NORMAL[e.key] || KRUTI_DEV_NORMAL[e.code] || e.key;
        }
      }

      const expectedGlyph = currentExpectedToken.glyph;
      const expectedKey = currentExpectedToken.key;
      const expectedShift = currentExpectedToken.shift;

      const normExpectedGlyph = (expectedGlyph || '').normalize('NFC');
      const normProduced = (producedChar || '').normalize('NFC');

      // Direct Glyph or Physical Key Match
      const isGlyphMatch = normProduced === normExpectedGlyph;
      const isKeyMatch =
        e.key.toLowerCase() === expectedKey.toLowerCase() &&
        Boolean(e.shiftKey) === Boolean(expectedShift);

      // Space Match
      const isSpaceMatch =
        (e.code === 'Space' || e.key === ' ') &&
        (expectedKey === ' ' || expectedGlyph === ' ');

      // Purna Viram (।) tolerance: in Kruti Dev, Shift+A is ।
      const isDandaMatch =
        (normExpectedGlyph === '।' || normExpectedGlyph === '|') &&
        (normProduced === '।' || (e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === '.')) || normProduced === '|');

      // Typographical quotes & dashes tolerance
      const isQuoteMatch =
        (normExpectedGlyph === '“' || normExpectedGlyph === '”' || normExpectedGlyph === '"') &&
        (normProduced === '"' || normProduced === '“' || normProduced === '”');
      const isSingleQuoteMatch =
        (normExpectedGlyph === '‘' || normExpectedGlyph === '’' || normExpectedGlyph === "'") &&
        (normProduced === "'" || normProduced === '‘' || normProduced === '’');
      const isDashMatch =
        (normExpectedGlyph === '—' || normExpectedGlyph === '–' || normExpectedGlyph === '-') &&
        (normProduced === '-' || normProduced === '—' || normProduced === '–');

      const isCorrect =
        isGlyphMatch || isKeyMatch || isSpaceMatch || isDandaMatch || isQuoteMatch || isSingleQuoteMatch || isDashMatch;

      if (isCorrect) {
        soundManager.playClick();
        setStrictError(false);

        const newHistoryItem = {
          char: expectedGlyph,
          typedChar: producedChar,
          status: 'correct',
        };
        const newHistory = [...history, newHistoryItem];
        setHistory(newHistory);

        const nextIndex = typedIndex + 1;
        setTypedIndex(nextIndex);

        const totalKeys = totalKeystrokes + 1;
        const totalErrors = mistakes;
        const acc = Math.max(0, Math.round(((totalKeys - totalErrors) / totalKeys) * 100));
        setCurrentAccuracy(acc);

        if (nextIndex >= totalTokens) {
          finalizeTest(false);
        }
      } else {
        // Keystroke Error
        soundManager.playError();
        const updatedMistakes = mistakes + 1;
        setMistakes(updatedMistakes);

        const totalKeys = totalKeystrokes + 1;
        const acc = Math.max(0, Math.round(((totalKeys - updatedMistakes) / totalKeys) * 100));
        setCurrentAccuracy(acc);

        if (errorMode === 'strict') {
          // Strict Mode: Halts cursor, letter turns red, user must strike correct key
          setStrictError(true);
        } else {
          // Casual Mode: Marks letter red and advances cursor
          setStrictError(false);
          const newHistoryItem = {
            char: expectedGlyph,
            typedChar: producedChar,
            status: 'error',
          };
          const newHistory = [...history, newHistoryItem];
          setHistory(newHistory);

          const nextIndex = typedIndex + 1;
          setTypedIndex(nextIndex);

          if (nextIndex >= totalTokens) {
            finalizeTest(false);
          }
        }
      }
    },
    [
      isCompleted,
      totalTokens,
      tokens,
      typedIndex,
      history,
      mistakes,
      totalKeystrokes,
      startTime,
      language,
      inputMode,
      errorMode,
      strictError,
      backspaceRule,
      finalizeTest,
    ]
  );

  return {
    tokens,
    typedIndex,
    history,
    mistakes,
    totalKeystrokes,
    isCompleted,
    currentWpm, // Net WPM
    currentGrossWpm, // Gross WPM
    currentAccuracy,
    cpm: Math.round(currentWpm * 5),
    targetChar,
    targetKeyInfo,
    upcomingSequence,
    lastPressedPhysicalKey,
    handleKeyDown,
    hiddenInputRef,
    focusInput,
    errorMode,
    setErrorMode,
    strictError,
    remainingSeconds,
    submitExam: () => finalizeTest(false),
    progressPercent:
      totalTokens > 0 ? Math.min(100, Math.round((typedIndex / totalTokens) * 100)) : 0,
  };
}
