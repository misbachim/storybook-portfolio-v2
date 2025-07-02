import { useState, useEffect, useCallback } from 'react';

// Get initial theme safely for SSR
const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return undefined; // Don't guess on SSR
  }
  
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
    return savedTheme;
  }
  
  // Fall back to system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

export function useDarkMode() {
  const [theme, setTheme] = useState<string | undefined>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  // Set theme after mount if undefined (SSR hydration)
  useEffect(() => {
    setMounted(true);
    if (theme === undefined && typeof window !== 'undefined') {
      const sysTheme = getInitialTheme();
      setTheme(sysTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!mounted || !theme) return;
    
    try {
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
      
      // Save to localStorage
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Theme update failed:', error);
    }
  }, [theme, mounted]);

  // Listen for system preference changes
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [mounted]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setThemeMode = useCallback((mode: 'light' | 'dark') => {
    if (['light', 'dark'].includes(mode)) {
      setTheme(mode);
    }
  }, []);

  return {
    theme: theme || 'light',
    toggleTheme,
    setTheme: setThemeMode,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    mounted,
  };
} 