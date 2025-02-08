import { RANDOM_TRACKS } from "../api/graphql/music.queries"

import type { ApolloClient, NormalizedCacheObject } from "@apollo/client"
import type { TracksRepository, Track } from "@genz-deezer/core"

export class ApolloTracksRepository implements TracksRepository {
  constructor(
    private readonly client: ApolloClient<NormalizedCacheObject>,
    private readonly getToken: () => string | null
  ) {}

  async randomTracks(): Promise<{ randomTracks: Track[] }> {
    const token = this.getToken()

    if (!token) {
      throw new Error("Authentication token required")
    }

    const { data } = await this.client.query({
      query: RANDOM_TRACKS,
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    return data
  }
}
