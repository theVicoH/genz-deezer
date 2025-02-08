import type { DBUser, User } from "@/types/auth"

export const dbUserToUser = (dbUser: DBUser): User => ({
  id: dbUser.id,
  email: dbUser.email,
  createdAt: dbUser.created_at
})
