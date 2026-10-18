export default function Grid({ grid, step, showWeights }) {
  const { cols, start, end, walls, weights } = grid;
  const visited = new Set(step.visited);
  const frontier = new Set(step.frontier);
  const path = new Set(step.path);

  return (
    <div
      className="grid gap-px mb-4 w-full max-w-3xl"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {walls.map((isWall, i) => {
        const color =
          i === start ? 'bg-green-500'
          : i === end ? 'bg-red-500'
          : path.has(i) ? 'bg-yellow-300 text-slate-900'
          : isWall ? 'bg-slate-950'
          : frontier.has(i) ? 'bg-sky-300 text-slate-900'
          : visited.has(i) ? 'bg-sky-700'
          : 'bg-slate-800';
        const showNum = showWeights && !isWall && i !== start && i !== end;
        return (
          <div key={i} className={`${color} aspect-square flex items-center justify-center text-[9px] text-slate-400`}>
            {showNum ? weights[i] : ''}
          </div>
        );
      })}
    </div>
  );
}