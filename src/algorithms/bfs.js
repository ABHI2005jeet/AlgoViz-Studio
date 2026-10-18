import { neighbors, buildPath } from './gridUtils';

export function* bfs({ rows, cols, start, end, walls }) {
  const visited = new Set([start]);
  const parent = new Map();
  const queue = [start];
  const snap = (path, note) => ({
    visited: [...visited], frontier: [...queue], path, note,
  });

  yield snap([], 'Start at the source');

  while (queue.length) {
    const cur = queue.shift();

    if (cur === end) {
      const path = buildPath(parent, end);
      yield snap(path, `Target reached. Shortest path = ${path.length - 1} steps`);
      return;
    }

    for (const nb of neighbors(cur, rows, cols, walls)) {
      if (!visited.has(nb)) {
        visited.add(nb);
        parent.set(nb, cur);
        queue.push(nb);
      }
    }
    yield snap([], `Explore cell ${cur}, queue size ${queue.length}`);
  }

  yield snap([], 'No path found');
}