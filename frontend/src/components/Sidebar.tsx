'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const navItems = [
  { label: 'Home', href: '/', icon: '⊞' },
  { label: 'My Groups', href: '/groups', icon: '👥' },
  { label: 'Assignments', href: '/assignments', icon: '📋' },
  { label: "AI Teacher's Toolkit", href: '/toolkit', icon: '🤖' },
  { label: 'My Library', href: '/library', icon: '📚' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-100 flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-gray-100">
        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">V</span>
        </div>
        <span className="font-bold text-gray-900 text-lg">VedaAI</span>
      </div>

      {/* Create Button */}
      <div className="px-3 py-4">
        <Link href="/assignments/create">
          <button className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <span className="text-lg leading-none">+</span>
            Create Assignment
          </button>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <div
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors cursor-pointer',
                pathname === item.href
                  ? 'bg-orange-50 text-orange-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.label === 'Assignments' && (
                <span className="ml-auto bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              )}
            </div>
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-100">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer mb-2">
            <span>⚙️</span>
            <span>Settings</span>
          </div>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm">
            👤
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">Delhi Public School</p>
            <p className="text-xs text-gray-400">Bokaro Steel City</p>
          </div>
        </div>
      </div>
    </aside>
  )
}