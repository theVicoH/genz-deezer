import { GET_ME, UPDATE_PROFILE } from "../api/graphql/user.queries"

import type { ApolloClient, NormalizedCacheObject } from "@apollo/client"
import type { UserRepository, User } from "@genz-deezer/core"

export class ApolloUserRepository implements UserRepository {
  constructor(
    private readonly client: ApolloClient<NormalizedCacheObject>,
    private readonly getToken: () => string | null
  ) {}

  async getCurrentUser(): Promise<User> {
    const token = this.getToken()

    if (!token) {
      throw new Error("Authentication token required")
    }

    const { data } = await this.client.query({
      query: GET_ME,
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    })

    return data.me
  }

  async updateProfile(email: string): Promise<User> {
    const token = this.getToken()

    if (!token) {
      throw new Error("Authentication token required")
    }

    const { data } = await this.client.mutate({
      mutation: UPDATE_PROFILE,
      variables: { email },
      context: {
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
      update: (cache, { data }) => {
        if (data?.updateProfile.success) {
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: {
                email: email,
                __typename: "User"
              }
            }
          })
        }
      }
    })

    return data.updateProfile
  }
}
