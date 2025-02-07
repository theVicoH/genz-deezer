import { useState, useRef, useEffect, useCallback } from "react"

import { useQuery } from "@tanstack/react-query"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

import type { Track } from "@genz-deezer/core"

import { Button } from "@/components/atoms/button"
import { Slider } from "@/components/atoms/slider"
import { tracksUseCase } from "@/lib/usecases"

const MAX_PREVIEW_DURATION = 8

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00"
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${seconds.toString().padStart(2, "0")}`
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
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
    }
    setCurrentTrackIndex(prev => prev === data.randomTracks.length - 1 ? 0 : prev + 1)
    setIsPlaying(true)
  }, [data?.randomTracks])

  const handlePrevious = useCallback(() => {
    if (!data?.randomTracks) return
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current)
    }
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
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
      }

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
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current)
      }
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
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current)
      }
    }

    return () => {
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current)
      }
    }
  }, [isPlaying, handleNext, previewDuration])

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) return

    const handleEnded = () => {
      handleNext()
    }

    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [handleNext])

  if (isLoading || !data) {
    return <div className="flex h-screen items-center justify-center">Chargement...</div>
  }

  const currentTrack = data.randomTracks[currentTrackIndex]

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (values: number[]) => {
    if (audioRef.current && values.length > 0) {
      const newTime = Math.min(values[0], previewDuration)

      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div className="relative h-screen pb-20">
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
        {data.randomTracks.map((track: Track, index: number) => (
          <div 
            key={track.id} 
            className={`hover:bg-muted flex cursor-pointer items-center space-x-4 rounded-lg p-4 ${
              currentTrackIndex === index ? "bg-muted" : ""
            }`}
            onClick={() => {
              setCurrentTrackIndex(index)
              setIsPlaying(true)
            }}
          >
            <img 
              className="h-16 w-16 rounded-md" 
              src={track.album.cover} 
              alt={track.title} 
            />
            <div>
              <h3 className="font-medium">{track.title}</h3>
              <p className="text-foreground/50 text-sm">{track.artist.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-background fixed bottom-0 left-0 right-0 pb-4 pt-2">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
          <div className="flex w-full flex-col items-center gap-y-1">
            <div className="flex items-center space-x-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={handlePrevious}
              >
                <SkipBack className="h-6 w-6" />
              </Button>
            
              <Button
                size="icon"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="text-primary-foreground h-6 w-6" />
                ) : (
                  <Play className="text-primary-foreground h-6 w-6" />
                )}
              </Button>

              <Button
                size="icon"
                variant="ghost"
                onClick={handleNext}
              >
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
          
          <audio
            ref={audioRef}
            src={currentTrack.preview}
            preload="metadata"
          />
        </div>
      </div>
    </div>
  )
}

export default DeezerPlayer
