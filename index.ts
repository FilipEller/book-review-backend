import { ApolloServer } from 'apollo-server';
import typeDefs from './grqphql/typeDefs';
import resolvers from './grqphql/resolvers';



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: any }) => {
  console.log(`Server ready at ${url}`);
});
