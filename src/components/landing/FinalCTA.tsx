export function FinalCTA() {
  return (
    <section className="border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
        <div className="text-[10px] tracking-[0.35em] text-[var(--muted-foreground)] mb-4">// END OF BRIEFING</div>
        <h2 className="text-4xl md:text-5xl tracking-tight">
          Stop typing slow.<br/>
          <span className="text-[var(--primary)] text-glow-primary">Start sprinting.</span>
        </h2>
        <a
          href="#arena-top"
          className="inline-block mt-8 px-6 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-[11px] tracking-[0.3em] hover:brightness-110 transition"
        >
          ENTER THE ARENA
        </a>
        <div className="mt-10 text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">
          CODESPRINT · DEVELOPER PERFORMANCE ENGINEERING · S01
        </div>
      </div>
    </section>
  );
}
