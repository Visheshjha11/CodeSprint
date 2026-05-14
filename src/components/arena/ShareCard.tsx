interface Props { wpm: number; accuracy: number; flow: number; rank: string; percentile: number; mode: string; date?: Date }

export function ShareCard({ wpm, accuracy, flow, rank, percentile, mode, date = new Date() }: Props) {
  return (
    <div
      className="relative w-full max-w-[400px] aspect-[16/10] bg-[var(--surface-2)] border hairline overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative p-4 sm:p-5 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] font-bold">
          <span>CODESPRINT // RESULT</span>
          <span>S01 · {date.toLocaleDateString("en-CA")}</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold uppercase">RANK</div>
            <div className="text-xl sm:text-2xl text-[var(--primary)] text-glow-primary font-bold">{rank}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold uppercase">MODE</div>
            <div className="text-sm sm:text-base font-bold">{mode}</div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-px bg-[var(--border)] border hairline">
          <Stat k="WPM"  v={wpm.toString()} />
          <Stat k="ACC"  v={`${(accuracy*100).toFixed(0)}%`} />
          <Stat k="FLOW" v={flow.toString()} />
          <Stat k="P%"   v={`${percentile}`} />
        </div>

        <div className="flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold opacity-60">
          <span className="uppercase">Validated run</span>
          <span>codesprint.dev</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[var(--surface-1)] px-2 py-2 sm:px-3 sm:py-3 flex flex-col items-center">
      <div className="text-[8px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold mb-1">{k}</div>
      <div className="tabular-nums text-base sm:text-lg font-bold">{v}</div>
    </div>
  );
}
