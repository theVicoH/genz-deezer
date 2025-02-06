import type { Context, DBUser, QueryUserArgs } from "@/types"

import { sql } from "@/config/db"
import { checkAuth } from "@/utils/auth"
import { dbUserToUser } from "@/utils/user"


export const queryResolvers = {
  me: async (_: never, __: never, context: Context) => {
    const userId = checkAuth(context)
    const [dbUser] = await sql<DBUser[]>`
      SELECT id, email, created_at
      FROM users
      WHERE id = ${userId}
    `

    if (!dbUser) throw new Error("Utilisateur non trouvé")

    return dbUserToUser(dbUser)
  },
  users: async (_: never, __: never, context: Context) => {
    checkAuth(context)
    const dbUsers = await sql<DBUser[]>`
      SELECT id, email, created_at
      FROM users
    `

    return dbUsers.map(dbUserToUser)
  },
  user: async (_: never, { id }: QueryUserArgs, context: Context) => {
    checkAuth(context)
    const [dbUser] = await sql<DBUser[]>`
      SELECT id, email, created_at
      FROM users 
      WHERE id = ${id}
    `

    return dbUser ? dbUserToUser(dbUser) : null
  }
}
