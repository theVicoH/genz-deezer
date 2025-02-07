import type { AuthTokenStateRepository } from "./ports"

export class AuthTokenStateUseCase {
  constructor(private readonly authTokenStateRepository: AuthTokenStateRepository) {}

  getToken(): string | null {
    return this.authTokenStateRepository.getToken()
  }

  setToken(token: string): void {
    this.authTokenStateRepository.setToken(token)
  }

  clearToken(): void {
    this.authTokenStateRepository.clearToken()
  }

  isAuthenticated(): boolean {
    return this.authTokenStateRepository.isAuthenticated()
  }
}
