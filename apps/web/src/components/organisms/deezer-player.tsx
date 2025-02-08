import { useCallback, useEffect, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react"

import Logo from "@/assets/icons/logo.svg"
import TrackCard from "@/components/atoms/track-card"
import PlayerControls from "@/components/molecules/player-controls"
import ProgressBar from "@/components/molecules/progress-bar"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { tracksUseCase } from "@/lib/usecases"
import { getCardStyles, getVisibleIndexes } from "@/utils/tracks-visibility"

const DeezerPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  
  const { data, isLoading } = useQuery({
    queryKey: ["randomTracks"],
    queryFn: () => tracksUseCase.randomTracks()
  })

  const handleNext = useCallback(() => {
    if (!data?.randomTracks) return
    setCurrentTrackIndex(prev => (prev + 1) % data.randomTracks.length)
    setIsPlaying(true)
  }, [data?.randomTracks])

  const handlePrevious = useCallback(() => {
    if (!data?.randomTracks) return
    setCurrentTrackIndex(prev => 
      prev === 0 ? data.randomTracks.length - 1 : prev - 1)
    setIsPlaying(true)
  }, [data?.randomTracks])

  const {
    audioRef,
    currentTime,
    isPlaying,
    setIsPlaying,
    previewDuration,
    loadAudio,
    setCurrentTime
  } = useAudioPlayer(handleNext)

  useEffect(() => {
    if (!data?.randomTracks) return
    loadAudio()
  }, [currentTrackIndex, data?.randomTracks])

  if (isLoading || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        >
          <Logo />
        </motion.div>
      </div>
    )
  }

  const currentTrack = data.randomTracks[currentTrackIndex]
  const visibleIndexes = getVisibleIndexes(currentTrackIndex, data.randomTracks.length)

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
          {visibleIndexes.map((index) => (
            <TrackCard
              key={data.randomTracks[index].id}
              track={data.randomTracks[index]}
              style={getCardStyles(index, currentTrackIndex, data.randomTracks.length)}
              isActive={index === currentTrackIndex}
              onClick={() => {
                setCurrentTrackIndex(index)
                setIsPlaying(true)
              }}
              isLeft={getCardStyles(index, currentTrackIndex, data.randomTracks.length).isLeft}
              isRight={getCardStyles(index, currentTrackIndex, data.randomTracks.length).isRight}
            />
          
          ))}
        </div>

        <div className="max-w-md text-center">
          <h2 className="text-foreground/40 text-2xl font-medium">{currentTrack.title}</h2>
          <p className="text-foreground/30 font text-lg">{currentTrack.artist.name}</p>
        </div>

        <div className="bg-background fixed bottom-0 left-0 right-0 pb-10 pt-2">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-4">
            <div className="flex w-full flex-col items-center gap-y-1">
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={() => setIsPlaying(!isPlaying)}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
              <ProgressBar
                currentTime={currentTime}
                duration={previewDuration}
                onProgressChange={handleProgressChange}
              />
            </div>
            <audio ref={audioRef} src={currentTrack.preview} preload="metadata" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeezerPlayer
