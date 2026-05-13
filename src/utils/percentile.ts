// Local deterministic percentile model based on WPM + accuracy.
// Approximates a developer-typing distribution; good enough for onboarding payoff.
export function percentile(wpm: number, accuracy: number): number {
  // Logistic over composite score
  const score = wpm * Math.max(0.5, accuracy);
  // mean ~ 60, spread ~ 18
  const z = (score - 60) / 18;
  const p = 1 / (1 + Math.exp(-z));
  return Math.max(1, Math.min(99, Math.round(p * 100)));
}

export interface RankInfo { tier: string; division: string; color: "primary" | "cyan" | "violet" | "green" | "red" }
const TIERS: { name: string; min: number; color: RankInfo["color"] }[] = [
  { name: "Bronze",      min: 0,  color: "red" },
  { name: "Silver",      min: 25, color: "cyan" },
  { name: "Gold",        min: 50, color: "primary" },
  { name: "Platinum",    min: 70, color: "cyan" },
  { name: "Master",      min: 85, color: "violet" },
  { name: "Architect",   min: 94, color: "violet" },
  { name: "10x Engineer",min: 98, color: "primary" },
];
const DIV = ["IV","III","II","I"];

export function rankFromPercentile(p: number): RankInfo {
  let tier = TIERS[0];
  for (const t of TIERS) if (p >= t.min) tier = t;
  // division within tier (rough)
  const idx = Math.min(3, Math.max(0, Math.floor((p - tier.min) / 6)));
  return { tier: tier.name, division: DIV[idx], color: tier.color };
}
