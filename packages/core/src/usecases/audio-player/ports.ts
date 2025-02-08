export interface AudioPlayerRepository {
  play(trackUrl: string): Promise<void>
  pause(): void
  seek(time: number): void
  getCurrentTime(): number
  getDuration(): number
  isPlaying(): boolean
  onTrackEnd(callback: () => void): void
}
