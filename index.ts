import { ApolloServer, gql } from 'apollo-server';
import { authors } from './util/data';
import { Book } from './models';

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
    allBooks: [Book!]!
    allAuthors: [Author!]!
  }
`;

const resolvers = {
  Query: {
    allBooks: async (root: any, args: any) => {
      const books = await Book.findAll();
      return books;
    },
    allAuthors: async (root: any, args: any) => {
      return authors;
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
