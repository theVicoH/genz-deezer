import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import {
  ApolloAuthRepository,
  ApolloUserRepository,
  ApolloTracksRepository,
  ZustandAuthTokenStateRepository,
  HTML5AudioPlayerRepository
} from "@genz-deezer/infrastructure"

import { authTokenStateUseCase } from "@/lib/usecases"

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URI
})

const authLink = setContext((_, { headers }) => {
  const token = authTokenStateUseCase.getToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// Auth Repositories

export const authRepository = new ApolloAuthRepository(client)

export const authTokenStateRepository = new ZustandAuthTokenStateRepository()

// HTML5 Player audio Repositories

export const html5AudioPlayerRepository = new HTML5AudioPlayerRepository()

// User Repositories

export const userRepository = new ApolloUserRepository(client, () =>
  authTokenStateUseCase.getToken()
)

// Track Repositories

export const tracksRepository = new ApolloTracksRepository(client, () =>
  authTokenStateUseCase.getToken()
)
