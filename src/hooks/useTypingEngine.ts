import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type CharStatus = "pending" | "correct" | "incorrect" | "current";

export interface Bonus { id: number; label: string; value?: string }

export interface EngineState {
  index: number;
  errors: number;
  corrections: number;
  startedAt: number | null;
  completedAt: number | null;
  streak: number;
  maxStreak: number;
  perfectLine: boolean;
  zeroErrSegment: number;
  droppedBelow90: boolean;
}

export interface UseEngineResult {
  snippet: string;
  state: EngineState;
  metrics: { wpm: number; accuracy: number; errorRate: number };
  combo: { streak: number; multiplier: number };
  flow: { score: number; rhythm: number; consistency: number; momentum: number };
  pressure: { zone: number };
  telemetry: { intervals: number[]; rollingWpm: number[] };
  bonuses: Bonus[];
  charStatuses: CharStatus[];
  reset: () => void;
  setSnippet: (s: string) => void;
}

function now() { return performance.now(); }

export function useTypingEngine(initial: string): UseEngineResult {
  const [snippet, setSnippetRaw] = useState(initial);
  const [index, setIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [corrections, setCorrections] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [completedAt, setCompletedAt] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [zeroErrSegment, setZeroErrSegment] = useState(0);
  const [droppedBelow90, setDroppedBelow90] = useState(false);
  const [perfectLine, setPerfectLine] = useState(true);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const [tick, setTick] = useState(0);

  const lastKeyAt = useRef<number>(0);
  const intervalsRef = useRef<number[]>([]);
  const rollingWpmRef = useRef<number[]>([]);
  const lastSampleAt = useRef<number>(0);
  const correctSinceSampleRef = useRef<number>(0);
  const bonusIdRef = useRef(1);

  // Live metrics tick
  useEffect(() => {
    if (!startedAt || completedAt) return;
    const t = setInterval(() => setTick((x) => x + 1), 250);
    return () => clearInterval(t);
  }, [startedAt, completedAt]);

  const reset = useCallback(() => {
    setIndex(0); setErrors(0); setCorrections(0);
    setStartedAt(null); setCompletedAt(null);
    setStreak(0); setMaxStreak(0);
    setZeroErrSegment(0); setDroppedBelow90(false); setPerfectLine(true);
    setBonuses([]); intervalsRef.current = []; rollingWpmRef.current = [];
    lastKeyAt.current = 0; lastSampleAt.current = 0; correctSinceSampleRef.current = 0;
  }, []);

  const setSnippet = useCallback((s: string) => { setSnippetRaw(s); reset(); }, [reset]);

  const pushBonus = useCallback((label: string, value?: string) => {
    const id = bonusIdRef.current++;
    setBonuses((b) => [...b.slice(-3), { id, label, value }]);
    setTimeout(() => setBonuses((b) => b.filter((x) => x.id !== id)), 900);
  }, []);

  const handleChar = useCallback((char: string) => {
    if (completedAt) return;
    const t = now();
    if (!startedAt) setStartedAt(t);

    if (lastKeyAt.current) {
      const dt = t - lastKeyAt.current;
      if (dt > 0 && dt < 4000) {
        intervalsRef.current.push(dt);
        if (intervalsRef.current.length > 80) intervalsRef.current.shift();
      }
    }
    lastKeyAt.current = t;

    if (lastSampleAt.current === 0) lastSampleAt.current = t;

    const expected = snippet[index];
    if (char === expected) {
      let newIndex = index + 1;
      if (char === "\n") {
        while (newIndex < snippet.length && (snippet[newIndex] === " " || snippet[newIndex] === "\t")) {
          newIndex++;
        }
      }
      setIndex(newIndex);
      setStreak((s) => {
        const ns = s + 1;
        setMaxStreak((m) => Math.max(m, ns));
        if (ns > 0 && ns % 100 === 0) pushBonus("ZERO-ERROR SEGMENT", `+${ns}`);
        if (ns === 30) pushBonus("SYNTAX CHAIN", "x30");
        return ns;
      });
      setZeroErrSegment((z) => z + 1);
      correctSinceSampleRef.current += 1;

      // sample rolling WPM every 1.5s
      const elapsed = t - lastSampleAt.current;
      if (elapsed > 1500) {
        const wpm = (correctSinceSampleRef.current / 5) / (elapsed / 60000);
        rollingWpmRef.current.push(wpm);
        if (rollingWpmRef.current.length > 24) rollingWpmRef.current.shift();
        lastSampleAt.current = t;
        correctSinceSampleRef.current = 0;
      }

      // perfect line bonus
      if (expected === "\n" && perfectLine) pushBonus("PERFECT LINE");
      if (expected === "\n") setPerfectLine(true);

      if (newIndex >= snippet.length) setCompletedAt(t);
    } else {
      setErrors((e) => e + 1);
      setStreak(0);
      setZeroErrSegment(0);
      setPerfectLine(false);
    }
  }, [completedAt, index, snippet, startedAt, perfectLine, pushBonus]);

  const handleBackspace = useCallback(() => {
    if (completedAt) return;
    if (index > 0) {
      setIndex((i) => i - 1);
      setCorrections((c) => c + 1);
    }
  }, [completedAt, index]);

  // Global key listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Backspace") { e.preventDefault(); handleBackspace(); return; }
      if (e.key === "Enter") { e.preventDefault(); handleChar("\n"); return; }
      if (e.key === "Tab") { e.preventDefault(); handleChar(" "); return; }
      if (e.key.length === 1) { e.preventDefault(); handleChar(e.key); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleChar, handleBackspace]);

  const metrics = useMemo(() => {
    const elapsedMs = startedAt ? (completedAt ?? now()) - startedAt : 0;
    const minutes = Math.max(elapsedMs / 60000, 0.0001);
    const correctChars = Math.max(0, index);
    const wpm = startedAt ? Math.round((correctChars / 5) / minutes) : 0;
    const total = correctChars + errors;
    const accuracy = total > 0 ? correctChars / total : 1;
    const errorRate = total > 0 ? errors / total : 0;
    return { wpm, accuracy, errorRate };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, index, errors, startedAt, completedAt]);

  useEffect(() => {
    if (metrics.accuracy < 0.9 && !droppedBelow90) setDroppedBelow90(true);
    if (metrics.accuracy >= 0.95 && droppedBelow90) {
      setDroppedBelow90(false);
      pushBonus("CLUTCH RECOVERY");
    }
  }, [metrics.accuracy, droppedBelow90, pushBonus]);

  const flow = useMemo(() => {
    const intervals = intervalsRef.current;
    const rolling = rollingWpmRef.current;
    const mean = (a: number[]) => a.reduce((s, x) => s + x, 0) / Math.max(1, a.length);
    const std = (a: number[]) => {
      if (a.length < 2) return 0;
      const m = mean(a);
      return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length);
    };
    const rhythm = intervals.length > 4 ? 1 - Math.min(1, std(intervals) / Math.max(1, mean(intervals))) : 0.5;
    const consistency = rolling.length > 2 ? 1 - Math.min(1, std(rolling) / Math.max(1, mean(rolling))) : 0.5;
    const momentum = Math.min(1, streak / 50);
    const score = Math.round(100 * metrics.accuracy * rhythm * consistency * (0.5 + 0.5 * momentum));
    return { score, rhythm, consistency, momentum };
  }, [tick, metrics.accuracy, streak]);

  const pressureZone = Math.min(5, 1 + Math.floor(index / 60));
  const multiplier = 1 + Math.floor(streak / 25) * 0.5;

  const charStatuses = useMemo<CharStatus[]>(() => {
    return snippet.split("").map((_, i) =>
      i < index ? "correct" : i === index ? "current" : "pending"
    );
  }, [snippet, index]);

  return {
    snippet,
    state: {
      index, errors, corrections, startedAt, completedAt,
      streak, maxStreak, perfectLine, zeroErrSegment, droppedBelow90,
    },
    metrics,
    combo: { streak, multiplier },
    flow,
    pressure: { zone: pressureZone },
    telemetry: { intervals: intervalsRef.current, rollingWpm: rollingWpmRef.current },
    bonuses,
    charStatuses,
    reset,
    setSnippet,
  };
}
