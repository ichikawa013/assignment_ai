'use client'
import { useSidebarStore } from '../store/sidebarStore'
import clsx from 'clsx'

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebarStore()

  return (
    <main
      className={clsx(
        'flex-1 min-h-screen bg-[#f5f5f0] transition-all duration-300 ease-in-out',
        collapsed ? 'ml-16' : 'ml-56'
      )}
    >
      {children}
    </main>
  )
}