import { ApolloServer, gql } from 'apollo-server';
import { Book, User, Author } from './models';

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

const resolvers = {
  Query: {
    books: async (root: any, args: any) => {
      const books = await Book.findAll();
      return books;
    },
    authors: async (root: any, args: any) => {
      const authors = await Author.findAll();
      return authors;
    },
    users: async (root: any, args: any) => {
      const books = await User.findAll();
      return books;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: any }) => {
  console.log(`Server ready at ${url}`);
});
