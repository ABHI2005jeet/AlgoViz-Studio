export const info = {
  bubble: { time: 'O(n²)', space: 'O(1)', blurb: 'Swaps adjacent out-of-order pairs. The largest value bubbles to the end on each pass.' },
  merge: { time: 'O(n log n)', space: 'O(n)', blurb: 'Splits the array in halves, sorts each half recursively, then merges them.' },
  quick: { time: 'O(n log n) average, O(n²) worst', space: 'O(log n)', blurb: 'Picks a pivot, puts it in its final position, then recurses on both sides.' },
  bfs: { time: 'O(V + E)', space: 'O(V)', blurb: 'Explores level by level using a queue. Shortest path when every step costs the same.' },
  dfs: { time: 'O(V + E)', space: 'O(V)', blurb: 'Goes as deep as possible using a stack before backtracking. The path found may not be shortest.' },
  dijkstra: { time: 'O(V²) here (linear scan), O((V + E) log V) with a min-heap', space: 'O(V)', blurb: 'Always expands the cheapest unfinished cell. Needs non-negative weights.' },
  lcs: { time: 'O(m · n)', space: 'O(m · n)', blurb: 'Each cell stores the LCS length of two prefixes. Matching letters extend the diagonal, otherwise take the max of top and left.' },
  fib: { time: 'O(2ⁿ)', space: 'O(n)', blurb: 'Plain recursion recomputes the same subproblems again and again. DP removes exactly this repeated work.' },
};