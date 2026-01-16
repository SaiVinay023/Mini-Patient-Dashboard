// src/app/layout.tsx

import type { Metadata } from 'next'
import { ReactNode } from 'react';
import { Providers } from './providers';
import '../styles/globals.css'


export const metadata: Metadata = {
  title: 'Treatbase | Patient Management Dashboard',
  description: 'Treatbase streamlines patient care with a modern dashboard built for clarity, speed, and control.',

}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
  maximumScale: 1,
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-gray-50 text-gray-900">
      <Providers>{children}</Providers>
      </body>
    </html>  
  );
}
