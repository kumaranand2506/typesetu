// Zero-latency Web Audio API sound synthesizer for tactile mechanical switch feedback
// Supports Cherry MX Blue (crisp click), Cherry MX Brown (tactile bump), and Cherry MX Red (smooth linear clack)

let audioCtx = null;
let switchProfile = 'blue'; // 'blue' | 'brown' | 'red' | 'off'

try {
  const saved = localStorage.getItem('typesetu_switch_profile');
  if (saved) switchProfile = saved;
  else if (localStorage.getItem('typesetu_sound_muted') === 'true') switchProfile = 'off';
} catch (e) {}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundManager = {
  getSwitchProfile() {
    return switchProfile;
  },

  setSwitchProfile(profile) {
    switchProfile = profile;
    try {
      localStorage.setItem('typesetu_switch_profile', profile);
      localStorage.setItem('typesetu_sound_muted', profile === 'off' ? 'true' : 'false');
    } catch (e) {}
  },

  getMuted() {
    return switchProfile === 'off';
  },

  setMuted(muted) {
    this.setSwitchProfile(muted ? 'off' : 'blue');
  },

  toggleMute() {
    const next = switchProfile === 'off' ? 'blue' : 'off';
    this.setSwitchProfile(next);
    return next === 'off';
  },

  // Synthesize tactile mechanical keystroke based on active switch profile
  playClick() {
    if (switchProfile === 'off') return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (switchProfile === 'blue') {
        // Cherry MX Blue: Dual-pulse mechanism:
        // 1. Sharp tactile click leaf snap (high frequency burst ~2600Hz)
        // 2. Plastic slider bottom-out transient (440Hz -> 120Hz exponential drop)
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();
        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(2800, now);
        snapOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.015);
        snapGain.gain.setValueAtTime(0.14, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);
        snapOsc.connect(snapGain);
        snapGain.connect(ctx.destination);
        snapOsc.start(now);
        snapOsc.stop(now + 0.015);

        const thudOsc = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thudOsc.type = 'sine';
        thudOsc.frequency.setValueAtTime(420, now);
        thudOsc.frequency.exponentialRampToValueAtTime(120, now + 0.038);
        thudGain.gain.setValueAtTime(0.22, now);
        thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);
        thudOsc.connect(thudGain);
        thudGain.connect(ctx.destination);
        thudOsc.start(now);
        thudOsc.stop(now + 0.038);

      } else if (switchProfile === 'brown') {
        // Cherry MX Brown: Tactile bump (softer click, mid-frequency resonance ~650Hz -> 180Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.035);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.035);

      } else if (switchProfile === 'red') {
        // Cherry MX Red: Linear smooth clack (no click leaf, low frequency acoustic bottoming-out thud)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.exponentialRampToValueAtTime(75, now + 0.045);
        gain.gain.setValueAtTime(0.24, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.045);
      }
    } catch (e) {}
  },

  // Subtle error buzzer (clean, non-jarring low tone)
  playError() {
    if (switchProfile === 'off') return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  },

  // Paragraph / Lesson Completion chime (Harmonic Major Arpeggio)
  playSuccess() {
    if (switchProfile === 'off') return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        const startTime = ctx.currentTime + idx * 0.08;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.14, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.32);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.32);
      });
    } catch (e) {}
  },

  // Badge unlock celebration fanfare
  playFanfare() {
    if (switchProfile === 'off') return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        const startTime = ctx.currentTime + idx * 0.065;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch (e) {}
  },
};
