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
  type Query {
    books: [Book!]!
    authors: [Author!]!
    users: [User!]!
  }
  type User {
    id: ID!
    username: String!
    email: String!
    name: String!
  }
`;

export default typeDefs;
