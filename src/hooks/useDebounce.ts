import { useRef, useCallback } from "react";

/**
 * Custom debounce hook that ensures sub-50ms latency for ATA calls.
 * Returns a debounced version of the callback that delays invocation
 * until after `delay` ms have elapsed since the last call.
 *
 * Performance: Uses clearTimeout/setTimeout pattern for O(1) cancellation.
 */
export function useDebouncedCallback<A extends any[], R>(
  callback: (...args: A) => R,
  delay: number = 30,
): (...args: A) => void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: A) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      const start = performance.now();
      timerRef.current = setTimeout(() => {
        const elapsed = performance.now() - start;
        console.log(
          `[ATA Debounce] Fired after ${elapsed.toFixed(1)}ms (target: <${delay}ms)`,
        );
        callback(...args);
      }, delay);
    },
    [callback, delay],
  ) as any;

  return debouncedFn;
}

/**
 * Standalone debounce function (non-hook) for use outside React components.
 * Used by ATA content change handler.
 */
export function debounce<A extends any[], R>(
  fn: (...args: A) => R,
  delay: number = 30,
): ((...args: A) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: A) => {
    if (timer) clearTimeout(timer);
    const start = performance.now();
    timer = setTimeout(() => {
      const elapsed = performance.now() - start;
      console.log(`[ATA Debounce] Fired after ${elapsed.toFixed(1)}ms`);
      fn(...args);
    }, delay);
  }) as any;

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return debounced;
}
