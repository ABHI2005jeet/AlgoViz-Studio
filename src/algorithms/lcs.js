export function* lcs({ a, b }) {
  const m = a.length;
  const n = b.length;
  const t = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const snap = (cell, sources, note, path = []) => ({
    table: t.map((r) => [...r]), cell, sources, path, note,
  });

  yield snap(null, [], 'Row 0 and column 0 are 0 (empty prefix)');

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        t[i][j] = t[i - 1][j - 1] + 1;
        yield snap([i, j], [[i - 1, j - 1]], `${a[i - 1]} = ${b[j - 1]} → 1 + diagonal = ${t[i][j]}`);
      } else {
        t[i][j] = Math.max(t[i - 1][j], t[i][j - 1]);
        yield snap([i, j], [[i - 1, j], [i, j - 1]], `${a[i - 1]} ≠ ${b[j - 1]} → max(top, left) = ${t[i][j]}`);
      }
    }
  }

  // traceback
  let i = m, j = n, result = '';
  const path = [];
  while (i > 0 && j > 0) {
    path.push([i, j]);
    if (a[i - 1] === b[j - 1]) { result = a[i - 1] + result; i--; j--; }
    else if (t[i - 1][j] >= t[i][j - 1]) i--;
    else j--;
  }
  yield snap(null, [], `LCS = "${result}" (length ${t[m][n]})`, path);
}