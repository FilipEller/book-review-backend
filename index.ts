import { ApolloServer } from 'apollo-server';
import typeDefs from './grqphql/typeDefs';
import resolvers from './grqphql/resolvers';
import context from './grqphql/context';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.listen().then(({ url }: { url: any }) => {
  console.log(`Server ready at ${url}`);
});
