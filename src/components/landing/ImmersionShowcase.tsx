import { Section, SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

export function ImmersionShowcase() {
  return (
    <Section>
      <SectionHeader
        tag="IMMERSION"
        title="Hyperfocus is a state, not a setting."
        sub="At high streaks, the arena sharpens. Glow tightens. Telemetry accelerates. Your environment matches your tempo."
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)] border hairline shadow-2xl"
      >
        <Pane title="STANDBY" glow={false} />
        <Pane title="HYPERFOCUS" glow />
      </motion.div>
    </Section>
  );
}

function Pane({ title, glow }: { title: string; glow: boolean }) {
  return (
    <div className={`relative bg-[var(--surface-1)] p-8 sm:p-10 lg:p-12 overflow-hidden transition-all duration-700 ${glow ? "shadow-[inset_0_0_100px_rgba(255,200,87,0.05)]" : ""}`}>
      {glow && (
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent pointer-events-none" 
        />
      )}
      
      <div className="flex items-center justify-between text-[10px] tracking-[0.4em] font-bold">
        <span className="text-[var(--muted-foreground)] uppercase">{title}</span>
        <motion.span 
          animate={glow ? { color: ["var(--primary)", "var(--foreground)", "var(--primary)"] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className={glow ? "text-[var(--primary)] text-glow-primary" : "text-[var(--muted-foreground)]"}
        >
          {glow ? "STREAK 47" : "STREAK 04"}
        </motion.span>
      </div>

      <pre className="mt-8 text-[13px] sm:text-[14px] leading-7 font-mono bg-[oklch(0.15 0 0)] p-6 border hairline shadow-inner">
{`function compute(x) {
  `}<span className="text-[var(--accent-violet)]">return</span>{` x.map(`}<span className="text-[var(--accent-cyan)]">v</span>{` =>`}{glow ? <span className="ml-1 inline-block w-[2px] h-4 align-middle bg-[var(--primary)] shadow-[0_0_12px_var(--primary)] animate-caret"/> : <span className="ml-1 inline-block w-[2px] h-4 align-middle bg-[var(--foreground)]/60 animate-caret"/>}{`
    v * `}<span className="text-[var(--accent-cyan)]">2</span>{`);
}`}
      </pre>

      <div className="mt-10 grid grid-cols-3 gap-px bg-[var(--border)] border hairline">
        {[
          ["WPM", glow ? "138" : "62"],
          ["FLOW", glow ? "92" : "48"],
          ["COMBO", glow ? "x47" : "x04"],
        ].map(([k, v]) => (
          <div key={k} className="bg-[var(--surface-2)] px-4 py-5 flex flex-col items-center justify-center transition-all hover:bg-[var(--surface-3)] group">
            <div className="text-[9px] tracking-[0.3em] text-[var(--muted-foreground)] mb-2 font-bold uppercase group-hover:text-[var(--primary)] transition-colors">{k}</div>
            <div className={`text-xl sm:text-2xl tabular-nums font-bold ${glow ? "text-[var(--primary)] text-glow-primary" : ""}`}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
