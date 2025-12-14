'use client';

import { Component, type ReactNode } from 'react';

export class ClientErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  override state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  override render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
          <div className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gray-400 blur-2xl opacity-20 -z-10" />
            
            {/* Error icon with glow */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gray-400 blur-xl opacity-40 animate-pulse" />
                <div className="relative w-16 h-16 rounded-full bg-linear-to-br from-gray-100 to-gray-200 border-4 border-gray-300 flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-gray-700" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error content */}
            <div className="text-center mb-6">
              <h2 className="font-bold text-2xl mb-3 text-gray-900">
                Something went wrong
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 bg-gray-100 p-3 rounded-lg border border-gray-200">
                  {this.state.error.message}
                </p>
                {this.state.error.cause ? (
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                    {String(this.state.error.cause)}
                  </p>
                ) : null}
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => location.reload()}
              className="w-full px-6 py-3 bg-linear-to-r from-gray-700 to-gray-900 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-black transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}