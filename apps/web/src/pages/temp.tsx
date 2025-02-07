import { useState, useRef, useEffect, useCallback } from "react"

import { useQuery } from "@tanstack/react-query"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/atoms/button"
import { Slider } from "@/components/atoms/slider"
import { tracksUseCase } from "@/lib/usecases"

const MAX_PREVIEW_DURATION = 8
const VISIBLE_CARDS = 2

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

const getVisibleIndexes = (currentIndex: number, total: number) => {
  const indexes = []

  for (let i = -VISIBLE_CARDS; i <= VISIBLE_CARDS; i++) {
    indexes.push((currentIndex + i + total) % total)
  }

  return indexes
}

const getCardStyles = (index: number, currentIndex: number, total: number) => {
  const diff = (index - currentIndex + total) % total
  const adjustedDiff = diff > total / 2 ? diff - total : diff

  return {
    x: adjustedDiff * 150,
    scale: 1 - Math.abs(adjustedDiff) * 0.15,
    opacity: 1 - Math.abs(adjustedDiff) * 0.2,
    zIndex: 10 - Math.abs(adjustedDiff)
  }
}

const DeezerPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [, setDuration] = useState(0)
  const [previewDuration, setPreviewDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timeUpdateIntervalRef = useRef<number>()
  const previewTimeoutRef = useRef<number>()

  const { data, isLoading } = useQuery({
    queryKey: ["randomTracks"],
    queryFn: () => tracksUseCase.randomTracks()
  })

  const handleNext = useCallback(() => {
    if (!data?.randomTracks) return
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
    setCurrentTrackIndex(prev => (prev + 1) % data.randomTracks.length)
    setIsPlaying(true)
  }, [data?.randomTracks])

  const handlePrevious = useCallback(() => {
    if (!data?.randomTracks) return
    if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
    setCurrentTrackIndex(prev => prev === 0 ? data.randomTracks.length - 1 : prev - 1)
    setIsPlaying(true)
  }, [data?.randomTracks])

  useEffect(() => {
    if (!data?.randomTracks) return
    const loadAudio = async () => {
      if (audioRef.current) {
        const audio = audioRef.current

        audio.currentTime = 0
        setCurrentTime(0)
        await new Promise((resolve) => {
          audio.load()
          audio.addEventListener("loadedmetadata", () => {
            const actualDuration = Math.min(audio.duration, MAX_PREVIEW_DURATION)

            setDuration(actualDuration)
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
    }

    loadAudio()
  }, [currentTrackIndex, data?.randomTracks, isPlaying])

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
      previewTimeoutRef.current = window.setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          setCurrentTime(0)
          handleNext()
        }
      }, previewDuration * 1000)
    }

    return () => {
      if (previewTimeoutRef.current) clearTimeout(previewTimeoutRef.current)
    }
  }, [isPlaying, currentTrackIndex, handleNext, previewDuration])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return
    if (isPlaying) {
      audio.play().catch(error => {
        console.error("Erreur de lecture:", error)
        setIsPlaying(false)
      })
      timeUpdateIntervalRef.current = window.setInterval(() => {
        if (audio.currentTime >= previewDuration) {
          audio.pause()
          audio.currentTime = 0
          setCurrentTime(0)
          handleNext()

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
    }
  }, [isPlaying, handleNext, previewDuration])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return
    const handleEnded = () => handleNext()

    audio.addEventListener("ended", handleEnded)

    return () => audio.removeEventListener("ended", handleEnded)
  }, [handleNext])

  if (isLoading || !data) {
    return <div className="flex h-screen items-center justify-center">Chargement...</div>
  }

  const currentTrack = data.randomTracks[currentTrackIndex]
  const visibleIndexes = getVisibleIndexes(currentTrackIndex, data.randomTracks.length)

  const handlePlayPause = () => setIsPlaying(!isPlaying)

  const handleProgressChange = (values: number[]) => {
    if (audioRef.current && values.length > 0) {
      const newTime = Math.min(values[0], previewDuration)

      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] w-full items-center justify-center">
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="relative flex h-[24rem] w-full items-center justify-center">
          {visibleIndexes.map((index) => {
            const track = data.randomTracks[index]
            const styles = getCardStyles(index, currentTrackIndex, data.randomTracks.length)

            return (
              <motion.div
                key={track.id}
                animate={styles}
                initial={styles}
                transition={{ duration: 0.3 }}
                style={{ 
                  position: "absolute",
                  top: "50%",
                  x: `calc(-50% + ${styles.x}px)`,
                  y: "-50%",
                  scale: styles.scale,
                  opacity: styles.opacity,
                  zIndex: styles.zIndex
                }}
                className="hover:cursor-pointer"
                onClick={() => {
                  setCurrentTrackIndex(index)
                  setIsPlaying(true)
                }}
              >
                <div className="h-64 w-64 overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={track.album.cover_medium}
                    alt={track.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold">{currentTrack.title}</h2>
          <p className="text-muted-foreground text-lg">{currentTrack.artist.name}</p>
        </div>

        <div className="bg-background fixed bottom-0 left-0 right-0 border-t pb-4 pt-2">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
            <div className="flex w-full flex-col items-center gap-y-1">
              <div className="flex items-center space-x-3">
                <Button size="icon" variant="ghost" onClick={handlePrevious}>
                  <SkipBack className="h-6 w-6" />
                </Button>
                <Button size="icon" onClick={handlePlayPause}>
                  {isPlaying ? (
                    <Pause className="text-primary-foreground h-6 w-6" />
                  ) : (
                    <Play className="text-primary-foreground h-6 w-6" />
                  )}
                </Button>
                <Button size="icon" variant="ghost" onClick={handleNext}>
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
              <div className="w-full max-w-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-foreground/50 w-16 text-right text-sm">
                    {formatTime(currentTime)}
                  </span>
                  <Slider
                    defaultValue={[0]}
                    value={[currentTime]}
                    max={previewDuration}
                    step={0.1}
                    onValueChange={handleProgressChange}
                    className="flex-1"
                  />
                  <span className="text-foreground/50 w-16 text-sm">
                    {formatTime(previewDuration)}
                  </span>
                </div>
              </div>
            </div>
            <audio ref={audioRef} src={currentTrack.preview} preload="metadata" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeezerPlayer
