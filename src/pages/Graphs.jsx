import { useState } from 'react';
import { graphAlgorithms } from '../algorithms';
import { makeGrid } from '../algorithms/gridUtils';
import { usePlayback } from '../hooks/usePlayback';
import Grid from '../components/Grid';
import Controls from '../components/Controls';
import StepLog from '../components/StepLog';
import Legend from '../components/Legend';
import InfoCard from '../components/InfoCard';

const legend = [
  { color: 'bg-green-500', label: 'Start' },
  { color: 'bg-red-500', label: 'Target' },
  { color: 'bg-sky-300', label: 'Frontier' },
  { color: 'bg-sky-700', label: 'Visited' },
  { color: 'bg-yellow-300', label: 'Path' },
  { color: 'bg-slate-950 border border-slate-600', label: 'Wall' },
];

export default function Graphs() {
  const [algo, setAlgo] = useState('bfs');
  const [grid, setGrid] = useState(() => makeGrid());
  const { step, index, total, playing, speed, dispatch } =
    usePlayback(graphAlgorithms[algo].fn, grid);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Pathfinding</h2>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="bg-slate-800 border border-slate-600 rounded px-3 py-1"
        >
          {Object.entries(graphAlgorithms).map(([key, { name }]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
      </div>

      <Legend items={legend} />
      <Grid grid={grid} step={step} showWeights={algo === 'dijkstra'} />
      <StepLog note={step.note} index={index} total={total} />
      <Controls
        playing={playing} speed={speed} total={total}
        dispatch={dispatch}
        onRandomize={() => setGrid(makeGrid())}
        randomizeLabel="New grid"
      />
      <InfoCard algoKey={algo} />
    </div>
  );
}