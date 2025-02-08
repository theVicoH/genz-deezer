import type { AudioPlayerRepository } from "./ports"
import type { AudioPlayer } from "../../entities/audio-player"

export class AudioPlayerUseCase {
  constructor(private playerRepository: AudioPlayerRepository) {}

  async play(trackUrl: string, startTime?: number): Promise<void> {
    await this.playerRepository.play(trackUrl, startTime)
  }
  

  pause(): void {
    this.playerRepository.pause()
  }

  seek(time: number): void {
    this.playerRepository.seek(time)
  }

  getCurrentState(): AudioPlayer {
    return {
      currentTime: this.playerRepository.getCurrentTime(),
      isPlaying: this.playerRepository.isPlaying(),
      duration: this.playerRepository.getDuration()
    }
  }

  onTrackEnd(callback: () => void): void {
    this.playerRepository.onTrackEnd(callback)
  }
}
