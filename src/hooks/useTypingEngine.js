import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  INSCRIPT_NORMAL,
  INSCRIPT_SHIFT,
  REMINGTON_NORMAL,
  REMINGTON_SHIFT,
  findKeyForChar,
} from '../data/inscriptMap';
import { soundManager } from '../utils/soundEffects';

export function useTypingEngine({
  targetText = '',
  language = 'hindi',
  inputMode = 'mapper', // 'mapper' | 'native'
  hindiLayout = 'inscript', // 'inscript' | 'remington'
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
  const [currentWpm, setCurrentWpm] = useState(0);
  const [currentAccuracy, setCurrentAccuracy] = useState(100);

  const timerRef = useRef(null);

  // Normalize target text with Unicode NFC
  const normalizedTarget = useMemo(() => (targetText || '').normalize('NFC'), [targetText]);

  // Reset state when targetText or language changes
  useEffect(() => {
    setTypedIndex(0);
    setHistory([]);
    setMistakes(0);
    setTotalKeystrokes(0);
    setStartTime(null);
    setEndTime(null);
    setIsCompleted(false);
    setCurrentWpm(0);
    setCurrentAccuracy(100);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [normalizedTarget, language]);

  // Periodic WPM calculation
  useEffect(() => {
    if (startTime && !endTime && !isCompleted) {
      timerRef.current = setInterval(() => {
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        if (elapsedMinutes > 0) {
          const words = typedIndex / 5;
          const wpm = Math.round(words / elapsedMinutes);
          setCurrentWpm(wpm);
        }
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, endTime, isCompleted, typedIndex]);

  const targetChar = normalizedTarget[typedIndex] || '';

  // Calculate upcoming 4 characters and their keys for sequence guidance
  const upcomingSequence = [];
  if (normalizedTarget && !isCompleted) {
    for (let i = typedIndex; i < Math.min(normalizedTarget.length, typedIndex + 4); i++) {
      const ch = normalizedTarget[i];
      const info = findKeyForChar(ch, language, hindiLayout);
      upcomingSequence.push({
        char: ch,
        key: info.key,
        shift: info.shift,
        finger: info.finger,
      });
    }
  }

  const targetKeyInfo = targetChar ? findKeyForChar(targetChar, language, hindiLayout) : null;

  const handleKeyDown = useCallback(
    (e) => {
      if (isCompleted || !normalizedTarget) return;

      // Ignore lone modifier keys
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
        return;
      }

      setLastPressedPhysicalKey({ key: e.key, code: e.code });
      setTimeout(() => setLastPressedPhysicalKey(null), 140);

      // Backspace handling
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (typedIndex > 0) {
          setTypedIndex((prev) => prev - 1);
          setHistory((prev) => prev.slice(0, -1));
        }
        return;
      }

      // Start timer on first keystroke
      if (!startTime) {
        setStartTime(Date.now());
      }

      setTotalKeystrokes((prev) => prev + 1);

      let producedChar = e.key;

      if (language === 'hindi' && inputMode === 'mapper') {
        e.preventDefault();
        if (hindiLayout === 'remington') {
          if (e.shiftKey) {
            producedChar = REMINGTON_SHIFT[e.key] || REMINGTON_SHIFT[e.code] || e.key;
          } else {
            producedChar = REMINGTON_NORMAL[e.key] || REMINGTON_NORMAL[e.code] || e.key;
          }
        } else {
          if (e.shiftKey) {
            producedChar = INSCRIPT_SHIFT[e.key] || INSCRIPT_SHIFT[e.code] || e.key;
          } else {
            producedChar = INSCRIPT_NORMAL[e.key] || INSCRIPT_NORMAL[e.code] || e.key;
          }
        }
      }

      const expectedChar = normalizedTarget[typedIndex];
      const normExpected = (expectedChar || '').normalize('NFC');
      const normProduced = (producedChar || '').normalize('NFC');

      // Smart InScript & Typographical tolerance (danda, curly quotes, dashes)
      const isDandaMatch =
        (normExpected === '।' || normExpected === '|') &&
        (normProduced === '।' || normProduced === '>' || (e.shiftKey && e.key === '.') || normProduced === '|');
      const isQuoteMatch =
        (normExpected === '“' || normExpected === '”') &&
        (normProduced === '"' || normProduced === '“' || normProduced === '”');
      const isSingleQuoteMatch =
        (normExpected === '‘' || normExpected === '’') &&
        (normProduced === "'" || normProduced === '‘' || normProduced === '’');
      const isDashMatch =
        (normExpected === '—' || normExpected === '–') &&
        (normProduced === '-' || normProduced === '—' || normProduced === '–');

      const isCorrect =
        normProduced === normExpected || isDandaMatch || isQuoteMatch || isSingleQuoteMatch || isDashMatch;

      if (isCorrect) {
        soundManager.playClick();
      } else {
        soundManager.playError();
        setMistakes((prev) => prev + 1);
      }

      const newHistoryItem = {
        char: expectedChar,
        typedChar: producedChar,
        status: isCorrect ? 'correct' : 'error',
      };

      const newHistory = [...history, newHistoryItem];
      setHistory(newHistory);

      const nextIndex = typedIndex + 1;
      setTypedIndex(nextIndex);

      const totalKeys = totalKeystrokes + 1;
      const totalErrors = isCorrect ? mistakes : mistakes + 1;
      const acc = Math.max(0, Math.round(((totalKeys - totalErrors) / totalKeys) * 100));
      setCurrentAccuracy(acc);

      if (nextIndex >= normalizedTarget.length) {
        const now = Date.now();
        setEndTime(now);
        setIsCompleted(true);
        soundManager.playSuccess();

        const durationMinutes = Math.max(0.05, (now - (startTime || now)) / 60000);
        const finalWpm = Math.round((normalizedTarget.length / 5) / durationMinutes);
        const finalCpm = Math.round(normalizedTarget.length / durationMinutes);

        if (onComplete) {
          onComplete({
            wpm: finalWpm,
            cpm: finalCpm,
            accuracy: acc,
            mistakes: totalErrors,
            timeSeconds: Math.round((now - (startTime || now)) / 1000),
            charactersTyped: normalizedTarget.length,
          });
        }
      }
    },
    [
      isCompleted,
      normalizedTarget,
      typedIndex,
      history,
      mistakes,
      totalKeystrokes,
      startTime,
      language,
      inputMode,
      hindiLayout,
      onComplete,
    ]
  );

  return {
    typedIndex,
    history,
    mistakes,
    totalKeystrokes,
    isCompleted,
    currentWpm,
    currentAccuracy,
    targetChar,
    targetKeyInfo,
    upcomingSequence,
    lastPressedPhysicalKey,
    handleKeyDown,
    progressPercent: normalizedTarget.length > 0 ? Math.min(100, Math.round((typedIndex / normalizedTarget.length) * 100)) : 0,
  };
}
