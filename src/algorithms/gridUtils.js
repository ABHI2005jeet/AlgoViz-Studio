export function makeGrid(rows = 15, cols = 25, density = 0.25) {
  const mid = Math.floor(rows / 2) * cols;
  const start = mid + 1;
  const end = mid + cols - 2;
  const walls = Array.from(
    { length: rows * cols },
    (_, i) => i !== start && i !== end && Math.random() < density,
  );
  const weights = Array.from({ length: rows * cols }, () => Math.floor(Math.random() * 9) + 1);
  return { rows, cols, start, end, walls, weights };
}

export function neighbors(i, rows, cols, walls) {
  const r = Math.floor(i / cols);
  const c = i % cols;
  const out = [];
  if (r > 0) out.push(i - cols);
  if (c < cols - 1) out.push(i + 1);
  if (r < rows - 1) out.push(i + cols);
  if (c > 0) out.push(i - 1);
  return out.filter((n) => !walls[n]);
}

export function buildPath(parent, end) {
  const path = [];
  let cur = end;
  while (cur !== undefined) {
    path.push(cur);
    cur = parent.get(cur);
  }
  return path.reverse();
}