import "@/styles/globals.css";
import { cn } from "@/utils/cn";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <main className={cn(
          "flex min-h-screen min-w-full items-center justify-center gap-10",
          inter.className,
        )}>
          <Toaster position="top-right" richColors />
          <Component {...pageProps} />
        </main>
      </NextUIProvider>
    </QueryClientProvider>
  );
}
