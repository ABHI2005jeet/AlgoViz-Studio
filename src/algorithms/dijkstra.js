import { neighbors, buildPath } from './gridUtils';

export function* dijkstra({ rows, cols, start, end, walls, weights }) {
  const dist = new Map([[start, 0]]);
  const parent = new Map();
  const done = new Set();
  const open = new Set([start]);
  const snap = (path, note) => ({
    visited: [...done], frontier: [...open], path, note,
  });

  yield snap([], 'Start with distance 0 at the source');

  while (open.size) {
    let cur = null;
    for (const n of open) if (cur === null || dist.get(n) < dist.get(cur)) cur = n;
    open.delete(cur);
    done.add(cur);

    if (cur === end) {
      const path = buildPath(parent, end);
      yield snap(path, `Target reached. Cheapest path cost = ${dist.get(end)}`);
      return;
    }

    for (const nb of neighbors(cur, rows, cols, walls)) {
      if (done.has(nb)) continue;
      const alt = dist.get(cur) + weights[nb];
      if (!dist.has(nb) || alt < dist.get(nb)) {
        dist.set(nb, alt);
        parent.set(nb, cur);
        open.add(nb);
      }
    }
    yield snap([], `Finalize cell ${cur} (cost ${dist.get(cur)}), ${open.size} cells waiting`);
  }

  yield snap([], 'No path found');
}