import React, { useState, useMemo } from 'react'
import { Search, Play, Bookmark, Clock, Zap, Sparkles } from 'lucide-react'
import { useGame } from '../context/GameContext'
import { CATEGORIES } from '../data/categories'

export function CategoryView() {
  const { missions, selectMission, toggleFavorite, favorites } = useGame()
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      const matchCat = selectedCat === 'all' || m.category === selectedCat
      const matchSearch =
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCat && matchSearch
    })
  }, [missions, selectedCat, searchQuery])

  return (
    <div className="space-y-6">
      {/* Title & Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-display">
            Jelajahi Kategori Misi
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pilih tantangan yang paling cocok dengan mood gabutmu saat ini.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari misi apa..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCat('all')}
          className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            selectedCat === 'all'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          🌟 Semua ({missions.length})
        </button>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCat === cat.id
          const count = missions.filter((m) => m.category === cat.id).length

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.name}</span>
              <span className="text-[10px] opacity-75">({count})</span>
            </button>
          )
        })}
      </div>

      {/* Missions Grid */}
      {filteredMissions.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 p-8">
          <p className="text-4xl mb-3">🔍</p>
          <h3 className="text-lg font-bold text-white mb-1">Misi Tidak Ditemukan</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Tidak ada misi yang cocok dengan kata kunci "{searchQuery}". Coba gunakan kata kunci lain atau ganti kategori.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMissions.map((mission) => {
            const isFav = favorites.includes(mission.id)
            const cat = CATEGORIES.find((c) => c.id === mission.category)

            return (
              <div
                key={mission.id}
                className="group p-5 rounded-3xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between"
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
                      className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                        isFav
                          ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                      }`}
                      title={isFav ? 'Hapus favorit' : 'Simpan favorit'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors font-display line-clamp-1">
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
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 active:scale-95 transition-all cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Mulai</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
