export default function FibTree({ step }) {
  const { tree, status, values } = step;
  const { nodes, leaves, maxDepth } = tree;
  const X = 44, Y = 64, R = 17, PAD = 30;

  const width = PAD * 2 + Math.max(leaves - 1, 0) * X;
  const height = PAD * 2 + maxDepth * Y + 14;
  const px = (n) => PAD + n.x * X;
  const py = (n) => PAD + n.depth * Y;

  return (
    <div className="overflow-x-auto mb-4 rounded bg-slate-800 p-2">
      <svg width={width} height={height} className="mx-auto">
        {nodes.map((n) =>
          n.parent !== null && status[n.id] ? (
            <line
              key={`e${n.id}`}
              x1={px(nodes[n.parent])} y1={py(nodes[n.parent])}
              x2={px(n)} y2={py(n)}
              stroke="#64748b" strokeWidth="1.5"
            />
          ) : null,
        )}
        {nodes.map((n) =>
          status[n.id] ? (
            <g key={n.id}>
              <circle cx={px(n)} cy={py(n)} r={R}
                fill={status[n.id] === 'active' ? '#facc15' : '#22c55e'} />
              <text x={px(n)} y={py(n)} dy="4" textAnchor="middle"
                fontSize="11" fontWeight="600" fill="#0f172a">F{n.n}</text>
              {status[n.id] === 'done' && (
                <text x={px(n)} y={py(n) + R + 12} textAnchor="middle"
                  fontSize="10" fill="#cbd5e1">={values[n.id]}</text>
              )}
            </g>
          ) : null,
        )}
      </svg>
    </div>
  );
}