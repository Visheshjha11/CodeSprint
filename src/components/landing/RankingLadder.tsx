import { Section, SectionHeader } from "./SectionHeader";

const TIERS = [
  { name: "Bronze",      color: "var(--accent-red)" },
  { name: "Silver",      color: "var(--accent-cyan)" },
  { name: "Gold",        color: "var(--primary)" },
  { name: "Platinum",    color: "var(--accent-cyan)" },
  { name: "Master",      color: "var(--accent-violet)" },
  { name: "Architect",   color: "var(--accent-violet)" },
  { name: "10x Engineer",color: "var(--primary)" },
];

export function RankingLadder() {
  return (
    <Section id="ranks">
      <SectionHeader
        tag="LADDER"
        title="Ranks built for the long climb."
        sub="Promotion and relegation every Sunday. Identity that compounds across seasons."
      />
      <div className="overflow-x-auto">
        <div className="flex items-stretch min-w-[820px]">
          {TIERS.map((t, i) => {
            const here = t.name === "Silver";
            return (
              <div key={t.name} className="flex-1 min-w-0">
                <div className={`h-1`} style={{ backgroundColor: t.color, opacity: 0.4 + i * 0.08 }}/>
                <div className={`bg-[var(--surface-1)] border-r hairline p-4 ${here ? "shadow-glow-primary" : ""}`}>
                  <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">TIER {String(i+1).padStart(2,"0")}</div>
                  <div className="text-base mt-1" style={{ color: t.color }}>{t.name}</div>
                  <div className="text-[10px] mt-3 text-[var(--muted-foreground)] tabular-nums">P{[0,25,50,70,85,94,98][i]}+</div>
                  {here && (
                    <div className="mt-2 text-[10px] tracking-[0.25em] text-[var(--primary)]">▲ YOU ARE HERE</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-6 text-[11px] text-[var(--muted-foreground)]">
        Promotion / relegation runs every Sunday at 23:59 UTC. Top 0.1% qualify for the Architect tier each season.
      </div>
    </Section>
  );
}
