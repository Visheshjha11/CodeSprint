import { useMemo } from "react";
import { tokenize, kindClass } from "@/utils/tokenizer";
import type { CharStatus } from "@/hooks/useTypingEngine";

interface Props {
  snippet: string;
  charStatuses: CharStatus[];
  errorFlash: boolean;
}

export function CodeSurface({ snippet, charStatuses, errorFlash }: Props) {
  const tokens = useMemo(() => tokenize(snippet), [snippet]);

  // Flatten to chars with token kind
  const chars = useMemo(() => {
    const out: { ch: string; cls: string }[] = [];
    for (const t of tokens) {
      const cls = kindClass(t.kind);
      for (const c of t.text) out.push({ ch: c, cls });
    }
    return out;
  }, [tokens]);

  // Split by line for gutter
  const lines: { ch: string; cls: string; status: CharStatus; idx: number }[][] = [];
  let current: typeof lines[number] = [];
  chars.forEach((c, i) => {
    const status = charStatuses[i] ?? "pending";
    if (c.ch === "\n") {
      lines.push(current);
      current = [];
    } else {
      current.push({ ...c, status, idx: i });
    }
  });
  lines.push(current);

  return (
    <div
      className={`relative font-mono text-[15px] leading-7 select-none ${errorFlash ? "animate-shake" : ""}`}
      aria-label="typing arena"
    >
      <div className="flex">
        <div className="pr-4 text-right text-[var(--muted-foreground)]/50 tabular-nums select-none">
          {lines.map((_, i) => (
            <div key={i} className="h-7">{String(i + 1).padStart(2, "0")}</div>
          ))}
        </div>
        <div className="flex-1">
          {lines.map((line, li) => (
            <div key={li} className="h-7 whitespace-pre">
              {line.length === 0 ? <span>&nbsp;</span> : line.map((c) => (
                <Char key={c.idx} ch={c.ch} cls={c.cls} status={c.status} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Char({ ch, cls, status }: { ch: string; cls: string; status: CharStatus }) {
  if (status === "current") {
    return (
      <span className="relative">
        <span className="absolute inset-y-0 -left-[1px] w-[2px] bg-[var(--primary)] animate-caret shadow-[0_0_8px_var(--primary)]" />
        <span className={`${cls} opacity-60`}>{ch === " " ? "\u00A0" : ch}</span>
      </span>
    );
  }
  if (status === "incorrect") {
    return <span className="text-[var(--accent-red)] underline decoration-[var(--accent-red)] underline-offset-4">{ch}</span>;
  }
  if (status === "correct") {
    return <span className={cls}>{ch === " " ? "\u00A0" : ch}</span>;
  }
  return <span className={`${cls} opacity-30`}>{ch === " " ? "\u00A0" : ch}</span>;
}
