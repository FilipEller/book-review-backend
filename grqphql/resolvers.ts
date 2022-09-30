import { Book, User, Author, Shelf, Review } from '../models';
import { UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/config';
import getErrorMessage from '../util/getErrorMessage';
import extBookService from '../services/extBooks';

type CreateUserArgs = {
  username: string;
  name: string;
  email: string;
};

type LoginArgs = {
  username: string;
  password: string;
};

interface AppContext {
  currentUser: User | null;
}

const resolvers = {
  User: {
    shelves: async (parent: any) => await parent.getShelves(),
    // this is an n+1 problem when querying multiple users and their shelves
    // though that should not be too common
  },
  Shelf: {
    books: async (parent: any) => await parent.getBooks(),
    user: async (parent: any) => await parent.getUser(), // solves nesting but adds more n+1
  },
  Book: {
    shelves: async (parent: any) => await parent.getShelves(),
    reviews: async (parent: any) => await parent.getReviews(),
  },
  Review: {
    user: async (parent: any) => await parent.getUser(),
    book: async (parent: any) => await parent.getBook(),
  },
  Query: {
    book: async (parent: undefined, { id }: { id: string }) => {
      const book = await Book.findByPk(id);
      if (!book) {
        const extBook = await extBookService.fetchBook(id);
        return extBook;
      }
      return book;
    },
    books: async (parent: undefined, { query }: { query: string }) => {
      if (query) {
        const books = await extBookService.fetchBooks(query);
        return books;
      } else {
        const books = await Book.findAll();
        return books;
      }
    },
    authors: async () => {
      const authors = await Author.findAll();
      return authors;
    },
    shelf: async (parent: undefined, { id }: { id: string }) => {
      const shelf = await Shelf.findByPk(id);
      return shelf;
    },
    shelves: async () => {
      const shelves = await Shelf.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      return shelves;
    },
    user: async (parent: undefined, { id }: { id: string }) => {
      const user = await User.findByPk(id);
      return user;
    },
    users: async () => {
      const users = await User.findAll();
      return users;
    },
    reviews: async () => {
      const reviews = await Review.findAll();
      return reviews;
    },
    me: (parent: undefined, args: undefined, context: AppContext) => {
      return context.currentUser;
    },
  },
  Mutation: {
    createUser: async (parent: undefined, args: CreateUserArgs) => {
      const { username, name, email } = args;
      try {
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
    login: async (parent: undefined, args: LoginArgs) => {
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
