import type { AuthRepository } from "./ports"
import type { AuthCredentials, AuthResult } from "@/entities/auth"
import type { User } from "@/entities/user"


export class AuthUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(credentials: AuthCredentials): Promise<AuthResult> {
    this.validateCredentials(credentials)

    return this.authRepository.login(credentials)
  }

  async register(credentials: AuthCredentials): Promise<AuthResult> {
    this.validateCredentials(credentials)

    return this.authRepository.register(credentials)
  }

  async getCurrentUser(): Promise<User> {
    return this.authRepository.getCurrentUser()
  }

  async updateProfile(email: string): Promise<User> {
    if (!email || !email.includes("@")) {
      throw new Error("Email invalide")
    }

    return this.authRepository.updateProfile(email)
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
