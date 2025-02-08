export const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    createdAt: String!
  }

  type LoginResponse {
    token: String!
    user: User!
  }

  type RegisterResponse {
    success: Boolean!
  }

  type UpdateProfileResponse {
    success: Boolean!
    user: User
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
    cover_medium: String
  }

  type Query {
    me: User!
    users: [User!]!
    user(id: ID!): User
    randomTracks: [Track!]!
  }

  type Mutation {
    register(email: String!, password: String!): RegisterResponse!
    login(email: String!, password: String!): LoginResponse!
    updateProfile(email: String!): UpdateProfileResponse!
    deleteAccount: Boolean!
    getCurrentUser: User
  }
`
