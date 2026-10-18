import { bubbleSort } from './bubbleSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { bfs } from './bfs';
import { dfs } from './dfs';
import { dijkstra } from './dijkstra';

export const sortingAlgorithms = {
  bubble: { name: 'Bubble Sort', fn: bubbleSort },
  merge:  { name: 'Merge Sort',  fn: mergeSort },
  quick:  { name: 'Quick Sort',  fn: quickSort },
};

export const graphAlgorithms = {
  bfs: { name: 'BFS (shortest path)', fn: bfs },
  dfs: { name: 'DFS',                 fn: dfs },
   dijkstra: { name: 'Dijkstra (weighted)', fn: dijkstra },
};