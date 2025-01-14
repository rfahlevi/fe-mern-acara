import { cn } from "@/utils/cn";
import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

interface PropTypes {
  children: ReactNode;
}

export default function AppShell(props: PropTypes) {
  const { children } = props;
  return (
    <main className={cn(inter.className)}>
      <Toaster position="top-right" richColors closeButton />
      {children}
    </main>
  );
}
