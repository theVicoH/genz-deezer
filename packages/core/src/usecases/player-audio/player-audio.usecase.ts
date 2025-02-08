
import type { PlayerAudioRepository } from "./ports"
import type { PlayerAudio } from "../../entities/player-audio"

export class PlayerAudioUseCase {
  constructor(private playerRepository: PlayerAudioRepository) {}

  async play(trackUrl: string): Promise<void> {
    await this.playerRepository.play(trackUrl)
  }

  pause(): void {
    this.playerRepository.pause()
  }

  seek(time: number): void {
    this.playerRepository.seek(time)
  }

  getCurrentState(): PlayerAudio {
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
