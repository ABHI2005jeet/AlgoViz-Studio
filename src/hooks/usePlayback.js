import { useReducer, useEffect, useMemo } from 'react';

// Pure reducer function to manage state transitions predictably in one place
function reducer(state, action) {
  switch (action.type) {
    case 'PLAY':  return { ...state, playing: true };
    case 'PAUSE': return { ...state, playing: false };
    case 'NEXT':
      // Auto-pause when reaching the final step to prevent out-of-bounds errors
      return state.index >= action.last
        ? { ...state, playing: false }
        : { ...state, index: state.index + 1 };
    case 'PREV':  return { ...state, playing: false, index: Math.max(0, state.index - 1) };
    case 'RESET': return { ...state, playing: false, index: 0 };
    case 'SPEED': return { ...state, speed: action.speed };
    default:      return state;
  }
}

export function usePlayback(generatorFn, input) {
  // Pre-compute all steps once using useMemo to enable instant scrubbing, step-back, and total length tracking
  const steps = useMemo(() => [...generatorFn(input)], [generatorFn, input]);
  
  // useReducer handles complex, interdependent playback states (index, play status, speed) cleanly
  const [state, dispatch] = useReducer(reducer, { index: 0, playing: false, speed: 400 });
  const last = steps.length - 1;

  // Manages the automatic timer loop when the visualizer is set to "PLAY"
  useEffect(() => {
    if (!state.playing) return;
    
    // Advance to the next step at an interval defined by the current speed
    const id = setInterval(() => dispatch({ type: 'NEXT', last }), state.speed);
    
    // Cleanup interval on unmount or state change to prevent memory leaks and ghost timers
    return () => clearInterval(id);
  }, [state.playing, state.speed, last]);

// new array or new algorithm → start from the beginning
  useEffect(() => { dispatch({ type: 'RESET' }); }, [steps]);

  return { step: steps[Math.min(state.index, last)], index: state.index, total: steps.length, ...state, dispatch };
}