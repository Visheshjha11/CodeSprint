import { Section, SectionHeader } from "./SectionHeader";
import { RhythmTimeline } from "@/components/arena/RhythmTimeline";
import { motion } from "framer-motion";

export function FlowScoreSection() {
  return (
    <Section id="flow">
      <SectionHeader
        tag="FLOW SCORE"
        title="The signature metric of developer fluency."
        sub="Not WPM. Not accuracy. The composite of how cleanly your fingers track your thinking."
      />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-px bg-[var(--border)] border hairline shadow-xl overflow-hidden"
      >
        <div className="bg-[var(--surface-1)] p-6 sm:p-8 lg:p-10">
          <div className="text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] uppercase font-bold">FORMULA</div>
          <motion.pre 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mt-5 text-[11px] sm:text-[12px] leading-6 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre bg-[var(--surface-2)] p-5 border hairline font-mono shadow-inner"
          >
<span className="text-[var(--accent-cyan)] font-bold">FlowScore</span> = 100
  × <span className="text-[var(--accent-green)]">accuracy</span>
  × <span className="text-[var(--accent-violet)]">rhythmStability</span>
  × <span className="text-[var(--primary)]">speedConsistency</span>
  × (0.5 + 0.5 × <span className="text-[var(--accent-red)]">momentum</span>)
          </motion.pre>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[12px]">
            <Def k="rhythmStability" v="1 − stdev(intervals) / mean(intervals)" />
            <Def k="speedConsistency" v="1 − stdev(rollingWPM) / mean(rollingWPM)" />
            <Def k="momentum" v="streak / 50, capped at 1" />
            <Def k="accuracy" v="correct / (correct + errors)" />
          </div>
        </div>
        
        <div className="bg-[var(--surface-1)] p-6 sm:p-8 lg:p-10 flex flex-col border-t lg:border-t-0 lg:border-l hairline">
          <div className="text-[10px] tracking-[0.4em] text-[var(--muted-foreground)] uppercase font-bold">RHYTHM TIMELINE</div>
          <div className="mt-5 bg-[var(--surface-2)] p-4 border hairline">
            <RhythmTimeline intervals={[]} height={80}/>
          </div>
          <div className="mt-5 text-[11px] tracking-[0.1em] text-[var(--muted-foreground)] leading-relaxed italic opacity-80">
            Lower variance = higher flow. Hesitations punch through as spikes in the telemetry stream.
          </div>
          <div className="mt-8 sm:mt-auto pt-6 border-t hairline grid grid-cols-3 gap-px bg-[var(--border)] -mx-6 sm:-mx-8 lg:-mx-10">
            <Big k="FLOW"   v="86" tone="cyan" />
            <Big k="RHYTHM" v="0.91" />
            <Big k="MOM."   v="0.74" tone="primary" />
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function Def({ k, v }: { k: string; v: string }) {
  return (
    <div className="group cursor-default">
      <div className="text-[var(--muted-foreground)] text-[10px] tracking-[0.3em] uppercase mb-1 font-bold group-hover:text-[var(--primary)] transition-colors">{k}</div>
      <div className="text-[var(--foreground)] font-mono text-[11px] opacity-90">{v}</div>
    </div>
  );
}

function Big({ k, v, tone = "default" }: { k: string; v: string; tone?: "default" | "primary" | "cyan" }) {
  const c = tone === "primary" ? "text-[var(--primary)]" : tone === "cyan" ? "text-[var(--accent-cyan)]" : "text-[var(--foreground)]";
  return (
    <div className="bg-[var(--surface-1)] px-4 py-5 flex flex-col items-center justify-center transition-all hover:bg-[var(--surface-2)] group">
      <div className="text-[9px] tracking-[0.3em] text-[var(--muted-foreground)] mb-2 font-bold group-hover:text-[var(--primary)] transition-colors uppercase">{k}</div>
      <div className={`text-2xl tabular-nums font-bold ${c}`}>{v}</div>
    </div>
  );
}
