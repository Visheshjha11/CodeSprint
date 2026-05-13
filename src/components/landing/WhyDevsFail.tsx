import { Section, SectionHeader } from "./SectionHeader";

const POINTS = [
  { k: "01", t: "Autocomplete made your mechanics weak.", d: "Tab-completion atrophies the muscle memory that separates senior engineers from junior ones." },
  { k: "02", t: "You lose flow every time you hesitate.", d: "Hesitation isn't thinking — it's friction between intention and execution. We measure it as variance." },
  { k: "03", t: "Your syntax speed limits your thinking.", d: "If your fingers can't keep up with your brain, your brain slows down to match. Train the floor." },
];

export function WhyDevsFail() {
  return (
    <Section>
      <SectionHeader
        tag="DIAGNOSIS"
        title="Why senior developers type slow."
      />
      <div className="grid md:grid-cols-3 gap-px bg-[var(--border)]">
        {POINTS.map((p) => (
          <div key={p.k} className="bg-[var(--surface-1)] p-6">
            <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">{p.k} · FAULT</div>
            <div className="mt-3 text-lg leading-snug">{p.t}</div>
            <div className="mt-3 text-[var(--muted-foreground)] text-sm leading-relaxed">{p.d}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
