import { useState } from "react"

import { SkipBack, SkipForward, Play, Pause } from "lucide-react"

import { Button } from "@/components/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/card"
import { Slider } from "@/components/slider"

const mockTracks = [
  {
    id: 1,
    title: "Shape of You",
    artist: { name: "Ed Sheeran" },
    album: {
      title: "÷",
      cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/000/000/001/cover_medium.jpg"
    }
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: { name: "The Weeknd" },
    album: {
      title: "After Hours",
      cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/000/000/002/cover_medium.jpg"
    }
  },
  {
    id: 3,
    title: "Dance Monkey",
    artist: { name: "Tones and I" },
    album: {
      title: "The Kids Are Coming",
      cover_medium: "https://e-cdns-images.dzcdn.net/images/cover/000/000/003/cover_medium.jpg"
    }
  }
]

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState([0])

  // Pour le moment, on utilise les données mockées
  const tracks = mockTracks
  const currentTrack = tracks[currentTrackIndex]

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))
    setProgress([0])
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))
    setProgress([0])
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value)
  }

  return (
    <div className="space-y-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">{currentTrack?.title}</CardTitle>
          <p className="text-center text-gray-500">{currentTrack?.artist?.name}</p>
        </CardHeader>

        <CardContent>
          <div className="relative mb-4 aspect-square">
            <img
              src="/api/placeholder/400/400"
              alt={currentTrack?.album?.title}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>

          <div className="space-y-2">
            <Slider
              value={progress}
              onValueChange={handleProgressChange}
              max={100}
              step={1}
              className="my-4"
            />
            <div className="flex justify-between text-sm">
              <span>{Math.floor((progress[0] / 100) * 3.5)}:00</span>
              <span>3:30</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button variant="default" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>

          <Button variant="outline" size="icon" onClick={handleNext}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default MusicPlayer
