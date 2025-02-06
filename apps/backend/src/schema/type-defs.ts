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

  type Query {
    me: User!
    users: [User!]!
    user(id: ID!): User
  }

  type Mutation {
    register(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    updateProfile(email: String!): User!
    deleteAccount: Boolean!
  }
`
