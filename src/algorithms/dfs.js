import { neighbors, buildPath } from './gridUtils';

export function* dfs({ rows, cols, start, end, walls }) {
  const visited = new Set();
  const parent = new Map();
  const stack = [start];
  const snap = (path, note) => ({
    visited: [...visited], frontier: [...stack], path, note,
  });

  yield snap([], 'Start at the source');

  while (stack.length) {
    const cur = stack.pop();
    if (visited.has(cur)) continue;
    visited.add(cur);

    if (cur === end) {
      const path = buildPath(parent, end);
      yield snap(path, `Target reached. Path found = ${path.length - 1} steps (not necessarily shortest)`);
      return;
    }

    for (const nb of neighbors(cur, rows, cols, walls).reverse()) {
      if (!visited.has(nb)) {
        parent.set(nb, cur);
        stack.push(nb);
      }
    }
    yield snap([], `Go deeper from cell ${cur}, stack size ${stack.length}`);
  }

  yield snap([], 'No path found');
}