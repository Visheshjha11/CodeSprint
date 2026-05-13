export function SectionHeader({ tag, title, sub }: { tag: string; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="text-[10px] tracking-[0.35em] text-[var(--muted-foreground)] mb-2">// {tag}</div>
      <h2 className="text-3xl md:text-4xl tracking-tight max-w-2xl">{title}</h2>
      {sub && <p className="mt-3 text-[var(--muted-foreground)] max-w-2xl">{sub}</p>}
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
