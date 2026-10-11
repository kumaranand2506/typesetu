// Official Indian Standard Hindi InScript Keyboard Layout (BIS IS 16350)
// Vowels & Matras on the Left Hand, Consonants on the Right Hand

export interface InScriptKey {
  code: string;
  key: string;
  char: string;
  shiftChar: string;
  qwertyChar: string;
  shiftQwertyChar: string;
  row: 'number' | 'top' | 'home' | 'bottom';
  finger: string;
  hand: 'left' | 'right';
}

export const INSCRIPT_NORMAL: Record<string, string> = {
  // Number row
  '`': '`', '1': '1', '2': '2', '3': '3', '4': '4', '5': '5',
  '6': '6', '7': '7', '8': '8', '9': '9', '0': '0', '-': '-', '=': 'ृ',

  // Top row
  'q': 'ौ', 'w': 'ै', 'e': 'ा', 'r': 'ी', 't': 'ू',
  'y': 'ब', 'u': 'ह', 'i': 'ग', 'o': 'द', 'p': 'ज',
  '[': 'ड', ']': '़', '\\': 'ॉ',

  // Home row (Left: vowels/matras, Right: consonants)
  'a': 'ो', 's': 'े', 'd': '्', 'f': 'ि', 'g': 'ु',
  'h': 'प', 'j': 'र', 'k': 'क', 'l': 'त', ';': 'च', "'": 'ट',

  // Bottom row
  'z': 'ॆ', 'x': 'ं', 'c': 'म', 'v': 'न', 'b': 'व',
  'n': 'ल', 'm': 'स', ',': ',', '.': '.', '/': 'य',

  ' ': ' ',
};

export const INSCRIPT_SHIFT: Record<string, string> = {
  // Number row shifted
  '~': '~', '!': 'ऍ', '@': 'ॅ', '#': '्र', '$': 'र्', '%': 'ज्ञ',
  '^': 'त्र', '&': 'क्ष', '*': 'श्र', '(': '(', ')': ')', '_': 'ः', '+': 'ऋ',

  // Top row shifted (Left: independent vowels, Right: aspirated consonants)
  'Q': 'औ', 'W': 'ऐ', 'E': 'आ', 'R': 'ई', 'T': 'ऊ',
  'Y': 'भ', 'U': 'ङ', 'I': 'घ', 'O': 'ध', 'P': 'झ',
  '{': 'ढ', '}': 'ञ', '|': 'ऑ',

  // Home row shifted
  'A': 'ओ', 'S': 'ए', 'D': 'अ', 'F': 'इ', 'G': 'उ',
  'H': 'फ', 'J': 'र्', 'K': 'ख', 'L': 'थ', ':': 'छ', '"': 'ठ',

  // Bottom row shifted
  'Z': 'ऋ', 'X': 'ँ', 'C': 'ण', 'V': 'ऩ', 'B': 'ऴ',
  'N': 'ळ', 'M': 'श', '<': 'ष', '>': '।', '?': 'य़',

  ' ': ' ',
};

// Finger assignments for InScript layout
// Pedagogy: Pinky=Orange, Ring=Blue, Middle=Green, Index=Purple, Thumb=Gray
export const INSCRIPT_FINGER_MAP: Record<string, string> = {
  // Left Hand
  'q': 'LP', 'Q': 'LP', 'a': 'LP', 'A': 'LP', 'z': 'LP', 'Z': 'LP', '1': 'LP', '!': 'LP', '`': 'LP', '~': 'LP',
  'w': 'LR', 'W': 'LR', 's': 'LR', 'S': 'LR', 'x': 'LR', 'X': 'LR', '2': 'LR', '@': 'LR',
  'e': 'LM', 'E': 'LM', 'd': 'LM', 'D': 'LM', 'c': 'LM', 'C': 'LM', '3': 'LM', '#': 'LM',
  'r': 'LI', 'R': 'LI', 'f': 'LI', 'F': 'LI', 'v': 'LI', 'V': 'LI', '4': 'LI', '$': 'LI',
  't': 'LI', 'T': 'LI', 'g': 'LI', 'G': 'LI', 'b': 'LI', 'B': 'LI', '5': 'LI', '%': 'LI',

  // Thumbs
  ' ': 'SPACE',

  // Right Hand
  'y': 'RI', 'Y': 'RI', 'h': 'RI', 'H': 'RI', 'n': 'RI', 'N': 'RI', '6': 'RI', '^': 'RI',
  'u': 'RI', 'U': 'RI', 'j': 'RI', 'J': 'RI', 'm': 'RI', 'M': 'RI', '7': 'RI', '&': 'RI',
  'i': 'RM', 'I': 'RM', 'k': 'RM', 'K': 'RM', ',': 'RM', '<': 'RM', '8': 'RM', '*': 'RM',
  'o': 'RR', 'O': 'RR', 'l': 'RR', 'L': 'RR', '.': 'RR', '>': 'RR', '9': 'RR', '(': 'RR',
  'p': 'RP', 'P': 'RP', ';': 'RP', ':': 'RP', '/': 'RP', '?': 'RP', '0': 'RP', ')': 'RP',
  '[': 'RP', '{': 'RP', "'": 'RP', '"': 'RP', '-': 'RP', '_': 'RP',
  ']': 'RP', '}': 'RP', '\\': 'RP', '|': 'RP', '=': 'RP', '+': 'RP',
};

// Reverse map: Character -> { key, shift, code }
export const REVERSE_INSCRIPT_MAP: Record<string, { key: string; shift: boolean; code?: string }> = {};

// Populate reverse lookup
Object.entries(INSCRIPT_NORMAL).forEach(([key, char]) => {
  if (char && !REVERSE_INSCRIPT_MAP[char]) {
    REVERSE_INSCRIPT_MAP[char] = { key, shift: false };
  }
});

Object.entries(INSCRIPT_SHIFT).forEach(([key, char]) => {
  if (char && !REVERSE_INSCRIPT_MAP[char]) {
    REVERSE_INSCRIPT_MAP[char] = { key: key.toLowerCase(), shift: true };
  }
});

// Purna Viram
REVERSE_INSCRIPT_MAP['।'] = { key: '.', shift: true };
REVERSE_INSCRIPT_MAP['|'] = { key: '\\', shift: true };

// Devanagari digits to physical number keys
const DEVANAGARI_DIGITS: Record<string, string> = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
};
Object.entries(DEVANAGARI_DIGITS).forEach(([d, k]) => {
  REVERSE_INSCRIPT_MAP[d] = { key: k, shift: false };
});

// Full 5-Row InScript Virtual Keyboard Layout Definition
export const INSCRIPT_KEYBOARD_ROWS = [
  // Number row
  [
    { code: 'Backquote', key: '`', shiftKey: '~', inscript: '`', inscriptShift: '~', finger: 'LP', width: 'w-10 sm:w-11' },
    { code: 'Digit1', key: '1', shiftKey: '!', inscript: '1', inscriptShift: 'ऍ', finger: 'LP', width: 'w-10 sm:w-11' },
    { code: 'Digit2', key: '2', shiftKey: '@', inscript: '2', inscriptShift: 'ॅ', finger: 'LR', width: 'w-10 sm:w-11' },
    { code: 'Digit3', key: '3', shiftKey: '#', inscript: '3', inscriptShift: '्र', finger: 'LM', width: 'w-10 sm:w-11' },
    { code: 'Digit4', key: '4', shiftKey: '$', inscript: '4', inscriptShift: 'र्', finger: 'LI', width: 'w-10 sm:w-11' },
    { code: 'Digit5', key: '5', shiftKey: '%', inscript: '5', inscriptShift: 'ज्ञ', finger: 'LI', width: 'w-10 sm:w-11' },
    { code: 'Digit6', key: '6', shiftKey: '^', inscript: '6', inscriptShift: 'त्र', finger: 'RI', width: 'w-10 sm:w-11' },
    { code: 'Digit7', key: '7', shiftKey: '&', inscript: '7', inscriptShift: 'क्ष', finger: 'RI', width: 'w-10 sm:w-11' },
    { code: 'Digit8', key: '8', shiftKey: '*', inscript: '8', inscriptShift: 'श्र', finger: 'RM', width: 'w-10 sm:w-11' },
    { code: 'Digit9', key: '9', shiftKey: '(', inscript: '9', inscriptShift: '(', finger: 'RR', width: 'w-10 sm:w-11' },
    { code: 'Digit0', key: '0', shiftKey: ')', inscript: '0', inscriptShift: ')', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'Minus', key: '-', shiftKey: '_', inscript: '-', inscriptShift: 'ः', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'Equal', key: '=', shiftKey: '+', inscript: 'ृ', inscriptShift: 'ऋ', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'Backspace', label: 'Backspace', special: true, finger: 'RP', width: 'flex-1 min-w-[50px]' },
  ],
  // Top row
  [
    { code: 'Tab', label: 'Tab', special: true, finger: 'LP', width: 'w-12 sm:w-14' },
    { code: 'KeyQ', key: 'q', shiftKey: 'Q', inscript: 'ौ', inscriptShift: 'औ', finger: 'LP', width: 'w-10 sm:w-11' },
    { code: 'KeyW', key: 'w', shiftKey: 'W', inscript: 'ै', inscriptShift: 'ऐ', finger: 'LR', width: 'w-10 sm:w-11' },
    { code: 'KeyE', key: 'e', shiftKey: 'E', inscript: 'ा', inscriptShift: 'आ', finger: 'LM', width: 'w-10 sm:w-11' },
    { code: 'KeyR', key: 'r', shiftKey: 'R', inscript: 'ी', inscriptShift: 'ई', finger: 'LI', width: 'w-10 sm:w-11' },
    { code: 'KeyT', key: 't', shiftKey: 'T', inscript: 'ू', inscriptShift: 'ऊ', finger: 'LI', width: 'w-10 sm:w-11' },
    { code: 'KeyY', key: 'y', shiftKey: 'Y', inscript: 'ब', inscriptShift: 'भ', finger: 'RI', width: 'w-10 sm:w-11' },
    { code: 'KeyU', key: 'u', shiftKey: 'U', inscript: 'ह', inscriptShift: 'ङ', finger: 'RI', width: 'w-10 sm:w-11' },
    { code: 'KeyI', key: 'i', shiftKey: 'I', inscript: 'ग', inscriptShift: 'घ', finger: 'RM', width: 'w-10 sm:w-11' },
    { code: 'KeyO', key: 'o', shiftKey: 'O', inscript: 'द', inscriptShift: 'ध', finger: 'RR', width: 'w-10 sm:w-11' },
    { code: 'KeyP', key: 'p', shiftKey: 'P', inscript: 'ज', inscriptShift: 'झ', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'BracketLeft', key: '[', shiftKey: '{', inscript: 'ड', inscriptShift: 'ढ', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'BracketRight', key: ']', shiftKey: '}', inscript: '़', inscriptShift: 'ञ', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'Backslash', key: '\\', shiftKey: '|', inscript: 'ॉ', inscriptShift: 'ऑ', finger: 'RP', width: 'w-10 sm:w-11' },
  ],
  // Home row (Left: Vowels/Matras, Right: Consonants)
  [
    { code: 'CapsLock', label: 'Caps Lock', special: true, finger: 'LP', width: 'w-14 sm:w-16' },
    { code: 'KeyA', key: 'a', shiftKey: 'A', inscript: 'ो', inscriptShift: 'ओ', finger: 'LP', width: 'w-10 sm:w-11' },
    { code: 'KeyS', key: 's', shiftKey: 'S', inscript: 'े', inscriptShift: 'ए', finger: 'LR', width: 'w-10 sm:w-11' },
    { code: 'KeyD', key: 'd', shiftKey: 'D', inscript: '्', inscriptShift: 'अ', finger: 'LM', width: 'w-10 sm:w-11' },
    { code: 'KeyF', key: 'f', shiftKey: 'F', inscript: 'ि', inscriptShift: 'इ', finger: 'LI', width: 'w-10 sm:w-11', homeBump: true },
    { code: 'KeyG', key: 'g', shiftKey: 'G', inscript: 'ु', inscriptShift: 'उ', finger: 'LI', width: 'w-10 sm:w-11' },
    { code: 'KeyH', key: 'h', shiftKey: 'H', inscript: 'प', inscriptShift: 'फ', finger: 'RI', width: 'w-10 sm:w-11' },
    { code: 'KeyJ', key: 'j', shiftKey: 'J', inscript: 'र', inscriptShift: 'र्', finger: 'RI', width: 'w-10 sm:w-11', homeBump: true },
    { code: 'KeyK', key: 'k', shiftKey: 'K', inscript: 'क', inscriptShift: 'ख', finger: 'RM', width: 'w-10 sm:w-11' },
    { code: 'KeyL', key: 'l', shiftKey: 'L', inscript: 'त', inscriptShift: 'थ', finger: 'RR', width: 'w-10 sm:w-11' },
    { code: 'Semicolon', key: ';', shiftKey: ':', inscript: 'च', inscriptShift: 'छ', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'Quote', key: "'", shiftKey: '"', inscript: 'ट', inscriptShift: 'ठ', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'Enter', label: 'Enter', special: true, finger: 'RP', width: 'flex-1 min-w-[60px]' },
  ],
  // Bottom row
  [
    { code: 'ShiftLeft', label: 'Shift', special: true, finger: 'LP', width: 'w-16 sm:w-20' },
    { code: 'KeyZ', key: 'z', shiftKey: 'Z', inscript: 'ॆ', inscriptShift: 'ऋ', finger: 'LP', width: 'w-10 sm:w-11' },
    { code: 'KeyX', key: 'x', shiftKey: 'X', inscript: 'ं', inscriptShift: 'ँ', finger: 'LR', width: 'w-10 sm:w-11' },
    { code: 'KeyC', key: 'c', shiftKey: 'C', inscript: 'म', inscriptShift: 'ण', finger: 'LM', width: 'w-10 sm:w-11' },
    { code: 'KeyV', key: 'v', shiftKey: 'V', inscript: 'न', inscriptShift: 'ऩ', finger: 'LI', width: 'w-10 sm:w-11' },
    { code: 'KeyB', key: 'b', shiftKey: 'B', inscript: 'व', inscriptShift: 'ऴ', finger: 'LI', width: 'w-10 sm:w-11' },
    { code: 'KeyN', key: 'n', shiftKey: 'N', inscript: 'ल', inscriptShift: 'ळ', finger: 'RI', width: 'w-10 sm:w-11' },
    { code: 'KeyM', key: 'm', shiftKey: 'M', inscript: 'स', inscriptShift: 'श', finger: 'RI', width: 'w-10 sm:w-11' },
    { code: 'Comma', key: ',', shiftKey: '<', inscript: ',', inscriptShift: 'ष', finger: 'RM', width: 'w-10 sm:w-11' },
    { code: 'Period', key: '.', shiftKey: '>', inscript: '.', inscriptShift: '।', finger: 'RR', width: 'w-10 sm:w-11' },
    { code: 'Slash', key: '/', shiftKey: '?', inscript: 'य', inscriptShift: 'य़', finger: 'RP', width: 'w-10 sm:w-11' },
    { code: 'ShiftRight', label: 'Shift', special: true, finger: 'RP', width: 'flex-1 min-w-[70px]' },
  ],
  // Spacebar row
  [
    { code: 'Space', key: ' ', label: 'Space', special: true, finger: 'SPACE', width: 'w-64 sm:w-80 md:w-96' },
  ],
];

/**
 * Tokenize Unicode Devanagari text into sequential InScript keystroke tokens
 */
export function tokenizeDevanagariToInscript(text: string) {
  const norm = (text || '').normalize('NFC');
  const tokens = [];

  for (let i = 0; i < norm.length; i++) {
    const ch = norm[i];
    const mapping = REVERSE_INSCRIPT_MAP[ch] || { key: ch, shift: false };
    const finger = INSCRIPT_FINGER_MAP[mapping.key] || 'SPACE';

    tokens.push({
      glyph: ch,
      key: mapping.key,
      shift: mapping.shift,
      finger,
      raw: ch,
    });
  }

  return tokens;
}

export function findInscriptKeyForChar(ch: string) {
  const mapping = REVERSE_INSCRIPT_MAP[ch];
  if (mapping) {
    return {
      key: mapping.key,
      shift: mapping.shift,
      finger: INSCRIPT_FINGER_MAP[mapping.key] || 'SPACE',
    };
  }
  return {
    key: ch,
    shift: false,
    finger: 'SPACE',
  };
}
