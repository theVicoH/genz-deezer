import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { ApolloAuthRepository } from "@genz-deezer/infrastructure"

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URI
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")

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
