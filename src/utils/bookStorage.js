// TypeSetu High-Performance Book Chunking & IndexedDB Caching Engine

const DB_NAME = 'TypeSetuBookDB';
const DB_VERSION = 1;
const STORE_NAME = 'book_chunks';
const PROGRESS_STORAGE_KEY = 'typesetu_book_progress_v1';
const LAST_READ_KEY = 'typesetu_last_read_v1';

// Initialize IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
  });
}

// Split text into bite-sized typing paragraphs (~45-75 words)
export function chunkTextIntoParagraphs(text, targetWordCount = 55) {
  if (!text) return [];

  // Normalize linebreaks
  const sentences = text.match(/[^.!?।\n]+[.!?।\n]+/g) || [text];
  const chunks = [];
  let currentChunk = '';
  let currentWordCount = 0;

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;
    const wordsInSentence = trimmed.split(/\s+/).length;

    if (currentWordCount + wordsInSentence > targetWordCount && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = trimmed + ' ';
      currentWordCount = wordsInSentence;
    } else {
      currentChunk += trimmed + ' ';
      currentWordCount += wordsInSentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks.length > 0 ? chunks : [text];
}

// Cache chapter chunks in IndexedDB
export async function cacheChapterChunks(bookId, chapterIndex, chunks) {
  try {
    const db = await openDB();
    if (!db) return;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const key = `${bookId}_ch_${chapterIndex}`;
    store.put({ key, bookId, chapterIndex, chunks, timestamp: Date.now() });
  } catch (e) {
    console.warn('IndexedDB caching failed, using memory', e);
  }
}

// Retrieve cached chapter chunks from IndexedDB
export async function getCachedChapterChunks(bookId, chapterIndex) {
  try {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const key = `${bookId}_ch_${chapterIndex}`;
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ? request.result.chunks : null);
      request.onerror = () => resolve(null);
    });
  } catch (e) {
    return null;
  }
}

// Save reading progress / bookmark
export function saveBookProgress(bookId, progressData) {
  try {
    const all = getAllBookProgress();
    all[bookId] = {
      ...all[bookId],
      ...progressData,
      updatedAt: Date.now(),
    };
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(all));
    localStorage.setItem(LAST_READ_KEY, bookId);
  } catch (e) {
    console.error('Failed to save book progress', e);
  }
}

export function getBookProgress(bookId) {
  try {
    const all = getAllBookProgress();
    return all[bookId] || { chapterIndex: 0, paragraphIndex: 0, wordsTyped: 0, highestWpm: 0 };
  } catch (e) {
    return { chapterIndex: 0, paragraphIndex: 0, wordsTyped: 0, highestWpm: 0 };
  }
}

export function getAllBookProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function getLastReadBookId() {
  try {
    return localStorage.getItem(LAST_READ_KEY) || null;
  } catch (e) {
    return null;
  }
}

// Dynamically load or synthesize chapter paragraphs with IndexedDB caching
export async function getChapterParagraphs(book, chapterIndex = 0) {
  if (!book) return [];
  const cached = await getCachedChapterChunks(book.id, chapterIndex);
  if (cached && cached.length > 0) {
    return cached;
  }

  let rawText = '';
  if (chapterIndex === 0 && book.initialSampleText) {
    rawText = book.initialSampleText;
  } else {
    const chTitle = book.chapters?.[chapterIndex] || `Chapter ${chapterIndex + 1}`;
    if (book.language === 'hindi') {
      rawText = `${chTitle} — ${book.title} की यह कथा आगे बढ़ते हुए मानवीय संवेदनाओं, आत्मसम्मान और परिस्थितियों के द्वंद्व को सजीव करती है। पात्र अपने आदर्शों और कर्तव्यों के बीच संतुलन साधने का प्रयास करते हैं। समाज की विडंबनाओं और जीवन के संघर्षों का यह सजीव चित्रण अंतर्मन को झकझोर देता है। धर्म, कर्म और सत्य की राह पर चलते हुए प्रत्येक व्यक्ति को अपने भीतर के संशयों पर विजय पानी होती है।`;
    } else {
      rawText = `${chTitle} — As the narrative of ${book.title} progresses, the characters find themselves confronted by sudden turns of fortune and profound moral choices. With quiet dignity and persistent courage, they navigate their circumstances. Every dialogue and quiet reflection deepens our understanding of human character, revealing that steadfast integrity remains the true measure of noble ambition.`;
    }
  }

  const chunks = chunkTextIntoParagraphs(rawText, 55);
  await cacheChapterChunks(book.id, chapterIndex, chunks);
  return chunks;
}

