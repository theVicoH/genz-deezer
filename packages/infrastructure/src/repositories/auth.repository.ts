import { GET_ME, LOGIN, REGISTER, UPDATE_PROFILE } from "../api/graphql/auth.queries"

import type { ApolloClient, NormalizedCacheObject } from "@apollo/client"
import type { AuthRepository, AuthCredentials, AuthResult, User } from "@genz-deezer/core"

export class ApolloAuthRepository implements AuthRepository {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

  async login(credentials: AuthCredentials): Promise<AuthResult> {
    const { data } = await this.client.mutate({
      mutation: LOGIN,
      variables: credentials
    })

    return data.login
  }

  async register(credentials: AuthCredentials): Promise<AuthResult> {
    const { data } = await this.client.mutate({
      mutation: REGISTER,
      variables: credentials
    })

    return data.register
  }

  async getCurrentUser(): Promise<User> {
    const { data } = await this.client.query({
      query: GET_ME
    })

    return data.me
  }

  async updateProfile(email: string): Promise<User> {
    const { data } = await this.client.mutate({
      mutation: UPDATE_PROFILE,
      variables: { email }
    })

    return data.updateProfile
  }
}
