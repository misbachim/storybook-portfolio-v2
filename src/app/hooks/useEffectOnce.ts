import { useEffect, useRef } from 'react';

/**
 * Hook that runs an effect only once when the component mounts
 * @param {Function} effect - The effect function to run
 * @param {Array} deps - Dependencies array (optional, defaults to empty array)
 */
export function useEffectOnce(effect: () => void, deps: unknown[] = []) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      return effect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...deps]);
}

/**
 * Hook that runs a callback only once when the component mounts
 * @param {Function} callback - The callback function to run
 */
export function useCallbackOnce(callback: () => void) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      callback();
    }
  }, [callback]);
}

/**
 * Hook that runs an async effect only once when the component mounts
 * @param {Function} asyncEffect - The async effect function to run
 * @param {Array} deps - Dependencies array (optional, defaults to empty array)
 */
export function useAsyncEffectOnce(asyncEffect: () => void, deps: unknown[] = []) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      asyncEffect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncEffect, ...deps]);
}


