export default function DPTable({ a, b, step }) {
  const { table, cell, sources, path } = step;
  const key = (i, j) => `${i},${j}`;
  const src = new Set(sources.map(([i, j]) => key(i, j)));
  const trace = new Set(path.map(([i, j]) => key(i, j)));
  const cur = cell ? key(cell[0], cell[1]) : null;

  return (
    <div className="overflow-x-auto mb-4">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th /><th />
            {[...b].map((ch, j) => (
              <th key={j} className="w-9 h-9 text-sky-300">{ch}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.map((row, i) => (
            <tr key={i}>
              <th className="w-9 h-9 text-sky-300">{i === 0 ? '' : a[i - 1]}</th>
              {row.map((v, j) => {
                const k = key(i, j);
                const color =
                  k === cur ? 'bg-yellow-400 text-slate-900'
                  : trace.has(k) ? 'bg-green-500 text-slate-900'
                  : src.has(k) ? 'bg-sky-600'
                  : 'bg-slate-800';
                return (
                  <td key={j} className={`w-9 h-9 text-center border border-slate-700 ${color}`}>{v}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}