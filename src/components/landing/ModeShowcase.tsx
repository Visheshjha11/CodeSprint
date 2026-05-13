import { Section, SectionHeader } from "./SectionHeader";
import { MODES, SNIPPETS } from "@/constants/snippets";

const ACCENT: Record<string, string> = {
  primary: "var(--primary)",
  cyan: "var(--accent-cyan)",
  green: "var(--accent-green)",
  red: "var(--accent-red)",
  violet: "var(--accent-violet)",
};

export function ModeShowcase() {
  return (
    <Section id="modes">
      <SectionHeader
        tag="LOADOUTS"
        title="Eight modes. One discipline."
        sub="Pick your weapon. Each mode trains a different mechanic — frontend reflexes, terminal muscle, query construction."
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)]">
        {MODES.map((m) => {
          const preview = SNIPPETS[m.id][0].split("\n").slice(0, 3).join("\n");
          return (
            <div key={m.id} className="bg-[var(--surface-1)] p-4 group cursor-default border-l-2 hover:bg-[var(--surface-2)] transition-colors"
              style={{ borderLeftColor: ACCENT[m.accent] }}>
              <div className="flex items-center justify-between text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">
                <span>{m.short}</span>
                <span className="opacity-60 group-hover:opacity-100">→</span>
              </div>
              <div className="mt-2 text-base">{m.name}</div>
              <div className="text-[11px] text-[var(--muted-foreground)] mt-1">{m.tag}</div>
              <pre className="mt-3 text-[11px] leading-5 text-[var(--muted-foreground)]/80 font-mono overflow-hidden line-clamp-3 max-h-16">
                {preview}
              </pre>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
