/**
 * Kruti Dev 010 Remington Typewriter Keyboard Specification
 * Standard layout for CPCT, SSC, High Court, and Indian Government typing examinations.
 *
 * Fully typed in TypeScript (compatible with Vite / TS / JS tooling).
 */

export interface FingerInfo {
  id: string;
  name: string;
  hindiName: string;
  color: string;
  bg: string;
  text: string;
  hand: 'left' | 'right' | 'both';
}

export interface KeyDef {
  code: string;
  key?: string;
  shiftKey?: string;
  krutiDev?: string;
  krutiDevShift?: string;
  label?: string;
  width?: string;
  special?: boolean;
  finger?: string;
  homeBump?: boolean;
}

export interface TargetKeyInfo {
  key: string;
  code?: string;
  shift: boolean;
  finger: string;
  glyph?: string;
  label?: string;
}

export interface KrutiDevToken {
  key: string;
  shift: boolean;
  glyph: string;
  finger: string;
  raw?: string;
}

// ---------------------------------------------------------------------------
// 1. EXACT KRUTI DEV 010 NORMAL MAPPINGS
// ---------------------------------------------------------------------------
export const KRUTI_DEV_NORMAL: Record<string, string> = {
  // Number row
  '`': '`',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '0': '0',
  '-': '-',
  '=': '=',

  // Top row
  'q': 'ु',  // chhota u matra
  'w': 'ू',  // bada u matra
  'e': 'म',  // ma
  'r': 'त',  // ta
  't': 'ज',  // ja
  'y': 'ल',  // la
  'u': 'न',  // na
  'i': 'प',  // pa
  'o': 'व',  // va
  'p': 'च',  // cha
  '[': 'ख',  // kha
  ']': ',',  // comma
  '\\': '.', // period

  // Home row
  'a': 'ं',  // anusvara
  's': 'े',  // e matra
  'd': 'क',  // ka
  'f': 'ि',  // chhoti ee matra (pressed BEFORE consonant)
  'g': 'ह',  // ha
  'h': 'ी',  // badi ee matra
  'j': 'र',  // ra
  'k': 'ा',  // aa matra
  'l': 'स',  // sa
  ';': 'य',  // ya
  "'": 'श',  // sha

  // Bottom row
  'z': '्र',  // ra-phalan
  'x': 'ग',  // ga
  'c': 'ब',  // ba
  'v': 'अ',  // a vowel
  'b': 'इ',  // i vowel
  'n': 'द',  // da
  'm': 'उ',  // u vowel
  ',': 'ए',  // e vowel
  '.': '्',  // halant
  '/': 'ध',  // dha

  // Space
  ' ': ' ',
};

// ---------------------------------------------------------------------------
// 2. EXACT KRUTI DEV 010 SHIFT MAPPINGS
// ---------------------------------------------------------------------------
export const KRUTI_DEV_SHIFT: Record<string, string> = {
  // Number row shifted
  '~': '~',
  '!': '्',  // halant
  '@': '़',  // nukta
  '#': 'र्',  // reph
  '$': '+',
  '%': ':',
  '^': "'",
  '&': '-',
  '*': '"',
  '(': ';',
  ')': 'द्ध',
  '_': 'ऋ',  // ri vowel
  '+': 'त्र', // tra

  // Top row shifted
  'Q': 'फ',  // pha
  'W': 'ॅ',  // candra e
  'E': 'म्',  // half-ma
  'R': 'त्',  // half-ta
  'T': 'ज्',  // half-ja
  'Y': 'ल्',  // half-la
  'U': 'न्',  // half-na
  'I': 'प्',  // half-pa
  'O': 'व्',  // half-va
  'P': 'च्',  // half-cha
  '{': 'क्ष', // ksha
  '}': 'द्व', // dva
  '|': 'द्य', // dya

  // Home row shifted
  'A': '।',  // purna viram (danda)
  'S': 'ै',  // ai matra
  'D': 'क्',  // half-ka
  'F': 'थ',  // tha (or half-tha)
  'G': 'भ',  // bha
  'H': 'भ्',  // half-bha
  'J': 'श्र', // shra
  'K': 'ज्ञ', // gya
  'L': 'स्',  // half-sa
  ':': 'रू',  // roo
  '"': 'ष्',  // shha

  // Bottom row shifted
  'Z': 'र्',  // reph
  'X': 'ग्',  // half-ga
  'C': 'ब्',  // half-ba
  'V': 'ट',  // tta
  'B': 'ठ',  // ttha
  'N': 'ड',  // dda
  'M': 'ढ',  // ddha
  '<': 'ृ',  // ri matra
  '>': 'ड़',  // nukta dda
  '?': 'ध्',  // half-dha

  // Space
  ' ': ' ',
};

// ---------------------------------------------------------------------------
// 3. FINGER DEFINITIONS & REMINGTON TOUCH-TYPING ASSIGNMENTS
// ---------------------------------------------------------------------------
export const FINGER_INFO: Record<string, FingerInfo> = {
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

export const FINGER_MAP: Record<string, string> = {
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

// ---------------------------------------------------------------------------
// 4. KEYBOARD PHYSICAL LAYOUT ROWS (KRUTI DEV 010)
// ---------------------------------------------------------------------------
export const KEYBOARD_ROWS: KeyDef[][] = [
  // Number row
  [
    { code: 'Backquote', key: '`', shiftKey: '~', krutiDev: '`', krutiDevShift: '~', finger: 'LP' },
    { code: 'Digit1', key: '1', shiftKey: '!', krutiDev: '1', krutiDevShift: '्', finger: 'LP' },
    { code: 'Digit2', key: '2', shiftKey: '@', krutiDev: '2', krutiDevShift: '़', finger: 'LR' },
    { code: 'Digit3', key: '3', shiftKey: '#', krutiDev: '3', krutiDevShift: 'र्', finger: 'LM' },
    { code: 'Digit4', key: '4', shiftKey: '$', krutiDev: '4', krutiDevShift: '+', finger: 'LI' },
    { code: 'Digit5', key: '5', shiftKey: '%', krutiDev: '5', krutiDevShift: ':', finger: 'LI' },
    { code: 'Digit6', key: '6', shiftKey: '^', krutiDev: '6', krutiDevShift: "'", finger: 'RI' },
    { code: 'Digit7', key: '7', shiftKey: '&', krutiDev: '7', krutiDevShift: '-', finger: 'RI' },
    { code: 'Digit8', key: '8', shiftKey: '*', krutiDev: '8', krutiDevShift: '"', finger: 'RM' },
    { code: 'Digit9', key: '9', shiftKey: '(', krutiDev: '9', krutiDevShift: ';', finger: 'RR' },
    { code: 'Digit0', key: '0', shiftKey: ')', krutiDev: '0', krutiDevShift: 'द्ध', finger: 'RP' },
    { code: 'Minus', key: '-', shiftKey: '_', krutiDev: '-', krutiDevShift: 'ऋ', finger: 'RP' },
    { code: 'Equal', key: '=', shiftKey: '+', krutiDev: '=', krutiDevShift: 'त्र', finger: 'RP' },
    { code: 'Backspace', label: 'Backspace', width: 'w-16 sm:w-20', special: true, finger: 'RP' },
  ],
  // Top row
  [
    { code: 'Tab', label: 'Tab', width: 'w-14 sm:w-16', special: true, finger: 'LP' },
    { code: 'KeyQ', key: 'q', shiftKey: 'Q', krutiDev: 'ु', krutiDevShift: 'फ', finger: 'LP' },
    { code: 'KeyW', key: 'w', shiftKey: 'W', krutiDev: 'ू', krutiDevShift: 'ॅ', finger: 'LR' },
    { code: 'KeyE', key: 'e', shiftKey: 'E', krutiDev: 'म', krutiDevShift: 'म्', finger: 'LM' },
    { code: 'KeyR', key: 'r', shiftKey: 'R', krutiDev: 'त', krutiDevShift: 'त्', finger: 'LI' },
    { code: 'KeyT', key: 't', shiftKey: 'T', krutiDev: 'ज', krutiDevShift: 'ज्', finger: 'LI' },
    { code: 'KeyY', key: 'y', shiftKey: 'Y', krutiDev: 'ल', krutiDevShift: 'ल्', finger: 'RI' },
    { code: 'KeyU', key: 'u', shiftKey: 'U', krutiDev: 'न', krutiDevShift: 'न्', finger: 'RI' },
    { code: 'KeyI', key: 'i', shiftKey: 'I', krutiDev: 'प', krutiDevShift: 'प्', finger: 'RM' },
    { code: 'KeyO', key: 'o', shiftKey: 'O', krutiDev: 'व', krutiDevShift: 'व्', finger: 'RR' },
    { code: 'KeyP', key: 'p', shiftKey: 'P', krutiDev: 'च', krutiDevShift: 'च्', finger: 'RP' },
    { code: 'BracketLeft', key: '[', shiftKey: '{', krutiDev: 'ख', krutiDevShift: 'क्ष', finger: 'RP' },
    { code: 'BracketRight', key: ']', shiftKey: '}', krutiDev: ',', krutiDevShift: 'द्व', finger: 'RP' },
    { code: 'Backslash', key: '\\', shiftKey: '|', krutiDev: '.', krutiDevShift: 'द्य', finger: 'RP' },
  ],
  // Home row
  [
    { code: 'CapsLock', label: 'Caps Lock', width: 'w-16 sm:w-20', special: true, finger: 'LP' },
    { code: 'KeyA', key: 'a', shiftKey: 'A', krutiDev: 'ं', krutiDevShift: '।', finger: 'LP' },
    { code: 'KeyS', key: 's', shiftKey: 'S', krutiDev: 'े', krutiDevShift: 'ै', finger: 'LR' },
    { code: 'KeyD', key: 'd', shiftKey: 'D', krutiDev: 'क', krutiDevShift: 'क्', finger: 'LM' },
    { code: 'KeyF', key: 'f', shiftKey: 'F', krutiDev: 'ि', krutiDevShift: 'थ', finger: 'LI', homeBump: true },
    { code: 'KeyG', key: 'g', shiftKey: 'G', krutiDev: 'ह', krutiDevShift: 'भ', finger: 'LI' },
    { code: 'KeyH', key: 'h', shiftKey: 'H', krutiDev: 'ी', krutiDevShift: 'भ्', finger: 'RI' },
    { code: 'KeyJ', key: 'j', shiftKey: 'J', krutiDev: 'र', krutiDevShift: 'श्र', finger: 'RI', homeBump: true },
    { code: 'KeyK', key: 'k', shiftKey: 'K', krutiDev: 'ा', krutiDevShift: 'ज्ञ', finger: 'RM' },
    { code: 'KeyL', key: 'l', shiftKey: 'L', krutiDev: 'स', krutiDevShift: 'स्', finger: 'RR' },
    { code: 'Semicolon', key: ';', shiftKey: ':', krutiDev: 'य', krutiDevShift: 'रू', finger: 'RP' },
    { code: 'Quote', key: "'", shiftKey: '"', krutiDev: 'श', krutiDevShift: 'ष्', finger: 'RP' },
    { code: 'Enter', label: 'Enter', width: 'w-20 sm:w-24', special: true, finger: 'RP' },
  ],
  // Bottom row
  [
    { code: 'ShiftLeft', label: 'Shift', width: 'w-20 sm:w-24', special: true, finger: 'LP' },
    { code: 'KeyZ', key: 'z', shiftKey: 'Z', krutiDev: '्र', krutiDevShift: 'र्', finger: 'LP' },
    { code: 'KeyX', key: 'x', shiftKey: 'X', krutiDev: 'ग', krutiDevShift: 'ग्', finger: 'LR' },
    { code: 'KeyC', key: 'c', shiftKey: 'C', krutiDev: 'ब', krutiDevShift: 'ब्', finger: 'LM' },
    { code: 'KeyV', key: 'v', shiftKey: 'V', krutiDev: 'अ', krutiDevShift: 'ट', finger: 'LI' },
    { code: 'KeyB', key: 'b', shiftKey: 'B', krutiDev: 'इ', krutiDevShift: 'ठ', finger: 'LI' },
    { code: 'KeyN', key: 'n', shiftKey: 'N', krutiDev: 'द', krutiDevShift: 'ड', finger: 'RI' },
    { code: 'KeyM', key: 'm', shiftKey: 'M', krutiDev: 'उ', krutiDevShift: 'ढ', finger: 'RI' },
    { code: 'Comma', key: ',', shiftKey: '<', krutiDev: 'ए', krutiDevShift: 'ृ', finger: 'RM' },
    { code: 'Period', key: '.', shiftKey: '>', krutiDev: '्', krutiDevShift: 'ड़', finger: 'RR' },
    { code: 'Slash', key: '/', shiftKey: '?', krutiDev: 'ध', krutiDevShift: 'ध्', finger: 'RP' },
    { code: 'ShiftRight', label: 'Shift', width: 'w-20 sm:w-24', special: true, finger: 'RP' },
  ],
  // Space row
  [
    { code: 'Space', key: ' ', shiftKey: ' ', krutiDev: ' ', krutiDevShift: ' ', label: 'Spacebar', width: 'flex-1', special: false, finger: 'SPACE' },
  ],
];

// ---------------------------------------------------------------------------
// 5. REVERSE LOOKUP MAP FOR DIRECT GLYPHS
// ---------------------------------------------------------------------------
export const REVERSE_KRUTI_DEV_MAP: Record<string, TargetKeyInfo> = {};

KEYBOARD_ROWS.forEach((row) => {
  row.forEach((k) => {
    if (k.key && k.krutiDev) {
      REVERSE_KRUTI_DEV_MAP[k.krutiDev] = {
        key: k.key,
        code: k.code,
        shift: false,
        finger: k.finger || 'RI',
        glyph: k.krutiDev,
      };
    }
    if (k.key && k.krutiDevShift) {
      REVERSE_KRUTI_DEV_MAP[k.krutiDevShift] = {
        key: k.key.toLowerCase(),
        code: k.code,
        shift: true,
        finger: k.finger || 'RI',
        glyph: k.krutiDevShift,
      };
    }
  });
});

// ---------------------------------------------------------------------------
// 6. PHONETIC / UNICODE DECOMPOSITION TO KRUTI DEV 010 KEYSTROKES
// Handles the classic 'Chhoti ee' (f before consonant), half-letters, and Reph
// ---------------------------------------------------------------------------
const HALF_CONSONANT_MAP: Record<string, KrutiDevToken> = {
  'क्': { key: 'd', shift: true, glyph: 'क्', finger: 'LM' },
  'ख्': { key: '[', shift: true, glyph: 'ख्', finger: 'RP' },
  'ग्': { key: 'x', shift: true, glyph: 'ग्', finger: 'LR' },
  'घ्': { key: '?', shift: true, glyph: 'घ्', finger: 'RP' },
  'च्': { key: 'p', shift: true, glyph: 'च्', finger: 'RP' },
  'ज्': { key: 't', shift: true, glyph: 'ज्', finger: 'LI' },
  'त्': { key: 'r', shift: true, glyph: 'त्', finger: 'LI' },
  'थ्': { key: 'f', shift: true, glyph: 'थ्', finger: 'LI' },
  'ध्': { key: '/', shift: true, glyph: 'ध्', finger: 'RP' },
  'न्': { key: 'u', shift: true, glyph: 'न्', finger: 'RI' },
  'प्': { key: 'i', shift: true, glyph: 'प्', finger: 'RM' },
  'फ्': { key: 'q', shift: true, glyph: 'फ्', finger: 'LP' },
  'ब्': { key: 'c', shift: true, glyph: 'ब्', finger: 'LM' },
  'भ्': { key: 'h', shift: true, glyph: 'भ्', finger: 'RI' },
  'म्': { key: 'e', shift: true, glyph: 'म्', finger: 'LM' },
  'ल्': { key: 'y', shift: true, glyph: 'ल्', finger: 'RI' },
  'व्': { key: 'o', shift: true, glyph: 'व्', finger: 'RR' },
  'श्': { key: ';', shift: true, glyph: 'श्', finger: 'RP' },
  'ष्': { key: "'", shift: true, glyph: 'ष्', finger: 'RP' },
  'स्': { key: 'l', shift: true, glyph: 'स्', finger: 'RR' },
};

const FULL_CONSONANT_MAP: Record<string, KrutiDevToken> = {
  'क': { key: 'd', shift: false, glyph: 'क', finger: 'LM' },
  'ख': { key: '[', shift: false, glyph: 'ख', finger: 'RP' },
  'ग': { key: 'x', shift: false, glyph: 'ग', finger: 'LR' },
  'घ': { key: '?', shift: false, glyph: 'घ', finger: 'RP' },
  'च': { key: 'p', shift: false, glyph: 'च', finger: 'RP' },
  'छ': { key: 'C', shift: true, glyph: 'छ', finger: 'LM' },
  'ज': { key: 't', shift: false, glyph: 'ज', finger: 'LI' },
  'झ': { key: '>', shift: true, glyph: 'झ', finger: 'RR' },
  'ट': { key: 'v', shift: true, glyph: 'ट', finger: 'LI' },
  'ठ': { key: 'b', shift: true, glyph: 'ठ', finger: 'LI' },
  'ड': { key: 'n', shift: true, glyph: 'ड', finger: 'RI' },
  'ढ': { key: 'm', shift: true, glyph: 'ढ', finger: 'RI' },
  'ण': { key: '.', shift: false, glyph: 'ण', finger: 'RR' },
  'त': { key: 'r', shift: false, glyph: 'त', finger: 'LI' },
  'थ': { key: 'f', shift: true, glyph: 'थ', finger: 'LI' },
  'द': { key: 'n', shift: false, glyph: 'द', finger: 'RI' },
  'ध': { key: '/', shift: false, glyph: 'ध', finger: 'RP' },
  'न': { key: 'u', shift: false, glyph: 'न', finger: 'RI' },
  'प': { key: 'i', shift: false, glyph: 'प', finger: 'RM' },
  'फ': { key: 'q', shift: true, glyph: 'फ', finger: 'LP' },
  'ब': { key: 'c', shift: false, glyph: 'ब', finger: 'LM' },
  'भ': { key: 'g', shift: true, glyph: 'भ', finger: 'LI' },
  'म': { key: 'e', shift: false, glyph: 'म', finger: 'LM' },
  'य': { key: ';', shift: false, glyph: 'य', finger: 'RP' },
  'र': { key: 'j', shift: false, glyph: 'र', finger: 'RI' },
  'ल': { key: 'y', shift: false, glyph: 'ल', finger: 'RI' },
  'व': { key: 'o', shift: false, glyph: 'व', finger: 'RR' },
  'श': { key: "'", shift: false, glyph: 'श', finger: 'RP' },
  'ष': { key: "'", shift: true, glyph: 'ष्', finger: 'RP' },
  'स': { key: 'l', shift: false, glyph: 'स', finger: 'RR' },
  'ह': { key: 'g', shift: false, glyph: 'ह', finger: 'LI' },
  'क्ष': { key: '[', shift: true, glyph: 'क्ष', finger: 'RP' },
  'त्र': { key: '=', shift: true, glyph: 'त्र', finger: 'RP' },
  'ज्ञ': { key: 'k', shift: true, glyph: 'ज्ञ', finger: 'RM' },
  'श्र': { key: 'j', shift: true, glyph: 'श्र', finger: 'RI' },
  'द्व': { key: ']', shift: true, glyph: 'द्व', finger: 'RP' },
  'द्य': { key: '\\', shift: true, glyph: 'द्य', finger: 'RP' },
  'द्ध': { key: '0', shift: true, glyph: 'द्ध', finger: 'RP' },
  'ड़': { key: '.', shift: true, glyph: 'ड़', finger: 'RR' },
  'ढ़': { key: 'm', shift: true, glyph: 'ढ़', finger: 'RI' },
};

const INDEPENDENT_VOWEL_MAP: Record<string, KrutiDevToken[]> = {
  'अ': [{ key: 'v', shift: false, glyph: 'अ', finger: 'LI' }],
  'आ': [{ key: 'v', shift: false, glyph: 'अ', finger: 'LI' }, { key: 'k', shift: false, glyph: 'ा', finger: 'RM' }],
  'इ': [{ key: 'b', shift: false, glyph: 'इ', finger: 'LI' }],
  'ई': [{ key: 'b', shift: false, glyph: 'इ', finger: 'LI' }, { key: 'z', shift: true, glyph: 'र्', finger: 'LP' }],
  'उ': [{ key: 'm', shift: false, glyph: 'उ', finger: 'RI' }],
  'ऊ': [{ key: 'm', shift: false, glyph: 'उ', finger: 'RI' }, { key: 'w', shift: false, glyph: 'ू', finger: 'LR' }],
  'ए': [{ key: ',', shift: false, glyph: 'ए', finger: 'RM' }],
  'ऐ': [{ key: ',', shift: false, glyph: 'ए', finger: 'RM' }, { key: 's', shift: false, glyph: 'े', finger: 'LR' }],
  'ओ': [{ key: 'v', shift: false, glyph: 'अ', finger: 'LI' }, { key: 'k', shift: false, glyph: 'ा', finger: 'RM' }, { key: 's', shift: false, glyph: 'े', finger: 'LR' }],
  'औ': [{ key: 'v', shift: false, glyph: 'अ', finger: 'LI' }, { key: 'k', shift: false, glyph: 'ा', finger: 'RM' }, { key: 's', shift: true, glyph: 'ै', finger: 'LR' }],
  'ऋ': [{ key: '-', shift: true, glyph: 'ऋ', finger: 'RP' }],
};

const MATRA_MAP: Record<string, KrutiDevToken[]> = {
  'ा': [{ key: 'k', shift: false, glyph: 'ा', finger: 'RM' }],
  'ी': [{ key: 'h', shift: false, glyph: 'ी', finger: 'RI' }],
  'ु': [{ key: 'q', shift: false, glyph: 'ु', finger: 'LP' }],
  'ू': [{ key: 'w', shift: false, glyph: 'ू', finger: 'LR' }],
  'ृ': [{ key: ',', shift: true, glyph: 'ृ', finger: 'RM' }],
  'े': [{ key: 's', shift: false, glyph: 'े', finger: 'LR' }],
  'ै': [{ key: 's', shift: true, glyph: 'ै', finger: 'LR' }],
  'ो': [{ key: 'k', shift: false, glyph: 'ा', finger: 'RM' }, { key: 's', shift: false, glyph: 'े', finger: 'LR' }],
  'ौ': [{ key: 'k', shift: false, glyph: 'ा', finger: 'RM' }, { key: 's', shift: true, glyph: 'ै', finger: 'LR' }],
  'ं': [{ key: 'a', shift: false, glyph: 'ं', finger: 'LP' }],
  'ँ': [{ key: 'w', shift: true, glyph: 'ँ', finger: 'LR' }],
  'ः': [{ key: '5', shift: true, glyph: 'ः', finger: 'LI' }],
  '़': [{ key: '2', shift: true, glyph: '़', finger: 'LR' }],
  '्': [{ key: '.', shift: false, glyph: '्', finger: 'RR' }],
  '।': [{ key: 'a', shift: true, glyph: '।', finger: 'LP' }],
};

/**
 * Tokenize Unicode Devanagari into the exact sequential Kruti Dev keystrokes.
 * Ensures 'ि' (chhoti ee) is struck BEFORE its consonant and reph is struck AFTER.
 */
export function tokenizeDevanagariToKrutiDev(text: string): KrutiDevToken[] {
  const norm = (text || '').normalize('NFC');
  const tokens: KrutiDevToken[] = [];
  let i = 0;

  while (i < norm.length) {
    const ch = norm[i];

    // Space or whitespace
    if (ch === ' ' || ch === '\t' || ch === '\n') {
      tokens.push({ key: ' ', shift: false, glyph: ' ', finger: 'SPACE', raw: ch });
      i++;
      continue;
    }

    // Direct English characters
    if (ch >= 'a' && ch <= 'z') {
      tokens.push({ key: ch, shift: false, glyph: ch, finger: FINGER_MAP[ch] || 'LI', raw: ch });
      i++;
      continue;
    }
    if (ch >= 'A' && ch <= 'Z') {
      tokens.push({ key: ch.toLowerCase(), shift: true, glyph: ch, finger: FINGER_MAP[ch.toLowerCase()] || 'LI', raw: ch });
      i++;
      continue;
    }
    if (ch >= '0' && ch <= '9') {
      tokens.push({ key: ch, shift: false, glyph: ch, finger: FINGER_MAP[ch] || 'LP', raw: ch });
      i++;
      continue;
    }

    // Purna Viram
    if (ch === '।' || ch === '|') {
      tokens.push({ key: 'a', shift: true, glyph: '।', finger: 'LP', raw: ch });
      i++;
      continue;
    }

    // Reph at start of cluster (र् + consonant), e.g. "कर्म" -> d (क) + e (म) + Z (र्)
    if (ch === 'र' && i + 1 < norm.length && norm[i + 1] === '्' && i + 2 < norm.length && FULL_CONSONANT_MAP[norm[i + 2]]) {
      const nextConsonant = norm[i + 2];
      const consonantToken = FULL_CONSONANT_MAP[nextConsonant];
      tokens.push({ ...consonantToken, raw: nextConsonant });
      i += 3;

      // Matra on consonant
      if (i < norm.length && MATRA_MAP[norm[i]]) {
        const matraTokens = MATRA_MAP[norm[i]];
        tokens.push(...matraTokens.map(m => ({ ...m, raw: norm[i] })));
        i++;
      }

      // Reph (Z)
      tokens.push({ key: 'z', shift: true, glyph: 'र्', finger: 'LP', raw: 'र्' });
      continue;
    }

    // Consonants and half-consonants
    if (ch in FULL_CONSONANT_MAP || ch in HALF_CONSONANT_MAP) {
      // Check half consonant
      if (i + 1 < norm.length && norm[i + 1] === '्') {
        const pair = ch + '्';
        if (pair in HALF_CONSONANT_MAP) {
          const halfToken = HALF_CONSONANT_MAP[pair];
          // Check if followed by consonant + 'ि' (e.g. स्थिति)
          if (i + 2 < norm.length && FULL_CONSONANT_MAP[norm[i + 2]] && i + 3 < norm.length && norm[i + 3] === 'ि') {
            tokens.push({ ...halfToken, raw: pair });
            tokens.push({ key: 'f', shift: false, glyph: 'ि', finger: 'LI', raw: 'ि' });
            tokens.push({ ...FULL_CONSONANT_MAP[norm[i + 2]], raw: norm[i + 2] });
            i += 4;
            continue;
          } else {
            // Standalone half consonant
            tokens.push({ ...halfToken, raw: pair });
            i += 2;
            continue;
          }
        }
      }

      // Check Chhoti ee ('ि'): user presses 'f' FIRST, then the consonant
      if (i + 1 < norm.length && norm[i + 1] === 'ि') {
        tokens.push({ key: 'f', shift: false, glyph: 'ि', finger: 'LI', raw: 'ि' });
        tokens.push({ ...FULL_CONSONANT_MAP[ch], raw: ch });
        i += 2;

        // Ra-phalan check (e.g. क्रि)
        if (i < norm.length && norm[i] === '्' && i + 1 < norm.length && norm[i + 1] === 'र') {
          tokens.push({ key: 'z', shift: false, glyph: '्र', finger: 'LP', raw: '्र' });
          i += 2;
        }
        continue;
      }

      // Check Ra-phalan ('्' + 'र', e.g. क्रम)
      if (i + 1 < norm.length && norm[i + 1] === '्' && i + 2 < norm.length && norm[i + 2] === 'र') {
        tokens.push({ ...FULL_CONSONANT_MAP[ch], raw: ch });
        tokens.push({ key: 'z', shift: false, glyph: '्र', finger: 'LP', raw: '्र' });
        i += 3;
        continue;
      }

      // Single full consonant
      tokens.push({ ...FULL_CONSONANT_MAP[ch], raw: ch });
      i++;
      continue;
    }

    // Independent Vowels
    if (ch in INDEPENDENT_VOWEL_MAP) {
      const vTokens = INDEPENDENT_VOWEL_MAP[ch];
      tokens.push(...vTokens.map(v => ({ ...v, raw: ch })));
      i++;
      continue;
    }

    // Matras
    if (ch in MATRA_MAP) {
      const mTokens = MATRA_MAP[ch];
      tokens.push(...mTokens.map(m => ({ ...m, raw: ch })));
      i++;
      continue;
    }

    // Direct reverse lookup fallback
    if (REVERSE_KRUTI_DEV_MAP[ch]) {
      const rev = REVERSE_KRUTI_DEV_MAP[ch];
      tokens.push({ key: rev.key, shift: rev.shift, glyph: ch, finger: rev.finger, raw: ch });
      i++;
      continue;
    }

    // Default fallback
    tokens.push({ key: ch.toLowerCase(), shift: ch !== ch.toLowerCase(), glyph: ch, finger: 'LI', raw: ch });
    i++;
  }

  return tokens;
}

/**
 * Find key mapping for any character in either English or Hindi (Kruti Dev 010).
 */
export function findKeyForChar(rawChar: string, language = 'english'): TargetKeyInfo {
  if (!rawChar) return { key: '', shift: false, finger: 'RI' };

  let char = String(rawChar).normalize('NFC');
  if (char === '“' || char === '”') char = '"';
  if (char === '‘' || char === '’') char = "'";
  if (char === '—' || char === '–') char = '-';
  if (char === '…') char = '.';

  if (char === ' ') return { key: ' ', shift: false, finger: 'SPACE', code: 'Space', label: 'Spacebar' };

  if (language === 'hindi') {
    const found = REVERSE_KRUTI_DEV_MAP[char];
    if (found) return found;

    // Tokenize if cluster
    const tokens = tokenizeDevanagariToKrutiDev(char);
    if (tokens.length > 0) {
      return {
        key: tokens[0].key,
        shift: tokens[0].shift,
        finger: tokens[0].finger,
        glyph: tokens[0].glyph,
      };
    }

    return { key: char.toLowerCase(), shift: char !== char.toLowerCase(), finger: FINGER_MAP[char] || 'RI' };
  } else {
    // English
    const isShift = (char >= 'A' && char <= 'Z') || '~!@#$%^&*()_+{}|:"<>?'.includes(char);
    const finger = FINGER_MAP[char] || FINGER_MAP[char.toLowerCase()] || 'RI';
    return { key: char.toLowerCase(), shift: isShift, finger };
  }
}

/**
 * Sequential breakdown helper for UI display.
 */
export function getHindiKeystrokeBreakdown(word: string) {
  if (!word) return [];
  const tokens = tokenizeDevanagariToKrutiDev(word);
  return tokens.map(t => {
    const fInfo = FINGER_INFO[t.finger] || FINGER_INFO['RI'];
    return {
      char: t.glyph,
      key: t.key,
      shift: t.shift,
      fingerName: fInfo.hindiName,
      fingerColor: fInfo.color,
    };
  });
}
