import type { User } from "@/entities/user"

export interface UserRepository {
  getCurrentUser(): Promise<User>
  updateProfile(email: string): Promise<User>
}
