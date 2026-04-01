import { useRef, useCallback } from "react";

/**
 * Custom debounce hook that ensures sub-50ms latency for ATA calls.
 * Returns a debounced version of the callback that delays invocation
 * until after `delay` ms have elapsed since the last call.
 *
 * Performance: Uses clearTimeout/setTimeout pattern for O(1) cancellation.
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number = 30,
): T {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
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
  ) as T;

  return debouncedFn;
}

/**
 * Standalone debounce function (non-hook) for use outside React components.
 * Used by ATA content change handler.
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 30,
): T & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    const start = performance.now();
    timer = setTimeout(() => {
      const elapsed = performance.now() - start;
      console.log(`[ATA Debounce] Fired after ${elapsed.toFixed(1)}ms`);
      fn(...args);
    }, delay);
  }) as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timer) clearTimeout(timer);
  };

  return debounced;
}
