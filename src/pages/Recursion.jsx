import { useState } from 'react';
import { fibTree } from '../algorithms/fibTree';
import { usePlayback } from '../hooks/usePlayback';
import FibTree from '../components/FibTree';
import Controls from '../components/Controls';
import StepLog from '../components/StepLog';
import Legend from '../components/Legend';
import InfoCard from '../components/InfoCard';

const legend = [
  { color: 'bg-yellow-400', label: 'Active (on call stack)' },
  { color: 'bg-green-500', label: 'Finished, value returned' },
];

export default function Recursion() {
  const [n, setN] = useState(5);
  const { step, index, total, playing, speed, dispatch } = usePlayback(fibTree, n);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Recursion Tree: Fibonacci</h2>
      <Legend items={legend} />
      <FibTree step={step} />
      <StepLog note={step.note} index={index} total={total} />
      <Controls
        playing={playing} speed={speed} total={total} dispatch={dispatch}
        size={n} sizeMin={2} sizeMax={7} sizeLabel="n =" onSizeChange={setN}
      />
      <InfoCard algoKey="fib" />
    </div>
  );
}