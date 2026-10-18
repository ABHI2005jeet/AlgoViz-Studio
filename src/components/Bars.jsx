export default function Bars({ step }) {
  return (
    <div className="flex items-end gap-1 h-64 mb-4">
      {step.arr.map((v, i) => {
        const color = step.sorted.includes(i) ? 'bg-green-500'
          : step.compare.includes(i) ? (step.swap ? 'bg-red-500' : 'bg-yellow-400')
          : 'bg-sky-500';
        return <div key={i} className={`${color} flex-1 rounded-t`} style={{ height: `${v}%` }} />;
      })}
    </div>
  );
}