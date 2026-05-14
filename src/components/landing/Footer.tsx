import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t hairline bg-[var(--surface-1)] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-2 h-2 bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] group-hover:scale-125 transition-transform" />
              <span className="text-sm tracking-[0.3em] text-[var(--foreground)]">CODESPRINT</span>
            </Link>
            <p className="text-[11px] tracking-[0.2em] text-[var(--muted-foreground)] max-w-md leading-relaxed">
              DEVELOPER PERFORMANCE ENGINEERING.<br />
              TRAIN YOUR MECHANICS. INCREASE YOUR FLOW STATE.
            </p>
          </div>
          
          <div className="flex flex-col md:items-end justify-start gap-8">
            <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">
              <a href="https://visheshjha.me" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">PORTFOLIO</a>
              <a href="https://github.com/Visheshjha11" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">GITHUB</a>
              <a href="https://www.linkedin.com/in/vishesh-jha-dev/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">LINKEDIN</a>
              <a href="mailto:visheshjha456@gmail.com" className="hover:text-[var(--foreground)] transition-colors">CONTACT</a>
            </nav>
            <nav className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] tracking-[0.3em] text-[var(--muted-foreground)]">
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">PRIVACY POLICY</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">TERMS OF SERVICE</a>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t hairline flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.25em] text-[var(--muted-foreground)]">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} CODESPRINT</span>
            <span className="text-[var(--border)] opacity-30">|</span>
            <span>BUILT BY <a href="https://visheshjha.me" target="_blank" rel="noopener noreferrer" className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">VISHESH</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
