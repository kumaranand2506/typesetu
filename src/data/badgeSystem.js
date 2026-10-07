// Achievement badges system with localStorage persistence

export const BADGES_DEFINITION = [
  {
    id: 'first_step',
    name: 'First Keystroke',
    hindiName: 'पहला कदम',
    description: 'Complete your first lesson successfully.',
    icon: '🌱',
    color: 'from-emerald-500 to-green-600',
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    hindiName: 'सटीकता शिरोमणि',
    description: 'Finish any lesson with 98% or higher accuracy.',
    icon: '🎯',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'speed_30',
    name: 'Speedster 30',
    hindiName: 'गति धावक (30 WPM)',
    description: 'Reach a speed of 30 words per minute.',
    icon: '⚡',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'speed_50',
    name: 'Lightning Typist (50 WPM)',
    hindiName: 'तूफ़ानी गति (50 WPM)',
    description: 'Reach a blistering speed of 50 words per minute.',
    icon: '🔥',
    color: 'from-rose-500 to-red-600',
  },
  {
    id: 'home_row_hero',
    name: 'Home Row Master',
    hindiName: 'गृह पंक्ति महारथी',
    description: 'Complete all foundational Home Row lessons.',
    icon: '👑',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'inscript_pro',
    name: 'InScript Scholar',
    hindiName: 'इनस्क्रिप्ट विद्वान',
    description: 'Complete 5 Hindi InScript lessons.',
    icon: '🇮🇳',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'bookworm',
    name: 'Literature Reader',
    hindiName: 'साहित्य प्रेमी',
    description: 'Complete a classic book passage in the Practice room.',
    icon: '📚',
    color: 'from-violet-500 to-fuchsia-600',
  },
  {
    id: 'exam_ready',
    name: 'Exam Certified',
    hindiName: 'परीक्षा विजेता',
    description: 'Pass a mock speed test with >30 WPM and >95% accuracy.',
    icon: '🏆',
    color: 'from-yellow-400 to-amber-500',
  },
];

const STORAGE_KEY = 'typesetu_user_stats_v1';

export function getUserStats() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user stats', e);
  }
  return {
    completedLessons: {}, // { 'hi-1': { stars: 3, wpm: 25, accuracy: 96 } }
    completedPractice: {},
    unlockedBadges: [], // ['first_step']
    totalWordsTyped: 0,
    totalPracticeSeconds: 0,
    highestWpm: 0,
    currentStreak: 1,
    lastActiveDate: new Date().toISOString().slice(0, 10),
  };
}

export function saveUserStats(stats) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats', e);
  }
}

export function checkNewBadges(stats, currentRun = {}) {
  const newlyUnlocked = [];
  const currentBadges = new Set(stats.unlockedBadges || []);

  // First step
  if (!currentBadges.has('first_step') && Object.keys(stats.completedLessons || {}).length >= 1) {
    newlyUnlocked.push('first_step');
  }

  // Perfectionist
  if (!currentBadges.has('perfectionist') && currentRun.accuracy >= 98) {
    newlyUnlocked.push('perfectionist');
  }

  // Speed 30
  if (!currentBadges.has('speed_30') && (stats.highestWpm >= 30 || currentRun.wpm >= 30)) {
    newlyUnlocked.push('speed_30');
  }

  // Speed 50
  if (!currentBadges.has('speed_50') && (stats.highestWpm >= 50 || currentRun.wpm >= 50)) {
    newlyUnlocked.push('speed_50');
  }

  // Home row hero
  if (!currentBadges.has('home_row_hero')) {
    const hasHiHome = stats.completedLessons['hi-1'] && stats.completedLessons['hi-2'];
    const hasEnHome = stats.completedLessons['en-1'] && stats.completedLessons['en-2'];
    if (hasHiHome || hasEnHome) {
      newlyUnlocked.push('home_row_hero');
    }
  }

  // InScript pro
  if (!currentBadges.has('inscript_pro')) {
    const hiCount = Object.keys(stats.completedLessons || {}).filter(k => k.startsWith('hi-')).length;
    if (hiCount >= 5) {
      newlyUnlocked.push('inscript_pro');
    }
  }

  // Bookworm
  if (!currentBadges.has('bookworm') && Object.keys(stats.completedPractice || {}).length >= 1) {
    newlyUnlocked.push('bookworm');
  }

  // Exam ready
  if (!currentBadges.has('exam_ready') && currentRun.wpm >= 30 && currentRun.accuracy >= 95 && currentRun.isExam) {
    newlyUnlocked.push('exam_ready');
  }

  return newlyUnlocked;
}
