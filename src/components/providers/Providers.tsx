"use client";
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { SessionProvider } from "next-auth/react";
export default function Providers({ children }: { children: React.ReactNode }) {
  const quaryClient = new QueryClient({
    defaultOptions: {
      queries: {
        placeholderData: keepPreviousData,
      },
    },
  });

  return (
    <NuqsAdapter>
      <SessionProvider>
        <QueryClientProvider client={quaryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </NuqsAdapter>
  );
}
