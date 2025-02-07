export interface Track {
  id: number
  title: string
  duration: number
  preview: string
  artist: Artist
  album: Album
}

export interface Artist {
  id: number
  name: string
}

export interface Album {
  id: number
  title: string
  cover: string
  cover_medium: string
}
