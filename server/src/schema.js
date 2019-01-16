// const { gql } = require('apollo-server')
const { buildSchema } = require('graphql')

const typeDefs = buildSchema(`
  type Query {
      message: String

      user(id: Int!): User

      channel(id: Int!): Channel

      post(id: Int!): User
      posts(channel_id: Int!): [Post]
  }
  type User {
      id: Int
      username: String
      password: String
  }
  type Channel {
      id: Int
      name: String
  }
  type Post {
      id: Int
      body: String
      user_id: Int
      channel_id: Int
  }
`)

module.exports = typeDefs;
