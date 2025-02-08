import type { AuthCredentials, LoginResponse, RegisterReponse } from "../../entities/auth"

export interface AuthRepository {
  login(credentials: AuthCredentials): Promise<LoginResponse>
  register(credentials: AuthCredentials): Promise<RegisterReponse>
}

export interface AuthTokenStateRepository {
  getToken(): string | null
  setToken(token: string): void
  clearToken(): void
  isAuthenticated(): boolean
}
