// Low-latency Web Audio API sound synthesizer for authentic mechanical switch feedback
// Features pre-warmed AudioContext, synthesized physical impulse profiles for:
// Cherry MX Blue (Clicky), Cherry MX Brown (Tactile), Cherry MX Red (Linear), and Error Buzzer

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

// Pre-warm AudioContext on first user interaction for zero latency
if (typeof window !== 'undefined') {
  const prewarm = () => {
    try {
      const ctx = getAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
    } catch (e) {}
  };
  window.addEventListener('keydown', prewarm, { once: true, passive: true });
  window.addEventListener('pointerdown', prewarm, { once: true, passive: true });
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
        // 1. Sharp tactile click leaf snap (high-frequency burst ~2800Hz -> 1400Hz)
        // 2. Plastic slider bottom-out transient (sine wave drop 420Hz -> 120Hz)
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();
        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(2800, now);
        snapOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.012);
        snapGain.gain.setValueAtTime(0.18, now);
        snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
        snapOsc.connect(snapGain);
        snapGain.connect(ctx.destination);
        snapOsc.start(now);
        snapOsc.stop(now + 0.012);

        const thudOsc = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thudOsc.type = 'sine';
        thudOsc.frequency.setValueAtTime(420, now);
        thudOsc.frequency.exponentialRampToValueAtTime(110, now + 0.035);
        thudGain.gain.setValueAtTime(0.24, now);
        thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        thudOsc.connect(thudGain);
        thudGain.connect(ctx.destination);
        thudOsc.start(now);
        thudOsc.stop(now + 0.035);

      } else if (switchProfile === 'brown') {
        // Cherry MX Brown: Tactile bump (mid-frequency round click ~620Hz -> 180Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(180, now + 0.032);
        gain.gain.setValueAtTime(0.20, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.032);

      } else if (switchProfile === 'red') {
        // Cherry MX Red: Linear smooth clack (acoustic bottom-out thud ~220Hz -> 70Hz)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.040);
        gain.gain.setValueAtTime(0.26, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.040);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.040);
      }
    } catch (e) {}
  },

  // Distinct error sound effect: downward-pitch warning buzz
  playError() {
    if (switchProfile === 'off') return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Filtered low sawtooth buzzer
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
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
        const startTime = ctx.currentTime + idx * 0.075;
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.30);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.30);
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
