import { Section, SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border hairline shadow-2xl"
      >
        <Tile label="TODAY · DAILY REACT SPRINT">
          <div className="flex items-end justify-between mt-3">
            <div>
              <div className="text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">EXPIRES IN</div>
              <div className="text-2xl sm:text-xl lg:text-2xl tabular-nums font-bold">07:42:11</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">YOUR P%</div>
              <div className="text-2xl sm:text-xl lg:text-2xl text-[var(--primary)] tabular-nums font-bold">68</div>
            </div>
          </div>
          <ul className="mt-8 text-[12px] divide-y divide-[var(--border)] border-t border-[var(--border)]">
            {[
              ["01","kazu_dev","148"],["02","nullbyte","141"],["03","you","132"],
              ["04","ts_terror","128"],["05","jsx_anya","124"],
            ].map(([r, n, w]) => (
              <li key={r} className="flex justify-between py-3 hover:bg-[var(--surface-2)] transition-colors px-2 -mx-2">
                <span className="text-[var(--muted-foreground)]">{r} · {n}</span>
                <span className="tabular-nums font-bold text-[var(--foreground)]">{w} wpm</span>
              </li>
            ))}
          </ul>
        </Tile>

        <Tile label="STREAK · 07 DAYS">
          <div className="text-xl sm:text-lg lg:text-xl mt-3 leading-snug font-medium">Consistency, not novelty. Keep the momentum.</div>
          <div className="mt-8 grid grid-cols-10 sm:grid-cols-15 gap-1.5 sm:gap-[3px]">
            {days.map((v, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className="aspect-square border border-white/5" 
                style={{
                  backgroundColor: `oklch(0.852 0.142 84 / ${0.08 + v * 0.7})`,
                }}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-between text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] font-bold">
            <span>30D HISTORY</span><span>BEST · 23d</span>
          </div>
        </Tile>

        <Tile label="SEASON 01 · SILVER II">
          <div className="text-xl sm:text-lg lg:text-xl mt-3 font-bold text-[var(--primary)] text-glow-primary uppercase">+312 SR this week</div>
          <div className="mt-8 h-2 bg-[var(--surface-3)] overflow-hidden relative">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "62%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]" 
            />
          </div>
          <div className="mt-4 flex justify-between text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] font-bold">
            <span>SILVER II</span><span>SILVER I → 380 SR</span>
          </div>
          <div className="mt-8 text-[12px] text-[var(--muted-foreground)] leading-relaxed border-t border-[var(--border)] pt-4 italic opacity-80">
            Promotion / relegation runs every Sunday at 23:59 UTC. Top 15% promote to Gold I.
          </div>
        </Tile>
      </motion.div>
    </Section>
  );
}

function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[var(--surface-1)] p-8 sm:p-6 lg:p-10 flex flex-col group transition-all hover:bg-[oklch(0.22 0 0)]">
      <div className="text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] uppercase font-bold group-hover:text-[var(--primary)] transition-colors">{label}</div>
      {children}
    </div>
  );
}
