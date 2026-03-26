import { useState } from "react";
import ChordPlayer from "./components/ChordPlayer";
import { playChordNow } from "./utils/audioUtils";

export default function App() {
  const [progression, setProgression] = useState<string[]>([]);

  const addChord = (chord: string) => {
    setProgression(prev => [...prev, chord]);
  };

  const removeChord = (index: number) => {
    setProgression(prev => prev.filter((_, i) => i !== index));
  }

  const reset = () => setProgression([]);

  const moveRight = (index: number) => {
    setProgression(prev => {
      if (index >= prev.length - 1) return prev;
      const newArr = [...prev];
      const temp = newArr[index];
      newArr[index] = newArr[index + 1];
      newArr[index + 1] = temp;
      return newArr;
    });
  };

  const moveLeft = (index: number) => {
    setProgression(prev => {
      if (index <= 0) return prev;
      const newArr = [...prev];
      const temp = newArr[index];
      newArr[index] = newArr[index - 1];
      newArr[index - 1] = temp;
      return newArr;
    });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🎹 Chord Player</h1>

      <ChordPlayer progression={progression} addChord={addChord} />

      <h2>Progression:</h2>
      <div>
  {progression.map((chord, index) => (
    <span
      key={index}
      style={{
        border: "1px solid black",
        padding: "5px 10px",
        margin: "5px",
        display: "inline-flex",
        alignItems: "center",
        gap: "5px"
      }}
    >
      {chord}
      <button 
        onClick={() => moveLeft(index)}
        disabled={index === 0}
        style={{
          opacity: index === 0 ? 0.5 : 1,
          cursor: index === 0 ? "not-allowed" : "pointer"
        }}
      >←</button>
      <button 
        onClick={() => moveRight(index)}
        disabled={index === progression.length - 1}
        style={{
          opacity: index === progression.length - 1 ? 0.5 : 1,
          cursor: index === progression.length - 1 ? "not-allowed": "pointer"
        }}
      >→</button>
      <button onClick={() => removeChord(index)}>×</button>

      <button onClick={() => playChordNow(chord)}>▶️</button>
    </span>
  ))}
</div>

      <button onClick={reset} style={{ marginTop: "10px" }}>Reset</button>
    </div>
  );
}