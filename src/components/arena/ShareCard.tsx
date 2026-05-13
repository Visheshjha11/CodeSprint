interface Props { wpm: number; accuracy: number; flow: number; rank: string; percentile: number; mode: string; date?: Date }

export function ShareCard({ wpm, accuracy, flow, rank, percentile, mode, date = new Date() }: Props) {
  return (
    <div
      className="relative w-full max-w-md aspect-[16/10] bg-[var(--surface-2)] border hairline overflow-hidden"
      style={{ boxShadow: "var(--glow-primary)" }}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative p-5 h-full flex flex-col">
        <div className="flex items-center justify-between text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
          <span>CODESPRINT // RESULT CARD</span>
          <span>S01 · {date.toLocaleDateString("en-CA")}</span>
        </div>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="text-[10px] tracking-[0.2em] text-[var(--muted-foreground)]">RANK</div>
            <div className="text-2xl text-[var(--primary)] text-glow-primary">{rank}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-[0.2em] text-[var(--muted-foreground)]">MODE</div>
            <div className="text-base">{mode}</div>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-4 gap-px bg-[var(--border)]">
          <Stat k="WPM"  v={wpm.toString()} />
          <Stat k="ACC"  v={`${(accuracy*100).toFixed(0)}%`} />
          <Stat k="FLOW" v={flow.toString()} />
          <Stat k="P%"   v={`${percentile}`} />
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] tracking-[0.2em] text-[var(--muted-foreground)]">
          <span />
          <span>codesprint.dev</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[var(--surface-1)] px-3 py-2">
      <div className="text-[9px] tracking-[0.25em] text-[var(--muted-foreground)]">{k}</div>
      <div className="tabular-nums text-lg">{v}</div>
    </div>
  );
}
