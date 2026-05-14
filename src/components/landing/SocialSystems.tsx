import { Section, SectionHeader } from "./SectionHeader";
import { ShareCard } from "@/components/arena/ShareCard";

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
      <div className="grid lg:grid-cols-[auto_1fr] gap-px bg-[var(--border)]">
        <div className="bg-[var(--surface-1)] p-5 flex items-center justify-center">
          <ShareCard wpm={132} accuracy={0.972} flow={86} rank="Silver II" percentile={68} mode="JSX VELOCITY" />
        </div>
        <div className="bg-[var(--surface-1)] p-5">
          <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">PERFORMANCE HEATMAP · 52W</div>
          <div className="mt-3 grid gap-[3px]" style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}>
            {cells.map((v, i) => (
              <div key={i} className="aspect-square" style={{
                backgroundColor: `oklch(0.85 0.15 220 / ${0.06 + v * 0.7})`,
              }}/>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
            <span>JAN</span><span>APR</span><span>JUL</span><span>OCT</span><span>NOW</span>
          </div>

          <div className="mt-6 text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">REPLAY · CLUTCH RUN · 14.2s</div>
          <div className="mt-2 h-16 bg-[var(--surface-2)] border hairline relative overflow-hidden">
            <svg viewBox="0 0 200 40" className="w-full h-full">
              <path d="M0,30 Q40,5 60,20 T120,18 T200,12" stroke="var(--primary)" strokeWidth="0.8" fill="none"/>
              <circle cx="60" cy="20" r="1.4" fill="var(--accent-red)"/>
              <circle cx="120" cy="18" r="1.4" fill="var(--accent-red)"/>
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
}
