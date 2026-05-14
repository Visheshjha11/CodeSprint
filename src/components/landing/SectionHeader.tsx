export function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[var(--muted-foreground)] mb-2 uppercase">// {tag}</div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl tracking-tight max-w-3xl leading-[1.1]">{title}</h2>
      {sub && <p className="mt-4 text-sm sm:text-base text-[var(--muted-foreground)] max-w-2xl leading-relaxed">{sub}</p>}
    </div>
  );
}

export function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t hairline">
      <div className="max-w-[1400px] mx-auto px-6 py-20">{children}</div>
    </section>
  );
}
