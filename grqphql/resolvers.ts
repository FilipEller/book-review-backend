import { Book, User, Author, Shelf, ShelfBook, Review } from '../models';
import { UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/config';
import getErrorMessage from '../util/getErrorMessage';
import extBookService from '../services/extBooks';

const resolvers = {
  User: {
    shelves: async (root: any) => {
      const shelves = await Shelf.findAll({
        where: {
          userId: root.id,
        },
      });
      return shelves;
    }, // this is an n+1 problem when querying multiple users and their shelves
    // though that should not be too common
  },
  Shelf: {
    books: async (root: any) => {
      const shelfBooks = await ShelfBook.findAll({
        where: { shelfId: root.id },
        include: {
          model: Book,
        },
      });
      const books = shelfBooks.map((sb: any) => sb.book);
      return books;
    },
    user: async (root: any) => {
      const user = await User.findByPk(root.userId);
      return user;
    }, // solves nesting but adds more n+1
  },
  Book: {
    shelves: async (root: any) => {
      const shelfBooks = await ShelfBook.findAll({
        where: { bookId: root.id },
        include: { model: Shelf }, // the shelf has not populated user
      });
      const shelves = shelfBooks.map((sb: any) => sb.shelf);
      return shelves;
    },
    reviews: async (root: any) => {
      const reviews = await Review.findAll({
        where: { bookId: root.id },
        include: { model: User },
      });
      return reviews;
    },
  },
  Query: {
    book: async (root: any, args: any) => {
      const book = await Book.findByPk(args.id);
      if (!book) {
        const extBook = await extBookService.fetchBook(args.id);
        return extBook;
      }
      return book;
    },
    books: async (root: any, args: any) => {
      if (args.query) {
        const books = await extBookService.fetchBooks(args.query);
        return books;
      } else {
        const books = await Book.findAll();
        return books;
      }
    },
    authors: async (root: any, args: any) => {
      const authors = await Author.findAll();
      return authors;
    },
    shelf: async (root: any, args: any) => {
      const shelf = await Shelf.findByPk(args.id, {
        include: [
          {
            model: User,
          },
        ],
      });
      return shelf;
    },
    shelves: async (root: any, args: any) => {
      const shelves = await Shelf.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      return shelves;
    },
    user: async (root: any, args: any) => {
      const user = await User.findByPk(args.id);
      return user;
    },
    users: async (root: any, args: any) => {
      const users = await User.findAll();
      return users;
    },
    reviews: async (root: any, args: any) => {
      const reviews = await Review.findAll({
        include: [{ model: User }, { model: Book }],
      });
      return reviews;
    },
    me: (root: any, args: any, context: any) => {
      return context.currentUser;
    },
  },
  Mutation: {
    createUser: async (root: any, args: any) => {
      try {
        const user = await User.create({
          username: args.username,
          name: args.name,
          email: args.email,
        });
        return user;
      } catch (error: unknown) {
        throw new UserInputError(getErrorMessage(error), {
          invalidArgs: args,
        });
      }
    },
    login: async (root: any, args: any) => {
      const user = await User.findOne({ where: { username: args.username } });
      if (!(user && args.password === 'secret')) {
        throw new UserInputError('Invalid credentials');
      }
      const userForToken = {
        username: user.username,
        id: user.id,
      };
      const token = jwt.sign(userForToken, JWT_SECRET);
      return { token };
    },
  },
};

export default resolvers;
