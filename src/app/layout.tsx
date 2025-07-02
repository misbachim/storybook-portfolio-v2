import React, { ReactNode } from 'react';
import './globals.css'
import ClientProviders from './ClientProviders';

export const metadata = {
  title: 'Portfolio',
  description: 'My portfolio website',
}

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedTheme = localStorage.getItem('theme');
                  var theme = savedTheme;
                  
                  if (!savedTheme) {
                    // Check system preference
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                      theme = 'dark';
                    } else {
                      theme = 'light';
                    }
                  }
                  
                  document.documentElement.classList.add(theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <div id="portal"></div>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  )
} 