import type { Context, DBUser, QueryUserArgs } from "@/types"
import type { DeezerResponse, Track } from "@/types/deezer"

import { sql } from "@/config/db"
import { config } from "@/config/env"
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
  },
  randomTracks: async function randomTracksResolver(
    _: never, 
    __: never, 
    context: Context
  ): Promise<Track[]> {
    checkAuth(context)
    try {
      const genres = [
        "rock", "pop", "rap", "jazz", "classical", 
        "electronic", "indie", "blues", "reggae", "metal"
      ]
      
      const randomGenre = genres[Math.floor(Math.random() * genres.length)]
      
      const randomIndex = Math.floor(Math.random() * 900)
      
      const response = await fetch(`${config.DEEZER_API_URI}/search?q=genre:"${randomGenre}"&index=${randomIndex}&limit=21`)

      if (!response.ok) {
        throw new Error(`Erreur Deezer: ${response.status}`)
      }

      const jsonData = await response.json() as DeezerResponse

      if (!jsonData.data || jsonData.data.length === 0) {
        return this.randomTracks(_, __, context)
      }

      return jsonData.data.sort(() => Math.random() - 0.5)
    } catch (error) {
      console.error("Erreur lors de la recherche Deezer:", error)
      throw new Error("Impossible de récupérer les pistes depuis Deezer")
    }
  }
}
