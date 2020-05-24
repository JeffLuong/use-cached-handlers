import { useCallback, useRef } from 'react';

type Callback = (...args: any[]) => void;

type Handler = (value?: any) => void;

type GetHandlers = (key: string) => Handler;

type Handlers = { [key: string]: Handler };

interface UseCachedHandlers {
  (callback: Callback, dep: any[]): [GetHandlers, Handlers]
}

const useCachedHandlers: UseCachedHandlers = (callback, deps = []) => {
  const memoizedCb = useCallback(callback, [callback, ...deps]);
  const handlers: { current: Handlers } = useRef({});

  const getHandlers = (key: string): Callback => {
    if (handlers.current[key]) {
      return handlers.current[key];
    }

    handlers.current[key] = (...args: any[]) => memoizedCb(key, ...args);
    return handlers.current[key];
  };

  return [getHandlers, handlers.current];
}

export default useCachedHandlers;