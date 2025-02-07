import type { AuthRepository } from "./ports"
import type { AuthCredentials, AuthToken } from "../../entities/auth"

export class AuthUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(credentials: AuthCredentials): Promise<AuthToken> {
    this.validateCredentials(credentials)

    return this.authRepository.login(credentials)
  }

  async register(credentials: AuthCredentials): Promise<AuthToken> {
    this.validateCredentials(credentials)

    return this.authRepository.register(credentials)
  }

  private validateCredentials(credentials: AuthCredentials): void {
    if (!credentials.email || !credentials.email.includes("@")) {
      throw new Error("Email invalide")
    }
    if (!credentials.password || credentials.password.length < 6) {
      throw new Error("Le mot de passe doit contenir au moins 6 caractères")
    }
  }
}
