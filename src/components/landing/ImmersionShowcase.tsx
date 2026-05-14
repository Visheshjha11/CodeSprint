import { Section, SectionHeader } from "./SectionHeader";

export function ImmersionShowcase() {
  return (
    <Section>
      <SectionHeader
        tag="IMMERSION"
        title="Hyperfocus is a state, not a setting."
        sub="At high streaks, the arena sharpens. Glow tightens. Telemetry accelerates. Your environment matches your tempo."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border-b hairline">
        <Pane title="STANDBY" glow={false} />
        <Pane title="HYPERFOCUS" glow />
      </div>
    </Section>
  );
}

function Pane({ title, glow }: { title: string; glow: boolean }) {
  return (
    <div className={`relative bg-[var(--surface-1)] p-6 ${glow ? "shadow-glow-primary animate-pulse-glow" : ""}`}>
      <div className="flex items-center justify-between text-[10px] tracking-[0.3em]">
        <span className="text-[var(--muted-foreground)]">{title}</span>
        <span className={glow ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}>{glow ? "STREAK 47" : "STREAK 04"}</span>
      </div>
      <pre className="mt-4 text-[13px] leading-6 font-mono">
{`function compute(x) {
  `}<span className="text-[var(--accent-violet)]">return</span>{` x.map(`}<span className="text-[var(--accent-cyan)]">v</span>{` =>`}{glow ? <span className="ml-1 inline-block w-[2px] h-4 align-middle bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] animate-caret"/> : <span className="ml-1 inline-block w-[2px] h-4 align-middle bg-[var(--foreground)]/60 animate-caret"/>}{`
    v * `}<span className="text-[var(--accent-cyan)]">2</span>{`);
}`}
      </pre>
      <div className="mt-6 grid grid-cols-3 gap-px bg-[var(--border)]">
        {[
          ["WPM", glow ? "138" : "62"],
          ["FLOW", glow ? "92" : "48"],
          ["COMBO", glow ? "x47" : "x04"],
        ].map(([k, v]) => (
          <div key={k} className="bg-[var(--surface-2)] px-3 py-2">
            <div className="text-[9px] tracking-[0.25em] text-[var(--muted-foreground)]">{k}</div>
            <div className={`text-lg tabular-nums ${glow ? "text-[var(--primary)]" : ""}`}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
