import { Slider } from "@/components/atoms/slider"
import { formatTime } from "@/utils/format-time"

type ProgressBarProps = {
  currentTime: number
  duration: number
  onProgressChange: (values: number[]) => void
}

const ProgressBar = ({ currentTime, duration, onProgressChange }: ProgressBarProps) => (
  <div className="w-full max-w-sm">
    <div className="flex items-center space-x-2">
      <span className="text-foreground/50 w-16 text-right text-sm">
        {formatTime(currentTime)}
      </span>
      <Slider
        defaultValue={[0]}
        value={[currentTime]}
        max={duration}
        step={0.1}
        onValueChange={onProgressChange}
        className="flex-1"
      />
      <span className="text-foreground/50 w-16 text-sm">
        {formatTime(duration)}
      </span>
    </div>
  </div>
)

export default ProgressBar
