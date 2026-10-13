export async function shareMission(mission) {
  if (!mission) return { success: false, message: 'Tidak ada misi untuk dibagikan' }

  const url = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://gabutquest.vercel.app'
  const shareText = `🎯 Misi Gabut: "${mission.title}"\nKategori: ${mission.category}\nXP: +${mission.xp} XP | Estimasi: ${mission.timeEstimate}\n\n"${mission.description}"\n\nYuk ikutan selesaikan misi gabut anak magang di sini:\n${url}`

  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({
        title: `GabutQuest — ${mission.title}`,
        text: shareText,
        url: url,
      })
      return { success: true, method: 'native', message: 'Misi berhasil dibagikan!' }
    } catch (err) {
      // If user canceled the native share dialog, don't fallback to clipboard error
      if (err.name === 'AbortError') {
        return { success: false, method: 'canceled', message: 'Berbagi dibatalkan' }
      }
      // Otherwise proceed to fallback clipboard
    }
  }

  // Fallback to Clipboard API
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareText)
      return { success: true, method: 'clipboard', message: 'Teks misi berhasil disalin ke clipboard! Siap di-paste ke grup WhatsApp.' }
    } catch {
      // Fallback manual execCommand if clipboard fails
    }
  }

  // Final fallback
  try {
    const textArea = document.createElement('textarea')
    textArea.value = shareText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    return { success: true, method: 'clipboard', message: 'Teks misi disalin ke clipboard!' }
  } catch {
    return { success: false, method: 'failed', message: 'Gagal menyalin teks ke clipboard.' }
  }
}
