export function TopNav() {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[var(--background)]/80 border-b hairline">
      <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[var(--primary)] shadow-[0_0_8px_var(--primary)]" />
          <span className="text-sm tracking-[0.3em]">CODESPRINT</span>
          <span className="ml-2 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">// S01 PRESEASON</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.25em] text-[var(--muted-foreground)]">
          <a href="#daily" className="hover:text-[var(--foreground)]">DAILY</a>
          <a href="#modes" className="hover:text-[var(--foreground)]">MODES</a>
          <a href="#flow" className="hover:text-[var(--foreground)]">FLOW</a>
          <a href="#arena" className="hover:text-[var(--foreground)]">LIVE ARENA</a>
          <a href="#ranks" className="hover:text-[var(--foreground)]">RANKS</a>
        </nav>
        <div className="flex items-center">
          <a
            href="/login"
            className="px-4 py-1.5 border hairline text-[11px] tracking-[0.25em] text-[var(--foreground)] hover:bg-[var(--surface-2)] hover:border-[var(--primary)] transition-all"
          >
            LOGIN
          </a>
        </div>
      </div>
    </header>
  );
}
