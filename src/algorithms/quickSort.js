export function* quickSort(input) {
  const arr = [...input];
  const sorted = [];
  const snap = (compare, swap, note) => ({ arr: [...arr], compare, swap, sorted: [...sorted], note });

  yield snap([], false, 'Start');

  function* qs(lo, hi) {
    if (lo > hi) return;
    if (lo === hi) {
      sorted.push(lo);
      yield snap([], false, `${arr[lo]} is in its final place`);
      return;
    }

    const pivot = arr[hi];
    let i = lo;

    for (let j = lo; j < hi; j++) {
      yield snap([j, hi], false, `Compare ${arr[j]} with pivot ${pivot}`);
      if (arr[j] < pivot) {
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          yield snap([i, j], true, `Swap ${arr[i]} and ${arr[j]}`);
        }
        i++;
      }
    }

    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    sorted.push(i);
    yield snap([i, hi], true, `Pivot ${pivot} placed at position ${i}`);

    yield* qs(lo, i - 1);
    yield* qs(i + 1, hi);
  }

  yield* qs(0, arr.length - 1);
  yield { ...snap([], false, 'Sorted'), sorted: arr.map((_, i) => i) };
}