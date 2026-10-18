export function* bubbleSort(input) {
  const arr = [...input];
  const sorted = [];

  yield { arr: [...arr], compare: [], swap: false, sorted: [...sorted], note: 'Start' };

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      yield { arr: [...arr], compare: [j, j + 1], swap: false, sorted: [...sorted], note: `Compare ${arr[j]} and ${arr[j + 1]}` };

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        yield { arr: [...arr], compare: [j, j + 1], swap: true, sorted: [...sorted], note: `Swap → ${arr[j]}, ${arr[j + 1]}` };
      }
    }
    sorted.push(arr.length - i - 1);
  }

  yield { arr: [...arr], compare: [], swap: false, sorted: arr.map((_, i) => i), note: 'Sorted' };
}