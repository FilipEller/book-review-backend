import { Book, User, Author } from '../models';

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

export default resolvers;
