import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

import { config } from "./config/env"
import { getContext } from "./context"
import { resolvers } from "./resolvers"
import { typeDefs } from "./schema/type-defs"

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(config.SERVER_PORT) },
  context: getContext
})

// eslint-disable-next-line no-console
console.log(`🚀 Server ready at: ${url}`)
