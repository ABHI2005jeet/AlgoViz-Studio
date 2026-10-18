export default function Legend({ items }) {
  return (
    <div className="flex flex-wrap gap-4 mb-4 text-xs text-slate-300">
      {items.map(({ color, label }) => (
        <span key={label} className="flex items-center gap-1">
          <span className={`inline-block w-3 h-3 rounded-sm ${color}`} />
          {label}
        </span>
      ))}
    </div>
  );
}