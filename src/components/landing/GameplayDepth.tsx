import { Section, SectionHeader } from "./SectionHeader";

export function GameplayDepth() {
  return (
    <Section>
      <SectionHeader
        tag="GAMEPLAY"
        title="Layered mechanics. Real mastery."
        sub="Combos build. Pressure escalates. Precision is rewarded with telemetry-grade feedback."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border-b hairline">
        <Card title="COMBO" accent="primary">
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
            Correct streaks compound into a multiplier. A single mistake breaks the chain.
          </p>
          <div className="mt-6 flex items-end gap-1 h-16">
            {[2,3,5,7,10,14,18,22,26,30,34,38].map((h, i) => (
              <div key={i} className="flex-1 bg-[var(--primary)]" style={{ height: `${h * 1.6}px`, opacity: 0.3 + i * 0.06 }}/>
            ))}
          </div>
          <div className="mt-3 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">x1.0 → x2.5 → x4.0</div>
        </Card>
        <Card title="PRESSURE" accent="red">
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
            Speed zones escalate every 30 chars. Sudden-death modes end the run on a single fault.
          </p>
          <div className="mt-6 grid grid-cols-5 gap-1">
            {["Z1","Z2","Z3","Z4","Z5"].map((z, i) => (
              <div key={z} className="text-center py-2.5 border hairline text-[11px]" style={{
                background: i === 2 ? "oklch(0.852 0.142 84 / 0.15)" : undefined,
                color: i === 2 ? "var(--primary)" : undefined,
                borderColor: i === 2 ? "var(--primary)" : undefined,
              }}>{z}</div>
            ))}
          </div>
          <div className="mt-3 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] uppercase">CURRENT · Z3 · 110 WPM</div>
        </Card>
        <Card title="PRECISION" accent="cyan">
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
            Bonuses surface as quiet telemetry - never confetti. Rewarding mastery over luck.
          </p>
          <ul className="mt-6 space-y-2 text-[11px] tracking-[0.15em]">
            {["PERFECT LINE","ZERO-ERROR SEGMENT","CLUTCH RECOVERY","SYNTAX CHAIN","FASTEST FUNCTION"].map((b) => (
              <li key={b} className="flex justify-between border-b hairline pb-1.5">
                <span className="text-[var(--accent-cyan)]">{b}</span>
                <span className="text-[var(--muted-foreground)] font-mono">+SR</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function Card({ title, accent, children }: { title: string; accent: "primary" | "red" | "cyan"; children: React.ReactNode }) {
  const c = accent === "primary" ? "var(--primary)" : accent === "red" ? "var(--accent-red)" : "var(--accent-cyan)";
  return (
    <div className="bg-[var(--surface-1)] p-5 border-t-2" style={{ borderTopColor: c }}>
      <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] mb-3">{title}</div>
      {children}
    </div>
  );
}
