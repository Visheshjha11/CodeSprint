import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function TopNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "#daily", label: "DAILY" },
    { href: "#flow", label: "FLOW" },
    { href: "#modes", label: "MODES" },
    { href: "#social", label: "SOCIAL" },
    { href: "#ranks", label: "RANKS" },
  ];

  return (
    <header className="sticky top-0 z-[100] backdrop-blur-md bg-[var(--background)]/80 border-b hairline">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group z-[110]" onClick={() => setIsOpen(false)}>
          <div className="w-2 h-2 bg-[var(--primary)] shadow-[0_0_10px_var(--primary)] group-hover:scale-125 transition-transform" />
          <span className="text-sm tracking-[0.3em] font-mono font-bold">VELOCITY.DEV</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.3em] text-[var(--muted-foreground)]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[var(--primary)] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-5 py-2 border hairline text-[11px] tracking-[0.3em] text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all hidden sm:block font-bold"
          >
            LOGIN
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-[var(--foreground)] z-[110] p-2 relative transition-transform active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2.5" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] md:hidden transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {/* Blurred Background with Lower Opacity */}
        <div className="absolute inset-0 bg-[var(--background)]/60 backdrop-blur-2xl" onClick={() => setIsOpen(false)} />
        
        {/* Content Container */}
        <div className={`relative h-full flex flex-col items-center justify-center transition-transform duration-500 ease-out ${isOpen ? "translate-y-0" : "translate-y-8"}`}>
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map((link, i) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={`text-[20px] tracking-[0.5em] text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-all duration-300 uppercase ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: `${i * 75}ms` }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            
            <Link
              to="/login"
              className={`mt-6 px-12 py-4 bg-[var(--primary)] text-[var(--primary-foreground)] text-[14px] tracking-[0.4em] font-bold shadow-glow-primary transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              style={{ transitionDelay: "400ms" }}
              onClick={() => setIsOpen(false)}
            >
              LOGIN
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
