import type { AuthCredentials, AuthResult } from "@/entities/auth"
import type { User } from "@/entities/user"


export interface AuthRepository {
  login(credentials: AuthCredentials): Promise<AuthResult>
  register(credentials: AuthCredentials): Promise<AuthResult> 
  getCurrentUser(): Promise<User>
  updateProfile(email: string): Promise<User>
}
