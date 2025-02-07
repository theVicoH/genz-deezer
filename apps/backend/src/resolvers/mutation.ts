import bcryptjs from "bcryptjs"

import type { Context, MutationRegisterArgs, MutationLoginArgs, MutationUpdateProfileArgs, AuthPayload, DBUser } from "@/types"

import { sql } from "@/config/db"
import { generateToken, checkAuth } from "@/utils/auth"
import { dbUserToUser } from "@/utils/user"

export const mutationResolvers = {
  register: async (_: never, { email, password }: MutationRegisterArgs): Promise<AuthPayload> => {
    const [existingUser] = await sql<DBUser[]>`
      SELECT id 
      FROM users 
      WHERE email = ${email}
    `

    if (existingUser) {
      throw new Error("Cet email est déjà utilisé")
    }

    const hashedPassword = await bcryptjs.hash(password, 10)

    const [dbUser] = await sql<DBUser[]>`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
      RETURNING id, email, created_at
    `

    const token = generateToken(dbUser.id)
    const user = dbUserToUser(dbUser)

    return {
      token,
      user
    }
  },

  login: async (_: never, { email, password }: MutationLoginArgs): Promise<AuthPayload> => {
    const [dbUser] = await sql<DBUser[]>`
      SELECT *
      FROM users 
      WHERE email = ${email}
    `

    if (!dbUser) {
      throw new Error("Identifiants invalides")
    }

    const validPassword = await bcryptjs.compare(password, dbUser.password)

    if (!validPassword) {
      throw new Error("Identifiants invalides")
    }

    const token = generateToken(dbUser.id)
    const user = dbUserToUser(dbUser)

    return {
      token,
      user
    }
  },

  updateProfile: async (_: never, { email }: MutationUpdateProfileArgs, context: Context) => {
    const userId = checkAuth(context)

    const [existingUser] = await sql<DBUser[]>`
      SELECT id 
      FROM users 
      WHERE email = ${email} AND id != ${userId}
    `

    if (existingUser) {
      throw new Error("Cet email est déjà utilisé")
    }

    const [dbUser] = await sql<DBUser[]>`
      UPDATE users
      SET email = ${email}
      WHERE id = ${userId}
      RETURNING id, email, created_at
    `

    return dbUserToUser(dbUser)
  },

  deleteAccount: async (_: never, __: never, context: Context): Promise<boolean> => {
    const userId = checkAuth(context)

    await sql`DELETE FROM users WHERE id = ${userId}`

    return true
  },

  getCurrentUser: async (_: never, __: never, context: Context) => {
    const userId = checkAuth(context)

    const [dbUser] = await sql<DBUser[]>`
      SELECT id, email, created_at
      FROM users 
      WHERE id = ${userId}
    `

    if (!dbUser) {
      throw new Error("Utilisateur non trouvé")
    }

    return dbUserToUser(dbUser)
  }
}
