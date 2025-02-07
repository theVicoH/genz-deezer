import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { ApolloAuthRepository, ApolloUserRepository } from "@genz-deezer/infrastructure"

import { useAuthStore } from "@/stores/auth-store"

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URI
})

const authLink = setContext((_, { headers }) => {
  const token = useAuthStore.getState().token

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

export const authRepository = new ApolloAuthRepository(client)

export const userRepository = new ApolloUserRepository(
  client,
  () => useAuthStore.getState().token
)
