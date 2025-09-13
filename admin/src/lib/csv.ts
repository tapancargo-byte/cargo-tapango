export function toCSV(rows: any[], columns: { key: string; label: string; map?: (row: any) => any }[]): string {
  const header = columns.map(c => escapeCSV(c.label)).join(',');
  const body = rows.map(r => columns.map(c => escapeCSV(String(c.map ? c.map(r) : r[c.key] ?? ''))).join(',')).join('\n');
  return header + '\n' + body;
}

function escapeCSV(val: string): string {
  if (/[",\n]/.test(val)) {
    return '"' + val.replace(/"/g, '""') + '"';
  }
  return val;
}
