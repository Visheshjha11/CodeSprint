import { TypingArena } from "@/components/arena/TypingArena";

export function HeroArena() {
  return (
    <section className="relative">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-6 pt-10 pb-16 grid lg:grid-cols-[420px_1fr] gap-10">
        <div className="flex flex-col justify-center">
          <div className="text-[10px] tracking-[0.35em] text-[var(--muted-foreground)] mb-4">
            DEVELOPER PERFORMANCE ENGINEERING
          </div>
          <h1 className="text-4xl md:text-5xl leading-[1.05] tracking-tight">
            Train Like A<br />
            <span className="text-[var(--primary)] text-glow-primary">10x Developer.</span>
          </h1>
          <p className="mt-5 text-[var(--muted-foreground)] leading-relaxed">
            Autocomplete made your mechanics weak.<br />
            Your fingers should move as fast as your brain.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="#arena-top"
              className="px-5 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] tracking-[0.3em] hover:brightness-110 transition"
            >
              START SPRINT
            </a>
            <a
              href="#flow"
              className="px-5 py-3 border hairline text-[11px] tracking-[0.3em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)]"
            >
              FLOW SCORE ↓
            </a>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-px bg-[var(--border)] max-w-[360px]">
            <Stat k="ACTIVE" v="2,481" tone="green" />
            <Stat k="P99 WPM" v="142" tone="cyan" />
            <Stat k="SEASONS" v="01" />
          </div>
        </div>

        <div id="arena-top" className="min-w-0">
          <TypingArena demo={true} />
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v, tone = "default" }: { k: string; v: string; tone?: "default" | "green" | "cyan" }) {
  const cls = tone === "green" ? "text-[var(--accent-green)]" : tone === "cyan" ? "text-[var(--accent-cyan)]" : "text-[var(--foreground)]";
  return (
    <div className="bg-[var(--surface-1)] px-3 py-2">
      <div className="text-[9px] tracking-[0.25em] text-[var(--muted-foreground)]">{k}</div>
      <div className={`text-base tabular-nums ${cls}`}>{v}</div>
    </div>
  );
}
