import React from 'react'
import { Bookmark, Play, Trash2, Clock, Zap, Sparkles, Compass } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { CATEGORIES } from '../data/categories'

export function FavoritesView() {
  const { missions, favorites, selectMission, toggleFavorite, setCurrentTab } = useGame()

  const favoritedMissions = missions.filter((m) => favorites.includes(m.id))

  if (favoritedMissions.length === 0) {
    return (
      <div className="py-20 text-center rounded-3xl bg-slate-900/60 border border-slate-800 p-8 shadow-xl max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-4 text-3xl">
          ⭐
        </div>
        <h2 className="text-xl font-black text-white font-display mb-2">
          Belum Ada Misi Favorit
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          Temukan misi-misi seru yang ingin kamu coba nanti, lalu tekan ikon bintang atau bookmark untuk menyimpannya di sini.
        </p>
        <button
          onClick={() => setCurrentTab('categories')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Jelajahi Misi Sekarang</span>
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white font-display">
            Misi Favorit ({favoritedMissions.length})
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Koleksi quest pilihanmu yang siap dimainkan kapan saja.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favoritedMissions.map((mission) => {
          const cat = CATEGORIES.find((c) => c.id === mission.category)

          return (
            <div
              key={mission.id}
              className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1 ${
                      cat ? cat.badgeBg : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    <span>{cat?.emoji}</span>
                    <span>{cat?.name}</span>
                  </span>
                  <button
                    onClick={() => toggleFavorite(mission.id)}
                    className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700/60 transition-colors cursor-pointer"
                    title="Hapus dari favorit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-base font-bold text-white font-display">
                  {mission.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {mission.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {mission.timeEstimate}
                  </span>
                  <span className="text-amber-400 font-bold flex items-center gap-0.5">
                    <Zap className="w-3 h-3 fill-amber-400" />
                    +{mission.xp} XP
                  </span>
                </div>

                <button
                  onClick={() => selectMission(mission.id, 'home')}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  <span>Mainkan</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
