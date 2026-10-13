import React from 'react'
import { AlertTriangle, X, Trash2 } from 'lucide-react'
import { useGame } from '../context/GameContext'

export function ConfirmModal() {
  const { isResetModalOpen, setIsResetModalOpen, resetProgress } = useGame()

  if (!isResetModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-rose-500/30 rounded-3xl p-6 shadow-2xl text-center">
        <button
          onClick={() => setIsResetModalOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 rounded-2xl mx-auto flex items-center justify-center text-rose-400 mb-4">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2 font-display">
          Reset Seluruh Progres?
        </h3>
        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          Tindakan ini akan menghapus semua poin XP, tingkat level, daftar misi favorit, dan riwayat misi yang telah kamu selesaikan di peramban ini.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setIsResetModalOpen(false)}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer text-sm"
          >
            Batal
          </button>
          <button
            onClick={resetProgress}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            <Trash2 className="w-4 h-4" /> Ya, Reset
          </button>
        </div>
      </div>
    </div>
  )
}
