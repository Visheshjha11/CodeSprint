import { Section, SectionHeader } from "./SectionHeader";
import { RhythmTimeline } from "@/components/arena/RhythmTimeline";

export function FlowScoreSection() {
  return (
    <Section id="flow">
      <SectionHeader
        tag="FLOW SCORE"
        title="The signature metric of developer fluency."
        sub="Not WPM. Not accuracy. The composite of how cleanly your fingers track your thinking."
      />
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-px bg-[var(--border)]">
        <div className="bg-[var(--surface-1)] p-6 sm:p-8">
          <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">FORMULA</div>
          <pre className="mt-5 text-[11px] sm:text-[13px] leading-7 overflow-x-auto whitespace-pre-wrap sm:whitespace-pre bg-[var(--surface-2)] p-4 border hairline">
<span className="text-[var(--accent-cyan)]">FlowScore</span> = 100
  × <span className="text-[var(--accent-green)]">accuracy</span>
  × <span className="text-[var(--accent-violet)]">rhythmStability</span>
  × <span className="text-[var(--primary)]">speedConsistency</span>
  × (0.5 + 0.5 × <span className="text-[var(--accent-red)]">momentum</span>)
          </pre>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-[12px]">
            <Def k="rhythmStability" v="1 − stdev(intervals) / mean(intervals)" />
            <Def k="speedConsistency" v="1 − stdev(rollingWPM) / mean(rollingWPM)" />
            <Def k="momentum" v="streak / 50, capped at 1" />
            <Def k="accuracy" v="correct / (correct + errors)" />
          </div>
        </div>
        <div className="bg-[var(--surface-1)] p-6 sm:p-8 flex flex-col">
          <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">RHYTHM TIMELINE</div>
          <div className="mt-5"><RhythmTimeline intervals={[]} height={80}/></div>
          <div className="mt-4 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] leading-relaxed">
            Lower variance = higher flow. Hesitations punch through as spikes.
          </div>
          <div className="mt-10 sm:mt-auto pt-6 grid grid-cols-3 gap-px bg-[var(--border)]">
            <Big k="FLOW"   v="86" tone="cyan" />
            <Big k="RHYTHM" v="0.91" />
            <Big k="MOM."   v="0.74" tone="primary" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Def({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[var(--muted-foreground)] text-[10px] tracking-[0.2em]">{k}</div>
      <div className="text-[var(--foreground)]">{v}</div>
    </div>
  );
}

function Big({ k, v, tone = "default" }: { k: string; v: string; tone?: "default" | "primary" | "cyan" }) {
  const c = tone === "primary" ? "text-[var(--primary)]" : tone === "cyan" ? "text-[var(--accent-cyan)]" : "";
  return (
    <div className="bg-[var(--surface-2)] px-3 py-2">
      <div className="text-[9px] tracking-[0.25em] text-[var(--muted-foreground)]">{k}</div>
      <div className={`text-xl tabular-nums ${c}`}>{v}</div>
    </div>
  );
}
