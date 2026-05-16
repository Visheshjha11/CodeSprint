export type ModeId =
  | "jsx-velocity" | "recursive-storm" | "shell-protocol" | "critical-failure"
  | "neural-edit" | "query-strike" | "api-overdrive" | "syntax-rush";

export interface Mode {
  id: ModeId;
  name: string;
  short: string;
  tag: string;
  accent: "primary" | "cyan" | "green" | "red" | "violet";
}

export const MODES: Mode[] = [
  { id: "jsx-velocity",    name: "JSX Velocity",     short: "JSX", tag: "Frontend reflexes",        accent: "cyan" },
  { id: "recursive-storm", name: "Recursive Storm",  short: "DSA", tag: "Algorithmic depth",        accent: "violet" },
  { id: "shell-protocol",  name: "Shell Protocol",   short: "SH",  tag: "Terminal muscle memory",   accent: "green" },
  { id: "critical-failure",name: "Critical Failure", short: "BUG", tag: "Bug hunt under pressure",  accent: "red" },
  { id: "neural-edit",     name: "Neural Edit",      short: "AI",  tag: "AI-assisted edit race",    accent: "primary" },
  { id: "query-strike",    name: "Query Strike",     short: "SQL", tag: "Query construction speed", accent: "cyan" },
  { id: "api-overdrive",   name: "API Overdrive",    short: "API", tag: "Backend ops & middleware", accent: "violet" },
  { id: "syntax-rush",     name: "Syntax Rush",      short: "RX",  tag: "Pure code velocity",       accent: "green" },
];

export const SNIPPETS: Record<ModeId, string[]> = {
  "jsx-velocity": [
`function StatusBadge({ active, label }) {
  return (
    <span className={active ? "on" : "off"}>
      {label}
    </span>
  );
}`,
`const Card = ({ title, children }) => (
  <section className="card">
    <h3>{title}</h3>
    <div>{children}</div>
  </section>
);`,
  ],
  "recursive-storm": [
`function quicksort(arr) {
  if (arr.length < 2) return arr;
  const p = arr[0];
  const lo = arr.slice(1).filter(x => x < p);
  const hi = arr.slice(1).filter(x => x >= p);
  return [...quicksort(lo), p, ...quicksort(hi)];
}`,
  ],
  "shell-protocol": [
`git checkout -b feat/telemetry
git add src/lib/arena
git commit -m "init engine"
git push -u origin feat/telemetry`,
  ],
  "critical-failure": [
`function sum(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) {
    total += items[i].value;
  }
  return total;
}`,
  ],
  "neural-edit": [
`// AI suggestion - fix the off-by-one and null guard
function lastN(items, n) {
  if (!items) return [];
  return items.slice(items.length - n + 1);
}`,
  ],
  "query-strike": [
`SELECT user_id, COUNT(*) AS runs
FROM sprint_results
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY user_id
ORDER BY runs DESC
LIMIT 25;`,
  ],
  "api-overdrive": [
`app.post("/api/runs", async (req, res) => {
  const { wpm, accuracy, mode } = req.body;
  const run = await db.runs.insert({ wpm, accuracy, mode });
  res.status(201).json(run);
});`,
  ],
  "syntax-rush": [
`const debounce = (fn, ms) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};`,
    `def get_squared_evens(nums):
    return [x**2 for x in nums if x % 2 == 0]
    
result = get_squared_evens(range(10))`,
    `class Developer:
    def __init__(self, name, speed):
        self.name = name
        self.speed = speed

    def is_pro(self):
        return self.speed > 80`,
    `try:
    response = requests.get(url, timeout=5)
    response.raise_for_status()
    print(f"Status: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")`,
  ],
};

export function pickSnippet(mode: ModeId, index = 0): string {
  const bank = SNIPPETS[mode];
  return bank[index % bank.length];
}
