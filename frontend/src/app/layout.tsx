// app/layout.tsx
// NOTE: RootLayout is a Server Component — sidebar state is read
// client-side via a wrapper so we avoid hydration mismatches.

import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import MainWrapper from '../components/MainWrapper'

export const metadata: Metadata = {
  title: 'VedaAI - Assessment Creator',
  description: 'AI-powered assessment creator for teachers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <MainWrapper>{children}</MainWrapper>
        </div>
      </body>
    </html>
  )
}