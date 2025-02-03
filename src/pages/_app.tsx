import AppShell from "@/components/commons/AppShell";
import { onErrorHandler } from "@/libs/axios/responseHandler";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: () => {
        return false;
      },
    },
    mutations: {
      onError: onErrorHandler,
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <AppShell>
            <Component {...pageProps} />
          </AppShell>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
