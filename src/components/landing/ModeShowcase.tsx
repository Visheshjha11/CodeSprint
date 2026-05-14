import { Section, SectionHeader } from "./SectionHeader";
import { MODES, SNIPPETS } from "@/constants/snippets";
import { motion } from "framer-motion";

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
        sub="Pick your weapon. Each mode trains a different mechanic - frontend reflexes, terminal muscle, query construction."
      />
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border hairline shadow-xl"
      >
        {MODES.map((m, i) => {
          const preview = SNIPPETS[m.id][0].split("\n").slice(0, 3).join("\n");
          return (
            <motion.div 
              key={m.id} 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ backgroundColor: "var(--surface-2)", zIndex: 10 }}
              className="bg-[var(--surface-1)] p-8 sm:p-6 lg:p-8 group cursor-default border-l-2 transition-all flex flex-col relative"
              style={{ borderLeftColor: ACCENT[m.accent] }}
            >
              <div className="flex items-center justify-between text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] font-bold uppercase">
                <span>{m.short}</span>
                <span className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
              </div>
              <div className="mt-4 text-lg lg:text-xl font-bold tracking-tight">{m.name}</div>
              <div className="text-[11px] tracking-[0.1em] text-[var(--muted-foreground)] mt-2 font-bold opacity-80">{m.tag}</div>
              <pre className="mt-8 pt-6 border-t border-white/5 text-[11px] leading-relaxed text-[var(--muted-foreground)] font-mono overflow-hidden line-clamp-2 italic opacity-40 group-hover:opacity-100 transition-opacity">
                {preview}
              </pre>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
