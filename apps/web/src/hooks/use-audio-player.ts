import { useState, useRef, useEffect } from "react"

const MAX_PREVIEW_DURATION = 8

export const useAudioPlayer = (onTrackEnd: () => void) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [previewDuration, setPreviewDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timeUpdateIntervalRef = useRef<number>()
  const previewTimeoutRef = useRef<number>()

  const loadAudio = async () => {
    if (!audioRef.current) return

    const audio = audioRef.current

    audio.currentTime = 0
    setCurrentTime(0)

    await new Promise((resolve) => {
      audio.load()
      audio.addEventListener("loadedmetadata", () => {
        const actualDuration = Math.min(audio.duration, MAX_PREVIEW_DURATION)

        setPreviewDuration(actualDuration)
        resolve(null)
      }, { once: true })
    })

    if (isPlaying) {
      try {
        await audio.play()
      } catch (error) {
        console.error("Erreur de lecture:", error)
        setIsPlaying(false)
      }
    }
  }

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    if (isPlaying) {
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = window.setTimeout(onTrackEnd, previewDuration * 1000)

      audio.play().catch(error => {
        console.error("Erreur de lecture:", error)
        setIsPlaying(false)
      })

      timeUpdateIntervalRef.current = window.setInterval(() => {
        if (audio.currentTime >= previewDuration) {
          audio.pause()
          audio.currentTime = 0
          setCurrentTime(0)
          onTrackEnd()

          return
        }
        setCurrentTime(audio.currentTime)
      }, 50)
    } else {
      audio.pause()
      if (timeUpdateIntervalRef.current) clearInterval(timeUpdateIntervalRef.current)
    }

    return () => {
      if (timeUpdateIntervalRef.current) clearInterval(timeUpdateIntervalRef.current)
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
    }
  }, [isPlaying, onTrackEnd, previewDuration])

  return {
    audioRef,
    currentTime,
    isPlaying,
    setIsPlaying,
    previewDuration,
    loadAudio,
    setCurrentTime
  }
}
