import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTypingEngine } from "@/hooks/useTypingEngine";
import { CodeSurface } from "./CodeSurface";
import { TelemetryHUD } from "./TelemetryHUD";
import { RhythmTimeline } from "./RhythmTimeline";
import { ModeSelector } from "./ModeSelector";
import { ShareCard } from "./ShareCard";
import { pickSnippet, type ModeId } from "@/constants/snippets";
import { percentile, rankFromPercentile } from "@/utils/percentile";

export function TypingArena({ demo = false }: { demo?: boolean }) {
  const [mode, setMode] = useState<ModeId>("jsx-velocity");
  const [snippetIdx, setSnippetIdx] = useState(0);
  const initial = useMemo(() => pickSnippet(mode, snippetIdx), [mode, snippetIdx]);
  const engine = useTypingEngine(initial);
  const [errorFlash, setErrorFlash] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const lastErrors = useRef(0);

  useEffect(() => { engine.setSnippet(initial); /* eslint-disable-next-line */ }, [initial]);

  useEffect(() => {
    if (engine.state.errors > lastErrors.current) {
      setErrorFlash(true);
      const t = setTimeout(() => setErrorFlash(false), 140);
      lastErrors.current = engine.state.errors;
      return () => clearTimeout(t);
    }
    lastErrors.current = engine.state.errors;
  }, [engine.state.errors]);

  useEffect(() => {
    if (engine.state.completedAt) setShowReveal(true);
  }, [engine.state.completedAt]);

  const p = percentile(engine.metrics.wpm, engine.metrics.accuracy);
  const rank = rankFromPercentile(p);
  const hyperfocus = engine.combo.streak >= 25;

  const handleNext = () => {
    setShowReveal(false);
    setSnippetIdx((i) => i + 1);
  };

  return (
    <div
      className={`relative bg-[var(--surface-1)] border hairline ${hyperfocus ? "shadow-glow-primary" : ""} transition-shadow duration-500`}
    >
      {/* header */}
      <div className="flex items-center justify-between px-3 py-2 border-b hairline bg-[var(--surface-2)]">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent-green)] shadow-[0_0_6px_var(--accent-green)]" />
          {demo ? "ARENA · DEMO SPRINT" : `ARENA · ${hyperfocus ? "HYPERFOCUS" : "STANDBY"}`}
        </div>
        <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
          <button onClick={() => engine.reset()} className="hover:text-[var(--foreground)]">RESET</button>
          <span className="opacity-30">·</span>
          <button onClick={handleNext} className="hover:text-[var(--foreground)]">NEXT</button>
        </div>
      </div>

      {/* mode strip */}
      <div className="px-3 py-2 border-b hairline overflow-x-auto">
        <ModeSelector value={mode} onChange={(m) => { setMode(m); setSnippetIdx(0); }} compact />
      </div>

      {/* surface */}
      <div className="grid md:grid-cols-[1fr_220px]">
        <div className="relative p-4 min-h-[260px]">
          {demo && engine.state.index === 0 && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-[var(--primary)] text-[var(--primary-foreground)] text-[10px] sm:text-[11px] tracking-[0.3em] z-10 animate-pulse-glow shadow-glow-primary whitespace-nowrap">
              TRY DEMO: START TYPING
            </div>
          )}
          <CodeSurface snippet={engine.snippet} charStatuses={engine.charStatuses} errorFlash={errorFlash} />
          {/* bonuses */}
          <div className="pointer-events-none absolute right-3 top-3 flex flex-col items-end gap-1">
            {engine.bonuses.map((b) => (
              <div key={b.id} className="animate-bonus text-[10px] tracking-[0.25em] text-[var(--primary)] bg-[var(--surface-2)] px-2 py-1 border hairline">
                {b.label}{b.value ? <span className="ml-2 text-[var(--foreground)]">{b.value}</span> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="border-l hairline border-t md:border-t-0">
          <TelemetryHUD
            wpm={engine.metrics.wpm}
            accuracy={engine.metrics.accuracy}
            errors={engine.state.errors}
            combo={engine.combo.streak}
            multiplier={engine.combo.multiplier}
            flow={engine.flow.score}
            zone={engine.pressure.zone}
            rank={`${rank.tier} ${rank.division}`}
            mask={demo}
          />
          <div className="px-3 py-2 border-t hairline relative">
            <div className="text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] mb-1">RHYTHM</div>
            {demo ? (
              <div className="h-10 grid place-items-center text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">HIDDEN IN DEMO</div>
            ) : (
              <RhythmTimeline intervals={engine.telemetry.intervals} />
            )}
          </div>
        </div>
      </div>

      {/* footer hint */}
      <div className="px-3 py-2 border-t hairline text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] flex justify-between">
        <span>TYPE TO ENGAGE · ENTER NEWLINE · BACKSPACE CORRECT</span>
        <span>{engine.state.index}/{engine.snippet.length}</span>
      </div>

      {/* reveal */}
      {showReveal && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-md grid place-items-center p-4 z-20"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] uppercase font-bold">Session Complete</div>
              <div className="mt-2 text-2xl font-bold tracking-tight">
                Classification: <span className="text-[var(--primary)] text-glow-primary">{rank.tier} {rank.division}</span>
              </div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-1 tracking-wider uppercase">
                <span className="opacity-60">Velocity:</span> <span className="text-[var(--foreground)]">{engine.metrics.wpm} WPM</span>
                <span className="mx-2 opacity-30">|</span>
                <span className="opacity-60">Stability:</span> <span className="text-[var(--foreground)]">{(engine.metrics.accuracy * 100).toFixed(0)}%</span>
              </div>
            </div>
            
            <ShareCard
              wpm={engine.metrics.wpm}
              accuracy={engine.metrics.accuracy}
              flow={engine.flow.score}
              rank={`${rank.tier} ${rank.division}`}
              maxStreak={engine.state.maxStreak}
              mode={mode.replace("-", " ").toUpperCase()}
              wpmHistory={engine.telemetry.wpmHistory}
            />
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <button 
                onClick={handleNext} 
                className="group relative px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] tracking-[0.3em] font-bold overflow-hidden transition-all hover:shadow-glow-primary active:scale-95"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                <span className="relative">NEXT SPRINT</span>
              </button>
              <button 
                onClick={() => { setShowReveal(false); engine.reset(); }} 
                className="px-8 py-3 border border-[var(--border)] text-[11px] tracking-[0.3em] font-bold hover:bg-[var(--surface-2)] transition-colors active:scale-95"
              >
                RETRY
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
