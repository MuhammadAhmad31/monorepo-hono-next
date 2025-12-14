"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { type ReactNode, useState } from "react";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <TanStackDevtools
        plugins={[
          {
            name: "TanStack Form",
            render: <FormDevtoolsPanel />,
            defaultOpen: true,
          },
          {
            name: "React Query",
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: true,
          },
        ]}
      />
    </QueryClientProvider>
  );
}
