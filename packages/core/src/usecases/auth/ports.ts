import type { AuthCredentials, AuthToken } from "../../entities/auth"

export interface AuthRepository {
  login(credentials: AuthCredentials): Promise<AuthToken>
  register(credentials: AuthCredentials): Promise<AuthToken>
}

export interface AuthTokenStateRepository {
  getToken(): string | null
  setToken(token: string): void
  clearToken(): void
  isAuthenticated(): boolean
}
