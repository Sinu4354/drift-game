
import { useState, useEffect } from "react";
import { days } from "./data";

export default function Game() {
  const [dayIndex, setDayIndex] = useState(0);
  const [screen, setScreen] = useState("wake");
  const [currentRoom, setCurrentRoom] = useState("bedroom");
  const [log, setLog] = useState([]);
  const [memory, setMemory] = useState([]);
  const [examining, setExamining] = useState(null);
  const [talking, setTalking] = useState(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showMemory, setShowMemory] = useState(false);
  const day = days[dayIndex];
  const room = day.rooms[currentRoom];

  useEffect(() => {
    const saved = localStorage.getItem("drift-memory");
    if (saved) setMemory(JSON.parse(saved));
    const savedDay = localStorage.getItem("drift-day");
    if (savedDay) setDayIndex(parseInt(savedDay));
  }, []);

  const addLog = (text) => setLog(prev => [...prev, text]);

  const examine = (obj) => {
    setExamining(obj);
    addLog(obj.examine);
  };

  const talk = (npc) => {
    setTalking(npc);
    setDialogueIndex(0);
  };

  const nextDialogue = () => {
    if (dialogueIndex < talking.dialogue.length - 1) {
      setDialogueIndex(i => i + 1);
    } else {
      setTalking(null);
    }
  };

  const addDeduction = (d) => {
    if (!memory.find(m => m.id === d.id)) {
      const updated = [...memory, d];
      setMemory(updated);
      localStorage.setItem("drift-memory", JSON.stringify(updated));
      addLog("You noted: " + d.text);
    }
  };

  const endDay = () => setScreen("end");

  const nextDay = () => {
    const next = dayIndex + 1;
    if (next < days.length) {
      setDayIndex(next);
      localStorage.setItem("drift-day", next);
    }
    setScreen("wake");
    setLog([]);
    setCurrentRoom("bedroom");
    setExamining(null);
    setTalking(null);
    setShowMemory(false);
  };

  if (screen === "wake") return (
    <div style={styles.wake}>
      <p style={styles.dayLabel}>{day.date}</p>
      <p style={styles.wakeText}>{day.wakeText}</p>
      <button style={styles.btn} onClick={() => setScreen("world")}>Open your eyes</button>
    </div>
  );

  if (screen === "end") return (
    <div style={styles.wake}>
      <p style={styles.dayLabel}>End of {day.date}</p>
      <p style={styles.wakeText}>{day.endText}</p>
      {dayIndex < days.length - 1 ? (
        <button style={styles.btn} onClick={nextDay}>Sleep until tomorrow</button>
      ) : (
        <button style={styles.btn} onClick={() => { setDayIndex(0); localStorage.setItem("drift-day", 0); setScreen("wake"); setLog([]); setCurrentRoom("bedroom"); }}>Start over</button>
      )}
    </div>
  );

  return (
    <div style={styles.world}>
      <div style={styles.topBar}>
        <span style={styles.roomName}>{room.name}</span>
        <button style={styles.smallBtn} onClick={() => setShowMemory(!showMemory)}>Memory Map ({memory.length})</button>
      </div>

      {showMemory && (
        <div style={styles.memoryPanel}>
          <p style={styles.memLabel}>Your deductions:</p>
          {memory.length === 0 && <p style={styles.muted}>Nothing yet.</p>}
          {memory.map(m => <p key={m.id} style={styles.memItem}>? {m.text}</p>)}
          <p style={styles.memLabel}>Add a deduction:</p>
          {day.deductions.map(d => (
            <button key={d.id} style={styles.deductBtn} onClick={() => addDeduction(d)}>
              {memory.find(m => m.id === d.id) ? "? " : "+ "}{d.text}
            </button>
          ))}
        </div>
      )}

      <p style={styles.desc}>{room.description}</p>

      {talking && (
        <div style={styles.dialogue}>
          <p style={styles.dialogueText}>{talking.dialogue[dialogueIndex]}</p>
          <button style={styles.btn} onClick={nextDialogue}>
            {dialogueIndex < talking.dialogue.length - 1 ? "Continue" : "Walk away"}
          </button>
        </div>
      )}

      {examining && (
        <div style={styles.examine}>
          <p style={styles.examineText}>{examining.examine}</p>
          <button style={styles.smallBtn} onClick={() => setExamining(null)}>Close</button>
        </div>
      )}

      <div style={styles.section}>
        <p style={styles.label}>Examine</p>
        <div style={styles.row}>
          {room.objects.map(obj => (
            <button key={obj.id} style={styles.objBtn} onClick={() => examine(obj)}>{obj.name}</button>
          ))}
        </div>
      </div>

      {room.npcs.length > 0 && (
        <div style={styles.section}>
          <p style={styles.label}>Talk to</p>
          <div style={styles.row}>
            {room.npcs.map(npc => (
              <button key={npc.id} style={styles.objBtn} onClick={() => talk(npc)}>{npc.name}</button>
            ))}
          </div>
        </div>
      )}

      <div style={styles.section}>
        <p style={styles.label}>Go to</p>
        <div style={styles.row}>
          {room.exits.map(exit => (
            <button key={exit} style={styles.objBtn} onClick={() => { setCurrentRoom(exit); setExamining(null); setTalking(null); }}>
              {day.rooms[exit].name}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.logBox}>
        {log.slice(-4).reverse().map((l, i) => <p key={i} style={{...styles.logItem, opacity: 1 - i * 0.2}}>{l}</p>)}
      </div>

      <button style={styles.endBtn} onClick={endDay}>End the day</button>
    </div>
  );
}

const styles = {
  wake: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#0a0a0a", padding: "2rem", textAlign: "center" },
  dayLabel: { color: "#555", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" },
  wakeText: { color: "#ccc", fontSize: "1.3rem", lineHeight: 1.8, maxWidth: "480px", marginBottom: "2rem" },
  btn: { background: "transparent", border: "1px solid #444", color: "#aaa", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontSize: "14px" },
  world: { minHeight: "100vh", background: "#0a0a0a", color: "#ccc", padding: "1rem", maxWidth: "600px", margin: "0 auto", fontFamily: "Georgia, serif" },
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem", borderBottom: "1px solid #222", paddingBottom: "0.5rem" },
  roomName: { color: "#888", fontSize: "13px", letterSpacing: "0.15em", textTransform: "uppercase" },
  smallBtn: { background: "transparent", border: "1px solid #333", color: "#777", padding: "5px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  desc: { color: "#bbb", lineHeight: 1.8, marginBottom: "1.5rem", fontSize: "15px" },
  section: { marginBottom: "1.2rem" },
  label: { color: "#555", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" },
  row: { display: "flex", flexWrap: "wrap", gap: "8px" },
  objBtn: { background: "#111", border: "1px solid #2a2a2a", color: "#aaa", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", fontSize: "13px" },
  dialogue: { background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" },
  dialogueText: { color: "#ddd", lineHeight: 1.8, marginBottom: "0.8rem", fontStyle: "italic" },
  examine: { background: "#111", border: "1px solid #2a2a2a", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" },
  examineText: { color: "#ddd", lineHeight: 1.8, marginBottom: "0.8rem" },
  memoryPanel: { background: "#0f0f0f", border: "1px solid #222", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" },
  memLabel: { color: "#555", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.5rem" },
  memItem: { color: "#9b8fff", fontSize: "13px", marginBottom: "4px" },
  muted: { color: "#444", fontSize: "13px" },
  deductBtn: { display: "block", width: "100%", background: "transparent", border: "1px solid #2a2a2a", color: "#777", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "13px", textAlign: "left", marginBottom: "6px" },
  logBox: { borderTop: "1px solid #1a1a1a", paddingTop: "1rem", marginTop: "1rem", marginBottom: "1rem" },
  logItem: { color: "#555", fontSize: "13px", marginBottom: "4px", fontStyle: "italic" },
  endBtn: { background: "transparent", border: "1px solid #333", color: "#666", padding: "10px 24px", borderRadius: "6px", cursor: "pointer", fontSize: "13px", width: "100%" }
};
