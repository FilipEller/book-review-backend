import { ApolloServer } from 'apollo-server';

import typeDefs from '../src/grqphql/typeDefs'
import resolvers from '../src/grqphql/resolvers'

it('returns hello with the provided name', async () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers
  });

  const result = await testServer.executeOperation({
    query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
    variables: { name: 'world' },
  });

  expect(result.errors).toBeUndefined();
  expect(result.data?.hello).toBe('Hello world!');
});
