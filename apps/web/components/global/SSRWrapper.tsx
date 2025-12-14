'use client';

import {
  useTransition,
  useState,
  createContext,
  useContext,
  type ReactNode,
} from 'react';

type ActionResult = {
  success: boolean;
  error?: string;
  data?: unknown;
};

interface SSRContextValue {
  isPending: boolean;
  error: string;
  setError: (error: string) => void;

  executeAction: <T>(
    action: (payload: T) => Promise<ActionResult>
  ) => (payload: T) => Promise<void>;
}

const SSRContext = createContext<SSRContextValue | null>(null);

export const useSSR = () => {
  const ctx = useContext(SSRContext);
  if (!ctx) {
    throw new Error('useSSR must be used inside SSRWrapper');
  }
  return ctx;
};

export const SSRWrapper = ({ children }: { children: ReactNode }) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const executeAction =
    <T,>(action: (payload: T) => Promise<ActionResult>) =>
    async (payload: T): Promise<void> => {
      const safePayload =
        typeof payload === 'object'
          ? JSON.parse(JSON.stringify(payload))
          : payload;

      setError('');

      return new Promise<void>((resolve) => {
        startTransition(async () => {
          const result = await action(safePayload);
          console.log('Action result:', result);
          if (!result.success) {
            setError(result.error || 'Action failed');
          }
          resolve();
        });
      });
    };

  return (
    <SSRContext.Provider value={{ isPending, error, setError, executeAction }}>
      {isPending && (
        <div className="mb-4 p-4 bg-blue-100 rounded">
          Processing...
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 rounded">
          {error}
        </div>
      )}

      {children}
    </SSRContext.Provider>
  );
};
