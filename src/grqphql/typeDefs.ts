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
    shelves: [Shelf!]!
    reviews: [Review!]!
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
    user: User!
    books: [Book!]!
  }
  type Review {
    id: ID!
    rating: Int!
    content: String
    user: User!
    book: Book!
  }
  type ShelfBook {
    id: ID!
    shelfId: Int!
    bookId: String!
  }
  type Query {
    book(id: ID!): Book
    books(query: String): [Book!]!
    authors: [Author!]!
    users: [User!]!
    user(id: ID!): User
    me: User
    shelf(id: ID!): Shelf
    shelves: [Shelf!]!
    reviews(bookId: ID): [Review!]!
  }
  type Mutation {
    createUser(username: String!, name: String!, email: String!): User
    login(username: String!, password: String!): Token
    createShelf(name: String!): Shelf
    addBookToShelf(bookId: String!, shelfId: String!): ShelfBook
    removeBookFromShelf(bookId: String!, shelfId: String!): ShelfBook
    updateShelfName(newName: String!, shelfId: String!): Shelf
    createReview(rating: Int!, content: String, bookId: String!): Review
    editReview(rating: Int, content: String, bookId: String!): Review
    removeReview(bookId: String!): Review
  }
`;

export default typeDefs;
