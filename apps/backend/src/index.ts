import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';
import { getContext } from './context';
import { config } from './config/env';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: Number(config.SERVER_PORT) },
  context: getContext
});

console.log(`🚀 Server ready at: ${url}`);