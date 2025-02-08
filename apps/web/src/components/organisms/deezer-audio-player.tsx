import { useCallback, useEffect, useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react"

import AudioProgressBar from "../molecules/audio-progress-bar"

import Logo from "@/assets/icons/logo.svg"
import TrackCard from "@/components/atoms/track-card"
import AudioPlayerControls from "@/components/molecules/audio-player-controls"
import { useAudioPlayer } from "@/hooks/use-audio-player"
import { tracksUseCase } from "@/lib/usecases"
import { QueryKeys } from "@/types/query-keys"
import { getCardStyles, getVisibleIndexes } from "@/utils/tracks-visibility"

const DeezerAudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.RANDOM_TRACKS],
    queryFn: () => tracksUseCase.randomTracks()
  })

  const handleNext = useCallback(() => {
    if (!data?.randomTracks) return
    setCurrentTrackIndex((prev) => (prev + 1) % data.randomTracks.length)
  }, [data?.randomTracks])

  const handlePrevious = useCallback(() => {
    if (!data?.randomTracks) return
    setCurrentTrackIndex((prev) => (prev === 0 ? data.randomTracks.length - 1 : prev - 1))
  }, [data?.randomTracks])

  const { currentTime, isPlaying, previewDuration, loadAudio, handlePlayPause, handleSeek }
    = useAudioPlayer(handleNext)

  useEffect(() => {
    if (!data?.randomTracks) return
    loadAudio(data.randomTracks[currentTrackIndex].preview)
  }, [currentTrackIndex, data?.randomTracks])

  if (isLoading || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}>
          <Logo />
        </motion.div>
      </div>
    )
  }

  const currentTrack = data.randomTracks[currentTrackIndex]
  const visibleIndexes = getVisibleIndexes(currentTrackIndex, data.randomTracks.length)

  const handleProgressChange = (values: number[]) => {
    if (values.length > 0) {
      const newTime = Math.min(values[0], previewDuration)

      handleSeek(newTime)
    }
  }

  const handleCardClick = (index: number) => {
    setCurrentTrackIndex(index)
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
              onClick={() => handleCardClick(index)}
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
              <AudioPlayerControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
              <AudioProgressBar
                currentTime={currentTime}
                duration={previewDuration}
                onProgressChange={handleProgressChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeezerAudioPlayer
