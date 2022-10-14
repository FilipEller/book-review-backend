import { ApolloServer, gql } from 'apollo-server';

import typeDefs from '../src/grqphql/typeDefs';
import resolvers from '../src/grqphql/resolvers';
import context from '../src/grqphql/context';

import { sequelize } from '../src/db';
import { runSeed } from '../src/util/seed';

const getBook = {
  query: gql`
    query Book($bookId: ID!) {
      book(id: $bookId) {
        id
        title
        description
        language
        publishedDate
        pageCount
        thumbnail
        smallThumbnail
        reviews {
          id
          rating
          content
          user {
            id
            username
          }
        }
        shelves {
          id
          name
        }
      }
    }
  `,
  variables: { bookId: 'u7fUDAAAQBAJ' },
};

let server: any;

beforeAll(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
  });
  await sequelize.sync({ force: true });
  await runSeed();
});

it('returns a book when queried by its id', async () => {
  const result = await server.executeOperation(getBook);

  expect(result.errors).toBeUndefined();
  expect(result.data?.book?.id).toBe('u7fUDAAAQBAJ');
});

afterAll(async () => {
  sequelize.close();
  await server?.stop();
});
