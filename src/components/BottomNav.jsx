import React from 'react'
import { Gamepad2, Compass, Bookmark, Award } from 'lucide-react'
import { useGame } from '../context/GameContext'

export function BottomNav() {
  const { currentTab, setCurrentTab, favorites } = useGame()

  const tabs = [
    { id: 'home', label: 'Beranda', icon: Gamepad2 },
    { id: 'categories', label: 'Kategori', icon: Compass },
    {
      id: 'favorites',
      label: 'Favorit',
      icon: Bookmark,
      badge: favorites.length > 0 ? favorites.length : null,
    },
    { id: 'progress', label: 'Progres', icon: Award },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800/80 backdrop-blur-lg px-2 py-1 safe-area-pb">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = currentTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className={`relative flex flex-col items-center py-2 px-3 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-purple-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 text-[9px] font-black rounded-full bg-amber-400 text-slate-950">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-0.5"></span>
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
