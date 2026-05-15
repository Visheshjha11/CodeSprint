import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="border-t hairline relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-[var(--spacing-container)] py-16 sm:py-24 lg:py-32 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] sm:text-[11px] tracking-[0.4em] text-[var(--muted-foreground)] mb-6 font-bold uppercase"
        >
          // END OF BRIEFING
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl tracking-tight font-bold"
        >
          Stop typing slow.<br/>
          <span className="text-[var(--primary)] text-glow-primary">Start sprinting.</span>
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="#arena-top"
            className="inline-block mt-12 px-12 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] text-[12px] tracking-[0.4em] hover:brightness-110 hover:scale-105 transition-all font-bold shadow-glow-primary animate-pulse-glow"
          >
            ENTER THE ARENA
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] font-bold opacity-60"
        >
          VELOCITY.DEV · DEVELOPER PERFORMANCE ENGINEERING · S01 · v1.0.4
        </motion.div>
      </div>
    </section>
  );
}
