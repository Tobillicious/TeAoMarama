declare module 'async-retry' {
  interface Options {
    retries?: number;
    factor?: number;
    minTimeout?: number;
    maxTimeout?: number;
    randomize?: boolean;
    onRetry?: (error: Error, attempt: number) => void;
  }

  type AttemptFunction<T> = (bail: (e: Error) => void, attempt: number) => Promise<T>;

  function retry<T>(fn: AttemptFunction<T>, opts?: Options): Promise<T>;

  export = retry;
}