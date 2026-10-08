// Kruti Dev 010 Remington Typewriter compatibility bridge
// Re-exports all Kruti Dev 010 mappings and deprecates Inscript completely.

export * from './krutiDevMap';

import {
  KRUTI_DEV_NORMAL,
  KRUTI_DEV_SHIFT,
  REVERSE_KRUTI_DEV_MAP,
  KEYBOARD_ROWS as KD_ROWS,
  FINGER_INFO as KD_FINGERS,
  FINGER_MAP as KD_FINGER_MAP,
  tokenizeDevanagariToKrutiDev,
  findKeyForChar,
  getHindiKeystrokeBreakdown,
} from './krutiDevMap';

// Deprecated InScript aliases mapped strictly to Kruti Dev 010
export const INSCRIPT_NORMAL = KRUTI_DEV_NORMAL;
export const INSCRIPT_SHIFT = KRUTI_DEV_SHIFT;
export const REVERSE_INSCRIPT_MAP = REVERSE_KRUTI_DEV_MAP;

export const REMINGTON_NORMAL = KRUTI_DEV_NORMAL;
export const REMINGTON_SHIFT = KRUTI_DEV_SHIFT;
export const REVERSE_REMINGTON_MAP = REVERSE_KRUTI_DEV_MAP;

export const KEYBOARD_ROWS = KD_ROWS;
export const FINGER_INFO = KD_FINGERS;
export const FINGER_MAP = KD_FINGER_MAP;

export { tokenizeDevanagariToKrutiDev, findKeyForChar, getHindiKeystrokeBreakdown };
