interface Props { 
  wpm: number; 
  accuracy: number; 
  flow: number; 
  rank: string; 
  maxStreak: number; 
  mode: string; 
  date?: Date;
  wpmHistory?: number[];
}

export function ShareCard({ wpm, accuracy, flow, rank, maxStreak, mode, date = new Date(), wpmHistory = [] }: Props) {
  return (
    <div
      className="relative w-full max-w-[400px] aspect-[16/11] bg-[var(--surface-2)] border hairline overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative p-4 sm:p-5 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] font-bold">
          <span>VELOCITY // RESULT</span>
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

        {/* Graph Area */}
        <div className="relative h-20 sm:h-24 w-full bg-[var(--surface-1)]/40 border hairline overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-10" />
          <div className="absolute inset-0 flex items-end">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {wpmHistory.length > 1 && (
                <>
                  <path
                    d={generatePath(wpmHistory, true)}
                    fill="url(#graphGradient)"
                    className="animate-in fade-in duration-1000"
                  />
                  <path
                    d={generatePath(wpmHistory, false)}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_3px_var(--primary)] animate-in slide-in-from-left duration-700"
                  />
                  {/* Data points */}
                  {wpmHistory.map((v, i) => {
                    const x = (i / (wpmHistory.length - 1)) * 100;
                    const max = Math.max(...wpmHistory, 100);
                    const min = Math.min(...wpmHistory, 0);
                    const y = 100 - ((v - min) / (max - min || 1)) * 80 - 10;
                    return (
                      <circle 
                        key={i} 
                        cx={x} 
                        cy={y} 
                        r="0.8" 
                        fill="var(--primary)" 
                        className="opacity-50"
                      />
                    );
                  })}
                </>
              )}
            </svg>
          </div>
          <div className="absolute top-2 left-3 flex items-center gap-1.5 opacity-40">
             <div className="w-1 h-1 bg-[var(--primary)] rounded-full animate-pulse" />
             <span className="text-[7px] tracking-[0.3em] text-[var(--muted-foreground)] font-bold uppercase">Performance timeline</span>
          </div>
          <div className="absolute bottom-2 right-3 text-[7px] tracking-widest text-[var(--muted-foreground)] font-bold opacity-30">
            {wpmHistory.length} SECONDS RECORDED
          </div>
        </div>

        <div className="grid grid-cols-4 gap-px bg-[var(--border)] border hairline">
          <Stat k="WPM"  v={wpm.toString()} />
          <Stat k="ACC"  v={`${(accuracy*100).toFixed(0)}%`} />
          <Stat k="FLOW" v={flow.toString()} />
          <Stat k="MAX S"   v={`${maxStreak}`} />
        </div>

        <div className="flex items-center justify-between text-[8px] sm:text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold opacity-60">
          <span className="uppercase">Validated run</span>
          <span>velocity.dev</span>
        </div>
      </div>
    </div>
  );
}

function generatePath(data: number[], closed: boolean) {
  if (data.length < 2) return "";
  const max = Math.max(...data, 100);
  const min = Math.min(...data, 0);
  const range = max - min;
  
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 80 - 10; // padding top/bottom
    return `${x},${y}`;
  });

  if (closed) {
    return `M 0,100 L ${points.join(" L ")} L 100,100 Z`;
  }
  return `M ${points.join(" L ")}`;
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[var(--surface-1)] px-2 py-2 sm:px-3 sm:py-3 flex flex-col items-center">
      <div className="text-[8px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold mb-1">{k}</div>
      <div className="tabular-nums text-base sm:text-lg font-bold">{v}</div>
    </div>
  );
}
