import type { User } from "./user"

export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthResult {
  token: string
  user: User
}
