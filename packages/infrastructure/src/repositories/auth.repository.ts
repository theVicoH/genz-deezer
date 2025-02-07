import { LOGIN, REGISTER } from "../api/graphql/auth.queries"

import type { ApolloClient, NormalizedCacheObject } from "@apollo/client"
import type { AuthRepository, AuthCredentials, AuthToken } from "@genz-deezer/core"

export class ApolloAuthRepository implements AuthRepository {
  constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

  async login(credentials: AuthCredentials): Promise<AuthToken> {
    const { data } = await this.client.mutate({
      mutation: LOGIN,
      variables: credentials
    })

    return data.login
  }

  async register(credentials: AuthCredentials): Promise<AuthToken> {
    const { data } = await this.client.mutate({
      mutation: REGISTER,
      variables: credentials
    })

    return data.register
  }
}
