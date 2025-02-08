import { useState, useEffect } from "react"

import { audioPlayerUseCase } from "@/lib/usecases"

const PREVIEW_DURATION_LIMIT = 8

export const useAudioPlayer = (onTrackEnd: () => void) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [, setPreviewDuration] = useState(0)
  const [currentTrackUrl, setCurrentTrackUrl] = useState<string | null>(null)

  const loadAudio = async (trackUrl: string) => {
    try {
      setCurrentTrackUrl(trackUrl)
      await audioPlayerUseCase.play(trackUrl)
      setIsPlaying(true)

      setPreviewDuration(PREVIEW_DURATION_LIMIT)
      setCurrentTime(0)
    } catch (error) {
      console.error("Erreur de lecture:", error)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    audioPlayerUseCase.onTrackEnd(onTrackEnd)

    const intervalId = setInterval(() => {
      const state = audioPlayerUseCase.getCurrentState()
      const newTime = state.currentTime

      if (newTime >= PREVIEW_DURATION_LIMIT) {
        audioPlayerUseCase.pause()
        setIsPlaying(false)
        onTrackEnd()

        return
      }

      setCurrentTime(newTime)
      setIsPlaying(state.isPlaying)
    }, 50)

    return () => {
      clearInterval(intervalId)
      audioPlayerUseCase.pause()
      setIsPlaying(false)
    }
  }, [onTrackEnd])

  const handlePlayPause = async () => {
    if (!currentTrackUrl) return
  
    if (isPlaying) {
      audioPlayerUseCase.pause()
      setIsPlaying(false)
    } else {
      await audioPlayerUseCase.play(currentTrackUrl, currentTime)
      setIsPlaying(true)
    }
  }

  const handleSeek = (time: number) => {
    const clampedTime = Math.min(time, PREVIEW_DURATION_LIMIT)

    audioPlayerUseCase.seek(clampedTime)
    setCurrentTime(clampedTime)
  }

  return {
    currentTime,
    isPlaying,
    setIsPlaying,
    previewDuration: PREVIEW_DURATION_LIMIT,
    loadAudio,
    handlePlayPause,
    handleSeek
  }
}
