export function* mergeSort(input) {
  const arr = [...input];
  const snap = (compare, swap, note, sorted = []) => ({ arr: [...arr], compare, swap, sorted, note });

  yield snap([], false, 'Start');

  function* merge(lo, mid, hi) {
    const left = arr.slice(lo, mid + 1);
    const right = arr.slice(mid + 1, hi + 1);
    let i = 0, j = 0, k = lo;

    while (i < left.length && j < right.length) {
      yield snap([k], false, `Compare ${left[i]} and ${right[j]}`);
      arr[k] = left[i] <= right[j] ? left[i++] : right[j++];
      yield snap([k], true, `Write ${arr[k]} at position ${k}`);
      k++;
    }
    while (i < left.length) { arr[k] = left[i++]; yield snap([k], true, `Write ${arr[k]} at position ${k}`); k++; }
    while (j < right.length) { arr[k] = right[j++]; yield snap([k], true, `Write ${arr[k]} at position ${k}`); k++; }
  }

  function* sort(lo, hi) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    yield* sort(lo, mid);
    yield* sort(mid + 1, hi);
    yield* merge(lo, mid, hi);
  }

  yield* sort(0, arr.length - 1);
  yield snap([], false, 'Sorted', arr.map((_, i) => i));
}