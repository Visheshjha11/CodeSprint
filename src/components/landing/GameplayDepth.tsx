import { Section, SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export function GameplayDepth() {
  return (
    <Section>
      <SectionHeader
        tag="GAMEPLAY"
        title="Layered mechanics. Real mastery."
        sub="Combos build. Pressure escalates. Precision is rewarded with telemetry-grade feedback."
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] border hairline shadow-xl"
      >
        <Card title="COMBO" accent="primary">
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">
            Correct streaks compound into a multiplier. A single mistake breaks the chain.
          </p>
          <div className="flex items-end gap-1 h-12">
            {[2,3,5,7,10,14,18,22,26,30,34,38].map((h, i) => (
              <motion.div 
                key={i} 
                initial={{ height: 0 }}
                whileInView={{ height: `${h * 1.2}px` }}
                transition={{ delay: i * 0.05 }}
                className="flex-1 bg-[var(--primary)]" 
                style={{ opacity: 0.3 + i * 0.06 }}
              />
            ))}
          </div>
          <div className="mt-3 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] font-bold">x1.0 → x2.5 → x4.0</div>
        </Card>

        <Card title="PRESSURE" accent="red">
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-4">
            Speed zones escalate every 30 chars. Sudden-death modes end the run on a single fault.
          </p>
          <div className="grid grid-cols-5 gap-1">
            {["Z1","Z2","Z3","Z4","Z5"].map((z, i) => (
              <motion.div 
                key={z} 
                whileHover={{ scale: 1.1, backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
                className="text-center py-2 border hairline text-[11px] font-bold cursor-default transition-colors" 
                style={{
                  background: i === 2 ? "oklch(0.852 0.142 84 / 0.15)" : undefined,
                  color: i === 2 ? "var(--primary)" : undefined,
                  borderColor: i === 2 ? "var(--primary)" : undefined,
                }}
              >
                {z}
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] uppercase font-bold">CURRENT · Z3 · 110 WPM</div>
        </Card>

        <Card title="PRECISION" accent="cyan">
          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed mb-6">
            Bonuses surface as quiet telemetry - never confetti. Rewarding mastery over luck.
          </p>
          <ul className="space-y-2.5 text-[11px] tracking-[0.15em]">
            {["PERFECT LINE","ZERO-ERROR SEGMENT","CLUTCH RECOVERY","SYNTAX CHAIN","FASTEST FUNCTION"].map((b, i) => (
              <motion.li 
                key={b} 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex justify-between border-b hairline pb-2 group/item cursor-default"
              >
                <span className="text-[var(--accent-cyan)] group-hover/item:text-[var(--foreground)] transition-colors">{b}</span>
                <span className="text-[var(--muted-foreground)] font-mono font-bold">+SR</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </Section>
  );
}

function Card({ title, accent, children }: { title: string; accent: "primary" | "red" | "cyan"; children: React.ReactNode }) {
  const c = accent === "primary" ? "var(--primary)" : accent === "red" ? "var(--accent-red)" : "var(--accent-cyan)";
  return (
    <div className="bg-[var(--surface-1)] p-6 sm:p-5 lg:p-7 border-t-2 transition-all hover:bg-[oklch(0.22 0 0)] group" style={{ borderTopColor: c }}>
      <div className="text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] mb-4 uppercase font-bold group-hover:text-[var(--foreground)] transition-colors">{title}</div>
      {children}
    </div>
  );
}
