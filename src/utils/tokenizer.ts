export type TokenKind =
  | "keyword" | "string" | "comment" | "number" | "punct" | "ident" | "operator" | "tag" | "attr" | "plain";

export interface Token { text: string; kind: TokenKind }

const KEYWORDS = new Set([
  "const","let","var","function","return","if","else","for","while","do","switch","case",
  "break","continue","class","extends","new","this","import","export","from","as","default",
  "async","await","try","catch","finally","throw","typeof","instanceof","in","of","void",
  "yield","null","undefined","true","false","public","private","protected","static","interface",
  "type","enum","SELECT","FROM","WHERE","INSERT","UPDATE","DELETE","JOIN","ON","GROUP","BY","ORDER","LIMIT",
  "def","lambda","pass","raise","with","print",
]);

export function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const push = (text: string, kind: TokenKind) => { if (text) out.push({ text, kind }); };

  while (i < src.length) {
    const c = src[i];

    // newline / whitespace preserved as plain
    if (c === "\n" || c === " " || c === "\t" || c === "\r") {
      let j = i; while (j < src.length && /[\s]/.test(src[j])) j++;
      push(src.slice(i, j), "plain"); i = j; continue;
    }

    // line comment //
    if (c === "/" && src[i+1] === "/") {
      let j = i; while (j < src.length && src[j] !== "\n") j++;
      push(src.slice(i, j), "comment"); i = j; continue;
    }
    // # comment (shell/python/sql)
    if (c === "#") {
      let j = i; while (j < src.length && src[j] !== "\n") j++;
      push(src.slice(i, j), "comment"); i = j; continue;
    }
    // block comment
    if (c === "/" && src[i+1] === "*") {
      let j = i + 2;
      while (j < src.length && !(src[j] === "*" && src[j+1] === "/")) j++;
      j = Math.min(src.length, j + 2);
      push(src.slice(i, j), "comment"); i = j; continue;
    }

    // strings
    if (c === '"' || c === "'" || c === "`") {
      const q = c; let j = i + 1;
      while (j < src.length) {
        if (src[j] === "\\") { j += 2; continue; }
        if (src[j] === q) { j++; break; }
        if (src[j] === "\n" && q !== "`") break;
        j++;
      }
      push(src.slice(i, j), "string"); i = j; continue;
    }

    // numbers
    if (/[0-9]/.test(c)) {
      let j = i; while (j < src.length && /[0-9.]/.test(src[j])) j++;
      push(src.slice(i, j), "number"); i = j; continue;
    }

    // identifiers / keywords
    if (/[A-Za-z_$]/.test(c)) {
      let j = i; while (j < src.length && /[A-Za-z0-9_$]/.test(src[j])) j++;
      const word = src.slice(i, j);
      const kind: TokenKind = KEYWORDS.has(word) ? "keyword"
        : /^[A-Z]/.test(word) ? "tag"
        : "ident";
      push(word, kind); i = j; continue;
    }

    // punctuation
    if (/[{}()[\];,.:]/.test(c)) { push(c, "punct"); i++; continue; }
    // operators
    if (/[+\-*/%=<>!&|^~?@]/.test(c)) {
      let j = i; while (j < src.length && /[+\-*/%=<>!&|^~?]/.test(src[j])) j++;
      push(src.slice(i, j), "operator"); i = j; continue;
    }

    push(c, "plain"); i++;
  }
  return out;
}

export function kindClass(kind: TokenKind): string {
  switch (kind) {
    case "keyword": return "text-[var(--accent-violet)]";
    case "string": return "text-[var(--accent-green)]";
    case "comment": return "text-[var(--muted-foreground)] italic";
    case "number": return "text-[var(--accent-cyan)]";
    case "tag": return "text-[var(--accent-cyan)]";
    case "operator": return "text-[var(--primary)]";
    case "punct": return "text-[var(--muted-foreground)]";
    case "ident": return "text-[var(--foreground)]";
    default: return "text-[var(--foreground)]";
  }
}
