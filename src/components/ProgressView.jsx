import React from 'react'
import {
  Trophy,
  Sparkles,
  RotateCcw,
  Clock,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react'
import { useGame } from '../context/GameContext'
import { LEVELS } from '../data/levels'
import { CATEGORIES } from '../data/categories'

export function ProgressView() {
  const { xp, levelInfo, history, setIsResetModalOpen } = useGame()

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString)
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return 'Baru saja'
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. Header Profile Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 p-0.5 shadow-xl shadow-purple-500/20 shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl sm:text-5xl">
                {levelInfo.badge}
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Level {levelInfo.level} Anak Magang</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white font-display">
                {levelInfo.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 italic mt-1 max-w-md">
                "{levelInfo.quote}"
              </p>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:min-w-[180px] text-center">
            <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">
              Total XP Terkumpul
            </span>
            <div className="text-3xl font-black text-amber-400 font-display my-1">
              {xp} <span className="text-xs text-amber-300/70">XP</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">
              ✨ {history.length} Misi Selesai
            </span>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-300">
              {levelInfo.next
                ? `Progres menuju Level ${levelInfo.next.level}: ${levelInfo.next.title}`
                : 'Level Maksimal Tercapai! 👑'}
            </span>
            <span className="text-amber-400 font-bold">
              {levelInfo.next ? `${levelInfo.progressPercent}%` : '100%'}
            </span>
          </div>

          <div className="w-full h-3.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-amber-400 rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${levelInfo.progressPercent}%` }}
            ></div>
          </div>

          {levelInfo.next && (
            <p className="text-[11px] text-slate-400 mt-2 text-right">
              Butuh <strong>{levelInfo.xpToNext} XP</strong> lagi untuk naik level.
            </p>
          )}
        </div>
      </div>

      {/* 2. Perk Unlocked */}
      <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-white">Passive Skill Saat Ini:</h3>
          <p className="text-xs sm:text-sm text-emerald-300/90 mt-0.5 leading-relaxed">
            {levelInfo.perk}
          </p>
        </div>
      </div>

      {/* 3. Jenjang Level Showcase */}
      <div>
        <h3 className="text-lg font-black text-white font-display mb-3">
          Tangga Karier Magang Santuy
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LEVELS.map((lvl) => {
            const isUnlocked = xp >= lvl.minXp
            const isCurrent = lvl.level === levelInfo.level

            return (
              <div
                key={lvl.level}
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-500/15'
                    : isUnlocked
                    ? 'bg-slate-900/70 border-slate-800 text-slate-300'
                    : 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{lvl.badge}</span>
                    <span className="text-xs font-bold text-slate-400">
                      Lv.{lvl.level}
                    </span>
                  </div>
                  {isUnlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Terbuka
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> {lvl.minXp} XP
                    </span>
                  )}
                </div>
                <h4
                  className={`text-sm font-bold font-display ${
                    isCurrent ? 'text-white' : isUnlocked ? 'text-slate-200' : 'text-slate-500'
                  }`}
                >
                  {lvl.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {lvl.perk}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 4. Riwayat Misi Selesai */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-black text-white font-display">
            Riwayat Misi Selesai ({history.length})
          </h3>
        </div>

        {history.length === 0 ? (
          <div className="py-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800/80 p-6">
            <p className="text-3xl mb-2">📜</p>
            <h4 className="text-sm font-bold text-white mb-1">Belum Ada Misi yang Diselesaikan</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Selesaikan misi pertamamu di Beranda untuk mulai mengumpulkan poin XP dan mengisi buku riwayat!
            </p>
          </div>
        ) : (
          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
            {history.map((item) => {
              const cat = CATEGORIES.find((c) => c.id === item.category)
              return (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl shrink-0">{cat?.emoji || '🎯'}</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {formatDate(item.completedAt)}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-400 px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                    +{item.xp} XP
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 5. Storage disclaimer & Reset Progress Action */}
      <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 text-center sm:text-left">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>
            Progres & favorit tersimpan otomatis secara lokal di peramban (browser) ini.
          </span>
        </div>

        <button
          onClick={() => setIsResetModalOpen(true)}
          className="px-4 py-2.5 rounded-xl border border-rose-500/40 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progres</span>
        </button>
      </div>
    </div>
  )
}
