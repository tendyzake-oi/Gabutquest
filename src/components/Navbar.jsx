import React from 'react'
import { Sparkles, Gamepad2, Compass, Bookmark, Award } from 'lucide-react'
import { useGame } from '../context/GameContext'

export function Navbar() {
  const { levelInfo, xp, currentTab, setCurrentTab, favorites } = useGame()

  const navLinks = [
    { id: 'home', label: 'Beranda', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'categories', label: 'Kategori', icon: <Compass className="w-4 h-4" /> },
    {
      id: 'favorites',
      label: 'Favorit',
      icon: <Bookmark className="w-4 h-4" />,
      badge: favorites.length > 0 ? favorites.length : null,
    },
    { id: 'progress', label: 'Progres', icon: <Award className="w-4 h-4" /> },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <span className="text-xl">🎮</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-blue-400 via-purple-300 to-amber-300 bg-clip-text text-transparent font-display">
                GabutQuest
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">Teman Gabut Anak Magang</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id
            return (
              <button
                key={link.id}
                onClick={() => setCurrentTab(link.id)}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'text-white bg-slate-800/90 shadow-sm border border-slate-700/60'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] font-extrabold rounded-full bg-amber-500 text-slate-950">
                    {link.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User Level Chip */}
        <div
          onClick={() => setCurrentTab('progress')}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all hover:bg-slate-850"
        >
          <div className="text-xl sm:text-2xl">{levelInfo.badge}</div>
          <div className="text-left">
            <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-slate-300">
              <span className="text-purple-400 font-extrabold">Lv.{levelInfo.level}</span>
              <span className="truncate max-w-[90px] sm:max-w-[130px]">{levelInfo.title}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-semibold">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>{xp} XP</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
