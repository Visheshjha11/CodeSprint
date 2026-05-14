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
        sub="Promotion and relegation. Identity that compounds across seasons."
      />
      <div className="overflow-x-auto pb-6 -mx-6 px-6">
        <div className="flex items-stretch min-w-[1000px] gap-px bg-[var(--border)]">
          {TIERS.map((t, i) => {
            const here = t.name === "Master";
            return (
              <div key={t.name} className="flex-1 min-w-0 flex flex-col">
                <div className={`h-1.5`} style={{ backgroundColor: t.color, opacity: 0.4 + i * 0.08 }}/>
                <div className={`bg-[var(--surface-1)] p-6 flex-1 ${here ? "relative" : ""}`}>
                  {here && <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.03] pointer-events-none" />}
                  <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">TIER {String(i+1).padStart(2,"0")}</div>
                  <div className="text-lg mt-2 font-bold" style={{ color: t.color }}>{t.name}</div>
                  <div className="text-[10px] mt-4 text-[var(--muted-foreground)] tabular-nums">P{[0,25,50,70,85,94,98][i]}+</div>
                  {here && (
                    <div className="mt-4 text-[9px] tracking-[0.25em] text-[var(--primary)] font-bold">▲ YOU ARE HERE</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </Section>
  );
}
