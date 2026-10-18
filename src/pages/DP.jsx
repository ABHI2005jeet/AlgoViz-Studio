import { useState, useMemo } from 'react';
import { lcs } from '../algorithms/lcs';
import { usePlayback } from '../hooks/usePlayback';
import DPTable from '../components/DPTable';
import Controls from '../components/Controls';
import StepLog from '../components/StepLog';
import Legend from '../components/Legend';
import InfoCard from '../components/InfoCard';

const legend = [
  { color: 'bg-yellow-400', label: 'Cell being computed' },
  { color: 'bg-sky-600', label: 'Cells it depends on' },
  { color: 'bg-green-500', label: 'Traceback path' },
];

export default function DP() {
  const [a, setA] = useState('AGGTAB');
  const [b, setB] = useState('GXTXAYB');
  const input = useMemo(() => ({ a, b }), [a, b]);
  const { step, index, total, playing, speed, dispatch } = usePlayback(lcs, input);

  const field = 'bg-slate-800 border border-slate-600 rounded px-3 py-1 w-40 uppercase';

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">DP Table: Longest Common Subsequence</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        <label className="flex items-center gap-2 text-sm">
          String A
          <input className={field} value={a} maxLength={10}
            onChange={(e) => setA(e.target.value.toUpperCase())} />
        </label>
        <label className="flex items-center gap-2 text-sm">
          String B
          <input className={field} value={b} maxLength={10}
            onChange={(e) => setB(e.target.value.toUpperCase())} />
        </label>
      </div>

      <Legend items={legend} />
      <DPTable a={a} b={b} step={step} />
      <StepLog note={step.note} index={index} total={total} />
      <Controls
        playing={playing} speed={speed} total={total} dispatch={dispatch}
        onRandomize={() => { setA('AGGTAB'); setB('GXTXAYB'); }}
        randomizeLabel="Load example"
      />
      <InfoCard algoKey="lcs" />
    </div>
  );
}