import { useState, useEffect, useRef, useCallback } from 'react';
import { INSCRIPT_NORMAL, INSCRIPT_SHIFT, findKeyForChar } from '../data/inscriptMap';
import { soundManager } from '../utils/soundEffects';

export function useTypingEngine({
  targetText = '',
  language = 'hindi',
  inputMode = 'mapper', // 'mapper' | 'native'
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

  // Timer reference for periodic WPM updates
  const timerRef = useRef(null);

  // Reset state when targetText changes
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
  }, [targetText, language]);

  // Periodic WPM calculator
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

  const targetChar = targetText[typedIndex] || '';

  // Determine which physical key should be pressed next
  const targetKeyInfo = targetChar ? findKeyForChar(targetChar, language) : null;

  const handleKeyDown = useCallback(
    (e) => {
      if (isCompleted || !targetText) return;

      // Ignore modifier keys alone
      if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
        return;
      }

      // Visual physical key feedback
      setLastPressedPhysicalKey({ key: e.key, code: e.code });
      setTimeout(() => setLastPressedPhysicalKey(null), 140);

      // Handle Backspace
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

      // Determine what character was typed based on mode
      let producedChar = e.key;

      if (language === 'hindi' && inputMode === 'mapper') {
        e.preventDefault(); // Prevent standard English character in mapper mode
        if (e.shiftKey) {
          producedChar = INSCRIPT_SHIFT[e.key] || INSCRIPT_SHIFT[e.code] || e.key;
        } else {
          producedChar = INSCRIPT_NORMAL[e.key] || INSCRIPT_NORMAL[e.code] || e.key;
        }
      }

      const expectedChar = targetText[typedIndex];
      const isCorrect = producedChar === expectedChar;

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

      // Calculate accuracy
      const totalKeys = totalKeystrokes + 1;
      const totalErrors = isCorrect ? mistakes : mistakes + 1;
      const acc = Math.max(0, Math.round(((totalKeys - totalErrors) / totalKeys) * 100));
      setCurrentAccuracy(acc);

      // Check if finished
      if (nextIndex >= targetText.length) {
        const now = Date.now();
        setEndTime(now);
        setIsCompleted(true);
        soundManager.playSuccess();

        const durationMinutes = Math.max(0.05, (now - (startTime || now)) / 60000);
        const finalWpm = Math.round((targetText.length / 5) / durationMinutes);
        const finalCpm = Math.round(targetText.length / durationMinutes);

        if (onComplete) {
          onComplete({
            wpm: finalWpm,
            cpm: finalCpm,
            accuracy: acc,
            mistakes: totalErrors,
            timeSeconds: Math.round((now - (startTime || now)) / 1000),
            charactersTyped: targetText.length,
          });
        }
      }
    },
    [
      isCompleted,
      targetText,
      typedIndex,
      history,
      mistakes,
      totalKeystrokes,
      startTime,
      language,
      inputMode,
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
    lastPressedPhysicalKey,
    handleKeyDown,
    progressPercent: targetText.length > 0 ? Math.min(100, Math.round((typedIndex / targetText.length) * 100)) : 0,
  };
}
