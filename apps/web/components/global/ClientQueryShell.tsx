'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export function ClientQueryShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  const loading = isFetching > 0 || isMutating > 0;

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4 min-w-[280px]">
            {/* Animated spinner with glow */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gray-400 blur-xl opacity-40 animate-pulse" />
              <div className="relative w-16 h-16 rounded-full border-4 border-gray-200">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-800 border-r-gray-600 animate-spin" />
              </div>
            </div>

            {/* Loading text with animation */}
            <div className="flex flex-col items-center gap-2">
              <span className="font-semibold text-lg text-gray-800">
                Loading
                <span className="inline-flex ml-1">
                  <span className="animate-bounce delay-0">.</span>
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                </span>
              </span>
              <span className="text-sm text-gray-500">Please wait a moment</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-linear-to-r from-gray-600 to-gray-800 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  );
}