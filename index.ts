import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Book {
    title: String!
  }
  type Query {
    allBooks: [Book!]!
  }
`;

const resolvers = {
  Query: {
    allBooks: async (root: any, args: any) => {
      return [{ title: 'book1' }, { title: 'book2' }];
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
