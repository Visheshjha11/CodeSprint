interface Props { intervals: number[]; height?: number }

export function RhythmTimeline({ intervals, height = 36 }: Props) {
  const data = intervals.length > 0 ? intervals.slice(-40) : [120, 110, 130, 100, 95, 105, 115, 90, 85, 95];
  const max = Math.max(...data, 200);
  const w = 100;
  const step = w / data.length;
  const path = data.map((v, i) => {
    const x = (i * step).toFixed(2);
    const y = (height - (1 - Math.min(v, max) / max) * 0 - (v / max) * (height - 4) - 2).toFixed(2);
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full h-9">
      <path d={path} stroke="var(--accent-cyan)" strokeWidth="0.8" fill="none" opacity="0.85" />
      <line x1="0" x2={w} y1={height - 2} y2={height - 2} stroke="var(--border)" strokeWidth="0.4" />
    </svg>
  );
}
