import { useState } from "react";
import { Link } from "react-router-dom";

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#daily", label: "DAILY" },
    { href: "#flow", label: "FLOW" },
    { href: "#modes", label: "MODES" },
    { href: "#social", label: "SOCIAL" },
    { href: "#ranks", label: "RANKS" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--background)]/80 border-b hairline">
      <div className="max-w-[1400px] mx-auto px-6 h-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group z-50" onClick={() => setIsOpen(false)}>
          <div className="w-2 h-2 bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] group-hover:scale-125 transition-transform" />
          <span className="text-sm tracking-[0.3em]">CODESPRINT</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.25em] text-[var(--muted-foreground)]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[var(--foreground)] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-1.5 border hairline text-[11px] tracking-[0.25em] text-[var(--foreground)] hover:bg-[var(--surface-2)] hover:border-[var(--primary)] transition-all hidden sm:block"
          >
            LOGIN
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[var(--foreground)] z-50 p-1"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[var(--background)] flex flex-col items-center justify-center animate-in fade-in duration-300 md:hidden">
          <nav className="flex flex-col items-center gap-10 text-[14px] tracking-[0.4em] text-[var(--muted-foreground)]">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="hover:text-[var(--foreground)] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="mt-4 px-8 py-3 bg-[var(--primary)] text-[var(--primary-foreground)] text-[12px] tracking-[0.3em] font-bold"
              onClick={() => setIsOpen(false)}
            >
              LOGIN
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
