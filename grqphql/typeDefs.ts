import { gql } from 'apollo-server';

// Book:
// authors: [String!]!
// categories: [String]!

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    description: String
    language: String!
    publishedDate: String
    pageCount: Int
    thumbnail: String
    smallThumbnail: String
  }
  type Author {
    id: ID!
    name: String!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    name: String!
    shelves: [Shelf!]!
  }
  type Token {
    token: String!
  }
  type Shelf {
    id: ID!
    name: String!
    userId: String!
    user: User
    books: [Book!]!
  }
  type Query {
    book(id: ID!): Book
    books(query: String): [Book!]!
    authors: [Author!]!
    users: [User!]!
    user(id: ID!): User
    me: User
    shelves: [Shelf!]!
  }
  type Mutation {
    createUser(username: String!, name: String!, email: String!): User
    login(username: String!, password: String!): Token
  }
`;

export default typeDefs;
