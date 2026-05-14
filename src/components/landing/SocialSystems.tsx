import { Section, SectionHeader } from "./SectionHeader";
import { ShareCard } from "@/components/arena/ShareCard";
import { motion } from "framer-motion";

export function SocialSystems() {
  // 52 weeks x 7 days heatmap
  const cells = Array.from({ length: 52 * 7 }, (_, i) => {
    const r = (Math.sin(i * 0.31) + Math.cos(i * 0.17) + 2) / 4;
    return Math.max(0, r - (i % 13 === 0 ? 0.5 : 0));
  });

  return (
    <Section id="social">
      <SectionHeader
        tag="SOCIAL"
        title="Built for the developer flex."
        sub="Shareable rank cards. GitHub-style heatmaps. Replay frames worth posting. Status that travels."
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-px bg-[var(--border)] border hairline shadow-2xl"
      >
        <div className="bg-[var(--surface-1)] p-8 sm:p-10 lg:p-12 flex items-center justify-center border-b lg:border-b-0 lg:border-r hairline relative">
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          <motion.div 
            initial={{ scale: 0.85, opacity: 0, rotate: -2 }}
            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            whileHover={{ rotate: 1, scale: 1.05 }}
            className="w-full transition-transform duration-500 z-10"
          >
            <ShareCard wpm={132} accuracy={0.972} flow={86} rank="Silver II" percentile={68} mode="JSX VELOCITY" />
          </motion.div>
        </div>

        <div className="bg-[var(--surface-1)] p-8 sm:p-10 lg:p-12">
          <div className="text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] uppercase font-bold">PERFORMANCE HEATMAP · 52W</div>
          <div className="mt-6 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            <div className="min-w-[700px]">
              <div className="grid gap-[4px]" style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}>
                {cells.map((v, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: (i % 52) * 0.01 }}
                    className="aspect-square rounded-[1px]" 
                    style={{
                      backgroundColor: `oklch(0.85 0.15 220 / ${0.06 + v * 0.7})`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-5 text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase font-bold">
                <span>JAN</span>
                <span className="text-center">APR</span>
                <span className="text-center">JUL</span>
                <span className="text-center">OCT</span>
                <span className="text-right">NOW</span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] uppercase font-bold">REPLAY · CLUTCH RUN · 14.2s</div>
          <div className="mt-4 h-24 sm:h-32 bg-[oklch(0.15 0 0)] border hairline relative overflow-hidden group">
            <svg viewBox="0 0 200 40" className="w-full h-full p-4" preserveAspectRatio="none">
              <motion.path 
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M0,30 Q40,5 60,20 T120,18 T200,12" 
                stroke="var(--primary)" 
                strokeWidth="1.2" 
                fill="none"
              />
              <motion.circle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} cx="60" cy="20" r="2" fill="var(--accent-red)"/>
              <motion.circle initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }} cx="120" cy="18" r="2" fill="var(--accent-red)"/>
            </svg>
            
            {/* Playhead indicator */}
            <motion.div 
              animate={{ x: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 bottom-0 w-[2px] bg-[var(--primary)] shadow-[0_0_15px_var(--primary)] z-10 pointer-events-none" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-transparent to-[var(--background)] opacity-40 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
