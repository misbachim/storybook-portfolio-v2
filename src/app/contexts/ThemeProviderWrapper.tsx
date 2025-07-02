import { ReactNode } from 'react';
import { ThemeProvider } from './ThemeContext';

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
} 