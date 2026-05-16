import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t hairline bg-[oklch(0.15 0 0)] relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-2.5 h-2.5 bg-[var(--primary)] shadow-[0_0_12px_var(--primary)] group-hover:scale-125 transition-transform duration-500" />
              <span className="text-base tracking-[0.4em] font-bold text-[var(--foreground)]">VELOCITY.DEV</span>
            </Link>
            <p className="text-[11px] tracking-[0.1em] text-[var(--muted-foreground)] max-w-[240px] leading-relaxed mb-8 opacity-80 ">
              TRAIN LIKE A TOP DEVELOPER. <br />
              IMPROVE SPEED, ACCURACY, <br />
              AND CODE FLUENCY.
            </p>
            
            <div className="flex flex-col gap-4">
              {/* <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] font-bold">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse shadow-[0_0_8px_var(--accent-green)]" />
                <span className="text-[var(--accent-green)] uppercase">All Systems Operational</span>
              </div> */}
              {/* <div className="text-[9px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase flex items-center gap-2">
                <span className="opacity-40">Build</span> 
                <span className="text-[var(--foreground)] opacity-100">v1-stable</span>
              </div> */}
            </div>
          </div>

          {/* Clusters */}
          <Cluster title="PRODUCT">
            <FooterLink href="#arena">Typing Arena</FooterLink>
            <FooterLink href="#modes">Loadouts</FooterLink>
            <FooterLink href="#ranks">Ranking Ladder</FooterLink>
            <FooterLink href="/login">Authentication</FooterLink>
          </Cluster>

          <Cluster title="DEVELOPERS">
            <FooterLink href="https://github.com/Visheshjha11/Velocitydev">Documentation</FooterLink>
            <FooterLink href="https://github.com/Visheshjha11/Velocitydev" external>GitHub Repository</FooterLink>
            <FooterLink href="https://github.com/Visheshjha11/Velocitydev/issues">Report Bug</FooterLink>
          </Cluster>

          <Cluster title="SOCIAL">
            <FooterLink href="https://github.com/Visheshjha11" external>GitHub</FooterLink>
            <FooterLink href="https://www.linkedin.com/in/visheshjha11" external>LinkedIn</FooterLink>
            <FooterLink href="https://visheshjha.me" external>Portfolio</FooterLink>
            <FooterLink href="mailto:visheshjha456@gmail.com">Contact Terminal</FooterLink>
          </Cluster>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t hairline flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-[10px] tracking-[0.25em] font-bold text-[var(--muted-foreground)] uppercase">
            <span>© {new Date().getFullYear()} VELOCITY.DEV</span>
            <div className="hidden sm:block w-px h-3 bg-[var(--border)]" />
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Engagement</a>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-[var(--surface-2)] border hairline rounded-sm">
              <span className="text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold">BUILT BY</span>
              <a href="https://visheshjha.me" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.1em] text-[var(--primary)] font-bold hover:text-glow-primary transition-all">VISHESH</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Cluster({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="text-[10px] tracking-[0.4em] font-bold text-[var(--muted-foreground)] uppercase opacity-60">
        // {title}
      </div>
      <nav className="flex flex-col gap-4">
        {children}
      </nav>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const isInternal = href.startsWith("#") || href.startsWith("/");
  
  if (isInternal) {
    return (
      <a 
        href={href} 
        className="text-[11px] tracking-[0.1em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:translate-x-1 transition-all duration-300 w-fit"
      >
        {children}
      </a>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-[11px] tracking-[0.1em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:translate-x-1 transition-all duration-300 flex items-center gap-1.5 w-fit"
    >
      {children}
      {external && <span className="text-[8px] opacity-40">↗</span>}
    </a>
  );
}

function GitHubStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 cursor-default group">
      <span className="text-[9px] tracking-[0.2em] text-[var(--muted-foreground)] font-bold uppercase group-hover:text-[var(--foreground)] transition-colors">{label}</span>
      <span className="text-[11px] font-mono tabular-nums text-[var(--foreground)] font-bold bg-[var(--surface-3)] px-2 py-0.5 border hairline rounded-[2px]">{value}</span>
    </div>
  );
}
