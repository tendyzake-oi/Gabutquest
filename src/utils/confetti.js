import confetti from 'canvas-confetti'

export function triggerQuestCelebration() {
  // Fire multi-stage celebratory confetti
  const count = 200
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  }

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    })
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#3b82f6', '#8b5cf6', '#facc15'],
  })
  fire(0.2, {
    spread: 60,
    colors: ['#ec4899', '#10b981', '#6366f1'],
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}

export function triggerSmallCheer() {
  confetti({
    particleCount: 50,
    spread: 50,
    origin: { y: 0.8 },
    colors: ['#3b82f6', '#8b5cf6', '#facc15'],
    zIndex: 9999,
  })
}
