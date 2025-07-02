'use client'

import { Provider } from 'react-redux'
import { store } from './lib/store'
import { saveState } from "./lib/browserStorage"
import { debounce } from "debounce"
import { ThemeProvider } from './contexts/ThemeContext'
import { ReactNode } from 'react';

// Subscribe to store changes for persistence
store.subscribe(
  debounce(() => {
    saveState(store.getState());
  }, 800)
);

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
      {children}
      <div id="portal"></div>
      </ThemeProvider>
    </Provider>
  )
} 