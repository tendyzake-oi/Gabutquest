import React, { useEffect } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useGame } from '../context/GameContext'

export function Toast() {
  const { toast, dismissToast } = useGame()

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      dismissToast()
    }, 3500)
    return () => clearTimeout(timer)
  }, [toast, dismissToast])

  if (!toast) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
  }

  const borderStyles = {
    success: 'border-emerald-500/40 bg-slate-900/95 text-slate-100',
    warning: 'border-amber-500/40 bg-slate-900/95 text-slate-100',
    info: 'border-blue-500/40 bg-slate-900/95 text-slate-100',
  }

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md animate-bounce-in transition-all">
      <div
        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-md ${
          borderStyles[toast.type] || borderStyles.info
        }`}
      >
        <div className="flex items-center gap-2.5">
          {icons[toast.type] || icons.info}
          <p className="text-xs sm:text-sm font-medium leading-snug">{toast.message}</p>
        </div>
        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
