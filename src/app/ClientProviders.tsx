"use client";
import { ReduxProvider } from "./lib/ReduxProvider";
import { ThemeProviderWrapper } from "./contexts/ThemeProviderWrapper";
import { ReactNode } from "react";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProviderWrapper>
        {children}
      </ThemeProviderWrapper>
    </ReduxProvider>
  );
} 