import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

import { Button } from "@/components/atoms/button"

type PlayerControlsProps = {
  isPlaying: boolean
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
}

const PlayerControls = ({ isPlaying, onPlayPause, onPrevious, onNext }: PlayerControlsProps) => (
  <div className="flex items-center space-x-3">
    <Button size="icon" variant="ghost" onClick={onPrevious}>
      <SkipBack className="h-6 w-6" />
    </Button>
    <Button size="icon" onClick={onPlayPause}>
      {isPlaying ? (
        <Pause className="text-primary-foreground h-6 w-6" />
      ) : (
        <Play className="text-primary-foreground h-6 w-6" />
      )}
    </Button>
    <Button size="icon" variant="ghost" onClick={onNext}>
      <SkipForward className="h-6 w-6" />
    </Button>
  </div>
)

export default PlayerControls
