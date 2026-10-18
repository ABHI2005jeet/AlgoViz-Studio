import { useHotkeys } from '../hooks/useHotkeys';

export default function Controls({
  playing, speed, size, total, dispatch,
  onRandomize, randomizeLabel = 'Randomize',
  onSizeChange, sizeMin = 5, sizeMax = 40, sizeLabel = 'Size',
}) {
  useHotkeys({ playing, total, dispatch });
  const btn = 'px-3 py-1 rounded bg-slate-700 hover:bg-slate-600';
  const level = (1050 - speed) / 100;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex gap-2">
        <button className={btn} onClick={() => dispatch({ type: 'PREV' })}>Prev</button>
        <button
          className="px-3 py-1 rounded bg-sky-600 hover:bg-sky-500"
          onClick={() => dispatch({ type: playing ? 'PAUSE' : 'PLAY' })}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button className={btn} onClick={() => dispatch({ type: 'NEXT', last: total - 1 })}>Next</button>
        <button className={btn} onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </div>

      <label className="flex items-center gap-2 text-sm">
        Speed
        <input
          type="range" min="1" max="10" value={level}
          onChange={(e) => dispatch({ type: 'SPEED', speed: 1050 - Number(e.target.value) * 100 })}
        />
      </label>

      {onSizeChange && (
        <label className="flex items-center gap-2 text-sm">
          {sizeLabel} {size}
          <input
            type="range" min={sizeMin} max={sizeMax} value={size}
            onChange={(e) => onSizeChange(Number(e.target.value))}
          />
        </label>
      )}

      {onRandomize && <button className={btn} onClick={onRandomize}>{randomizeLabel}</button>}

      <p className="w-full text-xs text-slate-400">
        Shortcuts: Space play/pause · ← → step · R reset (click outside sliders first)
      </p>
    </div>
  );
}