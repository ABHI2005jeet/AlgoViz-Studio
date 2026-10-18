import { useState } from 'react';
import { sortingAlgorithms } from '../algorithms';
import { usePlayback } from '../hooks/usePlayback';
import { randomArray } from '../utils';
import Bars from '../components/Bars';
import Controls from '../components/Controls';
import StepLog from '../components/StepLog';
import Legend from '../components/Legend';
import InfoCard from '../components/InfoCard';

const legend = [
  { color: 'bg-sky-500', label: 'Idle' },
  { color: 'bg-yellow-400', label: 'Comparing' },
  { color: 'bg-red-500', label: 'Swap / write' },
  { color: 'bg-green-500', label: 'Sorted' },
];

export default function Sorting() {
  const [algo, setAlgo] = useState('bubble');
  const [size, setSize] = useState(12);
  const [input, setInput] = useState(() => randomArray(12));
  const { step, index, total, playing, speed, dispatch } =
    usePlayback(sortingAlgorithms[algo].fn, input);

  const handleSize = (n) => { setSize(n); setInput(randomArray(n)); };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Sorting</h2>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="bg-slate-800 border border-slate-600 rounded px-3 py-1"
        >
          {Object.entries(sortingAlgorithms).map(([key, { name }]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>
<Legend items={legend} /> 
      <Bars step={step} />
      <StepLog note={step.note} index={index} total={total} />
      <Controls
        playing={playing} speed={speed} size={size} total={total}
        dispatch={dispatch}
        onRandomize={() => setInput(randomArray(size))}
        onSizeChange={handleSize}
      />
      <InfoCard algoKey={algo} />
    </div>
  );
}