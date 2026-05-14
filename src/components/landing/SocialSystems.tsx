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
      <div className="grid lg:grid-cols-[auto_1fr] gap-px bg-[var(--border)] overflow-hidden border-b hairline">
        <div className="bg-[var(--surface-1)] p-8 sm:p-12 lg:p-8 flex items-center justify-center overflow-hidden">
          <div className="scale-[0.85] sm:scale-100 transition-transform">
            <ShareCard wpm={132} accuracy={0.972} flow={86} rank="Silver II" percentile={68} mode="JSX VELOCITY" />
          </div>
        </div>
        <div className="bg-[var(--surface-1)] p-6 sm:p-8 lg:p-10">
          <div className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">PERFORMANCE HEATMAP · 52W</div>
          <div className="mt-5 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            <div className="min-w-[600px]">
              <div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}>
                {cells.map((v, i) => (
                  <div key={i} className="aspect-square" style={{
                    backgroundColor: `oklch(0.85 0.15 220 / ${0.06 + v * 0.7})`,
                  }}/>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-5 text-[9px] sm:text-[10px] tracking-[0.25em] text-[var(--muted-foreground)] uppercase">
                <span>JAN</span>
                <span className="text-center">APR</span>
                <span className="text-center">JUL</span>
                <span className="text-center">OCT</span>
                <span className="text-right">NOW</span>
              </div>
            </div>
          </div>

          <div className="mt-10 text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">REPLAY · CLUTCH RUN · 14.2s</div>
          <div className="mt-3 h-16 sm:h-20 lg:h-24 bg-[var(--surface-2)] border hairline relative overflow-hidden">
            <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0,30 Q40,5 60,20 T120,18 T200,12" stroke="var(--primary)" strokeWidth="0.8" fill="none"/>
              <circle cx="60" cy="20" r="1.4" fill="var(--accent-red)"/>
              <circle cx="120" cy="18" r="1.4" fill="var(--accent-red)"/>
            </svg>
            {/* Playhead indicator for flair */}
            <div className="absolute top-0 bottom-0 w-[1px] bg-[var(--primary)]/30 animate-scan pointer-events-none" />
          </div>
        </div>
      </div>
    </Section>
  );
}
