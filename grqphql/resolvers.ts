import { Book, User, Author, Shelf } from '../models';
import { UserInputError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/config';
import getErrorMessage from '../util/getErrorMessage';

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
    shelves: async (root: any, args: any) => {
      const shelves = await Shelf.findAll({
        include: {
          model: User,
        },
      });
      return shelves;
    },
    users: async (root: any, args: any) => {
      console.log('users queried');
      const books = await User.findAll({
        include: {
          model: Shelf,
        },
      });
      return books;
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
