interface Props {
  wpm: number;
  accuracy: number;
  errors: number;
  combo: number;
  multiplier: number;
  flow: number;
  zone: number;
  rank?: string;
  mask?: boolean;
}

export function TelemetryHUD({ wpm, accuracy, errors, combo, multiplier, flow, zone, rank, mask }: Props) {
  return (
    <div className="grid grid-cols-3 gap-px bg-[var(--border)]">
      <Metric label="WPM"      value={wpm.toString()}                       big mask={mask} />
      <Metric label="ACC"      value={`${(accuracy * 100).toFixed(1)}%`} mask={mask} />
      <Metric label="ERR"      value={errors.toString().padStart(2, "0")} tone={errors > 0 ? "red" : "muted"} mask={mask} />
      <Metric label="COMBO"    value={`x${combo.toString().padStart(2, "0")}`} tone="primary" mask={mask} />
      <Metric label="MULT"     value={`x${multiplier.toFixed(1)}`} mask={mask} />
      <Metric label="FLOW"     value={flow.toString().padStart(2, "0")} tone="cyan" big mask={mask} />
      <Metric label="ZONE"     value={`Z${zone}`} mask={mask} />
      <Metric label="RANK"     value={rank ?? "-"} mask={mask} />
      <Metric label="STATUS"   value={errors > 3 ? "FAULT" : "Great"} tone={errors > 3 ? "red" : "green"} mask={mask} />
    </div>
  );
}

function Metric({
  label, value, tone = "default", big = false, mask = false,
}: { label: string; value: string; tone?: "default" | "muted" | "primary" | "cyan" | "green" | "red"; big?: boolean; mask?: boolean }) {
  const toneCls =
    tone === "primary" ? "text-[var(--primary)]" :
    tone === "cyan" ? "text-[var(--accent-cyan)]" :
    tone === "green" ? "text-[var(--accent-green)]" :
    tone === "red" ? "text-[var(--accent-red)]" :
    tone === "muted" ? "text-[var(--muted-foreground)]" :
    "text-[var(--foreground)]";
  return (
    <div className="bg-[var(--surface-1)] px-3 py-2">
      <div className="text-[10px] tracking-[0.2em] text-[var(--muted-foreground)]">{label}</div>
      <div className={`tabular-nums ${big ? "text-2xl" : "text-base"} ${toneCls} ${mask ? "blur-[6px] opacity-60 select-none transition-all duration-300" : ""}`}>{value}</div>
    </div>
  );
}
