'use client'

import React from 'react';
import Main from './components/Main/Main';
import Background from './components/background/Background';
import { useTheme } from './contexts/ThemeContext';

export default function HomePage() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    // Centered spinner
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <>
      <Background mode={theme} />
      <div className="min-h-screen bg-cover bg-center backdrop-blur-sm max-w-6xl mx-auto px-4 pt-8 pb-8">
        <Main mode={theme} toggleMode={toggleTheme} />
      </div>
    </>
  );
} 