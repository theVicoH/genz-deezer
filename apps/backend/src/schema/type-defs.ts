export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Track {
    id: ID!
    title: String!
    duration: Int!
    preview: String
    artist: Artist!
    album: Album!
  }

  type Artist {
    id: ID!
    name: String!
    picture: String
  }

  type Album {
    id: ID!
    title: String!
    cover: String
  }


  type Query {
    me: User!
    users: [User!]!
    user(id: ID!): User
    randomTracks: [Track!]!
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(email: String!): User!
    deleteAccount: Boolean!
    getCurrentUser: User
  }
`
