import { ApolloServer, gql } from 'apollo-server';
import { books, authors } from './data';

const typeDefs = gql`
  type Book {
    id: String!
    title: String!
    description: String
    authors: [String!]!
    language: String!
    publishedDate: String
    categories: [String]!
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
