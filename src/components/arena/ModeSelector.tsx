import { MODES, type ModeId } from "@/constants/snippets";

const accentVar = (a: string) =>
  a === "primary" ? "var(--primary)" :
  a === "cyan" ? "var(--accent-cyan)" :
  a === "green" ? "var(--accent-green)" :
  a === "red" ? "var(--accent-red)" :
  "var(--accent-violet)";

export function ModeSelector({ value, onChange, compact = false }: {
  value: ModeId; onChange: (id: ModeId) => void; compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap gap-1 ${compact ? "" : "p-1 bg-[var(--surface-1)] hairline border"}`}>
      {MODES.map((m) => {
        const active = m.id === value;
        return (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            className={`px-2.5 py-1 text-[11px] tracking-[0.15em] uppercase transition-colors whitespace-nowrap ${
              active
                ? "bg-[var(--surface-3)] text-[var(--foreground)]"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
            style={active ? { boxShadow: `inset 0 -2px 0 ${accentVar(m.accent)}` } : undefined}
          >
            <span className="opacity-50 mr-1.5">{m.short}</span>
            {m.name}
          </button>
        );
      })}
    </div>
  );
}
