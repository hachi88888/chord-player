import { useRef, useState } from "react";

import { playChordNow, playChord, playBass, getAudioContext } from "../utils/audioUtils";

type Props = {
  progression: string[];
  addChord: (chord: string) => void;
}

const chords = ["C", "Dm", "Em", "F", "G", "Am"];

export default function ChordPlayer({ progression, addChord }: Props) {
  const loopTimeoutRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const [chordOn, setChordOn] = useState(true);
  const [bassOn, setBassOn] = useState(true);
  const [bpm, setBpm] = useState(100);
  const [isLooping, setIsLooping] = useState(false);


   const playProgression = () => {
    const audioContext = getAudioContext();
    const interval = (60 / bpm);

    progression.forEach((chord, index) => {
      const time = audioContext.currentTime + index * interval;
        if (chordOn) {
        playChord(chord, time);
        }
        if (bassOn) {
        playBass(chord, time);
        }
    });
  };

  const playProgressionLoop = () => {
    if (progression.length === 0) return;
    
    const audioContext = getAudioContext();
    const interval = (60/ bpm);

    if (!startTimeRef.current) {
      startTimeRef.current = audioContext.currentTime;
    }

     progression.forEach((chord, index) => {
      const time = startTimeRef.current! + index * interval;
        if (chordOn) {
        playChord(chord, time);
        }
        if (bassOn) {
          playBass(chord, time);
        }
     });

     startTimeRef.current += progression.length * interval;
     
     loopTimeoutRef.current = window.setTimeout(() => {
      playProgressionLoop();
      }, progression.length * interval * 1000);
  };

  const stopLoop = () => {
    if (loopTimeoutRef.current !== null) {
      clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    startTimeRef.current = null;
    setIsLooping(false);
  }

  const toggleLoop = () => {
    if (isLooping) {
      stopLoop();
    } else {
      setIsLooping(true);
      playProgressionLoop();
    }
  }

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input 
            type="checkbox" 
            checked={chordOn} 
            onChange={() => setChordOn(prev => !prev)}
          />
          Chord
        </label>

        <label style={{ marginLeft: "10px" }}>
          <input
            type="checkbox"
            checked={bassOn}
            onChange={() => setBassOn(prev => !prev)}
          />
          Bass
        </label>

        <label>
          BPM: {bpm}
          <input
            type="range"
            min={60}
            max={180}
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>

      <div>
        {chords.map((chord) => (
          <button
            key={chord}
            onClick={() => {
              addChord(chord);
              playChordNow(chord);
            }}
            style={{ margin: "5px" }}
          >
            {chord}
          </button>
        ))}

        <button onClick={playProgression} style={{ margin: "10px" }}>
          ▶️ Play
        </button>

        <button onClick={toggleLoop} style={{ margin: "10px" }}>
          {isLooping ? "⏹ Stop Loop" : "🔁 Start Loop"}
        </button>
      </div>
    </>
  );
}