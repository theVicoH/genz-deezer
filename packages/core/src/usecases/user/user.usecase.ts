import type { UserRepository } from "./ports"
import type { User } from "@/entities/user"

// UserUseCase
export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async getCurrentUser(): Promise<User> {
    return this.userRepository.getCurrentUser()
  }

  async updateProfile(email: string): Promise<User> {
    if (!email || !email.includes("@")) {
      throw new Error("Email invalide")
    }

    return this.userRepository.updateProfile(email)
  }
}


