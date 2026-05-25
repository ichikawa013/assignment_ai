'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { useSidebarStore } from '../store/sidebarStore'

const navItems = [
  { label: 'Home',               href: '/',        icon: '⊞' },
  { label: 'My Groups',          href: '/groups',  icon: '👥' },
  { label: "AI Teacher's Toolkit", href: '/toolkit', icon: '🤖' },
  { label: 'My Library',         href: '/library', icon: '📚' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { collapsed, toggle } = useSidebarStore()

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 h-full bg-white border-r border-gray-100 flex flex-col z-40',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
      {/* Logo + toggle */}
      <div className="flex items-center justify-between px-3 py-5 border-b border-gray-100 min-h-[64px]">
        {/* Logo — hide text when collapsed */}
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 shrink-0 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">V</span>
          </div>
          <span
            className={clsx(
              'font-bold text-gray-900 text-lg whitespace-nowrap overflow-hidden transition-all duration-300',
              collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
            VedaAI
          </span>
        </Link>

        {/* Toggle button */}
        <button
          onClick={toggle}
          className={clsx(
            'shrink-0 w-6 h-6 rounded-md flex items-center justify-center',
            'text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors',
            collapsed && 'mx-auto'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={clsx('transition-transform duration-300', collapsed && 'rotate-180')}
          >
            <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Create button */}
      <div className="px-2 py-4">
        <Link href="/assignments/create">
          {collapsed ? (
            // Icon-only button when collapsed
            <button
              className="w-full bg-gray-900 text-white rounded-lg flex items-center justify-center h-9 hover:bg-gray-800 active:scale-95 transition-all"
              title="Create Assignment"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          ) : (
            <button className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-800 active:scale-95 transition-all">
              <span className="text-lg leading-none">+</span>
              <span className="whitespace-nowrap">Create Assignment</span>
            </button>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              title={collapsed ? item.label : undefined}
              className={clsx(
                'flex items-center gap-3 px-2.5 py-2.5 rounded-lg mb-1 text-sm transition-colors cursor-pointer',
                collapsed && 'justify-center',
                pathname === item.href
                  ? 'bg-orange-50 text-orange-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && (
                <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-2 py-4 border-t border-gray-100">
        <Link href="/settings">
          <div
            title={collapsed ? 'Settings' : undefined}
            className={clsx(
              'flex items-center gap-3 px-2.5 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer mb-2',
              collapsed && 'justify-center'
            )}
          >
            <span className="shrink-0">⚙️</span>
            {!collapsed && <span>Settings</span>}
          </div>
        </Link>

        {/* User profile */}
        <div
          className={clsx(
            'flex items-center gap-3 px-2.5 py-2',
            collapsed && 'justify-center'
          )}
          title={collapsed ? 'Delhi Public School' : undefined}
        >
          <div className="w-8 h-8 shrink-0 rounded-full bg-orange-100 flex items-center justify-center text-sm">
            👤
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">Delhi Public School</p>
              <p className="text-xs text-gray-400 truncate">Bokaro Steel City</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}