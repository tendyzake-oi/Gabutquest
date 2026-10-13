import React from 'react'
import {
  RotateCw,
  Bookmark,
  Share2,
  CheckCircle,
  Clock,
  Zap,
  Sparkles,
  ChevronRight,
  ListOrdered
} from 'lucide-react'
import { useGame } from '../context/GameContext'
import { CATEGORIES } from '../data/categories'
import {
  ReflexGame,
  ClickerGame,
  WordScrambleGame,
  ZenBreathing,
  RiddleSpoiler
} from './InteractiveWidgets'

export function MissionCard() {
  const {
    currentMission,
    nextMission,
    toggleFavorite,
    favorites,
    completeCurrentMission,
    handleShare,
    selectedCategory,
    setSelectedCategory,
  } = useGame()

  if (!currentMission) return null

  const isFavorited = favorites.includes(currentMission.id)
  const categoryMeta =
    CATEGORIES.find((c) => c.id === currentMission.category) || CATEGORIES[0]

  const difficultyColors = {
    Mudah: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    Sedang: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    Sulit: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  }

  return (
    <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl p-5 sm:p-7 backdrop-blur-md transition-all">
      {/* Category header strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${categoryMeta.badgeBg}`}
          >
            <span>{categoryMeta.emoji}</span>
            <span>{categoryMeta.name}</span>
          </span>
          <span
            className={`px-2.5 py-1 rounded-xl text-xs font-semibold border ${
              difficultyColors[currentMission.difficulty] || difficultyColors.Mudah
            }`}
          >
            {currentMission.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentMission.timeEstimate}</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 font-bold px-2 py-0.5 rounded-lg bg-amber-400/10 border border-amber-400/20">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>+{currentMission.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Main Quest Content */}
      <div className="py-5">
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug font-display mb-3">
          {currentMission.title}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          {currentMission.description}
        </p>

        {/* Step-by-step guidance if available */}
        {currentMission.instructions && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-2">
              <ListOrdered className="w-4 h-4" />
              <span>Instruksi Misi:</span>
            </div>
            {currentMission.instructions}
          </div>
        )}

        {/* Interactive mini-games & riddle spoilers */}
        {currentMission.gameType === 'reflex' && <ReflexGame />}
        {currentMission.gameType === 'clicker' && <ClickerGame />}
        {currentMission.gameType === 'wordscramble' && (
          <WordScrambleGame scrambleData={currentMission.scrambleData} />
        )}
        {currentMission.gameType === 'zenBreathing' && <ZenBreathing />}

        {currentMission.category === 'riddle' && (
          <RiddleSpoiler
            question={currentMission.riddleQuestion}
            answer={currentMission.riddleAnswer}
            hint={currentMission.riddleHint}
          />
        )}
      </div>

      {/* Actions footer */}
      <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {/* Next Mission Button */}
          <button
            onClick={() => nextMission()}
            className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700/60 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            title="Ambil misi acak berikutnya"
          >
            <RotateCw className="w-4 h-4" />
            <span>Misi Berikutnya</span>
          </button>

          {/* Favorite Toggle Button */}
          <button
            onClick={() => toggleFavorite(currentMission.id)}
            className={`p-3 rounded-2xl border font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95 ${
              isFavorited
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-800 hover:bg-slate-750 border-slate-700/60 text-slate-300 hover:text-white'
            }`}
            title={isFavorited ? 'Hapus dari favorit' : 'Simpan ke favorit'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorited ? 'fill-amber-400' : ''}`} />
            <span className="hidden sm:inline">
              {isFavorited ? 'Tersimpan' : 'Favorit'}
            </span>
          </button>

          {/* Share Mission Button */}
          <button
            onClick={handleShare}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-750 border border-slate-700/60 text-slate-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            title="Bagikan misi ke teman satu grup"
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Bagikan</span>
          </button>
        </div>

        {/* Complete Mission CTA */}
        <button
          onClick={completeCurrentMission}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          <span>Selesaikan Misi (+{currentMission.xp} XP)</span>
        </button>
      </div>
    </div>
  )
}
