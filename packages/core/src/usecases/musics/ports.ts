import type { Track } from "../../entities/musics"

export interface TracksRepository {
  randomTracks(): Promise<{ randomTracks: Track[] }>
}
