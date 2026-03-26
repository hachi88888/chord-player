const chordNotes: Record<string, number[]> = {
  C: [261.63, 329.63, 392.0], 
  Dm: [293.66, 349.23, 440.0],  
  Em: [329.63, 392.0, 493.88],  
  F: [349.23, 440.0, 523.25], 
  G: [392.0, 493.88, 587.33], 
  Am: [440.0, 523.25, 659.25]
};

let audioContext: AudioContext | null = null;

export const getAudioContext = () => {
  if (!audioContext) audioContext = new AudioContext();
  return audioContext;
}

export const playChord = (chord: string, time: number) => {
  const ctx = getAudioContext();
  const notes = chordNotes[chord];
  if (!notes) return;

  notes.forEach(freq => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);

    osc.start(time);
    osc.stop(time + 0.5);
  });
};

export const playBass = (chord: string, time: number) => {
  const ctx = getAudioContext();
  const notes = chordNotes[chord];
  if (!notes) return;

  const bassFreq = notes[0] / 2;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = bassFreq;

  osc.connect(gain);
  gain.connect(ctx.destination);

  gain.gain.setValueAtTime(0.2, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);

  osc.start(time);
  osc.stop(time + 0.5);
};

export const playChordNow = (chord: string) => {
  const ctx = getAudioContext();
  playChord(chord, ctx.currentTime);
};