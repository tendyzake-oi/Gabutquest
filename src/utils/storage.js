const STORAGE_PREFIX = 'gabutquest_'

export function getStorageItem(key, defaultValue) {
  if (typeof window === 'undefined') return defaultValue
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key)
    if (raw === null || raw === undefined) return defaultValue
    return JSON.parse(raw)
  } catch (error) {
    console.warn(`[GabutQuest] Gagal membaca storage "${key}":`, error)
    return defaultValue
  }
}

export function setStorageItem(key, value) {
  if (typeof window === 'undefined') return false
  try {
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
    return true
  } catch (error) {
    console.warn(`[GabutQuest] Gagal menyimpan storage "${key}":`, error)
    return false
  }
}

export function removeStorageItem(key) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_PREFIX + key)
  } catch (error) {
    console.warn(`[GabutQuest] Gagal menghapus storage "${key}":`, error)
  }
}

export function clearAllGabutStorage() {
  if (typeof window === 'undefined') return
  try {
    const keysToRemove = []
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i)
      if (k && k.startsWith(STORAGE_PREFIX)) {
        keysToRemove.push(k)
      }
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k))
  } catch (error) {
    console.warn('[GabutQuest] Gagal reset storage:', error)
  }
}
