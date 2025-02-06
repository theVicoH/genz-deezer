export interface DBUser {
  id: string
  email: string
  password: string
  created_at: string
}

export interface User {
  id: string
  email: string
  createdAt: string
}

export interface Context {
  userId: string | null
}

export interface AuthPayload {
  token: string
  user: User
}

export interface MutationRegisterArgs {
  email: string
  password: string
}

export interface MutationLoginArgs {
  email: string
  password: string
}

export interface MutationUpdateProfileArgs {
  email: string
}

export interface QueryUserArgs {
  id: string
}
