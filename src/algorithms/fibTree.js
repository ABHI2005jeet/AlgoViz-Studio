export function* fibTree(n) {
  const nodes = [];
  let leaves = 0;
  let maxDepth = 0;

  function build(k, depth, parent) {
    const node = { id: nodes.length, n: k, depth, parent, children: [], x: 0 };
    nodes.push(node);
    maxDepth = Math.max(maxDepth, depth);
    if (k > 1) {
      node.children = [build(k - 1, depth + 1, node.id), build(k - 2, depth + 1, node.id)];
      node.x = (node.children[0].x + node.children[1].x) / 2;
    } else {
      node.x = leaves++;
    }
    return node;
  }
  build(n, 0, null);

  const tree = { nodes, leaves, maxDepth };
  const status = {};
  const values = {};
  const snap = (note) => ({ tree, status: { ...status }, values: { ...values }, note });
  let calls = 0;

  yield snap(`Compute fib(${n}) with plain recursion`);

  function* walk(node) {
    calls++;
    status[node.id] = 'active';
    yield snap(`Call fib(${node.n})`);

    if (node.n <= 1) {
      values[node.id] = node.n;
    } else {
      const [l, r] = node.children;
      yield* walk(l);
      yield* walk(r);
      values[node.id] = values[l.id] + values[r.id];
    }

    status[node.id] = 'done';
    yield snap(`fib(${node.n}) = ${values[node.id]}`);
  }

  yield* walk(nodes[0]);
  yield snap(`fib(${n}) = ${values[0]} using ${calls} calls. Look how often the same values repeat.`);
}