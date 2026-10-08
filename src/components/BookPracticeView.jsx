import React, { useState, useEffect, useRef } from 'react';
import { BOOKS_CATALOG, getBooks, getBookById } from '../data/booksCatalog';
import { chunkTextIntoParagraphs, saveBookProgress, getBookProgress, getLastReadBookId, getChapterParagraphs } from '../utils/bookStorage';
import { useTypingEngine } from '../hooks/useTypingEngine';
import IntegratedKeyboardHands from './IntegratedKeyboardHands';
import RollingTextDisplay from './RollingTextDisplay';
import AdBanner from './AdBanner';
import { checkNewBadges } from '../data/badgeSystem';
import { BookOpen, Search, ArrowLeft, ArrowRight, RotateCcw, Bookmark, CheckCircle, ChevronLeft, ChevronRight, Eye, EyeOff, Sparkles, Filter, Type, Layers } from 'lucide-react';

export default function BookPracticeView({
  language,
  userStats,
  onUpdateStats,
  onUnlockBadge,
  onOpenAdSettings,
  onToggleFocusMode = null,
  isFocusMode = false,
}) {
  const [selectedBookId, setSelectedBookId] = useState(() => {
    return getLastReadBookId() || 'en-pride-and-prejudice';
  });

  const [activeView, setActiveView] = useState('reader'); // 'catalog' | 'reader'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLang, setFilterLang] = useState(language || 'all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [chapterIdx, setChapterIdx] = useState(0);
  const [paragraphIdx, setParagraphIdx] = useState(0);
  const [showKeyboardGuide, setShowKeyboardGuide] = useState(true);
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'large'
  const [fontFamily, setFontFamily] = useState('serif'); // 'serif' | 'sans'
  const [inputMode, setInputMode] = useState('mapper');
  const [hindiLayout, setHindiLayout] = useState('inscript'); // 'inscript' | 'remington'
  const [textLayoutMode, setTextLayoutMode] = useState('rolling'); // 'rolling' | 'book'

  const typingContainerRef = useRef(null);

  const currentBook = getBookById(selectedBookId);
  const savedProgress = getBookProgress(selectedBookId);

  // Lazy-load chapter paragraphs dynamically from IndexedDB
  const [paragraphs, setParagraphs] = useState(() => chunkTextIntoParagraphs(currentBook.initialSampleText || '', 55));

  useEffect(() => {
    let isMounted = true;
    getChapterParagraphs(currentBook, chapterIdx).then((chunks) => {
      if (isMounted && chunks && chunks.length > 0) {
        setParagraphs(chunks);
      }
    });
    return () => { isMounted = false; };
  }, [selectedBookId, chapterIdx]);

  const currentParagraphText = paragraphs[paragraphIdx] || paragraphs[0] || '';

  // Resume bookmark on book change
  useEffect(() => {
    const prog = getBookProgress(selectedBookId);
    if (prog) {
      setChapterIdx(prog.chapterIndex || 0);
      setParagraphIdx(prog.paragraphIndex || 0);
    }
  }, [selectedBookId]);

  // Focus typing container when reader is active
  useEffect(() => {
    if (activeView === 'reader' && typingContainerRef.current) {
      typingContainerRef.current.focus();
    }
  }, [activeView, paragraphIdx, chapterIdx, selectedBookId]);

  const handleParagraphComplete = (stats) => {
    const nextPara = paragraphIdx + 1;
    const isChapterDone = nextPara >= paragraphs.length;

    saveBookProgress(selectedBookId, {
      chapterIndex: isChapterDone ? chapterIdx + 1 : chapterIdx,
      paragraphIndex: isChapterDone ? 0 : nextPara,
      wordsTyped: (savedProgress.wordsTyped || 0) + Math.round(currentParagraphText.length / 5),
      highestWpm: Math.max(savedProgress.highestWpm || 0, stats.wpm),
    });

    const updatedStats = {
      ...userStats,
      completedPractice: {
        ...userStats.completedPractice,
        [selectedBookId]: {
          wpm: Math.max(userStats.completedPractice?.[selectedBookId]?.wpm || 0, stats.wpm),
          accuracy: Math.max(userStats.completedPractice?.[selectedBookId]?.accuracy || 0, stats.accuracy),
        },
      },
      highestWpm: Math.max(userStats.highestWpm || 0, stats.wpm),
      totalWordsTyped: (userStats.totalWordsTyped || 0) + Math.round(stats.charactersTyped / 5),
    };

    const newBadges = checkNewBadges(updatedStats, { ...stats, isBook: true });
    if (newBadges.length > 0) {
      updatedStats.unlockedBadges = [...new Set([...(updatedStats.unlockedBadges || []), ...newBadges])];
      newBadges.forEach((bId) => onUnlockBadge(bId));
    }

    onUpdateStats(updatedStats);

    if (!isChapterDone) {
      setParagraphIdx(nextPara);
    }
  };

  const {
    typedIndex,
    history,
    mistakes,
    isCompleted,
    currentWpm,
    currentGrossWpm,
    currentAccuracy,
    cpm,
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
    progressPercent,
  } = useTypingEngine({
    targetText: currentParagraphText,
    language: currentBook.language || language,
    inputMode,
    hindiLayout,
    onComplete: handleParagraphComplete,
  });

  const filteredBooks = getBooks(filterLang, filterCategory, searchQuery);
  const categories = ['all', ...new Set(BOOKS_CATALOG.map((b) => b.category))];

  // ==========================================
  // VIEW: 100+ BOOKS CATALOG
  // ==========================================
  if (activeView === 'catalog') {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-6 select-none">
        <AdBanner position="header" onOpenSettings={onOpenAdSettings} />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold mb-2 border border-violet-500/20">
              <BookOpen size={14} /> 100+ Public Domain Masterpieces
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Copyright-Free Literature Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-hindi">
              प्रोजेक्ट गुटेनबर्ग एवं हिंदी साहित्य के अमर कालजयी ग्रंथ। बिना किसी रुकावट के अध्याय-दर-अध्याय टाइपिंग अभ्यास।
            </p>
          </div>

          <button
            onClick={() => setActiveView('reader')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition shadow-md shadow-indigo-600/30"
          >
            <Bookmark size={15} /> Resume Reading
          </button>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search books, authors, genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Language Toggle */}
            <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFilterLang('all')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${filterLang === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                All (100+)
              </button>
              <button
                onClick={() => setFilterLang('english')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${filterLang === 'english' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                English Classics
              </button>
              <button
                onClick={() => setFilterLang('hindi')}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer font-hindi ${filterLang === 'hindi' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
              >
                हिंदी साहित्य
              </button>
            </div>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBooks.map((book) => {
            const prog = getBookProgress(book.id);
            const isRead = !!prog.wordsTyped;

            return (
              <div
                key={book.id}
                onClick={() => {
                  setSelectedBookId(book.id);
                  setActiveView('reader');
                }}
                className="group relative bg-slate-950/70 hover:bg-slate-900/90 border border-slate-800 hover:border-indigo-500 rounded-2xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-indigo-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {book.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {book.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-white text-base group-hover:text-indigo-300 transition font-hindi leading-snug">
                    {book.title}
                  </h3>
                  <h4 className="text-xs font-semibold text-slate-400 mt-1 font-hindi">
                    {book.author}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-hindi line-clamp-3 leading-relaxed">
                    {book.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium">
                    📖 ~{(book.estimatedWords / 1000).toFixed(0)}k words
                  </span>

                  {isRead ? (
                    <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                      <CheckCircle size={12} /> Resume
                    </span>
                  ) : (
                    <span className="text-indigo-400 font-semibold group-hover:translate-x-1 transition text-xs flex items-center gap-0.5">
                      Start →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
      </div>
    );
  }

  // ==========================================
  // VIEW: BOOK PRACTICE TYPING ARENA
  // ==========================================
  return (
    <div
      ref={typingContainerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="w-full max-w-7xl mx-auto px-4 py-4 sm:py-5 space-y-3 focus:outline-none select-none"
    >
      {/* Book Reader Navigation Ribbon */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-4 sm:p-5 backdrop-blur-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('catalog')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-medium"
            >
              <ArrowLeft size={16} />
              <span>Library (100+ Books)</span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-bold text-xs border border-violet-500/30">
                  {currentBook.category}
                </span>
                <h1 className="text-base sm:text-xl font-black text-white font-hindi">
                  {currentBook.title}
                </h1>
              </div>
              <p className="text-xs text-slate-400 font-hindi mt-0.5">
                Author: <strong className="text-slate-200">{currentBook.author}</strong> • {currentBook.year}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Input Mode Toggle (Hindi) */}
            {currentBook.language === 'hindi' && (
              <button
                onClick={() => setInputMode(inputMode === 'mapper' ? 'native' : 'mapper')}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-slate-700 cursor-pointer transition"
              >
                {inputMode === 'mapper' ? 'इनस्क्रिप्ट मैपर' : 'सिस्टम कीबोर्ड'}
              </button>
            )}

            {/* Font Size Toggle */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition text-xs font-bold"
              title="Toggle Font Size"
            >
              <Type size={16} />
            </button>

            {/* Serif / Sans Typography Toggle */}
            <button
              onClick={() => setFontFamily(fontFamily === 'serif' ? 'sans' : 'serif')}
              className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white cursor-pointer transition text-xs font-semibold"
              title="Toggle Serif/Sans Typography"
            >
              {fontFamily === 'serif' ? 'Serif' : 'Sans'}
            </button>

            {/* Toggle 2-Line Rolling vs Book Page */}
            <button
              type="button"
              onClick={() => setTextLayoutMode(textLayoutMode === 'rolling' ? 'book' : 'rolling')}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition hover:border-slate-700"
              title="Toggle between 2-Line Rolling and Book View"
            >
              <Layers size={14} className="text-violet-400" />
              <span>{textLayoutMode === 'rolling' ? '2-Line Rolling' : 'Book Page'}</span>
            </button>

            {/* Focus Mode Toggle */}
            {onToggleFocusMode && (
              <button
                type="button"
                onClick={onToggleFocusMode}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition hover:border-slate-700"
                title="Toggle Focus Mode"
              >
                <span>{isFocusMode ? 'Exit Zen' : 'Zen Focus'}</span>
              </button>
            )}

            {/* Keyboard Guide Toggle */}
            <button
              onClick={() => setShowKeyboardGuide(!showKeyboardGuide)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition"
            >
              {showKeyboardGuide ? <EyeOff size={14} className="text-amber-400" /> : <Eye size={14} className="text-emerald-400" />}
              <span>{showKeyboardGuide ? 'Hide Keys' : 'Show Keys'}</span>
            </button>

            {/* Prev/Next Paragraph */}
            <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-0.5">
              <button
                onClick={() => setParagraphIdx(Math.max(0, paragraphIdx - 1))}
                disabled={paragraphIdx === 0}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Previous Paragraph"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[11px] font-mono px-2 text-slate-300">
                {paragraphIdx + 1}/{paragraphs.length}
              </span>
              <button
                onClick={() => setParagraphIdx(Math.min(paragraphs.length - 1, paragraphIdx + 1))}
                disabled={paragraphIdx >= paragraphs.length - 1}
                className="p-1.5 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Next Paragraph"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Chapter Selection Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Active Chapter:</span>
            <select
              value={chapterIdx}
              onChange={(e) => {
                setChapterIdx(Number(e.target.value));
                setParagraphIdx(0);
              }}
              className="bg-slate-950 border border-slate-800 text-white rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-indigo-500 cursor-pointer font-hindi"
            >
              {currentBook.chapters.map((ch, idx) => (
                <option key={idx} value={idx}>
                  {ch}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>Paragraph {paragraphIdx + 1} of {paragraphs.length}</span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-400 transition-all duration-150"
                style={{ width: `${Math.round(((paragraphIdx + 1) / paragraphs.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* TYPING CANVAS: 2-LINE ROLLING CAROUSEL OR BOOK CANVAS */}
      {textLayoutMode === 'rolling' ? (
        <RollingTextDisplay
          targetText={currentParagraphText}
          typedIndex={typedIndex}
          history={history}
          strictError={strictError}
          errorMode={errorMode}
          onToggleErrorMode={setErrorMode}
          hiddenInputRef={hiddenInputRef}
          onKeyDown={handleKeyDown}
          onFocusTypingArea={focusInput}
          fontSize={fontSize}
          language={currentBook.language || language}
          wpm={currentWpm}
          grossWpm={currentGrossWpm}
          accuracy={currentAccuracy}
          progressPercent={progressPercent}
          mistakes={mistakes}
          onRestart={() => {
            if (typingContainerRef.current) typingContainerRef.current.focus();
          }}
        />
      ) : (
        /* TypeLit Fluid Book Reading Canvas */
        <div className="relative bg-slate-950/95 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl min-h-[220px] max-h-[380px] overflow-y-auto leading-relaxed select-none">
          <div className={`${fontSize === 'large' ? 'text-2xl sm:text-3xl lg:text-4xl leading-[2.4]' : 'text-xl sm:text-2xl lg:text-3xl leading-[2.2]'} ${fontFamily === 'serif' ? 'font-serif' : 'font-sans'} font-hindi tracking-wide font-normal`}>
            {Array.from((currentParagraphText || '').normalize('NFC')).map((char, idx) => {
              let color = 'text-slate-500';
              const isCurrent = idx === typedIndex;

              if (idx < typedIndex) {
                const hist = history[idx];
                color = hist?.status === 'correct'
                  ? 'text-emerald-400'
                  : 'text-rose-500 bg-rose-500/20 rounded underline decoration-rose-500';
              } else if (isCurrent) {
                color = 'text-white bg-indigo-500/30 px-0.5 rounded ring-2 ring-indigo-400 shadow-md shadow-indigo-500/40 animate-pulse';
              }

              return (
                <span key={idx} className={`transition-colors duration-75 ${color}`}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* Current Key & Hindi Sequence Breakdown */}
          {targetKeyInfo && !isCompleted && (
            <div className="sticky bottom-0 mt-6 py-2.5 px-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-sm flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <div className="flex items-center gap-2">
                <span>Next Key:</span>
                <span className="text-amber-300 font-mono-custom font-bold uppercase text-sm">
                  {targetKeyInfo.key === ' ' ? 'Spacebar' : targetKeyInfo.key}
                </span>
                {targetKeyInfo.shift && <span className="text-amber-400 font-bold">(+ Shift)</span>}
              </div>

              {/* Upcoming Sequence */}
              {currentBook.language === 'hindi' && upcomingSequence.length > 1 && (
                <div className="hidden sm:flex items-center gap-1.5 font-mono-custom text-[11px]">
                  <span className="text-slate-500">Upcoming:</span>
                  {upcomingSequence.slice(1, 4).map((item, uIdx) => (
                    <span key={uIdx} className="bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 text-slate-300">
                      <span className="font-hindi">{item.char}</span>
                      <span className="text-slate-500 ml-1 font-bold text-[10px]">({item.key.toUpperCase()})</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Integrated Keyboard with 10 Fingers Directly Placed on It */}
      {showKeyboardGuide && (
        <IntegratedKeyboardHands
          targetKey={targetKeyInfo?.key || null}
          targetShift={targetKeyInfo?.shift || false}
          language={currentBook.language || language}
          pressedKey={lastPressedPhysicalKey}
        />
      )}

      {!isFocusMode && (
        <AdBanner position="lesson-bottom" onOpenSettings={onOpenAdSettings} />
      )}
    </div>
  );
}

