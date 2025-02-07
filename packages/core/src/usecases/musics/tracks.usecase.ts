import type { TracksRepository } from "./ports"
import type { Track } from "../../entities/musics"

export class TracksUseCase {
  constructor(private trackRepository: TracksRepository) {}

  async randomTracks(): Promise<{ randomTracks: Track[] }> {
    return this.trackRepository.randomTracks()
  }
}
