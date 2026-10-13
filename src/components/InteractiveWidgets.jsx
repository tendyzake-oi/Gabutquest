import React, { useState, useEffect, useRef } from 'react'
import { Zap, Eye, EyeOff, RotateCcw, Check, Sparkles, AlertCircle, Wind } from 'lucide-react'

// 1. Reflex Speed Test Game
export function ReflexGame({ onComplete }) {
  const [gameState, setGameState] = useState('idle') // 'idle' | 'waiting' | 'ready' | 'result' | 'early'
  const [reactionTime, setReactionTime] = useState(null)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  const startGame = () => {
    setGameState('waiting')
    setReactionTime(null)
    const randomDelay = Math.floor(Math.random() * 2500) + 1500 // 1.5s - 4s

    timerRef.current = setTimeout(() => {
      setGameState('ready')
      startTimeRef.current = Date.now()
    }, randomDelay)
  }

  const handleClick = () => {
    if (gameState === 'waiting') {
      clearTimeout(timerRef.current)
      setGameState('early')
    } else if (gameState === 'ready') {
      const elapsed = Date.now() - startTimeRef.current
      setReactionTime(elapsed)
      setGameState('result')
      if (onComplete) onComplete(elapsed)
    }
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current)
  }, [])

  return (
    <div className="mt-4 p-4 rounded-2xl border border-slate-700/80 bg-slate-900/90 text-center">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        ⚡ Mini Game: Tes Kecepatan Refleks
      </div>

      {gameState === 'idle' && (
        <div className="py-6">
          <p className="text-sm text-slate-300 mb-4">
            Klik tombol di bawah, tunggu warna berubah jadi <span className="text-emerald-400 font-bold">HIJAU</span>, lalu klik secepat mungkin!
          </p>
          <button
            onClick={startGame}
            className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-sm cursor-pointer"
          >
            Mulai Tes Refleks
          </button>
        </div>
      )}

      {gameState === 'waiting' && (
        <div
          onClick={handleClick}
          className="py-10 bg-amber-500/20 border-2 border-dashed border-amber-500/50 rounded-xl cursor-pointer select-none transition-all"
        >
          <p className="text-amber-400 font-bold text-lg animate-pulse">
            ⚠️ Tunggu warna HIJAU... Jangan klik dulu!
          </p>
          <span className="text-xs text-amber-300/70 block mt-1">Tahan jarimu...</span>
        </div>
      )}

      {gameState === 'ready' && (
        <div
          onClick={handleClick}
          className="py-10 bg-emerald-500 border-2 border-emerald-400 rounded-xl cursor-pointer select-none shadow-lg shadow-emerald-500/40 animate-bounce transition-all"
        >
          <p className="text-slate-950 font-black text-2xl tracking-wider">
            🚨 KLIK SEKARANG! 🚨
          </p>
        </div>
      )}

      {gameState === 'early' && (
        <div className="py-6 bg-rose-500/10 border border-rose-500/30 rounded-xl">
          <p className="text-rose-400 font-bold text-base flex items-center justify-center gap-1.5">
            <AlertCircle className="w-5 h-5" /> Terlalu Cepat! Kamu klik sebelum hijau.
          </p>
          <p className="text-xs text-slate-400 mt-1">Bos belum lewat tapi kamu udah panik duluan.</p>
          <button
            onClick={startGame}
            className="mt-3 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Ulangi Lagi
          </button>
        </div>
      )}

      {gameState === 'result' && (
        <div className="py-6 bg-slate-800/60 border border-emerald-500/30 rounded-xl">
          <span className="text-xs text-emerald-400 font-bold tracking-wide uppercase">Waktu Reaksi:</span>
          <div className="text-4xl font-black text-white my-1 font-display">
            {reactionTime} <span className="text-lg text-emerald-400">ms</span>
          </div>
          <p className="text-xs text-slate-300">
            {reactionTime < 240
              ? '🏆 Luar biasa! Refleks tingkat dewa, aman dari pantauan bos.'
              : reactionTime < 340
              ? '⚡ Cukup cepat! Jemari kamu siap menutup tab seketika.'
              : '🐢 Lumayan, tapi masih rawan kena tegur kalau bos noleh.'}
          </p>
          <button
            onClick={startGame}
            className="mt-3 px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Coba Lagi
          </button>
        </div>
      )}
    </div>
  )
}

// 2. Clicker Speed Game
export function ClickerGame({ onComplete }) {
  const [clicks, setClicks] = useState(0)
  const [timeLeft, setTimeLeft] = useState(10)
  const [isRunning, setIsRunning] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const timerRef = useRef(null)

  const handleStart = () => {
    setClicks(0)
    setTimeLeft(10)
    setIsRunning(true)
    setIsFinished(false)

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setIsRunning(false)
          setIsFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleClickBtn = () => {
    if (isRunning) {
      setClicks((c) => c + 1)
    }
  }

  useEffect(() => {
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <div className="mt-4 p-4 rounded-2xl border border-slate-700/80 bg-slate-900/90 text-center">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        🖱️ Mini Game: Spam Klik Deadline
      </div>

      {!isRunning && !isFinished && (
        <div className="py-4">
          <p className="text-sm text-slate-300 mb-3">
            Klik tombol sebanyak-banyaknya dalam 10 detik! Buktikan kecepatan ketikmu.
          </p>
          <button
            onClick={handleStart}
            className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20 active:scale-95 transition-all text-sm cursor-pointer"
          >
            Mulai Tantangan Klik
          </button>
        </div>
      )}

      {isRunning && (
        <div className="py-3">
          <div className="flex justify-between items-center px-4 mb-3 text-sm">
            <span className="text-amber-400 font-bold">⏱️ Sisa Waktu: {timeLeft}s</span>
            <span className="text-purple-400 font-bold">Skor: {clicks} Klik</span>
          </div>

          <button
            onClick={handleClickBtn}
            className="w-full py-8 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:brightness-110 active:scale-95 text-white font-black text-2xl rounded-2xl shadow-xl shadow-purple-500/30 transition-transform cursor-pointer select-none"
          >
            KLIK DISINI SECEPATNYA! 🚀
          </button>
        </div>
      )}

      {isFinished && (
        <div className="py-4 bg-slate-800/60 rounded-xl border border-purple-500/30">
          <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Hasil Akhir:</span>
          <div className="text-4xl font-black text-white my-1 font-display">
            {clicks} <span className="text-base text-slate-400 font-normal">klik ({((clicks / 10).toFixed(1))} / detik)</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            {clicks >= 50
              ? '🔥 Jari Petir! Kamu pantas jadi sekretaris jenderal kantor!'
              : clicks >= 35
              ? '👍 Mantap! Kecepatan cukup mumpuni buat ngejar revisi.'
              : '😅 Jari kram ya? Waktunya stretching peregangan dulu.'}
          </p>
          <button
            onClick={handleStart}
            className="mt-3 px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Coba Lagi
          </button>
        </div>
      )}
    </div>
  )
}

// 3. Word Scramble Game
export function WordScrambleGame({ scrambleData }) {
  if (!scrambleData) return null

  const [inputVal, setInputVal] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleCheck = (e) => {
    e.preventDefault()
    if (!inputVal.trim()) return

    if (inputVal.trim().toUpperCase() === scrambleData.word.toUpperCase()) {
      setIsCorrect(true)
      setErrorMsg('')
    } else {
      setErrorMsg('Belum tepat! Coba perhatikan petunjuknya.')
      setTimeout(() => setErrorMsg(''), 2500)
    }
  }

  const handleReset = () => {
    setInputVal('')
    setIsCorrect(false)
    setShowHint(false)
    setErrorMsg('')
  }

  return (
    <div className="mt-4 p-4 rounded-2xl border border-slate-700/80 bg-slate-900/90 text-center">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
        🔤 Mini Game: Tebak Kata Acak
      </div>

      <div className="my-3 py-3 px-4 bg-slate-950 rounded-xl border border-slate-800 tracking-widest text-2xl font-black text-amber-400 font-mono">
        {scrambleData.scrambled}
      </div>

      {showHint && (
        <div className="text-xs text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 p-2.5 rounded-lg mb-3">
          💡 <strong>Petunjuk:</strong> {scrambleData.hint}
        </div>
      )}

      {isCorrect ? (
        <div className="py-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl">
          <p className="text-emerald-400 font-bold text-base flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Tepat Sekali: {scrambleData.word}!
          </p>
          <button
            onClick={handleReset}
            className="mt-2 text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
          >
            Tebak Ulang
          </button>
        </div>
      ) : (
        <form onSubmit={handleCheck} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.toUpperCase())}
              placeholder="Ketik jawaban di sini..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400 uppercase font-semibold"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl cursor-pointer"
            >
              Cek
            </button>
          </div>

          {errorMsg && <p className="text-xs text-rose-400">{errorMsg}</p>}

          <div className="flex justify-center gap-3 mt-1">
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-slate-400 hover:text-slate-200 cursor-pointer underline"
            >
              {showHint ? 'Tutup Petunjuk' : 'Buka Petunjuk 💡'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

// 4. Zen Breathing Widget
export function ZenBreathing() {
  const [phase, setPhase] = useState('Tarik Napas')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (!isActive) return
    const phases = ['Tarik Napas...', 'Tahan Napas...', 'Hembuskan Perlahan...']
    let currentIdx = 0

    const interval = setInterval(() => {
      currentIdx = (currentIdx + 1) % phases.length
      setPhase(phases[currentIdx])
    }, 4000)

    return () => clearInterval(interval)
  }, [isActive])

  return (
    <div className="mt-4 p-5 rounded-2xl border border-slate-700/80 bg-slate-900/90 text-center">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-center gap-1">
        <Wind className="w-3.5 h-3.5 text-cyan-400" /> Zen Mode: Relaksasi Napas 4-4-4
      </div>

      {!isActive ? (
        <div className="py-3">
          <p className="text-xs text-slate-300 mb-3">
            Tenangkan degup jantung sebelum membuka pesan revisi baru dari mentor.
          </p>
          <button
            onClick={() => setIsActive(true)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer shadow-md shadow-cyan-600/20"
          >
            Mulai Relaksasi
          </button>
        </div>
      ) : (
        <div className="py-4 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/30 border-2 border-cyan-400/50 flex items-center justify-center animate-pulse mb-3">
            <span className="text-xs font-bold text-cyan-300 text-center px-2">{phase}</span>
          </div>
          <button
            onClick={() => setIsActive(false)}
            className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer mt-1"
          >
            Selesai Relaksasi
          </button>
        </div>
      )}
    </div>
  )
}

// 5. Riddle Answer Spoiler
export function RiddleSpoiler({ question, answer, hint }) {
  const [revealed, setRevealed] = useState(false)
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="mt-4 p-4 rounded-2xl border border-purple-500/30 bg-purple-950/20 text-center">
      <div className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2 flex items-center justify-center gap-1">
        <Sparkles className="w-3.5 h-3.5" /> Pertanyaan Riddle
      </div>
      <p className="text-base font-bold text-white mb-3">"{question}"</p>

      {showHint && (
        <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/40 p-2.5 rounded-lg mb-3">
          💡 <strong>Petunjuk:</strong> {hint}
        </div>
      )}

      {revealed ? (
        <div className="p-3.5 bg-slate-900/90 border border-emerald-500/40 rounded-xl text-emerald-300 font-semibold text-sm">
          <span className="block text-xs uppercase text-slate-400 font-normal mb-1">Jawaban:</span>
          {answer}
          <div className="mt-2">
            <button
              onClick={() => setRevealed(false)}
              className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
            >
              Sembunyikan lagi
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center gap-2">
          {hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
            >
              {showHint ? 'Tutup Hint' : 'Lihat Hint 💡'}
            </button>
          )}
          <button
            onClick={() => setRevealed(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-600/20"
          >
            <Eye className="w-3.5 h-3.5" /> Buka Jawaban
          </button>
        </div>
      )}
    </div>
  )
}
