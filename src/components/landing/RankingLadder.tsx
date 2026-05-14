import { Section, SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

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
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="overflow-x-auto pb-6 -mx-[var(--spacing-container)] px-[var(--spacing-container)] scrollbar-hide"
      >
        <div className="flex items-stretch min-w-[900px] gap-px bg-[var(--border)] border hairline shadow-2xl">
          {TIERS.map((t, i) => {
            const here = t.name === "Master";
            return (
              <motion.div 
                key={t.name} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex-1 min-w-0 flex flex-col group cursor-default"
              >
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: "6px" }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                  style={{ backgroundColor: t.color, opacity: 0.4 + i * 0.08 }}
                />
                <div className={`bg-[var(--surface-1)] p-6 flex-1 relative transition-colors group-hover:bg-[oklch(0.22 0 0)]`}>
                  {here && (
                    <>
                      <div className="absolute inset-0 bg-[var(--primary)] opacity-[0.05] pointer-events-none" />
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]" />
                    </>
                  )}
                  <div className="text-[9px] tracking-[0.4em] text-[var(--muted-foreground)] font-bold">TIER {String(i+1).padStart(2,"0")}</div>
                  <div className="text-xl mt-3 font-bold tracking-tight" style={{ color: t.color }}>{t.name}</div>
                  <div className="text-[10px] mt-4 text-[var(--muted-foreground)] tabular-nums font-bold opacity-60">P{[0,25,50,70,85,94,98][i]}+</div>
                  {here && (
                    <motion.div 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-4 text-[9px] tracking-[0.3em] text-[var(--primary)] font-bold uppercase"
                    >
                      ▲ CURRENT RANK
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
}
