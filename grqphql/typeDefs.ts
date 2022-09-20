import { gql } from 'apollo-server';

// Book:
// authors: [String!]!
// categories: [String]!

const typeDefs = gql`
  type Book {
    id: String!
    title: String!
    description: String
    language: String!
    publishedDate: String
    pageCount: Int
    thumbnail: String
    smallThumbnail: String
  }
  type Author {
    name: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    name: String!
  }
  type Token {
    token: String!
  }
  type Query {
    books: [Book!]!
    authors: [Author!]!
    users: [User!]!
    me: User
  }
  type Mutation {
    createUser(username: String!, name: String!, email: String!): User
    login(username: String!, password: String!): Token
  }
`;

export default typeDefs;
