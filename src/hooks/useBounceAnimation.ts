import type { RefObject } from 'react';

export function useBounceAnimation<T extends HTMLElement>(
  ref: RefObject<T | null>,
  className = 'bounce',
  duration = 380,
) {
  return () => {
    const el = ref.current;
    if (el) {
      el.classList.remove(className);
      void el.offsetWidth;
      el.classList.add(className);
      setTimeout(() => {
        el.classList.remove(className);
      }, duration);
    }
  };
}
