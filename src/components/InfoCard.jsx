import { info } from '../data/info';

export default function InfoCard({ algoKey }) {
  const d = info[algoKey];
  if (!d) return null;
  return (
    <div className="mt-6 max-w-3xl rounded-lg bg-slate-800 p-4 text-sm text-slate-300">
      <p className="mb-2">{d.blurb}</p>
      <p>
        <span className="text-slate-400">Time:</span> {d.time} ·{' '}
        <span className="text-slate-400">Space:</span> {d.space}
      </p>
    </div>
  );
}