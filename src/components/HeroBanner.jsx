import React, { useMemo } from 'react'
import { Sparkles, Dices, Flame, Trophy, Bookmark } from 'lucide-react'
import { useGame } from '../context/GameContext'

export function HeroBanner({ onRollQuest }) {
  const { missions, history, favorites } = useGame()

  // Dynamic greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour >= 4 && hour < 11) {
      return {
        title: 'Selamat Pagi Pejuang Presensi! 🌅',
        subtitle: 'Kopi sachet pantry sudah diseduh? Awali pagi dengan satu misi santuy.',
      }
    }
    if (hour >= 11 && hour < 15) {
      return {
        title: 'Selamat Siang Pejuang ISHOMA! 🍛',
        subtitle: 'Perut kenyang, mata mulai berat. Waktunya mainkan quest pengusir kantuk.',
      }
    }
    if (hour >= 15 && hour < 18) {
      return {
        title: 'Jam Kritis Menuju Tenggo! ⏱️',
        subtitle: 'Pertahankan fokus pura-pura sibuk sampai jarum jam menunjukkan 17.00 tepat.',
      }
    }
    return {
      title: 'Malam Pejuang Santuy! 🌙',
      subtitle: 'Lembur atau sengaja numpang wifi kantor? Lepaskan penat dengan misi asyik.',
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/60 to-purple-950/40 border border-slate-800 p-6 sm:p-8 shadow-2xl mb-8">
      {/* Decorative ambient glowing orbs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Zona Hiburan Bebas Stres</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
            {greeting.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            {greeting.subtitle}
          </p>

          {/* Quick stats counter */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-5 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span><strong>{history.length}</strong> Misi Selesai</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <Bookmark className="w-3.5 h-3.5 text-purple-400" />
              <span><strong>{favorites.length}</strong> Favorit</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span><strong>{missions.length}</strong> Koleksi Quest</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="shrink-0 flex sm:flex-col gap-3">
          <button
            onClick={onRollQuest}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:brightness-105 shadow-xl shadow-amber-400/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Dices className="w-5 h-5 text-slate-950 group-hover:rotate-180 transition-transform duration-500" />
            <span>Mulai Gabut Sekarang!</span>
          </button>
        </div>
      </div>
    </div>
  )
}
