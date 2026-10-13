export const LEVELS = [
  {
    level: 1,
    title: 'Anak Bawang Baru Masuk',
    minXp: 0,
    maxXp: 100,
    badge: '🌱',
    quote: 'Masih canggung minta password WiFi dan nyasar pas nyari toilet.',
    perk: 'Mendapat izin mengamati lingkungan kantor dengan tatapan polos.',
  },
  {
    level: 2,
    title: 'Pengamat Mesin Fotokopi',
    minXp: 100,
    maxXp: 250,
    badge: '📄',
    quote: 'Bisa menatap kertas nyangkut selama 5 menit dengan muka serius.',
    perk: 'Kemampuan berjalan ke pantry tanpa dicurigai meningkat 20%.',
  },
  {
    level: 3,
    title: 'Pejuang Absen Tepat Waktu',
    minXp: 250,
    maxXp: 500,
    badge: '⏰',
    quote: 'Datang 08.59, senyum ke satpam, lalu duduk merenungi nasib.',
    perk: 'Mendapatkan radar deteksi makanan gratis di meja makan kantor.',
  },
  {
    level: 4,
    title: 'Master Pura-Pura Sibuk',
    minXp: 500,
    maxXp: 850,
    badge: '⌨️',
    quote: 'Jari mengetik lincah di keyboard, padahal cuma scroll Notion.',
    perk: 'Shortcut Alt + Tab bergerak dengan kecepatan kilat saat ada bos lewat.',
  },
  {
    level: 5,
    title: 'Duta Kopi & Gorengan',
    minXp: 850,
    maxXp: 1300,
    badge: '☕',
    quote: 'Hafal persis jam berapa tukang tahu gejrot & siomay mangkal di luar.',
    perk: 'Bisa meracik kopi sachet kantor rasa setara coffee shop ternama.',
  },
  {
    level: 6,
    title: 'Sepuh Magang Santuy',
    minXp: 1300,
    maxXp: 2000,
    badge: '🧘',
    quote: 'Kebal dari revisi dadakan jam 16.55. Selalu pulang tenggo penuh wibawa.',
    perk: 'Mendapatkan aura kebijaksanaan di hadapan anak magang angkatan baru.',
  },
  {
    level: 7,
    title: 'Bayangan CEO Gabut',
    minXp: 2000,
    maxXp: 999999,
    badge: '👑',
    quote: 'Legenda hidup! Sudah menguasai seni gabut tingkat dewa di kantor.',
    perk: 'Dihormati semua tanaman hias di kantor dan seisi pantry.',
  },
]

export function getLevelInfo(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      const current = LEVELS[i]
      const next = LEVELS[i + 1] || null
      const xpInCurrentLevel = xp - current.minXp
      const xpNeededForLevel = next ? next.minXp - current.minXp : 1000
      const progressPercent = next
        ? Math.min(100, Math.floor((xpInCurrentLevel / xpNeededForLevel) * 100))
        : 100

      return {
        ...current,
        next,
        progressPercent,
        xpToNext: next ? next.minXp - xp : 0,
      }
    }
  }
  return {
    ...LEVELS[0],
    next: LEVELS[1],
    progressPercent: 0,
    xpToNext: LEVELS[1].minXp,
  }
}
