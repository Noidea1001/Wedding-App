let audioCtx: AudioContext | null = null

export function playRoyalChime(): void {
  if (typeof window === "undefined") return
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext
    if (!AudioContextClass) return
    if (!audioCtx) audioCtx = new AudioContextClass()
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {})
    }

    const now = audioCtx.currentTime

    // Fundamental Bell Sine
    const osc1 = audioCtx.createOscillator()
    const gain1 = audioCtx.createGain()
    osc1.type = "sine"
    osc1.frequency.setValueAtTime(528, now) // Solfeggio 528 Hz transformation tone
    osc1.frequency.exponentialRampToValueAtTime(1056, now + 0.12)
    gain1.gain.setValueAtTime(0.35, now)
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 1.2)
    osc1.connect(gain1)
    gain1.connect(audioCtx.destination)
    osc1.start(now)
    osc1.stop(now + 1.2)

    // Shimmer Harmonic Overtone
    const osc2 = audioCtx.createOscillator()
    const gain2 = audioCtx.createGain()
    osc2.type = "sine"
    osc2.frequency.setValueAtTime(880, now) // A5 pure chime
    gain2.gain.setValueAtTime(0.18, now)
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.8)
    osc2.connect(gain2)
    gain2.connect(audioCtx.destination)
    osc2.start(now)
    osc2.stop(now + 0.8)
  } catch {
    // Ignore audio errors on unsupported browsers
  }
}

// Background traditional music controller
let backgroundAudio: HTMLAudioElement | null = null

export const KHMER_WEDDING_AUDIO_URL =
  "https://actions.google.com/sounds/v1/ambiences/soft_harp_music.ogg"

export function getBackgroundAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null
  if (!backgroundAudio) {
    backgroundAudio = new Audio(KHMER_WEDDING_AUDIO_URL)
    backgroundAudio.loop = true
    backgroundAudio.preload = "auto"
  }
  return backgroundAudio
}

export async function startBackgroundAudio(): Promise<boolean> {
  const audio = getBackgroundAudio()
  if (!audio) return false
  try {
    await audio.play()
    return true
  } catch {
    return false
  }
}

export function pauseBackgroundAudio(): void {
  const audio = getBackgroundAudio()
  if (audio) {
    audio.pause()
  }
}
