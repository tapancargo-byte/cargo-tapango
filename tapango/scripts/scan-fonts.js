const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const exts = new Set(['.ts', '.tsx']);
const findings = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.expo'].includes(entry.name)) continue;
      walk(p);
    } else if (exts.has(path.extname(entry.name))) {
      if (p.includes(path.join('src', 'types', 'tamagui-compat.d.ts'))) continue;
      const text = fs.readFileSync(p, 'utf8');
      const lines = text.split(/\r?\n/);
      lines.forEach((l, i) => {
        if (/\bH[124]\b/.test(l)) findings.push({ p, i: i + 1, msg: 'H1/H2/H4 usage' });
        if (/fontSize=\{\d+\}/.test(l)) findings.push({ p, i: i + 1, msg: 'Raw numeric fontSize' });
        if (/fontSize=\"\$[a-z]+\"/.test(l)) findings.push({ p, i: i + 1, msg: 'String token fontSize' });
      });
    }
  }
}

walk(ROOT);
if (findings.length) {
  console.log('Scan findings:');
  findings.forEach(f => console.log(`${f.p}:${f.i} ${f.msg}`));
  process.exitCode = 1;
} else {
  console.log('No font/heading issues found.');
}

