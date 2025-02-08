import type { AudioPlayerRepository } from "@genz-deezer/core"

export class HTML5AudioPlayerRepository implements AudioPlayerRepository {
  private audio: HTMLAudioElement
  private onTrackEndCallback?: () => void

  constructor() {
    this.audio = new Audio()
    this.audio.addEventListener("ended", () => {
      this.onTrackEndCallback?.()
    })
  }

  async play(trackUrl: string, startTime?: number): Promise<void> {
    try {
      if (this.audio.src !== trackUrl) {
        this.audio.src = trackUrl
      }
      if (startTime !== undefined) {
        this.audio.currentTime = startTime
      }
      await this.audio.play()
    } catch (error) {
      console.error("Play error:", error)
      throw error
    }
  }

  pause(): void {
    this.audio.pause()
  }

  seek(time: number): void {
    this.audio.currentTime = time
  }

  getCurrentTime(): number {
    return this.audio.currentTime
  }

  getDuration(): number {
    return this.audio.duration
  }

  isPlaying(): boolean {
    return !this.audio.paused
  }

  onTrackEnd(callback: () => void): void {
    this.onTrackEndCallback = callback
  }
}
