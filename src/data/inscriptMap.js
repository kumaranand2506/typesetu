// Official Indian Bureau of Standards (BIS) Hindi InScript Keyboard Mapping
// Standardized for CPCT, SSC, High Court, and all government Hindi typing tests

export const INSCRIPT_NORMAL = {
  // Number row
  '`': '`', '1': '1', '2': '2', '3': '3', '4': '4',
  '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0',
  '-': '-', '=': 'ृ',

  // Top row
  'q': 'ौ', // au matra
  'w': 'ै', // ai matra
  'e': 'ा', // aa matra
  'r': 'ी', // ee matra
  't': 'ू', // oo matra
  'y': 'ब', // ba
  'u': 'ह', // ha
  'i': 'ग', // ga
  'o': 'द', // da
  'p': 'ज', // ja
  '[': 'ड', // dda
  ']': '़', // nukta
  '\\': '\\',

  // Home row
  'a': 'ो', // o matra
  's': 'े', // e matra
  'd': '्', // halant (virama)
  'f': 'ि', // i matra
  'g': 'ु', // u matra
  'h': 'प', // pa
  'j': 'र', // ra
  'k': 'क', // ka
  'l': 'त', // ta
  ';': 'च', // cha
  "'": 'ट', // tta

  // Bottom row
  'z': 'ॆ', // short e matra
  'x': 'ं', // anusvara (bindi)
  'c': 'म', // ma
  'v': 'न', // na
  'b': 'व', // va
  'n': 'ल', // la
  'm': 'स', // sa
  ',': ',', // comma
  '.': '.', // dot
  '/': 'य', // ya

  // Space
  ' ': ' ',
};

export const INSCRIPT_SHIFT = {
  // Number row shifted
  '~': '~',
  '!': 'ऍ',
  '@': 'ॅ',
  '#': '्र', // ra-phalan
  '$': 'र्', // reph
  '%': 'ज्ञ',
  '^': 'त्र',
  '&': 'क्ष',
  '*': 'श्र',
  '(': '(',
  ')': ')',
  '_': 'ः', // visarga
  '+': 'ऋ', // ri vowel

  // Top row shifted
  'Q': 'औ',
  'W': 'ऐ',
  'E': 'आ',
  'R': 'ई',
  'T': 'ऊ',
  'Y': 'भ',
  'U': 'ङ',
  'I': 'घ',
  'O': 'ध',
  'P': 'झ',
  '{': 'ढ',
  '}': 'ञ',
  '|': '|',

  // Home row shifted
  'A': 'ओ',
  'S': 'ए',
  'D': 'अ',
  'F': 'इ',
  'G': 'उ',
  'H': 'फ',
  'J': 'ऱ',
  'K': 'ख',
  'L': 'थ',
  ':': 'छ',
  '"': 'ठ',

  // Bottom row shifted
  'Z': 'ऒ',
  'X': 'ँ', // chandrabindu
  'C': 'ण',
  'V': 'ऩ',
  'B': 'ऴ',
  'N': 'ळ',
  'M': 'श',
  '<': 'ष',
  '>': '।', // purna viram (danda)
  '?': '?',

  ' ': ' ',
};

// Finger assignments
export const FINGER_MAP = {
  '`': 'LP', '~': 'LP', '1': 'LP', '!': 'LP', 'q': 'LP', 'Q': 'LP', 'a': 'LP', 'A': 'LP', 'z': 'LP', 'Z': 'LP',
  '2': 'LR', '@': 'LR', 'w': 'LR', 'W': 'LR', 's': 'LR', 'S': 'LR', 'x': 'LR', 'X': 'LR',
  '3': 'LM', '#': 'LM', 'e': 'LM', 'E': 'LM', 'd': 'LM', 'D': 'LM', 'c': 'LM', 'C': 'LM',
  '4': 'LI', '$': 'LI', '5': 'LI', '%': 'LI', 'r': 'LI', 'R': 'LI', 't': 'LI', 'T': 'LI',
  'f': 'LI', 'F': 'LI', 'g': 'LI', 'G': 'LI', 'v': 'LI', 'V': 'LI', 'b': 'LI', 'B': 'LI',
  ' ': 'SPACE',
  '6': 'RI', '^': 'RI', '7': 'RI', '&': 'RI', 'y': 'RI', 'Y': 'RI', 'u': 'RI', 'U': 'RI',
  'h': 'RI', 'H': 'RI', 'j': 'RI', 'J': 'RI', 'n': 'RI', 'N': 'RI', 'm': 'RI', 'M': 'RI',
  '8': 'RM', '*': 'RM', 'i': 'RM', 'I': 'RM', 'k': 'RM', 'K': 'RM', ',': 'RM', '<': 'RM',
  '9': 'RR', '(': 'RR', 'o': 'RR', 'O': 'RR', 'l': 'RR', 'L': 'RR', '.': 'RR', '>': 'RR',
  '0': 'RP', ')': 'RP', '-': 'RP', '_': 'RP', '=': 'RP', '+': 'RP',
  'p': 'RP', 'P': 'RP', '[': 'RP', '{': 'RP', ']': 'RP', '}': 'RP', '\\': 'RP', '|': 'RP',
  ';': 'RP', ':': 'RP', "'": 'RP', '"': 'RP', '/': 'RP', '?': 'RP',
};

export const FINGER_INFO = {
  LP: { id: 'LP', name: 'Left Pinky', hindiName: 'बायाँ कनिष्ठिका', color: '#f43f5e', bg: 'bg-rose-500', text: 'text-rose-400', hand: 'left' },
  LR: { id: 'LR', name: 'Left Ring', hindiName: 'बायाँ अनामिका', color: '#fb923c', bg: 'bg-orange-500', text: 'text-orange-400', hand: 'left' },
  LM: { id: 'LM', name: 'Left Middle', hindiName: 'बायाँ मध्यमा', color: '#facc15', bg: 'bg-yellow-500', text: 'text-yellow-400', hand: 'left' },
  LI: { id: 'LI', name: 'Left Index', hindiName: 'बायाँ तर्जनी', color: '#4ade80', bg: 'bg-green-500', text: 'text-green-400', hand: 'left' },
  LT: { id: 'LT', name: 'Left Thumb', hindiName: 'बायाँ अँगूठा', color: '#38bdf8', bg: 'bg-sky-500', text: 'text-sky-400', hand: 'left' },
  RT: { id: 'RT', name: 'Right Thumb', hindiName: 'दायाँ अँगूठा', color: '#38bdf8', bg: 'bg-sky-500', text: 'text-sky-400', hand: 'right' },
  SPACE: { id: 'SPACE', name: 'Thumb (Space)', hindiName: 'अँगूठा (स्पेस)', color: '#38bdf8', bg: 'bg-sky-500', text: 'text-sky-400', hand: 'both' },
  RI: { id: 'RI', name: 'Right Index', hindiName: 'दायाँ तर्जनी', color: '#818cf8', bg: 'bg-indigo-500', text: 'text-indigo-400', hand: 'right' },
  RM: { id: 'RM', name: 'Right Middle', hindiName: 'दायाँ मध्यमा', color: '#a855f7', bg: 'bg-purple-500', text: 'text-purple-400', hand: 'right' },
  RR: { id: 'RR', name: 'Right Ring', hindiName: 'दायाँ अनामिका', color: '#ec4899', bg: 'bg-pink-500', text: 'text-pink-400', hand: 'right' },
  RP: { id: 'RP', name: 'Right Pinky', hindiName: 'दायाँ कनिष्ठिका', color: '#14b8a6', bg: 'bg-teal-500', text: 'text-teal-400', hand: 'right' },
};

// Keyboard physical layout rows
export const KEYBOARD_ROWS = [
  [
    { code: 'Backquote', key: '`', shiftKey: '~', inscript: '`', inscriptShift: '~', remington: '`', remingtonShift: '~', finger: 'LP' },
    { code: 'Digit1', key: '1', shiftKey: '!', inscript: '1', inscriptShift: 'ऍ', remington: '१', remingtonShift: '!', finger: 'LP' },
    { code: 'Digit2', key: '2', shiftKey: '@', inscript: '2', inscriptShift: 'ॅ', remington: '२', remingtonShift: '@', finger: 'LR' },
    { code: 'Digit3', key: '3', shiftKey: '#', inscript: '3', inscriptShift: '्र', remington: '३', remingtonShift: '#', finger: 'LM' },
    { code: 'Digit4', key: '4', shiftKey: '$', inscript: '4', inscriptShift: 'र्', remington: '४', remingtonShift: '+', finger: 'LI' },
    { code: 'Digit5', key: '5', shiftKey: '%', inscript: '5', inscriptShift: 'ज्ञ', remington: '५', remingtonShift: ':', finger: 'LI' },
    { code: 'Digit6', key: '6', shiftKey: '^', inscript: '6', inscriptShift: 'त्र', remington: '६', remingtonShift: "'", finger: 'RI' },
    { code: 'Digit7', key: '7', shiftKey: '&', inscript: '7', inscriptShift: 'क्ष', remington: '७', remingtonShift: '-', finger: 'RI' },
    { code: 'Digit8', key: '8', shiftKey: '*', inscript: '8', inscriptShift: 'श्र', remington: '८', remingtonShift: '"', finger: 'RM' },
    { code: 'Digit9', key: '9', shiftKey: '(', inscript: '9', inscriptShift: '(', remington: '९', remingtonShift: ';', finger: 'RR' },
    { code: 'Digit0', key: '0', shiftKey: ')', inscript: '0', inscriptShift: ')', remington: '०', remingtonShift: 'द्ध', finger: 'RP' },
    { code: 'Minus', key: '-', shiftKey: '_', inscript: '-', inscriptShift: 'ः', remington: 'ऋ', remingtonShift: 'ः', finger: 'RP' },
    { code: 'Equal', key: '=', shiftKey: '+', inscript: 'ृ', inscriptShift: 'ऋ', remington: 'त्र', remingtonShift: 'ऋ', finger: 'RP' },
    { code: 'Backspace', label: 'Backspace', width: 'w-16 sm:w-20', special: true, finger: 'RP' },
  ],
  [
    { code: 'Tab', label: 'Tab', width: 'w-14 sm:w-16', special: true, finger: 'LP' },
    { code: 'KeyQ', key: 'q', shiftKey: 'Q', inscript: 'ौ', inscriptShift: 'औ', remington: 'ु', remingtonShift: 'फ', finger: 'LP' },
    { code: 'KeyW', key: 'w', shiftKey: 'W', inscript: 'ै', inscriptShift: 'ऐ', remington: 'ू', remingtonShift: 'ॅ', finger: 'LR' },
    { code: 'KeyE', key: 'e', shiftKey: 'E', inscript: 'ा', inscriptShift: 'आ', remington: 'म', remingtonShift: 'म्', finger: 'LM' },
    { code: 'KeyR', key: 'r', shiftKey: 'R', inscript: 'ी', inscriptShift: 'ई', remington: 'त', remingtonShift: 'त्', finger: 'LI' },
    { code: 'KeyT', key: 't', shiftKey: 'T', inscript: 'ू', inscriptShift: 'ऊ', remington: 'ज', remingtonShift: 'ज्', finger: 'LI' },
    { code: 'KeyY', key: 'y', shiftKey: 'Y', inscript: 'ब', inscriptShift: 'भ', remington: 'ल', remingtonShift: 'ल्', finger: 'RI' },
    { code: 'KeyU', key: 'u', shiftKey: 'U', inscript: 'ह', inscriptShift: 'ङ', remington: 'न', remingtonShift: 'न्', finger: 'RI' },
    { code: 'KeyI', key: 'i', shiftKey: 'I', inscript: 'ग', inscriptShift: 'घ', remington: 'प', remingtonShift: 'प्', finger: 'RM' },
    { code: 'KeyO', key: 'o', shiftKey: 'O', inscript: 'द', inscriptShift: 'ध', remington: 'व', remingtonShift: 'व्', finger: 'RR' },
    { code: 'KeyP', key: 'p', shiftKey: 'P', inscript: 'ज', inscriptShift: 'झ', remington: 'च', remingtonShift: 'च्', finger: 'RP' },
    { code: 'BracketLeft', key: '[', shiftKey: '{', inscript: 'ड', inscriptShift: 'ढ', remington: 'ख्', remingtonShift: 'क्ष', finger: 'RP' },
    { code: 'BracketRight', key: ']', shiftKey: '}', inscript: '़', inscriptShift: 'ञ', remington: ',', remingtonShift: 'द्व', finger: 'RP' },
    { code: 'Backslash', key: '\\', shiftKey: '|', inscript: '\\', inscriptShift: '|', remington: '.', remingtonShift: 'द्य', finger: 'RP' },
  ],
  [
    { code: 'CapsLock', label: 'Caps Lock', width: 'w-16 sm:w-20', special: true, finger: 'LP' },
    { code: 'KeyA', key: 'a', shiftKey: 'A', inscript: 'ो', inscriptShift: 'ओ', remington: 'ं', remingtonShift: 'ा', finger: 'LP' },
    { code: 'KeyS', key: 's', shiftKey: 'S', inscript: 'े', inscriptShift: 'ए', remington: 'े', remingtonShift: 'ै', finger: 'LR' },
    { code: 'KeyD', key: 'd', shiftKey: 'D', inscript: '्', inscriptShift: 'अ', remington: 'क', remingtonShift: 'क्', finger: 'LM' },
    { code: 'KeyF', key: 'f', shiftKey: 'F', inscript: 'ि', inscriptShift: 'इ', remington: 'ि', remingtonShift: 'थ', finger: 'LI', homeBump: true },
    { code: 'KeyG', key: 'g', shiftKey: 'G', inscript: 'ु', inscriptShift: 'उ', remington: 'ह', remingtonShift: 'भ', finger: 'LI' },
    { code: 'KeyH', key: 'h', shiftKey: 'H', inscript: 'प', inscriptShift: 'फ', remington: 'ी', remingtonShift: 'भ्', finger: 'RI' },
    { code: 'KeyJ', key: 'j', shiftKey: 'J', inscript: 'र', inscriptShift: 'ऱ', remington: 'र', remingtonShift: 'श्र', finger: 'RI', homeBump: true },
    { code: 'KeyK', key: 'k', shiftKey: 'K', inscript: 'क', inscriptShift: 'ख', remington: 'ा', remingtonShift: 'ज्ञ', finger: 'RM' },
    { code: 'KeyL', key: 'l', shiftKey: 'L', inscript: 'त', inscriptShift: 'थ', remington: 'स', remingtonShift: 'स्', finger: 'RR' },
    { code: 'Semicolon', key: ';', shiftKey: ':', inscript: 'च', inscriptShift: 'छ', remington: 'य', remingtonShift: 'श्', finger: 'RP' },
    { code: 'Quote', key: "'", shiftKey: '"', inscript: 'ट', inscriptShift: 'ठ', remington: 'श', remingtonShift: 'ष्', finger: 'RP' },
    { code: 'Enter', label: 'Enter', width: 'w-20 sm:w-24', special: true, finger: 'RP' },
  ],
  [
    { code: 'ShiftLeft', label: 'Shift', width: 'w-20 sm:w-24', special: true, finger: 'LP' },
    { code: 'KeyZ', key: 'z', shiftKey: 'Z', inscript: 'ॆ', inscriptShift: 'ऒ', remington: '्र', remingtonShift: 'र्', finger: 'LP' },
    { code: 'KeyX', key: 'x', shiftKey: 'X', inscript: 'ं', inscriptShift: 'ँ', remington: 'ग', remingtonShift: 'ग्', finger: 'LR' },
    { code: 'KeyC', key: 'c', shiftKey: 'C', inscript: 'म', inscriptShift: 'ण', remington: 'ब', remingtonShift: 'ब्', finger: 'LM' },
    { code: 'KeyV', key: 'v', shiftKey: 'V', inscript: 'न', inscriptShift: 'ऩ', remington: 'अ', remingtonShift: 'ट', finger: 'LI' },
    { code: 'KeyB', key: 'b', shiftKey: 'B', inscript: 'व', inscriptShift: 'ऴ', remington: 'इ', remingtonShift: 'ठ', finger: 'LI' },
    { code: 'KeyN', key: 'n', shiftKey: 'N', inscript: 'ल', inscriptShift: 'ळ', remington: 'द', remingtonShift: 'छ', finger: 'RI' },
    { code: 'KeyM', key: 'm', shiftKey: 'M', inscript: 'स', inscriptShift: 'श', remington: 'उ', remingtonShift: 'ड', finger: 'RI' },
    { code: 'Comma', key: ',', shiftKey: '<', inscript: ',', inscriptShift: 'ष', remington: 'ए', remingtonShift: 'ढ', finger: 'RM' },
    { code: 'Period', key: '.', shiftKey: '>', inscript: '.', inscriptShift: '।', remington: 'ण्', remingtonShift: 'झ', finger: 'RR' },
    { code: 'Slash', key: '/', shiftKey: '?', inscript: 'य', inscriptShift: '?', remington: 'ध', remingtonShift: 'ध्', finger: 'RP' },
    { code: 'ShiftRight', label: 'Shift', width: 'w-20 sm:w-24', special: true, finger: 'RP' },
  ],
  [
    { code: 'Space', key: ' ', shiftKey: ' ', inscript: ' ', inscriptShift: ' ', remington: ' ', remingtonShift: ' ', label: 'Spacebar', width: 'flex-1', special: false, finger: 'SPACE' },
  ],
];

// Reverse lookups
const REVERSE_INSCRIPT_MAP = {};
Object.entries(INSCRIPT_NORMAL).forEach(([k, v]) => {
  REVERSE_INSCRIPT_MAP[v] = { key: k, shift: false, finger: FINGER_MAP[k] };
});
Object.entries(INSCRIPT_SHIFT).forEach(([k, v]) => {
  REVERSE_INSCRIPT_MAP[v] = { key: k.toLowerCase(), shift: true, finger: FINGER_MAP[k] };
});

// Special multi-char or conjunct shortcuts in InScript
const SPECIAL_CONJUNCTS = {
  'क्ष': { key: '7', shift: true, finger: 'RI', label: 'Shift + 7 (&)' },
  'त्र': { key: '6', shift: true, finger: 'RI', label: 'Shift + 6 (^)' },
  'ज्ञ': { key: '5', shift: true, finger: 'LI', label: 'Shift + 5 (%)' },
  'श्र': { key: '8', shift: true, finger: 'RM', label: 'Shift + 8 (*)' },
  '।': { key: '.', shift: true, finger: 'RR', label: 'Shift + . (>)' },
  'ँ': { key: 'x', shift: true, finger: 'LR', label: 'Shift + X' },
  'ः': { key: '-', shift: true, finger: 'RP', label: 'Shift + - (_)' },
  'ऋ': { key: '=', shift: true, finger: 'RP', label: 'Shift + =' },
};

export function findKeyForChar(char, language = 'english') {
  if (language === 'hindi') {
    if (char === ' ') return { key: ' ', shift: false, finger: 'SPACE', code: 'Space', label: 'Spacebar' };
    if (SPECIAL_CONJUNCTS[char]) {
      return SPECIAL_CONJUNCTS[char];
    }
    const found = REVERSE_INSCRIPT_MAP[char];
    if (found) {
      return found;
    }
    return { key: char.toLowerCase(), shift: char !== char.toLowerCase(), finger: FINGER_MAP[char] || 'RI' };
  } else {
    // English
    if (char === ' ') return { key: ' ', shift: false, finger: 'SPACE', code: 'Space', label: 'Spacebar' };
    const isShift = (char >= 'A' && char <= 'Z') || '~!@#$%^&*()_+{}|:"<>?'.includes(char);
    const finger = FINGER_MAP[char] || 'RI';
    return { key: char.toLowerCase(), shift: isShift, finger };
  }
}

// Keystroke Decomposition helper for Hindi InScript:
// Breaks down any word or sequence into the exact series of keystrokes needed!
export function getHindiKeystrokeBreakdown(word) {
  if (!word) return [];
  const breakdown = [];

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const info = findKeyForChar(char, 'hindi');
    const finger = FINGER_INFO[info.finger] || FINGER_INFO['RI'];
    breakdown.push({
      char,
      key: info.key,
      shift: info.shift,
      fingerName: finger.hindiName,
      fingerColor: finger.color,
    });
  }

  return breakdown;
}
