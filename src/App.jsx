import React from 'react'
import { GameProvider, useGame } from './context/GameContext'
import { Navbar } from './components/Navbar'
import { BottomNav } from './components/BottomNav'
import { HeroBanner } from './components/HeroBanner'
import { MissionCard } from './components/MissionCard'
import { CategoryView } from './components/CategoryView'
import { FavoritesView } from './components/FavoritesView'
import { ProgressView } from './components/ProgressView'
import { Toast } from './components/Toast'
import { ConfirmModal } from './components/ConfirmModal'
import { CATEGORIES } from './data/categories'

function MainContent() {
  const { currentTab, nextMission, setSelectedCategory, setCurrentTab } = useGame()

  const handleRollRandom = () => {
    nextMission('all')
    setCurrentTab('home')
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 pb-20 md:pb-12">
      {/* Top Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        {currentTab === 'home' && (
          <div className="space-y-6">
            {/* Dynamic Greeting & CTA */}
            <HeroBanner onRollQuest={handleRollRandom} />

            {/* Quick Category Jump Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1">
                Kategori Cepat:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    nextMission(cat.id)
                    setCurrentTab('home')
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border cursor-pointer hover:scale-105 active:scale-95 transition-all ${cat.badgeBg}`}
                >
                  <span>{cat.emoji}</span> {cat.name}
                </button>
              ))}
            </div>

            {/* Active Mission Card */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Misi Aktif Saat Ini
                </span>
                <span className="text-xs text-slate-500">
                  Tekan tombol di bawah untuk selesaikan atau ganti
                </span>
              </div>
              <MissionCard />
            </div>
          </div>
        )}

        {currentTab === 'categories' && <CategoryView />}

        {currentTab === 'favorites' && <FavoritesView />}

        {currentTab === 'progress' && <ProgressView />}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-slate-900 text-center text-xs text-slate-500">
        <p className="font-medium">
          Dibuat dengan ☕ & segelas kopi gratisan untuk seluruh pejuang magang Indonesia.
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          GabutQuest • Bebas Login • 100% Gratis • Data Tersimpan di Perangkatmu
        </p>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Modals & Toasts */}
      <Toast />
      <ConfirmModal />
    </div>
  )
}

export default function App() {
  return (
    <GameProvider>
      <MainContent />
    </GameProvider>
  )
}
