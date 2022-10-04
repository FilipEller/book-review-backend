import { Book, User, Author, Shelf, Review, ShelfBook } from '../models';
import {
  UserInputError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/config';
import getErrorMessage from '../util/getErrorMessage';
import extBookService from '../services/extBooks';
import { CreateUserArgs, LoginArgs, JwtUser, AppContext } from '../types';

const findOrCreateBook = async (id: string) => {
  let book: any = await Book.findByPk(id);
  if (!book) {
    book = await extBookService.fetchBook(id);
    await Book.create({ ...book });
  }
  return book;
};

// n+1 problems with mixins
const resolvers = {
  User: {
    shelves: async (parent: any, args: any, context: any) =>
      Shelf.findAll({ where: { userId: parent.id } }),
    // parent.getShelves() does not work with query me
  },
  Shelf: {
    books: async (parent: any) => parent.getBooks(),
    user: async (parent: any) => parent.getUser(), // solves nesting but adds more n+1
  },
  Book: {
    shelves: async (parent: any) => parent.getShelves(),
    reviews: async (parent: any) => parent.getReviews(),
  },
  Review: {
    user: async (parent: any) => parent.getUser(),
    book: async (parent: any) => parent.getBook(),
  },
  Query: {
    book: async (_: undefined, { id }: { id: string }) => {
      const book = await Book.findByPk(id);
      if (!book) {
        return extBookService.fetchBook(id);
      }
      return book;
    },
    books: async (_: undefined, { query }: { query: string }) => {
      if (query) {
        return extBookService.fetchBooks(query);
      } else {
        return Book.findAll();
      }
    },
    authors: async () => Author.findAll(),
    shelf: async (_: undefined, { id }: { id: string }) => Shelf.findByPk(id),
    shelves: async () => Shelf.findAll(),
    user: async (_: undefined, { id }: { id: string }) => User.findByPk(id),
    users: async () => await User.findAll(),
    reviews: async () => Review.findAll(),
    me: async (_: undefined, args: {}, context: AppContext) =>
      context.getUser(),
  },
  Mutation: {
    createUser: async (_: undefined, args: CreateUserArgs) => {
      try {
        const { username, name, email } = args;
        const user = await User.create({
          username,
          name,
          email,
        });
        return user;
      } catch (error: unknown) {
        throw new UserInputError(getErrorMessage(error), {
          invalidArgs: args,
        });
      }
    },
    login: async (_: undefined, args: LoginArgs) => {
      const user = await User.findOne({ where: { username: args.username } });
      if (!(user && args.password === 'secret')) {
        throw new UserInputError('Invalid credentials');
      }
      const userForToken: JwtUser = {
        username: user.username,
        id: user.id,
      };
      const token = jwt.sign(userForToken, JWT_SECRET);
      return { token };
    },
    createShelf: async (
      _: undefined,
      { name }: { name: string },
      context: AppContext
    ) => {
      const currentUser = await context.getUser();
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      try {
        const shelf = await Shelf.create({ name, userId: currentUser.id });
        return shelf;
      } catch (error) {
        throw new UserInputError(getErrorMessage(error), {
          invalidArgs: { name },
        });
      }
    },
    addBookToShelf: async (
      _: undefined,
      { bookId, shelfId }: { bookId: string; shelfId: string },
      context: AppContext
    ) => {
      const currentUser = await context.getUser();
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const shelf: any = await Shelf.findByPk(shelfId);
      if (currentUser.id != shelf?.getDataValue('userId')) {
        throw new ForbiddenError('not allowed');
      }

      const booksInShelf: any = await ShelfBook.findAll({ where: { shelfId } });
      if (booksInShelf.map((x: any) => x.bookId).includes(bookId)) {
        throw new UserInputError('book already added');
      }

      const book = await findOrCreateBook(bookId);
      if (!book) {
        throw new UserInputError('no such book');
      }

      return ShelfBook.create({ bookId, shelfId });
    },
    removeBookFromShelf: async (
      _: undefined,
      { bookId, shelfId }: { bookId: string; shelfId: string },
      context: AppContext
    ) => {
      const currentUser = await context.getUser();
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const shelf: any = await Shelf.findByPk(shelfId);
      if (currentUser.id != shelf?.getDataValue('userId')) {
        throw new ForbiddenError('not allowed');
      }

      const booksInShelf: any = await ShelfBook.findAll({ where: { shelfId } });
      const shelfBook = booksInShelf.find((x: any) => x.bookId == bookId);
      if (shelfBook) {
        await shelfBook.destroy();
        console.log('destroyed');
        return shelfBook;
      }

      return null;
    },
    updateShelfName: async (
      _: undefined,
      { shelfId, newName }: { shelfId: string; newName: string },
      context: AppContext
    ) => {
      if (!newName.trim()) {
        throw new UserInputError('new name cannot be empty');
      }
      const currentUser = await context.getUser();
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const shelf: any = await Shelf.findByPk(shelfId);
      if (currentUser.id != shelf?.getDataValue('userId')) {
        throw new ForbiddenError('not allowed');
      }
      shelf.name = newName;
      await shelf.save();
      return shelf;
    },
    createReview: async (
      _: undefined,
      {
        rating,
        content,
        bookId,
      }: { rating: number; content: string; bookId: string },
      context: AppContext
    ) => {
      const currentUser = await context.getUser();
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const book = await findOrCreateBook(bookId);
      if (!book) {
        throw new UserInputError('no such book');
      }
      return await Review.create({
        rating,
        content,
        userId: currentUser.id,
        bookId,
      });
    },
  },
};

export default resolvers;
