/**
 * Sleep for N milliseconds
 */
export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Sleep until a condition becomes true
 */
export async function sleepUntil(condition: () => boolean | Promise<boolean>, interval = 100): Promise<void> {
  while (!(await condition())) {
    await sleep(interval);
  }
}

/**
 * Retry async function with delay
 */
export async function retry<T>(fn: () => Promise<T>, options = { retries: 3, delay: 100 }): Promise<T> {
  let attempt = 0;

  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= options.retries) throw err;
      attempt++;
      await sleep(options.delay);
    }
  }
}

/**
 * Wrap a promise with a timeout
 */
export async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: any;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Timeout exceeded')), ms);
  });

  return Promise.race([promise.finally(() => clearTimeout(timer)), timeoutPromise]);
}

/**
 * Debounce an async function
 */
export function debounceAsync<T extends (...args: any[]) => Promise<any>>(fn: T, ms: number): T {
  let timer: NodeJS.Timeout | null = null;

  return (async (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);

    return new Promise(resolve => {
      timer = setTimeout(() => resolve(fn(...args)), ms);
    }) as ReturnType<T>;
  }) as T;
}

/**
 * Throttle an async function
 */
export function throttleAsync<T extends (...args: any[]) => Promise<any>>(fn: T, ms: number): T {
  let last = 0;
  let pending: Promise<any> | null = null;

  return (async (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - last >= ms) {
      last = now;
      pending = fn(...args);
      return pending;
    }

    return pending!;
  }) as T;
}

export default {
  sleep,
  sleepUntil,
  retry,
  timeout,
  debounceAsync,
  throttleAsync,
};
