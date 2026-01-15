// src/app/layout.tsx

import { ReactNode } from 'react';
import { Providers } from './Providers';


export const metadata = {
  title: 'Mini Patient Dashboard',
  description: 'A small demo for dentist patient management',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <Providers>{children}</Providers>
      </body>
    </html>  
  );
}
