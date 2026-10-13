import React, { createContext, useContext, useState, useEffect } from 'react'
import { MISSIONS } from '../data/missions'
import { getLevelInfo } from '../data/levels'
import { getStorageItem, setStorageItem, clearAllGabutStorage } from '../utils/storage'
import { triggerQuestCelebration, triggerSmallCheer } from '../utils/confetti'
import { shareMission } from '../utils/share'

const GameContext = createContext(null)

export function GameProvider({ children }) {
  // 1. Persistent states
  const [xp, setXp] = useState(() => {
    const saved = getStorageItem('xp', 0)
    return typeof saved === 'number' && !isNaN(saved) ? saved : 0
  })

  const [favorites, setFavorites] = useState(() => {
    const saved = getStorageItem('favorites', [])
    return Array.isArray(saved) ? saved : []
  })

  const [history, setHistory] = useState(() => {
    const saved = getStorageItem('history', [])
    return Array.isArray(saved) ? saved : []
  })

  const [activeMissionId, setActiveMissionId] = useState(() => {
    const saved = getStorageItem('current_id', null)
    if (saved && MISSIONS.some((m) => m.id === saved)) {
      return saved
    }
    // Default to random mission
    const randomIndex = Math.floor(Math.random() * MISSIONS.length)
    return MISSIONS[randomIndex].id
  })

  // 2. Ephemeral UI states
  const [currentTab, setCurrentTab] = useState('home') // 'home' | 'categories' | 'favorites' | 'progress'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [toast, setToast] = useState(null)
  const [isResetModalOpen, setIsResetModalOpen] = useState(false)

  // Sync to localStorage
  useEffect(() => {
    setStorageItem('xp', xp)
  }, [xp])

  useEffect(() => {
    setStorageItem('favorites', favorites)
  }, [favorites])

  useEffect(() => {
    setStorageItem('history', history)
  }, [history])

  useEffect(() => {
    setStorageItem('current_id', activeMissionId)
  }, [activeMissionId])

  // Helpers
  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type })
  }

  const dismissToast = () => {
    setToast(null)
  }

  // Active mission object
  const currentMission = MISSIONS.find((m) => m.id === activeMissionId) || MISSIONS[0]
  const levelInfo = getLevelInfo(xp)

  // Pick next random mission
  const nextMission = (categoryFilter = selectedCategory) => {
    let pool = MISSIONS
    if (categoryFilter && categoryFilter !== 'all') {
      pool = MISSIONS.filter((m) => m.category === categoryFilter)
    }

    if (pool.length === 0) pool = MISSIONS

    // Try to pick one that is not current
    const available = pool.filter((m) => m.id !== activeMissionId)
    const listToChoose = available.length > 0 ? available : pool
    const picked = listToChoose[Math.floor(Math.random() * listToChoose.length)]

    setActiveMissionId(picked.id)
  }

  // Select a specific mission from categories or favorites list
  const selectMission = (missionId, targetTab = 'home') => {
    if (MISSIONS.some((m) => m.id === missionId)) {
      setActiveMissionId(missionId)
      if (targetTab) setCurrentTab(targetTab)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Toggle favorite
  const toggleFavorite = (missionId) => {
    const isFav = favorites.includes(missionId)
    if (isFav) {
      setFavorites((prev) => prev.filter((id) => id !== missionId))
      showToast('Dihapus dari daftar favorit', 'info')
    } else {
      setFavorites((prev) => [...prev, missionId])
      triggerSmallCheer()
      showToast('⭐ Disimpan ke daftar favorit!', 'success')
    }
  }

  // Complete current mission
  const completeCurrentMission = () => {
    if (!currentMission) return

    const xpEarned = currentMission.xp || 30
    const newRecord = {
      id: `${currentMission.id}-${Date.now()}`,
      missionId: currentMission.id,
      title: currentMission.title,
      category: currentMission.category,
      xp: xpEarned,
      completedAt: new Date().toISOString(),
    }

    setXp((prev) => prev + xpEarned)
    setHistory((prev) => [newRecord, ...prev])
    triggerQuestCelebration()
    showToast(`🎉 Misi selesai! +${xpEarned} XP diperoleh!`, 'success')

    // Automatically transition to next mission after a short delay
    setTimeout(() => {
      nextMission()
    }, 1200)
  }

  // Share active mission
  const handleShare = async () => {
    if (!currentMission) return
    const result = await shareMission(currentMission)
    if (result.success) {
      showToast(result.message, 'success')
    } else if (result.method !== 'canceled') {
      showToast(result.message, 'warning')
    }
  }

  // Reset progress
  const resetProgress = () => {
    clearAllGabutStorage()
    setXp(0)
    setFavorites([])
    setHistory([])
    const firstMission = MISSIONS[0].id
    setActiveMissionId(firstMission)
    setIsResetModalOpen(false)
    showToast('Progres berhasil direset kembali ke nol.', 'info')
  }

  const value = {
    // Data
    missions: MISSIONS,
    currentMission,
    xp,
    levelInfo,
    favorites,
    history,
    selectedCategory,
    currentTab,
    toast,
    isResetModalOpen,
    // Actions
    setCurrentTab,
    setSelectedCategory,
    nextMission,
    selectMission,
    toggleFavorite,
    completeCurrentMission,
    handleShare,
    resetProgress,
    setIsResetModalOpen,
    showToast,
    dismissToast,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
