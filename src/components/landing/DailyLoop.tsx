import { Section, SectionHeader } from "./SectionHeader";

export function DailyLoop() {
  const days = Array.from({ length: 30 }, (_, i) => {
    const v = (Math.sin(i * 1.7) + 1) / 2;
    return Math.max(0, v - (i === 1 || i === 5 || i === 12 ? 0.6 : 0));
  });

  return (
    <Section id="daily">
      <SectionHeader
        tag="DAILY LOOP"
        title="Show up. Climb. Hold the streak."
        sub="A new challenge every 24 hours. A new ranked season every Sunday."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border-b hairline">
        <Tile label="TODAY · DAILY REACT SPRINT">
          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">EXPIRES IN</div>
              <div className="text-2xl sm:text-xl lg:text-2xl tabular-nums">07:42:11</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">YOUR P%</div>
              <div className="text-2xl sm:text-xl lg:text-2xl text-[var(--primary)] tabular-nums">68</div>
            </div>
          </div>
          <ul className="mt-6 text-[12px] divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {[
              ["01","kazu_dev","148"],["02","nullbyte","141"],["03","you","132"],
              ["04","ts_terror","128"],["05","jsx_anya","124"],
            ].map(([r, n, w]) => (
              <li key={r} className="flex justify-between py-2.5">
                <span className="text-[var(--muted-foreground)]">{r} · {n}</span>
                <span className="tabular-nums font-medium">{w} wpm</span>
              </li>
            ))}
          </ul>
        </Tile>
        <Tile label="STREAK · 07 DAYS">
          <div className="text-xl sm:text-lg lg:text-xl mt-3 leading-snug">Consistency, not novelty. Keep the momentum.</div>
          <div className="mt-6 grid grid-cols-15 gap-[3px]" style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}>
            {days.map((v, i) => (
              <div key={i} className="aspect-square" style={{
                backgroundColor: `oklch(0.852 0.142 84 / ${0.08 + v * 0.7})`,
              }}/>
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
            <span>30D HISTORY</span><span>BEST · 23d</span>
          </div>
        </Tile>
        <Tile label="SEASON 01 · SILVER II">
          <div className="text-xl sm:text-lg lg:text-xl mt-3 font-medium text-[var(--primary)] text-glow-primary">+312 SR this week</div>
          <div className="mt-6 h-1.5 bg-[var(--surface-3)] overflow-hidden">
            <div className="h-full bg-[var(--primary)] shadow-[0_0_12px_var(--primary)]" style={{ width: "62%" }}/>
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
            <span>SILVER II</span><span>SILVER I → 380 SR</span>
          </div>
          <div className="mt-6 text-[12px] text-[var(--muted-foreground)] leading-relaxed">
            Promotion / relegation runs every Sunday at 23:59 UTC. Top 15% promote.
          </div>
        </Tile>
      </div>
    </Section>
  );
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface-1)] p-6 sm:p-5 lg:p-8 flex flex-col">
      <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">{label}</div>
      {children}
    </div>
  );
}
