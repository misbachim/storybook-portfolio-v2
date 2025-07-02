'use client'

import { createContext, useContext, ReactNode } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
  isDark: boolean;
  isLight: boolean;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const themeData = useDarkMode();
  
  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 