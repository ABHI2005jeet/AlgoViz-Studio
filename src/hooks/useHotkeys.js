import { useEffect } from 'react';

export function useHotkeys({ playing, total, dispatch }) {
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tag)) return;
      if (e.code === 'Space') {
        if (tag === 'BUTTON') return; // button handles its own Space press
        e.preventDefault();
        dispatch({ type: playing ? 'PAUSE' : 'PLAY' });
      } else if (e.key === 'ArrowRight') dispatch({ type: 'NEXT', last: total - 1 });
      else if (e.key === 'ArrowLeft') dispatch({ type: 'PREV' });
      else if (e.key === 'r' || e.key === 'R') dispatch({ type: 'RESET' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [playing, total, dispatch]);
}