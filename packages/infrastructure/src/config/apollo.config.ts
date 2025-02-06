import { ApolloClient, InMemoryCache } from "@apollo/client"

import { config } from "./env"

export const createApolloClient = () => {
  return new ApolloClient({
    uri: `${config.SERVER_URI}/graphql`,
    cache: new InMemoryCache()
  })
}
