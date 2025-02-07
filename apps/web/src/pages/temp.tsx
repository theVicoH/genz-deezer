import { useState, useEffect } from "react"

import { Play, Pause, SkipForward } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/card"

interface Track {
  id: number;
  title: string;
  preview: string;
  artist: {
    name: string;
  };
  album: {
    cover_medium: string;
  };
}

const DeezerPlayer = () => {
  const [tracks, setTracks] = useState<Track[]>([])
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetchRandomTracks()
  }, [])

  const fetchRandomTracks = async () => {
    try {
      const response = await fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=random&limit=50")
      const data = await response.json()

      setTracks(data.data)
      if (!currentTrack) {
        const randomTrack = data.data[Math.floor(Math.random() * data.data.length)]

        setCurrentTrack(randomTrack)
        initializeAudio(randomTrack.preview)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des pistes:", error)
    }
  }

  const initializeAudio = (url: string) => {
    if (audio) {
      audio.pause()
    }
    const newAudio = new Audio(url)

    newAudio.addEventListener("ended", playNextTrack)
    setAudio(newAudio)
  }

  const togglePlay = () => {
    if (!audio) return
    
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const playNextTrack = () => {
    if (!tracks.length) return
    
    const randomIndex = Math.floor(Math.random() * tracks.length)
    const nextTrack = tracks[randomIndex]

    setCurrentTrack(nextTrack)
    
    if (audio) {
      audio.pause()
    }
    initializeAudio(nextTrack.preview)
    setIsPlaying(true)
    audio?.play()
  }

  if (!currentTrack) {
    return <div>Chargement...</div>
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Lecteur Deezer Aléatoire</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <img 
            src={currentTrack.album.cover_medium} 
            alt={currentTrack.title}
            className="h-48 w-48 rounded-lg shadow-lg"
          />
          <div className="text-center">
            <h3 className="text-lg font-semibold">{currentTrack.title}</h3>
            <p className="text-gray-600">{currentTrack.artist.name}</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={togglePlay}
              className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button
              onClick={playNextTrack}
              className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
            >
              <SkipForward size={24} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default DeezerPlayer
