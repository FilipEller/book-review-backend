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

describe('Query Book', () => {
  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
    });
    await sequelize.sync({ force: true });
    await runSeed();
  });

  it('should return the id, title and language of a book', async () => {
    const result = await server.executeOperation(getBook);

    expect(result.errors).toBeUndefined();
    expect(result.data?.book?.id).toBe('u7fUDAAAQBAJ');
    expect(result.data?.book?.title).toBe('Harry Potter ja puoliverinen prinssi');
    expect(result.data?.book?.language).toBe('fi');
  });

  it('should return the reviews of a book', async () => {
    const result = await server.executeOperation(getBook);

    expect(result.errors).toBeUndefined();
    expect(result.data?.book?.id).toBe('u7fUDAAAQBAJ');
    const reviewContents = result.data?.book?.reviews.map((r: any) => r.content)
    expect(reviewContents).toContain('pretty good')
    expect(reviewContents).toContain('funny book')
  });

  it('should return the shelves of a book', async () => {
    const result = await server.executeOperation(getBook);

    expect(result.errors).toBeUndefined();
    expect(result.data?.book?.id).toBe('u7fUDAAAQBAJ');
    const reviewContents = result.data?.book?.shelves.map((s: any) => s.id)
    expect(reviewContents).toContain("1")
    expect(reviewContents).toContain("2")
  });

  afterAll(async () => {
    sequelize.close();
    await server?.stop();
  });
});
