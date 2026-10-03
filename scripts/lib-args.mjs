// Shared argument cleanup for the helper scripts.
// PowerShell/cmd quirk: a quoted path that ends in a backslash ("C:\My vault\" --dry-run) makes Windows
// fold the closing quote and everything after it into ONE argument: `C:\My vault" --dry-run`.
// cleanArgs() cuts such an argument at the quote and turns the rest back into separate arguments.
export function cleanArgs(argv) {
  const out = [];
  for (const a of argv) {
    const q = a.indexOf('"');
    if (q < 0) { out.push(a); continue; }
    const head = a.slice(0, q);
    if (head) out.push(head);
    for (const t of a.slice(q + 1).split(/\s+/)) { const tok = t.replace(/"/g, ''); if (tok) out.push(tok); }
    process.stderr.write('Note: a quote character was found in the arguments (a quoted path must not end with a backslash). It was split back into separate arguments.\n');
  }
  return out;
}
